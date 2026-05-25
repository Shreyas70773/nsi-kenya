import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Nairobi",
  description:
    "Industrial tank, silo, instrument, and structural supply across Nairobi industrial estates: Athi River, Ruiru, Mlolongo, Industrial Area, Mombasa Road, Tatu City, Thika Road. 48-hour on-site response.",
  alternates: { canonical: "/locations/nairobi/" },
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

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>Why Nairobi-deep matters</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The plant manager wants the supplier who already knows the
              roads.
            </h2>
          </div>
          <div className="md:col-span-7">
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
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Industrial estates we serve</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Seven estates, every gate.
          </h2>
        </div>
        <ol className="divide-y divide-border/10 border-y border-border/10">
          {ESTATES.map((e, i) => (
            <li
              key={e.name}
              className="grid grid-cols-12 gap-4 py-6 md:gap-6 md:py-8"
            >
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display col-span-10 text-xl font-medium tracking-tight md:col-span-4 md:text-2xl">
                {e.name}
              </h3>
              <p className="col-span-12 text-sm text-muted md:col-span-7">
                {e.note}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        headline="Site in Nairobi?"
        headlineAccent="We can be there by Friday."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
