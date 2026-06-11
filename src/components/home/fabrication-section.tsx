"use client";

/**
 * "How a tank gets built" — the homepage's iron statement moment.
 *
 * Desktop: the section pins for ~2.6 viewport-heights over a cinematic
 * fabrication film (macro TIG weld, generated in-house); four
 * fabrication-step captions crossfade in sync and a red progress hairline
 * tracks the sequence. The film loads lazily, plays only on screen, and
 * falls back to the weld photograph for reduced motion / save-data.
 *
 * Mobile: no pin — captions stack as a readable list beside the film.
 */
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AmbientVideo } from "@/components/motion/ambient-video";
import { Eyebrow } from "@/components/primitives/eyebrow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STEPS = [
  {
    n: "01",
    title: "Cut & roll",
    copy: "304/316L plate is cut, edge-prepped, and rolled to radius in our Nairobi workshop.",
    meta: "Plate 3–6 mm · rolled to spec",
  },
  {
    n: "02",
    title: "Weld course by course",
    copy: "Shell courses stack and join with continuous TIG seams — the same sequence you're watching.",
    meta: "TIG · continuous seam",
  },
  {
    n: "03",
    title: "Test every seam",
    copy: "Dye-penetrant on welds, hydrostatic on the finished shell. Nothing ships untested.",
    meta: "DPI + hydrostatic",
  },
  {
    n: "04",
    title: "Fit out & install",
    copy: "Manways, nozzles, instrumentation stubs — then our crew installs on your site.",
    meta: "Nationwide install crews",
  },
] as const;

export function FabricationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const captions = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-step]"),
        );
        const bar = section.querySelector<HTMLElement>("[data-progress-bar]");
        const film = section.querySelector<HTMLElement>("[data-film]");

        gsap.set(captions.slice(1), { autoAlpha: 0, y: 28 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.6,
          },
        });

        captions.forEach((caption, i) => {
          const previous = captions[i - 1];
          if (i === 0 || !previous) return;
          tl.to(
            previous,
            { autoAlpha: 0, y: -28, duration: 0.18, ease: "power2.in" },
            0.25 * i - 0.06,
          ).to(
            caption,
            { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" },
            0.25 * i,
          );
        });

        if (bar) {
          gsap.to(bar, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=220%",
              scrub: true,
            },
          });
        }

        // The film frame eases through a slow zoom across the whole pin.
        if (film) {
          gsap.fromTo(
            film,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=220%",
                scrub: true,
              },
            },
          );
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="How a tank gets built"
      data-theme="dark"
      className="grain relative isolate overflow-hidden bg-bg text-text"
    >
      <div className="relative z-[2] mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-24 md:py-28">
        <div className="flex flex-col gap-4">
          <Eyebrow index="02">Inside the workshop</Eyebrow>
          <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
            Watch a tank
            <span className="text-accent"> take shape.</span>
          </h2>
        </div>

        <div className="grid flex-1 grid-cols-1 items-center gap-10 md:grid-cols-12">
          {/* Captions / steps */}
          <div className="order-2 flex flex-col gap-8 md:order-1 md:col-span-5">
            {/* Desktop: stacked, crossfaded. Mobile: plain list. */}
            <div className="relative flex flex-col gap-8 md:block md:min-h-[240px]">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  data-step
                  className="flex flex-col gap-3 md:absolute md:inset-x-0 md:top-0"
                >
                  <span className="font-display-condensed text-6xl font-black leading-none text-accent md:text-7xl">
                    {step.n}
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-muted">
                    {step.copy}
                  </p>
                  <span className="font-mono-label text-[10px] text-faint">
                    {step.meta}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fabrication film + progress hairline */}
          <div className="order-1 flex items-stretch gap-5 md:order-2 md:col-span-7">
            <div
              aria-hidden
              className="hidden w-px self-stretch bg-border/15 md:block"
            >
              <div
                data-progress-bar
                className="h-full w-px origin-top bg-accent"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
            <div className="grain relative h-[46vh] w-full overflow-hidden rounded-card border border-border/15 md:h-[68vh]">
              <div data-film className="absolute inset-0 will-change-transform">
                <AmbientVideo
                  src="/videos/fabrication-weld.mp4"
                  className="absolute inset-0"
                  poster={
                    <Image
                      src="/images/home/tanks-weld-bead.png"
                      alt="Continuous TIG weld bead on a stainless steel tank course"
                      fill
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover"
                    />
                  }
                />
              </div>
              <span className="font-mono-label absolute bottom-4 left-4 z-[2] text-[10px] text-white/70">
                Workshop film · Nairobi
              </span>
            </div>
          </div>
        </div>

        <p className="font-mono-label text-[10px] text-faint">
          Sequence: plate → courses → weld → test → install
        </p>
      </div>
    </section>
  );
}
