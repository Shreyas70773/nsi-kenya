"use server";

import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";
import { appendToSheets } from "@/lib/sheets";
import { sendInquiryNotification } from "@/lib/email";
import { postLeadWebhook } from "@/lib/lead-webhook";
import { INQUIRY_SCHEMA } from "@/lib/validation/lead-schemas";
import { leadMetadataFromForm } from "@/lib/attribution";

export type InquiryFormState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> }
  | { status: "success" };

export async function submitInquiry(
  _previous: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const raw = {
    kind: String(formData.get("kind") ?? "contact"),
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    siteLocation: String(formData.get("siteLocation") ?? ""),
    topic: String(formData.get("topic") ?? ""),
    capacity: String(formData.get("capacity") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = INQUIRY_SCHEMA.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string") fieldErrors[path] = issue.message;
    }
    return {
      status: "error",
      message: "Some fields need a second look.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const metadata = leadMetadataFromForm(formData);

  try {
    await fetchMutation(api.inquiries.submit, {
      kind: data.kind,
      name: data.name,
      company: data.company,
      email: data.email || undefined,
      phone: data.phone,
      industry: data.industry || undefined,
      siteLocation: data.siteLocation || undefined,
      topic: data.topic || undefined,
      capacity: data.capacity || undefined,
      message: data.message || undefined,
      metadata,
    });
  } catch (e) {
    return {
      status: "error",
      message:
        e instanceof Error
          ? `Could not submit: ${e.message}`
          : "Could not submit your request.",
    };
  }

  // Notify sales immediately (GC-9) without blocking the redirect.
  void sendInquiryNotification({
    kind: data.kind,
    name: data.name,
    company: data.company,
    email: data.email || undefined,
    phone: data.phone,
    industry: data.industry || undefined,
    siteLocation: data.siteLocation || undefined,
    topic: data.topic || undefined,
    capacity: data.capacity || undefined,
    message: data.message || undefined,
    metadata,
  }).catch((err) => {
    console.error("[submitInquiry] email failed", err);
  });

  void postLeadWebhook({
    form_type: "inquiry",
    submitted_at: new Date().toISOString(),
    kind: data.kind,
    name: data.name,
    company: data.company,
    email: data.email || undefined,
    phone: data.phone,
    industry: data.industry || undefined,
    site_location: data.siteLocation || undefined,
    topic: data.topic || undefined,
    capacity: data.capacity || undefined,
    message: data.message || undefined,
    ...(metadata ?? {}),
  });

  void appendToSheets({
    form_type: "inquiry",
    submitted_at: new Date().toISOString(),
    kind: data.kind,
    name: data.name,
    company: data.company,
    email: data.email || undefined,
    phone: data.phone,
    industry: data.industry || undefined,
    site_location: data.siteLocation || undefined,
    topic: data.topic || undefined,
    capacity: data.capacity || undefined,
    message: data.message || undefined,
    utm_source: metadata?.utmSource,
    utm_medium: metadata?.utmMedium,
    utm_campaign: metadata?.utmCampaign,
    utm_content: metadata?.utmContent,
    gclid: metadata?.gclid,
    fbclid: metadata?.fbclid,
    landing_page: metadata?.landingPage,
    source_code: metadata?.sourceCode,
  });

  // Per-journey thank-you URLs are the conversion triggers (GC-7);
  // plain contact keeps the original confirmation page.
  redirect(
    data.kind === "consultation"
      ? "/thank-you/consultation/"
      : data.kind === "site-audit"
        ? "/thank-you/site-audit/"
        : "/request-quote/success/",
  );
}
