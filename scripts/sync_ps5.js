process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');

const srcUrl = 'postgresql://postgres.uyqwewpkwkxvrzahdusu:goPVIP2cXfIX2e3s@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require';
const dstUrl = 'postgresql://postgres.slprzaoalvtnfkashlvw:2MeGtofTiiQ36wsI@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?sslmode=require';

async function main() {
  const src = new Client({ connectionString: srcUrl, ssl: { rejectUnauthorized: false } });
  const dst = new Client({ connectionString: dstUrl, ssl: { rejectUnauthorized: false } });
  await src.connect();
  await dst.connect();

  const colsRes = await src.query(`
    SELECT column_name, data_type, udt_name 
    FROM information_schema.columns 
    WHERE table_name = 'ps5_rentals' AND table_schema = 'public'
    ORDER BY ordinal_position;
  `);

  await dst.query(`DROP TABLE IF EXISTS "ps5_rentals" CASCADE;`);

  const colDefs = colsRes.rows.map(r => {
    let type = r.udt_name;
    if (r.udt_name === 'timestamptz') type = 'timestamp with time zone';
    let def = `"${r.column_name}" ${type}`;
    if (r.column_name === 'id') def += ' PRIMARY KEY';
    return def;
  }).join(', ');

  await dst.query(`CREATE TABLE "ps5_rentals" (${colDefs});`);
  console.log('Created ps5_rentals table in target.');

  const srcRows = await src.query(`SELECT * FROM "ps5_rentals"`);
  const jsonbCols = colsRes.rows.filter(c => c.udt_name === 'jsonb' || c.udt_name === 'json').map(c => c.column_name);

  for (const r of srcRows.rows) {
    const keys = Object.keys(r);
    const cols = keys.map(k => `"${k}"`).join(', ');
    const vals = keys.map((_, idx) => `$${idx + 1}`).join(', ');
    const values = keys.map(k => {
      if (jsonbCols.includes(k) && r[k] !== null) {
        return JSON.stringify(r[k]);
      }
      return r[k];
    });
    await dst.query(`INSERT INTO "ps5_rentals" (${cols}) VALUES (${vals})`, values);
  }

  const countRes = await dst.query(`SELECT count(*)::int as cnt FROM "ps5_rentals"`);
  console.log(`✅ ps5_rentals synced: ${countRes.rows[0].cnt} rows.`);

  await src.end();
  await dst.end();
}

main().catch(console.error);
