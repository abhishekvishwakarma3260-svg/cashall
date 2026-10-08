import json

with open("public/CashALL_Product_Images_Master.json", "r", encoding="utf-8") as f:
    master = json.load(f)

print("Keys:", master.keys() if isinstance(master, dict) else len(master))
if isinstance(master, dict):
    models = master.get("models", [])
    print("Total models in master JSON:", len(models))
    if models:
        print("Sample model:", json.dumps(models[0], indent=2))
        print("Sample 20th model:", json.dumps(models[20], indent=2))
