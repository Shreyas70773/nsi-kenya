import { query } from "./_generated/server";

/**
 * Returns the current server timestamp. Used by /api/health (Next.js route
 * handler) to prove the Convex backend is reachable from the deployment env.
 */
export const ping = query({
  args: {},
  handler: async () => {
    return { ok: true, at: Date.now() };
  },
});
