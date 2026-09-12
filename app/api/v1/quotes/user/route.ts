import { NextRequest, NextResponse } from "next/server";
import { apiWrapper } from "@/lib/utils/api-wrapper";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const GET = apiWrapper(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone") || searchParams.get("mobile");

  if (!phone) {
    return NextResponse.json({ success: true, quotes: [] });
  }

  const rawClean = phone.replace(/\D/g, "");
  const cleanPhone10 = rawClean.slice(-10);
  const cleanPhone12 = rawClean.length === 10 ? `91${rawClean}` : rawClean;

  if (!cleanPhone10) {
    return NextResponse.json({ success: true, quotes: [] });
  }

  // Egress protection: take max 50 recent quotes, select specific relation fields
  const quotes = await prisma.quote.findMany({
    where: {
      deletedAt: null,
      OR: [
        { customerPhone: cleanPhone10 },
        { customerPhone: cleanPhone12 },
        { customerPhone: { contains: cleanPhone10 } },
        { breakdownJson: { contains: cleanPhone10 } },
        { selectedAnswersJson: { contains: cleanPhone10 } },
        { user: { phone: { contains: cleanPhone10 } } },
        { orders: { some: { user: { phone: { contains: cleanPhone10 } } } } },
        { orders: { some: { address: { phone: { contains: cleanPhone10 } } } } },
      ],
    },
    include: {
      orders: {
        take: 1,
        select: {
          id: true,
          orderNumber: true,
          status: true,
        },
      },
      variant: {
        select: {
          id: true,
          storage: true,
          model: {
            select: {
              name: true,
              imageUrl: true,
              category: true,
              brand: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const formattedQuotes = quotes.map((q) => {
    let deviceName = q.variant
      ? `${q.variant.model.brand.name} ${q.variant.model.name}${q.variant.storage ? ` (${q.variant.storage})` : ""}`
      : "Mobile Device";

    if (q.breakdownJson) {
      try {
        const bd = JSON.parse(q.breakdownJson);
        if (bd.deviceName) deviceName = bd.deviceName;
      } catch (e) {}
    }
    if (deviceName === "Mobile Device" && q.selectedAnswersJson) {
      try {
        const sa = JSON.parse(q.selectedAnswersJson);
        if (sa?.device && sa.device !== "Customer Mobile Device") deviceName = sa.device;
      } catch (e) {}
    }

    let estimatedPrice = q.estimatedPrice;
    if (q.breakdownJson) {
      try {
        const bd = JSON.parse(q.breakdownJson);
        if (typeof bd?.estimatedPrice === "number" && bd.estimatedPrice > 0) {
          estimatedPrice = bd.estimatedPrice;
        }
      } catch (e) {}
    }

    const relatedOrder = q.orders?.[0];
    let displayStatus = q.status;
    if (relatedOrder?.status === "COMPLETED") {
      displayStatus = "COMPLETED";
    } else if (relatedOrder) {
      displayStatus = "ORDERED";
    }

    const brandName = q.variant?.model?.brand?.name || "";
    const modelName = q.variant?.model?.name || "";
    const imageUrl = q.variant?.model?.imageUrl || null;
    const category = q.variant?.model?.category || "MOBILE";

    return {
      id: q.id,
      quoteNumber: q.quoteNumber,
      variantId: q.variantId,
      deviceName,
      brandName,
      modelName,
      imageUrl,
      category,
      storage: q.variant?.storage || "",
      basePrice: q.basePrice,
      totalDeductions: q.totalDeductions,
      estimatedPrice,
      status: displayStatus,
      orderNumber: relatedOrder?.orderNumber || null,
      orderStatus: relatedOrder?.status || null,
      createdAt: q.createdAt.toISOString(),
      expiresAt: q.expiresAt.toISOString(),
      customerName: q.customerName || "",
      customerPhone: q.customerPhone || cleanPhone10,
      breakdownJson: q.breakdownJson,
      selectedAnswersJson: q.selectedAnswersJson,
    };
  });

  return NextResponse.json({
    success: true,
    quotes: formattedQuotes,
    count: formattedQuotes.length,
  });
});
