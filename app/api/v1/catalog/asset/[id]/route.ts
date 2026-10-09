import { NextRequest, NextResponse } from "next/server";

export const revalidate = 2592000; // Cache on Edge for 30 days
export const runtime = "nodejs";

// Clean SVGs for common evaluation question parts
const FALLBACK_ICON_SVGS: Record<string, string> = {
  default: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect width="100" height="100" rx="16" fill="#f4f4f5"/>
    <circle cx="50" cy="50" r="24" fill="#e4e4e7"/>
    <circle cx="50" cy="50" r="12" fill="#fbbf24"/>
  </svg>`,
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  if (!id) {
    return new NextResponse("Asset ID required", { status: 400 });
  }

  const targetUrl = `https://s3ng.cashify.in/cashify/productLinePartVariation/img/xhdpi/${id}`;

  return NextResponse.redirect(targetUrl, {
    status: 308,
    headers: {
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });

  return new NextResponse(FALLBACK_ICON_SVGS.default, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
    },
  });
}
