import { cn } from "@/lib/utils";

/**
 * Standard form-field wrapper. Label sits above the input, optional hint
 * below, error rendered in accent red. The input/textarea/select is
 * passed as children so callers control input type without us building
 * per-type wrappers.
 */
export function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="font-mono-label flex items-center gap-2 text-[10px] text-faint"
      >
        {label}
        {required ? <span className="text-accent">*</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
      {error ? (
        <p className="text-xs text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Standard text/email/tel input styled to match the design system.
 * Use inside <FormField>.
 */
export const fieldInputClass =
  "w-full rounded-button border border-border/15 bg-surface px-4 py-3 text-sm text-text placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors";

export const fieldTextareaClass =
  "w-full min-h-32 rounded-button border border-border/15 bg-surface px-4 py-3 text-sm text-text placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors";

export const fieldSelectClass =
  "w-full rounded-button border border-border/15 bg-surface px-4 py-3 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors";
