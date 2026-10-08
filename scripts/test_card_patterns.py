import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def inspect_url(url):
    print(f"\n==========================================")
    print(f"URL: {url}")
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as res:
        html = res.read().decode('utf-8')
    
    # Check all <a ...><img ...> or card patterns
    # In cashify, product cards are:
    # <a href="/sell-old-[category]/used-[slug]"><img alt="[Name]" src="[ImgUrl]">
    cards = re.findall(r'<a[^>]+href="(/sell-old-[^"/]+/used-[^"/]+)"[^>]*>[\s\S]*?<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"', html)
    print(f"Card matches found: {len(cards)}")
    for href, alt, src in cards[:10]:
        print(f"  {alt} ({href}) -> {src}")
    
    # Also check if there are other images with alt
    all_imgs = re.findall(r'<img[^>]+alt="([^"]+)"[^>]+src="([^"]*s3n[g]?\.cashify\.in/cashify/product/img/xhdpi/[^"]+)"', html)
    print(f"Total product img tags found: {len(all_imgs)}")

inspect_url('https://www.cashify.in/sell-old-mobile-phone/sell-samsung')
inspect_url('https://www.cashify.in/sell-old-laptop/sell-hp-compaq')
inspect_url('https://www.cashify.in/sell-old-tablet/sell-apple')
