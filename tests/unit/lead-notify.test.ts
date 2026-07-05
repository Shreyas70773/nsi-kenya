import { describe, it, expect } from "vitest";
import { resolveLeadRecipients } from "@/lib/email";

describe("resolveLeadRecipients (GC-9)", () => {
  it("falls back to CONTACT_EMAIL when nothing configured", () => {
    expect(resolveLeadRecipients({}, "info@northstarimpex.co.ke")).toEqual([
      "info@northstarimpex.co.ke",
    ]);
  });

  it("uses the legacy QUOTE_NOTIFICATION_EMAIL when the list is unset", () => {
    expect(
      resolveLeadRecipients(
        { QUOTE_NOTIFICATION_EMAIL: "sales@x.co.ke" },
        "info@northstarimpex.co.ke",
      ),
    ).toEqual(["sales@x.co.ke"]);
  });

  it("parses the comma list, trims whitespace, drops empties", () => {
    expect(
      resolveLeadRecipients(
        { LEAD_NOTIFICATION_EMAILS: " a@x.com , b@y.com ,, " },
        "info@northstarimpex.co.ke",
      ),
    ).toEqual(["a@x.com", "b@y.com"]);
  });

  it("dedups case-insensitively, keeping first occurrence order", () => {
    expect(
      resolveLeadRecipients(
        { LEAD_NOTIFICATION_EMAILS: "a@x.com,B@y.com,A@X.com" },
        "info@northstarimpex.co.ke",
      ),
    ).toEqual(["a@x.com", "B@y.com"]);
  });

  it("list takes precedence over the legacy single address", () => {
    expect(
      resolveLeadRecipients(
        {
          LEAD_NOTIFICATION_EMAILS: "a@x.com",
          QUOTE_NOTIFICATION_EMAIL: "legacy@x.com",
        },
        "info@northstarimpex.co.ke",
      ),
    ).toEqual(["a@x.com"]);
  });
});
