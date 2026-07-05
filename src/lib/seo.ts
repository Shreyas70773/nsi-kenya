/**
 * JSON-LD generators per spec section 5. Every page emits BreadcrumbList +
 * Organization at minimum; page-type-specific schemas layer on top.
 *
 * The full set: Organization, WebSite (with SearchAction), LocalBusiness,
 * Service, Product, Article, BreadcrumbList, FAQPage, SoftwareApplication.
 * Rendered via <JsonLd> at src/components/seo/json-ld.tsx.
 */

import {
  SITE_NAME,
  LEGAL_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  COUNTRY,
  LOGO_URL,
  BUSINESS,
} from "./constants";

const SCHEMA = "https://schema.org";
const AREA_SERVED = ["KE", "UG", "TZ", "ET", "RW"] as const;
const ORG_ID = `${SITE_URL}/#organization`;

/** Reference to the single canonical Organization node (declared site-wide
 *  via the root layout). Carries @id so engines resolve one entity rather
 *  than many copies, plus @type/name so the reference is self-describing. */
function organizationRef() {
  return {
    "@type": "Organization" as const,
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
  };
}

/** PostalAddress built from whatever NAP facts are confirmed; street/postal
 *  are omitted until set (see BUSINESS in constants). */
function postalAddress() {
  return {
    "@type": "PostalAddress" as const,
    ...(BUSINESS.streetAddress
      ? { streetAddress: BUSINESS.streetAddress }
      : {}),
    addressLocality: BUSINESS.locality,
    addressRegion: BUSINESS.region,
    ...(BUSINESS.postalCode ? { postalCode: BUSINESS.postalCode } : {}),
    addressCountry: COUNTRY,
  };
}

function salesContactPoint() {
  return {
    "@type": "ContactPoint" as const,
    contactType: "sales",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    areaServed: [...AREA_SERVED],
    availableLanguage: ["en"],
  };
}

export function organizationLd() {
  return {
    "@context": SCHEMA,
    "@type": "Organization" as const,
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    description: SITE_DESCRIPTION,
    foundingDate: BUSINESS.foundingDate,
    address: postalAddress(),
    areaServed: [...AREA_SERVED],
    contactPoint: salesContactPoint(),
    ...(BUSINESS.sameAs.length ? { sameAs: [...BUSINESS.sameAs] } : {}),
  };
}

/**
 * Homepage LocalBusiness node — the entity engines attach map/phone/hours to.
 * Emits the geo pin only when real coordinates are configured (never a guess).
 */
export function homeLocalBusinessLd() {
  return {
    "@context": SCHEMA,
    "@type": "LocalBusiness" as const,
    "@id": `${SITE_URL}/#localbusiness`,
    name: LEGAL_NAME,
    url: SITE_URL,
    image: LOGO_URL,
    logo: LOGO_URL,
    description: SITE_DESCRIPTION,
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    priceRange: "$$",
    address: postalAddress(),
    areaServed: [...AREA_SERVED],
    openingHours: [...BUSINESS.openingHours],
    ...(BUSINESS.geoLat && BUSINESS.geoLng
      ? {
          geo: {
            "@type": "GeoCoordinates" as const,
            latitude: BUSINESS.geoLat,
            longitude: BUSINESS.geoLng,
          },
        }
      : {}),
    parentOrganization: organizationRef(),
    ...(BUSINESS.sameAs.length ? { sameAs: [...BUSINESS.sameAs] } : {}),
  };
}

export function webSiteLd() {
  return {
    "@context": SCHEMA,
    "@type": "WebSite" as const,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-KE",
    potentialAction: {
      "@type": "SearchAction" as const,
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

type LocationInput = {
  slug: string;
  name: string;
  country: string;
};

export function localBusinessLd(location: LocationInput) {
  return {
    "@context": SCHEMA,
    "@type": "LocalBusiness" as const,
    "@id": `${SITE_URL}/locations/${location.slug}/#business`,
    name: `${SITE_NAME}, ${location.name}`,
    url: `${SITE_URL}/locations/${location.slug}/`,
    address: {
      "@type": "PostalAddress" as const,
      addressLocality: location.name,
      addressCountry: location.country === "Kenya" ? "KE" : location.country,
    },
    areaServed: [location.name],
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    parentOrganization: organizationRef(),
  };
}

type IndustryInput = {
  slug: string;
  name: string;
};

export function serviceLd(industry: IndustryInput) {
  return {
    "@context": SCHEMA,
    "@type": "Service" as const,
    serviceType: industry.name,
    url: `${SITE_URL}/industries/${industry.slug}/`,
    areaServed: [...AREA_SERVED],
    provider: organizationRef(),
  };
}

type ProductInput = {
  name: string;
  material?: string;
  category?: string;
  description?: string;
  url?: string;
};

export function productLd(product: ProductInput) {
  return {
    "@context": SCHEMA,
    "@type": "Product" as const,
    name: product.name,
    ...(product.material ? { material: product.material } : {}),
    ...(product.category ? { category: product.category } : {}),
    ...(product.description ? { description: product.description } : {}),
    ...(product.url ? { url: product.url } : {}),
    manufacturer: organizationRef(),
  };
}

type ArticleInput = {
  headline: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  description?: string;
  imageUrl?: string;
};

export function articleLd(article: ArticleInput) {
  return {
    "@context": SCHEMA,
    "@type": "Article" as const,
    headline: article.headline,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    url: article.url,
    ...(article.description ? { description: article.description } : {}),
    ...(article.imageUrl ? { image: article.imageUrl } : {}),
    author: organizationRef(),
    publisher: organizationRef(),
  };
}

type Crumb = { name: string; url: string };

export function breadcrumbLd(crumbs: readonly Crumb[]) {
  return {
    "@context": SCHEMA,
    "@type": "BreadcrumbList" as const,
    itemListElement: crumbs.map((c, idx) => ({
      "@type": "ListItem" as const,
      position: idx + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

type FaqItem = { question: string; answer: string };

export function faqLd(items: readonly FaqItem[]) {
  return {
    "@context": SCHEMA,
    "@type": "FAQPage" as const,
    mainEntity: items.map((it) => ({
      "@type": "Question" as const,
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: it.answer,
      },
    })),
  };
}

export function softwareApplicationLd() {
  return {
    "@context": SCHEMA,
    "@type": "SoftwareApplication" as const,
    name: `${SITE_NAME}, Remote Monitoring`,
    url: `${SITE_URL}/products/iot/`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "Cloud-ready remote monitoring for tanks and process instruments. View levels, flow, water quality, and alarms from any device. NB-IoT, LoRaWAN, 4G/LTE, Ethernet/Wi-Fi connectivity.",
    publisher: organizationRef(),
  };
}
