import { cn } from "@/lib/utils";

/**
 * Standard section wrapper. Consistent vertical rhythm (py-24/32 md:py-32/40),
 * mx-auto max-w-6xl inner, px-6 gutters. Use this for every inner-page
 * section to keep the rhythm aligned with the homepage.
 */
export function Section({
  children,
  className,
  innerClassName,
  as: Tag = "section",
  size = "default",
  bordered = false,
  inverted = false,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div" | "article";
  size?: "default" | "compact" | "spacious";
  bordered?: boolean;
  inverted?: boolean;
  ariaLabel?: string;
}) {
  return (
    <Tag
      aria-label={ariaLabel}
      className={cn(
        "px-6",
        size === "compact" && "py-16 md:py-20",
        size === "default" && "py-24 md:py-32",
        size === "spacious" && "py-28 md:py-40",
        bordered && "border-y border-border/10",
        inverted && "bg-text text-on-accent",
        className,
      )}
    >
      <div className={cn("mx-auto max-w-6xl", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
