import { CASE_STUDIES, type CaseSector } from "@/lib/case-studies";
import { SectionHeader } from "@/components/primitives/section-header";
import { Reveal } from "@/components/motion/reveal";

const SECTOR_LABEL: Record<CaseSector, string> = {
  "food-and-beverage": "food & beverage",
  "etp-water-treatment": "water-treatment",
  "alcohol-distilling": "distilling",
  "chemical-processing": "chemical processing",
};

/**
 * T-2 anonymised case strip — repeatable: the homepage shows all cards,
 * sector pages can pass `sector` for a filtered strip. Renders NOTHING
 * until verified blurbs land in src/lib/case-studies.ts (placeholders are
 * forbidden by the brief).
 */
export function CaseStrip({ sector }: { sector?: CaseSector }) {
  const cases = sector
    ? CASE_STUDIES.filter((c) => c.sector === sector)
    : CASE_STUDIES;
  if (cases.length === 0) return null;

  return (
    <section aria-label="Recent projects" className="px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <SectionHeader
          eyebrow="Recent work"
          title="Projects we can talk about."
          side={
            <p>
              Most installs live behind customer NDAs; these are the outlines
              we can share publicly.
            </p>
          }
          className="mb-0"
        />
        <Reveal stagger={0.08}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {cases.map((c) => (
              <article
                key={`${c.scope}-${c.town}`}
                data-reveal-item
                className="flex flex-col gap-3 rounded-card border border-border/10 bg-surface p-7"
              >
                <span className="font-mono-label text-[10px] text-accent">
                  {SECTOR_LABEL[c.sector]}
                </span>
                <p className="text-sm leading-relaxed text-text">
                  {c.scope} for a {c.town} {SECTOR_LABEL[c.sector]} plant —{" "}
                  {c.outcome}.
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
