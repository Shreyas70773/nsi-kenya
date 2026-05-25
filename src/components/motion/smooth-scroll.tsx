"use client";

/**
 * Lenis smooth-scroll provider. Wraps the page body. Honors
 * prefers-reduced-motion: if reduced, Lenis is not initialized and native
 * scroll behavior is preserved.
 *
 * Lenis is intentionally subtle here — no exaggerated easing, no parallax
 * pyrotechnics. The goal is the imperceptible "expensive-feeling" smoothness
 * that elevates the overall experience without registering as a feature.
 */
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
