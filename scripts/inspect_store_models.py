import re

with open(r'c:\Users\DELL\OneDrive\Desktop\CashALL\lib\store.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all arrays of models
arrays = re.findall(r'(const\s+([A-Z0-9_]+)\s*:\s*DeviceModelData\[\])', content)
print("Model arrays found:")
for full, name in arrays:
    print(f" - {name}")

# Also check INITIAL_MODELS definition
initial_models_match = re.search(r'export const INITIAL_MODELS\s*=\s*([^;]+);', content)
if initial_models_match:
    print(f"\nINITIAL_MODELS = {initial_models_match.group(1).strip()}")

# Let's count total models
model_ids = re.findall(r'"id":\s*"(m-[^"]+|l-[^"]+|t-[^"]+)"', content)
print(f"\nTotal models by id regex: {len(model_ids)}")

# Check brands
brand_slugs = set(re.findall(r'"brandSlug":\s*"([^"]+)"', content))
print(f"\nBrand slugs in models: {sorted(list(brand_slugs))}")
