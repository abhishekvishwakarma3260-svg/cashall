import json

with open("public/CashALL_Product_Images_Master.json", "r", encoding="utf-8") as f:
    master = json.load(f)

models = master.get("models", [])
print(f"Total models in Master JSON: {len(models)}")

# Check how many have valid directCdnUrl
direct_urls = [m.get("directCdnUrl") for m in models if m.get("directCdnUrl")]
print(f"Total direct CDN URLs: {len(direct_urls)}")

# Check HP in master
hp_master = [m for m in models if m.get("brandSlug") in ["hp", "hp-compaq"]]
print(f"Total HP models in master: {len(hp_master)}")
for m in hp_master[:5]:
    print(" ", m["modelName"], "->", m.get("directCdnUrl"))

# Check Apple in master
apple_master = [m for m in models if m.get("brandSlug") == "apple"]
print(f"Total Apple models in master: {len(apple_master)}")
for m in apple_master[-10:]:
    print(" ", m["modelName"], "->", m.get("directCdnUrl"))
