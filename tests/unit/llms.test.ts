import { describe, it, expect } from "vitest";
import { generateLlmsTxt, generateLlmsFullTxt } from "@/lib/llms";

describe("llms.txt", () => {
  const txt = generateLlmsTxt();

  it("contains the site name", () => {
    expect(txt).toContain("North Star Impex Kenya");
  });

  it("mentions Kenya in the project description", () => {
    expect(txt).toContain("Kenya");
  });

  it("lists primary product categories", () => {
    expect(txt).toContain("Stainless Steel Tanks");
    expect(txt).toContain("Zinc-Alum Tanks");
    expect(txt).toContain("Grain Storage Silos");
  });

  it("lists Crywan as the reference client", () => {
    expect(txt).toContain("Crywan Industries");
  });

  it("references /talk-to-a-customer/ trust gate", () => {
    expect(txt).toContain("/talk-to-a-customer/");
  });

  it("uses llmstxt.org standard top-level H1", () => {
    const firstLine = txt.split("\n")[0];
    expect(firstLine).toMatch(/^# /);
  });
});

describe("llms-full.txt", () => {
  const full = generateLlmsFullTxt();
  const txt = generateLlmsTxt();

  it("is strictly longer than llms.txt", () => {
    expect(full.length).toBeGreaterThan(txt.length);
  });

  it("contains industry context", () => {
    expect(full).toContain("Food & Beverage");
    expect(full).toContain("ETP");
  });

  it("contains the Crywan case study reference", () => {
    expect(full).toContain("Crywan");
  });

  it("mentions NEMA / EMCA CAP 387 (ETP compliance signal)", () => {
    expect(full).toMatch(/NEMA|EMCA/);
  });

  it("mentions Safaricom NB-IoT (IoT connectivity signal)", () => {
    expect(full).toContain("Safaricom NB-IoT");
  });
});
