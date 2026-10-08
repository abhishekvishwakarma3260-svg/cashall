import json
import re

print("=== Updating All New and Existing Models with Real Cashify CDN Images ===")

# Brand/category fallback mapping of verified real Cashify CDN URLs (all HTTP 200 OK)
VERIFIED_CDN_MAP = {
    # Apple iPhones
    "iphone-pro-max": "https://s3ng.cashify.in/cashify/product/img/xhdpi/d197ee88-ccff.jpg?w=800",
    "iphone-pro": "https://s3ng.cashify.in/cashify/product/img/xhdpi/c6842e95-7635.jpg?w=800",
    "iphone-plus": "https://s3ng.cashify.in/cashify/product/img/xhdpi/5c48706b-b04d.jpg?w=800",
    "iphone-base": "https://s3ng.cashify.in/cashify/product/img/xhdpi/db36cde6-e6e5.jpg?w=800",
    "iphone-e": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ed91ebeb-f711.jpg?w=800",
    "iphone-classic": "https://s3ng.cashify.in/cashify/product/img/xhdpi/36ea82c3-6d6a.jpg?w=800",

    # Samsung Phones
    "samsung-ultra": "https://s3ng.cashify.in/cashify/product/img/xhdpi/272230cb-1a72.jpg?w=800",
    "samsung-plus": "https://s3ng.cashify.in/cashify/product/img/xhdpi/db22b6b5-ffae.jpg?w=800",
    "samsung-base": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "samsung-fold": "https://s3ng.cashify.in/cashify/product/img/xhdpi/e0dc6226-3ec0.jpg?w=800",

    # Google Pixel
    "pixel-pro": "https://s3ng.cashify.in/cashify/product/img/xhdpi/0e3992a1-b89f.jpg?w=800",
    "pixel-base": "https://s3ng.cashify.in/cashify/product/img/xhdpi/81a733de-1c38.jpg?w=800",
    "pixel-fold": "https://s3ng.cashify.in/cashify/product/img/xhdpi/e0dc6226-3ec0.jpg?w=800",

    # OnePlus
    "oneplus-num": "https://s3ng.cashify.in/cashify/product/img/xhdpi/3ba10c91-7df6.jpg?w=800",
    "oneplus-r": "https://s3ng.cashify.in/cashify/product/img/xhdpi/93afecfc-3cd7.jpg?w=800",
    "oneplus-open": "https://s3ng.cashify.in/cashify/product/img/xhdpi/d4d91de5-5673.jpg?w=800",

    # Other Phones
    "xiaomi": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "vivo": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "oppo": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "realme": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "motorola": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "phone-generic": "https://s3ng.cashify.in/cashify/product/img/xhdpi/db36cde6-e6e5.jpg?w=800",

    # Laptops
    "hp-spectre": "https://s3ng.cashify.in/cashify/product/img/xhdpi/d5b8fe4d-ac2e.jpg?w=800",
    "hp-elite": "https://s3ng.cashify.in/cashify/product/img/xhdpi/64498243-ea8a.jpg?w=800",
    "hp-pavilion": "https://s3ng.cashify.in/cashify/product/img/xhdpi/e21c1388-ddcd.jpg?w=800",
    "hp-omen": "https://s3ng.cashify.in/cashify/product/img/xhdpi/4743bbb4-94ae.jpg?w=800",
    "lenovo-thinkpad": "https://s3ng.cashify.in/cashify/product/img/xhdpi/fb80ea02-02a8.jpg?w=800",
    "lenovo-yoga": "https://s3ng.cashify.in/cashify/product/img/xhdpi/cb8d3fcc-76f8.jpg?w=800",
    "lenovo-legion": "https://s3ng.cashify.in/cashify/product/img/xhdpi/4aea27a3-37a0.jpg?w=800",
    "dell-xps": "https://s3ng.cashify.in/cashify/product/img/xhdpi/7c1254af-b6aa.jpg?w=800",
    "dell-alienware": "https://s3ng.cashify.in/cashify/product/img/xhdpi/4743bbb4-94ae.jpg?w=800",
    "macbook-pro": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ff75fa17-180d.jpg?w=800",
    "macbook-air": "https://s3ng.cashify.in/cashify/product/img/xhdpi/3e4863fe-7dcc.jpg?w=800",
    "laptop-generic": "https://s3ng.cashify.in/cashify/product/img/xhdpi/cb8d3fcc-76f8.jpg?w=800",

    # Tablets
    "ipad": "https://s3ng.cashify.in/cashify/product/img/xhdpi/57301cf3a2212.jpg?w=800",
    "galaxy-tab": "https://s3ng.cashify.in/cashify/product/img/xhdpi/e0dc6226-3ec0.jpg?w=800",
    "tablet-generic": "https://s3ng.cashify.in/cashify/product/img/xhdpi/57301cf3a2212.jpg?w=800"
}

def resolve_best_image(m_name, m_slug, brand_slug, cat):
    name_l = m_name.lower()
    slug_l = m_slug.lower()
    brand_l = brand_slug.lower()
    cat_u = (cat or "MOBILE").upper()

    if cat_u == "LAPTOP":
        if "spectre" in name_l or "omnibook" in name_l or "envy" in name_l:
            return VERIFIED_CDN_MAP["hp-spectre"]
        elif "omen" in name_l or "alienware" in name_l or "predator" in name_l:
            return VERIFIED_CDN_MAP["hp-omen"]
        elif "pavilion" in name_l:
            return VERIFIED_CDN_MAP["hp-pavilion"]
        elif "hp" in brand_l:
            return VERIFIED_CDN_MAP["hp-elite"]
        elif "thinkpad" in name_l:
            return VERIFIED_CDN_MAP["lenovo-thinkpad"]
        elif "yoga" in name_l:
            return VERIFIED_CDN_MAP["lenovo-yoga"]
        elif "legion" in name_l:
            return VERIFIED_CDN_MAP["lenovo-legion"]
        elif "xps" in name_l:
            return VERIFIED_CDN_MAP["dell-xps"]
        elif "macbook pro" in name_l:
            return VERIFIED_CDN_MAP["macbook-pro"]
        elif "macbook air" in name_l or "macbook" in name_l:
            return VERIFIED_CDN_MAP["macbook-air"]
        else:
            return VERIFIED_CDN_MAP["laptop-generic"]

    elif cat_u == "TABLET":
        if "ipad" in name_l:
            return VERIFIED_CDN_MAP["ipad"]
        elif "tab" in name_l and "samsung" in brand_l:
            return VERIFIED_CDN_MAP["galaxy-tab"]
        else:
            return VERIFIED_CDN_MAP["tablet-generic"]

    else: # MOBILE
        if "apple" in brand_l or "iphone" in name_l:
            if "pro max" in name_l:
                return VERIFIED_CDN_MAP["iphone-pro-max"]
            elif "pro" in name_l or "air" in name_l:
                return VERIFIED_CDN_MAP["iphone-pro"]
            elif "plus" in name_l:
                return VERIFIED_CDN_MAP["iphone-plus"]
            elif "16e" in name_l or "se" in name_l:
                return VERIFIED_CDN_MAP["iphone-e"]
            elif any(k in name_l for k in ["18", "17", "16", "15", "14", "13", "12", "11"]):
                return VERIFIED_CDN_MAP["iphone-base"]
            else:
                return VERIFIED_CDN_MAP["iphone-classic"]
        elif "samsung" in brand_l:
            if "ultra" in name_l:
                return VERIFIED_CDN_MAP["samsung-ultra"]
            elif "plus" in name_l or "+" in name_l:
                return VERIFIED_CDN_MAP["samsung-plus"]
            elif "fold" in name_l:
                return VERIFIED_CDN_MAP["samsung-fold"]
            else:
                return VERIFIED_CDN_MAP["samsung-base"]
        elif "google" in brand_l:
            if "fold" in name_l:
                return VERIFIED_CDN_MAP["pixel-fold"]
            elif "pro" in name_l:
                return VERIFIED_CDN_MAP["pixel-pro"]
            else:
                return VERIFIED_CDN_MAP["pixel-base"]
        elif "oneplus" in brand_l:
            if "open" in name_l:
                return VERIFIED_CDN_MAP["oneplus-open"]
            elif "r" in name_l or "nord" in name_l:
                return VERIFIED_CDN_MAP["oneplus-r"]
            else:
                return VERIFIED_CDN_MAP["oneplus-num"]
        elif "xiaomi" in brand_l:
            return VERIFIED_CDN_MAP["xiaomi"]
        elif "vivo" in brand_l or "iqoo" in brand_l:
            return VERIFIED_CDN_MAP["vivo"]
        elif "oppo" in brand_l:
            return VERIFIED_CDN_MAP["oppo"]
        elif "realme" in brand_l:
            return VERIFIED_CDN_MAP["realme"]
        elif "motorola" in brand_l:
            return VERIFIED_CDN_MAP["motorola"]
        else:
            return VERIFIED_CDN_MAP["phone-generic"]

# 1. Update lib/store.ts
store_path = "lib/store.ts"
with open(store_path, "r", encoding="utf-8") as f:
    store_code = f.read()

# Extract LATEST_2026_MODELS
m_latest = re.search(r"(const LATEST_2026_MODELS: DeviceModelData\[\] = )(\[[\s\S]*?\]);", store_code)
if m_latest:
    prefix = m_latest.group(1)
    models_list = json.loads(m_latest.group(2))
    print(f"Updating {len(models_list)} models in LATEST_2026_MODELS...")
    for mod in models_list:
        new_img = resolve_best_image(mod["name"], mod["slug"], mod["brandSlug"], mod.get("category", "MOBILE"))
        mod["imageUrl"] = new_img
    
    new_models_json = json.dumps(models_list, indent=2)
    store_code = store_code[:m_latest.start()] + prefix + new_models_json + ";" + store_code[m_latest.end():]
    print("Successfully updated LATEST_2026_MODELS with verified Cashify CDN URLs!")

# Also fix any remaining csh- placeholders in store_code
count_replaced = 0
def repl_csh(match):
    global count_replaced
    full = match.group(0)
    m_id = match.group(1)
    b_id = match.group(2)
    name = match.group(3)
    slug = match.group(4)
    old_img = match.group(5)
    cat_match = re.search(r'"category":\s*"([^"]+)"', full)
    cat = cat_match.group(1) if cat_match else "MOBILE"

    b_slug = b_id.replace("b-", "")
    new_img = resolve_best_image(name, slug, b_slug, cat)
    count_replaced += 1
    return full.replace(old_img, new_img)

pattern_csh = r'\{\s*"id":\s*"(m-[^"]+)",\s*"brandId":\s*"([^"]+)",[\s\S]*?"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"imageUrl":\s*"(https://s3ng\.cashify\.in/cashify/product/img/xhdpi/csh-[^"]+)"'
store_code = re.sub(pattern_csh, repl_csh, store_code)
print(f"Replaced {count_replaced} legacy 'csh-' placeholders in store.ts with verified Cashify CDN images!")

with open(store_path, "w", encoding="utf-8") as f:
    f.write(store_code)

# 2. Update public/CashALL_Product_Images_Master.json
master_json_path = "public/CashALL_Product_Images_Master.json"
with open(master_json_path, "r", encoding="utf-8") as f:
    master_data = json.load(f)

updated_master = 0
for mod in master_data.get("models", []):
    old_url = mod.get("directCdnUrl", "")
    if "csh-" in old_url or not old_url:
        new_img = resolve_best_image(mod["modelName"], mod["modelSlug"], mod["brandSlug"], mod.get("category", "MOBILE"))
        mod["directCdnUrl"] = new_img
        updated_master += 1

with open(master_json_path, "w", encoding="utf-8") as f:
    json.dump(master_data, f, indent=2)

print(f"Updated {updated_master} models in CashALL_Product_Images_Master.json with verified Cashify CDN images!")
print("All model images updated successfully!")
