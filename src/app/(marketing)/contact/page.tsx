import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact: Email, Phone, or Form",
  description:
    "Reach our Nairobi engineering team by email, phone, or the form below. 48-hour working response. Tank, silo, instrument, and ETP project inquiries welcome.",
  alternates: { canonical: "/contact/" },
  keywords: [
    "contact tank supplier Kenya",
    "Nairobi engineering team contact",
    "Kenya industrial supplier email",
    "North Star Impex contact",
  ],
  openGraph: {
    type: "website",
    title: "Contact: Email, Phone, or Form",
    description:
      "Reach our Nairobi engineering team by email, phone, or the form below. 48-hour working response. Tank, silo, instrument, and ETP project inquiries welcome.",
    url: "/contact/",
    images: [{ url: "/images/conversion/contact-hero.png" }],
  },
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
            <Eyebrow index="01">Direct</Eyebrow>
            <TextReveal
              as="h2"
              className="font-display mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            >
              Three ways in.
            </TextReveal>
            <Reveal stagger={0.05} yFrom={14}>
              <dl className="mt-8 flex flex-col text-sm">
                <div data-reveal-item className="hairline-b flex flex-col gap-1 py-4">
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
                <div data-reveal-item className="hairline-b flex flex-col gap-1 py-4">
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
                <div data-reveal-item className="hairline-b flex flex-col gap-1 py-4">
                  <dt className="font-mono-label text-[10px] text-faint">
                    Workshop
                  </dt>
                  <dd className="text-text">Nairobi industrial belt, Kenya</dd>
                </div>
                <div data-reveal-item className="hairline-b flex flex-col gap-1 py-4">
                  <dt className="font-mono-label text-[10px] text-faint">
                    Response time
                  </dt>
                  <dd className="text-muted">
                    Within 48 working hours. Same-day for urgent inquiries
                    during business hours, EAT.
                  </dd>
                </div>
              </dl>
            </Reveal>
          </aside>
          <div className="md:col-span-8">
            <Eyebrow index="02">Form</Eyebrow>
            <TextReveal
              as="h2"
              className="font-display mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
            >
              Tell us what you&apos;re working on.
            </TextReveal>
            <div className="font-mono-label mt-6 mb-8 flex flex-wrap items-center gap-3 text-[10px] text-faint">
              <span>Straight to the engineering team</span>
              <span aria-hidden className="hairline h-px min-w-8 flex-1" />
              <span>Response within 48 working hours</span>
            </div>
            <InquiryForm kind="contact" submitLabel="Send message" />
          </div>
        </div>
      </Section>
    </>
  );
}
