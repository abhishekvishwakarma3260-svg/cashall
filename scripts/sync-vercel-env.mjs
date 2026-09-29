import fs from "fs";

const token = "vcp_5anknGNMa7RyBhYHUyyCl7dfENDpWS5XZ0A2DjtOQDz6h9Kg7N0GgJ8R";
const projectId = "prj_TwjxxPl7JfESsWNQ1qAVXBawZ0M2";
const teamId = "team_dqUGL0KqFNWEzRNav2uBQmJN";

const envContent = fs.readFileSync(".env", "utf8");
const lines = envContent.split(/\r?\n/);
const envVars = [];

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx <= 0) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  let val = trimmed.slice(eqIdx + 1).trim();
  if (val.startsWith('"') && val.endsWith('"') && val.length >= 2) {
    val = val.slice(1, -1);
  }
  if (!/^(VERCEL|TURBO|NX_)/.test(key)) {
    envVars.push({ key, value: val });
  }
}

console.log(`Uploading ${envVars.length} environment variables to Vercel...`);

for (const { key, value } of envVars) {
  try {
    const res = await fetch(`https://api.vercel.com/v10/projects/${projectId}/env?teamId=${teamId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        value,
        type: "encrypted",
        target: ["production", "preview", "development"],
      }),
    });
    const json = await res.json();
    if (res.ok) {
      console.log(`✓ Added ${key}`);
    } else {
      console.warn(`! ${key}:`, json.error?.message || json);
    }
  } catch (err) {
    console.error(`Error uploading ${key}:`, err.message);
  }
}

console.log("Environment variable upload complete!");
