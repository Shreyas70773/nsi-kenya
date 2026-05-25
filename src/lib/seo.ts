// Phase 0 stub — full JSON-LD generators land in Task 0.8 with TDD coverage.
// Exporting organizationLd() now so the root layout has something to render
// from day one; the Task 0.8 implementation will replace this with the full set.
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  COUNTRY,
} from "./constants";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressCountry: COUNTRY,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      areaServed: ["KE", "UG", "TZ", "ET", "RW"],
      availableLanguage: ["en"],
    },
  } as const;
}
