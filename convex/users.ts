import { v } from "convex/values";
import { internalQuery, internalMutation } from "./_generated/server";

/**
 * Internal-only — called from src/lib/auth.ts (NextAuth Credentials authorize
 * callback) via fetchQuery with the Convex deploy key. Returns only the fields
 * NextAuth needs to verify a credential and build a JWT.
 *
 * NEVER expose this as a public `query` — passwordHash must not leave the
 * server-trust boundary.
 */
export const findByEmailInternal = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (!user) return null;
    return {
      id: user._id,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      name: user.name ?? null,
    };
  },
});

/**
 * Seed mutation — used once to create the first admin row. Run from a setup
 * script (`scripts/seed-admin.ts`) once the user provides an email + a
 * bcrypt-hashed password.
 *
 * Internal-only — never exposed publicly. Idempotent on email.
 */
export const seedAdminInternal = internalMutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, {
        passwordHash: args.passwordHash,
        name: args.name,
      });
      return { id: existing._id, created: false };
    }
    const id = await ctx.db.insert("users", {
      email: args.email,
      passwordHash: args.passwordHash,
      role: "admin",
      name: args.name,
    });
    return { id, created: true };
  },
});
