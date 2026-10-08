import json

with open('dataset used/real_cashify_images.json', 'r', encoding='utf-8') as f:
    real = json.load(f)

for k in real.keys():
    if 'pixel' in k.lower():
        print(f"  {k} -> {real[k]}")
