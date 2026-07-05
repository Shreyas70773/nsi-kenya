import { COMPLIANCE_STATEMENTS } from "@/lib/constants";

/**
 * T-3 compliance strip (regulatory / environmental statements) above the footer.
 * Renders NOTHING until NSI-approved wording lands in
 * COMPLIANCE_STATEMENTS — compliance claims are never drafted in-house.
 */
export function ComplianceStrip() {
  if (COMPLIANCE_STATEMENTS.length === 0) return null;

  return (
    <aside
      aria-label="Compliance"
      className="border-t border-border/10 bg-surface/60 px-6 py-6"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-2">
        {COMPLIANCE_STATEMENTS.map((statement) => (
          <p key={statement} className="font-mono-label text-[10px] text-muted">
            {statement}
          </p>
        ))}
      </div>
    </aside>
  );
}
