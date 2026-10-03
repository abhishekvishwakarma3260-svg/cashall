import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DeviceSearch } from "./DeviceSearch";
import { AdCarousel } from "./AdCarousel";
import { ShieldCheck, Truck, Zap, Lock } from "lucide-react";

import { HeroLocationBar } from "./HeroLocationBar";

export function Hero() {
  return (
    <section className="relative bg-brand-black text-white overflow-hidden pt-8 pb-16 md:py-20 border-b border-neutral-900">
      
      {/* BACKGROUND BRAND GLOW & PATTERN ACCENTS */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/photos/CashALL_brand_pattern.png')] bg-cover bg-center opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* TOP TAG PILL */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm text-xs font-semibold text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Instant Doorstep Device Buyback • Zero Convenience Fee</span>
          </div>

          {/* PRIMARY HEADLINE */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Sell Your Old Devices <br className="hidden sm:inline" />
            <span className="text-brand-yellow">for the Best Value with CashALL.</span>
          </h1>

          {/* SUPPORTING TEXT */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed px-2 font-normal">
            Get an instant algorithmic valuation for your smartphone, laptop, or tablet. Free doorstep pickup, verified on-site inspection, and immediate payout.
          </p>

          {/* STATE SELECTION BAR */}
          <HeroLocationBar />

          {/* FULLY VISIBLE ADVERTISEMENT AUTO SIDE-SCROLL CAROUSEL */}
          <div className="pt-1">
            <AdCarousel />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
            <Link href="/sell" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" fullWidth className="text-sm font-extrabold px-7 py-3 shadow-yellowGlow rounded-xl">
                Sell Any Device
              </Button>
            </Link>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link href="/sell/mobile" className="flex-1 sm:w-auto">
                <Button variant="tertiary" size="lg" className="w-full text-xs font-bold bg-neutral-900/90 text-neutral-200 border border-neutral-800 hover:border-brand-yellow/50 hover:bg-neutral-800/90 px-4 py-2.5 rounded-xl transition-all">
                  Sell Phone
                </Button>
              </Link>
              <Link href="/sell/laptop" className="flex-1 sm:w-auto">
                <Button variant="tertiary" size="lg" className="w-full text-xs font-bold bg-neutral-900/90 text-neutral-200 border border-neutral-800 hover:border-brand-yellow/50 hover:bg-neutral-800/90 px-4 py-2.5 rounded-xl transition-all">
                  Sell Laptop
                </Button>
              </Link>
              <Link href="/sell/tablet" className="flex-1 sm:w-auto">
                <Button variant="tertiary" size="lg" className="w-full text-xs font-bold bg-neutral-900/90 text-neutral-200 border border-neutral-800 hover:border-brand-yellow/50 hover:bg-neutral-800/90 px-4 py-2.5 rounded-xl transition-all">
                  Sell Tablet
                </Button>
              </Link>
            </div>
          </div>

          {/* SEARCH INTEGRATION */}
          <div id="find-phone" className="pt-4">
            <DeviceSearch />
          </div>

          {/* TRUST INDICATORS */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 hover:border-brand-yellow/30 transition-all">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-brand-yellow" />
              </div>
              <span className="text-xs font-semibold text-neutral-200">Fast &amp; Free Pickup</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 hover:border-brand-yellow/30 transition-all">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-brand-yellow" />
              </div>
              <span className="text-xs font-semibold text-neutral-200">Instant UPI Payment</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 hover:border-brand-yellow/30 transition-all">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-brand-yellow" />
              </div>
              <span className="text-xs font-semibold text-neutral-200">Transparent Pricing</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 hover:border-brand-yellow/30 transition-all">
              <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-brand-yellow" />
              </div>
              <span className="text-xs font-semibold text-neutral-200">Certified Data Wipe</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
