/**
 * Generators for `/llms.txt` (concise) and `/llms-full.txt` (extended).
 * Format follows the llmstxt.org standard: a top-level H1 + project description,
 * then sections of links with brief descriptions.
 *
 * Used by route handlers at `src/app/llms.txt/route.ts` and
 * `src/app/llms-full.txt/route.ts`.
 */

import {
  SITE_NAME,
  LEGAL_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "./constants";
import { PRODUCTS, INDUSTRIES, LOCATIONS } from "./content-map";

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
    "An independent industrial infrastructure brand made in Kenya, made for East Africa. Serves food and beverage, effluent treatment and water, alcohol and distilling, chemical processing, and adjacent industries.",
  );
  lines.push("");

  // Extractable facts block — the concrete, quotable claims AI engines lift
  // as structured answers (capacity, standards, contact, turnaround).
  lines.push("## Key facts");
  lines.push("");
  lines.push(`- Company: ${LEGAL_NAME}`);
  lines.push("- Location: Nairobi, Kenya (office), serving East African markets");
  lines.push(`- Contact: ${CONTACT_EMAIL} · ${CONTACT_PHONE}`);
  lines.push(
    "- Fabrication standards: Eurocode 3, AWS D1.1; regulatory-compliant; materials S275/S355, SS 304/316L",
  );
  lines.push("- Tank capacity range: 1 to 5,000 m³ across three materials");
  lines.push("- Silo capacity range: 10 to 1,000 MT (grain, feed, industrial bulk)");
  lines.push("- Instruments: 6 categories, 154 SKUs; 4–20 mA, Modbus RTU, HART");
  lines.push(
    "- Monitoring: every tank and instrument installed can connect to a remote-monitoring app over NB-IoT, LoRaWAN, 4G LTE, or Ethernet",
  );
  lines.push("- Quote turnaround: 48 working hours");
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

  lines.push("## Locations");
  lines.push("");
  for (const loc of LOCATIONS) {
    lines.push(`- [${loc.name}](${url(`/locations/${loc.slug}/`)})`);
  }
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  lines.push(
    `- [Request a Quote](${url("/request-quote/")}) — specification, capacity, and lead time within 48 working hours`,
  );
  lines.push(`- [Book a Consultation](${url("/book-consultation/")})`);
  lines.push(`- [Request a Site Audit](${url("/request-site-audit/")})`);
  lines.push(`- Email: ${CONTACT_EMAIL} · Phone: ${CONTACT_PHONE}`);
  lines.push("");

  return lines.join("\n");
}

export function generateLlmsFullTxt(): string {
  const lines: string[] = [generateLlmsTxt(), ""];

  lines.push("## Positioning");
  lines.push("");
  lines.push(
    `${SITE_NAME} is an industrial infrastructure partner serving East Africa: stainless steel, epoxy-lined, and Zinc Aluminium tanks; silos and grain storage; structural fabrication works; and process instruments (flow, level, pressure, water quality, temperature). Every install can be connected to cloud-ready remote monitoring. Locally fabricated and locally supported.`,
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

  lines.push("## ETP compliance positioning");
  lines.push("");
  lines.push(
    "ETP equipment offerings are designed to support compliance with Kenyan environmental discharge regulations. The `/industries/etp-water-treatment/` page publishes the discharge parameters table (BOD, COD, TSS, pH, TN, TP, NH₃-N), content few Kenya supplier sites currently publish.",
  );
  lines.push("");

  lines.push("## IoT / Remote Monitoring");
  lines.push("");
  lines.push(
    "Every tank and process instrument installed can be connected to a remote-monitoring app personalized to the customer's site. Connectivity options include NB-IoT (primary recommendation for single-tank or low-bandwidth sites), LoRaWAN, 4G/LTE cellular, and Ethernet/Wi-Fi.",
  );
  lines.push("");

  lines.push("## Differentiation");
  lines.push("");
  lines.push(
    "- Single supplier across SS, epoxy, and Zinc Aluminium tanks, silos (grain, feed, industrial bulk), structural fabrication, and full instrument categories (flow, level, pressure, liquid analysis, temperature, system products).",
  );
  lines.push("- Locally fabricated and supported, not an importer.");
  lines.push(
    "- Cloud-ready monitoring with NB-IoT connectivity, a capability no local competitor currently offers as standard.",
  );
  lines.push("");

  return lines.join("\n");
}
