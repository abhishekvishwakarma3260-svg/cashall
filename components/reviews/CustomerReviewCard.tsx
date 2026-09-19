"use client";

import React, { useState } from "react";
import { CustomerReview, VIDEO_REVIEWS, VideoReview } from "@/lib/data/reviewsData";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  Play,
  Smartphone,
  Laptop,
  Tablet,
} from "lucide-react";

interface CustomerReviewCardProps {
  review: CustomerReview;
  onOpenVideo?: (videoReview: VideoReview) => void;
}

export function CustomerReviewCard({ review, onOpenVideo }: CustomerReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpfulClick = () => {
    if (hasVoted) {
      setHelpfulCount((prev) => prev - 1);
      setHasVoted(false);
    } else {
      setHelpfulCount((prev) => prev + 1);
      setHasVoted(true);
    }
  };

  const matchedVideo = review.videoReviewId
    ? VIDEO_REVIEWS.find((v) => v.id === review.videoReviewId)
    : null;

  const getDeviceIcon = (category: CustomerReview["deviceCategory"]) => {
    if (category === "LAPTOP") return <Laptop className="w-3.5 h-3.5" />;
    if (category === "TABLET") return <Tablet className="w-3.5 h-3.5" />;
    return <Smartphone className="w-3.5 h-3.5" />;
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-subtleCard hover:shadow-premium hover:border-brand-yellow/80 transition-all duration-200 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* HEADER: USER INFO, STARS & VERIFIED */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-brand-yellow font-black flex items-center justify-center text-sm shadow-sm border border-brand-border">
              {review.customerName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-brand-black text-sm">
                  {review.customerName}
                </span>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Seller</span>
                  </span>
                )}
              </div>
              <div className="text-[11px] text-brand-muted flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>{review.location}</span>
                {review.phone && (
                  <>
                    <span>•</span>
                    <span className="font-mono text-neutral-700 font-bold">{review.phone}</span>
                  </>
                )}
                <span>•</span>
                <span>{review.date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        {/* DEVICE SOLD, ORDER NUMBER & PAYOUT SPEED TAGS */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {review.orderNumber && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-neutral-900 text-brand-yellow text-xs font-mono font-bold shadow-sm">
              Order #{review.orderNumber}
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-brand-bg text-brand-black text-xs font-semibold border border-brand-border/70">
            {getDeviceIcon(review.deviceCategory)}
            <span>{review.deviceSold}</span>
          </span>

          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xl">
            ⚡ {review.payoutSpeed}
          </span>

          {review.hasVideo && matchedVideo && (
            <button
              onClick={() => onOpenVideo && onOpenVideo(matchedVideo)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-black bg-brand-yellow hover:bg-yellow-400 px-2.5 py-0.5 rounded-xl transition-all shadow-sm"
            >
              <Play className="w-2.5 h-2.5 fill-brand-black" />
              <span>Watch Video</span>
            </button>
          )}
        </div>

        {/* REVIEW TITLE & CONTENT */}
        <div className="space-y-1.5 pt-1">
          <h4 className="text-sm font-black text-brand-black leading-snug">
            {review.reviewTitle}
          </h4>
          <p className="text-xs text-brand-muted leading-relaxed">
            &ldquo;{review.reviewText}&rdquo;
          </p>
        </div>
      </div>

      {/* FOOTER: HELPFUL COUNT */}
      <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
        <span>Payout: <strong className="text-brand-black font-price">₹{review.payoutAmount.toLocaleString("en-IN")}</strong> ({review.payoutMethod})</span>
        <button
          onClick={handleHelpfulClick}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
            hasVoted
              ? "bg-brand-yellow/30 text-brand-black border border-brand-yellow"
              : "hover:bg-neutral-100 text-brand-muted"
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? "fill-brand-black text-brand-black" : ""}`} />
          <span>Helpful ({helpfulCount})</span>
        </button>
      </div>
    </div>
  );
}
