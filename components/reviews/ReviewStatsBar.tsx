"use client";

import React from "react";
import { REVIEW_STATS } from "@/lib/data/reviewsData";
import { Star, ShieldCheck, Zap, Lock, ThumbsUp } from "lucide-react";

export function ReviewStatsBar() {
  const { averageRating, totalReviews, satisfactionRate, ratingBreakdown } = REVIEW_STATS;

  const trustHighlights = [
    {
      icon: Zap,
      title: "Instant UPI Payout",
      subtitle: "Credited in under 5 mins",
    },
    {
      icon: Lock,
      title: "Certified Data Wipe",
      subtitle: "Safe factory reset",
    },
    {
      icon: ShieldCheck,
      title: "100% Price Match",
      subtitle: "Zero hidden fee guarantee",
    },
    {
      icon: ThumbsUp,
      title: `${satisfactionRate}% Seller Love`,
      subtitle: "Over 14,000+ happy sellers",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-subtleCard">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT: BIG RATING NUMBER & STARS */}
        <div className="lg:col-span-4 text-center lg:text-left space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Google & Platform Verified</span>
          </div>

          <div className="flex items-baseline justify-center lg:justify-start gap-3">
            <span className="text-5xl sm:text-6xl font-black text-brand-black tracking-tight font-price">
              {averageRating.toFixed(1)}
            </span>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs text-brand-muted font-medium">
                out of 5.0 stars
              </div>
            </div>
          </div>

          <p className="text-sm text-brand-muted font-medium leading-relaxed">
            Based on <span className="font-extrabold text-brand-black">{totalReviews.toLocaleString("en-IN")}+ verified device sales</span> across India.
          </p>
        </div>

        {/* MIDDLE: STAR BREAKDOWN PROGRESS BARS */}
        <div className="lg:col-span-4 space-y-2 border-y lg:border-y-0 lg:border-x border-brand-border py-4 lg:py-0 lg:px-6">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = ratingBreakdown[star as keyof typeof ratingBreakdown];
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-12 font-bold text-brand-black flex items-center gap-1">
                  {star} <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                </span>
                <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-brand-muted font-medium font-price">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>

        {/* RIGHT: 4 TRUST SEALS */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          {trustHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-3 rounded-2xl bg-brand-bg border border-brand-border/70 flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-yellow/20 text-brand-black flex items-center justify-center mb-2 border border-brand-yellow/30">
                  <Icon className="w-4 h-4 text-brand-black" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-brand-black leading-tight">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-brand-muted font-medium mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
