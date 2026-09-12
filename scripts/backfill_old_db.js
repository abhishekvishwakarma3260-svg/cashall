const { Client } = require('pg');

const OLD_DB_URL = "postgresql://postgres.jqysknhobtpcbyyltnfc:cashall%407003216788@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";

async function main() {
  const client = new Client({
    connectionString: OLD_DB_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to old Supabase for backfill...');

    // 1. Get all users
    const usersRes = await client.query('SELECT "id", "phone", "name" FROM "User"');
    const userMap = new Map();
    for (const u of usersRes.rows) {
      if (u.phone) {
        const clean = u.phone.replace(/\D/g, '').slice(-10);
        if (clean) userMap.set(clean, u);
      }
    }

    // 2. Get all quotes
    const quotesRes = await client.query('SELECT "id", "quoteNumber", "breakdownJson", "selectedAnswersJson" FROM "Quote"');
    console.log(`Found ${quotesRes.rows.length} quotes on old Supabase.`);

    let updated = 0;
    for (const q of quotesRes.rows) {
      let customerPhone = '';
      let customerName = '';
      let userId = null;

      try {
        const bd = JSON.parse(q.breakdownJson || '{}');
        customerPhone = bd.customerPhone || bd.phone || '';
        customerName = bd.customerName || bd.name || '';
      } catch (e) {}

      if (!customerPhone || !customerName) {
        try {
          const sa = JSON.parse(q.selectedAnswersJson || '{}');
          if (!customerPhone) customerPhone = sa.customerPhone || sa.phone || '';
          if (!customerName) customerName = sa.customerName || sa.name || '';
        } catch (e) {}
      }

      const cleanPhone = (customerPhone || '').replace(/\D/g, '').slice(-10);
      if (cleanPhone && userMap.has(cleanPhone)) {
        const u = userMap.get(cleanPhone);
        userId = u.id;
        if (!customerName && u.name) customerName = u.name;
      }

      if (cleanPhone || customerName || userId) {
        await client.query(
          `UPDATE "Quote" SET "customerPhone" = $1, "customerName" = $2, "userId" = $3 WHERE "id" = $4`,
          [cleanPhone || null, customerName || null, userId || null, q.id]
        );
        updated++;
      }
    }

    console.log(`Backfilled ${updated} quotes on old Supabase!`);
  } catch (err) {
    console.error('Backfill error:', err);
  } finally {
    await client.end();
  }
}

main();
