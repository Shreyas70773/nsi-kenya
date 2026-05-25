/**
 * Single source of truth for products, industries, locations, case studies, and
 * programmatic SEO surfaces. Drives sitemap, nav, breadcrumbs, JSON-LD generators,
 * and llms.txt. Adding a page = updating one of these arrays (or, for case studies
 * and blog posts, adding a row in Convex which the admin surface manages).
 *
 * Authority: spec section 3 (route map), section 4 (content scope), section 5
 * (keyword strategy), section 9 (trust constraint plan).
 */

import { ANCHOR_CLIENT } from "./constants";

// ───────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// ───────────────────────────────────────────────────────────────────────────────

export type ProductCategory =
  | "tanks"
  | "silos"
  | "structural"
  | "instruments"
  | "iot";

export type Product = {
  /** URL slug under /products/ — may contain a sub-segment for category pages */
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  applications: readonly string[];
  primaryQueries: readonly string[];
  /** 1 = Tier 1 launch page; 2 = within 30 days; 3 = expansion */
  tier: 1 | 2 | 3;
};

export const PRODUCTS: readonly Product[] = [
  {
    slug: "tanks/stainless-steel",
    name: "Stainless Steel Tanks",
    category: "tanks",
    shortDescription:
      "304 and 316L stainless steel tanks for food & beverage, pharmaceutical-adjacent, and ETP applications.",
    applications: ["Dairy", "Beverage", "Edible oils", "ETP"],
    primaryQueries: [
      "stainless steel tank Kenya",
      "SS tank Nairobi food grade",
      "304 stainless steel tank supplier Kenya",
    ],
    tier: 1,
  },
  {
    slug: "tanks/epoxy-lined",
    name: "Epoxy-Lined Tanks",
    category: "tanks",
    shortDescription:
      "Epoxy-lined steel tanks for chemical dosing, water treatment, and corrosive media storage.",
    applications: [
      "ETP chemical dosing",
      "Chemical processing",
      "Water treatment",
    ],
    primaryQueries: ["epoxy lined tank Kenya", "epoxy coated tank Nairobi"],
    tier: 1,
  },
  {
    slug: "tanks/zinc-alum",
    name: "Zinc-Alum Tanks",
    category: "tanks",
    shortDescription:
      "Bolted zinc-aluminum steel tanks. A corrosion-resistant alternative to carbon steel with multi-decade lifespan.",
    applications: ["Water storage", "Industrial process water", "Brewing", "ETP"],
    primaryQueries: [
      "zinc aluminum tank Kenya",
      "zincalume water tank Nairobi",
    ],
    tier: 1,
  },
  {
    slug: "silos/grain-storage",
    name: "Grain Storage Silos",
    category: "silos",
    shortDescription:
      "Industrial grain storage silos for breweries, feed mills, and food processors. 10–500MT capacities.",
    applications: ["Brewing", "Feed milling", "Bakery / grain processing"],
    primaryQueries: [
      "grain storage silo Kenya",
      "silo manufacturer Nairobi",
      "industrial silo East Africa",
    ],
    tier: 1,
  },
  {
    slug: "silos/feed-storage",
    name: "Feed Storage Silos",
    category: "silos",
    shortDescription:
      "Bulk feed storage silos for animal feed and ingredient handling.",
    applications: ["Feed mills", "Poultry operations"],
    primaryQueries: ["feed silo Kenya", "animal feed silo Nairobi"],
    tier: 2,
  },
  {
    slug: "silos/industrial-bulk",
    name: "Industrial Bulk Silos",
    category: "silos",
    shortDescription:
      "Steel silos for industrial bulk material storage. Capacities 10 to 1000MT.",
    applications: ["Cement", "Powder handling", "Food ingredients"],
    primaryQueries: [
      "industrial silo Kenya",
      "bulk material silo Nairobi",
    ],
    tier: 2,
  },
  {
    slug: "structural-works",
    name: "Structural Fabrication Works",
    category: "structural",
    shortDescription:
      "Structural steel fabrication for industrial plants. Platforms, walkways, tank supports, plant structures.",
    applications: [
      "Plant construction",
      "Tank platforms",
      "Industrial walkways",
    ],
    primaryQueries: [
      "structural fabrication Nairobi",
      "industrial fabrication Kenya",
      "steel fabrication Nairobi",
    ],
    tier: 1,
  },
  {
    slug: "instruments/flow",
    name: "Flow Meters",
    category: "instruments",
    shortDescription:
      "Electromagnetic, vortex, turbine, ultrasonic, Coriolis, and thermal-mass flow meters with 4–20mA, Modbus, HART.",
    applications: [
      "Process flow measurement",
      "ETP discharge metering",
      "Custody transfer",
    ],
    primaryQueries: [
      "flow meter supplier Kenya",
      "electromagnetic flow meter Kenya",
      "ultrasonic flow meter Nairobi",
    ],
    tier: 2,
  },
  {
    slug: "instruments/level",
    name: "Level Transmitters",
    category: "instruments",
    shortDescription:
      "Radar, ultrasonic, hydrostatic, and guided-wave level transmitters for tanks, silos, and process vessels.",
    applications: ["Tank level monitoring", "Silo inventory", "Sump control"],
    primaryQueries: [
      "radar level transmitter Kenya",
      "ultrasonic level meter Kenya",
      "tank level sensor Kenya",
    ],
    tier: 2,
  },
  {
    slug: "instruments/pressure",
    name: "Pressure Transmitters",
    category: "instruments",
    shortDescription:
      "Gauge, absolute, and differential-pressure transmitters with optional temperature compensation.",
    applications: ["Process pressure", "Pump discharge", "Custody transfer"],
    primaryQueries: [
      "pressure transmitter Kenya",
      "differential pressure transmitter Nairobi",
    ],
    tier: 2,
  },
  {
    slug: "instruments/liquid-analysis",
    name: "Liquid Analysis Instruments",
    category: "instruments",
    shortDescription:
      "pH/ORP, conductivity, dissolved oxygen, turbidity, TSS, residual chlorine, and multi-parameter analyzers.",
    applications: ["ETP compliance monitoring", "Process water", "Boiler feedwater"],
    primaryQueries: [
      "pH meter industrial Kenya",
      "dissolved oxygen meter Kenya",
      "multi-parameter water analyzer Kenya",
    ],
    tier: 2,
  },
  {
    slug: "instruments/temperature",
    name: "Temperature Instruments",
    category: "instruments",
    shortDescription:
      "RTD and thermocouple sensors with programmable transmitters; field, panel, and head-mount form factors.",
    applications: ["Process temperature", "CIP/SIP loops", "Heat exchangers"],
    primaryQueries: [
      "RTD temperature sensor Kenya",
      "temperature transmitter Nairobi",
    ],
    tier: 2,
  },
  {
    slug: "instruments/system-products",
    name: "System Products",
    category: "instruments",
    shortDescription:
      "Paperless recorders, process indicators, totalizers, fuzzy-PID controllers, signal isolators, signal generators.",
    applications: ["Data logging", "Loop integration", "Control panels"],
    primaryQueries: [
      "paperless recorder Kenya",
      "process indicator Kenya",
      "signal isolator Kenya",
    ],
    tier: 2,
  },
  {
    slug: "iot",
    name: "Cloud-Ready Remote Monitoring",
    category: "iot",
    shortDescription:
      "Optional cloud-connected monitoring for tanks and process instruments. View levels, flow, water quality, and alarms from any device.",
    applications: [
      "Tank level monitoring",
      "ETP continuous compliance",
      "Multi-site oversight",
    ],
    primaryQueries: [
      "tank monitoring Kenya",
      "remote tank level sensor Kenya",
      "IoT industrial monitoring Nairobi",
      "cloud connected tank Kenya",
    ],
    tier: 1,
  },
] as const;

// ───────────────────────────────────────────────────────────────────────────────
// INDUSTRIES
// ───────────────────────────────────────────────────────────────────────────────

export type Industry = {
  slug: string;
  name: string;
  priority: 1 | 2 | 3;
  trigger: "ambition" | "compliance" | "mixed";
  relevantProductSlugs: readonly string[];
  subApplications: readonly { slug: string; name: string }[];
  primaryQueries: readonly string[];
  tier: 1 | 2 | 3;
};

export const INDUSTRIES: readonly Industry[] = [
  {
    slug: "food-and-beverage",
    name: "Food & Beverage",
    priority: 1,
    trigger: "ambition",
    relevantProductSlugs: [
      "tanks/stainless-steel",
      "tanks/epoxy-lined",
      "silos/grain-storage",
      "instruments/flow",
      "instruments/level",
      "instruments/temperature",
    ],
    subApplications: [
      { slug: "dairy", name: "Dairy" },
      { slug: "beverage", name: "Beverage" },
      { slug: "edible-oils", name: "Edible Oils" },
      { slug: "brewing", name: "Brewing" },
      { slug: "bakery-grain", name: "Bakery & Grain" },
    ],
    primaryQueries: [
      "food and beverage equipment supplier Kenya",
      "dairy plant tanks Nairobi",
      "food processing tanks Kenya",
    ],
    tier: 1,
  },
  {
    slug: "etp-water-treatment",
    name: "ETP & Water Treatment",
    priority: 2,
    trigger: "compliance",
    relevantProductSlugs: [
      "tanks/stainless-steel",
      "tanks/epoxy-lined",
      "instruments/liquid-analysis",
      "instruments/flow",
    ],
    subApplications: [
      { slug: "food-processing-etp", name: "Food Processing ETP" },
      { slug: "textile-etp", name: "Textile ETP" },
      { slug: "municipal-water", name: "Municipal Water" },
    ],
    primaryQueries: [
      "NEMA compliant ETP Kenya",
      "effluent treatment plant tanks Kenya",
      "wastewater treatment equipment Nairobi",
    ],
    tier: 1,
  },
  {
    slug: "alcohol-distilling",
    name: "Alcohol & Distilling",
    priority: 3,
    trigger: "ambition",
    relevantProductSlugs: [
      "tanks/stainless-steel",
      "tanks/epoxy-lined",
      "tanks/zinc-alum",
      "silos/grain-storage",
    ],
    subApplications: [],
    primaryQueries: ["brewery tank Kenya", "distillery equipment Kenya"],
    tier: 2,
  },
  {
    slug: "chemical-processing",
    name: "Chemical Processing",
    priority: 3,
    trigger: "ambition",
    relevantProductSlugs: [
      "tanks/epoxy-lined",
      "tanks/stainless-steel",
      "instruments/pressure",
      "instruments/temperature",
    ],
    subApplications: [],
    primaryQueries: [
      "chemical processing tank Kenya",
      "chemical storage tank Nairobi",
    ],
    tier: 2,
  },
] as const;

// ───────────────────────────────────────────────────────────────────────────────
// LOCATIONS
// ───────────────────────────────────────────────────────────────────────────────

export type Location = {
  slug: string;
  name: string;
  scope: "country" | "city";
  country: string;
  industrialEstates?: readonly string[];
  tier: 1 | 2 | 3;
};

export const LOCATIONS: readonly Location[] = [
  { slug: "kenya", name: "Kenya", scope: "country", country: "Kenya", tier: 1 },
  {
    slug: "nairobi",
    name: "Nairobi",
    scope: "city",
    country: "Kenya",
    industrialEstates: [
      "Athi River",
      "Ruiru",
      "Mlolongo",
      "Industrial Area",
      "Mombasa Road corridor",
      "Tatu City",
      "Thika Road",
    ],
    tier: 1,
  },
  { slug: "mombasa", name: "Mombasa", scope: "city", country: "Kenya", tier: 2 },
  { slug: "kisumu", name: "Kisumu", scope: "city", country: "Kenya", tier: 2 },
  { slug: "nakuru", name: "Nakuru", scope: "city", country: "Kenya", tier: 2 },
  { slug: "eldoret", name: "Eldoret", scope: "city", country: "Kenya", tier: 2 },
  { slug: "thika", name: "Thika", scope: "city", country: "Kenya", tier: 2 },
  {
    slug: "uganda",
    name: "Uganda",
    scope: "country",
    country: "Uganda",
    tier: 2,
  },
  {
    slug: "tanzania",
    name: "Tanzania",
    scope: "country",
    country: "Tanzania",
    tier: 2,
  },
  {
    slug: "ethiopia",
    name: "Ethiopia",
    scope: "country",
    country: "Ethiopia",
    tier: 2,
  },
] as const;

// ───────────────────────────────────────────────────────────────────────────────
// CASE STUDIES
// ───────────────────────────────────────────────────────────────────────────────

export type CaseStudy = {
  slug: string;
  clientName: string;
  country: string;
  /** Must match an INDUSTRIES slug */
  industry: string;
  /** Must match PRODUCTS slugs */
  productsInstalled: readonly string[];
  published: boolean;
  publishedAt: string;
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: ANCHOR_CLIENT.slug,
    clientName: ANCHOR_CLIENT.name,
    country: ANCHOR_CLIENT.country,
    industry: "food-and-beverage",
    productsInstalled: ["tanks/stainless-steel"],
    published: true,
    publishedAt: "2026-05-25",
  },
] as const;

// ───────────────────────────────────────────────────────────────────────────────
// Programmatic SEO surfaces — hand-curated, NOT combinatorial.
// Spec section 5 governance: 20–30 pages per surface, refresh quarterly.
// ───────────────────────────────────────────────────────────────────────────────

export const COMPARE_PAGES = [
  {
    a: "zinc-alum",
    b: "carbon-steel",
    title: "Zinc-Alum vs Carbon Steel Tanks",
  },
  {
    a: "stainless-steel",
    b: "epoxy-lined",
    title: "Stainless Steel vs Epoxy-Lined Tanks",
  },
  {
    a: "radar",
    b: "ultrasonic-level-meter",
    title: "Radar vs Ultrasonic Level Meters",
  },
  {
    a: "electromagnetic",
    b: "ultrasonic-flow-meter",
    title: "Electromagnetic vs Ultrasonic Flow Meters",
  },
] as const;

export const BEST_PAGES = [
  {
    product: "stainless-steel-tank",
    useCase: "dairy",
    title: "Best Stainless Steel Tank for Dairy",
  },
  {
    product: "zinc-alum-tank",
    useCase: "water-storage",
    title: "Best Zinc-Alum Tank for Water Storage",
  },
  {
    product: "grain-silo",
    useCase: "brewery",
    title: "Best Grain Silo for Breweries",
  },
  {
    product: "flow-meter",
    useCase: "effluent-treatment",
    title: "Best Flow Meter for Effluent Treatment",
  },
] as const;

export const COST_PAGES = [
  {
    solution: "stainless-steel-tank",
    location: "nairobi",
    title: "Stainless Steel Tank Cost in Nairobi",
  },
  {
    solution: "grain-silo",
    location: "kenya",
    title: "Grain Silo Cost in Kenya",
  },
  {
    solution: "etp-instrumentation",
    location: "mombasa",
    title: "ETP Instrumentation Cost in Mombasa",
  },
] as const;
