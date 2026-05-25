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

const INITIAL: InquiryFormState = { status: "idle" };

type Props = {
  kind: "contact" | "consultation" | "site-audit";
  submitLabel?: string;
  showTopic?: boolean;
  showSiteLocation?: boolean;
  topicLabel?: string;
  topicHint?: string;
};

export function InquiryForm({
  kind,
  submitLabel = "Send",
  showTopic = false,
  showSiteLocation = false,
  topicLabel = "Topic",
  topicHint,
}: Props) {
  const [state, formAction, isPending] = useActionState(submitInquiry, INITIAL);
  const fieldErrors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="kind" value={kind} />

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

      {showTopic ? (
        <FormField label={topicLabel} htmlFor="topic" hint={topicHint}>
          <input
            id="topic"
            name="topic"
            type="text"
            className={fieldInputClass}
          />
        </FormField>
      ) : null}

      <FormField label="Message" htmlFor="message">
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

      <p className="text-xs text-faint">
        Required fields marked with an asterisk. We respond within 48
        working hours.
      </p>
    </form>
  );
}
