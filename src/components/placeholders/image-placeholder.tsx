import { cn } from "@/lib/utils";

type Role = "hero" | "card" | "inline" | "diagram" | "portrait" | "panoramic";

type Props = {
  role: Role;
  /**
   * Short, intent-revealing label rendered inside the placeholder so the slot
   * looks deliberate (e.g. "Crywan Industries SS tank install — wide shot").
   */
  description: string;
  /**
   * Full art-directed image-gen prompt for the user. Stored on a data attribute
   * so prompts can be extracted in bulk by a build script later. Does NOT render
   * into the visible UI — prompts are surfaced at the end of scaffold messages
   * per the workflow rule.
   */
  prompt?: string;
  className?: string;
};

const ASPECT_BY_ROLE: Record<Role, string> = {
  hero: "aspect-[16/9]",
  card: "aspect-[4/3]",
  inline: "aspect-[4/3]",
  diagram: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
  panoramic: "aspect-[21/9]",
};

/**
 * Intentional image-slot placeholder. Per user feedback: never render abstract
 * shapes, AI-blob filler, or generic factory stock. The slot must look
 * considered — correct aspect ratio, labeled subject, accessible name.
 *
 * The user generates the real imagery from the surfaced prompt and uploads it
 * to Convex File Storage; replacement happens via a `<NextImage src=...>`
 * swap downstream.
 */
export function ImagePlaceholder({
  role,
  description,
  prompt,
  className,
}: Props) {
  return (
    <div
      role="img"
      aria-label={description}
      data-image-slot={role}
      data-image-prompt={prompt}
      className={cn(
        ASPECT_BY_ROLE[role],
        "rounded-card border border-dashed bg-placeholder-bg",
        "border-placeholder-border",
        "flex items-center justify-center p-6 text-center",
        className,
      )}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-placeholder-label">
        {description}
      </span>
    </div>
  );
}
