import { cn } from "@/lib/utils";

/**
 * Small uppercase mono kicker label used above section/page headings.
 * Visual register: ⟶ Eyebrow text · text-faint · uppercase · tracked.
 */
export function Eyebrow({
  children,
  className,
  marker = true,
}: {
  children: React.ReactNode;
  className?: string;
  marker?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-mono-label text-[10px] text-faint",
        className,
      )}
    >
      {marker ? "⟶ " : null}
      {children}
    </span>
  );
}
