import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { SpecTable } from "@/components/primitives/spec-table";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { ImagePlaceholder } from "@/components/placeholders/image-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Remote Monitoring",
  description:
    "Optional cloud-ready monitoring for every tank and instrument we install. View levels, flow, water quality, and alarms from any device. Safaricom NB-IoT, LoRaWAN, 4G, Ethernet.",
  alternates: { canonical: "/products/iot/" },
};

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
    label: "Safaricom NB-IoT",
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

const DATA_HANDLING = [
  { label: "Transport", value: "TLS 1.3 in transit" },
  { label: "Storage", value: "AES-256 at rest" },
  { label: "Access", value: "Role-based, audit-logged" },
  { label: "Export", value: "CSV, JSON, Modbus-over-TCP for SCADA integration" },
  { label: "Hosting", value: "Convex managed, or pushed into your own systems" },
  { label: "Third-party sharing", value: "None" },
] as const;

type ScreenSlot = {
  title: string;
  description: string;
} & (
  | { kind: "image"; src: string; aspect: string }
  | {
      kind: "placeholder";
      role: "card" | "diagram";
      prompt: string;
    }
);

const SCREEN_SLOTS: readonly ScreenSlot[] = [
  {
    title: "Single-tank dashboard",
    description: "Phone dashboard for one tank: level, 24h trend, alarm thresholds, last refresh",
    kind: "image",
    src: "/images/iot/screen-single-tank.png",
    aspect: "aspect-[9/16] md:aspect-[4/3]",
  },
  {
    title: "Multi-site overview",
    description: "Browser dashboard showing Kenyan plant sites on a map with traffic-light status",
    kind: "image",
    src: "/images/iot/screen-multi-site.png",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Alarm log",
    description: "Tabular alarm log with timestamps, sites, severity, acknowledgement state",
    kind: "image",
    src: "/images/iot/screen-alarm-log.png",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Process trend chart",
    description: "Time-series chart of process flow rate with rolling 24-hour view and zoom-to-range",
    kind: "image",
    src: "/images/iot/screen-process-trend.webp",
    aspect: "aspect-[16/9]",
  },
];

export default function IoTPage() {
  return (
    <>
      <JsonLd data={softwareApplicationLd()} />

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
        metaRight="Safaricom NB-IoT capable"
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

      <Section>
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Four steps. Nothing exotic.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {FLOW_STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 md:p-7"
            >
              <span className="font-mono-label text-[10px] text-accent">
                {step.n}
              </span>
              <h3 className="font-display text-xl font-medium tracking-tight">
                {step.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3 md:mb-14">
          <Eyebrow>What you see</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Four screens, designed for plant operators, not analysts.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {SCREEN_SLOTS.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-4 rounded-card border border-border/10 bg-surface p-5 md:p-6"
            >
              {s.kind === "image" ? (
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
                    className="object-cover"
                  />
                </div>
              ) : (
                <ImagePlaceholder
                  role={s.role}
                  description={s.description}
                  prompt={s.prompt}
                />
              )}
              <h3 className="font-display text-lg font-medium tracking-tight">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>Connectivity</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Pick the network that fits your site.
            </h2>
            <Prose className="mt-5" size="sm">
              <p>
                Single tank in a remote location? Safaricom NB-IoT, multi-
                year battery. Multi-tank brewery with on-prem IT? LoRaWAN
                with a yard gateway. Plant with existing fibre? Ethernet.
                We size the radio, not the other way round.
              </p>
            </Prose>
          </div>
          <div className="md:col-span-7">
            <ul className="divide-y divide-border/10 border-y border-border/10">
              {CONNECTIVITY.map((p) => (
                <li
                  key={p.label}
                  className="grid grid-cols-12 items-start gap-4 py-5"
                >
                  <span className="font-mono-label col-span-12 text-xs text-text md:col-span-4">
                    {p.label}
                  </span>
                  <span className="col-span-12 text-sm text-muted md:col-span-8">
                    {p.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Supported instruments</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Any instrument we install can be wired to the app.
            </h2>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SUPPORTED} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Your data, your rules</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              No surprises in the data handling layer.
            </h2>
            <Prose className="mt-5" size="sm">
              <p>
                You decide whether we host the time-series data or push it
                into your existing systems. Either way, no third-party
                sharing, audit log on every read, role-based access for
                everyone with login.
              </p>
            </Prose>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={DATA_HANDLING} />
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Want to see it on a real install?"
        headlineAccent="Book a 20-minute demo."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
