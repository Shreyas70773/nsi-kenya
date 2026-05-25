/**
 * Build-time check: every <img> and <Image> tag in src/ must have an `alt`
 * attribute (or use the ImagePlaceholder component, which sets an
 * aria-label internally). Runs before `next build` via the prebuild script.
 *
 * Greps for <img / <Image and verifies the surrounding tag contains alt=.
 * Cheap and good enough — a perfect implementation would use a real JSX
 * parser, but this catches the common regressions.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const SRC = join(process.cwd(), "src");
const EXT = new Set([".tsx", ".jsx"]);

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (EXT.has(extname(entry))) yield p;
  }
}

const TAG_RE = /<(img|Image)\b([^>]*?)\/?>/g;
const offenders: { file: string; line: number; snippet: string }[] = [];

for (const file of walk(SRC)) {
  const text = readFileSync(file, "utf8");
  let m: RegExpExecArray | null;
  while ((m = TAG_RE.exec(text)) !== null) {
    const attrs = m[2] ?? "";
    if (!/\balt\s*=/.test(attrs)) {
      const line = text.slice(0, m.index).split("\n").length;
      offenders.push({ file, line, snippet: m[0] });
    }
  }
}

if (offenders.length > 0) {
  console.error("✖ Missing alt= attribute on:");
  for (const o of offenders) {
    console.error(`  ${o.file}:${o.line}  ${o.snippet}`);
  }
  process.exit(1);
}

console.log("✓ alt-text check passed");
