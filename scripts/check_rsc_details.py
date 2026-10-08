import urllib.request
import re
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
}

def check_brand_rsc(url):
    print(f"\n=== Inspecting RSC for {url} ===")
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8')

    chunks = re.findall(r'self\.__next_f\.push\(\[1,"(.*?)"\]\)', html)
    full_data = "".join(chunks).replace('\\"', '"').replace('\\\\', '\\')
    print(f"RSC payload length: {len(full_data)}")
    
    # Search for image names or full image URLs
    # Cashify images typically end in .jpg or .png or are in imageName / img / cdn
    img_matches = re.findall(r'https://s3n[g]?\.cashify\.in/cashify/product/img/xhdpi/[a-zA-Z0-9.\-_]+', full_data)
    print(f"Full image URLs in RSC: {len(set(img_matches))}")
    
    # Search for product objects with name/title/url/image
    # Look for model-like patterns: e.g. "modelName" or "name" or "productName"
    products = re.findall(r'\{[^{}]*?"name":"([^"]+)"[^{}]*?"image(?:Name)?":"([^"]+)"[^{}]*?\}', full_data)
    print(f"Products with name + image: {len(products)}")
    for name, img in products[:10]:
        print(f"  {name} -> {img}")

    # Also search for "name":"..." and "url":"/sell-old-..."
    models_with_url = re.findall(r'\{[^{}]*?"name":"([^"]+)"[^{}]*?"url":"(/sell-old-[^"]+)"[^{}]*?\}', full_data)
    print(f"Models with name + url: {len(models_with_url)}")
    for name, u in models_with_url[:10]:
        print(f"  {name} -> {u}")

check_brand_rsc('https://www.cashify.in/sell-old-mobile-phone/sell-samsung')
check_brand_rsc('https://www.cashify.in/sell-old-laptop/sell-hp-compaq')
