<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# North Star Impex Kenya

Marketing + sales website for North Star Impex Kenya LTD — industrial tanks, silos, structural fabrication works, process instruments, and optional cloud-ready IoT monitoring. Kenya-focused, East Africa expansion.

See `CLAUDE.md` and the docs in `docs/` for the design authority and implementation plan.

## Local dev

```bash
npm install
npm run dev            # Next.js
npx convex dev         # Convex backend (separate terminal)
```

## Tests

```bash
npm test               # Vitest watch
npm run test:run       # Vitest CI run
npm run test:e2e       # Playwright
npm run typecheck      # tsc --noEmit
npm run lint           # ESLint
```

## Deploy

Netlify with `@netlify/plugin-nextjs`. Convex deployed separately via `npx convex deploy`.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
