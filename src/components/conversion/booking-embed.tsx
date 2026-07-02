"use client";

import { useEffect } from "react";
import { trackBookingConfirmed } from "@/lib/analytics";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

/**
 * F-6: scheduling widget under the site-audit form. Renders nothing until
 * NEXT_PUBLIC_BOOKING_URL is set (NSI supplies the Zoho Bookings/Calendly
 * account). A confirmed booking pushes booking_confirmed to the dataLayer —
 * Calendly and Zoho both postMessage from the iframe on completion.
 */
export function BookingEmbed() {
  useEffect(() => {
    if (!BOOKING_URL) return;
    const onMessage = (e: MessageEvent) => {
      const data = e.data as
        | { event?: string; eventName?: string }
        | undefined;
      const name = data?.event ?? data?.eventName ?? "";
      if (
        name === "calendly.event_scheduled" || // Calendly
        name === "bookingcompleted" // Zoho Bookings
      ) {
        trackBookingConfirmed();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!BOOKING_URL) return null;

  return (
    <section aria-label="Book a time" className="mt-14 flex flex-col gap-5">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        Prefer to pick a time now?
      </h2>
      <div className="overflow-hidden rounded-card border border-border/15 bg-surface">
        <iframe
          src={BOOKING_URL}
          title="Book a site audit time"
          className="h-[720px] w-full"
          loading="lazy"
        />
      </div>
    </section>
  );
}
