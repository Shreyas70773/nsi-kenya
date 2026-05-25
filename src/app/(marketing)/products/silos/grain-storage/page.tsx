import type { Metadata } from "next";
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
  title: "Grain Storage Silos",
  description:
    "Industrial grain storage silos for Kenyan breweries, feed mills, and food processors. 10 to 500 MT, with aeration, level instrumentation, and inventory hardware available on every install.",
  alternates: { canonical: "/products/silos/grain-storage/" },
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
  { label: "Inventory tracking", value: "Optional, integrates with our remote monitoring app" },
  { label: "Lead time, Kenya", value: "8 to 12 weeks ex-works, plus on-site assembly" },
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

      <PageHero
        eyebrow="Silos / Grain Storage"
        title="Storage you fill"
        titleAccent="and storage you trust."
        subtitle="Galvanised grain silos for breweries, feed mills, and food processors. Aeration, level instrumentation, catwalks, and inventory hardware are all options on every install. Sized between 10 and 500 metric tonnes per silo."
        imageSrc="/images/products/silos-grain-storage-hero.png"
        imageAlt="Galvanised grain storage silos at a Kenyan brewery with conveyor and catwalk"
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
            <Eyebrow>What it is</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              A silo is half storage, half instrumentation.
            </h2>
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

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The base spec, then your overlays.
            </h2>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Where they fit</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Sized for Kenyan plants, not export-only volumes.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
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

      <CtaBand
        headline="Designing a new grain bay?"
        headlineAccent="Book a site audit, we measure for free."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
