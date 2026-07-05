import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxImage } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About: A Kenya-Based Tank Manufacturer",
  description:
    "A Kenya-based industrial infrastructure brand fabricating tanks, silos, structural steel, and process instruments locally. Made in Kenya, made for East Africa.",
  alternates: { canonical: "/about/" },
  keywords: [
    "tank manufacturer Kenya",
    "industrial fabrication Kenya",
    "Kenya-based tank supplier",
    "Nairobi industrial brand",
    "Made in Kenya",
  ],
  openGraph: {
    type: "website",
    title: "About: A Kenya-Based Tank Manufacturer",
    description:
      "A Kenya-based industrial infrastructure brand fabricating tanks, silos, structural steel, and process instruments locally. Made in Kenya, made for East Africa.",
    url: "/about/",
    images: [{ url: "/images/about/about-hero.png" }],
  },
};

const PILLARS = [
  {
    title: "Local accountability",
    copy: "Registered in Kenya and reachable by phone. On-site within 48 hours for Nairobi industrial estates, and across East African markets beyond that.",
  },
  {
    title: "Full-range single supplier",
    copy: "Stainless, epoxy, Zinc Aluminium tanks. Silos and grain storage. Structural fabrication. Process instruments across six categories. Remote-monitoring on every install. Few regional suppliers carry this breadth.",
  },
  {
    title: "Built to last vs. carbon steel",
    copy: "Zinc Aluminium and stainless head-to-head with the carbon-steel default. Lifecycle cost, not sticker price.",
  },
  {
    title: "Remote monitoring, built in",
    copy: "Every instrument we install can be connected to a remote-monitoring app, personalized to your site.",
  },
  {
    title: "Reference-grade work",
    copy: "Operating installs across East African markets, most of them behind customer NDAs. The work is the proof; the workshop and process pages are where we show it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An industrial infrastructure brand"
        titleAccent="built for East African plants."
        subtitle="Industrial infrastructure for East African plants, from a team based in Nairobi. Stainless tanks for dairy, epoxy-lined for ETP, Zinc Aluminium for water storage, silos for breweries, structural steel for plant builds, and instruments across the entire process stack."
        imageSrc="/images/about/about-hero.png"
        imageAlt=""
        primaryCta={{ href: "/about/local-manufacturing/", label: "Inside the workshop" }}
        secondaryCta={{ href: "/products/", label: "What we ship" }}
        metaLeft="Nairobi · Kenya"
        metaRight="Locally fabricated and supported"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about/" },
          ]}
        />
      </Section>

      {/* ─── 01 · MANIFESTO ─────────────────────────────────────────────── */}
      <Section ariaLabel="Positioning">
        <div className="flex flex-col gap-10 md:gap-14">
          <Eyebrow index="01">Positioning</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-2xl font-semibold leading-snug tracking-tight md:text-3xl"
          >
            Our model is straightforward: fabricate in-house, support locally,
            and source globally only when a particular part or material truly
            requires it. Our team is close to the work, so the people
            answering the phone are the people who build the equipment.
          </TextReveal>

          <div className="grid grid-cols-1 gap-8 hairline-t pt-10 md:grid-cols-12 md:gap-10 md:pt-14">
            <h2 className="font-display text-balance text-xl font-semibold leading-tight tracking-tight md:col-span-4 md:text-2xl">
              How we work, and why it matters.
            </h2>
            <Reveal className="md:col-span-7 md:col-start-6" stagger={0.08}>
              <div className="flex flex-col gap-5">
                <p
                  data-reveal-item
                  className="text-sm leading-relaxed text-muted md:text-base"
                >
                  That structural choice tends to show up in the things
                  customers care about most: lead time, availability of
                  replacement parts, install supervision, and having someone to
                  call when something needs attention. It is also the reason we
                  can quote in days rather than weeks, and deliver in weeks
                  rather than months.
                </p>
                <p
                  data-reveal-item
                  className="text-sm leading-relaxed text-muted md:text-base"
                >
                  Most of our installed projects sit behind customer NDAs, so
                  the work shows up in the catalogue and the workshop rather
                  than in named case studies. If you want to verify, we are
                  happy to talk you through what we have shipped, what we are
                  shipping right now, and where the work lives.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── 02 · FIVE PILLARS (numbered editorial blocks) ──────────────── */}
      <Section theme="paper" bordered ariaLabel="What we stand on">
        <SectionHeader
          index="02"
          eyebrow="What we stand on"
          title="Five pillars that show up in"
          titleAccent="every conversation."
        />

        <div className="flex flex-col">
          {PILLARS.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.title} stagger={0.08}>
                <article
                  className={cn(
                    "hairline-t grid grid-cols-12 items-start gap-x-4 gap-y-4 py-10 md:gap-x-8 md:py-14",
                    i === PILLARS.length - 1 && "hairline-b",
                  )}
                >
                  <span
                    data-reveal-item
                    aria-hidden
                    className={cn(
                      "font-display-condensed col-span-12 text-7xl font-black leading-[0.85] tracking-tight text-faint/50 md:col-span-2 md:text-8xl",
                      flip && "md:order-3 md:text-right",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    data-reveal-item
                    className={cn(
                      "font-display col-span-12 text-balance text-2xl font-semibold leading-tight tracking-tight md:col-span-4 md:text-3xl",
                      flip && "md:order-2 md:text-right",
                    )}
                  >
                    {p.title}
                  </h3>
                  <p
                    data-reveal-item
                    className={cn(
                      "col-span-12 max-w-xl text-sm leading-relaxed text-muted md:col-span-6",
                      flip && "md:order-1",
                    )}
                  >
                    {p.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ─── 03 · IRON STATEMENT (the commitment) ───────────────────────── */}
      <Section theme="iron" size="spacious" ariaLabel="Local fabrication commitment">
        <div className="flex flex-col gap-12 md:gap-16">
          <Eyebrow index="03">The commitment</Eyebrow>

          <TextReveal
            as="p"
            className="font-display max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
          >
            <>
              Fabricate locally. Support locally.{" "}
              <span className="text-accent">
                Source globally only when the part truly requires it.
              </span>
            </>
          </TextReveal>

          <Reveal stagger={0.08}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:max-w-2xl">
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={48} suffix=" hr" />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  On-site for Nairobi industrial estates; across East African
                  markets beyond that.
                </p>
              </div>
              <div data-reveal-item className="flex flex-col gap-3">
                <span className="font-display-condensed text-6xl font-black leading-none tracking-tight md:text-7xl">
                  <CountUp value={6} />
                </span>
                <span className="hairline h-px w-10" aria-hidden />
                <p className="max-w-[26ch] text-xs leading-relaxed text-muted">
                  Process instrument categories, remote-monitoring on
                  every install.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="font-mono-label hairline-t flex flex-col gap-2 pt-5 text-[10px] text-faint md:flex-row md:items-center md:justify-between">
            <span>Nairobi · Kenya</span>
            <span>Registered in Kenya · Reachable by phone</span>
            <span>Reference work across East Africa</span>
          </div>
        </div>
      </Section>

      {/* ─── 04 · INSIDE THE WORKSHOP ───────────────────────────────────── */}
      <Section ariaLabel="Inside the workshop">
        <SectionHeader
          index="04"
          eyebrow="Inside the workshop"
          title="Where the tanks actually get"
          titleAccent="built."
          side={
            <p>
              Most of the team is local. Engineering leadership comes from a
              broader East Africa industrial background. Procurement and
              quality control are run in-country.
            </p>
          }
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <ParallaxImage className="relative aspect-[4/3] overflow-hidden rounded-card border border-border/10">
              <Image
                src="/images/about/about-workshop-card.png"
                alt="Inside the North Star workshop: finishing bay with a polished stainless tank under inspection"
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
            </ParallaxImage>
            <div className="font-mono-label hairline-b mt-4 flex items-center justify-between pb-3 text-[10px] text-faint">
              <span>Finishing bay · stainless under inspection</span>
              <span>The actual workshop, not stock</span>
            </div>
          </div>

          <Reveal className="md:col-span-5" stagger={0.08}>
            <div className="flex flex-col gap-5">
              <p
                data-reveal-item
                className="text-sm leading-relaxed text-muted md:text-base"
              >
                We fabricate in-house: TIG welders, rolling machines,
                dye-penetrant test stations, finishing bays. The pictures on
                the next page are from our own workshop, not stock photos.
              </p>
              <div data-reveal-item className="pt-1">
                <Magnetic strength={0.2}>
                  <Link
                    href="/about/local-manufacturing/"
                    data-cursor="view"
                    className="press group inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
                  >
                    See the workshop
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.2}
                    />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        headline="Want to see what we ship?"
        headlineAccent="Browse the catalogue."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
