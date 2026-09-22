"use client";

import React, { useState, useMemo } from "react";
import { CUSTOMER_REVIEWS, REVIEW_STATS } from "@/lib/data/reviewsData";
import { ReviewStatsBar } from "./ReviewStatsBar";
import { CustomerReviewCard } from "./CustomerReviewCard";
import { Sparkles, MessageSquare } from "lucide-react";

type FilterCategory = "ALL" | "MOBILE_APPLE" | "MOBILE_ANDROID" | "LAPTOP" | "TABLET";

export function CustomerReviewsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");
  const [visibleCount, setVisibleCount] = useState(6);

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: "ALL", label: `All Reviews (${CUSTOMER_REVIEWS.length})` },
    { id: "MOBILE_APPLE", label: "Apple iPhone" },
    { id: "MOBILE_ANDROID", label: "Android Phones" },
    { id: "LAPTOP", label: "Laptops & MacBooks" },
    { id: "TABLET", label: "Tablets" },
  ];

  const filteredReviews = useMemo(() => {
    return CUSTOMER_REVIEWS.filter((item) => {
      if (activeFilter === "ALL") return true;
      if (activeFilter === "MOBILE_APPLE") {
        return item.deviceCategory === "MOBILE" && item.deviceSold.toLowerCase().includes("iphone");
      }
      if (activeFilter === "MOBILE_ANDROID") {
        return (
          item.deviceCategory === "MOBILE" && !item.deviceSold.toLowerCase().includes("iphone")
        );
      }
      if (activeFilter === "LAPTOP") return item.deviceCategory === "LAPTOP";
      if (activeFilter === "TABLET") return item.deviceCategory === "TABLET";
      return true;
    });
  }, [activeFilter]);

  const displayedReviews = filteredReviews.slice(0, visibleCount);

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
            Read authentic doorstep payout reviews and ratings from our <span className="font-extrabold text-brand-black">{REVIEW_STATS.totalOrders} completed customer orders</span> (including trusted repeat sellers) across West Bengal & India.
          </p>
        </div>

        {/* 1. AGGREGATE STATS & TRUST SEALS */}
        <ReviewStatsBar />

        {/* 2. WRITTEN REVIEWS SHOWCASE WITH FILTERS */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-black" />
              <h3 className="text-xl font-extrabold text-brand-black">
                Verified Seller Testimonials ({filteredReviews.length})
              </h3>
            </div>

            {/* FILTER PILLS */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveFilter(tab.id);
                      setVisibleCount(6);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-brand-black text-brand-yellow shadow-md"
                        : "bg-white text-brand-muted hover:text-brand-black border border-brand-border/80 hover:border-brand-black"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* REVIEWS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((review) => (
              <CustomerReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* LOAD MORE BUTTON */}
          {visibleCount < filteredReviews.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-2.5 rounded-2xl bg-white hover:bg-neutral-50 border border-brand-border font-extrabold text-xs text-brand-black shadow-subtleCard hover:shadow-premium transition-all"
              >
                Show More Reviews ({filteredReviews.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
