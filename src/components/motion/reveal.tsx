"use client";

/**
 * Scroll-triggered fade-up reveal. Wraps any block — children animate from
 * opacity 0 + translateY(24px) → opacity 1 + 0 when the wrapper enters the
 * viewport. Staggered when there are multiple direct children with
 * `data-reveal-item`.
 *
 * Per emil-design-eng: hardware-accelerated (transform + opacity only),
 * custom ease-out curve, duration under 800ms, prefers-reduced-motion
 * collapses to instant.
 */
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Props = {
  children: ReactNode;
  /** Stagger between children (seconds). Default 0.06 — tight, not floaty. */
  stagger?: number;
  /** Trigger position; default "top 85%" so reveals fire just before fully in view. */
  start?: string;
  /** Per-item duration. */
  duration?: number;
  /** y-offset in px the items start from. */
  yFrom?: number;
  /** Selector for the children to animate. Default `[data-reveal-item]`,
   *  falls back to direct children if no matches. */
  selector?: string;
  /**
   * Entrance flavor:
   *  - "fade-up"  — opacity + rise (default, the original behavior)
   *  - "mask"     — clip-path wipe from the bottom; for imagery and panels
   *  - "scale-in" — settle from 1.04× with fade; for cards and media tiles
   */
  effect?: "fade-up" | "mask" | "scale-in";
  className?: string;
};

export function Reveal({
  children,
  stagger = 0.06,
  start = "top 85%",
  duration = 0.7,
  yFrom = 24,
  selector = "[data-reveal-item]",
  effect = "fade-up",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set(root.querySelectorAll(selector), { opacity: 1, y: 0 });
        return;
      }
      const items = root.querySelectorAll<HTMLElement>(selector);
      const targets = items.length > 0 ? items : (root.children as unknown as HTMLElement[]);

      const variants = {
        "fade-up": {
          from: { opacity: 0, y: yFrom },
          to: { opacity: 1, y: 0 },
        },
        mask: {
          from: { clipPath: "inset(100% 0% 0% 0%)", y: yFrom / 2 },
          to: { clipPath: "inset(0% 0% 0% 0%)", y: 0 },
        },
        "scale-in": {
          from: { opacity: 0, scale: 1.04, y: yFrom / 2 },
          to: { opacity: 1, scale: 1, y: 0 },
        },
      } as const;
      const { from, to } = variants[effect];

      gsap.fromTo(targets, from, {
        ...to,
        duration: effect === "mask" ? Math.max(duration, 0.9) : duration,
        ease: "expo.out",
        stagger,
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
