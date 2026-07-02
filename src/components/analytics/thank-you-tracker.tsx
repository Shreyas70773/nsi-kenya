"use client";

import { useEffect } from "react";
import { trackLead, type LeadJourney } from "@/lib/analytics";
import { consumeLeadPending } from "@/lib/lead-pending";

/**
 * Fires generate_lead {journey} exactly once per real submission (GC-5/7).
 * The thank-you URLs double as the Meta Lead trigger inside GTM, so this
 * event and the page path must stay in lockstep.
 */
export function ThankYouTracker({ journey }: { journey: LeadJourney }) {
  useEffect(() => {
    if (consumeLeadPending(journey)) {
      trackLead(journey);
    }
  }, [journey]);

  return null;
}
