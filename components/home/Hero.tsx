"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { DeviceSearch } from "./DeviceSearch";
import { HeroLocationBar } from "./HeroLocationBar";
import {
  Smartphone,
  Laptop,
  Tablet,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Truck,
  RotateCcw,
} from "lucide-react";

// Minimalist, high-impact hero slides with working CTA buttons and actual product images
const HERO_SLIDES = [
  {
    id: "slide-phone",
    badge: "Instant Algorithmic Valuation",
    title: "Sell Your Old Phone for the Highest Payout",
    highlight: "Highest Payout",
    subtitle: "Doorstep pickup in 2-4 hours, zero convenience fees, and instant spot payment before handover.",
    ctaText: "Sell Phone Now",
    ctaLink: "/sell/mobile",
    secondaryCtaText: "Check Resale Value",
    secondaryCtaLink: "/sell/mobile",
    themeGradient: "from-neutral-950 via-stone-900 to-neutral-950",
    glowColor: "bg-brand-yellow/15",
    deviceBadge: "Guaranteed Highest Payout",
    deviceType: "phone",
    image: "/images/hero/hero_phone.jpg",
  },
  {
    id: "slide-laptop",
    badge: "Fast Mac & PC Trade-In",
    title: "Sell Used Laptops & MacBooks with Certified Data Wipe",
    highlight: "Certified Data Wipe",
    subtitle: "From MacBook Pro to Dell & HP gaming laptops. Free doorstep testing & direct UPI transfer.",
    ctaText: "Sell Laptop",
    ctaLink: "/sell/laptop",
    secondaryCtaText: "All Laptop Brands",
    secondaryCtaLink: "/sell/laptop",
    themeGradient: "from-neutral-950 via-neutral-900 to-neutral-950",
    glowColor: "bg-blue-500/10",
    deviceBadge: "100% Cryptographic Data Erasure",
    deviceType: "laptop",
    image: "/images/hero/hero_laptop.jpg",
  },
  {
    id: "slide-ps5",
    badge: "Gaming Rental Hub • Kolkata & WB",
    title: "Rent PlayStation 5 Console at Just ₹500/Day",
    highlight: "₹500/Day",
    subtitle: "Delivered to your doorstep with top game CDs (GTA V, Spider-Man 2, FC 24) & pay on delivery.",
    ctaText: "Rent PS 5",
    ctaLink: "/rent/ps5",
    secondaryCtaText: "View Rental Games",
    secondaryCtaLink: "/rent/ps5",
    themeGradient: "from-neutral-950 via-blue-950/60 to-neutral-950",
    glowColor: "bg-blue-600/20",
    deviceBadge: "Working Video Proof Included",
    deviceType: "ps5",
    image: "/images/hero/hero_ps5.jpg",
    wbOnly: true,
  },
  {
    id: "slide-tablet",
    badge: "Tablets & iPads Recommerce",
    title: "Sell Old iPads & Galaxy Tabs with Zero Haggling",
    highlight: "Zero Haggling",
    subtitle: "Get guaranteed locked buyback price for any Apple iPad, Samsung Tab, or Lenovo Pad.",
    ctaText: "Sell Tablet",
    ctaLink: "/sell/tablet",
    secondaryCtaText: "Select Tablet Model",
    secondaryCtaLink: "/sell/tablet",
    themeGradient: "from-neutral-950 via-stone-900 to-neutral-950",
    glowColor: "bg-amber-500/15",
    deviceBadge: "Guaranteed Price Lock",
    deviceType: "tablet",
    image: "/images/hero/hero_tablet.jpg",
  },
];

// Quick Services Array with actual device images
const SERVICES = [
  {
    id: "sell-phone",
    title: "Sell Phone",
    subtitle: "iPhone, Samsung & more",
    image: "/images/devices/phone.jpg",
    icon: Smartphone,
    href: "/sell/mobile",
    badge: "Popular",
    color: "bg-amber-400/10 text-amber-500 border-amber-400/30",
  },
  {
    id: "sell-laptop",
    title: "Sell Laptop",
    subtitle: "MacBook, Dell & HP",
    image: "/images/devices/laptop.jpg",
    icon: Laptop,
    href: "/sell/laptop",
    badge: "Fast Cash",
    color: "bg-blue-400/10 text-blue-400 border-blue-400/30",
  },
  {
    id: "sell-tablet",
    title: "Sell Tablet",
    subtitle: "iPad, Galaxy Tab",
    image: "/images/devices/tablet.jpg",
    icon: Tablet,
    href: "/sell/tablet",
    badge: "Spot Payout",
    color: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
  },
  {
    id: "rent-ps5",
    title: "Rent PS5",
    subtitle: "At ₹500/day in WB",
    image: "/images/devices/ps5.jpg",
    icon: Gamepad2,
    href: "/rent/ps5",
    badge: "Kolkata Hub",
    color: "bg-indigo-400/10 text-indigo-400 border-indigo-400/30",
    wbOnly: true,
  },
  {
    id: "instant-val",
    title: "Sell Any Gadget",
    subtitle: "1,000+ catalog devices",
    image: "/images/devices/all_devices.jpg",
    icon: Sparkles,
    href: "/sell",
    badge: "All Brands",
    color: "bg-yellow-400/10 text-brand-yellow border-yellow-400/30",
  },
  {
    id: "track-order",
    title: "Track My Order",
    subtitle: "Real-time field status",
    icon: Truck,
    href: "/account",
    badge: "Live 24/7",
    color: "bg-neutral-800 text-neutral-300 border-neutral-700",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isWestBengal, setIsWestBengal] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Check location for West Bengal exclusivity
  useEffect(() => {
    const checkLocation = () => {
      if (typeof window !== "undefined") {
        try {
          const locStr = localStorage.getItem("cashall_location");
          if (locStr) {
            const parsed = JSON.parse(locStr);
            const state = (parsed?.state || "").toLowerCase();
            const city = (parsed?.city || "").toLowerCase();
            setIsWestBengal(
              state.includes("west bengal") ||
              state.includes("bengal") ||
              state.trim() === "wb" ||
              city.includes("kolkata") ||
              city.includes("howrah")
            );
          } else {
            setIsWestBengal(false);
          }
        } catch {
          setIsWestBengal(false);
        }
      }
    };

    checkLocation();
    window.addEventListener("cashall_location_updated", checkLocation);
    window.addEventListener("storage", checkLocation);
    return () => {
      window.removeEventListener("cashall_location_updated", checkLocation);
      window.removeEventListener("storage", checkLocation);
    };
  }, []);

  const activeSlides = isWestBengal ? HERO_SLIDES : HERO_SLIDES.filter((s) => !s.wbOnly);
  const activeServices = isWestBengal ? SERVICES : SERVICES.filter((s) => !s.wbOnly);

  // Auto-play slide timer (4.5s)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const slide = activeSlides[currentSlide] || activeSlides[0];

  return (
    <section className="relative bg-neutral-950 text-white pt-4 pb-10 sm:pb-12 border-b border-neutral-900">
      
      {/* AMBIENT BRAND LIGHTING ACCENTS */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/photos/CashALL_brand_pattern.png')] bg-cover bg-center opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
        
        {/* SERVICE AREA LOCATION BAR */}
        <HeroLocationBar />

        {/* MINIMALIST HERO SLIDER (Cashify-Style Sleek Dark Banner) */}
        <div
          className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-gradient-to-r from-neutral-950 via-stone-950 to-neutral-950 shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* SLIDER INNER CONTAINER */}
          <div className="relative p-6 sm:p-10 md:p-12 min-h-[320px] sm:min-h-[360px] flex items-center justify-between overflow-hidden">
            
            {/* AMBIENT SLIDE GLOW */}
            <div className={`absolute -right-10 -top-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${slide.glowColor}`} />

            {/* LEFT COLUMN: PUNCHY COPY & WORKING ACTION BUTTONS */}
            <div className="max-w-xl space-y-4 z-10 animate-fadeIn">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-neutral-200 border border-white/10 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed max-w-lg">
                {slide.subtitle}
              </p>

              {/* ACTION BUTTONS (Directly working links) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href={slide.ctaLink}>
                  <Button
                    variant="primary"
                    size="md"
                    className="font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-yellowGlow gap-2 group cursor-pointer"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href={slide.secondaryCtaLink}>
                  <Button
                    variant="secondary"
                    size="md"
                    className="font-bold text-xs sm:text-sm px-5 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-sm transition-all cursor-pointer"
                  >
                    <span>{slide.secondaryCtaText}</span>
                  </Button>
                </Link>
              </div>

            </div>

            {/* RIGHT COLUMN: ACTUAL PRODUCT VISUAL & GUARANTEE BADGE */}
            <div className="hidden lg:flex flex-col items-center justify-center shrink-0 pr-4 xl:pr-6 relative z-10 animate-fadeIn">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border border-neutral-800/90 shadow-2xl group hover:border-brand-yellow/60 transition-all bg-neutral-900/80">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 320px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-[10px] font-black text-white uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <span>CashALL Guarantee</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                  </div>
                  <div className="text-[11px] font-extrabold text-brand-yellow mt-0.5">
                    {slide.deviceBadge}
                  </div>
                  <div className="text-[9px] text-neutral-400 mt-0.5">
                    ₹0 Inspection • Instant UPI Spot Payment
                  </div>
                </div>
              </div>
            </div>

            {/* PREV / NEXT CONTROLS */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900/80 border border-neutral-700 text-white hover:bg-black hover:border-brand-yellow transition-all flex items-center justify-center cursor-pointer shadow-lg z-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900/80 border border-neutral-700 text-white hover:bg-black hover:border-brand-yellow transition-all flex items-center justify-center cursor-pointer shadow-lg z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* DOTS INDICATOR */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {activeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? "w-6 bg-brand-yellow" : "w-1.5 bg-neutral-600 hover:bg-neutral-400"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* OUR SERVICES (With actual product device photos) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>Our Services</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
            </h2>
            <Link
              href="/sell"
              className="text-xs font-bold text-neutral-400 hover:text-brand-yellow transition-colors flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className={`grid grid-cols-2 sm:grid-cols-3 ${isWestBengal ? "lg:grid-cols-6" : "lg:grid-cols-5"} gap-3`}>
            {activeServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={srv.id}
                  href={srv.href}
                  className="p-3.5 sm:p-4 rounded-2xl bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800/80 hover:border-brand-yellow/60 transition-all duration-200 group flex flex-col justify-between hover:-translate-y-0.5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    {srv.image ? (
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-neutral-700/80 shadow-md group-hover:scale-105 group-hover:border-brand-yellow transition-all shrink-0 bg-neutral-950">
                        <Image
                          src={srv.image}
                          alt={srv.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${srv.color} group-hover:scale-105 transition-transform shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    )}
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                      {srv.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-brand-yellow transition-colors leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-[10px] text-neutral-400 mt-0.5 font-medium leading-tight">
                      {srv.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* SEARCH DEVICE BAR */}
        <div id="find-phone" className="pt-2">
          <DeviceSearch />
        </div>

        {/* TRUST SIGNALS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-left pt-1">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/70">
            <Truck className="w-4 h-4 text-brand-yellow shrink-0" />
            <span className="text-xs font-semibold text-neutral-200">Free Doorstep Pickup</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/70">
            <Zap className="w-4 h-4 text-brand-yellow shrink-0" />
            <span className="text-xs font-semibold text-neutral-200">Spot UPI Payment</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/70">
            <ShieldCheck className="w-4 h-4 text-brand-yellow shrink-0" />
            <span className="text-xs font-semibold text-neutral-200">Zero Convenience Fee</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/70">
            <RotateCcw className="w-4 h-4 text-brand-yellow shrink-0" />
            <span className="text-xs font-semibold text-neutral-200">DPDP Certified Wipe</span>
          </div>
        </div>

      </div>
    </section>
  );
}
