/**
 * CashALL Google Search Console Automated Manager
 * Powered by Google Cloud Service Account OAuth2 Authentication
 */
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const KEY_FILE = path.join(__dirname, '..', 'cashall-504808-07f69cd1c4cd.json');

async function getAccessToken() {
  if (!fs.existsSync(KEY_FILE)) {
    throw new Error(`Key file not found at ${KEY_FILE}`);
  }
  const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: keyData.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly',
    aud: keyData.token_uri || 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const b64 = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const unsigned = `${b64(header)}.${b64(claimSet)}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  const signature = signer
    .sign(keyData.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${unsigned}.${signature}`;

  const res = await fetch(keyData.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`OAuth token failure: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function listSites() {
  const token = await getAccessToken();
  const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

async function submitSitemap(siteUrl, sitemapUrl) {
  const token = await getAccessToken();
  const encodedSite = encodeURIComponent(siteUrl);
  const encodedSitemap = encodeURIComponent(sitemapUrl);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps/${encodedSitemap}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (res.status === 204 || res.status === 200) {
    return { success: true, message: `Sitemap ${sitemapUrl} submitted successfully to ${siteUrl}` };
  }
  const text = await res.text();
  return { success: false, status: res.status, error: text };
}

async function getSearchAnalytics(siteUrl, days = 28) {
  const token = await getAccessToken();
  const encodedSite = encodeURIComponent(siteUrl);
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];

  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 50,
      }),
    }
  );
  return await res.json();
}

// CLI Command Handler
const command = process.argv[2] || 'list';

async function run() {
  try {
    if (command === 'list') {
      const sites = await listSites();
      console.log('Registered Google Search Console Properties:');
      console.log(JSON.stringify(sites, null, 2));
    } else if (command === 'submit-sitemap') {
      const site = process.argv[3] || 'https://www.cashall.in/';
      const sitemap = process.argv[4] || 'https://www.cashall.in/sitemap.xml';
      console.log(`Submitting sitemap ${sitemap} to ${site}...`);
      const result = await submitSitemap(site, sitemap);
      console.log('Result:', result);
    } else if (command === 'analytics') {
      const site = process.argv[3] || 'https://www.cashall.in/';
      console.log(`Fetching 28-day organic search analytics for ${site}...`);
      const analytics = await getSearchAnalytics(site);
      console.log('Organic Search Performance:', JSON.stringify(analytics, null, 2));
    } else {
      console.log(`Unknown command: ${command}. Use 'list', 'submit-sitemap', or 'analytics'.`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

run();
