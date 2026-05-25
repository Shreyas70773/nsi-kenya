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
  title: "Flow Meter Supplier Kenya: Electromagnetic, Vortex",
  description:
    "Electromagnetic, vortex, turbine, ultrasonic, Coriolis, and thermal-mass flow meters for Kenyan industrial plants. 4-20mA, Modbus, HART standard.",
  alternates: { canonical: "/products/instruments/flow/" },
  keywords: [
    "flow meter supplier Kenya",
    "electromagnetic flow meter Kenya",
    "ultrasonic flow meter Nairobi",
    "vortex flow meter Kenya",
    "Coriolis flow meter Kenya",
    "thermal mass flow meter Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Flow Meter Supplier Kenya: Electromagnetic, Vortex",
    description:
      "Electromagnetic, vortex, turbine, ultrasonic, Coriolis, and thermal-mass flow meters for Kenyan industrial plants. 4-20mA, Modbus, HART standard.",
    url: "/products/instruments/flow/",
    images: [{ url: "/images/products/instruments-flow-hero.png" }],
  },
};

const SUBTYPES = [
  {
    name: "Electromagnetic",
    use: "Conductive liquids: process water, ETP discharge, dairy CIP, beverage syrup",
    note: "Most common workhorse; no moving parts, full-bore, food-grade variants available",
  },
  {
    name: "Vortex",
    use: "Steam, compressed air, gases, and clean liquids with no conductivity",
    note: "Integral T+P compensation option for mass-flow on steam",
  },
  {
    name: "Turbine",
    use: "Clean low-viscosity liquids, custody-transfer fuel metering",
    note: "Pulse output; high accuracy on stable flow profiles",
  },
  {
    name: "Ultrasonic",
    use: "Non-invasive metering on existing pipework, water utilities, irrigation",
    note: "Clamp-on or wall-mount; portable variants for spot-checks",
  },
  {
    name: "Coriolis mass",
    use: "True mass flow regardless of fluid density; chemical batching, fuel transfer",
    note: "Highest accuracy class; higher cost; tightest installation tolerances",
  },
  {
    name: "Thermal mass",
    use: "Gas mass flow; compressed-air audits, biogas metering, process gas",
    note: "Direct mass-flow reading without P+T compensation",
  },
];

const SPECS = [
  { label: "Standard signal outputs", value: "4 to 20 mA, pulse / frequency, Modbus RTU (RS485)" },
  { label: "Smart protocols", value: "HART on most electromagnetic and vortex models" },
  { label: "Process connection", value: "Wafer (DN15 to DN1000), flanged ANSI / DIN, sanitary tri-clamp" },
  { label: "Liner materials (mag)", value: "PTFE for chemical, hard rubber for water, food-grade rubber for F&B" },
  { label: "Electrode materials (mag)", value: "316L, Hastelloy C, tantalum (acid duty)" },
  { label: "Temperature range", value: "Liquid duty to 150°C; steam vortex to 350°C" },
  { label: "Pressure rating", value: "PN16 to PN100 depending on connection class" },
  { label: "Hazardous-area certified", value: "ATEX zones 1 and 2 available on most types" },
] as const;

export default function FlowInstrumentsPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Flow Meters",
          category: "Process Instrument",
          description:
            "Electromagnetic, vortex, turbine, ultrasonic, Coriolis, and thermal-mass flow meters for Kenyan industrial plants.",
          url: `${SITE_URL}/products/instruments/flow/`,
        })}
      />

      <PageHero
        eyebrow="Instruments / Flow"
        title="Six flow technologies,"
        titleAccent="one for every duty."
        subtitle="Pick by the medium, not the catalogue. Electromagnetic for conductive process water and food-grade duty, vortex for steam and gases, ultrasonic for non-invasive retrofit, Coriolis for mass-flow accuracy, thermal mass for gas audits, turbine for custody transfer."
        imageSrc="/images/products/instruments-flow-hero.png"
        imageAlt="Macro shot of an electromagnetic flow meter on a process pipe with live flow rate displayed"
        primaryCta={{ href: "/request-quote/", label: "Spec a flow meter" }}
        secondaryCta={{ href: "/products/instruments/", label: "All instruments" }}
        metaLeft="6 technologies"
        metaRight="4-20 mA · Modbus · HART"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Instruments", href: "/products/instruments/" },
            { label: "Flow", href: "/products/instruments/flow/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What we mean by flow</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Pick by the medium first, the technology second.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Picking a flow meter is mostly about picking the right
                technology for the medium and the duty. The standard
                answer is electromagnetic because most industrial
                duties involve conductive liquids and the technology is
                accurate, has no moving parts, and is forgiving on
                installation.
              </p>
              <p>
                The exceptions matter though. Steam needs vortex.
                Compressed-gas auditing wants thermal mass. Custody-
                transfer pulse counts come from turbine. Mass-flow
                accuracy regardless of density comes from Coriolis.
                Non-invasive retrofit comes from ultrasonic. We size
                the meter to the duty, not the other way round.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Sub-types</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Six technologies, when to use each.
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
            <p className="mt-4 text-sm text-muted">
              The technology-specific spec is on the data sheet we send
              with the quote. The numbers below are common across
              everything we supply.
            </p>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Sizing a flow loop?"
        headlineAccent="We pick the technology with you."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
