import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { InquiryForm } from "@/components/forms/inquiry-form";

export const metadata: Metadata = {
  title: "Book a Consultation with Our Engineering Team",
  description:
    "A 30-minute working call with the engineer who would scope your Kenyan tank, silo, or instrument project. Bring your constraints; we bring our approach.",
  alternates: { canonical: "/book-consultation/" },
  keywords: [
    "book engineering consultation Kenya",
    "Kenya tank engineering call",
    "Nairobi industrial engineer consultation",
    "free industrial consultation Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Book a Consultation with Our Engineering Team",
    description:
      "A 30-minute working call with the engineer who would scope your Kenyan tank, silo, or instrument project. Bring your constraints; we bring our approach.",
    url: "/book-consultation/",
    images: [{ url: "/images/conversion/book-consultation-hero.png" }],
  },
};

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title="A working call with"
        titleAccent="the engineer who would scope your project."
        subtitle="Thirty minutes, no slide deck. Bring your constraints, your plant layout if you have one, and the question you can't answer without an engineer. We'll come back with the approach we'd take."
        imageSrc="/images/conversion/book-consultation-hero.png"
        imageAlt=""
        metaLeft="30 minutes"
        metaRight="No commitment from either side"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Book a Consultation", href: "/book-consultation/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-4">
            <Eyebrow index="01">What we cover</Eyebrow>
            <TextReveal
              as="h2"
              className="font-display mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            >
              Working call, not sales call.
            </TextReveal>
            <Reveal stagger={0.05} yFrom={14}>
              <ul className="mt-8 flex flex-col text-sm text-muted">
                <li data-reveal-item className="hairline-b py-3.5">
                  Plant layout review (if you can share one)
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Material selection (304 vs 316L vs epoxy vs zinc aluminium)
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Instrument loop topology
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Lead-time scenario planning
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Compliance posture (ASME, AWS)
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Remote monitoring scope
                </li>
              </ul>
            </Reveal>
          </aside>
          <div className="md:col-span-8">
            <Eyebrow index="02">Schedule the call</Eyebrow>
            <TextReveal
              as="h2"
              className="font-display mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            >
              Tell us what you&apos;d like to work through.
            </TextReveal>
            <div className="font-mono-label mt-6 mb-8 flex flex-wrap items-center gap-3 text-[10px] text-faint">
              <span>30 minutes</span>
              <span aria-hidden className="hairline h-px min-w-8 flex-1" />
              <span>No commitment from either side</span>
            </div>
            <InquiryForm
              kind="consultation"
              submitLabel="Book my consultation"
              showTopic
              showCapacity
              topicLabel="Topic for the call"
              topicHint="Roughly what you'd like to scope. We'll come back with two or three time slots."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
