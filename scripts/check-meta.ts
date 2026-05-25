/**
 * Build-time check: every page.tsx must export `metadata` with both a title
 * and a description (or a generateMetadata function). The root layout's
 * default metadata covers the homepage, so it's allowed to skip the export.
 *
 * Runs before `next build` via the prebuild script.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";

const APP = join(process.cwd(), "src", "app");

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (basename(entry) === "page.tsx") yield p;
  }
}

// The homepage inherits from the root layout's default metadata.
const ALLOW_SKIP = new Set<string>([join(APP, "(marketing)", "page.tsx")]);

const offenders: { file: string; reason: string }[] = [];

for (const file of walk(APP)) {
  if (ALLOW_SKIP.has(file)) continue;
  const text = readFileSync(file, "utf8");
  const hasMetadata =
    /export\s+const\s+metadata/.test(text) ||
    /export\s+(async\s+)?function\s+generateMetadata/.test(text);
  if (!hasMetadata) {
    offenders.push({ file, reason: "no metadata export" });
    continue;
  }
  if (/export\s+const\s+metadata/.test(text)) {
    const hasTitle = /\btitle\s*:/.test(text);
    const hasDesc = /\bdescription\s*:/.test(text);
    if (!hasTitle || !hasDesc) {
      offenders.push({
        file,
        reason: `metadata missing ${[!hasTitle && "title", !hasDesc && "description"]
          .filter(Boolean)
          .join(" + ")}`,
      });
    }
  }
}

if (offenders.length > 0) {
  console.error("✖ Metadata check failed:");
  for (const o of offenders) {
    console.error(`  ${o.file}  — ${o.reason}`);
  }
  process.exit(1);
}

console.log("✓ metadata check passed");
