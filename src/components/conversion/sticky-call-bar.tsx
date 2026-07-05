"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { codeForPath, waLink } from "@/lib/whatsapp";
import { trackCallClick, trackWhatsAppClick } from "@/lib/analytics";
import { CONTACT_PHONE_TEL } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Sticky mobile bottom bar (GC-2): Call + WhatsApp, viewports < 768 px only.
 * Hides while any form field has focus so it never covers inputs behind the
 * on-screen keyboard.
 */
export function StickyCallBar() {
  const pathname = usePathname() ?? "/";
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const isFormField = (t: EventTarget | null) =>
      t instanceof HTMLElement &&
      ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName);
    const onFocusIn = (e: FocusEvent) => {
      if (isFormField(e.target)) setTyping(true);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (isFormField(e.target)) setTyping(false);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const code = codeForPath(pathname);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border/15 transition-transform duration-300 md:hidden",
        typing && "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={`tel:${CONTACT_PHONE_TEL}`}
        onClick={() => trackCallClick(pathname)}
        className="flex items-center justify-center gap-2 bg-text py-3.5 text-sm font-medium text-bg"
      >
        <Phone className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        Call us
      </a>
      <a
        href={waLink(code)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(code, pathname)}
        className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-medium text-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
          <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.46 1.34 4.96L2 22l5.24-1.37a9.98 9.98 0 0 0 4.79 1.22h.01c5.49 0 9.95-4.45 9.95-9.94 0-2.66-1.03-5.15-2.91-7.03A9.86 9.86 0 0 0 12.04 2Z" />
        </svg>
        WhatsApp
      </a>
    </div>
  );
}
