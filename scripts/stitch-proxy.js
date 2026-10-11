const readline = require('readline');
const https = require('https');

const STITCH_URL = 'https://stitch.googleapis.com/mcp';
const API_KEY = process.env.STITCH_API_KEY || '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err) {
    return;
  }

  const data = JSON.stringify(parsed);
  const req = https.request(STITCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'Content-Length': Buffer.byteLength(data)
    }
  }, (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
      if (body && body.trim()) {
        try {
          const respJson = JSON.parse(body);
          process.stdout.write(JSON.stringify(respJson) + '\n');
        } catch (e) {
          // Ignore non-json
        }
      }
    });
  });

  req.on('error', (err) => {
    if (parsed && parsed.id !== undefined) {
      process.stdout.write(JSON.stringify({
        jsonrpc: '2.0',
        id: parsed.id,
        error: { code: -32603, message: err.message }
      }) + '\n');
    }
  });

  req.write(data);
  req.end();
});
