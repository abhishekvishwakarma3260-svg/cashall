import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  TrendingUp,
  Smartphone,
  Laptop,
  Tablet,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
  Leaf
} from "lucide-react";

export function RecommerceSeoBlock() {
  const BRANDS = [
    { name: "Apple", slug: "apple", desc: "Sell iPhone 11 to 16 Pro Max" },
    { name: "Samsung", slug: "samsung", desc: "Sell Galaxy S, Z Fold & A Series" },
    { name: "OnePlus", slug: "oneplus", desc: "Sell OnePlus 9, 10, 11 & 12 Series" },
    { name: "Xiaomi / Redmi", slug: "xiaomi", desc: "Sell Redmi Note & Xiaomi Flagships" },
    { name: "Google Pixel", slug: "google", desc: "Sell Pixel 6, 7, 8 & 9 Series" },
    { name: "Vivo", slug: "vivo", desc: "Sell V & X Series Flagships" },
    { name: "Oppo", slug: "oppo", desc: "Sell Reno & Find Series" },
    { name: "Realme", slug: "realme", desc: "Sell GT & Number Series" },
  ];

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-border" id="recommerce-guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 1: MASTER SEO BANNER & VALUE PROPOSITION */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-subtleCard space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-black text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>India's Transparent Re-Commerce Platform</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-brand-black tracking-tight leading-tight">
              Sell Your Old Phone Online for Best Cash with CashALL
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Every month, thousands of smartphone users across Kolkata, Howrah, and West Bengal trade in their older devices on CashALL. Instead of haggling with offline dealers or risking classified scams on OLX, CashALL provides an instant algorithmic valuation, 100% free doorstep inspection, and immediate UPI bank transfer before handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-brand-border/60">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-black text-brand-black text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Highest Price Guarantee</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Guaranteed up to 5% higher payouts than legacy aggregators with zero hidden pickup or diagnostic deductions.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-black text-brand-black text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certified On-Site Data Wipe</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Every device undergoes a NIST 800-88 compliant data wipe on-site with legal Bill of Sale indemnifying you.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-black text-brand-black text-sm">
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant Doorstep Payout</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Funds are transferred via UPI (Google Pay, PhonePe, Paytm) directly into your bank account before our agent leaves.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: WHICH MOBILE PHONE BRANDS CAN BE SOLD ON CASHALL */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-brand-border pb-4">
            <div>
              <h2 className="text-2xl font-black text-brand-black">
                Which Mobile Phone Brands Can Be Sold on CashALL?
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-1">
                We buy all major Android &amp; iOS smartphones across any functional or cosmetic condition.
              </p>
            </div>
            <Link
              href="/sell/mobile"
              className="text-xs font-black text-brand-black hover:text-amber-600 flex items-center gap-1 shrink-0"
            >
              <span>Explore All 25+ Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/sell/mobile/${brand.slug}`}
                className="bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-yellow hover:shadow-subtleCard transition text-center group space-y-1"
              >
                <div className="font-extrabold text-sm sm:text-base text-brand-black group-hover:text-black">
                  {brand.name}
                </div>
                <div className="text-[11px] text-brand-muted">
                  {brand.desc}
                </div>
                <div className="text-[10px] font-black text-amber-700 pt-1 flex items-center justify-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Sell {brand.name}</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SECTION 3: GREEN CIRCULAR ECONOMY COMMITMENT */}
        <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-10 shadow-premium flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black">
              <Leaf className="w-4 h-4" />
              <span>Environmental Circular Economy</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Sell Old Devices, Reduce E-Waste in India
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              When you sell your old smartphone or laptop to CashALL, you actively divert toxic heavy metals from landfills. Devices are refurbished or responsibly recycled, extending hardware lifespan and conserving vital natural resources.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-yellow hover:bg-amber-400 text-brand-black font-black text-xs sm:text-sm shadow-md transition hover:scale-105"
            >
              <span>Calculate Old Phone Price</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
