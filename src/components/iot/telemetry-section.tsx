"use client";

/**
 * The IoT page's "how the data reaches you" section: a field photograph of
 * the gateway sits in an 8-column frame; beside it a hairline progress rule
 * fills as the section scrolls and four mono-label stat callouts tick up —
 * every figure drawn from the page's own copy.
 */
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  note: string;
};

const STATS: readonly Stat[] = [
  {
    label: "Default reporting cadence",
    value: 15,
    suffix: " min",
    note: "One reading every 15 minutes — the cadence we size batteries to.",
  },
  {
    label: "NB-IoT primary battery",
    value: 5,
    prefix: "3–",
    suffix: " yr",
    note: "Three to five years at the default cadence; hourly reporting pushes past five.",
  },
  {
    label: "Instruments per LoRaWAN gateway",
    value: 20,
    suffix: "+",
    note: "One yard gateway covers 20+ instruments at lower per-instrument operating cost.",
  },
  {
    label: "Networks to choose from",
    value: 4,
    note: "NB-IoT, LoRaWAN, 4G LTE, Ethernet / Wi-Fi — we size the radio to the site.",
  },
];

export function TelemetrySection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const bar = root.querySelector<HTMLElement>("[data-telemetry-progress]");
      if (!bar) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(bar, { scaleY: 1 });
        return;
      }
      gsap.to(bar, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "bottom 55%",
          scrub: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <Section theme="iron" size="spacious" ariaLabel="Live telemetry">
      <div ref={rootRef} className="flex flex-col">
        <SectionHeader
          index="02"
          eyebrow="Live telemetry"
          title="From sensor to your dashboard."
          side={
            <p>
              The path every reading takes on a real install — instrument,
              gateway, time-series store, then a dashboard on your phone. The
              figures beside it are the defaults we size to.
            </p>
          }
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <div className="grain relative h-[60vh] w-full overflow-hidden rounded-card border border-border/15 md:h-[70vh]">
              <Image
                src="/images/products/iot-hero.png"
                alt="An NB-IoT gateway box mounted on a pole at a remote tank site"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Stat rail — hairline progress rule + counted callouts */}
          <div className="flex items-stretch gap-6 md:col-span-4">
            <div
              aria-hidden
              className="hidden w-px self-stretch bg-border/15 md:block"
            >
              <div
                data-telemetry-progress
                className="h-full w-px origin-top bg-accent"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
            <Reveal
              stagger={0.08}
              className="flex w-full flex-col justify-center divide-y divide-border/10"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  data-reveal-item
                  className="flex flex-col gap-2 py-6 first:pt-0 last:pb-0"
                >
                  <span className="font-mono-label text-[10px] text-faint">
                    {s.label}
                  </span>
                  <span className="font-display-condensed text-5xl font-black leading-none tracking-tight md:text-6xl">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </span>
                  <p className="text-xs leading-relaxed text-muted">{s.note}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <p className="font-mono-label mt-10 flex items-center gap-3 text-[10px] text-faint">
          <span aria-hidden className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Stream: instrument → gateway → cloud → your app
        </p>
      </div>
    </Section>
  );
}
