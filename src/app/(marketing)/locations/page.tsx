import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";

export const metadata: Metadata = {
  title: "Kenya Delivery & On-Site Supply",
  description:
    "Workshop in Nairobi, flatbed delivery across Kenya, install supervision included. 48-hour on-site response in Nairobi industrial estates.",
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
      "Workshop in Nairobi, flatbed delivery across Kenya, install supervision included. 48-hour on-site response in Nairobi industrial estates.",
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

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>Where we are</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Nairobi, with the country in delivery range.
            </h2>
          </div>
          <div className="md:col-span-7">
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
            <Link
              href="/locations/nairobi/"
              className="press mt-6 inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
            >
              See the Nairobi page
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
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
