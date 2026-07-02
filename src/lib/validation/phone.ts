import { z } from "zod";

/**
 * Kenyan-market phone validation (F-1): phone is the required contact
 * channel here, not email. Accepts local 07XX/01XX and international
 * +254 forms (with any spacing/punctuation) and normalizes Kenyan numbers
 * to E.164 so notifications, the CRM, and WhatsApp all agree. Non-Kenyan
 * numbers with an explicit +country-code pass through — Watertech draws
 * regional buyers and rejecting them costs real leads.
 */
export function normalizeKenyanPhone(raw: string): string | null {
  const s = raw.replace(/[\s\-().]/g, "");
  if (/^0[17]\d{8}$/.test(s)) return `+254${s.slice(1)}`;
  if (/^\+?254[17]\d{8}$/.test(s)) return `+${s.replace(/^\+/, "")}`;
  if (/^\+(?!254)\d{9,15}$/.test(s)) return s;
  return null;
}

export const PHONE_ERROR = "Enter a valid phone number, e.g. +254 7XX XXX XXX";

export const phoneSchema = z
  .string()
  .min(1, PHONE_ERROR)
  .transform((value, ctx) => {
    const normalized = normalizeKenyanPhone(value);
    if (normalized === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: PHONE_ERROR });
      return z.NEVER;
    }
    return normalized;
  });
