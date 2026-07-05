/**
 * T-2 anonymised case strip content. Card format:
 *   "[Scope] for a [town] [sector] plant — [headline outcome]."
 *
 * SHIPS EMPTY ON PURPOSE. The brief's sample blurbs are FORMAT ONLY and
 * must not publish; NSI supplies three verified project blurbs before
 * go-live. Add them here and the strip appears — no code change.
 */

export type CaseSector =
  | "food-and-beverage"
  | "etp-water-treatment"
  | "alcohol-distilling"
  | "chemical-processing";

export type CaseStudy = {
  /** e.g. "316L process vessels" */
  scope: string;
  /** e.g. "Thika-area" */
  town: string;
  sector: CaseSector;
  /** e.g. "fabricated, installed and commissioned on programme" */
  outcome: string;
};

export const CASE_STUDIES: readonly CaseStudy[] = [];
