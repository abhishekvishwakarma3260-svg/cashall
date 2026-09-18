import { prisma } from "../lib/db";
import { INITIAL_MODELS, INITIAL_VARIANTS } from "../lib/store";

async function main() {
  console.log("=== UPDATING APPLE IPHONE PRICES IN DATABASE ===");

  const appleModels = INITIAL_MODELS.filter(
    (m) => m.brandId === "b-apple" && (!m.category || m.category === "MOBILE")
  );

  console.log(`Processing ${appleModels.length} Apple models from store...`);

  // Map modelId -> variants in store
  const storeVariantsByModel = new Map<string, typeof INITIAL_VARIANTS>();
  for (const v of INITIAL_VARIANTS) {
    const list = storeVariantsByModel.get(v.modelId) || [];
    list.push(v);
    storeVariantsByModel.set(v.modelId, list);
  }

  // 1. Fetch Apple Brand from DB
  const appleBrand = await prisma.brand.findFirst({
    where: { slug: "apple" },
  });

  if (!appleBrand) {
    console.error("Apple brand not found in database!");
    return;
  }

  // 2. Fetch all Apple models and variants in ONE single query
  console.log("Fetching DB models and variants for Apple...");
  const dbModels = await prisma.deviceModel.findMany({
    where: { brandId: appleBrand.id },
    include: { variants: true },
  });
  console.log(`Loaded ${dbModels.length} models from DB.`);

  // Build lookup maps for DB models: by slug and by name
  const dbModelBySlug = new Map<string, typeof dbModels[0]>();
  const dbModelByName = new Map<string, typeof dbModels[0]>();
  for (const dm of dbModels) {
    dbModelBySlug.set(dm.slug.toLowerCase(), dm);
    dbModelByName.set(dm.name.toLowerCase(), dm);
  }

  // Collect all variant updates
  const updates: { id: string; basePrice: number; name: string; storage: string }[] = [];

  for (const storeModel of appleModels) {
    const storeVars = storeVariantsByModel.get(storeModel.id) || [];
    if (storeVars.length === 0) continue;

    const sSlug = storeModel.slug.toLowerCase();
    const sName = storeModel.name.toLowerCase();

    const matchedDbModel =
      dbModelBySlug.get(sSlug) ||
      dbModelBySlug.get(sSlug.replace("apple-", "")) ||
      dbModelByName.get(sName) ||
      dbModelByName.get(sName.replace("apple ", ""));

    if (!matchedDbModel) {
      console.log(`[!] Model not found in DB: ${storeModel.name} (${storeModel.slug})`);
      continue;
    }

    for (const sVar of storeVars) {
      const sStorage = sVar.storage.trim().toUpperCase();
      const matchingDbVars = matchedDbModel.variants.filter(
        (dv) => dv.storage.trim().toUpperCase() === sStorage
      );

      for (const targetDbVar of matchingDbVars) {
        if (targetDbVar.basePrice !== sVar.basePrice) {
          updates.push({
            id: targetDbVar.id,
            basePrice: sVar.basePrice,
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
