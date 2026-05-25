import { test, expect } from "@playwright/test";

test.describe("Phase 0 smoke", () => {
  test("homepage loads with editorial H1 — Kenya + East Africa positioning", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/North Star Impex Kenya/);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toContainText(/Kenya/i);
    await expect(h1).toContainText(/East Africa/i);
    // Crywan must NOT be in the H1 per user instruction — it lives in the
    // dedicated reference-work section below the fold instead.
    await expect(h1).not.toContainText(/Crywan/i);
  });

  test("Crywan is referenced below the fold in the reference-work section", async ({
    page,
  }) => {
    await page.goto("/");
    // The whole page must mention Crywan somewhere (case-study card, etc.)
    await expect(page.locator("body")).toContainText("Crywan");
  });

  test("primary CTA links to /request-quote/", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Get a quote/i }).first();
    await expect(cta).toHaveAttribute("href", "/request-quote/");
  });

  test("trust-gate /talk-to-a-customer/ is linked from the homepage", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Talk to a customer/i }).first(),
    ).toBeVisible();
  });

  test("sitemap.xml is reachable and contains the Crywan case study", async ({
    request,
  }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("xml");
    const body = await res.text();
    expect(body).toContain("/case-studies/crywan-industries-kenya/");
  });

  test("llms.txt is reachable and names North Star + Crywan", async ({
    request,
  }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const body = await res.text();
    expect(body).toContain("North Star Impex Kenya");
    expect(body).toContain("Crywan Industries");
  });

  test("llms-full.txt mentions Safaricom NB-IoT and NEMA", async ({
    request,
  }) => {
    const res = await request.get("/llms-full.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Safaricom NB-IoT");
    expect(body).toMatch(/NEMA|EMCA/);
  });

  test("robots.txt disallows /admin/", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("/admin/");
  });

  test("unauthenticated /admin/ redirects to /admin/login", async ({
    page,
  }) => {
    await page.goto("/admin/");
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
