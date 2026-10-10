import { NextRequest, NextResponse } from "next/server";

export const revalidate = 31536000; // Cache on Edge for 1 year
export const runtime = "edge";

const DEFAULT_CDN_IMAGES: Record<string, string> = {
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

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params?.slug?.toLowerCase() || "";
  let targetUrl = DEFAULT_CDN_IMAGES[slug];

  if (!targetUrl) {
    if (
      slug.includes("macbook") ||
      slug.includes("laptop") ||
      slug.includes("xps") ||
      slug.includes("thinkpad") ||
      slug.includes("aspire") ||
      slug.includes("dell") ||
      slug.includes("hp")
    ) {
      targetUrl = DEFAULT_CDN_IMAGES["default-laptop"];
    } else if (slug.includes("pad") || slug.includes("tab")) {
      targetUrl = DEFAULT_CDN_IMAGES["default-tablet"];
    } else {
      targetUrl = DEFAULT_CDN_IMAGES["default-phone"];
    }
  }

  return NextResponse.redirect(targetUrl, {
    status: 301,
    headers: {
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
