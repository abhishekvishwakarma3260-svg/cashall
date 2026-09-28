const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '../database_backups');

const vercelProjectJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../.vercel/project.json'), 'utf8'));
const vercelConfigJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../vercel.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

// Read env keys (names only, safe for audit)
function getEnvKeys(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  return lines
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => line.split('=')[0].trim());
}

const envKeys = getEnvKeys(path.join(__dirname, '../.env'));
const envLocalKeys = getEnvKeys(path.join(__dirname, '../.env.local'));
const envProdKeys = getEnvKeys(path.join(__dirname, '../.env.production'));

const allUniqueKeys = Array.from(new Set([...envKeys, ...envLocalKeys, ...envProdKeys])).sort();

const integrationsBackup = {
  timestamp: new Date().toISOString(),
  environment: 'production',
  vercel: {
    projectId: vercelProjectJson.projectId,
    orgId: vercelProjectJson.orgId,
    projectName: vercelProjectJson.projectName,
    regions: vercelConfigJson.regions || ['bom1'],
    framework: 'nextjs',
    productionBranch: 'main',
    deploymentUrl: 'https://cashall.in',
    alternateUrls: [
      'https://cashall-git-main-verioca162-cybers-projects.vercel.app',
      'https://cashall-production.up.railway.app'
    ],
    config: vercelConfigJson
  },
  git: {
    currentBranch: 'main',
    remotes: {
      origin: 'https://github.com/s73091288-prog/cashall.git',
      veriocaOrigin: 'https://github.com/verioca162-cyber/cashall.git',
      newOrigin: 'https://github.com/samcashall41-stack/Cashall.git',
      backupOrigin: 'https://github.com/cashall7003216788-jpg/CashALL.git'
    },
    latestCommit: '5520d05',
    status: 'Clean / Up to date'
  },
  supabase: {
    activeProjectRef: 'uxyxjixpkpiiabogflpp',
    region: 'ap-south-1 (Mumbai)',
    provider: 'AWS',
    host: 'aws-0-ap-south-1.pooler.supabase.com',
    transactionPoolerPort: 6543,
    sessionModePort: 5432,
    databaseName: 'postgres',
    activeModelsCount: 48,
    totalRecords: 35854,
    latestBackupFile: 'cashall_full_backup_2026-09-28T16-38-06.040Z.json'
  },
  dependencies: {
    next: pkg.dependencies.next,
    react: pkg.dependencies.react,
    prisma: pkg.devDependencies.prisma,
    supabaseJs: pkg.dependencies['@supabase/supabase-js']
  },
  connectedServices: [
    {
      name: 'Supabase PostgreSQL & Storage',
      role: 'Core transactional database, relational schema, realtime listeners',
      status: 'Connected & Healthy (Port 6543 Pooled)'
    },
    {
      name: 'Vercel Serverless & Edge',
      role: 'Hosting, Edge Middleware, ISR, SSR pages, API routes in Mumbai (bom1)',
      status: 'Active (Production)'
    },
    {
      name: 'GitHub CI/CD',
      role: 'Source control, Vercel automatic git integration and preview deployments',
      status: 'Synchronized with origin'
    },
    {
      name: 'Firebase Authentication & Cloud Messaging',
      role: 'Phone OTP Auth, JWT validation, Partner & Agent push notifications',
      status: 'Integrated'
    },
    {
      name: 'Resend Email Service',
      role: 'Transactional order confirmations, partner receipts, PDF delivery',
      status: 'Integrated'
    },
    {
      name: 'Meta Conversions API & Pixel',
      role: 'Server-side and browser-side conversion tracking (ID: 1249229847363732)',
      status: 'Active'
    },
    {
      name: 'Android App Suite (Admin, Agent, Caller, Customer)',
      role: 'Mobile field operations, customer valuation & partner portals',
      status: 'APKs built & linked'
    }
  ],
  registeredEnvironmentVariablesList: allUniqueKeys
};

const outputPath = path.join(backupDir, 'vercel_and_system_integrations_backup.json');
fs.writeFileSync(outputPath, JSON.stringify(integrationsBackup, null, 2), 'utf8');

console.log('Successfully written Vercel and Connected Systems backup to:', outputPath);
