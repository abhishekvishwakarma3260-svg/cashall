import json
import re

with open(r'c:\Users\DELL\OneDrive\Desktop\CashALL\scratch\scraped_cashify_brand_images.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

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

for k, v in mobile_ds.items():
    add_entry('MOBILE', '', k, v)
for k, v in laptop_ds.items():
    add_entry('LAPTOP', '', k, v)
for k, v in tablet_ds.items():
    add_entry('TABLET', '', k, v)

for cat in ['MOBILE', 'LAPTOP', 'TABLET']:
    for bslug, entries in scraped.get(cat, {}).items():
        for k, info in entries.items():
            img = info.get('img')
            name = info.get('name', '')
            add_entry(cat, bslug, k, img)
            if name:
                add_entry(cat, bslug, name, img)
                add_entry(cat, bslug, f"{bslug} {name}", img)

with open('lib/store.ts', 'r', encoding='utf-8') as f:
    store = f.read()

models = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"brandId":\s*"([^"]+)",\s*"brandSlug":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"imageUrl":\s*"([^"]+)"', store)

resolved_exact = 0
resolved_series = 0
resolved_brand = 0
unique_imgs = set()

# Collect brand-specific series image pools
brand_pools = {}
for (cat, bslug, k), img in exact_cache.items():
    if bslug:
        key = (cat, bslug)
        if key not in brand_pools:
            brand_pools[key] = []
        brand_pools[key].append((k, img))

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
            resolved_exact += 1
            break
            
    if not img:
        # Series match within the same brand and category
        pool = brand_pools.get((cat, bslug), [])
        # Extract keywords from name (e.g., 'ultra', 'plus', 'pro', 'fold', 'flip', 'thinkpad', 'spectre')
        tokens = [t for t in re.split(r'[^a-z0-9]', name.lower()) if len(t) > 2 and t not in [bslug.lower(), 'series', 'edition', 'generation', '5g', '4g', 'wifi']]
        for tok in tokens:
            for pk, pimg in pool:
                if tok in pk:
                    img = pimg
                    resolved_series += 1
                    break
            if img:
                break
                
    if not img:
        # Brand fallback from within the same brand pool
        pool = brand_pools.get((cat, bslug), [])
        if pool:
            img = pool[0][1]
            resolved_brand += 1
        else:
            img = cur_img
            
    unique_imgs.add(img)

print(f"Total models: {len(models)}")
print(f"Exact matched: {resolved_exact}")
print(f"Series matched: {resolved_series}")
print(f"Brand fallback matched: {resolved_brand}")
print(f"Total unique images used across the catalog: {len(unique_imgs)}")
