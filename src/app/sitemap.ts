import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { PRODUCTS, INDUSTRIES, LOCATIONS } from "@/lib/content-map";
import { BLOG_POSTS } from "@/lib/blog-posts";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Auto-generated sitemap from content-map. Trailing-slash URLs throughout
 * (except homepage which is the bare origin + `/`). Excludes admin routes
 * and the request-quote/success confirmation page.
 *
 * Priority guidance (relative weights, not absolute scores):
 *   1.0  homepage
 *   0.9  Tier-1 product pages, industries
 *   0.8  case studies, /talk-to-a-customer/, Nairobi
 *   0.7  Tier-2 products, other Kenya cities
 *   0.6  EA country pages, programmatic /best/, /compare/, /cost/
 *   0.5  resources, tools
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: SitemapEntry[] = [];

  const url = (path: string) =>
    path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  // Top-level
  entries.push({
    url: url("/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  });
  entries.push({
    url: url("/products/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  });
  entries.push({
    url: url("/industries/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  });
  entries.push({
    url: url("/about/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  });
  entries.push({
    url: url("/about/local-manufacturing/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  });
  entries.push({
    url: url("/locations/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  });
  entries.push({
    url: url("/resources/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  });
  entries.push({
    url: url("/blog/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  });

  // Conversion routes
  entries.push({
    url: url("/contact/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  });
  entries.push({
    url: url("/request-quote/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  });
  entries.push({
    url: url("/book-consultation/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  });
  entries.push({
    url: url("/request-site-audit/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  });

  // Products
  for (const p of PRODUCTS) {
    entries.push({
      url: url(`/products/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: p.tier === 1 ? 0.9 : 0.7,
    });
  }

  // Industries (and sub-applications)
  for (const ind of INDUSTRIES) {
    entries.push({
      url: url(`/industries/${ind.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: ind.tier === 1 ? 0.9 : 0.7,
    });
    for (const sub of ind.subApplications) {
      entries.push({
        url: url(`/industries/${ind.slug}/${sub.slug}/`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Locations
  for (const loc of LOCATIONS) {
    entries.push({
      url: url(`/locations/${loc.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: loc.slug === "nairobi" ? 0.8 : loc.tier === 1 ? 0.7 : 0.6,
    });
  }

  // Blog posts
  for (const post of BLOG_POSTS) {
    entries.push({
      url: url(`/blog/${post.slug}/`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Programmatic SEO surfaces (/compare/, /best/, /cost/) are listed in
  // content-map but the pages are deferred per docs/seo-audit-2026-05-26.md.
  // Re-include in sitemap when the routes ship.

  return entries;
}
