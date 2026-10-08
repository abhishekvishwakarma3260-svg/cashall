import json
import re

# Load scraped
with open(r'c:\Users\DELL\OneDrive\Desktop\CashALL\scratch\scraped_cashify_brand_images.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

# Load datasets
with open('dataset used/real_cashify_images.json', 'r', encoding='utf-8') as f:
    mobile_ds = json.load(f)
with open('dataset used/cashify_laptop_images.json', 'r', encoding='utf-8') as f:
    laptop_ds = json.load(f)
with open('dataset used/cashify_tablet_images.json', 'r', encoding='utf-8') as f:
    tablet_ds = json.load(f)

# Build a comprehensive lookup map per category and global
# keys will be normalized: slug, clean_slug, name, brand+name, etc.
cat_maps = {
    'MOBILE': {},
    'LAPTOP': {},
    'TABLET': {}
}

def clean_key(s):
    s = s.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_]+', '-', s)
    return s.strip('-')

# 1. Seed from dataset files first
for k, v in mobile_ds.items():
    if v and 'builder' not in v:
        cat_maps['MOBILE'][clean_key(k)] = v
        cat_maps['MOBILE'][k.lower().strip()] = v

for k, v in laptop_ds.items():
    if v and 'builder' not in v:
        cat_maps['LAPTOP'][clean_key(k)] = v
        cat_maps['LAPTOP'][k.lower().strip()] = v

for k, v in tablet_ds.items():
    if v and 'builder' not in v:
        cat_maps['TABLET'][clean_key(k)] = v
        cat_maps['TABLET'][k.lower().strip()] = v

# 2. Overwrite / enrich with fresh live scrape
for cat in ['MOBILE', 'LAPTOP', 'TABLET']:
    for bslug, entries in scraped.get(cat, {}).items():
        for k, info in entries.items():
            img = info.get('img')
            if not img or 'brand' in img:
                continue
            cat_maps[cat][clean_key(k)] = img
            cat_maps[cat][k.lower().strip()] = img
            name = info.get('name')
            if name:
                cat_maps[cat][clean_key(name)] = img
                cat_maps[cat][name.lower().strip()] = img
                cat_maps[cat][clean_key(f"{bslug} {name}")] = img

print(f"Total keys in MOBILE map: {len(cat_maps['MOBILE'])}")
print(f"Total keys in LAPTOP map: {len(cat_maps['LAPTOP'])}")
print(f"Total keys in TABLET map: {len(cat_maps['TABLET'])}")

# Check matching against store.ts models
with open('lib/store.ts', 'r', encoding='utf-8') as f:
    store = f.read()

models = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"brandId":\s*"([^"]+)",\s*"brandSlug":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"imageUrl":\s*"([^"]+)"', store)

print(f"\nEvaluating match on {len(models)} models from store.ts...")

matched = 0
unmatched = []

for mid, bid, bslug, name, slug, cur_img in models:
    cat = "LAPTOP" if "-laptop-" in mid or "laptop" in slug else ("TABLET" if "-tablet-" in mid or "tablet" in slug or "ipad" in slug or "tab" in slug else "MOBILE")
    m_map = cat_maps[cat]
    
    candidates = [
        clean_key(slug),
        clean_key(slug.replace('used-', '')),
        clean_key(name),
        clean_key(f"{bslug}-{slug}"),
        clean_key(f"{bslug} {name}"),
        clean_key(name.replace(f"{bslug} ", "")),
        clean_key(slug.replace(f"{bslug}-", ""))
    ]
    
    found = None
    for cand in candidates:
        if cand in m_map:
            found = m_map[cand]
            break
            
    if not found:
        # Check cross-category or without prefixes
        for cand in candidates:
            if cand in cat_maps['MOBILE']:
                found = cat_maps['MOBILE'][cand]
                break
            elif cand in cat_maps['LAPTOP']:
                found = cat_maps['LAPTOP'][cand]
                break
            elif cand in cat_maps['TABLET']:
                found = cat_maps['TABLET'][cand]
                break
                
    if found:
        matched += 1
    else:
        unmatched.append((cat, bslug, name, slug))

print(f"Matched models: {matched} / {len(models)} ({matched*100/len(models):.1f}%)")
print(f"Unmatched: {len(unmatched)}")
if unmatched:
    print("\nSample 20 unmatched:")
    for u in unmatched[:20]:
        print(f"  [{u[0]}] {u[1]} | {u[2]} | {u[3]}")
