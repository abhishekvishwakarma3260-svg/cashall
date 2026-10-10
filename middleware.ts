import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const correlationId = request.headers.get("x-correlation-id") || `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // 1. Canonical Domain Redirection:
  // If traffic lands on vercel.app preview/production domains or non-www cashall.in, 301 redirect to canonical https://www.cashall.in
  if (
    !host.includes("localhost") &&
    !host.includes("127.0.0.1") &&
    (host.endsWith(".vercel.app") || host === "cashall.in")
  ) {
    const url = request.nextUrl.clone();
    url.hostname = "www.cashall.in";
    url.port = "";
    url.protocol = "https";
    return NextResponse.redirect(url, { status: 301 });
  }

  // Clone response or proceed
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  // 2. Set Correlation ID for distributed tracing
  response.headers.set("X-Correlation-ID", correlationId);

  // 3. Security Headers
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(self), microphone=(), geolocation=(self)"
  );

  // 4. Content Security Policy (allows Next.js runtime, Meta Pixel, Google Fonts, and self)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com data:;
    connect-src 'self' https://*.supabase.co https://aws-0-ap-south-1.pooler.supabase.com https://api.startmessaging.com https://*.facebook.com https://connect.facebook.net https://api.resend.com;
    frame-ancestors 'self';
    form-action 'self';
    base-uri 'self';
  `.replace(/\s{2,}/g, " ").trim();

  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|photos|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
