import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Breadcrumbs } from "@/components/primitives/breadcrumbs";
import { Prose } from "@/components/primitives/prose";
import { CtaBand, DEFAULT_CTA_CARDS } from "@/components/primitives/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { articleLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: [{ url: post.heroImage }],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleLd({
          headline: post.title,
          datePublished: post.publishedAt,
          url: `${SITE_URL}/blog/${slug}/`,
          description: post.excerpt,
          imageUrl: post.heroImage,
        })}
      />

      <section
        aria-label="Article header"
        className="bg-surface-2/40 px-6 pt-32 pb-12 md:pt-36 md:pb-16"
      >
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Field notes</Eyebrow>
          <h1 className="font-display mt-3 text-balance text-[clamp(1.85rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-tight">
            {post.title}
          </h1>
          <div className="font-mono-label mt-6 flex flex-wrap items-center gap-3 text-[10px] text-faint">
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
            <span className="h-px flex-1 bg-faint/40" aria-hidden />
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
          </div>
        </div>
      </section>

      <Section size="compact">
        <Breadcrumbs
          trail={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog/" },
            { label: post.title, href: `/blog/${slug}/` },
          ]}
        />
      </Section>

      <Section size="compact" innerClassName="!max-w-4xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-border/10">
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </Section>

      <Section innerClassName="!max-w-3xl">
        <Prose size="lg">{post.body}</Prose>

        <div className="mt-16 border-t border-border/10 pt-8">
          <Link
            href="/blog/"
            className="press inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
            All posts
          </Link>
        </div>
      </Section>

      {otherPosts.length > 0 ? (
        <Section bordered className="bg-surface-2/40">
          <Eyebrow className="mb-8">Keep reading</Eyebrow>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="press group flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-6 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgb(var(--ns-text)/0.18)]"
              >
                <span className="font-mono-label text-[10px] text-accent">
                  {formatDate(p.publishedAt)}
                </span>
                <h3 className="font-display text-lg font-medium leading-tight tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {p.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-text transition-transform duration-300 group-hover:translate-x-1">
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        headline="Got a project the writing speaks to?"
        headlineAccent="Get a quote in 48 hours."
        cards={DEFAULT_CTA_CARDS}
      />
    </>
  );
}
