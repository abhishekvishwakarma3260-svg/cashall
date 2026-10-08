const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    select: {
      id: true,
      orderNumber: true,
      status: true,
      createdAt: true,
      quote: {
        select: {
          id: true,
          quoteNumber: true,
          basePrice: true,
          variant: {
            select: {
              storage: true,
              model: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  });
  console.log("TOTAL_COUNT:" + orders.length);
  orders.forEach((o) => {
    const model = o.quote?.variant?.model?.name || "Unknown";
    console.log(`ORDER: ${o.orderNumber} | STATUS: ${o.status} | MODEL: ${model} | CREATED: ${o.createdAt}`);
  });
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Prisma error:", err);
  prisma.$disconnect();
});
