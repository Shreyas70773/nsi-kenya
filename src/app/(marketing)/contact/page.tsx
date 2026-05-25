import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach North Star Impex Kenya. Email, phone, or send a message via the form. We respond within 48 working hours.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="The fastest path"
        titleAccent="is the phone."
        subtitle="If you'd rather talk than type, the number's below. Otherwise the form goes straight to our engineering team in Nairobi."
        imageSrc="/images/conversion/contact-hero.png"
        imageAlt=""
        primaryCta={{ href: `mailto:${CONTACT_EMAIL}`, label: "Email us" }}
        secondaryCta={{
          href: `tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`,
          label: "Call us",
        }}
        metaLeft={CONTACT_EMAIL}
        metaRight={CONTACT_PHONE}
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-4">
            <Eyebrow>Direct</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Three ways in.
            </h2>
            <dl className="mt-8 flex flex-col gap-6 text-sm">
              <div className="flex flex-col gap-1">
                <dt className="font-mono-label text-[10px] text-faint">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-text underline underline-offset-2 hover:text-accent"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono-label text-[10px] text-faint">
                  Phone
                </dt>
                <dd>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`}
                    className="text-text underline underline-offset-2 hover:text-accent"
                  >
                    {CONTACT_PHONE}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono-label text-[10px] text-faint">
                  Workshop
                </dt>
                <dd className="text-text">Nairobi industrial belt, Kenya</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono-label text-[10px] text-faint">
                  Response time
                </dt>
                <dd className="text-muted">
                  Within 48 working hours. Same-day for urgent inquiries
                  during business hours, EAT.
                </dd>
              </div>
            </dl>
          </aside>
          <div className="md:col-span-8">
            <Eyebrow>Form</Eyebrow>
            <h2 className="font-display mt-3 mb-8 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Tell us what you're working on.
            </h2>
            <InquiryForm kind="contact" submitLabel="Send message" />
          </div>
        </div>
      </Section>
    </>
  );
}
