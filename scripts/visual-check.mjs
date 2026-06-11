// One-off visual verification for the redesign (not part of the build).
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

// Fabrication film mid-pin
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
for (let i = 0; i < 8; i++) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(2500);
await page.screenshot({ path: "shot-fab.png" });

// Page transition mid-flight: click a nav link, catch the branded panel
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.click('nav[aria-label="Primary"] a[href="/products/"]');
await page.waitForTimeout(420);
await page.screenshot({ path: "shot-transition.png" });

// IoT telemetry film
await page.goto("http://localhost:3000/products/iot/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
for (let i = 0; i < 5; i++) {
  await page.mouse.wheel(0, 550);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(2500);
await page.screenshot({ path: "shot-iot.png" });

const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
console.log(JSON.stringify({ errors }));
await browser.close();
