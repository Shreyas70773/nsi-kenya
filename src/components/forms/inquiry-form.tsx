"use client";

import { useActionState } from "react";
import {
  FormField,
  fieldInputClass,
  fieldTextareaClass,
  fieldSelectClass,
} from "@/components/primitives/form-field";
import {
  submitInquiry,
  type InquiryFormState,
} from "@/lib/actions/submit-inquiry";
import { markLeadPending } from "@/lib/lead-pending";
import { AttributionFields } from "@/components/forms/attribution-fields";
import { ConsentNote } from "@/components/forms/consent-note";
import { SpamFields } from "@/components/forms/spam-fields";
import { CAPACITY_OPTIONS } from "@/lib/validation/lead-schemas";

const INITIAL: InquiryFormState = { status: "idle" };

type Props = {
  kind: "contact" | "consultation" | "site-audit";
  submitLabel?: string;
  showTopic?: boolean;
  showSiteLocation?: boolean;
  showCapacity?: boolean;
  topicLabel?: string;
  topicHint?: string;
};

/**
 * Shared inquiry form (contact / consultation / site-audit), F-3 field
 * order: Name* → Phone* → Company* → Sector* → Requirement* (topic, when
 * shown) → Capacity → Email → Message. Topic doubles as the journey's
 * required "Requirement" for consultation and site-audit.
 */
export function InquiryForm({
  kind,
  submitLabel = "Send",
  showTopic = false,
  showSiteLocation = false,
  showCapacity = false,
  topicLabel = "Topic",
  topicHint,
}: Props) {
  const [state, formAction, isPending] = useActionState(submitInquiry, INITIAL);
  const fieldErrors = state.status === "error" ? state.fieldErrors ?? {} : {};
  const topicRequired = showTopic && kind !== "contact";

  return (
    <form
      action={formAction}
      // Route kind uses hyphens; the dataLayer journey contract (GC-5)
      // uses underscores — convert once here.
      onSubmit={() =>
        markLeadPending(kind === "site-audit" ? "site_audit" : kind)
      }
      className="flex flex-col gap-6"
    >
      <input type="hidden" name="kind" value={kind} />
      <AttributionFields />
      <SpamFields action={kind} />

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

      {showTopic ? (
        <FormField
          label={topicLabel}
          htmlFor="topic"
          required={topicRequired}
          error={fieldErrors.topic}
          hint={topicHint}
        >
          <input
            id="topic"
            name="topic"
            type="text"
            required={topicRequired}
            className={fieldInputClass}
          />
        </FormField>
      ) : null}

      {showSiteLocation ? (
        <FormField
          label="Plant location"
          htmlFor="siteLocation"
          hint="Industrial estate, town, or county. We schedule the visit around access."
        >
          <input
            id="siteLocation"
            name="siteLocation"
            type="text"
            className={fieldInputClass}
            placeholder="e.g. Athi River, Mlolongo, Mombasa Road"
          />
        </FormField>
      ) : null}

      {showCapacity ? (
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
      ) : null}

      <FormField label="Email (optional)" htmlFor="email" error={fieldErrors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldInputClass}
        />
      </FormField>

      <FormField label="Brief message (optional)" htmlFor="message">
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
        {isPending ? "Sending..." : submitLabel}
      </button>

      <ConsentNote />
    </form>
  );
}
