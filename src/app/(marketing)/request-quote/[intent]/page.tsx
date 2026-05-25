import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { QuoteForm } from "@/components/forms/quote-form";

type Intent = "explore" | "evaluate" | "purchase" | "urgent-etp";

const INTENT_META: Record<
  Intent,
  {
    label: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    metaLeft: string;
    metaRight: string;
    hero: string;
    breadcrumb: string;
  }
> = {
  explore: {
    label: "Explore",
    title: "Early stage exploration."
,
    titleAccent: "We'll keep it directional.",
    subtitle:
      "You're scoping and want a directional spec, not a final quote yet. Sketch the brief in the message; we'll come back with capacity, materials, and ballpark lead time within 48 working hours.",
    metaLeft: "Intent: explore",
    metaRight: "48-hour response",
    hero: "/images/conversion/request-quote-explore-hero.png",
    breadcrumb: "Explore",
  },
  evaluate: {
    label: "Evaluate",
    title: "Technical evaluation."
,
    titleAccent: "Detailed spec and pricing.",
    subtitle:
      "You're comparing suppliers and need a real spec sheet with pricing. Tell us materials, capacity, fittings, lead-time pressure, and any standards you're working to.",
    metaLeft: "Intent: evaluate",
    metaRight: "Detailed quote within 48 hours",
    hero: "/images/conversion/request-quote-evaluate-hero.png",
    breadcrumb: "Evaluate",
  },
  purchase: {
    label: "Purchase",
    title: "Ready to purchase."
,
    titleAccent: "Move to PO this week.",
    subtitle:
      "Budget approved, decision-maker on the chain, ready to PO. We'll come back with a quotation, lead time confirmation, and the contract framework inside one business day.",
    metaLeft: "Intent: purchase",
    metaRight: "Same-day quotation",
    hero: "/images/conversion/request-quote-purchase-hero.png",
    breadcrumb: "Purchase",
  },
  "urgent-etp": {
    label: "Urgent ETP",
    title: "Compliance deadline pressure."
,
    titleAccent: "Expedited ETP supply.",
    subtitle:
      "NEMA inspection on the horizon or discharge parameters out of spec. We expedite ETP equipment, including epoxy-lined tanks and multi-parameter analyzers, in 2 to 3 weeks where possible.",
    metaLeft: "Intent: urgent ETP",
    metaRight: "2 to 3 week expedited delivery",
    hero: "/images/home/sector-etp.png",
    breadcrumb: "Urgent ETP",
  },
};

const INTENTS: readonly Intent[] = [
  "explore",
  "evaluate",
  "purchase",
  "urgent-etp",
];

export function generateStaticParams() {
  return INTENTS.map((intent) => ({ intent }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ intent: string }>;
}): Promise<Metadata> {
  const { intent } = await params;
  if (!INTENTS.includes(intent as Intent)) {
    return {
      title: "Request a Quote",
      description: "Tell us what you're building.",
    };
  }
  const meta = INTENT_META[intent as Intent];
  return {
    title: `Request a Quote, ${meta.label}`,
    description: meta.subtitle,
    alternates: { canonical: `/request-quote/${intent}/` },
  };
}

export default async function RequestQuoteIntentPage({
  params,
}: {
  params: Promise<{ intent: string }>;
}) {
  const { intent } = await params;
  if (!INTENTS.includes(intent as Intent)) {
    notFound();
  }
  const i = intent as Intent;
  const meta = INTENT_META[i];

  return (
    <>
      <PageHero
        eyebrow={`Request a Quote / ${meta.label}`}
        title={meta.title}
        titleAccent={meta.titleAccent}
        subtitle={meta.subtitle}
        imageSrc={meta.hero}
        imageAlt=""
        metaLeft={meta.metaLeft}
        metaRight={meta.metaRight}
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Request a Quote", href: "/request-quote/" },
            { label: meta.breadcrumb, href: `/request-quote/${i}/` },
          ]}
        />
      </Section>

      <Section>
        <div className="mb-8 flex flex-col gap-3">
          <Eyebrow>Form</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Tell us what you need.
          </h2>
        </div>
        <div className="max-w-3xl">
          <QuoteForm defaultIntent={i} showIntentSelector={false} />
        </div>
      </Section>
    </>
  );
}
