import { v } from "convex/values";
import { internalAction } from "./_generated/server";

const SITE_URL = "https://northstarimpex.co.ke";
const DEFAULT_FROM = "North Star Impex Website <onboarding@resend.dev>";
const DEFAULT_RECIPIENT = "info@northstarimpex.co.ke";

const metadataValidator = v.optional(
  v.object({
    referrer: v.optional(v.string()),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    utmContent: v.optional(v.string()),
    gclid: v.optional(v.string()),
    fbclid: v.optional(v.string()),
    landingPage: v.optional(v.string()),
    sourceCode: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  }),
);

type Metadata = {
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  landingPage?: string;
  sourceCode?: string;
  userAgent?: string;
};

function recipients(): string[] {
  const configured = process.env.LEAD_NOTIFICATION_EMAILS ?? "";
  const values = configured
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return [...new Set(values.length > 0 ? values : [DEFAULT_RECIPIENT])];
}

function attributionLines(metadata?: Metadata): string[] {
  if (!metadata) return [];
  const values: Array<[string, string | undefined]> = [
    ["Source", metadata.utmSource],
    ["Medium", metadata.utmMedium],
    ["Campaign", metadata.utmCampaign],
    ["Content", metadata.utmContent],
    ["gclid", metadata.gclid],
    ["fbclid", metadata.fbclid],
    ["Landing page", metadata.landingPage],
    ["Referrer", metadata.referrer],
    ["Source code", metadata.sourceCode],
  ];
  const defined = values.filter((entry): entry is [string, string] =>
    Boolean(entry[1]),
  );
  if (defined.length === 0) return [];
  return ["", "Attribution:", ...defined.map(([label, value]) => `${label}: ${value}`)];
}

function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

async function deliver(input: {
  idempotencyKey: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured on the Convex deployment");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": input.idempotencyKey,
    },
    body: JSON.stringify({
      from: process.env.LEAD_NOTIFICATION_FROM ?? DEFAULT_FROM,
      to: recipients(),
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      subject: oneLine(input.subject),
      text: input.text,
    }),
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    throw new Error(`Resend rejected the notification (${response.status}): ${detail}`);
  }
}

function describeIntent(
  intent: "explore" | "evaluate" | "purchase" | "urgent-etp",
): string {
  switch (intent) {
    case "explore":
      return "Exploring options";
    case "evaluate":
      return "Technical evaluation";
    case "purchase":
      return "Ready to purchase";
    case "urgent-etp":
      return "URGENT (ETP compliance deadline)";
  }
}

const quoteArgs = {
  quoteRequestId: v.id("quoteRequests"),
  intent: v.union(
    v.literal("explore"),
    v.literal("evaluate"),
    v.literal("purchase"),
    v.literal("urgent-etp"),
  ),
  name: v.string(),
  company: v.string(),
  email: v.optional(v.string()),
  phone: v.string(),
  industry: v.optional(v.string()),
  productSlugs: v.array(v.string()),
  capacity: v.optional(v.string()),
  message: v.optional(v.string()),
  metadata: metadataValidator,
};

export const sendQuote = internalAction({
  args: quoteArgs,
  handler: async (_ctx, quote) => {
    const intent = describeIntent(quote.intent);
    const text = [
      `Request type: ${intent}`,
      `Name: ${quote.name}`,
      `Company: ${quote.company}`,
      `Phone: ${quote.phone}`,
      quote.email ? `Email: ${quote.email}` : null,
      quote.industry ? `Industry: ${quote.industry}` : null,
      quote.productSlugs.length > 0
        ? `Products: ${quote.productSlugs.join(", ")}`
        : null,
      quote.capacity ? `Capacity: ${quote.capacity}` : null,
      quote.message ? `\nMessage:\n${quote.message}` : null,
      ...attributionLines(quote.metadata),
      "",
      `Reply to: ${quote.email ?? quote.phone}`,
      `Source: ${SITE_URL}`,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    await deliver({
      idempotencyKey: `quote-${quote.quoteRequestId}`,
      subject: `New quote request (${intent}): ${quote.company}`,
      text,
      replyTo: quote.email,
    });
  },
});

const inquiryArgs = {
  inquiryId: v.id("inquiries"),
  kind: v.union(
    v.literal("contact"),
    v.literal("consultation"),
    v.literal("site-audit"),
  ),
  name: v.string(),
  company: v.string(),
  email: v.optional(v.string()),
  phone: v.string(),
  industry: v.optional(v.string()),
  siteLocation: v.optional(v.string()),
  topic: v.optional(v.string()),
  capacity: v.optional(v.string()),
  message: v.optional(v.string()),
  metadata: metadataValidator,
};

const inquiryLabels = {
  contact: "contact message",
  consultation: "consultation request",
  "site-audit": "site-audit request",
} as const;

export const sendInquiry = internalAction({
  args: inquiryArgs,
  handler: async (_ctx, inquiry) => {
    const label = inquiryLabels[inquiry.kind];
    const text = [
      `Request type: ${label}`,
      `Name: ${inquiry.name}`,
      `Company: ${inquiry.company}`,
      `Phone: ${inquiry.phone}`,
      inquiry.email ? `Email: ${inquiry.email}` : null,
      inquiry.industry ? `Sector: ${inquiry.industry}` : null,
      inquiry.siteLocation ? `Location: ${inquiry.siteLocation}` : null,
      inquiry.topic ? `Topic: ${inquiry.topic}` : null,
      inquiry.capacity ? `Capacity: ${inquiry.capacity}` : null,
      inquiry.message ? `\nMessage:\n${inquiry.message}` : null,
      ...attributionLines(inquiry.metadata),
      "",
      `Reply to: ${inquiry.email ?? inquiry.phone}`,
      `Source: ${SITE_URL}`,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    await deliver({
      idempotencyKey: `inquiry-${inquiry.inquiryId}`,
      subject: `New ${label}: ${inquiry.company}`,
      text,
      replyTo: inquiry.email,
    });
  },
});
