import json
import re

with open(r'c:\Users\DELL\OneDrive\Desktop\CashALL\scratch\scraped_cashify_brand_images.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

with open('dataset used/real_cashify_images.json', 'r', encoding='utf-8') as f:
    real = json.load(f)

with open('lib/store.ts', 'r', encoding='utf-8') as f:
    store = f.read()

apple_models = re.findall(r'\{\s*"id":\s*"(m-apple-[^"]+)",\s*"brandId":\s*"b-apple",\s*"brandSlug":\s*"apple",\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"imageUrl":\s*"([^"]+)"', store)

print(f"Total Apple models in store.ts: {len(apple_models)}")

# Build lookup
apple_scraped = scraped['MOBILE'].get('apple', {})

for mid, name, slug, cur_img in apple_models:
    img = None
    # 1. Scraped direct
    clean_s = slug.replace('apple-', '').replace('used-', '')
    for cand in [slug, f"used-{slug}", clean_s, f"used-{clean_s}", name.lower()]:
        if cand in apple_scraped and apple_scraped[cand].get('img'):
            img = apple_scraped[cand]['img']
            break
    # 2. Real dataset
    if not img:
        for cand in [slug, f"used-{slug}", clean_s, f"used-{clean_s}", name.lower()]:
            if cand in real and real[cand]:
                img = real[cand]
                break
    print(f"  {name} ({slug}) -> {img}")
