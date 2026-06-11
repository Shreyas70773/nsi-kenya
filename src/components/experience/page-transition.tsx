"use client";

/**
 * Route-transition choreography. A flat iron panel led by a 2px red hairline
 * sweeps the viewport, the brand star pulses at center while the next route
 * commits, then the panel exits upward — 41 pages, one continuous surface.
 *
 * Designed to feel fast: cover in ~0.45s, navigation starts at 70% coverage,
 * exit begins the moment the new route paints. Total dead time on a warm
 * route is under a second.
 *
 * Implementation notes:
 *  - One capture-phase click listener instead of a custom Link wrapper, so
 *    every existing <Link> on the site participates with zero churn.
 *  - External links, hash jumps, modified clicks (cmd/ctrl/shift/alt),
 *    target="_blank", and downloads are left alone.
 *  - Back/forward navigation skips the wipe (no click to intercept).
 *  - A failsafe retracts the panel if a navigation stalls.
 *  - When `enabled` is false (reduced motion) this renders nothing and
 *    navigation behaves natively.
 */
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ enabled }: { enabled: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGPolygonElement>(null);
  const coveredRef = useRef(false);
  const failsafeRef = useRef<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Intercept internal link clicks → wipe in → navigate.
  useEffect(() => {
    if (!enabled) return;

    const uncover = () => {
      const panel = panelRef.current;
      const edge = edgeRef.current;
      const brand = brandRef.current;
      coveredRef.current = false;
      if (!panel || !edge || !brand) return;
      gsap
        .timeline()
        .to(brand, { opacity: 0, y: -14, duration: 0.18, ease: "power2.in" })
        .to(panel, { y: "-101%", duration: 0.5, ease: "expo.inOut" }, "<")
        .set(edge, { y: "-2px", scaleX: 0 })
        .set(panel, { clearProps: "transform" })
        .set(panel, { y: "101%" });
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname) return;

      if (coveredRef.current) {
        e.preventDefault();
        return;
      }

      const panel = panelRef.current;
      const edge = edgeRef.current;
      const brand = brandRef.current;
      const star = starRef.current;
      if (!panel || !edge || !brand) return;

      e.preventDefault();
      coveredRef.current = true;

      gsap
        .timeline()
        .set(edge, { scaleX: 0, y: "100vh" })
        .set(brand, { opacity: 0, y: 14 })
        .set(star, { strokeDashoffset: 1 })
        .to(edge, { scaleX: 1, duration: 0.16, ease: "power2.in" })
        .to([edge, panel], {
          y: 0,
          duration: 0.42,
          ease: "expo.inOut",
          // Start the navigation at ~70% coverage — the route loads while
          // the panel finishes, instead of after.
          onUpdate() {
            if (this.progress() > 0.7 && coveredRef.current && !failsafeRef.current) {
              router.push(href);
              failsafeRef.current = window.setTimeout(() => {
                failsafeRef.current = null;
                if (coveredRef.current) uncover();
              }, 4000);
            }
          },
        })
        .to(brand, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, "-=0.3")
        .to(
          star,
          { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" },
          "<",
        );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [enabled, router]);

  // New route committed → reset scroll under the panel, then reveal.
  useEffect(() => {
    if (!coveredRef.current) return;
    if (failsafeRef.current) {
      window.clearTimeout(failsafeRef.current);
      failsafeRef.current = null;
    }

    const panel = panelRef.current;
    const edge = edgeRef.current;
    const brand = brandRef.current;
    coveredRef.current = false;
    if (!panel || !edge || !brand) return;

    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent("ns:page-enter"));

    gsap
      .timeline({ delay: 0.05 })
      .to(brand, { opacity: 0, y: -14, duration: 0.18, ease: "power2.in" })
      .to(panel, { y: "-101%", duration: 0.52, ease: "expo.inOut" }, "<+0.05")
      .set(edge, { y: "-2px", scaleX: 0 })
      .set(panel, { clearProps: "transform" })
      .set(panel, { y: "101%" });
  }, [pathname]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="ns-transition">
      <div
        ref={panelRef}
        className="ns-transition__panel"
        style={{ transform: "translateY(101%)" }}
      />
      <div ref={edgeRef} className="ns-transition__edge" />
      <div ref={brandRef} className="ns-transition__brand">
        <svg viewBox="0 0 100 100">
          <polygon
            ref={starRef}
            points="50,4 60.4,38.5 96,38.5 67.3,60 78,94 50,72.5 22,94 32.7,60 4,38.5 39.6,38.5"
            fill="none"
            stroke="#da2023"
            strokeWidth={2}
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        </svg>
        <span>North Star Impex</span>
      </div>
    </div>
  );
}
