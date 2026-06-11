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
import { localBusinessLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tank Supplier Nairobi: 48-Hour Response, All Estates",
  description:
    "Industrial tank, silo, instrument, and structural supply across Nairobi industrial estates: Athi River, Ruiru, Mlolongo, Industrial Area, Mombasa Road, Tatu City, Thika Road.",
  alternates: { canonical: "/locations/nairobi/" },
  keywords: [
    "tank supplier Nairobi",
    "Nairobi industrial estates supplier",
    "Athi River tank supplier",
    "Mombasa Road industrial",
    "Tatu City fabrication",
    "Ruiru industrial supply",
  ],
  openGraph: {
    type: "website",
    title: "Tank Supplier Nairobi: 48-Hour Response, All Estates",
    description:
      "Industrial tank, silo, instrument, and structural supply across Nairobi industrial estates: Athi River, Ruiru, Mlolongo, Industrial Area, Mombasa Road, Tatu City, Thika Road.",
    url: "/locations/nairobi/",
    images: [{ url: "/images/locations/nairobi-hero.png" }],
  },
};

const ESTATES = [
  {
    name: "Athi River",
    note: "Cement plants, food processing, EPZ light industrial",
  },
  {
    name: "Ruiru",
    note: "Beverage manufacturing, packaging, light fabrication",
  },
  {
    name: "Mlolongo",
    note: "Logistics, food and beverage warehousing",
  },
  {
    name: "Industrial Area",
    note: "Legacy heavy industry, processing, fabrication",
  },
  {
    name: "Mombasa Road corridor",
    note: "Food, beverage, chemical processing arteries",
  },
  {
    name: "Tatu City",
    note: "Newer master-planned industrial park, F&B and tech",
  },
  {
    name: "Thika Road",
    note: "Manufacturing corridor, agro-processing, building products",
  },
];

export default function NairobiPage() {
  return (
    <>
      <JsonLd
        data={localBusinessLd({
          slug: "nairobi",
          name: "Nairobi",
          country: "Kenya",
        })}
      />

      <PageHero
        eyebrow="Locations / Nairobi"
        title="On-site within 48 hours,"
        titleAccent="across every industrial estate."
        subtitle="The workshop is in Nairobi. From there we serve Athi River, Ruiru, Mlolongo, Industrial Area, the Mombasa Road corridor, Tatu City, and Thika Road. Forty-eight hours from call to plant for non-urgent visits; sooner for urgent ones."
        imageSrc="/images/locations/nairobi-hero.png"
        imageAlt=""
        primaryCta={{ href: "/request-site-audit/", label: "Book a Nairobi site visit" }}
        secondaryCta={{ href: "/request-quote/", label: "Get a quote" }}
        metaLeft="48-hour response"
        metaRight="All major industrial estates"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations/" },
            { label: "Nairobi", href: "/locations/nairobi/" },
          ]}
        />
      </Section>

      <Section ariaLabel="Why Nairobi-deep matters">
        <SectionHeader
          index="01"
          eyebrow="Why Nairobi-deep matters"
          title="The plant manager wants the supplier"
          titleAccent="who already knows the roads."
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7 md:col-start-6">
            <Reveal stagger={0.08}>
              <div data-reveal-item>
                <Prose>
                  <p>
                    Nairobi&apos;s industrial economy doesn&apos;t live in one
                    place. The cement and EPZ activity sits in Athi River.
                    The beverage manufacturers cluster around Ruiru and
                    Thika. Legacy heavy industry stays in Industrial Area.
                    Newer plants land in Tatu City. Each cluster has its own
                    lead-vehicle access, its own gate protocol, its own
                    weighbridge constraints.
                  </p>
                  <p>
                    Knowing the estate matters. We delivered to most of the
                    major Nairobi industrial estates already, which means
                    logistics is one less thing for the plant manager to
                    worry about on the quote.
                  </p>
                </Prose>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Full-bleed media band — the city's industrial edge at a lower crop,
          breaking the container rhythm before the estates ledger. */}
      <div className="relative h-[50vh] overflow-hidden md:h-[65vh]">
        <ParallaxImage className="absolute inset-0" amount={14}>
          <Image
            src="/images/locations/nairobi-hero.png"
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
          <span>The workshop is in Nairobi</span>
          <span>48-hour response · all major industrial estates</span>
        </div>
      </div>

      <Section theme="paper" bordered ariaLabel="Industrial estates we serve">
        <SectionHeader
          index="02"
          eyebrow="Industrial estates we serve"
          title="Seven estates,"
          titleAccent="every gate."
        />
        <Reveal stagger={0.07}>
          <ol className="flex flex-col">
            {ESTATES.map((e, i) => (
              <li
                key={e.name}
                data-reveal-item
                className={cn(
                  "group hairline-t grid grid-cols-12 items-start gap-x-4 gap-y-3 py-7 md:gap-x-6 md:py-9",
                  i === ESTATES.length - 1 && "hairline-b",
                )}
              >
                <span
                  aria-hidden
                  className="font-display-condensed col-span-2 pt-1 text-xl font-black leading-none text-faint transition-colors duration-300 group-hover:text-accent md:col-span-1 md:text-2xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display col-span-10 text-balance text-2xl font-semibold leading-tight tracking-tight md:col-span-4 md:text-3xl">
                  {e.name}
                </h3>
                <p className="col-span-12 text-sm leading-relaxed text-muted md:col-span-6 md:col-start-7">
                  {e.note}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Iron statement — the page's response commitment, elevated. */}
      <Section theme="iron" size="spacious" ariaLabel="The response commitment">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="03">The response commitment</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            <>
              On-site within 48 hours,{" "}
              <span className="text-accent">
                across every industrial estate.
              </span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-2xl">
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Call to plant
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={48} suffix=" hr" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  For non-urgent visits; sooner for urgent ones.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <p className="font-mono-label text-[10px] text-faint">
                  Estates served
                </p>
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={7} />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Athi River to Thika Road, every gate.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Pull quote — the page's most persuasive line, set asymmetrically. */}
      <Section size="compact" ariaLabel="In one line">
        <div className="hairline-t grid grid-cols-1 gap-6 pt-8 md:grid-cols-12 md:gap-10 md:pt-12">
          <p className="font-mono-label text-[10px] text-faint md:col-span-5">
            Why Nairobi-deep matters · Locations
          </p>
          <TextReveal
            as="p"
            className="font-display text-balance text-2xl font-semibold leading-snug tracking-tight md:col-span-7 md:text-3xl"
          >
            &ldquo;We delivered to most of the major Nairobi industrial estates
            already, which means logistics is one less thing for the plant
            manager to worry about on the quote.&rdquo;
          </TextReveal>
        </div>
      </Section>

      <CtaBand
        headline="Site in Nairobi?"
        headlineAccent="We can be there by Friday."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
