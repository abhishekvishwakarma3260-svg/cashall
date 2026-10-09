import urllib.request
import re
import json
import time

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
}

def fetch_model_page_variants(url):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            chunks = re.findall(r'self\.__next_f\.push\(\[1,"(.*?)"\]\)', html)
            variants = {}
            for c in chunks:
                c_unesc = c.replace('\\"', '"').replace('\\\\', '\\')
                # Find all occurrences of variationName and getUpTo
                # In Next.js chunks, we have: "variationName":"<name>", ... "getUpTo":<price>
                matches = re.finditer(r'\{[^{}]*?"variationName":\s*"([^"]+)"[^{}]*?"getUpTo":\s*(\d+)[^{}]*?\}', c_unesc)
                for m in matches:
                    v_name = m.group(1)
                    price = int(m.group(2))
                    # Also check if there is an exchange bonus or uplift in the chunk
                    if v_name not in variants or price > variants[v_name]:
                        variants[v_name] = price
                        
                matches_rev = re.finditer(r'\{[^{}]*?"getUpTo":\s*(\d+)[^{}]*?"variationName":\s*"([^"]+)"[^{}]*?\}', c_unesc)
                for m in matches_rev:
                    v_name = m.group(2)
                    price = int(m.group(1))
                    if v_name not in variants or price > variants[v_name]:
                        variants[v_name] = price
            return variants
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return {}

def fetch_variant_page_headline_price(variant_url):
    req = urllib.request.Request(variant_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            chunks = re.findall(r'self\.__next_f\.push\(\[1,"(.*?)"\]\)', html)
            for c in chunks:
                c_unesc = c.replace('\\"', '"').replace('\\\\', '\\')
                m_zero = re.findall(r'"hasVariant":\s*0[^}]*?"getUpTo":\s*(\d+)', c_unesc)
                if not m_zero:
                    m_zero = re.findall(r'"getUpTo":\s*(\d+)[^}]*?"hasVariant":\s*0', c_unesc)
                if m_zero:
                    return int(m_zero[0])
            # Fallback to general getUpTo
            m = re.findall(r'"getUpTo":\s*(\d+)', html)
            if m:
                return int(m[-1])
    except Exception as e:
        print(f"Error fetching {variant_url}: {e}")
    return None

# Test on key flagship URLs
models_to_scrape = {
    # Samsung S26 Series
    "Samsung Galaxy S26 Ultra 5G": {
        "model_url": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s26-ultra",
        "variants": {
            "16 GB/1 TB": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s26-ultra-16-gb-1-tb",
            "12 GB/512 GB": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s26-ultra-12-gb-512-gb",
            "12 GB/256 GB": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s26-ultra-12-gb-256-gb"
        }
    },
    "Samsung Galaxy S26 Plus 5G": {
        "model_url": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s26-plus",
        "variants": {
            "12 GB/256 GB": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s26-plus-12-gb-256-gb",
            "512 GB": None
        }
    },
    "Samsung Galaxy S26 5G": {
        "model_url": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s26",
        "variants": {}
    },
    # Samsung S25 Series
    "Samsung Galaxy S25 Ultra 5G": {
        "model_url": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s25-ultra",
        "variants": {}
    },
    "Samsung Galaxy S25 Plus 5G": {
        "model_url": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s25-plus",
        "variants": {}
    },
    "Samsung Galaxy S25 5G": {
        "model_url": "https://www.cashify.in/sell-old-mobile-phone/used-samsung-galaxy-s25",
        "variants": {}
    },
    # Apple iPhone 18 Series
    "Apple iPhone 18 Pro Max": {
        "model_url": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-max",
        "variants": {
            "256 GB": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-max-12-gb-256-gb",
            "512 GB": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-max-12-gb-512-gb",
            "1 TB": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-max-12-gb-1-tb",
            "2 TB": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-max-12-gb-2-tb"
        }
    },
    "Apple iPhone 18 Pro": {
        "model_url": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro",
        "variants": {
            "256 GB": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-12-gb-256-gb",
            "512 GB": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-12-gb-512-gb",
            "1 TB": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-12-gb-1-tb",
            "2 TB": "https://www.cashify.in/sell-old-mobile-phone/used-apple-iphone-18-pro-12-gb-2-tb"
        }
    }
}

final_records = []

for mname, mdata in models_to_scrape.items():
    print(f"\n--- Scraping {mname} ---")
    base_vars = fetch_model_page_variants(mdata['model_url'])
    print(f"  Base variants from model overview: {base_vars}")
    
    # Now check specific variant URLs for higher headline prices
    for vname, vurl in mdata['variants'].items():
        if vurl:
            headline_p = fetch_variant_page_headline_price(vurl)
            if headline_p:
                print(f"  Headline price for {vname}: {headline_p}")
                base_vars[vname] = max(base_vars.get(vname, 0), headline_p)
                # Also normalize keys (e.g. '16 GB/1 TB' -> '1 TB')
                clean_key = vname.split('/')[-1]
                base_vars[clean_key] = max(base_vars.get(clean_key, 0), headline_p)

    # Calculate CashALL +1%
    for vname, c_price in base_vars.items():
        # Ensure we record clean keys
        clean_name = vname.split('/')[-1] if '/' in vname else vname
        cashall_price = round(c_price * 1.01)
        final_records.append({
            "model": mname,
            "variant": clean_name,
            "cashify_price": c_price,
            "cashall_price": cashall_price
        })

print("\nResults gathered:")
for r in final_records:
    print(f"{r['model']} [{r['variant']}] => Cashify: Rs {r['cashify_price']} | CashALL (+1%): Rs {r['cashall_price']}")
