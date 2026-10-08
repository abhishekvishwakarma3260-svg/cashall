import re

with open("lib/store.ts", "r", encoding="utf-8") as f:
    code = f.read()

models = re.findall(r'"id":\s*"(m-[^"]+)"', code)
variants = re.findall(r'"id":\s*"(v-[^"]+)"', code)

print(f"Total model entries found in store.ts: {len(models)}")
print(f"Unique models found in store.ts: {len(set(models))}")
print(f"Total variant entries found in store.ts: {len(variants)}")
print(f"Unique variants found in store.ts: {len(set(variants))}")

# Check iPhone 15, iPhone 14, iPhone 13, Galaxy S24, S23, old MacBooks
check_old = [
    "m-apple-apple-iphone-15",
    "m-apple-apple-iphone-14",
    "m-apple-apple-iphone-13",
    "m-apple-apple-iphone-6",
    "m-samsung-galaxy-s24-ultra-5g"
]
for m_id in check_old:
    found = m_id in code
    print(f"Old model {m_id} present: {found}")
