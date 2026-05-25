#!/usr/bin/env node
/**
 * Compresses every PNG / JPG under public/images/ in-place using sharp.
 * - PNGs go through sharp with compressionLevel: 9, effort: 10, palette: true
 *   where it shaves bytes without visible quality loss.
 * - JPEGs are re-saved at quality 82 with mozjpeg encoding.
 * Skips files where the recompressed version would be larger than the
 * original (rare, but possible on already-small icons).
 *
 * Run via:  node scripts/compress-images.mjs
 *
 * The originals at brand/favicon-*.png are NOT touched.
 */
import sharp from "sharp";
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = join(process.cwd(), "public", "images");

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let totalBefore = 0;
let totalAfter = 0;
let touched = 0;

for (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const before = statSync(file).size;
  totalBefore += before;

  let buf;
  try {
    const img = sharp(file);
    if (ext === ".png") {
      buf = await img
        .png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 })
        .toBuffer();
    } else {
      buf = await img.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    }
  } catch (e) {
    console.warn(`  skip ${file}: ${e.message}`);
    totalAfter += before;
    continue;
  }

  if (buf.length < before) {
    writeFileSync(file, buf);
    totalAfter += buf.length;
    touched++;
    const pct = ((1 - buf.length / before) * 100).toFixed(0);
    console.log(`  ${file.replace(ROOT + "/", "")}  ${(before / 1024).toFixed(0)}kB -> ${(buf.length / 1024).toFixed(0)}kB  (-${pct}%)`);
  } else {
    totalAfter += before;
  }
}

const totalSaved = totalBefore - totalAfter;
const pct = ((totalSaved / totalBefore) * 100).toFixed(1);
console.log("");
console.log(`Touched ${touched} files.`);
console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(1)} MB -> ${(totalAfter / 1024 / 1024).toFixed(1)} MB  (-${pct}%)`);
