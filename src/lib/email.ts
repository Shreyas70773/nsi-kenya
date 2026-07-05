/**
 * Resend wrapper. All transactional email goes through here so we have one
 * place to add observability, retry policy, and template overrides later.
 *
 * Lazy client instantiation lets the wrapper be imported into route handlers
 * during build without crashing when RESEND_API_KEY is absent in CI / preview.
 * Sends are no-ops in non-production when the key is missing (logged for
 * developer visibility).
 */
import { Resend } from "resend";
import {
  SITE_NAME,
  SITE_URL,
  CONTACT_EMAIL,
} from "./constants";
import { attributionLines, type Attribution } from "./attribution";

const FROM = `${SITE_NAME} <${CONTACT_EMAIL}>`;

/**
 * GC-9 recipient resolution: LEAD_NOTIFICATION_EMAILS (comma list — the
 * brief wants two inboxes) wins; the legacy single QUOTE_NOTIFICATION_EMAIL
 * still works; CONTACT_EMAIL is the final fallback. Deduped so nobody gets
 * the same lead twice.
 */
export function resolveLeadRecipients(
  env: {
    LEAD_NOTIFICATION_EMAILS?: string;
    QUOTE_NOTIFICATION_EMAIL?: string;
  },
  fallback: string,
): string[] {
  const list = (env.LEAD_NOTIFICATION_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const candidates = list.length
    ? list
    : [env.QUOTE_NOTIFICATION_EMAIL?.trim() || fallback];
  const seen = new Set<string>();
  return candidates.filter((email) => {
    const key = email.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function leadRecipients(): string[] {
  return resolveLeadRecipients(
    {
      LEAD_NOTIFICATION_EMAILS: process.env.LEAD_NOTIFICATION_EMAILS,
      QUOTE_NOTIFICATION_EMAIL: process.env.QUOTE_NOTIFICATION_EMAIL,
    },
    CONTACT_EMAIL,
  );
}

let cached: Resend | null = null;
function client(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

function describeIntent(
  intent: "explore" | "evaluate" | "purchase" | "urgent-etp",
): string {
  switch (intent) {
    case "explore":
      return "Exploring options";
    case "evaluate":
      return "Technical evaluation";
    case "purchase":
      return "Ready to purchase";
    case "urgent-etp":
      return "URGENT (ETP compliance deadline)";
  }
}

export type QuoteNotificationInput = {
  intent: "explore" | "evaluate" | "purchase" | "urgent-etp";
  name: string;
  company: string;
  email?: string;
  phone: string;
  industry?: string;
  productSlugs?: readonly string[];
  capacity?: string;
  message?: string;
  metadata?: (Attribution & { referrer?: string }) | undefined;
};

export async function sendQuoteNotification(
  quote: QuoteNotificationInput,
): Promise<{ ok: boolean; skipped?: true; error?: string }> {
  const c = client();
  if (!c) {
    console.warn(
      "[email] RESEND_API_KEY not set, skipping quote notification",
    );
    return { ok: true, skipped: true };
  }
  const subject = `New quote request (${describeIntent(quote.intent)}): ${quote.company}`;
  const body = [
    `Intent:    ${describeIntent(quote.intent)}`,
    `Name:      ${quote.name}`,
    `Company:   ${quote.company}`,
    `Phone:     ${quote.phone}`,
    quote.email ? `Email:     ${quote.email}` : null,
    quote.industry ? `Industry:  ${quote.industry}` : null,
    quote.productSlugs && quote.productSlugs.length > 0
      ? `Products:  ${quote.productSlugs.join(", ")}`
      : null,
    quote.capacity ? `Capacity:  ${quote.capacity}` : null,
    "",
    quote.message ? `Message:\n${quote.message}` : null,
    ...attributionLines(quote.metadata),
    "",
    "---",
    `Reply at ${quote.email ?? quote.phone}`,
    `Source: ${SITE_URL}`,
  ]
    .filter(Boolean)
    .join("\n");
  const res = await c.emails.send({
    from: FROM,
    to: leadRecipients(),
    ...(quote.email ? { replyTo: quote.email } : {}),
    subject,
    text: body,
  });
  if (res.error) {
    return { ok: false, error: res.error.message };
  }
  return { ok: true };
}

export type InquiryNotificationInput = {
  kind: "contact" | "consultation" | "site-audit";
  name: string;
  company: string;
  email?: string;
  phone: string;
  industry?: string;
  siteLocation?: string;
  topic?: string;
  capacity?: string;
  message?: string;
  metadata?: (Attribution & { referrer?: string }) | undefined;
};

const KIND_LABEL: Record<InquiryNotificationInput["kind"], string> = {
  contact: "contact message",
  consultation: "consultation request",
  "site-audit": "site-audit request",
};

/**
 * GC-9: consultation, site-audit, and contact submissions previously wrote
 * to Convex/Sheets with NO email — sales found out whenever someone opened
 * the dashboard. Every journey now notifies the same recipient list.
 */
export async function sendInquiryNotification(
  inquiry: InquiryNotificationInput,
): Promise<{ ok: boolean; skipped?: true; error?: string }> {
  const c = client();
  if (!c) {
    console.warn(
      "[email] RESEND_API_KEY not set, skipping inquiry notification",
    );
    return { ok: true, skipped: true };
  }
  const subject = `New ${KIND_LABEL[inquiry.kind]}: ${inquiry.company}`;
  const body = [
    `Kind:      ${KIND_LABEL[inquiry.kind]}`,
    `Name:      ${inquiry.name}`,
    `Company:   ${inquiry.company}`,
    `Phone:     ${inquiry.phone}`,
    inquiry.email ? `Email:     ${inquiry.email}` : null,
    inquiry.industry ? `Sector:    ${inquiry.industry}` : null,
    inquiry.siteLocation ? `Location:  ${inquiry.siteLocation}` : null,
    inquiry.topic ? `Topic:     ${inquiry.topic}` : null,
    inquiry.capacity ? `Capacity:  ${inquiry.capacity}` : null,
    "",
    inquiry.message ? `Message:\n${inquiry.message}` : null,
    ...attributionLines(inquiry.metadata),
    "",
    "---",
    `Reply at ${inquiry.email ?? inquiry.phone}`,
    `Source: ${SITE_URL}`,
  ]
    .filter(Boolean)
    .join("\n");
  const res = await c.emails.send({
    from: FROM,
    to: leadRecipients(),
    ...(inquiry.email ? { replyTo: inquiry.email } : {}),
    subject,
    text: body,
  });
  if (res.error) {
    return { ok: false, error: res.error.message };
  }
  return { ok: true };
}

