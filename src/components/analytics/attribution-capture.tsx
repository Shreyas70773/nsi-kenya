"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

/**
 * Runs the first-touch capture on landing and on every client-side route
 * change (a campaign link can deep-link to any page). captureAttribution
 * itself refuses to overwrite a fresh record, so this is idempotent.
 */
export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution(
      window.location.search,
      pathname ?? window.location.pathname,
      document.referrer,
      Date.now(),
    );
  }, [pathname]);

  return null;
}
