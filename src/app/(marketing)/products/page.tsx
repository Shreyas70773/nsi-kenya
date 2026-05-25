import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Industrial tanks, silos, structural fabrication, process instruments, and optional cloud-ready monitoring. One supplier across the full infrastructure stack.",
  alternates: { canonical: "/products/" },
};

const CATEGORIES = [
  {
    href: "/products/tanks/",
    title: "Tanks",
    tagline: "Stainless · Epoxy-lined · Zinc-alum",
    copy: "304 and 316L stainless for dairy and beverage. Epoxy-lined steel for ETP and chemical dosing. Bolted zinc-alum for multi-decade water storage.",
    imageSrc: "/images/home/tanks-weld-bead.png",
    imageAlt: "Macro detail of a stainless tank weld bead",
  },
  {
    href: "/products/silos/",
    title: "Silos",
    tagline: "Grain · Feed · Industrial bulk",
    copy: "Industrial grain, feed, and bulk-material silos from 10 to 1000 MT, with conveyor catwalks and aeration on request.",
    imageSrc: "/images/home/silos-corrugated.png",
    imageAlt: "Three corrugated steel silos with catwalk",
  },
  {
    href: "/products/structural-works/",
    title: "Structural Works",
    tagline: "Platforms · Walkways · Tank supports",
    copy: "In-house steel fabrication for new plant builds, retrofits, and tank support structures. Carbon and galvanised finishes.",
    imageSrc: "/images/home/structural-gantry.png",
    imageAlt: "Steel gantry and tank-support framework mid-installation",
  },
  {
    href: "/products/instruments/",
    title: "Process Instruments",
    tagline: "Flow · Level · Pressure · Liquid analysis · Temperature",
    copy: "Full instrument categories with 4 to 20mA, Modbus, HART. Sized and supplied for ETP, F&B, brewing, and chemical processing.",
    imageSrc: "/images/home/instruments-flow-meter.png",
    imageAlt: "Electromagnetic flow meter on stainless steel pipework",
  },
  {
    href: "/products/iot/",
    title: "Remote Monitoring",
    tagline: "Optional · Safaricom NB-IoT capable",
    copy: "Cloud-connected oversight on any tank or instrument we install. Levels, flow, water quality, and alarms from any device.",
    imageSrc: "/images/home/iot-kisumu-plant.png",
    imageAlt: "Plant operator viewing a tank-monitoring dashboard on a phone",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Everything a Kenyan plant needs,"
        titleAccent="under one roof."
        subtitle="Single supplier across stainless, epoxy-lined, and zinc-alum tanks; silos and grain storage; structural fabrication; the full instrument stack; and optional cloud-ready monitoring. No competitor in Kenya carries this breadth."
        imageSrc="/images/products/products-overview-hero.png"
        imageAlt=""
        primaryCta={{ href: "/request-quote/", label: "Get a quote" }}
        secondaryCta={{ href: "/industries/", label: "By industry" }}
        metaLeft="Five product categories"
        metaRight="Fabricated in Kenya"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
          ]}
        />
      </Section>

      <Section size="default">
        <Reveal stagger={0.08}>
          <div data-reveal-item className="mb-10 flex flex-col gap-3 md:mb-14">
            <Eyebrow>Category map</Eyebrow>
            <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
              Pick a category. The page shows you exactly what we install.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                data-reveal-item
                className="press group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card border border-border/10"
              >
                <Image
                  src={cat.imageSrc}
                  alt={cat.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      "linear-gradient(to top, rgb(8 6 4 / 0.92) 0%, rgb(8 6 4 / 0.55) 38%, rgb(8 6 4 / 0.1) 70%, rgb(8 6 4 / 0) 100%)",
                  }}
                />
                <div className="relative flex flex-col gap-2 p-5 md:p-6">
                  <p className="font-mono-label text-[10px] text-accent">
                    {cat.tagline}
                  </p>
                  <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl">
                    {cat.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/70">
                    {cat.copy}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaBand
        headline="Have a project in mind?"
        headlineAccent="Get a quote in 48 hours."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
