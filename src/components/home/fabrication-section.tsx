"use client";

/**
 * "How a tank gets built" — the homepage's iron statement moment.
 *
 * Four fabrication steps, four films. On desktop the section pins for ~2.2
 * viewport-heights: as each numbered caption crossfades in, ITS film
 * crossfades with it — roll the plate, weld the courses, dye-test the seam,
 * crane the tank onto site. A red hairline tracks progress. Only the active
 * film plays; the rest stay paused.
 *
 * Mobile: no pin — each step stacks with its own inline film.
 * Reduced motion: captions read as a list over a quiet iron panel; no video
 * bytes are downloaded.
 */
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AmbientVideo } from "@/components/motion/ambient-video";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { useExperience } from "@/components/experience/experience-context";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STEPS = [
  {
    n: "01",
    title: "Cut & roll",
    copy: "304/316L plate is cut, edge-prepped, and rolled to radius in our Nairobi workshop.",
    meta: "Plate 3–6 mm · rolled to spec",
    film: "/videos/fab-01-roll.mp4",
    filmLabel: "Plate rolling · workshop",
  },
  {
    n: "02",
    title: "Weld course by course",
    copy: "Shell courses stack and join with continuous TIG seams — the film is the real thing.",
    meta: "TIG · continuous seam",
    film: "/videos/fabrication-weld.mp4",
    filmLabel: "TIG seam · workshop",
  },
  {
    n: "03",
    title: "Test every seam",
    copy: "Dye-penetrant on welds, hydrostatic on the finished shell. Nothing ships untested.",
    meta: "DPI + hydrostatic",
    film: "/videos/fab-03-test.mp4",
    filmLabel: "Dye-penetrant inspection",
  },
  {
    n: "04",
    title: "Fit out & install",
    copy: "Manways, nozzles, instrumentation stubs — then our crew installs on your site.",
    meta: "Nationwide install crews",
    film: "/videos/fab-04-install.mp4",
    filmLabel: "Site install · crane lift",
  },
] as const;

export function FabricationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { tier } = useExperience();
  const showFilms = tier !== "static";

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
        const films = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-step-film]"),
        );
        const bar = section.querySelector<HTMLElement>("[data-progress-bar]");

        gsap.set(captions.slice(1), { autoAlpha: 0, y: 28 });
        gsap.set(films.slice(1), { autoAlpha: 0 });

        // Films mount with preload="none" (zero bytes). The moment the pin
        // engages, all four start buffering; only the active step plays.
        let warmed = false;
        const warm = () => {
          if (warmed) return;
          warmed = true;
          films.forEach((frame) => {
            const video = frame.querySelector("video");
            if (video) video.preload = "auto";
          });
        };

        let active = -1;
        const syncPlayback = (index: number, running: boolean) => {
          if (index === active && running) return;
          active = running ? index : -1;
          films.forEach((frame, i) => {
            const video = frame.querySelector("video");
            if (!video) return;
            if (running && i === index) void video.play().catch(() => {});
            else video.pause();
          });
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              warm();
              const step = Math.min(
                STEPS.length - 1,
                Math.floor(self.progress * STEPS.length),
              );
              syncPlayback(step, self.isActive);
            },
            onToggle: (self) => {
              if (!self.isActive) syncPlayback(-1, false);
            },
          },
        });

        captions.forEach((caption, i) => {
          const prevCaption = captions[i - 1];
          if (i === 0 || !prevCaption) return;
          tl.to(
            prevCaption,
            { autoAlpha: 0, y: -28, duration: 0.18, ease: "power2.in" },
            0.25 * i - 0.06,
          ).to(
            caption,
            { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" },
            0.25 * i,
          );

          const film = films[i];
          const prevFilm = films[i - 1];
          if (film && prevFilm) {
            tl.to(
              prevFilm,
              { autoAlpha: 0, duration: 0.14, ease: "power1.in" },
              0.25 * i - 0.05,
            ).to(
              film,
              { autoAlpha: 1, duration: 0.16, ease: "power1.out" },
              0.25 * i - 0.02,
            );
          }
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
          <div className="order-2 flex flex-col gap-10 md:order-1 md:col-span-5">
            <div className="relative flex flex-col gap-10 md:block md:min-h-[260px]">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  data-step
                  className="flex flex-col gap-3 md:absolute md:inset-x-0 md:top-0"
                >
                  {/* Mobile: each step carries its own film. */}
                  {showFilms ? (
                    <div className="grain relative mb-2 aspect-video overflow-hidden rounded-card border border-border/15 md:hidden">
                      <AmbientVideo
                        src={step.film}
                        className="absolute inset-0"
                        poster={<div className="absolute inset-0 bg-surface" />}
                      />
                      <span className="font-mono-label absolute bottom-3 left-3 z-[2] text-[10px] text-white/70">
                        {step.filmLabel}
                      </span>
                    </div>
                  ) : null}
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

          {/* Film stack + progress hairline (desktop) */}
          <div className="order-1 hidden items-stretch gap-5 md:order-2 md:col-span-7 md:flex">
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
            <div className="grain relative h-[68vh] w-full overflow-hidden rounded-card border border-border/15 bg-surface">
              {showFilms
                ? STEPS.map((step) => (
                    <div
                      key={step.n}
                      data-step-film
                      className="absolute inset-0"
                    >
                      <video
                        src={step.film}
                        muted
                        loop
                        playsInline
                        preload="none"
                        aria-hidden
                        className="h-full w-full object-cover"
                      />
                      <span className="font-mono-label absolute bottom-4 left-4 z-[2] text-[10px] text-white/70">
                        {step.filmLabel}
                      </span>
                    </div>
                  ))
                : null}
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
