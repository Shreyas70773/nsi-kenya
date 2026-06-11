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
  title: "Structural Fabrication Nairobi: Platforms, Pipe Racks",
  description:
    "In-house structural steel fabrication in Nairobi for industrial plants. Platforms, walkways, tank supports, pipe racks, equipment skids. Eurocode 3, AWS D1.1.",
  alternates: { canonical: "/products/structural-works/" },
  keywords: [
    "structural fabrication Nairobi",
    "industrial fabrication Kenya",
    "steel fabrication Nairobi",
    "tank support structure Kenya",
    "pipe rack fabrication Kenya",
    "equipment skid Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Structural Fabrication Nairobi: Platforms, Pipe Racks",
    description:
      "In-house structural steel fabrication in Nairobi for industrial plants. Platforms, walkways, tank supports, pipe racks, equipment skids. Eurocode 3, AWS D1.1.",
    url: "/products/structural-works/",
    images: [{ url: "/images/products/structural-works-hero.png" }],
  },
};

const SCOPE = [
  {
    title: "Platforms and access",
    copy: "Operator platforms around vessels, sample stations, and mezzanine decks. Galvanised grating, kick-plates, and handrails to plant safety code.",
  },
  {
    title: "Walkways and catwalks",
    copy: "Inter-silo catwalks, pipe-bridge walkways, and tank-roof access bridges. Modular bays for fast field assembly.",
  },
  {
    title: "Tank supports and saddles",
    copy: "Vertical tank skirts, horizontal tank saddles, and elevated tank supports for our own tanks or yours.",
  },
  {
    title: "Pipe racks and supports",
    copy: "Multi-tier pipe racks, individual pipe supports, and service-line carrier structures.",
  },
  {
    title: "Equipment skids",
    copy: "Pump skids, instrument skids, packaged ETP skids. Pre-piped and pre-wired ex-works where the spec allows.",
  },
  {
    title: "Plant retrofits",
    copy: "Cutting and reinforcement work on existing structures, including in-situ welding and post-weld treatment.",
  },
];

const SPECS = [
  { label: "Standard materials", value: "Carbon steel S275 / S355, hot-dip galvanised on request" },
  { label: "Welding standards", value: "AWS D1.1, MIG and stick processes, qualified welders" },
  { label: "Finishes available", value: "Mill, primed, two-coat epoxy, hot-dip galvanised" },
  { label: "Design standards", value: "Eurocode 3 (steel structures), British Standards on request" },
  { label: "Drawing turnaround", value: "Concept GA within 5 working days of brief sign-off" },
  { label: "Workshop capacity", value: "Up to 30 tonnes per month, scaling with order book" },
  { label: "Delivery", value: "On flatbed within Kenya; abnormal-load permits handled in-house" },
] as const;

export default function StructuralWorksPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Structural Fabrication Works",
          material: "Carbon steel S275 / S355, hot-dip galvanised on request",
          category: "Industrial Structural Fabrication",
          description:
            "In-house structural steel fabrication for Kenyan industrial plants: platforms, walkways, tank supports, pipe racks.",
          url: `${SITE_URL}/products/structural-works/`,
        })}
      />

      <PageHero
        eyebrow="Products / Structural Works"
        title="Steel that holds"
        titleAccent="the rest of the plant up."
        subtitle="Platforms, walkways, tank supports, pipe racks, and equipment skids fabricated in our own workshop. Concept GA drawings inside a week, ex-works inside the month, on flatbed to your plant on the date we promised."
        imageSrc="/images/products/structural-works-hero.png"
        imageAlt="A finished structural-steel platform around a process vessel, mid-installation"
        primaryCta={{ href: "/request-quote/", label: "Get a structural quote" }}
        secondaryCta={{ href: "/products/", label: "All products" }}
        metaLeft="In-house workshop"
        metaRight="Eurocode 3 to AWS D1.1"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Structural Works", href: "/products/structural-works/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeader
              index="01"
              eyebrow="What we fabricate"
              title="The structural envelope around your process equipment."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Most of our structural work is in support of our own tanks
                and silos. But the workshop is open: we fabricate platforms,
                walkways, tank supports, pipe racks, and equipment skids for
                any plant scope where the design fits Eurocode 3 or AWS D1.1.
              </p>
              <p>
                Concept drawings come back within five working days. From
                approved drawings to ex-works delivery is typically three to
                six weeks depending on tonnage and finish.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      {/* Full-bleed fabrication strip — hero photograph recropped, breaking
          the container rhythm between the brief and the scope grid. */}
      <div className="relative h-[50vh] overflow-hidden md:h-[65vh]">
        <ParallaxImage className="absolute inset-0">
          <Image
            src="/images/products/structural-works-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_70%]"
          />
        </ParallaxImage>
        <p className="font-mono-label absolute bottom-6 left-6 z-[1] text-[10px] text-white/75 md:bottom-8 md:left-8">
          Concept GA inside a week · ex-works inside the month
        </p>
      </div>

      <Section bordered theme="paper">
        <SectionHeader
          index="02"
          eyebrow="Scope"
          title="Six scope buckets, fabricated locally."
        />
        <Reveal stagger={0.08}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {SCOPE.map((s) => (
              <div
                key={s.title}
                data-reveal-item
                className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{s.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Pull quote — the open-workshop line. */}
      <Section size="compact" ariaLabel="Workshop scope">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-4 md:col-span-5">
            <span aria-hidden className="hairline h-px w-12" />
            <p className="font-mono-label text-[10px] text-faint">
              The workshop · Nairobi
            </p>
          </div>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            “Most of our structural work is in support of our own tanks and
            silos. But the workshop is open.”
          </TextReveal>
        </div>
      </Section>

      {/* Iron statement — the delivery promise, in the page's own numbers. */}
      <Section theme="iron" size="spacious" ariaLabel="Delivery promise">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="03">The promise</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              Drawings inside a week. Ex-works inside the month.{" "}
              <span className="text-accent">
                On flatbed on the date we promised.
              </span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-3xl md:grid-cols-3">
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Concept GA turnaround
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={5} suffix=" days" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Working days from brief sign-off to concept drawings.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Workshop capacity
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={30} suffix=" t" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Per month, scaling with the order book.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Drawings to ex-works
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={6} suffix=" wk" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Typically three to six weeks, by tonnage and finish.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="font-mono-label hairline-t flex flex-col gap-2 pt-5 text-[10px] text-faint md:flex-row md:items-center md:justify-between">
            <span>In-house workshop</span>
            <span>Eurocode 3 · AWS D1.1 · qualified welders</span>
            <span>Abnormal-load permits handled in-house</span>
          </div>
        </div>
      </Section>

      <Section bordered theme="paper">
        {/* Datasheet header strip — document-style meta row. */}
        <div className="font-mono-label hairline-t hairline-b mb-10 flex flex-col gap-2 py-3 text-[10px] text-faint md:mb-14 md:flex-row md:items-center md:justify-between">
          <span>NS-ST-FW · S275 / S355</span>
          <span className="hidden md:block">Specification</span>
          <span>Eurocode 3 · AWS D1.1</span>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeader
              index="04"
              eyebrow="Specifications"
              title="Standards we work to."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Got a steel scope on a deadline?"
        headlineAccent="We start drawings on Monday."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
