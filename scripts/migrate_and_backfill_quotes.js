const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- STEP 1: ADDING COLUMNS & INDEXES TO QUOTE TABLE ---');
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "customerPhone" TEXT;
  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "customerName" TEXT;
  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "userId" UUID REFERENCES "User"("id") ON DELETE SET NULL;
  `);
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "Quote_customerPhone_idx" ON "Quote"("customerPhone");
  `);
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "Quote_userId_idx" ON "Quote"("userId");
  `);
  console.log('Columns and indexes verified/created successfully.');

  console.log('--- STEP 2: BACKFILLING EXISTING QUOTES ---');
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

  console.log(`Found ${quotes.length} total quotes to check and backfill.`);
  let updatedCount = 0;

  for (const q of quotes) {
    let customerPhone = '';
    let customerName = '';
    let userId = null;

    // 1. From orders if converted
    if (q.orders && q.orders.length > 0) {
      const ord = q.orders[0];
      if (ord.user) {
        userId = ord.user.id;
        customerPhone = ord.user.phone;
        customerName = ord.user.name || '';
      }
      if (!customerPhone && ord.address?.phone) customerPhone = ord.address.phone;
      if (!customerName && ord.address?.fullName) customerName = ord.address.fullName;
    }

    // 2. From breakdownJson
    if (!customerPhone || !customerName) {
      try {
        const bd = JSON.parse(q.breakdownJson || '{}');
        if (!customerPhone) customerPhone = bd.customerPhone || bd.phone || '';
        if (!customerName) customerName = bd.customerName || bd.name || '';
      } catch (e) {}
    }

    // 3. From selectedAnswersJson
    if (!customerPhone || !customerName) {
      try {
        const sa = JSON.parse(q.selectedAnswersJson || '{}');
        if (!customerPhone) customerPhone = sa.customerPhone || sa.phone || '';
        if (!customerName) customerName = sa.customerName || sa.name || '';
      } catch (e) {}
    }

    // Clean phone number (last 10 digits)
    const cleanPhone = (customerPhone || '').replace(/\D/g, '').slice(-10);

    // If userId not yet found, look up user by cleanPhone
    if (!userId && cleanPhone) {
      const matchedUser = await prisma.user.findFirst({
        where: {
          OR: [
            { phone: cleanPhone },
            { phone: `91${cleanPhone}` },
            { phone: { contains: cleanPhone } }
          ]
        },
        select: { id: true, name: true }
      });
      if (matchedUser) {
        userId = matchedUser.id;
        if (!customerName && matchedUser.name) customerName = matchedUser.name;
      }
    }

    if (cleanPhone || customerName || userId) {
      await prisma.$executeRawUnsafe(
        `UPDATE "Quote" SET "customerPhone" = $1, "customerName" = $2, "userId" = $3::uuid WHERE "id" = $4::uuid`,
        cleanPhone || null,
        customerName || null,
        userId || null,
        q.id
      );
      updatedCount++;
    }
  }

  console.log(`Backfill complete: ${updatedCount} quotes updated with phone/name/userId.`);

  // Verify Jayanta Roy quotes
  const jayantaQuotes = await prisma.$queryRawUnsafe(`
    SELECT "id", "quoteNumber", "customerPhone", "customerName", "estimatedPrice", "status"
    FROM "Quote"
    WHERE "customerPhone" = '7477336911'
    ORDER BY "createdAt" DESC
  `);
  console.log('JAYANTA ROY QUOTES AFTER BACKFILL:', jayantaQuotes);
}

main()
  .catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
