import urllib.request
import re
import json
import time
import ctypes
import os

# 1. Prevent sleep
ES_CONTINUOUS = 0x80000000
ES_SYSTEM_REQUIRED = 0x00000001
ES_DISPLAY_REQUIRED = 0x00000002

def keep_awake():
    try:
        ctypes.windll.kernel32.SetThreadExecutionState(
            ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED
        )
    except Exception as e:
        print(f"Keep awake error: {e}")

keep_awake()

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
}

MOBILE_BRANDS = [
    'apple', 'samsung', 'xiaomi', 'vivo', 'oneplus', 'oppo', 'realme',
    'motorola', 'lenovo', 'nokia', 'honor', 'asus', 'google', 'poco',
    'lg', 'infinix', 'tecno', 'iqoo', 'nothing'
]

LAPTOP_BRANDS = [
    'apple', 'dell', 'hp-compaq', 'lenovo', 'asus', 'acer', 'samsung',
    'xiaomi', 'realme', 'honor', 'lg', 'microsoft', 'msi', 'avita',
    'nokia', 'other-laptop'
]

TABLET_BRANDS = [
    'apple', 'samsung', 'lenovo', 'xiaomi', 'oneplus', 'oppo', 'realme',
    'motorola', 'nokia', 'honor', 'poco', 'huawei'
]

catalog = {
    'MOBILE': {},
    'LAPTOP': {},
    'TABLET': {}
}

def clean_cdn_url(url):
    if not url:
        return ""
    if url.startswith("//"):
        url = "https:" + url
    # High-resolution
    if "?w=" in url:
        url = url.split("?w=")[0] + "?w=800"
    elif not url.endswith("?w=800"):
        url = url + "?w=800"
    return url

def fetch_brand(category, brand_slug):
    keep_awake()
    cat_url_part = "mobile-phone" if category == "MOBILE" else ("laptop" if category == "LAPTOP" else "tablet")
    url = f"https://www.cashify.in/sell-old-{cat_url_part}/sell-{brand_slug}"
    print(f"[{category}] Fetching {brand_slug}: {url}")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as res:
            html = res.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"  Error fetching {url}: {e}")
        return

    # Extract cards
    # Pattern: <a[^>]+href="(/sell-old-[^"/]+/used-[^"/]+)"[^>]*>[\s\S]*?<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"
    # Or reversed attributes alt and src
    cards1 = re.findall(r'<a[^>]+href="(/sell-old-[^"/]+/used-[^"/]+)"[^>]*>[\s\S]*?<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"', html)
    cards2 = re.findall(r'<a[^>]+href="(/sell-old-[^"/]+/used-[^"/]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"', html)
    
    extracted = {}
    for href, alt, src in cards1:
        if 's3n' in src and 'brand' not in src:
            slug = href.split('/')[-1]
            extracted[slug] = {
                'name': alt.strip(),
                'href': href,
                'slug': slug,
                'img': clean_cdn_url(src)
            }
            # also save without 'used-'
            clean_s = slug.replace('used-', '')
            extracted[clean_s] = {
                'name': alt.strip(),
                'href': href,
                'slug': clean_s,
                'img': clean_cdn_url(src)
            }
            extracted[alt.strip().lower()] = {
                'name': alt.strip(),
                'href': href,
                'slug': clean_s,
                'img': clean_cdn_url(src)
            }

    for href, src, alt in cards2:
        if 's3n' in src and 'brand' not in src:
            slug = href.split('/')[-1]
            extracted[slug] = {
                'name': alt.strip(),
                'href': href,
                'slug': slug,
                'img': clean_cdn_url(src)
            }
            clean_s = slug.replace('used-', '')
            extracted[clean_s] = {
                'name': alt.strip(),
                'href': href,
                'slug': clean_s,
                'img': clean_cdn_url(src)
            }
            extracted[alt.strip().lower()] = {
                'name': alt.strip(),
                'href': href,
                'slug': clean_s,
                'img': clean_cdn_url(src)
            }

    # Also search for any other product images with alt
    other_imgs = re.findall(r'<img[^>]+alt="([^"]+)"[^>]+src="([^"]*s3n[g]?\.cashify\.in/cashify/product/img/xhdpi/[^"]+)"', html)
    for alt, src in other_imgs:
        alt_l = alt.strip().lower()
        if alt_l not in extracted and len(alt_l) > 2:
            extracted[alt_l] = {
                'name': alt.strip(),
                'href': '',
                'slug': '',
                'img': clean_cdn_url(src)
            }

    print(f"  Extracted {len(extracted)} entries for {brand_slug}")
    catalog[category][brand_slug] = extracted
    time.sleep(0.5)

print("=== Starting Cashify Brand Catalog Scrape ===")
for b in MOBILE_BRANDS:
    fetch_brand('MOBILE', b)

for b in LAPTOP_BRANDS:
    fetch_brand('LAPTOP', b)

for b in TABLET_BRANDS:
    fetch_brand('TABLET', b)

out_file = r'c:\Users\DELL\OneDrive\Desktop\CashALL\scratch\scraped_cashify_brand_images.json'
os.makedirs(r'c:\Users\DELL\OneDrive\Desktop\CashALL\scratch', exist_ok=True)
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(catalog, f, indent=2)

print(f"\nSaved all scraped brand images to {out_file}")
