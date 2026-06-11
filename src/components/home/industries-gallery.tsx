"use client";

/**
 * Industries as a horizontal gallery.
 *
 * Desktop: the section pins and the card track translates sideways as the
 * user scrolls — four sectors pass like plant bays on a site walk. A red
 * hairline tracks position.
 *
 * Mobile / reduced motion: native horizontal scroll with snap points — the
 * same track, no pin, thumb-driven.
 */
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { TextReveal } from "@/components/motion/text-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export type IndustryCard = {
  n: string;
  name: string;
  href: string;
  pillar: string;
  products: string;
  image: string;
  imageAlt: string;
};

export function IndustriesGallery({
  industries,
}: {
  industries: readonly IndustryCard[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = section.querySelector<HTMLElement>("[data-track]");
        const viewport = section.querySelector<HTMLElement>("[data-viewport]");
        const bar = section.querySelector<HTMLElement>("[data-gallery-bar]");
        if (!track || !viewport) return;

        const distance = () => track.scrollWidth - viewport.clientWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        if (bar) {
          gsap.to(bar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
            },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Industries served"
      className="overflow-hidden py-24 md:flex md:min-h-screen md:flex-col md:justify-center md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-10 flex flex-col items-start gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow index="03">Industries</Eyebrow>
            <TextReveal
              as="h2"
              className="font-display max-w-4xl text-balance text-[clamp(2.5rem,5.2vw,4.75rem)] font-semibold leading-[0.96] tracking-tight"
            >
              <>
                Four sectors,
                <br />
                walked like a site visit.
              </>
            </TextReveal>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Each sector has its own buying triggers and equipment fit. Keep
            scrolling — the bays pass by.
          </p>
        </div>
      </div>

      <div data-viewport className="w-full">
        <div
          data-track
          className="flex w-max snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:snap-none md:overflow-visible md:px-[max(1.5rem,calc((100vw-72rem)/2))] md:pb-0"
        >
          {industries.map((ind) => (
            <Link
              key={ind.href}
              href={ind.href}
              data-cursor="view"
              data-cursor-label="Open"
              className="press group relative isolate flex aspect-[4/5] w-[78vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-card border border-border/10 sm:w-[46vw] md:w-[34vw] lg:w-[30vw]"
            >
              <Image
                src={ind.image}
                alt={ind.imageAlt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "linear-gradient(to top, rgb(8 6 4 / 0.92) 0%, rgb(8 6 4 / 0.55) 38%, rgb(8 6 4 / 0.1) 70%, rgb(8 6 4 / 0) 100%)",
                }}
              />
              <div className="absolute top-5 left-5 flex items-center gap-3">
                <span className="font-display-condensed text-5xl font-black leading-none text-white/85">
                  {ind.n}
                </span>
              </div>
              <div className="relative flex flex-col gap-2 p-5 md:p-6">
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
                  {ind.name}
                </h3>
                <p className="text-xs leading-relaxed text-white/70">
                  {ind.pillar}
                </p>
                <p className="font-mono-label text-[10px] text-white/55">
                  {ind.products}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  Open sector
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl px-6">
        <div className="hidden h-px w-full bg-border/15 md:block">
          <div
            data-gallery-bar
            className="h-px origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
