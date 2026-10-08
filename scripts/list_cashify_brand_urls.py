import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

brand_urls = {'mobile': set(), 'laptop': set(), 'tablet': set()}

for cat, url in [
    ('mobile', 'https://www.cashify.in/sell-old-mobile-phone/brands'),
    ('laptop', 'https://www.cashify.in/sell-old-laptop/brands'),
    ('tablet', 'https://www.cashify.in/sell-old-tablet/brands')
]:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as res:
        html = res.read().decode('utf-8')
    
    # Find all links to brand pages
    links = re.findall(r'href="(/sell-old-[^"/]+/sell-[^"/]+)"', html)
    for l in links:
        brand_urls[cat].add(l)

for cat, links in brand_urls.items():
    print(f"=== {cat.upper()} ({len(links)} brands) ===")
    for l in sorted(links):
        print(f"  https://www.cashify.in{l}")
