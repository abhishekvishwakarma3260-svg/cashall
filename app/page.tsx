import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { CategoryCards } from "@/components/home/CategoryCards";
import { PopularBrands } from "@/components/home/PopularBrands";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyCashALL } from "@/components/home/WhyCashALL";
import { CustomerReviewsSection } from "@/components/reviews/CustomerReviewsSection";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { FinalCTA } from "@/components/home/FinalCTA";
import { BeSmartSellSmartSection } from "@/components/home/BeSmartSellSmartSection";
import { RecommerceSeoBlock } from "@/components/home/RecommerceSeoBlock";

import { INITIAL_FAQS } from "@/lib/store";

export const metadata: Metadata = {
  title: "CashALL | Sell Old Phone, Used Laptop & Tablet for Instant Cash",
  description:
    "Sell your old mobile phones, used laptops and tablets online at CashALL for fair market value. Free doorstep evaluation, instant UPI/bank cash payout, and 100% safe certified data wipe.",
  alternates: {
    canonical: "https://www.cashall.in",
  },
  openGraph: {
    title: "CashALL | Sell Old Phone, Used Laptop & Tablet for Instant Cash",
    description:
      "Sell your old mobile phones, used laptops and tablets online at CashALL for fair market value with convenient doorstep pickup, instant bank transfer, and certified data wiping.",
    url: "https://www.cashall.in",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.cashall.in/#organization",
        "name": "CashALL",
        "legalName": "Aarna Enterprise",
        "alternateName": [
          "CashALL India",
          "cashall.in",
          "Aarna Enterprise CashALL",
          "Sell Old Mobile Kolkata",
          "Instant Cash For Used Phones",
          "Used Phone Buyback Kolkata"
        ],
        "url": "https://www.cashall.in/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.cashall.in/photos/CashALL_favicon.png",
          "width": 1024,
          "height": 1024
        },
        "image": "https://www.cashall.in/photos/CashALL_favicon.png",
        "description":
          "CashALL is India's premier recommerce platform for selling used smartphones, laptops, and tablets with honest fair value pricing, zero convenience charges, free doorstep inspection, and instant UPI cash payouts.",
        "sameAs": [
          "https://www.instagram.com/cashall_26/",
          "https://www.facebook.com/profile.php?id=61592749535143",
          "https://www.youtube.com/channel/UCymYHMF8-grP7txUbqIt6sQ"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "telephone": "+917604092333",
          "email": "support@cashall.in",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi", "bn"]
        },
        "knowsAbout": [
          "Recommerce",
          "Sell Old Mobile Phones",
          "Sell Used Laptops",
          "Sell Old Tablets",
          "Consumer Electronics Buyback",
          "Instant Doorstep Cash Payout",
          "Highest Used Phone Valuation",
          "Best Mobile Selling Platform",
          "Sell Phone Near Me Kolkata",
          "Mobile Phone Trade In",
          "Gadget Exchange Kolkata",
          "PlayStation 5 Console Rental"
        ],
        "areaServed": [
          { "@type": "City", "name": "Kolkata" },
          { "@type": "City", "name": "Howrah" },
          { "@type": "AdministrativeArea", "name": "West Bengal" },
          { "@type": "Country", "name": "India" }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.cashall.in/#website",
        "url": "https://www.cashall.in/",
        "name": "CashALL",
        "alternateName": ["CashALL India", "cashall.in"],
        "description": "Sell Old Phone, Used Laptop & Tablet for Instant Cash",
        "publisher": {
          "@id": "https://www.cashall.in/#organization"
        },
        "inLanguage": "en-IN"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.cashall.in/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.cashall.in"
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://www.cashall.in/#howto",
        "name": "How to Sell Old Phone Online for Instant Cash on CashALL",
        "description": "Follow 4 simple steps to sell your old smartphone, used laptop, or tablet for honest fair value with free doorstep evaluation and instant payment.",
        "totalTime": "PT15M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Brand & Model",
            "text": "Choose your device category (Mobile, Laptop, Tablet) and select your specific brand and model from our catalog of 1,000+ devices.",
            "url": "https://www.cashall.in/sell"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Answer Condition Questions",
            "text": "Answer a few straightforward diagnostic questions about your screen condition, physical body, working components, and original accessories.",
            "url": "https://www.cashall.in/sell"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Get Instant Quote & Schedule Free Pickup",
            "text": "Receive a transparent valuation with guaranteed up to 5% higher payout than other online platforms. Pick your convenient date and time window for doorstep pickup.",
            "url": "https://www.cashall.in/sell"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Doorstep Verification & Instant Cash Transfer",
            "text": "Our verified technician inspects your device, assists with on-site factory data reset, and transfers payment instantly via UPI or IMPS bank transfer on the spot.",
            "url": "https://www.cashall.in/sell"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.cashall.in/#service",
        "name": "Doorstep Old Device Selling & Cash Buyback",
        "serviceType": "Used Mobile Phone, Laptop & Tablet Buyback",
        "provider": {
          "@id": "https://www.cashall.in/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "description": "Free doorstep evaluation and instant bank or UPI payout for used smartphones, laptops, and tablets with zero hidden convenience fees.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "0",
          "description": "Free doorstep pickup & instant payment"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.cashall.in/#faq",
        "mainEntity": INITIAL_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-grow">
        <Hero />
        <CategoryCards />
        <PopularBrands />
        <HowItWorks />
        <WhyCashALL />
        <BeSmartSellSmartSection />
        <RecommerceSeoBlock />
        <CustomerReviewsSection />
        <FAQAccordion />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

