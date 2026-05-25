import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  /** Answer can be a short paragraph string or rendered ReactNode. */
  answer: React.ReactNode;
};

type Props = {
  items: readonly FaqItem[];
  className?: string;
};

/**
 * Visible FAQ list rendered as native <details>/<summary> so users can expand
 * any single answer. Mirrors the FAQPage JSON-LD emitted from page-level
 * <JsonLd> so structured answers match what Google sees.
 */
export function FaqList({ items, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((item, idx) => (
        <details
          key={idx}
          className="group rounded-card border border-border/10 bg-surface px-6 py-4 transition-colors open:bg-surface-2/50 md:px-7 md:py-5"
        >
          <summary className="press flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-text marker:hidden md:text-lg">
            <span>{item.question}</span>
            <span
              aria-hidden
              className="font-mono-label text-[14px] text-faint transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="mt-3 text-sm leading-relaxed text-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
