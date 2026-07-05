import { describe, it, expect } from "vitest";
import { normalizeKenyanPhone, phoneSchema } from "@/lib/validation/phone";

describe("normalizeKenyanPhone (F-1)", () => {
  it("accepts 07XXXXXXXX and normalizes to +254", () => {
    expect(normalizeKenyanPhone("0712345678")).toBe("+254712345678");
  });

  it("accepts 01XXXXXXXX (Safaricom 01 ranges)", () => {
    expect(normalizeKenyanPhone("0112345678")).toBe("+254112345678");
  });

  it("accepts +2547XXXXXXXX", () => {
    expect(normalizeKenyanPhone("+254712345678")).toBe("+254712345678");
  });

  it("accepts 254 without plus", () => {
    expect(normalizeKenyanPhone("254712345678")).toBe("+254712345678");
  });

  it("tolerates spaces, dashes, parens, dots", () => {
    expect(normalizeKenyanPhone("0712 345 678")).toBe("+254712345678");
    expect(normalizeKenyanPhone("+254 712-345-678")).toBe("+254712345678");
    expect(normalizeKenyanPhone("(0712) 345.678")).toBe("+254712345678");
  });

  it("rejects fewer than 9 digits (brief acceptance case)", () => {
    expect(normalizeKenyanPhone("12345678")).toBeNull();
    expect(normalizeKenyanPhone("07123")).toBeNull();
  });

  it("rejects malformed Kenyan prefixes and junk", () => {
    expect(normalizeKenyanPhone("0812345678")).toBeNull(); // 08 is not a Kenyan mobile range
    expect(normalizeKenyanPhone("071234567")).toBeNull(); // 9-digit 07 (one short)
    expect(normalizeKenyanPhone("07123456789")).toBeNull(); // one long
    expect(normalizeKenyanPhone("abc")).toBeNull();
    expect(normalizeKenyanPhone("")).toBeNull();
  });

  it("passes through non-Kenyan international numbers with +", () => {
    expect(normalizeKenyanPhone("+14155552671")).toBe("+14155552671");
    expect(normalizeKenyanPhone("+441onetwo")).toBeNull();
  });
});

describe("phoneSchema", () => {
  it("parses and normalizes a valid phone", () => {
    expect(phoneSchema.parse("0712 345 678")).toBe("+254712345678");
  });

  it("fails with the friendly message on invalid input", () => {
    const result = phoneSchema.safeParse("12345678");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain(
        "Enter a valid phone number",
      );
    }
  });
});
