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
    title: "Secondary Smartphone Market Sees Surge as Users Prepare for Next-Gen Upgrades",
    excerpt: "Re-commerce volumes across Indian metros surge by 28% as tech consumers capitalize on higher buyback valuations before new hardware releases.",
    source: "CashALL Tech Wire",
    publishedAt: "2026-09-24",
    category: "Market Trends",
    readTime: "3 min read",
    trending: true,
    content: [
      "The pre-owned gadget ecosystem in India is experiencing unprecedented momentum this quarter. Market research shows a 28% increase in trade-in volume across Tier 1 and Tier 2 cities, driven primarily by consumers trading in 2-year-old flagships for instant digital liquidity.",
      "CashALL analytics show that sellers are prioritizing doorstep inspections with on-the-spot UPI transfers over traditional offline dealer haggling, which often results in arbitrary 30% price drops.",
      "The trend is especially pronounced in the Apple iPhone 14/15 series and Samsung Galaxy S23/S24 series, where trade-in values remain remarkably resilient."
    ]
  },
  {
    id: "news-2",
    slug: "india-ceir-integration-tightens-second-hand-phone-security",
    title: "Government CEIR Portal Makes Device Verification Mandatory for Safer Re-Commerce",
    excerpt: "New Department of Telecommunications directives ensure blacklisted and lost phones are filtered out, giving genuine sellers higher trust and legal immunity.",
    source: "Telecom & Cyber Regulation Bureau",
    publishedAt: "2026-09-22",
    category: "Gadget Industry",
    readTime: "4 min read",
    trending: true,
    content: [
      "India's Central Equipment Identity Register (CEIR) has expanded its automated real-time verification APIs across certified buyback aggregators.",
      "CashALL has natively integrated this protocol into its field inspection software. When an agent verifies a seller's device at their doorstep, the IMEI is instantly validated against national databases, immediately protecting sellers with a legally binding digital bill of transfer.",
      "Industry analysts state that this initiative will weed out grey market dealers while boosting legitimate seller payout values across West Bengal and India."
    ]
  },
  {
    id: "news-3",
    slug: "ai-chipsets-become-key-pricing-factor-in-used-flagships",
    title: "On-Device AI Readiness Becomes the New Benchmark for Used Smartphone Depreciation",
    excerpt: "Second-hand buyers now demand local NPU hardware for Apple Intelligence and Galaxy AI, shifting the value paradigm away from pure camera megapixels.",
    source: "Silicon & Device Analytics",
    publishedAt: "2026-09-19",
    category: "Smartphones",
    readTime: "4 min read",
    trending: false,
    content: [
      "With generative AI software deeply integrated into iOS and Android, smartphone silicon is undergoing a structural valuation shift. Devices equipped with 8GB+ RAM and dedicated neural acceleration cores are commanding up to 25% higher resale value than non-AI capable phones.",
      "Second-hand shoppers are increasingly rejecting older hardware that cannot execute local transcription or image manipulation tools.",
      "CashALL has updated its dynamic valuation algorithms to reward sellers of AI-capable smartphones with premium doorstep quotes."
    ]
  },
  {
    id: "news-4",
    slug: "e-waste-reduction-targets-drive-doorstep-recommerce-adoption",
    title: "Circular Economy in India: How Selling Used Phones Prevents Millions of Tons of E-Waste",
    excerpt: "Over 65% of functional older phones remain stashed in home drawers. Responsible buyback platforms are extending gadget lifespans and reducing carbon emissions.",
    source: "Green Electronics Initiative",
    publishedAt: "2026-09-15",
    category: "Market Trends",
    readTime: "3 min read",
    trending: false,
    content: [
      "Electronic waste remains one of the fastest-growing environmental hazards globally. In India, an estimated 100 million functioning smartphones sit idle in domestic storage simply due to lack of trusted selling channels.",
      "Platforms like CashALL are transforming this landscape by providing zero-friction doorstep evaluation, certified data wiping, and direct component lifecycle extension.",
      "Every smartphone re-entered into circulation saves approximately 60kg to 80kg of carbon emissions associated with new manufacturing."
    ]
  },
  {
    id: "news-5",
    slug: "kolkata-emerges-as-fastest-growing-doorstep-device-buyback-hub",
    title: "Kolkata & Eastern India Emerge as High-Growth Corridors for Transparent Device Selling",
    excerpt: "With express 15-minute doorstep dispatch across Salt Lake, Howrah, Newtown, and South Kolkata, CashALL leads the regional shift away from offline retail lowballing.",
    source: "Eastern India Commerce Review",
    publishedAt: "2026-09-10",
    category: "Gadget Industry",
    readTime: "3 min read",
    trending: true,
    content: [
      "The greater Kolkata metropolitan area has witnessed a dramatic shift from traditional Chandni Chowk / Fancy Market offline phone bargaining to instant doorstep selling.",
      "Sellers cite convenience, zero transportation hassle, verified digital payment receipts, and immediate UPI credit as the primary drivers of this transition.",
      "CashALL's localized logistics network now covers 100% of Kolkata, Howrah, and North/South 24 Parganas with express same-day doorstep pickups."
    ]
  }
];
