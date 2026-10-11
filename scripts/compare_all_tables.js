const { PrismaClient } = require('@prisma/client');

const srcUrl = 'postgresql://postgres.uyqwewpkwkxvrzahdusu:goPVIP2cXfIX2e3s@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require';
const dstUrl = 'postgresql://postgres.slprzaoalvtnfkashlvw:2MeGtofTiiQ36wsI@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require';

const srcPrisma = new PrismaClient({ datasources: { db: { url: srcUrl } } });
const dstPrisma = new PrismaClient({ datasources: { db: { url: dstUrl } } });

async function compareTables() {
  const tables = await srcPrisma.$queryRawUnsafe(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `);

  console.log(`Found ${tables.length} tables in source database.\n`);
  console.log('| Table Name | Source (Mumbai) | Target (Seoul) | Diff |');
  console.log('|:---|:---:|:---:|:---:|');

  for (const t of tables) {
    const tableName = t.table_name;
    try {
      const srcCount = await srcPrisma.$queryRawUnsafe(`SELECT count(*)::int as cnt FROM "${tableName}"`);
      const dstCount = await dstPrisma.$queryRawUnsafe(`SELECT count(*)::int as cnt FROM "${tableName}"`).catch(() => [{ cnt: 'Missing' }]);

      const s = srcCount[0].cnt;
      const d = dstCount[0].cnt;
      const diff = typeof d === 'number' ? s - d : 'N/A';

      console.log(`| ${tableName.padEnd(25)} | ${String(s).padStart(8)} | ${String(d).padStart(8)} | ${String(diff).padStart(6)} |`);
    } catch (err) {
      console.log(`| ${tableName.padEnd(25)} | ERROR: ${err.message} |`);
    }
  }

  await srcPrisma.$disconnect();
  await dstPrisma.$disconnect();
}

compareTables();
