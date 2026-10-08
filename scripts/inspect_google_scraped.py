import json

with open(r'c:\Users\DELL\OneDrive\Desktop\CashALL\scratch\scraped_cashify_brand_images.json', 'r', encoding='utf-8') as f:
    scraped = json.load(f)

for b in ['google', 'asus', 'honor', 'samsung']:
    entries = scraped['MOBILE'].get(b, {})
    print(f"\n=== Brand {b} ({len(entries)} entries) ===")
    for k in list(entries.keys())[:10]:
        print(f"  {k} -> {entries[k]['name']} : {entries[k]['img']}")
