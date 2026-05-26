import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
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

export function SiteFooter() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden border-t border-border/10 bg-surface text-sm">
      {/* Brand star watermark. Outlined, barely visible, anchored
          bottom-right and cropped off the edge. A faint geometric
          watermark, not a dominant element. */}
      <BrandStar
        filled={false}
        className="pointer-events-none absolute -right-24 -bottom-36 -z-10 hidden h-[420px] w-auto text-text/10 md:block lg:-right-16 lg:-bottom-40 lg:h-[500px]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-12 flex flex-col gap-6 border-b border-border/8 pb-10 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-12">
          <Image
            src="/brand/logo.png"
            alt={SITE_NAME}
            width={215}
            height={94}
            className="h-12 w-auto md:h-14"
          />
          <p className="font-display max-w-md text-balance text-2xl font-medium leading-tight tracking-tight md:text-3xl">
            Built in East Africa{" "}
            <span className="text-accent">for Kenya</span>.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          {FOOTER_NAV.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <h3 className="font-mono-label text-[10px] text-faint">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text/85 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/10 pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME} LTD. Fabricated in Kenya.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-text">
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
              className="hover:text-text"
            >
              {CONTACT_PHONE}
            </a>
            <Link href="/privacy/" className="hover:text-text">
              Privacy
            </Link>
            <Link href="/terms/" className="hover:text-text">
              Terms
            </Link>
          </p>
        </div>

        <div className="mt-4 flex justify-end border-t border-border/8 pt-4 text-[11px] text-faint">
          <p>
            Website made by{" "}
            <a
              href="https://www.pixelpunch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Pixel and Punch
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
