import json
import re
import os

print("=== Testing Master Catalog Image Alignment ===")

# 1. Load fresh scraped
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

# Build hierarchical lookup dictionaries:
# exact_map: (category, brand, key) -> img_url
# brand_map: (category, brand, key) -> img_url
# global_map: (category, key) -> img_url

exact_cache = {}

def add_entry(cat, bslug, key, img):
    if not img or 'brand' in img:
        return
    # Ensure high-res w=800
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

# Add dataset items
for k, v in mobile_ds.items():
    add_entry('MOBILE', '', k, v)
for k, v in laptop_ds.items():
    add_entry('LAPTOP', '', k, v)
for k, v in tablet_ds.items():
    add_entry('TABLET', '', k, v)

# Add fresh scrape
for cat in ['MOBILE', 'LAPTOP', 'TABLET']:
    for bslug, entries in scraped.get(cat, {}).items():
        for k, info in entries.items():
            img = info.get('img')
            name = info.get('name', '')
            add_entry(cat, bslug, k, img)
            if name:
                add_entry(cat, bslug, name, img)
                add_entry(cat, bslug, f"{bslug} {name}", img)

print(f"Total cache lookup keys created: {len(exact_cache)}")

# Check matching against store.ts
with open('lib/store.ts', 'r', encoding='utf-8') as f:
    store = f.read()

models = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"brandId":\s*"([^"]+)",\s*"brandSlug":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"imageUrl":\s*"([^"]+)"', store)

print(f"Total models in store.ts: {len(models)}")

resolved_count = 0
unique_assigned = set()

for mid, bid, bslug, name, slug, cur_img in models:
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
    
    img = None
    for c in candidates:
        if c in exact_cache:
            img = exact_cache[c]
            break
            
    if img:
        resolved_count += 1
        unique_assigned.add(img)

print(f"Direct match success: {resolved_count} / {len(models)} ({resolved_count*100/len(models):.1f}%)")
print(f"Unique images that will be assigned: {len(unique_assigned)}")
