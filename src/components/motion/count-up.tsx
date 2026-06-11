"use client";

/**
 * Number tick-up on scroll entry. Renders the final value server-side (SEO
 * and no-JS safe), then counts from zero when the element first enters the
 * viewport. Mono + tabular numerals so digits don't jitter.
 *
 * Reduced motion: the final value just stays put.
 */
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const state = { v: 0 };
      gsap.to(state, {
        v: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.v).toLocaleString("en-KE")}${suffix}`;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {value.toLocaleString("en-KE")}
      {suffix}
    </span>
  );
}
