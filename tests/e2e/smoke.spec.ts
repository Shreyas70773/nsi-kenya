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
    // Customer references (Crywan) must NOT appear anywhere on the homepage
    // per the NDA they have asked us to honour.
    await expect(page.locator("body")).not.toContainText(/Crywan/i);
  });

  test("primary CTA links to /request-quote/", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Get a quote/i }).first();
    await expect(cta).toHaveAttribute("href", "/request-quote/");
  });

  test("'Talk to a customer' is NOT present anywhere on the homepage", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Talk to a customer/i }),
    ).toHaveCount(0);
  });

  test("sitemap.xml is reachable and does NOT contain /case-studies/", async ({
    request,
  }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("xml");
    const body = await res.text();
    expect(body).not.toContain("/case-studies/");
  });

  test("llms.txt is reachable and does NOT name customer references", async ({
    request,
  }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const body = await res.text();
    expect(body).toContain("North Star Impex Kenya");
    expect(body).not.toMatch(/Crywan/i);
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
