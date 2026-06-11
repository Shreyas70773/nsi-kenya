import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Chemical Processing Tank Kenya: Epoxy & Stainless",
  description:
    "Epoxy-lined and stainless tanks, structural fabrication, and pressure/temperature instruments for Kenyan chemical processing, dosing, and corrosive media storage.",
  alternates: { canonical: "/industries/chemical-processing/" },
  keywords: [
    "chemical processing tank Kenya",
    "chemical storage tank Nairobi",
    "acid storage tank Kenya",
    "alkali dosing tank Kenya",
    "reactor support structure Kenya",
    "corrosive media tank Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Chemical Processing Tank Kenya: Epoxy & Stainless",
    description:
      "Epoxy-lined and stainless tanks, structural fabrication, and pressure/temperature instruments for Kenyan chemical processing, dosing, and corrosive media storage.",
    url: "/industries/chemical-processing/",
    images: [{ url: "/images/industries/chemical-processing-hero.png" }],
  },
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
            <SectionHeader
              index="01"
              eyebrow="The buying frame"
              title="The spec is the chemistry. Everything else follows."
              className="mb-0 md:mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <Reveal className="md:col-span-7">
            <div data-reveal-item>
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
          </Reveal>
        </div>
      </Section>

      {/* Full-bleed media band — the processing bay at a lower crop,
          breaking the container rhythm before the scope ledger. */}
      <div className="relative h-[50vh] overflow-hidden md:h-[65vh]">
        <ParallaxImage className="absolute inset-0" amount={14}>
          <Image
            src="/images/industries/chemical-processing-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_70%]"
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
          <span>Epoxy-lined reactor · colour-coded process piping</span>
          <span>Dilute acids · alkalis · dosing</span>
        </div>
      </div>

      <Section bordered theme="paper">
        <SectionHeader
          index="02"
          eyebrow="Sub-applications"
          title="Four scope buckets."
          headlineClassName="text-3xl md:text-4xl"
        />
        <Reveal stagger={0.08}>
          <ul className="flex flex-col">
            {SUB_APPS.map((s, i) => (
              <li
                key={s.title}
                data-reveal-item
                className={cn(
                  "group hairline-t grid grid-cols-12 items-start gap-x-4 gap-y-3 py-7 md:gap-x-6 md:py-9",
                  i === SUB_APPS.length - 1 && "hairline-b",
                )}
              >
                <span
                  aria-hidden
                  className="font-display-condensed col-span-2 pt-1 text-xl font-black leading-none text-faint transition-colors duration-300 group-hover:text-accent md:col-span-1 md:text-2xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 flex flex-col gap-2 md:col-span-4">
                  <h3 className="font-display text-balance text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="font-mono-label text-[10px] text-accent">
                    Equipment fit: {s.fit}
                  </p>
                </div>
                <p className="col-span-12 text-sm leading-relaxed text-muted md:col-span-6 md:col-start-7">
                  {s.copy}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Iron statement — the page's material doctrine, elevated. */}
      <Section theme="iron" size="spacious" ariaLabel="Material doctrine">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="03">The doctrine</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              Equipment that survives the medium it stores.{" "}
              <span className="text-accent">
                Materials picked against the chemistry, not the catalogue.
              </span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-2xl">
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  The exception grade
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={316} suffix="L" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Where the chemistry rules out epoxy lining, the duty goes to
                  stainless 316L.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Scope buckets
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={4} />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Storage, dosing, reactor support, containment and safety.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeader
          index="04"
          eyebrow="Buying triggers"
          title="Four reasons chemical operators call us."
          headlineClassName="text-3xl md:text-4xl"
        />
        <Reveal stagger={0.07} yFrom={16}>
          <ol className="divide-y divide-border/10 border-y border-border/10">
            {TRIGGERS.map((t, i) => (
              <li
                key={t.title}
                data-reveal-item
                className="grid grid-cols-12 gap-4 py-6 md:gap-6 md:py-8"
              >
                <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display col-span-10 text-xl font-semibold tracking-tight md:col-span-3 md:text-2xl">
                  {t.title}
                </h3>
                <p className="col-span-12 text-sm text-muted md:col-span-8">
                  {t.copy}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Pull quote — the page's most persuasive line, set asymmetrically. */}
      <Section size="compact" ariaLabel="In one line">
        <div className="hairline-t grid grid-cols-1 gap-6 pt-8 md:grid-cols-12 md:gap-10 md:pt-12">
          <p className="font-mono-label text-[10px] text-faint md:col-span-5">
            The buying frame · Chemical Processing
          </p>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            &ldquo;Chemical processing buyers care less about brand and more
            about whether the tank will survive the medium for its full design
            life.&rdquo;
          </TextReveal>
        </div>
      </Section>

      <CtaBand
        headline="Got a chemical scope?"
        headlineAccent="We pick lining to the chemistry."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
