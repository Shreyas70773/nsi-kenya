import { WHATSAPP_NUMBER } from "./constants";

/**
 * WhatsApp deep links with per-page source codes (GC-1, brief §6).
 *
 * UTMs do not survive into WhatsApp — the [CODE] token inside the
 * pre-filled message is the ONLY attribution mechanism for WhatsApp leads.
 * The same code must be pushed on the whatsapp_click dataLayer event, and
 * the message strings are contractual copy from the brief: change nothing
 * without a new CR.
 */

export type WaCode =
  | "WEB-HOME"
  | "WEB-QUOTE"
  | "WEB-AUDIT"
  | "WEB-CONSULT"
  | "WEB-ETP"
  | "WEB-SECTOR";

const MESSAGES: Record<WaCode, string> = {
  "WEB-HOME": "Hello North Star Impex, I have an enquiry. [WEB-HOME]",
  "WEB-QUOTE":
    "Hello, I would like a 48-hour quotation. My requirement: [WEB-QUOTE]",
  "WEB-AUDIT":
    "Hello, I would like to book a free site audit for my plant. [WEB-AUDIT]",
  "WEB-CONSULT": "Hello, I would like to book a consultation. [WEB-CONSULT]",
  "WEB-ETP": "Hello, I have a water/effluent treatment enquiry. [WEB-ETP]",
  "WEB-SECTOR": "Hello, I have a plant equipment enquiry. [WEB-SECTOR]",
};

export function waMessage(code: WaCode): string {
  return MESSAGES[code];
}

export function waLink(code: WaCode): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage(code))}`;
}

/**
 * Journey pages (and their thank-you pages) beat sector pages; the ETP
 * sector page has its own code; product pages read as equipment enquiries.
 * Everything else — home, about, contact, indexes — is generic.
 */
export function codeForPath(pathname: string): WaCode {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (path.startsWith("/request-quote/") || path === "/thank-you/quote/") {
    return "WEB-QUOTE";
  }
  if (path === "/request-site-audit/" || path === "/thank-you/site-audit/") {
    return "WEB-AUDIT";
  }
  if (path === "/book-consultation/" || path === "/thank-you/consultation/") {
    return "WEB-CONSULT";
  }
  if (path.startsWith("/industries/etp-water-treatment/")) return "WEB-ETP";
  if (/^\/industries\/[^/]+\//.test(path)) return "WEB-SECTOR";
  if (/^\/products\/.+/.test(path)) return "WEB-SECTOR";
  return "WEB-HOME";
}
