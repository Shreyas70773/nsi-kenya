// Extract review frames from the step films so they can be judged visually.
import { chromium } from "@playwright/test";

const films = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });

for (const film of films) {
  await page.setContent(
    `<body style="margin:0;background:#000"><video id="v" src="http://localhost:3000/videos/${film}.mp4" muted playsinline style="width:100vw;height:100vh;object-fit:cover"></video></body>`,
  );
  await page.waitForFunction(() => {
    const v = document.getElementById("v");
    return v && v.readyState >= 2;
  });
  for (const t of [1, 3, 5]) {
    await page.evaluate((time) => {
      const v = document.getElementById("v");
      v.currentTime = time;
      return new Promise((resolve) => v.addEventListener("seeked", resolve, { once: true }));
    }, t);
    await page.waitForTimeout(150);
    await page.screenshot({ path: `frame-${film}-${t}s.png` });
  }
}
await browser.close();
console.log("done");
