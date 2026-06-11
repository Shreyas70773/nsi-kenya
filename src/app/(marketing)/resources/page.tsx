import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText, Wrench, BookOpen } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Industrial Resources: Spec Sheets, Compliance, Field Notes",
  description:
    "Spec sheets, technical guides, blog posts, and regulatory references for Kenyan industrial operators. KEBS and Kenyan environmental standards. Free, gate-free, no signup.",
  alternates: { canonical: "/resources/" },
  keywords: [
    "industrial resources Kenya",
    "Kenya environmental guide",
    "Kenya water quality regulations",
    "KEBS food grade",
    "tank spec sheet Kenya",
    "ETP compliance Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Industrial Resources: Spec Sheets, Compliance, Field Notes",
    description:
      "Spec sheets, technical guides, blog posts, and regulatory references for Kenyan industrial operators. KEBS and Kenyan environmental standards. Free, gate-free, no signup.",
    url: "/resources/",
    images: [{ url: "/images/about/workshop-tig-welding.png" }],
  },
};

const SECTIONS = [
  {
    icon: BookOpen,
    title: "Field notes",
    copy: "Practical writing on tank metallurgy, ETP compliance, instrument selection, and the parts of the work that don't fit on a spec sheet.",
    href: "/blog/",
    label: "Read the blog",
  },
  {
    icon: FileText,
    title: "Spec sheets",
    copy: "Standard product specification sheets for tanks, silos, structural fabrication, and the full instrument range. Request the PDF for any product on the catalogue.",
    href: "/products/",
    label: "Request a spec sheet",
  },
  {
    icon: Wrench,
    title: "Regulatory references",
    copy: "Kenyan discharge limits, Kenyan water-quality summary, KEBS food-grade standards, and the standards we work to on every install.",
    href: "/industries/etp-water-treatment/#nema-parameters",
    label: "Discharge parameters table",
  },
];

const RECENT_POSTS = BLOG_POSTS.slice(0, 3);

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResourcesPage() {
  return (
    <>
      <section
        aria-label="Page header"
        className="hairline-b bg-surface-2/40 px-6 pt-32 pb-12 md:pt-40 md:pb-16"
      >
        <div className="mx-auto max-w-6xl">
          <span className="font-mono-label flex items-center gap-3 text-[10px] text-faint">
            <span aria-hidden className="hairline h-px w-8" />
            Resources
          </span>
          <TextReveal
            as="h1"
            mode="mount"
            className="font-display mt-4 max-w-3xl text-balance text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.02] tracking-tight"
          >
            <>
              The reading list we wish more
              <br className="hidden sm:block" />{" "}
              customers had before they bought.
            </>
          </TextReveal>
          <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">
            Spec sheets, technical guides, blog posts, and the
            regulatory references we work to on every install. All
            free, no email gate.
          </p>
        </div>
      </section>

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources/" },
          ]}
        />
      </Section>

      <Section>
        <SectionHeader
          index="01"
          eyebrow="Three places to start"
          title="Pick by what you're actually trying to do."
        />
        <Reveal effect="scale-in" stagger={0.08}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  data-reveal-item
                  data-cursor="view"
                  className="press group flex flex-col gap-4 rounded-card border border-border/10 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text-rgb)/0.18)]"
                >
                  <span
                    className="grid h-10 w-10 place-items-center rounded-button bg-accent/12 text-accent"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {s.copy}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-text transition-transform duration-300 group-hover:translate-x-1">
                    {s.label}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </Section>

      {RECENT_POSTS.length > 0 ? (
        <Section theme="paper" bordered>
          <SectionHeader
            index="02"
            eyebrow="From the blog"
            title="Recent field notes."
            side={
              <Link
                href="/blog/"
                className="press inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                All posts
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            }
          />

          <Reveal stagger={0.06} yFrom={16}>
            <ol className="divide-y divide-border/10 border-y border-border/10">
              {RECENT_POSTS.map((p) => (
                <li key={p.slug} data-reveal-item>
                  <Link
                    href={`/blog/${p.slug}/`}
                    data-cursor="view"
                    className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-surface/40 md:gap-6 md:py-7"
                  >
                    <span className="font-mono-label col-span-12 text-[10px] text-faint md:col-span-2">
                      {formatDate(p.publishedAt)}
                    </span>
                    <h3 className="font-display col-span-11 text-lg font-semibold tracking-tight md:col-span-7 md:text-xl">
                      {p.title}
                    </h3>
                    <span className="font-mono-label col-span-12 text-[10px] text-faint md:col-span-2">
                      {p.readingMinutes} min read
                    </span>
                    <span className="col-span-1 flex items-center justify-end text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:col-span-1">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>
      ) : null}

      <CtaBand
        headline="Got a brief and a deadline?"
        headlineAccent="Skip the catalogue, get a quote."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
