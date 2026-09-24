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

export const metadata: Metadata = {
  title: "CashALL | Sell Old Phone, Used Laptop & Tablet for Instant Cash",
  description:
    "Sell your old mobile phones, used laptops and tablets online at CashALL for the highest price. Free doorstep evaluation, instant UPI/bank cash payout, and 100% safe certified data wipe.",
  alternates: {
    canonical: "https://www.cashall.in",
  },
  openGraph: {
    title: "CashALL | Sell Old Phone, Used Laptop & Tablet for Instant Cash",
    description:
      "Sell your old mobile phones, used laptops and tablets online at CashALL for the highest price. Free doorstep pickup, instant bank transfer, and certified data wiping.",
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
        "alternateName": ["CashALL India", "cashall.in", "Aarna Enterprise CashALL"],
        "url": "https://www.cashall.in/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.cashall.in/photos/CashALL_favicon.png",
          "width": 1024,
          "height": 1024
        },
        "image": "https://www.cashall.in/photos/CashALL_favicon.png",
        "description":
          "CashALL helps you sell old mobile phones, used laptops and tablets online for the highest value with instant doorstep evaluation, fast UPI cash payout, and certified data wiping.",
        "sameAs": [
          "https://www.instagram.com/cashall_26/",
          "https://www.facebook.com/profile.php?id=61592749535143",
          "https://www.youtube.com/channel/UCymYHMF8-grP7txUbqIt6sQ"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
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
          "Instant Doorstep Cash Payout"
        ],
        "areaServed": [
          { "@type": "City", "name": "Kolkata" },
          { "@type": "AdministrativeArea", "name": "West Bengal" },
          { "@type": "Country", "name": "India" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "33",
          "bestRating": "5",
          "worstRating": "1"
        }
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
        "description": "Free doorstep evaluation and instant bank or UPI payout for used smartphones, laptops, and tablets.",
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
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I sell my old phone or laptop on CashALL?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Select your device brand and model, answer a few quick diagnostic questions about screen and body condition, get an instant transparent quote, and book a free doorstep pickup at your preferred time."
            }
          },
          {
            "@type": "Question",
            "name": "When and how do I receive payment for my old device?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Payment is transferred instantly on the spot during doorstep inspection via UPI, Google Pay, PhonePe, Paytm, or direct IMPS bank transfer before the agent leaves."
            }
          },
          {
            "@type": "Question",
            "name": "Can I sell a phone with a broken screen or without a bill or box?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! CashALL accepts devices in all conditions including broken screens, minor dents, and phones without original bill or box. Valid government ID proof is verified for security."
            }
          },
          {
            "@type": "Question",
            "name": "Is doorstep device evaluation and pickup really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, CashALL provides 100% free doorstep evaluation and pickup. There are no hidden fees, service charges, or deductions."
            }
          },
          {
            "@type": "Question",
            "name": "Is my personal data safe when I sell my device to CashALL?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our verified executive assists you with performing a factory data reset and complete data wipe on-site, ensuring zero residual photos, contacts, or accounts remain."
            }
          },
          {
            "@type": "Question",
            "name": "Why choose CashALL over Cashify, Cashkr, Mobisell, or CashKaro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CashALL offers up to 5% higher payouts than Cashify and other resale platforms, instant on-the-spot UPI/bank payout during doorstep evaluation, zero hidden deductions, and fast free pickup across Kolkata, Howrah, and West Bengal."
            }
          },
          {
            "@type": "Question",
            "name": "Can I rent or sell a PlayStation 5 (PS5) on CashALL?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! CashALL provides PlayStation 5 (PS5) console rentals with 2 DualSense wireless controllers, top 4K games (GTA V, Spider-Man 2, FC 24, God of War Ragnarok), and free doorstep delivery and setup. You can also sell your used gaming consoles for instant cash."
            }
          }
        ]
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
        <CustomerReviewsSection />
        <FAQAccordion />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

