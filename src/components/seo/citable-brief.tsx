import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/eyebrow";
import type { ProductGeo } from "@/lib/product-geo";

/**
 * "In brief" panel — a short, self-contained answer block placed high on a
 * product hub (right after the breadcrumbs) so an AI engine can lift it
 * verbatim as the citable summary of the page. Plain server-rendered text,
 * no motion, so it is in the initial HTML every crawler reads.
 */
export function CitableBrief({ geo }: { geo: ProductGeo }) {
  return (
    <Section size="compact" ariaLabel="In brief">
      <div className="rounded-card border border-border/12 bg-surface-2/40 p-6 md:p-9">
        <Eyebrow>In brief</Eyebrow>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text md:text-lg">
          {geo.inBrief}
        </p>
      </div>
    </Section>
  );
}
