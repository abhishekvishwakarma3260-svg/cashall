import { prisma } from "../lib/db";
import { INITIAL_MODELS, INITIAL_VARIANTS } from "../lib/store";

async function main() {
  console.log("=== UPDATING SAMSUNG GALAXY S-SERIES PRICES IN DATABASE ===");

  const samsungSModels = INITIAL_MODELS.filter(
    (m) =>
      (m.brandSlug === "samsung" || m.brandId === "b-samsung" || m.brandId === "550e8400-e29b-41d4-a716-446655440002") &&
      /galaxy\s+s\d+/i.test(m.name) &&
      (!m.category || m.category === "MOBILE")
  );

  console.log(`Processing ${samsungSModels.length} Samsung S-series models from store...`);

  // Map modelId -> variants in store
  const storeVariantsByModel = new Map<string, typeof INITIAL_VARIANTS>();
  for (const v of INITIAL_VARIANTS) {
    const list = storeVariantsByModel.get(v.modelId) || [];
    list.push(v);
    storeVariantsByModel.set(v.modelId, list);
  }

  // 1. Fetch Samsung Brand from DB
  const samsungBrand = await prisma.brand.findFirst({
    where: { slug: "samsung" },
  });

  if (!samsungBrand) {
    console.error("Samsung brand not found in database!");
    return;
  }

  // 2. Fetch all Samsung models and variants in ONE single query
  console.log("Fetching DB models and variants for Samsung...");
  const dbModels = await prisma.deviceModel.findMany({
    where: { brandId: samsungBrand.id },
    include: { variants: true },
  });
  console.log(`Loaded ${dbModels.length} Samsung models from DB.`);

  // Build lookup maps for DB models: by slug and by name
  const dbModelBySlug = new Map<string, typeof dbModels[0]>();
  const dbModelByName = new Map<string, typeof dbModels[0]>();
  for (const dm of dbModels) {
    dbModelBySlug.set(dm.slug.toLowerCase(), dm);
    dbModelByName.set(dm.name.toLowerCase(), dm);
  }

  // Helper to normalize storage
  const normStorage = (s: string) => s.trim().toUpperCase().replace(/\s+/g, "");

  // Collect all variant updates
  const updates: { id: string; basePrice: number; name: string; storage: string; oldPrice: number }[] = [];

  for (const storeModel of samsungSModels) {
    const storeVars = storeVariantsByModel.get(storeModel.id) || [];
    if (storeVars.length === 0) continue;

    const sSlug = storeModel.slug.toLowerCase();
    const sName = storeModel.name.toLowerCase();

    const matchedDbModel =
      dbModelBySlug.get(sSlug) ||
      dbModelBySlug.get(sSlug.replace("samsung-", "")) ||
      dbModelByName.get(sName) ||
      dbModelByName.get(sName.replace("samsung ", ""));

    if (!matchedDbModel) {
      console.log(`[!] Model not found in DB: ${storeModel.name} (${storeModel.slug})`);
      continue;
    }

    for (const sVar of storeVars) {
      const sStorage = normStorage(sVar.storage);
      const matchingDbVars = matchedDbModel.variants.filter(
        (dv) => normStorage(dv.storage) === sStorage
      );

      for (const targetDbVar of matchingDbVars) {
        if (targetDbVar.basePrice !== sVar.basePrice) {
          updates.push({
            id: targetDbVar.id,
            basePrice: sVar.basePrice,
            oldPrice: targetDbVar.basePrice,
            name: `${storeModel.name} (${sVar.storage})`,
            storage: sVar.storage,
          });
        }
      }
    }
  }

  console.log(`Found ${updates.length} DB variants requiring price update.`);

  // Run updates in concurrent batches of 10
  let updatedCount = 0;
  for (let i = 0; i < updates.length; i += 10) {
    const batch = updates.slice(i, i + 10);
    await Promise.all(
      batch.map(async (u) => {
        await prisma.deviceVariant.update({
          where: { id: u.id },
          data: { basePrice: u.basePrice },
        });
      })
    );
    updatedCount += batch.length;
    console.log(`Updated ${updatedCount} / ${updates.length} variants...`);
  }

  console.log(`\n=== DATABASE UPDATE COMPLETE ===`);
  console.log(`Total DB variant prices successfully updated: ${updatedCount}`);
}

main()
  .catch((e) => {
    console.error("Database update error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
