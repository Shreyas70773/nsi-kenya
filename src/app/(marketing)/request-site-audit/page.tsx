import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
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
            <Eyebrow>What we do on-site</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Three to four hours, depending on scope.
            </h2>
            <ul className="mt-8 flex flex-col gap-4 text-sm text-muted">
              <li>· Plant walkthrough with the operator</li>
              <li>· Dimensional measurements of equipment zones</li>
              <li>· Photographs (we leave a redacted set with you)</li>
              <li>· Utility hook-up review (steam, CIP, drains, power)</li>
              <li>· Compliance gap check (KEBS, fire, OSHA-style)</li>
              <li>· Written brief, delivered within 5 working days</li>
            </ul>
          </aside>
          <div className="md:col-span-8">
            <Eyebrow>Schedule the visit</Eyebrow>
            <h2 className="font-display mt-3 mb-8 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Tell us where the plant is and what to focus on.
            </h2>
            <InquiryForm
              kind="site-audit"
              submitLabel="Request site visit"
              showSiteLocation
              showTopic
              topicLabel="Scope of the audit"
              topicHint="What we should focus on (e.g. ETP train, tank farm, new line bay)."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
