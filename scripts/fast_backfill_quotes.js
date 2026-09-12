const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- FAST BATCH BACKFILL ---');
  // 1. Fetch all users once
  const users = await prisma.user.findMany({
    select: { id: true, phone: true, name: true }
  });
  const userMap = new Map();
  for (const u of users) {
    if (u.phone) {
      const clean = u.phone.replace(/\D/g, '').slice(-10);
      if (clean) userMap.set(clean, u);
    }
  }
  console.log(`Loaded ${users.length} users into memory lookup.`);

  // 2. Fetch all quotes
  const quotes = await prisma.quote.findMany({
    select: {
      id: true,
      quoteNumber: true,
      breakdownJson: true,
      selectedAnswersJson: true,
      orders: {
        select: {
          user: { select: { id: true, phone: true, name: true } },
          address: { select: { fullName: true, phone: true } }
        }
      }
    }
  });

  console.log(`Processing ${quotes.length} quotes...`);
  const updates = [];

  for (const q of quotes) {
    let customerPhone = '';
    let customerName = '';
    let userId = null;

    if (q.orders && q.orders.length > 0) {
      const ord = q.orders[0];
      if (ord.user) {
        userId = ord.user.id;
        customerPhone = ord.user.phone || '';
        customerName = ord.user.name || '';
      }
      if (!customerPhone && ord.address?.phone) customerPhone = ord.address.phone;
      if (!customerName && ord.address?.fullName) customerName = ord.address.fullName;
    }

    if (!customerPhone || !customerName) {
      try {
        const bd = JSON.parse(q.breakdownJson || '{}');
        if (!customerPhone) customerPhone = bd.customerPhone || bd.phone || '';
        if (!customerName) customerName = bd.customerName || bd.name || '';
      } catch (e) {}
    }

    if (!customerPhone || !customerName) {
      try {
        const sa = JSON.parse(q.selectedAnswersJson || '{}');
        if (!customerPhone) customerPhone = sa.customerPhone || sa.phone || '';
        if (!customerName) customerName = sa.customerName || sa.name || '';
      } catch (e) {}
    }

    const cleanPhone = (customerPhone || '').replace(/\D/g, '').slice(-10);
    if (!userId && cleanPhone && userMap.has(cleanPhone)) {
      const matched = userMap.get(cleanPhone);
      userId = matched.id;
      if (!customerName && matched.name) customerName = matched.name;
    }

    if (cleanPhone || customerName || userId) {
      updates.push({
        id: q.id,
        cleanPhone: cleanPhone || null,
        customerName: customerName || null,
        userId: userId || null
      });
    }
  }

  console.log(`Total quotes with customer info: ${updates.length}`);

  // Run in chunks of 25 concurrently
  const chunkSize = 25;
  for (let i = 0; i < updates.length; i += chunkSize) {
    const chunk = updates.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map(u =>
        prisma.$executeRawUnsafe(
          `UPDATE "Quote" SET "customerPhone" = $1, "customerName" = $2, "userId" = $3::uuid WHERE "id" = $4::uuid`,
          u.cleanPhone,
          u.customerName,
          u.userId,
          u.id
        )
      )
    );
  }

  console.log(`Successfully backfilled all ${updates.length} quotes!`);

  // Verify Jayanta Roy quotes specifically
  const jayantaQuotes = await prisma.$queryRawUnsafe(`
    SELECT "id", "quoteNumber", "customerPhone", "customerName", "estimatedPrice", "status"
    FROM "Quote"
    WHERE "customerPhone" = '7477336911'
    ORDER BY "createdAt" DESC
  `);
  console.log('JAYANTA ROY VERIFIED QUOTES:', jayantaQuotes);
}

main()
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
