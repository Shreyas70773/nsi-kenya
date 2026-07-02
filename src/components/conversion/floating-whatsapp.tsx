"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { codeForPath, waLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Floating WhatsApp button (GC-1). Official WhatsApp green, all pages,
 * subtle entrance after 2 s. On mobile it sits above the sticky call bar
 * (GC-2) so neither covers form submit buttons. The wa.me link carries the
 * page's [CODE] token — WhatsApp's only attribution channel — and the same
 * code goes out on the whatsapp_click event before navigation.
 */
export function FloatingWhatsApp() {
  const pathname = usePathname() ?? "/";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const code = codeForPath(pathname);

  return (
    <a
      href={waLink(code)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => trackWhatsAppClick(code, pathname)}
      className={cn(
        "press fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgb(0_0_0/0.35)] transition-all duration-500",
        // Clear the sticky call bar (GC-2) below md; normal corner above.
        "bottom-[calc(4.25rem+env(safe-area-inset-bottom))] md:bottom-5",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </a>
  );
}

/** Official WhatsApp glyph (simplified single-path, brand green handled by parent). */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.46 1.34 4.96L2 22l5.24-1.37a9.98 9.98 0 0 0 4.79 1.22h.01c5.49 0 9.95-4.45 9.95-9.94 0-2.66-1.03-5.15-2.91-7.03A9.86 9.86 0 0 0 12.04 2Zm0 18.17h-.01a8.27 8.27 0 0 1-4.22-1.16l-.3-.18-3.11.81.83-3.03-.2-.31a8.24 8.24 0 0 1-1.27-4.36c0-4.56 3.72-8.27 8.29-8.27 2.21 0 4.29.86 5.85 2.42a8.2 8.2 0 0 1 2.42 5.86c0 4.56-3.72 8.27-8.28 8.27Zm4.54-6.19c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.38-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
