import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = 'https://www.cashify.in/sell-old-mobile-phone/sell-samsung'
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=15) as res:
    html = res.read().decode('utf-8')

# Search for any links or series or buttons or json on the page
all_hrefs = set(re.findall(r'href="([^"]+)"', html))
samsung_hrefs = [h for h in all_hrefs if 'samsung' in h.lower() or 'galaxy' in h.lower()]
print(f"Total samsung/galaxy hrefs on page: {len(samsung_hrefs)}")
for h in sorted(samsung_hrefs)[:30]:
    print(" ", h)

# Check if there is any script containing model data or categories
scripts = re.findall(r'<script[^>]*>([\s\S]*?)</script>', html)
for i, s in enumerate(scripts):
    if 's24' in s.lower() or 'galaxy s' in s.lower() or 'fold' in s.lower():
        print(f"\nScript {i} matches keyword! Length: {len(s)}")
        # print snippet
        print(s[:500])
