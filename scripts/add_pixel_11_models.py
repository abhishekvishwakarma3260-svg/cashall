import json
import csv
import re
import os

print("=== Adding Google Pixel 11 Series to CashALL Catalog ===")

PIXEL_11_MODELS = [
    {
        "id": "m-google-pixel-11",
        "brandId": "b-google",
        "brandSlug": "google",
        "name": "Google Pixel 11",
        "slug": "google-pixel-11",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pixel9-obsidian.png?w=800",
        "releaseYear": 2026,
        "popular": True,
        "active": True,
        "contactForPrice": False,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 58000},
            {"storage": "256 GB", "basePrice": 66000},
            {"storage": "512 GB", "basePrice": 77000},
        ]
    },
    {
        "id": "m-google-pixel-11-pro",
        "brandId": "b-google",
        "brandSlug": "google",
        "name": "Google Pixel 11 Pro",
        "slug": "google-pixel-11-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pixel9pro-porcelain.png?w=800",
        "releaseYear": 2026,
        "popular": True,
        "active": True,
        "contactForPrice": False,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 82000},
            {"storage": "256 GB", "basePrice": 92000},
            {"storage": "512 GB", "basePrice": 104000},
        ]
    },
    {
        "id": "m-google-pixel-11-pro-xl",
        "brandId": "b-google",
        "brandSlug": "google",
        "name": "Google Pixel 11 Pro XL",
        "slug": "google-pixel-11-pro-xl",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pixel9pro-hazel.png?w=800",
        "releaseYear": 2026,
        "popular": True,
        "active": True,
        "contactForPrice": False,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 96000},
            {"storage": "512 GB", "basePrice": 109000},
            {"storage": "1 TB", "basePrice": 124000},
        ]
    },
    {
        "id": "m-google-pixel-11-pro-fold",
        "brandId": "b-google",
        "brandSlug": "google",
        "name": "Google Pixel 11 Pro Fold",
        "slug": "google-pixel-11-pro-fold",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pixel-fold.png?w=800",
        "releaseYear": 2026,
        "popular": True,
        "active": True,
        "contactForPrice": False,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 114000},
            {"storage": "512 GB", "basePrice": 128000},
            {"storage": "1 TB", "basePrice": 144000},
        ]
    }
]

models_to_add = []
variants_to_add = []

for m in PIXEL_11_MODELS:
    models_to_add.append({
        "id": m["id"],
        "brandId": m["brandId"],
        "brandSlug": m["brandSlug"],
        "name": m["name"],
        "slug": m["slug"],
        "imageUrl": m["imageUrl"],
        "releaseYear": m["releaseYear"],
        "popular": m["popular"],
        "active": m["active"],
        "contactForPrice": m["contactForPrice"],
        "category": m["category"]
    })
    for v in m["variants"]:
        storage_slug = v["storage"].lower().replace(" ", "-")
        variants_to_add.append({
            "id": f"v-{m['id']}-{storage_slug}",
            "modelId": m["id"],
            "storage": v["storage"],
            "basePrice": v["basePrice"],
            "active": True
        })

# 1. Update lib/store.ts
store_path = "lib/store.ts"
with open(store_path, "r", encoding="utf-8") as f:
    store_code = f.read()

# Prepend into LATEST_2026_MODELS if it exists
models_json = json.dumps(models_to_add, indent=2)[1:-1].strip() + ",\n"
variants_json = json.dumps(variants_to_add, indent=2)[1:-1].strip() + ",\n"

if "m-google-pixel-11" not in store_code:
    if "const LATEST_2026_MODELS: DeviceModelData[] = [" in store_code:
        store_code = store_code.replace(
            "const LATEST_2026_MODELS: DeviceModelData[] = [\n",
            "const LATEST_2026_MODELS: DeviceModelData[] = [\n  " + models_json
        )
    if "const LATEST_2026_VARIANTS: DeviceVariantData[] = [" in store_code:
        store_code = store_code.replace(
            "const LATEST_2026_VARIANTS: DeviceVariantData[] = [\n",
            "const LATEST_2026_VARIANTS: DeviceVariantData[] = [\n  " + variants_json
        )
    with open(store_path, "w", encoding="utf-8") as f:
        f.write(store_code)
    print("Successfully added Pixel 11 models & variants to lib/store.ts!")
else:
    print("Pixel 11 already in store.ts!")

# 2. Update lib/series-data.ts
series_path = "lib/series-data.ts"
with open(series_path, "r", encoding="utf-8") as f:
    series_code = f.read()

if "Pixel 11 Series" not in series_code:
    if "google: [" in series_code:
        series_code = series_code.replace(
            "google: [",
            'google: [\n    { id: "s-goo-11", name: "Pixel 11 Series", matchPattern: ["Pixel 11"] },'
        )
    with open(series_path, "w", encoding="utf-8") as f:
        f.write(series_code)
    print("Successfully added Pixel 11 Series to lib/series-data.ts!")

# 3. Update public/CashALL_Product_Images_Master.json
master_json_path = "public/CashALL_Product_Images_Master.json"
if os.path.exists(master_json_path):
    with open(master_json_path, "r", encoding="utf-8") as f:
        master_data = json.load(f)

    existing_slugs = set(m.get("modelSlug") for m in master_data.get("models", []))
    for m in models_to_add:
        if m["slug"] not in existing_slugs:
            master_data["models"].append({
                "category": m["category"],
                "brandName": "Google",
                "brandSlug": m["brandSlug"],
                "modelName": m["name"],
                "modelSlug": m["slug"],
                "directCdnUrl": m["imageUrl"],
                "cashallProxyUrl": f"https://www.cashall.in/api/v1/catalog/image/{m['slug']}"
            })

    master_data["metadata"]["totalModelsWithImages"] = len(master_data["models"])
    with open(master_json_path, "w", encoding="utf-8") as f:
        json.dump(master_data, f, indent=2)
    print("Successfully updated CashALL_Product_Images_Master.json with Pixel 11!")

# 4. Update public/CashALL_All_Products_Catalog.csv
catalog_csv_path = "public/CashALL_All_Products_Catalog.csv"
if os.path.exists(catalog_csv_path):
    with open(catalog_csv_path, "a", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        for m in PIXEL_11_MODELS:
            for v in m["variants"]:
                writer.writerow([
                    "MOBILE",
                    "GOOGLE",
                    m["name"],
                    m["slug"],
                    v["storage"],
                    "N/A",
                    v["basePrice"],
                    "ACTIVE"
                ])
    print("Successfully updated CashALL_All_Products_Catalog.csv with Pixel 11!")

print("All Pixel 11 models added successfully!")
