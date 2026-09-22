const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    where: { status: 'COMPLETED' },
    include: {
      user: true,
      address: true,
      quote: {
        include: {
          variant: {
            include: {
              model: {
                include: { brand: true }
              }
            }
          }
        }
      },
      payments: {
        take: 1,
        orderBy: { createdAt: 'desc' }
      },
      qcReports: {
        take: 1,
        orderBy: { inspectedAt: 'desc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`TOTAL_COMPLETED_ORDERS_COUNT: ${orders.length}`);

  const summary = orders.map((o, idx) => {
    const brand = o.quote?.variant?.model?.brand?.name || "";
    const model = o.quote?.variant?.model?.name || "";
    const storage = o.quote?.variant?.storage || "";
    let deviceName = `${brand} ${model} ${storage}`.trim() || o.deviceName || "Device";
    if (o.quote?.breakdownJson) {
      try {
        const bd = JSON.parse(o.quote.breakdownJson);
        if (bd?.deviceName) deviceName = bd.deviceName;
      } catch {}
    }

    const payoutAmount = o.finalPrice || o.payments?.[0]?.amount || o.quote?.estimatedPrice || 0;
    const paymentMethod = o.payments?.[0]?.paymentMethod || "Instant UPI";

    return {
      index: idx + 1,
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.user?.name || "Customer",
      customerPhone: o.user?.phone || "",
      location: o.address ? `${o.address.area || o.address.street || ""}, ${o.address.city}`.replace(/^,\s*/, '') : (o.addressSummary || "Kolkata"),
      city: o.address?.city || "Kolkata",
      state: o.address?.state || "West Bengal",
      deviceSold: deviceName,
      payoutAmount,
      paymentMethod,
      createdAt: o.createdAt
    };
  });

  fs.writeFileSync('scripts/completed-orders.json', JSON.stringify(summary, null, 2));
  console.log("Wrote completed orders to scripts/completed-orders.json");
}

main().catch(console.error).finally(() => prisma.$disconnect());
