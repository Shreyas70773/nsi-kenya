import { cn } from "@/lib/utils";

/**
 * Brand star, the same 5-point mark as the logo. Used as a bold geometric
 * accent in the hero and footer (per IBS Group reference 1.3, where they
 * use an oversized solid triangle as the brand decoration). Solid fill in
 * brand red, positioned absolute by the parent; this component handles only
 * the shape.
 */
export function BrandStar({
  className,
  filled = true,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={cn("text-accent", className)}
    >
      <polygon
        points="50,4 60.4,38.5 96,38.5 67.3,60 78,94 50,72.5 22,94 32.7,60 4,38.5 39.6,38.5"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={filled ? 0 : 1.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}
