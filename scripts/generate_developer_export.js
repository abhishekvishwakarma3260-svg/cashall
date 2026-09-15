const fs = require('fs');
const path = require('path');

const BACKUP_PATH = path.join(__dirname, '../database_backups/cashall_full_backup_2026-09-11T10-49-29-553Z.json');
const EXPORT_JSON_PATH = path.join(__dirname, '../database_backups/cashall_catalog_and_pricing_export.json');

console.log('Reading local backup from:', BACKUP_PATH);
const rawData = fs.readFileSync(BACKUP_PATH, 'utf8');
const backup = JSON.parse(rawData);

console.log('Extracting Catalog and Pricing dataset...');

const catalogExport = {
  metadata: {
    system: 'CashALL Device Catalog & Pricing Engine',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    description: 'Complete offline export of CashALL catalog, device models, storage/RAM variants, condition questions, options, and pricing rules. Zero egress hit on production Supabase.',
    counts: {
      categories: backup.category?.length || 0,
      brands: backup.brand?.length || 0,
      deviceModels: backup.deviceModel?.length || 0,
      deviceVariants: backup.deviceVariant?.length || 0,
      conditionQuestions: backup.conditionQuestion?.length || 0,
      pricingRules: backup.pricingRule?.length || 0
    }
  },
  categories: backup.category || [],
  brands: backup.brand || [],
  deviceModels: backup.deviceModel || [],
  deviceVariants: backup.deviceVariant || [],
  conditionQuestions: backup.conditionQuestion || [],
  pricingRules: backup.pricingRule || []
};

fs.writeFileSync(EXPORT_JSON_PATH, JSON.stringify(catalogExport, null, 2), 'utf8');
const stat = fs.statSync(EXPORT_JSON_PATH);

console.log('Successfully generated catalog export:');
console.log('File:', EXPORT_JSON_PATH);
console.log('Size:', (stat.size / (1024 * 1024)).toFixed(2), 'MB');
console.log('Summary:');
console.log(catalogExport.metadata.counts);
