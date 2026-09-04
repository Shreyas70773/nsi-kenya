import { z } from "zod";

/**
 * Lead-friendly phone validation. Formats that are unambiguously Kenyan or
 * international are normalized, while other local numbers are preserved
 * rather than assigned the wrong country code. This avoids rejecting buyers
 * in Ghana, the UAE, and other regional markets.
 */
export function normalizeKenyanPhone(raw: string): string | null {
  const value = raw.trim();
  if (!value || !/^\+?[\d\s\-()./]+$/.test(value)) return null;

  const s = value.replace(/\D/g, "");
  if (s.startsWith("00")) {
    const international = s.slice(2);
    return /^\d{7,15}$/.test(international) ? `+${international}` : null;
  }
  if (!/^\d{7,15}$/.test(s)) return null;

  if (/^0[17]\d{8}$/.test(s)) return `+254${s.slice(1)}`;
  if (/^254\d{9}$/.test(s)) return `+${s}`;
  if (/^[17]\d{8}$/.test(s)) return `+254${s}`;
  if (value.startsWith("+")) return `+${s}`;

  return s;
}

export const PHONE_ERROR = "Enter a phone number with at least 7 digits";

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
