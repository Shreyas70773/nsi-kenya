"use client";

import Link from "next/link";
import Image from "next/image";
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
 * Floating-pill sticky header with the actual North Star Impex logo.
 * Translucent over the hero, condenses to a solid surface once the user
 * scrolls past 24px. Logo left, primary nav center, accent CTA right.
 *
 * Mobile sizing tuned for 390px viewport: tighter outer padding, tighter
 * pill padding, shorter CTA label, slightly larger logo so the wordmark
 * detail still reads.
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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-3 rounded-pill border py-2 pl-3 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 sm:gap-6 sm:py-2.5 sm:pl-4 sm:pr-3",
          scrolled
            ? "border-border/15 bg-surface/90 shadow-[0_8px_32px_-12px_rgb(var(--ns-text)/0.18)] backdrop-blur-xl"
            : "border-border/8 bg-surface/55 backdrop-blur-md",
        )}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <Link
          href="/"
          aria-label="North Star Impex Kenya, home"
          className="press flex shrink-0 items-center"
        >
          <Image
            src="/brand/logo.png"
            alt="North Star Impex Kenya"
            width={215}
            height={94}
            priority
            className="h-10 w-auto md:h-10"
          />
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

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/contact/"
            className="press hidden text-sm text-muted transition-colors duration-200 hover:text-text lg:inline"
          >
            Contact
          </Link>
          <Link
            href="/request-quote/"
            className="press inline-flex items-center gap-1.5 rounded-pill bg-accent px-3.5 py-2 text-xs font-medium text-on-accent transition-colors duration-200 hover:bg-accent-strong sm:px-4 sm:text-sm"
          >
            <span className="hidden sm:inline">Get a quote</span>
            <span className="sm:hidden">Quote</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </header>
  );
}
