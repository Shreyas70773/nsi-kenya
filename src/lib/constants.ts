export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://northstarimpex.co.ke";
export const SITE_NAME = "North Star Impex Kenya";
export const LEGAL_NAME = "North Star Impex Kenya LTD";
export const SITE_DESCRIPTION =
  "Industrial tanks, silos, structural works, and process instruments. Made in Kenya, made for East Africa.";
export const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ?? "info@northstarimpex.co.ke";
// NAP rule: this number must stay byte-identical to the Google Business
// Profile. NEXT_PUBLIC_ variant exists because client components can only
// see inlined public env vars — set both when overriding.
export const CONTACT_PHONE =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ??
  process.env.CONTACT_PHONE ??
  "+254 718 727 334";
/** Digits-only tel: target, e.g. "+254718727334". */
export const CONTACT_PHONE_TEL = CONTACT_PHONE.replace(/[^+\d]/g, "");
/** wa.me links take digits without the leading "+". */
export const WHATSAPP_NUMBER = CONTACT_PHONE_TEL.replace(/^\+/, "");
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const COUNTRY = "KE" as const;
export const LOCALE = "en-KE" as const;
export const LOGO_URL = `${SITE_URL}/brand/logo.png`;

/**
 * Business entity facts for Organization + LocalBusiness JSON-LD.
 *
 * NAP (name / address / phone) here MUST stay byte-identical to the Google
 * Business Profile and every directory listing — inconsistent NAP is the
 * fastest way to forfeit local-pack trust. `streetAddress`, `postalCode`,
 * and the geo pin are intentionally env-driven and omitted when blank:
 * fill them in once the real workshop address is confirmed and the GBP is
 * live, so the schema pin and the map pin agree. Do NOT hard-code a guessed
 * address — a wrong pin is worse than none.
 */
export const BUSINESS = {
  locality: "Nairobi",
  region: "Nairobi County",
  country: COUNTRY,
  streetAddress: process.env.BUSINESS_STREET ?? "",
  postalCode: process.env.BUSINESS_POSTAL ?? "",
  geoLat: process.env.BUSINESS_GEO_LAT ?? "",
  geoLng: process.env.BUSINESS_GEO_LNG ?? "",
  foundingDate: "2026",
  // Populate once the Google Business Profile + social pages exist (external
  // authority playbook). Each URL here is a corroborating "same entity"
  // signal AI engines use to verify the brand is real.
  sameAs: (process.env.BUSINESS_SAMEAS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  // Typical workshop hours — confirm against the GBP, which is the source of
  // truth Google actually displays.
  openingHours: ["Mo-Fr 08:00-17:00", "Sa 08:00-13:00"],
} as const;

/**
 * T-3 compliance strip statements (KEBS / NEMA / NCA, as applicable).
 * SHIPS EMPTY: NSI supplies the exact approved wording — never draft
 * compliance claims in-house. Fill and the strip renders above the footer.
 */
export const COMPLIANCE_STATEMENTS: readonly string[] = [];
