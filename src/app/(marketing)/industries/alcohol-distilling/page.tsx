import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Alcohol & Distilling",
  description:
    "Stainless fermenters, mash and lauter tuns, distillation column supports, grain silos, and instrument loops for Kenyan craft and industrial breweries and distilleries.",
  alternates: { canonical: "/industries/alcohol-distilling/" },
};

const SUB_APPS = [
  {
    title: "Craft brewing",
    copy: "Mash tuns, lauter tuns, fermenters, bright tanks, malt silos sized for craft volumes (50 to 500 HL).",
    fit: "SS 304/316L, grain silos, level + temp + pressure",
  },
  {
    title: "Industrial brewing",
    copy: "Larger fermenters, bright tanks, and supporting structural fabrication for breweries operating at 5,000 HL+ capacity.",
    fit: "SS 304/316L, large silos, full instrument stack, structural",
  },
  {
    title: "Distilling",
    copy: "Pot still pedestals, condenser supports, intermediate spirit tanks. Fabrication around your column geometry.",
    fit: "SS 304/316L, structural, temperature + pressure instruments",
  },
  {
    title: "Containment and effluent",
    copy: "Spent-grain handling, bottling-line effluent collection, CIP caustic recovery tanks.",
    fit: "Epoxy-lined tanks, ETP equipment if discharge-side",
  },
];

const TRIGGERS = [
  {
    title: "Brand scale-up",
    copy: "Product is moving and the line is at ceiling. New fermenters, bright tanks, and the silos to feed them.",
  },
  {
    title: "New SKU introduction",
    copy: "Premium-line, lager-to-stout expansion, or a seasonal product. Spec is usually material-driven (sanitary fittings, jacketed temperature control).",
  },
  {
    title: "Distillery containment",
    copy: "Spirit storage capacity, bonded warehouse, condenser cooling water tanks. Compliance-and-safety driven.",
  },
  {
    title: "Effluent compliance",
    copy: "Brewery and distillery effluent is high-strength. Triggers ETP scope when the local regulator notices.",
  },
];

export default function AlcoholDistillingPage() {
  return (
    <>
      <JsonLd
        data={serviceLd({
          slug: "alcohol-distilling",
          name: "Alcohol & Distilling Equipment",
        })}
      />

      <PageHero
        eyebrow="Industries / Alcohol & Distilling"
        title="Equipment for Kenya's"
        titleAccent="brewing and distilling growth."
        subtitle="Fermenters, mash tuns, bright tanks, malt silos, distillation supports, and the structural and instrument equipment around them. Sized from craft (50 HL) to industrial (5,000 HL+)."
        imageSrc="/images/industries/alcohol-distilling-hero.png"
        imageAlt="A row of large stainless fermentation tanks at a Kenyan brewery with cooling jackets and sample valves"
        primaryCta={{ href: "/request-quote/", label: "Spec a brewing project" }}
        secondaryCta={{
          href: "/products/tanks/stainless-steel/",
          label: "Stainless tanks",
        }}
        metaLeft="Craft to industrial"
        metaRight="50 to 5,000+ HL"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries/" },
            {
              label: "Alcohol & Distilling",
              href: "/industries/alcohol-distilling/",
            },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>The buying frame</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Brewery scale-up is a happy buyer. Distillery scale-up is a
              careful one.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Brewing buyers tend to be in growth mode. The line is
                at ceiling, the brand is moving, and capacity needs to
                land before the next peak season. The spec is
                straightforward: sanitary stainless, the right jacket
                geometry for temperature control, fittings that match
                the existing CIP loop.
              </p>
              <p>
                Distillery buyers are more careful. Containment matters,
                bonded-warehouse requirements matter, and the buying
                conversation often involves a regulator. We work the
                same equipment scope either way; the difference is in
                the documentation we issue alongside the equipment.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Sub-applications</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Four scope buckets.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
          {SUB_APPS.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 md:p-7"
            >
              <h3 className="font-display text-xl font-medium tracking-tight">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{s.copy}</p>
              <p className="font-mono-label mt-1 text-[10px] text-accent">
                Equipment fit: {s.fit}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Buying triggers</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Four reasons brewing and distilling operators call us.
          </h2>
        </div>
        <ol className="divide-y divide-border/10 border-y border-border/10">
          {TRIGGERS.map((t, i) => (
            <li
              key={t.title}
              className="grid grid-cols-12 gap-4 py-6 md:gap-6 md:py-8"
            >
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display col-span-10 text-xl font-medium tracking-tight md:col-span-3 md:text-2xl">
                {t.title}
              </h3>
              <p className="col-span-12 text-sm text-muted md:col-span-8">
                {t.copy}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        headline="Scaling a brewery or distillery?"
        headlineAccent="We've shipped the stack."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
