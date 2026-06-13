import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { SpecTable } from "@/components/primitives/spec-table";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { RelatedProducts } from "@/components/primitives/related-products";
import { FaqList } from "@/components/primitives/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationLd, faqLd } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { TelemetrySection } from "@/components/iot/telemetry-section";
import { CitableBrief } from "@/components/seo/citable-brief";
import { PRODUCT_GEO } from "@/lib/product-geo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tank Monitoring Kenya: NB-IoT, LoRa, 4G",
  description:
    "Cloud-ready tank, flow, and water-quality monitoring on every Kenyan install. NB-IoT, LoRaWAN, 4G LTE, Ethernet. Live dashboards from any device.",
  alternates: { canonical: "/products/iot/" },
  keywords: [
    "tank monitoring Kenya",
    "remote tank level sensor Kenya",
    "IoT industrial monitoring Nairobi",
    "cloud connected tank Kenya",
    "NB-IoT industrial monitoring Kenya",
    "remote water quality monitoring Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Tank Monitoring Kenya: NB-IoT, LoRa, 4G",
    description:
      "Cloud-ready tank, flow, and water-quality monitoring on every Kenyan install. NB-IoT, LoRaWAN, 4G LTE, Ethernet. Live dashboards from any device.",
    url: "/products/iot/",
    images: [{ url: "/images/products/iot-hero.png" }],
  },
};

const MARQUEE_TOKENS = [
  "NB-IoT",
  "LoRaWAN",
  "4G LTE",
  "Ethernet / Wi-Fi",
  "TLS 1.3 in transit",
  "AES-256 at rest",
  "Role-based, audit-logged",
  "Live dashboards from any device",
] as const;

const FLOW_STEPS = [
  {
    n: "01",
    label: "Instrument",
    copy: "Any flow, level, pressure, water-quality, or temperature instrument we install.",
  },
  {
    n: "02",
    label: "Gateway",
    copy: "An on-site gateway that polls your instruments and packages the data for upload.",
  },
  {
    n: "03",
    label: "Cloud",
    copy: "A time-series store hosted on your infrastructure or ours, your choice.",
  },
  {
    n: "04",
    label: "Your app",
    copy: "A phone or browser dashboard with live values, trends, and alarms.",
  },
];

const CONNECTIVITY = [
  {
    label: "NB-IoT",
    note: "Primary recommendation for single-tank or low-bandwidth Kenya sites. Low power, multi-year battery.",
  },
  {
    label: "LoRaWAN",
    note: "Multi-tank sites, on-prem gateway, no carrier dependency.",
  },
  {
    label: "4G / LTE cellular",
    note: "High-bandwidth multi-instrument sites with real-time streaming.",
  },
  {
    label: "Ethernet / Wi-Fi",
    note: "Plants with existing IT infrastructure, fastest setup.",
  },
];

const SUPPORTED = [
  { label: "Flow", value: "Electromagnetic, vortex, turbine, ultrasonic, Coriolis, thermal mass" },
  { label: "Level", value: "Radar, ultrasonic, hydrostatic, guided-wave" },
  { label: "Pressure", value: "Gauge, absolute, differential, combined P + T" },
  { label: "Liquid analysis", value: "pH, ORP, conductivity, DO, turbidity, TSS, multi-parameter" },
  { label: "Temperature", value: "RTD, thermocouple, programmable transmitters" },
  { label: "System products", value: "Paperless recorders, indicators, signal isolators" },
] as const;

const FAQS = [
  {
    question: "Should I use NB-IoT or LoRaWAN for tank monitoring?",
    answer:
      "NB-IoT is the default for single-tank or low-bandwidth sites in Kenya: nationwide cellular coverage, multi-year primary battery, low message overhead. LoRaWAN is the right answer for multi-tank plants where one yard gateway covers 20+ instruments at lower per-instrument operating cost. 4G LTE wins only when you need real-time streaming for SCADA.",
  },
  {
    question: "Where does the data get hosted?",
    answer:
      "Your choice. Default is a Convex-managed time-series store inside our infrastructure with TLS 1.3 in transit and AES-256 at rest. If you have your own SCADA or historian, we push the data over Modbus-over-TCP, MQTT, or REST, depending on what suits your IT setup.",
  },
  {
    question: "How long does the battery last on an NB-IoT sensor?",
    answer:
      "Three to five years on a primary lithium battery, reporting every 15 minutes. Reporting cadence is the biggest variable: every 60 minutes pushes battery life past 5 years; every 5 minutes pulls it under 2. We size the battery to the reporting interval the site actually needs.",
  },
  {
    question: "Can I see live data on a phone, or only on a laptop?",
    answer:
      "Both. The dashboard is a responsive web app that works on iOS, Android, and any browser. Operators on the floor typically use the phone view for a single tank or pump; plant managers use the multi-site overview from a laptop. Alarm notifications route to whoever you nominate.",
  },
] as const;

const DATA_HANDLING = [
  { label: "Transport", value: "TLS 1.3 in transit" },
  { label: "Storage", value: "AES-256 at rest" },
  { label: "Access", value: "Role-based, audit-logged" },
  { label: "Export", value: "CSV, JSON, Modbus-over-TCP for SCADA integration" },
  { label: "Hosting", value: "Convex managed, or pushed into your own systems" },
  { label: "Third-party sharing", value: "None" },
] as const;

const SCREEN_SLOTS = [
  {
    title: "Single-tank dashboard",
    description:
      "Phone dashboard for one tank: level, 24h trend, alarm thresholds, last refresh",
    src: "/images/iot/screen-single-tank.png",
    aspect: "aspect-[9/16] md:aspect-[4/3]",
  },
  {
    title: "Multi-site overview",
    description:
      "Browser dashboard showing Kenyan plant sites on a map with traffic-light status",
    src: "/images/iot/screen-multi-site.png",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Alarm log",
    description:
      "Tabular alarm log with timestamps, sites, severity, acknowledgement state",
    src: "/images/iot/screen-alarm-log.png",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Process trend chart",
    description:
      "Time-series chart of process flow rate with rolling 24-hour view and zoom-to-range",
    src: "/images/iot/screen-process-trend.webp",
    aspect: "aspect-[16/9]",
  },
] as const;

export default function IoTPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd()} />
      <JsonLd
        data={faqLd(
          FAQS.map((f) => ({ question: f.question, answer: f.answer })),
        )}
      />

      <PageHero
        eyebrow="Products / Remote Monitoring"
        title="Optional remote monitoring,"
        titleAccent="available on every install."
        subtitle="We don't bundle this into our tank quotes. Most of our customers don't need it on day one; many add it later as their operations scale. The capability sits behind every instrument we install, ready when you want it."
        imageSrc="/images/products/iot-hero.png"
        imageAlt="An NB-IoT gateway box mounted on a pole at a remote Kenyan tank site"
        primaryCta={{ href: "/request-quote/", label: "Book an IoT demo" }}
        secondaryCta={{
          href: "/products/instruments/",
          label: "See the instruments",
        }}
        metaLeft="LoRa · NB-IoT · LTE · Ethernet"
        metaRight="NB-IoT capable"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Remote Monitoring", href: "/products/iot/" },
          ]}
        />
      </Section>

      <CitableBrief geo={PRODUCT_GEO.iot} />

      {/* ─── NETWORK + DATA REGISTER MARQUEE ──────────────────────────── */}
      <section
        aria-label="Network and data registers"
        className="border-y border-border/10 bg-surface/60 py-5"
      >
        <Marquee duration={36}>
          {MARQUEE_TOKENS.map((t, i) => (
            <span
              key={i}
              className="font-mono-label mx-6 flex items-center gap-12 text-xs text-muted"
            >
              {t}
              <span className="h-1 w-1 rounded-full bg-faint/60" aria-hidden />
            </span>
          ))}
        </Marquee>
      </section>

      {/* ─── 01 · HOW IT WORKS ────────────────────────────────────────── */}
      <Section ariaLabel="How it works">
        <SectionHeader
          index="01"
          eyebrow="How it works"
          title="Four steps."
          titleAccent="Nothing exotic."
        />
        <Reveal
          stagger={0.09}
          className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FLOW_STEPS.map((step) => (
            <div
              key={step.n}
              data-reveal-item
              className="flex flex-col gap-4 border-t border-border/15 pt-6"
            >
              <span
                aria-hidden
                className="font-display-condensed text-6xl font-black leading-none text-accent md:text-7xl"
              >
                {step.n}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                {step.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{step.copy}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ─── 02 · IRON STATEMENT · LIVE TELEMETRY SCENE ───────────────── */}
      <TelemetrySection />

      {/* ─── 03 · WHAT YOU SEE ────────────────────────────────────────── */}
      <Section theme="paper" bordered ariaLabel="What you see">
        <SectionHeader
          index="03"
          eyebrow="What you see"
          title="Four screens, designed for plant operators,"
          titleAccent="not analysts."
        />
        <Reveal
          stagger={0.08}
          effect="scale-in"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          {SCREEN_SLOTS.map((s, i) => (
            <figure
              key={s.title}
              data-reveal-item
              className="group flex flex-col gap-4 rounded-card border border-border/10 bg-surface p-5 md:p-6"
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden rounded-button",
                  s.aspect,
                )}
              >
                <Image
                  src={s.src}
                  alt={s.description}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">
                    {s.title}
                  </h3>
                  <span
                    aria-hidden
                    className="font-mono-label text-[10px] text-faint"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Section>

      {/* ─── 04 · CONNECTIVITY ────────────────────────────────────────── */}
      <Section ariaLabel="Connectivity options">
        <SectionHeader
          index="04"
          eyebrow="Connectivity"
          title="Pick the network that fits"
          titleAccent="your site."
          side={
            <p>
              Single tank in a remote location? NB-IoT, multi-year battery.
              Multi-tank brewery with on-prem IT? LoRaWAN with a yard gateway.
              Plant with existing fibre? Ethernet. We size the radio, not the
              other way round.
            </p>
          }
        />
        <Reveal
          stagger={0.08}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4"
        >
          {CONNECTIVITY.map((p, i) => (
            <div
              key={p.label}
              data-reveal-item
              className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 transition-colors duration-300 hover:bg-surface-2/60 md:p-7"
            >
              <span className="font-mono-label text-[10px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {p.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{p.note}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ─── 05 · SUPPORTED INSTRUMENTS ───────────────────────────────── */}
      <Section theme="paper" bordered ariaLabel="Supported instruments">
        <SectionHeader
          index="05"
          eyebrow="Supported instruments"
          title="Any instrument we install can be wired"
          titleAccent="to the app."
        />
        <SpecTable rows={SUPPORTED} />
      </Section>

      {/* ─── 06 · DATA HANDLING ───────────────────────────────────────── */}
      <Section ariaLabel="Data handling">
        <SectionHeader
          index="06"
          eyebrow="Your data, your rules"
          title="No surprises in the"
          titleAccent="data handling layer."
          side={
            <p>
              You decide whether we host the time-series data or push it into
              your existing systems. Either way, no third-party sharing, audit
              log on every read, role-based access for everyone with login.
            </p>
          }
        />
        <SpecTable rows={DATA_HANDLING} />
      </Section>

      {/* ─── 07 · FAQ ─────────────────────────────────────────────────── */}
      <Section theme="paper" bordered ariaLabel="Common questions">
        <SectionHeader
          index="07"
          eyebrow="Common questions"
          title="What buyers ask about"
          titleAccent="Kenya tank monitoring."
        />
        <FaqList items={FAQS} />
      </Section>

      <RelatedProducts
        headline="Instruments and tanks that wire to the app."
        items={[
          {
            href: "/products/instruments/liquid-analysis/",
            title: "Liquid analysis instruments",
            copy: "pH, ORP, DO, conductivity, turbidity, multi-parameter analyzers. The instruments most ETP dashboards depend on.",
            imageSrc: "/images/products/instruments-liquid-analysis-hero.png",
            imageAlt: "Multi-parameter water quality analyzer at a Kenyan ETP",
          },
          {
            href: "/products/instruments/level/",
            title: "Level transmitters",
            copy: "Radar, ultrasonic, hydrostatic. The level data that drives every tank-monitoring dashboard.",
            imageSrc: "/images/products/instruments-level-hero.png",
            imageAlt: "Radar level transmitter mounted on a tank",
          },
          {
            href: "/industries/etp-water-treatment/",
            title: "ETP & water treatment",
            copy: "Where continuous compliance monitoring earns its keep. compliance-aware streaming of every discharge parameter.",
            imageSrc: "/images/industries/etp-water-treatment-hero.png",
            imageAlt: "Effluent treatment plant clarifier at a Kenyan factory",
          },
        ]}
      />

      <CtaBand
        headline="Want to see it on a real install?"
        headlineAccent="Book a 20-minute demo."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
