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
  title: "Structural Fabrication Works",
  description:
    "In-house structural steel fabrication for Kenyan industrial plants: platforms, walkways, tank supports, pipe racks, and plant structures. Carbon steel and galvanised finishes.",
  alternates: { canonical: "/products/structural-works/" },
};

const SCOPE = [
  {
    title: "Platforms and access",
    copy: "Operator platforms around vessels, sample stations, and mezzanine decks. Galvanised grating, kick-plates, and handrails to plant safety code.",
  },
  {
    title: "Walkways and catwalks",
    copy: "Inter-silo catwalks, pipe-bridge walkways, and tank-roof access bridges. Modular bays for fast field assembly.",
  },
  {
    title: "Tank supports and saddles",
    copy: "Vertical tank skirts, horizontal tank saddles, and elevated tank supports for our own tanks or yours.",
  },
  {
    title: "Pipe racks and supports",
    copy: "Multi-tier pipe racks, individual pipe supports, and service-line carrier structures.",
  },
  {
    title: "Equipment skids",
    copy: "Pump skids, instrument skids, packaged ETP skids. Pre-piped and pre-wired ex-works where the spec allows.",
  },
  {
    title: "Plant retrofits",
    copy: "Cutting and reinforcement work on existing structures, including in-situ welding and post-weld treatment.",
  },
];

const SPECS = [
  { label: "Standard materials", value: "Carbon steel S275 / S355, hot-dip galvanised on request" },
  { label: "Welding standards", value: "AWS D1.1, MIG and stick processes, qualified welders" },
  { label: "Finishes available", value: "Mill, primed, two-coat epoxy, hot-dip galvanised" },
  { label: "Design standards", value: "Eurocode 3 (steel structures), British Standards on request" },
  { label: "Drawing turnaround", value: "Concept GA within 5 working days of brief sign-off" },
  { label: "Workshop capacity", value: "Up to 30 tonnes per month, scaling with order book" },
  { label: "Delivery", value: "On flatbed within Kenya; abnormal-load permits handled in-house" },
] as const;

export default function StructuralWorksPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Structural Fabrication Works",
          material: "Carbon steel S275 / S355, hot-dip galvanised on request",
          category: "Industrial Structural Fabrication",
          description:
            "In-house structural steel fabrication for Kenyan industrial plants: platforms, walkways, tank supports, pipe racks.",
          url: `${SITE_URL}/products/structural-works/`,
        })}
      />

      <PageHero
        eyebrow="Products / Structural Works"
        title="Steel that holds"
        titleAccent="the rest of the plant up."
        subtitle="Platforms, walkways, tank supports, pipe racks, and equipment skids fabricated in our own workshop. Concept GA drawings inside a week, ex-works inside the month, on flatbed to your plant on the date we promised."
        imageSrc="/images/products/structural-works-hero.png"
        imageAlt="A finished structural-steel platform around a process vessel, mid-installation"
        primaryCta={{ href: "/request-quote/", label: "Get a structural quote" }}
        secondaryCta={{ href: "/products/", label: "All products" }}
        metaLeft="In-house workshop"
        metaRight="Eurocode 3 to AWS D1.1"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Structural Works", href: "/products/structural-works/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What we fabricate</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The structural envelope around your process equipment.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Most of our structural work is in support of our own tanks
                and silos. But the workshop is open: we fabricate platforms,
                walkways, tank supports, pipe racks, and equipment skids for
                any plant scope where the design fits Eurocode 3 or AWS D1.1.
              </p>
              <p>
                Concept drawings come back within five working days. From
                approved drawings to ex-works delivery is typically three to
                six weeks depending on tonnage and finish.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Scope</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Six scope buckets, fabricated locally.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {SCOPE.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6"
            >
              <h3 className="font-display text-lg font-medium tracking-tight">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{s.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Standards we work to.
            </h2>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Got a steel scope on a deadline?"
        headlineAccent="We start drawings on Monday."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
