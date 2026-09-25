import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/lib/data/blogData";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Smartphone,
  Laptop,
  HelpCircle,
  TrendingUp,
  Cpu,
  Lock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Gadget Selling Articles & Device Valuation Guides | CashALL",
  description:
    "Master the art of selling old phones, laptops, and tablets. Read comprehensive articles on IMEI verification, eSIM deletion, battery health impacts, and getting the highest cash payout.",
  alternates: {
    canonical: "https://www.cashall.in/articles",
  },
  openGraph: {
    title: "Gadget Selling Articles & Device Valuation Guides | CashALL",
    description: "Master the art of selling old phones, laptops, and tablets with CashALL guides.",
    url: "https://www.cashall.in/articles",
    images: ["/photos/CashALL_logo.png"],
  },
};

export default function ArticlesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "CashALL Articles & Valuation Guides",
    "url": "https://www.cashall.in/articles",
    "description": "Educational articles, selling tutorials, and technical guides for used smartphones and electronics.",
  };

  const ADDITIONAL_GUIDES = [
    {
      title: "How to Safely Wipe All Data from an Android Phone Before Selling",
      category: "Security & Data",
      readTime: "4 min read",
      summary: "Step-by-step instructions to unlink Google Accounts, disable Factory Reset Protection (FRP), encrypt storage, and trigger certified NIST 800-88 factory resets.",
      link: "/steps-to-ensure-your-digital-sim-doesnt-go-with-sold-phones"
    },
    {
      title: "Does a Cracked Screen Ruin Your Phone's Buyback Value?",
      category: "Hardware & Battery",
      readTime: "5 min read",
      summary: "Understand the difference between glass-only scratches, touch digitizer failure, and black OLED bleed. See how CashALL values broken and damaged devices fairly.",
      link: "/faq"
    },
    {
      title: "How Battery Health Percentage Affects iPhone Buyback Rates",
      category: "Hardware & Battery",
      readTime: "4 min read",
      summary: "Why iPhones with battery health above 80% command top market price, and what transparent deductions apply if your battery requires servicing.",
      link: "/why-iphones-hold-more-resale-value-than-android-in-india"
    },
    {
      title: "CashALL vs Other Platforms & Local Dealers: The Complete 2026 Selling Comparison",
      category: "Comparisons",
      readTime: "6 min read",
      summary: "Detailed breakdown comparing CashALL against online aggregators, local mobile shops, and classified marketplaces on price, doorstep convenience, and safety.",
      link: "/compare/cashall-vs-other-platforms"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/20 border border-brand-yellow/40 text-brand-black text-xs font-black shadow-xs">
              <BookOpen className="w-4 h-4" />
              <span>CashALL Academy & Articles</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-brand-black tracking-tight">
              Gadget Selling <span className="bg-brand-black text-brand-yellow px-3 py-1 rounded-2xl">Articles & Guides</span>
            </h1>

            <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
              In-depth research, tutorials, and step-by-step documentation to help Indian device owners make smart, profitable, and secure re-commerce decisions.
            </p>
          </div>

          {/* CORE ESSENTIAL GUIDES (THE 5 DEEP BLOGS) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h2 className="text-xl font-black text-brand-black flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-yellow fill-brand-black" />
                <span>Featured Resale & Security Guides</span>
              </h2>
              <Link href="/blog" className="text-xs font-extrabold text-brand-black hover:text-amber-600 flex items-center gap-1">
                <span>View All ({BLOG_POSTS.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-3xl border border-brand-border p-6 shadow-subtleCard hover:shadow-premium hover:border-brand-yellow transition-all duration-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-brand-black bg-brand-yellow/30 border border-brand-yellow/50 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-brand-muted font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/${post.slug}`}>
                      <h3 className="text-base font-black text-brand-black hover:text-amber-600 transition leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between">
                    <span className="text-[11px] text-brand-muted">{post.author.name}</span>
                    <Link
                      href={`/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-black text-brand-black hover:text-amber-600 transition"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ADDITIONAL PRACTICAL HOW-TO GUIDES */}
          <div className="space-y-6 pt-6">
            <h2 className="text-xl font-black text-brand-black flex items-center gap-2 border-b border-brand-border pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Practical Tutorials & Device Care</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ADDITIONAL_GUIDES.map((guide, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-brand-border p-6 shadow-subtleCard space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 border border-brand-border px-2 py-0.5 rounded-full uppercase">
                        {guide.category}
                      </span>
                      <span className="text-[11px] text-brand-muted">{guide.readTime}</span>
                    </div>
                    <Link href={guide.link}>
                      <h3 className="text-base font-black text-brand-black hover:text-amber-600 transition">
                        {guide.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={guide.link}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-black hover:text-amber-600 transition"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VALUATION CALCULATOR BANNER */}
          <div className="bg-brand-black text-white rounded-3xl p-8 sm:p-10 shadow-premium flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-2xl font-black">
                Ready to Turn Your Old Device Into Cash?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-lg">
                Sell your old smartphone, laptop, or tablet in 60 seconds with free doorstep pickup across Kolkata, Howrah, and West Bengal.
              </p>
            </div>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-yellow hover:bg-amber-400 text-brand-black font-black text-xs sm:text-sm shadow-md transition hover:scale-105"
            >
              <span>Calculate Phone Price</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
