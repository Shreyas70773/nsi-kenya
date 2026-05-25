export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://northstarimpex.co.ke";
export const SITE_NAME = "North Star Impex Kenya";
export const SITE_DESCRIPTION =
  "Industrial tanks, silos, structural works, and process instruments. Made in Kenya. Trusted by Crywan Industries.";
export const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ?? "hello@northstarimpex.co.ke";
export const CONTACT_PHONE = process.env.CONTACT_PHONE ?? "+254-XXX-XXXXXX";
export const COUNTRY = "KE" as const;
export const LOCALE = "en-KE" as const;
export const ANCHOR_CLIENT = {
  name: "Crywan Industries",
  country: "Kenya",
  slug: "crywan-industries-kenya",
} as const;
