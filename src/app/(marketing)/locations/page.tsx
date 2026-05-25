import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "We supply across Kenya, with the workshop in Nairobi. Nationwide flatbed delivery, on-site install supervision included.",
  alternates: { canonical: "/locations/" },
};

const LOCATIONS = [
  { slug: "kenya", name: "Kenya", scope: "Country page", tier: 1 },
  { slug: "nairobi", name: "Nairobi", scope: "Primary city, 48-hour response", tier: 1 },
  { slug: "mombasa", name: "Mombasa", scope: "Coast region", tier: 2 },
  { slug: "kisumu", name: "Kisumu", scope: "Western Kenya", tier: 2 },
  { slug: "nakuru", name: "Nakuru", scope: "Rift Valley", tier: 2 },
  { slug: "eldoret", name: "Eldoret", scope: "North Rift", tier: 2 },
  { slug: "thika", name: "Thika", scope: "Light industrial corridor", tier: 2 },
];

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="One country,"
        titleAccent="every industrial estate."
        subtitle="Built in Nairobi. Delivered across Kenya. The locations page exists so the geo-pack shows we're physically present in the major industrial cities."
        imageSrc="/images/home/hero-tank-farm.png"
        imageAlt=""
        primaryCta={{ href: "/locations/nairobi/", label: "Nairobi specifics" }}
        secondaryCta={{ href: "/request-quote/", label: "Get a quote" }}
        metaLeft="Nationwide delivery"
        metaRight="Workshop in Nairobi"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations/" },
          ]}
        />
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Where we operate</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Kenya-deep coverage.
          </h2>
        </div>
        <ol className="divide-y divide-border/10 border-y border-border/10">
          {LOCATIONS.map((loc, i) => (
            <li key={loc.slug}>
              <Link
                href={`/locations/${loc.slug}/`}
                className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-surface/40 md:gap-6 md:py-8"
              >
                <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display col-span-10 text-xl font-medium tracking-tight md:col-span-3 md:text-2xl">
                  {loc.name}
                </h3>
                <p className="col-span-12 text-sm text-muted md:col-span-7">
                  {loc.scope}
                </p>
                <span className="col-span-12 flex items-center justify-end text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:col-span-1">
                  <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        headline="In a city not on the list?"
        headlineAccent="We still deliver there."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
