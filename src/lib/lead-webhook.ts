/**
 * Generic CRM webhook (GC-9): fire-and-forget JSON POST per lead so NSI can
 * connect Zoho Bigin (via Zoho Flow or any middleware) without a code
 * change. Mirrors sheets.ts semantics — missing env is a no-op, errors are
 * logged and swallowed, Convex remains the source of truth.
 */

const TIMEOUT_MS = 4000;

export async function postLeadWebhook(
  payload: Record<string, unknown>,
): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;

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
        `[postLeadWebhook] webhook returned ${res.status}: ${await res.text().catch(() => "<no body>")}`,
      );
    }
  } catch (err) {
    console.error("[postLeadWebhook] webhook call failed:", err);
  } finally {
    clearTimeout(timer);
  }
}
