const fs = require('fs');
const path = require('path');

function createSoothingChimeWav() {
  const sampleRate = 44100;
  const durationSec = 2.6;
  const numSamples = Math.floor(sampleRate * durationSec);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(1, 22);  // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
  buffer.writeUInt16LE(2, 32);  // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  // Notes for a pleasant, soothing ascending marimba chime: C5, E5, G5, C6
  const notes = [
    { freq: 523.25, start: 0.00, decay: 3.5 }, // C5
    { freq: 659.25, start: 0.22, decay: 3.5 }, // E5
    { freq: 783.99, start: 0.44, decay: 3.5 }, // G5
    { freq: 1046.50, start: 0.66, decay: 2.8 }, // C6
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sampleVal = 0;

    for (const note of notes) {
      if (t >= note.start) {
        const dt = t - note.start;
        // Smooth soft attack (12ms) to prevent any click
        const attack = Math.min(1.0, dt / 0.012);
        // Exponential decay envelope
        const envelope = attack * Math.exp(-note.decay * dt);

        // Warm harmonic chime: fundamental + soft 2nd harmonic + delicate 3rd harmonic
        const f = note.freq;
        const tone =
          Math.sin(2 * Math.PI * f * dt) +
          0.30 * Math.sin(2 * Math.PI * (f * 2) * dt) * Math.exp(-note.decay * 1.5 * dt) +
          0.08 * Math.sin(2 * Math.PI * (f * 3) * dt) * Math.exp(-note.decay * 2.0 * dt);

        sampleVal += tone * envelope * 0.45;
      }
    }

    // Soft global fade out in the last 150ms
    if (t > durationSec - 0.15) {
      const fade = (durationSec - t) / 0.15;
      sampleVal *= Math.max(0, fade);
    }

    // Clamp
    const clamped = Math.max(-0.95, Math.min(0.95, sampleVal));
    const intSample = Math.floor(clamped * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  // Write to both android-agent-app and android-admin-app
  const targets = [
    path.join(process.cwd(), 'android-agent-app', 'app', 'src', 'main', 'res', 'raw', 'loud_buzzer.wav'),
    path.join(process.cwd(), 'android-admin-app', 'app', 'src', 'main', 'res', 'raw', 'loud_buzzer.wav'),
  ];

  for (const targetPath of targets) {
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetPath, buffer);
    console.log('✅ Generated soothing notification chime:', targetPath, 'Size:', buffer.length, 'bytes');
  }
}

createSoothingChimeWav();
