import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { webSiteLd, homeLocalBusinessLd } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute title: the homepage leads with product + geo instead of the
  // brand-only default, and skips the "· North Star Impex Kenya" template
  // suffix since the brand is already in the string.
  title: {
    absolute:
      "Industrial Tanks, Silos & Process Instruments in Kenya | North Star Impex",
  },
  description:
    "North Star Impex fabricates industrial tanks, silos, structural steel and process instruments in Nairobi for plants across Kenya and East Africa. Quote in 48 hours.",
  alternates: { canonical: "/" },
  keywords: [
    "industrial tanks Kenya",
    "grain storage silos Kenya",
    "process instruments Kenya",
    "stainless steel tank manufacturer Nairobi",
    "structural steel fabrication Kenya",
  ],
};
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ParallaxImage } from "@/components/motion/parallax";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { CountUp } from "@/components/motion/count-up";
import { BrandStar } from "@/components/brand/brand-star";
import { SectionHeader } from "@/components/primitives/section-header";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { FabricationSection } from "@/components/home/fabrication-section";
import { ProofBand } from "@/components/home/proof-band";
import { CaseStrip } from "@/components/home/case-strip";
import {
  IndustriesGallery,
  type IndustryCard,
} from "@/components/home/industries-gallery";
import { cn } from "@/lib/utils";

const TRUST_TOKENS = [
  "Fabricated in-house",
  "Stainless, epoxy, Zinc Aluminium",
  "Regulatory-compliant ETP equipment",
  "Cloud-ready monitoring on every install",
  "On-site within 48 hours",
  "Reference work across East Africa",
] as const;

const INDUSTRIES: readonly IndustryCard[] = [
  {
    n: "01",
    name: "Food & Beverage",
    href: "/industries/food-and-beverage/",
    pillar: "Capacity expansion, new product line, audit-driven",
    products: "SS 304/316L · Epoxy · Silos · Flow + Level + Temp",
    image: "/images/home/sector-fnb.png",
    imageAlt:
      "Plant operator in hygiene whites inspecting a stainless steel jacketed fermentation tank inside a food and beverage facility",
  },
  {
    n: "02",
    name: "ETP & Water Treatment",
    href: "/industries/etp-water-treatment/",
    pillar: "Environmental compliance, discharge parameters",
    products: "Epoxy-lined · SS · Multi-parameter analyzers · Flow",
    image: "/images/home/sector-etp.png",
    imageAlt:
      "Multiparameter water analyzer panel mounted over a clarifier basin at an effluent treatment plant",
  },
  {
    n: "03",
    name: "Alcohol & Distilling",
    href: "/industries/alcohol-distilling/",
    pillar: "Brewing scale-up, distillery containment, grain handling",
    products: "SS · Epoxy · Zinc Aluminium · Grain silos",
    image: "/images/home/sector-alcohol.png",
    imageAlt:
      "Stainless steel fermenter tagged FV-03 with a copper still and brewer in the background of a craft brewery",
  },
  {
    n: "04",
    name: "Chemical Processing",
    href: "/industries/chemical-processing/",
    pillar: "Corrosive media, containment, process integrity",
    products: "Epoxy · SS · Pressure + Temp instruments",
    image: "/images/home/sector-chemical.png",
    imageAlt:
      "Epoxy reactor R-2501 with pressure gauge cluster and color-coded process piping (nitrogen, cooling water, steam, plant air, vent) in a chemical processing plant",
  },
] as const;

const STATS = [
  { value: 500, suffix: " m³", label: "Largest single tank, fabricated and installed" },
  { value: 1000, suffix: " MT", label: "Silo capacity range, grain and feed" },
  { value: 154, suffix: "", label: "Instrument SKUs, stocked and cloud-ready" },
  { value: 48, suffix: " hr", label: "Quote turnaround, working hours" },
] as const;

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteLd()} />
      <JsonLd data={homeLocalBusinessLd()} />

      {/* ─── HERO (framed card, parallax + masked headline) ───────────── */}
      <section
        aria-label="Hero"
        className="px-3 pt-24 sm:px-4 md:pt-28 lg:px-6"
      >
        <div className="relative isolate min-h-[90vh] overflow-hidden rounded-[28px] md:min-h-[calc(100vh-6rem)] md:rounded-[36px]">
          <ParallaxImage className="absolute inset-0 -z-20" amount={10}>
            <Image
              src="/images/home/hero-tank-farm.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </ParallaxImage>
          {/* Cinematic wash: darker bottom for the credential strip, gentler
              top so the headline reads clearly without killing the photo. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(180deg, rgb(8 6 4 / 0.55) 0%, rgb(8 6 4 / 0.28) 35%, rgb(8 6 4 / 0.32) 70%, rgb(8 6 4 / 0.78) 100%)",
            }}
          />
          <BrandStar
            filled={false}
            className="pointer-events-none absolute -right-32 -bottom-40 -z-10 hidden h-[110%] w-auto text-white/12 md:block"
          />
          {/* Register marks — the drawing-sheet frame. */}
          <div aria-hidden className="pointer-events-none absolute inset-5 z-[1] hidden md:block">
            <span className="absolute top-0 left-0 h-4 w-px bg-white/30" />
            <span className="absolute top-0 left-0 h-px w-4 bg-white/30" />
            <span className="absolute top-0 right-0 h-4 w-px bg-white/30" />
            <span className="absolute top-0 right-0 h-px w-4 bg-white/30" />
            <span className="absolute bottom-0 left-0 h-4 w-px bg-white/30" />
            <span className="absolute bottom-0 left-0 h-px w-4 bg-white/30" />
            <span className="absolute right-0 bottom-0 h-4 w-px bg-white/30" />
            <span className="absolute right-0 bottom-0 h-px w-4 bg-white/30" />
          </div>

          <div className="relative flex h-full min-h-[90vh] flex-col gap-8 p-7 sm:p-10 md:min-h-[calc(100vh-6rem)] md:gap-10 md:p-14 lg:p-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
              {/* TOP-LEFT: headline + pills */}
              <div className="flex flex-col gap-7 md:col-span-7">
                <div className="font-mono-label flex items-center gap-3 text-[10px] text-white/70">
                  <span className="h-px w-8 bg-white/30" aria-hidden />
                  <span>Nairobi · Kenya</span>
                </div>
                <TextReveal
                  as="h1"
                  mode="mount"
                  className="font-display text-balance text-[clamp(2.5rem,5.5vw,5.5rem)] font-semibold leading-[0.98] tracking-tight text-white"
                >
                  <>
                    Made in Kenya,{" "}
                    <br className="hidden sm:block" />
                    <span className="text-accent">made for East Africa.</span>
                  </>
                </TextReveal>
                <Reveal stagger={0.05} yFrom={14}>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {["Tanks", "Silos", "Structural", "Instruments", "Monitoring"].map(
                      (tag) => (
                        <span
                          key={tag}
                          data-reveal-item
                          className="rounded-pill border border-white/20 bg-white/8 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </Reveal>
              </div>

              {/* TOP-RIGHT: body + CTA */}
              <div className="flex flex-col items-start gap-5 md:col-span-5 md:items-end md:text-right">
                <p className="max-w-sm text-sm leading-relaxed text-white/85 md:text-base">
                  One supplier across stainless, epoxy-lined, and Zinc
                  Aluminium tanks; silos and grain storage; structural
                  fabrication; and the full instrument stack.
                </p>
                <Magnetic strength={0.25}>
                  <Link
                    href="/request-quote/"
                    className="press group inline-flex items-center gap-2 rounded-pill bg-white px-5 py-3 text-sm font-medium text-text transition-colors duration-200 hover:bg-accent hover:text-on-accent"
                  >
                    Tell us what you need
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.2}
                    />
                  </Link>
                </Magnetic>
              </div>
            </div>

            {/* BOTTOM credential strip */}
            <div className="font-mono-label mt-auto flex flex-col gap-2 text-[10px] text-white/65 md:flex-row md:items-end md:justify-between">
              <span>Across East African markets.</span>
              <span className="hidden items-center gap-2 md:flex" aria-hidden>
                <span>Scroll</span>
                <span className="h-px w-10 bg-white/40" />
              </span>
              <span>Regulatory-compliant · NB-IoT capable</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROOF BAND (T-1, four tiles under the hero) ──────────────── */}
      <ProofBand />

      {/* ─── TRUST MARQUEE (velocity-reactive) ────────────────────────── */}
      <section
        aria-label="Trust marquee"
        className="relative border-y border-border/10 bg-surface/60 py-5"
      >
        <Marquee duration={40}>
          {TRUST_TOKENS.map((t, i) => (
            <span
              key={i}
              className="font-mono-label mx-6 flex items-center gap-12 text-xs text-muted"
            >
              {t}
              <span className="h-1 w-1 rounded-full bg-faint/60" aria-hidden />
            </span>
          ))}
        </Marquee>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-32"
          style={{
            background: "linear-gradient(to right, var(--ns-bg), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-32"
          style={{
            background: "linear-gradient(to left, var(--ns-bg), transparent)",
          }}
        />
      </section>

      {/* ─── BENTO ────────────────────────────────────────────────────── */}
      <section aria-label="What we supply" className="px-6 py-28 md:py-36">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <SectionHeader
            index="01"
            eyebrow="Product range"
            title="One supplier for the full plant infrastructure stack."
            side={
              <p>
                Tanks, silos, structural steel, and process instruments from
                a single supplier. Every category is fabricated in-house or
                stocked locally.
              </p>
            }
            className="mb-0"
          />

          <Reveal stagger={0.08} effect="scale-in">
            <div className="grid grid-flow-dense auto-rows-fr grid-cols-6 gap-3 md:gap-4">
              <BentoCard
                href="/products/tanks/"
                title="Tanks"
                tagline="Stainless · Epoxy-lined · Zinc Aluminium"
                copy="304 and 316L stainless for dairy and beverage. Epoxy-lined steel for ETP and chemical dosing. Bolted Zinc Aluminium, supplied with a liner as standard, for 20+ year water storage."
                stat="3 materials, 1 to 500m³"
                className="col-span-6 row-span-2 md:col-span-4"
                imageSrc="/images/home/tanks-weld-bead.png"
                imageAlt="Macro detail of a stainless steel tank weld bead"
                feature
                data-reveal-item
              />

              <BentoCard
                href="/products/silos/"
                title="Silos"
                tagline="Grain · Feed · Industrial bulk"
                copy="10 to 500MT capacity for breweries, feed mills, and bulk-handling plants."
                stat="10 to 1000 MT"
                className="col-span-6 row-span-1 md:col-span-2"
                imageSrc="/images/home/silos-corrugated.png"
                imageAlt="Three corrugated steel silos with overhead catwalk at a Kenyan plant"
                data-reveal-item
              />

              <BentoCard
                href="/products/instruments/"
                title="Process Instruments"
                tagline="Flow · Level · Pressure · pH · Temp"
                copy="Full instrument categories with 4 to 20mA, Modbus, and HART out of the box."
                stat="6 categories, 154 SKUs"
                className="col-span-6 row-span-1 md:col-span-2"
                imageSrc="/images/home/instruments-flow-meter.png"
                imageAlt="Electromagnetic flow meter on a stainless steel pipe with red display head"
                data-reveal-item
              />

              <BentoCard
                href="/products/structural-works/"
                title="Structural Works"
                tagline="Platforms · Walkways · Tank supports"
                copy="In-house structural fabrication for plant builds and retrofits."
                stat="Plant-scale fabrication"
                className="col-span-6 row-span-1 md:col-span-3"
                imageSrc="/images/home/structural-gantry.png"
                imageAlt="Steel gantry and tank-support framework mid-installation at night, weld arc visible"
                data-reveal-item
              />

              <BentoCard
                href="/products/iot/"
                title="Remote Monitoring"
                tagline="Remote-monitoring capable · NB-IoT"
                copy="Every tank we install can be connected to a remote-monitoring app, personalized to your site: tank levels, flow, water quality, and alarms from any device."
                stat="LoRa · NB-IoT · LTE · Ethernet"
                className="col-span-6 row-span-1 md:col-span-3"
                imageSrc="/images/home/iot-kisumu-plant.png"
                imageAlt="Plant manager reviewing a live tank-monitoring dashboard on a tablet outside a Kenyan industrial plant"
                data-reveal-item
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FABRICATION SEQUENCE (iron statement, pinned 3D) ─────────── */}
      <FabricationSection />

      {/* ─── STATS ────────────────────────────────────────────────────── */}
      <section
        aria-label="Capability in numbers"
        className="border-b border-border/10 px-6 py-20 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {STATS.map((stat, i) => (
                <div key={stat.label} data-reveal-item className="flex flex-col gap-4">
                  <span className="font-mono-label text-[10px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display-condensed text-6xl font-black leading-none tracking-tight text-text md:text-7xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="hairline h-px w-full" aria-hidden />
                  <p className="max-w-[22ch] text-xs leading-relaxed text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── INDUSTRIES (horizontal gallery) ──────────────────────────── */}
      <IndustriesGallery industries={INDUSTRIES} />

      {/* ─── CASE STRIP (T-2, renders once verified blurbs land) ─────── */}
      <CaseStrip />

      {/* ─── HOW WE WORK ──────────────────────────────────────────────── */}
      <section
        aria-label="Where the work lives"
        className="border-y border-border/8 bg-surface-2/40 px-6 py-28 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            index="04"
            eyebrow="How we work"
            title="Locally fabricated. Locally supported."
            side={
              <p>
                We work in confidence with our customers, and most of our
                installs live behind their NDAs. What we can share publicly:
                the workshop, the process, and the standards we hold ourselves
                to on every project.
              </p>
            }
          />

          <Reveal stagger={0.09}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
              <WorkCard
                href="/about/local-manufacturing/"
                kicker="Inside the workshop"
                title="How our tanks are built."
                copy="Cutting, rolling, TIG welding, dye-penetrant testing, and finishing, all in our own workshop."
                cta="Local manufacturing"
                data-reveal-item
              />
              <WorkCard
                href="/about/"
                kicker="How we work"
                title="The model and the standards."
                copy="Why we fabricate locally, what we source globally, and the engineering standards we hold every project to."
                cta="About us"
                data-reveal-item
              />
              <WorkCard
                href="/blog/"
                kicker="Field notes"
                title="What we've learned."
                copy="Practical writing on tank materials, ETP compliance, instrument selection, and the work of running an industrial plant in East Africa."
                cta="Read the blog"
                data-reveal-item
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <CtaBand
        headline="Choose how you'd"
        headlineAccent="like to get started."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}

/* ─── COMPONENTS ──────────────────────────────────────────────────────── */

type BentoCardProps = {
  href: string;
  title: string;
  tagline: string;
  copy: string;
  stat: string;
  className?: string;
  imageSrc: string;
  imageAlt: string;
  feature?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement>;

function BentoCard({
  href,
  title,
  tagline,
  copy,
  stat,
  className,
  imageSrc,
  imageAlt,
  feature = false,
  ...rest
}: BentoCardProps) {
  return (
    <Link
      href={href}
      data-cursor="view"
      className={cn(
        "press group relative isolate flex flex-col justify-end overflow-hidden rounded-card border border-border/10 text-white transition-shadow duration-500",
        feature
          ? "min-h-[520px] md:min-h-[600px]"
          : "min-h-[300px] md:min-h-[280px]",
        "hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.35)]",
        className,
      )}
      {...rest}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes={feature ? "(min-width: 768px) 67vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
        className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      {/* Dark wash for legibility — heavier at bottom where text sits. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgb(8 6 4 / 0.92) 0%, rgb(8 6 4 / 0.65) 35%, rgb(8 6 4 / 0.15) 65%, rgb(8 6 4 / 0) 100%)",
        }}
      />

      <div
        className={cn(
          "relative flex flex-col gap-2.5 p-6 md:p-7",
          feature && "md:gap-3 md:p-9",
        )}
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono-label text-[10px] text-accent">{tagline}</p>
          <span className="font-mono-label text-[10px] text-white/55">
            {stat}
          </span>
        </div>
        <h3
          className={cn(
            "font-display font-semibold tracking-tight text-white",
            feature ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "max-w-md text-sm leading-relaxed text-white/75",
            feature && "md:text-base",
          )}
        >
          {copy}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-white transition-transform duration-300 group-hover:translate-x-1">
          Explore
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
      </div>
    </Link>
  );
}

type WorkCardProps = {
  href: string;
  kicker: string;
  title: string;
  copy: string;
  cta: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

function WorkCard({ href, kicker, title, copy, cta, ...rest }: WorkCardProps) {
  return (
    <Link
      href={href}
      className="press group flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
      {...rest}
    >
      <span className="font-mono-label text-[10px] text-accent">{kicker}</span>
      <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{copy}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-text transition-transform duration-300 group-hover:translate-x-1">
        {cta}
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
      </span>
    </Link>
  );
}
