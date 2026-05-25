"use server";

import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { z } from "zod";
import { api } from "@/../convex/_generated/api";
import { sendQuoteNotification } from "@/lib/email";

const INTENT_SCHEMA = z.enum(["explore", "evaluate", "purchase", "urgent-etp"]);

const QUOTE_SCHEMA = z.object({
  intent: INTENT_SCHEMA,
  name: z.string().min(1, "Required").max(120),
  company: z.string().min(1, "Required").max(160),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  industry: z.string().max(80).optional().or(z.literal("")),
  productSlugs: z.array(z.string()).max(20).optional(),
  message: z.string().max(4000).optional().or(z.literal("")),
});

export type QuoteFormState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> }
  | { status: "success" };

export async function submitQuote(
  _previous: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const raw = {
    intent: String(formData.get("intent") ?? "explore"),
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    productSlugs: formData.getAll("productSlugs").map((v) => String(v)),
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

  try {
    await fetchMutation(api.quoteRequests.submit, {
      intent: data.intent,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || undefined,
      industry: data.industry || undefined,
      productSlugs,
      message: data.message || undefined,
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

  // Fire the email notification but do not block redirect on its outcome.
  void sendQuoteNotification({
    intent: data.intent,
    name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone || undefined,
    industry: data.industry || undefined,
    productSlugs,
    message: data.message || undefined,
  }).catch((err) => {
    console.error("[submitQuote] email failed", err);
  });

  redirect("/request-quote/success/");
}
