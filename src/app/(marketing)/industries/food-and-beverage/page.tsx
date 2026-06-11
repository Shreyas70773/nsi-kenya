import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Food & Beverage Equipment Supplier Kenya",
  description:
    "Stainless 304/316L processing tanks, jacketed vessels, grain silos, and instrumentation for Kenyan dairies, beverages, edible oils, brewing, and bakery operators.",
  alternates: { canonical: "/industries/food-and-beverage/" },
  keywords: [
    "food and beverage equipment supplier Kenya",
    "dairy plant tanks Nairobi",
    "food processing tanks Kenya",
    "beverage plant equipment Kenya",
    "edible oil tank Kenya",
    "bakery silo Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Food & Beverage Equipment Supplier Kenya",
    description:
      "Stainless 304/316L processing tanks, jacketed vessels, grain silos, and instrumentation for Kenyan dairies, beverages, edible oils, brewing, and bakery operators.",
    url: "/industries/food-and-beverage/",
    images: [{ url: "/images/industries/food-and-beverage-hero.png" }],
  },
};

const SUB_APPS = [
  {
    title: "Dairy",
    copy: "Milk silos, jacketed processing tanks, CIP loops, instrumentation for capacity-expansion projects and new product lines.",
    fit: "SS 304 + 316L (whey), epoxy-lined for caustic, flow + level + temp instruments",
  },
  {
    title: "Beverage",
    copy: "Bright tanks, syrup tanks, blending tanks, water polishing. Sanitary tri-clamp throughout, instrumentation pre-tapped.",
    fit: "SS 304 throughout, sanitary fittings, flow + level + pH",
  },
  {
    title: "Edible Oils",
    copy: "Refining tanks, deodorising vessels, intermediate storage with jacketed heating loops.",
    fit: "SS 304 main, 316L for FFA acid wash, temperature + pressure",
  },
  {
    title: "Brewing",
    copy: "Mash tuns, lauter tuns, fermenters, bright tanks, malt silos. Sized for craft (50 to 500 HL) and industrial (5,000 HL+) breweries.",
    fit: "SS 304/316L, grain silos, flow + level + temp + pressure",
  },
  {
    title: "Bakery & Grain",
    copy: "Flour silos, mill intake silos, ingredient-handling silos for high-throughput bakery operations.",
    fit: "Galvanised grain silos, level instrumentation, aeration",
  },
];

const TRIGGERS = [
  {
    title: "Capacity expansion",
    copy: "Existing line at ceiling, new SKUs in the pipeline, demand outstripping current vessel capacity. The most common F&B buying trigger we see.",
  },
  {
    title: "New product line",
    copy: "Fresh SKU needs its own vessel train. Spec is usually material-driven (304 vs 316L) plus a CIP loop that ties into the existing utility headers.",
  },
  {
    title: "Plant audit",
    copy: "KEBS or third-party audit identifies aging vessels or insufficient sanitary design. Triggers a replacement program inside 12 months.",
  },
  {
    title: "Food-safety failure",
    copy: "Recall or quality event traces back to vessel hygiene. Urgent spec for sanitary tri-clamp fittings, surface-finish upgrades, CIP coverage gaps.",
  },
];

export default function FoodAndBeveragePage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          slug: "food-and-beverage",
          name: "Food & Beverage Equipment",
        })}
      />

      <PageHero
        eyebrow="Industries / Food & Beverage"
        title="Equipment for the plants"
        titleAccent="that feed Kenya."
        subtitle="Dairy, beverage, edible oils, brewing, bakery. Single supplier across stainless processing tanks, jacketed vessels, grain silos, structural fabrication, and the full instrument stack. Sanitary tri-clamp, food-grade finishes, KEBS-aware sourcing."
        imageSrc="/images/industries/food-and-beverage-hero.png"
        imageAlt="Interior of a Kenyan beverage filling line with stainless filling heads and bottles on conveyor"
        primaryCta={{ href: "/request-quote/", label: "Spec an F&B project" }}
        secondaryCta={{ href: "/products/tanks/stainless-steel/", label: "Stainless tanks" }}
        metaLeft="Dairy · Beverage · Edible oils · Brewing · Bakery"
        metaRight="KEBS-aware sourcing"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries/" },
            { label: "Food & Beverage", href: "/industries/food-and-beverage/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeader
              index="01"
              eyebrow="The buying frame"
              title="F&B buyers are growing. We equip them to grow."
              className="mb-0 md:mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <Reveal className="md:col-span-7">
            <div data-reveal-item>
              <Prose>
              <p>
                F&B operators don't buy infrastructure because they have to.
                They buy it because they're expanding. New line, new SKU,
                new facility, new export market. The brief reads as ambition,
                not compliance.
              </p>
              <p>
                That changes what matters in the spec. Material grade for
                the SKU, sanitary fittings for the audit, CIP coverage for
                the operator, and lead time for the launch date. We design
                around all four.
              </p>
              <p>
                We work in 304 stainless as the default, 316L wherever
                chlorides or organic acids show up, and epoxy-lined for the
                caustic and acid sides of CIP. Every tank is pre-tapped for
                the instruments that hit the spec sheet.
              </p>
              </Prose>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Full-bleed media band — the filling line at a lower crop, breaking
          the container rhythm between the frame and the sub-application ledger. */}
      <div className="relative h-[50vh] overflow-hidden md:h-[65vh]">
        <ParallaxImage className="absolute inset-0" amount={14}>
          <Image
            src="/images/industries/food-and-beverage-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_72%]"
          />
        </ParallaxImage>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgb(8 6 4 / 0.72) 0%, rgb(8 6 4 / 0.25) 32%, rgb(8 6 4 / 0) 58%)",
          }}
        />
        <div className="font-mono-label absolute inset-x-0 bottom-0 z-[2] flex flex-col gap-2 px-6 pb-6 text-[10px] text-white/75 md:flex-row md:items-end md:justify-between md:px-10 md:pb-8">
          <span>Sanitary tri-clamp · food-grade finishes · KEBS-aware sourcing</span>
          <span>Dairy · Beverage · Edible oils · Brewing · Bakery</span>
        </div>
      </div>

      <Section bordered theme="paper">
        <SectionHeader
          index="02"
          eyebrow="Sub-applications"
          title="Five vertical sub-applications, all in scope."
        />
        <Reveal stagger={0.08}>
          <ul className="flex flex-col">
            {SUB_APPS.map((s, i) => (
              <li
                key={s.title}
                data-reveal-item
                className={cn(
                  "group hairline-t grid grid-cols-12 items-start gap-x-4 gap-y-3 py-7 md:gap-x-6 md:py-9",
                  i === SUB_APPS.length - 1 && "hairline-b",
                )}
              >
                <span
                  aria-hidden
                  className="font-display-condensed col-span-2 pt-1 text-xl font-black leading-none text-faint transition-colors duration-300 group-hover:text-accent md:col-span-1 md:text-2xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 flex flex-col gap-2 md:col-span-4">
                  <h3 className="font-display text-balance text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="font-mono-label text-[10px] text-accent">
                    Equipment fit: {s.fit}
                  </p>
                </div>
                <p className="col-span-12 text-sm leading-relaxed text-muted md:col-span-6 md:col-start-7">
                  {s.copy}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Iron statement — the page's buying posture, elevated. */}
      <Section theme="iron" size="spacious" ariaLabel="Why F&B operators buy">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="03">The buying posture</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              F&amp;B operators don&apos;t buy infrastructure because they have
              to.{" "}
              <span className="text-accent">
                They buy it because they&apos;re expanding.
              </span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-3xl md:grid-cols-3">
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Sub-applications
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={5} />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Dairy, beverage, edible oils, brewing, bakery &amp; grain —
                  all in scope.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Shipped, worst case
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={8} suffix=" wk" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  F&amp;B briefs on a deadline, shipped in 4 to 8 weeks.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Audit window
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={12} suffix=" mo" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  A plant audit triggers a replacement program inside 12
                  months.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="04"
          eyebrow="Buying triggers"
          title="Four reasons F&B operators call us first."
        />
        <Reveal stagger={0.08} yFrom={16}>
          <ol className="divide-y divide-border/10 border-y border-border/10">
            {TRIGGERS.map((t, i) => (
              <li
                key={t.title}
                data-reveal-item
                className="grid grid-cols-12 gap-4 py-6 md:gap-6 md:py-8"
              >
                <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display col-span-10 text-xl font-semibold tracking-tight md:col-span-3 md:text-2xl">
                  {t.title}
                </h3>
                <p className="col-span-12 text-sm text-muted md:col-span-8">
                  {t.copy}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Pull quote — the page's most persuasive line, set asymmetrically. */}
      <Section size="compact" ariaLabel="In one line">
        <div className="hairline-t grid grid-cols-1 gap-6 pt-8 md:grid-cols-12 md:gap-10 md:pt-12">
          <p className="font-mono-label text-[10px] text-faint md:col-span-5">
            The buying frame · Food &amp; Beverage
          </p>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            &ldquo;The brief reads as ambition, not compliance.&rdquo;
          </TextReveal>
        </div>
      </Section>

      <CtaBand
        headline="Got an F&B brief on a deadline?"
        headlineAccent="We've shipped these in 4 to 8 weeks."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
