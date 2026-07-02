/**
 * Invisible spam protection (F-7): honeypot + minimum-fill-time, with
 * reCAPTCHA v3 layered on top when keys are configured. Philosophy: every
 * check FAILS OPEN — a lost industrial lead costs more than a spam row.
 * Spam-positive submissions pretend success (redirect as normal) so bots
 * learn nothing; they just never reach Convex or anyone's inbox.
 */

export const MIN_FILL_MS = 3000;

export function isSpam({
  honeypot,
  renderedAt,
  now,
}: {
  honeypot: string;
  renderedAt: number;
  now: number;
}): boolean {
  if (honeypot.trim() !== "") return true;
  // Missing/garbage timestamp (storage-blocked browsers, prerendered HTML
  // reused) must never block a real buyer.
  if (!Number.isFinite(renderedAt) || renderedAt <= 0) return false;
  return now - renderedAt < MIN_FILL_MS;
}

/**
 * Server-side reCAPTCHA v3 verification. No-op { ok: true } when the secret
 * is not configured, on network failure, or on a malformed response —
 * fail-open by design (D12).
 */
export async function verifyRecaptcha(
  token: string,
  secret: string | undefined = process.env.RECAPTCHA_SECRET_KEY,
): Promise<{ ok: boolean }> {
  if (!secret) return { ok: true };
  if (!token) {
    // Key configured but no token — script blocked or stripped. Fail open:
    // ad blockers routinely kill reCAPTCHA for real users.
    return { ok: true };
  }
  try {
    const res = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!res.ok) return { ok: true };
    const data = (await res.json()) as { success?: boolean; score?: number };
    if (!data.success) return { ok: false };
    return { ok: (data.score ?? 0) >= 0.5 };
  } catch {
    return { ok: true };
  }
}
