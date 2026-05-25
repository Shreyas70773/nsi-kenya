import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";

export const metadata: Metadata = {
  title: "Industrial Tanks",
  description:
    "Stainless steel, epoxy-lined, and zinc-alum tanks fabricated in Kenya. Food-grade, chemical-grade, and bulk-water storage from 1 to 500 cubic metres.",
  alternates: { canonical: "/products/tanks/" },
};

const TANK_TYPES = [
  {
    href: "/products/tanks/stainless-steel/",
    title: "Stainless Steel Tanks",
    grades: "304 and 316L",
    capacity: "1 to 500 m³",
    best: "Food and beverage, dairy, pharmaceutical-adjacent",
    imageSrc: "/images/home/tanks-weld-bead.png",
    imageAlt: "Polished stainless tank weld bead detail",
  },
  {
    href: "/products/tanks/epoxy-lined/",
    title: "Epoxy-Lined Tanks",
    grades: "Carbon steel + chemical-resistant epoxy",
    capacity: "1 to 200 m³",
    best: "ETP chemical dosing, corrosive media storage",
    imageSrc: "/images/home/sector-chemical.png",
    imageAlt: "Epoxy reactor with pressure gauge cluster",
  },
  {
    href: "/products/tanks/zinc-alum/",
    title: "Zinc-Alum Tanks",
    grades: "Bolted zinc-aluminium steel panels",
    capacity: "50 to 5000 m³",
    best: "Industrial water storage, ETP process tanks, brewing",
    imageSrc: "/images/home/silos-corrugated.png",
    imageAlt: "Bolted zinc-alum tank exterior with vertical panel seams",
  },
];

export default function TanksOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Products / Tanks"
        title="Three metallurgies."
        titleAccent="Picked for the job, not the catalogue."
        subtitle="The right tank is the one that survives the medium it stores. We fabricate in stainless for the hygiene path, epoxy-lined for the corrosive path, and bolted zinc-alum for the long-cycle bulk-water path. Sized between one and five thousand cubic metres."
        imageSrc="/images/products/tanks-overview-hero.png"
        imageAlt=""
        primaryCta={{ href: "/request-quote/", label: "Spec a tank" }}
        secondaryCta={{ href: "/products/", label: "All products" }}
        metaLeft="Stainless · Epoxy · Zinc-alum"
        metaRight="Fabricated in Kenya"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Tanks", href: "/products/tanks/" },
          ]}
        />
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>The three options</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Each metallurgy exists because the others would fail in its job.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
          {TANK_TYPES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="press group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card border border-border/10"
            >
              <Image
                src={t.imageSrc}
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
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
                  {t.grades}
                </p>
                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl">
                  {t.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/70">
                  Capacity {t.capacity}. Best for {t.best.toLowerCase()}.
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  Open
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        headline="Not sure which tank fits?"
        headlineAccent="Book a consultation."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
