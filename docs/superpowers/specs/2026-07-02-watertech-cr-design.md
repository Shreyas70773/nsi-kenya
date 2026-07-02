# Watertech 2026 Change Request — Design

**Date:** 2026-07-02 · **Source:** NSI Website Change Request & Handoff Brief v1.0 (issued 2 Jul 2026)
**Deadline:** P0 live by Tue 7 Jul EOD · change freeze 8–10 Jul · P1 by 14 Jul · P2 by 31 Jul
**Branch:** `cr/watertech-2026` (off `redesign/experience`)

This spec maps the brief's 26 change IDs onto the actual stack (Next.js 16 App Router +
Convex + Resend + Netlify — the brief's WordPress notes do not apply) and records every
decision made while the user was AFK.

---

## 1. Decisions made autonomously (review these first)

| # | Decision | Rationale / what to check |
|---|----------|---------------------------|
| D1 | **Phone number: +254 718 727 334** everywhere (calls, WhatsApp `254718727334`, schema NAP). | User message on 2 Jul overrides the brief's +254 757 724 148. Single source: `src/lib/constants.ts`, env-overridable. **Confirm this matches the GBP** (NAP consistency rule). |
| D2 | **Built on `redesign/experience`**, new branch `cr/watertech-2026`. | Redesign is QA-green and pending merge; Watertech traffic should land on it. If you instead deploy `master` on 7 Jul, this branch must be re-based/cherry-picked — flag early. |
| D3 | **All NSI-supplied values are env-gated no-ops**: GTM ID, booking URL, reCAPTCHA keys, second notification email. Code ships complete; setting the env var activates the feature. | NSI inputs arrive 3 Jul per brief §8. Nothing blocks P0 build. |
| D4 | **Meta Pixel lives inside GTM** (tags configured in the container UI), not in code. Code provides the dataLayer events with stable names for Phase-2 CAPI. | GC-6 says "Meta Pixel via GTM". One container, zero hard-coded vendors. |
| D5 | **Contact form** (4th form, not a brief journey) gets all form-level changes (F-1, F-4, F-7, GC-8) but keeps redirecting to the existing `/request-quote/success/` page, and pushes `generate_lead` with `journey=contact`. | "All forms" clauses apply; GC-7's three thank-you pages stay exactly three. GTM can filter the fourth journey value. |
| D6 | **`generate_lead` fires exactly once per submission** via a sessionStorage pending-token: form sets token before submit → thank-you page pushes event only if token present, then clears it. | Server-action `redirect()` means the form client never sees success; direct visits/back-nav to thank-you URLs must not fire. |
| D7 | **P-1 is satisfied by existing architecture**: the homepage hero is a static priority `next/image` (no hero video exists). Below-fold films already lazy-load poster-first and skip download entirely on save-data/reduced-motion. Action reduced to: transcode the 3 oversized films (5.9/3.8/3.4 MB) toward ≤3 MB if tooling available. | Evidence in delivery note. |
| D8 | **Quote "Requirement" = ≥1 of the 6 grouped options; consultation/site-audit "Requirement" = the existing topic field, made required.** | F-3 stars "Requirement*" for all journeys; this keeps every form at ≤5 required fields. |
| D9 | **Intent selector on `/request-quote/` stays** (it's preselected, so zero added friction and it preserves lead qualification); it does not count against the 5-required budget. | Remove if you disagree — one-line change. |
| D10 | **Products pages get WhatsApp code `WEB-SECTOR`** ("plant equipment enquiry" message fits); `/industries/` index gets `WEB-HOME`; only concrete sector pages get `WEB-ETP`/`WEB-SECTOR`. | Brief only defines codes for sector pages; this is the closest-fit extension. |
| D11 | **Kenyan phone validation accepts international numbers too**: after stripping formatting, `07XXXXXXXX`/`01XXXXXXXX`/`+254(7|1)XXXXXXXX` must match fully; other `+` numbers pass at 9–15 digits. Kenyan numbers normalize to `+254…` for storage/notifications. | Brief's acceptance tests pass; foreign buyers at Watertech aren't rejected. |
| D12 | **reCAPTCHA v3 fails open** (API error/timeout → accept submission, log). Honeypot failures pretend success but drop the lead silently. | Losing a real industrial lead costs more than admitting occasional spam. |

## 2. Current-state audit (what's already done)

- **S-3 LocalBusiness JSON-LD**: done (`src/lib/seo.ts` — `organizationLd` site-wide + `homeLocalBusinessLd` with phone/address/hours, env-driven NAP). Only the phone value changes (D1).
- **GC-4 "remove duplicate analytics"**: no-op — the codebase has zero analytics (no gtag/Pixel/Plausible script anywhere). GTM install is greenfield.
- **Redirect-on-success**: already the pattern (server actions `redirect()`); GC-7 only needs three journey-specific destinations instead of the shared one.
- **P-2 images**: `next/image` with `sizes`/`fill` everywhere → WebP/AVIF, srcset, lazy-load, no-CLS by construction. Spot-check pass only.
- **P-4 CDN/caching**: Netlify edge CDN + `@netlify/plugin-nextjs` handles static/ISR caching. No Cloudflare needed. Document as met.
- **Convex `metadata` fields** (utm source/medium/campaign, referrer, userAgent) exist in both lead tables but **nothing writes them** — GC-8 completes this plumbing and extends it.
- **Notification gap**: only quote submissions email anyone (`sendQuoteNotification` → `QUOTE_NOTIFICATION_EMAIL ?? CONTACT_EMAIL`). Consultation/site-audit/contact currently store to Convex + Sheets **with no email** — GC-9 fixes this.
- **Sitemap** is explicit (allowlist) — new thank-you pages are excluded by default; robots.ts gains their disallow entries.

## 3. Architecture choices (alternatives considered)

**Analytics install.** Chosen: hand-rolled GTM snippet via `next/script` + a typed
`src/lib/analytics.ts` dataLayer module. Rejected: `@next/third-parties` (new dependency
for ~10 lines; brief guardrail limits new services) and hard-coded GA4/Pixel snippets
(violates single-container requirement). App Router navigates client-side, so the module
also pushes `page_view` + `view_content` on route change (skipping first load, which the
GTM container itself fires) — the GTM container must use these custom events, not History
Change triggers; documented in the delivery note.

**Attribution capture.** Chosen: client-side first-touch capture in `localStorage`
(30-day) mirrored to `sessionStorage`, hydrating hidden form fields on mount. Rejected:
middleware/cookies (fights CDN caching of static pages, runs on every request) and
server-side referrer parsing (loses cross-page persistence).

**Spam protection.** Chosen: honeypot field checked in the server actions + reCAPTCHA v3
script loaded only on form pages, token verified server-side, both env-gated. Rejected:
Cloudflare Turnstile (not in the brief's approved list).

## 4. Design per change ID

### GC-1 Floating WhatsApp button (P0)
`src/components/conversion/floating-whatsapp.tsx` (client), mounted in
`(marketing)/layout.tsx`. Fixed bottom-right, `#25D366` circle + official glyph (inline
SVG), enters after 2 s (translate/opacity, `motion-safe`), `bottom` raised above the
sticky bar under 768 px. Renders an `<a href={waLink(code)}>` built by
`src/lib/whatsapp.ts`:

- `waLink(code)` → `https://wa.me/254718727334?text=<encoded message>` with the brief §6
  message strings verbatim (code token included).
- `codeForPath(pathname)` → `WEB-QUOTE` (`/request-quote/*`, `/thank-you/quote`),
  `WEB-AUDIT` (`/request-site-audit/`, `/thank-you/site-audit`), `WEB-CONSULT`
  (`/book-consultation/`, `/thank-you/consultation`), `WEB-ETP`
  (`/industries/etp-water-treatment/*`), `WEB-SECTOR` (other `/industries/<slug>/`,
  `/products/*`), else `WEB-HOME`.
- onClick pushes `whatsapp_click {source_code, page_path}` before navigation.

TDD: unit tests for `codeForPath` and `waLink` (exact encoded strings).

### GC-2 Sticky mobile call bar (P0)
`src/components/conversion/sticky-call-bar.tsx` (client), same layout mount. `md:hidden`,
fixed bottom, two equal buttons: **Call us** (`tel:+254718727334`, pushes `call_click
{page_path}`) and **WhatsApp** (same link/code logic as GC-1, pushes `whatsapp_click`).
Hides while any `input/textarea/select` has focus (document `focusin`/`focusout`).
Safe-area padding (`env(safe-area-inset-bottom)`).

### GC-3 Header phone (P0)
`site-header.tsx`: add `tel:` link in the pill — number text on `lg:`, phone icon button
on smaller widths (all viewports get click-to-call). Also added inside the mobile drawer
footer. Pushes `call_click`.

### GC-4/5/6 GTM + GA4 + Meta Pixel (P0)
- `src/components/analytics/gtm.tsx`: renders the GTM script (afterInteractive) +
  `<noscript>` iframe when `NEXT_PUBLIC_GTM_ID` is set; mounted in root layout.
- `src/lib/analytics.ts`: `pushEvent(name, params)` + typed helpers `trackLead(journey,
  sourceCode?)`, `trackWhatsAppClick`, `trackCallClick`, `trackBookingConfirmed`,
  `trackViewContent(contentName, contentType)`, `trackPageView(path)`. SSR-safe no-op.
- `src/components/analytics/route-events.tsx` (client, marketing layout): on pathname
  change (skipping first render) pushes `page_view`; on sector/product routes pushes
  `view_content {content_name, content_type: "sector"|"product"}` for the Pixel mapping.
- GA4 property config, key-event marking, and Pixel tags happen inside GTM (NSI side);
  the delivery note ships the container wiring table (event → trigger → tag).

### GC-7 Thank-you pages (P0)
Three thin pages under `src/app/(marketing)/thank-you/{quote,consultation,site-audit}/page.tsx`
with the brief §6 copy verbatim: H1, "what happens next" body, WhatsApp button with the
journey's code, "Or call +254 718 727 334" tel link. `robots: { index: false }`,
added to `DISALLOW` in `robots.ts`, absent from sitemap. A shared
`<ThankYouTracker journey=…/>` client component implements D6 (token → `generate_lead
{journey, source_code?}`). Server actions redirect: quote → `/thank-you/quote/`,
consultation → `/thank-you/consultation/`, site-audit → `/thank-you/site-audit/`,
contact → unchanged. `/request-quote/success/` stays live (guardrail: no URL changes)
and mounts `<ThankYouTracker journey="contact"/>` so contact submissions emit their
`generate_lead` (D5); quote submissions no longer land there.

### GC-8 Attribution capture (P1)
- `src/lib/attribution.ts`: parse `utm_source/medium/campaign/content`, `gclid`,
  `fbclid` from `location.search`; record `landing_page` + `referrer` on first touch;
  persist (localStorage, 30-day TTL); `getAttribution()` for form hydration. `source_code`
  is set by WhatsApp/journey context when known.
- `src/components/analytics/attribution-capture.tsx` (client, marketing layout): runs
  capture on mount/route change.
- Forms render `<AttributionFields/>` (hidden inputs hydrated on mount).
- Server actions pass the fields through; **Convex schema** `metadata` object gains
  `utmContent`, `gclid`, `fbclid`, `landingPage`, `sourceCode` (all optional) on both
  tables; mutations accept and store them.
- Notification emails append an Attribution block; Sheets payload gains the same keys.
- TDD: parsing, TTL, first-touch precedence.

### GC-9 Notifications (P1)
`src/lib/email.ts`: generalize to `sendLeadNotification(kind, payload)` used by **all**
journeys (new — inquiries currently email nobody). Recipients: `CONTACT_EMAIL` +
`SECOND_NOTIFICATION_EMAIL` (env, optional) — implemented as `LEAD_NOTIFICATION_EMAILS`
comma-list with fallback to existing `QUOTE_NOTIFICATION_EMAIL ?? CONTACT_EMAIL`.
Convex remains the backup log (already true). CRM webhook: `LEAD_WEBHOOK_URL` env —
fire-and-forget JSON POST (same shape as Sheets payload) for Zoho Bigin via Zoho Flow.
Feasibility: **yes** on this stack; flagged in delivery note.

### F-1 Phone required / email optional (P0)
Shared `src/lib/validation/phone.ts` (`normalizeKenyanPhone`, `phoneSchema`) per D11.
Both zod schemas: `phone` required via `phoneSchema`; `email` `z.string().email().optional().or(z.literal(""))`.
Client: `required`, `inputMode="tel"`, placeholder `+254 7XX XXX XXX`, label "Phone";
email label "Email (optional)". TDD first: rejects 8 digits, accepts `0712345678`,
`+254712345678`, `0712 345 678`; empty email passes; junk email still rejected.

### F-2 Quote products → 6 groups (P1)
Replace the 13 checkboxes with: `tanks` "Tanks (stainless / lined / zinc-alum)", `silos`
"Silos (grain / feed / industrial)", `structural-fabrication` "Structural fabrication",
`process-instrumentation` "Process instrumentation", `remote-monitoring` "Remote
monitoring", `not-sure` "Not sure — advise me". Field name `productSlugs` and Convex
string-array storage unchanged (old rows keep old slugs; admin renders raw strings).

### F-3 Field order + required set (P1)
All journeys reordered: Name* → Phone* → Company* → Sector* → Requirement* → Capacity
(optional) → Email (optional) → Message (optional). "Industry" select relabeled
**Sector**, becomes required (options already match the brief's five). Requirement per
D8. New optional `capacity` select (Under 10 m³ / 10–100 m³ / Over 100 m³ / Silo
10–1,000 MT / Not sure) on quote + consultation + site-audit; stored as optional string
in both Convex tables. Contact form: Name*, Phone*, Company*, Sector*, Email (opt),
Message (opt).

### F-4/F-5 Microcopy + button labels (P1)
Under every submit: "By submitting, you agree to be contacted by North Star Impex about
your enquiry. We never share your details." with "privacy policy" linked to `/privacy/`.
Labels: quote **Get my 48-hour quote**, consultation **Book my consultation**, site
audit **Book my free site audit**, contact keeps **Send message**.

### F-6 Booking embed (P1)
`src/components/conversion/booking-embed.tsx`: renders under the site-audit form,
heading "Prefer to pick a time now?", iframe from `NEXT_PUBLIC_BOOKING_URL` (nothing
rendered when unset). postMessage listeners for Calendly (`calendly.event_scheduled`)
and Zoho Bookings push `booking_confirmed`.

### F-7 Spam protection (P1)
- Honeypot: visually-hidden text input (`company_website`) + rendered-at timestamp; server
  action drops silently (redirects to thank-you as if successful) when filled or
  submitted <3 s after render.
- reCAPTCHA v3: script on form pages only when `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` set;
  token in hidden field; server verifies with `RECAPTCHA_SECRET_KEY`, threshold 0.5,
  fail-open (D12). No visible challenge.

### T-1 Proof band (P1)
`src/components/home/proof-band.tsx` directly under the hero section: four tiles —
"Fabricated in our Nairobi workshop" / "Quotes in 48 working hours" / "154 instrument
SKUs ex-stock" / "Installed & supported nationwide" — lucide icons (Factory, Timer,
Boxes, MapPinned), existing card idiom, no gradients.

### T-2 Case strip (P1, content-gated)
`src/lib/case-studies.ts` typed content file, **ships empty** (brief: samples are
format-only, must not publish). `src/components/home/case-strip.tsx` renders nothing
while empty; card format `[Scope] for a [town] [sector] plant — [outcome]`, `sectors`
field for later sector-page filtering. Mounted on homepage.

### T-3 Compliance strip (P2, content-gated)
Same pattern: `COMPLIANCE_STATEMENTS` array in constants (empty until NSI text);
footer-area strip component renders nothing while empty.

### T-4 Watertech photo strip (P2)
Post-event by definition — not built now; noted in delivery note.

### P-1 Hero/video (P0)
Per D7: verify + evidence only, plus transcode `fab-04-install-v3.mp4` (5.9 MB),
`fabrication-weld.mp4` (3.8 MB), `iot-telemetry.mp4` (3.4 MB) toward ≤3 MB if ffmpeg is
available locally; otherwise list as NSI-side asset task.

### P-2/P-3/P-4 (P1)
P-2: audit pass for any raw `<img>`/missing dimensions (expected none). P-3: Lighthouse
run against production build; before/after in delivery note (final numbers require the
deployed URL — external step). P-4: Netlify CDN documented as met; no Cloudflare.

### S-1/S-2/S-3 (P2)
S-1: light title/meta/H1 pass over 4 sector pages + product hubs when NSI keyword map
arrives (current metadata already keyword-mapped — deltas only). S-2: sitemap.xml already
live; GSC verification + GBP link consistency are external/manual (delivery note).
S-3: done (audit §2); only D1 phone swap.

## 5. Environment variables (new/changed)

```
NEXT_PUBLIC_GTM_ID=            # GC-4; empty = GTM off
NEXT_PUBLIC_CONTACT_PHONE=     # optional client-side override; else constants fallback
CONTACT_PHONE=+254 718 727 334 # updated default (D1)
LEAD_NOTIFICATION_EMAILS=      # comma list; falls back to QUOTE_NOTIFICATION_EMAIL/CONTACT_EMAIL
LEAD_WEBHOOK_URL=              # GC-9 CRM webhook (Zoho Bigin via Flow)
NEXT_PUBLIC_BOOKING_URL=       # F-6; empty = embed hidden
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=# F-7; empty = honeypot only
RECAPTCHA_SECRET_KEY=
```

## 6. Testing

TDD (vitest, `tests/unit/`): phone validation, `codeForPath`/`waLink` exact strings,
attribution parsing/TTL/first-touch, analytics payload builders, honeypot decision
logic, updated zod schemas (required sets per journey). Existing suites (sitemap, seo)
extended for thank-you exclusions + phone change. E2E/manual: drive all three journeys
to their thank-you URLs with dataLayer inspection; sticky-bar focus behavior; noindex
headers. Acceptance evidence per brief §7 that requires GA4 DebugView/Pixel Helper/
deployed PageSpeed is an external step after NSI supplies IDs and the site deploys —
tracked in the delivery note, not silently skipped.

## 7. Out of scope (external steps, delivery-note items)

GTM container configuration (tags/triggers per our wiring table), GA4 key-event marking,
Pixel dataset creation, GSC verification, GBP NAP alignment to +254 718 727 334,
booking-tool account, reCAPTCHA key registration, verified T-2 blurbs, S-1 keyword map,
full-site backup/restore point (git history + Netlify deploy rollback serve this on our
stack — noted), WhatsApp group + daily updates (human process).
