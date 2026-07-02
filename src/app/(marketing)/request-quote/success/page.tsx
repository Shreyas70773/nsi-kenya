import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ThankYouTracker } from "@/components/analytics/thank-you-tracker";

export const metadata: Metadata = {
  title: "We've got your request",
  description: "Your request is in. We respond within 48 working hours.",
  alternates: { canonical: "/request-quote/success/" },
  robots: { index: false, follow: false },
};

export default function QuoteSuccessPage() {
  return (
    <>
      {/* Contact-form submissions land here (quote/consult/audit have their
          own thank-you pages, GC-7); this emits their generate_lead. */}
      <ThankYouTracker journey="contact" />
      <PageHero
        eyebrow="Submitted"
        title="We've got it."
        titleAccent="Engineering takes it from here."
        subtitle="Your request landed with our team in Nairobi. We respond within 48 working hours, typically faster during business hours East African Time. Check your inbox; we'll reply to the email you gave us."
        imageSrc="/images/conversion/request-quote-success-hero.png"
        imageAlt=""
        primaryCta={{ href: "/", label: "Back to home" }}
        secondaryCta={{ href: "/products/", label: "Browse products" }}
        metaLeft="Inbound captured"
        metaRight="Reply on the way"
      />

      <Section>
        <div className="flex flex-col gap-5">
          <Eyebrow index="01">What happens next</Eyebrow>
          <TextReveal
            as="h2"
            className="font-display max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
          >
            <>
              Your request is in.{" "}
              <span className="text-accent">Three working steps.</span>
            </>
          </TextReveal>
        </div>
        <Reveal stagger={0.08}>
          <ol className="mt-12 max-w-3xl divide-y divide-border/10 border-y border-border/10 md:mt-16">
            <li data-reveal-item className="grid grid-cols-12 gap-4 py-6 md:gap-6">
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                01
              </span>
              <p className="col-span-10 text-sm text-text md:col-span-11">
                Engineering reads the brief and any products you ticked.
              </p>
            </li>
            <li data-reveal-item className="grid grid-cols-12 gap-4 py-6 md:gap-6">
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                02
              </span>
              <p className="col-span-10 text-sm text-text md:col-span-11">
                We come back with a spec, capacity, lead time, and a
                ballpark figure where possible. If the brief is light,
                we&apos;ll ask the gap-filling questions first.
              </p>
            </li>
            <li data-reveal-item className="grid grid-cols-12 gap-4 py-6 md:gap-6">
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                03
              </span>
              <p className="col-span-10 text-sm text-text md:col-span-11">
                If you&apos;d rather talk, we&apos;ll suggest a 30-minute working
                call with the engineer who would actually scope your
                project.
              </p>
            </li>
          </ol>
        </Reveal>
      </Section>

      <Section theme="paper" bordered>
        <Reveal stagger={0.08}>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <Link
              href="/products/"
              data-reveal-item
              data-cursor="view"
              className="press group flex items-center justify-between gap-4 rounded-card border border-border/15 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono-label text-[10px] text-accent">
                  While you wait
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  Browse the product catalogue
                </h3>
              </div>
              <ArrowRight
                className="h-5 w-5 text-text transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
            <Link
              href="/about/local-manufacturing/"
              data-reveal-item
              data-cursor="view"
              className="press group flex items-center justify-between gap-4 rounded-card border border-border/15 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono-label text-[10px] text-accent">
                  Or look at
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  Inside our workshop
                </h3>
              </div>
              <ArrowRight
                className="h-5 w-5 text-text transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
