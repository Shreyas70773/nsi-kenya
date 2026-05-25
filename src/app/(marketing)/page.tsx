import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/placeholders/image-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { webSiteLd } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

// Trust strip — repeated for the marquee.
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

      {/* ─── HERO ───────────────────────────────────────────────────────────
          Cinematic center. H1 ultra-wide, two lines. No Crywan, no badges,
          no stat-pills. Background image lives behind everything with a
          warm darkroom wash for legibility.                                 */}
      <section
        aria-label="Hero"
        className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20"
      >
        {/* Background image slot */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <ImagePlaceholder
            role="hero"
            description="Full-bleed dawn shot of a Kenyan industrial plant — stainless tanks foreground, gantry silhouette, warm sun raking across welded seams"
            prompt="Editorial photograph: dawn at a Kenyan industrial processing plant. Multiple polished 304 stainless steel tanks foreground, weld seams catching warm low sun. Gantry walkways and a single Plant Manager silhouette mid-distance. Atmosphere: dignified, weighty, materially specific. Color grade: warm parchment highlights, deep iron shadows. NO logos, NO text, NO people in focus. Subtle dust haze. Composition leaves a clean horizontal band in the middle third for an overlay. 21:9 aspect, ultra-wide cinematic. NOT stock-photo, NOT AI-generic — looks shot on a Phase One medium format."
            className="!aspect-auto !rounded-none h-full w-full !border-0"
          />
          {/* Warm darkroom wash — keeps the type legible without killing the image. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 60%, rgb(var(--ns-bg) / 0.86) 30%, rgb(var(--ns-bg) / 0.55) 70%, rgb(var(--ns-bg) / 0.92) 100%)",
            }}
          />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 text-center">
          <div className="font-mono-label flex items-center gap-3 text-[11px] text-faint">
            <span className="h-px w-8 bg-faint/60" aria-hidden />
            <span>Nairobi · est. for East Africa</span>
            <span className="h-px w-8 bg-faint/60" aria-hidden />
          </div>

          <h1 className="font-display max-w-5xl text-balance text-[clamp(2.5rem,6.5vw,5.75rem)] font-medium leading-[0.96] tracking-tight">
            Industrial tanks, silos,{" "}
            <span className="text-accent">and instruments</span> — engineered
            in Kenya for the operators who run East Africa.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            One supplier across stainless, epoxy-lined, and zinc-alum tanks;
            silos and grain storage; structural fabrication; and the full
            instrument stack. Optional cloud-ready monitoring on every
            install, when you want it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/request-quote/"
              className="press group inline-flex items-center gap-2 rounded-pill bg-text px-6 py-3.5 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent"
            >
              Get a quote
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.2}
              />
            </Link>
            <Link
              href="/products/"
              className="press inline-flex items-center gap-2 rounded-pill border border-border/15 bg-surface/60 px-6 py-3.5 text-sm font-medium text-text backdrop-blur-md transition-colors duration-200 hover:bg-surface"
            >
              Explore products
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </div>
        </div>

        {/* Bottom-of-hero credential strip — small mono. */}
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
        className="border-y border-border/10 bg-surface/40 py-5"
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
          {/* Edge fades */}
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

      {/* ─── BENTO (Interest) ──────────────────────────────────────────────
          6-col × 3-row asymmetric grid, grid-flow-dense, gapless.
          Tanks(4×2=8) + Silos(2×1=2) + Instruments(2×1=2) + Structural(3×1=3)
          + IoT(3×1=3) = 18 cells, zero voids.                              */}
      <section
        aria-label="What we supply"
        className="px-6 py-28 md:py-36"
      >
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
              {/* Tanks — big feature card. */}
              <BentoCard
                href="/products/tanks/"
                title="Tanks"
                tagline="Stainless · Epoxy-lined · Zinc-alum"
                copy="304 and 316L stainless for dairy and beverage. Epoxy-lined steel for ETP and chemical dosing. Bolted zinc-alum for multi-decade water storage."
                stat="3 metallurgies · 1–500m³"
                className="col-span-6 row-span-2 md:col-span-4"
                imageRole="hero"
                imageDescription="304 stainless tank, partial weld bead in macro detail"
                imagePrompt="Macro photograph: section of polished 304 stainless steel tank wall. Single weld seam running diagonally with a perfect TIG bead pattern. Subtle reflection of factory light overhead. Texture-heavy, deeply detailed surface. Grade: warm tungsten highlights, neutral steel midtones. Composition: 3:2 landscape, intentional negative space upper-left for text overlay. Editorial, not stock."
                feature
                data-reveal-item
              />

              {/* Silos */}
              <BentoCard
                href="/products/silos/"
                title="Silos"
                tagline="Grain · Feed · Industrial bulk"
                copy="10–500MT capacity for breweries, feed mills, and bulk-handling plants."
                stat="10–1000 MT"
                className="col-span-6 row-span-1 md:col-span-2"
                imageRole="card"
                imageDescription="Three-silo array outside a Kenyan brewery, midday sky"
                imagePrompt="Wide editorial shot: three industrial steel silos in a row outside a brewery in central Kenya. Midday warm light, deep blue sky, conveyor catwalk connecting them. Capacities visible if any markings. No people. Composition: 3:2, silos occupying the lower two-thirds. Grade: warm parchment highlights, deep teal sky shadows. Not stock."
                data-reveal-item
              />

              {/* Instruments */}
              <BentoCard
                href="/products/instruments/"
                title="Process Instruments"
                tagline="Flow · Level · Pressure · pH · Temp"
                copy="Full instrument categories with 4–20mA, Modbus, HART out of the box."
                stat="6 categories · 154 SKUs"
                className="col-span-6 row-span-1 md:col-span-2"
                imageRole="card"
                imageDescription="Mounted electromagnetic flow meter on a stainless pipe, isolation valves in frame"
                imagePrompt="Close detail photograph of an electromagnetic flow meter mounted on a 4-inch polished stainless steel pipe. Adjacent ball valves and a digital display showing a flow value. Surroundings hint at an industrial plant — soft out-of-focus pipework background. Light: cool tungsten with one warm rim. Composition: 3:2 landscape, meter centered. Editorial, not catalog."
                data-reveal-item
              />

              {/* Structural Works */}
              <BentoCard
                href="/products/structural-works/"
                title="Structural Works"
                tagline="Platforms · Walkways · Tank supports"
                copy="In-house structural fabrication for plant builds and retrofits."
                stat="Plant-scale fabrication"
                className="col-span-6 row-span-1 md:col-span-3"
                imageRole="inline"
                imageDescription="Steel walkway grating and tank-support framework mid-install on a Nairobi plant floor"
                imagePrompt="Overhead photograph of a half-finished industrial plant floor — galvanized steel walkway grating laid across a structural framework, two cylindrical tank bases below. Welding sparks frozen mid-strike at the corner. Warm task-light, cool ambient. Composition: 3:2, top-down 70-degree angle. Looks like a Magnum Photos industrial portfolio piece."
                data-reveal-item
              />

              {/* IoT — wide bottom card. */}
              <BentoCard
                href="/products/iot/"
                title="Remote Monitoring"
                tagline="Optional · Safaricom NB-IoT capable"
                copy="Cloud-connected oversight on every install — tank levels, flow, water quality, alarms from any device. Not bundled; ask for it when you want it."
                stat="LoRa · NB-IoT · LTE · Ethernet"
                className="col-span-6 row-span-1 md:col-span-3"
                imageRole="inline"
                imageDescription="Smartphone over-the-shoulder view of a tank-monitoring dashboard, plant gantry slightly blurred behind"
                imagePrompt="Over-the-shoulder photograph: a Plant Manager's hand holding a phone displaying a clean tank-monitoring dashboard — 4 tank-level gauges, one trend line, alarm-status badges. The background is a blurred Kenyan plant gantry with stainless tanks. Light: golden hour warm. Phone screen UI shown legibly. Composition: 3:2 landscape, phone in lower-right third. Editorial photojournalism style, not promo render."
                data-reveal-item
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── REFERENCE WORK (Desire) — Crywan editorial card ──────────── */}
      <section
        aria-label="Reference work"
        className="border-y border-border/8 bg-surface-2/40 px-6 py-28 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.1}>
            <div className="flex flex-col gap-12 md:gap-16">
              <div
                data-reveal-item
                className="flex flex-col gap-3"
              >
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
                  <div className="md:col-span-3">
                    <div className="overflow-hidden">
                      <ImagePlaceholder
                        role="hero"
                        description="Crywan Industries plant — stainless tank install wide shot at dusk"
                        prompt="Editorial wide shot: dusk at Crywan Industries in Kenya — a cluster of polished 304 stainless processing tanks, gantry catwalks above, single Plant Manager silhouette walking past in the mid-distance. Warm tungsten plant lights, deep blue dusk sky. Authentic industrial documentary photograph, not a render, not a stock shot. 16:9 cinematic. Phase One medium-format quality."
                        className="!rounded-none !border-0 transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
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
      <section
        aria-label="Industries served"
        className="px-6 py-28 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.06}>
            <div
              data-reveal-item
              className="mb-12 flex flex-col gap-3 md:mb-16"
            >
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
                    <span className="col-span-12 flex items-center justify-end text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-text md:col-span-1">
                      <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ─── TCO TEASER — editorial moment ─────────────────────────────── */}
      <section
        aria-label="The carbon-steel comparison"
        className="px-6 py-28 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.08}>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
              <div
                data-reveal-item
                className="md:col-span-5"
              >
                <span className="font-mono-label text-[10px] text-faint">
                  ⟶ The conversation that closes
                </span>
                <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                  What carbon steel actually costs you.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted">
                  In Kenya&apos;s humidity, untreated carbon steel rusts to
                  unusable within 8–12 years. Zinc-alum holds for 30+. We
                  publish the math — replacement-cycle costs, downtime,
                  reinstallation labor — because nobody else does, and
                  because the math is the argument.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/compare/zinc-alum-vs-carbon-steel/"
                    className="press inline-flex items-center gap-2 rounded-pill bg-text px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent"
                  >
                    See the comparison
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </Link>
                  <Link
                    href="/tools/lifecycle-tco/"
                    className="press inline-flex items-center gap-2 rounded-pill border border-border/20 px-5 py-3 text-sm text-text transition-colors hover:bg-surface"
                  >
                    TCO calculator
                  </Link>
                </div>
              </div>

              <div
                data-reveal-item
                className="md:col-span-7"
              >
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <StatBlock
                    label="Carbon steel"
                    value="8–12 yrs"
                    sub="To unusable in Kenya humidity"
                    accent={false}
                  />
                  <StatBlock
                    label="Zinc-alum"
                    value="30+ yrs"
                    sub="Service life · same install cost"
                    accent
                  />
                  <StatBlock
                    label="Replacement cycles"
                    value="3 vs 1"
                    sub="Over a 30-year horizon"
                    accent={false}
                  />
                  <StatBlock
                    label="Downtime saved"
                    value="~14 weeks"
                    sub="Over the same horizon"
                    accent={false}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA SECTION (Action) ──────────────────────────────────────── */}
      <section
        aria-label="Three ways in"
        className="border-t border-border/10 bg-text px-6 py-28 text-on-accent md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal stagger={0.07}>
            <div
              data-reveal-item
              className="flex flex-col gap-3 md:mb-16"
            >
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
  imageRole: "hero" | "card" | "inline";
  imageDescription: string;
  imagePrompt: string;
  feature?: boolean;
} & React.HTMLAttributes<HTMLAnchorElement>;

function BentoCard({
  href,
  title,
  tagline,
  copy,
  stat,
  className,
  imageRole,
  imageDescription,
  imagePrompt,
  feature = false,
  ...rest
}: BentoCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "press group relative flex flex-col overflow-hidden rounded-card border border-border/8 bg-surface transition-colors duration-300 hover:border-border/20",
        className,
      )}
      {...rest}
    >
      <div className="relative flex-1 overflow-hidden">
        <ImagePlaceholder
          role={imageRole}
          description={imageDescription}
          prompt={imagePrompt}
          className="!h-full !w-full !aspect-auto !rounded-none !border-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Subtle bottom wash for text legibility once real photo is in. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(to top, rgb(var(--ns-surface) / 0.95) 10%, transparent 70%)",
          }}
        />
      </div>
      <div
        className={cn(
          "relative flex flex-col gap-2 p-5 md:p-6",
          feature && "md:gap-3 md:p-8",
        )}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={cn(
              "font-display font-medium tracking-tight",
              feature ? "text-2xl md:text-3xl" : "text-xl",
            )}
          >
            {title}
          </h3>
          <span className="font-mono-label text-[10px] text-faint">
            {stat}
          </span>
        </div>
        <p className="font-mono-label text-[10px] text-accent">{tagline}</p>
        <p className={cn("text-sm leading-relaxed text-muted", feature && "md:text-base")}>
          {copy}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs text-text transition-transform duration-300 group-hover:translate-x-0.5">
          Explore
          <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
        </span>
      </div>
    </Link>
  );
}

function StatBlock({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-card border p-6 md:p-7",
        accent
          ? "border-accent/30 bg-accent/8 text-text"
          : "border-border/10 bg-surface text-text",
      )}
    >
      <span
        className={cn(
          "font-mono-label text-[10px]",
          accent ? "text-accent" : "text-faint",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-display text-4xl font-medium leading-none tracking-tight md:text-5xl",
          accent && "text-accent-strong",
        )}
      >
        {value}
      </span>
      <span className="text-xs text-muted">{sub}</span>
    </div>
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
