"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const SESSION_KEY = "ns-intro-seen";

/**
 * First-visit brand intro. Renders a full-bleed overlay with the actual
 * nav-bar logo glowing twice, then sweeps off the top of the viewport
 * like a curtain. Total runtime ~1100ms, hidden after that. Subsequent
 * navigations in the same session skip the overlay so internal nav
 * stays instant.
 *
 * prefers-reduced-motion: skips entirely.
 * Server render: returns null so there is no hydration flash for repeat visits.
 */
export function IntroOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const overlay = ref.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setActive(false);
      },
    });

    tl.set(overlay, { opacity: 1 })
      .fromTo(
        logo,
        { scale: 0.92, opacity: 0, filter: "drop-shadow(0 0 0 rgba(218,32,35,0))" },
        {
          scale: 1,
          opacity: 1,
          filter: "drop-shadow(0 0 28px rgba(218,32,35,0.55))",
          duration: 0.5,
          ease: "expo.out",
        },
      )
      .to(
        logo,
        {
          filter: "drop-shadow(0 0 6px rgba(218,32,35,0.18))",
          duration: 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        },
        "<+0.05",
      )
      .to(
        overlay,
        {
          y: "-100%",
          duration: 0.65,
          ease: "expo.inOut",
        },
        "+=0.1",
      );

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
    >
      <div ref={logoRef} className="will-change-transform">
        <Image
          src="/brand/logo.png"
          alt=""
          width={215}
          height={94}
          priority
          className="h-16 w-auto md:h-20"
        />
      </div>
    </div>
  );
}
