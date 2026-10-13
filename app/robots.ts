import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = [
    "/admin/",
    "/partner/",
    "/agent/",
    "/support/",
    "/api/",
    "/checkout/",
    "/track/",
    "/order/",
    "/orders/",
    "/quote/",
    "/quote",
    "/account/",
    "/account",
    "/my-account/",
    "/my-account",
    "/profile/",
    "/profile",
    "/auth/",
    "/receipt/",
    "/sale-receipt/",
    "/dashboard/",
    "/privacy-request/",
    "/privacy-request",
    "/download/",
    "/download",
    "/photos/",
    "/*.apk$",
    "/*.csv$",
    "/*.json$",
    "/*.txt$",
    "/*.pdf$",
  ];

  const allowedPaths = [
    "/",
    "/sell",
    "/sell-used-phone",
    "/sell-old-phone",
    "/sell-old-mobile-phone",
    "/sell-old-mobile-phone/",
    "/sell/mobile/",
    "/sell/laptop/",
    "/sell/tablet/",
    "/blog/",
    "/news/",
    "/articles/",
    "/compare/",
    "/about",
    "/contact",
    "/faq",
    "/reviews",
    "/sitemap.xml",
  ];

  const blockedBots = [
    "Bytespider",
    "CCBot",
    "Amazonbot",
    "PetalBot",
    "SemrushBot",
    "AhrefsBot",
    "DotBot",
    "MJ12bot",
    "Diffbot",
    "Timpibot",
    "Webzio-Extended",
    "Claude-Web",
    "BLEXBot",
    "DataForSeoBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: allowedPaths,
        disallow: disallowedPaths,
        crawlDelay: 10,
      },
      ...blockedBots.map((bot) => ({
        userAgent: bot,
        disallow: "/",
      })),
    ],
    sitemap: "https://www.cashall.in/sitemap.xml",
    host: "https://www.cashall.in",
  };
}
