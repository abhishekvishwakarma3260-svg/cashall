"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { INITIAL_BRANDS, BrandData } from "@/lib/store";
import { ArrowRight } from "lucide-react";
import { BrandIcon } from "@/components/common/BrandIcon";

export function PopularBrands() {
  const [brands, setBrands] = useState<BrandData[]>([]);

  useEffect(() => {
    async function loadBrands() {
      try {
        const res = await fetch("/api/v1/catalog");
        const json = await res.json();
        if (json.success && Array.isArray(json.data?.brands) && json.data.brands.length > 0) {
          const apiBrands = json.data.brands;
          setBrands(() => {
            const mergedMap = new Map<string, BrandData>();
            INITIAL_BRANDS.forEach((b) => mergedMap.set(b.slug || b.name.toLowerCase(), b));
            apiBrands.forEach((b: BrandData) => mergedMap.set(b.slug || b.name.toLowerCase(), b));
            return Array.from(mergedMap.values());
          });
        } else {
          setBrands(INITIAL_BRANDS);
        }
      } catch (err) {
        setBrands(INITIAL_BRANDS);
      }
    }
    loadBrands();
  }, []);

  const displayBrands = brands.length > 0 ? brands : INITIAL_BRANDS;
  const mobileBrands = displayBrands
    .filter((b) => b.category === "MOBILE" || b.category === "BOTH")
    .slice(0, 6);

  return (
    <section className="py-14 sm:py-16 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2">
              Smartphone Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
              Popular Phone Brands
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
              Select your smartphone manufacturer to view available models and live quotes.
            </p>
          </div>

          <Link
            href="/sell/mobile"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-amber-600 group transition-colors"
          >
            <span>View All Brands</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-900 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4">
          {mobileBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/sell/mobile/${brand.slug}`}
              className="bg-[#FAFAF9] rounded-2xl p-5 border border-neutral-200/70 hover:border-brand-yellow/80 hover:bg-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_25px_-5px_rgba(255,212,0,0.2)] hover:-translate-y-0.5 transition-all duration-200 text-center group flex flex-col items-center justify-center space-y-2.5"
            >
              <div className="transition-transform group-hover:scale-105">
                <BrandIcon name={brand.name} logoUrl={brand.logoUrl} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-black group-hover:text-black">
                  {brand.name}
                </h3>
                <p className="text-[10px] text-neutral-400 font-medium mt-0.5">
                  Sell {brand.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
