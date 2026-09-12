const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { phone: { contains: '7477336911' } },
        { name: { contains: 'Jayanta', mode: 'insensitive' } }
      ]
    }
  });
  console.log('=== MATCHING USERS ===', JSON.stringify(users, null, 2));

  const quotes = await prisma.quote.findMany({
    where: {
      OR: [
        { quoteNumber: { in: ['CAQ58779', 'CAQ39767', 'CAQ58570'] } },
        { breakdownJson: { contains: '7477336911' } },
        { selectedAnswersJson: { contains: '7477336911' } }
      ]
    },
    include: {
      orders: {
        include: {
          user: true,
          address: true
        }
      },
      variant: {
        include: {
          model: {
            include: {
              brand: true
            }
          }
        }
      }
    }
  });

  console.log('=== MATCHING QUOTES COUNT ===', quotes.length);
  for (const q of quotes) {
    console.log({
      id: q.id,
      quoteNumber: q.quoteNumber,
      deviceName: q.variant ? `${q.variant.model.brand.name} ${q.variant.model.name} (${q.variant.storage})` : 'Unknown',
      estimatedPrice: q.estimatedPrice,
      status: q.status,
      ordersCount: q.orders.length,
      orders: q.orders.map(o => ({ orderNumber: o.orderNumber, user: o.user.name, phone: o.user.phone, status: o.status })),
      breakdownJsonPreview: q.breakdownJson?.slice(0, 200),
      selectedAnswersJsonPreview: q.selectedAnswersJson?.slice(0, 200)
    });
  }
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        { userId: '822122b0-bda6-4030-98cb-750f566cbd8c' },
        { address: { phone: { contains: '7477336911' } } }
      ]
    },
    include: { address: true, user: true, quote: true }
  });
  const q39767 = await prisma.$queryRawUnsafe(
    'SELECT "id", "quoteNumber", "customerPhone", "customerName", "breakdownJson", "selectedAnswersJson" FROM "Quote" WHERE "quoteNumber" = \'CAQ39767\''
  );
  console.log('QUOTE CAQ39767 RAW:', q39767);
}

main().finally(() => prisma.$disconnect());
