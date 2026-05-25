import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { webSiteLd } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";
import { BrandStar } from "@/components/brand/brand-star";
import { cn } from "@/lib/utils";

const TRUST_TOKENS = [
  "Fabricated in Kenya",
  "Stainless, epoxy, zinc-alum",
  "NEMA-aware ETP equipment",
  "Optional cloud-ready monitoring",
  "On-site within 48 hours, Nairobi",
  "Reference work across Kenya",
] as const;

const INDUSTRIES = [
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
    pillar: "NEMA compliance, EMCA CAP 387, discharge parameters",
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
    products: "SS · Epoxy · Zinc-alum · Grain silos",
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

export default function Home() {
  return (
    <>
      <JsonLd data={webSiteLd()} />

      {/* ─── HERO (IBS-style framed card) ─────────────────────────────── */}
      <section
        aria-label="Hero"
        className="px-3 pt-24 sm:px-4 md:pt-28 lg:px-6"
      >
        <div className="relative isolate min-h-[90vh] overflow-hidden rounded-[28px] md:min-h-[calc(100vh-6rem)] md:rounded-[36px]">
          {/* Background photo */}
          <Image
            src="/images/home/hero-tank-farm.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
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
          {/* Brand star watermark. Outlined, barely visible. A faint
              geometric watermark sitting behind the content, not a
              dominant element. Desktop only. */}
          <BrandStar
            filled={false}
            className="pointer-events-none absolute -right-32 -bottom-40 -z-10 hidden h-[110%] w-auto text-white/12 md:block"
          />

          {/* Content grid: top-left headline + pills / top-right description + CTA */}
          <div className="relative flex h-full min-h-[90vh] flex-col gap-8 p-7 sm:p-10 md:min-h-[calc(100vh-6rem)] md:gap-10 md:p-14 lg:p-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
              {/* TOP-LEFT: headline + pills */}
              <div className="flex flex-col gap-7 md:col-span-7">
                <div className="font-mono-label flex items-center gap-3 text-[10px] text-white/70">
                  <span className="h-px w-8 bg-white/30" aria-hidden />
                  <span>Nairobi · Kenya</span>
                </div>
                <h1 className="font-display text-balance text-[clamp(2.5rem,5.5vw,5.5rem)] font-medium leading-[0.98] tracking-tight text-white">
                  Made in East Africa.{" "}
                  <br className="hidden sm:block" />
                  <span className="text-accent">Built for Kenya.</span>
                </h1>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {["Tanks", "Silos", "Structural", "Instruments", "Monitoring"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-pill border border-white/20 bg-white/8 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* TOP-RIGHT: body + dark CTA */}
              <div className="flex flex-col items-start gap-5 md:col-span-5 md:items-end md:text-right">
                <p className="max-w-sm text-sm leading-relaxed text-white/85 md:text-base">
                  One supplier across stainless, epoxy-lined, and zinc-alum
                  tanks; silos and grain storage; structural fabrication;
                  and the full instrument stack.
                </p>
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
              </div>
            </div>

            {/* BOTTOM credential strip */}
            <div className="font-mono-label mt-auto flex flex-col gap-2 text-[10px] text-white/65 md:flex-row md:items-end md:justify-between">
              <span>Serving Kenya, every county.</span>
              <span>NEMA-aware · KEBS-fluent · Safaricom NB-IoT capable</span>
            </div>
          </div>
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
                "linear-gradient(to right, var(--ns-bg), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-32"
            style={{
              background:
                "linear-gradient(to left, var(--ns-bg), transparent)",
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
                  that build Kenya.
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted">
                Single supplier across the entire infrastructure stack. No
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
                stat="3 metallurgies, 1 to 500m³"
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
                tagline="Optional · Safaricom NB-IoT capable"
                copy="Cloud-connected oversight on every install: tank levels, flow, water quality, alarms from any device. Not bundled; ask for it when you want it."
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

      {/* ─── REFERENCE WORK (removed; client references private at launch) */}
      <section
        aria-label="Where the work lives"
        className="border-y border-border/8 bg-surface-2/40 px-6 py-28 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.1}>
            <div className="flex flex-col gap-12 md:gap-16">
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  ⟶ How we work
                </span>
                <h2 className="font-display max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                  Locally fabricated.
                  <br />
                  Locally supported.
                </h2>
                <p className="mt-3 max-w-2xl text-base text-muted md:text-lg">
                  We work in confidence with our customers, and most of
                  our installs live behind their NDAs. What we can share
                  publicly: the workshop, the process, and the standards
                  we hold ourselves to on every project.
                </p>
              </div>

              <div
                data-reveal-item
                className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4"
              >
                <Link
                  href="/about/local-manufacturing/"
                  className="press group flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
                >
                  <span className="font-mono-label text-[10px] text-accent">
                    Inside the workshop
                  </span>
                  <h3 className="font-display text-2xl font-medium leading-tight tracking-tight">
                    Where the tanks get built.
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    Cutting, rolling, TIG welding, dye-penetrant, and
                    finishing, all in our Nairobi workshop.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-text transition-transform duration-300 group-hover:translate-x-1">
                    Local manufacturing
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                </Link>
                <Link
                  href="/about/"
                  className="press group flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
                >
                  <span className="font-mono-label text-[10px] text-accent">
                    How we work
                  </span>
                  <h3 className="font-display text-2xl font-medium leading-tight tracking-tight">
                    The model and the standards.
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    Why we fabricate locally, what we source globally,
                    and the engineering standards we hold every project
                    to.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-text transition-transform duration-300 group-hover:translate-x-1">
                    About us
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                </Link>
                <Link
                  href="/blog/"
                  className="press group flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
                >
                  <span className="font-mono-label text-[10px] text-accent">
                    Field notes
                  </span>
                  <h3 className="font-display text-2xl font-medium leading-tight tracking-tight">
                    What we've learned.
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    Practical writing on tank metallurgy, ETP
                    compliance, instrument selection, and the work of
                    running a Kenyan industrial plant.
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-text transition-transform duration-300 group-hover:translate-x-1">
                    Read the blog
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── INDUSTRIES (IBS-style image cards) ─────────────────────────── */}
      <section aria-label="Industries served" className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.06}>
            <div
              data-reveal-item
              className="mb-12 flex flex-col items-start gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  ⟶ Industries
                </span>
                <h2 className="font-display max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                  We span across the
                  <br />
                  following industries.
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted">
                Each sector has its own buying triggers and equipment fit.
                Select yours to see the equipment we install and the
                compliance posture we maintain.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
              {INDUSTRIES.map((ind) => (
                <Link
                  key={ind.href}
                  href={ind.href}
                  data-reveal-item
                  className="press group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card border border-border/10"
                >
                  <Image
                    src={ind.image}
                    alt={ind.imageAlt}
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
                      Sector {ind.n}
                    </span>
                  </div>
                  <div className="relative flex flex-col gap-2 p-5 md:p-6">
                    <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl">
                      {ind.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-white/70">
                      {ind.pillar}
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
                href="/book-consultation/"
                kicker="02 / Want to talk first"
                title="Book a consultation"
                copy="A working call with our engineering team. Walk through what you need, see how we'd approach it, then decide."
                data-reveal-item
              />
              <CtaCard
                href="/request-site-audit/"
                kicker="03 / Still scoping"
                title="Book a site audit"
                copy="A field visit to your plant. We measure, photograph, and leave you with a written brief, no commitment from either side."
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
