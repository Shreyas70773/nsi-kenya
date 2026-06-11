/**
 * Device-capability detection for the experience layer.
 *
 * The redesign is performance-gated: the full GSAP + WebGL experience only
 * runs where it will feel instant. Everything else falls back to the same
 * content with CSS-level motion (or none at all). Detection is one cheap
 * synchronous pass on mount — no network, no benchmarks.
 *
 * Tiers:
 *  - "static" — prefers-reduced-motion. No choreography; content renders
 *               in its final state. Non-negotiable accessibility floor.
 *  - "lite"   — save-data, low device memory, no WebGL, or coarse pointer
 *               with a weak GPU signal. GSAP reveals stay (cheap, transform
 *               + opacity only); three.js scenes render their static
 *               fallback; cursor and magnetic effects are skipped.
 *  - "full"   — everything: scenes, cursor, scrub choreography.
 */

export type ExperienceTier = "static" | "lite" | "full";

export type Capability = {
  tier: ExperienceTier;
  reducedMotion: boolean;
  finePointer: boolean;
  webgl: boolean;
  saveData: boolean;
  dpr: number;
};

/** SSR-safe default: assume the cautious middle so server markup never
 *  depends on client-only signals. Upgraded in useEffect on mount. */
export const DEFAULT_CAPABILITY: Capability = {
  tier: "lite",
  reducedMotion: false,
  finePointer: false,
  webgl: false,
  saveData: false,
  dpr: 1,
};

function detectWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function detectCapability(): Capability {
  if (typeof window === "undefined") return DEFAULT_CAPABILITY;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const webgl = detectWebgl();

  type NetworkInformation = { saveData?: boolean };
  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;
  const saveData = Boolean(connection?.saveData);

  const deviceMemory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let tier: ExperienceTier = "full";
  if (reducedMotion) tier = "static";
  else if (saveData || !webgl || deviceMemory < 4) tier = "lite";

  return { tier, reducedMotion, finePointer, webgl, saveData, dpr };
}
