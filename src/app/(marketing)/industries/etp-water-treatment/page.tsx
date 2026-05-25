import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, type CtaCardData } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceLd, faqLd } from "@/lib/seo";
import { FaqList } from "@/components/primitives/faq-list";

export const metadata: Metadata = {
  title: "NEMA-Compliant ETP Equipment Kenya: Tanks & Analyzers",
  description:
    "NEMA-compliant effluent treatment plant equipment for Kenya. Stainless, epoxy-lined tanks, multi-parameter water analyzers, flow meters. EMCA CAP 387 ready.",
  alternates: { canonical: "/industries/etp-water-treatment/" },
  keywords: [
    "NEMA compliant ETP Kenya",
    "effluent treatment plant tanks Kenya",
    "wastewater treatment equipment Nairobi",
    "EMCA CAP 387 equipment",
    "ETP supplier Kenya",
    "multi-parameter water analyzer Kenya",
  ],
  openGraph: {
    type: "website",
    title: "NEMA-Compliant ETP Equipment Kenya: Tanks & Analyzers",
    description:
      "NEMA-compliant effluent treatment plant equipment for Kenya. Stainless, epoxy-lined tanks, multi-parameter water analyzers, flow meters. EMCA CAP 387 ready.",
    url: "/industries/etp-water-treatment/",
    images: [{ url: "/images/industries/etp-water-treatment-hero.png" }],
  },
};

/**
 * NEMA discharge standards for industrial effluent in Kenya per
 * EMCA CAP 387 / NEMA Water Quality Regulations. These are the maximum
 * permissible levels for discharge into the environment or public sewers.
 *
 * Published here because no other Kenya tank/equipment supplier site
 * does (per spec section 5 SERP analysis). This is the page's load-
 * bearing SEO moat: own the NEMA-compliance query lane by being the
 * supplier site that gives the answer.
 *
 * Source: NEMA-Kenya Environmental Management and Coordination Act,
 * Water Quality Regulations (2006, as amended).
 */
const NEMA_PARAMETERS = [
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
    copy: "Bolted zinc-alum equalization tank, epoxy-lined primary clarifier feeds.",
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
    copy: "Electromagnetic flow meter on the discharge line, continuous logging for NEMA reporting.",
    products: ["instruments/flow"],
  },
];

const FAQS = [
  {
    question: "What are the NEMA discharge limits I have to meet in Kenya?",
    answer:
      "NEMA enforces two separate limit sets under EMCA CAP 387: a stricter set for direct environmental discharge (e.g. BOD 30 mg/L, COD 50 mg/L, TSS 30 mg/L, pH 6.5 to 8.5) and a looser set for discharge into a public sewer (BOD 500, COD 1000, TSS 250). The full table with all 10 parameters is published above on this page.",
  },
  {
    question: "How long does an ETP retrofit usually take in Kenya?",
    answer:
      "From audit to commissioning: 4 to 6 weeks for an equipment-only retrofit (replacing analyzers, adding a polishing tank), 8 to 14 weeks for a stage replacement (new clarifier, new aeration loop). Expedited builds for NEMA inspection pressure can compress to 2 to 3 weeks on standard equipment.",
  },
  {
    question: "What does an ETP equipment retrofit cost, roughly?",
    answer:
      "An equipment swap for a small to mid plant typically lands between KES 1.5M and KES 8M, depending on which stages need attention. A full ETP retrofit for a mid-size factory runs from KES 12M upward. We quote against your current baseline measurements; without measurements, we audit first.",
  },
  {
    question: "Do you handle continuous compliance monitoring?",
    answer:
      "Yes, optionally. Every multi-parameter analyzer we install can stream pH, conductivity, DO, turbidity, flow, and temperature 24/7 to a dashboard you can hand to a NEMA inspector. Connectivity is Safaricom NB-IoT, LoRaWAN, or 4G LTE depending on site coverage.",
  },
] as const;

const URGENT_CTA: readonly CtaCardData[] = [
  {
    href: "/request-quote/",
    kicker: "01 / Compliance deadline",
    title: "Urgent ETP quote",
    copy: "Tell us your inspection date and what NEMA flagged. Expedited delivery available, 2 to 3 weeks for standard equipment.",
    accent: true,
  },
  {
    href: "/request-site-audit/",
    kicker: "02 / Pre-inspection assessment",
    title: "Book an ETP audit",
    copy: "We walk your plant, check current discharge against NEMA limits, write a remediation brief. No commitment.",
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
        title="NEMA standards have tightened."
        titleAccent="We supply equipment that passes."
        subtitle="Failing inspection halts production. Donor-funded projects gate on compliance. We supply the tanks, instruments, and analyzers that pass NEMA discharge standards under EMCA CAP 387. The parameters table is on this page; no other Kenya supplier publishes it."
        imageSrc="/images/industries/etp-water-treatment-hero.png"
        imageAlt="A wide angle of an outdoor ETP at a Kenyan factory with clarifier, aeration basin and dosing tanks"
        primaryCta={{ href: "/request-quote/", label: "Urgent ETP quote" }}
        secondaryCta={{ href: "#nema-parameters", label: "See NEMA limits" }}
        metaLeft="EMCA CAP 387 aware"
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
            <Eyebrow>The buying frame</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              ETP is the one industry where compliance is the brief.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                The other industries buy infrastructure because they're
                growing. ETP buyers buy infrastructure because they have to.
                The trigger is almost always external: a NEMA inspection
                that flagged a parameter, a discharge deadline, a donor
                project that gates on compliance, or a new effluent standard
                from a sector-specific regulation.
              </p>
              <p>
                Speed matters more than anywhere else on the catalogue. So
                does the answer to one question: <em>will this equipment
                pass the next inspection?</em> Everything on this page is
                designed to make that answer yes.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section
        bordered
        className="bg-surface-2/40"
        innerClassName="scroll-mt-24"
      >
        <div id="nema-parameters" className="flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col gap-3">
            <Eyebrow>NEMA discharge parameters</Eyebrow>
            <h2 className="font-display max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Maximum permissible levels per EMCA CAP 387.
            </h2>
            <p className="max-w-prose text-sm text-muted">
              Designed for the operator preparing for a NEMA inspection.
              First column: parameter. Second: limit for direct
              environmental discharge. Third: limit for discharge into a
              public sewer. The two limit sets are different; the right one
              depends on your discharge route.
            </p>
          </div>

          <div className="overflow-x-auto rounded-card border border-border/10 bg-surface">
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
                {NEMA_PARAMETERS.map((p) => (
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

          <p className="text-xs text-faint">
            Source: National Environment Management Authority (NEMA),
            Environmental Management and Coordination Act, Water Quality
            Regulations. Limits shown are representative; consult NEMA
            directly for your sector-specific requirements before
            construction or commissioning.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>The equipment train</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            What sits between your effluent and the discharge point.
          </h2>
          <p className="max-w-prose text-sm text-muted">
            We supply equipment inside the ETP scope. For full-plant
            design, we work alongside ETP designers; for retrofits and
            equipment swaps, we work directly with the plant.
          </p>
        </div>
        <ol className="divide-y divide-border/10 border-y border-border/10">
          {EQUIPMENT_TRAIN.map((stage, i) => (
            <li
              key={stage.title}
              className="grid grid-cols-12 gap-4 py-7 md:gap-6 md:py-9"
            >
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display col-span-10 text-xl font-medium tracking-tight md:col-span-3 md:text-2xl">
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
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Eyebrow>Continuous compliance, optional</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-2xl font-medium leading-tight tracking-tight md:text-3xl">
              For plants under continuous monitoring obligations, every
              analyzer we install can stream parameter data 24/7.
            </h2>
            <p className="mt-4 max-w-prose text-sm text-muted">
              Live pH, conductivity, DO, turbidity, and flow rate, with
              alarm logs you can hand to the regulator on demand. Hosted
              by us, or pushed into your existing systems. Safaricom NB-
              IoT for low-bandwidth sites.
            </p>
            <Link
              href="/products/iot/"
              className="press mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              See how remote monitoring works →
            </Link>
          </div>
          <div className="rounded-card border border-border/15 bg-surface p-7 md:col-span-5">
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
        </div>
      </Section>

      <Section>
        <div className="mb-8 flex flex-col gap-3">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            What plant managers ask before a NEMA inspection.
          </h2>
        </div>
        <FaqList items={FAQS} />
      </Section>

      <CtaBand
        eyebrow="⟶ ETP-specific paths"
        headline="Inspection coming?"
        headlineAccent="Pick the door that matches."
        cards={URGENT_CTA}
      />
    </>
  );
}
