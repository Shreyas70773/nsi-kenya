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
  title: "Epoxy-Lined Tanks",
  description:
    "Carbon steel tanks with chemical-resistant epoxy lining for ETP chemical dosing, acid storage, and corrosive media duty. Fabricated in Kenya.",
  alternates: { canonical: "/products/tanks/epoxy-lined/" },
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
    label: "Lead time, Kenya",
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
        title="Carbon steel shell,"
        titleAccent="chemical-resistant epoxy inside."
        subtitle="The default tank for ETP chemical dosing and corrosive process water, where stainless is more cost than the duty needs and carbon steel alone will not survive the medium. Fabricated in Kenya, lined to the chemistry, cured before delivery."
        imageSrc="/images/home/tanks-weld-bead.png"
        imageAlt=""
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
            <Eyebrow>What it is</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The tank that exists where stainless is overkill and carbon
              alone is wrong.
            </h2>
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

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Lining is picked to the medium.
            </h2>
            <p className="mt-4 text-sm text-muted">
              The numbers below are the default. The right epoxy for your
              chemistry is a conversation, not a catalogue. Tell us the
              medium and concentration; we will quote the lining system
              that matches.
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
            Where epoxy-lined steel does the job.
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

      <CtaBand
        headline="Got a corrosive media brief?"
        headlineAccent="We will pick the right lining."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
