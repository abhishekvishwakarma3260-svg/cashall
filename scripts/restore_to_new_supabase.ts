/**
 * Restore script to import full CashALL database backup into a new Supabase instance.
 * Usage:
 *   npx tsx scripts/restore_to_new_supabase.ts --db-url "postgresql://postgres.[NEW_PROJECT_ID]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&sslmode=require"
 */

import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';

function parseArgs() {
  const args = process.argv.slice(2);
  const params: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : 'true';
      params[key] = val;
    }
  }
  return params;
}

async function main() {
  const params = parseArgs();
  const targetDbUrl = params['db-url'] || params.url || process.env.NEW_DATABASE_URL;

  if (!targetDbUrl) {
    console.error('❌ Missing target database URL! Please pass --db-url "postgresql://..."');
    process.exit(1);
  }

  console.log(`Connecting to target Supabase instance...`);
  const prisma = new PrismaClient({
    datasources: { db: { url: targetDbUrl } }
  });

  const backupDir = path.join(process.cwd(), 'database_backup_active_system');
  if (!fs.existsSync(backupDir)) {
    console.error(`❌ Backup directory not found at: ${backupDir}`);
    process.exit(1);
  }

  function readTable(name: string): any[] {
    const file = path.join(backupDir, `${name}.json`);
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    }
    return [];
  }

  console.log('🚀 Restoring data in topological foreign-key order...');

  // 1. Categories
  const categories = readTable('Category');
  console.log(`Restoring ${categories.length} Categories...`);
  for (const c of categories) {
    await prisma.category.upsert({ where: { id: c.id }, create: c, update: c });
  }

  // 2. Brands
  const brands = readTable('Brand');
  console.log(`Restoring ${brands.length} Brands...`);
  for (const b of brands) {
    await prisma.brand.upsert({ where: { id: b.id }, create: b, update: b });
  }

  // 3. Device Models
  const models = readTable('DeviceModel');
  console.log(`Restoring ${models.length} Device Models...`);
  for (const m of models) {
    await prisma.deviceModel.upsert({ where: { id: m.id }, create: m, update: m });
  }

  // 4. Device Variants
  const variants = readTable('DeviceVariant');
  console.log(`Restoring ${variants.length} Device Variants...`);
  for (let i = 0; i < variants.length; i += 200) {
    const chunk = variants.slice(i, i + 200);
    for (const v of chunk) {
      await prisma.deviceVariant.upsert({ where: { id: v.id }, create: v, update: v });
    }
    process.stdout.write(`\r  Imported ${Math.min(i + 200, variants.length)} / ${variants.length} variants...`);
  }
  console.log('\n✅ Variants restored.');

  // 5. Condition Questions & Options
  const questions = readTable('ConditionQuestion');
  for (const q of questions) {
    await prisma.conditionQuestion.upsert({ where: { id: q.id }, create: q, update: q });
  }
  const options = readTable('ConditionOption');
  for (const opt of options) {
    await prisma.conditionOption.upsert({ where: { id: opt.id }, create: opt, update: opt });
  }

  // 6. Pricing Rules
  const pricingRules = readTable('PricingRule');
  for (const pr of pricingRules) {
    await prisma.pricingRule.upsert({ where: { id: pr.id }, create: pr, update: pr });
  }

  // 7. Users
  const users = readTable('User');
  console.log(`Restoring ${users.length} Users...`);
  for (const u of users) {
    await prisma.user.upsert({ where: { id: u.id }, create: u, update: u });
  }

  // 8. Addresses
  const addresses = readTable('Address');
  console.log(`Restoring ${addresses.length} Addresses...`);
  for (const a of addresses) {
    await prisma.address.upsert({ where: { id: a.id }, create: a, update: a });
  }

  // 9. Quotes
  const quotes = readTable('Quote');
  console.log(`Restoring ${quotes.length} Quotes...`);
  for (const q of quotes) {
    await prisma.quote.upsert({ where: { id: q.id }, create: q, update: q });
  }

  // 10. Orders
  const orders = readTable('Order');
  console.log(`Restoring ${orders.length} Orders...`);
  for (const o of orders) {
    await prisma.order.upsert({ where: { id: o.id }, create: o, update: o });
  }

  // 11. Pickups, Payments, QC Reports, IMEIs
  const pickups = readTable('Pickup');
  for (const p of pickups) {
    await prisma.pickup.upsert({ where: { id: p.id }, create: p, update: p });
  }
  const payments = readTable('Payment');
  for (const pay of payments) {
    await prisma.payment.upsert({ where: { id: pay.id }, create: pay, update: pay });
  }
  const qcReports = readTable('QcReport');
  for (const qc of qcReports) {
    await prisma.qcReport.upsert({ where: { id: qc.id }, create: qc, update: qc });
  }
  const imeis = readTable('Imei');
  for (const imei of imeis) {
    await prisma.imei.upsert({ where: { id: imei.id }, create: imei, update: imei });
  }

  console.log('\n🎉 ALL DATA RESTORED TO NEW SUPABASE INSTANCE SUCCESSFULLY!');
  await prisma.$disconnect();
}

main().catch(console.error);
