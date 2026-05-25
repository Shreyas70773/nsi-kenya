import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Public submit mutation for /request-quote/ (and its four intent variants).
 * Inserts a row into quoteRequests with status "new". The Next.js route
 * handler that calls this also fires sendQuoteNotification via Resend
 * after the mutation resolves.
 */
export const submit = mutation({
  args: {
    intent: v.union(
      v.literal("explore"),
      v.literal("evaluate"),
      v.literal("purchase"),
      v.literal("urgent-etp"),
    ),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    industry: v.optional(v.string()),
    productSlugs: v.array(v.string()),
    message: v.optional(v.string()),
    metadata: v.optional(
      v.object({
        referrer: v.optional(v.string()),
        utmSource: v.optional(v.string()),
        utmMedium: v.optional(v.string()),
        utmCampaign: v.optional(v.string()),
        userAgent: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("quoteRequests", {
      ...args,
      status: "new",
    });
    return { id };
  },
});
