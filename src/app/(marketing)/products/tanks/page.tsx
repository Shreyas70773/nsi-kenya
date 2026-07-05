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
import { CitableBrief } from "@/components/seo/citable-brief";
import { ProductFaqSection } from "@/components/seo/product-faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { PRODUCT_GEO } from "@/lib/product-geo";
import { breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Industrial Tanks Kenya: Stainless, Epoxy, Zinc Aluminium",
  description:
    "Stainless 304/316L, epoxy-lined, and zinc aluminium industrial tanks fabricated in-house. 1 to 5,000 m³ for food, ETP, chemical, and bulk storage duty.",
  alternates: { canonical: "/products/tanks/" },
  keywords: [
    "industrial tanks Kenya",
    "stainless steel tank Kenya",
    "zinc aluminum tank Kenya",
    "epoxy lined tank Kenya",
    "tank manufacturer Nairobi",
    "food grade tank Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Industrial Tanks Kenya: Stainless, Epoxy, Zinc Aluminium",
    description:
      "Stainless 304/316L, epoxy-lined, and zinc aluminium industrial tanks fabricated in-house. 1 to 5,000 m³ for food, ETP, chemical, and bulk storage duty.",
    url: "/products/tanks/",
    images: [{ url: "/images/products/tanks-overview-hero.png" }],
  },
};

const TANK_TYPES = [
  {
    href: "/products/tanks/stainless-steel/",
    title: "Stainless Steel Tanks",
    grades: "304 and 316L",
    capacity: "1 to 500 m³",
    best: "Food and beverage, dairy, pharmaceutical-adjacent",
    imageSrc: "/images/products/tanks-stainless-steel-hero.png",
    imageAlt: "A row of polished stainless steel process tanks in a plant",
  },
  {
    href: "/products/tanks/epoxy-lined/",
    title: "Epoxy-Lined Tanks",
    grades: "Carbon steel + chemical-resistant epoxy",
    capacity: "1 to 200 m³",
    best: "ETP chemical dosing, corrosive media storage",
    imageSrc: "/images/products/tanks-epoxy-lined-hero.png",
    imageAlt: "Bolted epoxy fusion-bonded steel tank with side ladder",
  },
  {
    href: "/products/tanks/zinc-alum/",
    title: "Zinc Aluminium Tanks",
    grades: "Bolted zinc-aluminium steel panels",
    capacity: "50 to 5000 m³",
    best: "Industrial water storage, ETP process tanks, brewing",
    imageSrc: "/images/products/tanks-zinc-alum-hero.png",
    imageAlt: "Corrugated zinc-aluminium bolted storage tanks",
  },
];

export default function TanksOverviewPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", url: "https://northstarimpex.co.ke/" },
          { name: "Products", url: "https://northstarimpex.co.ke/products/" },
          { name: "Tanks", url: "https://northstarimpex.co.ke/products/tanks/" },
        ])}
      />

      <PageHero
        eyebrow="Products / Tanks"
        title="Three tank materials,"
        titleAccent="each suited to a different job."
        subtitle="The right tank is the one that survives the medium it stores. We fabricate in stainless for the hygiene path, epoxy-lined for the corrosive path, and bolted zinc aluminium for the long-cycle bulk-water path. Sized between one and five thousand cubic metres."
        imageSrc="/images/products/tanks-overview-hero.png"
        imageAlt=""
        primaryCta={{ href: "/request-quote/", label: "Spec a tank" }}
        secondaryCta={{ href: "/products/", label: "All products" }}
        metaLeft="Stainless · Epoxy · Zinc Aluminium"
        metaRight="Fabricated in-house"
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

      <CitableBrief geo={PRODUCT_GEO.tanks} />

      <Section>
        <SectionHeader
          index="01"
          eyebrow="The three options"
          title="Each material exists because the others would fail in its job."
        />

        <Reveal effect="scale-in" stagger={0.08}>
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
            {TANK_TYPES.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                data-reveal-item
                data-cursor="view"
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
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
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
        </Reveal>
      </Section>

      <ProductFaqSection geo={PRODUCT_GEO.tanks} index="02" />

      <CtaBand
        headline="Not sure which tank fits?"
        headlineAccent="Book a consultation."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
