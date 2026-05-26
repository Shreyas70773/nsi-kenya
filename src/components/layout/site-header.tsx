"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/products/", label: "Products" },
  { href: "/industries/", label: "Industries" },
  { href: "/about/", label: "About" },
  { href: "/resources/", label: "Resources" },
  { href: "/blog/", label: "Blog" },
] as const;

const SECONDARY = [
  { href: "/contact/", label: "Contact" },
  { href: "/book-consultation/", label: "Book a consultation" },
  { href: "/request-site-audit/", label: "Request a site audit" },
] as const;

/**
 * Floating-pill sticky header with the actual North Star Impex logo.
 * Translucent over the hero, condenses to a solid surface once the user
 * scrolls past 24px. Logo left, primary nav center, accent CTA right.
 *
 * Mobile (<md): the primary nav collapses behind a hamburger button which
 * opens a full-bleed drawer with the same nav links plus the secondary
 * conversion routes. Drawer slides in from the right, traps focus,
 * closes on backdrop click / Escape / route change.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

  // Close drawer on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close drawer on Escape; lock body scroll while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-3 rounded-pill border py-2 pl-3 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 sm:gap-6 sm:py-2.5 sm:pl-4 sm:pr-3",
            scrolled
              ? "border-border/15 bg-surface/90 shadow-[0_8px_32px_-12px_rgb(var(--ns-text-rgb)/0.18)] backdrop-blur-xl"
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
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMenuOpen(true)}
              className="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/15 bg-surface/70 text-text transition-colors hover:bg-surface md:hidden"
            >
              <Menu className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <MobileNavDrawer onClose={() => setMenuOpen(false)} />
      ) : null}
    </>
  );
}

function MobileNavDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div
      id="mobile-nav-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed top-0 left-0 z-[100] h-[100dvh] w-screen md:hidden"
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-text/45 backdrop-blur-sm motion-safe:animate-[fade-in_220ms_ease-out_forwards]"
      />
      <aside className="absolute top-0 right-0 flex h-[100dvh] w-[88%] max-w-sm flex-col bg-bg shadow-[0_24px_80px_-24px_rgb(var(--ns-text-rgb)/0.35)] motion-safe:animate-[slide-in-right_300ms_cubic-bezier(0.22,1,0.36,1)_forwards]">
        <div className="flex items-center justify-between border-b border-border/10 px-5 pt-5 pb-4">
          <Image
            src="/brand/logo.png"
            alt="North Star Impex Kenya"
            width={215}
            height={94}
            className="h-9 w-auto"
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/15 bg-surface text-text transition-colors hover:bg-surface-2"
          >
            <X className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </button>
        </div>

        <nav
          aria-label="Mobile primary"
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="press flex items-center justify-between rounded-button px-3 py-3 text-base font-medium text-text transition-colors hover:bg-surface-2"
            >
              {item.label}
              <ArrowUpRight
                className="h-4 w-4 text-faint"
                strokeWidth={2.2}
                aria-hidden
              />
            </Link>
          ))}

          <div className="my-3 border-t border-border/10" />

          {SECONDARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="press flex items-center justify-between rounded-button px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              {item.label}
              <ArrowUpRight
                className="h-3.5 w-3.5 text-faint"
                strokeWidth={2.2}
                aria-hidden
              />
            </Link>
          ))}
        </nav>

        <div className="border-t border-border/10 px-5 py-5">
          <Link
            href="/request-quote/"
            onClick={onClose}
            className="press inline-flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
          >
            Get a quote
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </Link>
        </div>
      </aside>
    </div>
  );
}
