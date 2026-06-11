import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BrandStar } from "@/components/brand/brand-star";
import { TextReveal } from "@/components/motion/text-reveal";
import { ParallaxImage } from "@/components/motion/parallax";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero. Framed-card pattern carried from the homepage, elevated
 * for the redesign: the photograph drifts on scroll (parallax), the headline
 * rises in masked lines, corner register marks frame the card like a
 * fabrication drawing, and the meta strip reads as document metadata.
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
        <ParallaxImage className="absolute inset-0 -z-20" amount={10}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </ParallaxImage>
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
        {/* Register marks — drawing-sheet corners. */}
        <CornerMarks />

        <div className="relative flex min-h-[58vh] flex-col gap-8 p-7 sm:p-10 md:min-h-[64vh] md:gap-10 md:p-14 lg:p-16">
          <div className="flex flex-col gap-5 md:max-w-4xl">
            <div className="font-mono-label flex items-center gap-3 text-[10px] text-white/65">
              <span className="h-px w-8 bg-white/30" aria-hidden />
              <span>{eyebrow}</span>
            </div>
            <TextReveal
              as="h1"
              mode="mount"
              className="font-display text-balance text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-tight text-white"
            >
              <>
                {title}
                {titleAccent ? (
                  <>
                    {" "}
                    <span className="text-accent">{titleAccent}</span>
                  </>
                ) : null}
              </>
            </TextReveal>
            {subtitle ? (
              <p className="max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                {subtitle}
              </p>
            ) : null}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {primaryCta ? (
                  <Magnetic strength={0.2}>
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
                  </Magnetic>
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
    </section>
  );
}

/** Drawing-sheet corner register marks, top-left and bottom-right. */
function CornerMarks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-4 z-[1] hidden md:block">
      <span className="absolute top-0 left-0 h-4 w-px bg-white/30" />
      <span className="absolute top-0 left-0 h-px w-4 bg-white/30" />
      <span className="absolute right-0 bottom-0 h-4 w-px bg-white/30" />
      <span className="absolute right-0 bottom-0 h-px w-4 bg-white/30" />
    </div>
  );
}
