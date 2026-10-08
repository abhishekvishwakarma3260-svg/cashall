import json
import re
import urllib.request

with open("lib/store.ts", "r", encoding="utf-8") as f:
    code = f.read()

hp_models = re.findall(r'\{\s*"id":\s*"(m-laptop-hp-[^"]+)",[\s\S]*?"name":\s*"([^"]+)",[\s\S]*?"imageUrl":\s*([^,\n]+)', code)
print(f"Total existing HP laptop models: {len(hp_models)}")

for m_id, name, img in hp_models[:10]:
    url = img.strip().strip('"')
    print(name, "->", url)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        res = urllib.request.urlopen(req, timeout=3)
        print("   Status:", res.status)
    except Exception as e:
        print("   FAILED:", e)
