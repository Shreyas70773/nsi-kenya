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
  title: "Multi-Parameter Water Analyzer Kenya: ETP & Process",
  description:
    "pH, ORP, conductivity, dissolved oxygen, turbidity, TSS, and multi-parameter analyzers for ETP compliance, process water, and boiler feedwater in Kenya.",
  alternates: { canonical: "/products/instruments/liquid-analysis/" },
  keywords: [
    "multi-parameter water analyzer Kenya",
    "pH meter industrial Kenya",
    "dissolved oxygen meter Kenya",
    "turbidity meter Kenya",
    "conductivity meter Kenya",
    "ETP water quality analyzer Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Multi-Parameter Water Analyzer Kenya: ETP & Process",
    description:
      "pH, ORP, conductivity, dissolved oxygen, turbidity, TSS, and multi-parameter analyzers for ETP compliance, process water, and boiler feedwater in Kenya.",
    url: "/products/instruments/liquid-analysis/",
    images: [{ url: "/images/products/instruments-liquid-analysis-hero.png" }],
  },
};

const SUBTYPES = [
  {
    name: "pH and ORP",
    use: "Process control, ETP compliance, neutralisation loops",
    note: "Industrial, dual-channel, HF-resistant, and digital RS485 sensor options",
  },
  {
    name: "Conductivity / TDS",
    use: "Water quality, boiler blowdown, RO permeate, CIP rinse",
    note: "Two-pole and four-pole variants; toroidal for chemical media",
  },
  {
    name: "Dissolved oxygen",
    use: "Aerobic ETP, fish farms, boiler feedwater deaeration check",
    note: "Membrane or optical; optical is preferred for fouling environments",
  },
  {
    name: "Turbidity",
    use: "Treated water clarity, ETP outlet polish, filter performance",
    note: "Low-range (drinking water) and high-range (ETP) ranges available",
  },
  {
    name: "TSS",
    use: "Suspended solids in ETP, sludge thickening, return-sludge control",
    note: "Optical absorbance principle; immune to colour and dissolved matter",
  },
  {
    name: "Multi-parameter",
    use: "Compliance reporting with one panel and one cable run",
    note: "pH, DO, conductivity, turbidity in one analyzer; ETP standard",
  },
];

const SPECS = [
  { label: "Standard signal outputs", value: "4 to 20 mA per channel, Modbus RTU, HART optional" },
  { label: "Sensor connection", value: "Plug-and-play digital sensors (Memosens-class) or analogue" },
  { label: "Compliance reporting", value: "Built-in data logging; CSV export; remote-monitoring app integration" },
  { label: "Sensor materials", value: "Glass body, plastic body, titanium reference, HF-resistant glass" },
  { label: "Process temperature", value: "Sensor-dependent; typical 0 to 80°C, up to 130°C for high-temp variants" },
  { label: "Power supply", value: "24 VDC standard, 90 to 240 VAC universal models available" },
] as const;

export default function LiquidAnalysisInstrumentsPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Liquid Analysis Instruments",
          category: "Process Instrument",
          description:
            "pH, ORP, conductivity, dissolved oxygen, turbidity, TSS, and multi-parameter analyzers for industrial process water and ETP duty.",
          url: `${SITE_URL}/products/instruments/liquid-analysis/`,
        })}
      />

      <PageHero
        eyebrow="Instruments / Liquid Analysis"
        title="Six water-quality parameters,"
        titleAccent="or all of them in one panel."
        subtitle="pH for control. Conductivity for water quality. DO for aeration. Turbidity for clarity. TSS for solids. Multi-parameter for compliance reporting. We supply individual instruments and the multi-parameter analyzers that NEMA discharge compliance often requires."
        imageSrc="/images/products/instruments-liquid-analysis-hero.png"
        imageAlt="A multi-parameter water analyzer panel mounted above a water-treatment basin"
        primaryCta={{ href: "/request-quote/", label: "Spec a water-quality loop" }}
        secondaryCta={{
          href: "/industries/etp-water-treatment/",
          label: "ETP applications",
        }}
        metaLeft="6 parameters"
        metaRight="ETP-ready · NEMA-aware"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Instruments", href: "/products/instruments/" },
            { label: "Liquid Analysis", href: "/products/instruments/liquid-analysis/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What we mean by liquid analysis</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The instruments that decide whether your discharge passes
              inspection.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Liquid analysis is the instrumentation category that
                most directly touches compliance. The NEMA discharge
                parameters table on the{" "}
                <Link href="/industries/etp-water-treatment/#nema-parameters">
                  ETP page
                </Link>{" "}
                is read off these instruments. Get the analyzer right
                and the audit is straightforward; get it wrong and the
                plant can be off the air for weeks.
              </p>
              <p>
                We supply individual sensors for plants that already
                have a SCADA front-end, and multi-parameter analyzers
                with a built-in display and data logger for plants that
                want one panel covering everything. The cloud-connected
                option streams 24/7 for plants under continuous
                compliance obligations.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Sub-types</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Six parameters.
          </h2>
        </div>
        <ol className="divide-y divide-border/10 border-y border-border/10">
          {SUBTYPES.map((s, i) => (
            <li key={s.name} className="grid grid-cols-12 gap-4 py-6 md:gap-6 md:py-7">
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display col-span-10 text-xl font-medium tracking-tight md:col-span-3 md:text-2xl">
                {s.name}
              </h3>
              <p className="col-span-12 text-sm text-muted md:col-span-5">{s.use}</p>
              <p className="font-mono-label col-span-12 text-[10px] text-faint md:col-span-3">{s.note}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The shared spec floor.
            </h2>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <CtaBand
        headline="ETP inspection on the horizon?"
        headlineAccent="We supply analyzers that pass."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
