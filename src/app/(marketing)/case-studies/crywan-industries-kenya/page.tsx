import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { SpecTable } from "@/components/primitives/spec-table";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { articleLd, productLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Crywan Industries — Stainless Tank Installation",
  description:
    "Reference case: long-running stainless steel tank installation for Crywan Industries, a Kenyan food and beverage operator. What we supplied, when, and what changed.",
  alternates: {
    canonical: "/case-studies/crywan-industries-kenya/",
  },
};

const PROJECT_FACTS = [
  { label: "Client", value: "Crywan Industries" },
  { label: "Location", value: "Kenya" },
  { label: "Industry", value: "Food & Beverage" },
  { label: "Scope", value: "Stainless steel processing and storage tanks" },
  { label: "Material grades", value: "304 (general), 316L (acid-contact)" },
  { label: "Engagement model", value: "Equipment supply, install, ongoing support" },
  { label: "Status", value: "Operating; ongoing reference engagement" },
] as const;

export default function CrywanCaseStudyPage() {
  const articleUrl = `${SITE_URL}/case-studies/crywan-industries-kenya/`;
  return (
    <>
      <JsonLd
        data={articleLd({
          headline: "Crywan Industries — stainless tank installation, Kenya",
          datePublished: "2026-05-25",
          url: articleUrl,
          description:
            "Reference case: stainless steel tank installation for a Kenyan food and beverage operator.",
        })}
      />
      <JsonLd
        data={productLd({
          name: "Stainless Steel Tanks installed at Crywan Industries",
          material: "Stainless Steel 304 / 316L",
          category: "Industrial Tank Installation",
          description:
            "Operating stainless tank installation supporting Crywan Industries' F&B processing operations.",
          url: articleUrl,
        })}
      />

      <PageHero
        eyebrow="Case Study"
        title="Crywan Industries:"
        titleAccent="the Kenya reference."
        subtitle="An operating stainless tank install for a Kenyan food and beverage operator. The reference our customers check before they sign with us."
        imageSrc="/images/home/crywan-reference-dusk.png"
        imageAlt="Crywan Industries stainless processing tanks at dusk, plant operator silhouette walking past"
        primaryCta={{ href: "/request-quote/", label: "Spec a similar project" }}
        secondaryCta={{ href: "/products/tanks/stainless-steel/", label: "Stainless tanks" }}
        metaLeft="Kenya · F&B"
        metaRight="304 + 316L stainless · operating"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Case Studies", href: "/case-studies/" },
            {
              label: "Crywan Industries",
              href: "/case-studies/crywan-industries-kenya/",
            },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Project facts</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-2xl font-medium leading-tight tracking-tight md:text-3xl">
              The install at a glance.
            </h2>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={PROJECT_FACTS} />
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>The brief</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Process capacity that scales with the brand.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Crywan came to us with a brief that's typical for a
                growing Kenyan F&B operator: existing processing capacity
                was at ceiling, demand was outstripping the line, and the
                cost of importing replacement vessels was both slow and
                exposed to currency risk.
              </p>
              <p>
                They needed stainless tanks built to food-grade
                specification, with sanitary fittings, CIP coverage that
                tied into existing utility headers, and a lead time short
                enough to land before peak season.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What we supplied</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Stainless processing and storage tanks, fabricated locally.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                304 stainless for the general processing path, 316L for
                acid-contact and CIP-acid duty. TIG-welded with argon
                backing, dye-penetrant tested, finished to food-grade Ra
                on all internal surfaces.
              </p>
              <p>
                Sanitary tri-clamp manways, CIP spray balls, and pre-
                tapped instrument ports for level, temperature, and pH on
                every vessel. Ex-works delivery direct to Crywan&apos;s
                plant on flatbed.
              </p>
              <p>
                Install supervision was on-site through commissioning;
                ongoing support is on retainer.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="overflow-hidden rounded-card border border-border/10">
          <div className="relative aspect-[16/9]">
            <Image
              src="/images/home/crywan-reference-dusk.png"
              alt="Crywan Industries stainless tank installation at dusk"
              fill
              sizes="(min-width: 1024px) 60rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>The outcome</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Operating, scaling, and named openly as our reference.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                The install is operating, the relationship is ongoing, and
                Crywan is comfortable being named as our Kenya reference
                client. That last part matters: the question every Kenyan
                buyer asks first is &quot;have you done this here?&quot;
                Crywan answers it before we have to.
              </p>
            </Prose>
            <div className="mt-8 rounded-card border border-accent/25 bg-accent/8 p-6 md:p-7">
              <p className="font-mono-label text-[10px] text-accent">
                ⟶ Reference posture
              </p>
              <p className="mt-3 text-base leading-relaxed text-text md:text-lg">
                Crywan is open about being installed by us. When a Kenyan
                buyer asks for proof of local work, this case is the
                opening answer.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Got a similar brief?"
        headlineAccent="Get a quote in 48 hours."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
