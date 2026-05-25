import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for this North Star Impex Kenya website. Separate commercial terms apply to any actual purchase of equipment or services.",
  alternates: { canonical: "/terms/" },
};

const UPDATED = "2026-05-25";

export default function TermsPage() {
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
            Terms of Use.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">
            The rules that apply when you use this website. Separate
            commercial terms apply to actual purchases of equipment or
            services.
          </p>
          <p className="font-mono-label mt-6 text-[10px] text-faint">
            Last updated {UPDATED} · Governed by Kenyan law
          </p>
        </div>
      </section>

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Terms", href: "/terms/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-3">
            <Eyebrow>On this page</Eyebrow>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>
                <a href="#about" className="text-text underline-offset-2 hover:underline">
                  About these terms
                </a>
              </li>
              <li>
                <a href="#use-of-site" className="text-text underline-offset-2 hover:underline">
                  Use of the site
                </a>
              </li>
              <li>
                <a href="#content" className="text-text underline-offset-2 hover:underline">
                  Content and accuracy
                </a>
              </li>
              <li>
                <a href="#ip" className="text-text underline-offset-2 hover:underline">
                  Intellectual property
                </a>
              </li>
              <li>
                <a href="#third-party" className="text-text underline-offset-2 hover:underline">
                  Third-party links
                </a>
              </li>
              <li>
                <a href="#liability" className="text-text underline-offset-2 hover:underline">
                  Liability
                </a>
              </li>
              <li>
                <a href="#governing-law" className="text-text underline-offset-2 hover:underline">
                  Governing law
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
              <h2 id="about">About these terms</h2>
              <p>
                These terms govern your use of the {SITE_NAME} website
                (the &quot;Site&quot;). By using the Site you accept these
                terms. If you do not accept them, do not use the Site.
              </p>
              <p>
                These terms apply to the website only. Purchase of
                equipment or services is governed by a separate sales
                agreement that we issue with each quotation and that
                takes precedence over anything written here for matters
                of price, delivery, warranty, payment, and liability.
              </p>

              <h2 id="use-of-site">Use of the site</h2>
              <p>You agree to use the Site for lawful purposes only. You will not:</p>
              <ul>
                <li>Attempt to interfere with the Site or its services.</li>
                <li>
                  Submit information that is false, misleading, or
                  intended to impersonate another person or company.
                </li>
                <li>
                  Scrape, mirror, or otherwise systematically copy
                  content from the Site without our written permission.
                </li>
                <li>
                  Use the Site to send unsolicited commercial messages or
                  to harvest contact data for that purpose.
                </li>
              </ul>

              <h2 id="content">Content and accuracy</h2>
              <p>
                We make reasonable effort to keep the technical and
                commercial information on this Site current and accurate.
                The Site is not a substitute for a quotation, an
                engineering specification, or a compliance audit. Lead
                times, capacities, and material grades shown on product
                pages are representative; the actual specification for a
                project is what we issue in writing.
              </p>
              <p>
                Regulatory references on this Site (NEMA, EMCA CAP 387,
                KEBS, ASME, AWS, and similar) are provided in summary form
                and are not legal advice. Refer to the regulating body
                directly for your sector-specific obligations.
              </p>

              <h2 id="ip">Intellectual property</h2>
              <p>
                The {SITE_NAME} name, logo, page copy, design assets, and
                photography on this Site are our property or licensed to
                us. You may share links to the Site and reference it in
                non-commercial editorial contexts with attribution.
                Republishing copy or imagery for commercial use requires
                our written permission.
              </p>

              <h2 id="third-party">Third-party links</h2>
              <p>
                The Site links to third-party sites (regulators, partner
                pages, news sources). We do not control those sites and
                are not responsible for their content.
              </p>

              <h2 id="liability">Liability</h2>
              <p>
                The Site is provided &quot;as is&quot;. To the extent
                permitted by Kenyan law, we exclude liability for any
                indirect or consequential loss arising from your use of
                the Site. Nothing in these terms excludes liability that
                cannot lawfully be excluded.
              </p>

              <h2 id="governing-law">Governing law</h2>
              <p>
                These terms are governed by the laws of Kenya. Any
                dispute arising in connection with the Site is subject to
                the exclusive jurisdiction of the courts of Kenya.
              </p>

              <h2 id="contact">Contact</h2>
              <p>
                Questions about these terms can go to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
              <p>
                These terms are generic boilerplate. Have them reviewed by
                Kenyan counsel before relying on them in any regulatory
                or contractual context.
              </p>
            </Prose>
          </div>
        </div>
      </Section>
    </>
  );
}
