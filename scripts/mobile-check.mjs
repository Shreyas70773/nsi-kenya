// Mobile visual pass at iPhone-ish viewport.
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
});

const probe = async (name) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  await page.screenshot({ path: `m-${name}.png` });
  return { name, hOverflowPx: overflow };
};

const results = [];

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
results.push(await probe("home-hero"));

// Fabrication area (mobile = stacked steps with inline films)
await page.evaluate(() => {
  document
    .querySelector('[aria-label="How a tank gets built"]')
    ?.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(2500);
results.push(await probe("home-fab"));

// Industries (mobile = snap scroll)
await page.evaluate(() => {
  document
    .querySelector('[aria-label="Industries served"]')
    ?.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(2000);
results.push(await probe("home-industries"));

// Footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2500);
results.push(await probe("home-footer"));

// Inner product page with new bands
await page.goto("http://localhost:3000/products/tanks/epoxy-lined/", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(2200);
results.push(await probe("epoxy-hero"));
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
await page.waitForTimeout(1800);
results.push(await probe("epoxy-mid"));

// Industry page ledger rows
await page.goto("http://localhost:3000/industries/food-and-beverage/", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(2200);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
await page.waitForTimeout(1800);
results.push(await probe("fnb-mid"));

console.log(JSON.stringify(results, null, 1));
await browser.close();
