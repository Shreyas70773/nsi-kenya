/**
 * Typed dataLayer interface for the single GTM container (GC-4/5/6).
 *
 * Event names are the contract with the GTM workspace AND the future
 * Conversions API (brief: "structure the GTM setup so events are named
 * consistently now") — do not rename without updating the container:
 *   generate_lead { journey, source_code? }
 *   whatsapp_click { source_code, page_path }
 *   call_click { page_path }
 *   booking_confirmed {}
 *   view_content { content_name, content_type }   → Meta ViewContent
 *   page_view { page_path }                        → SPA route changes
 *
 * GA4/Meta tags live inside the container; this module never talks to
 * vendors directly. Every helper is SSR-safe and a silent no-op when the
 * container is absent — analytics must never break the page.
 */

export type LeadJourney = "quote" | "consultation" | "site_audit" | "contact";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function buildEvent(
  name: string,
  params?: Record<string, unknown>,
): Record<string, unknown> {
  return { event: name, ...params };
}

export function pushEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(buildEvent(name, params));
}

export function trackLead(journey: LeadJourney, sourceCode?: string): void {
  pushEvent("generate_lead", {
    journey,
    ...(sourceCode ? { source_code: sourceCode } : {}),
  });
}

export function trackWhatsAppClick(
  sourceCode: string,
  pagePath: string,
): void {
  pushEvent("whatsapp_click", { source_code: sourceCode, page_path: pagePath });
}

export function trackCallClick(pagePath: string): void {
  pushEvent("call_click", { page_path: pagePath });
}

export function trackBookingConfirmed(): void {
  pushEvent("booking_confirmed");
}

export function trackViewContent(
  contentName: string,
  contentType: "sector" | "product",
): void {
  pushEvent("view_content", {
    content_name: contentName,
    content_type: contentType,
  });
}

export function trackPageView(pagePath: string): void {
  pushEvent("page_view", { page_path: pagePath });
}
