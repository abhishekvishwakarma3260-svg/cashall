import type { MetadataRoute } from "next";

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
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
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

  return [
    ...staticPages,
    ...mobileBrandPages,
    ...laptopBrandPages,
    ...tabletBrandPages,
  ];
}
