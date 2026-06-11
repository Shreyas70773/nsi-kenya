"use client";

/**
 * First-visit cinematic intro (~2.1s, once per session).
 *
 *  1. Cream field. The brand star draws itself stroke-first, then fills red.
 *  2. "NORTH STAR IMPEX" mono label tracks in beneath; a hairline baseline
 *     expands; bottom corners carry fabrication-document metadata and a
 *     000→100 counter.
 *  3. The field lifts with an expo curve, handing off to the hero.
 *
 * Marks `data-intro` on <html> while running so page-level choreography can
 * defer (see useIntroGate). Skips entirely for reduced motion and repeat
 * visits in the same session — internal navigation stays instant.
 */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "ns-intro-seen";
const INTRO_EVENT = "ns:intro-done";

/**
 * Whether this page load runs the intro — decided once at module-evaluation
 * time (before any component renders or effects fire), so gate consumers
 * deeper in the tree can never observe a half-decided state, and StrictMode's
 * double-invoked effects can't consume the session flag twice.
 */
const shouldRunIntro =
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !sessionStorage.getItem(SESSION_KEY);

if (shouldRunIntro) {
  sessionStorage.setItem(SESSION_KEY, "1");
  document.documentElement.setAttribute("data-intro", "running");
}

/** True once the intro has finished (or was never going to run). */
export function useIntroGate(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.documentElement.getAttribute("data-intro") !== "running") {
      const frame = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(frame);
    }
    const onDone = () => setReady(true);
    window.addEventListener(INTRO_EVENT, onDone, { once: true });
    return () => window.removeEventListener(INTRO_EVENT, onDone);
  }, []);

  return ready;
}

export function IntroSequence() {
  const rootRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGPolygonElement>(null);
  const fillRef = useRef<SVGPolygonElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!shouldRunIntro) return;
    const frame = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    if (!root) return;

    document.documentElement.style.overflow = "hidden";
    const counter = { v: 0 };

    const finish = () => {
      document.documentElement.style.overflow = "";
      document.documentElement.removeAttribute("data-intro");
      window.dispatchEvent(new CustomEvent(INTRO_EVENT));
      setActive(false);
    };

    const tl = gsap.timeline({ onComplete: finish });

    tl.set(root, { opacity: 1 })
      // Star draws stroke-first…
      .fromTo(
        starRef.current,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" },
      )
      // …then fills brand red.
      .fromTo(
        fillRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power1.inOut" },
        "-=0.25",
      )
      // Wordmark + baseline + metadata arrive together.
      .fromTo(
        wordRef.current,
        { opacity: 0, letterSpacing: "0.6em" },
        { opacity: 1, letterSpacing: "0.32em", duration: 0.6, ease: "expo.out" },
        "-=0.3",
      )
      .fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "expo.out" },
        "<",
      )
      .fromTo(
        metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power1.out" },
        "<",
      )
      // Counter runs through the whole sequence.
      .to(
        counter,
        {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(
                Math.round(counter.v),
              ).padStart(3, "0");
            }
          },
        },
        0.1,
      )
      // Field lifts away.
      .to(root, {
        yPercent: -100,
        duration: 0.75,
        ease: "expo.inOut",
        delay: 0.15,
      });

    return () => {
      tl.kill();
      finish();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{ opacity: 0, zIndex: "var(--z-intro)" }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-bg"
    >
      <svg viewBox="0 0 100 100" className="h-24 w-24 md:h-32 md:w-32">
        <polygon
          ref={starRef}
          points="50,4 60.4,38.5 96,38.5 67.3,60 78,94 50,72.5 22,94 32.7,60 4,38.5 39.6,38.5"
          fill="none"
          stroke="var(--ns-accent)"
          strokeWidth={1.6}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
        />
        <polygon
          ref={fillRef}
          points="50,4 60.4,38.5 96,38.5 67.3,60 78,94 50,72.5 22,94 32.7,60 4,38.5 39.6,38.5"
          fill="var(--ns-accent)"
          opacity={0}
        />
      </svg>

      <p
        ref={wordRef}
        className="font-mono-label mt-8 text-[11px] text-text"
        style={{ opacity: 0, letterSpacing: "0.6em" }}
      >
        North Star Impex
      </p>
      <div
        ref={ruleRef}
        className="hairline mt-4 h-px w-40 origin-center md:w-56"
        style={{ transform: "scaleX(0)" }}
      />

      <div
        ref={metaRef}
        className="font-mono-label absolute inset-x-7 bottom-7 flex items-end justify-between text-[10px] text-faint md:inset-x-12 md:bottom-10"
        style={{ opacity: 0 }}
      >
        <span>
          Fabricated in Nairobi
          <br />
          1°17′S · 36°49′E
        </span>
        <span ref={countRef} className="text-text">
          000
        </span>
      </div>
    </div>
  );
}
