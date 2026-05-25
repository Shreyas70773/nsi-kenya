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
  title: "Case Studies",
  description:
    "Reference work for Kenyan industrial operators. Named installs, real photos, what we supplied, and what it changed.",
  alternates: { canonical: "/case-studies/" },
};

const CASES = [
  {
    href: "/case-studies/crywan-industries-kenya/",
    client: "Crywan Industries",
    location: "Kenya",
    industry: "Food & Beverage",
    summary:
      "A long-running stainless tank installation for a Kenyan food and beverage operator. The reference our customers check before they sign.",
    imageSrc: "/images/home/crywan-reference-dusk.png",
    imageAlt:
      "Crywan Industries stainless processing tanks at dusk with operator silhouette",
    available: true,
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="The work answers the question"
        titleAccent="before the room asks it."
        subtitle="Reference clients in Kenya, photographed at the install, with consent. We publish what we supplied, what it cost in lead time, and what changed on the plant floor."
        imageSrc="/images/home/crywan-reference-dusk.png"
        imageAlt=""
        primaryCta={{ href: "/request-quote/", label: "Get a quote" }}
        secondaryCta={{ href: "/about/", label: "About us" }}
        metaLeft="Named references"
        metaRight="Consent-published"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Case Studies", href: "/case-studies/" },
          ]}
        />
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Reference work</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Building a reference network, one closed deal at a time.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {CASES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="press group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card border border-border/10"
            >
              <Image
                src={c.imageSrc}
                alt={c.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
                  {c.industry} · {c.location}
                </p>
                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl">
                  {c.client}
                </h3>
                <p className="text-xs leading-relaxed text-white/70">
                  {c.summary}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  Read case study
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-muted">
          Every closed deal becomes a candidate case study with the
          customer&apos;s consent. As the network grows, this page fills
          out.
        </p>
      </Section>

      <CtaBand
        headline="Want to be the next case study?"
        headlineAccent="Get a quote."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
