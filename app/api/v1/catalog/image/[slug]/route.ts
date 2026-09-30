import { NextRequest, NextResponse } from "next/server";
import { INITIAL_MODELS } from "@/lib/store";

export const revalidate = 604800; // Cache on Edge for 7 days

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params?.slug;
  if (!slug) {
    return new NextResponse("Model slug required", { status: 400 });
  }

  const model = INITIAL_MODELS.find(
    (m) => m.slug.toLowerCase() === slug.toLowerCase()
  );

  const fallbackUrl = "https://www.cashall.in/photos/CashALL_logo.png";
  const targetUrl =
    model?.imageUrl && model.imageUrl.startsWith("http")
      ? model.imageUrl
      : fallbackUrl;

  // Immediate permanent redirect with aggressive CDN caching
  // Bypasses Vercel compute buffer & eliminates Fast Origin Transfer egress
  return NextResponse.redirect(targetUrl, {
    status: 308,
    headers: {
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
