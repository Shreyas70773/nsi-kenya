import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { SpecTable } from "@/components/primitives/spec-table";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { productLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Feed Silo Kenya: 5 to 100 MT for Mills & Farms",
  description:
    "Galvanised feed storage silos for Kenyan poultry, feed mills, and dairy farms. 5 to 100 MT, hopper discharge or sweep auger, flexible-auger intake.",
  alternates: { canonical: "/products/silos/feed-storage/" },
  keywords: [
    "feed silo Kenya",
    "poultry feed silo Kenya",
    "animal feed silo Nairobi",
    "feed mill silo Kenya",
    "dairy farm feed silo Kenya",
    "hopper feed silo Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Feed Silo Kenya: 5 to 100 MT for Mills & Farms",
    description:
      "Galvanised feed storage silos for Kenyan poultry, feed mills, and dairy farms. 5 to 100 MT, hopper discharge or sweep auger, flexible-auger intake.",
    url: "/products/silos/feed-storage/",
    images: [{ url: "/images/products/silos-feed-storage-hero.png" }],
  },
};

const SPECS = [
  { label: "Material", value: "Hot-dip galvanised steel, corrugated or smooth wall" },
  { label: "Capacity range", value: "5 to 100", unit: "MT" },
  { label: "Diameter range", value: "2 to 5", unit: "m" },
  { label: "Discharge", value: "45° hopper for clean gravity flow, or sweep auger for flat-bottom" },
  { label: "Intake", value: "Flexible auger or pneumatic top-fill, sized to your feed truck" },
  { label: "Inspection access", value: "Lockable manway, internal ladder, exterior ladder with cage" },
  { label: "Inventory", value: "Optional radar or load-cell level reading, connects to the monitoring app" },
  { label: "Foundation", value: "Concrete pad with anchor bolts, drawing supplied with quote" },
  { label: "Lead time, Kenya", value: "6 to 10 weeks ex-works, plus on-site assembly" },
] as const;

const APPLICATIONS = [
  {
    title: "Poultry operations",
    copy: "Layer and broiler farms with their own feed-mixing capability. Typical sizing: 5 to 20 MT per silo, often in a row of two to four.",
  },
  {
    title: "Feed mills",
    copy: "Finished-feed dispatch silos sized to truck pick-up cycles. Typical sizing: 20 to 100 MT per silo.",
  },
  {
    title: "Dairy farms",
    copy: "On-farm feed storage for milking herds. Sized to weekly intake; sweep auger for clean discharge into mixer wagons.",
  },
];

export default function FeedStorageSilosPage() {
  return (
    <>
      <JsonLd
        data={productLd({
          name: "Feed Storage Silos",
          material: "Hot-dip galvanised steel",
          category: "Industrial Silo",
          description:
            "Bulk feed storage silos for poultry, feed mills, and dairy farms in Kenya. 5 to 100 MT.",
          url: `${SITE_URL}/products/silos/feed-storage/`,
        })}
      />

      <PageHero
        eyebrow="Silos / Feed Storage"
        title="Feed storage,"
        titleAccent="sized to your throughput."
        subtitle="Galvanised feed silos for poultry, feed mills, and dairy farms. Hopper discharge or sweep auger, flexible-auger or pneumatic intake. Sized from 5 to 100 MT per silo."
        imageSrc="/images/products/silos-feed-storage-hero.png"
        imageAlt="Two galvanised feed silos at a Kenyan feed mill or poultry operation"
        primaryCta={{ href: "/request-quote/", label: "Spec a feed silo" }}
        secondaryCta={{ href: "/products/silos/", label: "All silo types" }}
        metaLeft="5 to 100 MT per silo"
        metaRight="Galvanised · Hopper or flat-bottom"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/" },
            { label: "Silos", href: "/products/silos/" },
            { label: "Feed Storage", href: "/products/silos/feed-storage/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What it is</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Storage that fits the truck cycle, not the other way round.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Feed silos look simple, but the spec lives in the
                discharge and intake. The wrong hopper angle means feed
                rat-holes and operators have to climb in with a rake.
                The wrong intake means a feed truck queue blocks the
                yard.
              </p>
              <p>
                We size the hopper angle, the discharge port diameter,
                and the intake throughput against the actual feed type
                and truck cycle you operate. The base silo is hot-dip
                galvanised steel; aeration and level instrumentation
                are options for the longer storage cycles.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              The base spec, your overlays.
            </h2>
          </div>
          <div className="md:col-span-8">
            <SpecTable rows={SPECS} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Applications</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Where feed silos earn their place.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {APPLICATIONS.map((a) => (
            <div
              key={a.title}
              className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 md:p-7"
            >
              <h3 className="font-display text-xl font-medium tracking-tight">
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{a.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        headline="Got a feed cycle to match?"
        headlineAccent="We size silos to it, not the other way."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
