"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { CUSTOMER_REVIEWS, REVIEW_STATS } from "@/lib/data/reviewsData";
import { ReviewStatsBar } from "./ReviewStatsBar";
import { CustomerReviewCard } from "./CustomerReviewCard";
import { Sparkles, MessageSquare, ArrowRight, PenSquare, Star, ChevronLeft, ChevronRight } from "lucide-react";

export function CustomerReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Select the 4 best reviews: 5-star rating, verified, highest payout/feedback quality
  const fourBestReviews = useMemo(() => {
    return CUSTOMER_REVIEWS.filter((r) => r.rating === 5 && r.verified)
      .sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0))
      .slice(0, 4);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-border" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* MAIN SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/20 border border-brand-yellow/40 text-brand-black text-xs font-extrabold shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-black" />
            <span>{REVIEW_STATS.totalOrders} Completed Orders • Real Sellers • Verified Payouts</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-brand-black tracking-tight">
            Loved By <span className="text-brand-yellow bg-brand-black px-2 py-0.5 rounded-xl">{REVIEW_STATS.uniqueSellers}</span> Verified Device Sellers
          </h2>

          <p className="text-sm sm:text-base text-brand-muted max-w-xl mx-auto leading-relaxed">
            Read authentic doorstep payout reviews and ratings from our <span className="font-extrabold text-brand-black">{REVIEW_STATS.totalOrders} completed customer orders</span> across West Bengal & India.
          </p>
        </div>

        {/* 1. AGGREGATE STATS & TRUST SEALS */}
        <ReviewStatsBar />

        {/* 2. TOP 4 BEST REVIEWS SHOWCASE */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-brand-black" />
              <h3 className="text-xl font-extrabold text-brand-black">
                Top Rated Customer Reviews
              </h3>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Top Verified Ratings
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Carousel navigation buttons */}
              <div className="flex items-center gap-1 mr-2">
                <button
                  onClick={() => handleScroll("left")}
                  aria-label="Previous review"
                  className="w-8 h-8 rounded-xl bg-white hover:bg-neutral-100 border border-brand-border flex items-center justify-center text-brand-black transition shadow-xs active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  aria-label="Next review"
                  className="w-8 h-8 rounded-xl bg-white hover:bg-neutral-100 border border-brand-border flex items-center justify-center text-brand-black transition shadow-xs active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/reviews?action=write"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-neutral-50 border border-brand-border text-xs font-bold text-brand-black shadow-xs transition hover:border-brand-black"
              >
                <PenSquare className="w-3.5 h-3.5 text-brand-yellow fill-brand-black" />
                <span className="hidden sm:inline">Write Review</span>
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center gap-1 text-xs font-extrabold text-brand-black hover:text-neutral-700 bg-brand-yellow hover:bg-amber-400 px-3.5 py-1.5 rounded-xl transition shadow-xs"
              >
                <span>View All ({CUSTOMER_REVIEWS.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4 REVIEWS SCROLL VIEW / RESPONSIVE GRID */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-2 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible"
            tabIndex={0}
            role="region"
            aria-label="Top Customer Reviews carousel"
          >
            {fourBestReviews.map((review) => (
              <div
                key={review.id}
                className="w-[85vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
              >
                <CustomerReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* VIEW MORE & ADD REVIEW CALL TO ACTION BAR */}
          <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-subtleCard flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-black text-brand-black flex items-center justify-center sm:justify-start gap-2">
                <span>Have you sold a device through CashALL?</span>
              </h4>
              <p className="text-xs text-brand-muted max-w-md">
                Anyone can share their doorstep selling experience. Read all {CUSTOMER_REVIEWS.length}+ verified reviews or leave your own rating in under a minute!
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end shrink-0">
              <Link
                href="/reviews?action=write"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-neutral-50 text-brand-black border border-brand-black font-extrabold text-xs shadow-sm transition hover:shadow-md"
              >
                <PenSquare className="w-4 h-4 text-brand-yellow fill-brand-black" />
                <span>Add Your Review</span>
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-black hover:bg-brand-dark text-white font-extrabold text-xs shadow-md transition hover:scale-[1.02] active:scale-95"
              >
                <span>View All Reviews ({CUSTOMER_REVIEWS.length}+ reviews)</span>
                <ArrowRight className="w-4 h-4 text-brand-yellow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
