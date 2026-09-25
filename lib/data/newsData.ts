export interface TechNewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  source: string;
  publishedAt: string;
  category: "Smartphones" | "Market Trends" | "Operating Systems" | "Gadget Industry";
  readTime: string;
  content: string[];
  trending: boolean;
}

export const TECH_NEWS: TechNewsItem[] = [
  {
    id: "news-1",
    slug: "apple-announces-trade-in-values-update-ahead-of-wwdc",
    title: "More People In India Sell Their Old Phones Before Buying New Models",
    excerpt: "Used phone sales are up by 28% as users prefer getting quick cash at home instead of bargaining at local shops.",
    source: "CashALL News Desk",
    publishedAt: "2026-09-24",
    category: "Market Trends",
    readTime: "3 min read",
    trending: true,
    content: [
      "Selling used phones online has become hugely popular across Indian cities this year. Recent data shows a 28% rise in trade-ins as people sell their 2-year-old phones to fund their next purchase.",
      "Most customers prefer doorstep inspection with instant UPI payment, avoiding the headache of visiting offline shops where dealers frequently bargain prices down.",
      "Apple iPhones and Samsung Galaxy phones continue to hold top demand, getting sellers the highest payouts."
    ]
  },
  {
    id: "news-2",
    slug: "india-ceir-integration-tightens-second-hand-phone-security",
    title: "Official Verification Makes Selling Used Phones Safer Across India",
    excerpt: "Quick online IMEI checks ensure every sold phone is genuine, giving sellers a legal digital bill of sale.",
    source: "Telecom & Safety News",
    publishedAt: "2026-09-22",
    category: "Gadget Industry",
    readTime: "3 min read",
    trending: true,
    content: [
      "India's central equipment portal (CEIR) now helps verify phone authenticity in seconds.",
      "CashALL uses this system during doorstep pickup to check your phone's IMEI on the spot. Once verified, you receive a digital bill of sale that officially transfers ownership, protecting you from any future misuse.",
      "This simple step ensures complete peace of mind for genuine sellers in Kolkata, Howrah, and across the country."
    ]
  },
  {
    id: "news-3",
    slug: "ai-chipsets-become-key-pricing-factor-in-used-flagships",
    title: "Phones With AI Features Now Command Higher Resale Cash",
    excerpt: "Second-hand buyers are actively looking for phones that support AI photo and voice features, giving sellers extra money.",
    source: "Mobile Trends India",
    publishedAt: "2026-09-19",
    category: "Smartphones",
    readTime: "3 min read",
    trending: false,
    content: [
      "With built-in AI tools now available on newer phones, pre-owned buyers are ready to pay more for AI-capable models like the iPhone 15 Pro and Galaxy S24.",
      "People want smart features like photo object removal, live voice translation, and note summaries without paying full price for a brand-new device.",
      "CashALL's valuation system automatically rewards sellers of these phones with higher quotes."
    ]
  },
  {
    id: "news-4",
    slug: "e-waste-reduction-targets-drive-doorstep-recommerce-adoption",
    title: "How Selling Your Old Phone Helps Protect The Environment",
    excerpt: "Over 65% of old working phones sit forgotten in home drawers. Selling them gives them a second life and cuts electronic waste.",
    source: "Green Living India",
    publishedAt: "2026-09-15",
    category: "Market Trends",
    readTime: "3 min read",
    trending: false,
    content: [
      "Electronic waste is one of the biggest environmental challenges today. Millions of working smartphones sit untouched in cupboards simply because people don't know an easy way to sell them.",
      "Platforms like CashALL make it simple to sell old devices right from home with free pickup and instant cash.",
      "Giving your device a second home keeps harmful electronic materials out of landfills and saves natural resources."
    ]
  },
  {
    id: "news-5",
    slug: "kolkata-emerges-as-fastest-growing-doorstep-device-buyback-hub",
    title: "Kolkata Residents Switch To Free Doorstep Phone Pickup",
    excerpt: "With fast pickup across Salt Lake, Howrah, and New Town, sellers prefer instant home payment over crowded shops.",
    source: "Kolkata Commerce Daily",
    publishedAt: "2026-09-10",
    category: "Gadget Industry",
    readTime: "3 min read",
    trending: true,
    content: [
      "Smartphone owners in Kolkata are moving away from crowded electronics markets in Chandni Chowk and choosing convenient home pickup.",
      "Sellers love the fact that they don't have to waste time traveling or arguing over prices. A trained technician comes to their address, checks the phone, and sends payment directly to their bank account.",
      "CashALL covers all of Kolkata, Howrah, and nearby areas with fast same-day appointments."
    ]
  }
];
