/**
 * Helper for creating the first admin user (or rotating an existing one's
 * password) in Convex.
 *
 * Internal Convex functions cannot be called via HTTP, so this script just
 * computes the bcrypt hash and prints the exact `npx convex run` command
 * to execute. Copy-paste the printed command into your terminal — it will
 * call the internal `users:seedAdminInternal` mutation under your logged-in
 * Convex session.
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts <email> <password> [display-name]
 *
 * Example:
 *   npx tsx scripts/seed-admin.ts shreyas@example.com 'My$tronGPa55' "Shreyas"
 *
 * Then run the printed command. Re-running with the same email rotates
 * the password (the mutation is idempotent on email).
 */
import bcrypt from "bcryptjs";

async function main() {
  const [, , email, password, name] = process.argv;
  if (!email || !password) {
    console.error(
      "Usage: npx tsx scripts/seed-admin.ts <email> <password> [display-name]",
    );
    process.exit(1);
  }

  console.log("Hashing password with bcrypt cost 12...");
  const passwordHash = await bcrypt.hash(password, 12);

  const args: { email: string; passwordHash: string; name?: string } = {
    email,
    passwordHash,
  };
  if (name) args.name = name;

  console.log("");
  console.log("Run this command (requires a logged-in `npx convex` session):");
  console.log("");
  console.log(`  npx convex run users:seedAdminInternal '${JSON.stringify(args)}'`);
  console.log("");
  console.log(
    "Re-running with the same email rotates the password (idempotent).",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
