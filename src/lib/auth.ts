/**
 * NextAuth.js v5 (Auth.js) configuration. Admin-only Credentials provider,
 * JWT session strategy. Admin user records live in Convex; password
 * verification happens server-side via the Convex `verifyCredentials` action
 * so the password hash never crosses the wire.
 *
 * Stack-overrides memo: @auth/convex-adapter is not published on npm
 * (verified 2026-05-25). This wiring is the closest approximation to "NextAuth
 * with Convex" — Convex stores the user records, JWT carries the session.
 */
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetchAction } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";

const config = {
  providers: [
    Credentials({
      name: "Admin credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        if (!creds?.email || !creds.password) return null;
        const email = String(creds.email);
        const password = String(creds.password);
        const result = await fetchAction(api.adminCredentials.verifyCredentials, {
          email,
          password,
        });
        if (!result) return null;
        return {
          id: result.userId,
          email: result.email,
          name: result.name ?? undefined,
          role: result.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user && "role" in user) {
        token.role = (user as { role: "admin" | "editor" }).role;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user && token.role) {
        (session.user as { role?: "admin" | "editor" }).role = token.role as
          | "admin"
          | "editor";
      }
      return session;
    },
    authorized: ({ auth, request }) => {
      const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPath = request.nextUrl.pathname.startsWith("/admin/login");
      if (!isAdminPath || isLoginPath) return true;
      return Boolean(auth?.user);
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
