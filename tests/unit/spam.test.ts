import { describe, it, expect } from "vitest";
import { isSpam, MIN_FILL_MS } from "@/lib/validation/spam";

const NOW = 1_750_000_000_000;

describe("isSpam (F-7 honeypot + fill-time gate)", () => {
  it("flags a filled honeypot", () => {
    expect(
      isSpam({ honeypot: "http://spam.example", renderedAt: NOW - 60_000, now: NOW }),
    ).toBe(true);
  });

  it("flags an instant submit (bot fills faster than a human)", () => {
    expect(isSpam({ honeypot: "", renderedAt: NOW - 1000, now: NOW })).toBe(
      true,
    );
    expect(MIN_FILL_MS).toBeGreaterThanOrEqual(3000);
  });

  it("passes a normal submission", () => {
    expect(isSpam({ honeypot: "", renderedAt: NOW - 45_000, now: NOW })).toBe(
      false,
    );
  });

  it("passes when the timestamp is missing or garbage (never block real leads)", () => {
    expect(isSpam({ honeypot: "", renderedAt: Number.NaN, now: NOW })).toBe(
      false,
    );
    expect(isSpam({ honeypot: "", renderedAt: 0, now: NOW })).toBe(false);
  });
});
