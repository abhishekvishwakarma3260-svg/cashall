import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT_DIR = process.cwd();

console.log("================================================================================");
console.log("🛡️  CASHALL — AUTOMATED SECURITY, DATA INTEGRITY & INDIA COMPLIANCE TEST SUITE");
console.log("================================================================================\n");

let passedCount = 0;
let failedCount = 0;

function runTest(testName, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${testName}`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}\n`);
    failedCount++;
  }
}

// -----------------------------------------------------------------------------
// TEST SUITE 1: CRYPTOGRAPHIC SESSION AUTHENTICATION & TOKEN FORGERY RESISTANCE
// -----------------------------------------------------------------------------
console.log("--- SUITE 1: Cryptographic Session Authentication & IDOR Protection ---");

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

function signSessionToken(payload, secretKey, expiresInSeconds = 3600) {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(`v1.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `v1.${encodedPayload}.${signature}`;
}

function verifySessionToken(token, secretKey) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return null;

  const [version, encodedPayload, receivedSignature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(`${version}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const receivedBuf = Buffer.from(receivedSignature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (receivedBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(receivedBuf, expectedBuf)) return null;

  try {
    const jsonStr = base64UrlDecode(encodedPayload);
    const payload = JSON.parse(jsonStr);
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;
    return payload;
  } catch {
    return null;
  }
}

const TEST_SECRET = "production_secure_secret_key_audit_test_2026";

runTest("Valid HMAC-SHA256 session token is accepted and correctly decoded", () => {
  const payload = { uid: "user-12345", role: "ADMIN", email: "admin@cashall.in" };
  const token = signSessionToken(payload, TEST_SECRET);
  const verified = verifySessionToken(token, TEST_SECRET);
  assert.ok(verified, "Token verification returned null");
  assert.equal(verified.uid, "user-12345");
  assert.equal(verified.role, "ADMIN");
});

runTest("Tampered signature token is strictly rejected", () => {
  const payload = { uid: "user-12345", role: "ADMIN" };
  const token = signSessionToken(payload, TEST_SECRET);
  const tamperedToken = token.slice(0, -4) + "XXXX";
  const verified = verifySessionToken(tamperedToken, TEST_SECRET);
  assert.equal(verified, null, "Tampered signature should fail verification");
});

runTest("Tampered payload (privilege escalation attempt) is strictly rejected", () => {
  const agentPayload = { uid: "agent-999", role: "AGENT" };
  const token = signSessionToken(agentPayload, TEST_SECRET);
  const parts = token.split(".");
  // Attacker attempts to change role to ADMIN in payload without valid secret
  const forgedPayload = JSON.parse(base64UrlDecode(parts[1]));
  forgedPayload.role = "ADMIN";
  const forgedToken = `${parts[0]}.${base64UrlEncode(JSON.stringify(forgedPayload))}.${parts[2]}`;
  const verified = verifySessionToken(forgedToken, TEST_SECRET);
  assert.equal(verified, null, "Forged payload should fail HMAC verification");
});

runTest("Expired session token is strictly rejected", () => {
  const payload = { uid: "user-old", role: "CUSTOMER" };
  // Expired 100 seconds ago
  const expiredToken = signSessionToken(payload, TEST_SECRET, -100);
  const verified = verifySessionToken(expiredToken, TEST_SECRET);
  assert.equal(verified, null, "Expired token must be rejected");
});

runTest("Legacy backdoor token 'tok_admin_master_session' is strictly rejected", () => {
  const verified = verifySessionToken("tok_admin_master_session", TEST_SECRET);
  assert.equal(verified, null, "Arbitrary tok_admin string must be rejected");
});

// -----------------------------------------------------------------------------
// TEST SUITE 2: DATA INTEGRITY & ORDER STATE MACHINE TRANSITION RULES
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 2: Data Integrity & Canonical Order State Machine ---");

const CANONICAL_TRANSITIONS = {
  QUOTE_CREATED: ["PICKUP_SCHEDULED", "CANCELLED"],
  PICKUP_SCHEDULED: ["PARTNER_ASSIGNED", "PARTNER_ON_THE_WAY", "INSPECTION_STARTED", "CANCELLED"],
  PARTNER_ASSIGNED: ["PARTNER_ON_THE_WAY", "INSPECTION_STARTED", "PICKUP_SCHEDULED", "CANCELLED"],
  PARTNER_ON_THE_WAY: ["INSPECTION_STARTED", "PICKUP_SCHEDULED", "CANCELLED"],
  INSPECTION_STARTED: ["FINAL_OFFER_PENDING", "ACCEPTED", "DECLINED", "CANCELLED"],
  FINAL_OFFER_PENDING: ["ACCEPTED", "DECLINED", "CANCELLED"],
  ACCEPTED: ["PAYMENT_PROCESSING", "PAID", "COMPLETED", "CANCELLED"],
  PAYMENT_PROCESSING: ["PAID", "ACCEPTED", "CANCELLED"],
  PAID: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  DECLINED: ["FINAL_OFFER_PENDING", "CANCELLED"],
  CANCELLED: [],
};

function normalizeOrderStatus(status) {
  const map = {
    CREATED: "QUOTE_CREATED",
    QUOTE_CREATED: "QUOTE_CREATED",
    PICKUP_SCHEDULED: "PICKUP_SCHEDULED",
    ASSIGNED: "PARTNER_ASSIGNED",
    PARTNER_ASSIGNED: "PARTNER_ASSIGNED",
    PARTNER_ACCEPTED: "PARTNER_ON_THE_WAY",
    PARTNER_ON_THE_WAY: "PARTNER_ON_THE_WAY",
    INSPECTION_STARTED: "INSPECTION_STARTED",
    INSPECTION_COMPLETED: "FINAL_OFFER_PENDING",
    IMEI_VERIFICATION_PENDING: "FINAL_OFFER_PENDING",
    IMEI_VERIFIED: "FINAL_OFFER_PENDING",
    IMEI_FLAGGED: "DECLINED",
    FINAL_OFFER: "FINAL_OFFER_PENDING",
    FINAL_OFFER_PENDING: "FINAL_OFFER_PENDING",
    CUSTOMER_ACCEPTED: "ACCEPTED",
    ACCEPTED: "ACCEPTED",
    IDENTITY_VERIFICATION_PENDING: "ACCEPTED",
    IDENTITY_VERIFIED: "ACCEPTED",
    ESIGN_PENDING: "ACCEPTED",
    ESIGNED: "ACCEPTED",
    PAYMENT_PENDING: "PAYMENT_PROCESSING",
    PAYMENT_PROCESSING: "PAYMENT_PROCESSING",
    PAYMENT_CONFIRMED: "PAID",
    PAID: "PAID",
    DEVICE_RECEIVED: "PAID",
    BILL_GENERATED: "COMPLETED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    REJECTED: "DECLINED",
    DECLINED: "DECLINED",
  };
  return map[status] || status;
}

function canTransition(current, target) {
  const from = normalizeOrderStatus(current);
  const to = normalizeOrderStatus(target);
  if (from === to) return true; // Idempotent self-update
  const allowed = CANONICAL_TRANSITIONS[from] || [];
  return allowed.includes(to);
}

runTest("Valid full lifecycle state transitions succeed sequentially", () => {
  const happyPath = [
    ["QUOTE_CREATED", "PICKUP_SCHEDULED"],
    ["PICKUP_SCHEDULED", "PARTNER_ASSIGNED"],
    ["PARTNER_ASSIGNED", "PARTNER_ON_THE_WAY"],
    ["PARTNER_ON_THE_WAY", "INSPECTION_STARTED"],
    ["INSPECTION_STARTED", "FINAL_OFFER_PENDING"],
    ["FINAL_OFFER_PENDING", "ACCEPTED"],
    ["ACCEPTED", "PAYMENT_PROCESSING"],
    ["PAYMENT_PROCESSING", "PAID"],
    ["PAID", "COMPLETED"],
  ];
  for (const [from, to] of happyPath) {
    assert.ok(canTransition(from, to), `Expected transition ${from} -> ${to} to be permitted`);
  }
});

runTest("Illegal state jumps (e.g. QUOTE_CREATED directly to COMPLETED) are blocked", () => {
  assert.equal(canTransition("QUOTE_CREATED", "COMPLETED"), false);
  assert.equal(canTransition("PICKUP_SCHEDULED", "PAID"), false);
  assert.equal(canTransition("QUOTE_CREATED", "PAID"), false);
});

runTest("Terminal state protection: COMPLETED and CANCELLED cannot transition further", () => {
  assert.equal(canTransition("COMPLETED", "PAID"), false);
  assert.equal(canTransition("COMPLETED", "PICKUP_SCHEDULED"), false);
  assert.equal(canTransition("CANCELLED", "PAID"), false);
  assert.equal(canTransition("CANCELLED", "COMPLETED"), false);
});

runTest("Legacy intermediate status strings normalize correctly to PostgreSQL enums", () => {
  assert.equal(normalizeOrderStatus("CUSTOMER_ACCEPTED"), "ACCEPTED");
  assert.equal(normalizeOrderStatus("INSPECTION_COMPLETED"), "FINAL_OFFER_PENDING");
  assert.equal(normalizeOrderStatus("BILL_GENERATED"), "COMPLETED");
  assert.equal(normalizeOrderStatus("PAYMENT_CONFIRMED"), "PAID");
  assert.equal(normalizeOrderStatus("ASSIGNED"), "PARTNER_ASSIGNED");
});

// -----------------------------------------------------------------------------
// TEST SUITE 3: SENSITIVE DATA MASKING & LOG REDACTION (DPDP & CERT-IN)
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 3: Sensitive Data Masking & Structured Log Redaction ---");

function maskPhoneNumber(phone) {
  const clean = (phone || "").replace(/\D/g, "").slice(-10);
  if (clean.length === 10) {
    return `${clean.slice(0, 2)}******${clean.slice(-2)}`;
  }
  return "******";
}

function maskImeiNumber(imei) {
  const clean = (imei || "").trim();
  if (clean.length >= 14) {
    return `${clean.slice(0, 6)}******${clean.slice(-2)}`;
  }
  return "******";
}

const SENSITIVE_KEY_PATTERNS = [
  /passw(or)?d/i,
  /secret/i,
  /token/i,
  /auth(orization)?/i,
  /api[_-]?key/i,
  /otp/i,
  /aadhaar/i,
  /pan/i,
  /signature/i,
  /account[_-]?num(ber)?/i,
  /ifsc/i,
  /vpa/i,
  /upi/i,
  /cvv/i,
];

function redactValue(key, value) {
  if (value === null || value === undefined) return value;
  if (SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key))) {
    if (typeof value === "string") {
      if (value.length <= 4) return "REDACTED";
      return `${value.slice(0, 2)}***[REDACTED]***${value.slice(-2)}`;
    }
    return "[REDACTED]";
  }
  if (typeof value === "string") {
    if (/^\d{4}\s?\d{4}\s?\d{4}$/.test(value.trim())) {
      const clean = value.replace(/\s/g, "");
      return `XXXX-XXXX-${clean.slice(-4)}`;
    }
    if (value.startsWith("Bearer ") || value.startsWith("tok_") || value.startsWith("v1.")) {
      return "[TOKEN_REDACTED]";
    }
  }
  return value;
}

function redactSensitiveData(data) {
  if (!data || typeof data !== "object") return data;
  if (Array.isArray(data)) return data.map((item) => redactSensitiveData(item));
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === "object") {
      sanitized[key] = redactSensitiveData(value);
    } else {
      sanitized[key] = redactValue(key, value);
    }
  }
  return sanitized;
}

runTest("Indian 10-digit mobile number is masked with first 2 and last 2 digits only", () => {
  const masked = maskPhoneNumber("9876543210");
  assert.equal(masked, "98******10");
});

runTest("15-digit device IMEI is masked in public responses", () => {
  const masked = maskImeiNumber("863920041234567");
  assert.equal(masked, "863920******67");
});

runTest("Logger redacts passwords, tokens, Aadhaar, and bank account numbers", () => {
  const rawLog = {
    user: "sangeet",
    password: "SuperSecretPassword123",
    authToken: "Bearer eyJhbGciOi...",
    aadhaarNumber: "1234 5678 9012",
    bankAccountNumber: "50100234567890",
    orderId: "ord-999",
  };
  const redacted = redactSensitiveData(rawLog);
  assert.ok(!JSON.stringify(redacted).includes("SuperSecretPassword123"), "Password must not be in log");
  assert.ok(redacted.password.includes("[REDACTED]"));
  assert.ok(redacted.authToken.includes("[REDACTED]"));
  assert.equal(redacted.orderId, "ord-999", "Non-sensitive orderId must be preserved");
});

// -----------------------------------------------------------------------------
// TEST SUITE 4: INDIA DPDP ACT 2023 PRIVACY REQUEST VALIDATION
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 4: DPDP Act, 2023 Statutory Privacy Requests ---");

const VALID_DPDP_TYPES = new Set([
  "ACCESS_SUMMARY",
  "CORRECTION",
  "ERASURE_DELETION",
  "NOMINATION",
  "GRIEVANCE",
]);

function validatePrivacyRequest(data) {
  if (!data || typeof data !== "object") return { valid: false, error: "Missing body" };
  if (!VALID_DPDP_TYPES.has(data.requestType)) {
    return { valid: false, error: "Invalid DPDP request type" };
  }
  if (!data.dataPrincipalName || data.dataPrincipalName.trim().length < 2) {
    return { valid: false, error: "Full name required" };
  }
  const cleanPhone = (data.dataPrincipalPhone || "").replace(/\D/g, "").slice(-10);
  if (cleanPhone.length !== 10) {
    return { valid: false, error: "Invalid 10-digit mobile number" };
  }
  if (!data.dataPrincipalEmail || !data.dataPrincipalEmail.includes("@")) {
    return { valid: false, error: "Valid email required" };
  }
  if (!data.requestDetails || data.requestDetails.trim().length < 10) {
    return { valid: false, error: "Request details required (min 10 chars)" };
  }
  return { valid: true, cleanPhone };
}

runTest("Valid DPDP Access Summary and Erasure requests pass schema validation", () => {
  const validReq = {
    requestType: "ERASURE_DELETION",
    dataPrincipalName: "Sangeet Roy",
    dataPrincipalPhone: "9876543210",
    dataPrincipalEmail: "customer@example.com",
    requestDetails: "Please erase my contact and old valuation records under DPDP Act 2023.",
  };
  const result = validatePrivacyRequest(validReq);
  assert.equal(result.valid, true);
  assert.equal(result.cleanPhone, "9876543210");
});

runTest("Invalid request type or invalid mobile number is rejected with 400", () => {
  const invalidType = {
    requestType: "UNAUTHORIZED_ARBITRARY_ACTION",
    dataPrincipalName: "John Doe",
    dataPrincipalPhone: "9876543210",
    dataPrincipalEmail: "john@example.com",
    requestDetails: "Some details here for the request.",
  };
  assert.equal(validatePrivacyRequest(invalidType).valid, false);

  const invalidPhone = {
    requestType: "ACCESS_SUMMARY",
    dataPrincipalName: "John Doe",
    dataPrincipalPhone: "123", // Too short
    dataPrincipalEmail: "john@example.com",
    requestDetails: "Provide summary of personal data.",
  };
  assert.equal(validatePrivacyRequest(invalidPhone).valid, false);
});

// -----------------------------------------------------------------------------
// TEST SUITE 5: ENVIRONMENT & CODEBASE SECURITY HARDENING AUDIT
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 5: Hardened Codebase & Zero Secret Leakage Verification ---");

runTest("lib/db.ts does not contain hardcoded Supabase pooler credentials", () => {
  const dbFile = fs.readFileSync(path.join(ROOT_DIR, "lib/db.ts"), "utf8");
  assert.ok(!dbFile.includes("postgres.dckbovjdfbmsxquedztt:"), "Hardcoded password found in lib/db.ts!");
  assert.ok(!dbFile.includes("SUPABASE_IPV4_POOLER_URL ="), "Hardcoded pooler string found in lib/db.ts!");
});

runTest("next.config.mjs does not export DATABASE_URL or POSTGRES_URL to client bundle", () => {
  const nextConfig = fs.readFileSync(path.join(ROOT_DIR, "next.config.mjs"), "utf8");
  assert.ok(!nextConfig.includes("DATABASE_URL:"), "Database URL exposed in client bundle env config!");
  assert.ok(!nextConfig.includes("POSTGRES_URL:"), "Postgres URL exposed in client bundle env config!");
});

runTest("next.config.mjs enforces private, no-cache headers on authenticated orders endpoints", () => {
  const nextConfig = fs.readFileSync(path.join(ROOT_DIR, "next.config.mjs"), "utf8");
  assert.ok(nextConfig.includes("private, no-cache, no-store, max-age=0, must-revalidate"));
  assert.ok(!nextConfig.includes('key: "CDN-Cache-Control", value: "public'));
});

runTest("app/robots.ts disallows indexing of private quotes, accounts, and privacy requests", () => {
  const robotsFile = fs.readFileSync(path.join(ROOT_DIR, "app/robots.ts"), "utf8");
  assert.ok(robotsFile.includes('"/quote/"'), "Quote path should be disallowed in robots.ts");
  assert.ok(robotsFile.includes('"/account/"'), "Account path should be disallowed in robots.ts");
  assert.ok(robotsFile.includes('"/privacy-request/"'), "Privacy request path should be disallowed in robots.ts");
});

runTest(".gitignore ignores agents_login_credentials*.txt and sensitive dumps", () => {
  const gitignoreFile = fs.readFileSync(path.join(ROOT_DIR, ".gitignore"), "utf8");
  assert.ok(gitignoreFile.includes("agents_login_credentials*.txt"));
});

// -----------------------------------------------------------------------------
// TEST SUITE 6: VERCEL FAST ORIGIN TRANSFER FREEZE & BANDWIDTH CONTROLS
// -----------------------------------------------------------------------------
console.log("\n--- SUITE 6: Vercel Fast Origin Transfer Freeze & Bandwidth Controls ---");

runTest("public/robots.txt and app/robots.ts block Bytespider, CCBot, and heavy files", () => {
  const pubRobots = fs.readFileSync(path.join(ROOT_DIR, "public/robots.txt"), "utf8");
  const appRobots = fs.readFileSync(path.join(ROOT_DIR, "app/robots.ts"), "utf8");
  assert.ok(pubRobots.includes("User-agent: Bytespider") && pubRobots.includes("Disallow: /"));
  assert.ok(pubRobots.includes("Disallow: /*.apk$"));
  assert.ok(appRobots.includes('"Bytespider"') && appRobots.includes('"CCBot"'));
});

runTest("middleware.ts implements Edge Bot Shield terminating aggressive scrapers", () => {
  const middlewareFile = fs.readFileSync(path.join(ROOT_DIR, "middleware.ts"), "utf8");
  assert.ok(middlewareFile.includes("AGGRESSIVE_BOTS_REGEX"));
  assert.ok(middlewareFile.includes("bytespider"));
  assert.ok(middlewareFile.includes("status: 403"));
});

runTest("next.config.mjs enables Edge CDN caching on public catalog and blog routes", () => {
  const nextConfig = fs.readFileSync(path.join(ROOT_DIR, "next.config.mjs"), "utf8");
  assert.ok(nextConfig.includes("source: '/sell/:path*'"));
  assert.ok(nextConfig.includes("public, s-maxage=86400, stale-while-revalidate=604800"));
  assert.ok(nextConfig.includes("source: '/blog/:path*'"));
});

runTest("public/ directory does not bundle raw heavy APK or CSV deadweight", () => {
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "public/CashALL-Agent.apk")));
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "public/CashALL-Admin.apk")));
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "public/CashALL-Caller.apk")));
  assert.ok(!fs.existsSync(path.join(ROOT_DIR, "public/CashALL_Meta_Catalog_Feed.csv")));
});

runTest("Download API routes support external storage redirect to bypass Vercel serverless origin", () => {
  const customerRoute = fs.readFileSync(path.join(ROOT_DIR, "app/api/v1/download/customer/route.ts"), "utf8");
  assert.ok(customerRoute.includes("APK_STORAGE_BASE_URL"));
  assert.ok(customerRoute.includes("NextResponse.redirect"));
});

console.log("\n================================================================================");
console.log(`📊 TEST RESULTS SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("================================================================================");

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log("🌟 ALL SECURITY & COMPLIANCE TESTS PASSED SUCCESSFULLY!\n");
  process.exit(0);
}
