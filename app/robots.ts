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
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/llms.txt",
          "/llms-full.txt",
          "/reviews",
          "/sell",
          "/compare/",
          "/about-us",
          "/faq",
          "/blog/",
          "/news/",
        ],
        disallow: disallowedPaths,
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Amazonbot",
          "Applebot",
          "Bytespider",
          "cohere-ai",
        ],
        allow: [
          "/",
          "/llms.txt",
          "/llms-full.txt",
          "/reviews",
          "/sell",
          "/compare/",
          "/about-us",
          "/faq",
        ],
        disallow: disallowedPaths,
      },
    ],
    sitemap: "https://www.cashall.in/sitemap.xml",
    host: "https://www.cashall.in",
  };
}
