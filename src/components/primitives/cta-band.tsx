import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./section";
import { Eyebrow } from "./eyebrow";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

export type CtaCardData = {
  href: string;
  kicker: string;
  title: string;
  copy: string;
  accent?: boolean;
};

/**
 * Iron statement band with three conversion doors. Used on the homepage and
 * every inner page so the conversion moment looks identical everywhere.
 * Under theme="iron" the semantic tokens are re-scoped, so text-text is
 * cream and bg-surface is elevated iron — no special-case colors needed.
 */
export function CtaBand({
  eyebrow = "Three ways in",
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
    <Section theme="iron" size="spacious" ariaLabel="Conversion paths">
      <div className="flex flex-col gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <TextReveal
          as="h2"
          className="font-display max-w-5xl text-balance text-[clamp(2.75rem,6.5vw,5.5rem)] font-semibold leading-[0.94] tracking-tight"
        >
          <>
            {headline}
            {headlineAccent ? (
              <>
                <br />
                <span className="text-accent">{headlineAccent}</span>
              </>
            ) : null}
          </>
        </TextReveal>
      </div>

      <Reveal stagger={0.09} effect="fade-up">
        <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
          {cards.map((card, i) => (
            <div key={card.href} data-reveal-item>
              <Magnetic strength={0.12} className="block w-full">
                <Link
                  href={card.href}
                  data-cursor="view"
                  data-cursor-label={card.accent ? "Start" : "Open"}
                  className={cn(
                    "press group flex h-full min-h-[260px] flex-col gap-4 rounded-card border p-7 transition-colors duration-300 md:p-9",
                    card.accent
                      ? "border-accent bg-accent text-on-accent hover:bg-accent-strong"
                      : "border-border/15 bg-surface/60 text-text hover:bg-surface",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "font-mono-label text-[10px]",
                        card.accent ? "text-on-accent/80" : "text-faint",
                      )}
                    >
                      {card.kicker}
                    </span>
                    <span
                      className={cn(
                        "font-display-condensed text-2xl leading-none",
                        card.accent ? "text-on-accent/50" : "text-faint/60",
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight">
                    {card.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm leading-relaxed",
                      card.accent ? "text-on-accent/85" : "text-muted",
                    )}
                  >
                    {card.copy}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm transition-transform duration-300 group-hover:translate-x-1">
                    {card.accent ? "Start" : "Continue"}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.2}
                    />
                  </span>
                </Link>
              </Magnetic>
            </div>
          ))}
        </div>
      </Reveal>
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
] as const;
