import { describe, it, expect } from "vitest";
import {
  QUOTE_SCHEMA,
  INQUIRY_SCHEMA,
  PRODUCT_GROUP_VALUES,
} from "@/lib/validation/lead-schemas";

const BASE_QUOTE = {
  intent: "explore",
  name: "Jane",
  company: "Acme Water",
  phone: "0712345678",
  email: "",
  industry: "etp-water-treatment",
  productSlugs: ["tanks"],
  capacity: "",
  message: "",
};

const BASE_INQUIRY = {
  kind: "consultation",
  name: "Jane",
  company: "Acme Water",
  phone: "0712345678",
  email: "",
  industry: "etp-water-treatment",
  siteLocation: "",
  topic: "ETP retrofit scoping",
  capacity: "",
  message: "",
};

describe("QUOTE_SCHEMA (F-2/F-3)", () => {
  it("accepts a minimal valid submission (5 required fields)", () => {
    expect(QUOTE_SCHEMA.safeParse(BASE_QUOTE).success).toBe(true);
  });

  it("requires at least one requirement group", () => {
    const r = QUOTE_SCHEMA.safeParse({ ...BASE_QUOTE, productSlugs: [] });
    expect(r.success).toBe(false);
  });

  it("accepts the not-sure escape hatch", () => {
    expect(
      QUOTE_SCHEMA.safeParse({ ...BASE_QUOTE, productSlugs: ["not-sure"] })
        .success,
    ).toBe(true);
  });

  it("rejects legacy 13-option slugs", () => {
    expect(
      QUOTE_SCHEMA.safeParse({
        ...BASE_QUOTE,
        productSlugs: ["tanks/stainless-steel"],
      }).success,
    ).toBe(false);
  });

  it("requires sector", () => {
    expect(
      QUOTE_SCHEMA.safeParse({ ...BASE_QUOTE, industry: "" }).success,
    ).toBe(false);
  });

  it("capacity is optional but bounded", () => {
    expect(
      QUOTE_SCHEMA.safeParse({ ...BASE_QUOTE, capacity: "10–100 m³" }).success,
    ).toBe(true);
  });

  it("exposes exactly the six grouped values", () => {
    expect(PRODUCT_GROUP_VALUES).toEqual([
      "tanks",
      "silos",
      "structural-fabrication",
      "process-instrumentation",
      "remote-monitoring",
      "not-sure",
    ]);
  });
});

describe("INQUIRY_SCHEMA (F-3, requirement = topic)", () => {
  it("accepts a valid consultation", () => {
    expect(INQUIRY_SCHEMA.safeParse(BASE_INQUIRY).success).toBe(true);
  });

  it("requires topic for consultation and site-audit", () => {
    for (const kind of ["consultation", "site-audit"]) {
      const r = INQUIRY_SCHEMA.safeParse({ ...BASE_INQUIRY, kind, topic: "" });
      expect(r.success).toBe(false);
    }
  });

  it("topic stays optional for plain contact", () => {
    expect(
      INQUIRY_SCHEMA.safeParse({ ...BASE_INQUIRY, kind: "contact", topic: "" })
        .success,
    ).toBe(true);
  });

  it("requires sector on every journey", () => {
    expect(
      INQUIRY_SCHEMA.safeParse({ ...BASE_INQUIRY, industry: "" }).success,
    ).toBe(false);
  });
});
