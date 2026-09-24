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
  Smartphone,
  Scale
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cashify vs CashALL: Which Gives Higher Price for Used Phones? | CashALL",
  description:
    "Honest comparison between Cashify and CashALL. Discover how CashALL pays up to 5% higher prices, charges zero doorstep pickup fees, provides transparent diagnostics, and instant UPI transfers.",
  keywords: [
    "cashify vs cashall",
    "cashall vs cashify",
    "better than cashify",
    "cashify alternative",
    "best place to sell old phone",
    "highest price for old phone",
    "sell phone cashify alternative",
    "sell used mobile instant cash",
    "cashkr vs cashall",
    "cashify price drop issue"
  ],
  alternates: {
    canonical: "https://www.cashall.in/compare/cashify-vs-cashall",
  },
  openGraph: {
    title: "Cashify vs CashALL: Unbiased Comparison & Price Difference | CashALL",
    description:
      "Looking for a better alternative to Cashify? See how CashALL offers higher payouts, ₹0 pickup charges, and on-the-spot UPI transfers without unexpected deductions.",
    url: "https://www.cashall.in/compare/cashify-vs-cashall",
    images: ["/photos/CashALL_logo.png"],
  },
};

const COMPARISON_ROWS = [
  {
    feature: "Device Valuation & Payout",
    cashall: "Up to 5% Higher Value (Guaranteed competitive pricing)",
    cashify: "Standard market price; often lower after evaluation",
    cashallWins: true,
  },
  {
    feature: "Doorstep Pickup / Convenience Fee",
    cashall: "₹0 (100% Free Doorstep Service)",
    cashify: "₹100 – ₹199 convenience fee deducted from payout",
    cashallWins: true,
  },
  {
    feature: "Payment Method & Timing",
    cashall: "Instant UPI (GPay/PhonePe/Paytm) or IMPS Bank Transfer on the spot",
    cashify: "UPI / Wallet / Bank Transfer (often delayed by hours)",
    cashallWins: true,
  },
  {
    feature: "Diagnostic & Scratch Policy",
    cashall: "Transparent diagnostic rubric; minor normal wear does not slash prices",
    cashify: "Heavy re-quotes on arrival for micro-scratches",
    cashallWins: true,
  },
  {
    feature: "Personal Data Safety Protocol",
    cashall: "Certified factory data reset performed on-site with seller present",
    cashify: "Standard reset (often taken off-site for final wipe)",
    cashallWins: true,
  },
  {
    feature: "Pickup Cancellation Charge",
    cashall: "₹0 (Free cancellation anytime if you disagree with revised quote)",
    cashify: "Free, but pickup fee may be charged on re-attempts",
    cashallWins: true,
  },
  {
    feature: "Customer Support Access",
    cashall: "Direct human WhatsApp & Phone support (+91 7604092333)",
    cashify: "Primarily automated in-app chatbot",
    cashallWins: true,
  },
  {
    feature: "Consoles & Gaming Services",
    cashall: "PlayStation 5 (PS5) Rentals & Console Buyback Available",
    cashify: "Limited console buyback; no rentals",
    cashallWins: true,
  },
];

const COMPARISON_FAQS = [
  {
    q: "Why does CashALL offer higher prices than Cashify?",
    a: "CashALL operates with hyper-efficient localized logistics and direct refurbishment channels in West Bengal and major hubs. By eliminating corporate overhead and third-party aggregator markups, we pass up to 5% higher payouts directly back to the customer.",
  },
  {
    q: "Does Cashify charge a doorstep pickup fee?",
    a: "Yes. In many locations, Cashify charges a convenience fee ranging from ₹100 to ₹199, which is deducted from your final payout. CashALL never charges any convenience, doorstep inspection, or cancellation fees.",
  },
  {
    q: "What happens if I don't agree with the doorstep valuation on CashALL?",
    a: "If our executive conducts a physical inspection and you are unsatisfied with the revised quote for any reason, you can cancel immediately with zero penalty. Our inspection is completely free of charge.",
  },
  {
    q: "Can I sell broken screen or dead phones on CashALL?",
    a: "Yes. CashALL buys devices in all functional and cosmetic states, including broken displays, battery faults, and dented bodies, provided valid Government ID proof is presented for ownership verification.",
  },
];

export default function CompareCashifyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.cashall.in/compare/cashify-vs-cashall#article",
        "headline": "Cashify vs CashALL: Which Gives Higher Price for Used Phones in 2026?",
        "url": "https://www.cashall.in/compare/cashify-vs-cashall",
        "description":
          "An in-depth, feature-by-feature comparison between Cashify and CashALL comparing payouts, pickup fees, diagnostic transparency, and payout speed.",
        "author": {
          "@type": "Organization",
          "name": "CashALL Research Team",
          "url": "https://www.cashall.in"
        },
        "publisher": {
          "@type": "Organization",
          "name": "CashALL",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.cashall.in/photos/CashALL_favicon.png"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.cashall.in/compare/cashify-vs-cashall#faq",
        "mainEntity": COMPARISON_FAQS.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-black">
      <Header />

      {/* JSON-LD INJECTION */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative bg-brand-black text-white py-16 sm:py-20 overflow-hidden border-b border-neutral-900">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-400">Compare</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-brand-yellow font-bold">Cashify vs CashALL</span>
            </div>

            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40 text-xs font-black tracking-wide uppercase">
                <Scale className="w-3.5 h-3.5" />
                <span>2026 Resale Market Comparison</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Cashify vs CashALL <br />
                <span className="text-brand-yellow">Which Gives You More Cash for Your Phone?</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                Tired of arbitrary re-quotes and hidden doorstep fees? See why thousands of smart sellers choose CashALL over Cashify for up to 5% higher payouts, zero convenience charges, and transparent doorstep evaluations.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/sell/mobile"
                  className="px-8 py-4 rounded-2xl bg-brand-yellow text-black font-black text-sm hover:bg-yellow-400 shadow-yellowGlow transition-transform active:scale-95 flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Check Your CashALL Payout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON MATRIX TABLE */}
        <section className="py-16 bg-white border-b border-brand-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-black">
                Side-by-Side Feature Comparison
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-2">
                A factual comparison between India&apos;s established buyback platforms
              </p>
            </div>

            <div className="bg-brand-bg rounded-3xl p-6 sm:p-8 border border-brand-border shadow-premium overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-brand-border text-brand-muted uppercase text-[11px]">
                    <th className="pb-4 font-bold w-1/3">Feature</th>
                    <th className="pb-4 font-black text-black bg-brand-yellow/10 px-4 rounded-t-xl w-1/3">
                      CashALL
                    </th>
                    <th className="pb-4 font-bold text-gray-500 px-4 w-1/3">Cashify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/60 transition-colors">
                      <td className="py-4 font-bold text-brand-black pr-4">
                        {row.feature}
                      </td>
                      <td className="py-4 font-bold text-emerald-700 bg-brand-yellow/5 px-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{row.cashall}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500 px-4">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                          <span>{row.cashify}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3 CORE REASONS CASHALL WINS */}
        <section className="py-16 bg-brand-bg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                The CashALL Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-black mt-1">
                How CashALL Gives You a Better Selling Experience
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-subtleCard hover:shadow-premium transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/20 flex items-center justify-center text-brand-black">
                  <TrendingUp className="w-6 h-6 text-brand-black" />
                </div>
                <h3 className="text-lg font-black text-brand-black">Up to 5% Higher Valuation</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Unlike large aggregator corporations with heavy advertising budgets, CashALL runs lean local refurbishment channels and passes maximum valuation directly back to you.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-subtleCard hover:shadow-premium transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/20 flex items-center justify-center text-brand-black">
                  <Zap className="w-6 h-6 text-brand-black" />
                </div>
                <h3 className="text-lg font-black text-brand-black">Zero Hidden Deductions</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  What you see is what you receive. We do not deduct ₹100–₹199 convenience charges or courier pickup surcharges. Our doorstep inspection is genuinely 100% free.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-subtleCard hover:shadow-premium transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/20 flex items-center justify-center text-brand-black">
                  <ShieldCheck className="w-6 h-6 text-brand-black" />
                </div>
                <h3 className="text-lg font-black text-brand-black">On-Site Certified Wipe</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Your privacy is non-negotiable. Our certified technician verifies that a complete factory data reset is performed in your physical presence before taking the device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON FAQS (AEO TARGETED) */}
        <section className="py-16 bg-white border-t border-brand-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-black">
                Frequently Asked Comparison Questions
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted">
                Direct answers to help you pick the best platform for your used device
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {COMPARISON_FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="bg-brand-bg p-6 rounded-2xl border border-brand-border shadow-subtleCard"
                >
                  <h3 className="font-extrabold text-sm sm:text-base text-brand-black mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 rounded-3xl bg-brand-black text-white text-center space-y-4 border border-neutral-800">
              <h3 className="text-2xl font-black text-white">
                Calculate Your Valuation on CashALL Today
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
                Compare our price with Cashify in 60 seconds. See the difference for yourself!
              </p>
              <div className="pt-2">
                <Link
                  href="/sell"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-yellow text-black font-black text-sm hover:bg-yellow-400 shadow-yellowGlow transition-transform active:scale-95"
                >
                  <span>Get Transparent Valuation</span>
                  <ArrowRight className="w-4 h-4" />
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
