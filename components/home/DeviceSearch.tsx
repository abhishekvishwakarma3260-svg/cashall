"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Smartphone, Laptop, Tablet, Sparkles, Calculator, MapPin } from "lucide-react";
import { INITIAL_MODELS, INITIAL_BRANDS } from "@/lib/store";
import { POPULAR_SEARCH_CHIPS } from "@/lib/data/keywords";
import { trackMetaStandardEvent } from "@/lib/analytics/meta";

export function DeviceSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  // Detect semantic intent from high-volume keyword queries
  const intentMatch = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();

    // City corridor intent
    if (q.includes("kolkata")) {
      return {
        type: "city",
        title: "Sell Old Phone in Kolkata",
        subtitle: "Express 2–4 Hr Doorstep Pickup across Kolkata & Salt Lake",
        url: "/sell-phone-in-kolkata",
      };
    }
    if (q.includes("ranchi")) {
      return {
        type: "city",
        title: "Sell Old Phone in Ranchi (Jharkhand)",
        subtitle: "Free 24-Hr Doorstep Pickup across Ranchi Hub",
        url: "/sell-used-phone",
      };
    }
    if (q.includes("patna")) {
      return {
        type: "city",
        title: "Sell Old Phone in Patna (Bihar)",
        subtitle: "Free Doorstep Pickup & Instant UPI Payout in Patna",
        url: "/sell-used-phone",
      };
    }
    if (q.includes("gorakhpur")) {
      return {
        type: "city",
        title: "Sell Old Phone in Gorakhpur (UP)",
        subtitle: "Doorstep Buyback Service across Gorakhpur",
        url: "/sell-phone-in-gorakhpur",
      };
    }
    if (q.includes("howrah")) {
      return {
        type: "city",
        title: "Sell Old Phone in Howrah",
        subtitle: "Express Doorstep Pickup across Howrah & Liluah",
        url: "/sell-phone-in-howrah",
      };
    }

    // Price calculator / generic buyback / second-hand intent
    const isPriceCalc =
      q.includes("price") ||
      q.includes("calculator") ||
      q.includes("valuation") ||
      q.includes("worth") ||
      q.includes("rate");

    const isGenericBuyback =
      q.includes("sell old phone") ||
      q.includes("second hand mobile") ||
      q.includes("2nd hand") ||
      q.includes("cash for phone") ||
      q.includes("sell phone") ||
      q.includes("used mobile") ||
      q.includes("sell my phone") ||
      q.includes("refurbished") ||
      q.includes("chasify") ||
      q.includes("cashify") ||
      q.includes("quick mobile");

    if (isPriceCalc || isGenericBuyback) {
      return {
        type: "calculator",
        title: "Used Phone Price Calculator & Instant Valuation",
        subtitle: "Get guaranteed quote in 60 seconds with ₹0 pickup fee",
        url: "/sell-used-phone",
      };
    }

    return null;
  }, [query]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    // Exact model & brand matching
    let matches = INITIAL_MODELS.filter((m) => {
      const brand = INITIAL_BRANDS.find((b) => b.id === m.brandId);
      const fullName = `${brand?.name || ""} ${m.name}`.toLowerCase();
      return fullName.includes(q) || m.name.toLowerCase().includes(q);
    });

    // If query matches a generic category, return curated flagship models
    if (matches.length === 0) {
      if (q.includes("iphone") || q.includes("apple")) {
        matches = INITIAL_MODELS.filter((m) => {
          const brand = INITIAL_BRANDS.find((b) => b.id === m.brandId);
          return brand?.slug === "apple";
        });
      } else if (q.includes("samsung") || q.includes("galaxy")) {
        matches = INITIAL_MODELS.filter((m) => {
          const brand = INITIAL_BRANDS.find((b) => b.id === m.brandId);
          return brand?.slug === "samsung";
        });
      } else if (q.includes("laptop") || q.includes("macbook")) {
        matches = INITIAL_MODELS.filter((m) => m.category === "LAPTOP");
      } else if (q.includes("tablet") || q.includes("ipad")) {
        matches = INITIAL_MODELS.filter((m) => m.category === "TABLET");
      } else if (
        q.includes("sell") ||
        q.includes("phone") ||
        q.includes("mobile") ||
        q.includes("second hand") ||
        q.includes("price")
      ) {
        // Return top in-demand models for broad searches
        matches = INITIAL_MODELS.filter((m) =>
          m.name.includes("16") ||
          m.name.includes("15") ||
          m.name.includes("S24") ||
          m.name.includes("S23") ||
          m.name.includes("OnePlus")
        );
      }
    }

    return matches.slice(0, 6);
  }, [query]);

  return (
    <div className="w-full max-w-3xl mx-auto relative z-30">
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-6 h-6 absolute left-5 text-brand-black/60 pointer-events-none z-10" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search brand, model, or 'second hand mobile price' (e.g. iPhone 16, S24 Ultra, MacBook)"
            className="w-full pl-14 pr-12 py-4 text-base md:text-lg font-medium text-brand-black bg-white rounded-2xl border-2 border-brand-border shadow-premium focus:outline-none focus:border-brand-yellow transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 text-xs font-bold text-gray-400 hover:text-brand-black bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        {/* AUTOCOMPLETE DROPDOWN */}
        {focused && query.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden z-50 animate-fadeIn">
            {/* INTENT-DRIVEN QUICK ACTION CARD */}
            {intentMatch && (
              <Link
                href={intentMatch.url}
                className="flex items-center justify-between px-5 py-3.5 bg-brand-yellow/15 hover:bg-brand-yellow/25 border-b border-brand-yellow/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-black text-brand-yellow flex items-center justify-center font-bold">
                    {intentMatch.type === "city" ? (
                      <MapPin className="w-5 h-5" />
                    ) : (
                      <Calculator className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-black text-brand-black group-hover:text-black">
                      {intentMatch.title}
                    </div>
                    <div className="text-xs text-brand-muted font-medium">
                      {intentMatch.subtitle}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-extrabold text-brand-black bg-brand-yellow px-3 py-1.5 rounded-lg group-hover:scale-105 transition-transform">
                  <span>Calculate Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            )}

            {filteredResults.length > 0 ? (
              <div className="divide-y divide-gray-100">
                <div className="px-4 py-2 bg-brand-bg text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Select Your Exact Device Model
                </div>
                {filteredResults.map((item) => {
                  const brand = INITIAL_BRANDS.find((b) => b.id === item.brandId);
                  const targetUrl =
                    item.category === "LAPTOP"
                      ? `/sell/laptop/${brand?.slug}/${item.slug}`
                      : item.category === "TABLET"
                      ? `/sell/tablet/${brand?.slug}/${item.slug}`
                      : `/sell/mobile/${brand?.slug}/${item.slug}`;

                  return (
                    <Link
                      key={item.id}
                      href={targetUrl}
                      onClick={() => {
                        trackMetaStandardEvent(
                          "Search",
                          {
                            search_string: query,
                            content_category: item.category?.toLowerCase() || "device",
                            content_name: item.name,
                          },
                          { eventId: `search_${query.trim().toLowerCase()}` }
                        );
                      }}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-brand-yellow/10 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center p-1 border border-gray-100 group-hover:border-brand-yellow/50">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="object-contain max-h-8 max-w-8"
                            />
                          ) : item.category === "LAPTOP" ? (
                            <Laptop className="w-5 h-5 text-gray-400" />
                          ) : item.category === "TABLET" ? (
                            <Tablet className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Smartphone className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-brand-black group-hover:text-black">
                            {item.name.toLowerCase().startsWith((brand?.name || "").toLowerCase())
                              ? item.name
                              : `${brand?.name} ${item.name}`}
                          </div>
                          <div className="text-[10px] text-gray-400 font-semibold uppercase">
                            {item.category || "Device"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-extrabold text-brand-black group-hover:translate-x-1 transition-transform">
                        <span>Get Price</span>
                        <ArrowRight className="w-3.5 h-3.5 text-brand-black" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : !intentMatch ? (
              <div className="p-8 text-center">
                <Smartphone className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-brand-black">No devices found matching &quot;{query}&quot;</p>
                <p className="text-xs text-brand-muted mt-1">
                  Try searching for brand names like &quot;Apple&quot;, &quot;Samsung&quot; or &quot;sell old phone&quot;.
                </p>
                <Link
                  href="/sell-used-phone"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-black bg-brand-yellow px-4 py-2 rounded-xl mt-4 hover:bg-brand-yellowHover transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Price Calculator</span>
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </div>

    </div>
  );
}
