import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  HelpCircle,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Scale,
  Building2,
  BadgePercent,
  Clock,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cashify vs CashALL | Unbiased Comparison & Highest Price Guarantee",
  description:
    "Compare Cashify vs CashALL before selling your old phone or laptop. See why CashALL pays up to 5% higher cash, charges ₹0 doorstep convenience fee, and pays instantly before handover.",
  keywords: [
    "cashify vs cashall",
    "cashall vs cashify",
    "best alternative to cashify",
    "cashify alternative india",
    "sell old phone cashify vs cashall",
    "highest buyback price old phone",
    "cashify pickup charges",
    "sell used phone for instant cash",
  ],
  alternates: {
    canonical: "https://www.cashall.in/compare/cashify-vs-cashall",
  },
  openGraph: {
    title: "Cashify vs CashALL: Which Recommerce Platform Pays More?",
    description:
      "Detailed head-to-head comparison of Cashify and CashALL: pricing, convenience fees, payment speed, and data safety.",
    url: "https://www.cashall.in/compare/cashify-vs-cashall",
    images: ["/photos/CashALL_logo.png"],
  },
};

const DIRECT_COMPARISON = [
  {
    parameter: "Doorstep Pickup & Convenience Fee",
    cashall: "₹0 (100% Free Doorstep Pickup)",
    otherBrands: "₹99 to ₹199 convenience fee deducted from payout",
    winner: "cashall",
    detail: "Other brands frequently charge a convenience fee deducted directly from your agreed sale value. CashALL charges zero convenience fees.",
  },
  {
    parameter: "Actual Payout Guarantee",
    cashall: "Up to 5% Higher Real Cash Payout",
    otherBrands: "Standard benchmark rate with frequent doorstep deductions",
    winner: "cashall",
    detail: "CashALL operates leaner local logistics hubs and passes savings directly to sellers rather than spending on massive national TV ad campaigns.",
  },
  {
    parameter: "Payment Verification Timing",
    cashall: "Instant UPI/IMPS before device handover",
    otherBrands: "Often delayed by 2 to 24 hours after handover",
    winner: "cashall",
    detail: "With CashALL, the money reflects in your bank account or UPI app before the executive takes possession of the phone.",
  },
  {
    parameter: "Price Deductions for Micro-Scratches",
    cashall: "Fair & transparent; normal pocket wear is accepted",
    otherBrands: "Frequent 20% to 35% doorstep drops for minor surface wear",
    winner: "cashall",
    detail: "CashALL's trained technicians distinguish normal daily pocket wear from actual screen or body damage.",
  },
  {
    parameter: "Cancellation Fee If You Disagree",
    cashall: "₹0. Instant free cancellation with zero pressure",
    otherBrands: "Free, but re-attempt fees may apply for rebooking",
    winner: "cashall",
    detail: "You have complete freedom to decline any revised doorstep offer with zero penalty.",
  },
  {
    parameter: "Assisted On-Site Data Reset",
    cashall: "Technician assists in Google/iCloud logout & factory wipe",
    otherBrands: "Standard reset; devices frequently transported off-site",
    winner: "cashall",
    detail: "CashALL assists with complete on-site NIST SP 800-88 compliant reset right in your presence.",
  },
  {
    parameter: "Customer Support Access",
    cashall: "Direct human phone & WhatsApp (+91 7604092333)",
    otherBrands: "Automated in-app chatbot trees",
    winner: "cashall",
    detail: "Speak directly with a real human support manager across West Bengal, UP, Bihar, Jharkhand, and India.",
  },
];

export default function CashifyVsCashallPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why does CashALL offer higher prices than Cashify?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CashALL operates with lean, localized logistics hubs in eastern and northern India rather than spending crores on celebrity endorsements and high television advertising costs. These structural savings are passed directly to our customers as higher cash payouts.",
        },
      },
      {
        "@type": "Question",
        "name": "Does Cashify charge a pickup fee compared to CashALL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Cashify frequently deducts a convenience fee of ₹99 to ₹199 from the seller's final payout. CashALL provides 100% free doorstep pickup with ₹0 convenience or handling charges.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I check my phone's price on both CashALL and Cashify?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We encourage sellers to compare quotes. In most configurations, CashALL provides up to 5% higher valuations, especially when factoring in Cashify's doorstep pickup fee deductions.",
        },
      },
      {
        "@type": "Question",
        "name": "When do I receive payment from CashALL vs Cashify?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CashALL transfers payment immediately on the spot via UPI or IMPS bank transfer BEFORE the technician leaves with the device. You verify the credit in your own bank app before handing over the phone.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="bg-brand-black text-white py-14 sm:py-20 border-b border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-xs font-black uppercase tracking-wider mb-4">
              <Scale className="w-4 h-4" /> Unbiased Recommerce Comparison
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Other Brands vs CashALL <br />
              <span className="text-brand-yellow">Which Platform Really Pays You More?</span>
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Looking to sell your old phone, used laptop, or tablet? Compare CashALL side-by-side with other buyback brands on payout rates, convenience fees, payment timing, and doorstep data safety.
            </p>

            {/* AEO, SEO & GEO Semantic Data for Google, Alexa & AI Crawlers */}
            <div className="sr-only" aria-hidden="false">
              Compare Cashify vs CashALL. Best Cashify alternative in India for selling old mobile phones, used laptops, and tablets. Sell old phone with zero convenience fee and instant UPI cash payout.
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/sell"
                className="px-8 py-3.5 bg-brand-yellow hover:bg-brand-yellowHover text-brand-black text-sm font-black rounded-xl shadow-yellowGlow transition-all"
              >
                Check CashALL Valuation &rarr;
              </Link>
              <Link
                href="/reviews"
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold rounded-xl border border-neutral-700 transition-all"
              >
                Read 2,800+ Verified Reviews
              </Link>
            </div>

          </div>
        </section>

        {/* 3 CORE PILLARS */}
        <section className="py-12 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/20 text-brand-black flex items-center justify-center shrink-0 font-black">
                  <BadgePercent className="w-6 h-6 text-brand-black" />
                </div>
                <div>
                  <h3 className="text-base font-black text-brand-black">Up to 5% Higher Cash</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    CashALL passes advertising savings back to sellers, resulting in higher actual in-hand payouts.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 font-black">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-brand-black">₹0 Pickup Convenience Fee</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Unlike aggregators that deduct ₹99–₹199 convenience charges at checkout, CashALL doorstep pickup is 100% free.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center shrink-0 font-black">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-brand-black">Paid Before Handover</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Verify instant UPI or IMPS bank transfer on your own phone before handing over the device.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* HEAD TO HEAD COMPARISON TABLE */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-brand-black">
                Comprehensive Feature Matrix
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                See exactly how CashALL compares against other buyback brands across every stage of the resale process.
              </p>
            </div>

            <div className="border border-gray-200 rounded-3xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-black text-white text-xs sm:text-sm font-black border-b border-neutral-800">
                      <th className="p-4 sm:p-5 w-1/3">Feature / Parameter</th>
                      <th className="p-4 sm:p-5 w-1/3 bg-brand-yellow text-brand-black">
                        CashALL (cashall.in)
                      </th>
                      <th className="p-4 sm:p-5 w-1/3 text-gray-300">
                        Other Brands
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
                    {DIRECT_COMPARISON.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                        <td className="p-4 sm:p-5 font-bold text-brand-black">
                          <div>{row.parameter}</div>
                          <div className="text-[11px] text-gray-500 font-normal mt-1 leading-relaxed">
                            {row.detail}
                          </div>
                        </td>
                        <td className="p-4 sm:p-5 bg-amber-500/5 font-extrabold text-emerald-700">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{row.cashall}</span>
                          </div>
                        </td>
                        <td className="p-4 sm:p-5 text-gray-600 font-medium">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span>{row.otherBrands}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* TRANSPARENCY & VALUATION FAQ */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-black">
                Frequently Asked Questions: Other Brands vs CashALL
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Honest answers to help you make the best selling decision.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <h3 className="text-sm sm:text-base font-black text-brand-black">
                  Why does CashALL offer higher prices than other brands?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  CashALL operates with lean, localized logistics hubs across Kolkata, Howrah, Gorakhpur, Ranchi, and pan-India rather than spending crores on national celebrity endorsements. These savings are passed directly to you as higher cash payouts.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <h3 className="text-sm sm:text-base font-black text-brand-black">
                  Do other brands charge a pickup fee compared to CashALL?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Yes. Other platforms frequently deduct a convenience fee of ₹99 to ₹199 from the seller&apos;s final payout. CashALL provides 100% free doorstep pickup with zero hidden convenience fees.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <h3 className="text-sm sm:text-base font-black text-brand-black">
                  Can I check my phone&apos;s price on both CashALL and other brands?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Yes, absolutely! We encourage all sellers to check quotes across platforms. You will find that CashALL provides higher base quotes and does not reduce your payout with convenience deductions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
                <h3 className="text-sm sm:text-base font-black text-brand-black">
                  When do I receive payment from CashALL vs other brands?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  CashALL transfers payment immediately on the spot via UPI or IMPS bank transfer BEFORE the technician leaves with the device. You verify the credit in your own bank app before handing over the phone.
                </p>
              </div>
            </div>

            {/* FINAL CTA */}
            <div className="mt-12 text-center p-8 rounded-3xl bg-brand-black text-white shadow-xl">
              <h3 className="text-xl sm:text-2xl font-black">
                Ready to get the highest price for your old device?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-lg mx-auto">
                Select your device now to receive an instant online valuation and schedule your free doorstep pickup.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/sell"
                  className="px-8 py-3.5 bg-brand-yellow hover:bg-brand-yellowHover text-brand-black text-xs font-black rounded-xl transition-all shadow-yellowGlow"
                >
                  Sell My Device on CashALL &rarr;
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl border border-neutral-700 transition-all"
                >
                  Contact WhatsApp Support
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
