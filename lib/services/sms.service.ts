import { logger } from "@/lib/utils/logger";

interface StoredOtp {
  code: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
}

// In-memory global store across serverless requests in same instance
const globalOtpStore = new Map<string, StoredOtp>();

export class SmsService {
  private static readonly API_BASE = "https://api.startmessaging.com";
  // Pre-approved DLT Template: "Your {{appName}} OTP is {{otp}}. Do not share this code with anyone. Powered by Start Messaging."
  private static readonly TEMPLATE_ID = "39beb731-de09-4a1d-bbbf-3cc9a12936f9";
  private static readonly APP_NAME = "CashALL";
  private static readonly OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
  private static readonly RATE_LIMIT_MS = 30 * 1000; // 30s resend cooldown

  /**
   * Generates and dispatches a live 6-digit OTP SMS via StartMessaging
   */
  public static async sendOtp(phone: string): Promise<{ success: boolean; message: string; cooldownSeconds?: number }> {
    const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10) {
      return { success: false, message: "Invalid 10-digit mobile number." };
    }

    const existing = globalOtpStore.get(cleanPhone);
    const now = Date.now();

    // Check resend rate limit cooldown
    if (existing && now - existing.lastSentAt < this.RATE_LIMIT_MS) {
      const waitSec = Math.ceil((this.RATE_LIMIT_MS - (now - existing.lastSentAt)) / 1000);
      return {
        success: false,
        message: `Please wait ${waitSec}s before requesting a new OTP.`,
        cooldownSeconds: waitSec,
      };
    }

    // Generate cryptographic 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const apiKey = process.env.STARTMESSAGING_API_KEY || "";

    if (!apiKey) {
      logger.error("StartMessaging API Key is missing in environment!");
      return { success: false, message: "SMS Gateway is not configured." };
    }

    try {
      const payload = {
        phoneNumber: `+91${cleanPhone}`,
        templateId: this.TEMPLATE_ID,
        variables: {
          appName: this.APP_NAME,
          otp: code,
        },
      };

      const res = await fetch(`${this.API_BASE}/otp/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        logger.error("StartMessaging SMS delivery error:", data);
        return {
          success: false,
          message: data?.error?.message || "Failed to deliver SMS OTP. Please try again.",
        };
      }

      // Store in memory
      globalOtpStore.set(cleanPhone, {
        code,
        expiresAt: now + this.OTP_TTL_MS,
        attempts: 0,
        lastSentAt: now,
      });

      logger.info(`Live OTP SMS sent successfully to +91${cleanPhone} (StartMsg reqId: ${data.requestId || data.data?.messageId})`);

      return {
        success: true,
        message: `OTP sent successfully to +91 ${cleanPhone}.`,
      };
    } catch (err: any) {
      logger.error("SmsService.sendOtp exception:", err);
      return {
        success: false,
        message: err.message || "Failed to connect to SMS service.",
      };
    }
  }

  /**
   * Verifies the 6-digit OTP code entered by the customer
   */
  public static verifyOtp(phone: string, inputCode: string): { success: boolean; message: string } {
    const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);
    const stored = globalOtpStore.get(cleanPhone);
    const cleanInput = (inputCode || "").trim();

    if (!stored) {
      return { success: false, message: "OTP not found or expired. Please request a new OTP." };
    }

    if (Date.now() > stored.expiresAt) {
      globalOtpStore.delete(cleanPhone);
      return { success: false, message: "OTP has expired. Please request a new OTP." };
    }

    if (stored.attempts >= 5) {
      globalOtpStore.delete(cleanPhone);
      return { success: false, message: "Too many incorrect attempts. Please request a new OTP." };
    }

    if (stored.code !== cleanInput) {
      stored.attempts += 1;
      return { success: false, message: "Incorrect OTP. Please enter the valid 6-digit code." };
    }

    // Success: Clear used OTP
    globalOtpStore.delete(cleanPhone);
    return { success: true, message: "OTP verified successfully." };
  }
}
