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

const FROM = `${SITE_NAME} <${CONTACT_EMAIL}>`;

const QUOTE_TO = process.env.QUOTE_NOTIFICATION_EMAIL ?? CONTACT_EMAIL;
const REFERENCE_TO =
  process.env.REFERENCE_CALL_NOTIFICATION_EMAIL ?? CONTACT_EMAIL;

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
      return "URGENT — ETP compliance deadline";
  }
}

export type QuoteNotificationInput = {
  intent: "explore" | "evaluate" | "purchase" | "urgent-etp";
  name: string;
  company: string;
  email: string;
  phone?: string;
  industry?: string;
  productSlugs?: readonly string[];
  message?: string;
};

export async function sendQuoteNotification(
  quote: QuoteNotificationInput,
): Promise<{ ok: boolean; skipped?: true; error?: string }> {
  const c = client();
  if (!c) {
    console.warn(
      "[email] RESEND_API_KEY not set — skipping quote notification",
    );
    return { ok: true, skipped: true };
  }
  const subject = `New quote request — ${describeIntent(quote.intent)} — ${quote.company}`;
  const body = [
    `Intent:    ${describeIntent(quote.intent)}`,
    `Name:      ${quote.name}`,
    `Company:   ${quote.company}`,
    `Email:     ${quote.email}`,
    quote.phone ? `Phone:     ${quote.phone}` : null,
    quote.industry ? `Industry:  ${quote.industry}` : null,
    quote.productSlugs && quote.productSlugs.length > 0
      ? `Products:  ${quote.productSlugs.join(", ")}`
      : null,
    "",
    quote.message ? `Message:\n${quote.message}` : null,
    "",
    "—",
    `Reply at ${quote.email}`,
    `Source: ${SITE_URL}`,
  ]
    .filter(Boolean)
    .join("\n");
  const res = await c.emails.send({
    from: FROM,
    to: [QUOTE_TO],
    replyTo: quote.email,
    subject,
    text: body,
  });
  if (res.error) {
    return { ok: false, error: res.error.message };
  }
  return { ok: true };
}

export type ReferenceCallNotificationInput = {
  name: string;
  company: string;
  email: string;
  industry?: string;
  considering?: string;
};

export async function sendReferenceCallNotification(
  req: ReferenceCallNotificationInput,
): Promise<{ ok: boolean; skipped?: true; error?: string }> {
  const c = client();
  if (!c) {
    console.warn(
      "[email] RESEND_API_KEY not set — skipping reference-call notification",
    );
    return { ok: true, skipped: true };
  }
  const subject = `Reference-call request — ${req.company}`;
  const body = [
    `A prospect wants to talk to an existing customer before they buy.`,
    "",
    `Name:        ${req.name}`,
    `Company:     ${req.company}`,
    `Email:       ${req.email}`,
    req.industry ? `Industry:    ${req.industry}` : null,
    req.considering ? `Considering: ${req.considering}` : null,
    "",
    "—",
    "Next step: review industry/scale within 4 working hours, identify the most",
    "relevant existing reference (initially Crywan Industries), confirm with the",
    "reference, and facilitate the introduction.",
    "",
    `Source: ${SITE_URL}/talk-to-a-customer/`,
  ]
    .filter(Boolean)
    .join("\n");
  const res = await c.emails.send({
    from: FROM,
    to: [REFERENCE_TO],
    replyTo: req.email,
    subject,
    text: body,
  });
  if (res.error) {
    return { ok: false, error: res.error.message };
  }
  return { ok: true };
}
