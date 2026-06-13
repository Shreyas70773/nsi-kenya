import { Section } from "@/components/primitives/section";
import { SectionHeader } from "@/components/primitives/section-header";
import { FaqList } from "@/components/primitives/faq-list";
import { JsonLd } from "./json-ld";
import { faqLd } from "@/lib/seo";
import type { ProductGeo } from "@/lib/product-geo";

/**
 * Visible "Common questions" section + matching FAQPage JSON-LD, both built
 * from the same source (PRODUCT_GEO), so the structured data always agrees
 * with the on-page text — the condition Google requires before it rewards
 * FAQ rich data, and the agreement AI answer engines trust.
 */
export function ProductFaqSection({
  geo,
  index,
  eyebrow = "Common questions",
}: {
  geo: ProductGeo;
  /** Section index for the header register, e.g. "05". */
  index?: string;
  eyebrow?: string;
}) {
  if (!geo.faqs.length) return null;
  return (
    <Section bordered ariaLabel="Common questions">
      <JsonLd data={faqLd(geo.faqs)} />
      <SectionHeader
        index={index}
        eyebrow={eyebrow}
        title="Questions buyers ask before they specify."
        headlineClassName="text-3xl md:text-4xl"
      />
      <FaqList items={geo.faqs} />
    </Section>
  );
}
