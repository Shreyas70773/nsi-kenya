"use client";

import { useEffect, useState } from "react";
import { getAttribution, type Attribution } from "@/lib/attribution";

/**
 * Hidden attribution inputs (GC-8) — snake_case wire names per the brief.
 * Hydrated after mount so SSR markup stays stable regardless of what the
 * visitor's localStorage holds.
 */
export function AttributionFields() {
  const [attribution, setAttribution] = useState<Attribution>({});

  useEffect(() => {
    setAttribution(getAttribution());
  }, []);

  return (
    <>
      <input type="hidden" name="utm_source" value={attribution.utmSource ?? ""} />
      <input type="hidden" name="utm_medium" value={attribution.utmMedium ?? ""} />
      <input
        type="hidden"
        name="utm_campaign"
        value={attribution.utmCampaign ?? ""}
      />
      <input
        type="hidden"
        name="utm_content"
        value={attribution.utmContent ?? ""}
      />
      <input type="hidden" name="gclid" value={attribution.gclid ?? ""} />
      <input type="hidden" name="fbclid" value={attribution.fbclid ?? ""} />
      <input
        type="hidden"
        name="landing_page"
        value={attribution.landingPage ?? ""}
      />
      <input type="hidden" name="referrer" value={attribution.referrer ?? ""} />
      <input
        type="hidden"
        name="source_code"
        value={attribution.sourceCode ?? ""}
      />
    </>
  );
}
