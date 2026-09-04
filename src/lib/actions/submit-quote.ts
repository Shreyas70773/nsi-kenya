"use server";

import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";
import { sendQuoteNotification } from "@/lib/email";
import { appendToSheets } from "@/lib/sheets";
import { postLeadWebhook } from "@/lib/lead-webhook";
import { QUOTE_SCHEMA } from "@/lib/validation/lead-schemas";
import { isSpam, verifyRecaptcha } from "@/lib/validation/spam";
import { leadMetadataFromForm } from "@/lib/attribution";

export type QuoteFormState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> }
  | { status: "success" };

export async function submitQuote(
  _previous: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
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
    redirect("/thank-you/quote/");
  }

  const raw = {
    intent: String(formData.get("intent") ?? "explore"),
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    productSlugs: formData.getAll("productSlugs").map((v) => String(v)),
    capacity: String(formData.get("capacity") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = QUOTE_SCHEMA.safeParse(raw);
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
  const productSlugs = data.productSlugs ?? [];
  const metadata = leadMetadataFromForm(formData);

  try {
    await fetchMutation(api.quoteRequests.submit, {
      intent: data.intent,
      name: data.name,
      company: data.company,
      email: data.email || undefined,
      phone: data.phone,
      industry: data.industry || undefined,
      productSlugs,
      capacity: data.capacity || undefined,
      message: data.message || undefined,
      metadata,
    });
  } catch (e) {
    return {
      status: "error",
      message:
        e instanceof Error
          ? `Could not save your request: ${e.message}`
          : "Could not save your request.",
    };
  }

  // Await the delivery attempt before redirecting. A detached promise can be
  // terminated as soon as a serverless invocation returns, dropping the
  // notification even though the lead was safely stored in Convex.
  try {
    const notification = await sendQuoteNotification({
      intent: data.intent,
      name: data.name,
      company: data.company,
      email: data.email || undefined,
      phone: data.phone,
      industry: data.industry || undefined,
      productSlugs,
      capacity: data.capacity || undefined,
      message: data.message || undefined,
      metadata,
    });
    if (!notification.ok) {
      console.error("[submitQuote] email failed", notification.error);
    }
  } catch (err) {
    console.error("[submitQuote] email failed", err);
  }

  void postLeadWebhook({
    form_type: "quote",
    submitted_at: new Date().toISOString(),
    intent: data.intent,
    name: data.name,
    company: data.company,
    email: data.email || undefined,
    phone: data.phone,
    industry: data.industry || undefined,
    product_slugs: productSlugs.join(", "),
    capacity: data.capacity || undefined,
    message: data.message || undefined,
    ...(metadata ?? {}),
  });

  // Also mirror to Google Sheets for the sales team's working spreadsheet.
  void appendToSheets({
    form_type: "quote",
    submitted_at: new Date().toISOString(),
    intent: data.intent,
    name: data.name,
    company: data.company,
    email: data.email || undefined,
    phone: data.phone,
    industry: data.industry || undefined,
    product_slugs: productSlugs.join(", "),
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

  // The thank-you URL is the GA4/Meta conversion trigger (GC-7).
  redirect("/thank-you/quote/");
}
