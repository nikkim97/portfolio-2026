import sharp from "sharp";
import { readdirSync, mkdirSync } from "fs";
import { join } from "path";

const SRC = "/Users/niharikamishra/Desktop/VPR";
const OUT = "/Users/niharikamishra/portfolio-2026/public/case-study/vpr";

mkdirSync(OUT, { recursive: true });

// Get all PNGs and build a map by timestamp (e.g. "5.40.05")
const all = readdirSync(SRC).filter(f => f.endsWith(".png"));
const byTime = {};
for (const f of all) {
  const m = f.match(/at (\d+\.\d+\.\d+)/);
  if (m) byTime[m[1]] = join(SRC, f);
}

// ── Crop helpers ──────────────────────────────────────────────
// left/top/width/height all as 0-1 fractions of source dimensions
async function crop(srcPath, outName, { left = 0, top = 0, width = 1, height = 1, outputW = 1280 } = {}) {
  const meta = await sharp(srcPath).metadata();
  const W = meta.width;
  const H = meta.height;
  const x = Math.round(left * W);
  const y = Math.round(top * H);
  const w = Math.round(width * W);
  const h = Math.round(height * H);
  await sharp(srcPath)
    .extract({ left: x, top: y, width: w, height: h })
    .resize(outputW)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(join(OUT, outName));
  console.log(`✓ ${outName}`);
}

async function full(srcPath, outName, outputW = 1280) {
  await sharp(srcPath).resize(outputW).jpeg({ quality: 92, mozjpeg: true }).toFile(join(OUT, outName));
  console.log(`✓ ${outName}`);
}

// ── Project 1: Performance Platform (sa-xd) ──────────────────

// Hero — feedback form UI, right ~58% of slide
await crop(byTime["5.40.05"], "sa-xd-hero.jpg", { left: 0.38, top: 0.04, width: 0.62, height: 0.92 });

// HMW — yellow full-bleed, just trim slide border
await crop(byTime["5.40.15"], "sa-xd-hmw.jpg", { left: 0.01, top: 0.01, width: 0.98, height: 0.98 });

// Experience map — right ~60% of slide
await crop(byTime["5.40.38"], "sa-xd-experience-map.jpg", { left: 0.35, top: 0.12, width: 0.65, height: 0.85 });

// Foundation principles — full slide
await full(byTime["5.40.46"], "sa-xd-principles.jpg");

// Feedback form design — center UI area
await crop(byTime["5.41.01"], "sa-xd-feedback-form.jpg", { left: 0.28, top: 0.1, width: 0.68, height: 0.88 });

// Calibration one-pager — dominant crop, full slide showing template + annotations
await crop(byTime["5.41.11"], "sa-xd-calibration.jpg", { left: 0.03, top: 0.08, width: 0.97, height: 0.9 });

// Measuring — Lucid board right side
await crop(byTime["5.41.19"], "sa-xd-measurement.jpg", { left: 0.28, top: 0.06, width: 0.72, height: 0.9 });

// Impact stats — full slide
await full(byTime["5.41.29"], "sa-xd-impact.jpg");

// Growth — full slide
await full(byTime["5.41.43"], "sa-xd-growth.jpg");

// ── Project 2: Calibrations Ecosystem (path-360) ─────────────

// Hero — PATH distribution UI right side
await crop(byTime["5.42.11"], "path-hero.jpg", { left: 0.36, top: 0.08, width: 0.64, height: 0.9 });

// HMW — yellow full-bleed
await crop(byTime["5.42.21"], "path-hmw.jpg", { left: 0.01, top: 0.01, width: 0.98, height: 0.98 });

// Brainstorm — left whiteboard (most energetic)
await crop(byTime["5.42.40"], "path-brainstorm.jpg", { left: 0.0, top: 0.1, width: 0.52, height: 0.85 });

// Personas — full slide
await full(byTime["5.42.49"], "path-personas.jpg");

// Jobs to be done — flow diagram center
await crop(byTime["5.42.58"], "path-jtbd.jpg", { left: 0.15, top: 0.12, width: 0.82, height: 0.86 });

// Managing sessions — design screens
await crop(byTime["5.43.08"], "path-sessions.jpg", { left: 0.0, top: 0.12, width: 0.62, height: 0.88 });

// Live calibrations — UI right side
await crop(byTime["5.43.21"], "path-live.jpg", { left: 0.32, top: 0.08, width: 0.68, height: 0.9 });

// Live calibrations 3 states — wide cinematic
await crop(byTime["5.43.33"], "path-live-states.jpg", { left: 0.05, top: 0.12, width: 0.93, height: 0.82, outputW: 1600 });

// Early feedback testimonials — right half
await crop(byTime["5.42.29"], "path-feedback.jpg", { left: 0.46, top: 0.08, width: 0.52, height: 0.9 });

// 20,000+ stat — full slide
await full(byTime["5.43.53"], "path-scale.jpg");

// Growth as a leader — full slide
await full(byTime["5.44.02"], "path-growth.jpg");

console.log("\n✅ All images processed.");
