// Find elements that push past the viewport's right edge (horizontal scrollbar culprits).
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
for (const vw of [{ w: 1440, h: 900 }, { w: 1280, h: 800 }]) {
  const page = await browser.newPage({ viewport: { w: undefined, ...{ width: vw.w, height: vw.h } } });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const report = await page.evaluate(() => {
    const docEl = document.documentElement;
    const limit = docEl.clientWidth;
    const offenders = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      const right = r.right + window.scrollX;
      if (right > limit + 1 && r.width > 0 && r.height > 0) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed") return;
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 90),
          right: Math.round(right),
          w: Math.round(r.width),
        });
      }
    });
    return {
      scrollW: docEl.scrollWidth,
      clientW: limit,
      overflow: docEl.scrollWidth - limit,
      offenders: offenders.slice(0, 12),
    };
  });
  console.log(vw.w, JSON.stringify(report, null, 1));
  await page.close();
}
await browser.close();
