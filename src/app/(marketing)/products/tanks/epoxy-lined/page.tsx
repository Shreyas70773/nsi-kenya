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
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax";
import { JsonLd } from "@/components/seo/json-ld";
import { productLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Epoxy-Lined Tank Kenya: ETP & Chemical Dosing",
  description:
    "Carbon-steel tanks with chemical-resistant epoxy lining for ETP dosing, acid storage, and corrosive process media. Fabricated in-house, lining picked to the chemistry.",
  alternates: { canonical: "/products/tanks/epoxy-lined/" },
  keywords: [
    "epoxy lined tank Kenya",
    "epoxy coated tank Nairobi",
    "chemical dosing tank Kenya",
    "ETP chemical tank Kenya",
    "acid storage tank Kenya",
    "corrosion resistant tank Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Epoxy-Lined Tank Kenya: ETP & Chemical Dosing",
    description:
      "Carbon-steel tanks with chemical-resistant epoxy lining for ETP dosing, acid storage, and corrosive process media. Fabricated in-house, lining picked to the chemistry.",
    url: "/products/tanks/epoxy-lined/",
    images: [{ url: "/images/products/tanks-epoxy-lined-hero.png" }],
  },
};

const SPECS = [
  { label: "Shell material", value: "Carbon steel S275 / S355" },
  {
    label: "Lining system",
    value: "Two-component chemical-resistant epoxy, food-grade or industrial",
  },
  { label: "Lining thickness", value: "400 to 600", unit: "µm dry film" },
  { label: "Capacity range", value: "1 to 200", unit: "m³" },
  { label: "Wall thickness", value: "4 to 12", unit: "mm" },
  {
    label: "Surface preparation",
    value: "Sa 2.5 blast cleaning before primer + topcoat",
  },
  {
    label: "Compatible media",
    value: "Dilute acids and alkalis, ETP dosing chemicals, treated effluent",
  },
  {
    label: "Not compatible with",
    value: "Strong oxidising acids, ketones, chlorinated solvents",
  },
  {
    label: "Standard fittings",
    value: "Bolted manway, drain, fill port, instrument flanges",
  },
  {
    label: "Lead time",
    value: "5 to 8 weeks ex-works, including lining cure time",
  },
] as const;

const APPLICATIONS = [
  {
    title: "ETP chemical dosing",
    copy: "Alum, ferric chloride, lime, polymer dosing tanks for effluent treatment plants where stainless is overkill and carbon steel won't survive the medium.",
  },
  {
    title: "Acid storage",
    copy: "Dilute sulphuric, hydrochloric, and phosphoric acid storage. Lining grade picked against the specific acid and concentration.",
  },
  {
    title: "Caustic and alkali",
    copy: "Sodium hydroxide dosing, CIP caustic loops, treated alkaline effluent storage.",
  },
  {
    title: "Treated water polishing",
    copy: "Intermediate storage between treatment stages where neutral or near-neutral pH is the operating point.",
  },
];

export default function EpoxyLinedTanksPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Epoxy-Lined Tanks",
          material: "Carbon steel with chemical-resistant epoxy lining",
          category: "Industrial Tank",
          description:
            "Carbon steel tanks lined with chemical-resistant epoxy for ETP dosing, acid storage, and corrosive media duty.",
          url: `${SITE_URL}/products/tanks/epoxy-lined/`,
        })}
      />

      <PageHero
        eyebrow="Tanks / Epoxy-Lined"
        title="Bolted carbon steel tanks,"
        titleAccent="lined with fusion-bonded epoxy."
        subtitle="The tank shown here is bolted and epoxy fusion-bonded, built for ETP chemical dosing and corrosive process water where stainless costs more than the duty needs and plain carbon steel will not survive the medium. Built in-house, lined to the chemistry, and cured before delivery."
        imageSrc="/images/products/tanks-epoxy-lined-hero.png"
        imageAlt="Bolted epoxy fusion-bonded steel tank with side ladder"
        primaryCta={{ href: "/request-quote/", label: "Spec an epoxy tank" }}
        secondaryCta={{
          href: "/products/tanks/",
          label: "Compare tank types",
        }}
        metaLeft="1 to 200 m³"
        metaRight="Lining picked to the chemistry"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Tanks", href: "/products/tanks/" },
            { label: "Epoxy-Lined", href: "/products/tanks/epoxy-lined/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeader
              index="01"
              eyebrow="What it is"
              title="The right tank for duty where stainless is unnecessary and plain carbon steel will not survive the medium."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                A lot of process duty sits in the gap between food-grade
                hygiene and bulk water storage. Acid dosing, polymer
                preparation, treated effluent intermediate storage, caustic
                CIP loops. Stainless overspends on the duty; carbon steel
                pits or corrodes through inside two years.
              </p>
              <p>
                Epoxy-lined tanks fill that gap. The shell is carbon steel
                S275 or S355 to handle the structural load. The interior is
                blast-cleaned to Sa 2.5 and coated with a two-component
                chemical-resistant epoxy, picked against the specific
                medium and concentration on the brief.
              </p>
              <p>
                We supply with either an industrial-grade or food-grade
                lining where the duty allows it. The lining cure schedule
                runs inside the shop, so the tank arrives on-site ready to
                fill.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      {/* Full-bleed fabrication strip — hero photograph recropped, breaking
          the container rhythm between the brief and the datasheet. */}
      <div className="relative h-[50vh] overflow-hidden md:h-[65vh]">
        <ParallaxImage className="absolute inset-0">
          <Image
            src="/images/products/tanks-epoxy-lined-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_30%]"
          />
        </ParallaxImage>
        <p className="font-mono-label absolute bottom-6 left-6 z-[1] text-[10px] text-white/75 md:bottom-8 md:left-8">
          Blast-cleaned to Sa 2.5 · lined to the chemistry
        </p>
      </div>

      <Section bordered theme="paper">
        {/* Datasheet header strip — document-style meta row. */}
        <div className="font-mono-label hairline-t hairline-b mb-10 flex flex-col gap-2 py-3 text-[10px] text-faint md:mb-14 md:flex-row md:items-center md:justify-between">
          <span>NS-TK-EPX · S275 / S355</span>
          <span className="hidden md:block">Specification</span>
          <span>Lining cured ex-works · 5–8 wk</span>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionHeader
              index="02"
              eyebrow="Specifications"
              title="Lining is picked to the medium."
              className="mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
            <p className="mt-4 text-sm text-muted">
              The numbers below are the default. The right epoxy for your
              chemistry depends on the medium and its concentration. Tell
              us both, and we will quote the lining system that matches.
            </p>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      {/* Iron statement — the lining process, in the page's own numbers. */}
      <Section theme="iron" size="spacious" ariaLabel="Lining process">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="03">The lining process</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              Blast-cleaned to Sa 2.5, lined to the chemistry,{" "}
              <span className="text-accent">cured before delivery.</span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-3xl md:grid-cols-3">
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Capacity ceiling
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={200} suffix=" m³" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  From 1 m³ dosing tanks to 200 m³ storage.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Dry-film ceiling
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={600} suffix=" µm" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  400 to 600 µm two-component epoxy, dry film.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-mono-label text-[10px] text-faint">
                  Wall thickness
                </span>
                <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                  <CountUp value={12} suffix=" mm" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  4 to 12 mm carbon-steel shell, S275 or S355.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="font-mono-label hairline-t flex flex-col gap-2 pt-5 text-[10px] text-faint md:flex-row md:items-center md:justify-between">
            <span>1 to 200 m³</span>
            <span>Lining picked to the chemistry</span>
            <span>Ex-works 5 to 8 weeks, cure included</span>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="04"
          eyebrow="Applications"
          title="Where epoxy-lined steel does the job."
        />
        <Reveal stagger={0.08}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
            {APPLICATIONS.map((a) => (
              <div
                key={a.title}
                data-reveal-item
                className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 md:p-7"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{a.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Pull quote — the page's most persuasive line on lining selection. */}
      <Section size="compact" ariaLabel="Lining selection">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-4 md:col-span-5">
            <span aria-hidden className="hairline h-px w-12" />
            <p className="font-mono-label text-[10px] text-faint">
              Lining selection · epoxy-lined steel
            </p>
          </div>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            “The right epoxy for your chemistry depends on the medium and
            its concentration.”
          </TextReveal>
        </div>
      </Section>

      <CtaBand
        headline="Got a corrosive media brief?"
        headlineAccent="We will pick the right lining."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
