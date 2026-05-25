import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";

export const metadata: Metadata = {
  title: "Industrial Silos Kenya: Grain, Feed, Bulk",
  description:
    "Galvanised steel silos for Kenyan breweries, feed mills, and bulk-handling plants. 10 to 1,000 MT with aeration, catwalks, and inventory hardware on request.",
  alternates: { canonical: "/products/silos/" },
  keywords: [
    "industrial silo Kenya",
    "grain silo Kenya",
    "feed silo Kenya",
    "bulk silo Kenya",
    "silo manufacturer Nairobi",
    "galvanised silo Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Industrial Silos Kenya: Grain, Feed, Bulk",
    description:
      "Galvanised steel silos for Kenyan breweries, feed mills, and bulk-handling plants. 10 to 1,000 MT with aeration, catwalks, and inventory hardware on request.",
    url: "/products/silos/",
    images: [{ url: "/images/products/silos-overview-hero.png" }],
  },
};

const SILO_TYPES = [
  {
    href: "/products/silos/grain-storage/",
    title: "Grain Storage Silos",
    capacity: "10 to 500 MT",
    best: "Breweries, food processors, grain handlers",
  },
  {
    href: "/products/silos/feed-storage/",
    title: "Feed Storage Silos",
    capacity: "5 to 100 MT",
    best: "Feed mills, poultry operations",
  },
  {
    href: "/products/silos/industrial-bulk/",
    title: "Industrial Bulk Silos",
    capacity: "10 to 1000 MT",
    best: "Cement, powder handling, food ingredients",
  },
];

export default function SilosOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Products / Silos"
        title="Storage that"
        titleAccent="moves with your plant."
        subtitle="Galvanised steel silos for grain, feed, and bulk materials. Conveyor catwalks, aeration, level instrumentation, and inventory tracking are all options, not retrofits. Sized between ten and a thousand metric tonnes."
        imageSrc="/images/products/silos-overview-hero.png"
        imageAlt=""
        primaryCta={{ href: "/request-quote/", label: "Spec a silo" }}
        secondaryCta={{ href: "/products/", label: "All products" }}
        metaLeft="Grain · Feed · Industrial"
        metaRight="10 to 1000 MT"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Silos", href: "/products/silos/" },
          ]}
        />
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Three classes</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Pick by what you store and how often you cycle it.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
          {SILO_TYPES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="press group flex flex-col gap-4 rounded-card border border-border/10 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
            >
              <span className="font-mono-label text-[10px] text-accent">
                {s.capacity}
              </span>
              <h3 className="font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Best for {s.best.toLowerCase()}. Carbon or galvanised steel,
                with aeration and inventory hardware on request.
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-text transition-transform duration-300 group-hover:translate-x-1">
                Open
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        headline="Mixing grain and process water in the same plant?"
        headlineAccent="We do both."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
