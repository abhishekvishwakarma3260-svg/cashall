"use client";

import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blogData";
import { Sparkles, ArrowRight, Clock, CheckCircle2, BookOpen } from "lucide-react";

export function BeSmartSellSmartSection() {
  return (
    <section className="py-20 bg-white border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-brand-border pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-black text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Be Smart, Sell Smart</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight">
              Essential Phone Resale &amp; Security Guides
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-xl leading-relaxed">
              Read actionable market data on storage ROI, iPhone retention rates, eSIM privacy, and on-device AI valuations before selling.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-black text-brand-black hover:text-neutral-700 bg-brand-yellow hover:bg-amber-400 px-4 py-2 rounded-xl transition shadow-xs shrink-0 self-start sm:self-auto"
          >
            <span>View All Guides ({BLOG_POSTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5 BLOGS RESPONSIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post, idx) => (
            <article
              key={post.slug}
              className={`bg-white rounded-2xl border border-neutral-200/80 p-6 hover:border-brand-yellow/70 hover:shadow-[0_10px_30px_-5px_rgba(255,212,0,0.18)] transition-all duration-200 flex flex-col justify-between space-y-4 hover:-translate-y-0.5 ${
                idx === 0 ? "md:col-span-2 lg:col-span-1 border-amber-300/60 bg-amber-50/20" : ""
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/60 border border-amber-200/70 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-neutral-400 font-medium">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/${post.slug}`} className="block group">
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-amber-600 transition leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-normal">
                  {post.excerpt}
                </p>

                <div className="bg-neutral-50 border border-neutral-200/70 rounded-xl p-2.5 text-[11px] text-neutral-700">
                  <div className="font-bold text-[10px] text-amber-900 uppercase flex items-center gap-1 mb-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Key Insight:</span>
                  </div>
                  <span className="line-clamp-2">{post.aeoQuickAnswer.keyTakeaway}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 font-medium">
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <Link
                  href={`/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-amber-600 transition"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
