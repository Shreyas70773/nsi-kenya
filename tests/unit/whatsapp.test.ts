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
  it("uses the canonical number and the encoded quote message with [CODE]", () => {
    expect(waLink("WEB-QUOTE")).toBe(
      "https://wa.me/254718727334?text=Hello%2C%20I%20would%20like%20a%2048-hour%20quotation.%20My%20requirement%3A%20%5BWEB-QUOTE%5D",
    );
  });

  it("encodes the ETP message's forward slash", () => {
    expect(waLink("WEB-ETP")).toBe(
      "https://wa.me/254718727334?text=Hello%2C%20I%20have%20a%20water%2Feffluent%20treatment%20enquiry.%20%5BWEB-ETP%5D",
    );
  });

  it("home message greets with the brand name", () => {
    expect(waMessage("WEB-HOME")).toBe(
      "Hello North Star Impex, I have an enquiry. [WEB-HOME]",
    );
  });

  it("every code's message contains its own [CODE] token", () => {
    for (const code of [
      "WEB-HOME",
      "WEB-QUOTE",
      "WEB-AUDIT",
      "WEB-CONSULT",
      "WEB-ETP",
      "WEB-SECTOR",
    ] as const) {
      expect(waMessage(code)).toContain(`[${code}]`);
      expect(waLink(code)).toContain(encodeURIComponent(`[${code}]`));
    }
  });
});
