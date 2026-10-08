import json
import re

with open('dataset used/real_cashify_images.json', 'r', encoding='utf-8') as f:
    mobile_imgs = json.load(f)
with open('dataset used/cashify_laptop_images.json', 'r', encoding='utf-8') as f:
    laptop_imgs = json.load(f)
with open('dataset used/cashify_tablet_images.json', 'r', encoding='utf-8') as f:
    tablet_imgs = json.load(f)

# Combined dict normalized
all_imgs = {}
for d in [mobile_imgs, laptop_imgs, tablet_imgs]:
    for k, v in d.items():
        all_imgs[k.lower().strip()] = v
        # strip 'used-'
        if k.lower().startswith('used-'):
            all_imgs[k.lower().replace('used-', '').strip()] = v

with open('lib/store.ts', 'r', encoding='utf-8') as f:
    store = f.read()

models = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"brandId":\s*"([^"]+)",\s*"brandSlug":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"imageUrl":\s*"([^"]+)"', store)

matched = 0
unmatched = []

for mid, bid, bslug, name, slug, cur_img in models:
    # check slug, name, etc.
    candidates = [
        slug.lower(),
        f"used-{slug.lower()}",
        name.lower(),
        f"{bslug.lower()}-{slug.lower()}",
        slug.lower().replace(f"{bslug.lower()}-", ""),
        name.lower().replace(f"{bslug.lower()} ", "")
    ]
    found = None
    for c in candidates:
        if c in all_imgs:
            found = all_imgs[c]
            break
    if found:
        matched += 1
    else:
        unmatched.append((mid, bslug, name, slug))

print(f"Total models in store.ts: {len(models)}")
print(f"Directly matched from existing datasets: {matched} ({matched*100/len(models):.1f}%)")
print(f"Unmatched: {len(unmatched)}")
print("\nSample unmatched (first 25):")
for u in unmatched[:25]:
    print(f"  {u[1]} | {u[2]} | {u[3]}")
