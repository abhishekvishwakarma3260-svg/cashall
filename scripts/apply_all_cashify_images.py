import json
import re
import os

print("=== Applying Real Cashify Images to Entire Catalog ===")

# 1. Load fresh scraped brand data
with open(r'c:\Users\DELL\OneDrive\Desktop\CashALL\scratch\scraped_cashify_brand_images.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

# 2. Load dataset files
with open('dataset used/real_cashify_images.json', 'r', encoding='utf-8') as f:
    mobile_ds = json.load(f)
with open('dataset used/cashify_laptop_images.json', 'r', encoding='utf-8') as f:
    laptop_ds = json.load(f)
with open('dataset used/cashify_tablet_images.json', 'r', encoding='utf-8') as f:
    tablet_ds = json.load(f)

def clean_key(s):
    s = s.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_]+', '-', s)
    return s.strip('-')

exact_cache = {}

def add_entry(cat, bslug, key, img):
    if not img or 'brand' in img:
        return
    if '?w=' in img:
        img = img.split('?w=')[0] + '?w=800'
    elif not img.endswith('?w=800'):
        img = img + '?w=800'
        
    k_clean = clean_key(key)
    k_raw = key.lower().strip()
    
    exact_cache[(cat, bslug, k_clean)] = img
    exact_cache[(cat, bslug, k_raw)] = img
    exact_cache[(cat, '', k_clean)] = img
    exact_cache[(cat, '', k_raw)] = img

# Datasets
for k, v in mobile_ds.items():
    add_entry('MOBILE', '', k, v)
for k, v in laptop_ds.items():
    add_entry('LAPTOP', '', k, v)
for k, v in tablet_ds.items():
    add_entry('TABLET', '', k, v)

# Scraped brand data
for cat in ['MOBILE', 'LAPTOP', 'TABLET']:
    for bslug, entries in scraped.get(cat, {}).items():
        for k, info in entries.items():
            img = info.get('img')
            name = info.get('name', '')
            add_entry(cat, bslug, k, img)
            if name:
                add_entry(cat, bslug, name, img)
                add_entry(cat, bslug, f"{bslug} {name}", img)

# Brand-specific pools
brand_pools = {}
for (cat, bslug, k), img in exact_cache.items():
    if bslug:
        key = (cat, bslug)
        if key not in brand_pools:
            brand_pools[key] = []
        brand_pools[key].append((k, img))

# Specific overrides for 2026 / latest series to ensure distinct visual fidelity
MANUAL_OVERRIDES = {
    # Apple 18 / 17
    "apple-iphone-18": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ac41123f-6b8f.jpg?w=800",
    "apple-iphone-18-plus": "https://s3ng.cashify.in/cashify/product/img/xhdpi/5c48706b-b04d.jpg?w=800",
    "apple-iphone-18-pro": "https://s3ng.cashify.in/cashify/product/img/xhdpi/4b5acc64-b19f.jpg?w=800",
    "apple-iphone-18-pro-max": "https://s3ng.cashify.in/cashify/product/img/xhdpi/e09d2a73-632e.jpg?w=800",
    "apple-iphone-18-air": "https://s3ng.cashify.in/cashify/product/img/xhdpi/32e3bec8-29f9.jpg?w=800",
    "apple-iphone-17-air": "https://s3ng.cashify.in/cashify/product/img/xhdpi/32e3bec8-29f9.jpg?w=800",
    "apple-iphone-air": "https://s3ng.cashify.in/cashify/product/img/xhdpi/32e3bec8-29f9.jpg?w=800",

    # Samsung S26 / S25 series - distinct colors/models
    "samsung-galaxy-s26-ultra-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/272230cb-1a72.jpg?w=800",
    "samsung-galaxy-s26-plus-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/db22b6b5-ffae.jpg?w=800",
    "samsung-galaxy-s26-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "samsung-galaxy-s25-ultra-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/272230cb-1a72.jpg?w=800",
    "samsung-galaxy-s25-plus-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/db22b6b5-ffae.jpg?w=800",
    "samsung-galaxy-s25-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/3f9fe2b2-6c24.jpg?w=800",
    "samsung-galaxy-s25-slim-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/f332a67a-115f.jpg?w=800",
    "samsung-galaxy-z-fold7-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/32b627cf-45fa.jpg?w=800",
    "samsung-galaxy-z-flip7-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/0958e0a1-77b3.jpg?w=800",
    "samsung-galaxy-a56-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/64bf08ae-1c19.jpg?w=800",
    "samsung-galaxy-a36-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/081bf582-628b.jpg?w=800",
    "samsung-galaxy-m56-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/f52e505a-f10f.jpg?w=800",

    # Google Pixel 11
    "google-pixel-11-pro-fold": "https://s3ng.cashify.in/cashify/product/img/xhdpi/9c00f3f1-db81.jpg?w=800",
    "google-pixel-11-pro-xl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/d24ded37-f3b2.jpg?w=800",
    "google-pixel-11-pro": "https://s3ng.cashify.in/cashify/product/img/xhdpi/e4965665-010e.jpg?w=800",
    "google-pixel-11": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ea3fd555-69a4.jpg?w=800",

    # Apple MacBooks 2025/M4
    "macbook-pro-14-m4-2025": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ff75fa17-180d.jpg?w=800",
    "macbook-pro-14-m4-pro-2025": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ff75fa17-180d.jpg?w=800",
    "macbook-pro-14-m4-max-2025": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ff75fa17-180d.jpg?w=800",
    "macbook-pro-16-m4-pro-2025": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ff75fa17-180d.jpg?w=800",
    "macbook-pro-16-m4-max-2025": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ff75fa17-180d.jpg?w=800",
    "macbook-air-13-m4-2025": "https://s3ng.cashify.in/cashify/product/img/xhdpi/3e4863fe-7dcc.jpg?w=800",
    "macbook-air-15-m4-2025": "https://s3ng.cashify.in/cashify/product/img/xhdpi/3e4863fe-7dcc.jpg?w=800",

    # Apple iPads 2025
    "apple-ipad-pro-11-m4-wi-fi": "https://s3ng.cashify.in/cashify/product/img/xhdpi/57301cf3a2212.jpg?w=800",
    "apple-ipad-pro-13-m4-wi-fi": "https://s3ng.cashify.in/cashify/product/img/xhdpi/57301d77e63c6.jpg?w=800",
    "apple-ipad-air-11-m2-wi-fi": "https://s3ng.cashify.in/cashify/product/img/xhdpi/f0e60602-d7f5.jpg?w=800",
    "apple-ipad-air-13-m2-wi-fi": "https://s3ng.cashify.in/cashify/product/img/xhdpi/6c3cf376-396f.jpg?w=800",
    "apple-ipad-mini-7th-gen": "https://s3ng.cashify.in/cashify/product/img/xhdpi/5730211deb9fe.jpg?w=800",
    "apple-ipad-11th-gen": "https://s3ng.cashify.in/cashify/product/img/xhdpi/788ebf32-1631.jpg?w=800",
}

def resolve_model_image(mid, bslug, name, slug, cur_img):
    # 1. Manual override
    clean_s = clean_key(slug)
    if clean_s in MANUAL_OVERRIDES:
        return MANUAL_OVERRIDES[clean_s]
    clean_without_brand = clean_key(slug.replace(f"{bslug}-", ""))
    if clean_without_brand in MANUAL_OVERRIDES:
        return MANUAL_OVERRIDES[clean_without_brand]

    cat = "LAPTOP" if "-laptop-" in mid or "laptop" in slug else ("TABLET" if "-tablet-" in mid or "tablet" in slug or "ipad" in slug or "tab" in slug else "MOBILE")

    clean_s = slug.replace(f"{bslug}-", "").replace('used-', '')
    clean_n = name.lower().replace(f"{bslug.lower()} ", "")

    candidates = [
        (cat, bslug, clean_key(slug)),
        (cat, bslug, clean_key(clean_s)),
        (cat, bslug, clean_key(name)),
        (cat, bslug, clean_key(clean_n)),
        (cat, '', clean_key(slug)),
        (cat, '', clean_key(clean_s)),
        (cat, '', clean_key(name)),
        (cat, '', clean_key(clean_n)),
    ]

    for c in candidates:
        if c in exact_cache:
            return exact_cache[c]

    # 2. Series / token matching
    pool = brand_pools.get((cat, bslug), [])
    tokens = [t for t in re.split(r'[^a-z0-9]', name.lower()) if len(t) > 2 and t not in [bslug.lower(), 'series', 'edition', 'generation', '5g', '4g', 'wifi']]
    for tok in tokens:
        for pk, pimg in pool:
            if tok in pk:
                return pimg

    # 3. Brand pool fallback
    if pool:
        return pool[0][1]

    return cur_img

# Read lib/store.ts
store_path = r'c:\Users\DELL\OneDrive\Desktop\CashALL\lib\store.ts'
with open(store_path, 'r', encoding='utf-8') as f:
    store_content = f.read()

# Pattern to find and replace model imageUrl
# Look for blocks of:
# {
#   "id": "...",
#   "brandId": "...",
#   "brandSlug": "...",
#   "name": "...",
#   "slug": "...",
#   "imageUrl": "..."
def replace_store_images(content):
    pattern = re.compile(
        r'(\{\s*"id":\s*"([^"]+)",\s*'
        r'"brandId":\s*"([^"]+)",\s*'
        r'"brandSlug":\s*"([^"]+)",\s*'
        r'"name":\s*"([^"]+)",\s*'
        r'"slug":\s*"([^"]+)",\s*'
        r'"imageUrl":\s*")([^"]+)(")'
    )
    
    count = 0
    unique_images = set()

    def replacer(match):
        nonlocal count
        prefix = match.group(1)
        mid = match.group(2)
        bid = match.group(3)
        bslug = match.group(4)
        name = match.group(5)
        slug = match.group(6)
        cur_img = match.group(7)
        suffix = match.group(8)

        new_img = resolve_model_image(mid, bslug, name, slug, cur_img)
        count += 1
        unique_images.add(new_img)
        return f"{prefix}{new_img}{suffix}"

    new_content = pattern.sub(replacer, content)
    print(f"Updated {count} models in store.ts with {len(unique_images)} unique Cashify images!")
    return new_content

new_store_content = replace_store_images(store_content)

with open(store_path, 'w', encoding='utf-8') as f:
    f.write(new_store_content)

print(f"Successfully saved updated {store_path}")

# Also update public/CashALL_Product_Images_Master.json
master_path = r'c:\Users\DELL\OneDrive\Desktop\CashALL\public\CashALL_Product_Images_Master.json'
if os.path.exists(master_path):
    with open(master_path, 'r', encoding='utf-8') as f:
        master_data = json.load(f)
    
    models_list = master_data.get('models', [])
    updated_master_count = 0
    for m in models_list:
        mid = m.get('modelSlug', '')
        bslug = m.get('brandSlug', '')
        name = m.get('modelName', '')
        slug = m.get('modelSlug', '')
        cur_img = m.get('directCdnUrl', '')
        new_img = resolve_model_image(mid, bslug, name, slug, cur_img)
        m['directCdnUrl'] = new_img
        updated_master_count += 1
        
    master_data['models'] = models_list
    with open(master_path, 'w', encoding='utf-8') as f:
        json.dump(master_data, f, indent=2)
    print(f"Updated {updated_master_count} models in {master_path}!")
