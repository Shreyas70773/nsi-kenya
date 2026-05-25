import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./section";
import { cn } from "@/lib/utils";

export type CtaCardData = {
  href: string;
  kicker: string;
  title: string;
  copy: string;
  accent?: boolean;
};

/**
 * Dark inverted band with three CTA cards. Same component the homepage
 * uses for "Pick the door that matches where you are"; reused on inner
 * pages so the conversion moment looks consistent everywhere.
 */
export function CtaBand({
  eyebrow = "⟶ Three ways in",
  headline,
  headlineAccent,
  cards,
}: {
  eyebrow?: string;
  headline: string;
  headlineAccent?: string;
  cards: readonly CtaCardData[];
}) {
  return (
    <Section
      inverted
      bordered
      size="spacious"
      ariaLabel="Conversion paths"
    >
      <div className="flex flex-col gap-3 md:mb-16">
        <span className="font-mono-label text-[10px] text-on-accent/55">
          {eyebrow}
        </span>
        <h2 className="font-display max-w-4xl text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
          {headline}
          {headlineAccent ? (
            <>
              <br />
              <span className="text-accent">{headlineAccent}</span>
            </>
          ) : null}
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={cn(
              "press group flex flex-col gap-4 rounded-card border p-7 transition-colors duration-300 md:p-9",
              card.accent
                ? "border-accent bg-accent text-on-accent hover:bg-accent-strong"
                : "border-on-accent/15 bg-text/40 text-on-accent hover:bg-on-accent/8",
            )}
          >
            <span
              className={cn(
                "font-mono-label text-[10px]",
                card.accent ? "text-on-accent/80" : "text-on-accent/55",
              )}
            >
              {card.kicker}
            </span>
            <h3 className="font-display text-3xl font-medium leading-tight tracking-tight">
              {card.title}
            </h3>
            <p
              className={cn(
                "text-sm leading-relaxed",
                card.accent ? "text-on-accent/85" : "text-on-accent/65",
              )}
            >
              {card.copy}
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm transition-transform duration-300 group-hover:translate-x-1">
              {card.accent ? "Start" : "Continue"}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/**
 * Default three-way-in card set. Same content as the homepage CtaBand.
 * Pages can pass a custom set or use this default.
 */
export const DEFAULT_CTA_CARDS: readonly CtaCardData[] = [
  {
    href: "/request-quote/",
    kicker: "01 / Have a project",
    title: "Get a quote",
    copy: "Tell us what you're building. We'll come back with a specification, capacity, and lead time within 48 working hours.",
    accent: true,
  },
  {
    href: "/book-consultation/",
    kicker: "02 / Want to talk first",
    title: "Book a consultation",
    copy: "A working call with our engineering team. Walk through what you need, see how we'd approach it, then decide.",
  },
  {
    href: "/request-site-audit/",
    kicker: "03 / Still scoping",
    title: "Book a site audit",
    copy: "A field visit to your plant. We measure, photograph, and leave you with a written brief, no commitment from either side.",
  },
];
