import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, type CtaCardData } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceLd, faqLd } from "@/lib/seo";
import { FaqList } from "@/components/primitives/faq-list";

export const metadata: Metadata = {
  title: "Compliant ETP Equipment Kenya: Tanks & Analyzers",
  description:
    "Compliant effluent treatment plant equipment for Kenya. Stainless, epoxy-lined tanks, multi-parameter water analyzers, flow meters. Built for Kenyan discharge regulations.",
  alternates: { canonical: "/industries/etp-water-treatment/" },
  keywords: [
    "effluent treatment plant Kenya",
    "effluent treatment plant cost Kenya",
    "what is an effluent treatment plant",
    "compliant ETP Kenya",
    "effluent treatment plant tanks Kenya",
    "wastewater treatment equipment Nairobi",
    "Kenya discharge regulations equipment",
    "ETP supplier Kenya",
    "multi-parameter water analyzer Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Compliant ETP Equipment Kenya: Tanks & Analyzers",
    description:
      "Compliant effluent treatment plant equipment for Kenya. Stainless, epoxy-lined tanks, multi-parameter water analyzers, flow meters. Built for Kenyan discharge regulations.",
    url: "/industries/etp-water-treatment/",
    images: [{ url: "/images/industries/etp-water-treatment-hero.png" }],
  },
};

/**
 * Kenya environmental discharge standards for industrial effluent per the
 * national water-quality regulations. These are the maximum permissible
 * levels for discharge into the environment or public sewers.
 *
 * Published here for reference during audits and inspections.
 */
const DISCHARGE_PARAMETERS = [
  {
    parameter: "Biochemical Oxygen Demand (BOD₅)",
    discharge: "30",
    sewer: "500",
    unit: "mg/L",
    notes: "5-day, 20°C",
  },
  {
    parameter: "Chemical Oxygen Demand (COD)",
    discharge: "50",
    sewer: "1000",
    unit: "mg/L",
    notes: "",
  },
  {
    parameter: "Total Suspended Solids (TSS)",
    discharge: "30",
    sewer: "250",
    unit: "mg/L",
    notes: "",
  },
  {
    parameter: "pH",
    discharge: "6.5 to 8.5",
    sewer: "6.0 to 9.0",
    unit: "",
    notes: "",
  },
  {
    parameter: "Total Nitrogen (TN)",
    discharge: "10",
    sewer: "20",
    unit: "mg/L",
    notes: "",
  },
  {
    parameter: "Total Phosphorus (TP)",
    discharge: "2",
    sewer: "10",
    unit: "mg/L",
    notes: "",
  },
  {
    parameter: "Ammonia Nitrogen (NH₃-N)",
    discharge: "10",
    sewer: "20",
    unit: "mg/L",
    notes: "",
  },
  {
    parameter: "Oil and grease",
    discharge: "Nil",
    sewer: "10",
    unit: "mg/L",
    notes: "",
  },
  {
    parameter: "Conductivity",
    discharge: "1500",
    sewer: "3000",
    unit: "µS/cm",
    notes: "",
  },
  {
    parameter: "Temperature",
    discharge: "≤ ambient + 3",
    sewer: "≤ 40",
    unit: "°C",
    notes: "Above receiving water",
  },
];

const EQUIPMENT_TRAIN = [
  {
    title: "Equalization & primary",
    copy: "Bolted Zinc Aluminium equalization tank, epoxy-lined primary clarifier feeds.",
    products: ["tanks/zinc-alum", "tanks/epoxy-lined"],
  },
  {
    title: "Aeration & biological",
    copy: "Stainless aeration headers, dissolved oxygen instrumentation, sludge return loops.",
    products: ["instruments/liquid-analysis"],
  },
  {
    title: "Secondary clarification",
    copy: "Epoxy-lined secondary clarifier, level transmitters for sludge blanket monitoring.",
    products: ["tanks/epoxy-lined", "instruments/level"],
  },
  {
    title: "Tertiary & polishing",
    copy: "Stainless polishing tanks, multi-parameter analyzer for compliance reporting.",
    products: ["tanks/stainless-steel", "instruments/liquid-analysis"],
  },
  {
    title: "Discharge & monitoring",
    copy: "Electromagnetic flow meter on the discharge line, continuous logging for compliance reporting.",
    products: ["instruments/flow"],
  },
];

const FAQS = [
  {
    question: "What are the discharge limits I have to meet?",
    answer:
      "The regulator enforces two separate limit sets under the applicable water quality regulations: a stricter set for direct environmental discharge (e.g. BOD 30 mg/L, COD 50 mg/L, TSS 30 mg/L, pH 6.5 to 8.5) and a looser set for discharge into a public sewer (BOD 500, COD 1000, TSS 250). The full table with all 10 parameters is published above on this page.",
  },
  {
    question: "How long does an ETP retrofit usually take?",
    answer:
      "From audit to commissioning: 4 to 6 weeks for an equipment-only retrofit (replacing analyzers, adding a polishing tank), 8 to 14 weeks for a stage replacement (new clarifier, new aeration loop). Expedited builds for regulator inspection pressure can compress to 2 to 3 weeks on standard equipment.",
  },
  {
    question: "What does an ETP equipment retrofit cost, roughly?",
    answer:
      "An equipment swap for a small to mid plant typically lands between KES 1.5M and KES 8M, depending on which stages need attention. A full ETP retrofit for a mid-size factory runs from KES 12M upward. We quote against your current baseline measurements; without measurements, we audit first.",
  },
  {
    question: "Do you handle continuous compliance monitoring?",
    answer:
      "Yes. Every multi-parameter analyzer we install can stream pH, conductivity, DO, turbidity, flow, and temperature 24/7 to a dashboard you can hand to a regulator inspector. Connectivity is NB-IoT, LoRaWAN, or 4G LTE depending on site coverage.",
  },
] as const;

const URGENT_CTA: readonly CtaCardData[] = [
  {
    href: "/request-quote/",
    kicker: "01 / Compliance deadline",
    title: "Urgent ETP quote",
    copy: "Tell us your inspection date and what the regulator flagged. Expedited delivery available, 2 to 3 weeks for standard equipment.",
    accent: true,
  },
  {
    href: "/request-site-audit/",
    kicker: "02 / Pre-inspection assessment",
    title: "Book an ETP audit",
    copy: "We walk your plant, check current discharge against discharge limits, write a remediation brief. No commitment.",
  },
  {
    href: "/book-consultation/",
    kicker: "03 / Designing from scratch",
    title: "Book an ETP consultation",
    copy: "A working call with our engineering team to scope the equipment train against your effluent profile.",
  },
];

export default function ETPPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          slug: "etp-water-treatment",
          name: "ETP & Water Treatment Equipment",
        })}
      />
      <JsonLd
        data={faqLd(
          FAQS.map((f) => ({ question: f.question, answer: f.answer })),
        )}
      />

      <PageHero
        eyebrow="Industries / ETP & Water Treatment"
        title="Discharge standards apply to every effluent treatment plant."
        titleAccent="We supply equipment built to meet them."
        subtitle="A failed inspection can halt production, and donor-funded projects often gate funding on compliance. We supply the tanks, instruments, and analyzers needed to meet discharge standards under national water quality regulations. The full parameters table is set out on this page."
        imageSrc="/images/industries/etp-water-treatment-hero.png"
        imageAlt="A wide angle of an outdoor ETP at a factory with clarifier, aeration basin and dosing tanks"
        primaryCta={{ href: "/request-quote/", label: "Urgent ETP quote" }}
        secondaryCta={{ href: "#discharge-parameters", label: "See discharge limits" }}
        metaLeft="Regulatory-compliant equipment"
        metaRight="2 to 3 week expedited delivery"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries/" },
            {
              label: "ETP & Water Treatment",
              href: "/industries/etp-water-treatment/",
            },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHeader
              index="01"
              eyebrow="The buying frame"
              title="For ETP buyers, compliance is the main requirement."
              className="mb-0 md:mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <Reveal className="md:col-span-7">
            <div data-reveal-item>
              <Prose>
                <p>
                  The other industries buy infrastructure because they're
                  growing. ETP buyers buy infrastructure because they have to.
                  The trigger is almost always external: a regulator inspection
                  that flagged a parameter, a discharge deadline, a donor
                  project that gates on compliance, or a new effluent standard
                  from a sector-specific regulation.
                </p>
                <p>
                  Speed matters here more than in other equipment categories,
                  and so does one question: <em>will this equipment pass the
                  next inspection?</em> Everything on this page is designed to
                  help you answer that with confidence.
                </p>
              </Prose>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section bordered theme="paper">
        <div
          id="discharge-parameters"
          className="flex flex-col gap-6 scroll-mt-24 md:gap-10"
        >
          <SectionHeader
            index="02"
            eyebrow="Discharge parameters"
            title="Maximum permissible discharge levels."
            className="mb-0 md:mb-0"
            headlineClassName="text-3xl leading-tight md:text-4xl"
            side={
              <p>
                Designed for the operator preparing for a regulator inspection.
                First column: parameter. Second: limit for direct
                environmental discharge. Third: limit for discharge into a
                public sewer. The two limit sets are different; the right one
                depends on your discharge route.
              </p>
            }
          />

          <Reveal yFrom={16}>
            <div
              data-reveal-item
              className="overflow-x-auto rounded-card border border-border/10 bg-surface"
            >
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/10 bg-surface-2/60">
                  <th className="font-mono-label px-5 py-4 text-[10px] text-faint">
                    Parameter
                  </th>
                  <th className="font-mono-label px-5 py-4 text-right text-[10px] text-faint">
                    Environment
                  </th>
                  <th className="font-mono-label px-5 py-4 text-right text-[10px] text-faint">
                    Public sewer
                  </th>
                  <th className="font-mono-label px-5 py-4 text-[10px] text-faint">
                    Unit / notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {DISCHARGE_PARAMETERS.map((p) => (
                  <tr
                    key={p.parameter}
                    className="border-b border-border/8 last:border-b-0"
                  >
                    <td className="px-5 py-4 text-text">{p.parameter}</td>
                    <td className="font-mono-label px-5 py-4 text-right text-xs text-text">
                      {p.discharge}
                    </td>
                    <td className="font-mono-label px-5 py-4 text-right text-xs text-text">
                      {p.sewer}
                    </td>
                    <td className="px-5 py-4 text-xs text-muted">
                      {p.unit}
                      {p.notes ? `, ${p.notes.toLowerCase()}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </Reveal>

          <p className="text-xs text-faint">
            Source: applicable environmental discharge regulations. Limits
            shown are representative; consult the relevant regulator
            directly for your sector-specific requirements before
            construction or commissioning.
          </p>
        </div>
      </Section>

      {/* Full-bleed media band — the outdoor ETP at a wider crop, breaking
          the container rhythm between the limits table and the train. */}
      <div className="relative h-[50vh] overflow-hidden md:h-[65vh]">
        <ParallaxImage className="absolute inset-0" amount={14}>
          <Image
            src="/images/industries/etp-water-treatment-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_65%]"
          />
        </ParallaxImage>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgb(8 6 4 / 0.72) 0%, rgb(8 6 4 / 0.25) 32%, rgb(8 6 4 / 0) 58%)",
          }}
        />
        <div className="font-mono-label absolute inset-x-0 bottom-0 z-[2] flex flex-col gap-2 px-6 pb-6 text-[10px] text-white/75 md:flex-row md:items-end md:justify-between md:px-10 md:pb-8">
          <span>Clarifier · aeration basin · dosing tanks</span>
          <span>Expedited delivery: 2 to 3 weeks on standard equipment</span>
        </div>
      </div>

      <Section>
        <SectionHeader
          index="03"
          eyebrow="The equipment train"
          title="What sits between your effluent and the discharge point."
          side={
            <p>
              We supply equipment inside the ETP scope. For full-plant
              design, we work alongside ETP designers; for retrofits and
              equipment swaps, we work directly with the plant.
            </p>
          }
        />
        <Reveal stagger={0.08} yFrom={16}>
          <ol className="divide-y divide-border/10 border-y border-border/10">
            {EQUIPMENT_TRAIN.map((stage, i) => (
              <li
                key={stage.title}
                data-reveal-item
                className="grid grid-cols-12 gap-4 py-7 md:gap-6 md:py-9"
              >
                <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display col-span-10 text-xl font-semibold tracking-tight md:col-span-3 md:text-2xl">
                  {stage.title}
                </h3>
                <p className="col-span-12 text-sm text-muted md:col-span-5">
                  {stage.copy}
                </p>
                <div className="col-span-12 flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                  {stage.products.map((slug) => (
                    <Link
                      key={slug}
                      href={`/products/${slug}/`}
                      className="press inline-flex items-center gap-1 rounded-pill border border-border/15 px-2.5 py-1 text-[10px] text-text transition-colors hover:bg-surface"
                    >
                      {slug.split("/").pop()?.replace(/-/g, " ")}
                      <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Iron statement — the page's compliance stance, elevated. */}
      <Section theme="iron" size="spacious" ariaLabel="The compliance stance">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="04">The compliance stance</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              Discharge standards apply to every effluent treatment plant.{" "}
              <span className="text-accent">
                We supply equipment built to meet them.
              </span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-3xl md:grid-cols-3">
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Parameters published
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={10} />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  The full discharge limits table is set out on this page
                  for reference.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Expedited ceiling
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={3} suffix=" wk" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  2 to 3 weeks on standard equipment under regulator
                  inspection pressure.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Continuous monitoring
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={24} suffix="/7" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Every analyzer we install can stream parameter data to a
                  dashboard, around the clock.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section bordered theme="paper">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <SectionHeader
              index="05"
              eyebrow="Continuous compliance monitoring"
              title="For plants under continuous monitoring obligations, every analyzer we install can stream parameter data 24/7."
              className="mb-0 md:mb-0"
              headlineClassName="text-2xl leading-tight md:text-3xl"
            />
            <p className="mt-4 max-w-prose text-sm text-muted">
              Live pH, conductivity, DO, turbidity, and flow rate, with
              alarm logs you can hand to the regulator on demand. Hosted
              by us, or pushed into your existing systems. NB-
              IoT for low-bandwidth sites.
            </p>
            <Link
              href="/products/iot/"
              className="press mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              See how remote monitoring works →
            </Link>
          </div>
          <Reveal effect="scale-in" className="md:col-span-5">
            <div
              data-reveal-item
              className="rounded-card border border-border/15 bg-surface p-7"
            >
              <p className="font-mono-label text-[10px] text-faint">
                Streamable parameters
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-text">
                <li>· pH, ORP</li>
                <li>· Dissolved oxygen</li>
                <li>· Conductivity</li>
                <li>· Turbidity, TSS</li>
                <li>· Ammonia, residual chlorine</li>
                <li>· Flow rate and totaliser</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="06"
          eyebrow="Common questions"
          title="What plant managers ask before a regulator inspection."
        />
        <FaqList items={FAQS} />
      </Section>

      {/* Pull quote — the page's most persuasive line, set asymmetrically. */}
      <Section size="compact" ariaLabel="In one line">
        <div className="hairline-t grid grid-cols-1 gap-6 pt-8 md:grid-cols-12 md:gap-10 md:pt-12">
          <p className="font-mono-label text-[10px] text-faint md:col-span-5">
            The buying frame · ETP &amp; Water Treatment
          </p>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            &ldquo;Will this equipment pass the next inspection? Everything on
            this page is designed to help you answer that with
            confidence.&rdquo;
          </TextReveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="ETP-specific paths"
        headline="Preparing for an inspection?"
        headlineAccent="Choose the option that fits your situation."
        cards={URGENT_CTA}
      />
    </>
  );
}
