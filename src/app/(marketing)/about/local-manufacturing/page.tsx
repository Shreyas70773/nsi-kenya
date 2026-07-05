import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { SpecTable } from "@/components/primitives/spec-table";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Industrial Fabrication Nairobi: Inside Our Workshop",
  description:
    "Inside our fabrication workshop. TIG welding, plate rolling, dye-penetrant testing, and finishing for every tank and structural assembly. ASME/AWS standards.",
  alternates: { canonical: "/about/local-manufacturing/" },
  keywords: [
    "industrial fabrication Nairobi",
    "TIG welding Kenya",
    "plate rolling Nairobi",
    "dye penetrant testing Kenya",
    "ASME AWS Nairobi",
    "Kenyan fabrication workshop",
  ],
  openGraph: {
    type: "website",
    title: "Industrial Fabrication Nairobi: Inside Our Workshop",
    description:
      "Inside our fabrication workshop. TIG welding, plate rolling, dye-penetrant testing, and finishing for every tank and structural assembly. ASME/AWS standards.",
    url: "/about/local-manufacturing/",
    images: [{ url: "/images/about/local-manufacturing-hero.png" }],
  },
};

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Cutting",
    copy: "CNC plasma and waterjet on incoming plate, sized to drawing.",
  },
  {
    n: "02",
    title: "Rolling",
    copy: "Plate rolled to shell radius on heavy three-roll machines.",
  },
  {
    n: "03",
    title: "Welding",
    copy: "TIG with argon backing for stainless, MIG for carbon steel.",
  },
  {
    n: "04",
    title: "Testing",
    copy: "Dye-penetrant on every seam, hydrotest on every vessel.",
  },
  {
    n: "05",
    title: "Finishing",
    copy: "Surface finish to Ra spec for food-grade, painting or galvanising for structural.",
  },
  {
    n: "06",
    title: "Delivery",
    copy: "Loaded on flatbed at the workshop, delivered to your plant.",
  },
];

const WORKSHOP_FACTS = [
  { label: "Facility", value: "In-house fabrication workshop" },
  { label: "Workshop capacity", value: "Up to 30 tonnes per month of structural fabrication" },
  { label: "Largest tank we can ship", value: "Roughly 50 m³ welded; larger via on-site bolted assembly" },
  { label: "Lead time, standard stainless tank", value: "4 to 8 weeks ex-works" },
  { label: "Welder certification", value: "ASME Section IX for stainless; AWS D1.1 for structural" },
  { label: "Testing", value: "Dye-penetrant per ASME Section V; hydrotest per ASME B31.3" },
  { label: "Source of plate", value: "Mostly East African, with imported when grade requires" },
] as const;

export default function LocalManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="About / Local Manufacturing"
        title="The workshop, the process,"
        titleAccent="the people."
        subtitle="This is not an import operation. The tanks are built in-house by our own welders. The page below shows the workshop and the process we run on every order."
        imageSrc="/images/about/local-manufacturing-hero.png"
        imageAlt="The workshop entrance with a finished tank being loaded by overhead crane onto a flatbed"
        primaryCta={{ href: "/request-quote/", label: "Quote a project" }}
        secondaryCta={{ href: "/about/", label: "About us" }}
        metaLeft="In-house fabrication"
        metaRight="ASME + AWS qualified welders"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about/" },
            { label: "Local Manufacturing", href: "/about/local-manufacturing/" },
          ]}
        />
      </Section>

      {/* ─── 01 · WHAT YOU WALK INTO (iron statement) ──────────────────── */}
      <Section theme="iron" ariaLabel="What you walk into">
        <SectionHeader
          index="01"
          eyebrow="What you walk into"
          title="How our workshop"
          titleAccent="is set up."
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7 md:col-start-6">
            <Reveal stagger={0.08}>
              <div className="flex flex-col gap-5">
                <p
                  data-reveal-item
                  className="text-sm leading-relaxed text-muted md:text-base"
                >
                  Our workshop is equipped with plate rolling machines, TIG
                  and MIG welding bays, dye-penetrant test stations,
                  finishing bays, and a flatbed-accessible loading yard.
                  Overhead cranes handle vessel movement.
                </p>
                <p
                  data-reveal-item
                  className="text-sm leading-relaxed text-muted md:text-base"
                >
                  We work to ASME and AWS standards where the spec
                  requires it, and to relevant regulatory and
                  client-specific standards where it doesn&apos;t. Welder
                  certification is current; test records on every weld;
                  vessel commissioning is supervised on-site.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── WORKSHOP FLOOR (photography) ───────────────────────────────── */}
      <Section theme="paper" bordered ariaLabel="Workshop photography">
        <Reveal effect="scale-in" stagger={0.08}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {[
              {
                src: "/images/about/workshop-cutting.png",
                alt: "Industrial CNC plasma cutting table mid-cut on stainless steel plate, sparks and slag visible, operator in welding mask in background",
              },
              {
                src: "/images/about/workshop-rolling.png",
                alt: "Heavy three-roll plate rolling machine in action, forming a curved stainless steel shell, operator at the controls",
              },
              {
                src: "/images/about/workshop-tig-welding.png",
                alt: "Close-up of a TIG welder mid-strike on a polished stainless steel tank seam, blue arc and sparks visible",
              },
              {
                src: "/images/about/workshop-flatbed.png",
                alt: "Completed polished stainless steel tank strapped to a flatbed truck in the workshop yard at sunrise",
              },
            ].map((shot) => (
              <div key={shot.src} data-reveal-item>
                <ParallaxImage
                  amount={8}
                  className="relative aspect-[4/3] overflow-hidden rounded-card border border-border/10"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </ParallaxImage>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ─── 02 · PROCESS (numbered editorial blocks) ───────────────────── */}
      <Section ariaLabel="Process">
        <SectionHeader
          index="02"
          eyebrow="Process"
          title="Every tank goes through"
          titleAccent="six steps."
        />
        <Reveal stagger={0.07}>
          <ol className="flex flex-col">
            {PROCESS_STEPS.map((s, i) => (
              <li
                key={s.n}
                data-reveal-item
                className={cn(
                  "hairline-t grid grid-cols-12 items-start gap-4 py-6 md:gap-6 md:py-8",
                  i === PROCESS_STEPS.length - 1 && "hairline-b",
                )}
              >
                <span className="font-display-condensed col-span-2 text-4xl font-black leading-[0.85] tracking-tight text-faint/50 md:col-span-1 md:text-5xl">
                  {s.n}
                </span>
                <h3 className="font-display col-span-10 text-xl font-semibold tracking-tight md:col-span-3 md:text-2xl">
                  {s.title}
                </h3>
                <p className="col-span-12 text-sm text-muted md:col-span-8">
                  {s.copy}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* ─── 03 · WORKSHOP FACTS ────────────────────────────────────────── */}
      <Section theme="paper" bordered ariaLabel="Workshop facts">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeader
              index="03"
              eyebrow="Workshop facts"
              title="The capacity, in numbers."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={WORKSHOP_FACTS} />
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Want to move forward?"
        headlineAccent="Request a quote for your project."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
