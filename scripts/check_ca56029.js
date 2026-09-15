const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.ipzvutzhvmtnybelwspw:lleQ5bYxoaDiDm4T@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  const res = await client.query(`SELECT DISTINCT "pickupDate" FROM "Order"`);
  console.log('Distinct pickup dates in Order:');
  console.table(res.rows);
  await client.end();
}

main();
