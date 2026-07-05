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
import { RelatedProducts } from "@/components/primitives/related-products";
import { JsonLd } from "@/components/seo/json-ld";
import { productLd, faqLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { FaqList } from "@/components/primitives/faq-list";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax";

export const metadata: Metadata = {
  title: "Grain Storage Silo Kenya: Brewery & Feed Mill",
  description:
    "Industrial grain storage silos for Kenyan breweries, feed mills, and food processors. 10 to 500 MT galvanised, with aeration and radar level on every install.",
  alternates: { canonical: "/products/silos/grain-storage/" },
  keywords: [
    "grain storage silo Kenya",
    "grain silo price Kenya",
    "grain silo cost Kenya",
    "grain silo for sale Kenya",
    "silo manufacturer Nairobi",
    "brewery grain silo Kenya",
    "feed mill silo Kenya",
    "industrial grain silo East Africa",
    "galvanised grain silo Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Grain Storage Silo Kenya: Brewery & Feed Mill",
    description:
      "Industrial grain storage silos for Kenyan breweries, feed mills, and food processors. 10 to 500 MT galvanised, with aeration and radar level on every install.",
    url: "/products/silos/grain-storage/",
    images: [{ url: "/images/products/silos-grain-storage-hero.png" }],
  },
};

const SPECS = [
  { label: "Material", value: "Hot-dip galvanised steel, corrugated wall panels" },
  { label: "Capacity range", value: "10 to 500", unit: "MT" },
  { label: "Diameter range", value: "3 to 11", unit: "m" },
  { label: "Roof type", value: "Conical roof, 30° pitch, aluminium or galvanised" },
  { label: "Hopper option", value: "Flat-bottom with sweep auger, or 45° hopper for clean discharge" },
  { label: "Aeration", value: "Optional cross-flow fans with under-floor ducting" },
  { label: "Level instrumentation", value: "Radar (continuous) or rotary paddle (set-point)" },
  { label: "Catwalk and access", value: "Galvanised catwalks between silos, OSHA-style cages on ladders" },
  { label: "Inventory tracking", value: "Connects to our remote-monitoring app, personalised to your site" },
  { label: "Lead time", value: "8 to 12 weeks ex-works, plus on-site assembly" },
] as const;

const FAQS = [
  {
    question: "Do I really need aeration on a grain silo?",
    answer:
      "On anything above 50 MT and any silo running in lowland or coastal humidity, yes. Tropical-climate grain silos without aeration eventually develop hot spots, condensation, and quality problems. Cross-flow fans with under-floor ducting are inexpensive to fit during fabrication and expensive to retrofit later.",
  },
  {
    question: "What level instrument should I use on a grain silo?",
    answer:
      "Radar (26 GHz or 80 GHz) is the right answer for continuous level readout, including inventory tracking. Rotary paddle is the right answer for cheap high-level alarms or set-point detection only. Most of our brewery and feed-mill customers want both: paddle for hi/hi alarm, radar for inventory.",
  },
  {
    question: "How do I size a silo array for a brewery or feed mill?",
    answer:
      "Per-silo capacity is driven by the upstream conveyor, not the plant. For craft breweries, 20 to 80 MT per malt silo is the typical range; for large industrial breweries, 100 to 300 MT. Feed mills cluster around 50 to 150 MT for raw grain intake. We design the array against your conveyor geometry and turnover rate.",
  },
  {
    question: "How is a silo array delivered and assembled?",
    answer:
      "Galvanised panels and the conical roof leave our workshop on flatbed. On-site assembly is bolted, no field welding, with our supervisor on the crew. A 4-silo array on a prepared concrete pad typically erects in 3 to 5 weeks, with electrical, aeration ducting, and level instrumentation tied in during the same window.",
  },
] as const;

const APPLICATIONS = [
  {
    title: "Breweries",
    copy: "Malt and adjunct storage between intake and milling. Typical sizing per silo: 20 to 80 MT for craft, 100 to 300 MT for large-scale breweries.",
  },
  {
    title: "Feed mills",
    copy: "Maize, wheat, and oilseed intake silos plus finished-feed dispatch silos. We design the array around your conveyor geometry.",
  },
  {
    title: "Food processors",
    copy: "Bakery flour storage, mill intake, soya and pulse handling. Aeration recommended for tropical climates.",
  },
];

export default function GrainStorageSilosPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Grain Storage Silos",
          material: "Hot-dip galvanised steel",
          category: "Industrial Silo",
          description:
            "Industrial grain storage silos from 10 to 500 MT for Kenyan breweries, feed mills, and food processors.",
          url: `${SITE_URL}/products/silos/grain-storage/`,
        })}
      />
      <JsonLd
        data={faqLd(
          FAQS.map((f) => ({ question: f.question, answer: f.answer })),
        )}
      />

      <PageHero
        eyebrow="Silos / Grain Storage"
        title="Grain storage silos,"
        titleAccent="built for breweries and feed mills."
        subtitle="Galvanised grain silos for breweries, feed mills, and food processors. Aeration, level instrumentation, catwalks, and inventory hardware can all be specified on the install. Every silo can be connected to a remote-monitoring app, personalised to your site. Sized between 10 and 500 metric tonnes per silo."
        imageSrc="/images/products/silos-grain-storage-hero.png"
        imageAlt="Galvanised grain storage silos at a brewery with conveyor and catwalk"
        primaryCta={{ href: "/request-quote/", label: "Spec a silo" }}
        secondaryCta={{
          href: "/products/silos/",
          label: "Compare silo types",
        }}
        metaLeft="10 to 500 MT per silo"
        metaRight="Galvanised · Aerated · Instrumented"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Silos", href: "/products/silos/" },
            { label: "Grain Storage", href: "/products/silos/grain-storage/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeader
              index="01"
              eyebrow="What it is"
              title="Storage and instrumentation, sized together."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                A storage silo without aeration in a tropical climate
                eventually becomes a quality problem. Without level
                instrumentation, it becomes an inventory problem.
              </p>
              <p>
                We treat both as defaults, not options. The base silo is a
                hot-dip galvanised cylindrical vessel with a 30° conical
                roof. On top of that, we add cross-flow aeration to manage
                grain moisture and radar level transmitters to give the
                plant a real-time inventory readout.
              </p>
              <p>
                Catwalks span between silos so your operators can walk the
                array safely. Ladder cages are OSHA-style. Discharge is via
                sweep auger or a 45° hopper, your call based on the
                downstream conveyor.
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
            src="/images/products/silos-grain-storage-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_25%]"
          />
        </ParallaxImage>
        <p className="font-mono-label absolute bottom-6 left-6 z-[1] text-[10px] text-white/75 md:bottom-8 md:left-8">
          Galvanised · aerated · instrumented — 10 to 500 MT per silo
        </p>
      </div>

      <Section bordered theme="paper">
        {/* Datasheet header strip — document-style meta row. */}
        <div className="font-mono-label hairline-t hairline-b mb-10 flex flex-col gap-2 py-3 text-[10px] text-faint md:mb-14 md:flex-row md:items-center md:justify-between">
          <span>NS-SL-GR · hot-dip galvanised</span>
          <span className="hidden md:block">Specification</span>
          <span>30° conical roof · ex-works 8–12 wk</span>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeader
              index="02"
              eyebrow="Specifications"
              title="The base spec, then your overlays."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="03"
          eyebrow="Where they fit"
          title="Sized for East African plants, not export-only volumes."
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

      {/* Iron statement — defaults, not options, in the page's own numbers. */}
      <Section theme="iron" size="spacious" ariaLabel="Defaults, not options">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="04">Defaults, not options</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              Without aeration, a quality problem. Without instrumentation,
              an inventory problem.{" "}
              <span className="text-accent">
                We treat both as defaults, not options.
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
                  <CountUp value={500} suffix=" MT" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  From 10 MT craft intake to 500 MT industrial malt.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Diameter ceiling
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={11} suffix=" m" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Corrugated galvanised wall panels, 3 to 11 m.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Conical roof pitch
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={30} suffix="°" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Aluminium or galvanised, sweep auger or 45° hopper below.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="font-mono-label hairline-t flex flex-col gap-2 pt-5 text-[10px] text-faint md:flex-row md:items-center md:justify-between">
            <span>10 to 500 MT per silo</span>
            <span>Radar inventory · rotary paddle alarms</span>
            <span>Bolted on-site, no field welding</span>
          </div>
        </div>
      </Section>

      {/* Pull quote — the aeration argument, in one sentence. */}
      <Section size="compact" ariaLabel="Aeration guidance">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-4 md:col-span-5">
            <span aria-hidden className="hairline h-px w-12" />
            <p className="font-mono-label text-[10px] text-faint">
              Aeration guidance · tropical-climate storage
            </p>
          </div>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            “Cross-flow fans with under-floor ducting are inexpensive to fit
            during fabrication and expensive to retrofit later.”
          </TextReveal>
        </div>
      </Section>

      <Section bordered theme="paper">
        <SectionHeader
          index="05"
          eyebrow="Common questions"
          title="What brewery and feed-mill operators ask first."
        />
        <FaqList items={FAQS} />
      </Section>

      <RelatedProducts
        headline="What sits around a grain silo."
        items={[
          {
            href: "/products/silos/feed-storage/",
            title: "Feed storage silos",
            copy: "Smaller-format silos for finished-feed dispatch, poultry farms, and dairy operations.",
            imageSrc: "/images/products/silos-feed-storage-hero-v2.png",
            imageAlt: "Galvanised feed storage silo at a farm",
          },
          {
            href: "/industries/alcohol-distilling/",
            title: "Brewery & distillery",
            copy: "Where most of our larger malt silos land. Mash, lauter, fermentation, and grain storage as a single package.",
            imageSrc: "/images/industries/alcohol-distilling-hero.png",
            imageAlt: "Stainless brewing vessels inside a brewery",
          },
          {
            href: "/products/instruments/level/",
            title: "Level transmitters",
            copy: "Radar level transmitters for continuous inventory readout, plus rotary paddle for high-level alarms.",
            imageSrc: "/images/products/instruments-level-hero.png",
            imageAlt: "Radar level transmitter mounted on a silo",
          },
        ]}
      />

      <CtaBand
        headline="Designing a new grain bay?"
        headlineAccent="Book a site audit, we measure for free."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
