"use client";

import { usePathname } from "next/navigation";
import { waLink, type WaCode } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * Inline WhatsApp CTA (thank-you pages and copy blocks). Same [CODE]
 * attribution + whatsapp_click contract as the floating button.
 */
export function WhatsAppCtaButton({
  code,
  label,
}: {
  code: WaCode;
  label: string;
}) {
  const pathname = usePathname() ?? "/";
  return (
    <a
      href={waLink(code)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(code, pathname)}
      className="press inline-flex w-fit items-center gap-2 rounded-pill bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
        <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.94 0 1.75.46 3.46 1.34 4.96L2 22l5.24-1.37a9.98 9.98 0 0 0 4.79 1.22h.01c5.49 0 9.95-4.45 9.95-9.94 0-2.66-1.03-5.15-2.91-7.03A9.86 9.86 0 0 0 12.04 2Z" />
      </svg>
      {label}
    </a>
  );
}
