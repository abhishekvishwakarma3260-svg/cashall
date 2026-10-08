import json
import csv
import re
import os

print("=== Adjusting 2025/2026 Catalog: Exact +1% Over Base Cashify Valuation ===")

store_path = "lib/store.ts"
with open(store_path, "r", encoding="utf-8") as f:
    store_code = f.read()

# 1. Update header comment
store_code = store_code.replace(
    "// Mobiles, Laptops, and Tablets (+5% Increased Final Prices)",
    "// Mobiles, Laptops, and Tablets (Base Cashify/Cashkr Valuation +1% Real Pricing, Customer Display: Up to +5% Benefit)"
)

# 2. Extract LATEST_2026_VARIANTS
m = re.search(r"(const LATEST_2026_VARIANTS: DeviceVariantData\[\] = )(\[[\s\S]*?\]);", store_code)
if not m:
    print("Error: LATEST_2026_VARIANTS not found in store.ts!")
    exit(1)

prefix = m.group(1)
variants_json_str = m.group(2)
variants = json.loads(variants_json_str)

print(f"Loaded {len(variants)} variants from LATEST_2026_VARIANTS.")

# Recalculate each basePrice from 1.05 -> 1.01
# Cashify_base = round(basePrice / 1.05)
# Actual_price_plus_1_percent = round(Cashify_base * 1.01)
updated_variants = []
for v in variants:
    old_price = v["basePrice"]
    cashify_base = round(old_price / 1.05)
    new_price_1pct = round(cashify_base * 1.01)
    
    # Clean rounding to nearest 10 or 50 if appropriate, or exact +1%
    v_updated = dict(v)
    v_updated["basePrice"] = new_price_1pct
    updated_variants.append(v_updated)

print(f"Sample adjusted pricing:")
for i in range(min(5, len(updated_variants))):
    old_p = variants[i]["basePrice"]
    new_p = updated_variants[i]["basePrice"]
    print(f"  {updated_variants[i]['id']}: Old (+5%) = Rs.{old_p:,} -> New (+1% Cashify) = Rs.{new_p:,}")


new_variants_json_str = json.dumps(updated_variants, indent=2)

# Replace in store_code
store_code = store_code[:m.start()] + prefix + new_variants_json_str + ";" + store_code[m.end():]

with open(store_path, "w", encoding="utf-8") as f:
    f.write(store_code)

print("Successfully updated lib/store.ts with exact +1% pricing for all latest 2026 variants!")

# 3. Update public/CashALL_All_Products_Catalog.csv
catalog_csv_path = "public/CashALL_All_Products_Catalog.csv"
if os.path.exists(catalog_csv_path):
    # Read all rows
    with open(catalog_csv_path, "r", encoding="utf-8") as f:
        reader = list(csv.reader(f))
    
    variant_price_map = {v["id"]: v["basePrice"] for v in updated_variants}
    # Also model slug + storage mapping
    model_storage_price_map = {}
    for v in updated_variants:
        m_id = v["modelId"]
        storage = v["storage"]
        model_storage_price_map[(m_id, storage)] = v["basePrice"]

    updated_rows = []
    updated_count = 0
    for row in reader:
        if len(row) >= 7:
            cat, brand, model_name, slug, storage, ram, price_str, *rest = row
            # Check if this model is one of the latest models
            m_id = f"m-{brand.lower()}-{slug}"
            if (m_id, storage) in model_storage_price_map:
                row[6] = str(model_storage_price_map[(m_id, storage)])
                updated_count += 1
            else:
                # Try generic matching
                for (k_mid, k_stor), k_price in model_storage_price_map.items():
                    if slug in k_mid and storage == k_stor:
                        row[6] = str(k_price)
                        updated_count += 1
                        break
        updated_rows.append(row)

    with open(catalog_csv_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerows(updated_rows)
    print(f"Updated {updated_count} rows in CashALL_All_Products_Catalog.csv with +1% pricing!")

print("All pricing adjustments completed successfully!")
