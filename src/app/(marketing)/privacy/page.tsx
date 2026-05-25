import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How North Star Impex Kenya collects, uses, and stores personal information you submit through this site.",
  alternates: { canonical: "/privacy/" },
};

const UPDATED = "2026-05-25";

export default function PrivacyPage() {
  return (
    <>
      <section
        aria-label="Page header"
        className="bg-surface-2/40 px-6 pt-32 pb-12 md:pt-40 md:pb-16"
      >
        <div className="mx-auto max-w-6xl">
          <span className="font-mono-label text-[10px] text-faint">
            Legal
          </span>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-tight">
            Privacy Policy.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">
            What we collect when you reach out through this site, how we
            use it, and how to ask us to delete it.
          </p>
          <p className="font-mono-label mt-6 text-[10px] text-faint">
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
            <Eyebrow>On this page</Eyebrow>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>
                <a href="#what-we-collect" className="text-text underline-offset-2 hover:underline">
                  What we collect
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
            <Prose>
              <p>
                This is the privacy policy for {SITE_NAME} LTD (&quot;we&quot;,
                &quot;us&quot;, &quot;our&quot;). It describes what personal
                information we collect when you use this website, what we do
                with it, how long we keep it, and how to ask us to delete it.
              </p>
              <p>
                We operate under the Kenya Data Protection Act, 2019 and
                associated regulations. We are not a public body and do not
                collect special-category personal data through this site.
              </p>

              <h2 id="what-we-collect">What we collect</h2>
              <p>We only collect personal information that you give us directly:</p>
              <ul>
                <li>
                  <strong>Quote and inquiry forms.</strong> Your name,
                  company, email, phone (optional), industry (optional),
                  the products you tick, and any message you write.
                </li>
                <li>
                  <strong>Site audit and consultation requests.</strong>
                  Same fields as above, plus the plant location (for site
                  audits) and the topic (for consultations).
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
                Form submissions are stored on Convex infrastructure. Email
                correspondence is stored on the email provider we use for
                business mail. Both are encrypted in transit (TLS 1.3) and
                at rest (AES-256).
              </p>
              <p>
                We keep records of commercial correspondence for as long as
                Kenyan tax and accounting law requires (currently seven
                years from the financial year the record was created), and
                no longer.
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
