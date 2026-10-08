import urllib.request

for url in [
    'http://localhost:3000/sell/mobile/apple',
    'http://localhost:3000/sell/mobile/samsung',
    'http://localhost:3000/sell/laptop/hp',
    'http://localhost:3000/sell/tablet/apple'
]:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as res:
            print(f"{url} -> HTTP {res.status} (Length: {len(res.read())})")
    except Exception as e:
        print(f"{url} -> Error: {e}")
