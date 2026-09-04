import { describe, it, expect } from "vitest";
import { codeForPath, waLink, waMessage } from "@/lib/whatsapp";

describe("codeForPath — per-page WhatsApp source codes (brief §6)", () => {
  const cases: Array<[string, string]> = [
    ["/", "WEB-HOME"],
    ["/about/", "WEB-HOME"],
    ["/contact/", "WEB-HOME"],
    ["/industries/", "WEB-HOME"],
    ["/request-quote/", "WEB-QUOTE"],
    ["/request-quote/urgent-etp/", "WEB-QUOTE"],
    ["/thank-you/quote/", "WEB-QUOTE"],
    ["/request-site-audit/", "WEB-AUDIT"],
    ["/thank-you/site-audit/", "WEB-AUDIT"],
    ["/book-consultation/", "WEB-CONSULT"],
    ["/thank-you/consultation/", "WEB-CONSULT"],
    ["/industries/etp-water-treatment/", "WEB-ETP"],
    ["/industries/etp-water-treatment/discharge/", "WEB-ETP"],
    ["/industries/food-and-beverage/", "WEB-SECTOR"],
    ["/industries/chemical-processing/", "WEB-SECTOR"],
    ["/products/tanks/stainless-steel/", "WEB-SECTOR"],
    ["/products/iot/", "WEB-SECTOR"],
    // Without trailing slash — must behave identically.
    ["/request-quote", "WEB-QUOTE"],
    ["/industries/etp-water-treatment", "WEB-ETP"],
  ];

  it.each(cases)("%s → %s", (path, code) => {
    expect(codeForPath(path)).toBe(code);
  });
});

describe("waLink — exact wa.me deep links", () => {
  it("uses the canonical number and a customer-friendly quote message", () => {
    const url = new URL(waLink("WEB-QUOTE"));

    expect(`${url.origin}${url.pathname}`).toBe("https://wa.me/254718727334");
    expect(url.searchParams.get("text")).toBe(
      "Hello North Star Impex, I'd like to request a quotation.\n\nMy requirements are:",
    );
  });

  it("preserves the ETP message in the encoded link", () => {
    const url = new URL(waLink("WEB-ETP"));

    expect(url.searchParams.get("text")).toBe(
      "Hello North Star Impex, I have a water or effluent treatment enquiry.",
    );
  });

  it("home message greets with the brand name", () => {
    expect(waMessage("WEB-HOME")).toBe(
      "Hello North Star Impex, I'd like to discuss an industrial project.",
    );
  });

  it("never exposes internal source codes in customer messages", () => {
    for (const code of [
      "WEB-HOME",
      "WEB-QUOTE",
      "WEB-AUDIT",
      "WEB-CONSULT",
      "WEB-ETP",
      "WEB-SECTOR",
    ] as const) {
      expect(waMessage(code)).not.toContain("[WEB-");
      expect(waLink(code)).not.toContain("%5BWEB-");
    }
  });
});
