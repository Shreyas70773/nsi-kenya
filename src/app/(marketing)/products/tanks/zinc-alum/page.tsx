import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { SpecTable } from "@/components/primitives/spec-table";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { RelatedProducts } from "@/components/primitives/related-products";
import { JsonLd } from "@/components/seo/json-ld";
import { productLd, faqLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { FaqList } from "@/components/primitives/faq-list";

export const metadata: Metadata = {
  title: "Zinc-Alum Tank Kenya: 30-Year Water Storage",
  description:
    "Bolted zinc-aluminium water-storage tanks for Kenyan industrial sites. 50 to 5,000 m³, 30+ year service life, modular panels, no on-site welding.",
  alternates: { canonical: "/products/tanks/zinc-alum/" },
  keywords: [
    "zinc aluminum tank Kenya",
    "zincalume tank Kenya",
    "bolted water tank Kenya",
    "industrial water tank Nairobi",
    "long life water tank Kenya",
    "carbon steel tank alternative Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Zinc-Alum Tank Kenya: 30-Year Water Storage",
    description:
      "Bolted zinc-aluminium water-storage tanks for Kenyan industrial sites. 50 to 5,000 m³, 30+ year service life, modular panels, no on-site welding.",
    url: "/products/tanks/zinc-alum/",
    images: [{ url: "/images/products/tanks-zinc-alum-hero.png" }],
  },
};

const SPECS = [
  { label: "Panel material", value: "Hot-dip zinc-aluminium steel (55% Al, 43.5% Zn, 1.5% Si)" },
  { label: "Coating mass", value: "150 to 200", unit: "g/m²" },
  { label: "Capacity range", value: "50 to 5000", unit: "m³" },
  { label: "Diameter range", value: "3 to 30", unit: "m" },
  { label: "Panel assembly", value: "Bolted with EPDM gaskets, internal sealant on every seam" },
  { label: "Liner options", value: "EPDM food-grade, PVC for chemical-resistant duty" },
  { label: "Roof options", value: "Aluminium dome, conical fixed roof, or open-top" },
  { label: "Service life, Kenya humidity", value: "30+", unit: "years" },
  { label: "Installation footprint", value: "Lower than welded-steel equivalent; modular delivery" },
  { label: "Lead time, Kenya", value: "6 to 10 weeks ex-works, plus on-site assembly" },
] as const;

const FAQS = [
  {
    question: "How long does a zinc-alum tank actually last in Kenya?",
    answer:
      "In unsheltered Kenyan humidity, design life is 30+ years with no recoating required during the design life. The 55% aluminium / 43.5% zinc barrier coating is self-healing: at any cut or scratch, the zinc sacrificially protects the steel underneath, so service life does not depend on perfect surface preservation.",
  },
  {
    question: "How does zinc-alum compare to carbon steel over 30 years?",
    answer:
      "Carbon steel runs to 2 or 3 full replacement cycles over a 30-year horizon, plus 12 to 20 weeks of accumulated recoat/replacement downtime. Zinc-alum runs to one install, zero recoats, zero replacement downtime over the same horizon. The capital premium is 15 to 25 percent at our typical 200+ m³ sizes.",
  },
  {
    question: "How long does on-site assembly take?",
    answer:
      "Modular bolted-panel assembly avoids on-site welding entirely. A 500 m³ tank typically erects in 2 to 3 weeks on a prepared concrete plinth, with our supervisor on the install crew. Larger tanks scale proportionally; foundation prep happens in parallel with panel manufacture in Nairobi.",
  },
  {
    question: "Can the tank be expanded after installation?",
    answer:
      "Yes. Capacity can be grown in place by adding bolted ring courses to the existing shell, subject to a structural review of the foundation. This is one of the reasons utilities and large feed mills choose zinc-alum over welded steel.",
  },
] as const;

const VS_CS_ROWS = [
  { label: "Initial cost (per m³)", value: "Similar to carbon steel for ≥ 200 m³, higher for small tanks" },
  { label: "Corrosion resistance", value: "Excellent in Kenyan humidity; barrier coating self-heals at cuts" },
  { label: "Service life (untreated)", value: "30+ years vs 8 to 12 for carbon steel" },
  { label: "Replacement cycles, 30 yr horizon", value: "1 vs 3" },
  { label: "Downtime saved, 30 yr horizon", value: "~14 weeks of avoided reinstall labour" },
  { label: "Repaintable", value: "Not required; carbon steel needs recoat every 3 to 5 years" },
  { label: "Modular expansion", value: "Add rings to grow capacity in place" },
];

export default function ZincAlumTanksPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Zinc-Alum Tanks",
          material: "Hot-dip zinc-aluminium steel (55% Al, 43.5% Zn)",
          category: "Industrial Tank",
          description:
            "Bolted zinc-aluminium steel tanks for industrial water storage and ETP. 30+ year service life in Kenyan humidity.",
          url: `${SITE_URL}/products/tanks/zinc-alum/`,
        })}
      />
      <JsonLd
        data={faqLd(
          FAQS.map((f) => ({ question: f.question, answer: f.answer })),
        )}
      />

      <PageHero
        eyebrow="Tanks / Zinc-Alum"
        title="The bolted tank that"
        titleAccent="outlasts carbon steel by 20 years."
        subtitle="A 55% aluminium, 43.5% zinc barrier coating that self-heals at cuts and shrugs off Kenyan humidity. Modular panels mean we can drop a 50 to 5000 cubic metre tank on your site without on-location welding."
        imageSrc="/images/products/tanks-zinc-alum-hero.png"
        imageAlt="A large bolted zinc-aluminium water tank standing on a concrete plinth"
        primaryCta={{ href: "/request-quote/", label: "Spec a zinc-alum tank" }}
        secondaryCta={{
          href: "/products/tanks/",
          label: "Compare tank types",
        }}
        metaLeft="50 to 5000 m³"
        metaRight="30+ year service life"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Tanks", href: "/products/tanks/" },
            { label: "Zinc-Alum", href: "/products/tanks/zinc-alum/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>Why this metallurgy</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Carbon steel rusts. Stainless costs. Zinc-alum is the answer to both.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Bare carbon steel in Kenyan humidity reaches end-of-life in
                eight to twelve years. Even with paint and recoat cycles,
                you are looking at three full replacements over a thirty-
                year horizon, plus the downtime each one costs.
              </p>
              <p>
                Stainless will outlast that timeline, but at three to four
                times the capital cost per cubic metre once you cross 200
                cubic metres of capacity.
              </p>
              <p>
                Zinc-alum sits in the middle. The 55% aluminium, 43.5% zinc
                barrier coating is a self-healing system: at any cut or
                scratch, the zinc sacrificially protects the steel
                underneath. Service life in unsheltered Kenyan conditions
                runs to thirty years and beyond, at a capital cost
                competitive with carbon steel above ~200 cubic metres.
              </p>
              <p>
                Because the tanks are bolted from pre-coated panels,
                installation is faster than welded-steel equivalents and
                doesn't require certified site welding.
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
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Versus carbon steel</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            The lifecycle math, in one table.
          </h2>
          <p className="max-w-prose text-sm text-muted">
            Initial cost is rarely the right way to spec a tank. We publish
            this because nobody else does, and because the conversation
            usually closes on the second number, not the first.
          </p>
        </div>
        <SpecTable rows={VS_CS_ROWS} />
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-8 flex flex-col gap-3">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            What buyers ask before specifying zinc-alum.
          </h2>
        </div>
        <FaqList items={FAQS} />
      </Section>

      <RelatedProducts
        headline="Other tank metallurgies, and where they fit."
        items={[
          {
            href: "/products/tanks/stainless-steel/",
            title: "Stainless steel tanks",
            copy: "304 and 316L for food, dairy, and chemical-resistant duty where corrosion matters more than initial cost.",
            imageSrc: "/images/products/tanks-stainless-steel-hero.png",
            imageAlt: "Polished stainless steel tank inside a Kenyan F&B plant",
          },
          {
            href: "/industries/etp-water-treatment/",
            title: "ETP & water treatment",
            copy: "Where zinc-alum equalisation tanks earn their lifecycle math against regulator inspection cycles.",
            imageSrc: "/images/industries/etp-water-treatment-hero.png",
            imageAlt: "Outdoor effluent treatment plant in Kenya",
          },
          {
            href: "/products/iot/",
            title: "Cloud-ready monitoring",
            copy: "Inventory and level on every zinc-alum install. NB-IoT for unattended water sites.",
            imageSrc: "/images/products/iot-hero.png",
            imageAlt: "NB-IoT gateway box mounted on a pole",
          },
        ]}
      />

      <CtaBand
        headline="Sized your tank yet?"
        headlineAccent="Get a quote in 48 hours."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
