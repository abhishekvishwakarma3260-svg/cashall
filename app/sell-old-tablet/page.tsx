"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { INITIAL_BRANDS, INITIAL_MODELS, BrandData } from "@/lib/store";
import { BrandIcon } from "@/components/common/BrandIcon";
import { AiVerificationBar } from "@/components/common/AiVerificationBar";
import { CUSTOMER_REVIEWS } from "@/lib/data/reviewsData";
import {
  Search,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  ArrowRight,
  Tablet,
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Check,
  ChevronDown
} from "lucide-react";

// Top Selling Tablet Models to highlight (Cashify & CashKR keywords)
const TOP_SELLING_TABLETS = [
  {
    name: "Apple iPad Pro 13 (M4 Chip)",
    brandSlug: "apple",
    modelSlug: "ipad-pro-13-inch-m4-2024",
    upToPrice: "1,18,000",
    badge: "Top Seller",
    imageUrl: "https://s3ng.cashify.in/cashify/product/img/xhdpi/a8b9e59d-648b.jpg",
  },
  {
    name: "Apple iPad Air 11 (M2 Chip)",
    brandSlug: "apple",
    modelSlug: "ipad-air-11-inch-m2-2024",
    upToPrice: "48,500",
    badge: "Most Popular",
    imageUrl: "https://s3ng.cashify.in/cashify/product/img/xhdpi/a8b9e59d-648b.jpg",
  },
  {
    name: "Apple iPad 10th Gen (10.9-inch)",
    brandSlug: "apple",
    modelSlug: "ipad-10th-gen-10-9-inch-wi-fi-cellular",
    upToPrice: "28,000",
    badge: "Trending",
    imageUrl: "https://s3ng.cashify.in/cashify/product/img/xhdpi/51a37a93-5ba9.jpg",
  },
  {
    name: "Samsung Galaxy Tab S9 Ultra 5G",
    brandSlug: "samsung",
    modelSlug: "samsung-galaxy-tab-s9-ultra-5g",
    upToPrice: "68,000",
    badge: "Flagship Choice",
    imageUrl: "https://s3ng.cashify.in/cashify/product/img/xhdpi/532d7a4a-3ad8.jpg?w=800",
  },
  {
    name: "Xiaomi Pad 6 (Snapdragon 870)",
    brandSlug: "xiaomi",
    modelSlug: "xiaomi-pad-6",
    upToPrice: "18,500",
    badge: "Best Value",
    imageUrl: "https://s3ng.cashify.in/cashify/product/img/xhdpi/532d7a4a-3ad8.jpg?w=800",
  },
  {
    name: "OnePlus Pad 2 (Snapdragon 8 Gen 3)",
    brandSlug: "oneplus",
    modelSlug: "oneplus-pad-2",
    upToPrice: "34,000",
    badge: "High Demand",
    imageUrl: "https://s3ng.cashify.in/cashify/product/img/xhdpi/532d7a4a-3ad8.jpg?w=800",
  },
  {
    name: "Apple iPad mini 6th Gen",
    brandSlug: "apple",
    modelSlug: "ipad-mini-6th-gen-wi-fi-cellular",
    upToPrice: "32,500",
    badge: "Compact Pick",
    imageUrl: "https://s3ng.cashify.in/cashify/product/img/xhdpi/51a37a93-5ba9.jpg",
  },
  {
    name: "Lenovo Tab P12 Pro",
    brandSlug: "lenovo",
    modelSlug: "lenovo-tab-p12-pro",
    upToPrice: "24,000",
    badge: "Productivity",
    imageUrl: "https://s3ng.cashify.in/cashify/product/img/xhdpi/532d7a4a-3ad8.jpg?w=800",
  },
];

// Curated Top Tablet Brand Quick Bar
const QUICK_TABLET_BRAND_SLUGS = ["apple", "samsung", "lenovo", "xiaomi", "oneplus", "realme"];

export default function SellOldTabletPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState<BrandData[]>(INITIAL_BRANDS);
  const [modelSearch, setModelSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadBrands() {
      try {
        const res = await fetch("/api/v1/catalog?category=TABLET");
        const json = await res.json();
        if (json.success && Array.isArray(json.data?.brands) && json.data.brands.length > 0) {
          const apiBrands = json.data.brands;
          setBrands((prev) => {
            const mergedMap = new Map<string, BrandData>();
            prev.forEach((b) => mergedMap.set(b.slug || b.name.toLowerCase(), b));
            apiBrands.forEach((b: BrandData) => mergedMap.set(b.slug || b.name.toLowerCase(), b));
            return Array.from(mergedMap.values());
          });
        }
      } catch (e) {
        console.error("Error loading tablet brands", e);
      }
    }
    loadBrands();
  }, []);

  const tabletBrands = useMemo(() => {
    return brands.filter((b) =>
      INITIAL_MODELS.some(
        (m) =>
          (m.brandId === b.id || m.brandSlug?.toLowerCase() === b.slug?.toLowerCase()) &&
          (m.category === "TABLET" || m.id.startsWith("m-tablet-") || m.slug.includes("ipad") || m.slug.includes("tab"))
      ) || ["apple", "samsung", "lenovo", "xiaomi", "oneplus", "realme", "honor", "motorola"].includes(b.slug.toLowerCase())
    );
  }, [brands]);

  const quickBrands = useMemo(() => {
    return QUICK_TABLET_BRAND_SLUGS.map((slug) =>
      tabletBrands.find((b) => b.slug.toLowerCase() === slug)
    ).filter(Boolean) as BrandData[];
  }, [tabletBrands]);

  const filteredBrands = useMemo(() => {
    if (!search.trim()) return tabletBrands;
    return tabletBrands.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [tabletBrands, search]);

  // Global search autocomplete for tablets
  const searchedModels = useMemo(() => {
    if (!modelSearch.trim() || modelSearch.trim().length < 2) return [];
    const q = modelSearch.toLowerCase().trim();
    return INITIAL_MODELS.filter(
      (m) =>
        (m.category === "TABLET" || m.id.startsWith("m-tablet-") || m.slug.includes("ipad") || m.slug.includes("tab")) &&
        (m.name.toLowerCase().includes(q) || (m.brandSlug && m.brandSlug.toLowerCase().includes(q)))
    ).slice(0, 6);
  }, [modelSearch]);

  const scrollToBrands = () => {
    const el = document.getElementById("all-tablet-brands-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tabletReviews = useMemo(() => {
    return CUSTOMER_REVIEWS.filter((r) => r.deviceCategory === "TABLET" || r.deviceSold.toLowerCase().includes("ipad") || r.deviceSold.toLowerCase().includes("tab")).slice(0, 8);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-black">
      <Header />

      <main className="flex-grow">
        {/* ========================================================= */}
        {/* HERO SECTION: ALIGNED WITH CASHKR & CASHIFY STRUCTURE     */}
        {/* ========================================================= */}
        <section className="relative bg-gradient-to-b from-white via-amber-50/20 to-brand-bg pt-6 pb-12 border-b border-neutral-200/80 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* BREADCRUMB */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-6">
              <Link href="/" className="hover:text-brand-black transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-brand-black font-bold">Sell Old Tablet</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: HERO CONTENT & BRAND QUICK SELECTOR */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* TRUST PILL */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Highest Market Resale Value • ₹0 Doorstep Inspection • Instant Cash</span>
                </div>

                {/* H1 HEADLINE (Competitor style: CashKR & Cashify keywords) */}
                <div>
                  <h1 className="text-3xl sm:text-5xl font-black text-brand-black tracking-tight leading-[1.15]">
                    Sell Old{" "}
                    <span className="text-emerald-600 bg-clip-text">
                      Tablet Online
                    </span>{" "}
                    for Instant Cash
                  </h1>
                  <p className="text-sm sm:text-base text-neutral-600 mt-3 font-normal leading-relaxed max-w-xl">
                    Get an instant locked quote for your Apple iPad, Samsung Galaxy Tab, or Android tablet in 60 seconds. Free doorstep pickup, on-site touchscreen check, and instant UPI payout before handover.
                  </p>
                </div>

                {/* VALUE PROPOSITION BADGES */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1 pb-1">
                  <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-neutral-900 leading-tight">100% Safe</div>
                      <div className="text-[10px] text-neutral-500 hidden sm:block">Complete Factory Reset</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-neutral-900 leading-tight">Best Value</div>
                      <div className="text-[10px] text-neutral-500 hidden sm:block">Up to 5% Higher</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-neutral-900 leading-tight">Fast Payout</div>
                      <div className="text-[10px] text-neutral-500 hidden sm:block">Instant UPI Transfer</div>
                    </div>
                  </div>
                </div>

                {/* SEARCH INPUT WITH AUTOCOMPLETE */}
                <div className="relative pt-2">
                  <div className="relative flex items-center">
                    <Search className="w-5 h-5 absolute left-4 text-neutral-400 pointer-events-none" />
                    <input
                      type="text"
                      value={modelSearch}
                      onChange={(e) => setModelSearch(e.target.value)}
                      placeholder="Search your tablet (e.g. iPad Pro M4, iPad Air, Galaxy Tab S9)..."
                      className="w-full pl-12 pr-4 py-3.5 text-sm font-medium bg-white rounded-2xl border-2 border-neutral-200 focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20 shadow-sm transition-all"
                    />
                  </div>

                  {/* AUTOCOMPLETE DROPDOWN */}
                  {searchedModels.length > 0 && (
                    <div className="absolute z-30 left-0 right-0 mt-2 bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden divide-y divide-neutral-100 animate-in fade-in slide-in-from-top-2 duration-150">
                      {searchedModels.map((m) => (
                        <Link
                          key={m.id}
                          href={`/sell-old-tablet/${m.brandSlug || 'tablet'}/${m.slug}`}
                          className="flex items-center justify-between px-4 py-3 hover:bg-amber-50/60 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-500">
                              <Tablet className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="text-sm font-bold text-neutral-900 group-hover:text-amber-800">
                              {m.name}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Check Price <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* SELECT TABLET BRAND: QUICK ROW (CASHKR & CASHIFY PATTERN) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs sm:text-sm font-black text-neutral-800 tracking-wide uppercase">
                      Select Tablet Brand
                    </h2>
                    <Link
                      href="/sell-old-tablet/brands"
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1"
                    >
                      View all brands ({tabletBrands.length}) <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
                    {quickBrands.slice(0, 5).map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/sell-old-tablet/${brand.slug}`}
                        className="bg-white rounded-2xl p-3 border border-neutral-200/80 hover:border-brand-yellow hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center group hover:-translate-y-0.5"
                      >
                        <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                          <BrandIcon name={brand.name} logoUrl={brand.logoUrl} fallbackType="TABLET" className="w-10 h-10" />
                        </div>
                        <span className="text-xs font-bold text-neutral-800 mt-1.5 group-hover:text-black">
                          {brand.name}
                        </span>
                      </Link>
                    ))}

                    {/* "MORE (ALL BRANDS)" CARD LIKE CASHKR / CASHIFY */}
                    <Link
                      href="/sell-old-tablet/brands"
                      className="bg-amber-50/80 hover:bg-amber-100/90 rounded-2xl p-3 border border-amber-300/80 hover:border-amber-400 transition-all duration-200 flex flex-col items-center justify-center text-center group hover:-translate-y-0.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-200/80 flex items-center justify-center text-amber-900 font-extrabold text-sm group-hover:scale-110 transition-transform">
                        More
                      </div>
                      <span className="text-xs font-black text-amber-900 mt-1.5">
                        All Brands &rarr;
                      </span>
                    </Link>
                  </div>
                </div>

                {/* BIG START SELLING BUTTON */}
                <div className="pt-2">
                  <button
                    onClick={scrollToBrands}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all duration-200 active:scale-[0.99]"
                  >
                    <span>Start Selling Tablet</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: HERO TABLET SHOWCASE */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm sm:max-w-md">
                  <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 p-6 sm:p-8 text-white shadow-2xl border border-neutral-700/60 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                          Live Tablet Recommerce
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>Pickup in 2-4 Hours</span>
                        </div>
                      </div>

                      <div className="relative h-44 sm:h-52 w-full flex items-center justify-center">
                        <Image
                          src="https://s3ng.cashify.in/cashify/product/img/xhdpi/a8b9e59d-648b.jpg"
                          alt="Sell Old Tablet Online on CashALL"
                          width={300}
                          height={200}
                          className="object-contain max-h-full drop-shadow-2xl"
                          priority
                        />
                      </div>

                      <div className="space-y-2 pt-2 border-t border-neutral-700/60">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-neutral-400 font-medium">Apple iPad Pro 13 (M4)</span>
                          <span className="text-lg font-black text-emerald-400">Up to ₹1,18,000</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-neutral-400 font-medium">Samsung Galaxy Tab S9 Ultra</span>
                          <span className="text-lg font-black text-amber-400">Up to ₹68,000</span>
                        </div>
                      </div>

                      <Link
                        href="/sell-old-tablet/brands"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-sm transition-all shadow-md active:scale-[0.99]"
                      >
                        <span>Check Your Tablet Value</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* AI VERIFICATION SYSTEM BAR */}
        <AiVerificationBar />

        {/* ========================================================= */}
        {/* TOP SELLING TABLETS SECTION (ALIGNED WITH COMPETITOR)     */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-white border-b border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>High Resale Demand</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight">
                  Top Selling Tablets &amp; iPads
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                  Instant locked payouts for trending Apple iPads and Android tablets this week in Kolkata, Howrah, Patna &amp; Across India.
                </p>
              </div>

              <Link
                href="/sell-old-tablet/brands"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>View all models</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {TOP_SELLING_TABLETS.map((tablet, idx) => (
                <Link
                  key={idx}
                  href={`/sell-old-tablet/${tablet.brandSlug}/${tablet.modelSlug}`}
                  className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 hover:border-emerald-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                >
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider">
                    {tablet.badge}
                  </span>

                  <div className="relative w-full h-36 sm:h-40 my-3 flex items-center justify-center">
                    <Image
                      src={tablet.imageUrl}
                      alt={`Sell ${tablet.name} online for cash`}
                      width={180}
                      height={140}
                      className="object-contain max-h-full group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {tablet.name}
                    </h3>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-[11px] text-neutral-500 font-medium">Get up to</span>
                      <span className="text-sm sm:text-base font-black text-neutral-900">
                        ₹{tablet.upToPrice}
                      </span>
                    </div>

                    <div className="w-full mt-2 py-2 rounded-xl bg-neutral-50 group-hover:bg-emerald-50 text-neutral-700 group-hover:text-emerald-700 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1">
                      <span>Sell Now</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ALL TABLET BRANDS DIRECTORY SECTION                       */}
        {/* ========================================================= */}
        <section id="all-tablet-brands-section" className="py-12 sm:py-16 bg-brand-bg border-b border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight">
                Select Your Tablet Brand
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-medium">
                CashALL evaluates display condition, digitizer touch sensitivity, battery health, Wi-Fi / LTE connectivity, Apple Pencil or S-Pen accessories.
              </p>

              {/* SEARCH FILTER FOR BRANDS */}
              <div className="max-w-md mx-auto mt-6 relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter tablet brand (Apple, Samsung, Lenovo, Xiaomi)..."
                  className="w-full pl-11 pr-4 py-3 text-sm font-medium bg-white rounded-2xl border border-neutral-200 focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20 shadow-xs transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {filteredBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/sell-old-tablet/${brand.slug}`}
                  className="bg-white rounded-2xl p-5 border border-neutral-200/80 hover:border-brand-yellow hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-center group hover:-translate-y-0.5"
                >
                  <div className="w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-110">
                    <BrandIcon name={brand.name} logoUrl={brand.logoUrl} fallbackType="TABLET" className="w-14 h-14" />
                  </div>
                  <span className="text-sm font-bold text-neutral-900 mt-3 group-hover:text-black">
                    {brand.name}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium mt-0.5 flex items-center gap-1 group-hover:text-amber-700">
                    View Models <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/sell-old-tablet/brands"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-800 font-bold text-xs shadow-xs hover:shadow-sm transition-all"
              >
                <span>View Full Tablet Brands Directory</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* HOW TO SELL TABLET ONLINE ON CASHALL (3 SIMPLE STEPS)     */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-white border-b border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Effortless Tablet Buyback
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight mt-3">
                How to Sell Your Tablet in 3 Easy Steps
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-medium">
                Safe, transparent, and direct recommerce without classified ads or dealer discounts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200/70 relative">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-black text-lg flex items-center justify-center mb-5 shadow-md shadow-emerald-500/20">
                  1
                </div>
                <h3 className="text-lg font-black text-neutral-900 mb-2">
                  Select Model &amp; Storage
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Pick your Apple iPad or Android tablet model. Answer simple questions regarding screen scratches, touch responsiveness, and included stylus or original charger.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200/70 relative">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-neutral-950 font-black text-lg flex items-center justify-center mb-5 shadow-md shadow-amber-500/20">
                  2
                </div>
                <h3 className="text-lg font-black text-neutral-900 mb-2">
                  Free Doorstep Inspection Slot
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Choose a convenient pickup date and time window. Our certified field technician visits your address for an on-site hardware check at zero pickup cost.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200/70 relative">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center mb-5 shadow-md shadow-blue-600/20">
                  3
                </div>
                <h3 className="text-lg font-black text-neutral-900 mb-2">
                  Spot Payment Handover
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  We verify iCloud or Google account sign-out and device reset. The agreed amount is credited immediately to your UPI or bank account before the technician departs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TABLET FAQS ACCORDION (AEO & GEO SCHEMA READY)            */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 bg-brand-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-medium">
                Everything you need to know about selling old tablets and iPads on CashALL.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "What should I do before handing over my iPad or tablet?",
                  a: "Sign out of your Apple ID / iCloud or Google Account, turn off 'Find My iPad', and perform a factory reset. Make sure the battery has at least 20% charge so our technician can verify display and hardware functions during doorstep inspection."
                },
                {
                  q: "Can I sell a tablet with a cracked glass or non-working display?",
                  a: "Yes. CashALL buys tablets with broken screens, dead pixels, non-responsive touch, or faulty charging ports. We provide competitive salvage valuation based on usable internal components."
                },
                {
                  q: "Do I get extra money for Apple Pencil or original keyboard cover?",
                  a: "Yes! If you provide working authentic accessories like an Apple Pencil, Samsung S-Pen, Magic Keyboard, or original high-wattage power adapter, an accessory bonus is added to your final payout."
                },
                {
                  q: "How soon do I get paid after doorstep inspection?",
                  a: "Immediately. Our technician tests the device in front of you (takes 5 to 10 minutes) and initiates the bank transfer via UPI or IMPS. You receive the payment confirmation SMS before the technician leaves your doorstep."
                },
                {
                  q: "Which tablet brands does CashALL accept?",
                  a: "CashALL buys tablets from Apple (iPad, iPad mini, iPad Air, iPad Pro across all generations), Samsung (Galaxy Tab S series, Tab A series), Lenovo, Xiaomi (Pad 5/6), OnePlus, Realme, and Honor."
                }
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-neutral-900 hover:text-emerald-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                        openFaq === idx ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed border-t border-neutral-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
