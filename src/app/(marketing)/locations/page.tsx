import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export const metadata: Metadata = {
  title: "Kenya Delivery & On-Site Supply",
  description:
    "Workshop in Nairobi, flatbed delivery across all of Kenya, with install supervision included. 48-hour on-site response across Nairobi industrial estates.",
  alternates: { canonical: "/locations/" },
  keywords: [
    "tank supplier Kenya delivery",
    "industrial delivery Kenya",
    "Nairobi workshop",
    "Kenya install supervision",
    "Athi River Mombasa Road delivery",
  ],
  openGraph: {
    type: "website",
    title: "Kenya Delivery & On-Site Supply",
    description:
      "Workshop in Nairobi, flatbed delivery across all of Kenya, with install supervision included. 48-hour on-site response across Nairobi industrial estates.",
    url: "/locations/",
    images: [{ url: "/images/locations/locations-overview-hero.png" }],
  },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Workshop in Nairobi."
        titleAccent="Delivery across Kenya."
        subtitle="The team and the workshop are in Nairobi. From there we ship to industrial sites anywhere in Kenya, with install supervision included."
        imageSrc="/images/locations/locations-overview-hero.png"
        imageAlt=""
        primaryCta={{ href: "/locations/nairobi/", label: "About Nairobi" }}
        secondaryCta={{ href: "/request-quote/", label: "Get a quote" }}
        metaLeft="Nairobi base"
        metaRight="Nationwide delivery"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations/" },
          ]}
        />
      </Section>

      <Section ariaLabel="Where we are">
        <SectionHeader
          index="01"
          eyebrow="Where we are"
          title="Nairobi, with the country"
          titleAccent="in delivery range."
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7 md:col-start-6">
            <Reveal stagger={0.08}>
              <div data-reveal-item>
                <Prose>
                  <p>
                    Our workshop and engineering team sit in the Nairobi
                    industrial belt. We deliver across Kenya by flatbed, and
                    install supervision is part of every project.
                  </p>
                  <p>
                    For Nairobi industrial estates the typical response time
                    is 48 hours from call to site. For the rest of Kenya it
                    depends on the route and the project scope, and is
                    usually a few days for delivery and the same for
                    supervision arrival.
                  </p>
                </Prose>
              </div>
              <div data-reveal-item className="mt-6">
                <Magnetic strength={0.2}>
                  <Link
                    href="/locations/nairobi/"
                    data-cursor="view"
                    className="press group inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
                  >
                    See the Nairobi page
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.2}
                    />
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Site anywhere in Kenya?"
        headlineAccent="Tell us where and we'll come."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
