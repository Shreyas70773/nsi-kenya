"use client";

/**
 * Velocity-reactive marquee. The track loops endlessly via GSAP; scroll
 * velocity feeds its timeScale so the strip surges as you flick and settles
 * back to cruise speed — one of the "site feels alive" details.
 *
 * Children are rendered twice for the seamless wrap. Falls back to the pure
 * CSS .marquee-track loop on non-"full" tiers, and to a static row for
 * reduced motion (handled by the global media query killing the CSS
 * animation).
 */
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useExperience } from "@/components/experience/experience-context";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Props = {
  children: ReactNode;
  /** Seconds for one full loop at cruise speed. */
  duration?: number;
  /** 1 = leftward (default), -1 = rightward. */
  direction?: 1 | -1;
  className?: string;
  trackClassName?: string;
};

export function Marquee({
  children,
  duration = 32,
  direction = 1,
  className,
  trackClassName,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { tier } = useExperience();
  const reactive = tier === "full";

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>("[data-marquee-track]");
      if (!track || !reactive) return;

      const tween = gsap.fromTo(
        track,
        { xPercent: direction === 1 ? 0 : -50 },
        {
          xPercent: direction === 1 ? -50 : 0,
          duration,
          ease: "none",
          repeat: -1,
        },
      );

      // Scroll velocity surges the loop; the ticker eases it back to cruise.
      let target = 1;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          target = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 3);
        },
      });
      const idle = () => {
        target = gsap.utils.interpolate(target, 1, 0.05);
        tween.timeScale(gsap.utils.interpolate(tween.timeScale(), target, 0.1));
      };
      gsap.ticker.add(idle);

      return () => {
        st.kill();
        gsap.ticker.remove(idle);
        tween.kill();
      };
    },
    { scope: ref, dependencies: [reactive, duration, direction] },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div
        data-marquee-track
        className={cn(
          "flex w-max items-center whitespace-nowrap",
          !reactive && "marquee-track",
          trackClassName,
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
