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

  it("uses the 'Built in East Africa for Kenya' positioning", () => {
    expect(txt).toContain("East Africa");
    expect(txt).toContain("Kenya");
  });

  it("does NOT name customer references (NDA)", () => {
    expect(txt).not.toMatch(/Crywan/i);
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

  it("does NOT name customer references (NDA)", () => {
    expect(full).not.toMatch(/Crywan/i);
  });

  it("carries an ETP compliance signal (Kenyan environmental regulations)", () => {
    expect(full).toMatch(/Kenyan environmental|water-quality|water quality/i);
  });

  it("carries an IoT connectivity signal (NB-IoT)", () => {
    expect(full).toContain("NB-IoT");
  });
});
