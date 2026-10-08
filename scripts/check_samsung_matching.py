import json
import re

with open(r'c:\Users\DELL\OneDrive\Desktop\CashALL\scratch\scraped_cashify_brand_images.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

with open('dataset used/real_cashify_images.json', 'r', encoding='utf-8') as f:
    real = json.load(f)

with open('lib/store.ts', 'r', encoding='utf-8') as f:
    store = f.read()

samsung_models = re.findall(r'\{\s*"id":\s*"(m-samsung-[^"]+)",\s*"brandId":\s*"b-samsung",\s*"brandSlug":\s*"samsung",\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"imageUrl":\s*"([^"]+)"', store)

print(f"Total Samsung models in store.ts: {len(samsung_models)}")

samsung_scraped = scraped['MOBILE'].get('samsung', {})

matched = 0
unmatched = []

for mid, name, slug, cur_img in samsung_models:
    img = None
    clean_s = slug.replace('samsung-', '').replace('used-', '')
    for cand in [slug, f"used-{slug}", clean_s, f"used-{clean_s}", name.lower()]:
        if cand in samsung_scraped and samsung_scraped[cand].get('img'):
            img = samsung_scraped[cand]['img']
            break
    if not img:
        for cand in [slug, f"used-{slug}", clean_s, f"used-{clean_s}", name.lower()]:
            if cand in real and real[cand]:
                img = real[cand]
                break
    if img:
        matched += 1
    else:
        unmatched.append((name, slug))

print(f"Matched: {matched}/{len(samsung_models)}")
print(f"Unmatched: {len(unmatched)}")
print("Sample unmatched:", unmatched[:15])
