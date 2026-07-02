import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RouteEvents } from "@/components/analytics/route-events";
import { FloatingWhatsApp } from "@/components/conversion/floating-whatsapp";
import { StickyCallBar } from "@/components/conversion/sticky-call-bar";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <RouteEvents />
      <SiteHeader />
      {/* Block wrapper (not flex): ScrollTrigger pin-spacing can't reserve
          scroll distance inside a flex parent, which breaks pinned sections. */}
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <FloatingWhatsApp />
      <StickyCallBar />
    </>
  );
}
