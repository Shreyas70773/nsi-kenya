import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kenya",
  description:
    "Industrial tank, silo, structural, and instrument supply across Kenya. Workshop in Nairobi, delivery to Mombasa, Kisumu, Nakuru, Eldoret, Thika, and beyond.",
  alternates: { canonical: "/locations/kenya/" },
};

const KENYA_CITIES = [
  { slug: "nairobi", name: "Nairobi", note: "Primary, 48-hour response" },
  { slug: "mombasa", name: "Mombasa", note: "Coast region, port logistics" },
  { slug: "kisumu", name: "Kisumu", note: "Western Kenya, lakeside industry" },
  { slug: "nakuru", name: "Nakuru", note: "Rift Valley industrial belt" },
  { slug: "eldoret", name: "Eldoret", note: "North Rift, grain and dairy" },
  { slug: "thika", name: "Thika", note: "Light industrial corridor" },
];

export default function KenyaLocationPage() {
  return (
    <>
      <JsonLd
        data={localBusinessLd({
          slug: "kenya",
          name: "Kenya",
          country: "Kenya",
        })}
      />

      <PageHero
        eyebrow="Locations / Kenya"
        title="One workshop in Nairobi,"
        titleAccent="every plant in Kenya."
        subtitle="We deliver to industrial sites across all 47 counties. Most flatbed deliveries land within a day; install and commissioning supervision are usually a week behind."
        imageSrc="/images/home/hero-tank-farm.png"
        imageAlt=""
        primaryCta={{ href: "/request-quote/", label: "Get a quote" }}
        secondaryCta={{ href: "/locations/nairobi/", label: "Nairobi specifics" }}
        metaLeft="Nationwide delivery"
        metaRight="48-hour response in Nairobi"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations/" },
            { label: "Kenya", href: "/locations/kenya/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>Coverage</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Industrial sites across all 47 counties.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                The workshop is in the Nairobi industrial belt. From
                there, our flatbed deliveries reach Mombasa, Kisumu,
                Nakuru, Eldoret, Thika, and any industrial corridor in
                between. Most projects are delivered within a day of
                ex-works dispatch.
              </p>
              <p>
                Install supervision is on-site for the first
                commissioning week, then on-call for the project life.
                We&apos;ve handled abnormal-load permits in-house for
                oversized tanks; nothing about the logistics is novel to
                us.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Cities we ship to</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            The major industrial cities, on the map.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {KENYA_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}/`}
              className="press group flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text)/0.18)]"
            >
              <span className="font-mono-label text-[10px] text-accent">
                Kenya
              </span>
              <h3 className="font-display text-xl font-medium tracking-tight">
                {city.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {city.note}
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
        headline="Site outside Nairobi?"
        headlineAccent="Book a site audit."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
