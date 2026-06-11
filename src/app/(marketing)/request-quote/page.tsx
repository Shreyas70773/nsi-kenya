import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata: Metadata = {
  title: "Request a Quote: Tanks, Silos, Instruments Kenya",
  description:
    "Tell us what you're building. We come back with a specification, capacity, and lead time within 48 working hours for tanks, silos, structural, and instrument projects in Kenya.",
  alternates: { canonical: "/request-quote/" },
  keywords: [
    "request quote tank Kenya",
    "Kenya silo quote",
    "industrial equipment quote Kenya",
    "Nairobi engineering quote",
    "ETP project quote Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Request a Quote: Tanks, Silos, Instruments Kenya",
    description:
      "Tell us what you're building. We come back with a specification, capacity, and lead time within 48 working hours for tanks, silos, structural, and instrument projects in Kenya.",
    url: "/request-quote/",
    images: [{ url: "/images/conversion/request-quote-hero.png" }],
  },
};

const INTENT_SHORTCUTS = [
  {
    href: "/request-quote/explore/",
    label: "Exploring options",
    copy: "Early stage. You're scoping and want a directional spec.",
  },
  {
    href: "/request-quote/evaluate/",
    label: "Technical evaluation",
    copy: "Comparing suppliers. You need a detailed spec and pricing.",
  },
  {
    href: "/request-quote/purchase/",
    label: "Ready to purchase",
    copy: "Approved budget, decision-maker on the chain.",
  },
  {
    href: "/request-quote/urgent-etp/",
    label: "Urgent ETP deadline",
    copy: "Compliance pressure. Expedited delivery available.",
  },
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Tell us what you're building."
        titleAccent="We'll come back in 48 hours."
        subtitle="Pick the intent that matches your stage; the form below adapts. If you're not sure which to pick, leave it on Exploring options; we'll figure out the rest from your brief."
        imageSrc="/images/conversion/request-quote-hero.png"
        imageAlt=""
        metaLeft="48-hour response"
        metaRight="Engineering team in Nairobi"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Request a Quote", href: "/request-quote/" },
          ]}
        />
      </Section>

      <Section>
        <SectionHeader
          index="01"
          eyebrow="Shortcuts by stage"
          title="Pick where you are. The form is the same; the intent helps us route faster."
        />
        <Reveal stagger={0.08}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
            {INTENT_SHORTCUTS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                data-reveal-item
                data-cursor="view"
                className="press group flex flex-col gap-2 rounded-card border border-border/10 bg-surface p-6 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
              >
                <span className="font-mono-label text-[10px] text-accent">
                  Intent
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {s.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{s.copy}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-text transition-transform duration-300 group-hover:translate-x-1">
                  Use this intent
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section theme="paper" bordered>
        <SectionHeader
          index="02"
          eyebrow="Or fill it in here"
          title="One form, four intents."
        />
        <div className="max-w-3xl">
          <div className="font-mono-label mb-8 flex flex-wrap items-center gap-3 text-[10px] text-faint">
            <span>Response within 48 working hours</span>
            <span aria-hidden className="hairline h-px min-w-8 flex-1" />
            <span>Engineering team in Nairobi</span>
          </div>
          <QuoteForm />
        </div>
      </Section>
    </>
  );
}
