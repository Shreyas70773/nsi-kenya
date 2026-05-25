import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

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
      { href: "/case-studies/", label: "Case Studies" },
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
      { href: "/talk-to-a-customer/", label: "Talk to a Customer" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/10 bg-surface text-sm">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-12 flex flex-col gap-6 border-b border-border/8 pb-10 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-12">
          <Image
            src="/brand/logo.jpg"
            alt={SITE_NAME}
            width={200}
            height={54}
            className="h-12 w-auto mix-blend-multiply md:h-14"
          />
          <p className="font-display max-w-md text-balance text-2xl font-medium leading-tight tracking-tight md:text-3xl">
            Industrial infrastructure,{" "}
            <span className="text-accent">fabricated in Kenya</span>.
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
      </div>
    </footer>
  );
}
