import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
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
            <Eyebrow>What we cover</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Working call, not sales call.
            </h2>
            <ul className="mt-8 flex flex-col gap-4 text-sm text-muted">
              <li>· Plant layout review (if you can share one)</li>
              <li>· Material selection (304 vs 316L vs epoxy vs zinc-alum)</li>
              <li>· Instrument loop topology</li>
              <li>· Lead-time scenario planning</li>
              <li>· Compliance posture (NEMA, KEBS, ASME, AWS)</li>
              <li>· Optional remote monitoring scope</li>
            </ul>
          </aside>
          <div className="md:col-span-8">
            <Eyebrow>Schedule the call</Eyebrow>
            <h2 className="font-display mt-3 mb-8 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Tell us what you'd like to work through.
            </h2>
            <InquiryForm
              kind="consultation"
              submitLabel="Request consultation"
              showTopic
              topicLabel="Topic for the call"
              topicHint="Roughly what you'd like to scope. We'll come back with two or three time slots."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
