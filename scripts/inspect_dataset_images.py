import json

for fname in ['real_cashify_images.json', 'cashify_laptop_images.json', 'cashify_tablet_images.json']:
    path = f'dataset used/{fname}'
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"=== {fname} ===")
    print(f"Count: {len(data)}")
    sample_keys = list(data.keys())[:5]
    for k in sample_keys:
        print(f"  {k} -> {data[k]}")
