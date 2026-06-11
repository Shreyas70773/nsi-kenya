"use client";

/**
 * Gate + lazy-mount wrapper for WebGL scenes.
 *
 * Rules it enforces:
 *  - three.js never enters the shared bundle — scenes are dynamic imports,
 *    code-split per scene, loaded only when this frame approaches the
 *    viewport (300px margin).
 *  - Tier gate: anything below "full" renders the `fallback` (real
 *    photography) instead. Reduced motion never loads WebGL.
 *  - The fallback also covers SSR, no-JS, and load failure — the page is
 *    complete without WebGL; the scene is an enhancement.
 */
import dynamic from "next/dynamic";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { useExperience } from "@/components/experience/experience-context";

const TankScene = dynamic(
  () => import("./tank-scene").then((m) => m.TankScene),
  { ssr: false },
);
const TelemetryScene = dynamic(
  () => import("./telemetry-scene").then((m) => m.TelemetryScene),
  { ssr: false },
);

type SceneName = "tank" | "telemetry";

export function SceneFrame({
  scene,
  fallback,
  className,
  progress,
}: {
  scene: SceneName;
  /** Rendered for lite/static tiers, SSR, and while the scene loads. */
  fallback: ReactNode;
  className?: string;
  /** Scroll progress (0–1) driven by the host section, read per frame. */
  progress?: RefObject<number>;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const { tier, dpr } = useExperience();
  const wantScene = tier === "full";

  useEffect(() => {
    if (!wantScene) return;
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [wantScene]);

  const showScene = wantScene && near;

  return (
    <div ref={hostRef} className={className}>
      {showScene ? (
        scene === "tank" ? (
          <TankScene dpr={dpr} progress={progress} />
        ) : (
          <TelemetryScene dpr={dpr} />
        )
      ) : (
        fallback
      )}
    </div>
  );
}
