"use server";

import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { z } from "zod";
import { api } from "@/../convex/_generated/api";
import { appendToSheets } from "@/lib/sheets";

const KIND_SCHEMA = z.enum(["contact", "consultation", "site-audit"]);

const INQUIRY_SCHEMA = z.object({
  kind: KIND_SCHEMA,
  name: z.string().min(1, "Required").max(120),
  company: z.string().min(1, "Required").max(160),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  industry: z.string().max(80).optional().or(z.literal("")),
  siteLocation: z.string().max(200).optional().or(z.literal("")),
  topic: z.string().max(200).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
});

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

  try {
    await fetchMutation(api.inquiries.submit, {
      kind: data.kind,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || undefined,
      industry: data.industry || undefined,
      siteLocation: data.siteLocation || undefined,
      topic: data.topic || undefined,
      message: data.message || undefined,
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

  void appendToSheets({
    form_type: "inquiry",
    submitted_at: new Date().toISOString(),
    kind: data.kind,
    name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone || undefined,
    industry: data.industry || undefined,
    site_location: data.siteLocation || undefined,
    topic: data.topic || undefined,
    message: data.message || undefined,
  });

  redirect("/request-quote/success/");
}
