const { Client } = require('pg');

const OLD_DB_URL = "postgresql://postgres.ipzvutzhvmtnybelwspw:lleQ5bYxoaDiDm4T@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require";
const NEW_DB_URL = "postgresql://postgres.vvivimdwycuseteduoqv:AdigWdfW1rqDuaWf@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require";

const FAKE_ORDER_NUMBERS = [
  'CA40906', 'CA20950', 'CA20039', 'CA26035', 'CA72709',
  'CA58920', 'CA20353', 'CA82379', 'CA68682', 'CA27992',
  'CA20429', 'CA67889', 'TEST_CA103', 'TEST_CA102', 'TEST_CA101',
  'CA45853', 'CA72512', 'CA30517', 'CA21385', 'CA10166',
  'CA64755', 'CA47308' // ensure these are gone too
];

async function main() {
  const oldClient = new Client({ connectionString: OLD_DB_URL.split('?')[0], ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DB_URL.split('?')[0], ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  console.log("Connected to both databases.");

  // 1. Fetch all clean 98 orders from OLD DB
  const oldOrdersQuery = await oldClient.query(`
    SELECT o.id, o."orderNumber", o.status, o."finalPrice", o."cancellationReason", o."createdAt",
           p.id as "pickupId", p.status as "pickupStatus", p.notes as "pickupNotes", p."partnerId"
    FROM "Order" o
    LEFT JOIN "Pickup" p ON p."orderId" = o.id
    WHERE o."deletedAt" IS NULL
      AND o."orderNumber" NOT IN ('CA64755', 'CA47308')
    ORDER BY o."createdAt" DESC
  `);

  const oldOrdersMap = new Map();
  for (const r of oldOrdersQuery.rows) {
    if (!oldOrdersMap.has(r.orderNumber)) {
      oldOrdersMap.set(r.orderNumber, r);
    }
  }

  console.log(`Found ${oldOrdersMap.size} genuine orders in OLD DB.`);

  // 2. In NEW DB, delete the fake orders
  console.log("\n--- Cleaning up fake / test orders from NEW DB ---");
  for (const fakeNum of FAKE_ORDER_NUMBERS) {
    const findRes = await newClient.query(`SELECT id FROM "Order" WHERE "orderNumber" = $1`, [fakeNum]);
    if (findRes.rows.length > 0) {
      const orderId = findRes.rows[0].id;
      // Delete child records first to satisfy FK constraints
      await newClient.query(`DELETE FROM "Imei" WHERE "orderId" = $1`, [orderId]);
      await newClient.query(`DELETE FROM "PaymentHistory" WHERE "paymentId" IN (SELECT id FROM "Payment" WHERE "orderId" = $1)`, [orderId]);
      await newClient.query(`DELETE FROM "Payment" WHERE "orderId" = $1`, [orderId]);
      await newClient.query(`DELETE FROM "QcReport" WHERE "orderId" = $1`, [orderId]);
      await newClient.query(`DELETE FROM "Pickup" WHERE "orderId" = $1`, [orderId]);
      await newClient.query(`DELETE FROM "Offer" WHERE "orderId" = $1`, [orderId]);
      await newClient.query(`DELETE FROM "Invoice" WHERE "orderId" = $1`, [orderId]);
      await newClient.query(`DELETE FROM "Order" WHERE id = $1`, [orderId]);
      console.log(`✓ Deleted fake order: ${fakeNum} (${orderId})`);
    }
  }

  // 3. For each of the 98 orders, synchronize status, finalPrice, cancellationReason, pickup status & notes
  console.log("\n--- Synchronizing 98 genuine orders in NEW DB to match OLD DB ---");
  for (const [orderNumber, oldOrd] of oldOrdersMap.entries()) {
    // Check if order exists in NEW DB
    const newOrdRes = await newClient.query(`SELECT id, status FROM "Order" WHERE "orderNumber" = $1`, [orderNumber]);
    if (newOrdRes.rows.length === 0) {
      console.warn(`WARNING: Order ${orderNumber} missing in NEW DB!`);
      continue;
    }

    const newOrderId = newOrdRes.rows[0].id;

    // Update Order
    await newClient.query(`
      UPDATE "Order"
      SET status = $1,
          "finalPrice" = COALESCE($2, "finalPrice"),
          "cancellationReason" = COALESCE($3, "cancellationReason"),
          "updatedAt" = NOW()
      WHERE id = $4
    `, [oldOrd.status, oldOrd.finalPrice, oldOrd.cancellationReason, newOrderId]);

    // Update Pickup
    if (oldOrd.pickupNotes || oldOrd.pickupStatus) {
      await newClient.query(`
        UPDATE "Pickup"
        SET status = COALESCE($1, status),
            notes = COALESCE($2, notes),
            "updatedAt" = NOW()
        WHERE "orderId" = $3
      `, [oldOrd.pickupStatus, oldOrd.pickupNotes, newOrderId]);
    }
  }

  // Explicit fix for CA59994 (Surjo Das) - completed order
  await newClient.query(`
    UPDATE "Order"
    SET status = 'COMPLETED',
        "finalPrice" = 8000,
        "updatedAt" = NOW()
    WHERE "orderNumber" = 'CA59994'
  `);
  await newClient.query(`
    UPDATE "Pickup"
    SET status = 'COMPLETED',
        "updatedAt" = NOW()
    WHERE "orderId" IN (SELECT id FROM "Order" WHERE "orderNumber" = 'CA59994')
  `);

  console.log("✓ CA59994 (Surjo Das) explicitly updated to COMPLETED with finalPrice 8000.");

  // 4. Run verification query on NEW DB matching admin dashboard getOrderCategory
  console.log("\n--- VERIFYING NEW DB COUNTS ---");
  const checkRes = await newClient.query(`
    SELECT o.id, o."orderNumber", o.status, o."finalPrice", o."agentId",
           u.name as "userName", u.phone as "userPhone",
           p.notes as "pickupNotes", part.name as "partnerName",
           (SELECT count(*) FROM "QcReport" qc WHERE qc."orderId" = o.id) as "qcCount",
           (SELECT count(*) FROM "Payment" pay WHERE pay."orderId" = o.id AND pay.status = 'PAID') as "paidCount"
    FROM "Order" o
    LEFT JOIN "User" u ON o."userId" = u.id
    LEFT JOIN "Pickup" p ON p."orderId" = o.id
    LEFT JOIN "Partner" part ON p."partnerId" = part.id
    WHERE o."deletedAt" IS NULL
    ORDER BY o."createdAt" DESC
  `);

  const uniqueNewOrders = new Map();
  for (const r of checkRes.rows) {
    if (!uniqueNewOrders.has(r.orderNumber)) {
      uniqueNewOrders.set(r.orderNumber, r);
    }
  }

  const allOrders = Array.from(uniqueNewOrders.values());

  function getOrderCategory(ord) {
    const pickupNotes = ord.pickupNotes || '';
    const isValidNotesAgent =
      pickupNotes &&
      pickupNotes !== 'Doorstep pickup order confirmed.' &&
      pickupNotes !== 'Order synced to database automatically.';
    const assignedPartnerName = isValidNotesAgent
      ? pickupNotes
      : ord.partnerName || null;

    let status = ord.status || 'PICKUP_SCHEDULED';
    if (status === 'PICKUP_SCHEDULED' && assignedPartnerName) {
      status = 'PARTNER_ASSIGNED';
    }
    if (parseInt(ord.qcCount, 10) > 0 && status === 'PICKUP_SCHEDULED') {
      status = 'INSPECTION_COMPLETED';
    }

    const normStatus = (status || '').toUpperCase();

    // 1. Cancelled
    if (normStatus === 'CANCELLED' || normStatus === 'REJECTED' || normStatus.includes('CANCEL')) {
      return 'CANCELLED';
    }

    // 2. Completed
    if (normStatus === 'COMPLETED' || normStatus === 'BILL_GENERATED' || normStatus === 'PAID') {
      return 'COMPLETED';
    }

    // 3. Assigned
    const hasAgent = Boolean(
      ord.agentId ||
      (assignedPartnerName &&
        assignedPartnerName !== '—' &&
        assignedPartnerName.toLowerCase() !== 'unassigned' &&
        !assignedPartnerName.toLowerCase().includes('no agent') &&
        assignedPartnerName !== 'Assigned Agent')
    );

    if (
      hasAgent ||
      normStatus === 'PARTNER_ASSIGNED' ||
      normStatus === 'ASSIGNED' ||
      normStatus === 'INSPECTION_PENDING' ||
      normStatus === 'INSPECTION_COMPLETED' ||
      normStatus === 'PICKUP_IN_PROGRESS'
    ) {
      return 'ASSIGNED';
    }

    // 4. Pending
    return 'PENDING_TO_ASSIGN';
  }

  const counts = {
    TOTAL: allOrders.length,
    COMPLETED: 0,
    CANCELLED: 0,
    ASSIGNED: 0,
    PENDING_TO_ASSIGN: 0,
  };

  const assignedList = [];
  const pendingList = [];
  const completedList = [];
  const cancelledList = [];

  for (const o of allOrders) {
    const cat = getOrderCategory(o);
    counts[cat]++;
    if (cat === 'ASSIGNED') assignedList.push(o);
    else if (cat === 'PENDING_TO_ASSIGN') pendingList.push(o);
    else if (cat === 'COMPLETED') completedList.push(o);
    else if (cat === 'CANCELLED') cancelledList.push(o);
  }

  console.log("FINAL DASHBOARD COUNTS:", counts);

  console.log("\nAssigned (" + assignedList.length + "):");
  assignedList.forEach((o, i) => console.log(`  ${i+1}. [${o.orderNumber}] ${o.userName} (${o.userPhone}) -> Agent/Notes: ${o.partnerName || o.pickupNotes}`));

  console.log("\nPending (" + pendingList.length + "):");
  pendingList.forEach((o, i) => console.log(`  ${i+1}. [${o.orderNumber}] ${o.userName} (${o.userPhone})`));

  console.log("\nCompleted (" + completedList.length + "):");
  console.log(completedList.map(o => o.orderNumber).join(', '));

  console.log("\nCancelled (" + cancelledList.length + "):");
  console.log(cancelledList.map(o => o.orderNumber).join(', '));

  await oldClient.end();
  await newClient.end();
}

main().catch(console.error);
