import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type SpecRow = {
  label: string;
  value: string;
  /** Optional unit shown smaller after the value. */
  unit?: string;
};

/**
 * Industrial spec sheet rendered as a definition list. Two-column on
 * desktop (label : value), stacked on mobile. Rows cascade in on scroll and
 * highlight on hover like a live datasheet; values sit in tabular numerals.
 */
export function SpecTable({
  rows,
  className,
  caption,
}: {
  rows: readonly SpecRow[];
  className?: string;
  caption?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {caption ? (
        <p className="font-mono-label text-[10px] text-faint">{caption}</p>
      ) : null}
      <Reveal stagger={0.05} yFrom={14}>
        <dl className="divide-y divide-border/10 border-y border-border/10">
          {rows.map((row, i) => (
            <div
              key={row.label}
              data-reveal-item
              className="group grid grid-cols-1 gap-1 px-2 py-4 transition-colors duration-300 hover:bg-surface-2/60 md:grid-cols-12 md:gap-6"
            >
              <dt className="font-mono-label flex items-center gap-3 text-[10px] text-faint md:col-span-4">
                <span aria-hidden className="text-accent/50 transition-colors duration-300 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {row.label}
              </dt>
              <dd className="text-sm text-text tabular-nums md:col-span-8">
                {row.value}
                {row.unit ? (
                  <span className="ml-1 text-xs text-muted">{row.unit}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
