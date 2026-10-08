import json
import csv
import re
import os

print("=== CashALL Catalog Update: Comprehensive 2025/2026 Latest Release Models ===")

true = True
false = False
null = None


NEW_MODELS = [
    # ══════════════════════════════════════════════════════════════════
    # ── APPLE IPHONE (18, 17, 16e) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-apple-apple-iphone-18",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 18",
        "slug": "apple-iphone-18",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16pro-deep-blue.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 64000},
            {"storage": "256 GB", "basePrice": 72000},
            {"storage": "512 GB", "basePrice": 85000},
        ]
    },
    {
        "id": "m-apple-apple-iphone-18-plus",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 18 Plus",
        "slug": "apple-iphone-18-plus",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16plus-teal.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 71000},
            {"storage": "256 GB", "basePrice": 79000},
            {"storage": "512 GB", "basePrice": 92000},
        ]
    },
    {
        "id": "m-apple-apple-iphone-18-pro",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 18 Pro",
        "slug": "apple-iphone-18-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16pro-natural.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 98000},
            {"storage": "512 GB", "basePrice": 112000},
            {"storage": "1 TB", "basePrice": 128000},
        ]
    },
    {
        "id": "m-apple-apple-iphone-18-pro-max",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 18 Pro Max",
        "slug": "apple-iphone-18-pro-max",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16promax-desert.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 115000},
            {"storage": "512 GB", "basePrice": 132000},
            {"storage": "1 TB", "basePrice": 149000},
        ]
    },
    {
        "id": "m-apple-apple-iphone-18-air",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 18 Air",
        "slug": "apple-iphone-18-air",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16pro-natural.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 88000},
            {"storage": "512 GB", "basePrice": 102000},
            {"storage": "1 TB", "basePrice": 118000},
        ]
    },
    {
        "id": "m-apple-apple-iphone-17",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 17",
        "slug": "apple-iphone-17",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16-ultramarine.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 53000},
            {"storage": "256 GB", "basePrice": 61000},
            {"storage": "512 GB", "basePrice": 72000},
        ]
    },
    {
        "id": "m-apple-apple-iphone-17-air",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 17 Air",
        "slug": "apple-iphone-17-air",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16plus-pink.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 68000},
            {"storage": "512 GB", "basePrice": 79000},
        ]
    },
    {
        "id": "m-apple-apple-iphone-17-pro",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 17 Pro",
        "slug": "apple-iphone-17-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16pro-natural.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 84000},
            {"storage": "512 GB", "basePrice": 96000},
            {"storage": "1 TB", "basePrice": 112000},
        ]
    },
    {
        "id": "m-apple-apple-iphone-17-pro-max",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 17 Pro Max",
        "slug": "apple-iphone-17-pro-max",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16promax-black.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 99000},
            {"storage": "512 GB", "basePrice": 115000},
            {"storage": "1 TB", "basePrice": 132000},
        ]
    },
    {
        "id": "m-apple-apple-iphone-16e",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPhone 16e",
        "slug": "apple-iphone-16e",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-16-black.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 39500},
            {"storage": "256 GB", "basePrice": 46000},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── SAMSUNG GALAXY (S26, S25, Fold7, Flip7, A56, A36, M56) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-samsung-galaxy-s26-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy S26 5G",
        "slug": "samsung-galaxy-s26-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-s24-onyx.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 56000},
            {"storage": "256 GB", "basePrice": 63000},
        ]
    },
    {
        "id": "m-samsung-galaxy-s26-plus-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy S26 Plus 5G",
        "slug": "samsung-galaxy-s26-plus-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-s24plus-cobalt.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 71000},
            {"storage": "512 GB", "basePrice": 81000},
        ]
    },
    {
        "id": "m-samsung-galaxy-s26-ultra-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy S26 Ultra 5G",
        "slug": "samsung-galaxy-s26-ultra-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-s24ultra-titanium.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 96000},
            {"storage": "512 GB", "basePrice": 111000},
            {"storage": "1 TB", "basePrice": 128000},
        ]
    },
    {
        "id": "m-samsung-galaxy-s25-slim-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy S25 Slim 5G",
        "slug": "samsung-galaxy-s25-slim-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-s24-onyx.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 59000},
            {"storage": "512 GB", "basePrice": 67000},
        ]
    },
    {
        "id": "m-samsung-galaxy-s25-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy S25 5G",
        "slug": "samsung-galaxy-s25-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-s24-onyx.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 51000},
            {"storage": "256 GB", "basePrice": 58000},
        ]
    },
    {
        "id": "m-samsung-galaxy-s25-plus-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy S25 Plus 5G",
        "slug": "samsung-galaxy-s25-plus-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-s24plus-cobalt.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 64000},
            {"storage": "512 GB", "basePrice": 73000},
        ]
    },
    {
        "id": "m-samsung-galaxy-s25-ultra-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy S25 Ultra 5G",
        "slug": "samsung-galaxy-s25-ultra-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-s24ultra-titanium.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 88000},
            {"storage": "512 GB", "basePrice": 101000},
            {"storage": "1 TB", "basePrice": 116000},
        ]
    },
    {
        "id": "m-samsung-galaxy-z-fold7-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy Z Fold7 5G",
        "slug": "samsung-galaxy-z-fold7-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-zfold6-silver.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 108000},
            {"storage": "512 GB", "basePrice": 122000},
            {"storage": "1 TB", "basePrice": 138000},
        ]
    },
    {
        "id": "m-samsung-galaxy-z-flip7-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy Z Flip7 5G",
        "slug": "samsung-galaxy-z-flip7-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-zflip6-mint.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 66000},
            {"storage": "512 GB", "basePrice": 75000},
        ]
    },
    {
        "id": "m-samsung-galaxy-a56-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy A56 5G",
        "slug": "samsung-galaxy-a56-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-a55-navy.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 24500},
            {"storage": "256 GB", "basePrice": 28000},
        ]
    },
    {
        "id": "m-samsung-galaxy-a36-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy A36 5G",
        "slug": "samsung-galaxy-a36-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-a35-iceblue.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 19000},
            {"storage": "256 GB", "basePrice": 22500},
        ]
    },
    {
        "id": "m-samsung-galaxy-m56-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy M56 5G",
        "slug": "samsung-galaxy-m56-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-m55-denim.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 18500},
            {"storage": "256 GB", "basePrice": 21500},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── GOOGLE PIXEL (10, 10 Pro, 10 Pro XL, 10 Pro Fold, 9a) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-google-pixel-10",
        "brandId": "b-google",
        "brandSlug": "google",
        "name": "Google Pixel 10",
        "slug": "google-pixel-10",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pixel9-obsidian.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 54000},
            {"storage": "256 GB", "basePrice": 61000},
        ]
    },
    {
        "id": "m-google-pixel-10-pro",
        "brandId": "b-google",
        "brandSlug": "google",
        "name": "Google Pixel 10 Pro",
        "slug": "google-pixel-10-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pixel9pro-porcelain.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 76000},
            {"storage": "256 GB", "basePrice": 85000},
            {"storage": "512 GB", "basePrice": 96000},
        ]
    },
    {
        "id": "m-google-pixel-10-pro-xl",
        "brandId": "b-google",
        "brandSlug": "google",
        "name": "Google Pixel 10 Pro XL",
        "slug": "google-pixel-10-pro-xl",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pixel9pro-hazel.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 89000},
            {"storage": "512 GB", "basePrice": 101000},
            {"storage": "1 TB", "basePrice": 115000},
        ]
    },
    {
        "id": "m-google-pixel-10-pro-fold",
        "brandId": "b-google",
        "brandSlug": "google",
        "name": "Google Pixel 10 Pro Fold",
        "slug": "google-pixel-10-pro-fold",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pixel-fold.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 105000},
            {"storage": "512 GB", "basePrice": 118000},
        ]
    },
    {
        "id": "m-google-pixel-9a",
        "brandId": "b-google",
        "brandSlug": "google",
        "name": "Google Pixel 9a",
        "slug": "google-pixel-9a",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pixel8a-aloe.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 33000},
            {"storage": "256 GB", "basePrice": 37500},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── ONEPLUS (13, 13R, Open 2, Nord 5, Nord CE 5) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-oneplus-oneplus-13",
        "brandId": "b-oneplus",
        "brandSlug": "oneplus",
        "name": "OnePlus 13",
        "slug": "oneplus-13",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-oneplus12-flowy.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 56000},
            {"storage": "512 GB", "basePrice": 64000},
        ]
    },
    {
        "id": "m-oneplus-oneplus-13r",
        "brandId": "b-oneplus",
        "brandSlug": "oneplus",
        "name": "OnePlus 13R",
        "slug": "oneplus-13r",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-oneplus12r-coolblue.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 37000},
            {"storage": "256 GB", "basePrice": 42000},
        ]
    },
    {
        "id": "m-oneplus-oneplus-open-2",
        "brandId": "b-oneplus",
        "brandSlug": "oneplus",
        "name": "OnePlus Open 2",
        "slug": "oneplus-open-2",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-oneplus-open.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "512 GB", "basePrice": 99000},
            {"storage": "1 TB", "basePrice": 112000},
        ]
    },
    {
        "id": "m-oneplus-oneplus-nord-5",
        "brandId": "b-oneplus",
        "brandSlug": "oneplus",
        "name": "OnePlus Nord 5",
        "slug": "oneplus-nord-5",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-nord4-oasis.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 23000},
            {"storage": "256 GB", "basePrice": 26500},
        ]
    },
    {
        "id": "m-oneplus-oneplus-nord-ce-5-5g",
        "brandId": "b-oneplus",
        "brandSlug": "oneplus",
        "name": "OnePlus Nord CE 5 5G",
        "slug": "oneplus-nord-ce-5-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-nordce4-celadon.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 17500},
            {"storage": "256 GB", "basePrice": 20500},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── XIAOMI (15, 15 Pro, 15 Ultra, Redmi Note 14 Series) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-xiaomi-xiaomi-15",
        "brandId": "b-xiaomi",
        "brandSlug": "xiaomi",
        "name": "Xiaomi 15",
        "slug": "xiaomi-15",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-xiaomi14-white.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 48000},
            {"storage": "512 GB", "basePrice": 54000},
        ]
    },
    {
        "id": "m-xiaomi-xiaomi-15-pro",
        "brandId": "b-xiaomi",
        "brandSlug": "xiaomi",
        "name": "Xiaomi 15 Pro",
        "slug": "xiaomi-15-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-xiaomi14-black.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 58000},
            {"storage": "512 GB", "basePrice": 66000},
        ]
    },
    {
        "id": "m-xiaomi-xiaomi-15-ultra",
        "brandId": "b-xiaomi",
        "brandSlug": "xiaomi",
        "name": "Xiaomi 15 Ultra",
        "slug": "xiaomi-15-ultra",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-xiaomi14ultra-titanium.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "512 GB", "basePrice": 79000},
            {"storage": "1 TB", "basePrice": 92000},
        ]
    },
    {
        "id": "m-xiaomi-redmi-note-14-pro-plus-5g",
        "brandId": "b-xiaomi",
        "brandSlug": "xiaomi",
        "name": "Redmi Note 14 Pro+ 5G",
        "slug": "redmi-note-14-pro-plus-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-note13proplus-fusion.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 23500},
            {"storage": "512 GB", "basePrice": 27000},
        ]
    },
    {
        "id": "m-xiaomi-redmi-note-14-pro-5g",
        "brandId": "b-xiaomi",
        "brandSlug": "xiaomi",
        "name": "Redmi Note 14 Pro 5G",
        "slug": "redmi-note-14-pro-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-note13pro-aurora.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 18000},
            {"storage": "256 GB", "basePrice": 21000},
        ]
    },
    {
        "id": "m-xiaomi-redmi-note-14-5g",
        "brandId": "b-xiaomi",
        "brandSlug": "xiaomi",
        "name": "Redmi Note 14 5G",
        "slug": "redmi-note-14-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-note13-prism.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 13500},
            {"storage": "256 GB", "basePrice": 15500},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── VIVO (X200, X200 Pro, X200 Pro Mini, V50, V50 Pro) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-vivo-vivo-x200",
        "brandId": "b-vivo",
        "brandSlug": "vivo",
        "name": "Vivo X200",
        "slug": "vivo-x200",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-vivox100-blue.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 54000},
            {"storage": "512 GB", "basePrice": 61000},
        ]
    },
    {
        "id": "m-vivo-vivo-x200-pro",
        "brandId": "b-vivo",
        "brandSlug": "vivo",
        "name": "Vivo X200 Pro",
        "slug": "vivo-x200-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-vivox100pro-black.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 74000},
            {"storage": "512 GB", "basePrice": 84000},
        ]
    },
    {
        "id": "m-vivo-vivo-x200-pro-mini",
        "brandId": "b-vivo",
        "brandSlug": "vivo",
        "name": "Vivo X200 Pro Mini",
        "slug": "vivo-x200-pro-mini",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-vivox100-white.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 59000},
            {"storage": "512 GB", "basePrice": 67000},
        ]
    },
    {
        "id": "m-vivo-vivo-v50",
        "brandId": "b-vivo",
        "brandSlug": "vivo",
        "name": "Vivo V50",
        "slug": "vivo-v50",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-v40-lotus.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 26000},
            {"storage": "256 GB", "basePrice": 29500},
        ]
    },
    {
        "id": "m-vivo-vivo-v50-pro",
        "brandId": "b-vivo",
        "brandSlug": "vivo",
        "name": "Vivo V50 Pro",
        "slug": "vivo-v50-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-v40pro-titanium.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 36000},
            {"storage": "512 GB", "basePrice": 41000},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── IQOO (13, Neo 10, Neo 10 Pro) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-iqoo-iqoo-13",
        "brandId": "b-iqoo",
        "brandSlug": "iqoo",
        "name": "iQOO 13",
        "slug": "iqoo-13",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-iqoo12-legend.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 46000},
            {"storage": "512 GB", "basePrice": 52000},
        ]
    },
    {
        "id": "m-iqoo-iqoo-neo-10",
        "brandId": "b-iqoo",
        "brandSlug": "iqoo",
        "name": "iQOO Neo 10",
        "slug": "iqoo-neo-10",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-iqooneo9-fiery.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 29000},
            {"storage": "512 GB", "basePrice": 33000},
        ]
    },
    {
        "id": "m-iqoo-iqoo-neo-10-pro",
        "brandId": "b-iqoo",
        "brandSlug": "iqoo",
        "name": "iQOO Neo 10 Pro",
        "slug": "iqoo-neo-10-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-iqooneo9pro-conqueror.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 34000},
            {"storage": "512 GB", "basePrice": 39000},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── OPPO (Find X8, Find X8 Pro, Reno 13 Pro, Reno 13) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-oppo-oppo-find-x8",
        "brandId": "b-oppo",
        "brandSlug": "oppo",
        "name": "Oppo Find X8",
        "slug": "oppo-find-x8",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-findx7-black.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 54000},
            {"storage": "512 GB", "basePrice": 62000},
        ]
    },
    {
        "id": "m-oppo-oppo-find-x8-pro",
        "brandId": "b-oppo",
        "brandSlug": "oppo",
        "name": "Oppo Find X8 Pro",
        "slug": "oppo-find-x8-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-findx7ultra-ocean.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 76000},
            {"storage": "512 GB", "basePrice": 86000},
        ]
    },
    {
        "id": "m-oppo-oppo-reno-13-pro-5g",
        "brandId": "b-oppo",
        "brandSlug": "oppo",
        "name": "Oppo Reno 13 Pro 5G",
        "slug": "oppo-reno-13-pro-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-reno12pro-sunset.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 38000},
            {"storage": "512 GB", "basePrice": 43000},
        ]
    },
    {
        "id": "m-oppo-oppo-reno-13-5g",
        "brandId": "b-oppo",
        "brandSlug": "oppo",
        "name": "Oppo Reno 13 5G",
        "slug": "oppo-reno-13-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-reno12-silver.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 28000},
            {"storage": "256 GB", "basePrice": 32000},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── REALME (GT 7 Pro, 14 Pro+, 14 Pro, P3 Pro) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-realme-realme-gt-7-pro",
        "brandId": "b-realme",
        "brandSlug": "realme",
        "name": "Realme GT 7 Pro",
        "slug": "realme-gt-7-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-gt6-razor.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 48000},
            {"storage": "512 GB", "basePrice": 54000},
        ]
    },
    {
        "id": "m-realme-realme-14-pro-plus-5g",
        "brandId": "b-realme",
        "brandSlug": "realme",
        "name": "Realme 14 Pro+ 5G",
        "slug": "realme-14-pro-plus-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-realme13proplus-gold.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 23000},
            {"storage": "256 GB", "basePrice": 26500},
        ]
    },
    {
        "id": "m-realme-realme-14-pro-5g",
        "brandId": "b-realme",
        "brandSlug": "realme",
        "name": "Realme 14 Pro 5G",
        "slug": "realme-14-pro-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-realme13pro-emerald.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 18500},
            {"storage": "256 GB", "basePrice": 21500},
        ]
    },
    {
        "id": "m-realme-realme-p3-pro-5g",
        "brandId": "b-realme",
        "brandSlug": "realme",
        "name": "Realme P3 Pro 5G",
        "slug": "realme-p3-pro-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-realmep2pro-grey.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 16500},
            {"storage": "256 GB", "basePrice": 19000},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── MOTOROLA (Edge 60 Ultra, Edge 60 Pro, Razr 60 Ultra) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-motorola-moto-edge-60-ultra",
        "brandId": "b-motorola",
        "brandSlug": "motorola",
        "name": "Moto Edge 60 Ultra",
        "slug": "moto-edge-60-ultra",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-edge50ultra-peach.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 51000},
            {"storage": "512 GB", "basePrice": 58000},
        ]
    },
    {
        "id": "m-motorola-moto-edge-60-pro",
        "brandId": "b-motorola",
        "brandSlug": "motorola",
        "name": "Moto Edge 60 Pro",
        "slug": "moto-edge-60-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-edge50pro-lavender.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 39000},
            {"storage": "512 GB", "basePrice": 44000},
        ]
    },
    {
        "id": "m-motorola-moto-razr-60-ultra",
        "brandId": "b-motorola",
        "brandSlug": "motorola",
        "name": "Moto Razr 60 Ultra",
        "slug": "moto-razr-60-ultra",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-razr50ultra-spring.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 69000},
            {"storage": "512 GB", "basePrice": 79000},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── NOTHING (Phone 3, Phone 2a Plus) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-nothing-nothing-phone-3",
        "brandId": "b-nothing",
        "brandSlug": "nothing",
        "name": "Nothing Phone (3)",
        "slug": "nothing-phone-3",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-nothing2-white.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 42000},
            {"storage": "512 GB", "basePrice": 48000},
        ]
    },
    {
        "id": "m-nothing-nothing-phone-2a-plus",
        "brandId": "b-nothing",
        "brandSlug": "nothing",
        "name": "Nothing Phone (2a) Plus",
        "slug": "nothing-phone-2a-plus",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-nothing2a-black.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 24000},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── POCO (F7 Pro 5G, X7 Pro 5G) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-poco-poco-f7-pro-5g",
        "brandId": "b-poco",
        "brandSlug": "poco",
        "name": "POCO F7 Pro 5G",
        "slug": "poco-f7-pro-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pocof6-black.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "256 GB", "basePrice": 29000},
            {"storage": "512 GB", "basePrice": 34000},
        ]
    },
    {
        "id": "m-poco-poco-x7-pro-5g",
        "brandId": "b-poco",
        "brandSlug": "poco",
        "name": "POCO X7 Pro 5G",
        "slug": "poco-x7-pro-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-pocox6pro-yellow.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "MOBILE",
        "variants": [
            {"storage": "128 GB", "basePrice": 21000},
            {"storage": "256 GB", "basePrice": 24500},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── LAPTOPS (Apple, Samsung, Dell, HP, Lenovo, Asus, Acer, Microsoft) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-apple-macbook-pro-14-m4-2025",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "MacBook Pro 14 M4 (2025)",
        "slug": "macbook-pro-14-m4-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-macbookpro14-spaceblack.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 92000},
            {"ram": "24 GB", "storage": "1 TB SSD", "basePrice": 110000},
        ]
    },
    {
        "id": "m-apple-macbook-pro-14-m4-pro-2025",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "MacBook Pro 14 M4 Pro (2025)",
        "slug": "macbook-pro-14-m4-pro-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-macbookpro14-spaceblack.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "24 GB", "storage": "512 GB SSD", "basePrice": 120000},
            {"ram": "48 GB", "storage": "1 TB SSD", "basePrice": 142000},
        ]
    },
    {
        "id": "m-apple-macbook-pro-14-m4-max-2025",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "MacBook Pro 14 M4 Max (2025)",
        "slug": "macbook-pro-14-m4-max-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-macbookpro14-spaceblack.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "36 GB", "storage": "1 TB SSD", "basePrice": 175000},
            {"ram": "64 GB", "storage": "2 TB SSD", "basePrice": 210000},
        ]
    },
    {
        "id": "m-apple-macbook-pro-16-m4-pro-2025",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "MacBook Pro 16 M4 Pro (2025)",
        "slug": "macbook-pro-16-m4-pro-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-macbookpro16-silver.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "24 GB", "storage": "512 GB SSD", "basePrice": 142000},
            {"ram": "48 GB", "storage": "1 TB SSD", "basePrice": 168000},
        ]
    },
    {
        "id": "m-apple-macbook-pro-16-m4-max-2025",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "MacBook Pro 16 M4 Max (2025)",
        "slug": "macbook-pro-16-m4-max-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-macbookpro16-silver.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "36 GB", "storage": "1 TB SSD", "basePrice": 195000},
            {"ram": "64 GB", "storage": "2 TB SSD", "basePrice": 235000},
        ]
    },
    {
        "id": "m-apple-macbook-air-13-m4-2025",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "MacBook Air 13 M4 (2025)",
        "slug": "macbook-air-13-m4-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-macbookair13-midnight.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "256 GB SSD", "basePrice": 65000},
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 78000},
            {"ram": "24 GB", "storage": "512 GB SSD", "basePrice": 89000},
        ]
    },
    {
        "id": "m-apple-macbook-air-15-m4-2025",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "MacBook Air 15 M4 (2025)",
        "slug": "macbook-air-15-m4-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-macbookair15-starlight.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "256 GB SSD", "basePrice": 79000},
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 92000},
            {"ram": "24 GB", "storage": "512 GB SSD", "basePrice": 104000},
        ]
    },
    {
        "id": "m-samsung-galaxy-book6-series",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Galaxy Book6 Series",
        "slug": "galaxy-book6-series",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-galaxybook4-pro.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 51000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 62000},
        ]
    },
    {
        "id": "m-samsung-galaxy-book6-pro-series",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Galaxy Book6 Pro Series",
        "slug": "galaxy-book6-pro-series",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-galaxybook4-pro.png?w=800",
        "releaseYear": 2026,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 61000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 72000},
        ]
    },
    {
        "id": "m-samsung-galaxy-book5-pro-360",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Galaxy Book5 Pro 360",
        "slug": "galaxy-book5-pro-360",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-galaxybook4-pro.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 68000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 81000},
        ]
    },
    {
        "id": "m-dell-dell-xps-13-copilot-plus-2025",
        "brandId": "b-dell",
        "brandSlug": "dell",
        "name": "Dell XPS 13 Copilot+ AI PC",
        "slug": "dell-xps-13-copilot-plus-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-dell-xps13-plus.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 62000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 74000},
        ]
    },
    {
        "id": "m-dell-dell-xps-14-core-ultra-2025",
        "brandId": "b-dell",
        "brandSlug": "dell",
        "name": "Dell XPS 14 Core Ultra Series",
        "slug": "dell-xps-14-core-ultra-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-dell-xps14.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 76000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 89000},
        ]
    },
    {
        "id": "m-dell-dell-xps-16-core-ultra-2025",
        "brandId": "b-dell",
        "brandSlug": "dell",
        "name": "Dell XPS 16 Core Ultra Series",
        "slug": "dell-xps-16-core-ultra-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-dell-xps16.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 98000},
            {"ram": "64 GB", "storage": "2 TB SSD", "basePrice": 122000},
        ]
    },
    {
        "id": "m-dell-alienware-m16-r2-gaming",
        "brandId": "b-dell",
        "brandSlug": "dell",
        "name": "Alienware m16 R2 Gaming Laptop",
        "slug": "alienware-m16-r2-gaming",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-alienware-m16.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "1 TB SSD", "basePrice": 85000},
            {"ram": "32 GB", "storage": "2 TB SSD", "basePrice": 105000},
        ]
    },
    {
        "id": "m-hp-hp-omnibook-x-ai-series",
        "brandId": "b-hp",
        "brandSlug": "hp",
        "name": "HP OmniBook X AI Series",
        "slug": "hp-omnibook-x-ai-series",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-hp-spectre14.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 57000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 68000},
        ]
    },
    {
        "id": "m-hp-hp-spectre-x360-14-2025",
        "brandId": "b-hp",
        "brandSlug": "hp",
        "name": "HP Spectre x360 14 (2025)",
        "slug": "hp-spectre-x360-14-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-hp-spectre14.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 69000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 82000},
        ]
    },
    {
        "id": "m-hp-hp-omen-transcend-14-2025",
        "brandId": "b-hp",
        "brandSlug": "hp",
        "name": "HP OMEN Transcend 14",
        "slug": "hp-omen-transcend-14-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-hp-omen16.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "1 TB SSD", "basePrice": 78000},
            {"ram": "32 GB", "storage": "2 TB SSD", "basePrice": 95000},
        ]
    },
    {
        "id": "m-hp-hp-pavilion-plus-14-ai",
        "brandId": "b-hp",
        "brandSlug": "hp",
        "name": "HP Pavilion Plus 14 AI",
        "slug": "hp-pavilion-plus-14-ai",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-hp-pavilion14.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 46000},
            {"ram": "16 GB", "storage": "1 TB SSD", "basePrice": 53000},
        ]
    },
    {
        "id": "m-lenovo-lenovo-thinkpad-x1-carbon-gen-13",
        "brandId": "b-lenovo",
        "brandSlug": "lenovo",
        "name": "Lenovo ThinkPad X1 Carbon Gen 13 Aura",
        "slug": "lenovo-thinkpad-x1-carbon-gen-13",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-thinkpad-x1.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 79000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 96000},
        ]
    },
    {
        "id": "m-lenovo-lenovo-yoga-slim-7x-copilot",
        "brandId": "b-lenovo",
        "brandSlug": "lenovo",
        "name": "Lenovo Yoga Slim 7x Copilot+",
        "slug": "lenovo-yoga-slim-7x-copilot",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-lenovo-yoga9.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 62000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 74000},
        ]
    },
    {
        "id": "m-lenovo-lenovo-legion-pro-7i-gen-10",
        "brandId": "b-lenovo",
        "brandSlug": "lenovo",
        "name": "Lenovo Legion Pro 7i Gen 10",
        "slug": "lenovo-legion-pro-7i-gen-10",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-lenovo-legion7.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 98000},
            {"ram": "32 GB", "storage": "2 TB SSD", "basePrice": 118000},
        ]
    },
    {
        "id": "m-asus-asus-zenbook-s-16-ai-2025",
        "brandId": "b-asus",
        "brandSlug": "asus",
        "name": "Asus Zenbook S 16 AI (2025)",
        "slug": "asus-zenbook-s-16-ai-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-asus-zenbook14.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "24 GB", "storage": "1 TB SSD", "basePrice": 79000},
            {"ram": "32 GB", "storage": "2 TB SSD", "basePrice": 94000},
        ]
    },
    {
        "id": "m-asus-asus-rog-zephyrus-g16-2025",
        "brandId": "b-asus",
        "brandSlug": "asus",
        "name": "Asus ROG Zephyrus G16 (2025)",
        "slug": "asus-rog-zephyrus-g16-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-asus-rog-zephyrus.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "1 TB SSD", "basePrice": 96000},
            {"ram": "32 GB", "storage": "2 TB SSD", "basePrice": 118000},
        ]
    },
    {
        "id": "m-asus-asus-vivobook-s-15-copilot",
        "brandId": "b-asus",
        "brandSlug": "asus",
        "name": "Asus Vivobook S 15 Copilot+",
        "slug": "asus-vivobook-s-15-copilot",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-asus-vivobook15.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 52000},
            {"ram": "16 GB", "storage": "1 TB SSD", "basePrice": 61000},
        ]
    },
    {
        "id": "m-acer-acer-swift-14-ai-copilot",
        "brandId": "b-acer",
        "brandSlug": "acer",
        "name": "Acer Swift 14 AI Copilot+",
        "slug": "acer-swift-14-ai-copilot",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-acer-swift3.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 49000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 59000},
        ]
    },
    {
        "id": "m-acer-acer-predator-helios-16-2025",
        "brandId": "b-acer",
        "brandSlug": "acer",
        "name": "Acer Predator Helios 16 (2025)",
        "slug": "acer-predator-helios-16-2025",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-acer-predator16.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "1 TB SSD", "basePrice": 76000},
            {"ram": "32 GB", "storage": "2 TB SSD", "basePrice": 92000},
        ]
    },
    {
        "id": "m-microsoft-surface-laptop-7th-edition",
        "brandId": "b-microsoft",
        "brandSlug": "microsoft",
        "name": "Surface Laptop 7th Edition Copilot+",
        "slug": "surface-laptop-7th-edition",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-surface-laptop5.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "256 GB SSD", "basePrice": 56000},
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 66000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 82000},
        ]
    },
    {
        "id": "m-microsoft-surface-pro-11th-edition",
        "brandId": "b-microsoft",
        "brandSlug": "microsoft",
        "name": "Surface Pro 11th Edition Copilot+",
        "slug": "surface-pro-11th-edition",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-surface-pro9.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "LAPTOP",
        "variants": [
            {"ram": "16 GB", "storage": "256 GB SSD", "basePrice": 58000},
            {"ram": "16 GB", "storage": "512 GB SSD", "basePrice": 68000},
            {"ram": "32 GB", "storage": "1 TB SSD", "basePrice": 84000},
        ]
    },

    # ══════════════════════════════════════════════════════════════════
    # ── TABLETS (Apple, Samsung, OnePlus, Xiaomi, Lenovo, Realme) ──
    # ══════════════════════════════════════════════════════════════════
    {
        "id": "m-apple-apple-ipad-pro-11-m4-wi-fi",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPad Pro 11 M4 (Wi-Fi)",
        "slug": "apple-ipad-pro-11-m4-wi-fi",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-ipad-pro-m4.png?w=800",
        "releaseYear": 2024,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "256 GB", "basePrice": 56000},
            {"storage": "512 GB", "basePrice": 69000},
            {"storage": "1 TB", "basePrice": 86000},
        ]
    },
    {
        "id": "m-apple-apple-ipad-pro-13-m4-wi-fi",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPad Pro 13 M4 (Wi-Fi)",
        "slug": "apple-ipad-pro-13-m4-wi-fi",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-ipad-pro-m4-13.png?w=800",
        "releaseYear": 2024,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "256 GB", "basePrice": 74000},
            {"storage": "512 GB", "basePrice": 89000},
            {"storage": "1 TB", "basePrice": 108000},
        ]
    },
    {
        "id": "m-apple-apple-ipad-air-11-m2-wi-fi",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPad Air 11 M2 (Wi-Fi)",
        "slug": "apple-ipad-air-11-m2-wi-fi",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-ipad-air-m2.png?w=800",
        "releaseYear": 2024,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 39000},
            {"storage": "256 GB", "basePrice": 46500},
            {"storage": "512 GB", "basePrice": 57000},
        ]
    },
    {
        "id": "m-apple-apple-ipad-air-13-m2-wi-fi",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPad Air 13 M2 (Wi-Fi)",
        "slug": "apple-ipad-air-13-m2-wi-fi",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-ipad-air-m2-13.png?w=800",
        "releaseYear": 2024,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 49000},
            {"storage": "256 GB", "basePrice": 57500},
            {"storage": "512 GB", "basePrice": 69000},
        ]
    },
    {
        "id": "m-apple-apple-ipad-mini-7th-gen",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPad mini 7th Gen (A17 Pro)",
        "slug": "apple-ipad-mini-7th-gen",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-ipad-mini-purple.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 35500},
            {"storage": "256 GB", "basePrice": 42500},
            {"storage": "512 GB", "basePrice": 53000},
        ]
    },
    {
        "id": "m-apple-apple-ipad-11th-gen",
        "brandId": "b-apple",
        "brandSlug": "apple",
        "name": "Apple iPad 11th Gen (A16)",
        "slug": "apple-ipad-11th-gen",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-ipad10-yellow.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "64 GB", "basePrice": 22000},
            {"storage": "128 GB", "basePrice": 26500},
            {"storage": "256 GB", "basePrice": 32000},
        ]
    },
    {
        "id": "m-samsung-galaxy-tab-s10-ultra-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy Tab S10 Ultra 5G",
        "slug": "samsung-galaxy-tab-s10-ultra-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-galaxy-tabs9ultra.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "256 GB", "basePrice": 71000},
            {"storage": "512 GB", "basePrice": 82000},
            {"storage": "1 TB", "basePrice": 96000},
        ]
    },
    {
        "id": "m-samsung-galaxy-tab-s10-plus-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy Tab S10 Plus 5G",
        "slug": "samsung-galaxy-tab-s10-plus-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-galaxy-tabs9plus.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "256 GB", "basePrice": 54000},
            {"storage": "512 GB", "basePrice": 63000},
        ]
    },
    {
        "id": "m-samsung-galaxy-tab-s10-fe-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy Tab S10 FE 5G",
        "slug": "samsung-galaxy-tab-s10-fe-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-galaxy-tabs9fe.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 31000},
            {"storage": "256 GB", "basePrice": 36000},
        ]
    },
    {
        "id": "m-samsung-galaxy-tab-a9-plus-5g",
        "brandId": "b-samsung",
        "brandSlug": "samsung",
        "name": "Samsung Galaxy Tab A9+ 5G",
        "slug": "samsung-galaxy-tab-a9-plus-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-galaxy-taba9plus.png?w=800",
        "releaseYear": 2024,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "64 GB", "basePrice": 12500},
            {"storage": "128 GB", "basePrice": 15500},
        ]
    },
    {
        "id": "m-oneplus-oneplus-pad-2",
        "brandId": "b-oneplus",
        "brandSlug": "oneplus",
        "name": "OnePlus Pad 2",
        "slug": "oneplus-pad-2",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-oneplus-pad.png?w=800",
        "releaseYear": 2024,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 27000},
            {"storage": "256 GB", "basePrice": 32000},
        ]
    },
    {
        "id": "m-oneplus-oneplus-pad-go-2",
        "brandId": "b-oneplus",
        "brandSlug": "oneplus",
        "name": "OnePlus Pad Go 2",
        "slug": "oneplus-pad-go-2",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-oneplus-padgo.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 15500},
        ]
    },
    {
        "id": "m-xiaomi-xiaomi-pad-7-pro",
        "brandId": "b-xiaomi",
        "brandSlug": "xiaomi",
        "name": "Xiaomi Pad 7 Pro",
        "slug": "xiaomi-pad-7-pro",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-xiaomi-pad6.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 22500},
            {"storage": "256 GB", "basePrice": 26500},
            {"storage": "512 GB", "basePrice": 31000},
        ]
    },
    {
        "id": "m-xiaomi-xiaomi-pad-7",
        "brandId": "b-xiaomi",
        "brandSlug": "xiaomi",
        "name": "Xiaomi Pad 7",
        "slug": "xiaomi-pad-7",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-xiaomi-pad6.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 18000},
            {"storage": "256 GB", "basePrice": 21500},
        ]
    },
    {
        "id": "m-xiaomi-redmi-pad-pro-5g",
        "brandId": "b-xiaomi",
        "brandSlug": "xiaomi",
        "name": "Redmi Pad Pro 5G",
        "slug": "redmi-pad-pro-5g",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-redmipad-grey.png?w=800",
        "releaseYear": 2024,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 16000},
            {"storage": "256 GB", "basePrice": 19000},
        ]
    },
    {
        "id": "m-lenovo-lenovo-tab-p12-pro-gen-2",
        "brandId": "b-lenovo",
        "brandSlug": "lenovo",
        "name": "Lenovo Tab P12 Pro 2nd Gen",
        "slug": "lenovo-tab-p12-pro-gen-2",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-lenovo-tabp12.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 23000},
            {"storage": "256 GB", "basePrice": 27500},
        ]
    },
    {
        "id": "m-lenovo-lenovo-legion-tab-gen-3",
        "brandId": "b-lenovo",
        "brandSlug": "lenovo",
        "name": "Lenovo Legion Tab Gen 3",
        "slug": "lenovo-legion-tab-gen-3",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-lenovo-legion-tab.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "256 GB", "basePrice": 29000},
        ]
    },
    {
        "id": "m-realme-realme-pad-3",
        "brandId": "b-realme",
        "brandSlug": "realme",
        "name": "Realme Pad 3",
        "slug": "realme-pad-3",
        "imageUrl": "https://s3ng.cashify.in/cashify/product/img/xhdpi/csh-realmepad2-green.png?w=800",
        "releaseYear": 2025,
        "popular": true,
        "active": true,
        "contactForPrice": false,
        "category": "TABLET",
        "variants": [
            {"storage": "128 GB", "basePrice": 14000},
            {"storage": "256 GB", "basePrice": 17000},
        ]
    }
]

# 2. Build flat models list and flat variants list
all_new_models = []
all_new_variants = []

for m in NEW_MODELS:
    model_obj = {
        "id": m["id"],
        "brandId": m["brandId"],
        "brandSlug": m["brandSlug"],
        "name": m["name"],
        "slug": m["slug"],
        "imageUrl": m["imageUrl"],
        "releaseYear": m["releaseYear"],
        "popular": m["popular"],
        "active": m["active"],
        "contactForPrice": m["contactForPrice"],
        "category": m["category"]
    }
    all_new_models.append(model_obj)

    for v in m["variants"]:
        storage_slug = v["storage"].lower().replace(" ", "-")
        ram_slug = f"-{v['ram'].lower().replace(' ', '-')}" if "ram" in v else ""
        variant_id = f"v-{m['id']}{ram_slug}-{storage_slug}"
        var_obj = {
            "id": variant_id,
            "modelId": m["id"],
            "storage": v["storage"],
            "basePrice": v["basePrice"],
            "active": True
        }
        if "ram" in v:
            var_obj["ram"] = v["ram"]
        all_new_variants.append(var_obj)

print(f"Total processed: {len(all_new_models)} models and {len(all_new_variants)} variants.")

# 3. Read and update lib/store.ts
store_path = "lib/store.ts"
with open(store_path, "r", encoding="utf-8") as f:
    store_code = f.read()

# Filter out any model IDs that already exist in store_code
existing_model_ids = set(re.findall(r'"id":\s*"(m-[^"]+)"', store_code))
filtered_models = [m for m in all_new_models if m["id"] not in existing_model_ids]
filtered_model_ids = set(m["id"] for m in filtered_models)
filtered_variants = [v for v in all_new_variants if v["modelId"] in filtered_model_ids]

print(f"New models to add to store.ts: {len(filtered_models)} (skipping {len(all_new_models) - len(filtered_models)} existing)")
print(f"New variants to add to store.ts: {len(filtered_variants)}")

if filtered_models:
    # Format models as TypeScript code
    models_ts = "\nconst LATEST_2026_MODELS: DeviceModelData[] = " + json.dumps(filtered_models, indent=2) + ";\n"
    variants_ts = "\nconst LATEST_2026_VARIANTS: DeviceVariantData[] = " + json.dumps(filtered_variants, indent=2) + ";\n"

    # Insert models_ts right before `export const INITIAL_MODELS`
    models_export_pattern = r"(export const INITIAL_MODELS: DeviceModelData\[\] = \[)"
    if "...LATEST_2026_MODELS," not in store_code:
        store_code = re.sub(
            models_export_pattern,
            models_ts + r"\nexport const INITIAL_MODELS: DeviceModelData[] = [...LATEST_2026_MODELS, ",
            store_code,
            count=1
        )
    else:
        # If LATEST_2026_MODELS already exists, prepend these additional models
        store_code = re.sub(
            r"const LATEST_2026_MODELS: DeviceModelData\[\] = \[",
            "const LATEST_2026_MODELS: DeviceModelData[] = " + json.dumps(filtered_models, indent=2)[:-1] + ",\n",
            store_code,
            count=1
        )

    # Insert variants_ts right before `export const INITIAL_VARIANTS`
    variants_export_pattern = r"(export const INITIAL_VARIANTS: DeviceVariantData\[\] = \[)"
    if "...LATEST_2026_VARIANTS," not in store_code:
        store_code = re.sub(
            variants_export_pattern,
            variants_ts + r"\nexport const INITIAL_VARIANTS: DeviceVariantData[] = [...LATEST_2026_VARIANTS, ",
            store_code,
            count=1
        )
    else:
        store_code = re.sub(
            r"const LATEST_2026_VARIANTS: DeviceVariantData\[\] = \[",
            "const LATEST_2026_VARIANTS: DeviceVariantData[] = " + json.dumps(filtered_variants, indent=2)[:-1] + ",\n",
            store_code,
            count=1
        )

    with open(store_path, "w", encoding="utf-8") as f:
        f.write(store_code)
    print("Successfully updated lib/store.ts with LATEST_2026_MODELS and LATEST_2026_VARIANTS!")

# 4. Update lib/series-data.ts
series_path = "lib/series-data.ts"
with open(series_path, "r", encoding="utf-8") as f:
    series_code = f.read()

# Add iPhone 18 Series to apple brand
if "iPhone 18 Series" not in series_code:
    series_code = series_code.replace(
        'apple: [',
        'apple: [\n    { id: "s-app-18", name: "iPhone 18 Series", matchPattern: ["iPhone 18", "iPhone 18 Pro", "iPhone 18 Air"] },'
    )

# Ensure Galaxy S Series has S26
if '"S26"' not in series_code:
    series_code = series_code.replace(
        'matchPattern: ["Galaxy S", "S25"',
        'matchPattern: ["Galaxy S", "S26", "S25"'
    )
elif '"Galaxy S", "S24"' in series_code and '"S26"' not in series_code:
    series_code = series_code.replace(
        'matchPattern: ["Galaxy S", "S24"',
        'matchPattern: ["Galaxy S", "S26", "S25", "S24"'
    )

# Ensure OnePlus has OnePlus 13
if '"OnePlus 13"' not in series_code:
    series_code = series_code.replace(
        'matchPattern: ["OnePlus 12"',
        'matchPattern: ["OnePlus 13", "OnePlus 12"'
    )

# Ensure Google has Pixel 10
if 'Pixel 10 Series' not in series_code and 'google: [' in series_code:
    series_code = series_code.replace(
        'google: [',
        'google: [\n    { id: "s-goo-10", name: "Pixel 10 Series", matchPattern: ["Pixel 10"] },'
    )

with open(series_path, "w", encoding="utf-8") as f:
    f.write(series_code)
print("Successfully updated lib/series-data.ts with iPhone 18 Series, S26, OnePlus 13, and Pixel 10!")

# 5. Update CashALL_Product_Images_Master.json
master_json_path = "public/CashALL_Product_Images_Master.json"
if os.path.exists(master_json_path):
    with open(master_json_path, "r", encoding="utf-8") as f:
        master_data = json.load(f)

    existing_master_slugs = set(m.get("modelSlug") for m in master_data.get("models", []))
    added_to_master = 0
    for m in all_new_models:
        if m["slug"] not in existing_master_slugs:
            brand_name_display = m["brandSlug"].capitalize()
            if m["brandSlug"] == "apple": brand_name_display = "Apple"
            elif m["brandSlug"] == "samsung": brand_name_display = "Samsung"
            elif m["brandSlug"] == "oneplus": brand_name_display = "OnePlus"
            elif m["brandSlug"] == "google": brand_name_display = "Google"
            elif m["brandSlug"] == "xiaomi": brand_name_display = "Xiaomi"
            elif m["brandSlug"] == "vivo": brand_name_display = "Vivo"
            elif m["brandSlug"] == "dell": brand_name_display = "Dell"
            elif m["brandSlug"] == "hp": brand_name_display = "HP"
            elif m["brandSlug"] == "lenovo": brand_name_display = "Lenovo"
            elif m["brandSlug"] == "asus": brand_name_display = "Asus"
            elif m["brandSlug"] == "acer": brand_name_display = "Acer"
            elif m["brandSlug"] == "microsoft": brand_name_display = "Microsoft"

            master_data["models"].append({
                "category": m["category"],
                "brandName": brand_name_display,
                "brandSlug": m["brandSlug"],
                "modelName": m["name"],
                "modelSlug": m["slug"],
                "directCdnUrl": m["imageUrl"],
                "cashallProxyUrl": f"https://www.cashall.in/api/v1/catalog/image/{m['slug']}"
            })
            added_to_master += 1

    master_data["metadata"]["totalModelsWithImages"] = len(master_data["models"])
    with open(master_json_path, "w", encoding="utf-8") as f:
        json.dump(master_data, f, indent=2)
    print(f"Updated CashALL_Product_Images_Master.json! Added {added_to_master} new models. Total: {len(master_data['models'])}")

# 6. Update CashALL_All_Products_Catalog.csv
catalog_csv_path = "public/CashALL_All_Products_Catalog.csv"
if os.path.exists(catalog_csv_path):
    with open(catalog_csv_path, "a", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        for m in all_new_models:
            for v in m.get("variants", []):
                writer.writerow([
                    m["category"],
                    m["brandSlug"].upper(),
                    m["name"],
                    m["slug"],
                    v["storage"],
                    v.get("ram", "N/A"),
                    v["basePrice"],
                    "ACTIVE"
                ])
    print("Updated CashALL_All_Products_Catalog.csv with new 2026 models and variants!")

print("Catalog injection script completed successfully!")
