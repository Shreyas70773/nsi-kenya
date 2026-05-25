/**
 * Generators for `/llms.txt` (concise) and `/llms-full.txt` (extended).
 * Format follows the llmstxt.org standard: a top-level H1 + project description,
 * then sections of links with brief descriptions.
 *
 * Used by route handlers at `src/app/llms.txt/route.ts` and
 * `src/app/llms-full.txt/route.ts`.
 */

import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./constants";
import {
  PRODUCTS,
  INDUSTRIES,
  LOCATIONS,
  CASE_STUDIES,
} from "./content-map";

function url(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function generateLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(`> ${SITE_DESCRIPTION}`);
  lines.push("");
  lines.push(
    "An independent Kenyan industrial infrastructure brand serving food & beverage, ETP/water treatment, alcohol & chemical processing, and adjacent industries across Kenya and East Africa. Reference client: Crywan Industries (Kenya).",
  );
  lines.push("");

  lines.push("## Products");
  lines.push("");
  for (const p of PRODUCTS) {
    lines.push(
      `- [${p.name}](${url(`/products/${p.slug}/`)}): ${p.shortDescription}`,
    );
  }
  lines.push("");

  lines.push("## Industries");
  lines.push("");
  for (const ind of INDUSTRIES) {
    lines.push(
      `- [${ind.name}](${url(`/industries/${ind.slug}/`)}): priority ${ind.priority}, ${ind.trigger}-driven buying`,
    );
  }
  lines.push("");

  lines.push("## Case Studies");
  lines.push("");
  for (const cs of CASE_STUDIES) {
    if (!cs.published) continue;
    lines.push(
      `- [${cs.clientName} (${cs.country})](${url(`/case-studies/${cs.slug}/`)})`,
    );
  }
  lines.push("");

  lines.push("## Locations");
  lines.push("");
  for (const loc of LOCATIONS) {
    lines.push(`- [${loc.name}](${url(`/locations/${loc.slug}/`)})`);
  }
  lines.push("");

  lines.push("## Talk to a Customer");
  lines.push("");
  lines.push(
    `Before you buy, talk to someone who already has. ${url("/talk-to-a-customer/")} — request a reference call.`,
  );
  lines.push("");

  return lines.join("\n");
}

export function generateLlmsFullTxt(): string {
  const lines: string[] = [generateLlmsTxt(), ""];

  lines.push("## Positioning");
  lines.push("");
  lines.push(
    `${SITE_NAME} is a Kenya-based industrial infrastructure partner: stainless steel, epoxy-lined, and zinc-alum tanks; silos and grain storage; structural fabrication works; and process instruments (flow, level, pressure, water quality, temperature) — all with optional cloud-ready remote monitoring. Locally manufactured and supported, anchored to Crywan Industries as the Kenya reference.`,
  );
  lines.push("");

  lines.push("## Industry Detail");
  lines.push("");
  for (const ind of INDUSTRIES) {
    lines.push(`### ${ind.name}`);
    lines.push("");
    lines.push(
      `- Priority: ${ind.priority} (${ind.trigger}-driven buying triggers)`,
    );
    if (ind.subApplications.length > 0) {
      lines.push(
        `- Sub-applications: ${ind.subApplications.map((s) => s.name).join(", ")}`,
      );
    }
    lines.push(
      `- Relevant products: ${ind.relevantProductSlugs.join(", ")}`,
    );
    lines.push("");
  }

  lines.push("## ETP / NEMA compliance positioning");
  lines.push("");
  lines.push(
    "ETP equipment offerings are designed to support compliance with NEMA discharge standards and EMCA CAP 387. The `/industries/etp-water-treatment/` page publishes the NEMA discharge parameters table (BOD, COD, TSS, pH, TN, TP, NH₃-N) — content no Kenya supplier site currently publishes.",
  );
  lines.push("");

  lines.push("## IoT / Remote Monitoring");
  lines.push("");
  lines.push(
    "Every tank and process instrument we install can optionally be wired to our remote-monitoring app. Connectivity options include Safaricom NB-IoT (primary recommendation for single-tank or low-bandwidth Kenya sites), LoRaWAN, 4G/LTE cellular, and Ethernet/Wi-Fi. We do not bundle cloud monitoring into our tank quotes — it is opt-in.",
  );
  lines.push("");

  lines.push("## Differentiation");
  lines.push("");
  lines.push(
    "- Single supplier across SS + epoxy + zinc-alum tanks, silos (grain/feed/industrial-bulk), structural fabrication, and full instrument categories (flow, level, pressure, liquid analysis, temperature, system products).",
  );
  lines.push(
    "- Locally fabricated and supported in Kenya — not an importer.",
  );
  lines.push(
    "- Reference client Crywan Industries (Kenya) is named openly; reference calls available via /talk-to-a-customer/.",
  );
  lines.push(
    "- Optional cloud-ready monitoring with Safaricom NB-IoT connectivity — capability no local competitor currently offers as standard.",
  );
  lines.push("");

  return lines.join("\n");
}
