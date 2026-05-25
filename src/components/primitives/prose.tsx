import { cn } from "@/lib/utils";

/**
 * Typography wrapper for content-heavy areas. Pairs paragraph rhythm with
 * the rest of the design system: muted body color, generous line height,
 * accent-color links, restrained heading scale.
 */
export function Prose({
  children,
  className,
  size = "base",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "base" | "lg";
}) {
  return (
    <div
      className={cn(
        "max-w-prose text-muted",
        "[&_p]:leading-relaxed",
        "[&_p+p]:mt-4",
        "[&_h2]:font-display [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-text [&_h2]:mt-12 [&_h2]:mb-4",
        "[&_h3]:font-display [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-text [&_h3]:mt-8 [&_h3]:mb-3",
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent-strong",
        "[&_strong]:font-semibold [&_strong]:text-text",
        "[&_ul]:my-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:list-disc",
        "[&_ol]:my-4 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-5 [&_ol]:list-decimal",
        size === "sm" && "text-sm [&_h2]:text-xl [&_h3]:text-lg",
        size === "base" && "text-base [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h3]:text-xl md:[&_h3]:text-2xl",
        size === "lg" && "text-lg [&_h2]:text-3xl md:[&_h2]:text-4xl [&_h3]:text-2xl md:[&_h3]:text-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
