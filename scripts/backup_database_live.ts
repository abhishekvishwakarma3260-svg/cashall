import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/db';

const ALL_MODELS = [
  'category',
  'brand',
  'deviceModel',
  'deviceVariant',
  'colorVariant',
  'conditionQuestion',
  'conditionOption',
  'pricingRule',
  'user',
  'address',
  'partner',
  'partnerApplication',
  'quote',
  'order',
  'pickup',
  'qcReport',
  'offer',
  'payment',
  'paymentHistory',
  'invoice',
  'serviceArea',
  'bulkLead',
  'fAQ',
  'imei',
  'coupon',
  'referral',
  'supportTicket',
  'systemSetting',
  'imageReference',
  'customerDevice',
  'notification',
  'emailLog',
  'otpLog',
  'adminLog',
  'activityLog',
  'auditLog',
  'userNotificationToken',
  'deviceImage',
  'offerCalculation',
  'pricingHistory',
  'questionSet',
  'review',
  'legalDocument',
  'sellerAgreementAcceptance',
  'kycVerificationRecord',
  'priceRevisionRecord',
  'dataPrivacyRequest',
  'agentAppointmentRecord'
] as const;

async function runBackup() {
  const startTime = Date.now();
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  console.log(`\n======================================================`);
  console.log(`Starting Live Supabase Database Backup: ${timestamp}`);
  console.log(`Supabase Project: vvivimdwycuseteduoqv`);
  console.log(`======================================================\n`);

  const backupData: Record<string, any[]> = {};
  const stats: Record<string, number> = {};
  let totalRows = 0;

  for (const modelKey of ALL_MODELS) {
    const delegate = (prisma as any)[modelKey];
    if (!delegate || typeof delegate.findMany !== 'function') {
      console.warn(`[WARN] Delegate not found for model: ${modelKey}`);
      continue;
    }

    try {
      const count = await delegate.count();
      stats[modelKey] = count;
      totalRows += count;

      if (count === 0) {
        backupData[modelKey] = [];
        console.log(`[-] ${modelKey.padEnd(28)} : 0 rows`);
        continue;
      }

      // Fetch in chunks of 5000 if table is large, else fetch all
      if (count > 5000) {
        console.log(`[+] ${modelKey.padEnd(28)} : ${count} rows (fetching in chunks)...`);
        const rows: any[] = [];
        const chunkSize = 5000;
        for (let skip = 0; skip < count; skip += chunkSize) {
          const chunk = await delegate.findMany({
            skip,
            take: chunkSize,
          });
          rows.push(...chunk);
          process.stdout.write(`   ↳ fetched ${rows.length}/${count}...\r`);
        }
        console.log(`\n   ✓ finished ${modelKey} (${rows.length} rows)`);
        backupData[modelKey] = rows;
      } else {
        const rows = await delegate.findMany();
        backupData[modelKey] = rows;
        console.log(`[+] ${modelKey.padEnd(28)} : ${rows.length} rows`);
      }
    } catch (err: any) {
      console.error(`[ERROR] Failed to export table ${modelKey}:`, err.message);
      backupData[modelKey] = [];
      stats[modelKey] = -1;
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\nAll tables fetched in ${durationSec}s. Total rows: ${totalRows}`);

  const backupDir = path.join(__dirname, '..', 'database_backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // 1. Save Full JSON Backup
  const jsonFilename = `cashall_full_backup_${timestamp}.json`;
  const jsonPath = path.join(backupDir, jsonFilename);
  console.log(`\nWriting full JSON backup to: ${jsonPath}`);
  fs.writeFileSync(jsonPath, JSON.stringify(backupData, null, 2), 'utf8');
  const jsonSizeBytes = fs.statSync(jsonPath).size;
  const jsonSizeMB = (jsonSizeBytes / (1024 * 1024)).toFixed(2);
  console.log(`✓ Full backup written: ${jsonSizeMB} MB (${jsonSizeBytes} bytes)`);

  // 2. Save Manifest & Metadata
  const manifest = {
    backupName: jsonFilename,
    generatedAt: new Date().toISOString(),
    database: {
      provider: 'Supabase PostgreSQL (AWS ap-south-1 Mumbai)',
      projectRef: 'vvivimdwycuseteduoqv',
      connectionPooler: 'aws-0-ap-south-1.pooler.supabase.com:6543 (Transaction Pooler)',
    },
    totalTables: ALL_MODELS.length,
    totalRecords: totalRows,
    sizeMB: jsonSizeMB,
    sizeBytes: jsonSizeBytes,
    durationSeconds: parseFloat(durationSec),
    tableCounts: stats,
  };

  const manifestFilename = `cashall_backup_manifest_${timestamp}.json`;
  const manifestPath = path.join(backupDir, manifestFilename);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`✓ Backup manifest written to: ${manifestFilename}`);

  // 3. Keep latest pointers
  fs.writeFileSync(path.join(backupDir, 'latest_backup.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`\n======================================================`);
  console.log(`BACKUP COMPLETED SUCCESSFULLY!`);
  console.log(`======================================================\n`);
}

runBackup()
  .catch((err) => {
    console.error('Fatal backup error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
