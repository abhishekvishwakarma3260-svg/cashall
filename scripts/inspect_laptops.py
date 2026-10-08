import json
import re

with open("lib/store.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Search for all models with category: "LAPTOP" or brandId starting with b-hp or b-lenovo
models = re.findall(r'\{\s*"id":\s*"(m-[^"]+)",\s*"brandId":\s*"([^"]+)",[\s\S]*?"name":\s*"([^"]+)",[\s\S]*?"imageUrl":\s*([^,\n]+)', code)
print(f"Total model matches: {len(models)}")

hp_laptop_models = [m for m in models if "hp" in m[1].lower()]
print(f"Total HP laptop models found: {len(hp_laptop_models)}")
for m in hp_laptop_models[:15]:
    print(" ", m)

lenovo_laptop_models = [m for m in models if "lenovo" in m[1].lower()]
print(f"Total Lenovo laptop models found: {len(lenovo_laptop_models)}")
for m in lenovo_laptop_models[:5]:
    print(" ", m)
