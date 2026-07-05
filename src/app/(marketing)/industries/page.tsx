import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Industries We Equip in Kenya",
  description:
    "Food and beverage, ETP and water treatment, alcohol and distilling, chemical processing. Four industries, four buying conversations, one Kenya supplier.",
  alternates: { canonical: "/industries/" },
  keywords: [
    "industrial equipment supplier Kenya",
    "food and beverage equipment Kenya",
    "ETP equipment Kenya",
    "brewery equipment Kenya",
    "chemical processing equipment Kenya",
    "industrial sectors Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Industries We Equip in Kenya",
    description:
      "Food and beverage, ETP and water treatment, alcohol and distilling, chemical processing. Four industries, four buying conversations, one Kenya supplier.",
    url: "/industries/",
    images: [{ url: "/images/industries/industries-overview-hero.png" }],
  },
};

const SECTORS = [
  {
    n: "01",
    href: "/industries/food-and-beverage/",
    name: "Food & Beverage",
    pillar: "Capacity expansion, new product line, audit-driven",
    products: "SS 304/316L · Epoxy · Silos · Flow + Level + Temp",
    image: "/images/home/sector-fnb.png",
    imageAlt:
      "Plant operator in hygiene whites inspecting a jacketed stainless fermentation tank",
  },
  {
    n: "02",
    href: "/industries/etp-water-treatment/",
    name: "ETP & Water Treatment",
    pillar: "Environmental compliance, discharge parameters",
    products: "Epoxy-lined · SS · Multi-parameter analyzers · Flow",
    image: "/images/home/sector-etp.png",
    imageAlt:
      "Multiparameter water analyzer panel mounted over a clarifier basin",
  },
  {
    n: "03",
    href: "/industries/alcohol-distilling/",
    name: "Alcohol & Distilling",
    pillar: "Brewing scale-up, distillery containment, grain handling",
    products: "SS · Epoxy · Zinc Aluminium · Grain silos",
    image: "/images/home/sector-alcohol.png",
    imageAlt:
      "Stainless fermenter tagged FV-03 with a copper still in the background",
  },
  {
    n: "04",
    href: "/industries/chemical-processing/",
    name: "Chemical Processing",
    pillar: "Corrosive media, containment, process integrity",
    products: "Epoxy · SS · Pressure + Temp instruments",
    image: "/images/home/sector-chemical.png",
    imageAlt:
      "Epoxy reactor R-2501 with pressure gauge cluster and color-coded process piping",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Four industries,"
        titleAccent="four different buying conversations."
        subtitle="Food and beverage scales with demand, ETP and water treatment scales with regulation, alcohol and distilling scales with brand growth, and chemical processing scales with containment needs. Each industry has its own page covering the equipment and considerations specific to it."
        imageSrc="/images/industries/industries-overview-hero.png"
        imageAlt=""
        primaryCta={{ href: "/request-quote/", label: "Get a quote" }}
        secondaryCta={{ href: "/products/", label: "By product" }}
        metaLeft="F&B · ETP · Alcohol · Chemical"
        metaRight="Sized for East African operators"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries/" },
          ]}
        />
      </Section>

      <Section>
        <SectionHeader
          index="01"
          eyebrow="Pick yours"
          title="We span across the following industries."
          side={
            <p>
              Each sector page covers the equipment we install, the buying
              triggers we see, and the compliance posture we maintain across
              East Africa.
            </p>
          }
        />

        <Reveal effect="scale-in" stagger={0.08}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {SECTORS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                data-reveal-item
                data-cursor="view"
                className="press group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card border border-border/10"
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      "linear-gradient(to top, rgb(8 6 4 / 0.92) 0%, rgb(8 6 4 / 0.55) 38%, rgb(8 6 4 / 0.1) 70%, rgb(8 6 4 / 0) 100%)",
                  }}
                />
                <div className="absolute left-5 top-5">
                  <span className="font-mono-label rounded-pill border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] text-white/85 backdrop-blur-md">
                    Sector {s.n}
                  </span>
                </div>
                <div className="relative flex flex-col gap-2 p-5 md:p-6">
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
                    {s.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/70">
                    {s.pillar}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    Open sector
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaBand
        headline="Got an industry-specific scope?"
        headlineAccent="Talk to engineering."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
