import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "case-study", "sa-xd");
const out = path.join(dir, "hero-before-after.png");

const TARGET_H = 800;
const GAP = 96;

const oldImg = sharp(path.join(dir, "old-visual.png")).resize({ height: TARGET_H, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
const newImg = sharp(path.join(dir, "sa-xd-09.png")).resize({ height: TARGET_H, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });

const oldBuf = await oldImg.toBuffer({ resolveWithObject: true });
const newBuf = await newImg.toBuffer({ resolveWithObject: true });

const oldW = oldBuf.info.width;
const newW = newBuf.info.width;
const totalW = oldW + GAP + newW;

// Arrow SVG — line + chevron, centered vertically
const arrowSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${GAP}" height="40" viewBox="0 0 ${GAP} 40">
  <line x1="8" y1="20" x2="${GAP - 18}" y2="20" stroke="#3A3530" stroke-width="1.25" stroke-linecap="round"/>
  <polyline points="${GAP - 26},10 ${GAP - 12},20 ${GAP - 26},30" fill="none" stroke="#3A3530" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`);

await sharp({
  create: {
    width: totalW,
    height: TARGET_H,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    { input: oldBuf.data, left: 0, top: 0 },
    { input: arrowSvg, left: oldW, top: Math.round(TARGET_H / 2 - 20) },
    { input: newBuf.data, left: oldW + GAP, top: 0 },
  ])
  .png()
  .toFile(out);

console.log(`wrote ${out} (${totalW}×${TARGET_H})`);
