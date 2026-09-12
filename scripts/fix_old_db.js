const { Client } = require('pg');

const OLD_DB_URL = "postgresql://postgres.jqysknhobtpcbyyltnfc:cashall%407003216788@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";

async function main() {
  console.log('Connecting to old Supabase (jqysknhobtpcbyyltnfc)...');
  const client = new Client({
    connectionString: OLD_DB_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to old Supabase successfully!');
    await client.query(`ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "customerPhone" TEXT;`);
    await client.query(`ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "customerName" TEXT;`);
    await client.query(`ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "userId" UUID;`);
    await client.query(`CREATE INDEX IF NOT EXISTS "Quote_customerPhone_idx" ON "Quote"("customerPhone");`);
    await client.query(`CREATE INDEX IF NOT EXISTS "Quote_userId_idx" ON "Quote"("userId");`);
    console.log('Successfully added customerPhone, customerName, userId columns to OLD Supabase!');

    const res = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'Quote'`);
    console.log('Old Supabase Quote columns:', res.rows.map(r => r.column_name));
  } catch (err) {
    console.error('Error on old Supabase:', err.message);
  } finally {
    await client.end();
  }
}

main();
