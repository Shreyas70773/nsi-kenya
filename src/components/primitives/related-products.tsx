import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./section";
import { Eyebrow } from "./eyebrow";

type Item = {
  href: string;
  title: string;
  copy: string;
  imageSrc: string;
  imageAlt: string;
};

/**
 * "Related products" / "More from us" strip rendered as 3-up image cards.
 * Used at the bottom of product, industry, and case-study pages to keep
 * the user moving sideways across the catalog.
 */
export function RelatedProducts({
  eyebrow = "Adjacent in the stack",
  headline,
  items,
}: {
  eyebrow?: string;
  headline: string;
  items: readonly Item[];
}) {
  return (
    <Section ariaLabel="Related products">
      <div className="mb-10 flex flex-col gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display max-w-2xl text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
          {headline}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="press group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card border border-border/10"
          >
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(to top, rgb(8 6 4 / 0.92) 0%, rgb(8 6 4 / 0.55) 38%, rgb(8 6 4 / 0.1) 70%, rgb(8 6 4 / 0) 100%)",
              }}
            />
            <div className="relative flex flex-col gap-2 p-5 md:p-6">
              <h3 className="font-display text-xl font-medium leading-tight tracking-tight text-white md:text-2xl">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-white/70">
                {item.copy}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-white transition-transform duration-300 group-hover:translate-x-0.5">
                Explore
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
