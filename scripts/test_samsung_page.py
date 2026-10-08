import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = 'https://www.cashify.in/sell-old-mobile-phone/sell-samsung'
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=15) as res:
    html = res.read().decode('utf-8')

# Let's find all model cards
# In apple we had: <a[^>]+href="(/sell-old-mobile-phone/[^"]+)"[^>]*>[\s\S]*?<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"
matches = re.findall(r'<a[^>]+href="(/sell-old-mobile-phone/[^"]+)"[^>]*>[\s\S]*?<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"', html)
print(f"Total Samsung matches: {len(matches)}")
for href, alt, src in matches[:25]:
    print(f"{alt} -> {src} ({href})")

# Let's check if there are series links on the page (e.g. Galaxy S Series, Galaxy Note Series, Galaxy A Series, etc.)
series = re.findall(r'href="(/sell-old-mobile-phone/[^"]+series[^"]*)"', html, re.I)
print(f"\nSeries links: {set(series)}")

# Check if there are other model links on the page
all_links = re.findall(r'href="(/sell-old-mobile-phone/[^"]+)"', html)
print(f"Total /sell-old-mobile-phone/ links: {len(set(all_links))}")
