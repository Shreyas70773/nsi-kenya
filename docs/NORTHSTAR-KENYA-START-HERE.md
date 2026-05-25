# North Star Impex Kenya — Project Router

> Start-here orientation for anyone (human or Claude) opening this repo for the first time. Read this end-to-end, then read the four foundation documents in order before touching code.

This is the **North Star Impex Kenya** website — a B2B industrial supplier site for tanks, silos, structural works, process instruments, and optional cloud-ready IoT monitoring. Kenya-focused, East Africa expansion. The four foundation docs below were originally drafted in the Pumea (UAE) workspace and migrated into this repo at Phase 0 Task 0.2 — paths below are now repo-relative.

---

## The four documents you must read, in order

All paths below are absolute and stable. Read them in order. Do not skip any. Do not start implementing before all four are read.

### 1. Bootstrap (5 min)

**`docs/superpowers/specs/NEXT-CONTEXT-START-HERE-northstar-kenya.md`**

Five-minute orientation: what's decided, what's open, the hard constraints, the common pitfalls. If you only have time for one doc before responding to the user, this is it.

### 2. Foundation spec (30 min)

**`docs/superpowers/specs/2026-05-25-northstar-kenya-design.md`**

1,091 lines. 10 sections covering positioning, ICP & buyer journey, IA & route map, content scope per page, SEO map + schema + keyword strategy, IoT product narrative, design tokens & component direction, tech stack & repo layout, trust-constraint plan, pre-launch research checklist. Two appendices: locked decisions, and how the doc transfers contexts. **This is the design authority.** When in doubt during implementation, this doc wins.

### 3. SERP research snapshot (10 min)

**`docs/superpowers/research/2026-05-25-kenya-serp-snapshot.md`**

Raw Firecrawl competitive intelligence captured 2026-05-25 for six strategic Kenya queries (SS tanks, silos, ETP, zinc-alum, instruments, IoT monitoring). Top-10 SERP results per query with named competitors, ranking patterns, and exploitation strategy. **Re-run if more than 30 days have elapsed since 2026-05-25.** Re-run commands are documented in the snapshot itself.

### 4. Implementation plan (45 min)

**`docs/superpowers/plans/2026-05-25-northstar-kenya-implementation-plan.md`**

1,666 lines. Six phases:

| Phase | What it produces |
|---|---|
| **Phase 0** | Repo bootstrap: Next.js + TS + Tailwind + Drizzle/Postgres + NextAuth + Vercel Blob, content-map, sitemap, robots, llms.txt, llms-full.txt, JSON-LD generators, design tokens, CI, deploy |
| **Phase 1** | ~28 day-1 marketing pages: homepage, 4 flagship products, F&B + ETP industries, Crywan case study, About, Nairobi geo-flagship, all conversion routes including `/talk-to-a-customer/` |
| **Phase 2** | Tier 2 expansion: remaining products, all 6 instrument categories, F&B sub-applications, more locations, resources hub |
| **Phase 3** | Auth-gated `/admin/` with CRUD for case studies, blog, spec sheets, media, IoT screenshots, settings |
| **Phase 4** | Programmatic SEO: `/best/`, `/compare/`, `/cost/` surfaces + TCO calculator + NEMA compliance checker |
| **Phase 5** | IoT product deep build with Figma-driven app mockups |

**Phase 0 is implementable from the plan alone** — full TDD detail, exact code, exact commands. Phases 1–5 are at moderate depth (task tables, file maps, test approaches); you'll expand each into full TDD detail when its time comes.

---

## Two source documents the user provided (optional reads)

These informed the spec. Read them only if you need deeper context than the spec captures.

- **`C:/Users/Shreyas Sunil/Downloads/ICP_Profile_Industrial_Tanks_East_Africa.md`** — canonical East Africa buyer psychology, decision-maker dynamics, industry priorities, competitive context. The spec consumes this; the source has more nuance on specific buyer triggers.
- **`C:/Users/Shreyas Sunil/Downloads/supmea-list.md`** — full 154-SKU instrument inventory backing the "any instrument can be cloud-connected" claim on the IoT page. **Supmea partnership is private — never mention it in user-facing copy.**

## One structural reference (optional read)

**`C:/Users/Shreyas Sunil/pumea/website/`** — the existing Pumea UAE codebase. Use as **structural reference only**: Next.js 14 App Router patterns, `src/lib/content-map.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`. **Do not copy** the brand, palette, copy, or visual identity. North Star is an independent brand with no public link to Pumea.

---

## Hard constraints (non-negotiable)

1. **No public mention of Pumea, Pacific Unity, or Supmea** in user-facing copy. North Star is positioned as an independent Kenyan brand.
2. **No gradients anywhere.** Solid colors, flat surfaces, real photography.
3. **No fabricated image URLs and no stock filler.** The user generates all imagery via their own image-gen tools. Your job is to (a) place intentional placeholders with the right aspect ratio and a labeled subject, and (b) surface a specific, art-directed image prompt at the end of every message that introduces an image slot. See `<ImagePlaceholder>` spec in plan Phase 0 Task 0.10.
4. **No combinatorial programmatic SEO.** Each `/best/`, `/compare/`, `/cost/` page is hand-edited with 300–500+ words of unique content. Pick the 20–30 permutations that map to real customer questions — don't generate hundreds.
5. **No customer login portal at launch.** The IoT page is marketing-only. Section 6 of the spec gives the full IoT framing.
6. **No e-commerce.** Everything routes to quote/consultation/talk-to-a-customer.
7. **No `/solutions/` or `/systems/` taxonomies.** One taxonomy only: Products × Industries. The `/best/` programmatic surface is the intersection layer.
8. **English only at launch.** No Swahili copy. East African business English register — not GCC/Arabic, not American B2B SaaS.

## Five things that make this site win

These five are repeated everywhere. If you remember nothing else from the spec, remember these:

1. **Crywan Industries named above the fold on the homepage.** It's the single most load-bearing sentence on the site. The Kenya ICP's first question is "have you done this in Kenya?" — Crywan answers it before they have to ask.
2. **NEMA discharge parameters table on `/industries/etp-water-treatment/`** with EMCA CAP 387 reference. No Kenya competitor publishes this on a supplier site. Owning it = ranking #1 for ETP-compliance queries.
3. **Zinc-alum vs carbon steel TCO content on `/compare/zinc-alum-vs-carbon-steel/`** with embedded calculator. The easiest-close argument per the ICP. No competitor publishes this.
4. **Safaricom NB-IoT named explicitly on `/products/iot/`.** Local connectivity signal no international competitor has. The IoT lane is open in Kenya — no native player ranks for tank monitoring queries.
5. **`/talk-to-a-customer/` as a real URL** (not a modal button). Honest disclosure that Crywan is the current primary reference. Trust-gate as first-class IA decision.

---

## What to do right now

1. **Read all four documents above in order.** Do not skip the foundation spec. Most of your decisions will reference it.

2. **Check progress.** This repo already has Phase 0 underway. Look at `git log --oneline` to see what tasks have shipped. The implementation plan's checkbox lists are the source of truth for what's done vs. pending.

3. **Continue with the next pending task in Phase 0**, then pause for user review before Phase 1.

4. **One commit per task.** Follow the commit message style established in this repo's history (`<scope>: <imperative>`).

5. **Pause for user review at the end of Phase 0.** Phase 0 is the foundation everything else builds on. Don't proceed into Phase 1 without an explicit sign-off from the user — Phase 1 also depends on the Figma palette being defined, which is the user's gating deliverable.

6. **Surface image prompts at the end of every page-scaffold message.** Format:
   ```
   IMAGE PROMPTS — [page]
   1. [Slot location] ([role], aspect ratio)
      Prompt: "[specific, art-directed prompt]"
   ```
   The user generates each image and uploads it. Never fabricate image URLs.

---

## Where to put new artifacts

When you produce planning docs, content briefs, research outputs, or image-prompt collections during implementation, put them under `docs/`:

```
docs/superpowers/specs/         — additional design specs, decision records
docs/superpowers/research/      — competitor scrapes, keyword studies, regulatory captures
docs/superpowers/plans/         — per-phase detailed implementation plans
docs/content-briefs/            — per-page content briefs (one per Tier 1 page)
docs/image-prompts.md           — consolidated image generation prompt library
```

The four foundation docs stay where they are (committed and immutable as the project's design record). Add to the system; don't edit the foundation docs without an explicit user instruction.

---

## If something is unclear

- **Spec is ambiguous** → ask the user. Do not infer.
- **Spec is silent on a decision** → ask the user. Do not invent.
- **Kenya market detail seems off** → re-run the Firecrawl SERP queries (commands documented in the SERP snapshot doc).
- **A competitor mentioned in the spec is no longer ranking** → SERP snapshot is stale; re-run.
- **A locked decision in Appendix A of the foundation spec seems wrong** → ask the user before deviating.

## Skills to use during implementation

- `superpowers:executing-plans` or `superpowers:subagent-driven-development` — to work through the implementation plan task-by-task
- `superpowers:verification-before-completion` — before claiming any task or phase complete
- `superpowers:test-driven-development` — for every task involving logic (content-map integrity, sitemap generation, JSON-LD validity, form-submission paths, calculator math, auth flows, CRUD operations)
- `superpowers:systematic-debugging` — when anything breaks
- `superpowers:writing-skills` — if you discover a pattern worth codifying
- `figma:figma-use` and the related Figma skills — when pulling design from the user's Figma file

---

*That's it. Open the four foundation docs and start reading. The plan tells you exactly what to build, and the spec tells you exactly what each page must say. The user wants this site to win in Kenya — every decision in the foundation docs serves that goal.*
