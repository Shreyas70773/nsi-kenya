// One-off visual verification for the redesign (not part of the build).
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.screenshot({ path: "shot-hero.png" });

// Bento header scale
for (let i = 0; i < 3; i++) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(1800);
await page.screenshot({ path: "shot-bento.png" });

// Footer wordmark
await page.keyboard.press("End");
await page.waitForTimeout(3000);
await page.screenshot({ path: "shot-footer.png" });

await browser.close();
console.log("done");
