#!/usr/bin/env node
/**
 * One-shot icon generator. Reads the brand-source PNGs at the repo root and
 * emits the icon files that Next.js App Router auto-wires:
 *   src/app/icon.png          (general-use favicon, 512x512)
 *   src/app/apple-icon.png    (iOS home-screen icon, 180x180, white bg)
 *   src/app/favicon.ico       (legacy .ico, 32x32 — PNG-encoded ico is fine)
 *
 * Also writes the larger PWA icons referenced from the manifest:
 *   public/icons/icon-192.png
 *   public/icons/icon-512.png
 *   public/icons/icon-maskable-512.png  (filled-white square for Android)
 *
 * Run via:  node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const TRANSPARENT_SOURCE = join(ROOT, "brand", "favicon-no-bg.png");
const WHITE_SOURCE = join(ROOT, "brand", "favicon-white-bg.png");

mkdirSync(join(ROOT, "src", "app"), { recursive: true });
mkdirSync(join(ROOT, "public", "icons"), { recursive: true });

async function emit(src, outPath, size, opts = {}) {
  const buf = await sharp(src)
    .resize(size, size, { fit: "contain", background: opts.background ?? { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(outPath, buf);
  console.log(`  wrote ${outPath} (${size}x${size})`);
}

console.log("Generating icons from brand source PNGs:");

await emit(TRANSPARENT_SOURCE, join(ROOT, "src", "app", "icon.png"), 512);
await emit(WHITE_SOURCE, join(ROOT, "src", "app", "apple-icon.png"), 180, {
  background: { r: 255, g: 255, b: 255, alpha: 1 },
});

const ico32 = await sharp(TRANSPARENT_SOURCE)
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toBuffer();
writeFileSync(join(ROOT, "src", "app", "favicon.ico"), ico32);
console.log(`  wrote src/app/favicon.ico (32x32 PNG-as-ICO)`);

await emit(TRANSPARENT_SOURCE, join(ROOT, "public", "icons", "icon-192.png"), 192);
await emit(TRANSPARENT_SOURCE, join(ROOT, "public", "icons", "icon-512.png"), 512);

const maskableSize = 512;
const safeZone = Math.round(maskableSize * 0.6);
const star = await sharp(TRANSPARENT_SOURCE)
  .resize(safeZone, safeZone, { fit: "contain" })
  .png()
  .toBuffer();
const maskable = await sharp({
  create: {
    width: maskableSize,
    height: maskableSize,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([{ input: star, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toBuffer();
writeFileSync(join(ROOT, "public", "icons", "icon-maskable-512.png"), maskable);
console.log(`  wrote public/icons/icon-maskable-512.png (maskable, safe-zone centered)`);

console.log("Done.");
