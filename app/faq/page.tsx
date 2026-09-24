import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQAccordion } from "@/components/home/FAQAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | CashALL",
  description:
    "Find answers to frequently asked questions about selling old mobile phones, laptops, and renting PS5 consoles on CashALL. Pickup, payment, data safety, and pricing FAQs.",
  alternates: {
    canonical: "https://www.cashall.in/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | CashALL",
    description:
      "Find answers to frequently asked questions about selling old mobile phones, laptops, and renting PS5 consoles on CashALL. Pickup, payment, data safety, and pricing FAQs.",
    url: "https://www.cashall.in/faq",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-black">
      <Header />
      <main className="flex-grow py-8">
        <FAQAccordion />
      </main>
      <Footer />
    </div>
  );
}
