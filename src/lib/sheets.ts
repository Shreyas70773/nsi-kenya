/**
 * Fires a non-blocking POST to a Google Apps Script web-app endpoint that
 * appends each lead row to a Google Sheet. Used by both submitQuote and
 * submitInquiry to feed a single sheet with multiple form types.
 *
 * Configure with the `GSHEETS_WEBHOOK_URL` env var. If the var is missing
 * (e.g. on a preview build before the user wires it up), the call no-ops
 * — Convex is still the source of truth, so leads are never lost.
 */
export type SheetsPayload =
  | {
      form_type: "quote";
      submitted_at: string;
      intent: "explore" | "evaluate" | "purchase" | "urgent-etp";
      name: string;
      company: string;
      email: string;
      phone?: string;
      industry?: string;
      product_slugs?: string;
      message?: string;
    }
  | {
      form_type: "inquiry";
      submitted_at: string;
      kind: "contact" | "consultation" | "site-audit";
      name: string;
      company: string;
      email: string;
      phone?: string;
      industry?: string;
      site_location?: string;
      topic?: string;
      message?: string;
    };

const TIMEOUT_MS = 4000;

/**
 * POSTs the payload as JSON to the Apps Script web app. Errors are logged
 * but never bubble up — Google Apps Script can be slow or temporarily 5xx,
 * and that should not block the user's submission flow.
 */
export async function appendToSheets(payload: SheetsPayload): Promise<void> {
  const url = process.env.GSHEETS_WEBHOOK_URL;
  if (!url) {
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: "follow",
    });
    if (!res.ok) {
      console.error(
        `[appendToSheets] webhook returned ${res.status}: ${await res.text().catch(() => "<no body>")}`,
      );
    }
  } catch (err) {
    console.error("[appendToSheets] webhook call failed:", err);
  } finally {
    clearTimeout(timer);
  }
}
