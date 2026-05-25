/**
 * Phase 0 stub. A real login form lands in Phase 3 when the admin surface
 * ships. For now this page exists so the middleware redirect lands somewhere
 * sensible and the Playwright smoke (Task 0.16) can assert the redirect
 * succeeds.
 */
import { signIn } from "@/lib/auth";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  async function signInAction(formData: FormData) {
    "use server";
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin/",
    });
  }

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-6 px-6 py-24">
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Admin sign in
      </h1>
      <p className="text-sm text-muted">
        Restricted to North Star Impex Kenya staff.
      </p>
      <form action={signInAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            className="rounded-button border border-border bg-surface px-3 py-2 text-text"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Password</span>
          <input
            name="password"
            type="password"
            required
            className="rounded-button border border-border bg-surface px-3 py-2 text-text"
          />
        </label>
        <button
          type="submit"
          className="rounded-button bg-accent px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
