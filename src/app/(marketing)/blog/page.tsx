import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Industrial Field Notes: Tank, ETP, IoT, Kenya",
  description:
    "Practical writing for Kenyan plant managers and engineering teams. Tank metallurgy, ETP compliance, instrument selection, IoT monitoring, workshop process.",
  alternates: { canonical: "/blog/" },
  keywords: [
    "industrial blog Kenya",
    "tank manufacturing Kenya blog",
    "ETP compliance Kenya",
    "NEMA discharge Kenya",
    "industrial IoT Kenya",
    "process instruments Kenya",
  ],
  openGraph: {
    type: "website",
    title: "Industrial Field Notes: Tank, ETP, IoT, Kenya",
    description:
      "Practical writing for Kenyan plant managers and engineering teams. Tank metallurgy, ETP compliance, instrument selection, IoT monitoring, workshop process.",
    url: "/blog/",
    images: [{ url: "/images/about/workshop-tig-welding.png" }],
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <>
      <section
        aria-label="Page header"
        className="bg-surface-2/40 px-6 pt-32 pb-12 md:pt-40 md:pb-16"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Field notes</Eyebrow>
          <h1 className="font-display mt-3 max-w-3xl text-balance text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[1.02] tracking-tight">
            What we&apos;ve learned shipping
            <br className="hidden sm:block" />{" "}
            industrial infrastructure in Kenya.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">
            Practical writing for operators, plant managers, and the
            engineering teams sizing the next install. Tank metallurgy,
            ETP compliance, instrument selection, IoT monitoring, and
            the parts of the work that don&apos;t fit in a spec sheet.
          </p>
        </div>
      </section>

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog/" },
          ]}
        />
      </Section>

      {featured ? (
        <Section>
          <Eyebrow className="mb-6">Latest</Eyebrow>
          <Link
            href={`/blog/${featured.slug}/`}
            className="press group block overflow-hidden rounded-card border border-border/10 bg-surface transition-colors hover:bg-surface/80"
          >
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="relative aspect-[16/10] overflow-hidden md:col-span-3 md:aspect-auto">
                <Image
                  src={featured.heroImage}
                  alt={featured.heroImageAlt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-5 p-7 md:col-span-2 md:p-10">
                <div className="font-mono-label flex items-center gap-3 text-[10px] text-faint">
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span className="h-px flex-1 bg-faint/40" />
                  <span>{featured.readingMinutes} min read</span>
                </div>
                <h2 className="font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono-label rounded-pill border border-border/15 px-2 py-1 text-[10px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm text-accent transition-transform duration-300 group-hover:translate-x-1">
                    Read
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Section>
      ) : null}

      {rest.length > 0 ? (
        <Section bordered className="bg-surface-2/40">
          <Eyebrow className="mb-10">Earlier posts</Eyebrow>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="press group flex flex-col overflow-hidden rounded-card border border-border/10 bg-surface transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text)/0.18)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.heroImageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="font-mono-label flex items-center gap-2 text-[10px] text-faint">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readingMinutes} min</span>
                  </div>
                  <h3 className="font-display text-xl font-medium leading-tight tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono-label rounded-pill border border-border/15 px-2 py-0.5 text-[10px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-text transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.2}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        headline="Got something we should write about?"
        headlineAccent="Send us the question."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
