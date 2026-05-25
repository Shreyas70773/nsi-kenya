import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText, Wrench, BookOpen } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Industrial Resources: Spec Sheets, NEMA, Field Notes",
  description:
    "Spec sheets, technical guides, blog posts, and regulatory references for Kenyan industrial operators. NEMA, EMCA, KEBS, free and gate-free.",
  alternates: { canonical: "/resources/" },
  keywords: [
    "industrial resources Kenya",
    "NEMA Kenya guide",
    "EMCA CAP 387",
    "KEBS food grade",
    "tank spec sheet Kenya",
    "ETP compliance Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Industrial Resources: Spec Sheets, NEMA, Field Notes",
    description:
      "Spec sheets, technical guides, blog posts, and regulatory references for Kenyan industrial operators. NEMA, EMCA, KEBS, free and gate-free.",
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
    copy: "NEMA discharge limits, EMCA CAP 387 summary, KEBS food-grade standards, and the standards we work to on every install.",
    href: "/industries/etp-water-treatment/#nema-parameters",
    label: "NEMA parameters table",
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
        className="bg-surface-2/40 px-6 pt-32 pb-12 md:pt-40 md:pb-16"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Resources</Eyebrow>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.02] tracking-tight">
            The reading list we wish more
            <br className="hidden sm:block" />{" "}
            customers had before they bought.
          </h1>
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
        <div className="mb-10 flex flex-col gap-3">
          <Eyebrow>Three places to start</Eyebrow>
          <h2 className="font-display max-w-2xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Pick by what you&apos;re actually trying to do.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="press group flex flex-col gap-4 rounded-card border border-border/10 bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text)/0.18)]"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-button bg-accent/12 text-accent"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight">
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
      </Section>

      {RECENT_POSTS.length > 0 ? (
        <Section bordered className="bg-surface-2/40">
          <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-3">
              <Eyebrow>From the blog</Eyebrow>
              <h2 className="font-display max-w-xl text-balance text-3xl font-medium tracking-tight md:text-4xl">
                Recent field notes.
              </h2>
            </div>
            <Link
              href="/blog/"
              className="press inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              All posts
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </div>

          <ol className="divide-y divide-border/10 border-y border-border/10">
            {RECENT_POSTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}/`}
                  className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-surface/40 md:gap-6 md:py-7"
                >
                  <span className="font-mono-label col-span-12 text-[10px] text-faint md:col-span-2">
                    {formatDate(p.publishedAt)}
                  </span>
                  <h3 className="font-display col-span-11 text-lg font-medium tracking-tight md:col-span-7 md:text-xl">
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
