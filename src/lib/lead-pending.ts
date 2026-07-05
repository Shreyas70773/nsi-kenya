import type { LeadJourney } from "./analytics";

/**
 * Exactly-once conversion signal between a form submit and its thank-you
 * page. Server actions redirect on success, so the form client never sees
 * a success state to fire generate_lead from; instead the form marks a
 * pending token before submit and the thank-you page consumes it. Direct
 * visits, reloads, and back-navigation find no token and fire nothing —
 * that is what keeps GA4/Meta counts equal to real submissions.
 */

const KEY_PREFIX = "ns-lead-pending:";

export function markLeadPending(journey: LeadJourney): void {
  try {
    sessionStorage.setItem(`${KEY_PREFIX}${journey}`, "1");
  } catch {
    // Storage blocked (private mode etc.) — losing the event beats breaking submit.
  }
}

export function consumeLeadPending(journey: LeadJourney): boolean {
  try {
    const key = `${KEY_PREFIX}${journey}`;
    if (sessionStorage.getItem(key) !== "1") return false;
    sessionStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
