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
  title: "Feed Silo Kenya: 5 to 100 MT for Mills and Farms",
  description:
    "Galvanised feed storage silos for Kenyan poultry, feed mills, and dairy farms. 5 to 100 MT, hopper discharge or sweep auger, flexible-auger intake.",
  alternates: { canonical: "/products/silos/feed-storage/" },
  keywords: [
    "feed silo Kenya",
    "poultry feed silo Kenya",
    "animal feed silo Nairobi",
    "feed mill silo Kenya",
    "dairy farm feed silo Kenya",
    "hopper feed silo Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Feed Silo Kenya: 5 to 100 MT for Mills and Farms",
    description:
      "Galvanised feed storage silos for Kenyan poultry, feed mills, and dairy farms. 5 to 100 MT, hopper discharge or sweep auger, flexible-auger intake.",
    url: "/products/silos/feed-storage/",
    images: [{ url: "/images/products/silos-feed-storage-hero-v2.png" }],
  },
};

const SPECS = [
  { label: "Material", value: "Hot-dip galvanised steel, corrugated or smooth wall" },
  { label: "Capacity range", value: "5 to 100", unit: "MT" },
  { label: "Diameter range", value: "2 to 5", unit: "m" },
  { label: "Discharge", value: "45° hopper for clean gravity flow, or sweep auger for flat-bottom" },
  { label: "Intake", value: "Flexible auger or pneumatic top-fill, sized to your feed truck" },
  { label: "Inspection access", value: "Lockable manway, internal ladder, exterior ladder with cage" },
  { label: "Inventory", value: "Radar or load-cell level reading, connects to our remote-monitoring app, personalised to your site" },
  { label: "Foundation", value: "Concrete pad with anchor bolts, drawing supplied with quote" },
  { label: "Lead time", value: "6 to 10 weeks ex-works, plus on-site assembly" },
] as const;

const APPLICATIONS = [
  {
    title: "Poultry operations",
    copy: "Layer and broiler farms with their own feed-mixing capability. Typical sizing: 5 to 20 MT per silo, often in a row of two to four.",
  },
  {
    title: "Feed mills",
    copy: "Finished-feed dispatch silos sized to truck pick-up cycles. Typical sizing: 20 to 100 MT per silo.",
  },
  {
    title: "Dairy farms",
    copy: "On-farm feed storage for milking herds. Sized to weekly intake; sweep auger for clean discharge into mixer wagons.",
  },
];

export default function FeedStorageSilosPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Feed Storage Silos",
          material: "Hot-dip galvanised steel",
          category: "Industrial Silo",
          description:
            "Bulk feed storage silos for poultry, feed mills, and dairy farms in Kenya. 5 to 100 MT.",
          url: `${SITE_URL}/products/silos/feed-storage/`,
        })}
      />

      <PageHero
        eyebrow="Silos / Feed Storage"
        title="Feed storage,"
        titleAccent="sized to your throughput."
        subtitle="Galvanised feed silos for poultry, feed mills, and dairy farms. Hopper discharge or sweep auger, flexible-auger or pneumatic intake. Sized from 5 to 100 MT per silo."
        imageSrc="/images/products/silos-feed-storage-hero-v2.png"
        imageAlt="Two galvanised feed silos at a feed mill or poultry operation"
        primaryCta={{ href: "/request-quote/", label: "Spec a feed silo" }}
        secondaryCta={{ href: "/products/silos/", label: "All silo types" }}
        metaLeft="5 to 100 MT per silo"
        metaRight="Galvanised · Hopper or flat-bottom"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Silos", href: "/products/silos/" },
            { label: "Feed Storage", href: "/products/silos/feed-storage/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeader
              index="01"
              eyebrow="What it is"
              title="We size storage to match your truck cycle."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Feed silos look simple, but the spec lives in the
                discharge and intake. The wrong hopper angle means feed
                rat-holes and operators have to climb in with a rake.
                The wrong intake means a feed truck queue blocks the
                yard.
              </p>
              <p>
                We size the hopper angle, the discharge port diameter,
                and the intake throughput against the actual feed type
                and truck cycle you operate. The base silo is hot-dip
                galvanised steel; aeration and level instrumentation
                are options for the longer storage cycles.
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
            src="/images/products/silos-feed-storage-hero-v2.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_70%]"
          />
        </ParallaxImage>
        <p className="font-mono-label absolute bottom-6 left-6 z-[1] text-[10px] text-white/75 md:bottom-8 md:left-8">
          Hopper or flat-bottom · sized to the truck cycle
        </p>
      </div>

      <Section bordered theme="paper">
        {/* Datasheet header strip — document-style meta row. */}
        <div className="font-mono-label hairline-t hairline-b mb-10 flex flex-col gap-2 py-3 text-[10px] text-faint md:mb-14 md:flex-row md:items-center md:justify-between">
          <span>NS-SL-FD · 5–100 MT</span>
          <span className="hidden md:block">Specification</span>
          <span>Hot-dip galvanised · ex-works 6–10 wk</span>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeader
              index="02"
              eyebrow="Specifications"
              title="The base spec, your overlays."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      {/* Iron statement — the sizing discipline, in the page's own numbers. */}
      <Section theme="iron" size="spacious" ariaLabel="Sizing discipline">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="03">Sizing discipline</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              The spec lives in the discharge and the intake —{" "}
              <span className="text-accent">
                sized to the feed type and the truck cycle you actually run.
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
                  <CountUp value={100} suffix=" MT" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  From 5 MT poultry rows to 100 MT dispatch silos.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Hopper angle
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={45} suffix="°" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Clean gravity flow, or sweep auger on flat-bottom.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Diameter ceiling
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={5} suffix=" m" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  2 to 5 m, corrugated or smooth galvanised wall.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="font-mono-label hairline-t flex flex-col gap-2 pt-5 text-[10px] text-faint md:flex-row md:items-center md:justify-between">
            <span>5 to 100 MT per silo</span>
            <span>Flexible-auger or pneumatic intake</span>
            <span>Foundation drawing supplied with quote</span>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="04"
          eyebrow="Applications"
          title="Where feed silos earn their place."
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

      {/* Pull quote — why hopper geometry is the whole spec. */}
      <Section size="compact" ariaLabel="Discharge design">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-4 md:col-span-5">
            <span aria-hidden className="hairline h-px w-12" />
            <p className="font-mono-label text-[10px] text-faint">
              Discharge design · sized to the feed type
            </p>
          </div>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            “The wrong hopper angle means feed rat-holes and operators have
            to climb in with a rake.”
          </TextReveal>
        </div>
      </Section>

      <CtaBand
        headline="Got a feed cycle to match?"
        headlineAccent="We size silos to match it."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
