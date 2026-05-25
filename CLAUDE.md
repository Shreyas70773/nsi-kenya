@AGENTS.md

# North Star Impex Kenya — Claude Code instructions

You are working in the **North Star Impex Kenya** marketing + sales website. A new fresh session must read the design authority docs in this order before touching code:

1. `docs/NORTHSTAR-KENYA-START-HERE.md` — project router (5 min)
2. `docs/superpowers/specs/NEXT-CONTEXT-START-HERE-northstar-kenya.md` — orientation
3. `docs/superpowers/specs/2026-05-25-northstar-kenya-design.md` — foundation spec (1091 lines, design authority)
4. `docs/superpowers/research/2026-05-25-kenya-serp-snapshot.md` — competitive intel
5. `docs/superpowers/plans/2026-05-25-northstar-kenya-implementation-plan.md` — implementation plan (1666 lines)

## Stack (locked, overrides spec Appendix A)

- Next.js 16 App Router · React 19 · TypeScript strict · Tailwind 4 (CSS `@theme`)
- **Convex** (not Postgres/Drizzle) for DB + file storage
- **NextAuth.js + Convex adapter** for admin auth
- **Netlify** (not Vercel) for deployment, via `@netlify/plugin-nextjs`
- **npm** (not pnpm)
- **Resend** for transactional email
- Vitest + Playwright + Lighthouse CI

## Hard constraints (non-negotiable, from spec)

1. **No public mention of Pumea, Pacific Unity, or Supmea** in user-facing copy. North Star is positioned as an independent Kenyan brand.
2. **No gradients anywhere.** Solid colors, flat surfaces, real photography.
3. **No fabricated image URLs and no stock filler.** The user generates all imagery. Use `<ImagePlaceholder>` (`src/components/placeholders/image-placeholder.tsx`) with intentional aspect ratio + labeled subject. Surface an image-prompt block at the end of any message that introduces image slots.
4. **No combinatorial programmatic SEO.** Each `/best/`, `/compare/`, `/cost/` page is hand-edited (300–500+ words).
5. **No customer login portal at launch.** IoT page is marketing-only.
6. **No e-commerce.** Everything routes to quote/consultation/talk-to-a-customer.
7. **No `/solutions/` or `/systems/` taxonomies.** One taxonomy only: Products × Industries.
8. **English only at launch.** No Swahili copy. East African business English register.

## Five things that make this site win

1. **Crywan Industries named above the fold** on the homepage.
2. **NEMA discharge parameters table** on `/industries/etp-water-treatment/` with EMCA CAP 387 reference.
3. **Zinc-alum vs carbon steel TCO** on `/compare/zinc-alum-vs-carbon-steel/` with embedded calculator.
4. **Safaricom NB-IoT named explicitly** on `/products/iot/`.
5. **`/talk-to-a-customer/` as a real URL** with honest disclosure.

## Workflow

- Use `superpowers:executing-plans` or `superpowers:subagent-driven-development` to step through the implementation plan.
- TDD on logic-bearing work (content-map integrity, sitemap, JSON-LD, form handlers, calculator math, auth, Convex queries).
- One commit per logical task. Commit message style: `<scope>: <imperative>` (e.g., `feat: add CSS-variable design tokens`).
- Phase 0 ends with an explicit user-review checkpoint; Phase 1 also waits on Figma palette.
- If something is ambiguous or the spec is silent, **ask the user** — do not infer.
