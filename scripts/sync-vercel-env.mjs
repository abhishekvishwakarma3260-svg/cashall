import fs from "fs";

const token = "vcp_5anknGNMa7RyBhYHUyyCl7dfENDpWS5XZ0A2DjtOQDz6h9Kg7N0GgJ8R";
const projectId = "prj_TwjxxPl7JfESsWNQ1qAVXBawZ0M2";
const teamId = "team_dqUGL0KqFNWEzRNav2uBQmJN";

const envFilePath = fs.existsSync(".env.local") ? ".env.local" : ".env";
console.log(`Reading environment variables from ${envFilePath}...`);

const envContent = fs.readFileSync(envFilePath, "utf8");
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

// 1. Fetch current envs on Vercel
const getRes = await fetch(`https://api.vercel.com/v9/projects/${projectId}/env?teamId=${teamId}`, {
  headers: { Authorization: `Bearer ${token}` }
});
const currentData = await getRes.json();
const currentEnvs = currentData.envs || [];
console.log(`Found ${currentEnvs.length} existing envs on Vercel.`);

for (const { key, value } of envVars) {
  const existing = currentEnvs.find(e => e.key === key);

  if (existing) {
    // Delete and recreate to ensure clean encryption & all targets
    await fetch(`https://api.vercel.com/v9/projects/${projectId}/env/${existing.id}?teamId=${teamId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
  }

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

  if (res.ok) {
    console.log(`✓ Synced ${key}`);
  } else {
    const err = await res.json();
    console.warn(`! Failed ${key}:`, err.error?.message || err);
  }
}

console.log("Environment variable synchronization complete!");
