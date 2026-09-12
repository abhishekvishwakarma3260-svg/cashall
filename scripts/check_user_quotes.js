const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { phone: { contains: '7477336911' } }
  });
  console.log('=== USERS ===');
  console.log(JSON.stringify(users, null, 2));

  const allQuotes = await prisma.quote.findMany({
    take: 30,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      quoteNumber: true,
      breakdownJson: true,
      selectedAnswersJson: true,
      estimatedPrice: true,
      createdAt: true,
      orders: {
        select: {
          id: true,
          orderNumber: true,
          status: true,
          user: { select: { id: true, name: true, phone: true } },
          address: { select: { fullName: true, phone: true } }
        }
      }
    }
  });

  console.log('=== TOTAL QUOTES FETCHED:', allQuotes.length);
  for (const q of allQuotes) {
    let bd = {};
    let sa = {};
    try { bd = JSON.parse(q.breakdownJson || '{}'); } catch(e) {}
    try { sa = JSON.parse(q.selectedAnswersJson || '{}'); } catch(e) {}
    console.log({
      quoteNumber: q.quoteNumber,
      bd_phone: bd.customerPhone || bd.phone,
      bd_name: bd.customerName || bd.name,
      sa_phone: sa.customerPhone || sa.phone,
      sa_name: sa.customerName || sa.name,
      order_count: q.orders.length,
      orders: q.orders
    });
  }

  const allOrders = await prisma.order.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      orderNumber: true,
      pickupDate: true,
      status: true,
      user: { select: { id: true, name: true, phone: true } },
      address: { select: { fullName: true, phone: true } }
    }
  });
  console.log('=== ALL ORDERS ===');
  console.log(JSON.stringify(allOrders, null, 2));
}

main().finally(() => prisma.$disconnect());
