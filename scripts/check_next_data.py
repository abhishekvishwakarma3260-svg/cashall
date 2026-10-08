import urllib.request
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = 'https://www.cashify.in/sell-old-mobile-phone/sell-samsung'
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=15) as res:
    html = res.read().decode('utf-8')

match = re.search(r'<script id="__NEXT_DATA__" type="application/json">([\s\S]*?)</script>', html)
if match:
    data = json.loads(match.group(1))
    print("Found __NEXT_DATA__!")
    print("page:", data.get('page'))
    props = data.get('props', {}).get('pageProps', {})
    print("pageProps keys:", props.keys())
    for k in props.keys():
        val = props[k]
        if isinstance(val, list):
            print(f"  list {k}: length {len(val)}")
            if len(val) > 0 and isinstance(val[0], dict):
                print(f"    sample item keys: {val[0].keys()}")
                if 'name' in val[0] or 'title' in val[0] or 'model' in val[0]:
                    print(f"    sample item: {val[0]}")
        elif isinstance(val, dict):
            print(f"  dict {k}: keys {val.keys()}")
else:
    print("No __NEXT_DATA__ found")
