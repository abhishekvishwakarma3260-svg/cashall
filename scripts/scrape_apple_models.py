import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = 'https://www.cashify.in/sell-old-mobile-phone/sell-apple'
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=15) as res:
    html = res.read().decode('utf-8')

# Extract model cards: typically within an <a> tag linking to the model
# Let's find all links and images
matches = re.findall(r'<a[^>]+href="(/sell-old-mobile-phone/[^"]+)"[^>]*>[\s\S]*?<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"', html)
if not matches:
    matches = re.findall(r'<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"', html)
    for alt, src in matches:
        if "iphone" in alt.lower():
            print(f"{alt} -> {src}")
else:
    for href, alt, src in matches:
        print(f"{alt} ({href}) -> {src}")
