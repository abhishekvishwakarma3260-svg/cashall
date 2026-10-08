import json
import re

with open('lib/store.ts', 'r', encoding='utf-8') as f:
    store = f.read()

models = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"brandId":\s*"([^"]+)",\s*"brandSlug":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"imageUrl":\s*"([^"]+)"', store)

model_dict = {m[4]: (m[3], m[5]) for m in models}

print("=== VERIFYING APPLE IPHONES ===")
apple_checks = [
    'apple-iphone-18-pro-max',
    'apple-iphone-18-pro',
    'apple-iphone-18-plus',
    'apple-iphone-18',
    'apple-iphone-18-air',
    'apple-iphone-17-air',
    'apple-iphone-6',
    'apple-iphone-6-plus',
    'apple-iphone-6s',
    'apple-iphone-6s-plus',
    'apple-iphone-se-1st-generation',
    'apple-iphone-15-pro-max',
    'apple-iphone-14-pro',
    'apple-iphone-13',
    'apple-iphone-12'
]
for slug in apple_checks:
    if slug in model_dict:
        print(f"  {model_dict[slug][0]} -> {model_dict[slug][1]}")

print("\n=== VERIFYING SAMSUNG GALAXY ===")
samsung_checks = [
    'samsung-galaxy-s26-ultra-5g',
    'samsung-galaxy-s26-plus-5g',
    'samsung-galaxy-s26-5g',
    'samsung-galaxy-s25-ultra-5g',
    'samsung-galaxy-s25-plus-5g',
    'samsung-galaxy-s25-5g',
    'samsung-galaxy-s25-slim-5g',
    'samsung-galaxy-z-fold7-5g',
    'samsung-galaxy-z-flip7-5g',
    'samsung-galaxy-a56-5g',
    'samsung-galaxy-a36-5g',
    'samsung-galaxy-m56-5g',
    'samsung-galaxy-s24-ultra',
    'samsung-galaxy-s23-ultra',
    'samsung-galaxy-a54'
]
for slug in samsung_checks:
    if slug in model_dict:
        print(f"  {model_dict[slug][0]} -> {model_dict[slug][1]}")

print("\n=== VERIFYING LAPTOPS & TABLETS ===")
other_checks = [
    'macbook-pro-14-m4-2025',
    'macbook-air-13-m4-2025',
    'apple-ipad-pro-11-m4-wi-fi',
    'apple-ipad-air-11-m2-wi-fi',
    'google-pixel-11-pro',
    'google-pixel-11'
]
for slug in other_checks:
    if slug in model_dict:
        print(f"  {model_dict[slug][0]} -> {model_dict[slug][1]}")
