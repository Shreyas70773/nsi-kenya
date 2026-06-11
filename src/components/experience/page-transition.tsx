"use client";

/**
 * Route-transition choreography. A flat iron panel led by a 2px red hairline
 * wipes up over the viewport, the route changes underneath it, then the
 * panel exits upward — so 41 pages feel like one continuous surface.
 *
 * Implementation notes:
 *  - One capture-phase click listener instead of a custom Link wrapper, so
 *    every existing <Link> on the site participates with zero churn.
 *  - External links, hash jumps, modified clicks (cmd/ctrl/shift/alt),
 *    target="_blank", and downloads are left alone.
 *  - Back/forward navigation skips the wipe (no click to intercept) and the
 *    page's own scroll reveals handle the entrance.
 *  - A failsafe retracts the panel if a navigation stalls, so the UI can
 *    never be left covered.
 *  - When `enabled` is false (reduced motion) this renders nothing and
 *    navigation behaves natively.
 */
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ enabled }: { enabled: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const coveredRef = useRef(false);
  const failsafeRef = useRef<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Intercept internal link clicks → wipe in → navigate.
  useEffect(() => {
    if (!enabled) return;

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
      const samePath = url.pathname === window.location.pathname;
      if (samePath) return; // hash jumps and self-links stay native

      if (coveredRef.current) {
        e.preventDefault();
        return; // already transitioning
      }

      const panel = panelRef.current;
      const edge = edgeRef.current;
      if (!panel || !edge) return;

      e.preventDefault();
      coveredRef.current = true;

      gsap
        .timeline()
        .set(edge, { scaleX: 0, y: "100vh" })
        .to(edge, {
          scaleX: 1,
          duration: 0.28,
          ease: "power3.in",
        })
        .to(
          [edge, panel],
          {
            y: 0,
            duration: 0.52,
            ease: "expo.inOut",
            onComplete: () => {
              router.push(href);
              // Failsafe: never leave the viewport covered.
              failsafeRef.current = window.setTimeout(() => {
                if (coveredRef.current) uncover();
              }, 5000);
            },
          },
          "<+0.05",
        );
    };

    const uncover = () => {
      const panel = panelRef.current;
      const edge = edgeRef.current;
      coveredRef.current = false;
      if (!panel || !edge) return;
      gsap
        .timeline()
        .to(panel, { y: "-101%", duration: 0.6, ease: "expo.inOut" })
        .to(
          edge,
          { y: "-2px", scaleX: 0, duration: 0.3, ease: "power2.out" },
          "<+0.2",
        )
        .set([panel, edge], { clearProps: "transform" })
        .set(panel, { y: "101%" });
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
    coveredRef.current = false;
    if (!panel || !edge) return;

    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent("ns:page-enter"));

    gsap
      .timeline({ delay: 0.1 })
      .to(panel, { y: "-101%", duration: 0.62, ease: "expo.inOut" })
      .to(
        edge,
        { y: "-2px", scaleX: 0, duration: 0.3, ease: "power2.out" },
        "<+0.22",
      )
      .set([panel, edge], { clearProps: "transform" })
      .set(panel, { y: "101%" });
  }, [pathname]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} aria-hidden className="ns-transition">
      <div
        ref={panelRef}
        className="ns-transition__panel"
        style={{ transform: "translateY(101%)" }}
      />
      <div ref={edgeRef} className="ns-transition__edge" />
    </div>
  );
}
