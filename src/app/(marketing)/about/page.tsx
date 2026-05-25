import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "North Star Impex Kenya is a Kenya-based industrial infrastructure brand: tanks, silos, structural fabrication, process instruments, and optional cloud-ready monitoring.",
  alternates: { canonical: "/about/" },
};

const PILLARS = [
  {
    title: "Local accountability",
    copy: "Kenya-registered, Kenya-staffed, reachable by phone. On-site within 48 hours for Nairobi industrial estates, days for the rest of Kenya.",
  },
  {
    title: "Full-range single supplier",
    copy: "Stainless, epoxy, zinc-alum tanks. Silos and grain storage. Structural fabrication. Process instruments across six categories. Cloud-ready monitoring on every install. No other Kenyan supplier carries this breadth.",
  },
  {
    title: "Built to last vs. carbon steel",
    copy: "Zinc-alum and stainless head-to-head with the carbon-steel default. Lifecycle cost, not sticker price.",
  },
  {
    title: "Cloud-ready when you want it",
    copy: "Every instrument we install can be wired to a remote-monitoring app. Not pushed as default. No local competitor offers this as standard.",
  },
  {
    title: "Reference-grade work",
    copy: "Anchored to Crywan Industries (Kenya), with ongoing track record. Trust is the gate; named references open it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Kenyan industrial brand,"
        titleAccent="built for the operators who run this country."
        subtitle="Industrial infrastructure made for Kenyan plants, by a team based in Kenya. Stainless tanks for dairy, epoxy-lined for ETP, zinc-alum for water storage, silos for breweries, structural steel for plant builds, and instruments across the entire process stack."
        imageSrc="/images/about/about-hero.png"
        imageAlt=""
        primaryCta={{ href: "/about/local-manufacturing/", label: "Inside the workshop" }}
        secondaryCta={{ href: "/case-studies/", label: "Reference work" }}
        metaLeft="Nairobi · Kenya"
        metaRight="Locally fabricated and supported"
      />

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about/" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>Positioning</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              How we work, and why it matters in Kenya.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose>
              <p>
                Our model is straightforward: fabricate locally, support
                locally, and source globally only when a particular part
                or material truly requires it. The team and workshop sit
                in Kenya, so the people answering the phone are the
                people who build the equipment.
              </p>
              <p>
                That structural choice tends to show up in the things
                customers care about most: lead time, availability of
                replacement parts, install supervision, and having
                someone to call when something needs attention. It is
                also the reason we can quote in days rather than weeks,
                and deliver in weeks rather than months.
              </p>
              <p>
                Our anchor reference is{" "}
                <Link href="/case-studies/crywan-industries-kenya/">
                  Crywan Industries
                </Link>
                , a Kenyan food and beverage operator. It is an
                operating install with an ongoing engagement, named
                openly because they agreed to be named, and it is the
                relationship our newer customers usually ask about
                first.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section bordered className="bg-surface-2/40">
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>What we stand on</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Five pillars that show up in every conversation.
          </h2>
        </div>
        <ol className="divide-y divide-border/10 border-y border-border/10">
          {PILLARS.map((p, i) => (
            <li
              key={p.title}
              className="grid grid-cols-12 gap-4 py-6 md:gap-6 md:py-8"
            >
              <span className="font-mono-label col-span-2 text-xs text-faint md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display col-span-10 text-xl font-medium tracking-tight md:col-span-3 md:text-2xl">
                {p.title}
              </h3>
              <p className="col-span-12 text-sm text-muted md:col-span-8">
                {p.copy}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Eyebrow>Inside the workshop</Eyebrow>
            <h2 className="font-display mt-3 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Where the tanks actually get built.
            </h2>
            <Prose className="mt-5">
              <p>
                The fabrication workshop is in Kenya. TIG welders,
                rolling machines, dye-penetrant test stations, finishing
                bays. The pictures on the next page are the actual
                workshop, not stock photos.
              </p>
              <p>
                Most of the team is local. Engineering leadership comes
                from a broader East Africa industrial background.
                Procurement and quality control are run in-country.
              </p>
            </Prose>
            <Link
              href="/about/local-manufacturing/"
              className="press mt-6 inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent-strong"
            >
              See the workshop
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border/10">
              <Image
                src="/images/about/about-workshop-card.png"
                alt="Inside the North Star workshop: finishing bay with a polished stainless tank under inspection"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        headline="Want to see what we ship?"
        headlineAccent="Browse the catalogue."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
