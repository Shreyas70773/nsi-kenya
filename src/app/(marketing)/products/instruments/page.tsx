import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { CitableBrief } from "@/components/seo/citable-brief";
import { ProductFaqSection } from "@/components/seo/product-faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { PRODUCT_GEO } from "@/lib/product-geo";
import { breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Process Instruments Kenya: Flow, Level, pH, More",
  description:
    "Flow, level, pressure, liquid-analysis, temperature, and system instruments for Kenyan plants. 4-20mA, Modbus, HART. Six categories, one supplier.",
  alternates: { canonical: "/products/instruments/" },
  keywords: [
    "process instruments Kenya",
    "industrial instrument supplier Kenya",
    "flow meter Kenya",
    "level transmitter Kenya",
    "pressure transmitter Kenya",
    "pH meter industrial Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Process Instruments Kenya: Flow, Level, pH, More",
    description:
      "Flow, level, pressure, liquid-analysis, temperature, and system instruments for Kenyan plants. 4-20mA, Modbus, HART. Six categories, one supplier.",
    url: "/products/instruments/",
    images: [{ url: "/images/products/instruments-overview-hero.png" }],
  },
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
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: "https://northstarimpex.co.ke/" },
          { name: "Products", url: "https://northstarimpex.co.ke/products/" },
          {
            name: "Process Instruments",
            url: "https://northstarimpex.co.ke/products/instruments/",
          },
        ])}
      />

      <PageHero
        eyebrow="Products / Instruments"
        title="Six categories,"
        titleAccent="one supplier, full stack."
        subtitle="Few suppliers in the region carry this much instrument depth. We size, supply, and install across flow, level, pressure, liquid analysis, temperature, and system products, and every instrument can be connected to a remote-monitoring app personalized to your site."
        imageSrc="/images/products/instruments-overview-hero.png"
        imageAlt="Instrument panel inside a plant control room with process indicators and a paperless recorder"
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

      <CitableBrief geo={PRODUCT_GEO.instruments} />

      <Section>
        <SectionHeader
          index="01"
          eyebrow="Pick by what you measure"
          title="Six instrument categories. Each one is its own page."
        />

        <Reveal stagger={0.07} yFrom={18}>
          <ol className="divide-y divide-border/10 border-y border-border/10">
            {CATEGORIES.map((c, i) => (
              <li key={c.href} data-reveal-item>
                <Link
                  href={c.href}
                  data-cursor="view"
                  className="group grid grid-cols-12 items-center gap-4 py-7 transition-colors hover:bg-surface/40 md:gap-6 md:py-9"
                >
                  <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display col-span-10 text-2xl font-semibold tracking-tight md:col-span-3 md:text-3xl">
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
        </Reveal>
      </Section>

      <Section theme="paper" bordered>
        <SectionHeader
          index="02"
          eyebrow="Out of the box"
          title="Protocols that plug into your SCADA on day one."
        />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Prose size="sm">
              <p>
                Every instrument we supply ships with the protocol your plant
                already speaks. If your control system needs something
                bespoke, we'll specify a signal isolator or protocol
                converter, not a different instrument.
              </p>
            </Prose>
          </div>
          <div className="md:col-span-7">
            <Reveal stagger={0.06} yFrom={14}>
              <ul className="divide-y divide-border/10 border-y border-border/10">
                {PROTOCOLS.map((p) => (
                  <li
                    key={p.label}
                    data-reveal-item
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
            </Reveal>
          </div>
        </div>
      </Section>

      <ProductFaqSection geo={PRODUCT_GEO.instruments} index="03" />

      <CtaBand
        headline="Specifying an instrument loop?"
        headlineAccent="We'll size it with you."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
