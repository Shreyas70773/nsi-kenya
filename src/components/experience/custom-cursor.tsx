"use client";

/**
 * Branded cursor: a red dot that tracks the pointer 1:1 and a trailing ring
 * that eases behind it. Elements opt into richer states with data attributes:
 *
 *   data-cursor="view"  — ring grows into a filled red disc with a label
 *   data-cursor-label   — the label text (defaults to "View")
 *
 * Mounted only on tier "full" + fine pointer (see ExperienceProvider), so
 * touch devices and reduced-motion users never pay for it. The native cursor
 * is suppressed via html[data-cursor="on"] (restored over text inputs).
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("View");
  const [view, setView] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.setAttribute("data-cursor", "on");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      setVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = (e.target as Element | null)?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      if (target?.dataset.cursor === "view") {
        setView(true);
        setLabel(target.dataset.cursorLabel ?? "View");
      } else {
        setView(false);
      }
    };

    const onLeave = () => setVisible(false);
    const onDown = () => {
      gsap.to(ring, { scale: 0.86, duration: 0.18, ease: "power2.out" });
    };
    const onUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.34, ease: "elastic.out(1, 0.6)" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.removeAttribute("data-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="ns-cursor"
        style={{ opacity: visible && !view ? 1 : 0 }}
      >
        <div className="ns-cursor__dot" style={{ margin: "-3px" }} />
      </div>
      <div
        ref={ringRef}
        aria-hidden
        className={`ns-cursor${view ? " ns-cursor--view" : ""}`}
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="ns-cursor__ring">
          <span className="ns-cursor__label">{label}</span>
        </div>
      </div>
    </>
  );
}
