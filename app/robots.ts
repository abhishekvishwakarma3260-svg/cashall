import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
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
      ],
    },
    sitemap: "https://www.cashall.in/sitemap.xml",
  };
}
