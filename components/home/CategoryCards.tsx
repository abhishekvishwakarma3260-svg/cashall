import React from "react";
import Link from "next/link";
import { Smartphone, Laptop, Tablet, ArrowRight, Gamepad2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CategoryCards() {
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
    <section className="py-16 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black">
            Sell Your Device
          </h2>
          <p className="text-sm text-brand-muted mt-2">
            Select your device category to calculate an instant valuation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="bg-white rounded-3xl p-8 border-2 border-brand-yellow/60 hover:border-brand-yellow shadow-premium hover:shadow-yellowGlow transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-yellow/20 flex items-center justify-center text-brand-black group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-brand-black" />
                    </div>
                    <Badge variant="yellow">Active</Badge>
                  </div>
                  <h3 className="text-xl font-extrabold text-brand-black group-hover:text-black">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1.5 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-black text-brand-black mt-8 group-hover:translate-x-1 transition-transform">
                  <span>{cat.btnText}</span>
                  <ArrowRight className="w-4 h-4 text-brand-black" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* PS5 RENTAL FEATURED BANNER */}
        <div className="mt-10 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#070e24] via-[#0c1b40] to-neutral-950 border-2 border-blue-600/40 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black uppercase">
              <Gamepad2 className="w-3.5 h-3.5 text-brand-yellow" />
              New Service: PlayStation 5 Rental
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Rent PS5 at Just <span className="text-brand-yellow">₹500 / Day</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Doorstep delivery, pre-delivery working video proof, optional top game CDs at ₹100/day, and pay-and-use on arrival. Extend anytime online!
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-300">
              <span className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-brand-yellow" /> Min 1 Day to Custom Days
              </span>
              <span className="flex items-center gap-1.5 text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-brand-yellow" /> Pay to Agent on Delivery
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/rent/ps5"
              className="px-8 py-4 rounded-2xl bg-brand-yellow text-black font-black text-sm hover:bg-yellow-400 shadow-yellowGlow transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>Book PS5 Rental</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
