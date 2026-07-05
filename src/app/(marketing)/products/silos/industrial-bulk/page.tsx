import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { SpecTable } from "@/components/primitives/spec-table";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax";
import { JsonLd } from "@/components/seo/json-ld";
import { productLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industrial Bulk Silo Kenya: Cement & Powder",
  description:
    "Bulk steel silos for cement, powders, and food ingredients at Kenyan industrial plants. 10 to 1,000 MT, pneumatic conveying compatible, dust collector ready.",
  alternates: { canonical: "/products/silos/industrial-bulk/" },
  keywords: [
    "industrial bulk silo Kenya",
    "cement silo Kenya",
    "powder silo Nairobi",
    "bulk material silo Kenya",
    "pneumatic conveying silo Kenya",
    "ready-mix cement silo Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Industrial Bulk Silo Kenya: Cement & Powder",
    description:
      "Bulk steel silos for cement, powders, and food ingredients at Kenyan industrial plants. 10 to 1,000 MT, pneumatic conveying compatible, dust collector ready.",
    url: "/products/silos/industrial-bulk/",
    images: [{ url: "/images/products/silos-industrial-bulk-hero.png" }],
  },
};

const SPECS = [
  { label: "Material", value: "Carbon steel or hot-dip galvanised, painted finishes on request" },
  { label: "Capacity range", value: "10 to 1000", unit: "MT" },
  { label: "Diameter range", value: "3 to 14", unit: "m" },
  { label: "Hopper angle", value: "60° standard for cement; sized to material angle of repose" },
  { label: "Top fittings", value: "Pneumatic fill line, pressure relief, dust collector mount" },
  { label: "Bottom fittings", value: "Bulk loading spout, slide gate, fluidising pads for cement" },
  { label: "Level monitoring", value: "Continuous radar plus high/low setpoint paddle, default" },
  { label: "Access", value: "Caged ladder with intermediate platforms, top safety rail" },
  { label: "Lead time", value: "10 to 16 weeks ex-works, plus on-site erection" },
] as const;

const APPLICATIONS = [
  {
    title: "Cement and lime",
    copy: "Bulk cement silos for ready-mix yards, block plants, and infrastructure projects. 60° hopper, fluidising pads, pneumatic fill.",
  },
  {
    title: "Powder handling",
    copy: "Industrial powder ingredients (fly ash, gypsum, soda ash). Dust-collector mount standard on top.",
  },
  {
    title: "Food ingredients",
    copy: "Bulk flour, sugar, starch storage for industrial bakeries and food processors. Galvanised, food-grade-compatible coatings on the bottom cone.",
  },
];

export default function IndustrialBulkSilosPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Industrial Bulk Silos",
          material: "Carbon steel or hot-dip galvanised",
          category: "Industrial Silo",
          description:
            "Bulk storage silos for cement, powders, and food ingredients at Kenyan industrial plants. 10 to 1000 MT.",
          url: `${SITE_URL}/products/silos/industrial-bulk/`,
        })}
      />

      <PageHero
        eyebrow="Silos / Industrial Bulk"
        title="Large-scale bulk storage,"
        titleAccent="from a single cement silo to a powder-handling array."
        subtitle="Steel silos for cement, powders, and food ingredients. Pneumatic-conveying compatible, dust-collector ready, radar level monitoring on every install. Sized between 10 and 1000 metric tonnes per silo."
        imageSrc="/images/products/silos-industrial-bulk-hero.png"
        imageAlt="A large industrial bulk silo for cement or powder at an industrial plant"
        primaryCta={{ href: "/request-quote/", label: "Spec a bulk silo" }}
        secondaryCta={{ href: "/products/silos/", label: "All silo types" }}
        metaLeft="10 to 1000 MT"
        metaRight="Pneumatic-conveying compatible"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Silos", href: "/products/silos/" },
            { label: "Industrial Bulk", href: "/products/silos/industrial-bulk/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeader
              index="01"
              eyebrow="What it is"
              title="The structural-engineering end of silo work."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Industrial bulk silos are different from grain or feed
                because the material is heavier, the cycle is faster,
                and the discharge has to be reliable enough that a
                tanker truck below never waits. The hopper angle, the
                fluidising pad layout, and the dust-collector geometry
                all change with the material.
              </p>
              <p>
                We design the structure to Eurocode 3, weld to AWS
                D1.1, and erect on-site for the larger units. Drawings
                and engineering calculations are supplied with every
                quote.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      {/* Full-bleed fabrication strip — hero photograph recropped, breaking
          the container rhythm between the brief and the datasheet. */}
      <div className="relative h-[50vh] overflow-hidden md:h-[65vh]">
        <ParallaxImage className="absolute inset-0">
          <Image
            src="/images/products/silos-industrial-bulk-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_30%]"
          />
        </ParallaxImage>
        <p className="font-mono-label absolute bottom-6 left-6 z-[1] text-[10px] text-white/75 md:bottom-8 md:left-8">
          Pneumatic fill · dust-collector ready · radar level default
        </p>
      </div>

      <Section bordered theme="paper">
        {/* Datasheet header strip — document-style meta row. */}
        <div className="font-mono-label hairline-t hairline-b mb-10 flex flex-col gap-2 py-3 text-[10px] text-faint md:mb-14 md:flex-row md:items-center md:justify-between">
          <span>NS-SL-BK · 10–1,000 MT</span>
          <span className="hidden md:block">Specification</span>
          <span>Eurocode 3 · AWS D1.1 · ex-works 10–16 wk</span>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeader
              index="02"
              eyebrow="Specifications"
              title="The standard build."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      {/* Iron statement — the engineering bar, in the page's own numbers. */}
      <Section theme="iron" size="spacious" ariaLabel="Engineering standard">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="03">The engineering bar</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              Designed to Eurocode 3, welded to AWS D1.1 —{" "}
              <span className="text-accent">
                discharge reliable enough that the tanker below never waits.
              </span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-3xl md:grid-cols-3">
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Capacity ceiling, per silo
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={1000} suffix=" MT" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  From a single 10 MT cement silo to a 1,000 MT array.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Cement hopper angle
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={60} suffix="°" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Standard for cement; otherwise sized to angle of repose.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Diameter ceiling
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={14} suffix=" m" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  3 to 14 m, carbon steel or hot-dip galvanised.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="font-mono-label hairline-t flex flex-col gap-2 pt-5 text-[10px] text-faint md:flex-row md:items-center md:justify-between">
            <span>10 to 1,000 MT per silo</span>
            <span>Fluidising pads · slide gate · loading spout</span>
            <span>Erected on-site for the larger units</span>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="04"
          eyebrow="Applications"
          title="What goes inside them."
        />
        <Reveal stagger={0.08}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {APPLICATIONS.map((a) => (
              <div
                key={a.title}
                data-reveal-item
                className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 md:p-7"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{a.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Pull quote — the engineering deliverable, in one sentence. */}
      <Section size="compact" ariaLabel="Engineering deliverables">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-4 md:col-span-5">
            <span aria-hidden className="hairline h-px w-12" />
            <p className="font-mono-label text-[10px] text-faint">
              Engineering deliverables · every quote
            </p>
          </div>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            “Drawings and engineering calculations are supplied with every
            quote.”
          </TextReveal>
        </div>
      </Section>

      <CtaBand
        headline="Specifying a bulk storage array?"
        headlineAccent="We design and erect."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
