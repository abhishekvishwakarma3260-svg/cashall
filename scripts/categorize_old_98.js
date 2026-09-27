const { Client } = require('pg');

const OLD_DB_URL = "postgresql://postgres.ipzvutzhvmtnybelwspw:lleQ5bYxoaDiDm4T@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require";

async function main() {
  const oldClient = new Client({ connectionString: OLD_DB_URL.split('?')[0], ssl: { rejectUnauthorized: false } });
  await oldClient.connect();

  const oldOrders = (await oldClient.query(`
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
  `)).rows;

  const oldMap = new Map();
  oldOrders.forEach(o => { if (!oldMap.has(o.orderNumber)) oldMap.set(o.orderNumber, o); });

  // Exclude CA64755 and CA47308
  oldMap.delete('CA64755');
  oldMap.delete('CA47308');

  console.log(`Cleaned Old DB orders count: ${oldMap.size} (Target: 98)`);

  const list = Array.from(oldMap.values());

  const completed = [];
  const cancelled = [];
  const pending = [];
  const assigned = [];
  const other = [];

  for (const o of list) {
    const s = o.status;
    if (s === 'COMPLETED') {
      completed.push(o);
    } else if (s === 'CANCELLED') {
      cancelled.push(o);
    } else if (s === 'PICKUP_SCHEDULED') {
      pending.push(o);
    } else if (s === 'PARTNER_ASSIGNED') {
      assigned.push(o);
    } else {
      other.push(o);
    }
  }

  console.log(`Completed: ${completed.length} (Target: 37)`);
  console.log(`Cancelled: ${cancelled.length} (Target: 49)`);
  console.log(`Pending: ${pending.length} (Target: 1)`);
  console.log(`Assigned: ${assigned.length} (Target: 11)`);
  console.log(`Other: ${other.length}`);

  console.log('\n--- COMPLETED (' + completed.length + ') ---');
  console.log(completed.map(o => o.orderNumber).join(', '));

  console.log('\n--- CANCELLED (' + cancelled.length + ') ---');
  console.log(cancelled.map(o => o.orderNumber).join(', '));

  console.log('\n--- PENDING (' + pending.length + ') ---');
  console.table(pending.map(o => ({ num: o.orderNumber, name: o.userName, phone: o.userPhone, date: o.createdAt?.toISOString()?.slice(0, 10) })));

  console.log('\n--- ASSIGNED (' + assigned.length + ') ---');
  console.table(assigned.map(o => ({ num: o.orderNumber, name: o.userName, phone: o.userPhone, partner: o.partnerName || o.pickupNotes, date: o.createdAt?.toISOString()?.slice(0, 10) })));

  await oldClient.end();
}

main().catch(console.error);
