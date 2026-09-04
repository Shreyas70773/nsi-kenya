"use server";

import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";
import { appendToSheets } from "@/lib/sheets";
import { sendInquiryNotification } from "@/lib/email";
import { postLeadWebhook } from "@/lib/lead-webhook";
import { INQUIRY_SCHEMA } from "@/lib/validation/lead-schemas";
import { isSpam, verifyRecaptcha } from "@/lib/validation/spam";
import { leadMetadataFromForm } from "@/lib/attribution";

export type InquiryFormState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> }
  | { status: "success" };

const SUCCESS_REDIRECT: Record<string, string> = {
  consultation: "/thank-you/consultation/",
  "site-audit": "/thank-you/site-audit/",
  contact: "/request-quote/success/",
};

export async function submitInquiry(
  _previous: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  // F-7: spam-positive submissions pretend success — redirect without
  // inserting or notifying, so bots learn nothing.
  if (
    isSpam({
      honeypot: String(formData.get("company_website") ?? ""),
      renderedAt: Number(formData.get("rendered_at")),
      now: Date.now(),
    }) ||
    !(await verifyRecaptcha(String(formData.get("recaptcha_token") ?? ""))).ok
  ) {
    redirect(
      SUCCESS_REDIRECT[String(formData.get("kind") ?? "contact")] ??
        "/request-quote/success/",
    );
  }

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

  // Await the delivery attempt before redirecting. A detached promise can be
  // terminated as soon as a serverless invocation returns, dropping the
  // notification even though the lead was safely stored in Convex.
  try {
    const notification = await sendInquiryNotification({
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
    if (!notification.ok) {
      console.error("[submitInquiry] email failed", notification.error);
    }
  } catch (err) {
    console.error("[submitInquiry] email failed", err);
  }

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
  redirect(SUCCESS_REDIRECT[data.kind] ?? "/request-quote/success/");
}
