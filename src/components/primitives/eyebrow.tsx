import { cn } from "@/lib/utils";

/**
 * Small uppercase mono kicker label used above section/page headings.
 * Redesign register: an optional section index ("01") in brand red, a
 * register-mark "+" and the tracked label — the document-grid voice.
 *
 * Back-compat: `marker` still renders the legacy ⟶ arrow when no index is
 * given, so existing call sites keep their look until swept.
 */
export function Eyebrow({
  children,
  className,
  marker = true,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  marker?: boolean;
  /** Section index, e.g. "01". Switches to the register-mark style. */
  index?: string;
}) {
  if (index) {
    return (
      <span
        className={cn(
          "font-mono-label flex items-center gap-3 text-[10px] text-faint",
          className,
        )}
      >
        <span className="text-accent">{index}</span>
        <span aria-hidden className="hairline h-px w-8" />
        {children}
      </span>
    );
  }

  return (
    <span className={cn("font-mono-label text-[10px] text-faint", className)}>
      {marker ? "⟶ " : null}
      {children}
    </span>
  );
}
