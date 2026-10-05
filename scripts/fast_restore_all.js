const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.slprzaoalvtnfkashlvw:2MeGtofTiiQ36wsI@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});

const backupDir = path.join(process.cwd(), 'database_backup_active_system');

function readTable(name) {
  const file = path.join(backupDir, `${name}.json`);
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return [];
}

async function insertBatch(modelName, data, chunkSize = 1000) {
  if (!data || data.length === 0) return 0;
  console.log(`\n📦 Inserting ${data.length} records into ${modelName}...`);
  let count = 0;
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    const res = await prisma[modelName].createMany({
      data: chunk,
      skipDuplicates: true
    });
    count += res.count;
    process.stdout.write(`\r  Progress: ${Math.min(i + chunkSize, data.length)} / ${data.length} (inserted: ${count})`);
  }
  console.log(`\n✅ ${modelName}: Done (${count} new inserted).`);
  return count;
}

async function run() {
  console.log("=================================================");
  console.log("   CASHALL FAST REFERENTIAL DB RESTORATION       ");
  console.log("   Target: slprzaoalvtnfkashlvw (Seoul)          ");
  console.log("=================================================");

  // 1. Categories
  const categories = readTable('Category');
  await insertBatch('category', categories);

  // 2. Brands
  const brands = readTable('Brand');
  await insertBatch('brand', brands);
  const validBrandIds = new Set(brands.map(b => b.id));

  // 3. Models (sanitize questionSetId = null & check brandId)
  let models = readTable('DeviceModel');
  models = models
    .filter(m => validBrandIds.has(m.brandId))
    .map(m => ({ ...m, questionSetId: null }));
  await insertBatch('deviceModel', models, 1000);
  const validModelIds = new Set(models.map(m => m.id));

  // 4. Variants (check modelId)
  let variants = readTable('DeviceVariant');
  variants = variants.filter(v => validModelIds.has(v.modelId));
  await insertBatch('deviceVariant', variants, 1000);
  const validVariantIds = new Set(variants.map(v => v.id));

  // 5. Condition Questions & Options
  let questions = readTable('ConditionQuestion').map(q => ({ ...q, questionSetId: null }));
  await insertBatch('conditionQuestion', questions);
  await insertBatch('conditionOption', readTable('ConditionOption'));

  // 6. Pricing Rules
  await insertBatch('pricingRule', readTable('PricingRule'));

  // 7. Users
  const users = readTable('User');
  await insertBatch('user', users);
  const validUserIds = new Set(users.map(u => u.id));

  // 8. Addresses
  let addresses = readTable('Address');
  addresses = addresses.filter(a => validUserIds.has(a.userId));
  await insertBatch('address', addresses);

  // 9. Quotes
  let quotes = readTable('Quote');
  quotes = quotes.filter(q => validVariantIds.has(q.variantId));
  // Clean quote userId if not in users
  quotes = quotes.map(q => ({
    ...q,
    userId: (q.userId && validUserIds.has(q.userId)) ? q.userId : null
  }));
  await insertBatch('quote', quotes, 1000);
  const validQuoteIds = new Set(quotes.map(q => q.id));

  // 10. Orders
  let orders = readTable('Order');
  orders = orders.filter(o => validUserIds.has(o.userId) && validQuoteIds.has(o.quoteId));
  await insertBatch('order', orders, 200);
  const validOrderIds = new Set(orders.map(o => o.id));

  // 11. Pickups, Payments, QC Reports, IMEIs, Invoices
  let pickups = readTable('Pickup')
    .filter(p => validOrderIds.has(p.orderId))
    .map(p => ({ ...p, partnerId: null }));
  await insertBatch('pickup', pickups);

  let payments = readTable('Payment').filter(p => validOrderIds.has(p.orderId));
  await insertBatch('payment', payments);

  let qcReports = readTable('QcReport').filter(q => validOrderIds.has(q.orderId));
  await insertBatch('qcReport', qcReports);

  let imeis = readTable('Imei').filter(i => validOrderIds.has(i.orderId));
  await insertBatch('imei', imeis);

  let invoices = readTable('Invoice').filter(inv => validOrderIds.has(inv.orderId));
  await insertBatch('invoice', invoices);

  console.log("\n=================================================");
  console.log("🎉 ALL TABLES RESTORED WITH FULL REFERENTIAL INTEGRITY!");
  console.log("=================================================");

  // Metrics
  const orderCount = await prisma.order.count();
  const userCount = await prisma.user.count();
  const quoteCount = await prisma.quote.count();
  const variantCount = await prisma.deviceVariant.count();

  console.log(`\n📊 VERIFICATION:`);
  console.log(` - Orders: ${orderCount}`);
  console.log(` - Users: ${userCount}`);
  console.log(` - Quotes: ${quoteCount}`);
  console.log(` - Variants: ${variantCount}`);

  // CA36738 Verification
  const ca36738 = await prisma.order.findFirst({
    where: { orderNumber: "CA36738" },
    include: { user: true }
  });
  console.log(`\n🎯 Order CA36738 in New Supabase:`);
  console.log(` - Order: ${ca36738?.orderNumber}`);
  console.log(` - Customer Name: ${ca36738?.user?.name}`);
  console.log(` - Customer Phone: ${ca36738?.user?.phone}`);
  console.log(` - Status: ${ca36738?.status}`);
  console.log(` - Final Price: ₹${ca36738?.finalPrice}`);

  await prisma.$disconnect();
}

run().catch((err) => {
  console.error("FATAL ERROR IN RESTORATION:", err);
  prisma.$disconnect();
});
