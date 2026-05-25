import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us what you're building. We'll come back with a specification, capacity, and lead time within 48 working hours.",
  alternates: { canonical: "/request-quote/" },
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
        imageSrc="/images/home/sector-fnb.png"
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
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Shortcuts by stage</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Pick where you are. The form is the same; the intent helps us
            route faster.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
          {INTENT_SHORTCUTS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="press group flex flex-col gap-2 rounded-card border border-border/10 bg-surface p-6 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text)/0.18)]"
            >
              <span className="font-mono-label text-[10px] text-accent">
                Intent
              </span>
              <h3 className="font-display text-xl font-medium tracking-tight">
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
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Or fill it in here</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            One form, four intents.
          </h2>
        </div>
        <div className="max-w-3xl">
          <QuoteForm />
        </div>
      </Section>
    </>
  );
}
