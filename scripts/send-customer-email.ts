/**
 * CLI and Agent Automation Script to Send Official Customer Emails
 * Usage:
 *   npx tsx scripts/send-customer-email.ts --order CA97170 --scenario PARTIAL_PAYMENT_PENDING_BOX --paid 50000 --balance 4000 --item "Original Box" --date "4th October 2026"
 */

import { prisma } from "../lib/db";
import { EmailService } from "../lib/services/email.service";
import {
  generateCustomerEmail,
  CustomerEmailScenario,
  EmailOrderDetails,
} from "../lib/templates/customer-email-templates";

// Simple argument parser
function parseArgs() {
  const args = process.argv.slice(2);
  const params: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].substring(2);
      const val = args[i + 1] && !args[i + 1].startsWith("--") ? args[++i] : "true";
      params[key] = val;
    }
  }
  return params;
}

async function main() {
  const params = parseArgs();
  const orderNumber = params.order || params.orderNumber;
  const scenario = (params.scenario || "PARTIAL_PAYMENT_PENDING_BOX") as CustomerEmailScenario;
  const recipientOverride = params.to || params.email;

  if (!orderNumber && !recipientOverride) {
    console.error("❌ Missing required parameter: please supply --order <CA_NUMBER> or --to <email>");
    process.exit(1);
  }

  console.log(`\n🔍 Searching database for Order: ${orderNumber || "N/A"}...`);

  let dbOrder: any = null;
  if (orderNumber) {
    dbOrder = await prisma.order.findFirst({
      where: { orderNumber: { contains: orderNumber.replace("#", "").trim(), mode: "insensitive" } },
      include: {
        user: true,
        address: true,
        payments: { orderBy: { createdAt: "desc" }, take: 1 },
        qcReports: { orderBy: { createdAt: "desc" }, take: 1 },
        pickups: { orderBy: { createdAt: "desc" }, take: 1 },
        quote: {
          include: {
            variant: {
              include: {
                model: {
                  include: {
                    brand: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  const customerEmail = recipientOverride || dbOrder?.user?.email;
  if (!customerEmail) {
    console.error(`❌ No email address found for order #${orderNumber} and no --to email provided!`);
    process.exit(1);
  }

  // Resolve device name
  let deviceName = params.device || "Mobile Device";
  if (dbOrder) {
    if (dbOrder.qcReports?.[0]?.declaredAnswersJson) {
      try {
        const da = JSON.parse(dbOrder.qcReports[0].declaredAnswersJson);
        if (da.device) deviceName = da.device;
      } catch {}
    }
    if (deviceName === "Mobile Device" && dbOrder.quote?.variant?.model) {
      const m = dbOrder.quote.variant.model;
      deviceName = `${m.brand?.name || ""} ${m.name || ""}`.trim();
    }
  }

  const customerName = params.name || dbOrder?.user?.name || "Customer";
  const customerPhone = params.phone || dbOrder?.user?.phone || "";
  const imeiNumber = params.imei || dbOrder?.qcReports?.[0]?.imeiNumber || undefined;
  const utrNumber = params.utr || dbOrder?.payments?.[0]?.transactionRef || dbOrder?.urn || undefined;
  const agentName = params.agent || dbOrder?.pickups?.[0]?.notes || "CashALL Logistics Executive";

  const totalAgreedPrice = params.total
    ? parseInt(params.total, 10)
    : (dbOrder?.finalPrice || 0);

  const initialPaidAmount = params.paid
    ? parseInt(params.paid, 10)
    : (dbOrder?.payments?.[0]?.amount || 0);

  const balanceAmount = params.balance
    ? parseInt(params.balance, 10)
    : Math.max(0, totalAgreedPrice - initialPaidAmount);

  const pendingItem = params.item || "Original Device Box";
  const promisedDate = params.date || "Tomorrow, 4th October 2026";
  const reason = params.reason || undefined;
  const newPickupTime = params.pickupTime || undefined;

  const orderDetails: EmailOrderDetails = {
    orderNumber: orderNumber || dbOrder?.orderNumber || "GENERAL",
    customerName,
    customerPhone,
    deviceName,
    imeiNumber,
    totalAgreedPrice: totalAgreedPrice || (initialPaidAmount + balanceAmount),
    initialPaidAmount,
    balanceAmount,
    pendingItem,
    promisedDate,
    utrNumber,
    agentName,
    reason,
    newPickupTime,
  };

  console.log("📝 Generating Email Template for scenario:", scenario);
  const emailPayload = generateCustomerEmail(scenario, orderDetails);

  console.log(`📤 Sending official email to: ${customerEmail}`);
  console.log(`📌 Subject: ${emailPayload.subject}`);

  const result = await EmailService.sendEmail(customerEmail, emailPayload.subject, emailPayload.html);

  console.log("\n✅ SUCCESS: Official email dispatched successfully!");
  console.log("Details:", result);
}

main()
  .catch((err) => {
    console.error("❌ Email dispatch failed:", err.message || err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
