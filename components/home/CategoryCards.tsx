"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Smartphone, Laptop, Tablet, ArrowRight, Gamepad2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CategoryCards() {
  const [isWestBengal, setIsWestBengal] = useState(false);

  useEffect(() => {
    const checkLocation = () => {
      if (typeof window !== "undefined") {
        try {
          const locStr = localStorage.getItem("cashall_location");
          if (locStr) {
            const parsed = JSON.parse(locStr);
            const state = (parsed?.state || "").toLowerCase();
            setIsWestBengal(
              state.includes("west bengal") || state.includes("bengal") || state.trim() === "wb"
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

  const categories = [
    {
      id: "mobile",
      title: "Mobile Phone",
      subtitle: "Sell iPhone, Samsung, OnePlus, Pixel & more",
      icon: Smartphone,
      status: "AVAILABLE",
      available: true,
      href: "/sell/mobile",
      btnText: "Sell Mobile",
    },
    {
      id: "laptop",
      title: "Laptop",
      subtitle: "Sell MacBook, Dell, HP, Lenovo, Asus & Acer",
      icon: Laptop,
      status: "AVAILABLE",
      available: true,
      href: "/sell/laptop",
      btnText: "Sell Laptop",
    },
    {
      id: "tablet",
      title: "Tablet / iPad",
      subtitle: "Sell Apple iPad, Galaxy Tab & Lenovo Pad",
      icon: Tablet,
      status: "AVAILABLE",
      available: true,
      href: "/sell/tablet",
      btnText: "Sell Tablet",
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-200 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2">
            Instant Device Valuation
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
            Sell Your Device
          </h2>
          <p className="text-sm text-neutral-600 mt-2 font-normal">
            Select your device category to calculate a guaranteed algorithmic price quote.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 hover:border-brand-yellow/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-6px_rgba(255,212,0,0.22)] transition-all duration-300 group flex flex-col justify-between hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-black group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-brand-black" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-black group-hover:text-black">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-normal">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-black mt-6 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform">
                  <span>{cat.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* PS5 RENTAL FEATURED BANNER - EXCLUSIVE TO WEST BENGAL / KOLKATA */}
        {isWestBengal && (
          <div className="mt-8 rounded-2xl p-6 sm:p-7 bg-gradient-to-r from-neutral-950 via-[#0a1636] to-neutral-950 border border-blue-900/40 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/25 text-[11px] font-bold uppercase tracking-wider">
                <Gamepad2 className="w-3.5 h-3.5 text-brand-yellow" />
                PlayStation 5 Console Rental • Kolkata &amp; WB
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Rent PS5 at Just <span className="text-brand-yellow">₹500 / Day</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                Doorstep delivery, pre-delivery working video proof, optional top game CDs (GTA V, Spider-Man 2, FC 24) at ₹100/day, and pay-and-use on arrival. Extend anytime online!
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-300 pt-1">
                <span className="flex items-center gap-1.5 text-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" /> Min 1 Day to Custom Days
                </span>
                <span className="flex items-center gap-1.5 text-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" /> Pay to Agent on Delivery
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/rent/ps5"
                className="px-6 py-3 rounded-xl bg-brand-yellow text-black font-extrabold text-xs hover:bg-yellow-400 shadow-yellowGlow transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Rent PS 5</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
