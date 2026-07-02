"use client";

import { useEffect, useRef } from "react";
import { getAttribution, type Attribution } from "@/lib/attribution";

const FIELD_MAP: ReadonlyArray<[name: string, key: keyof Attribution]> = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["gclid", "gclid"],
  ["fbclid", "fbclid"],
  ["landing_page", "landingPage"],
  ["referrer", "referrer"],
  ["source_code", "sourceCode"],
];

/**
 * Hidden attribution inputs (GC-8) — snake_case wire names per the brief.
 * Uncontrolled: SSR renders them empty (stable markup regardless of the
 * visitor's localStorage) and the effect writes the stored first-touch
 * values straight into the DOM after mount.
 */
export function AttributionFields() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const populate = () => {
      const attribution = getAttribution();
      for (const [name, key] of FIELD_MAP) {
        const input = host.querySelector<HTMLInputElement>(
          `input[name="${name}"]`,
        );
        if (input) input.value = attribution[key] ?? "";
      }
    };
    populate();
    // React 19 resets uncontrolled fields after every action dispatch, so a
    // submission retried after a validation error would otherwise carry
    // blank attribution. Re-populate right before FormData is read (capture
    // runs ahead of React's submit handling) and again after any reset.
    const form = host.closest("form");
    const onReset = () => setTimeout(populate, 0);
    form?.addEventListener("submit", populate, true);
    form?.addEventListener("reset", onReset);
    return () => {
      form?.removeEventListener("submit", populate, true);
      form?.removeEventListener("reset", onReset);
    };
  }, []);

  return (
    <div ref={hostRef} hidden aria-hidden>
      {FIELD_MAP.map(([name]) => (
        <input key={name} type="hidden" name={name} defaultValue="" />
      ))}
    </div>
  );
}
