import re
from collections import Counter

with open(r'c:\Users\DELL\OneDrive\Desktop\CashALL\lib\store.ts', 'r', encoding='utf-8') as f:
    content = f.read()

models = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"brandId":\s*"([^"]+)",\s*"brandSlug":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"imageUrl":\s*"([^"]+)"', content)

print(f"Matched models: {len(models)}")
images = [m[5] for m in models]
counter = Counter(images)
print(f"Total unique images: {len(counter)}")
print("Top 10 most repeated images:")
for img, count in counter.most_common(10):
    print(f"  {count} times: {img}")
