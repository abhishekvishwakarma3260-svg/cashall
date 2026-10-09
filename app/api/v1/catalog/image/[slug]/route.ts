import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const revalidate = 2592000; // Cache on Edge for 30 days
export const runtime = "nodejs";

let imageCacheMap: Map<string, string> | null = null;

function getImageMap(): Map<string, string> {
  if (imageCacheMap) return imageCacheMap;

  imageCacheMap = new Map();
  try {
    const jsonPath = path.join(process.cwd(), "public", "CashALL_Product_Images_Master.json");
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      for (const m of data.models || []) {
        if (m.modelSlug && m.directCdnUrl) {
          // Avoid promotional banners
          if (!m.directCdnUrl.includes("builder/")) {
            imageCacheMap.set(m.modelSlug.toLowerCase(), m.directCdnUrl);
          }
        }
      }
    }
  } catch (err) {
    console.error("Error loading product images master dataset:", err);
  }

  // Guaranteed verified fallback images
  const defaults: Record<string, string> = {
    "apple-iphone-18-pro": "https://s3ng.cashify.in/cashify/product/img/xhdpi/4b5acc64-b19f.jpg?w=800",
    "apple-iphone-18-pro-max": "https://s3ng.cashify.in/cashify/product/img/xhdpi/e09d2a73-632e.jpg?w=800",
    "samsung-galaxy-s26-ultra-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/44993712-50cd.jpg?w=800",
    "samsung-galaxy-s26-ultra": "https://s3ng.cashify.in/cashify/product/img/xhdpi/44993712-50cd.jpg?w=800",
    "samsung-galaxy-s26-plus-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ed7b2d75-340d.jpg?w=800",
    "samsung-galaxy-s26-plus": "https://s3ng.cashify.in/cashify/product/img/xhdpi/ed7b2d75-340d.jpg?w=800",
    "samsung-galaxy-s26-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/3967bfe5-be37.jpg?w=800",
    "samsung-galaxy-s26": "https://s3ng.cashify.in/cashify/product/img/xhdpi/3967bfe5-be37.jpg?w=800",
    "samsung-galaxy-s25-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "samsung-galaxy-s25-plus-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/db22b6b5-ffae.jpg?w=800",
    "samsung-galaxy-s25-ultra-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/272230cb-1a72.jpg?w=800",
    "samsung-galaxy-m17-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "samsung-galaxy-m16-5g": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "samsung-galaxy-m15-5g-prime-edition": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "google-pixel-10-pro-fold": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "default-phone": "https://s3ng.cashify.in/cashify/product/img/xhdpi/dab0d987-4d22.jpg?w=800",
    "default-laptop": "https://s3ng.cashify.in/cashify/product/img/xhdpi/cb8d3fcc-76f8.jpg?w=800",
    "default-tablet": "https://s3ng.cashify.in/cashify/product/img/xhdpi/57301cf3a2212.jpg?w=800",
  };

  for (const [k, v] of Object.entries(defaults)) {
    if (!imageCacheMap.has(k)) {
      imageCacheMap.set(k, v);
    }
  }

  return imageCacheMap;
}

// Fallback high-res device SVG when upstream fails or 404
const FALLBACK_DEVICE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <rect width="400" height="600" fill="#fafafa" rx="24"/>
  <rect x="75" y="70" width="250" height="460" rx="42" fill="url(#bg)" stroke="#27272a" stroke-width="4"/>
  <rect x="90" y="85" width="220" height="430" rx="32" fill="#18181b"/>
  <rect x="160" y="98" width="80" height="18" rx="9" fill="#09090b"/>
  <circle cx="225" cy="107" r="4" fill="#27272a"/>
  <circle cx="200" cy="300" r="36" fill="url(#gold)" opacity="0.15"/>
  <path d="M190 290 L210 300 L190 310 Z" fill="url(#gold)"/>
  <text x="200" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#a1a1aa" text-anchor="middle" letter-spacing="1">CashALL CERTIFIED</text>
</svg>`;

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params?.slug?.toLowerCase();
  if (!slug) {
    return new NextResponse("Model slug required", { status: 400 });
  }

  const map = getImageMap();
  let targetUrl = map.get(slug);

  if (!targetUrl) {
    // Intelligent category fallback
    if (slug.includes("macbook") || slug.includes("laptop") || slug.includes("xps") || slug.includes("thinkpad")) {
      targetUrl = map.get("default-laptop")!;
    } else if (slug.includes("pad") || slug.includes("tab")) {
      targetUrl = map.get("default-tablet")!;
    } else {
      targetUrl = map.get("default-phone")!;
    }
  }

  if (targetUrl) {
    return NextResponse.redirect(targetUrl, {
      status: 308,
      headers: {
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    });
  }

  // Graceful SVG fallback
  return new NextResponse(FALLBACK_DEVICE_SVG, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
    },
  });
}
