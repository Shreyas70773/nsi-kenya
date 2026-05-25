import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BrandStar } from "@/components/brand/brand-star";
import { Eyebrow } from "./eyebrow";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero. Same framed-card pattern as the homepage but shorter
 * (min-h-[58vh] / md:min-h-[64vh]), with the breadcrumb-style eyebrow on
 * top-left, headline + subhead below, and optional CTA + meta strip in the
 * bottom row.
 *
 * Background image + warm wash + faint outlined brand star, consistent with
 * the homepage register.
 */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  imageSrc,
  imageAlt = "",
  primaryCta,
  secondaryCta,
  metaLeft,
  metaRight,
  className,
}: {
  eyebrow: string;
  title: string;
  /** Optional accent fragment appended to the title, rendered in brand red. */
  titleAccent?: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  metaLeft?: string;
  metaRight?: string;
  className?: string;
}) {
  return (
    <section
      aria-label="Page hero"
      className={cn("px-3 pt-24 sm:px-4 md:pt-28 lg:px-6", className)}
    >
      <div className="relative isolate min-h-[58vh] overflow-hidden rounded-[28px] md:min-h-[64vh] md:rounded-[36px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgb(8 6 4 / 0.62) 0%, rgb(8 6 4 / 0.35) 40%, rgb(8 6 4 / 0.4) 70%, rgb(8 6 4 / 0.82) 100%)",
          }}
        />
        <BrandStar
          filled={false}
          className="pointer-events-none absolute -right-28 -bottom-32 -z-10 hidden h-[100%] w-auto text-white/12 md:block"
        />

        <div className="relative flex min-h-[58vh] flex-col gap-8 p-7 sm:p-10 md:min-h-[64vh] md:gap-10 md:p-14 lg:p-16">
          <div className="flex flex-col gap-5 md:max-w-4xl">
            <div className="font-mono-label flex items-center gap-3 text-[10px] text-white/65">
              <span className="h-px w-8 bg-white/30" aria-hidden />
              <span>{eyebrow}</span>
            </div>
            <h1 className="font-display text-balance text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.02] tracking-tight text-white">
              {title}
              {titleAccent ? (
                <>
                  {" "}
                  <span className="text-accent">{titleAccent}</span>
                </>
              ) : null}
            </h1>
            {subtitle ? (
              <p className="max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                {subtitle}
              </p>
            ) : null}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {primaryCta ? (
                  <Link
                    href={primaryCta.href}
                    className="press group inline-flex items-center gap-2 rounded-pill bg-white px-5 py-3 text-sm font-medium text-text transition-colors duration-200 hover:bg-accent hover:text-on-accent"
                  >
                    {primaryCta.label}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.2}
                    />
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className="press inline-flex items-center gap-2 rounded-pill border border-white/25 bg-white/8 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/14"
                  >
                    {secondaryCta.label}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </Link>
                ) : null}
              </div>
            )}
          </div>
          {(metaLeft || metaRight) && (
            <div className="font-mono-label mt-auto flex flex-col gap-2 text-[10px] text-white/60 md:flex-row md:items-end md:justify-between">
              {metaLeft ? <span>{metaLeft}</span> : <span />}
              {metaRight ? <span>{metaRight}</span> : null}
            </div>
          )}
        </div>
      </div>
      <_EyebrowImportSilencer />
    </section>
  );
}

// Eyebrow is re-exported via primitives/eyebrow.tsx; reference it here so the
// barrel export doesn't tree-shake unused (kept for future use in this file).
function _EyebrowImportSilencer() {
  void Eyebrow;
  return null;
}
