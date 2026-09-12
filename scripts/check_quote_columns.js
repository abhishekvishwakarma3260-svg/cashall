const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRawUnsafe(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'Quote';
  `);
  console.log('CURRENT QUOTE COLUMNS:', result);
}

main().finally(() => prisma.$disconnect());
