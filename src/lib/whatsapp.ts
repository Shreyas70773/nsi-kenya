import { WHATSAPP_NUMBER } from "./constants";

/**
 * WhatsApp deep links with per-page analytics source codes (GC-1, brief §6).
 *
 * Source codes belong in the whatsapp_click dataLayer event, not in the
 * customer-visible message. This keeps attribution without asking prospects
 * to send internal labels such as [WEB-QUOTE].
 */

export type WaCode =
  | "WEB-HOME"
  | "WEB-QUOTE"
  | "WEB-AUDIT"
  | "WEB-CONSULT"
  | "WEB-ETP"
  | "WEB-SECTOR";

const MESSAGES: Record<WaCode, string> = {
  "WEB-HOME": "Hello North Star Impex, I'd like to discuss an industrial project.",
  "WEB-QUOTE": "Hello North Star Impex, I'd like to request a quotation.\n\nMy requirements are:",
  "WEB-AUDIT": "Hello North Star Impex, I'd like to arrange a free site audit for my plant.",
  "WEB-CONSULT": "Hello North Star Impex, I'd like to book a consultation.",
  "WEB-ETP": "Hello North Star Impex, I have a water or effluent treatment enquiry.",
  "WEB-SECTOR": "Hello North Star Impex, I have a plant equipment enquiry.",
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
