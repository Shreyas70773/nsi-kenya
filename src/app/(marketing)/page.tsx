import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { webSiteLd } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const TRUST_TOKENS = [
  "Fabricated in Kenya",
  "Stainless · Epoxy · Zinc-alum",
  "NEMA-aware ETP equipment",
  "Optional cloud-ready monitoring",
  "On-site within 48 hours · Nairobi",
  "Reference work across East Africa",
] as const;

const INDUSTRIES = [
  {
    n: "01",
    name: "Food & Beverage",
    href: "/industries/food-and-beverage/",
    pillar: "Capacity expansion · New product line · Audit-driven",
    products: "SS 304/316L · Epoxy · Silos · Flow + Level + Temp",
  },
  {
    n: "02",
    name: "ETP & Water Treatment",
    href: "/industries/etp-water-treatment/",
    pillar: "NEMA compliance · EMCA CAP 387 · Discharge parameters",
    products: "Epoxy-lined · SS · Multi-parameter analyzers · Flow",
  },
  {
    n: "03",
    name: "Alcohol & Distilling",
    href: "/industries/alcohol-distilling/",
    pillar: "Brewing scale-up · Distillery containment · Grain handling",
    products: "SS · Epoxy · Zinc-alum · Grain silos",
  },
  {
    n: "04",
    name: "Chemical Processing",
    href: "/industries/chemical-processing/",
    pillar: "Corrosive media · Containment · Process integrity",
    products: "Epoxy · SS · Pressure + Temp instruments",
  },
] as const;

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteLd()} />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero"
        className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/images/home/hero-tank-farm.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Warm cream wash for H1 legibility. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 55%, rgb(var(--ns-bg) / 0.82) 25%, rgb(var(--ns-bg) / 0.55) 65%, rgb(var(--ns-bg) / 0.93) 100%)",
            }}
          />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 text-center">
          <div className="font-mono-label flex items-center gap-3 text-[11px] text-faint">
            <span className="h-px w-8 bg-faint/60" aria-hidden />
            <span>Nairobi · est. for East Africa</span>
            <span className="h-px w-8 bg-faint/60" aria-hidden />
          </div>

          <h1 className="font-display max-w-4xl text-balance text-[clamp(2.25rem,4.5vw,4.25rem)] font-medium leading-[1.02] tracking-tight">
            Made in Kenya.{" "}
            <span className="text-accent">Built for East Africa.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Tanks, silos, structural works, and process instruments — one
            supplier across the full infrastructure stack. Optional
            cloud-ready monitoring on every install.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/request-quote/"
              className="press group inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent-strong"
            >
              Get a quote
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.2}
              />
            </Link>
            <Link
              href="/products/"
              className="press inline-flex items-center gap-2 rounded-pill border border-border/15 bg-surface/70 px-6 py-3.5 text-sm font-medium text-text backdrop-blur-md transition-colors duration-200 hover:bg-surface"
            >
              Explore products
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </div>
        </div>

        <div className="font-mono-label absolute inset-x-0 bottom-6 mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 text-[10px] text-faint">
          <span>Kenya · Uganda · Tanzania · Ethiopia · Rwanda</span>
          <span className="hidden md:inline">
            NEMA-aware · KEBS-fluent · Safaricom NB-IoT capable
          </span>
        </div>
      </section>

      {/* ─── TRUST MARQUEE ─────────────────────────────────────────────── */}
      <section
        aria-label="Trust marquee"
        className="border-y border-border/10 bg-surface/60 py-5"
      >
        <div className="relative overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
            {[...TRUST_TOKENS, ...TRUST_TOKENS, ...TRUST_TOKENS].map((t, i) => (
              <span
                key={i}
                className="font-mono-label flex items-center gap-12 text-xs text-muted"
              >
                {t}
                <span className="h-1 w-1 rounded-full bg-faint/60" aria-hidden />
              </span>
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-32"
            style={{
              background:
                "linear-gradient(to right, rgb(var(--ns-bg)), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-32"
            style={{
              background:
                "linear-gradient(to left, rgb(var(--ns-bg)), transparent)",
            }}
          />
        </div>
      </section>

      {/* ─── BENTO ─────────────────────────────────────────────────────── */}
      <section aria-label="What we supply" className="px-6 py-28 md:py-36">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <Reveal>
            <div
              data-reveal-item
              className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between"
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  ⟶ Product range
                </span>
                <h2 className="font-display max-w-2xl text-balance text-4xl font-medium tracking-tight md:text-5xl">
                  Built for the plants
                  <br />
                  that build East Africa.
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted">
                Single supplier across the entire infrastructure stack — no
                competitor in Kenya carries this breadth. Every category is
                locally fabricated or locally stocked.
              </p>
            </div>
          </Reveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-flow-dense auto-rows-fr grid-cols-6 gap-3 md:gap-4">
              <BentoCard
                href="/products/tanks/"
                title="Tanks"
                tagline="Stainless · Epoxy-lined · Zinc-alum"
                copy="304 and 316L stainless for dairy and beverage. Epoxy-lined steel for ETP and chemical dosing. Bolted zinc-alum for multi-decade water storage."
                stat="3 metallurgies · 1–500m³"
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
                copy="10–500MT capacity for breweries, feed mills, and bulk-handling plants."
                stat="10–1000 MT"
                className="col-span-6 row-span-1 md:col-span-2"
                imageSrc="/images/home/silos-corrugated.png"
                imageAlt="Three corrugated steel silos with overhead catwalk at a Kenyan plant"
                data-reveal-item
              />

              <BentoCard
                href="/products/instruments/"
                title="Process Instruments"
                tagline="Flow · Level · Pressure · pH · Temp"
                copy="Full instrument categories with 4–20mA, Modbus, HART out of the box."
                stat="6 categories · 154 SKUs"
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
                tagline="Optional · Safaricom NB-IoT capable"
                copy="Cloud-connected oversight on every install — tank levels, flow, water quality, alarms from any device. Not bundled; ask for it when you want it."
                stat="LoRa · NB-IoT · LTE · Ethernet"
                className="col-span-6 row-span-1 md:col-span-3"
                imageSrc="/images/home/iot-kisumu-plant.png"
                imageAlt="Plant operator holding a phone displaying a tank-monitoring dashboard outside a Kisumu plant"
                data-reveal-item
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── REFERENCE WORK ─────────────────────────────────────────────── */}
      <section
        aria-label="Reference work"
        className="border-y border-border/8 bg-surface-2/40 px-6 py-28 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.1}>
            <div className="flex flex-col gap-12 md:gap-16">
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  ⟶ Reference work
                </span>
                <h2 className="font-display max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                  The work answers the question
                  <br />
                  before the room asks it.
                </h2>
              </div>

              <Link
                href="/case-studies/crywan-industries-kenya/"
                data-reveal-item
                className="press group block overflow-hidden rounded-card border border-border/10 bg-surface transition-colors hover:bg-surface/80"
              >
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="relative aspect-[16/10] overflow-hidden md:col-span-3 md:aspect-auto">
                    <Image
                      src="/images/home/crywan-reference-dusk.png"
                      alt="Crywan Industries — stainless processing tanks at dusk, plant operator silhouette walking past"
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col gap-6 p-8 md:col-span-2 md:p-12">
                    <div className="font-mono-label flex items-center gap-3 text-[10px] text-faint">
                      <span>Crywan Industries</span>
                      <span className="h-px flex-1 bg-faint/40" />
                      <span>Kenya</span>
                    </div>
                    <p className="text-xl leading-snug text-text md:text-2xl">
                      A long-running stainless tank installation for a Kenyan
                      food and beverage operator — the reference our customers
                      check before they sign.
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-4 text-sm">
                      <span className="text-muted">
                        Equipment · Install · Ongoing support
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-accent transition-transform duration-300 group-hover:translate-x-1">
                        Read the case study
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <div
                data-reveal-item
                className="flex flex-col items-start gap-4 border-t border-border/10 pt-8 md:flex-row md:items-center md:justify-between"
              >
                <p className="max-w-xl text-sm text-muted">
                  Building toward a reference network — every closed deal
                  becomes a named case study with consent. In the meantime,
                  we&apos;ll put you on the phone with the customers we have.
                </p>
                <Link
                  href="/talk-to-a-customer/"
                  className="press inline-flex items-center gap-2 rounded-pill border border-border/20 bg-surface px-5 py-3 text-sm font-medium text-text transition-colors hover:bg-bg"
                >
                  Talk to a customer
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── INDUSTRIES ─────────────────────────────────────────────────── */}
      <section aria-label="Industries served" className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.06}>
            <div data-reveal-item className="mb-12 flex flex-col gap-3 md:mb-16">
              <span className="font-mono-label text-[10px] text-faint">
                ⟶ Where we work
              </span>
              <h2 className="font-display max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                Four industries. Four entirely
                <br />
                different buying conversations.
              </h2>
            </div>

            <ol className="divide-y divide-border/10 border-y border-border/10">
              {INDUSTRIES.map((ind) => (
                <li key={ind.href} data-reveal-item>
                  <Link
                    href={ind.href}
                    className="group grid grid-cols-12 items-center gap-4 py-7 transition-colors hover:bg-surface/40 md:gap-6 md:py-9"
                  >
                    <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                      {ind.n}
                    </span>
                    <h3 className="font-display col-span-10 text-2xl font-medium tracking-tight md:col-span-3 md:text-3xl">
                      {ind.name}
                    </h3>
                    <p className="col-span-12 text-sm text-muted md:col-span-4">
                      {ind.pillar}
                    </p>
                    <p className="font-mono-label col-span-12 text-[10px] text-faint md:col-span-3">
                      {ind.products}
                    </p>
                    <span className="col-span-12 flex items-center justify-end text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:col-span-1">
                      <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA SECTION ────────────────────────────────────────────────── */}
      <section
        aria-label="Three ways in"
        className="border-t border-border/10 bg-text px-6 py-28 text-on-accent md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.07}>
            <div data-reveal-item className="flex flex-col gap-3 md:mb-16">
              <span className="font-mono-label text-[10px] text-on-accent/55">
                ⟶ Three ways in
              </span>
              <h2 className="font-display max-w-4xl text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
                Pick the door that
                <br />
                matches where you are.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
              <CtaCard
                href="/request-quote/"
                kicker="01 / Have a project"
                title="Get a quote"
                copy="Tell us what you're building. We'll come back with a specification, capacity, and lead time within 48 working hours."
                accent
                data-reveal-item
              />
              <CtaCard
                href="/talk-to-a-customer/"
                kicker="02 / Want to verify"
                title="Talk to a customer"
                copy="We'll put you on the phone with someone we've installed for before you commit a shilling. Honest about who's in the network."
                data-reveal-item
              />
              <CtaCard
                href="/request-site-audit/"
                kicker="03 / Still scoping"
                title="Book a site audit"
                copy="A field visit to your plant. We measure, photograph, and leave you with a written brief — no commitment from either side."
                data-reveal-item
              />
            </div>
          </Reveal>
        </div>
      </section>
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
      className={cn(
        "press group relative isolate flex flex-col justify-end overflow-hidden rounded-card border border-border/10 text-white transition-shadow duration-500",
        feature
          ? "min-h-[520px] md:min-h-[600px]"
          : "min-h-[300px] md:min-h-[280px]",
        "hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text)/0.35)]",
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
            "font-display font-medium tracking-tight text-white",
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

type CtaCardProps = {
  href: string;
  kicker: string;
  title: string;
  copy: string;
  accent?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement>;

function CtaCard({ href, kicker, title, copy, accent = false, ...rest }: CtaCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "press group flex flex-col gap-4 rounded-card border p-7 transition-colors duration-300 md:p-9",
        accent
          ? "border-accent bg-accent text-on-accent hover:bg-accent-strong"
          : "border-on-accent/15 bg-text/40 text-on-accent hover:bg-on-accent/8",
      )}
      {...rest}
    >
      <span
        className={cn(
          "font-mono-label text-[10px]",
          accent ? "text-on-accent/80" : "text-on-accent/55",
        )}
      >
        {kicker}
      </span>
      <h3 className="font-display text-3xl font-medium leading-tight tracking-tight">
        {title}
      </h3>
      <p
        className={cn(
          "text-sm leading-relaxed",
          accent ? "text-on-accent/85" : "text-on-accent/65",
        )}
      >
        {copy}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm transition-transform duration-300 group-hover:translate-x-1">
        {accent ? "Start" : "Continue"}
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
      </span>
    </Link>
  );
}
