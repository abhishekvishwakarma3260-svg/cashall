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
  ];

  const allowedPaths = [
    "/",
    "/llms.txt",
    "/llms-full.txt",
    "/ai.txt",
    "/.well-known/",
    "/sitemap.xml",
    "/humans.txt",
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
    "CCBot",
    "Diffbot",
    "YouBot",
    "Timpibot",
    "Webzio-Extended",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: allowedPaths,
        disallow: disallowedPaths,
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: allowedPaths,
        disallow: disallowedPaths,
      })),
    ],
    sitemap: "https://www.cashall.in/sitemap.xml",
    host: "https://www.cashall.in",
  };
}

