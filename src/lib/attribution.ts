/**
 * First-touch attribution (GC-8): capture utm_*, gclid, fbclid, the landing
 * page, referrer, and an optional source_code once per 30-day window, so a
 * visitor who browses for days before converting still carries the campaign
 * that brought them. Stored client-side (localStorage) because the site is
 * statically cached — cookies/middleware would fight the CDN.
 *
 * Wire names (hidden form fields / notifications) use the brief's snake_case
 * (utm_source, landing_page, ...); this module and Convex use camelCase.
 */

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  landingPage?: string;
  referrer?: string;
  sourceCode?: string;
};

export const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const STORAGE_KEY = "ns-attribution";

const PARAM_MAP: ReadonlyArray<[param: string, key: keyof Attribution]> = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["gclid", "gclid"],
  ["fbclid", "fbclid"],
  ["source_code", "sourceCode"],
];

export function parseAttributionParams(search: string): Attribution {
  const params = new URLSearchParams(search);
  const out: Attribution = {};
  for (const [param, key] of PARAM_MAP) {
    const value = params.get(param)?.trim();
    if (value) out[key] = value.slice(0, 200);
  }
  return out;
}

type Stored = { v: 1; at: number; data: Attribution };

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (parsed?.v !== 1 || typeof parsed.at !== "number" || !parsed.data) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * First-touch: only (re)writes when there is no fresh record. A visit with
 * neither params nor an external referrer is internal navigation and never
 * counts as a touch.
 */
export function captureAttribution(
  search: string,
  path: string,
  referrer: string,
  now: number,
): void {
  const params = parseAttributionParams(search);
  const externalReferrer =
    referrer && !referrer.startsWith(originOf(path)) ? referrer : "";
  if (Object.keys(params).length === 0 && !externalReferrer) return;

  try {
    const existing = readStored();
    if (existing && now - existing.at <= ATTRIBUTION_TTL_MS) return;

    const data: Attribution = {
      ...params,
      landingPage: path,
      ...(externalReferrer ? { referrer: externalReferrer.slice(0, 500) } : {}),
    };
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: 1, at: now, data } satisfies Stored),
    );
  } catch {
    // Storage blocked — attribution is best-effort, never break the page.
  }
}

export function getAttribution(): Attribution {
  const stored = readStored();
  return stored ? stored.data : {};
}

/** Own-origin prefix used to discard same-site referrers. */
function originOf(_path: string): string {
  if (typeof location !== "undefined") return location.origin;
  return "";
}

/**
 * Server-side counterpart: lift the hidden snake_case fields out of a form
 * submission into the camelCase metadata object Convex stores. Returns
 * undefined when the visitor carried no attribution at all.
 */
export function leadMetadataFromForm(
  formData: FormData,
): (Attribution & { referrer?: string }) | undefined {
  const read = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" && value.trim()
      ? value.trim().slice(0, 500)
      : undefined;
  };
  const metadata = {
    utmSource: read("utm_source"),
    utmMedium: read("utm_medium"),
    utmCampaign: read("utm_campaign"),
    utmContent: read("utm_content"),
    gclid: read("gclid"),
    fbclid: read("fbclid"),
    landingPage: read("landing_page"),
    referrer: read("referrer"),
    sourceCode: read("source_code"),
  };
  const defined = Object.fromEntries(
    Object.entries(metadata).filter(([, v]) => v !== undefined),
  ) as Attribution & { referrer?: string };
  return Object.keys(defined).length > 0 ? defined : undefined;
}

/** Notification-email block (skipped entirely when no attribution). */
export function attributionLines(
  metadata: (Attribution & { referrer?: string }) | undefined,
): string[] {
  if (!metadata) return [];
  const row = (label: string, value?: string) =>
    value ? `${label} ${value}` : null;
  return [
    "",
    "Attribution:",
    row("  Source:      ", metadata.utmSource),
    row("  Medium:      ", metadata.utmMedium),
    row("  Campaign:    ", metadata.utmCampaign),
    row("  Content:     ", metadata.utmContent),
    row("  gclid:       ", metadata.gclid),
    row("  fbclid:      ", metadata.fbclid),
    row("  Landing:     ", metadata.landingPage),
    row("  Referrer:    ", metadata.referrer),
    row("  Source code: ", metadata.sourceCode),
  ].filter((l): l is string => l !== null);
}
