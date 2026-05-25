import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { SpecTable } from "@/components/primitives/spec-table";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { productLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Stainless Steel Tanks",
  description:
    "304 and 316L stainless steel tanks fabricated in Kenya for dairy, beverage, edible oils, ETP, and pharmaceutical-adjacent duty. Sanitary tri-clamp fittings, CIP-ready, optional cloud-ready monitoring.",
  alternates: { canonical: "/products/tanks/stainless-steel/" },
};

const SPECS = [
  { label: "Material grades", value: "304 (general), 316L (chloride / corrosive)" },
  { label: "Capacity range", value: "1 to 500", unit: "m³" },
  { label: "Wall thickness", value: "2 to 6", unit: "mm" },
  { label: "Internal finish", value: "Ra ≤ 0.8 µm (food contact), Ra ≤ 0.4 µm (pharma-adjacent)" },
  { label: "External finish", value: "Mill, brushed, or mirror polish" },
  { label: "Weld certification", value: "TIG with argon backing, dye-penetrant tested" },
  { label: "Design pressure", value: "Atmospheric to 6", unit: "bar" },
  { label: "Standard fittings", value: "Tri-clamp manway, sanitary drain, CIP spray ball, sight glass, temperature port" },
  { label: "Instrumentation ports", value: "Pre-tapped for level, temperature, pressure, and pH" },
  { label: "Lead time, Kenya", value: "4 to 8 weeks ex-works, depending on capacity" },
] as const;

const APPLICATIONS = [
  {
    title: "Dairy",
    copy: "Milk silos, jacketed processing tanks, CIP loops. 304 for general dairy, 316L for whey concentrates and acid wash environments.",
  },
  {
    title: "Beverage",
    copy: "Bright tanks, syrup tanks, blending tanks, water polishing tanks. Sanitary tri-clamp throughout.",
  },
  {
    title: "Edible oils",
    copy: "Refining tanks, deodorising vessels, intermediate storage with jacketed heating loops.",
  },
  {
    title: "ETP & process water",
    copy: "Final-stage polishing tanks where corrosion resistance and clean discharge matter more than initial cost.",
  },
];

export default function StainlessSteelTanksPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Stainless Steel Tanks",
          material: "Stainless Steel 304 / 316L",
          category: "Industrial Tank",
          description:
            "Food-grade and chemical-grade stainless steel storage and processing tanks fabricated in Kenya.",
          url: `${SITE_URL}/products/tanks/stainless-steel/`,
        })}
      />

      <PageHero
        eyebrow="Tanks / Stainless Steel"
        title="304 and 316L stainless tanks,"
        titleAccent="fabricated in Kenya."
        subtitle="The default tank for any process where the medium will touch food, pharma-adjacent product, or a corrosive aqueous environment. We TIG-weld with argon backing, finish to your Ra requirement, and pre-tap for the instruments you want."
        imageSrc="/images/home/sector-fnb.png"
        imageAlt="Operator inspecting jacketed stainless fermentation tanks inside a Kenyan F&B plant"
        primaryCta={{ href: "/request-quote/", label: "Spec a stainless tank" }}
        secondaryCta={{
          href: "/products/tanks/",
          label: "Compare tank types",
        }}
        metaLeft="304 · 316L · 1 to 500 m³"
        metaRight="TIG, argon-backed, dye-penetrant tested"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Tanks", href: "/products/tanks/" },
            {
              label: "Stainless Steel",
              href: "/products/tanks/stainless-steel/",
            },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What it is</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The right grade for the medium you store.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                <strong>304</strong> is the workhorse. Use it for dairy
                processing, beverage filling, edible oils, and the majority
                of food-contact applications. It handles chlorides up to
                roughly 200 ppm without pitting.
              </p>
              <p>
                <strong>316L</strong> adds molybdenum for chloride resistance.
                Use it for whey concentrates, acid CIP loops, pharmaceutical-
                adjacent duty, and any process where you expect repeated
                contact with halogen environments. The low-carbon variant
                resists weld-zone sensitization in CIP cycles.
              </p>
              <p>
                Both grades are fabricated locally, TIG-welded with argon
                backing on the inside surface, and dye-penetrant tested on
                every seam before passivation.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The numbers that matter on procurement.
            </h2>
            <p className="mt-4 text-sm text-muted">
              Every spec below is the standard. Anything outside the range
              is doable; tell us what you need and we'll quote it.
            </p>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Applications</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Where stainless earns its premium.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
          {APPLICATIONS.map((a) => (
            <div
              key={a.title}
              className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 md:p-7"
            >
              <h3 className="font-display text-xl font-medium tracking-tight">
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{a.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Eyebrow>Cloud-ready, when you want it</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-2xl font-medium leading-tight tracking-tight md:text-3xl">
              Every stainless tank we install can be wired to our remote
              monitoring app.
            </h2>
            <p className="mt-4 max-w-prose text-sm text-muted">
              Level, temperature, pressure, and pH read out to a phone or
              browser, with alarms routed to whoever you nominate. Safaricom
              NB-IoT, LoRaWAN, 4G, or Ethernet. Not bundled into the tank
              quote; ask for it if you want it.
            </p>
            <Link
              href="/products/iot/"
              className="press mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              See how remote monitoring works →
            </Link>
          </div>
          <div className="rounded-card border border-border/15 bg-surface p-7 md:col-span-5">
            <p className="font-mono-label text-[10px] text-faint">
              Read-out coverage
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-text">
              <li>· Tank level (radar, ultrasonic, hydrostatic)</li>
              <li>· Temperature (RTD or thermocouple)</li>
              <li>· Pressure (gauge or absolute)</li>
              <li>· pH and conductivity</li>
              <li>· CIP cycle timing and verification</li>
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Need stainless on a deadline?"
        headlineAccent="Ex-works in 4 to 8 weeks."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
