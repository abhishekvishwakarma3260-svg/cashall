import json
import re
import urllib.request

with open("lib/store.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Let's check HP laptop models in store.ts
hp_models = re.findall(r'\{\s*"id":\s*"(m-hp-[^"]+)",[\s\S]*?"name":\s*"([^"]+)",[\s\S]*?"imageUrl":\s*([^,\n]+)', code)
print(f"Total HP laptop models matched: {len(hp_models)}")
for m in hp_models[:10]:
    print("  HP model:", m)

# Let's check iPhone 18 imageUrl in store.ts
iphone18_m = re.search(r'\{\s*"id":\s*"m-apple-apple-iphone-18",[\s\S]*?"imageUrl":\s*([^,\n]+)', code)
if iphone18_m:
    print("iPhone 18 imageUrl:", iphone18_m.group(1))
    test_url = iphone18_m.group(1).strip('"')
    try:
        req = urllib.request.Request(test_url, headers={"User-Agent": "Mozilla/5.0"})
        res = urllib.request.urlopen(req, timeout=5)
        print("iPhone 18 URL response status:", res.status)
    except Exception as e:
        print("iPhone 18 URL failed:", e)

# Let's check CashALL_Product_Images_Master.json for laptop images
with open("public/CashALL_Product_Images_Master.json", "r", encoding="utf-8") as f:
    master = json.load(f)

laptop_master = [m for m in master.get("models", []) if m.get("category") == "LAPTOP"]
print(f"Total laptop models in CashALL_Product_Images_Master.json: {len(laptop_master)}")
if laptop_master:
    print("Sample master laptop:", laptop_master[0])
