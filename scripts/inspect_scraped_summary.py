import json

with open(r'c:\Users\DELL\OneDrive\Desktop\CashALL\scratch\scraped_cashify_brand_images.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

total_entries = 0
all_images = set()

for cat in ['MOBILE', 'LAPTOP', 'TABLET']:
    brands = scraped.get(cat, {})
    cat_imgs = set()
    for bslug, entries in brands.items():
        for k, v in entries.items():
            total_entries += 1
            img = v.get('img')
            if img:
                all_images.add(img)
                cat_imgs.add(img)
    print(f"{cat}: {len(brands)} brands, {len(cat_imgs)} unique image URLs")

print(f"\nTotal scraped entries: {total_entries}")
print(f"Total unique images freshly scraped: {len(all_images)}")

# Check Apple and Samsung models specifically
print("\nSample Apple Mobile Scraped:")
apple_mobile = scraped['MOBILE'].get('apple', {})
for k in list(apple_mobile.keys())[:15]:
    if isinstance(apple_mobile[k], dict):
        print(f"  {k} -> {apple_mobile[k].get('name')} | {apple_mobile[k].get('img')}")

print("\nSample Samsung Mobile Scraped:")
samsung_mobile = scraped['MOBILE'].get('samsung', {})
for k in list(samsung_mobile.keys())[:15]:
    if isinstance(samsung_mobile[k], dict):
        print(f"  {k} -> {samsung_mobile[k].get('name')} | {samsung_mobile[k].get('img')}")
