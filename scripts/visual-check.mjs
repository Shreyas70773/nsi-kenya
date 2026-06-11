// One-off visual verification for the redesign (not part of the build).
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

// Fabrication pin — early (step 01/02) and late (step 04)
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
for (let i = 0; i < 6; i++) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(2200);
await page.screenshot({ path: "shot-fab-early.png" });

for (let i = 0; i < 4; i++) {
  await page.mouse.wheel(0, 450);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(2200);
await page.screenshot({ path: "shot-fab-late.png" });

// Footer wordmark
await page.keyboard.press("End");
await page.waitForTimeout(2500);
await page.screenshot({ path: "shot-footer.png" });

// Hero (should be the photo again, no video)
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const heroVideo = await page.evaluate(() =>
  Boolean(document.querySelector('section[aria-label="Hero"] video')),
);
await page.screenshot({ path: "shot-hero.png" });
console.log(JSON.stringify({ heroVideo }));
await browser.close();
