---
title: North Star Impex Kenya — Next-Context Bootstrap
purpose: 5-minute orientation for a fresh Claude session that has never seen this project
date: 2026-05-25
read-first: true
---

# Start Here — North Star Impex Kenya Website Build

> **You are a fresh Claude session opening this repo for the first time.** This file is the 5-minute bootstrap. Read it end-to-end, then follow the "What to do next" section at the bottom.

## What this project is

A **new B2B marketing + sales website** for **North Star Impex Kenya LTD** — an industrial infrastructure supplier (tanks, silos, structural works, process instruments, optional IoT monitoring) serving Kenya and East Africa.

**The website is NOT built yet.** This repo (`pumea/`) is the *Pumea UAE* website — used as the structural reference. North Star Kenya will be a **new standalone repo** when implementation starts.

## What's already decided (do not re-derive)

Read the design-locked decisions in **Appendix A of the main spec**. Highlights:

- Independent brand, no public Pumea link
- Company: **North Star Impex Kenya LTD**, domain `northstarimpex.co.ke`
- Codebase: **new standalone repo** (not part of `pumea/`)
- Instruments: **category pages only** (6 pages, not 154 SKU pages)
- IoT: **marketing + lightweight product page**, no pricing shown, optional capability
- Geo: **Kenya cities individually**, East Africa neighbors at country page only
- Reference client: **Crywan Industries** is the only named Kenya anchor — design around it
- Languages: **English only** at launch
- Design: **user designs in Figma**, hands to implementation via Figma MCP. Spec defines engineering rules only.
- Images: **user generates personally**; implementation provides specific prompts + intentional placeholders

## The three documents you must read (in order)

1. **[`2026-05-25-northstar-kenya-design.md`](./2026-05-25-northstar-kenya-design.md)** — the main foundation document. 10 sections covering positioning, ICP, IA, content scope, SEO, IoT, design, tech stack, trust constraints, and the pre-launch research checklist. **This is the design authority.** If something is ambiguous, prefer the explicit guidance here over inference.

2. **[`../research/2026-05-25-kenya-serp-snapshot.md`](../research/2026-05-25-kenya-serp-snapshot.md)** — raw Firecrawl competitive intelligence captured 2026-05-25. The keyword strategy and competitor list in the main spec are derived from this. **Re-run if more than 30 days have elapsed.**

3. **The source ICP doc** (if available at `C:/Users/Shreyas Sunil/Downloads/ICP_Profile_Industrial_Tanks_East_Africa.md`) — the canonical East Africa buyer-psychology source. The main spec consumes it; the doc itself has more nuance.

## Optional reading (when relevant)

- **`C:/Users/Shreyas Sunil/Downloads/supmea-list.md`** — full 154-SKU instrument inventory. Used to back the "any instrument" IoT claim. Not surfaced publicly. Supmea partnership is **private** — never mention.
- **`pumea/website/`** — the Pumea UAE codebase. Use as **structural reference** for: Next.js 14 App Router patterns, `src/lib/content-map.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`. **Do not** copy the brand, palette, copy, or visual identity.
- **`pumea/.claude/projects/.../memory/`** — auto-memory for this user. Check before assuming defaults.

## What the new repo should look like

Repo name: `northstar-website` (or similar — confirm with user).

Stack:
- Next.js 14 App Router + TypeScript (strict) + Tailwind CSS + shadcn/ui
- Postgres (Neon or Supabase) for case studies, blog, admin uploads
- Vercel Blob or Cloudflare R2 for image/PDF storage
- NextAuth.js or Lucia for admin auth
- Resend or Postmark for transactional email
- Vercel deployment, custom domain `northstarimpex.co.ke`

Full repo structure is in **Section 8** of the main spec. Use it as a template.

## What to do next (the actual workflow)

### Step 1 — Confirm context with the user

Open a conversation by confirming:
- Are you building in a **new repo**, or scaffolding the new app **inside the existing `pumea/` monorepo** as a temporary measure?
- Has the Figma design been started? If yes, is there a Figma file URL to reference?
- Is the domain `northstarimpex.co.ke` registered? Or use a placeholder?
- Are there environment credentials available yet (DB, Resend, Blob/R2, NextAuth secret)?
- Should I run the **pre-launch research checklist** (Section 10) first, or skip to scaffolding the repo?

### Step 2 — Invoke the writing-plans skill

The main spec is the brainstorm output. The next step in the superpowers flow is `writing-plans` — break Tier 1 (the ~28 launch pages) into implementable plans.

**Do NOT** start coding pages without an approved plan. The spec defines the *what*; `writing-plans` produces the *how*.

```
Skill: superpowers:writing-plans
```

### Step 3 — Implementation discipline

When implementation begins:

- **Test-driven where it matters.** Content map integrity, sitemap generation, JSON-LD validity, form-submission paths → TDD.
- **Visual-driven where Figma drives.** Pull from Figma MCP. Match exactly.
- **Image discipline.** Every image slot gets an intentional placeholder + a specific prompt surfaced to the user. Never fabricate URLs. Never use stock.
- **One commit per logical change.** No mega-PRs.
- **Run the build pipeline checks** (Section 8 of the spec) before claiming any task complete.

### Step 4 — Trust-gate visibility

Every commercial page MUST surface either the Crywan reference or the `/talk-to-a-customer/` CTA. This is non-negotiable per Section 9.

## Hard constraints (do not violate)

1. **No public mention of Pumea, Pacific Unity, or Supmea** in user-facing copy. Supmea is a private supplier relationship.
2. **No gradients anywhere.** Solid colors, flat surfaces, real photography.
3. **No combinatorial programmatic SEO.** Hand-edited /best/, /compare/, /cost/ pages with 300–500+ words of unique content each.
4. **No customer login portal at launch.** IoT page is marketing-only.
5. **No e-commerce.** Everything routes to quote/consultation.
6. **No fabricated image URLs or stock filler.** User generates all imagery.
7. **No GCC/Arabic register, no American B2B SaaS voice.** East African business English.
8. **No `/solutions/` or `/systems/` taxonomies.** One taxonomy: Products × Industries.

## Common pitfalls (you will be tempted; resist)

| Temptation | Why to resist | What to do instead |
|---|---|---|
| Copy Pumea's bronze/cream palette wholesale | GCC-coded — wrong for Kenya audience | Wait for Figma palette from user |
| Generate all 154 instrument SKU pages programmatically | User chose category pages only; SKU dump is thin content | 6 category pages, PDF spec sheets for SKU detail |
| Bundle IoT into every product page hero | User explicitly said optional, not pushed | Soft callout on product pages, dedicated `/products/iot/` for full story |
| Fill image slots with abstract shapes / AI gradients | User explicitly rejected — degrades premium feel | Intentional labeled placeholders + prompts at end of message |
| Add `/solutions/` or `/systems/` to mirror Pumea | Creates SEO cannibalization | Stick to Products × Industries with `/best/` as the intersection |
| Skip the NEMA parameters table on ETP page | Easy to deprioritize | This is the single highest-leverage SEO play in the spec |
| Treat `/talk-to-a-customer/` as a modal button | The URL is intentionally first-class | Build it as a real page with form, SEO, OG tags |

## Where to put new artifacts

When you produce artifacts during implementation planning or research, put them here:

```
docs/superpowers/specs/      — design specs, implementation plans
docs/superpowers/research/   — competitor scrapes, keyword studies, regulatory captures
docs/content-briefs/         — per-page content briefs (one per Tier 1 page)
docs/image-prompts.md        — consolidated image generation prompt library
```

Once the new `northstar-website` repo is created, **migrate this entire `docs/superpowers/` directory** into it as the project's permanent design archive.

## Getting unstuck

- If the spec contradicts itself → ask the user, don't infer
- If the spec is silent on a decision → ask the user, don't invent
- If a Kenya market detail seems off → re-run the firecrawl SERP queries (Section 5 has the commands)
- If the user is offline and you must proceed → use the latest decision in Appendix A of the main spec as authoritative

## Quick reference — the five things that make this site win

1. **Crywan above the fold** on the homepage. The single most important sentence on the site.
2. **NEMA parameters table** on `/industries/etp-water-treatment/`. No competitor has it.
3. **Zinc-alum vs carbon steel TCO** on `/compare/zinc-alum-vs-carbon-steel/`. The easiest-close argument.
4. **Safaricom NB-IoT named explicitly** on `/products/iot/`. Local connectivity signal no international competitor has.
5. **`/talk-to-a-customer/` as a real URL** with honest disclosure. Trust gate as first-class architecture.

Everything else in the spec supports these five.

---

*If you've read this far, you're ready. Open the main spec and Section 1.*
