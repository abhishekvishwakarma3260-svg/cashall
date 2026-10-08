import re

with open("lib/store.ts", "r", encoding="utf-8") as f:
    code = f.read()

# Let's check Apple iPhone images in store.ts
iphones = re.findall(r'\{\s*"id":\s*"(m-apple-[^"]+)",[\s\S]*?"name":\s*"([^"]+)",[\s\S]*?"imageUrl":\s*([^,\n]+)', code)
for ip in iphones:
    if any(k in ip[1] for k in ["16", "15", "14"]):
        print(ip[1], "->", ip[2])
