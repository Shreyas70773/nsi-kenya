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
  title: "System Products",
  description:
    "Paperless recorders, process indicators, totalisers, controllers, signal isolators, and signal generators for Kenyan industrial control panels.",
  alternates: { canonical: "/products/instruments/system-products/" },
};

const SUBTYPES = [
  {
    name: "Paperless recorders",
    use: "Continuous data logging for compliance, batch records, audit trails",
    note: "Touchscreen, SD card and Ethernet export, up to 36 channels",
  },
  {
    name: "Process indicators",
    use: "Single-channel local readout of a 4 to 20 mA signal",
    note: "Panel-mount; user-scaled; relay outputs for setpoint",
  },
  {
    name: "Totalisers",
    use: "Flow totalisation, batch counts, custody-transfer integration",
    note: "Pulse-input; non-resettable counter for legal-metrology duty",
  },
  {
    name: "PID / fuzzy controllers",
    use: "Local loop control where a full DCS is overkill",
    note: "Auto-tune; cascade and ratio modes; relay or SSR output",
  },
  {
    name: "Signal isolators",
    use: "Galvanic separation between field and DCS; ground-loop break",
    note: "1-channel and multi-channel rail-mount; loop-powered options",
  },
  {
    name: "Signal generators",
    use: "Calibration source for loop testing and commissioning",
    note: "Portable; outputs 4 to 20 mA, mV, RTD simulation",
  },
];

const SPECS = [
  { label: "Mounting", value: "Panel-mount (48mm to 192mm), DIN-rail, or wall-mount cabinet" },
  { label: "Communication", value: "Modbus RTU (RS485), Modbus TCP, OPC-UA on premium models" },
  { label: "Power supply", value: "24 VDC standard, 90 to 240 VAC universal on most models" },
  { label: "Display", value: "Mono LCD, colour TFT, or touchscreen, depending on model" },
  { label: "Data storage", value: "SD card and Ethernet export; cloud sync via the monitoring app" },
  { label: "Certification", value: "CE, RoHS; FDA 21 CFR Part 11 compliance for recorder models" },
] as const;

export default function SystemProductsInstrumentsPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Instrument System Products",
          category: "Process Instrument",
          description:
            "Paperless recorders, indicators, controllers, signal isolators, and signal generators for industrial control panels.",
          url: `${SITE_URL}/products/instruments/system-products/`,
        })}
      />

      <PageHero
        eyebrow="Instruments / System Products"
        title="The control-panel stack,"
        titleAccent="not just the sensors."
        subtitle="A field sensor without a recorder, controller, or isolator is half a loop. We supply the panel-side equipment too: paperless recorders, indicators, totalisers, controllers, signal isolators, and signal generators."
        imageSrc="/images/products/instruments-system-products-hero.png"
        imageAlt="A control-cabinet door open showing a paperless recorder, indicators, and signal isolators on DIN rail"
        primaryCta={{ href: "/request-quote/", label: "Spec a control panel" }}
        secondaryCta={{ href: "/products/instruments/", label: "All instruments" }}
        metaLeft="6 product families"
        metaRight="Modbus · Ethernet · OPC-UA"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Instruments", href: "/products/instruments/" },
            { label: "System Products", href: "/products/instruments/system-products/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What we mean by system products</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The cabinet, not the field.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Field instruments are only half a process loop. The
                other half lives in a control panel: a recorder logging
                the data for compliance, an indicator showing the live
                value at the local operator station, a controller
                closing the loop, an isolator breaking the ground loop
                that ruins the reading.
              </p>
              <p>
                We supply the panel side. The paperless recorders log
                to SD card and stream to the cloud-monitoring app
                simultaneously, which means compliance reporting is
                often a one-click export rather than a manual
                reconstruction.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Product families</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Six families that fill the panel.
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
        headline="Building a control panel?"
        headlineAccent="We supply the stack inside it."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
