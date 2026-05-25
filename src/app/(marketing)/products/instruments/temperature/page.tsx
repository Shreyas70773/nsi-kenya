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
  title: "Temperature Instruments",
  description:
    "RTD and thermocouple temperature sensors with programmable transmitters for Kenyan process loops, CIP/SIP, and heat exchangers.",
  alternates: { canonical: "/products/instruments/temperature/" },
};

const SUBTYPES = [
  {
    name: "RTD (Pt100, Pt1000)",
    use: "Process temperatures from -50 to 500°C; the workhorse",
    note: "Highest accuracy in standard duty; 3-wire or 4-wire connections",
  },
  {
    name: "Thermocouple (K, J, T, N)",
    use: "Higher temperatures (up to 1200°C+), faster response",
    note: "K-type most common; T-type for cryogenic; N-type for stability",
  },
  {
    name: "Sanitary RTD",
    use: "CIP / SIP loops, F&B process temperature, dairy",
    note: "Tri-clamp connections, hygienic body design, FDA-grade materials",
  },
  {
    name: "Surface / clamp-on",
    use: "Non-invasive pipe temperature; quick spot-check",
    note: "Strap-on or magnetic; used for surveys and retrofit measurement",
  },
];

const SPECS = [
  { label: "Sensor types stocked", value: "Pt100, Pt1000, K, J, T, N thermocouples" },
  { label: "Sheath material", value: "316L SS standard; Inconel, Hastelloy for chemical duty" },
  { label: "Process connection", value: "Thread (1/2-inch NPT, G1/2), flange, sanitary tri-clamp" },
  { label: "Thermowell options", value: "Tapered, stepped, straight; barstock-machined; available in 316L, Inconel" },
  { label: "Transmitter integration", value: "Head-mount, rail-mount, or panel-mount; HART standard" },
  { label: "Accuracy class", value: "Class A standard, Class AA for premium duty" },
  { label: "Temperature range", value: "-200 to 1200°C depending on sensor type" },
] as const;

export default function TemperatureInstrumentsPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Temperature Instruments",
          category: "Process Instrument",
          description:
            "RTD and thermocouple temperature sensors with programmable transmitters for industrial process loops.",
          url: `${SITE_URL}/products/instruments/temperature/`,
        })}
      />

      <PageHero
        eyebrow="Instruments / Temperature"
        title="The boring instrument"
        titleAccent="that's wrong in three quarters of plants we audit."
        subtitle="Temperature is the most-measured process variable and the most often badly installed. Wrong thermowell length, wrong sheath material, wrong accuracy class for the duty. We supply RTD and thermocouple sensors picked to the actual duty, not the catalogue."
        imageSrc="/images/products/instruments-temperature-hero.png"
        imageAlt="An RTD temperature sensor mounted in a tank wall thermowell"
        primaryCta={{ href: "/request-quote/", label: "Spec a temp loop" }}
        secondaryCta={{ href: "/products/instruments/", label: "All instruments" }}
        metaLeft="-200 to 1200°C"
        metaRight="Sanitary · HART · Class A"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Instruments", href: "/products/instruments/" },
            { label: "Temperature", href: "/products/instruments/temperature/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What we mean by temperature</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The sensor and the thermowell, picked together.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Most temperature problems trace back to the thermowell.
                A thermowell that is too short reads the pipe wall, not
                the process. A thermowell that is too long vibrates and
                fatigue-cracks. The sensor inside it is rarely the
                problem.
              </p>
              <p>
                We size the thermowell to the line, the medium, and the
                flow velocity. The sensor is matched to the temperature
                range, accuracy requirement, and connection type. The
                transmitter is integrated where the loop needs HART or
                head-mount; rail-mount where the control panel handles
                it instead.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Sub-types</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Four families.
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
        headline="Got a temperature loop that drifts?"
        headlineAccent="We audit and re-spec."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
