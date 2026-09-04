import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation } from "./_generated/server";

/**
 * Public submit mutation for /request-quote/ (and its four intent variants).
 * Inserts a row into quoteRequests with status "new", then schedules the
 * notification inside Convex so it survives the originating web request.
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
    email: v.optional(v.string()),
    phone: v.string(),
    industry: v.optional(v.string()),
    productSlugs: v.array(v.string()),
    capacity: v.optional(v.string()),
    message: v.optional(v.string()),
    metadata: v.optional(
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
    ),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("quoteRequests", {
      ...args,
      status: "new",
    });
    await ctx.scheduler.runAfter(0, internal.notifications.sendQuote, {
      quoteRequestId: id,
      ...args,
    });
    return { id };
  },
});
