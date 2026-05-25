import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/lib/constants";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("contains the homepage with priority 1", () => {
    const home = entries.find((e) => e.url === `${SITE_URL}/`);
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1);
  });

  it("contains all four Tier-1 flagship product pages", () => {
    expect(urls).toContain(`${SITE_URL}/products/tanks/stainless-steel/`);
    expect(urls).toContain(`${SITE_URL}/products/tanks/zinc-alum/`);
    expect(urls).toContain(`${SITE_URL}/products/silos/grain-storage/`);
    expect(urls).toContain(`${SITE_URL}/products/structural-works/`);
  });

  it("contains the IoT product page", () => {
    expect(urls).toContain(`${SITE_URL}/products/iot/`);
  });

  it("contains all four industry pages", () => {
    expect(urls).toContain(`${SITE_URL}/industries/food-and-beverage/`);
    expect(urls).toContain(`${SITE_URL}/industries/etp-water-treatment/`);
    expect(urls).toContain(`${SITE_URL}/industries/alcohol-distilling/`);
    expect(urls).toContain(`${SITE_URL}/industries/chemical-processing/`);
  });

  it("contains Kenya and Nairobi location pages", () => {
    expect(urls).toContain(`${SITE_URL}/locations/kenya/`);
    expect(urls).toContain(`${SITE_URL}/locations/nairobi/`);
  });

  it("contains the Crywan case study", () => {
    expect(urls).toContain(
      `${SITE_URL}/case-studies/crywan-industries-kenya/`,
    );
  });

  it("does NOT contain /talk-to-a-customer/ (removed per user instruction)", () => {
    expect(urls.some((u) => u.includes("/talk-to-a-customer/"))).toBe(false);
  });

  it("excludes admin routes", () => {
    expect(urls.some((u) => u.includes("/admin/"))).toBe(false);
  });

  it("excludes request-quote success page", () => {
    expect(urls.some((u) => u.includes("/request-quote/success/"))).toBe(false);
  });

  it("all non-homepage URLs use a trailing slash", () => {
    for (const e of entries) {
      if (e.url === `${SITE_URL}/`) continue;
      expect(e.url.endsWith("/")).toBe(true);
    }
  });

  it("every entry has a lastModified timestamp", () => {
    for (const e of entries) {
      expect(e.lastModified).toBeInstanceOf(Date);
    }
  });
});
