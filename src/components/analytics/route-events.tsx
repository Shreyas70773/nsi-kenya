"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, trackViewContent } from "@/lib/analytics";

/**
 * App Router navigates client-side, so GTM's initial page load only covers
 * the first URL. This pushes page_view on every route CHANGE (skipping the
 * first render — the container's own gtm.js load reports that one) plus
 * view_content on sector/product pages for the Meta ViewContent mapping.
 * The GTM container must trigger on these custom events, not History Change.
 */
export function RouteEvents() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!pathname) return;
    if (first.current) {
      first.current = false;
      // view_content still applies on a direct landing.
      pushViewContent(pathname);
      return;
    }
    trackPageView(pathname);
    pushViewContent(pathname);
  }, [pathname]);

  return null;
}

function pushViewContent(pathname: string) {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const sector = path.match(/^\/industries\/([^/]+)\//)?.[1];
  if (sector) {
    trackViewContent(sector, "sector");
    return;
  }
  const product = path.match(/^\/products\/(.+?)\/$/)?.[1];
  if (product) {
    trackViewContent(product, "product");
  }
}
