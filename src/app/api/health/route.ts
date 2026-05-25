/**
 * Deployment smoke check. Proves Next.js is alive and Convex is reachable
 * from the runtime env. Hit it after every deploy to catch broken env vars
 * or Convex deploy mismatches before users do.
 *
 *   GET /api/health → 200 { status: "ok", convex: "reachable", at: <iso> }
 *                  or 503 { status: "degraded", convex: "unreachable", error }
 */
import { fetchQuery } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const ping = await fetchQuery(api.health.ping, {});
    return Response.json({
      status: "ok",
      convex: "reachable",
      convexAt: new Date(ping.at).toISOString(),
      at: new Date().toISOString(),
    });
  } catch (e) {
    return Response.json(
      {
        status: "degraded",
        convex: "unreachable",
        error: e instanceof Error ? e.message : String(e),
        at: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
