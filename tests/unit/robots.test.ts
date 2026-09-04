import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("robots metadata", () => {
  it("keeps non-public routes out of every crawler-specific rule", () => {
    const rules = robots().rules;

    expect(Array.isArray(rules)).toBe(true);
    for (const rule of Array.isArray(rules) ? rules : [rules]) {
      expect(rule.allow).toBe("/");
      expect(rule.disallow).toEqual(expect.arrayContaining(["/admin/", "/api/", "/thank-you/"]));
    }
  });
});
