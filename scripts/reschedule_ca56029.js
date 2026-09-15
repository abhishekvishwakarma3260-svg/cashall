const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.ipzvutzhvmtnybelwspw:lleQ5bYxoaDiDm4T@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();

  const targetDate = 'Friday, 18 Sep 2026';
  
  // Verify Order CA56029
  const updOrder = await client.query(`
    UPDATE "Order"
    SET "pickupDate" = $1, "status" = 'PICKUP_SCHEDULED', "updatedAt" = NOW()
    WHERE "orderNumber" = 'CA56029'
    RETURNING id, "orderNumber", "pickupDate", "pickupTimeSlot", status;
  `, [targetDate]);

  console.log('Order:');
  console.table(updOrder.rows);

  const orderId = updOrder.rows[0].id;
  const updPickup = await client.query(`
    UPDATE "Pickup"
    SET "date" = $1, "status" = 'SCHEDULED', "notes" = 'Rescheduled to Friday 18th Sep upon customer/admin request', "updatedAt" = NOW()
    WHERE "orderId" = $2
    RETURNING id, "orderId", "date", "timeSlot", status, notes;
  `, [targetDate, orderId]);
  console.log('Pickup:');
  console.table(updPickup.rows);

  await client.query(`
    INSERT INTO "AuditLog" ("id", "actorId", "actorRole", "action", "tableName", "recordId", "newValuesJson", "createdAt", "updatedAt")
    VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'ADMIN',
      'ORDER_RESCHEDULED',
      'Order',
      $1,
      $2,
      NOW(),
      NOW()
    );
  `, [orderId, JSON.stringify({ orderNumber: 'CA56029', newPickupDate: targetDate, reason: 'Rescheduled for Friday 18th Sep' })]);
  console.log('AuditLog created successfully.');

  await client.end();
}

main();
