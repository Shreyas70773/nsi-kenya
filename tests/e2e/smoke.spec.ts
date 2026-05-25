import { test, expect } from "@playwright/test";

test.describe("Phase 0 smoke", () => {
  test("homepage loads with Crywan above the fold", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/North Star Impex Kenya/);
    await expect(
      page.getByRole("heading", { level: 1 }),
    ).toContainText("Crywan Industries");
  });

  test("primary CTA links to /request-quote/", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Get a Quote/i }).first();
    await expect(cta).toHaveAttribute("href", "/request-quote/");
  });

  test("trust-gate /talk-to-a-customer/ is linked from the homepage", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Talk to one of our customers/i }),
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

  test("llms.txt is reachable and names North Star", async ({ request }) => {
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
