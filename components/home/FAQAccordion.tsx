"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { INITIAL_FAQS } from "@/lib/store";

export function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const topFaqs = INITIAL_FAQS.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-normal leading-relaxed">
            Everything you need to know about selling your phone on CashALL.
          </p>
        </div>

        <div className="space-y-3">
          {topFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FAFAF9] rounded-2xl border border-neutral-200/80 overflow-hidden transition-all duration-200 hover:border-brand-yellow/60"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-brand-black hover:text-black focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 pt-3 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View All Frequently Asked Questions</span>
            <ArrowRight className="w-4 h-4 text-brand-yellow" />
          </Link>
        </div>

      </div>
    </section>
  );
}
