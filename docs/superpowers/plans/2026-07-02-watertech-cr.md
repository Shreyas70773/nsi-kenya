# Watertech 2026 Change Request Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the NSI CR brief v1.0 (conversion, measurement, performance, trust) — P0 complete and QA-evidenced, P1 code-complete behind env gates, P2 scaffolds — per `docs/superpowers/specs/2026-07-02-watertech-cr-design.md`.

**Architecture:** All measurement flows through one GTM container (env-gated) fed by a typed dataLayer module; conversion UI (WhatsApp float, sticky call bar, header phone) mounts in the marketing layout; forms keep the server-action → zod → Convex → notify → redirect pipeline, with validation swapped (phone required), three journey thank-you pages as conversion triggers, first-touch attribution hydrated into hidden fields, and env-gated spam protection.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind 4, Convex, Resend, Vitest. No new npm dependencies.

## Global Constraints

- No gradients; solid colors; flat surfaces (design authority).
- No mention of Pumea/Pacific Unity/Supmea in user-facing copy.
- Do not change or remove any existing page URL (brief guardrail). Additive routes only.
- Phone number everywhere: **+254 718 727 334** (user override of brief; wa.me digits `254718727334`), sourced from `src/lib/constants.ts` only.
- All NSI-supplied values env-gated; missing env = graceful no-op (existing codebase convention).
- Read `convex/_generated/ai/guidelines.md` before touching `convex/`.
- Commit style: `<scope>: <imperative>`; one commit per task minimum.
- Brief §6 copy and WhatsApp message strings verbatim (with the [CODE] token; only the number differs per D1).
- TDD for logic; tests in `tests/unit/*.test.ts` (Vitest, `npm run test:run`).

---

### Task 1: Contact constants + env surface

**Files:**
- Modify: `src/lib/constants.ts` (phone fallback, WhatsApp digits export)
- Modify: `.env.example` (new vars per spec §5)

**Interfaces:**
- Produces: `CONTACT_PHONE` (display format `+254 718 727 334`), `CONTACT_PHONE_TEL` (`+254718727334`), `WHATSAPP_NUMBER` (`254718727334`), `GTM_ID` (`process.env.NEXT_PUBLIC_GTM_ID ?? ""`).

- [x] Step 1: Update `constants.ts`:

```ts
export const CONTACT_PHONE =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ??
  process.env.CONTACT_PHONE ??
  "+254 718 727 334";
/** Digits-only tel: target, e.g. "+254718727334". */
export const CONTACT_PHONE_TEL = CONTACT_PHONE.replace(/[^+\d]/g, "");
/** wa.me expects digits without "+". */
export const WHATSAPP_NUMBER = CONTACT_PHONE_TEL.replace(/^\+/, "");
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
```

- [x] Step 2: `.env.example`: update `CONTACT_PHONE=+254 718 727 334`, add under Analytics: `NEXT_PUBLIC_GTM_ID=`; add `NEXT_PUBLIC_CONTACT_PHONE=`, `LEAD_NOTIFICATION_EMAILS=`, `LEAD_WEBHOOK_URL=`, `NEXT_PUBLIC_BOOKING_URL=`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY=`, `RECAPTCHA_SECRET_KEY=` with one-line comments.
- [x] Step 3: `npm run typecheck` → PASS. Commit `feat(config): canonical +254 718 727 334 contact + CR env surface`.

### Task 2: Analytics module + GTM install (GC-4/5/6 code side)

**Files:**
- Create: `src/lib/analytics.ts`
- Create: `src/components/analytics/gtm.tsx`
- Create: `src/components/analytics/route-events.tsx`
- Modify: `src/app/layout.tsx` (mount `<Gtm/>`), `src/app/(marketing)/layout.tsx` (mount `<RouteEvents/>`)
- Test: `tests/unit/analytics.test.ts`

**Interfaces:**
- Produces: `pushEvent(name: string, params?: Record<string, unknown>): void` (SSR-safe);
  `trackLead(journey: "quote"|"consultation"|"site_audit"|"contact", sourceCode?: string)` → event `generate_lead {journey, source_code?}`;
  `trackWhatsAppClick(sourceCode: string, pagePath: string)` → `whatsapp_click`;
  `trackCallClick(pagePath: string)` → `call_click`;
  `trackBookingConfirmed()` → `booking_confirmed`;
  `trackViewContent(contentName: string, contentType: "sector"|"product")` → `view_content`;
  `trackPageView(pagePath: string)` → `page_view`.
  `buildEvent(name, params)` pure helper returned for tests: `{event: name, ...params}`.

- [x] Step 1 (test first): `tests/unit/analytics.test.ts` — `buildEvent("whatsapp_click", {source_code:"WEB-HOME", page_path:"/"})` → `{event:"whatsapp_click", source_code:"WEB-HOME", page_path:"/"}`; `pushEvent` on server (no `window`) does not throw; in jsdom-less env with a stubbed `globalThis.window.dataLayer` array, push appends. Run → FAIL (module missing).
- [x] Step 2: implement `analytics.ts` (dataLayer init `window.dataLayer = window.dataLayer || []`), `gtm.tsx` (next/script inline GTM snippet + noscript iframe, renders null when `GTM_ID` empty), `route-events.tsx` (usePathname; skip first render via ref; `trackPageView`; on `/industries/<slug>/…` push `view_content` type "sector", on `/products/<…>` type "product", content_name = pathname). Mount both.
- [x] Step 3: tests pass; typecheck; commit `feat(analytics): GTM container install + typed dataLayer events`.

### Task 3: WhatsApp link library (GC-1 logic)

**Files:**
- Create: `src/lib/whatsapp.ts`
- Test: `tests/unit/whatsapp.test.ts`

**Interfaces:**
- Produces: `type WaCode = "WEB-HOME"|"WEB-QUOTE"|"WEB-AUDIT"|"WEB-CONSULT"|"WEB-ETP"|"WEB-SECTOR"`;
  `codeForPath(pathname: string): WaCode`; `waMessage(code: WaCode): string`; `waLink(code: WaCode): string`.

- [x] Step 1 (test first): exact mappings — `/` → WEB-HOME; `/request-quote/`, `/request-quote/urgent-etp/`, `/thank-you/quote/` → WEB-QUOTE; `/request-site-audit/`, `/thank-you/site-audit/` → WEB-AUDIT; `/book-consultation/`, `/thank-you/consultation/` → WEB-CONSULT; `/industries/etp-water-treatment/` (+ subpaths) → WEB-ETP; `/industries/food-and-beverage/` → WEB-SECTOR; `/products/tanks/stainless-steel/` → WEB-SECTOR; `/industries/` → WEB-HOME; `/about/` → WEB-HOME. `waLink("WEB-QUOTE")` === `https://wa.me/254718727334?text=Hello%2C%20I%20would%20like%20a%2048-hour%20quotation.%20My%20requirement%3A%20%5BWEB-QUOTE%5D`. Run → FAIL.
- [x] Step 2: implement:

```ts
const MESSAGES: Record<WaCode, string> = {
  "WEB-HOME": "Hello North Star Impex, I have an enquiry. [WEB-HOME]",
  "WEB-QUOTE": "Hello, I would like a 48-hour quotation. My requirement: [WEB-QUOTE]",
  "WEB-AUDIT": "Hello, I would like to book a free site audit for my plant. [WEB-AUDIT]",
  "WEB-CONSULT": "Hello, I would like to book a consultation. [WEB-CONSULT]",
  "WEB-ETP": "Hello, I have a water/effluent treatment enquiry. [WEB-ETP]",
  "WEB-SECTOR": "Hello, I have a plant equipment enquiry. [WEB-SECTOR]",
};
export function waLink(code: WaCode): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage(code))}`;
}
export function codeForPath(p: string): WaCode {
  const path = p.endsWith("/") ? p : `${p}/`;
  if (path.startsWith("/request-quote/") || path === "/thank-you/quote/") return "WEB-QUOTE";
  if (path === "/request-site-audit/" || path === "/thank-you/site-audit/") return "WEB-AUDIT";
  if (path === "/book-consultation/" || path === "/thank-you/consultation/") return "WEB-CONSULT";
  if (path.startsWith("/industries/etp-water-treatment/")) return "WEB-ETP";
  if (/^\/industries\/[^/]+\//.test(path)) return "WEB-SECTOR";
  if (/^\/products\/.+/.test(path)) return "WEB-SECTOR";
  return "WEB-HOME";
}
```

- [x] Step 3: tests pass; commit `feat(conversion): WhatsApp deep-link library with per-page source codes`.

### Task 4: Floating WhatsApp + sticky call bar + header phone (GC-1/2/3 UI)

**Files:**
- Create: `src/components/conversion/floating-whatsapp.tsx`, `src/components/conversion/sticky-call-bar.tsx`
- Modify: `src/app/(marketing)/layout.tsx` (mount both), `src/components/layout/site-header.tsx` (tel link + drawer entry)

**Interfaces:**
- Consumes: `codeForPath`, `waLink`, `trackWhatsAppClick`, `trackCallClick`, `CONTACT_PHONE`, `CONTACT_PHONE_TEL`.

- [x] Step 1: `floating-whatsapp.tsx` (client): `usePathname`, 2 s mount timer → visible state (`motion-safe` transition), fixed `right-4 bottom-4 max-md:bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40`, 56 px `#25D366` circle, inline WhatsApp glyph SVG (white), `aria-label="Chat on WhatsApp"`, onClick `trackWhatsAppClick(code, pathname)`.
- [x] Step 2: `sticky-call-bar.tsx` (client): `md:hidden fixed inset-x-0 bottom-0 z-40`, two equal anchors — "Call us" (`tel:`, `trackCallClick`) / "WhatsApp" (waLink, `trackWhatsAppClick`) — iron/accent solid surfaces, safe-area padding; document `focusin`/`focusout` listeners hide the bar while an `INPUT/TEXTAREA/SELECT` has focus.
- [x] Step 3: header: phone icon `tel:` link (all widths) + number text at `lg:`; drawer footer gains call row. onClick `trackCallClick`.
- [x] Step 4: typecheck + dev-server visual sanity (mobile viewport: bar visible, no overlap with float; focus a form field → bar hides). Commit `feat(conversion): floating WhatsApp, sticky mobile call bar, header click-to-call`.

### Task 5: Thank-you pages + exactly-once generate_lead (GC-7)

**Files:**
- Create: `src/app/(marketing)/thank-you/quote/page.tsx`, `.../thank-you/consultation/page.tsx`, `.../thank-you/site-audit/page.tsx`
- Create: `src/components/analytics/thank-you-tracker.tsx`, `src/components/conversion/whatsapp-cta-button.tsx`
- Modify: `src/lib/actions/submit-quote.ts` (redirect → `/thank-you/quote/`), `src/lib/actions/submit-inquiry.ts` (consultation/site-audit → their pages; contact unchanged), `src/app/robots.ts` (disallow `/thank-you/`), `src/app/(marketing)/request-quote/success/page.tsx` (mount tracker journey="contact")
- Modify: `src/components/forms/quote-form.tsx`, `src/components/forms/inquiry-form.tsx` (set pending token on submit)
- Test: `tests/unit/thank-you-tracker.test.ts` (token logic as pure functions), extend `tests/unit/sitemap.test.ts`

**Interfaces:**
- Produces: `markLeadPending(journey)` / `consumeLeadPending(journey): boolean` in `src/lib/lead-pending.ts` (sessionStorage key `ns-lead-pending:<journey>`); `<ThankYouTracker journey=… />` pushes `generate_lead {journey, source_code?}` once when `consumeLeadPending` returns true (source_code from stored attribution when present, Task 7 wires it).
- Copy (brief §6, verbatim): quote H1 "Your enquiry is in. Quote within 48 working hours." body "Our engineer will call you within one working day to confirm your specification, then your quotation follows within 48 working hours." button "Faster? WhatsApp us now" (WEB-QUOTE) + "Or call +254 718 727 334."; site-audit H1 "Audit request received." body "Our engineer will call within one working day to fix a date. The audit is free and you receive a written technical brief." (WEB-AUDIT); consultation H1 "Consultation request received." body "We will call within one working day to schedule." (WEB-CONSULT).

- [x] Step 1 (test first): lead-pending mark→consume true then false; consume without mark false; sitemap test asserts no `/thank-you/` URLs. FAIL.
- [x] Step 2: implement pages (metadata `robots: {index:false, follow:false}`, minimal editorial layout consistent with success page idiom), tracker, wire forms (`onSubmit` handler marks pending with the form's journey), swap action redirects, robots disallow `/thank-you/`.
- [x] Step 3: tests pass; drive one journey in dev → lands on its thank-you URL, dataLayer contains one `generate_lead`; reload → no second event. Commit `feat(journeys): per-journey thank-you pages as conversion triggers`.

### Task 6: Phone required / email optional (F-1)

**Files:**
- Create: `src/lib/validation/phone.ts`
- Modify: `src/lib/actions/submit-quote.ts`, `src/lib/actions/submit-inquiry.ts` (zod schemas), `src/components/forms/quote-form.tsx`, `src/components/forms/inquiry-form.tsx` (labels/attrs/order of phone above email happens in Task 9)
- Test: `tests/unit/phone.test.ts`

**Interfaces:**
- Produces: `normalizeKenyanPhone(raw: string): string | null` (null = invalid; Kenyan numbers → `+254XXXXXXXXX`, other international pass-through trimmed); `phoneSchema` (zod, message "Enter a valid phone number, e.g. +254 7XX XXX XXX").

```ts
export function normalizeKenyanPhone(raw: string): string | null {
  const s = raw.replace(/[\s\-().]/g, "");
  if (/^0[17]\d{8}$/.test(s)) return `+254${s.slice(1)}`;
  if (/^(?:\+|)254[17]\d{8}$/.test(s)) return `+${s.replace(/^\+/, "")}`;
  if (/^\+\d{9,15}$/.test(s)) return s;          // non-Kenyan international
  return null;                                    // includes <9 digits
}
```

- [x] Step 1 (test first): accepts `0712345678`→`+254712345678`, `0712 345 678`, `+254 712 345 678`, `0112345678`; rejects `12345678` (8 digits), `07123` , `abc`, `0812345678`; `+14155552671` passes through. Email: empty string valid, `not-an-email` invalid. FAIL.
- [x] Step 2: implement; schemas: `phone: z.string().transform+refine` via `phoneSchema` (required); `email: z.string().email("Enter a valid email").optional().or(z.literal(""))`. Store normalized phone. Client: `required` + `inputMode="tel"` + `placeholder="+254 7XX XXX XXX"` on phone; email label "Email (optional)", `required` removed.
- [x] Step 3: tests pass; submit with phone-only in dev succeeds. Commit `feat(forms): phone required with Kenyan validation, email optional (F-1)`.

### Task 7: Attribution capture end-to-end (GC-8)

**Files:**
- Create: `src/lib/attribution.ts`, `src/components/analytics/attribution-capture.tsx`, `src/components/forms/attribution-fields.tsx`
- Modify: both form components (render `<AttributionFields/>`), both actions (pass through), `convex/schema.ts` (+`utmContent`,`gclid`,`fbclid`,`landingPage`,`sourceCode` optional in both `metadata` objects), `convex/quoteRequests.ts` + `convex/inquiries.ts` (arg validators + insert), `src/lib/email.ts` + `src/lib/sheets.ts` (include attribution), `src/components/analytics/thank-you-tracker.tsx` (source_code param)
- Test: `tests/unit/attribution.test.ts`

**Interfaces:**
- Produces: `type Attribution = {utmSource?, utmMedium?, utmCampaign?, utmContent?, gclid?, fbclid?, landingPage?, referrer?, sourceCode?}`; `captureAttribution(search: string, path: string, referrer: string, now: number): void` (first-touch: only writes when nothing stored or TTL 30 d expired); `getAttribution(): Attribution`; storage key `ns-attribution` (localStorage, `{v:1, at:<epoch>, data}`).
- Field names on the wire (hidden inputs + action FormData + Convex metadata): `utm_source, utm_medium, utm_campaign, utm_content, gclid, fbclid, landing_page, source_code` (brief GC-8 names) → camelCase in Convex.

- [x] Step 1 (test first, pure parse/decide fns): parses all params; ignores empty; first-touch respected (second capture with existing fresh record is a no-op); expired record overwritten; `landing_page` = first path; referrer recorded once. FAIL → implement → PASS.
- [x] Step 2: wire client capture (marketing layout), hidden fields, actions, Convex schema+mutations (read `convex/_generated/ai/guidelines.md` first), email/sheets blocks. Guidelines require `npx convex dev` codegen? — run `npx convex codegen` if needed for types.
- [x] Step 3: tests + typecheck pass; dev: visit `/?utm_source=test&gclid=g1`, navigate, submit quote → Convex row + notification contain attribution. Commit `feat(attribution): first-touch UTM/click-id capture through to Convex and notifications`.

### Task 8: Lead notifications for every journey + CRM webhook (GC-9)

**Files:**
- Modify: `src/lib/email.ts` (generalize → `sendLeadNotification`), `src/lib/actions/submit-inquiry.ts` (call it — inquiries email nobody today), `src/lib/actions/submit-quote.ts` (use shared fn)
- Create: `src/lib/lead-webhook.ts` (`postLeadWebhook(payload)` → `LEAD_WEBHOOK_URL`, 4 s timeout, errors swallowed — mirror `sheets.ts`)
- Test: `tests/unit/lead-notify.test.ts` (recipient resolution)

**Interfaces:**
- Produces: `resolveLeadRecipients(env): string[]` — `LEAD_NOTIFICATION_EMAILS` (comma list) ∪ fallback `QUOTE_NOTIFICATION_EMAIL ?? CONTACT_EMAIL`; dedup, order-stable. `sendLeadNotification({kind, subject, lines, replyTo})` sends one email to all recipients; no-op without `RESEND_API_KEY`.

- [x] Step 1 (test first): recipients — env unset → `[CONTACT_EMAIL]`; `LEAD_NOTIFICATION_EMAILS="a@x.com, b@y.com"` → both; overlap dedups. FAIL → implement → PASS.
- [x] Step 2: wire consultation/site-audit/contact notifications (subject `New <kind> — <name>, <company>`; body includes all fields + attribution block); webhook fire-and-forget from both actions.
- [x] Step 3: tests/typecheck; commit `feat(leads): notify all journeys to multi-recipient list + CRM webhook (GC-9)`.

### Task 9: Form UX overhaul (F-2/F-3/F-4/F-5)

**Files:**
- Modify: `src/components/forms/quote-form.tsx` (6 grouped product options, field order, capacity select, consent line, button label), `src/components/forms/inquiry-form.tsx` (field order, sector required, capacity, topic-required flag, consent, labels), both actions' schemas (sector required; quote `productSlugs` min 1; site-audit/consultation `topic` required; `capacity` optional enum-ish string), page components passing new props
- Test: extend `tests/unit/` schema tests (`form-schemas.test.ts`)

**Interfaces:**
- Product options (value → label): `tanks` → "Tanks (stainless / lined / zinc-alum)"; `silos` → "Silos (grain / feed / industrial)"; `structural-fabrication` → "Structural fabrication"; `process-instrumentation` → "Process instrumentation"; `remote-monitoring` → "Remote monitoring"; `not-sure` → "Not sure — advise me".
- Capacity options: "Under 10 m³" / "10–100 m³" / "Over 100 m³" / "Silo 10–1,000 MT" / "Not sure" (stored as the literal label).
- Field order (all journeys): Name* → Phone* → Company* → Sector* → Requirement* → Capacity → Email (optional) → Message (optional).
- Consent microcopy under every submit, linked to `/privacy/`: "By submitting, you agree to be contacted by North Star Impex about your enquiry. We never share your details."
- Buttons: "Get my 48-hour quote" / "Book my consultation" / "Book my free site audit" / contact keeps "Send message".

- [x] Step 1 (test first): quote schema rejects empty productSlugs, accepts `["not-sure"]`; industry/sector required (empty string fails); topic required for site-audit+consultation kinds, optional for contact; capacity optional. FAIL.
- [x] Step 2: implement schemas + UI (required sets: quote = name, phone, company, sector, products; consult/audit = name, phone, company, sector, topic; contact = name, phone, company, sector — all ≤5).
- [x] Step 3: tests pass; drive quote form in dev. Commit `feat(forms): grouped requirement options, standard field order, consent microcopy, action labels`.

### Task 10: Booking embed + spam protection (F-6/F-7)

**Files:**
- Create: `src/components/conversion/booking-embed.tsx`, `src/lib/validation/spam.ts`
- Modify: `src/app/(marketing)/request-site-audit/page.tsx` (embed below form), both form components (honeypot field + recaptcha token), both actions (spam gate before zod), `src/app/(marketing)/…` form pages load reCAPTCHA script via component when key set
- Create: `src/components/forms/recaptcha.tsx` (script loader + `getRecaptchaToken(action)` helper)
- Test: `tests/unit/spam.test.ts`

**Interfaces:**
- Produces: `isSpam({honeypot, renderedAt, now}): boolean` (filled honeypot OR submit <3000 ms after render); `verifyRecaptcha(token, secret): Promise<{ok: boolean}>` (fetch `siteverify`, threshold 0.5, network error → `{ok:true}` fail-open); booking embed: iframe `src=NEXT_PUBLIC_BOOKING_URL`, `title="Book a site audit time"`, heading "Prefer to pick a time now?", renders null when env empty; message listener: Calendly `e.data.event === "calendly.event_scheduled"` or Zoho booking-success shape → `trackBookingConfirmed()`.
- Honeypot field name `company_website` (autocomplete="off", tabIndex -1, visually hidden per a11y-safe pattern); hidden `rendered_at` epoch input.
- Spam-positive path: server action returns the normal `redirect()` (pretend success), does NOT insert/notify.

- [x] Step 1 (test first): `isSpam` — honeypot filled → true; 1 s-old render → true; 10 s + empty → false. FAIL → implement → PASS.
- [x] Step 2: wire honeypot + timestamps into forms/actions; recaptcha loader (only when `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` set) executing `grecaptcha.execute(siteKey, {action: journey})` pre-submit into hidden `recaptcha_token`; server verify when `RECAPTCHA_SECRET_KEY` set.
- [x] Step 3: booking embed + confirmation event. Tests/typecheck; commit `feat(forms): honeypot + reCAPTCHA v3 gate and env-gated booking embed`.

### Task 11: Trust components (T-1/T-2/T-3)

**Files:**
- Create: `src/components/home/proof-band.tsx`, `src/components/home/case-strip.tsx`, `src/lib/case-studies.ts`, `src/components/layout/compliance-strip.tsx`
- Modify: `src/app/(marketing)/page.tsx` (proof band under hero, case strip after industries), `src/lib/constants.ts` (`COMPLIANCE_STATEMENTS: readonly string[] = []`), `src/components/layout/site-footer.tsx` (strip above footer when non-empty)

**Interfaces:**
- `case-studies.ts`: `type CaseStudy = {scope: string; town: string; sector: "food-and-beverage"|"etp-water-treatment"|"alcohol-distilling"|"chemical-processing"; outcome: string}`; `export const CASE_STUDIES: readonly CaseStudy[] = [];` — **ships empty on purpose** (brief: samples are format-only; NSI blurbs must not be invented).
- `<CaseStrip sector?>` filters by sector when given; renders `null` for empty list.
- Proof band tiles (copy fixed): "Fabricated in our Nairobi workshop" (Factory), "Quotes in 48 working hours" (Timer), "154 instrument SKUs ex-stock" (Boxes), "Installed & supported nationwide" (MapPinned) — lucide, existing mono-label/card idiom, flat surfaces.

- [x] Step 1: build components + integrate; case strip + compliance strip render nothing (verified in dev) until content lands.
- [x] Step 2: typecheck + visual pass (proof band under hero at 390 px and desktop). Commit `feat(trust): homepage proof band; content-gated case + compliance strips`.

### Task 12: Media/perf pass + QA gate + delivery note (P-1/P-2/P-3, §7 evidence)

**Files:**
- Possibly modify: `public/videos/*` (transcode ≤3 MB if ffmpeg available)
- Create: `docs/watertech-cr-delivery-note.md`

- [x] Step 1: check `ffmpeg -version`; if present transcode `fab-04-install-v3.mp4`, `fabrication-weld.mp4`, `iot-telemetry.mp4` (H.264 CRF 28, 1280 w, keep aspect; verify visually) — else record as external asset task.
- [x] Step 2: P-2 audit — grep for raw `<img`/missing dimension patterns (expect none).
- [x] Step 3: full gate — `npm run typecheck && npm run lint && npm run test:run && npm run build` all green.
- [x] Step 4: end-to-end verification (dev/prod build): three journeys → correct thank-you URL, single `generate_lead` in dataLayer, WhatsApp links carry [CODE] per template type, sticky bar behavior, thank-you noindex + robots + sitemap exclusion, phone-validation acceptance cases.
- [x] Step 5: write delivery note: per-change-ID status table (done / env-gated awaiting NSI value / external step / N-A with reason), GTM container wiring table (event → trigger → tag for GA4 + Pixel), NSI checklist (§8 items), evidence collected, restore point = pre-work commit hash + Netlify rollback.
- [x] Step 6: final commit `docs: Watertech CR delivery note with per-ID status and GTM wiring`.

---

## Self-Review

- **Spec coverage:** GC-1→T4/T3, GC-2→T4, GC-3→T4, GC-4/5/6→T2 (+wiring table T12), GC-7→T5, GC-8→T7, GC-9→T8, F-1→T6, F-2/3/4/5→T9, F-6/7→T10, T-1/2/3→T11, T-4 external (T12 note), P-1→T12+D7, P-2/3/4→T12, S-1/S-2 external notes→T12, S-3 done (audit §2, phone via T1). ✔
- **Placeholder scan:** none — content-gated empty arrays are deliberate design, not TBDs. ✔
- **Type consistency:** `WaCode`, `Attribution`, journey union `"quote"|"consultation"|"site_audit"|"contact"` used consistently (note: dataLayer journey uses underscore `site_audit` per brief GC-5; route/kind strings keep `site-audit` — conversion happens once in ThankYouTracker). ✔ (Added this note to prevent a hyphen/underscore bug.)
