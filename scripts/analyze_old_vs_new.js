const { Client } = require('pg');

const OLD_DB_URL = "postgresql://postgres.ipzvutzhvmtnybelwspw:lleQ5bYxoaDiDm4T@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require";
const NEW_DB_URL = "postgresql://postgres.vvivimdwycuseteduoqv:AdigWdfW1rqDuaWf@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require";

async function main() {
  const oldClient = new Client({ connectionString: OLD_DB_URL.split('?')[0], ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DB_URL.split('?')[0], ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  console.log("Connected to both databases.");

  const oldOrders = (await oldClient.query(`
    SELECT o.id, o."orderNumber", o.status, o."finalPrice", o."createdAt",
           u.name as "userName", u.phone as "userPhone",
           p.notes as "pickupNotes", part.name as "partnerName"
    FROM "Order" o
    LEFT JOIN "User" u ON o."userId" = u.id
    LEFT JOIN "Pickup" p ON p."orderId" = o.id
    LEFT JOIN "Partner" part ON p."partnerId" = part.id
    WHERE o."deletedAt" IS NULL
    ORDER BY o."createdAt" DESC
  `)).rows;

  const newOrders = (await newClient.query(`
    SELECT o.id, o."orderNumber", o.status, o."finalPrice", o."createdAt",
           u.name as "userName", u.phone as "userPhone",
           p.notes as "pickupNotes", part.name as "partnerName"
    FROM "Order" o
    LEFT JOIN "User" u ON o."userId" = u.id
    LEFT JOIN "Pickup" p ON p."orderId" = o.id
    LEFT JOIN "Partner" part ON p."partnerId" = part.id
    WHERE o."deletedAt" IS NULL
    ORDER BY o."createdAt" DESC
  `)).rows;

  // Deduplicate
  const oldMap = new Map();
  oldOrders.forEach(o => { if (!oldMap.has(o.orderNumber)) oldMap.set(o.orderNumber, o); });

  const newMap = new Map();
  newOrders.forEach(o => { if (!newMap.has(o.orderNumber)) newMap.set(o.orderNumber, o); });

  const output = [];
  output.push(`Unique orders: Old DB = ${oldMap.size}, New DB = ${newMap.size}`);

  output.push("\n=== ALL ORDERS IN OLD DB (" + oldMap.size + ") ===");
  const oldList = Array.from(oldMap.values());
  oldList.forEach((o, i) => {
    output.push(`${(i+1).toString().padStart(3)}. [${o.orderNumber}] Status: ${o.status.padEnd(17)} | Customer: ${(o.userName || 'Unknown').padEnd(20)} | Phone: ${o.userPhone} | Date: ${o.createdAt?.toISOString()?.slice(0, 10)} | Notes: ${o.partnerName || o.pickupNotes || ''}`);
  });

  output.push("\n=== In New DB but NOT in Old DB ===");
  for (const [num, ord] of newMap.entries()) {
    if (!oldMap.has(num)) {
      output.push(`New DB only: [${num}] ${ord.status} ${ord.userName} ${ord.userPhone}`);
    }
  }

  output.push("\n=== In Old DB but NOT in New DB ===");
  for (const [num, ord] of oldMap.entries()) {
    if (!newMap.has(num)) {
      output.push(`Old DB only: [${num}] ${ord.status} ${ord.userName} ${ord.userPhone}`);
    }
  }

  const fs = require('fs');
  fs.writeFileSync('scripts/comparison_output_utf8.txt', output.join('\n'), 'utf8');
  console.log("Written to scripts/comparison_output_utf8.txt");

  await oldClient.end();
  await newClient.end();
}

main().catch(console.error);
