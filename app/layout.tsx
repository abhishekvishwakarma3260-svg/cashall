import type { Metadata } from "next";
import "./globals.css";
import { SupportWidget } from "@/components/common/SupportWidget";
import Script from "next/script";
import { Suspense } from "react";
import { MetaPageViewTracker } from "@/components/analytics/MetaPageViewTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cashall.in"),

  title: {
    default: "CashALL | Sell Old Phone, Used Laptop & Tablet for Instant Cash",
    template: "%s | CashALL",
  },

  description:
    "Sell your old mobile phones, used laptops and tablets online at CashALL for the highest price. Free doorstep evaluation, instant UPI/bank cash payout, and 100% safe certified data wipe.",

  keywords: [
    "CashALL",
    "CashALL India",
    "cashify",
    "cashify alternative",
    "cashify vs cashall",
    "better than cashify",
    "cashkr",
    "mobisell",
    "cashon",
    "cashkaro",
    "sell old phone online",
    "sell used phone online",
    "sell old mobile for cash",
    "sell old phone instant cash",
    "instant cash for phone",
    "best place to sell old phone",
    "sell old laptop online",
    "sell used laptop for cash",
    "sell old tablet online",
    "sell used iPad online",
    "sell old iPhone online",
    "sell used iPhone for cash",
    "sell old Samsung phone",
    "sell old OnePlus phone",
    "sell old Xiaomi phone",
    "sell old Vivo phone",
    "sell old Oppo phone",
    "sell old Realme phone",
    "sell used MacBook online",
    "sell old Dell laptop",
    "sell old HP laptop",
    "sell old Lenovo laptop",
    "ps5 rent",
    "rent ps5",
    "rent ps5 online",
    "playstation 5 rent",
    "ps5 rental Kolkata",
    "sell ps5",
    "buy used ps5",
    "doorstep old phone pickup",
    "sell old phone Kolkata",
    "sell used mobile in Kolkata",
    "sell old laptop Kolkata",
    "sell old phone West Bengal",
    "sell phone with broken screen",
    "sell phone without bill or box",
    "instant cash for old phones",
    "cashify alternative best price",
    "old device resale India"
  ],

  authors: [
    {
      name: "CashALL",
    },
  ],

  creator: "CashALL",
  publisher: "CashALL",

  alternates: {
    canonical: "https://www.cashall.in/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.cashall.in/",
    siteName: "CashALL",
    title: "CashALL | Sell Old Phone, Used Laptop & Tablet for Instant Cash",
    description:
      "Sell your old mobile phones, used laptops and tablets online at CashALL for the highest price. Free doorstep pickup, instant bank transfer, and certified data wiping.",
    images: [
      {
        url: "/photos/CashALL_logo.png",
        width: 1200,
        height: 630,
        alt: "CashALL - Sell Old Devices for Instant Cash",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CashALL | Sell Old Phone, Used Laptop & Tablet for Instant Cash",
    description:
      "Sell your old mobile phones, used laptops and tablets online at CashALL. Best price, doorstep evaluation, and instant UPI payout.",
    images: ["/photos/CashALL_logo.png"],
  },

  icons: {
    icon: [
      { url: "/photos/CashALL_favicon.png", sizes: "1024x1024", type: "image/png" },
      { url: "/favicon.png", sizes: "1024x1024", type: "image/png" },
    ],
    shortcut: "/photos/CashALL_favicon.png",
    apple: "/photos/CashALL_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-black min-h-screen font-sans antialiased">
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
        >
          {`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', '1037780558881291');
      fbq('track', 'PageView');
    `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1037780558881291&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Suspense fallback={null}>
          <MetaPageViewTracker />
        </Suspense>
        {children}
        <SupportWidget />
      </body>
    </html>
  );
}
