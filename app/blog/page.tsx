import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/lib/data/blogData";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Newspaper
} from "lucide-react";

export const metadata: Metadata = {
  title: "Be Smart, Sell Smart: Phone Resale Value Guides & Tech Insights | CashALL",
  description:
    "Explore authoritative resale valuation guides, market depreciation analysis, eSIM security protocols, and on-device AI trade-in trends from the CashALL research team.",
  alternates: {
    canonical: "https://www.cashall.in/blog",
  },
  openGraph: {
    title: "Be Smart, Sell Smart: Phone Resale Value Guides & Tech Insights | CashALL",
    description:
      "Understand device depreciation, storage ROI, clean phone checklists, and how to get maximum cash for your used phone in India.",
    url: "https://www.cashall.in/blog",
    images: ["/photos/CashALL_logo.png"],
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "CashALL Smart Resale Blog",
    "description": "Expert advice, price benchmarks, and security guides for selling old smartphones and electronics.",
    "publisher": {
      "@type": "Organization",
      "name": "CashALL",
      "url": "https://www.cashall.in"
    },
    "blogPost": BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.publishedAt,
      "url": `https://www.cashall.in/${post.slug}`
    }))
  };

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
              <Sparkles className="w-4 h-4" />
              <span>CashALL Knowledge & Research Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-brand-black tracking-tight">
              Be Smart, <span className="bg-brand-black text-brand-yellow px-3 py-1 rounded-2xl">Sell Smart</span>
            </h1>

            <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Real-world device valuation data, depreciation calculators, and data privacy guides designed to help you get the highest possible payout when selling your old gadgets.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-brand-border text-xs font-extrabold text-brand-black hover:border-brand-black transition"
              >
                <Newspaper className="w-3.5 h-3.5 text-brand-black" />
                <span>Tech News Feed</span>
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-brand-border text-xs font-extrabold text-brand-black hover:border-brand-black transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-brand-black" />
                <span>All Articles & Guides</span>
              </Link>
            </div>
          </div>

          {/* FEATURED / LATEST BLOG POSTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl border border-brand-border p-6 shadow-subtleCard hover:shadow-premium hover:border-brand-yellow transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-brand-black bg-brand-yellow/30 border border-brand-yellow/60 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-brand-muted font-medium">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/${post.slug}`} className="block group">
                    <h2 className="text-lg sm:text-xl font-black text-brand-black group-hover:text-amber-600 transition leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* AEO KEY TAKEAWAY TEASER */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 text-[11px] text-amber-950 font-medium">
                    <div className="font-extrabold flex items-center gap-1 text-amber-900 mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Key Takeaway:</span>
                    </div>
                    {post.aeoQuickAnswer.keyTakeaway}
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                  <span className="text-[11px] text-brand-muted">
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </span>

                  <Link
                    href={`/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-black text-brand-black hover:text-amber-600 transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* BOTTOM VALUATION CTA */}
          <div className="bg-brand-black text-white rounded-3xl p-8 sm:p-10 shadow-premium flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-2xl font-black">
                How Much Is Your Old Device Worth Right Now?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-lg">
                Answer simple questions about your screen and body condition to receive an instant, guaranteed transparent quote.
              </p>
            </div>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-yellow hover:bg-amber-400 text-brand-black font-black text-xs sm:text-sm shadow-md transition hover:scale-105"
            >
              <span>Get Instant Valuation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
