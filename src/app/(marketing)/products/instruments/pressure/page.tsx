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
  title: "Pressure Transmitters",
  description:
    "Gauge, absolute, differential, and combined P+T pressure transmitters for Kenyan industrial process and utility loops.",
  alternates: { canonical: "/products/instruments/pressure/" },
};

const SUBTYPES = [
  {
    name: "Gauge pressure",
    use: "Most common; pressure read relative to atmospheric",
    note: "Used on pumps, process headers, hydraulic systems",
  },
  {
    name: "Absolute pressure",
    use: "Pressure read relative to vacuum; used when ambient is changing",
    note: "Distillation columns, vacuum dryers, altitude-sensitive duty",
  },
  {
    name: "Differential pressure",
    use: "Pressure drop across an orifice, filter, or pump",
    note: "Flow inference, filter-clog detection, level on sealed tanks",
  },
  {
    name: "Combined P + T",
    use: "Pressure and temperature in one tap; saves a nozzle",
    note: "Steam metering compensation, custody-transfer applications",
  },
];

const SPECS = [
  { label: "Range options", value: "Vacuum to 1000 bar depending on model" },
  { label: "Accuracy", value: "±0.075% to ±0.25% of span, model-dependent" },
  { label: "Signal output", value: "4 to 20 mA, HART standard; Profibus and Foundation Fieldbus available" },
  { label: "Process connection", value: "1/2-inch NPT, G1/2, flanged, sanitary tri-clamp" },
  { label: "Wetted parts", value: "316L SS standard; Hastelloy, tantalum, Monel for chemical duty" },
  { label: "Diaphragm seal", value: "Available for high-temperature or aggressive media duty" },
  { label: "Process temperature", value: "Up to 400°C with cooling element / capillary seal" },
  { label: "Hazardous area", value: "ATEX zones 0, 1, 2 variants" },
] as const;

export default function PressureInstrumentsPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Pressure Transmitters",
          category: "Process Instrument",
          description:
            "Gauge, absolute, differential, and combined pressure-temperature transmitters for industrial loops.",
          url: `${SITE_URL}/products/instruments/pressure/`,
        })}
      />

      <PageHero
        eyebrow="Instruments / Pressure"
        title="Four pressure modes,"
        titleAccent="picked to the duty."
        subtitle="Gauge for process headers and pumps. Absolute for vacuum and altitude-sensitive duty. Differential for filters, flow, and sealed-tank level. Combined P + T for steam metering."
        imageSrc="/images/products/instruments-pressure-hero.png"
        imageAlt="A pressure transmitter mounted on a stainless process line with gauge showing live reading"
        primaryCta={{ href: "/request-quote/", label: "Spec a pressure transmitter" }}
        secondaryCta={{ href: "/products/instruments/", label: "All instruments" }}
        metaLeft="Vacuum to 1000 bar"
        metaRight="4-20 mA · HART"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Instruments", href: "/products/instruments/" },
            { label: "Pressure", href: "/products/instruments/pressure/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What we mean by pressure</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The mode you pick depends on what the reading is for.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Pressure is the easiest process variable to measure and
                the hardest to get right at scale. The technology is
                mature; the mistakes are usually in mode selection,
                wetted-parts compatibility, or temperature compensation.
              </p>
              <p>
                We supply gauge, absolute, differential, and combined
                P + T transmitters with diaphragm seals where the
                medium needs isolation, and capillary cooling where the
                process temperature exceeds the transmitter limit.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Sub-types</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Four modes.
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
        headline="Got a pressure point to read?"
        headlineAccent="We spec it for the medium."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
