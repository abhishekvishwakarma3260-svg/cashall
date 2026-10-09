import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = 'https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-max-12-gb-256-gb'
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=10) as res:
    html = res.read().decode('utf-8')

print("Length of HTML:", len(html))
# Find script tags or json
scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
print("Total script tags:", len(scripts))
for i, s in enumerate(scripts):
    if "1,30,000" in s or "130000" in s or "price" in s.lower():
        print(f"Script {i} matches! Length: {len(s)}")
        print(s[:500])

# Search text directly
idx = html.find("1,30,000")
if idx != -1:
    print("Found '1,30,000' in HTML! Context:")
    print(html[max(0, idx-200):idx+200])
else:
    print("'1,30,000' not found as string, let's search for 130000:")
    idx2 = html.find("130000")
    if idx2 != -1:
        print("Found '130000':", html[max(0, idx2-200):idx2+200])
    else:
        print("Not found as literal. Let's see title and heading:")
        h1 = re.findall(r'<h1[^>]*>(.*?)</h1>', html)
        print("H1:", h1)
