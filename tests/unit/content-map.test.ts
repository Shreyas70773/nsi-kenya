import { describe, it, expect } from "vitest";
import {
  PRODUCTS,
  INDUSTRIES,
  LOCATIONS,
  CASE_STUDIES,
  COMPARE_PAGES,
  BEST_PAGES,
  COST_PAGES,
} from "@/lib/content-map";

describe("content-map", () => {
  describe("PRODUCTS", () => {
    it("every product has a unique slug", () => {
      const slugs = PRODUCTS.map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("every product has a non-empty name, category, and shortDescription", () => {
      for (const p of PRODUCTS) {
        expect(p.name).toBeTruthy();
        expect(p.category).toBeTruthy();
        expect(p.shortDescription).toBeTruthy();
      }
    });

    it("every product has at least one primary query", () => {
      for (const p of PRODUCTS) {
        expect(p.primaryQueries.length).toBeGreaterThan(0);
      }
    });

    it("contains all four Tier-1 flagship products", () => {
      const slugs = PRODUCTS.map((p) => p.slug);
      expect(slugs).toContain("tanks/stainless-steel");
      expect(slugs).toContain("tanks/zinc-alum");
      expect(slugs).toContain("silos/grain-storage");
      expect(slugs).toContain("structural-works");
    });

    it("contains all six instrument categories", () => {
      const slugs = PRODUCTS.map((p) => p.slug);
      expect(slugs).toContain("instruments/flow");
      expect(slugs).toContain("instruments/level");
      expect(slugs).toContain("instruments/pressure");
      expect(slugs).toContain("instruments/liquid-analysis");
      expect(slugs).toContain("instruments/temperature");
      expect(slugs).toContain("instruments/system-products");
    });

    it("contains the IoT product", () => {
      const slugs = PRODUCTS.map((p) => p.slug);
      expect(slugs).toContain("iot");
    });
  });

  describe("INDUSTRIES", () => {
    it("contains all four priority industries", () => {
      const slugs = INDUSTRIES.map((i) => i.slug);
      expect(slugs).toContain("food-and-beverage");
      expect(slugs).toContain("etp-water-treatment");
      expect(slugs).toContain("alcohol-distilling");
      expect(slugs).toContain("chemical-processing");
    });

    it("ETP industry is compliance-triggered", () => {
      const etp = INDUSTRIES.find((i) => i.slug === "etp-water-treatment");
      expect(etp?.trigger).toBe("compliance");
    });

    it("F&B is priority 1 ambition-triggered", () => {
      const fnb = INDUSTRIES.find((i) => i.slug === "food-and-beverage");
      expect(fnb?.priority).toBe(1);
      expect(fnb?.trigger).toBe("ambition");
    });

    it("each industry references only valid product slugs", () => {
      const productSlugs = new Set(PRODUCTS.map((p) => p.slug));
      for (const ind of INDUSTRIES) {
        for (const slug of ind.relevantProductSlugs) {
          expect(productSlugs.has(slug)).toBe(true);
        }
      }
    });
  });

  describe("LOCATIONS", () => {
    it("contains Nairobi as the only location", () => {
      const slugs = LOCATIONS.map((l) => l.slug);
      expect(slugs).toContain("nairobi");
      expect(slugs.length).toBe(1);
    });

    it("Nairobi names industrial estates", () => {
      const nairobi = LOCATIONS.find((l) => l.slug === "nairobi");
      expect(nairobi?.industrialEstates).toBeDefined();
      expect(nairobi?.industrialEstates?.length).toBeGreaterThanOrEqual(5);
      expect(nairobi?.industrialEstates).toContain("Athi River");
    });

    it("does NOT include East African neighbors or other Kenyan cities", () => {
      const slugs = LOCATIONS.map((l) => l.slug);
      expect(slugs).not.toContain("uganda");
      expect(slugs).not.toContain("tanzania");
      expect(slugs).not.toContain("ethiopia");
      expect(slugs).not.toContain("mombasa");
      expect(slugs).not.toContain("kisumu");
    });
  });

  describe("CASE_STUDIES", () => {
    it("Crywan case study exists and is published", () => {
      const crywan = CASE_STUDIES.find(
        (c) => c.slug === "crywan-industries-kenya",
      );
      expect(crywan).toBeDefined();
      expect(crywan?.published).toBe(true);
      expect(crywan?.country).toBe("Kenya");
    });

    it("each case study references valid product slugs", () => {
      const productSlugs = new Set(PRODUCTS.map((p) => p.slug));
      for (const c of CASE_STUDIES) {
        for (const slug of c.productsInstalled) {
          expect(productSlugs.has(slug)).toBe(true);
        }
      }
    });
  });

  describe("programmatic SEO arrays", () => {
    it("COMPARE_PAGES includes the load-bearing zinc-alum vs carbon-steel", () => {
      const found = COMPARE_PAGES.find(
        (c) => c.a === "zinc-alum" && c.b === "carbon-steel",
      );
      expect(found).toBeDefined();
    });

    it("BEST_PAGES are hand-curated (not combinatorial — bounded count)", () => {
      expect(BEST_PAGES.length).toBeLessThanOrEqual(30);
      expect(BEST_PAGES.length).toBeGreaterThan(0);
    });

    it("COST_PAGES are hand-curated", () => {
      expect(COST_PAGES.length).toBeLessThanOrEqual(30);
      expect(COST_PAGES.length).toBeGreaterThan(0);
    });
  });
});
