import json
import re

with open("lib/store.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Find all models with category: "LAPTOP" or category: "TABLET" or in LATEST_2026_MODELS
models_data = re.findall(r'\{\s*"id":\s*"(m-[^"]+)",[\s\S]*?"name":\s*"([^"]+)",[\s\S]*?"imageUrl":\s*([^,\n]+)', code)

broken_or_null = []
csh_placeholders = []
valid_cashify_cdn = []

for m_id, m_name, img in models_data:
    img_clean = img.strip().strip('"')
    if img_clean == "null" or not img_clean:
        broken_or_null.append((m_id, m_name))
    elif "csh-" in img_clean:
        csh_placeholders.append((m_id, m_name, img_clean))
    elif "cashify" in img_clean:
        valid_cashify_cdn.append((m_id, m_name, img_clean))

print(f"Total models with valid Cashify CDN: {len(valid_cashify_cdn)}")
print(f"Total models with 'csh-' placeholders: {len(csh_placeholders)}")
print(f"Total models with null/empty image: {len(broken_or_null)}")

print("\nSample 'csh-' placeholders:")
for p in csh_placeholders[:15]:
    print(" ", p)

print("\nSample null/empty images:")
for b in broken_or_null[:10]:
    print(" ", b)
