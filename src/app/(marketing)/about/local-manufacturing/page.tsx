import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { SpecTable } from "@/components/primitives/spec-table";

export const metadata: Metadata = {
  title: "Local Manufacturing",
  description:
    "Inside the North Star Impex Kenya fabrication workshop. TIG welding, rolling, finishing, dye-penetrant testing. Where every tank actually gets built.",
  alternates: { canonical: "/about/local-manufacturing/" },
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
  { label: "Location", value: "Nairobi industrial belt" },
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
        subtitle="This is not an import operation. The tanks are built in Kenya, by Kenyan welders, on machines you can visit. The page below shows the workshop and the process we run on every order."
        imageSrc="/images/about/local-manufacturing-hero.png"
        imageAlt="The workshop entrance with a finished tank being loaded by overhead crane onto a flatbed"
        primaryCta={{ href: "/request-quote/", label: "Quote a project" }}
        secondaryCta={{ href: "/about/", label: "About us" }}
        metaLeft="Nairobi industrial belt"
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

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What you walk into</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              An actual fabrication workshop, not a marketing claim.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                The workshop is in the Nairobi industrial belt. Plate
                rolling machines, TIG and MIG welding bays, dye-
                penetrant test stations, finishing bays, and a flatbed-
                accessible loading yard. Overhead cranes for vessel
                handling.
              </p>
              <p>
                We work to ASME and AWS standards where the spec
                requires it, and to KEBS and client-specific standards
                where it doesn&apos;t. Welder certification is current;
                test records on every weld; vessel commissioning
                supervised on-site.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
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
            <div
              key={shot.src}
              className="relative aspect-[4/3] overflow-hidden rounded-card border border-border/10"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Process</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Every tank goes through six steps.
          </h2>
        </div>
        <ol className="divide-y divide-border/10 border-y border-border/10">
          {PROCESS_STEPS.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-12 gap-4 py-6 md:gap-6 md:py-8"
            >
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                {s.n}
              </span>
              <h3 className="font-display col-span-10 text-xl font-medium tracking-tight md:col-span-3 md:text-2xl">
                {s.title}
              </h3>
              <p className="col-span-12 text-sm text-muted md:col-span-8">
                {s.copy}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Workshop facts</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The capacity, in numbers.
            </h2>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={WORKSHOP_FACTS} />
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Want to visit the workshop?"
        headlineAccent="Book a site audit on our end."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
