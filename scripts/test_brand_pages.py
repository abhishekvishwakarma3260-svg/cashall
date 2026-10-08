import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for cat, url in [
    ('mobile', 'https://www.cashify.in/sell-old-mobile-phone/brands'),
    ('laptop', 'https://www.cashify.in/sell-old-laptop/brands'),
    ('tablet', 'https://www.cashify.in/sell-old-tablet/brands')
]:
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            html = res.read().decode('utf-8')
        # find brand links
        # typically href="/sell-old-mobile-phone/sell-[brand]" or similar
        brand_links = re.findall(rf'href="(/sell-old-{cat}[^"]*|/sell-[^"]*)"', html)
        # also find all brand names and hrefs
        cards = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>[\s\S]*?<img[^>]+alt="([^"]+)"', html)
        print(f"=== {cat.upper()} ===")
        print(f"Total cards found: {len(cards)}")
        for href, alt in cards[:15]:
            print(f"  {alt}: {href}")
    except Exception as e:
        print(f"Error for {cat}: {e}")
