import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
import { Marquee } from "@/components/motion/marquee";
import { BrandStar } from "@/components/brand/brand-star";

const FOOTER_NAV = [
  {
    heading: "Products",
    links: [
      { href: "/products/tanks/stainless-steel/", label: "Stainless Steel Tanks" },
      { href: "/products/tanks/zinc-alum/", label: "Zinc-Alum Tanks" },
      { href: "/products/silos/grain-storage/", label: "Grain Storage Silos" },
      { href: "/products/structural-works/", label: "Structural Works" },
      { href: "/products/instruments/", label: "Process Instruments" },
      { href: "/products/iot/", label: "Remote Monitoring" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { href: "/industries/food-and-beverage/", label: "Food & Beverage" },
      { href: "/industries/etp-water-treatment/", label: "ETP & Water Treatment" },
      { href: "/industries/alcohol-distilling/", label: "Alcohol & Distilling" },
      { href: "/industries/chemical-processing/", label: "Chemical Processing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about/", label: "About" },
      { href: "/about/local-manufacturing/", label: "Local Manufacturing" },
      { href: "/locations/", label: "Locations" },
      { href: "/blog/", label: "Blog" },
      { href: "/resources/", label: "Resources" },
    ],
  },
  {
    heading: "Get in Touch",
    links: [
      { href: "/contact/", label: "Contact" },
      { href: "/request-quote/", label: "Request a Quote" },
      { href: "/book-consultation/", label: "Book a Consultation" },
      { href: "/request-site-audit/", label: "Request a Site Audit" },
    ],
  },
] as const;

/**
 * Iron big-type footer. A conversion marquee leads, the link grid sits on
 * the dark field, and an outlined NORTH STAR wordmark crops off the bottom
 * edge — the site signs off like a stamped fabrication plate.
 */
export function SiteFooter() {
  return (
    <footer
      data-theme="dark"
      className="grain relative isolate mt-24 overflow-hidden bg-bg text-sm text-text"
    >
      {/* Conversion marquee — the whole strip is one big door. */}
      <Link
        href="/request-quote/"
        aria-label="Request a quote"
        data-cursor="view"
        data-cursor-label="Quote"
        className="group relative z-[2] block border-b border-border/15 py-7 transition-colors duration-500 hover:bg-accent md:py-9"
      >
        <Marquee duration={26}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-display mx-6 flex items-center gap-6 text-3xl font-semibold tracking-tight whitespace-nowrap text-text transition-colors duration-500 group-hover:text-on-accent md:text-5xl"
            >
              Have a project in mind?
              <span className="text-accent transition-colors duration-500 group-hover:text-on-accent">
                Let&apos;s fabricate it
              </span>
              <ArrowUpRight
                className="h-7 w-7 text-accent transition-colors duration-500 group-hover:text-on-accent md:h-10 md:w-10"
                strokeWidth={2}
                aria-hidden
              />
            </span>
          ))}
        </Marquee>
      </Link>

      <div className="relative z-[2] mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 md:py-20">
        <div className="mb-8 flex flex-col gap-5 border-b border-border/15 pb-8 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-12">
          {/* The wordmark PNG is near-black and disappears on iron — the red
              star + set company line carries the brand here instead. */}
          <div className="flex items-center gap-4">
            <BrandStar filled className="h-10 w-10 md:h-12 md:w-12" />
            <span className="font-mono-label text-[11px] leading-relaxed text-text/85">
              North Star Impex
              <br />
              Kenya LTD
            </span>
          </div>
          <p className="font-display max-w-md text-balance text-xl font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl">
            Made in Kenya,{" "}
            <span className="text-accent">made for East Africa</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 md:grid-cols-4 md:gap-10">
          {FOOTER_NAV.map((col) => (
            <div key={col.heading} className="flex flex-col gap-2.5 md:gap-3">
              <h3 className="font-mono-label text-[10px] text-faint">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2 md:gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-draw text-sm text-text/85 transition-colors hover:text-text md:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/15 pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME} LTD. Fabricated in Kenya.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <a href={`mailto:${CONTACT_EMAIL}`} className="link-draw hover:text-text">
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
              className="link-draw hover:text-text"
            >
              {CONTACT_PHONE}
            </a>
            <Link href="/privacy/" className="link-draw hover:text-text">
              Privacy
            </Link>
            <Link href="/terms/" className="link-draw hover:text-text">
              Terms
            </Link>
          </p>
        </div>

        <div className="mt-4 flex justify-end border-t border-border/15 pt-4 text-[11px] text-faint">
          <p>
            Website made by{" "}
            <a
              href="https://www.pixelandpunch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Pixel and Punch
            </a>
          </p>
        </div>
      </div>

      {/* Stamped wordmark, cropped off the bottom edge. SVG textLength pins
          the full company name edge-to-edge at every viewport width. */}
      <div
        aria-hidden
        className="pointer-events-none relative z-[1] w-full overflow-hidden"
      >
        <svg
          viewBox="0 0 1200 132"
          preserveAspectRatio="none"
          className="block h-auto w-full translate-y-[24%] text-text/25"
        >
          <text
            x="600"
            y="118"
            textAnchor="middle"
            textLength="1184"
            lengthAdjust="spacingAndGlyphs"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="font-display-wide select-none"
            style={{ fontSize: 118, fontWeight: 900 }}
          >
            NORTH STAR IMPEX
          </text>
        </svg>
      </div>
    </footer>
  );
}
