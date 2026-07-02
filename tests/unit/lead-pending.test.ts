import { describe, it, expect, beforeEach } from "vitest";
import { markLeadPending, consumeLeadPending } from "@/lib/lead-pending";
import sitemap from "@/app/sitemap";

describe("lead-pending token (exactly-once generate_lead)", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("consume after mark returns true exactly once", () => {
    markLeadPending("quote");
    expect(consumeLeadPending("quote")).toBe(true);
    expect(consumeLeadPending("quote")).toBe(false);
  });

  it("consume without mark returns false (direct visits never fire)", () => {
    expect(consumeLeadPending("site_audit")).toBe(false);
  });

  it("journeys are independent", () => {
    markLeadPending("consultation");
    expect(consumeLeadPending("quote")).toBe(false);
    expect(consumeLeadPending("consultation")).toBe(true);
  });
});

describe("thank-you pages stay out of the sitemap (GC-7)", () => {
  it("emits no /thank-you/ URLs", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.length).toBeGreaterThan(0);
    expect(urls.some((u) => u.includes("/thank-you/"))).toBe(false);
  });
});
