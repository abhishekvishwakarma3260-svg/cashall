import crypto from "crypto";

const PIXEL_ID = "1249229847363732";
const ACCESS_TOKEN = "EAAp9rTiIRy0BSvLtpYKAlevfVkJfDdyZCvAeLZBjjZCGZB2LglQOqkyg073uoAtrFis9D5DpBV3orpUlYH8pn7KTWEWoq7HDJIGDdSe5nE6mOpBDhDrUZATzR6nE7uYJLFrTwjuJHGLb9CZCJSff2hMKbB5Nlv2SZCjvc8KfU7SVpXccuSwtvd0noj8uBp0gwZDZD";
const TEST_CODE = "TEST22390";

function hashSha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function hashPhone(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    cleaned = `91${cleaned}`;
  }
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

async function sendTestEvent(eventName: string, customData: Record<string, any>, eventId: string) {
  const url = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events`;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: "https://www.cashall.in/checkout/pickup",
        action_source: "website",
        user_data: {
          em: [hashSha256("test_customer@cashall.in")],
          ph: [hashPhone("9876543210")],
          fn: [hashSha256("Test")],
          ln: [hashSha256("Customer")],
          ct: [hashSha256("Kolkata")],
          st: [hashSha256("West Bengal")],
          zp: [hashSha256("700001")],
          client_ip_address: "122.161.50.12",
          client_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        },
        custom_data: customData,
      },
    ],
    test_event_code: TEST_CODE,
  };

  console.log(`\n🚀 Sending '${eventName}' event to Meta with test_event_code: ${TEST_CODE}...`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  const resJson = await response.json();
  console.log(`Status HTTP: ${response.status}`);
  console.log("Response from Meta:", JSON.stringify(resJson, null, 2));
  return resJson;
}

async function run() {
  console.log("=== STARTING META CAPI TEST FOR DATASET 1249229847363732 ===");

  // 1. Send Schedule event
  const scheduleRes = await sendTestEvent(
    "Schedule",
    {
      currency: "INR",
      value: 32500,
      content_name: "Apple iPhone 14 (128 GB)",
      order_number: "TEST-CA9999",
      pickup_date: "Tomorrow",
      pickup_time_slot: "10 AM - 1 PM",
    },
    `test_schedule_${Date.now()}`
  );

  // 2. Send PickupBooked (Custom Conversion)
  const pickupRes = await sendTestEvent(
    "PickupBooked",
    {
      currency: "INR",
      value: 32500,
      content_name: "Apple iPhone 14 (128 GB)",
      content_category: "MOBILE",
      order_number: "TEST-CA9999",
      city: "Kolkata",
      pincode: "700001",
      pickup_date: "Tomorrow",
      pickup_time_slot: "10 AM - 1 PM",
    },
    `test_pickup_${Date.now()}`
  );

  if (scheduleRes.events_received > 0 && pickupRes.events_received > 0) {
    console.log("\n✅ SUCCESS! Both events were successfully received by Meta!");
    console.log("Check your 'Test events' tab in Meta Events Manager right now. You should see them appear live!");
  } else {
    console.log("\n⚠️ Check the response details above.");
  }
}

run().catch(console.error);
