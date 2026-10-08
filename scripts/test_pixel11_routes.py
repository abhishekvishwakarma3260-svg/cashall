import urllib.request

urls = [
    "http://localhost:3000/sell/mobile/google/google-pixel-11",
    "http://localhost:3000/sell/mobile/google/google-pixel-11-pro",
    "http://localhost:3000/sell/mobile/google/google-pixel-11-pro-xl",
    "http://localhost:3000/sell/mobile/google/google-pixel-11-pro-fold"
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        res = urllib.request.urlopen(req, timeout=15)
        print(f"STATUS {res.status}: {u}")
    except Exception as e:
        print(f"ERROR {u}: {e}")
