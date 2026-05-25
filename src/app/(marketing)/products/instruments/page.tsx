import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";

export const metadata: Metadata = {
  title: "Process Instruments",
  description:
    "Flow, level, pressure, liquid analysis, temperature, and system instruments for Kenyan industrial plants. Full category depth, 4 to 20 mA, Modbus, HART out of the box.",
  alternates: { canonical: "/products/instruments/" },
};

const CATEGORIES = [
  {
    href: "/products/instruments/flow/",
    name: "Flow",
    sub: "Electromagnetic · Vortex · Turbine · Ultrasonic · Coriolis · Thermal mass",
    use: "Process flow measurement, ETP discharge metering, custody transfer",
  },
  {
    href: "/products/instruments/level/",
    name: "Level",
    sub: "Radar (26 / 60 / 80 GHz) · Ultrasonic · Hydrostatic · Guided-wave",
    use: "Tank level, silo inventory, sump control",
  },
  {
    href: "/products/instruments/pressure/",
    name: "Pressure",
    sub: "Gauge · Absolute · Differential · Combined P + T",
    use: "Process pressure, pump discharge, custody transfer",
  },
  {
    href: "/products/instruments/liquid-analysis/",
    name: "Liquid Analysis",
    sub: "pH · ORP · Conductivity · DO · Turbidity · TSS · Multi-parameter",
    use: "ETP compliance, process water, boiler feedwater",
  },
  {
    href: "/products/instruments/temperature/",
    name: "Temperature",
    sub: "RTD · Thermocouple · Programmable transmitters",
    use: "Process temperature, CIP / SIP loops, heat exchangers",
  },
  {
    href: "/products/instruments/system-products/",
    name: "System Products",
    sub: "Paperless recorders · Process indicators · Signal isolators · Controllers",
    use: "Data logging, loop integration, control panels",
  },
];

const PROTOCOLS = [
  { label: "4 to 20 mA", note: "Industry standard analogue loop" },
  { label: "Modbus RTU / RS485", note: "Daisy-chained digital, common on SCADA" },
  { label: "HART", note: "Smart instruments, configuration on the loop" },
  { label: "Pulse / frequency", note: "Flow totalisers, paddle-wheels" },
];

export default function InstrumentsGatewayPage() {
  return (
    <>
      <PageHero
        eyebrow="Products / Instruments"
        title="Six categories,"
        titleAccent="one supplier, full stack."
        subtitle="No competitor in Kenya carries this much instrument depth. We size, supply, install, and (if you want) connect to the cloud, across flow, level, pressure, liquid analysis, temperature, and system products."
        imageSrc="/images/home/instruments-flow-meter.png"
        imageAlt="Electromagnetic flow meter mounted on stainless steel pipework"
        primaryCta={{ href: "/request-quote/", label: "Request a spec sheet" }}
        secondaryCta={{ href: "/products/iot/", label: "See cloud-ready options" }}
        metaLeft="Six categories"
        metaRight="4 to 20 mA · Modbus · HART"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Instruments", href: "/products/instruments/" },
          ]}
        />
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <Eyebrow>Pick by what you measure</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Six instrument categories. Each one is its own page.
          </h2>
        </div>

        <ol className="divide-y divide-border/10 border-y border-border/10">
          {CATEGORIES.map((c, i) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group grid grid-cols-12 items-center gap-4 py-7 transition-colors hover:bg-surface/40 md:gap-6 md:py-9"
              >
                <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display col-span-10 text-2xl font-medium tracking-tight md:col-span-3 md:text-3xl">
                  {c.name}
                </h3>
                <p className="font-mono-label col-span-12 text-[10px] text-faint md:col-span-4">
                  {c.sub}
                </p>
                <p className="col-span-12 text-sm text-muted md:col-span-3">
                  {c.use}
                </p>
                <span className="col-span-12 flex items-center justify-end text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:col-span-1">
                  <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>Out of the box</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Protocols that plug into your SCADA on day one.
            </h2>
            <Prose className="mt-5" size="sm">
              <p>
                Every instrument we supply ships with the protocol your plant
                already speaks. If your control system needs something
                bespoke, we'll specify a signal isolator or protocol
                converter, not a different instrument.
              </p>
            </Prose>
          </div>
          <div className="md:col-span-7">
            <ul className="divide-y divide-border/10 border-y border-border/10">
              {PROTOCOLS.map((p) => (
                <li
                  key={p.label}
                  className="grid grid-cols-12 items-center gap-4 py-5"
                >
                  <span className="font-mono-label col-span-4 text-xs text-text">
                    {p.label}
                  </span>
                  <span className="col-span-8 text-sm text-muted">
                    {p.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Specifying an instrument loop?"
        headlineAccent="We'll size it with you."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
