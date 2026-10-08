import type { MetadataRoute } from "next";
import { INITIAL_MODELS, INITIAL_BRANDS } from "@/lib/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.cashall.in";
  const now = new Date();

  // Core Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sell`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sell-used-phone`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sell-old-phone`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sell/mobile`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sell/laptop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sell/tablet`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/rent/ps5`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sell-phone-in-kolkata`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/compare/cashall-vs-other-platforms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/512gb-phones-the-sweet-spot-for-resale-value`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/why-iphones-hold-more-resale-value-than-android-in-india`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/verify-your-phones-clean-status-before-selling-avoid-surprises`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/steps-to-ensure-your-digital-sim-doesnt-go-with-sold-phones`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/does-phones-with-dedicated-neural-engines-could-make-you-more-money`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/pickup-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/doorstep-pickup-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cancellation-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sell-phone-in-howrah`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sell-phone-in-gorakhpur`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
  ];

  // Mobile Brand Pages
  const mobileBrands = [
    "apple",
    "samsung",
    "oneplus",
    "xiaomi",
    "vivo",
    "oppo",
    "realme",
    "poco",
    "motorola",
    "google",
    "iqoo",
    "nothing",
  ];

  const mobileBrandPages: MetadataRoute.Sitemap = mobileBrands.map((brand) => ({
    url: `${baseUrl}/sell/mobile/${brand}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Laptop Brand Pages
  const laptopBrands = [
    "apple",
    "dell",
    "hp",
    "lenovo",
    "asus",
    "acer",
    "msi",
  ];

  const laptopBrandPages: MetadataRoute.Sitemap = laptopBrands.map((brand) => ({
    url: `${baseUrl}/sell/laptop/${brand}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Tablet Brand Pages
  const tabletBrands = [
    "apple",
    "samsung",
    "lenovo",
    "xiaomi",
  ];

  const tabletBrandPages: MetadataRoute.Sitemap = tabletBrands.map((brand) => ({
    url: `${baseUrl}/sell/tablet/${brand}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Brand ID to slug lookup map
  const brandSlugMap = new Map<string, string>();
  for (const b of INITIAL_BRANDS) {
    brandSlugMap.set(b.id, b.slug.toLowerCase());
  }

  // Model Pages (Index popular models and active devices)
  const popularModels = INITIAL_MODELS.filter((m) => m.active && m.slug);
  const modelPages: MetadataRoute.Sitemap = popularModels.slice(0, 1000).map((m) => {
    const brandSlug = m.brandSlug?.toLowerCase() || brandSlugMap.get(m.brandId) || "apple";
    const category = (m.category || "MOBILE").toLowerCase();
    const catPath = category === "laptop" ? "laptop" : category === "tablet" ? "tablet" : "mobile";
    
    return {
      url: `${baseUrl}/sell/${catPath}/${brandSlug}/${m.slug.toLowerCase()}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: m.popular ? 0.8 : 0.7,
    };
  });

  return [
    ...staticPages,
    ...mobileBrandPages,
    ...laptopBrandPages,
    ...tabletBrandPages,
    ...modelPages,
  ];
}
