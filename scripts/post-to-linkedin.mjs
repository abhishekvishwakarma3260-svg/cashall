import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load .env.local and .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const ORG_ID = process.env.LINKEDIN_ORGANIZATION_ID || "145265865";

export async function publishToLinkedIn({ text, title, articleUrl }) {
  if (!ACCESS_TOKEN) {
    throw new Error("Missing LINKEDIN_ACCESS_TOKEN in .env.local or environment variables.");
  }

  console.log(`[LinkedIn Publisher] Initiating publish to Organization URN: urn:li:organization:${ORG_ID}...`);

  const authorUrn = `urn:li:organization:${ORG_ID}`;

  // Build UGC post payload
  const payload = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: text,
        },
        shareMediaCategory: articleUrl ? "ARTICLE" : "NONE",
        ...(articleUrl
          ? {
              media: [
                {
                  status: "READY",
                  description: {
                    text: title || "CashALL - Instant Device Buyback",
                  },
                  originalUrl: articleUrl,
                  title: {
                    text: title || "Sell Your Old Phone Instantly | CashALL",
                  },
                },
              ],
            }
          : {}),
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let json = null;
  try {
    json = JSON.parse(raw);
  } catch {}

  if (!response.ok) {
    console.error(`[LinkedIn Publisher] Failed with status ${response.status}:`, raw);
    return {
      success: false,
      status: response.status,
      error: raw,
    };
  }

  console.log(`[LinkedIn Publisher] Post successfully published! Response:`, json || raw);
  return {
    success: true,
    status: response.status,
    data: json,
  };
}

// Allow CLI execution: node scripts/post-to-linkedin.mjs "Post text here"
if (process.argv[1] && process.argv[1].endsWith("post-to-linkedin.mjs")) {
  const content = process.argv[2] || "Welcome to CashALL on LinkedIn! Transforming device recommerce across India with transparent instant valuations.";
  const link = process.argv[3] || "https://www.cashall.in";
  publishToLinkedIn({ text: content, articleUrl: link })
    .then((r) => console.log("CLI Result:", r))
    .catch((err) => console.error("CLI Error:", err));
}
