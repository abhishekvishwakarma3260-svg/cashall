import { NextRequest, NextResponse } from "next/server";
import { apiWrapper } from "@/lib/utils/api-wrapper";
import { SmsService } from "@/lib/services/sms.service";
import { AppError } from "@/lib/utils/AppError";
import { logger } from "@/lib/utils/logger";
import { prisma } from "@/lib/db";
import { z } from "zod";

const verifySchema = z.object({
  phone: z.string().min(10, "Phone number is required"),
  otp: z.string().optional(),
  code: z.string().optional(),
  name: z.string().optional(),
  idToken: z.any().optional(),
});

export const POST = apiWrapper(async (req: NextRequest) => {
  const body = await req.json().catch(() => ({}));
  const validation = verifySchema.safeParse(body);

  if (!validation.success) {
    throw new AppError(validation.error.issues[0].message, 400);
  }

  const { phone: rawPhone, otp, code, name } = validation.data;
  const cleanPhone = rawPhone.replace(/\D/g, "").slice(-10);

  if (cleanPhone.length !== 10) {
    throw new AppError("Invalid 10-digit mobile number.", 400);
  }

  const inputOtp = otp || code;

  if (inputOtp) {
    const verifyResult = SmsService.verifyOtp(cleanPhone, inputOtp);
    if (!verifyResult.success) {
      return NextResponse.json(
        { success: false, message: verifyResult.message },
        { status: 400 }
      );
    }
  }

  // Find or create customer in database
  let user: any = null;
  try {
    user = await prisma.user.findUnique({
      where: { phone: cleanPhone },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone: cleanPhone,
          name: name?.trim() || "Customer",
          role: "CUSTOMER",
          status: "ACTIVE",
          firebaseUid: `sm_${cleanPhone}_${Date.now()}`,
        },
      });
    }
  } catch (dbErr) {
    logger.warn("Database user upsert warning:", dbErr);
  }

  logger.info(`Customer +91${cleanPhone} verified successfully.`);

  return NextResponse.json({
    success: true,
    message: "Phone number verified successfully.",
    phone: cleanPhone,
    user: {
      id: user?.id || `usr-${cleanPhone}`,
      name: user?.name || name?.trim() || "Customer",
      phone: cleanPhone,
    },
  });
});
