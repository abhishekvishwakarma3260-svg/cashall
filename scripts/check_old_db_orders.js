const { Client } = require('pg');

const OLD_DB_URL = "postgresql://postgres.ipzvutzhvmtnybelwspw:lleQ5bYxoaDiDm4T@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require";

async function main() {
  const client = new Client({
    connectionString: OLD_DB_URL.split('?')[0],
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log("Connected to OLD DB (ipzvutzhvmtnybelwspw)");

  const ordersRes = await client.query(`
    SELECT o.id, o."orderNumber", o.status, o."finalPrice", o."createdAt", o."agentId",
           u.name as "userName", u.phone as "userPhone",
           p.status as "pickupStatus", p.notes as "pickupNotes",
           part.name as "partnerName"
    FROM "Order" o
    LEFT JOIN "User" u ON o."userId" = u.id
    LEFT JOIN "Pickup" p ON p."orderId" = o.id
    LEFT JOIN "Partner" part ON p."partnerId" = part.id
    WHERE o."deletedAt" IS NULL
    ORDER BY o."createdAt" DESC
  `);

  console.log(`Total orders in OLD DB (ipzvutzhvmtnybelwspw): ${ordersRes.rows.length}`);

  // Deduplicate orders if pickup joined multiple times
  const uniqueOrders = new Map();
  for (const r of ordersRes.rows) {
    if (!uniqueOrders.has(r.orderNumber)) {
      uniqueOrders.set(r.orderNumber, r);
    }
  }

  console.log(`Unique order count: ${uniqueOrders.size}`);

  const list = Array.from(uniqueOrders.values());
  const statusCounts = {};
  for (const o of list) {
    statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
  }
  console.log("Status counts in OLD DB:", statusCounts);

  // Print all orders with their orderNumber, userName, userPhone, status, pickupNotes, partnerName, createdAt
  console.log("\nAll orders in OLD DB:");
  list.forEach((o, i) => {
    console.log(`${i+1}. [${o.orderNumber}] Status: ${o.status} | Customer: ${o.userName} (${o.userPhone}) | Partner: ${o.partnerName || o.pickupNotes || 'None'} | Date: ${o.createdAt?.toISOString()?.slice(0, 10)}`);
  });

  await client.end();
}

main().catch(console.error);
