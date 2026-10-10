export interface ArticleItem {
  slug: string;
  title: string;
  subtitle: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
  };
  excerpt: string;
  directQuestion: string;
  directAnswer: string;
  bullets: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    slug: "nist-800-88-certified-data-wipe-guide",
    title: "How Certified NIST 800-88 Data Sanitization Protects Your Personal Data Before Reselling",
    subtitle: "A technical breakdown of media sanitization, flash memory block wiping, and DPDP Act 2023 compliance.",
    readTime: "5 min read",
    publishedAt: "2026-03-01",
    updatedAt: "2026-03-15",
    author: {
      name: "CashALL Security & Compliance Desk",
      role: "Privacy Engineering",
    },
    excerpt: "Standard factory resets leave residual file signatures in NAND flash storage. Learn how NIST 800-88 Rev 1 overwrite protocols guarantee zero recovery.",
    directQuestion: "Is a regular factory reset safe enough before selling a smartphone?",
    directAnswer: "A standard factory reset clears encryption headers and directory tables, but forensic recovery software can sometimes reconstruct unencrypted sectors. NIST 800-88 media sanitization performs cryptographic erasure combined with pseudo-random block overwriting, rendering all stored data completely unrecoverable under Indian DPDP Act standards.",
    bullets: [
      "Overwrites unallocated NAND storage blocks with cryptographic zero passes.",
      "Revokes hardware-backed encryption keys from the secure enclave processor.",
      "Provides a tamper-proof digital Certificate of Sanitization for legal liability discharge.",
    ],
    sections: [
      {
        heading: "1. The Vulnerability of Basic Device Resets",
        body: [
          "Most Indian smartphone users assume that tapping 'Erase All Content and Settings' permanently destroys their photos, bank account details, and private chats. However, standard OS resets merely mark storage blocks as writable rather than scrubbing the underlying physical cells.",
          "In modern recommerce, hardware technicians must perform verified sanitization in front of the seller before taking custody of the handset.",
        ],
      },
      {
        heading: "2. The NIST 800-88 Rev 1 Standard Explained",
        body: [
          "Published by the National Institute of Standards and Technology, the NIST 800-88 standard defines Clear, Purge, and Destroy guidelines for electronic media. CashALL's on-site diagnostic suite performs logical sanitization (Purge) on mobile flash storage, ensuring zero forensic retrieval.",
        ],
      },
    ],
  },
  {
    slug: "smartphone-screen-grading-micro-scratches-vs-panel-defects",
    title: "Display Grading Standards: Micro-Scratches vs Touch Panel Digitizer Damage",
    subtitle: "Understand how professional optical inspection separates surface hairline marks from panel failure.",
    readTime: "6 min read",
    publishedAt: "2026-02-20",
    updatedAt: "2026-03-10",
    author: {
      name: "CashALL Hardware Diagnostics Team",
      role: "Display Engineering",
    },
    excerpt: "Learn why minor hairline scratches on tempered glass should never result in arbitrary 30-40% valuation cuts at your doorstep.",
    directQuestion: "What is the difference between glass scratches and broken touch digitizers?",
    directAnswer: "Hairline micro-scratches reside exclusively on the oleophobic coating or outer protective glass and do not impact display illumination or touch sensitivity. True panel damage involves dead sub-pixels, touch unresponsive zones, vertical green lines, or backlight bleeding. CashALL never penalizes minor everyday micro-scratches as display failure.",
    bullets: [
      "Micro-scratches only affect the external glass layer, not the OLED or AMOLED array.",
      "Touch digitizer testing verifies 100% responsiveness across all display sectors.",
      "Transparent diagnostic grading prevents unfair quote-halving at the doorstep.",
    ],
    sections: [
      {
        heading: "1. How Offline Dealers Exploit Minor Glass Scratches",
        body: [
          "A notorious practice across local phone markets and legacy buyback platforms is claiming that tiny hairline scratches constitute 'display damage', slashing ₹3,000 to ₹7,000 from the promised payout.",
          "Objective diagnostic testing requires illuminating the panel under 500-lux ambient light with pure white, black, red, green, and blue backgrounds to verify pixel integrity independently from surface glass wear.",
        ],
      },
      {
        heading: "2. Full Digitizer Multi-Touch Grid Verification",
        body: [
          "A healthy display must register uninterrupted touch tracking across all coordinate axes. Our field technicians use automated grid-drawing diagnostics right on the device screen before confirming payout.",
        ],
      },
    ],
  },
  {
    slug: "battery-degradation-chemistry-and-resale-value",
    title: "Battery Chemistry Degradation: How Cycle Counts and Maximum Capacity Impact Resale",
    subtitle: "The engineering reality of lithium-ion anode wear, thermal throttling, and fair valuation pricing.",
    readTime: "5 min read",
    publishedAt: "2026-02-15",
    updatedAt: "2026-03-05",
    author: {
      name: "CashALL Technical Operations",
      role: "Hardware Quality Assurance",
    },
    excerpt: "Understand how battery cycle wear affects real market valuation, and why phones with 80%+ battery health retain premium resale value.",
    directQuestion: "How much does battery health percentage reduce a phone's resale price?",
    directAnswer: "Phones with battery health at or above 80% maintain full peak performance without CPU throttling and receive the highest valuation tier. When health drops below 80%, the value is adjusted only by the direct replacement cost of an OEM battery cell, rather than an arbitrary steep penalty.",
    bullets: [
      "Lithium-ion cells naturally degrade to ~80% capacity after 500 complete discharge cycles.",
      "Apple iOS battery health and Android hardware logs are verified directly on-site.",
      "Fair price adjustment reflects actual battery service cost rather than inflated deductions.",
    ],
    sections: [
      {
        heading: "1. The 500-Cycle Benchmark in Modern Smartphones",
        body: [
          "Lithium-ion batteries store electrical energy through chemical reactions that wear the cathode and anode over time. After 500 to 800 charge cycles, internal resistance climbs, leading to reduced standby duration.",
          "In the Indian secondary market, consumers actively seek devices with healthy batteries to avoid immediate service center visits.",
        ],
      },
      {
        heading: "2. Transparent Grading vs Unfair Penalties",
        body: [
          "Instead of penalizing an older device excessively, CashALL's pricing engine uses real replacement module costs to compute accurate, market-fair valuations.",
        ],
      },
    ],
  },
  {
    slug: "esim-removal-and-banking-app-deregistration-protocol",
    title: "Step-by-Step Security Protocol: eSIM Removal & Banking App Deregistration",
    subtitle: "Protecting your mobile banking, UPI handles, and WhatsApp accounts before device handover.",
    readTime: "4 min read",
    publishedAt: "2026-01-28",
    updatedAt: "2026-02-18",
    author: {
      name: "CashALL Digital Safety Desk",
      role: "Consumer Security",
    },
    excerpt: "Never sell a phone with active eSIM profiles or active UPI registrations. Follow this 4-step checklist to protect your credentials.",
    directQuestion: "Does formatting a phone automatically delete embedded eSIM profiles?",
    directAnswer: "No. On both iOS and Android, eSIM profiles are stored in an independent eUICC hardware chip. A standard factory reset asks whether you want to keep or delete eSIM data. If you accidentally choose 'Keep', the next owner could receive your SMS OTPs. You must explicitly tap 'Delete eSIM' before final handover.",
    bullets: [
      "Transfer or delete eSIM profile through your telecom provider (Jio, Airtel, Vi).",
      "Deregister UPI linked device IDs in Google Pay, PhonePe, and Paytm settings.",
      "Sign out of Apple ID or Google FRP lock to prevent activation blocking.",
    ],
    sections: [
      {
        heading: "1. The Hidden Risk of Forgotten eSIM Profiles",
        body: [
          "With the rise of dual-SIM smartphones featuring digital eSIMs, sellers frequently forget that the physical SIM slot is empty while the digital profile is still active inside the phone.",
          "Leaving an active eSIM profile allows subsequent users to receive OTP messages for banking, social media, and messaging services.",
        ],
      },
      {
        heading: "2. The Mandatory 4-Step Handover Checklist",
        body: [
          "1. Request eSIM transfer to your new handset via your carrier's official app or SMS protocol.",
          "2. Navigate to Mobile Data / Cellular Settings and confirm 'Delete eSIM Profile'.",
          "3. Remove device from your Google Account / iCloud trusted devices list.",
          "4. Generate and sign the digital Bill of Sale with our technician.",
        ],
      },
    ],
  },
  {
    slug: "legal-bill-of-sale-and-statutory-indemnity-in-recommerce",
    title: "Why an Official Bill of Sale Protects You Legally When Selling Second-Hand Electronics",
    subtitle: "Understanding statutory ownership transfer, KYC identification, and IMEI deregistration in India.",
    readTime: "5 min read",
    publishedAt: "2026-01-10",
    updatedAt: "2026-02-01",
    author: {
      name: "CashALL Legal & Compliance",
      role: "Regulatory Affairs",
    },
    excerpt: "Selling devices to unverified buyers on open classifieds creates severe legal risks if the IMEI is misused. Understand your statutory protections.",
    directQuestion: "Why is a formal Bill of Sale necessary when selling a used smartphone?",
    directAnswer: "Under Indian telecommunication regulations, mobile IMEI numbers are tracked on national network databases. If you sell a phone without documentation and that device is later involved in unlawful activity, you remain the registered owner of record. A GST-registered Bill of Sale legally transfers ownership and indemnifies you completely.",
    bullets: [
      "Digital Bill of Sale records IMEI, serial number, seller KYC, and transaction timestamp.",
      "Statutory transfer of ownership fully indemnifies the seller from future device misuse.",
      "GST-compliant documentation guarantees that payment was legally settled via formal banking channels.",
    ],
    sections: [
      {
        heading: "1. The Dangers of Cash-in-Hand Open Marketplace Sales",
        body: [
          "Selling to random buyers in coffee shops or open parking lots offers zero legal protection. If the buyer misuses the handset or resells it without deregistration, law enforcement inquiries trace back to the original SIM subscriber and purchase invoice owner.",
        ],
      },
      {
        heading: "2. CashALL's Verified Chain of Custody",
        body: [
          "Every device purchased by CashALL is backed by an automated digital Bill of Sale issued directly to the seller's email and phone, providing permanent legal proof of legitimate sale.",
        ],
      },
    ],
  },
  {
    slug: "electronic-refurbishment-and-circular-economy-impact",
    title: "Electronic Refurbishment: How Selling Used Tech Diverts E-Waste Across West Bengal",
    subtitle: "Tracking the lifecycle of traded-in hardware and its positive environmental impact.",
    readTime: "4 min read",
    publishedAt: "2025-12-18",
    updatedAt: "2026-01-20",
    author: {
      name: "CashALL Sustainability Operations",
      role: "Environmental Re-Commerce",
    },
    excerpt: "India is the third largest e-waste generator globally. Discover how repairing, refurbishing, and extending gadget lifespans curbs heavy metal contamination.",
    directQuestion: "What happens to old or broken phones sold to CashALL?",
    directAnswer: "Functional devices undergo certified sanitization, precision component servicing, and battery health optimization for reintroduction into the secondary market. Non-functional devices are channeled to authorized e-waste recycling partners who recover copper, gold, and rare earth metals under strict environmental safeguards.",
    bullets: [
      "Prevents toxic heavy metals (lead, mercury, cadmium) from contaminating urban landfills.",
      "Extends functional smartphone lifespan by an average of 2.4 additional years.",
      "Reduces demand for raw mineral mining required for brand new device manufacturing.",
    ],
    sections: [
      {
        heading: "1. The Growing E-Waste Challenge in Urban India",
        body: [
          "With smartphone upgrade cycles averaging 18 to 24 months, tens of millions of functional devices end up forgotten in desk drawers or improperly discarded in household trash.",
          "Responsible recommerce channels provide an organized pipeline to restore value and prevent environmental pollution.",
        ],
      },
      {
        heading: "2. The Circular Re-Commerce Model",
        body: [
          "By giving your old device a second life, you earn instant financial liquidity while contributing to a cleaner, greener Indian circular economy.",
        ],
      },
    ],
  },
];
