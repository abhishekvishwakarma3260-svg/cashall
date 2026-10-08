import json
import re

with open("lib/store.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Let's inspect LATEST_2026_MODELS array in store.ts
latest_models_m = re.search(r"const LATEST_2026_MODELS: DeviceModelData\[\] = (\[[\s\S]*?\]);", code)
if not latest_models_m:
    print("Error: LATEST_2026_MODELS not found in store.ts!")
    exit(1)

models = json.loads(latest_models_m.group(1))
print(f"Total models in LATEST_2026_MODELS: {len(models)}")

# Also inspect all models in store.ts to see if any have csh-
all_models = re.findall(r'\{\s*"id":\s*"(m-[^"]+)",[\s\S]*?"name":\s*"([^"]+)",[\s\S]*?"imageUrl":\s*([^,\n]+)', code)
csh_models = [m for m in all_models if "csh-" in m[2]]
print(f"Total models across store.ts with 'csh-' placeholders: {len(csh_models)}")
