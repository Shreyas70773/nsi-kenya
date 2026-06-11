"use client";

/**
 * Experience context — single mount point for the redesign's global layers:
 * capability tier, custom cursor, and route transitions. Lives once in the
 * root layout, directly inside <body>.
 *
 * Children render server-side as plain content; everything experiential
 * upgrades progressively after hydration. No layout shift, no SEO impact.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_CAPABILITY,
  detectCapability,
  type Capability,
} from "@/lib/capability";
import { CustomCursor } from "./custom-cursor";
import { PageTransition } from "./page-transition";

const ExperienceContext = createContext<Capability>(DEFAULT_CAPABILITY);

export function useExperience(): Capability {
  return useContext(ExperienceContext);
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [capability, setCapability] = useState<Capability>(DEFAULT_CAPABILITY);

  useEffect(() => {
    // Deferred a frame: detection is a client-only upgrade, and the rAF keeps
    // the effect body free of synchronous setState (react-hooks/set-state-in-effect).
    const frame = requestAnimationFrame(() => setCapability(detectCapability()));

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setCapability(detectCapability());
    media.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <ExperienceContext.Provider value={capability}>
      {capability.tier === "full" && capability.finePointer ? (
        <CustomCursor />
      ) : null}
      <PageTransition enabled={capability.tier !== "static"} />
      {children}
    </ExperienceContext.Provider>
  );
}
