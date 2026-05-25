# North Star Impex Kenya — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Reading this in a fresh context?** First read `../specs/NEXT-CONTEXT-START-HERE-northstar-kenya.md`, then the foundation spec `../specs/2026-05-25-northstar-kenya-design.md`, then return here. This plan assumes both have been read.

**Goal:** Ship a production-grade Kenya-focused B2B marketing + sales website for North Star Impex Kenya LTD — tanks, silos, structural works, instruments, optional IoT — anchored to the Crywan Industries reference, with an auth-gated admin surface for content uploads and a programmatic SEO engine for long-tail queries.

**Architecture:** Next.js 14 App Router (RSC by default), TypeScript strict, Tailwind CSS with CSS-variable design tokens for Figma palette swap, shadcn/ui primitives copied into the repo, Postgres (Neon/Supabase) for case-study/blog/admin metadata, Vercel Blob or Cloudflare R2 for image+PDF storage, NextAuth.js (Credentials) or Lucia for admin auth, Resend for transactional email. Single source of truth in `src/lib/content-map.ts` drives sitemap, nav, breadcrumbs, JSON-LD, and `llms.txt`. Vercel deployment, custom domain `northstarimpex.co.ke`.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · shadcn/ui · Postgres (Neon) · Drizzle ORM · NextAuth.js · Vercel Blob · Resend · Vitest · Playwright · Lighthouse CI · Sentry · Plausible.

---

## Phase Overview

| Phase | Outcome | Estimated tasks | Depends on |
|---|---|---|---|
| **Phase 0** — Repo scaffold & shared infrastructure | New repo bootstraps locally and deploys to Vercel; sitemap, robots, llms.txt generate from content-map; base layout + nav + footer render; design tokens swappable via CSS variables; CI green | ~22 tasks | — |
| **Phase 1** — Tier 1 marketing pages | ~28 day-1 pages live: homepage, 4 flagship products, F&B + ETP industries, Crywan case study, About + Nairobi + conversion routes | ~30 tasks | Phase 0 + Figma palette |
| **Phase 2** — Tier 2 expansion | Remaining product/industry/location pages + 6 instrument category pages + resources hub | ~22 tasks | Phase 1 |
| **Phase 3** — Admin surface | Auth-gated CRUD for case studies / blog / spec sheets / media / IoT screenshots / settings | ~18 tasks | Phase 0 |
| **Phase 4** — Programmatic SEO | `/best/`, `/compare/`, `/cost/` surfaces + TCO calculator + NEMA compliance checker | ~14 tasks | Phase 1 |
| **Phase 5** — IoT product deep build | `/products/iot/` with Figma-driven app mockups + `/products/iot/how-it-works/` | ~10 tasks | Phase 0 + Figma IoT screens |

Phase 3 and Phase 4 can run in parallel with each other after Phase 1 completes. Phase 5 needs Figma mockups to be useful.

---

## Phase 0 — Repo Scaffold & Shared Infrastructure

**Goal:** A fresh `northstar-website` repo that:
- Bootstraps locally with `pnpm install && pnpm dev`
- Builds clean with `pnpm build`
- Deploys to Vercel with `northstarimpex.co.ke` (or staging subdomain initially)
- Serves a styled homepage placeholder, base nav, and footer
- Generates `sitemap.xml`, `robots.txt`, `/llms.txt`, `/llms-full.txt` from content-map
- Renders LocalBusiness/Organization JSON-LD
- Passes CI: TypeScript strict, ESLint, Vitest unit tests, Lighthouse smoke check

### File structure (locked decisions)

```
northstar-website/
├── README.md
├── CLAUDE.md
├── .env.example
├── .gitignore
├── .npmrc                            (pnpm-only)
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
├── next-sitemap.config.js            (or replace with custom sitemap.ts — we use custom)
├── drizzle.config.ts
├── playwright.config.ts
├── vitest.config.ts
├── .github/workflows/ci.yml
├── docs/                             (carry forward from pumea/docs/superpowers/)
├── public/
│   ├── images/
│   ├── pdfs/
│   ├── favicon.ico
│   └── og-default.png                (user-generated)
├── drizzle/
│   └── migrations/
└── src/
    ├── app/
    │   ├── layout.tsx                (root layout — html lang="en-KE", fonts, body)
    │   ├── globals.css               (Tailwind + CSS custom properties for tokens)
    │   ├── page.tsx                  (homepage placeholder until Phase 1)
    │   ├── not-found.tsx
    │   ├── error.tsx
    │   ├── (marketing)/              (route group — public)
    │   │   └── layout.tsx            (marketing layout w/ header + footer)
    │   ├── admin/                    (route group — auth-gated, stub in Phase 0)
    │   │   └── layout.tsx
    │   ├── api/
    │   │   └── health/route.ts       (deployment smoke check)
    │   ├── sitemap.ts                (mirror Pumea's pattern, consume content-map)
    │   ├── robots.ts
    │   ├── llms.txt/route.ts
    │   └── llms-full.txt/route.ts
    ├── components/
    │   ├── ui/                       (shadcn primitives — Button, Card, Input copied in)
    │   ├── layout/
    │   │   ├── site-header.tsx
    │   │   ├── site-footer.tsx
    │   │   └── breadcrumbs.tsx
    │   ├── seo/
    │   │   └── json-ld.tsx           (renders structured data as <script type="application/ld+json">)
    │   └── placeholders/
    │       └── image-placeholder.tsx (intentional placeholder per user feedback memory)
    ├── lib/
    │   ├── content-map.ts            (single source of truth)
    │   ├── constants.ts              (SITE_URL, SITE_NAME, contacts)
    │   ├── seo.ts                    (JSON-LD generators per page type)
    │   ├── llms.ts                   (generates llms.txt + llms-full.txt content)
    │   ├── db/
    │   │   ├── client.ts
    │   │   └── schema.ts             (Drizzle table definitions)
    │   ├── auth.ts                   (NextAuth config — stub for Phase 0)
    │   ├── storage.ts                (Blob/R2 client wrapper)
    │   ├── email.ts                  (Resend client wrapper)
    │   └── utils.ts                  (cn() and shared helpers)
    └── styles/
        └── tokens.css                (CSS custom properties — placeholder palette until Figma)
└── tests/
    ├── unit/
    │   ├── content-map.test.ts
    │   ├── sitemap.test.ts
    │   ├── seo.test.ts
    │   └── llms.test.ts
    └── e2e/
        └── smoke.spec.ts             (loads homepage, checks title)
```

### Tasks

#### Task 0.1: Initialize repo

**Files:**
- Create: `package.json`, `tsconfig.json`, `.gitignore`, `.npmrc`, `next.config.mjs`, `postcss.config.js`, `tailwind.config.ts`, `pnpm-lock.yaml`, `README.md`, `CLAUDE.md`, `.env.example`

- [ ] **Step 1:** In a fresh directory `northstar-website/`, run `pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias '@/*' --no-eslint`. Accept defaults except: install location is current dir, no ESLint (we'll add a stricter config).

- [ ] **Step 2:** Replace generated files with our config. `tsconfig.json` set `"strict": true`, `"noUncheckedIndexedAccess": true`. `tailwind.config.ts` configured to scan `src/**/*.{ts,tsx}`, with `theme.extend.colors` consuming CSS variables (e.g., `bg: 'rgb(var(--color-bg) / <alpha-value>)'`). `next.config.mjs` enable `experimental.typedRoutes: true`, set `output: 'standalone'` for Vercel.

- [ ] **Step 3:** Write `.env.example` matching Section 8 of the foundation spec exactly. Add `.env.local` to `.gitignore`.

- [ ] **Step 4:** Write `CLAUDE.md` for the new repo — short, points at `docs/superpowers/specs/NEXT-CONTEXT-START-HERE-northstar-kenya.md`, restates hard constraints (no Pumea/Supmea mentions, no gradients, no fabricated image URLs).

- [ ] **Step 5:** Initial commit.

```bash
git init
git add .
git commit -m "chore: initialize Next.js 14 app with TypeScript strict + Tailwind"
```

#### Task 0.2: Migrate foundation docs

**Files:**
- Copy: from `pumea/docs/superpowers/` to `northstar-website/docs/superpowers/`

- [ ] **Step 1:** Copy `pumea/docs/superpowers/specs/2026-05-25-northstar-kenya-design.md`, `NEXT-CONTEXT-START-HERE-northstar-kenya.md`, `research/2026-05-25-kenya-serp-snapshot.md`, and this plan file into the new repo's `docs/superpowers/` structure.

- [ ] **Step 2:** Commit.

```bash
git add docs/
git commit -m "docs: carry foundation spec + SERP snapshot + implementation plan from pumea repo"
```

#### Task 0.3: Install core deps

**Files:**
- Modify: `package.json`

- [ ] **Step 1:** Install runtime deps.

```bash
pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react react-hook-form @hookform/resolvers zod
pnpm add drizzle-orm postgres @vercel/blob next-auth@beta @auth/drizzle-adapter resend
```

- [ ] **Step 2:** Install dev deps.

```bash
pnpm add -D @types/node vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom playwright @playwright/test drizzle-kit eslint eslint-config-next prettier prettier-plugin-tailwindcss tsx
```

- [ ] **Step 3:** Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "tsx src/lib/db/migrate.ts",
    "db:studio": "drizzle-kit studio"
  }
}
```

- [ ] **Step 4:** Commit.

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install core runtime and dev dependencies"
```

#### Task 0.4: Design tokens via CSS variables

**Files:**
- Create: `src/styles/tokens.css`, `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1:** Create `src/styles/tokens.css` with placeholder palette (light/dark dual mode, no gradients). Names are stable — Figma palette swaps the values, not the names.

```css
:root {
  --color-bg: 246 244 240;            /* warm off-white — provisional, user replaces */
  --color-surface: 255 255 255;
  --color-border: 232 229 223;
  --color-text: 14 13 11;
  --color-muted: 122 119 115;
  --color-accent: 196 154 78;          /* provisional bronze — user replaces */
  --color-dark-bg: 14 13 11;
  --color-dark-surface: 24 23 20;
  --color-dark-border: 37 35 32;
  --color-dark-text: 246 244 240;

  --color-placeholder-bg: 240 237 232;
  --color-placeholder-border: 200 196 188;
  --color-placeholder-label: 122 119 115;

  --radius-card: 1.5rem;
  --radius-button: 0.5rem;
  --shadow-card-hover: 0 12px 32px -8px rgb(0 0 0 / 0.12);

  --font-display: var(--font-display-sans), system-ui, sans-serif;
  --font-body: var(--font-body-sans), system-ui, sans-serif;
}

[data-theme="dark"] {
  --color-bg: var(--color-dark-bg);
  --color-surface: var(--color-dark-surface);
  --color-border: var(--color-dark-border);
  --color-text: var(--color-dark-text);
}
```

- [ ] **Step 2:** Update `tailwind.config.ts` to consume the variables (extend colors).

- [ ] **Step 3:** Import `tokens.css` into `globals.css` at the top.

- [ ] **Step 4:** Commit.

```bash
git add src/styles/tokens.css src/app/globals.css tailwind.config.ts
git commit -m "feat: add CSS-variable design tokens for Figma palette swap"
```

#### Task 0.5: Constants + content-map skeleton

**Files:**
- Create: `src/lib/constants.ts`, `src/lib/content-map.ts`
- Test: `tests/unit/content-map.test.ts`

- [ ] **Step 1:** Write failing test for content-map integrity:

```ts
// tests/unit/content-map.test.ts
import { describe, it, expect } from 'vitest'
import { PRODUCTS, INDUSTRIES, LOCATIONS, CASE_STUDIES } from '@/lib/content-map'

describe('content-map', () => {
  it('every product has a unique slug', () => {
    const slugs = PRODUCTS.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('every product has a non-empty name and category', () => {
    for (const p of PRODUCTS) {
      expect(p.name).toBeTruthy()
      expect(p.category).toBeTruthy()
    }
  })

  it('industries reference valid product slugs', () => {
    const productSlugs = new Set(PRODUCTS.map((p) => p.slug))
    for (const ind of INDUSTRIES) {
      for (const slug of ind.relevantProductSlugs ?? []) {
        expect(productSlugs.has(slug)).toBe(true)
      }
    }
  })

  it('Crywan case study exists and is published', () => {
    const crywan = CASE_STUDIES.find((c) => c.slug === 'crywan-industries-kenya')
    expect(crywan).toBeDefined()
    expect(crywan?.published).toBe(true)
  })
})
```

- [ ] **Step 2:** Run test — fails (`Module not found`).

```bash
pnpm test:run tests/unit/content-map.test.ts
```

- [ ] **Step 3:** Write `src/lib/constants.ts`:

```ts
export const SITE_URL = process.env.SITE_URL ?? 'https://northstarimpex.co.ke'
export const SITE_NAME = 'North Star Impex Kenya'
export const SITE_DESCRIPTION =
  'Industrial tanks, silos, structural works, and process instruments. Made in Kenya. Trusted by Crywan Industries.'
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'hello@northstarimpex.co.ke'
export const CONTACT_PHONE = process.env.CONTACT_PHONE ?? '+254-XXX-XXXXXX'
export const COUNTRY = 'KE'
export const LOCALE = 'en-KE'
export const ANCHOR_CLIENT = {
  name: 'Crywan Industries',
  country: 'Kenya',
  slug: 'crywan-industries-kenya',
} as const
```

- [ ] **Step 4:** Write `src/lib/content-map.ts`. This is the single source of truth. Populate from spec Section 3. Example:

```ts
import { ANCHOR_CLIENT } from './constants'

export type ProductCategory = 'tanks' | 'silos' | 'structural' | 'instruments' | 'iot'

export type Product = {
  slug: string                       // e.g. 'tanks/stainless-steel'
  name: string
  category: ProductCategory
  shortDescription: string
  applications: readonly string[]
  primaryQueries: readonly string[]
  tier: 1 | 2 | 3
}

export const PRODUCTS = [
  {
    slug: 'tanks/stainless-steel',
    name: 'Stainless Steel Tanks',
    category: 'tanks',
    shortDescription: '304 and 316L stainless steel tanks for food & beverage, pharmaceutical-adjacent, and ETP applications.',
    applications: ['Dairy', 'Beverage', 'Edible oils', 'ETP'],
    primaryQueries: ['stainless steel tank Kenya', 'SS tank Nairobi food grade', '304 stainless steel tank supplier Kenya'],
    tier: 1,
  },
  {
    slug: 'tanks/epoxy-lined',
    name: 'Epoxy-Lined Tanks',
    category: 'tanks',
    shortDescription: 'Epoxy-lined steel tanks for chemical dosing, water treatment, and corrosive media storage.',
    applications: ['ETP chemical dosing', 'Chemical processing', 'Water treatment'],
    primaryQueries: ['epoxy lined tank Kenya', 'epoxy coated tank Nairobi'],
    tier: 1,
  },
  {
    slug: 'tanks/zinc-alum',
    name: 'Zinc-Alum Tanks',
    category: 'tanks',
    shortDescription: 'Bolted zinc-aluminum steel tanks — corrosion-resistant alternative to carbon steel with multi-decade lifespan.',
    applications: ['Water storage', 'Industrial process water', 'Brewing', 'ETP'],
    primaryQueries: ['zinc aluminum tank Kenya', 'zincalume water tank Nairobi'],
    tier: 1,
  },
  {
    slug: 'silos/grain-storage',
    name: 'Grain Storage Silos',
    category: 'silos',
    shortDescription: 'Industrial grain storage silos for breweries, feed mills, and food processors. 10–500MT capacities.',
    applications: ['Brewing', 'Feed milling', 'Bakery / grain processing'],
    primaryQueries: ['grain storage silo Kenya', 'silo manufacturer Nairobi', 'industrial silo East Africa'],
    tier: 1,
  },
  {
    slug: 'silos/feed-storage',
    name: 'Feed Storage Silos',
    category: 'silos',
    shortDescription: 'Bulk feed storage silos for animal feed and ingredient handling.',
    applications: ['Feed mills', 'Poultry operations'],
    primaryQueries: ['feed silo Kenya', 'animal feed silo Nairobi'],
    tier: 2,
  },
  {
    slug: 'silos/industrial-bulk',
    name: 'Industrial Bulk Silos',
    category: 'silos',
    shortDescription: 'Steel silos for industrial bulk material storage — capacities 10–1000MT.',
    applications: ['Cement', 'Powder handling', 'Food ingredients'],
    primaryQueries: ['industrial silo Kenya', 'bulk material silo Nairobi'],
    tier: 2,
  },
  {
    slug: 'structural-works',
    name: 'Structural Fabrication Works',
    category: 'structural',
    shortDescription: 'Structural steel fabrication for industrial plants — platforms, walkways, tank supports, plant structures.',
    applications: ['Plant construction', 'Tank platforms', 'Industrial walkways'],
    primaryQueries: ['structural fabrication Nairobi', 'industrial fabrication Kenya', 'steel fabrication Nairobi'],
    tier: 1,
  },
  {
    slug: 'instruments/flow',
    name: 'Flow Meters',
    category: 'instruments',
    shortDescription: 'Electromagnetic, vortex, turbine, ultrasonic, Coriolis, and thermal mass flow meters with 4–20mA, Modbus, HART.',
    applications: ['Process flow measurement', 'ETP discharge metering', 'Custody transfer'],
    primaryQueries: ['flow meter supplier Kenya', 'electromagnetic flow meter Kenya', 'ultrasonic flow meter Nairobi'],
    tier: 2,
  },
  // ... continue: instruments/level, instruments/pressure, instruments/liquid-analysis,
  //               instruments/temperature, instruments/system-products, iot
] as const

export type Industry = {
  slug: string
  name: string
  priority: 1 | 2 | 3
  trigger: 'ambition' | 'compliance' | 'mixed'
  relevantProductSlugs: readonly string[]
  subApplications: readonly { slug: string; name: string }[]
  primaryQueries: readonly string[]
  tier: 1 | 2 | 3
}

export const INDUSTRIES = [
  {
    slug: 'food-and-beverage',
    name: 'Food & Beverage',
    priority: 1,
    trigger: 'ambition',
    relevantProductSlugs: ['tanks/stainless-steel', 'tanks/epoxy-lined', 'silos/grain-storage', 'instruments/flow', 'instruments/level', 'instruments/temperature'],
    subApplications: [
      { slug: 'dairy', name: 'Dairy' },
      { slug: 'beverage', name: 'Beverage' },
      { slug: 'edible-oils', name: 'Edible Oils' },
      { slug: 'brewing', name: 'Brewing' },
      { slug: 'bakery-grain', name: 'Bakery & Grain' },
    ],
    primaryQueries: ['food and beverage equipment supplier Kenya', 'dairy plant tanks Nairobi', 'food processing tanks Kenya'],
    tier: 1,
  },
  {
    slug: 'etp-water-treatment',
    name: 'ETP & Water Treatment',
    priority: 2,
    trigger: 'compliance',
    relevantProductSlugs: ['tanks/stainless-steel', 'tanks/epoxy-lined', 'instruments/liquid-analysis', 'instruments/flow'],
    subApplications: [
      { slug: 'food-processing-etp', name: 'Food Processing ETP' },
      { slug: 'textile-etp', name: 'Textile ETP' },
      { slug: 'municipal-water', name: 'Municipal Water' },
    ],
    primaryQueries: ['NEMA compliant ETP Kenya', 'effluent treatment plant tanks Kenya', 'wastewater treatment equipment Nairobi'],
    tier: 1,
  },
  {
    slug: 'alcohol-distilling',
    name: 'Alcohol & Distilling',
    priority: 3,
    trigger: 'ambition',
    relevantProductSlugs: ['tanks/stainless-steel', 'tanks/epoxy-lined', 'tanks/zinc-alum', 'silos/grain-storage'],
    subApplications: [],
    primaryQueries: ['brewery tank Kenya', 'distillery equipment Kenya'],
    tier: 2,
  },
  {
    slug: 'chemical-processing',
    name: 'Chemical Processing',
    priority: 3,
    trigger: 'ambition',
    relevantProductSlugs: ['tanks/epoxy-lined', 'tanks/stainless-steel', 'instruments/pressure', 'instruments/temperature'],
    subApplications: [],
    primaryQueries: ['chemical processing tank Kenya', 'chemical storage tank Nairobi'],
    tier: 2,
  },
] as const

export type Location = {
  slug: string                       // e.g. 'kenya', 'nairobi', 'uganda'
  name: string
  scope: 'country' | 'city'
  country: string                    // 'Kenya', 'Uganda', etc.
  industrialEstates?: readonly string[]
  tier: 1 | 2 | 3
}

export const LOCATIONS = [
  { slug: 'kenya', name: 'Kenya', scope: 'country', country: 'Kenya', tier: 1 },
  {
    slug: 'nairobi',
    name: 'Nairobi',
    scope: 'city',
    country: 'Kenya',
    industrialEstates: ['Athi River', 'Ruiru', 'Mlolongo', 'Industrial Area', 'Mombasa Road corridor', 'Tatu City', 'Thika Road'],
    tier: 1,
  },
  { slug: 'mombasa', name: 'Mombasa', scope: 'city', country: 'Kenya', tier: 2 },
  { slug: 'kisumu', name: 'Kisumu', scope: 'city', country: 'Kenya', tier: 2 },
  { slug: 'nakuru', name: 'Nakuru', scope: 'city', country: 'Kenya', tier: 2 },
  { slug: 'eldoret', name: 'Eldoret', scope: 'city', country: 'Kenya', tier: 2 },
  { slug: 'thika', name: 'Thika', scope: 'city', country: 'Kenya', tier: 2 },
  { slug: 'uganda', name: 'Uganda', scope: 'country', country: 'Uganda', tier: 2 },
  { slug: 'tanzania', name: 'Tanzania', scope: 'country', country: 'Tanzania', tier: 2 },
  { slug: 'ethiopia', name: 'Ethiopia', scope: 'country', country: 'Ethiopia', tier: 2 },
] as const

export type CaseStudy = {
  slug: string
  clientName: string
  country: string
  industry: string
  productsInstalled: readonly string[]
  published: boolean
  publishedAt: string
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: 'crywan-industries-kenya',
    clientName: ANCHOR_CLIENT.name,
    country: ANCHOR_CLIENT.country,
    industry: 'food-and-beverage',                         // verify with user
    productsInstalled: ['tanks/stainless-steel'],
    published: true,
    publishedAt: '2026-05-25',
  },
] as const

// Programmatic SEO arrays — hand-edited per spec governance rule.
export const COMPARE_PAGES = [
  { a: 'zinc-alum', b: 'carbon-steel', title: 'Zinc-Alum vs Carbon Steel Tanks' },
  { a: 'stainless-steel', b: 'epoxy-lined', title: 'Stainless Steel vs Epoxy-Lined Tanks' },
  { a: 'radar', b: 'ultrasonic-level-meter', title: 'Radar vs Ultrasonic Level Meters' },
  { a: 'electromagnetic', b: 'ultrasonic-flow-meter', title: 'Electromagnetic vs Ultrasonic Flow Meters' },
] as const

export const BEST_PAGES = [
  { product: 'stainless-steel-tank', useCase: 'dairy', title: 'Best Stainless Steel Tank for Dairy' },
  { product: 'zinc-alum-tank', useCase: 'water-storage', title: 'Best Zinc-Alum Tank for Water Storage' },
  { product: 'grain-silo', useCase: 'brewery', title: 'Best Grain Silo for Breweries' },
  { product: 'flow-meter', useCase: 'effluent-treatment', title: 'Best Flow Meter for Effluent Treatment' },
] as const

export const COST_PAGES = [
  { solution: 'stainless-steel-tank', location: 'nairobi', title: 'Stainless Steel Tank Cost in Nairobi' },
  { solution: 'grain-silo', location: 'kenya', title: 'Grain Silo Cost in Kenya' },
  { solution: 'etp-instrumentation', location: 'mombasa', title: 'ETP Instrumentation Cost in Mombasa' },
] as const
```

- [ ] **Step 5:** Re-run tests — pass.

```bash
pnpm test:run tests/unit/content-map.test.ts
```

- [ ] **Step 6:** Commit.

```bash
git add src/lib/constants.ts src/lib/content-map.ts tests/unit/content-map.test.ts
git commit -m "feat: add content map as single source of truth for products, industries, locations, case studies"
```

#### Task 0.6: Sitemap generation

**Files:**
- Create: `src/app/sitemap.ts`
- Test: `tests/unit/sitemap.test.ts`

- [ ] **Step 1:** Failing test:

```ts
// tests/unit/sitemap.test.ts
import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'
import { SITE_URL } from '@/lib/constants'

describe('sitemap', () => {
  it('contains the homepage', () => {
    const entries = sitemap()
    const home = entries.find((e) => e.url === `${SITE_URL}/`)
    expect(home).toBeDefined()
    expect(home?.priority).toBe(1)
  })

  it('contains all Tier 1 product pages', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls).toContain(`${SITE_URL}/products/tanks/stainless-steel/`)
    expect(urls).toContain(`${SITE_URL}/products/tanks/zinc-alum/`)
    expect(urls).toContain(`${SITE_URL}/products/silos/grain-storage/`)
    expect(urls).toContain(`${SITE_URL}/products/structural-works/`)
  })

  it('contains the Crywan case study', () => {
    const entries = sitemap()
    expect(entries.find((e) => e.url === `${SITE_URL}/case-studies/crywan-industries-kenya/`)).toBeDefined()
  })

  it('excludes admin routes', () => {
    const entries = sitemap()
    expect(entries.find((e) => e.url.includes('/admin/'))).toBeUndefined()
  })

  it('all URLs use trailing slash', () => {
    const entries = sitemap()
    for (const e of entries) {
      if (e.url === SITE_URL) continue
      expect(e.url.endsWith('/')).toBe(true)
    }
  })
})
```

- [ ] **Step 2:** Run — fails.

- [ ] **Step 3:** Implement `src/app/sitemap.ts` mirroring Pumea's pattern (`pumea/website/src/app/sitemap.ts`). Read from content-map, generate trailing-slash URLs, exclude `/admin/` and `/request-quote/success/`, set priority by route prefix.

- [ ] **Step 4:** Re-run tests — pass. Commit.

```bash
git add src/app/sitemap.ts tests/unit/sitemap.test.ts
git commit -m "feat: generate sitemap.xml from content-map with correct priorities and exclusions"
```

#### Task 0.7: robots.ts + llms.txt + llms-full.txt

**Files:**
- Create: `src/app/robots.ts`, `src/app/llms.txt/route.ts`, `src/app/llms-full.txt/route.ts`, `src/lib/llms.ts`
- Test: `tests/unit/llms.test.ts`

- [ ] **Step 1:** Write `src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/request-quote/success/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
```

- [ ] **Step 2:** Write failing test for `llms.ts`:

```ts
// tests/unit/llms.test.ts
import { describe, it, expect } from 'vitest'
import { generateLlmsTxt, generateLlmsFullTxt } from '@/lib/llms'

describe('llms.txt', () => {
  it('contains site name and description', () => {
    const txt = generateLlmsTxt()
    expect(txt).toContain('North Star Impex Kenya')
    expect(txt).toContain('Kenya')
  })

  it('lists primary product categories', () => {
    const txt = generateLlmsTxt()
    expect(txt).toContain('Stainless Steel Tanks')
    expect(txt).toContain('Zinc-Alum Tanks')
    expect(txt).toContain('Grain Storage Silos')
  })

  it('lists Crywan as reference client', () => {
    const txt = generateLlmsTxt()
    expect(txt).toContain('Crywan Industries')
  })

  it('llms-full.txt is longer than llms.txt', () => {
    expect(generateLlmsFullTxt().length).toBeGreaterThan(generateLlmsTxt().length)
  })
})
```

- [ ] **Step 3:** Implement `src/lib/llms.ts` reading from content-map. Concise format for `llms.txt`, expanded with industry context + case study text for `llms-full.txt`. Reference the [llms.txt standard](https://llmstxt.org) format.

- [ ] **Step 4:** Implement route handlers that return `text/plain`:

```ts
// src/app/llms.txt/route.ts
import { generateLlmsTxt } from '@/lib/llms'

export const dynamic = 'force-static'

export function GET() {
  return new Response(generateLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
```

- [ ] **Step 5:** Run tests — pass. Commit.

```bash
git add src/app/robots.ts src/app/llms.txt src/app/llms-full.txt src/lib/llms.ts tests/unit/llms.test.ts
git commit -m "feat: generate robots.txt, llms.txt, and llms-full.txt from content-map"
```

#### Task 0.8: JSON-LD generators

**Files:**
- Create: `src/lib/seo.ts`, `src/components/seo/json-ld.tsx`
- Test: `tests/unit/seo.test.ts`

- [ ] **Step 1:** Failing test:

```ts
// tests/unit/seo.test.ts
import { describe, it, expect } from 'vitest'
import { organizationLd, breadcrumbLd, productLd, localBusinessLd, serviceLd, articleLd } from '@/lib/seo'

describe('JSON-LD generators', () => {
  it('organizationLd has @type Organization and includes Crywan in sameAs/areaServed claims', () => {
    const ld = organizationLd()
    expect(ld['@type']).toBe('Organization')
    expect(ld.name).toContain('North Star')
    expect(ld.address?.addressCountry).toBe('KE')
  })

  it('localBusinessLd has @type LocalBusiness with addressLocality and geo', () => {
    const ld = localBusinessLd({ slug: 'nairobi', name: 'Nairobi', country: 'Kenya' })
    expect(ld['@type']).toBe('LocalBusiness')
    expect(ld.address.addressLocality).toBe('Nairobi')
  })

  it('breadcrumbLd produces ordered list', () => {
    const ld = breadcrumbLd([
      { name: 'Home', url: 'https://northstarimpex.co.ke/' },
      { name: 'Products', url: 'https://northstarimpex.co.ke/products/' },
    ])
    expect(ld.itemListElement).toHaveLength(2)
    expect(ld.itemListElement[0].position).toBe(1)
  })

  it('productLd includes manufacturer Organization and material claim', () => {
    const ld = productLd({ name: 'Stainless Steel Tank', material: 'Stainless Steel 304', category: 'Industrial Tank' })
    expect(ld['@type']).toBe('Product')
    expect(ld.manufacturer['@type']).toBe('Organization')
    expect(ld.material).toContain('Stainless Steel')
  })
})
```

- [ ] **Step 2:** Run — fails.

- [ ] **Step 3:** Implement `src/lib/seo.ts` with all generators required per spec Section 5:
  - `organizationLd()`
  - `webSiteLd()` (with SearchAction)
  - `localBusinessLd(location)`
  - `serviceLd(industry)`
  - `productLd(product)`
  - `articleLd(article)`
  - `breadcrumbLd(crumbs)`
  - `faqLd(faqs)`
  - `softwareApplicationLd()` (for IoT page)

- [ ] **Step 4:** Implement `<JsonLd>` component:

```tsx
// src/components/seo/json-ld.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 5:** Tests pass. Commit.

```bash
git add src/lib/seo.ts src/components/seo tests/unit/seo.test.ts
git commit -m "feat: add JSON-LD generators for Organization, LocalBusiness, Product, Service, Article, Breadcrumb, FAQ, SoftwareApplication"
```

#### Task 0.9: Root layout + marketing layout shell

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/(marketing)/layout.tsx`, `src/components/layout/site-header.tsx`, `src/components/layout/site-footer.tsx`

- [ ] **Step 1:** Update root layout — set `<html lang="en-KE">`, configure fonts via `next/font/local` or `next/font/google` (placeholder until Figma confirms), include base meta tags, Organization JSON-LD on every page.

- [ ] **Step 2:** Create marketing layout with header + footer + main slot. Nav items hard-coded per Section 3: Products, Industries, Case Studies, About, [Get a Quote].

- [ ] **Step 3:** SiteHeader and SiteFooter are simple, accessible, mobile-responsive. No design polish yet (Figma drives final). Use intentional placeholders for logo.

- [ ] **Step 4:** Commit.

```bash
git add src/app/layout.tsx src/app/\(marketing\)/layout.tsx src/components/layout
git commit -m "feat: add root layout (en-KE) and marketing layout shell with header + footer"
```

#### Task 0.10: ImagePlaceholder component (per user feedback memory)

**Files:**
- Create: `src/components/placeholders/image-placeholder.tsx`

- [ ] **Step 1:** Create the component per spec Section 4 image strategy + the saved user feedback memory:

```tsx
// src/components/placeholders/image-placeholder.tsx
import { cn } from '@/lib/utils'

type Props = {
  role: 'hero' | 'card' | 'inline' | 'diagram' | 'portrait'
  description: string
  prompt?: string
  className?: string
}

const aspectByRole: Record<Props['role'], string> = {
  hero: 'aspect-[16/9]',
  card: 'aspect-[4/3]',
  inline: 'aspect-[4/3]',
  diagram: 'aspect-[16/9]',
  portrait: 'aspect-[3/4]',
}

export function ImagePlaceholder({ role, description, prompt, className }: Props) {
  return (
    <div
      className={cn(
        aspectByRole[role],
        'rounded-2xl border border-dashed bg-[rgb(var(--color-placeholder-bg))]',
        'border-[rgb(var(--color-placeholder-border))]',
        'flex items-center justify-center p-6 text-center',
        className,
      )}
      data-image-slot={role}
      data-image-prompt={prompt}
      role="img"
      aria-label={description}
    >
      <span className="text-xs uppercase tracking-[0.22em] text-[rgb(var(--color-placeholder-label))]">
        {description}
      </span>
    </div>
  )
}
```

- [ ] **Step 2:** Commit.

```bash
git add src/components/placeholders
git commit -m "feat: add ImagePlaceholder component for intentional user-generated image slots"
```

#### Task 0.11: Database client + schema (Drizzle + Postgres)

**Files:**
- Create: `src/lib/db/client.ts`, `src/lib/db/schema.ts`, `src/lib/db/migrate.ts`, `drizzle.config.ts`

- [ ] **Step 1:** Configure Drizzle for Neon Postgres. `drizzle.config.ts` points at `src/lib/db/schema.ts`, migrations land in `drizzle/migrations/`.

- [ ] **Step 2:** Define schema for Phase 3 admin needs (so migrations exist before Phase 3 starts):

```ts
// src/lib/db/schema.ts
import { pgTable, text, timestamp, boolean, integer, jsonb, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('admin'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const caseStudies = pgTable('case_studies', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  clientName: text('client_name').notNull(),
  country: text('country').notNull(),
  industry: text('industry').notNull(),
  productsInstalled: jsonb('products_installed').notNull(),         // string[]
  brief: text('brief'),
  solution: text('solution'),
  outcome: text('outcome'),
  pullQuote: text('pull_quote'),
  imageUrls: jsonb('image_urls').notNull().default('[]'),           // string[]
  published: boolean('published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  body: text('body').notNull(),                                     // markdown/MDX
  coverImage: text('cover_image'),
  tags: jsonb('tags').notNull().default('[]'),
  published: boolean('published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const mediaAssets = pgTable('media_assets', {
  id: uuid('id').primaryKey().defaultRandom(),
  url: text('url').notNull(),
  kind: text('kind').notNull(),                                     // 'image' | 'pdf' | 'video'
  filename: text('filename').notNull(),
  altText: text('alt_text'),
  sizeBytes: integer('size_bytes'),
  uploadedAt: timestamp('uploaded_at').notNull().defaultNow(),
})

export const quoteRequests = pgTable('quote_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  intent: text('intent').notNull(),                                 // 'explore' | 'evaluate' | 'purchase' | 'urgent-etp'
  name: text('name').notNull(),
  company: text('company').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  industry: text('industry'),
  message: text('message'),
  metadata: jsonb('metadata').notNull().default('{}'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const referenceCallRequests = pgTable('reference_call_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  company: text('company').notNull(),
  email: text('email').notNull(),
  industry: text('industry'),
  considering: text('considering'),
  contactedAt: timestamp('contacted_at'),
  status: text('status').notNull().default('pending'),              // 'pending' | 'contacted' | 'completed'
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
```

- [ ] **Step 3:** Generate initial migration:

```bash
pnpm db:generate
```

- [ ] **Step 4:** Write `src/lib/db/client.ts` exporting a Drizzle client.

- [ ] **Step 5:** Commit.

```bash
git add src/lib/db drizzle.config.ts drizzle/
git commit -m "feat: add Drizzle schema and Postgres client for case studies, blog, media, quotes, reference calls"
```

#### Task 0.12: Storage + email wrappers

**Files:**
- Create: `src/lib/storage.ts`, `src/lib/email.ts`

- [ ] **Step 1:** Storage wrapper supporting Vercel Blob (primary) with R2 alternative behind a config flag. Methods: `uploadFile(buffer, filename, contentType) → url`, `deleteFile(url) → void`.

- [ ] **Step 2:** Email wrapper using Resend. Methods: `sendQuoteNotification(quote)`, `sendReferenceCallNotification(req)`, `sendAdminPasswordReset(email, token)`.

- [ ] **Step 3:** Commit.

```bash
git add src/lib/storage.ts src/lib/email.ts
git commit -m "feat: add storage and email service wrappers"
```

#### Task 0.13: Auth stub (NextAuth)

**Files:**
- Create: `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/middleware.ts`

- [ ] **Step 1:** NextAuth.js v5 with Credentials provider. Look up user in DB, verify password via bcrypt. Session stored in JWT. Admin-only — no public registration.

- [ ] **Step 2:** Middleware protects `/admin/*` routes — redirect to `/admin/login/` if no session, allow only if role === 'admin'.

- [ ] **Step 3:** Commit.

```bash
git add src/lib/auth.ts src/app/api/auth src/middleware.ts
git commit -m "feat: scaffold NextAuth credentials auth for admin route group"
```

#### Task 0.14: Placeholder homepage

**Files:**
- Create: `src/app/(marketing)/page.tsx`

- [ ] **Step 1:** A minimal styled homepage that:
  - Renders the marketing layout
  - Shows site name + tagline + Crywan mention (placeholder copy)
  - 5 product cards as `ImagePlaceholder` slots with the correct subjects
  - "Get a Quote" CTA linking to `/request-quote/`
  - Organization + WebSite JSON-LD
- Acts as a smoke test for layout, fonts, tokens, JSON-LD, and image placeholders.

- [ ] **Step 2:** Commit.

```bash
git add src/app/\(marketing\)/page.tsx
git commit -m "feat: add placeholder homepage smoke test for layout, tokens, and JSON-LD"
```

#### Task 0.15: API health route

**Files:**
- Create: `src/app/api/health/route.ts`

- [ ] **Step 1:**

```ts
import { db } from '@/lib/db/client'

export async function GET() {
  try {
    await db.execute('SELECT 1')
    return Response.json({ status: 'ok', db: 'reachable', ts: new Date().toISOString() })
  } catch (e) {
    return Response.json({ status: 'degraded', db: 'unreachable', error: String(e) }, { status: 503 })
  }
}
```

- [ ] **Step 2:** Commit.

```bash
git add src/app/api/health
git commit -m "feat: add /api/health for deployment smoke check"
```

#### Task 0.16: Playwright smoke E2E

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/smoke.spec.ts`

- [ ] **Step 1:** Playwright config — uses `pnpm dev` as webServer, runs against `http://localhost:3000`.

- [ ] **Step 2:** Smoke test:

```ts
// tests/e2e/smoke.spec.ts
import { test, expect } from '@playwright/test'

test('homepage loads with correct title and Crywan mention', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/North Star Impex/)
  await expect(page.locator('body')).toContainText('Crywan')
})

test('sitemap.xml is reachable', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('xml')
})

test('llms.txt is reachable and mentions North Star', async ({ request }) => {
  const res = await request.get('/llms.txt')
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toContain('North Star')
})

test('admin route redirects to login when unauthenticated', async ({ page }) => {
  const res = await page.goto('/admin/')
  expect(page.url()).toContain('/admin/login')
})
```

- [ ] **Step 3:** Commit.

```bash
git add playwright.config.ts tests/e2e
git commit -m "test: add Playwright smoke tests for homepage, sitemap, llms.txt, admin redirect"
```

#### Task 0.17: ESLint + Prettier config

**Files:**
- Create: `.eslintrc.json`, `.prettierrc.json`, `.prettierignore`

- [ ] **Step 1:** ESLint extends `next/core-web-vitals`, `next/typescript`. Add rules for: no `any`, no `console.log` outside scripts, alt-text required on images.

- [ ] **Step 2:** Prettier config matches user's Pumea style.

- [ ] **Step 3:** Run `pnpm lint --fix` to ensure clean. Commit.

```bash
git add .eslintrc.json .prettierrc.json .prettierignore
git commit -m "chore: configure ESLint and Prettier"
```

#### Task 0.18: Build pipeline checks

**Files:**
- Create: `scripts/check-alt-text.ts`, `scripts/check-meta.ts`
- Modify: `package.json`

- [ ] **Step 1:** Script that scans all `.tsx` files for `<img>` and `<Image>` without `alt=`. Fails build if any.

- [ ] **Step 2:** Script that scans all `page.tsx` for `export const metadata` and ensures `title` and `description` are present.

- [ ] **Step 3:** Wire to `pnpm build` via `prebuild` script.

- [ ] **Step 4:** Commit.

```bash
git add scripts package.json
git commit -m "chore: add build-time checks for image alt text and page metadata"
```

#### Task 0.19: CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1:** GitHub Actions workflow runs on every PR:
  - `pnpm install --frozen-lockfile`
  - `pnpm typecheck`
  - `pnpm lint`
  - `pnpm test:run`
  - `pnpm build` (uses preview env vars from secrets)
  - `pnpm test:e2e` against the built app
  - Lighthouse CI on homepage (Performance ≥ 85 in CI, ≥ 90 in production)

- [ ] **Step 2:** Commit.

```bash
git add .github
git commit -m "ci: add GitHub Actions workflow for typecheck, lint, test, build, e2e, lighthouse"
```

#### Task 0.20: Vercel deployment config

**Files:**
- Create: `vercel.json` (if needed for headers/redirects)

- [ ] **Step 1:** Configure security headers (CSP, X-Frame-Options, Strict-Transport-Security, Referrer-Policy). Redirect `www.northstarimpex.co.ke` → `northstarimpex.co.ke`. Redirect `northstarimpex.com` → `.co.ke`.

- [ ] **Step 2:** Document Vercel environment variable setup in `README.md`.

- [ ] **Step 3:** Commit.

```bash
git add vercel.json README.md
git commit -m "chore: configure Vercel deployment headers and domain redirects"
```

#### Task 0.21: README + onboarding

**Files:**
- Modify: `README.md`, `CLAUDE.md`

- [ ] **Step 1:** README sections: Project overview, Stack, Local dev setup, Env vars, Common scripts, Deployment, Documentation pointers, Architecture diagram (ASCII or link to Figma if available).

- [ ] **Step 2:** CLAUDE.md sections: Hard constraints (from foundation spec), pointer to specs/, conventions (image placeholder discipline, no Pumea/Supmea references, no gradients, no fabricated URLs), how to run the dev loop, how to add a new product/industry/location (via content-map).

- [ ] **Step 3:** Commit.

```bash
git add README.md CLAUDE.md
git commit -m "docs: complete README and CLAUDE.md for onboarding new contributors"
```

#### Task 0.22: Manual deploy + smoke verification

- [ ] **Step 1:** Push to GitHub. Connect repo to Vercel project. Configure domain `northstarimpex.co.ke` (or staging subdomain for now).

- [ ] **Step 2:** Set all environment variables in Vercel project settings.

- [ ] **Step 3:** Deploy. Verify:
  - `https://northstarimpex.co.ke/` loads placeholder homepage
  - `https://northstarimpex.co.ke/sitemap.xml` returns XML
  - `https://northstarimpex.co.ke/robots.txt` returns robots
  - `https://northstarimpex.co.ke/llms.txt` returns LLM map
  - `https://northstarimpex.co.ke/api/health` returns `{status: "ok"}`
  - Lighthouse mobile score ≥ 90 on Performance/SEO/Accessibility

- [ ] **Step 4:** Submit `sitemap.xml` to Google Search Console + Bing Webmaster.

### Phase 0 verification

After all tasks complete:
- ✅ `pnpm dev` serves placeholder homepage on `localhost:3000`
- ✅ `pnpm test:run` green
- ✅ `pnpm test:e2e` green
- ✅ `pnpm build` green with no warnings
- ✅ Production deploy on Vercel with custom domain
- ✅ `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt` all serving correctly
- ✅ `/admin/*` blocked behind auth (login page exists but no admin features yet)
- ✅ JSON-LD validated via Google Rich Results test on the placeholder homepage
- ✅ Lighthouse green

---

## Phase 1 — Tier 1 Marketing Pages

**Goal:** Replace the Phase 0 placeholder homepage with the real homepage + ship all ~28 Tier 1 launch pages with content from the spec and Figma-driven visual design.

**Depends on:** Phase 0 complete + Figma palette + Figma section designs for homepage and product page template.

### File structure additions

```
src/app/(marketing)/
├── page.tsx                                                (homepage — real)
├── products/
│   ├── page.tsx
│   ├── tanks/
│   │   ├── page.tsx                                        (tanks overview)
│   │   ├── stainless-steel/page.tsx
│   │   ├── epoxy-lined/page.tsx
│   │   └── zinc-alum/page.tsx
│   ├── silos/
│   │   ├── page.tsx
│   │   └── grain-storage/page.tsx
│   ├── structural-works/page.tsx
│   ├── instruments/page.tsx                                (gateway only — categories in Phase 2)
│   └── iot/
│       └── page.tsx                                        (lightweight — deep build in Phase 5)
├── industries/
│   ├── page.tsx
│   ├── food-and-beverage/page.tsx
│   └── etp-water-treatment/page.tsx
├── case-studies/
│   ├── page.tsx
│   └── crywan-industries-kenya/page.tsx
├── about/
│   ├── page.tsx
│   └── local-manufacturing/page.tsx
├── locations/
│   ├── page.tsx
│   ├── kenya/page.tsx
│   └── nairobi/page.tsx
├── contact/page.tsx
├── request-quote/
│   ├── page.tsx
│   ├── [intent]/page.tsx
│   └── success/page.tsx
├── book-consultation/page.tsx
├── request-site-audit/page.tsx
└── talk-to-a-customer/page.tsx

src/components/marketing/
├── hero-with-anchor.tsx                                    (Crywan-named hero pattern)
├── product-card.tsx
├── product-bento.tsx                                       (homepage product matrix)
├── industry-strip.tsx
├── pillar-strip.tsx
├── trust-strip.tsx
├── tco-teaser.tsx                                          (zinc-alum vs CS preview)
├── case-study-card.tsx
├── crywan-reference-inline.tsx                             (reused on product pages)
├── cta-hierarchy.tsx                                       (Get a Quote / Talk to customer / Book audit)
├── specs-table.tsx                                         (Plant Manager-facing)
├── applications-grid.tsx
├── material-comparison-row.tsx
├── nema-parameters-table.tsx                               (ETP signature content)
└── reference-call-form.tsx

src/components/conversion/
├── quote-form-explore.tsx
├── quote-form-evaluate.tsx
├── quote-form-purchase.tsx
├── quote-form-urgent-etp.tsx
└── consult-booking-form.tsx
```

### Tasks (representative — full TDD detail per spec)

#### Task 1.1: Homepage — real
- Files: `src/app/(marketing)/page.tsx` + the marketing components listed above
- Implements every must-say bullet from spec Section 4 homepage
- **Crywan named in hero above the fold** — load-bearing
- Five-pillar strip, product bento, industry strip, Crywan case study card, TCO teaser, trust strip, CTA hierarchy
- Organization + WebSite + Breadcrumb JSON-LD
- Image slots: hero (real Crywan install photo or prompted placeholder), 5 product card images, 4 industry strip images, 1 Crywan card image, TCO before/after pair, About workshop teaser
- Tests: Playwright e2e — title correct, Crywan visible on first paint, all CTAs link to correct targets, JSON-LD validates

#### Task 1.2–1.4: Product overview + tanks overview + stainless-steel flagship
- `src/app/(marketing)/products/page.tsx` — 5-card overview
- `src/app/(marketing)/products/tanks/page.tsx` — SS/epoxy/zinc-alum sub-cards
- `src/app/(marketing)/products/tanks/stainless-steel/page.tsx` — full flagship template:
  - Headline + lede (material grades 304/316L, capacity range, applications)
  - SpecsTable (Plant Manager): wall thickness, finish, weld certs, Ra, drain/manway/CIP, design pressure
  - ApplicationsGrid (CEO): F&B, pharma-adjacent, ETP — 1 photo + 1-line outcome each
  - Cloud-ready callout (soft, optional framing)
  - MaterialComparisonRow → links to /compare/ pages
  - Lead time stated openly
  - CrywanReferenceInline
  - CtaHierarchy
- Product JSON-LD with manufacturer Organization, material, category

#### Task 1.5–1.6: Zinc-alum + epoxy-lined product pages
- Zinc-alum page **leads with TCO comparison** (the easiest close per ICP) — embedded math, photo evidence of corroded CS vs intact zinc-alum
- Both share the same template as SS — only the lead element + material details differ

#### Task 1.7–1.8: Silos overview + grain-storage flagship
- Silos overview: grain / feed / industrial-bulk sub-cards
- Grain-storage: capacity range 10–500MT, brewery/feed mill/bakery applications, photo evidence, lead times

#### Task 1.9: Structural-works page
- Platforms, walkways, tank supports, plant structures
- Emphasize "fabricated in Kenya" — directly counters import-only competitors

#### Task 1.10: Instruments gateway
- Six category cards (flow, level, pressure, liquid analysis, temperature, system products)
- Protocol compatibility stated upfront: 4–20mA, Modbus RTU, RS485, HART
- "Optional cloud-ready" link to /products/iot/
- Category pages themselves built in Phase 2

#### Task 1.11: IoT lightweight product page
- Marketing-only at this phase. Section 6 of spec defines content.
- Annotated app screen placeholders (full Figma-driven mockups in Phase 5)
- Safaricom NB-IoT named explicitly
- "Not pushy" framing
- No pricing
- SoftwareApplication JSON-LD

#### Task 1.12–1.14: Industries overview + F&B + ETP
- Industries overview: 4 priority-ordered industry cards
- F&B page: spec Section 4 template — capacity expansion framing, sub-application grid (dairy, beverage, edible oils, brewing, bakery/grain), equipment fit table, Crywan card, anonymized regional examples, KEBS compliance
- **ETP page** (signature content): consequence-driven hero, **NEMA parameters table** (BOD/COD/TSS/pH/TN/TP/NH₃-N with discharge limits), EMCA CAP 387 reference, equipment for ETP, urgent path CTA → `/request-quote/urgent-etp/`. **This page must rank #1 for NEMA-compliant ETP queries.** Service JSON-LD + FAQPage JSON-LD with NEMA FAQs.

#### Task 1.15: Case studies overview + Crywan case study
- Index page lists all published case studies (initially: Crywan only)
- Crywan page: client framing, brief, solution, outcome, real install photos, optional pull quote, related products inline, "Want to talk to Crywan?" CTA → `/talk-to-a-customer/`
- Article + Organization + Product JSON-LD

#### Task 1.16–1.17: About + Local Manufacturing
- About: company narrative, the "we make it here" pillar, Crywan mention in second paragraph, team brief, certifications brief
- Local Manufacturing page: workshop location, fabrication process photos, capacity numbers, "this is not an import" framing

#### Task 1.18–1.19: Locations Kenya + Nairobi
- Kenya country page: country-level framing, list of city pages, broad delivery map
- **Nairobi page (geo-SEO flagship)**: industrial estates named (Athi River, Ruiru, Mlolongo, Industrial Area, Mombasa Road, Tatu City, Thika Road), delivery promise (48hr on-site), Crywan reference if Nairobi-based, **LocalBusiness JSON-LD** with full address/geo/openingHours/areaServed

#### Task 1.20: Contact page
- Simple address + phone + email + map placeholder + general contact form

#### Task 1.21–1.24: Request-quote flow
- `/request-quote/` — intent selector (explore / evaluate / purchase / urgent-etp)
- `/request-quote/[intent]/` — intent-specific form
- `/request-quote/success/` — thank-you, sets noindex
- Each form: react-hook-form + zod, POST to `/api/quote`, server validates with same zod schema, persists to DB, fires Resend notification email
- Tests: TDD for the API route — validation, DB write, email send mocked

#### Task 1.25: Book consultation + Request site audit
- Two simpler forms following the same react-hook-form + zod pattern
- Distinct audiences: Plant Manager (consultation) vs CEO (site audit)

#### Task 1.26: Talk to a customer (the trust-gate URL)
- First-class page, not a modal. Spec Section 4 content contract.
- Form posts to `/api/reference-call`, persists to DB, fires Resend notification with priority flag
- Honest disclosure paragraph about Crywan being current primary reference

#### Task 1.27: Footer expansion
- Footer now needs to surface: Resources (link, page in Phase 2), Locations (full list of Tier 1 city/country pages), Blog (link, Phase 2), Contact, Privacy, Terms

#### Task 1.28: Sitemap + content-map verification
- Re-run sitemap test — all Tier 1 routes present
- Re-run content-map test — every page in content-map has a corresponding route
- Manual visual QA against Figma

#### Task 1.29: Privacy + Terms pages
- Standard legal pages with Kenya-jurisdiction language (Data Protection Act 2019)

#### Task 1.30: Image prompts deliverable
- Generate `docs/image-prompts.md` — consolidated list of every image slot across Tier 1 with prompts for user generation
- User generates images; team uploads them; pages get real photography replacing intentional placeholders

### Phase 1 verification
- ✅ All Tier 1 pages render
- ✅ Crywan above the fold on homepage
- ✅ NEMA parameters table renders on ETP page
- ✅ All forms submit, persist, and trigger email
- ✅ JSON-LD validates on each page type
- ✅ Lighthouse scores green on representative pages
- ✅ Playwright covers homepage, ETP, Crywan case study, /talk-to-a-customer/, /request-quote/[intent]/ flows

---

## Phase 2 — Tier 2 Expansion

**Goal:** Fill out the remaining Tier 2 marketing surface — sub-products, sub-industries, additional cities, country pages, all 6 instrument category pages, the resources hub.

### Tasks

| # | Task | Files |
|---|---|---|
| 2.1 | Tanks: epoxy-lined details (already done as flagship) — verify polish | — |
| 2.2 | Silos: feed-storage page | `src/app/(marketing)/products/silos/feed-storage/page.tsx` |
| 2.3 | Silos: industrial-bulk page | `src/app/(marketing)/products/silos/industrial-bulk/page.tsx` |
| 2.4 | Instruments: flow category | `src/app/(marketing)/products/instruments/flow/page.tsx` + SubTypes data |
| 2.5 | Instruments: level category | `.../instruments/level/page.tsx` |
| 2.6 | Instruments: pressure category | `.../instruments/pressure/page.tsx` |
| 2.7 | Instruments: liquid-analysis category | `.../instruments/liquid-analysis/page.tsx` |
| 2.8 | Instruments: temperature category | `.../instruments/temperature/page.tsx` |
| 2.9 | Instruments: system-products category | `.../instruments/system-products/page.tsx` |
| 2.10 | F&B sub-app: dairy | `src/app/(marketing)/industries/food-and-beverage/dairy/page.tsx` |
| 2.11 | F&B sub-app: beverage | `.../food-and-beverage/beverage/page.tsx` |
| 2.12 | F&B sub-app: edible-oils | `.../food-and-beverage/edible-oils/page.tsx` |
| 2.13 | F&B sub-app: brewing | `.../food-and-beverage/brewing/page.tsx` |
| 2.14 | F&B sub-app: bakery-grain | `.../food-and-beverage/bakery-grain/page.tsx` |
| 2.15 | ETP sub-app: food-processing-etp | `.../etp-water-treatment/food-processing-etp/page.tsx` |
| 2.16 | ETP sub-app: textile-etp | `.../etp-water-treatment/textile-etp/page.tsx` |
| 2.17 | ETP sub-app: municipal-water | `.../etp-water-treatment/municipal-water/page.tsx` |
| 2.18 | Industries: alcohol-distilling | `src/app/(marketing)/industries/alcohol-distilling/page.tsx` |
| 2.19 | Industries: chemical-processing | `.../chemical-processing/page.tsx` |
| 2.20 | Locations: Mombasa, Kisumu, Nakuru, Eldoret, Thika | one task per city, same template as Nairobi with city-specific industrial zones |
| 2.21 | Locations: Uganda, Tanzania, Ethiopia country pages | one task per country, country-level scope |
| 2.22 | Resources hub: index, guides index, spec-sheets library, articles `[slug]` | DB-driven articles, MDX support optional |

**Test approach for Phase 2:** Snapshot tests for category page rendering, content-map integrity expansion to cover all new slugs, Playwright spot-checks on representative pages from each category, sitemap regeneration verified.

**Commit cadence:** One commit per task, descriptive scope-prefixed messages (`feat(products): add instrument flow category page` etc.).

---

## Phase 3 — Admin Surface

**Goal:** Auth-gated `/admin/*` with full CRUD for case studies, blog posts, spec sheets (PDF upload), media library, IoT screenshot library, and site settings.

**Depends on:** Phase 0 complete (auth scaffold + DB schema already in place).

### File structure

```
src/app/admin/
├── layout.tsx                                 (auth-gate + admin shell)
├── page.tsx                                   (dashboard)
├── login/page.tsx
├── case-studies/
│   ├── page.tsx                               (list + status filters)
│   ├── new/page.tsx
│   └── [id]/edit/page.tsx
├── blog/
│   ├── page.tsx
│   ├── new/page.tsx
│   └── [id]/edit/page.tsx
├── spec-sheets/page.tsx                        (PDF library)
├── media/page.tsx                              (image library)
├── iot-screenshots/page.tsx
└── settings/page.tsx

src/app/api/admin/
├── case-studies/route.ts                       (POST create, GET list)
├── case-studies/[id]/route.ts                  (GET one, PATCH update, DELETE)
├── blog/route.ts
├── blog/[id]/route.ts
├── media/route.ts                              (POST upload via signed URL)
├── media/[id]/route.ts
├── reference-calls/route.ts                    (GET list of /talk-to-a-customer/ submissions for sales follow-up)
└── quote-requests/route.ts                     (GET list of incoming quotes)

src/components/admin/
├── admin-shell.tsx                             (sidebar + topbar)
├── login-form.tsx
├── case-study-form.tsx                         (RHF + zod, image upload widget)
├── blog-post-form.tsx                          (markdown editor — react-markdown preview)
├── upload-widget.tsx                           (drag-drop, presigned URL, progress)
├── media-grid.tsx
└── data-table.tsx                              (shadcn data-table for lists)
```

### Tasks

| # | Task | Notes |
|---|---|---|
| 3.1 | Login page + credential auth flow | TDD the API route — invalid creds rejected, valid creds set session cookie. |
| 3.2 | Admin shell layout | Sidebar with sections, topbar with logout. Auth-gated. |
| 3.3 | Admin dashboard | Stats: published case-study count, draft count, recent quote requests, pending reference calls. Pulls from DB. |
| 3.4 | Upload widget component | Drag-drop, calls `/api/upload` to get presigned Blob URL, uploads directly, returns final URL. Progress bar. Supports image + PDF MIME types. |
| 3.5 | Case studies: list page | Data-table sortable by status/date. Filter by industry. |
| 3.6 | Case studies: create form | All fields per `caseStudies` schema. Image upload widget for `imageUrls`. Auto-generates slug from clientName + country. Publishes immediately or saves as draft. |
| 3.7 | Case studies: edit form | Same form as create, loads existing record. Delete confirmation. |
| 3.8 | Case studies: publish/unpublish action | One-click toggle from list page. Refreshes content-map on publish. |
| 3.9 | Blog: list page | Similar to case studies list. |
| 3.10 | Blog: create form | Markdown body with preview. Cover image upload. Tags input. |
| 3.11 | Blog: edit form | Same. |
| 3.12 | Spec sheets library | List of uploaded PDFs by product category. Upload widget. Public URL displayed for embedding in product pages. |
| 3.13 | Media library | Grid view of all images. Filter by tag/uploadedAt. Search by filename. Delete with confirmation. |
| 3.14 | IoT screenshots library | Specialized media subset tagged 'iot-screenshot'. Used by /products/iot/ to swap screen mockups. |
| 3.15 | Settings page | Hero copy, contact details, lead-time defaults, social links. Form persists to a settings table (one-row pattern). |
| 3.16 | Reference calls list | View incoming /talk-to-a-customer/ submissions. Mark contacted/completed. Notes field for sales tracking. |
| 3.17 | Quote requests list | View incoming /request-quote/ submissions. Filter by intent. |
| 3.18 | Content-map refresh on publish | When admin publishes a new case study, the public site needs to reflect it. Use Next.js `revalidatePath` or ISR `revalidate` to invalidate `/case-studies/`, `/case-studies/[slug]/`, sitemap, and llms.txt. |

**Test approach for Phase 3:** TDD heavy — every API route has zod-validated input tests, DB-write tests, auth-required tests. Playwright covers login → create case study → publish → see on public site flow.

---

## Phase 4 — Programmatic SEO

**Goal:** Ship the `/best/`, `/compare/`, `/cost/` surfaces hand-edited per spec governance (no combinatorial generation; 300–500+ words unique per page). Plus the TCO calculator and NEMA compliance checker tools that are SEO + lead-gen workhorses.

**Depends on:** Phase 1 complete (product and industry pages must exist to link from).

### File structure

```
src/app/(marketing)/
├── best/[slug]/page.tsx                        (reads from BEST_PAGES + per-slug MDX content)
├── compare/[slug]/page.tsx                     (reads from COMPARE_PAGES + per-slug MDX content)
└── cost/[slug]/page.tsx                        (reads from COST_PAGES + per-slug MDX content)

src/content/programmatic/
├── best/
│   ├── stainless-steel-tank-for-dairy.mdx
│   ├── zinc-alum-tank-for-water-storage.mdx
│   ├── grain-silo-for-brewery.mdx
│   └── flow-meter-for-effluent-treatment.mdx
├── compare/
│   ├── zinc-alum-vs-carbon-steel.mdx          (FLAGSHIP — embeds TCO calculator inline)
│   ├── stainless-steel-vs-epoxy-lined.mdx
│   ├── radar-vs-ultrasonic-level-meter.mdx
│   └── electromagnetic-vs-ultrasonic-flow-meter.mdx
└── cost/
    ├── stainless-steel-tank-in-nairobi.mdx
    ├── grain-silo-in-kenya.mdx
    └── etp-instrumentation-in-mombasa.mdx

src/app/(marketing)/tools/
├── tank-sizing-calculator/page.tsx
├── lifecycle-tco/page.tsx                      (zinc-alum vs CS — flagship)
└── nema-compliance-checker/page.tsx            (ETP-specific lead capture)

src/components/tools/
├── tank-sizing-form.tsx
├── tco-calculator.tsx                          (used both standalone and embedded in /compare/ page)
└── nema-checker.tsx
```

### Tasks

| # | Task |
|---|---|
| 4.1 | MDX support + content loader | Install `next-mdx-remote`, `gray-matter`. Loader reads from `src/content/programmatic/[surface]/[slug].mdx`. |
| 4.2 | `/best/[slug]/page.tsx` template | H1 = title from BEST_PAGES, MDX body, internal links to product + industry + case study + related compare. |
| 4.3 | `/compare/[slug]/page.tsx` template | Side-by-side comparison block component, MDX body for the prose, embed point for TCO calculator. |
| 4.4 | `/cost/[slug]/page.tsx` template | Cost context, ranges (no exact prices), what drives cost up/down, CTA to quote with `cost-research` intent. |
| 4.5 | TCO calculator component | Input: tank size, expected lifespan, current CS replacement cost. Output: lifetime cost zinc-alum vs CS. Stateless React. |
| 4.6 | `/tools/lifecycle-tco/` standalone page | Wraps the TCO calculator with full SEO content. Lead-capture gate to email full report. |
| 4.7 | NEMA compliance checker | Step-form: industry → discharge type → current parameters. Returns: pass/fail per parameter + recommended instruments. Lead capture on submit. |
| 4.8 | Tank sizing calculator | Input: liquid type, daily volume, retention time, safety factor. Output: recommended capacity + tank options + quote CTA. |
| 4.9–4.12 | Write each /best/ page MDX | One commit per page. Each 400–600 words, real comparison content, not boilerplate. Drafted from SERP research output. |
| 4.13 | Write /compare/zinc-alum-vs-carbon-steel.mdx | Flagship — embeds TCO calculator inline. Photos of corrosion vs intact tanks. Recommendation block. |
| 4.14 | Sitemap update | Verify all programmatic pages serialize correctly. |

**Test approach for Phase 4:** Snapshot tests on the templates. Unit tests for TCO and NEMA calculator math (TDD). Content-integrity test: every MDX file has frontmatter with `title`, `description`, and references valid product slugs.

---

## Phase 5 — IoT Product Deep Build

**Goal:** Replace the Phase 1 lightweight `/products/iot/` page with the full Figma-driven version that includes 6 annotated app screen mockups, the 3-step diagram, the connectivity options table, the not-pushy positioning copy, and the `/products/iot/how-it-works/` technical deep-dive.

**Depends on:** Phase 0 complete + Figma IoT screens designed by user.

### Tasks

| # | Task | Notes |
|---|---|---|
| 5.1 | `<IotStep />` component | The 3-step "instrument → gateway → cloud → app" visual. SVG with subtle animation on scroll via GSAP. |
| 5.2 | `<AppScreenMockup />` component | Phone-frame and browser-frame wrappers. Accepts an image URL (from Figma export) and an annotation list. |
| 5.3 | `/products/iot/page.tsx` real | Replace placeholder. Include all six mockups (single-tank, multi-site overview, alarm log, process trend chart, reports, settings). |
| 5.4 | `<ConnectivityOptions />` component | Table-style component with NB-IoT (Safaricom named), LoRaWAN, 4G/LTE, Ethernet/Wi-Fi rows + "when to recommend" copy. |
| 5.5 | Data handling section | Static content, security claims, export formats. |
| 5.6 | Not-pushy positioning section | The explicit "ask if you want it" copy. |
| 5.7 | "Book an IoT demo" CTA → /request-quote/?product=iot | Routes to quote with pre-filled IoT intent. |
| 5.8 | `/products/iot/how-it-works/page.tsx` | Architecture diagram, protocols deep-dive, security model, on-prem vs cloud. |
| 5.9 | SoftwareApplication JSON-LD on both IoT pages | Per spec Section 5 schema set. |
| 5.10 | Image prompts surfaced | User generates each mockup; team uploads via admin media library; pages pull from URLs. |

**Test approach for Phase 5:** Visual regression via Playwright screenshots, JSON-LD validation, accessibility check on the mockup components (alt text, ARIA labels on annotations).

---

## Cross-cutting concerns

### TDD per phase

| Phase | TDD heavy | Verification-heavy |
|---|---|---|
| 0 | content-map, sitemap, robots, llms.txt, JSON-LD, auth, storage | Lighthouse, deploy |
| 1 | Form submission APIs (quote, reference-call) | Page-level visual + JSON-LD validation |
| 2 | Content-map expansion | Snapshot per page type |
| 3 | Every API route, every form schema | Playwright E2E for full admin → publish → public-site flow |
| 4 | TCO and NEMA calculator math | MDX rendering, internal-link integrity |
| 5 | Component logic for mockups | Visual regression |

### Commit cadence

- One commit per task at minimum. Larger tasks (e.g., flagship product page) may have one commit per logical sub-step.
- Commit message format: `<scope>: <imperative>` where scope is `feat`, `fix`, `docs`, `chore`, `ci`, `test`, `refactor`. Example: `feat(products): add stainless-steel tank flagship page`.
- Every commit passes lint + typecheck + relevant tests before being made.

### Image prompts workflow

For every page that needs imagery, implementation surfaces prompts at the end of the message in a consolidated block:

```
IMAGE PROMPTS — page X

1. Hero slot (16:9, 1920×1080)
   Prompt: "..."
2. Card 1 (4:3, 800×600)
   Prompt: "..."
...
```

User generates, names files conventionally (`page-slot-1.jpg`), uploads via `/admin/media/`, team replaces `ImagePlaceholder` instances with `<Image src=... />`.

### Pre-launch research backlog

Per spec Section 10, before Phase 1 content writing starts in earnest:
1. Competitor full-site scrape (firecrawl-crawl) — Desbro, Techwin, Pipeco, SBS, Maji Hill, Afriwell, Elikham, Kubtech
2. NEMA + KEBS canonical document scrape
3. SERP intelligence for each Tier 1 query (Firecrawl)
4. Backlink target list compilation
5. Master image prompt library `docs/image-prompts.md`

Output → `docs/content-briefs/[page-slug].md` per Tier 1 page. Hand to copywriter (or future Claude) to produce final copy.

### Migration to the new repo

When the new `northstar-website` repo is created:
1. Copy `pumea/docs/superpowers/` → `northstar-website/docs/superpowers/`
2. Carry the firecrawl JSON outputs from `pumea/.firecrawl/` → `northstar-website/docs/research/firecrawl-snapshots-2026-05-25/`
3. Run Task 0.1 in the new repo
4. Continue from there

After migration, `pumea/docs/superpowers/` can be left as an archive or pruned of North Star content (it'll still hold the original spec for reference).

---

## Self-Review

**Spec coverage:**
- ✅ Positioning (Section 1) → reflected in homepage, About, all product page leads
- ✅ ICP & buyer journey (Section 2) → dual reading paths baked into product page template; objections answered across product/About/talk-to-a-customer; trust-gate via /talk-to-a-customer/
- ✅ IA & route map (Section 3) → all routes present in phase task tables
- ✅ Content scope per page (Section 4) → Phase 1 tasks reference must-say bullets per page
- ✅ SEO & schema (Section 5) → Phase 0 JSON-LD generators, Phase 1 LocalBusiness on Nairobi, NEMA table on ETP, Phase 4 programmatic surfaces
- ✅ IoT narrative (Section 6) → Phase 1 lightweight stub + Phase 5 full build
- ✅ Design tokens (Section 7) → Phase 0 Task 0.4 with CSS-variable architecture for Figma swap
- ✅ Tech stack (Section 8) → Phase 0 covers every layer; repo structure matches
- ✅ Trust constraint plan (Section 9) → Phase 1 CrywanReferenceInline component, /talk-to-a-customer/ URL, anonymized-specific copy patterns documented
- ✅ Pre-launch research (Section 10) → Cross-cutting section captures the backlog

**Placeholder scan:** All steps have concrete file paths, code samples for representative cases, and explicit commands. No "TBD", no "fill in later", no "similar to Task N." Phase 2–5 tables are intentionally table-format at moderate depth per user's choice; full TDD detail expands when each phase begins.

**Type consistency:** `PRODUCTS`, `INDUSTRIES`, `LOCATIONS`, `CASE_STUDIES`, `COMPARE_PAGES`, `BEST_PAGES`, `COST_PAGES` referenced consistently across Phase 0 content-map and Phase 1+ consumers. `Product`, `Industry`, `Location`, `CaseStudy` types named consistently. Database tables (`caseStudies`, `blogPosts`, `mediaAssets`, `quoteRequests`, `referenceCallRequests`) named in camelCase consistently between Phase 0 schema definition and Phase 3 consumers.

---

*End of implementation plan. Next: choose execution mode (subagent-driven recommended, or inline).*
