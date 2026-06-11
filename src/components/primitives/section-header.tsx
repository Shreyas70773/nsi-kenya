import { Eyebrow } from "./eyebrow";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

/**
 * Standard asymmetric section header — the redesign's recurring composition:
 * indexed eyebrow + masked-line display headline on the left, optional side
 * copy hanging off the right edge at the baseline. Keeps every page's
 * sections speaking the same typographic language.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  titleAccent,
  side,
  className,
  headlineClassName,
}: {
  /** Section index, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: string;
  /** Optional fragment rendered in brand red after the title. */
  titleAccent?: string;
  /** Short supporting copy, right-aligned at the baseline on desktop. */
  side?: React.ReactNode;
  className?: string;
  headlineClassName?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col items-start gap-5 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <TextReveal
          as="h2"
          className={cn(
            "font-display max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl",
            headlineClassName,
          )}
        >
          <>
            {title}
            {titleAccent ? (
              <>
                {" "}
                <span className="text-accent">{titleAccent}</span>
              </>
            ) : null}
          </>
        </TextReveal>
      </div>
      {side ? (
        <div className="max-w-sm text-sm leading-relaxed text-muted">{side}</div>
      ) : null}
    </div>
  );
}
