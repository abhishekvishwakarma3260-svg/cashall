import json
import re

with open("lib/store.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Let's inspect LATEST_2026_VARIANTS
latest_variants_m = re.search(r"const LATEST_2026_VARIANTS: DeviceVariantData\[\] = (\[.*?\]);", content, re.DOTALL)
if latest_variants_m:
    latest_variants = json.loads(latest_variants_m.group(1))
    print(f"Found {len(latest_variants)} variants in LATEST_2026_VARIANTS.")
    print("Sample latest variants:", latest_variants[:5])

# Let's check other variant arrays in store.ts
var_part_names = re.findall(r"const (MOBILE_VARIANTS_PART_\d+|LAPTOP_VARIANTS_PART_\d+|TABLET_VARIANTS_PART_\d+):", content)
print("Variant parts found in store.ts:", var_part_names[:10])

# Sample a few from MOBILE_VARIANTS_PART_1
part1_m = re.search(r"const (MOBILE_VARIANTS_PART_1|LAPTOP_VARIANTS_PART_1|TABLET_VARIANTS_PART_1): DeviceVariantData\[\] = (\[.*?\]);", content, re.DOTALL)
if part1_m:
    part1_sample = json.loads(part1_m.group(2)[:500] + "]")
    print("Sample part 1 variants:", part1_sample[:3])
