import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { buildEvent, pushEvent } from "@/lib/analytics";

type DataLayerWindow = { dataLayer?: Record<string, unknown>[] };

describe("analytics dataLayer", () => {
  const g = globalThis as unknown as { window?: DataLayerWindow };
  let hadWindow: boolean;
  let savedWindow: DataLayerWindow | undefined;

  beforeEach(() => {
    hadWindow = "window" in globalThis;
    savedWindow = g.window;
  });

  afterEach(() => {
    if (hadWindow) g.window = savedWindow;
    else delete g.window;
  });

  it("buildEvent shapes GTM payloads with the event name first-class", () => {
    expect(
      buildEvent("whatsapp_click", { source_code: "WEB-HOME", page_path: "/" }),
    ).toEqual({
      event: "whatsapp_click",
      source_code: "WEB-HOME",
      page_path: "/",
    });
  });

  it("buildEvent works without params", () => {
    expect(buildEvent("booking_confirmed")).toEqual({
      event: "booking_confirmed",
    });
  });

  it("pushEvent is a no-op without a window (SSR-safe)", () => {
    delete g.window;
    expect(() => pushEvent("call_click", { page_path: "/x" })).not.toThrow();
  });

  it("pushEvent appends to window.dataLayer, creating it when absent", () => {
    g.window = {};
    pushEvent("generate_lead", { journey: "quote" });
    pushEvent("generate_lead", { journey: "site_audit", source_code: "WEB-AUDIT" });
    expect(g.window.dataLayer).toEqual([
      { event: "generate_lead", journey: "quote" },
      {
        event: "generate_lead",
        journey: "site_audit",
        source_code: "WEB-AUDIT",
      },
    ]);
  });
});
