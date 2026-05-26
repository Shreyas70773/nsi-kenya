/**
 * Tests for the ADMIN_EMAIL_ALLOWLIST parser. The parser lives inline in
 * src/lib/auth.ts so we duplicate its body here behind an isolated module
 * boundary — re-importing src/lib/auth.ts would trigger NextAuth init.
 */
import { describe, it, expect, afterEach } from "vitest";

function isEmailAllowed(email: string): boolean {
  const raw = process.env.ADMIN_EMAIL_ALLOWLIST?.trim();
  if (!raw) return true;
  const lower = email.toLowerCase();
  const domain = lower.split("@")[1] ?? "";
  const entries = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  for (const entry of entries) {
    if (entry.includes("@")) {
      if (entry === lower) return true;
    } else {
      if (entry === domain) return true;
    }
  }
  return false;
}

const ORIGINAL = process.env.ADMIN_EMAIL_ALLOWLIST;

afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.ADMIN_EMAIL_ALLOWLIST;
  else process.env.ADMIN_EMAIL_ALLOWLIST = ORIGINAL;
});

describe("ADMIN_EMAIL_ALLOWLIST", () => {
  it("allows everything when the env var is unset", () => {
    delete process.env.ADMIN_EMAIL_ALLOWLIST;
    expect(isEmailAllowed("anyone@anywhere.com")).toBe(true);
  });

  it("allows everything when the env var is empty", () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = "";
    expect(isEmailAllowed("anyone@anywhere.com")).toBe(true);
  });

  it("matches a bare domain entry against the email's domain", () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = "northstarimpex.co.ke,pacificunity.ae";
    expect(isEmailAllowed("info@northstarimpex.co.ke")).toBe(true);
    expect(isEmailAllowed("anyone@pacificunity.ae")).toBe(true);
    expect(isEmailAllowed("scammer@example.com")).toBe(false);
  });

  it("matches a full-email entry exactly", () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = "ceo@anywhere.com";
    expect(isEmailAllowed("ceo@anywhere.com")).toBe(true);
    expect(isEmailAllowed("intern@anywhere.com")).toBe(false);
  });

  it("is case-insensitive on both sides", () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = "NorthStarImpex.CO.KE";
    expect(isEmailAllowed("INFO@northstarimpex.co.ke")).toBe(true);
    expect(isEmailAllowed("info@NORTHSTARIMPEX.CO.KE")).toBe(true);
  });

  it("mixes full emails and bare domains", () => {
    process.env.ADMIN_EMAIL_ALLOWLIST =
      "ceo@stelastra.com,northstarimpex.co.ke,nsisg.com";
    expect(isEmailAllowed("ceo@stelastra.com")).toBe(true);
    expect(isEmailAllowed("intern@stelastra.com")).toBe(false);
    expect(isEmailAllowed("anyone@northstarimpex.co.ke")).toBe(true);
    expect(isEmailAllowed("anyone@nsisg.com")).toBe(true);
  });

  it("ignores blank entries between commas", () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = "northstarimpex.co.ke, , ,nsisg.com,";
    expect(isEmailAllowed("a@northstarimpex.co.ke")).toBe(true);
    expect(isEmailAllowed("a@nsisg.com")).toBe(true);
    expect(isEmailAllowed("a@other.com")).toBe(false);
  });
});
