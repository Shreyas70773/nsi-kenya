import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Public submit mutation for /contact/, /book-consultation/, /request-site-audit/.
 * Always lands the row with status "new". Notification email is sent
 * server-side by the Next.js route handler after this mutation resolves
 * (so we don't pay the Resend cost inside the Convex action runtime).
 */
export const submit = mutation({
  args: {
    kind: v.union(
      v.literal("contact"),
      v.literal("consultation"),
      v.literal("site-audit"),
    ),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    industry: v.optional(v.string()),
    siteLocation: v.optional(v.string()),
    topic: v.optional(v.string()),
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
    const id = await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
    });
    return { id };
  },
});
