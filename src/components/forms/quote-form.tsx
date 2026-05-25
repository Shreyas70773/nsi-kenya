"use client";

import { useActionState } from "react";
import {
  FormField,
  fieldInputClass,
  fieldTextareaClass,
  fieldSelectClass,
} from "@/components/primitives/form-field";
import { submitQuote, type QuoteFormState } from "@/lib/actions/submit-quote";

const INTENT_LABEL: Record<string, string> = {
  explore: "Exploring options",
  evaluate: "Technical evaluation",
  purchase: "Ready to purchase",
  "urgent-etp": "Urgent: ETP compliance deadline",
};

const PRODUCT_OPTIONS = [
  { slug: "tanks/stainless-steel", label: "Stainless Steel Tanks" },
  { slug: "tanks/epoxy-lined", label: "Epoxy-Lined Tanks" },
  { slug: "tanks/zinc-alum", label: "Zinc-Alum Tanks" },
  { slug: "silos/grain-storage", label: "Grain Storage Silos" },
  { slug: "silos/feed-storage", label: "Feed Storage Silos" },
  { slug: "silos/industrial-bulk", label: "Industrial Bulk Silos" },
  { slug: "structural-works", label: "Structural Works" },
  { slug: "instruments/flow", label: "Flow Instruments" },
  { slug: "instruments/level", label: "Level Instruments" },
  { slug: "instruments/pressure", label: "Pressure Instruments" },
  { slug: "instruments/liquid-analysis", label: "Liquid Analysis Instruments" },
  { slug: "instruments/temperature", label: "Temperature Instruments" },
  { slug: "iot", label: "Remote Monitoring" },
];

const INITIAL: QuoteFormState = { status: "idle" };

export function QuoteForm({
  defaultIntent = "explore",
  showIntentSelector = true,
}: {
  defaultIntent?: "explore" | "evaluate" | "purchase" | "urgent-etp";
  showIntentSelector?: boolean;
}) {
  const [state, formAction, isPending] = useActionState(submitQuote, INITIAL);
  const fieldErrors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {showIntentSelector ? (
        <FormField
          label="Intent"
          htmlFor="intent"
          required
          error={fieldErrors.intent}
        >
          <select
            id="intent"
            name="intent"
            defaultValue={defaultIntent}
            className={fieldSelectClass}
            required
          >
            {Object.entries(INTENT_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </FormField>
      ) : (
        <input type="hidden" name="intent" value={defaultIntent} />
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Your name" htmlFor="name" required error={fieldErrors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldInputClass}
          />
        </FormField>
        <FormField
          label="Company"
          htmlFor="company"
          required
          error={fieldErrors.company}
        >
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            className={fieldInputClass}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Email" htmlFor="email" required error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldInputClass}
          />
        </FormField>
        <FormField label="Phone (optional)" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldInputClass}
          />
        </FormField>
      </div>

      <FormField label="Industry (optional)" htmlFor="industry">
        <select id="industry" name="industry" className={fieldSelectClass}>
          <option value="">Pick one</option>
          <option value="food-and-beverage">Food & Beverage</option>
          <option value="etp-water-treatment">ETP & Water Treatment</option>
          <option value="alcohol-distilling">Alcohol & Distilling</option>
          <option value="chemical-processing">Chemical Processing</option>
          <option value="other">Other</option>
        </select>
      </FormField>

      <FormField
        label="Products of interest (tick any)"
        htmlFor="productSlugs-tanks-stainless-steel"
        hint="Tick everything that applies. We'll size against the brief in your message below."
      >
        <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PRODUCT_OPTIONS.map((p) => (
            <label
              key={p.slug}
              className="flex items-center gap-2 text-sm text-text"
            >
              <input
                type="checkbox"
                name="productSlugs"
                value={p.slug}
                id={`productSlugs-${p.slug.replace(/\//g, "-")}`}
                className="h-4 w-4 rounded border-border/30 text-accent focus:ring-accent/30"
              />
              {p.label}
            </label>
          ))}
        </div>
      </FormField>

      <FormField
        label="Brief"
        htmlFor="message"
        hint="Capacity, materials, lead-time pressure, anything we should know."
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          className={fieldTextareaClass}
        />
      </FormField>

      {state.status === "error" && (
        <p
          className="rounded-button border border-accent/30 bg-accent/8 px-4 py-3 text-sm text-accent-strong"
          role="alert"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="press inline-flex w-fit items-center gap-2 rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent-strong disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send request"}
      </button>

      <p className="text-xs text-faint">
        Required fields marked with an asterisk. We respond within 48 working
        hours, typically faster.
      </p>
    </form>
  );
}
