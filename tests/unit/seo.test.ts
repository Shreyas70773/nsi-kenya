import { describe, it, expect } from "vitest";
import {
  organizationLd,
  webSiteLd,
  localBusinessLd,
  serviceLd,
  productLd,
  articleLd,
  breadcrumbLd,
  faqLd,
  softwareApplicationLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

describe("JSON-LD generators", () => {
  describe("organizationLd", () => {
    const ld = organizationLd();

    it("has @type Organization and the site name", () => {
      expect(ld["@type"]).toBe("Organization");
      expect(ld.name).toContain("North Star");
    });

    it("addressCountry is KE", () => {
      expect(ld.address.addressCountry).toBe("KE");
    });

    it("contactPoint serves East African countries", () => {
      expect(ld.contactPoint.areaServed).toContain("KE");
      expect(ld.contactPoint.areaServed).toContain("UG");
      expect(ld.contactPoint.areaServed).toContain("TZ");
    });
  });

  describe("webSiteLd", () => {
    const ld = webSiteLd();

    it("has @type WebSite with SearchAction", () => {
      expect(ld["@type"]).toBe("WebSite");
      expect(ld.potentialAction["@type"]).toBe("SearchAction");
    });

    it("SearchAction target uses {search_term_string}", () => {
      expect(ld.potentialAction.target).toContain("{search_term_string}");
    });
  });

  describe("localBusinessLd", () => {
    const ld = localBusinessLd({
      slug: "nairobi",
      name: "Nairobi",
      country: "Kenya",
    });

    it("has @type LocalBusiness", () => {
      expect(ld["@type"]).toBe("LocalBusiness");
    });

    it("addressLocality matches the city", () => {
      expect(ld.address.addressLocality).toBe("Nairobi");
    });

    it("areaServed includes the city", () => {
      expect(ld.areaServed).toContain("Nairobi");
    });
  });

  describe("serviceLd", () => {
    const ld = serviceLd({
      slug: "etp-water-treatment",
      name: "ETP & Water Treatment",
    });

    it("has @type Service with serviceType and provider", () => {
      expect(ld["@type"]).toBe("Service");
      expect(ld.serviceType).toBe("ETP & Water Treatment");
      expect(ld.provider["@type"]).toBe("Organization");
    });
  });

  describe("productLd", () => {
    const ld = productLd({
      name: "Stainless Steel Tank",
      material: "Stainless Steel 304",
      category: "Industrial Tank",
      description: "Food-grade stainless steel storage tank.",
    });

    it("has @type Product with manufacturer Organization", () => {
      expect(ld["@type"]).toBe("Product");
      expect(ld.manufacturer["@type"]).toBe("Organization");
    });

    it("preserves the material claim", () => {
      expect(ld.material).toContain("Stainless Steel");
    });

    it("preserves category and description", () => {
      expect(ld.category).toBe("Industrial Tank");
      expect(ld.description).toContain("Food-grade");
    });
  });

  describe("articleLd", () => {
    const ld = articleLd({
      headline: "Zinc-Alum vs Carbon Steel",
      datePublished: "2026-05-25",
      url: `${SITE_URL}/compare/zinc-alum-vs-carbon-steel/`,
    });

    it("has @type Article with publisher Organization", () => {
      expect(ld["@type"]).toBe("Article");
      expect(ld.publisher["@type"]).toBe("Organization");
    });
  });

  describe("breadcrumbLd", () => {
    const ld = breadcrumbLd([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Products", url: `${SITE_URL}/products/` },
      { name: "Tanks", url: `${SITE_URL}/products/tanks/stainless-steel/` },
    ]);

    it("produces an ordered ItemList", () => {
      expect(ld.itemListElement).toHaveLength(3);
      expect(ld.itemListElement[0]?.position).toBe(1);
      expect(ld.itemListElement[2]?.position).toBe(3);
    });
  });

  describe("faqLd", () => {
    const ld = faqLd([
      {
        question: "Have you done this in Kenya?",
        answer: "Yes; most installs are behind customer NDAs.",
      },
    ]);

    it("has @type FAQPage with Question items", () => {
      expect(ld["@type"]).toBe("FAQPage");
      expect(ld.mainEntity[0]?.["@type"]).toBe("Question");
      expect(ld.mainEntity[0]?.acceptedAnswer["@type"]).toBe("Answer");
    });
  });

  describe("softwareApplicationLd", () => {
    const ld = softwareApplicationLd();

    it("has @type SoftwareApplication for the IoT product", () => {
      expect(ld["@type"]).toBe("SoftwareApplication");
      expect(ld.applicationCategory).toBeTruthy();
    });
  });
});
