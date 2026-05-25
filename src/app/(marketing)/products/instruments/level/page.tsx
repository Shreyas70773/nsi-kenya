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
  title: "Level Transmitters",
  description:
    "Radar, ultrasonic, hydrostatic, and guided-wave level transmitters for tanks and silos in Kenyan industrial plants.",
  alternates: { canonical: "/products/instruments/level/" },
};

const SUBTYPES = [
  {
    name: "Radar, 26 GHz",
    use: "General-purpose tank level; clear liquids; long-range",
    note: "Most common. Forgiving of foam, vapour, and temperature swings",
  },
  {
    name: "Radar, 60 / 80 GHz",
    use: "Narrow nozzles, small vessels, agitated liquids",
    note: "Tighter beam angle, sharper near-field; premium price",
  },
  {
    name: "Ultrasonic",
    use: "Open channels, sumps, simple water tanks; non-contact",
    note: "Affordable; affected by foam and temperature gradients",
  },
  {
    name: "Hydrostatic submersible",
    use: "Open wells, sumps, slurry pits; bottom-of-tank submersion",
    note: "PTFE or PVDF body for chemical duty; high-temp variants available",
  },
  {
    name: "Guided-wave radar",
    use: "Interface measurement, foamy or steamy media, narrow vessels",
    note: "Probe extends into the medium; immune to vapour interference",
  },
  {
    name: "Differential pressure",
    use: "Pressurised vessels, boilers; level inferred from DP cell",
    note: "Use when radar/ultrasonic cannot reach (sealed pressure vessels)",
  },
];

const SPECS = [
  { label: "Standard signal outputs", value: "4 to 20 mA with HART, Modbus RTU (RS485)" },
  { label: "Measurement range", value: "0.1 to 100 m depending on technology" },
  { label: "Accuracy", value: "±3 mm (radar), ±2 mm (guided-wave), ±0.25% FS (hydrostatic)" },
  { label: "Process connection", value: "Flanged ANSI / DIN, thread, or sanitary tri-clamp" },
  { label: "Materials", value: "316L, PTFE, PVDF, Hastelloy C for chemical duty" },
  { label: "Temperature range", value: "Process duty to 250°C, antenna to 80°C ambient" },
  { label: "Hazardous area", value: "ATEX zones 0, 1, 2 variants available on most types" },
] as const;

export default function LevelInstrumentsPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Level Transmitters",
          category: "Process Instrument",
          description:
            "Radar, ultrasonic, hydrostatic, and guided-wave level transmitters for industrial tanks and silos.",
          url: `${SITE_URL}/products/instruments/level/`,
        })}
      />

      <PageHero
        eyebrow="Instruments / Level"
        title="Six level technologies,"
        titleAccent="from open sumps to pressurised vessels."
        subtitle="Pick by what you're measuring and the medium it sits in. Radar is the default for tanks. Ultrasonic for sumps. Hydrostatic for slurry. Guided-wave for foam, interface, or narrow vessels."
        imageSrc="/images/products/instruments-level-hero.png"
        imageAlt="A radar level transmitter mounted on the top of a stainless tank"
        primaryCta={{ href: "/request-quote/", label: "Spec a level transmitter" }}
        secondaryCta={{ href: "/products/instruments/", label: "All instruments" }}
        metaLeft="6 technologies"
        metaRight="4-20 mA · HART · Modbus"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Instruments", href: "/products/instruments/" },
            { label: "Level", href: "/products/instruments/level/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What we mean by level</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The right technology depends on the vessel as much as the
              medium.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                A tank-level reading sounds like one problem. In
                practice it is at least four: clear-liquid in a large
                open-top tank, foamy liquid in a process vessel, slurry
                in an open sump, and pressurised condensate in a
                boiler. Each one wants a different sensor.
              </p>
              <p>
                We size against the geometry as well as the medium.
                Vessel diameter, nozzle dimensions, agitator presence,
                vapour conditions, and required accuracy all narrow the
                technology choice. The recommendation comes with the
                quote.
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
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Got a vessel that needs reading?"
        headlineAccent="We size the sensor to it."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
