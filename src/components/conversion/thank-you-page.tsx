import { Phone } from "lucide-react";
import { ThankYouTracker } from "@/components/analytics/thank-you-tracker";
import { WhatsAppCtaButton } from "@/components/conversion/whatsapp-cta-button";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/constants";
import type { LeadJourney } from "@/lib/analytics";
import type { WaCode } from "@/lib/whatsapp";

/**
 * Shared composition for the three journey thank-you pages (GC-7). Thin by
 * design: these URLs are the GA4/Meta conversion triggers, so their only
 * jobs are confirmation, "what happens next", and the two faster channels.
 * Copy comes verbatim from brief §6 via each page.
 */
export function ThankYouPage({
  journey,
  waCode,
  title,
  body,
}: {
  journey: LeadJourney;
  waCode: WaCode;
  title: string;
  body: string;
}) {
  return (
    <section className="flex min-h-[85vh] items-center px-6 pt-32 pb-24 md:pt-40">
      <ThankYouTracker journey={journey} />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div className="font-mono-label flex items-center gap-3 text-[10px] text-accent">
          <span className="h-px w-8 bg-accent/40" aria-hidden />
          <span>Request received</span>
        </div>
        <TextReveal
          as="h1"
          mode="mount"
          className="font-display text-balance text-4xl font-semibold leading-[1.04] tracking-tight md:text-6xl"
        >
          {title}
        </TextReveal>
        <Reveal yFrom={14}>
          <p data-reveal-item className="max-w-xl text-base leading-relaxed text-muted">
            {body}
          </p>
        </Reveal>
        <Reveal yFrom={14} stagger={0.06}>
          <div data-reveal-item className="flex flex-col items-start gap-4 pt-2">
            <WhatsAppCtaButton code={waCode} label="Faster? WhatsApp us now" />
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="link-draw inline-flex items-center gap-2 text-sm text-text"
            >
              <Phone className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              Or call {CONTACT_PHONE}.
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
