import urllib.request

urls = {
    "iPhone 16 Pro Max (Desert Titanium)": "https://s3ng.cashify.in/cashify/product/img/xhdpi/d197ee88-ccff.jpg?w=800",
    "iPhone 16 Pro (Natural Titanium)": "https://s3ng.cashify.in/cashify/product/img/xhdpi/c6842e95-7635.jpg?w=800",
    "iPhone 16 (Ultramarine/Black)": "https://s3ng.cashify.in/cashify/product/img/xhdpi/db36cde6-e6e5.jpg?w=800",
    "iPhone 16 Plus (Teal/Pink)": "https://s3ng.cashify.in/cashify/product/img/xhdpi/5c48706b-b04d.jpg?w=800",
    "iPhone 16e": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ed91ebeb-f711.jpg?w=800",
    "Samsung Galaxy S24 Ultra": "https://s3ng.cashify.in/cashify/product/img/xhdpi/272230cb-1a72.jpg?w=800",
    "Samsung Galaxy S24 Plus": "https://s3ng.cashify.in/cashify/product/img/xhdpi/db22b6b5-ffae.jpg?w=800",
    "Samsung Galaxy S24 5G": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "Samsung Galaxy Z Fold": "https://s3ng.cashify.in/cashify/product/img/xhdpi/e0dc6226-3ec0.jpg?w=800",
    "Google Pixel 9 Pro": "https://s3ng.cashify.in/cashify/product/img/xhdpi/0e3992a1-b89f.jpg?w=800",
    "Google Pixel 9": "https://s3ng.cashify.in/cashify/product/img/xhdpi/81a733de-1c38.jpg?w=800",
    "OnePlus 12": "https://s3ng.cashify.in/cashify/product/img/xhdpi/3ba10c91-7df6.jpg?w=800",
    "OnePlus 12R": "https://s3ng.cashify.in/cashify/product/img/xhdpi/93afecfc-3cd7.jpg?w=800",
    "OnePlus Open": "https://s3ng.cashify.in/cashify/product/img/xhdpi/d4d91de5-5673.jpg?w=800",
    "HP Envy/Spectre": "https://s3ng.cashify.in/cashify/product/img/xhdpi/d5b8fe4d-ac2e.jpg?w=800",
    "HP ZBook": "https://s3ng.cashify.in/cashify/product/img/xhdpi/64498243-ea8a.jpg?w=800",
    "HP Pavilion": "https://s3ng.cashify.in/cashify/product/img/xhdpi/e21c1388-ddcd.jpg?w=800",
    "HP 15 Series": "https://s3ng.cashify.in/cashify/product/img/xhdpi/d14cf13e-7100.jpg?w=800",
    "Lenovo Yoga": "https://s3ng.cashify.in/cashify/product/img/xhdpi/cb8d3fcc-76f8.jpg?w=800",
    "Lenovo IdeaPad": "https://s3ng.cashify.in/cashify/product/img/xhdpi/4aea27a3-37a0.jpg?w=800",
    "MacBook Pro": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ff75fa17-180d.jpg?w=800",
    "MacBook Air": "https://s3ng.cashify.in/cashify/product/img/xhdpi/3e4863fe-7dcc.jpg?w=800",
    "iPad Air": "https://s3ng.cashify.in/cashify/product/img/xhdpi/57301cf3a2212.jpg?w=800"
}

for name, u in urls.items():
    try:
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        res = urllib.request.urlopen(req, timeout=5)
        print(f"200 OK: {name}")
    except Exception as e:
        print(f"FAILED {name}: {e}")
