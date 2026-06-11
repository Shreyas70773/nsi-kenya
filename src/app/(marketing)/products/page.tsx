import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Industrial Equipment Catalogue Kenya",
  description:
    "Industrial tanks, silos, structural works, process instruments, and cloud-ready monitoring. One Kenya supplier across the full infrastructure stack.",
  alternates: { canonical: "/products/" },
  keywords: [
    "industrial equipment Kenya",
    "industrial tanks Kenya",
    "industrial silos Kenya",
    "process instruments Kenya",
    "industrial supplier Nairobi",
    "infrastructure supplier Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Industrial Equipment Catalogue Kenya",
    description:
      "Industrial tanks, silos, structural works, process instruments, and cloud-ready monitoring. One Kenya supplier across the full infrastructure stack.",
    url: "/products/",
    images: [{ url: "/images/products/products-overview-hero.png" }],
  },
};

const CATEGORIES = [
  {
    href: "/products/tanks/",
    title: "Tanks",
    tagline: "Stainless · Epoxy-lined · Zinc-alum",
    copy: "304 and 316L stainless for dairy and beverage. Epoxy-lined steel for ETP and chemical dosing. Bolted zinc-alum for multi-decade water storage.",
    imageSrc: "/images/home/tanks-weld-bead.png",
  },
  {
    href: "/products/silos/",
    title: "Silos",
    tagline: "Grain · Feed · Industrial bulk",
    copy: "Industrial grain, feed, and bulk-material silos from 10 to 1000 MT, with conveyor catwalks and aeration on request.",
    imageSrc: "/images/home/silos-corrugated.png",
  },
  {
    href: "/products/structural-works/",
    title: "Structural Works",
    tagline: "Platforms · Walkways · Tank supports",
    copy: "In-house steel fabrication for new plant builds, retrofits, and tank support structures. Carbon and galvanised finishes.",
    imageSrc: "/images/home/structural-gantry.png",
  },
  {
    href: "/products/instruments/",
    title: "Process Instruments",
    tagline: "Flow · Level · Pressure · Liquid analysis · Temperature",
    copy: "Full instrument categories with 4 to 20mA, Modbus, HART. Sized and supplied for ETP, F&B, brewing, and chemical processing.",
    imageSrc: "/images/home/instruments-flow-meter.png",
  },
  {
    href: "/products/iot/",
    title: "Remote Monitoring",
    tagline: "Optional · NB-IoT capable",
    copy: "Cloud-connected oversight on any tank or instrument we install. Levels, flow, water quality, and alarms from any device.",
    imageSrc: "/images/home/iot-kisumu-plant.png",
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

      {/* Fabrication ledger — the catalogue rendered as a full-bleed,
          hairline-ruled directory. Hover a row to preview the category. */}
      <Section
        size="default"
        ariaLabel="Product category index"
        className="pb-0 md:pb-0"
      >
        <SectionHeader
          index="01"
          eyebrow="Category map"
          title="Pick a category."
          titleAccent="The page shows you exactly what we install."
          side="Five lines in the ledger, one supplier behind all of them. Each row opens the full category page — materials, capacities, finishes, and the industries they serve."
        />
      </Section>

      <section aria-label="Product catalogue ledger" className="pb-20 md:pb-28">
        <Reveal stagger={0.08}>
          <ul className="hairline-t flex flex-col">
            {CATEGORIES.map((cat, i) => (
              <li key={cat.href} data-reveal-item className="hairline-b">
                <Link
                  href={cat.href}
                  data-cursor="view"
                  data-cursor-label="Open"
                  className="group block px-6 transition-colors duration-500 ease-out hover:bg-surface-2"
                >
                  <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 py-8 md:flex-row md:items-center md:gap-10 md:py-9">
                    {/* Index numeral + name + spec line */}
                    <div className="flex min-w-0 flex-1 items-start gap-4 md:gap-8">
                      <span
                        aria-hidden
                        className="font-display-condensed w-9 shrink-0 pt-1.5 text-xl font-black leading-none text-faint transition-colors duration-300 group-hover:text-accent md:w-12 md:pt-2.5 md:text-2xl"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-3">
                        <h3 className="font-display text-balance text-4xl font-semibold leading-[0.95] tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-5xl md:group-hover:translate-x-3 lg:text-6xl">
                          {cat.title}
                        </h3>
                        <p className="font-mono-label text-[10px] text-faint">
                          {cat.tagline}
                        </p>
                        <p className="max-w-xl text-sm leading-relaxed text-muted">
                          {cat.copy}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="mt-2 h-5 w-5 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent md:hidden"
                        strokeWidth={2.2}
                      />
                    </div>

                    {/* Hover-revealed category thumbnail + arrow (desktop) */}
                    <div className="hidden shrink-0 items-center gap-6 md:flex">
                      <div
                        aria-hidden
                        className="relative aspect-[4/3] w-36 overflow-hidden rounded-xl opacity-0 scale-[0.94] transition-[opacity,transform] duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 motion-reduce:transition-none lg:w-44"
                      >
                        <Image
                          src={cat.imageSrc}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 176px, 144px"
                          className="object-cover"
                        />
                      </div>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent motion-reduce:transition-none"
                        strokeWidth={2.2}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Ledger footer rule — mirrors the hero meta line */}
        <div className="px-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 pt-5">
            <p className="font-mono-label text-[10px] text-faint">
              Five product categories
            </p>
            <p className="font-mono-label text-[10px] text-faint">
              Fabricated in Kenya
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        headline="Have a project in mind?"
        headlineAccent="Get a quote in 48 hours."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
