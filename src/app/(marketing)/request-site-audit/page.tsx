import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { InquiryForm } from "@/components/forms/inquiry-form";

export const metadata: Metadata = {
  title: "Request a Free Site Audit: Plants in Kenya",
  description:
    "We come to your Kenyan plant, measure, photograph the zones we care about, and leave you with a written brief. Five days to delivery. No charge, no commitment.",
  alternates: { canonical: "/request-site-audit/" },
  keywords: [
    "request site audit Kenya",
    "free industrial audit Nairobi",
    "Kenya plant audit",
    "ETP site audit Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Request a Free Site Audit: Plants in Kenya",
    description:
      "We come to your Kenyan plant, measure, photograph the zones we care about, and leave you with a written brief. Five days to delivery. No charge, no commitment.",
    url: "/request-site-audit/",
    images: [{ url: "/images/conversion/request-site-audit-hero.png" }],
  },
};

export default function RequestSiteAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Site Audit"
        title="Boots on the ground."
        titleAccent="Brief on your desk."
        subtitle="We walk your plant, measure, photograph the relevant zones, and leave you with a written brief. For Nairobi industrial estates, we can be on-site within 48 hours. No charge, no commitment from either side."
        imageSrc="/images/conversion/request-site-audit-hero.png"
        imageAlt=""
        metaLeft="48-hour response in Nairobi"
        metaRight="No charge for the audit"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Request a Site Audit", href: "/request-site-audit/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-4">
            <Eyebrow index="01">What we do on-site</Eyebrow>
            <TextReveal
              as="h2"
              className="font-display mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            >
              Three to four hours, depending on scope.
            </TextReveal>
            <Reveal stagger={0.05} yFrom={14}>
              <ul className="mt-8 flex flex-col text-sm text-muted">
                <li data-reveal-item className="hairline-b py-3.5">
                  Plant walkthrough with the operator
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Dimensional measurements of equipment zones
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Photographs (we leave a redacted set with you)
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Utility hook-up review (steam, CIP, drains, power)
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Compliance gap check (KEBS, fire, OSHA-style)
                </li>
                <li data-reveal-item className="hairline-b py-3.5">
                  Written brief, delivered within 5 working days
                </li>
              </ul>
            </Reveal>
          </aside>
          <div className="md:col-span-8">
            <Eyebrow index="02">Schedule the visit</Eyebrow>
            <TextReveal
              as="h2"
              className="font-display mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            >
              Tell us where the plant is and what to focus on.
            </TextReveal>
            <div className="font-mono-label mt-6 mb-8 flex flex-wrap items-center gap-3 text-[10px] text-faint">
              <span>48-hour response in Nairobi</span>
              <span aria-hidden className="hairline h-px min-w-8 flex-1" />
              <span>No charge for the audit</span>
            </div>
            <InquiryForm
              kind="site-audit"
              submitLabel="Book my free site audit"
              showSiteLocation
              showTopic
              showCapacity
              topicLabel="Scope of the audit"
              topicHint="What we should focus on (e.g. ETP train, tank farm, new line bay)."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
