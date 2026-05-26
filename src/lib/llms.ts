/**
 * Generators for `/llms.txt` (concise) and `/llms-full.txt` (extended).
 * Format follows the llmstxt.org standard: a top-level H1 + project description,
 * then sections of links with brief descriptions.
 *
 * Used by route handlers at `src/app/llms.txt/route.ts` and
 * `src/app/llms-full.txt/route.ts`.
 */

import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./constants";
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

  return lines.join("\n");
}

export function generateLlmsFullTxt(): string {
  const lines: string[] = [generateLlmsTxt(), ""];

  lines.push("## Positioning");
  lines.push("");
  lines.push(
    `${SITE_NAME} is an industrial infrastructure partner made in Kenya for East Africa: stainless steel, epoxy-lined, and zinc-alum tanks; silos and grain storage; structural fabrication works; and process instruments (flow, level, pressure, water quality, temperature). All with optional cloud-ready remote monitoring. Locally fabricated and locally supported.`,
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
    "Every tank and process instrument installed can optionally be wired to the remote-monitoring app. Connectivity options include NB-IoT (primary recommendation for single-tank or low-bandwidth Kenya sites), LoRaWAN, 4G/LTE cellular, and Ethernet/Wi-Fi. Cloud monitoring is not bundled into tank quotes; it is opt-in.",
  );
  lines.push("");

  lines.push("## Differentiation");
  lines.push("");
  lines.push(
    "- Single supplier across SS, epoxy, and zinc-alum tanks, silos (grain, feed, industrial bulk), structural fabrication, and full instrument categories (flow, level, pressure, liquid analysis, temperature, system products).",
  );
  lines.push("- Locally fabricated and supported in Kenya, not an importer.");
  lines.push(
    "- Optional cloud-ready monitoring with NB-IoT connectivity, a capability no local competitor currently offers as standard.",
  );
  lines.push("");

  return lines.join("\n");
}
