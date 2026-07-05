import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
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
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax";

export const metadata: Metadata = {
  title: "Zinc Aluminium Tank Kenya: 20-Year Water Storage",
  description:
    "Bolted zinc-aluminium water-storage tanks for Kenyan industrial sites. 50 to 5,000 m³, 20+ year service life, modular panels, no on-site welding.",
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
    title: "Zinc Aluminium Tank Kenya: 20-Year Water Storage",
    description:
      "Bolted zinc-aluminium water-storage tanks for Kenyan industrial sites. 50 to 5,000 m³, 20+ year service life, modular panels, no on-site welding.",
    url: "/products/tanks/zinc-alum/",
    images: [{ url: "/images/products/tanks-zinc-alum-hero-v2.png" }],
  },
};

const SPECS = [
  { label: "Panel material", value: "Hot-dip zinc-aluminium steel (55% Al, 43.5% Zn, 1.5% Si)" },
  { label: "Coating mass", value: "150 to 200", unit: "g/m²" },
  { label: "Capacity range", value: "50 to 5000", unit: "m³" },
  { label: "Diameter range", value: "3 to 30", unit: "m" },
  { label: "Panel assembly", value: "Bolted with EPDM gaskets, internal sealant on every seam" },
  { label: "Liner", value: "Included as standard — EPDM food-grade, or PVC for chemical-resistant duty" },
  { label: "Roof options", value: "Aluminium dome, conical fixed roof, or open-top" },
  { label: "Service life, humid conditions", value: "20+", unit: "years" },
  { label: "Installation footprint", value: "Lower than welded-steel equivalent; modular delivery" },
  { label: "Lead time", value: "6 to 10 weeks ex-works, plus on-site assembly" },
] as const;

const FAQS = [
  {
    question: "How long does a zinc aluminium tank actually last?",
    answer:
      "In unsheltered, humid conditions, design life is 20+ years with no recoating required during the design life. The 55% aluminium / 43.5% zinc barrier coating is self-healing: at any cut or scratch, the zinc sacrificially protects the steel underneath, so service life does not depend on perfect surface preservation.",
  },
  {
    question: "How does zinc aluminium compare to carbon steel over 20 years?",
    answer:
      "Carbon steel runs to 1 or 2 full replacement cycles over a 20-year horizon, plus 8 to 12 weeks of accumulated recoat/replacement downtime. Zinc aluminium runs to one install, zero recoats, zero replacement downtime over the same horizon. The capital premium is 15 to 25 percent at our typical 200+ m³ sizes.",
  },
  {
    question: "How long does on-site assembly take?",
    answer:
      "Modular bolted-panel assembly avoids on-site welding entirely. A 500 m³ tank typically erects in 2 to 3 weeks on a prepared concrete plinth, with our supervisor on the install crew. Larger tanks scale proportionally; foundation prep happens in parallel with panel manufacture at our own workshop.",
  },
] as const;

const VS_CS_ROWS = [
  { label: "Initial cost (per m³)", value: "Similar to carbon steel for ≥ 200 m³, higher for small tanks" },
  { label: "Corrosion resistance", value: "Excellent in humid conditions; barrier coating self-heals at cuts" },
  { label: "Service life (untreated)", value: "20+ years vs 8 to 12 for carbon steel" },
  { label: "Replacement cycles, 20 yr horizon", value: "1 vs 2" },
  { label: "Downtime saved, 20 yr horizon", value: "~10 weeks of avoided reinstall labour" },
  { label: "Repaintable", value: "Not required; carbon steel needs recoat every 3 to 5 years" },
];

export default function ZincAlumTanksPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Zinc Aluminium Tanks",
          material: "Hot-dip zinc-aluminium steel (55% Al, 43.5% Zn)",
          category: "Industrial Tank",
          description:
            "Bolted zinc-aluminium steel tanks for industrial water storage and ETP. 20+ year service life in Kenyan humidity.",
          url: `${SITE_URL}/products/tanks/zinc-alum/`,
        })}
      />
      <JsonLd
        data={faqLd(
          FAQS.map((f) => ({ question: f.question, answer: f.answer })),
        )}
      />

      <PageHero
        eyebrow="Tanks / Zinc Aluminium"
        title="The bolted tank that"
        titleAccent="outlasts carbon steel by 20 years."
        subtitle="A 55% aluminium, 43.5% zinc barrier coating that self-heals at cuts and performs well in humid conditions. Modular panels mean we can drop a 50 to 5000 cubic metre tank on your site without on-location welding, with a liner included as standard."
        imageSrc="/images/products/tanks-zinc-alum-hero-v2.png"
        imageAlt="A large bolted zinc-aluminium water tank standing on a concrete plinth"
        primaryCta={{ href: "/request-quote/", label: "Spec a zinc aluminium tank" }}
        secondaryCta={{
          href: "/products/tanks/",
          label: "Compare tank types",
        }}
        metaLeft="50 to 5000 m³"
        metaRight="20+ year service life"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Tanks", href: "/products/tanks/" },
            { label: "Zinc Aluminium", href: "/products/tanks/zinc-alum/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeader
              index="01"
              eyebrow="Why this material"
              title="Carbon steel corrodes. Stainless steel costs more. Zinc aluminium sits between the two."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Bare carbon steel in humid conditions reaches end-of-life in
                eight to twelve years. Even with paint and recoat cycles,
                you are looking at two full replacements over a twenty-year
                horizon, plus the downtime each one costs.
              </p>
              <p>
                Stainless will outlast that timeline, but at three to four
                times the capital cost per cubic metre once you cross 200
                cubic metres of capacity.
              </p>
              <p>
                Zinc aluminium sits in the middle. The 55% aluminium, 43.5%
                zinc barrier coating is a self-healing system: at any cut or
                scratch, the zinc sacrificially protects the steel
                underneath. Service life in unsheltered, humid conditions
                runs to twenty years and beyond, at a capital cost
                competitive with carbon steel above ~200 cubic metres.
              </p>
              <p>
                Because the tanks are bolted from pre-coated panels,
                installation is faster than welded-steel equivalents and
                doesn't require certified site welding. Every tank is
                supplied with a liner included as standard, matched to your
                water duty.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      {/* Full-bleed fabrication strip — hero photograph recropped, breaking
          the container rhythm between the material case and the datasheet. */}
      <div className="relative h-[50vh] overflow-hidden md:h-[65vh]">
        <ParallaxImage className="absolute inset-0">
          <Image
            src="/images/products/tanks-zinc-alum-hero-v2.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_75%]"
          />
        </ParallaxImage>
        <p className="font-mono-label absolute bottom-6 left-6 z-[1] text-[10px] text-white/75 md:bottom-8 md:left-8">
          55% Al · 43.5% Zn · self-healing at every cut
        </p>
      </div>

      <Section bordered theme="paper">
        {/* Datasheet header strip — document-style meta row. */}
        <div className="font-mono-label hairline-t hairline-b mb-10 flex flex-col gap-2 py-3 text-[10px] text-faint md:mb-14 md:flex-row md:items-center md:justify-between">
          <span>NS-TK-ZA · 55% Al / 43.5% Zn</span>
          <span className="hidden md:block">Specification</span>
          <span>Design life 20+ yr · ex-works 6–10 wk</span>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeader
              index="02"
              eyebrow="Specifications"
              title="The numbers that matter on procurement."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="03"
          eyebrow="Versus carbon steel"
          title="The lifecycle math, in one table."
          side={
            <p>
              Initial cost is rarely the right way to spec a tank. This
              table sets out the numbers we use to compare options over the
              full service life, not just at purchase.
            </p>
          }
        />
        <SpecTable rows={VS_CS_ROWS} />
      </Section>

      {/* Iron statement — the lifecycle claim, in the page's own numbers. */}
      <Section theme="iron" size="spacious" ariaLabel="Lifecycle claim">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="04">The lifecycle claim</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              One install, zero recoats,{" "}
              <span className="text-accent">
                zero replacement downtime over a twenty-year horizon.
              </span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-3xl md:grid-cols-3">
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Service life, humid conditions
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={20} suffix="+ yr" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Versus 8 to 12 years for untreated carbon steel.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Capacity ceiling
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={5000} suffix=" m³" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Bolted panels, 3 to 30 m diameter, no site welding.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Downtime avoided, 20-yr horizon
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={10} prefix="~" suffix=" wk" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Reinstall labour carbon steel costs you; zinc aluminium doesn&rsquo;t.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="font-mono-label hairline-t flex flex-col gap-2 pt-5 text-[10px] text-faint md:flex-row md:items-center md:justify-between">
            <span>50 to 5,000 m³</span>
            <span>1 replacement cycle vs 2 for carbon steel</span>
          </div>
        </div>
      </Section>

      {/* Pull quote — the material, in one sentence. */}
      <Section size="compact" ariaLabel="Barrier coating behaviour">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-4 md:col-span-5">
            <span aria-hidden className="hairline h-px w-12" />
            <p className="font-mono-label text-[10px] text-faint">
              Material · barrier coating behaviour
            </p>
          </div>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            “The 55% aluminium, 43.5% zinc barrier coating is a self-healing
            system: at any cut or scratch, the zinc sacrificially protects
            the steel underneath.”
          </TextReveal>
        </div>
      </Section>

      <Section bordered theme="paper">
        <SectionHeader
          index="05"
          eyebrow="Common questions"
          title="What buyers ask before specifying zinc aluminium."
        />
        <FaqList items={FAQS} />
      </Section>

      <RelatedProducts
        headline="Other tank materials, and where they fit."
        items={[
          {
            href: "/products/tanks/stainless-steel/",
            title: "Stainless steel tanks",
            copy: "304 and 316L for food, dairy, and chemical-resistant duty where corrosion matters more than initial cost.",
            imageSrc: "/images/products/tanks-stainless-steel-hero-v2.png",
            imageAlt: "Polished stainless steel tank inside an East African F&B plant",
          },
          {
            href: "/industries/etp-water-treatment/",
            title: "ETP & water treatment",
            copy: "Where zinc aluminium equalisation tanks earn their lifecycle math against regulator inspection cycles.",
            imageSrc: "/images/industries/etp-water-treatment-hero.png",
            imageAlt: "Outdoor effluent treatment plant in Kenya",
          },
          {
            href: "/products/iot/",
            title: "Cloud-ready monitoring",
            copy: "Every zinc aluminium tank we install can be connected to a remote-monitoring app, personalized to your site. NB-IoT for unattended water sites.",
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
