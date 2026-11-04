import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How North Star Impex Kenya handles personal information from our website, Facebook and Instagram enquiry forms, and related correspondence.",
  alternates: { canonical: "/privacy/" },
};

const UPDATED = "2026-11-04";

export default function PrivacyPage() {
  return (
    <>
      <section
        aria-label="Page header"
        className="hairline-b bg-surface-2/40 px-6 pt-32 pb-12 md:pt-40 md:pb-16"
      >
        <div className="mx-auto max-w-6xl">
          <span className="font-mono-label flex items-center gap-3 text-[10px] text-faint">
            <span aria-hidden className="hairline h-px w-8" />
            Legal
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Privacy Policy.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">
            What we collect through our website and Facebook and Instagram
            enquiry forms, how we use it, and how to ask us to delete it.
          </p>
          <p className="font-mono-label hairline-t mt-8 inline-flex pt-4 text-[10px] text-faint">
            Last updated {UPDATED} · Kenya Data Protection Act, 2019
          </p>
        </div>
      </section>

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Privacy", href: "/privacy/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-3">
            <Eyebrow marker={false}>On this page</Eyebrow>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>
                <a href="#what-we-collect" className="text-text underline-offset-2 hover:underline">
                  What we collect
                </a>
              </li>
              <li>
                <a href="#facebook-instagram-enquiries" className="text-text underline-offset-2 hover:underline">
                  Facebook and Instagram enquiry forms
                </a>
              </li>
              <li>
                <a href="#how-we-use-it" className="text-text underline-offset-2 hover:underline">
                  How we use it
                </a>
              </li>
              <li>
                <a href="#how-we-store-it" className="text-text underline-offset-2 hover:underline">
                  How we store it
                </a>
              </li>
              <li>
                <a href="#your-rights" className="text-text underline-offset-2 hover:underline">
                  Your rights
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-text underline-offset-2 hover:underline">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#contact" className="text-text underline-offset-2 hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </aside>

          <div className="md:col-span-9">
            <Prose className="[&_h2:not(:first-child)]:border-t [&_h2:not(:first-child)]:border-border/10 [&_h2:not(:first-child)]:pt-10">
              <p>
                This policy explains how North Star Impex (Kenya) Ltd
                (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects and uses
                personal information through our website, Facebook and Instagram
                enquiry forms, and related correspondence.
              </p>
              <p>
                We operate under the Kenya Data Protection Act, 2019 and
                associated regulations. We are not a public body and do not
                collect special-category personal data through this site.
              </p>

              <h2 id="what-we-collect">What we collect</h2>
              <p>Through our website and direct correspondence, we collect:</p>
              <ul>
                <li>
                  <strong>Website quote and inquiry forms.</strong> Your name,
                  company, phone number and industry are required. Quote forms
                  also require a product selection. Email, capacity and any
                  message you write are optional.
                </li>
                <li>
                  <strong>Site audit and consultation requests.</strong>
                  The same contact fields as above, with a required topic or
                  requirement and optional site location and capacity.
                </li>
                <li>
                  <strong>Email correspondence.</strong> If you email us
                  directly, your email plus any content you include.
                </li>
                <li>
                  <strong>Basic technical metadata.</strong> Referrer URL,
                  UTM parameters, and user-agent string when you submit
                  a form. We do not run cross-site tracking.
                </li>
              </ul>

              <h2 id="facebook-instagram-enquiries">Facebook and Instagram enquiry forms</h2>
              <p>
                We are setting up Meta Instant Forms on Facebook and Instagram
                to receive product enquiries and requests for quotations. These
                forms are not live yet. The following explains how enquiries
                will be handled when they launch.
              </p>
              <p>
                When you submit one of these forms, we collect your name, email
                address and phone number. These fields are required to submit
                the form. You may also choose to provide your company name, the
                product you are interested in and details of your requirements.
                Submitting an enquiry is voluntary. If you prefer not to use
                the form, you can contact us directly at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
              <p>
                We use this information to understand your requirements, respond
                to your enquiry, provide relevant product information or a
                quotation, and follow up by phone or email about that enquiry.
              </p>
              <p>
                Submitting an enquiry does not subscribe you to newsletters or
                unrelated promotional messages. We will ask for a separate
                choice before sending promotional communications, and provide
                a way to withdraw that choice.
              </p>
              <p>
                Meta processes your submission through its platform and makes
                the information available to our authorised staff in Meta
                Business Suite’s Leads Center. Meta’s handling of information
                on its platforms is explained in its{" "}
                <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">
                  Privacy Policy
                </a>.
              </p>
              <p>
                The <a href="#your-rights">Your rights</a> and{" "}
                <a href="#contact">Contact</a> sections of this policy also
                apply to information received through these forms. To exercise
                your rights or ask us to stop following up on your enquiry,
                contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>

              <h2 id="how-we-use-it">How we use it</h2>
              <p>We use the information you submit for one of the following:</p>
              <ul>
                <li>Responding to your quote, inquiry, or audit request.</li>
                <li>
                  Following up on commercial correspondence we have
                  already opened with you.
                </li>
                <li>
                  Sending you a confirmation or scheduling email related
                  to the request.
                </li>
                <li>
                  Internal record-keeping for tax, accounting, and
                  warranty obligations under Kenyan law.
                </li>
              </ul>
              <p>
                We do not sell, rent, or share your information with third
                parties for marketing purposes.
              </p>

              <h2 id="how-we-store-it">How we store it</h2>
              <p>
                Website form submissions are stored on Convex infrastructure.
                Where configured, website submissions may also be forwarded to
                Google Sheets or a service used to manage enquiries. Email
                correspondence is stored with our business email provider.
              </p>
              <p>
                Facebook and Instagram form enquiries will initially be
                available to our authorised staff in Meta Business Suite’s
                Leads Center. A planned connection to Zoho Bigin using n8n is
                not active or tested. We have not confirmed spreadsheet
                downloads or email delivery for these enquiries. The website
                storage arrangements above do not describe the Meta form
                process.
              </p>
              <p>
                We have not yet confirmed a specific retention period or
                encryption arrangements for Meta form enquiries. This policy
                does not promise a fixed retention period or particular
                encryption standard for those enquiries. Records required for
                tax, accounting or other legal obligations may need to be
                retained even when deletion is requested.
              </p>

              <h2 id="your-rights">Your rights</h2>
              <p>Under the Kenya Data Protection Act you can ask us to:</p>
              <ul>
                <li>Confirm what personal information we hold about you.</li>
                <li>Send you a copy of that information.</li>
                <li>Correct any inaccuracies.</li>
                <li>
                  Delete your information, where we are not required to
                  retain it for legal reasons.
                </li>
                <li>
                  Restrict our processing of your information for
                  marketing or research.
                </li>
              </ul>
              <p>
                To exercise any of these rights, email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We
                respond within 30 days.
              </p>

              <h2 id="cookies">Cookies</h2>
              <p>
                This site uses session cookies necessary for the website
                to function and (when enabled) a privacy-respecting
                analytics cookie that records page views without
                identifying you. We do not run advertising trackers.
              </p>

              <h2 id="contact">Contact</h2>
              <p>
                Questions about this policy can go to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                Complaints about how we handle personal data can be
                addressed to the Office of the Data Protection
                Commissioner (ODPC) Kenya at{" "}
                <a
                  href="https://www.odpc.go.ke/"
                  target="_blank"
                  rel="noreferrer"
                >
                  odpc.go.ke
                </a>
                .
              </p>
              <p>
                This is a generic policy. It is not legal advice. Have it
                reviewed by Kenyan counsel before relying on it for
                regulatory purposes.
              </p>
            </Prose>
          </div>
        </div>
      </Section>
    </>
  );
}
