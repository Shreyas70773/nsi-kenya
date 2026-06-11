"use client";

/**
 * Scroll parallax, two flavors:
 *
 *  <ParallaxImage> — wraps a fill-mode next/image (or any absolutely
 *  positioned media). The media oversizes slightly and drifts vertically as
 *  the container crosses the viewport, giving photography physical depth.
 *
 *  <Parallax speed={…}> — generic drift for decorative elements (watermarks,
 *  oversized numerals). Positive speed lags, negative leads.
 *
 * Transform-only scrub (cheap on weak GPUs); skipped for reduced motion.
 */
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ParallaxImage({
  children,
  className,
  /** Total vertical drift as a % of media height. */
  amount = 12,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const media = el.firstElementChild as HTMLElement | null;
      if (!media) return;

      gsap.fromTo(
        media,
        { yPercent: -amount / 2, scale: 1 + amount / 100 },
        {
          yPercent: amount / 2,
          scale: 1 + amount / 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function Parallax({
  children,
  speed = 0.5,
  className,
}: {
  children: ReactNode;
  /** Drift in viewport-height fractions; positive lags behind the scroll. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        el,
        { y: () => -speed * 80 },
        {
          y: () => speed * 80,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
