import React from "react";
import Image from "next/image";
import { ShieldCheck, Truck, Zap, Lock, HeartHandshake, FileSearch, Sparkles } from "lucide-react";

export function WhyCashALL() {
  const features = [
    {
      title: "Transparent Valuation",
      description: "We show you exact itemized line items for why your phone is valued at its price. No guesswork.",
      icon: FileSearch,
    },
    {
      title: "Fast & Free Doorstep Pickup",
      description: "Our certified agent collects your device directly from your home or office with express logistics.",
      icon: Truck,
    },
    {
      title: "Quick Direct Payment",
      description: "Receive instant funds directly to your UPI ID or Bank account upon inspection approval.",
      icon: Zap,
    },
    {
      title: "Secure Data Wipe",
      description: "Assisted factory data wipe during pickup to keep your personal files completely safe.",
      icon: Lock,
    },
    {
      title: "Zero Hidden Fees",
      description: "No processing deductions, pickup convenience fees or hidden service charges.",
      icon: ShieldCheck,
    },
    {
      title: "Human Support",
      description: "Real customer support team available to assist with questions or pickup adjustments.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-brand-bg border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            Transparent &amp; Safe Buyback
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
            Why Sell On CashALL?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-normal leading-relaxed">
            Built on trust, speed, and complete pricing transparency for smartphone owners.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-6px_rgba(255,212,0,0.18)] hover:border-brand-yellow/60 transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-yellow/15 text-brand-black flex items-center justify-center mb-4 border border-brand-yellow/30 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-brand-black" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* COMMERCIAL PROMO BANNER CAROUSEL / HIGHLIGHT */}
        <div className="bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            
            {/* LEFT TEXT CONTENT */}
            <div className="p-7 sm:p-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified CashALL Advantage</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                Sell Your Old Phone In <span className="text-brand-yellow">3 Simple Steps</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                Get an instant online quote, schedule a free doorstep pickup slot, and receive instant UPI / Bank payout directly upon doorstep inspection.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-neutral-800/80 text-center">
                <div>
                  <div className="text-lg font-black text-brand-yellow font-price">100%</div>
                  <div className="text-[11px] text-neutral-400 font-semibold mt-0.5">Safe Payout</div>
                </div>
                <div>
                  <div className="text-lg font-black text-brand-yellow font-price">₹0 Free</div>
                  <div className="text-[11px] text-neutral-400 font-semibold mt-0.5">Doorstep Pickup</div>
                </div>
                <div>
                  <div className="text-lg font-black text-brand-yellow font-price">Instant</div>
                  <div className="text-[11px] text-neutral-400 font-semibold mt-0.5">UPI Payout</div>
                </div>
              </div>
            </div>

            {/* RIGHT PROMOTIONAL IMAGE */}
            <div className="relative h-64 md:h-full min-h-[280px] bg-neutral-900 overflow-hidden">
              <Image
                src="/photos/CashALL_yt_banner.png"
                alt="CashALL Promotional Banner"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950 via-transparent to-transparent opacity-80" />
            </div>

          </div>
        </div>

        {/* TRANSPARENT PRICING GUARANTEE BANNER */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-yellow/50 shadow-[0_8px_30px_rgba(255,212,0,0.12)] max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-brand-yellow flex items-center justify-center shrink-0 shadow-yellowGlow text-black">
              <ShieldCheck className="w-6 h-6 text-brand-black" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                Our Transparent Pricing Guarantee
              </h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-normal">
                Your online value is an estimate based on the condition parameters you select. Your final price is confirmed after physical inspection. If anything changes, we&apos;ll show you the exact line-item reason before you decide whether to accept or decline the offer.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
