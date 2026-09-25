"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, Banknote, HelpCircle, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("cashall_user");
      setIsLoggedIn(!!storedUser);
    }
  }, []);

  return (
    <footer className="bg-brand-black text-gray-400 border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TRUST BADGES RIBBON */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center text-brand-yellow border border-neutral-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast & Free Pickup</h4>
              <p className="text-[11px] text-gray-400">Express doorstep dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center text-brand-yellow border border-neutral-800">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Instant Payment</h4>
              <p className="text-[11px] text-gray-400">UPI or direct bank transfer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center text-brand-yellow border border-neutral-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Transparent Pricing</h4>
              <p className="text-[11px] text-gray-400">No hidden deductions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center text-brand-yellow border border-neutral-800">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Human Support</h4>
              <p className="text-[11px] text-gray-400">Assistance at every step</p>
            </div>
          </div>
        </div>

        {/* FOOTER LINKS MATRIX */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* BRAND COLUMN */}
          <div className="col-span-2 space-y-4">
            <div className="relative h-10 w-36">
              <Image
                src="/logo.png"
                alt="CashALL Logo"
                width={160}
                height={45}
                className="object-contain object-left h-full w-auto"
              />
            </div>

            {/* SOCIAL MEDIA LINKS DIRECTLY BELOW LOGO */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Follow us on:</span>
              <a
                href="https://www.facebook.com/profile.php?id=61592749535143"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all group"
                title="Facebook"
              >
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/cashall_26/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all group"
                title="Instagram"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCymYHMF8-grP7txUbqIt6sQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all group"
                title="YouTube"
              >
                <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* OFFICIAL EMAIL SUPPORT DIRECTLY BELOW FOLLOW US ON */}
            <div className="pt-3 text-xs text-gray-400 flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-gray-300">Official Email Support:</span>
              <a
                href="mailto:support@cashall.in"
                className="text-brand-yellow font-bold hover:underline"
              >
                support@cashall.in
              </a>
            </div>
          </div>

          {/* SELL */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Sell Devices</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sell/mobile" className="hover:text-brand-yellow transition-colors">
                  Sell Mobile Phone
                </Link>
              </li>
              <li>
                <Link href="/sell/laptop" className="hover:text-brand-yellow transition-colors">
                  Sell Laptop
                </Link>
              </li>
              <li>
                <Link href="/sell/tablet" className="hover:text-brand-yellow transition-colors">
                  Sell Tablet / iPad
                </Link>
              </li>
              <li>
                <Link href="/rent/ps5" className="hover:text-brand-yellow transition-colors text-blue-400 font-semibold">
                  Rent PS5 Console
                </Link>
              </li>
              <li>
                <Link href="/sell-phone-in-kolkata" className="hover:text-brand-yellow transition-colors text-brand-yellow/90 font-semibold">
                  Sell Phone in Kolkata
                </Link>
              </li>
              <li>
                <Link href="/sell-phone-in-howrah" className="hover:text-brand-yellow transition-colors">
                  Sell Phone in Howrah
                </Link>
              </li>
              <li>
                <Link href="/sell-phone-in-gorakhpur" className="hover:text-brand-yellow transition-colors">
                  Sell Phone in Gorakhpur
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about-us" className="hover:text-brand-yellow transition-colors">
                  About CashALL
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-brand-yellow transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-yellow transition-colors">
                  Be Smart, Sell Smart (Blog)
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-brand-yellow transition-colors">
                  Tech News
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-brand-yellow transition-colors">
                  Articles &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/compare/cashall-vs-other-platforms" className="hover:text-brand-yellow transition-colors">
                  CashALL vs Other Platforms
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-brand-yellow transition-colors">
                  Download App
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-yellow transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT & LEGAL */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support &amp; Legal</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/faq" className="hover:text-brand-yellow transition-colors">
                  FAQ
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link href="/account" className="hover:text-brand-yellow transition-colors">
                    Track My Order
                  </Link>
                </li>
              )}
              <li>
                <Link href="/privacy" className="hover:text-brand-yellow transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-brand-yellow transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-yellow transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/pickup-policy" className="hover:text-brand-yellow transition-colors">
                  Doorstep Pickup Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-brand-yellow transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* DEEP DATA CLEANING GUARANTEE & TRUST SEALS */}
        <div className="pt-8 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 text-xs text-neutral-400 space-y-1">
            <p className="font-semibold text-neutral-300">
              CashALL • Operating under Aarna Enterprise | Headquartered in Kolkata, West Bengal, India.
            </p>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Official Email Support: <span className="text-brand-yellow font-bold">support@cashall.in</span> • Customer Helpline: <span className="text-white font-bold">+91 7604092333</span>. All brand names, logos, and trademarks (Apple, Samsung, OnePlus, Sony PlayStation, etc.) are the property of their respective owners and used solely for identification purposes.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-brand-yellow" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-black text-white flex items-center gap-1.5">
                <span>Deep Data Cleaning Guarantee</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                All purchased devices undergo certified NIST 800-88 sanitization, guaranteeing irreversible destruction of all private data.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="font-medium text-gray-300">© 2026 Aarna Enterprise (CashALL). All Rights Reserved</p>
          <p className="text-[11px] text-gray-400">Kolkata • Howrah • Salt Lake • New Town • Pan-India Logistics</p>
        </div>

      </div>
    </footer>
  );
}
