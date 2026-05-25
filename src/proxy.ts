/**
 * Next.js 16 proxy (formerly middleware). Gates every /admin/* route behind
 * the NextAuth session. Login page is allowed through. The `authorized`
 * callback in src/lib/auth.ts decides whether the redirect fires.
 */
export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: ["/admin/:path*"],
};
