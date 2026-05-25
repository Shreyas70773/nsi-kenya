/**
 * Admin-credential verification action. Lives in its own file (not users.ts)
 * because Convex requires action files to be separate when they might need
 * the Node runtime. bcryptjs is pure-JS and currently runs fine in the
 * default V8 runtime, but isolating it keeps the option open.
 *
 * Flow:
 *   NextAuth Credentials authorize() (src/lib/auth.ts, runs in Next Node env)
 *     → fetchAction(api.adminCredentials.verifyCredentials, { email, password })
 *     → internal.users.findByEmailInternal
 *     → bcrypt.compare(password, row.passwordHash)
 *     → returns { userId, email, role, name } on success, null on fail
 *
 * The password hash NEVER leaves the Convex side of the wire. The action
 * is public-callable, but it returns null on bad credentials so it cannot
 * be used as an email-enumeration oracle without timing-side-channel work
 * (which bcrypt's constant-time compare already mitigates).
 */
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

export const verifyCredentials = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (
    ctx,
    args,
  ): Promise<{
    userId: string;
    email: string;
    role: "admin" | "editor";
    name: string | null;
  } | null> => {
    const user = await ctx.runQuery(internal.users.findByEmailInternal, {
      email: args.email,
    });
    if (!user) return null;
    const ok = await bcrypt.compare(args.password, user.passwordHash);
    if (!ok) return null;
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
  },
});
