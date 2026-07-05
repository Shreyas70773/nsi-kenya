import { describe, it, expect, beforeEach } from "vitest";
import {
  parseAttributionParams,
  captureAttribution,
  getAttribution,
  ATTRIBUTION_TTL_MS,
} from "@/lib/attribution";

const NOW = 1_750_000_000_000;

describe("parseAttributionParams", () => {
  it("extracts utm params, click ids, and source_code", () => {
    expect(
      parseAttributionParams(
        "?utm_source=google&utm_medium=cpc&utm_campaign=watertech&utm_content=adA&gclid=g123&fbclid=f456&source_code=WEB-ETP",
      ),
    ).toEqual({
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "watertech",
      utmContent: "adA",
      gclid: "g123",
      fbclid: "f456",
      sourceCode: "WEB-ETP",
    });
  });

  it("omits absent and empty params", () => {
    expect(parseAttributionParams("?utm_source=&gclid=g1")).toEqual({
      gclid: "g1",
    });
    expect(parseAttributionParams("")).toEqual({});
  });
});

describe("captureAttribution / getAttribution (first-touch, 30-day TTL)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("records first touch with landing page and referrer", () => {
    captureAttribution(
      "?utm_source=google&utm_medium=cpc",
      "/industries/etp-water-treatment/",
      "https://www.google.com/",
      NOW,
    );
    expect(getAttribution()).toEqual({
      utmSource: "google",
      utmMedium: "cpc",
      landingPage: "/industries/etp-water-treatment/",
      referrer: "https://www.google.com/",
    });
  });

  it("keeps the first touch when a later visit carries new params", () => {
    captureAttribution("?utm_source=google", "/", "", NOW);
    captureAttribution(
      "?utm_source=facebook&fbclid=f9",
      "/products/",
      "https://facebook.com/",
      NOW + 1000,
    );
    expect(getAttribution().utmSource).toBe("google");
    expect(getAttribution().landingPage).toBe("/");
    expect(getAttribution().fbclid).toBeUndefined();
  });

  it("a plain internal navigation never overwrites (no params, no referrer)", () => {
    captureAttribution("?gclid=g1", "/", "https://google.com", NOW);
    captureAttribution("", "/contact/", "", NOW + 5000);
    expect(getAttribution().gclid).toBe("g1");
  });

  it("overwrites after the TTL expires", () => {
    captureAttribution("?utm_source=google", "/", "", NOW);
    captureAttribution(
      "?utm_source=linkedin",
      "/about/",
      "",
      NOW + ATTRIBUTION_TTL_MS + 1,
    );
    expect(getAttribution().utmSource).toBe("linkedin");
    expect(getAttribution().landingPage).toBe("/about/");
  });

  it("records an organic first touch (referrer only, no params)", () => {
    captureAttribution("", "/blog/some-post/", "https://duckduckgo.com/", NOW);
    expect(getAttribution()).toEqual({
      landingPage: "/blog/some-post/",
      referrer: "https://duckduckgo.com/",
    });
  });

  it("getAttribution returns {} when nothing stored or storage corrupt", () => {
    expect(getAttribution()).toEqual({});
    localStorage.setItem("ns-attribution", "{corrupt");
    expect(getAttribution()).toEqual({});
  });
});
