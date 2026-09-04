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

  it("accepts a Kenyan number without the leading zero", () => {
    expect(normalizeKenyanPhone("712345678")).toBe("+254712345678");
  });

  it("tolerates spaces, dashes, parens, dots", () => {
    expect(normalizeKenyanPhone("0712 345 678")).toBe("+254712345678");
    expect(normalizeKenyanPhone("+254 712-345-678")).toBe("+254712345678");
    expect(normalizeKenyanPhone("(0712) 345.678")).toBe("+254712345678");
  });

  it("accepts local and regional business numbers without guessing a country", () => {
    expect(normalizeKenyanPhone("020 123 4567")).toBe("0201234567");
    expect(normalizeKenyanPhone("024 412 3456")).toBe("0244123456");
    expect(normalizeKenyanPhone("050 123 4567")).toBe("0501234567");
    expect(normalizeKenyanPhone("12345678")).toBe("12345678");
  });

  it("accepts 00-prefixed international numbers", () => {
    expect(normalizeKenyanPhone("00 44 20 7946 0958")).toBe(
      "+442079460958",
    );
  });

  it("rejects fewer than 7 digits", () => {
    expect(normalizeKenyanPhone("07123")).toBeNull();
  });

  it("rejects letters and excessive digit counts", () => {
    expect(normalizeKenyanPhone("abc")).toBeNull();
    expect(normalizeKenyanPhone("0712 CALL ME")).toBeNull();
    expect(normalizeKenyanPhone("1234567890123456")).toBeNull();
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
    const result = phoneSchema.safeParse("12345");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain(
        "Enter a phone number with at least 7 digits",
      );
    }
  });
});
