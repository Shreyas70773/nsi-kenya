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
  title: "Brewery & Distillery Tank Kenya: 50 HL to 5,000 HL+",
  description:
    "Stainless fermenters, mash and lauter tuns, malt silos, distillation column supports, and instrumentation for Kenyan craft and industrial breweries and distilleries.",
  alternates: { canonical: "/industries/alcohol-distilling/" },
  keywords: [
    "brewery tank Kenya",
    "distillery equipment Kenya",
    "fermenter tank Kenya",
    "mash tun Kenya",
    "malt silo Kenya",
    "craft brewery equipment Nairobi",
  ],
  openGraph: {
    type: "website",
    title: "Brewery & Distillery Tank Kenya: 50 HL to 5,000 HL+",
    description:
      "Stainless fermenters, mash and lauter tuns, malt silos, distillation column supports, and instrumentation for Kenyan craft and industrial breweries and distilleries.",
    url: "/industries/alcohol-distilling/",
    images: [{ url: "/images/industries/alcohol-distilling-hero.png" }],
  },
};

const SUB_APPS = [
  {
    title: "Craft brewing",
    copy: "Mash tuns, lauter tuns, fermenters, bright tanks, malt silos sized for craft volumes (50 to 500 HL).",
    fit: "SS 304/316L, grain silos, level + temp + pressure",
  },
  {
    title: "Industrial brewing",
    copy: "Larger fermenters, bright tanks, and supporting structural fabrication for breweries operating at 5,000 HL+ capacity.",
    fit: "SS 304/316L, large silos, full instrument stack, structural",
  },
  {
    title: "Distilling",
    copy: "Pot still pedestals, condenser supports, intermediate spirit tanks. Fabrication around your column geometry.",
    fit: "SS 304/316L, structural, temperature + pressure instruments",
  },
  {
    title: "Containment and effluent",
    copy: "Spent-grain handling, bottling-line effluent collection, CIP caustic recovery tanks.",
    fit: "Epoxy-lined tanks, ETP equipment if discharge-side",
  },
];

const TRIGGERS = [
  {
    title: "Brand scale-up",
    copy: "Product is moving and the line is at ceiling. New fermenters, bright tanks, and the silos to feed them.",
  },
  {
    title: "New SKU introduction",
    copy: "Premium-line, lager-to-stout expansion, or a seasonal product. Spec is usually material-driven (sanitary fittings, jacketed temperature control).",
  },
  {
    title: "Distillery containment",
    copy: "Spirit storage capacity, bonded warehouse, condenser cooling water tanks. Compliance-and-safety driven.",
  },
  {
    title: "Effluent compliance",
    copy: "Brewery and distillery effluent is high-strength. Triggers ETP scope when the local regulator notices.",
  },
];

export default function AlcoholDistillingPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          slug: "alcohol-distilling",
          name: "Alcohol & Distilling Equipment",
        })}
      />

      <PageHero
        eyebrow="Industries / Alcohol & Distilling"
        title="Equipment for Kenya's"
        titleAccent="brewing and distilling growth."
        subtitle="Fermenters, mash tuns, bright tanks, malt silos, distillation supports, and the structural and instrument equipment around them. Sized from craft (50 HL) to industrial (5,000 HL+)."
        imageSrc="/images/industries/alcohol-distilling-hero.png"
        imageAlt="A row of large stainless fermentation tanks at a Kenyan brewery with cooling jackets and sample valves"
        primaryCta={{ href: "/request-quote/", label: "Spec a brewing project" }}
        secondaryCta={{
          href: "/products/tanks/stainless-steel/",
          label: "Stainless tanks",
        }}
        metaLeft="Craft to industrial"
        metaRight="50 to 5,000+ HL"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries/" },
            {
              label: "Alcohol & Distilling",
              href: "/industries/alcohol-distilling/",
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
              title="Brewery scale-up is a happy buyer. Distillery scale-up is a careful one."
              className="mb-0 md:mb-0"
              headlineClassName="text-3xl leading-tight md:text-4xl"
            />
          </div>
          <Reveal className="md:col-span-7">
            <div data-reveal-item>
              <Prose>
                <p>
                  Brewing buyers tend to be in growth mode. The line is
                  at ceiling, the brand is moving, and capacity needs to
                  land before the next peak season. The spec is
                  straightforward: sanitary stainless, the right jacket
                  geometry for temperature control, fittings that match
                  the existing CIP loop.
                </p>
                <p>
                  Distillery buyers are more careful. Containment matters,
                  bonded-warehouse requirements matter, and the buying
                  conversation often involves a regulator. We work the
                  same equipment scope either way; the difference is in
                  the documentation we issue alongside the equipment.
                </p>
              </Prose>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Full-bleed media band — the fermentation row at a tighter crop,
          breaking the container rhythm before the scope ledger. */}
      <div className="relative h-[50vh] overflow-hidden md:h-[65vh]">
        <ParallaxImage className="absolute inset-0" amount={14}>
          <Image
            src="/images/industries/alcohol-distilling-hero.png"
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
          <span>Fermenters · mash tuns · bright tanks · malt silos</span>
          <span>Cooling jackets · sample valves · craft to industrial</span>
        </div>
      </div>

      <Section bordered theme="paper">
        <SectionHeader
          index="02"
          eyebrow="Sub-applications"
          title="Four scope buckets."
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

      {/* Iron statement — the page's capacity range, elevated. */}
      <Section theme="iron" size="spacious" ariaLabel="Capacity range">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="03">The range</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              Sized from craft to industrial.{" "}
              <span className="text-accent">
                50 HL brewhouses to 5,000 HL and beyond.
              </span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-3xl md:grid-cols-3">
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Craft floor
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={50} suffix=" HL" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Mash tuns, lauter tuns, fermenters, bright tanks at craft
                  volumes.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Industrial ceiling
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={5000} suffix=" HL+" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Larger fermenters and bright tanks with the structural
                  fabrication around them.
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
                  Craft brewing, industrial brewing, distilling, containment
                  and effluent.
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
          title="Four reasons brewing and distilling operators call us."
        />
        <Reveal stagger={0.08} yFrom={16}>
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
            The buying frame · Alcohol &amp; Distilling
          </p>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            &ldquo;We work the same equipment scope either way; the difference
            is in the documentation we issue alongside the equipment.&rdquo;
          </TextReveal>
        </div>
      </Section>

      <CtaBand
        headline="Scaling a brewery or distillery?"
        headlineAccent="We've shipped the stack."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
