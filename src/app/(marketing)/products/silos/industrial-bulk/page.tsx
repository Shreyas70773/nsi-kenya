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
  title: "Industrial Bulk Silo Kenya: Cement & Powder",
  description:
    "Bulk steel silos for cement, powders, and food ingredients at Kenyan industrial plants. 10 to 1,000 MT, pneumatic conveying compatible, dust collector ready.",
  alternates: { canonical: "/products/silos/industrial-bulk/" },
  keywords: [
    "industrial bulk silo Kenya",
    "cement silo Kenya",
    "powder silo Nairobi",
    "bulk material silo Kenya",
    "pneumatic conveying silo Kenya",
    "ready-mix cement silo Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Industrial Bulk Silo Kenya: Cement & Powder",
    description:
      "Bulk steel silos for cement, powders, and food ingredients at Kenyan industrial plants. 10 to 1,000 MT, pneumatic conveying compatible, dust collector ready.",
    url: "/products/silos/industrial-bulk/",
    images: [{ url: "/images/products/silos-industrial-bulk-hero.png" }],
  },
};

const SPECS = [
  { label: "Material", value: "Carbon steel or hot-dip galvanised, painted finishes on request" },
  { label: "Capacity range", value: "10 to 1000", unit: "MT" },
  { label: "Diameter range", value: "3 to 14", unit: "m" },
  { label: "Hopper angle", value: "60° standard for cement; sized to material angle of repose" },
  { label: "Top fittings", value: "Pneumatic fill line, pressure relief, dust collector mount" },
  { label: "Bottom fittings", value: "Bulk loading spout, slide gate, fluidising pads for cement" },
  { label: "Level monitoring", value: "Continuous radar plus high/low setpoint paddle, default" },
  { label: "Access", value: "Caged ladder with intermediate platforms, top safety rail" },
  { label: "Lead time, Kenya", value: "10 to 16 weeks ex-works, plus on-site erection" },
] as const;

const APPLICATIONS = [
  {
    title: "Cement and lime",
    copy: "Bulk cement silos for ready-mix yards, block plants, and infrastructure projects. 60° hopper, fluidising pads, pneumatic fill.",
  },
  {
    title: "Powder handling",
    copy: "Industrial powder ingredients (fly ash, gypsum, soda ash). Dust-collector mount standard on top.",
  },
  {
    title: "Food ingredients",
    copy: "Bulk flour, sugar, starch storage for industrial bakeries and food processors. Galvanised, food-grade-compatible coatings on the bottom cone.",
  },
];

export default function IndustrialBulkSilosPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Industrial Bulk Silos",
          material: "Carbon steel or hot-dip galvanised",
          category: "Industrial Silo",
          description:
            "Bulk storage silos for cement, powders, and food ingredients at Kenyan industrial plants. 10 to 1000 MT.",
          url: `${SITE_URL}/products/silos/industrial-bulk/`,
        })}
      />

      <PageHero
        eyebrow="Silos / Industrial Bulk"
        title="Large-scale bulk storage,"
        titleAccent="from a single cement silo to a powder-handling array."
        subtitle="Steel silos for cement, powders, and food ingredients. Pneumatic-conveying compatible, dust-collector ready, radar level monitoring on every install. Sized between 10 and 1000 metric tonnes per silo."
        imageSrc="/images/products/silos-industrial-bulk-hero.png"
        imageAlt="A large industrial bulk silo for cement or powder at a Kenyan plant"
        primaryCta={{ href: "/request-quote/", label: "Spec a bulk silo" }}
        secondaryCta={{ href: "/products/silos/", label: "All silo types" }}
        metaLeft="10 to 1000 MT"
        metaRight="Pneumatic-conveying compatible"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Silos", href: "/products/silos/" },
            { label: "Industrial Bulk", href: "/products/silos/industrial-bulk/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What it is</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The structural-engineering end of silo work.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Industrial bulk silos are different from grain or feed
                because the material is heavier, the cycle is faster,
                and the discharge has to be reliable enough that a
                tanker truck below never waits. The hopper angle, the
                fluidising pad layout, and the dust-collector geometry
                all change with the material.
              </p>
              <p>
                We design the structure to Eurocode 3, weld to AWS
                D1.1, and erect on-site for the larger units. Drawings
                and engineering calculations are supplied with every
                quote.
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
              The standard build.
            </h2>
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
            What goes inside them.
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
        headline="Specifying a bulk storage array?"
        headlineAccent="We design and erect."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
