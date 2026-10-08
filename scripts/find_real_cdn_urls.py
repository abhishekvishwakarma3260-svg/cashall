import json

with open("public/CashALL_Product_Images_Master.json", "r", encoding="utf-8") as f:
    master = json.load(f)

models = master.get("models", [])

def find_best(brand, query, cat=None):
    candidates = []
    for m in models:
        if cat and m.get("category") != cat:
            continue
        if m.get("brandSlug", "").lower() == brand.lower():
            if query.lower() in m.get("modelName", "").lower():
                candidates.append((m["modelName"], m.get("directCdnUrl")))
    return candidates

print("Samsung S models:", find_best("samsung", "s24")[:3])
print("Samsung S23:", find_best("samsung", "s23")[:3])
print("Google Pixel 9:", find_best("google", "pixel 9")[:3])
print("Google Pixel 8:", find_best("google", "pixel 8")[:3])
print("MacBook Pro:", find_best("apple", "macbook pro", "LAPTOP")[:3])
print("MacBook Air:", find_best("apple", "macbook air", "LAPTOP")[:3])
print("iPad Pro:", find_best("apple", "ipad pro", "TABLET")[:3])
print("iPad Air:", find_best("apple", "ipad air", "TABLET")[:3])
print("Dell XPS:", find_best("dell", "xps", "LAPTOP")[:3])
print("HP Spectre/Envy/Pavilion:", find_best("hp", "envy", "LAPTOP")[:2], find_best("hp", "pavilion", "LAPTOP")[:2])
print("Lenovo ThinkPad/Yoga:", find_best("lenovo", "thinkpad", "LAPTOP")[:2], find_best("lenovo", "yoga", "LAPTOP")[:2])
print("OnePlus 12/Open:", find_best("oneplus", "12")[:2], find_best("oneplus", "open")[:2])
