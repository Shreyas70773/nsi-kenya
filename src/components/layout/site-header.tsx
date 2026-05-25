"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/products/", label: "Products" },
  { href: "/industries/", label: "Industries" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/about/", label: "About" },
] as const;

/**
 * Floating-pill sticky header. Translucent on the hero; condenses to a solid
 * surface once the user scrolls past the first viewport. Logo left, nav
 * center, accent CTA right.
 *
 * Per gpt-taste: avoid the default "full-width bordered bar". Per
 * emil-design-eng: scroll handler is throttled to rAF; transitions specify
 * exact properties (no `all`).
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-6 rounded-pill border px-4 py-2.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          scrolled
            ? "border-border/15 bg-surface/85 shadow-[0_8px_32px_-12px_rgb(var(--ns-text)/0.18)] backdrop-blur-xl"
            : "border-border/8 bg-surface/40 backdrop-blur-md",
        )}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <Link
          href="/"
          aria-label="North Star Impex Kenya — home"
          className="press flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-md bg-text text-on-accent"
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 L14.2 9.5 L22 12 L14.2 14.5 L12 22 L9.8 14.5 L2 12 L9.8 9.5 Z" />
            </svg>
          </span>
          <span className="hidden sm:inline">North Star</span>
          <span className="font-mono-label hidden text-[10px] text-faint md:inline">
            KENYA
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm md:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition-colors duration-200 hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/talk-to-a-customer/"
            className="press hidden text-sm text-muted transition-colors duration-200 hover:text-text lg:inline"
          >
            Talk to a customer
          </Link>
          <Link
            href="/request-quote/"
            className="press inline-flex items-center gap-1.5 rounded-pill bg-text px-4 py-2 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent"
          >
            Get a quote
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </header>
  );
}
