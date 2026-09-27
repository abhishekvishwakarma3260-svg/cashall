import https from "node:https";
import http from "node:http";

const HOST = "www.cashall.in";
const KEY = "4a6c8e9b1d2f3a4e5c6b7a8d9e0f1a2b";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/sell`,
  `https://${HOST}/sell/mobile`,
  `https://${HOST}/sell/laptop`,
  `https://${HOST}/sell/tablet`,
  `https://${HOST}/compare/cashify-vs-cashall`,
  `https://${HOST}/compare/cashall-vs-other-platforms`,
  `https://${HOST}/sell-phone-in-kolkata`,
  `https://${HOST}/sell-phone-in-howrah`,
  `https://${HOST}/sell-phone-in-gorakhpur`,
  `https://${HOST}/about-us`,
  `https://${HOST}/faq`,
  `https://${HOST}/reviews`,
  `https://${HOST}/blog`,
  `https://${HOST}/news`,
  `https://${HOST}/articles`,
  `https://${HOST}/why-iphones-hold-more-resale-value-than-android-in-india`,
  `https://${HOST}/512gb-phones-the-sweet-spot-for-resale-value`,
  `https://${HOST}/verify-your-phones-clean-status-before-selling-avoid-surprises`,
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
];

async function pingUrl(targetUrl: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    https
      .get(targetUrl, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode || 200, body: data.slice(0, 300) }));
      })
      .on("error", (err) => resolve({ status: 500, body: err.message }));
  });
}

async function submitIndexNow(): Promise<{ status: number; body: string }> {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: URLS,
  });

  return new Promise((resolve) => {
    const options = {
      hostname: "api.indexnow.org",
      port: 443,
      path: "/indexnow",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode || 200, body: data || "OK" }));
    });

    req.on("error", (err) => resolve({ status: 500, body: err.message }));
    req.write(payload);
    req.end();
  });
}

async function launch() {
  console.log("=================================================");
  console.log("🚀 Launching Immediate Search & AI Engine Crawl");
  console.log("=================================================");

  console.log(`\n1. Submitting ${URLS.length} URLs to IndexNow (Bing, Copilot, Yandex)...`);
  const indexNowRes = await submitIndexNow();
  console.log(`   Result: HTTP ${indexNowRes.status} -> ${indexNowRes.body}`);

  console.log(`\n2. Pinging Google with Sitemap (${SITEMAP_URL})...`);
  const googleRes = await pingUrl(`https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  console.log(`   Result: HTTP ${googleRes.status}`);

  console.log(`\n3. Pinging Bing with Sitemap (${SITEMAP_URL})...`);
  const bingRes = await pingUrl(`https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  console.log(`   Result: HTTP ${bingRes.status}`);

  console.log("\n=================================================");
  console.log("✓ Crawl signals dispatched successfully!");
  console.log("=================================================");
}

launch();
