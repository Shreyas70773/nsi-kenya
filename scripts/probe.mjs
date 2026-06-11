import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
for (let i = 0; i < 6; i++) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(2500);
const probe = await page.evaluate(() => {
  const section = document.querySelector('[aria-label="How a tank gets built"]');
  if (!section) return "no section";
  const spacer = section.parentElement;
  const films = section.querySelectorAll("[data-step-film]").length;
  const videos = section.querySelectorAll("video").length;
  const cs = getComputedStyle(section);
  return {
    scrollY: Math.round(window.scrollY),
    spacerIsPin: spacer?.className.includes("pin-spacer") ?? false,
    spacerH: spacer?.offsetHeight,
    sectionH: section.getBoundingClientRect().height,
    sectionTop: Math.round(section.getBoundingClientRect().top),
    position: cs.position,
    films,
    videos,
    docH: document.documentElement.scrollHeight,
  };
});
console.log(JSON.stringify(probe, null, 1));
await browser.close();
