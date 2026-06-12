// Scan for horizontal overflow at every scroll depth.
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const hits = [];
let maxY = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < maxY; y += 300) {
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(120);
  const r = await page.evaluate(() => ({
    y: Math.round(window.scrollY),
    over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  if (r.over > 0) hits.push(r);
  maxY = await page.evaluate(() => document.body.scrollHeight);
}
console.log(JSON.stringify({ hits: hits.slice(0, 20), totalHits: hits.length }));
await browser.close();
