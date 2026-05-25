import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const NAV = [
  { href: "/products/", label: "Products" },
  { href: "/industries/", label: "Industries" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/about/", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-tight text-text"
        >
          {SITE_NAME}
        </Link>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-text"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/request-quote/"
            className="inline-flex items-center justify-center rounded-button bg-accent px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
