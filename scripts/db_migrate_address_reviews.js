const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to database...');
  
  // 1. Add line1 and line2 to Address, and make legacy columns nullable
  console.log('Altering Address table...');
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Address" ADD COLUMN IF NOT EXISTS "line1" TEXT;
  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Address" ADD COLUMN IF NOT EXISTS "line2" TEXT;
  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Address" ALTER COLUMN "house" DROP NOT NULL;
  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Address" ALTER COLUMN "street" DROP NOT NULL;
  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Address" ALTER COLUMN "area" DROP NOT NULL;
  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Address" ALTER COLUMN "city" DROP NOT NULL;
  `);

  // Migrate existing address data to line1 / line2 if line1 is empty
  await prisma.$executeRawUnsafe(`
    UPDATE "Address" 
    SET "line1" = CASE 
      WHEN "line1" IS NOT NULL AND "line1" <> '' THEN "line1"
      WHEN "house" IS NOT NULL AND "street" IS NOT NULL AND "street" <> '' THEN CONCAT("house", ', ', "street")
      WHEN "house" IS NOT NULL THEN "house"
      WHEN "street" IS NOT NULL THEN "street"
      ELSE ''
    END,
    "line2" = CASE
      WHEN "line2" IS NOT NULL AND "line2" <> '' THEN "line2"
      WHEN "area" IS NOT NULL AND "landmark" IS NOT NULL AND "landmark" <> '' THEN CONCAT("area", ', near ', "landmark")
      WHEN "area" IS NOT NULL THEN "area"
      ELSE "landmark"
    END
    WHERE "line1" IS NULL OR "line1" = '';
  `);
  console.log('Address table successfully updated.');

  // 2. Create Review table
  console.log('Creating Review table if not exists...');
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Review" (
      "id" UUID NOT NULL DEFAULT gen_random_uuid(),
      "name" TEXT NOT NULL,
      "phone" TEXT,
      "rating" INTEGER NOT NULL DEFAULT 5,
      "headline" TEXT,
      "comment" TEXT NOT NULL,
      "deviceModel" TEXT,
      "location" TEXT,
      "payout" DOUBLE PRECISION,
      "verified" BOOLEAN NOT NULL DEFAULT false,
      "helpfulCount" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
    );
  `);
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "Review_rating_idx" ON "Review"("rating");
  `);
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "Review_createdAt_idx" ON "Review"("createdAt");
  `);
  console.log('Review table verified / created successfully.');

  console.log('Migration complete!');
}

main()
  .catch((e) => {
    console.error('Migration error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
