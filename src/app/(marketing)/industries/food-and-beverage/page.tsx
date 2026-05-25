import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceLd } from "@/lib/seo";

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
            <Eyebrow>The buying frame</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              F&B buyers are growing. We equip them to grow.
            </h2>
          </div>
          <div className="md:col-span-7">
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
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Sub-applications</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Five vertical sub-applications, all in scope.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
          {SUB_APPS.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 md:p-7"
            >
              <h3 className="font-display text-xl font-medium tracking-tight">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{s.copy}</p>
              <p className="font-mono-label mt-1 text-[10px] text-accent">
                Equipment fit: {s.fit}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Buying triggers</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Four reasons F&B operators call us first.
          </h2>
        </div>
        <ol className="divide-y divide-border/10 border-y border-border/10">
          {TRIGGERS.map((t, i) => (
            <li
              key={t.title}
              className="grid grid-cols-12 gap-4 py-6 md:gap-6 md:py-8"
            >
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display col-span-10 text-xl font-medium tracking-tight md:col-span-3 md:text-2xl">
                {t.title}
              </h3>
              <p className="col-span-12 text-sm text-muted md:col-span-8">
                {t.copy}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        headline="Got an F&B brief on a deadline?"
        headlineAccent="We've shipped these in 4 to 8 weeks."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
