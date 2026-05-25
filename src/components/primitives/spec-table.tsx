import { cn } from "@/lib/utils";

export type SpecRow = {
  label: string;
  value: string;
  /** Optional unit shown smaller after the value. */
  unit?: string;
};

/**
 * Industrial spec sheet rendered as a definition list. Two-column on
 * desktop (label : value), stacked on mobile. Used inside product pages
 * for tank/silo/instrument specs.
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
      <dl className="divide-y divide-border/10 border-y border-border/10">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1 py-4 md:grid-cols-12 md:gap-6"
          >
            <dt className="font-mono-label text-[10px] text-faint md:col-span-4">
              {row.label}
            </dt>
            <dd className="text-sm text-text md:col-span-8">
              {row.value}
              {row.unit ? (
                <span className="ml-1 text-xs text-muted">{row.unit}</span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
