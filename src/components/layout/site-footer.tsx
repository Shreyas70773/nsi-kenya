import Link from "next/link";
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
    <footer className="mt-24 border-t border-border bg-surface text-sm">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {FOOTER_NAV.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-text/80 transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
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
