import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Chemical Processing",
  description:
    "Epoxy-lined and stainless storage tanks, structural fabrication, and pressure / temperature instrumentation for Kenyan chemical processing and dosing operations.",
  alternates: { canonical: "/industries/chemical-processing/" },
};

const SUB_APPS = [
  {
    title: "Acid and alkali storage",
    copy: "Dilute acid (sulphuric, hydrochloric, phosphoric) and alkali (caustic) bulk storage with picked-to-medium lining.",
    fit: "Epoxy-lined tanks, ATEX-rated instrumentation where applicable",
  },
  {
    title: "Chemical dosing",
    copy: "Day tanks for plant chemicals, polymer preparation, neutralisation dosing loops.",
    fit: "Epoxy or stainless, flow + level + pressure instruments",
  },
  {
    title: "Reactor and process support",
    copy: "Structural platforms around reactors, condenser supports, intermediate storage between unit operations.",
    fit: "Structural fabrication, SS 316L, pressure + temperature instruments",
  },
  {
    title: "Containment and safety",
    copy: "Bunded containment tanks, leak-detection sumps, secondary-containment liners for spill control.",
    fit: "Epoxy-lined or SS, leak-detection level sensors, bund-area drainage",
  },
];

const TRIGGERS = [
  {
    title: "New product or process line",
    copy: "A new chemical product or downstream processing step adds reactors and storage. Spec is material-driven, picked to the chemistry.",
  },
  {
    title: "Containment upgrade",
    copy: "Safety audit identifies a single-walled tank carrying corrosive material, or insufficient bunding. Triggers replacement on a strict timeline.",
  },
  {
    title: "Compliance with chemical-handling regulations",
    copy: "OSH-style regulator, fire safety, or environmental authority flags a gap that touches tank, pipe, or instrumentation.",
  },
  {
    title: "Capacity expansion",
    copy: "Existing reactors at ceiling. Replacement or addition of process vessels and the structural and instrumentation work around them.",
  },
];

export default function ChemicalProcessingPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          slug: "chemical-processing",
          name: "Chemical Processing Equipment",
        })}
      />

      <PageHero
        eyebrow="Industries / Chemical Processing"
        title="Equipment that survives"
        titleAccent="the medium it stores."
        subtitle="Epoxy-lined and stainless storage tanks, dosing tanks, reactor support structures, and pressure and temperature instrumentation for Kenyan chemical processing plants. Materials picked against the chemistry, not the catalogue."
        imageSrc="/images/industries/chemical-processing-hero.png"
        imageAlt="A wide view of a chemical processing bay with an epoxy-lined reactor and colour-coded process piping"
        primaryCta={{ href: "/request-quote/", label: "Spec a chemical project" }}
        secondaryCta={{
          href: "/products/tanks/epoxy-lined/",
          label: "Epoxy-lined tanks",
        }}
        metaLeft="Dilute acids / alkalis / dosing"
        metaRight="Picked to the chemistry"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries/" },
            {
              label: "Chemical Processing",
              href: "/industries/chemical-processing/",
            },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>The buying frame</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The spec is the chemistry. Everything else follows.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Chemical processing buyers care less about brand and
                more about whether the tank will survive the medium for
                its full design life. The conversation usually starts
                with chemistry: medium, concentration, temperature,
                cycle frequency, and contamination tolerance.
              </p>
              <p>
                From there the equipment decision is structured. Most
                of the dilute-acid and alkali duty lands in epoxy-lined
                steel, with the lining grade picked to the specific
                medium. The exceptions go to stainless 316L. Hastelloy
                or other exotics come up rarely and we source those for
                the specific brief.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Sub-applications</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Four scope buckets.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
          {SUB_APPS.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 md:p-7"
            >
              <h3 className="font-display text-xl font-medium tracking-tight">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{s.copy}</p>
              <p className="font-mono-label mt-1 text-[10px] text-accent">
                Equipment fit: {s.fit}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Buying triggers</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Four reasons chemical operators call us.
          </h2>
        </div>
        <ol className="divide-y divide-border/10 border-y border-border/10">
          {TRIGGERS.map((t, i) => (
            <li
              key={t.title}
              className="grid grid-cols-12 gap-4 py-6 md:gap-6 md:py-8"
            >
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display col-span-10 text-xl font-medium tracking-tight md:col-span-3 md:text-2xl">
                {t.title}
              </h3>
              <p className="col-span-12 text-sm text-muted md:col-span-8">
                {t.copy}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        headline="Got a chemical scope?"
        headlineAccent="We pick lining to the chemistry."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
