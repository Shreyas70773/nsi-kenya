"use client";

/**
 * Magnetic hover. The wrapped element leans toward the pointer while hovered
 * and snaps back with an elastic settle on leave. Desktop-only by nature —
 * gated to the "full" tier + fine pointer via useExperience, so phones and
 * reduced-motion users get a plain wrapper.
 *
 * Wrap exactly one interactive element:
 *   <Magnetic><Link …>Get a quote</Link></Magnetic>
 */
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useExperience } from "@/components/experience/experience-context";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

type Props = {
  children: ReactNode;
  /** 0–1: how far the element travels toward the pointer. */
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { tier, finePointer } = useExperience();
  const active = tier === "full" && finePointer;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !active) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * strength);
        yTo(relY * strength);
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.45)",
        });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [active, strength] },
  );

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </div>
  );
}
