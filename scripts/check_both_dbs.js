const { PrismaClient } = require('@prisma/client');
const { Client } = require('pg');

const NEW_DB_URL = "postgresql://postgres.ipzvutzhvmtnybelwspw:lleQ5bYxoaDiDm4T@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require";
const OLD_DB_URL = "postgresql://postgres.jqysknhobtpcbyyltnfc:Cashall%40123456@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require";

async function checkAndFix(name, connStr) {
  console.log(`\n=== CHECKING & FIXING: ${name} ===`);
  const client = new Client({
    connectionString: connStr.split('?')[0],
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    console.log(`Connected to ${name}`);
    
    // Add columns
    await client.query(`ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "customerPhone" TEXT;`);
    await client.query(`ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "customerName" TEXT;`);
    await client.query(`ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "userId" UUID;`);
    await client.query(`CREATE INDEX IF NOT EXISTS "Quote_customerPhone_idx" ON "Quote"("customerPhone");`);
    await client.query(`CREATE INDEX IF NOT EXISTS "Quote_userId_idx" ON "Quote"("userId");`);
    
    const res = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'Quote'`);
    console.log(`${name} Quote columns:`, res.rows.map(r => r.column_name));
    
    const countRes = await client.query(`SELECT count(*) FROM "Quote"`);
    console.log(`${name} Quote count:`, countRes.rows[0].count);
  } catch (err) {
    console.error(`Error on ${name}:`, err.message);
  } finally {
    await client.end();
  }
}

async function main() {
  await checkAndFix('NEW SUPABASE (ipzvutzhvmtnybelwspw)', NEW_DB_URL);
  await checkAndFix('OLD SUPABASE (jqysknhobtpcbyyltnfc)', OLD_DB_URL);
}

main();
