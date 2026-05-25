import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export type Crumb = { label: string; href: string };

/**
 * Inline breadcrumb trail plus the matching BreadcrumbList JSON-LD.
 * Use at the top of inner-page content sections.
 */
export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd(
          trail.map((c) => ({
            name: c.label,
            url: c.href.startsWith("http") ? c.href : `${SITE_URL}${c.href}`,
          })),
        )}
      />
      <nav
        aria-label="Breadcrumb"
        className="font-mono-label flex flex-wrap items-center gap-1.5 text-[10px] text-faint"
      >
        {trail.map((c, i) => (
          <span key={c.href} className="flex items-center gap-1.5">
            {i > 0 ? (
              <ChevronRight className="h-3 w-3 text-faint/60" strokeWidth={1.6} />
            ) : null}
            {i < trail.length - 1 ? (
              <Link
                href={c.href}
                className="transition-colors hover:text-text"
              >
                {c.label}
              </Link>
            ) : (
              <span className="text-text">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
