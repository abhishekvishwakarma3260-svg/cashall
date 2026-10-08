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
    "/receipt/",
    "/sale-receipt/",
    "/dashboard/",
    "/download/",
    "/download",
  ];

  const aiBots = [
    "Googlebot",
    "Googlebot-Mobile",
    "Googlebot-Image",
    "Google-InspectionTool",
    "GoogleOther",
    "Google-Extended",
    "Bingbot",
    "Slurp",
    "DuckDuckBot",
    "Baiduspider",
    "YandexBot",
    "OAI-SearchBot",
    "GPTBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "Applebot",
    "Applebot-Extended",
    "Amazonbot",
    "Bytespider",
    "cohere-ai",
    "Meta-ExternalAgent",
    "FacebookBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: disallowedPaths,
      })),
    ],
    sitemap: "https://www.cashall.in/sitemap.xml",
    host: "https://www.cashall.in",
  };
}

