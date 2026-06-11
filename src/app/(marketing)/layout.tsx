import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      {/* Block wrapper (not flex): ScrollTrigger pin-spacing can't reserve
          scroll distance inside a flex parent, which breaks pinned sections. */}
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}
