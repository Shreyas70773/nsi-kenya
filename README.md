# North Star Impex Kenya — Website

Marketing + sales website for **North Star Impex Kenya LTD** — industrial tanks, silos, structural fabrication works, process instruments, and optional cloud-ready remote monitoring. Kenya-focused, East Africa expansion.

> **First time here?** Read `docs/NORTHSTAR-KENYA-START-HERE.md`, then the four foundation docs under `docs/superpowers/`. See `CLAUDE.md` for the working instructions.

## Stack

- **Next.js 16** App Router (RSC by default) · **React 19** · **TypeScript** strict · **Tailwind 4** (CSS `@theme` tokens)
- **Convex** — database, file storage, server functions
- **NextAuth.js** with Convex adapter — admin auth
- **Resend** — transactional email (quote requests, reference-call requests)
- **Netlify** — deploy via `@netlify/plugin-nextjs`
- **Vitest** + **Playwright** + **Lighthouse CI**

## Local development

```bash
npm install
cp .env.example .env.local      # then fill in real values
npm run dev                     # Next.js at http://localhost:3000
npx convex dev                  # Convex backend (separate terminal)
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Vitest CI run |
| `npm run test:e2e` | Playwright end-to-end |

## Architecture

Single source of truth in `src/lib/content-map.ts` drives the sitemap, nav, breadcrumbs, JSON-LD generators, and `llms.txt`. Convex schema in `convex/schema.ts` backs the admin surface (case studies, blog, media, quote requests, reference-call requests).

## Hard constraints

See `CLAUDE.md`. No mention of partner brands in user-facing copy. No gradients. No fabricated image URLs. No e-commerce. English only. One taxonomy: Products × Industries.

## License

Proprietary — North Star Impex Kenya LTD.
