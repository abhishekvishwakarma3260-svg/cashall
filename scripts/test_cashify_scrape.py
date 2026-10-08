import urllib.request
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
}

url = 'https://www.cashify.in/sell-old-mobile-phone/sell-apple'
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8')
        print(f'HTML length: {len(html)}')
        
        # Look for model cards, images, and model names in HTML
        # In Next.js pages or SSR html
        models_found = []
        # Look for img tags with alt and src
        img_tags = re.findall(r'<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"', html)
        if not img_tags:
            img_tags = re.findall(r'<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"', html)
            img_tags = [(b, a) for a, b in img_tags]
            
        print(f'Found {len(img_tags)} img tags with alt and src')
        for alt, src in img_tags[:15]:
            print(f"  {alt} -> {src}")

        # Also search for JSON or API data in html
        json_matches = re.findall(r'(\{[^{}]*"name"\s*:\s*"[^"]*"[^{}]*"image[Url]*"\s*:\s*"[^"]*"[^{}]*\})', html)
        print(f'Found {len(json_matches)} potential model JSON objects')
        if json_matches:
            print("Sample JSON:", json_matches[:3])
            
        # Check all s3ng images in html
        s3_images = re.findall(r'(https://s3n[g]?\.cashify\.in/cashify/product/img/[^\s"\'\)]+)', html)
        print(f'Found {len(s3_images)} Cashify product images:')
        for s in set(s3_images[:10]):
            print("  Image URL:", s)

except Exception as e:
    print('Error:', e)
