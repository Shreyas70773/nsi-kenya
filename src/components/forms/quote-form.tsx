"use client";

import { useActionState } from "react";
import {
  FormField,
  fieldInputClass,
  fieldTextareaClass,
  fieldSelectClass,
} from "@/components/primitives/form-field";
import { submitQuote, type QuoteFormState } from "@/lib/actions/submit-quote";
import { markLeadPending } from "@/lib/lead-pending";
import { AttributionFields } from "@/components/forms/attribution-fields";
import { ConsentNote } from "@/components/forms/consent-note";
import { SpamFields } from "@/components/forms/spam-fields";
import {
  PRODUCT_GROUPS,
  CAPACITY_OPTIONS,
} from "@/lib/validation/lead-schemas";

const INTENT_LABEL: Record<string, string> = {
  explore: "Exploring options",
  evaluate: "Technical evaluation",
  purchase: "Ready to purchase",
  "urgent-etp": "Urgent: ETP compliance deadline",
};

const INITIAL: QuoteFormState = { status: "idle" };

/**
 * Request-a-Quote form, F-3 field order: Name* → Phone* → Company* →
 * Sector* → Requirement* (six F-2 groups) → Capacity → Email → Message.
 * The form starts the conversation; detail is qualified by phone.
 */
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
    <form
      action={formAction}
      // Native validation has passed by the time submit fires; the pending
      // token lets the thank-you page emit generate_lead exactly once.
      onSubmit={() => markLeadPending("quote")}
      className="flex flex-col gap-6"
    >
      <AttributionFields />
      <SpamFields action="quote" />
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
        <FormField label="Full name" htmlFor="name" required error={fieldErrors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldInputClass}
          />
        </FormField>
        <FormField label="Phone" htmlFor="phone" required error={fieldErrors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+254 7XX XXX XXX"
            required
            className={fieldInputClass}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
        <FormField
          label="Sector"
          htmlFor="industry"
          required
          error={fieldErrors.industry}
        >
          <select
            id="industry"
            name="industry"
            required
            defaultValue=""
            className={fieldSelectClass}
          >
            <option value="" disabled>
              Pick one
            </option>
            <option value="food-and-beverage">Food &amp; Beverage</option>
            <option value="etp-water-treatment">
              Water &amp; Effluent Treatment
            </option>
            <option value="alcohol-distilling">Alcohol &amp; Distilling</option>
            <option value="chemical-processing">Chemical Processing</option>
            <option value="other">Other</option>
          </select>
        </FormField>
      </div>

      <FormField
        label="What do you need?"
        htmlFor={`productSlugs-${PRODUCT_GROUPS[0]?.value}`}
        required
        error={fieldErrors.productSlugs}
        hint="Tick everything that applies — we confirm the detail on the phone."
      >
        <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PRODUCT_GROUPS.map((p) => (
            <label
              key={p.value}
              className="flex items-center gap-2 text-sm text-text"
            >
              <input
                type="checkbox"
                name="productSlugs"
                value={p.value}
                id={`productSlugs-${p.value}`}
                className="h-4 w-4 rounded border-border/30 text-accent focus:ring-accent/30"
              />
              {p.label}
            </label>
          ))}
        </div>
      </FormField>

      <FormField
        label="Approximate capacity (optional)"
        htmlFor="capacity"
        error={fieldErrors.capacity}
      >
        <select
          id="capacity"
          name="capacity"
          defaultValue=""
          className={fieldSelectClass}
        >
          <option value="">Not sure yet</option>
          {CAPACITY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Email (optional)" htmlFor="email" error={fieldErrors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldInputClass}
        />
      </FormField>

      <FormField
        label="Brief message (optional)"
        htmlFor="message"
        hint="Materials, lead-time pressure, anything we should know."
      >
        <textarea
          id="message"
          name="message"
          rows={5}
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
        {isPending ? "Sending..." : "Get my 48-hour quote"}
      </button>

      <ConsentNote />
    </form>
  );
}
