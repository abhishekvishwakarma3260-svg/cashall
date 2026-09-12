import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      quoteNumber,
      variantId,
      deviceName,
      basePrice,
      totalDeductions,
      estimatedPrice,
      selectedAnswersJson,
      breakdownJson,
      customerName,
      customerPhone,
      status,
    } = body;

    const cleanQuoteNumber = (quoteNumber || `CAQ${Math.floor(10000 + Math.random() * 90000)}`).trim();
    const finalBasePrice = Number(basePrice) || 30000;
    const finalEstPrice = Number(estimatedPrice) || finalBasePrice;
    const finalDeductions = Number(totalDeductions) || Math.max(0, finalBasePrice - finalEstPrice);

    // Prepare breakdown with deviceName, customerName, customerPhone
    let bdObj: any = {};
    if (typeof breakdownJson === "string") {
      try {
        bdObj = JSON.parse(breakdownJson);
      } catch {
        bdObj = {};
      }
    } else if (typeof breakdownJson === "object" && breakdownJson !== null) {
      bdObj = { ...breakdownJson };
    }

    const generatedTimestamp = body.createdAt || body.generatedAt || new Date().toISOString();
    if (!bdObj.generatedAt) bdObj.generatedAt = generatedTimestamp;
    if (deviceName && !bdObj.deviceName) bdObj.deviceName = deviceName;
    if (customerName && !bdObj.customerName) bdObj.customerName = customerName;
    if (customerPhone && !bdObj.customerPhone) bdObj.customerPhone = customerPhone;

    // Prepare selected answers
    let saObj: any = {};
    if (typeof selectedAnswersJson === "string") {
      try {
        saObj = JSON.parse(selectedAnswersJson);
      } catch {
        saObj = {};
      }
    } else if (typeof selectedAnswersJson === "object" && selectedAnswersJson !== null) {
      saObj = { ...selectedAnswersJson };
    }

    if (!saObj.generatedAt) saObj.generatedAt = generatedTimestamp;
    if (customerName && !saObj.customerName) saObj.customerName = customerName;
    if (customerPhone && !saObj.customerPhone) saObj.customerPhone = customerPhone;
    if (deviceName && !saObj.device) saObj.device = deviceName;

    // Find or create valid DeviceVariant
    let resolvedVariantId = variantId;
    let variant = null;

    if (resolvedVariantId) {
      // Check if it's a valid uuid
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedVariantId);
      if (isUuid) {
        variant = await prisma.deviceVariant.findUnique({
          where: { id: resolvedVariantId },
        });
      }
    }

    if (!variant) {
      // Find any active variant or model in DB
      variant = await prisma.deviceVariant.findFirst({
        include: { model: { include: { brand: true } } },
      });
    }

    if (!variant) {
      // Create a fallback brand and model if DB is empty
      let brand = await prisma.brand.findFirst();
      if (!brand) {
        brand = await prisma.brand.create({
          data: { name: "CashALL", slug: "cashall", category: "MOBILE" },
        });
      }
      let model = await prisma.deviceModel.findFirst({ where: { brandId: brand.id } });
      if (!model) {
        model = await prisma.deviceModel.create({
          data: {
            brandId: brand.id,
            name: deviceName || "Mobile Device",
            slug: `dev-${Date.now()}`,
            category: "MOBILE",
            basePrice: finalBasePrice,
          },
        });
      }
      variant = await prisma.deviceVariant.create({
        data: {
          modelId: model.id,
          storage: "256 GB",
          basePrice: finalBasePrice,
        },
      });
    }

    // Extract clean customer phone and name
    const cleanCustomerPhone = (customerPhone || bdObj.customerPhone || saObj.customerPhone || "").replace(/\D/g, "").slice(-10) || null;
    const cleanCustomerName = (customerName || bdObj.customerName || saObj.customerName || "").trim() || null;

    let matchedUserId: string | null = null;
    if (cleanCustomerPhone) {
      try {
        const u = await prisma.user.findFirst({
          where: {
            OR: [
              { phone: cleanCustomerPhone },
              { phone: `91${cleanCustomerPhone}` },
              { phone: { contains: cleanCustomerPhone } },
            ],
          },
          select: { id: true },
        });
        if (u) matchedUserId = u.id;
      } catch (e) {}
    }

    // Check if quote with quoteNumber exists
    const existingQuote = await prisma.quote.findFirst({
      where: { quoteNumber: cleanQuoteNumber },
    });

    let savedQuote;
    if (existingQuote) {
      // Intelligently merge selectedAnswersJson so existing answers are NEVER lost or overwritten with empty
      let mergedSaObj = { ...saObj };
      if (existingQuote.selectedAnswersJson && existingQuote.selectedAnswersJson !== "{}" && existingQuote.selectedAnswersJson !== "[]") {
        try {
          const prevSa = JSON.parse(existingQuote.selectedAnswersJson);
          if (typeof prevSa === "object" && !Array.isArray(prevSa)) {
            // Keep previous detailed condition answers if incoming is minimal/empty
            mergedSaObj = { ...prevSa, ...saObj };
          }
        } catch {}
      }

      savedQuote = await prisma.quote.update({
        where: { id: existingQuote.id },
        data: {
          basePrice: finalBasePrice,
          totalDeductions: finalDeductions,
          estimatedPrice: finalEstPrice,
          breakdownJson: JSON.stringify(bdObj),
          selectedAnswersJson: JSON.stringify(mergedSaObj),
          customerPhone: cleanCustomerPhone || existingQuote.customerPhone,
          customerName: cleanCustomerName || existingQuote.customerName,
          ...(matchedUserId ? { userId: matchedUserId } : {}),
          status: status || existingQuote.status || "ACTIVE",
          updatedAt: new Date(),
        },
      });
    } else {
      savedQuote = await prisma.quote.create({
        data: {
          quoteNumber: cleanQuoteNumber,
          variantId: variant.id,
          basePrice: finalBasePrice,
          totalDeductions: finalDeductions,
          estimatedPrice: finalEstPrice,
          breakdownJson: JSON.stringify(bdObj),
          selectedAnswersJson: JSON.stringify(saObj),
          customerPhone: cleanCustomerPhone,
          customerName: cleanCustomerName,
          ...(matchedUserId ? { userId: matchedUserId } : {}),
          status: status || "ACTIVE",
          expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
        },
      });
    }

    return NextResponse.json({
      success: true,
      quote: savedQuote,
    });
  } catch (error: any) {
    console.error("Error saving quote to database:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save quote" },
      { status: 500 }
    );
  }
}
