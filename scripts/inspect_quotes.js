const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.quote.count();
  console.log('TOTAL QUOTES IN DB:', count);
  const quotes = await prisma.quote.findMany({
    select: {
      id: true,
      quoteNumber: true,
      breakdownJson: true,
      selectedAnswersJson: true,
      orders: {
        select: {
          id: true,
          orderNumber: true,
          user: { select: { phone: true, name: true } }
        }
      }
    }
  });

  let withPhone = 0;
  quotes.forEach(q => {
    let p = '';
    try { p = JSON.parse(q.breakdownJson || '{}').customerPhone || JSON.parse(q.selectedAnswersJson || '{}').customerPhone || q.orders?.[0]?.user?.phone; } catch(e) {}
    if (p) withPhone++;
  });
  console.log(`Quotes with phone: ${withPhone} out of ${quotes.length}`);
}

main().finally(() => prisma.$disconnect());
