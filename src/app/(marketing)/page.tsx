import Link from "next/link";
import { ImagePlaceholder } from "@/components/placeholders/image-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { webSiteLd } from "@/lib/seo";

/**
 * Phase 0 homepage smoke. Establishes the hierarchy required by the smoke E2E
 * (Task 0.16) and previews the Phase 1 spec-section-4 shape: Crywan above the
 * fold, product matrix (5 cards), CTA hierarchy. Real copywriting and visual
 * polish land in Phase 1 after the Figma palette is confirmed.
 */

const PRODUCT_CARDS = [
  {
    href: "/products/tanks/",
    title: "Tanks",
    body: "Stainless steel, epoxy-lined, and zinc-alum tanks for food, beverage, ETP, and process duty.",
    imageRole: "card" as const,
    imageSubject: "Stainless-steel tank install on a Kenyan plant floor — wide shot",
  },
  {
    href: "/products/silos/",
    title: "Silos",
    body: "Industrial grain, feed, and bulk-material silos from 10MT to 1000MT.",
    imageRole: "card" as const,
    imageSubject: "Three-bay grain silo array outside a brewery — daylight, low angle",
  },
  {
    href: "/products/structural-works/",
    title: "Structural Works",
    body: "Plant platforms, walkways, tank supports, and process-area steel fabrication.",
    imageRole: "card" as const,
    imageSubject: "Steel walkway and tank-support framework mid-installation — overhead",
  },
  {
    href: "/products/instruments/",
    title: "Process Instruments",
    body: "Flow, level, pressure, liquid-analysis, temperature, and system products with 4–20mA, Modbus, HART.",
    imageRole: "card" as const,
    imageSubject: "Cluster of mounted process instruments on a pipe rack — sharp detail",
  },
  {
    href: "/products/iot/",
    title: "Remote Monitoring",
    body: "Optional cloud-connected monitoring on every install — tank levels, flow, water quality, alarms from any device.",
    imageRole: "card" as const,
    imageSubject: "Phone-frame dashboard showing tank levels and a 24h trend line — over-shoulder view",
  },
] as const;

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteLd()} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-6 py-20">
        <section className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            North Star Impex Kenya · industrial infrastructure partner
          </p>
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Industrial tanks, silos, and instruments. Made in Kenya. Trusted by{" "}
            <span className="text-accent">Crywan Industries</span>.
          </h1>
          <p className="max-w-2xl text-base text-muted md:text-lg">
            One supplier across stainless, epoxy-lined, and zinc-alum tanks;
            silos and grain storage; structural fabrication; and the full
            instrument stack — with optional cloud-ready remote monitoring on
            every install.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/request-quote/"
              className="inline-flex items-center justify-center rounded-button bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Get a Quote
            </Link>
            <Link
              href="/talk-to-a-customer/"
              className="inline-flex items-center justify-center rounded-button border border-border bg-surface px-5 py-3 text-sm font-medium text-text transition-colors hover:bg-bg"
            >
              Talk to one of our customers
            </Link>
            <Link
              href="/request-site-audit/"
              className="inline-flex items-center justify-center rounded-button px-5 py-3 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              Book a site audit →
            </Link>
          </div>
        </section>

        <section aria-label="Product range" className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            What we supply
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col gap-4 rounded-card border border-border bg-surface p-5 transition-shadow hover:shadow-lg"
              >
                <ImagePlaceholder
                  role={card.imageRole}
                  description={card.imageSubject}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted">{card.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          aria-label="Trust strip"
          className="rounded-card border border-border bg-surface p-6 text-sm text-muted md:text-base"
        >
          Fabricated in Kenya. Delivered across East Africa. On-site within 48
          hours for Nairobi industrial estates.
        </section>
      </main>
    </>
  );
}
