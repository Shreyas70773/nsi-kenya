// Verify: mobile sector rail scrolls natively; desktop pin still translates; footer brand renders.
import { chromium } from "@playwright/test";

const browser = await chromium.launch();

// 1) Mobile: can the sector rail actually scroll?
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
await mobile.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(2200);
await mobile.evaluate(() => {
  document.querySelector('[aria-label="Industries served"]')?.scrollIntoView({ block: "center" });
});
await mobile.waitForTimeout(800);
const rail = await mobile.evaluate(() => {
  const vp = document.querySelector("[data-viewport]");
  if (!vp) return "no viewport";
  const before = vp.scrollLeft;
  vp.scrollBy({ left: 320 });
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          scrollable: vp.scrollWidth - vp.clientWidth,
          movedTo: vp.scrollLeft,
          before,
        }),
      500,
    ),
  );
});
await mobile.screenshot({ path: "m-sectors.png" });
await mobile.close();

// 2) Desktop: pin still translates the track + footer brand block
const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desk.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await desk.waitForTimeout(2200);
for (let i = 0; i < 18; i++) {
  await desk.mouse.wheel(0, 600);
  await desk.waitForTimeout(120);
}
await desk.waitForTimeout(1500);
const deskState = await desk.evaluate(() => {
  const track = document.querySelector("[data-track]");
  const overflow =
    document.documentElement.scrollWidth - document.documentElement.clientWidth;
  return {
    trackTransform: track ? getComputedStyle(track).transform.slice(0, 40) : null,
    pageOverflow: overflow,
  };
});
await desk.keyboard.press("End");
await desk.waitForTimeout(2500);
await desk.screenshot({ path: "d-footer.png" });
await desk.close();

console.log(JSON.stringify({ rail, deskState }));
await browser.close();
