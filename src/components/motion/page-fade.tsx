"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Subtle page-entry fade-in. Pure CSS animation so the page is always visible
 * even if JS fails to load. Re-triggers on client-side navigation by toggling
 * a key bound to the pathname.
 *
 * prefers-reduced-motion: the @media rule in globals.css disables the keyframe
 * so users with reduced motion settings see content instantly.
 */
export function PageFade({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("page-fade-in");
    void el.offsetWidth;
    el.classList.add("page-fade-in");
  }, [pathname]);

  return (
    <div ref={ref} className="page-fade-in">
      {children}
    </div>
  );
}
