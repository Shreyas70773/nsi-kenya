import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";

export const metadata: Metadata = {
  title: "We've got your request",
  description: "Your request is in. We respond within 48 working hours.",
  alternates: { canonical: "/request-quote/success/" },
  robots: { index: false, follow: false },
};

export default function QuoteSuccessPage() {
  return (
    <>
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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>What happens next</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Three working steps.
            </h2>
          </div>
          <div className="md:col-span-7">
            <ol className="divide-y divide-border/10 border-y border-border/10">
              <li className="grid grid-cols-12 gap-4 py-6 md:gap-6">
                <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                  01
                </span>
                <p className="col-span-10 text-sm text-text md:col-span-11">
                  Engineering reads the brief and any products you ticked.
                </p>
              </li>
              <li className="grid grid-cols-12 gap-4 py-6 md:gap-6">
                <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                  02
                </span>
                <p className="col-span-10 text-sm text-text md:col-span-11">
                  We come back with a spec, capacity, lead time, and a
                  ballpark figure where possible. If the brief is light,
                  we'll ask the gap-filling questions first.
                </p>
              </li>
              <li className="grid grid-cols-12 gap-4 py-6 md:gap-6">
                <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                  03
                </span>
                <p className="col-span-10 text-sm text-text md:col-span-11">
                  If you'd rather talk, we'll suggest a 30-minute working
                  call with the engineer who would actually scope your
                  project.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          <Link
            href="/products/"
            className="press group flex items-center justify-between gap-4 rounded-card border border-border/15 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono-label text-[10px] text-accent">
                While you wait
              </span>
              <h3 className="font-display text-xl font-medium tracking-tight">
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
            className="press group flex items-center justify-between gap-4 rounded-card border border-border/15 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono-label text-[10px] text-accent">
                Or look at
              </span>
              <h3 className="font-display text-xl font-medium tracking-tight">
                Inside our workshop
              </h3>
            </div>
            <ArrowRight
              className="h-5 w-5 text-text transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </div>
      </Section>
    </>
  );
}
