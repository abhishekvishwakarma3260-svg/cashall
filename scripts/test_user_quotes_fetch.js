const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cleanPhone10 = '7477336911';
  const cleanPhone12 = '917477336911';
  const quotes = await prisma.quote.findMany({
    where: {
      deletedAt: null,
      OR: [
        { customerPhone: cleanPhone10 },
        { customerPhone: cleanPhone12 },
        { customerPhone: { contains: cleanPhone10 } },
        { breakdownJson: { contains: cleanPhone10 } },
        { selectedAnswersJson: { contains: cleanPhone10 } },
        { user: { phone: { contains: cleanPhone10 } } },
        { orders: { some: { user: { phone: { contains: cleanPhone10 } } } } },
        { orders: { some: { address: { phone: { contains: cleanPhone10 } } } } },
      ],
    },
    include: {
      orders: {
        take: 1,
        select: {
          id: true,
          orderNumber: true,
          status: true,
        },
      },
      variant: {
        select: {
          id: true,
          storage: true,
          model: {
            select: {
              name: true,
              imageUrl: true,
              category: true,
              brand: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  console.log(`Found ${quotes.length} quotes for 7477336911:`);
  for (const q of quotes) {
    console.log({
      quoteNumber: q.quoteNumber,
      customerPhone: q.customerPhone,
      customerName: q.customerName,
      estimatedPrice: q.estimatedPrice,
      status: q.status,
      device: q.variant?.model?.brand?.name + ' ' + q.variant?.model?.name
    });
  }
}

main().finally(() => prisma.$disconnect());
