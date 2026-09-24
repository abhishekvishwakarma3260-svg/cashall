import type { Metadata } from "next";
import { INITIAL_MODELS } from "@/lib/store";

export async function generateMetadata({
  params,
}: {
  params: { brand: string; model: string };
}): Promise<Metadata> {
  const brandSlug = params.brand.toLowerCase();
  const modelSlug = params.model.toLowerCase();

  const foundModel = INITIAL_MODELS.find(
    (m) =>
      m.slug.toLowerCase() === modelSlug ||
      m.slug.toLowerCase() === `${brandSlug}-${modelSlug}` ||
      m.slug.toLowerCase().replace(`${brandSlug}-`, "") === modelSlug
  );

  const modelName =
    foundModel?.name ||
    modelSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const title = `Sell Old ${modelName} Online | Best Resale Price & Instant Cash`;
  const description = `Sell your used ${modelName} online for the highest cash payout on CashALL. Free doorstep evaluation, zero hidden deductions, and instant UPI bank transfer.`;

  return {
    title,
    description,
    keywords: [
      `sell ${modelName}`,
      `sell old ${modelName}`,
      `sell used ${modelName} for cash`,
      `best price for ${modelName}`,
      `${modelName} resale value`,
      `doorstep ${modelName} selling`,
      `sell ${modelName} online Kolkata`
    ],
    alternates: {
      canonical: `https://www.cashall.in/sell/mobile/${brandSlug}/${modelSlug}`,
    },
    openGraph: {
      title: `${title} | CashALL`,
      description,
      url: `https://www.cashall.in/sell/mobile/${brandSlug}/${modelSlug}`,
    },
  };
}

export default function MobileModelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
