const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    where: { deletedAt: null },
    include: {
      user: true,
      agent: true,
      pickups: {
        include: { partner: true },
      },
      payments: true,
      qcReports: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`Total orders in DB: ${orders.length}`);

  const mapped = orders.map((ord) => {
    const pickup = ord.pickups?.[0];
    const assignedPartner = pickup?.partner;
    const notes = pickup?.notes || '';
    const isValidNotesAgent =
      notes &&
      notes !== 'Doorstep pickup order confirmed.' &&
      notes !== 'Order synced to database automatically.';
    const assignedPartnerName = isValidNotesAgent
      ? notes
      : assignedPartner
      ? assignedPartner.name || assignedPartner.companyName
      : ord.agentName || ord.assignedPartnerName || null;

    let status = ord.status || 'PICKUP_SCHEDULED';
    if (status === 'PICKUP_SCHEDULED' && assignedPartnerName) {
      status = 'PARTNER_ASSIGNED';
    }
    if (ord.qcReports && ord.qcReports.length > 0 && status === 'PICKUP_SCHEDULED') {
      status = 'INSPECTION_COMPLETED';
    }

    const normStatus = (status || '').toUpperCase();

    let category = 'PENDING_TO_ASSIGN';
    if (normStatus === 'CANCELLED' || normStatus === 'REJECTED' || normStatus.includes('CANCEL')) {
      category = 'CANCELLED';
    } else if (
      normStatus === 'COMPLETED' ||
      normStatus === 'BILL_GENERATED' ||
      normStatus === 'PAID'
    ) {
      category = 'COMPLETED';
    } else {
      const hasAgent = Boolean(
        ord.agentId ||
          (assignedPartnerName &&
            assignedPartnerName !== '—' &&
            assignedPartnerName.toLowerCase() !== 'unassigned' &&
            !assignedPartnerName.toLowerCase().includes('no agent') &&
            assignedPartnerName !== 'Assigned Agent')
      );
      if (
        hasAgent ||
        normStatus === 'PARTNER_ASSIGNED' ||
        normStatus === 'ASSIGNED' ||
        normStatus === 'INSPECTION_PENDING' ||
        normStatus === 'INSPECTION_COMPLETED' ||
        normStatus === 'PICKUP_IN_PROGRESS'
      ) {
        category = 'ASSIGNED';
      }
    }

    return {
      id: ord.id,
      orderNumber: ord.orderNumber,
      customerName: ord.user?.name || ord.customerName,
      customerPhone: ord.user?.phone || ord.customerPhone,
      dbStatus: ord.status,
      computedStatus: status,
      category,
      assignedPartnerName,
      hasAgentId: !!ord.agentId,
      createdAt: ord.createdAt,
    };
  });

  const catCounts = {
    TOTAL: mapped.length,
    COMPLETED: mapped.filter((o) => o.category === 'COMPLETED').length,
    CANCELLED: mapped.filter((o) => o.category === 'CANCELLED').length,
    ASSIGNED: mapped.filter((o) => o.category === 'ASSIGNED').length,
    PENDING_TO_ASSIGN: mapped.filter((o) => o.category === 'PENDING_TO_ASSIGN').length,
  };

  console.log('Category Counts:', catCounts);

  console.log('\n--- PENDING_TO_ASSIGN (' + catCounts.PENDING_TO_ASSIGN + ') ---');
  console.table(
    mapped
      .filter((o) => o.category === 'PENDING_TO_ASSIGN')
      .map((o) => ({
        num: o.orderNumber,
        name: o.customerName,
        phone: o.customerPhone,
        dbStatus: o.dbStatus,
        date: o.createdAt?.toISOString()?.slice(0, 10),
      }))
  );

  console.log('\n--- ASSIGNED (' + catCounts.ASSIGNED + ') ---');
  console.table(
    mapped
      .filter((o) => o.category === 'ASSIGNED')
      .map((o) => ({
        num: o.orderNumber,
        name: o.customerName,
        phone: o.customerPhone,
        agent: o.assignedPartnerName,
        dbStatus: o.dbStatus,
        date: o.createdAt?.toISOString()?.slice(0, 10),
      }))
  );

  console.log('\n--- COMPLETED (' + catCounts.COMPLETED + ') ---');
  console.log(
    mapped
      .filter((o) => o.category === 'COMPLETED')
      .map((o) => o.orderNumber)
      .join(', ')
  );

  console.log('\n--- CANCELLED (' + catCounts.CANCELLED + ') ---');
  console.log(
    mapped
      .filter((o) => o.category === 'CANCELLED')
      .map((o) => o.orderNumber)
      .join(', ')
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
