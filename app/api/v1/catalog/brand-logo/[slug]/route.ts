import { NextRequest, NextResponse } from "next/server";

export const revalidate = 2592000; // Cache on Edge for 30 days
export const runtime = "nodejs";

const BRAND_LOGO_URLS: Record<string, string> = {
  apple: "https://s3n.cashify.in/cashify/brand/img/xhdpi/2e7cdc22-5a5f.jpg?w=200",
  samsung: "https://s3n.cashify.in/cashify/brand/img/xhdpi/406a512d-e8dd.jpg?w=200",
  xiaomi: "https://s3n.cashify.in/cashify/brand/img/xhdpi/dfb6c340-010f.jpg?w=200",
  oneplus: "https://s3n.cashify.in/cashify/brand/img/xhdpi/cb96df6e-080f.jpg?w=200",
  vivo: "https://s3n.cashify.in/cashify/brand/img/xhdpi/20922c34-8afc.jpg?w=200",
  oppo: "https://s3n.cashify.in/cashify/brand/img/xhdpi/ac5c9a7b-76b5.jpg?w=200",
  realme: "https://s3n.cashify.in/cashify/brand/img/xhdpi/0124cc45-3a6c.jpg?w=200",
  motorola: "https://s3n.cashify.in/cashify/brand/img/xhdpi/3e072dc2-6d7b.jpg?w=200",
  google: "https://s3n.cashify.in/cashify/brand/img/xhdpi/1dcd7fda-0141.jpg?w=200",
  iqoo: "https://s3n.cashify.in/cashify/brand/img/xhdpi/dacc50a2-77a9.jpg?w=200",
  poco: "https://s3n.cashify.in/cashify/brand/img/xhdpi/e1b13cbc-ef06.jpg?w=200",
  nothing: "https://s3n.cashify.in/cashify/brand/img/xhdpi/06bc74db-4d38.jpg?w=200",
  nokia: "https://s3n.cashify.in/cashify/brand/img/xhdpi/cfeaabff-69bf.jpg?w=200",
  honor: "https://s3n.cashify.in/cashify/brand/img/xhdpi/738cb1f1-7ddf.jpg?w=200",
  infinix: "https://s3n.cashify.in/cashify/brand/img/xhdpi/55424ad4-0400.jpg?w=200",
  tecno: "https://s3n.cashify.in/cashify/brand/img/xhdpi/fef4e5ae-6507.jpg?w=200",
  dell: "https://s3n.cashify.in/cashify/brand/img/xhdpi/bdbdc48e-dd24.jpg?w=200",
  hp: "https://s3n.cashify.in/cashify/brand/img/xhdpi/d3b4fdda-2d57.jpg?w=200",
  lenovo: "https://s3n.cashify.in/cashify/brand/img/xhdpi/f78db5fb-857c.jpg?w=200",
  asus: "https://s3n.cashify.in/cashify/brand/img/xhdpi/4834825a-7f10.jpg?w=200",
  acer: "https://s3n.cashify.in/cashify/brand/img/xhdpi/bf25222a-a2a7.jpg?w=200",
  microsoft: "https://s3n.cashify.in/cashify/brand/img/xhdpi/2c350ab6-da4f.jpg?w=200",
  huawei: "https://s3n.cashify.in/cashify/brand/img/xhdpi/b00e17d8-fdd0.jpg?w=200",
  msi: "https://s3n.cashify.in/cashify/brand/img/xhdpi/3e0e18bd-7fa2.jpg?w=200",
  avita: "https://s3n.cashify.in/cashify/brand/img/xhdpi/8ae5b678-550c.jpg?w=200",
  lava: "https://s3n.cashify.in/cashify/brand/img/xhdpi/da0de74d-0f4d.jpg?w=200",
};

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params?.slug?.toLowerCase();
  if (!slug) {
    return new NextResponse("Brand slug required", { status: 400 });
  }

  const targetUrl = BRAND_LOGO_URLS[slug];
  if (targetUrl) {
    return NextResponse.redirect(targetUrl, {
      status: 308,
      headers: {
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    });
  }

  // Fallback SVG with brand name text
  const cleanName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
    <rect width="200" height="80" rx="16" fill="#18181b"/>
    <text x="100" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#fbbf24" text-anchor="middle" letter-spacing="1">${cleanName}</text>
  </svg>`;

  return new NextResponse(fallbackSvg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
    },
  });
}
