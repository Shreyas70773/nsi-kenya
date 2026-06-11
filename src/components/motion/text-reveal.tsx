"use client";

/**
 * Masked line reveal for display headlines — the redesign's signature text
 * entrance. SplitText (free since GSAP 3.13) splits into masked lines that
 * rise from beneath their own baseline.
 *
 *  - `mode="scroll"` (default): plays once when the element enters viewport.
 *  - `mode="mount"`: plays immediately on hydration — for above-the-fold
 *    heroes. Waits for the intro sequence when one is running.
 *
 * Accessibility: SplitText's `aria: "auto"` keeps an aria-label with the
 * original text on the wrapper. Reduced motion renders the text untouched.
 * The element is server-rendered as plain markup, so SEO sees real text.
 */
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useIntroGate } from "@/components/experience/intro-sequence";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

type Props = {
  children: ReactNode;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  mode?: "scroll" | "mount";
  /** Per-line stagger in seconds. */
  stagger?: number;
  delay?: number;
  duration?: number;
};

export function TextReveal({
  children,
  as = "div",
  className,
  mode = "scroll",
  stagger = 0.09,
  delay = 0,
  duration = 1.1,
}: Props) {
  // Narrow cast keeps the polymorphic tag type-checkable with a ref;
  // at runtime the actual tag string ("h2", "p", …) is rendered.
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const introDone = useIntroGate();
  const ready = mode === "scroll" || introDone;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !ready) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "ns-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 112,
            duration,
            ease: "expo.out",
            stagger,
            delay,
            ...(mode === "scroll"
              ? {
                  scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none none",
                  },
                }
              : {}),
          }),
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [ready] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
