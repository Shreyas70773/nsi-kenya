import { cn } from "@/lib/utils";

/**
 * Standard section wrapper. Consistent vertical rhythm (py-24/32 md:py-32/40),
 * mx-auto max-w-6xl inner, px-6 gutters. Use this for every inner-page
 * section to keep the rhythm aligned with the homepage.
 *
 * Themes (the redesign's cream-led, dark-statement rhythm):
 *  - "cream" — default page field
 *  - "paper" — recessed warm surface for grouped content
 *  - "iron"  — dark statement moment. Sets data-theme="dark", which
 *    re-scopes every semantic token for the subtree, so all existing
 *    utilities (bg-bg, text-text, text-muted, border-border/10 …) recolor
 *    automatically. Iron sections also carry the film-grain overlay.
 *
 * `inverted` is the legacy spelling of theme="iron" and keeps working.
 */
export function Section({
  children,
  className,
  innerClassName,
  as: Tag = "section",
  size = "default",
  bordered = false,
  inverted = false,
  theme,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div" | "article";
  size?: "default" | "compact" | "spacious";
  bordered?: boolean;
  inverted?: boolean;
  theme?: "cream" | "paper" | "iron";
  ariaLabel?: string;
}) {
  const resolved = theme ?? (inverted ? "iron" : "cream");
  const iron = resolved === "iron";

  return (
    <Tag
      aria-label={ariaLabel}
      data-theme={iron ? "dark" : undefined}
      className={cn(
        "relative px-6",
        size === "compact" && "py-16 md:py-20",
        size === "default" && "py-24 md:py-32",
        size === "spacious" && "py-28 md:py-40",
        bordered && "border-y border-border/10",
        resolved === "paper" && "bg-surface-2/50",
        iron && "grain bg-bg text-text",
        className,
      )}
    >
      <div className={cn("relative z-[2] mx-auto max-w-6xl", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
