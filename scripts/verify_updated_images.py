import re
import urllib.request

with open("lib/store.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Check iPhone 18 images in store.ts
iphone_check = ["apple-iphone-18", "apple-iphone-18-pro", "apple-iphone-18-pro-max", "apple-iphone-17", "apple-iphone-16e"]
for slug in iphone_check:
    m = re.search(r'\{\s*"id":\s*"m-apple-' + slug + r'",[\s\S]*?"imageUrl":\s*"([^"]+)"', code)
    if m:
        img_url = m.group(1)
        try:
            res = urllib.request.urlopen(img_url, timeout=5)
            print(f"PASS {slug}: {res.status} ({img_url})")
        except Exception as e:
            print(f"FAIL {slug}: {e}")

# Check HP laptop images in store.ts
hp_check = ["hp-omnibook-x-ai-series", "hp-spectre-x360-14-2025", "hp-omen-transcend-14-2025", "hp-pavilion-plus-14-ai"]
for slug in hp_check:
    m = re.search(r'\{\s*"id":\s*"m-hp-' + slug + r'",[\s\S]*?"imageUrl":\s*"([^"]+)"', code)
    if m:
        img_url = m.group(1)
        try:
            res = urllib.request.urlopen(img_url, timeout=5)
            print(f"PASS {slug}: {res.status} ({img_url})")
        except Exception as e:
            print(f"FAIL {slug}: {e}")
