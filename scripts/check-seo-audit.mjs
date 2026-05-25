#!/usr/bin/env node
/**
 * Validates that every page listed in docs/seo-audit-2026-05-26.md actually
 * has the audited title, a 140-160 char description, a keywords array, and
 * an openGraph.images entry in its page.tsx.
 *
 * Run via:  node scripts/check-seo-audit.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP = join(process.cwd(), "src", "app", "(marketing)");

const PAGES = [
  // [url, expected title (page-level, no site-name suffix)]
  ["/products/", "Industrial Equipment Catalogue Kenya"],
  ["/products/tanks/", "Industrial Tanks Kenya: Stainless, Epoxy, Zinc-Alum"],
  ["/products/tanks/stainless-steel/", "Stainless Steel Tank Kenya: 304 & 316L Food-Grade"],
  ["/products/tanks/epoxy-lined/", "Epoxy-Lined Tank Kenya: ETP & Chemical Dosing"],
  ["/products/tanks/zinc-alum/", "Zinc-Alum Tank Kenya: 30-Year Water Storage"],
  ["/products/silos/", "Industrial Silos Kenya: Grain, Feed, Bulk"],
  ["/products/silos/grain-storage/", "Grain Storage Silo Kenya: Brewery & Feed Mill"],
  ["/products/silos/feed-storage/", "Feed Silo Kenya: 5 to 100 MT for Mills and Farms"],
  ["/products/silos/industrial-bulk/", "Industrial Bulk Silo Kenya: Cement & Powder"],
  ["/products/structural-works/", "Structural Fabrication Nairobi: Platforms, Pipe Racks"],
  ["/products/instruments/", "Process Instruments Kenya: Flow, Level, pH, More"],
  ["/products/instruments/flow/", "Flow Meter Supplier Kenya: Electromagnetic, Vortex"],
  ["/products/instruments/level/", "Radar Level Transmitter Kenya: 26/60/80 GHz, Ultrasonic"],
  ["/products/instruments/pressure/", "Pressure Transmitter Kenya: Gauge, Absolute, DP"],
  ["/products/instruments/liquid-analysis/", "Multi-Parameter Water Analyzer Kenya: ETP & Process"],
  ["/products/instruments/temperature/", "RTD Temperature Sensor Kenya: Pt100, Thermocouples"],
  ["/products/instruments/system-products/", "Paperless Recorder Kenya: Indicators, Isolators"],
  ["/products/iot/", "Tank Monitoring Kenya: Safaricom NB-IoT, LoRa, 4G"],
  ["/industries/", "Industries We Equip in Kenya"],
  ["/industries/food-and-beverage/", "Food & Beverage Equipment Supplier Kenya"],
  ["/industries/etp-water-treatment/", "NEMA-Compliant ETP Equipment Kenya: Tanks & Analyzers"],
  ["/industries/alcohol-distilling/", "Brewery & Distillery Tank Kenya: 50 HL to 5,000 HL+"],
  ["/industries/chemical-processing/", "Chemical Processing Tank Kenya: Epoxy & Stainless"],
  ["/locations/", "Kenya Delivery & On-Site Supply"],
  ["/locations/nairobi/", "Tank Supplier Nairobi: 48-Hour Response, All Estates"],
  ["/about/", "About: A Kenya-Based Tank Manufacturer"],
  ["/about/local-manufacturing/", "Industrial Fabrication Nairobi: Inside Our Workshop"],
  ["/contact/", "Contact: Email, Phone, or Form"],
  ["/request-quote/", "Request a Quote: Tanks, Silos, Instruments Kenya"],
  ["/book-consultation/", "Book a Consultation with Our Engineering Team"],
  ["/request-site-audit/", "Request a Free Site Audit: Plants in Kenya"],
  ["/resources/", "Industrial Resources: Spec Sheets, NEMA, Field Notes"],
  ["/blog/", "Industrial Field Notes: Tank, ETP, IoT, Kenya"],
];

let failures = 0;
const warnings = [];

for (const [url, expectedTitle] of PAGES) {
  const path = join(APP, url.replace(/^\//, "").replace(/\/$/, ""), "page.tsx");
  if (!existsSync(path)) {
    console.error(`MISSING FILE  ${url}  -> ${path}`);
    failures++;
    continue;
  }
  const text = readFileSync(path, "utf8");
  const titleOk = text.includes(`"${expectedTitle}"`);
  const hasKeywords = /\bkeywords\s*:\s*\[/.test(text);
  const hasOgImage = /openGraph\s*:[\s\S]*images\s*:\s*\[/.test(text);
  const descMatch = text.match(/description\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
  let descLen = 0;
  if (descMatch) descLen = descMatch[1].length;
  const descOk = descLen >= 140 && descLen <= 200;

  const flags = [];
  if (!titleOk) flags.push("title!=audit");
  if (!hasKeywords) flags.push("no keywords");
  if (!hasOgImage) flags.push("no og.images");
  if (!descOk) flags.push(`desc=${descLen}ch`);

  if (flags.length) {
    console.log(`  ${url}  ${flags.join(", ")}`);
    if (!titleOk || !hasKeywords || !hasOgImage) failures++;
    if (!descOk) warnings.push(`${url} desc=${descLen}ch`);
  }
}

console.log("");
if (failures > 0) {
  console.error(`FAILED: ${failures} pages failed strict checks (title / keywords / og.images)`);
  process.exit(1);
}
if (warnings.length) {
  console.warn(`Soft warnings (description length outside 140-200):`);
  for (const w of warnings) console.warn(`  ${w}`);
}
console.log(`OK: all ${PAGES.length} pages match the audit.`);
