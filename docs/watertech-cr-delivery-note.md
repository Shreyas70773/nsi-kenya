# Watertech 2026 CR — Delivery Note

**Branch:** `cr/watertech-2026` (16 commits off `redesign/experience` @ `c78db5f`)
**Date:** 2 July 2026 · **Brief:** NSI Website Change Request v1.0
**Restore point:** `c78db5f` (branch base). Full-site backup = git history + Netlify deploy rollback; no page URLs changed (all routes additive — build route list unchanged except new `/thank-you/*`).

Phone number used throughout: **+254 718 727 334** (owner instruction on 2 Jul; the brief said +254 757 724 148 — **confirm against the GBP before launch**, then set `CONTACT_PHONE` + `NEXT_PUBLIC_CONTACT_PHONE` env or accept the code default).

## Status by change ID

| ID | Status | Notes |
|----|--------|-------|
| GC-1 | ✅ Done | Float on all pages, 2 s entrance, per-page [CODE], `whatsapp_click` before nav. Verified in browser: link opens api.whatsapp.com with correct number + message. |
| GC-2 | ✅ Done | <768 px Call+WhatsApp bar; hides on field focus (verified at 390×844); both events fire. |
| GC-3 | ✅ Done | Header `tel:` pill (icon <xl, full number ≥xl) + mobile drawer entry. |
| GC-4 | ✅ Done (env) | GTM snippet renders when `NEXT_PUBLIC_GTM_ID` set. **No legacy analytics existed — nothing removed** (delivery-note declaration per brief). |
| GC-5 | ✅ Done (code side) | `generate_lead {journey, source_code?}`, `whatsapp_click`, `call_click`, `booking_confirmed` + `page_view`/`view_content` for SPA. GA4 tags/key-events configured inside GTM by NSI — wiring table below. |
| GC-6 | ✅ Done (code side) | Pixel lives in GTM. `view_content` on sector/product pages carries `content_name`; `Lead` fires on thank-you URLs or the `generate_lead` event. |
| GC-7 | ✅ Done | `/thank-you/{quote,consultation,site-audit}` with §6 copy verbatim, WhatsApp CTA + phone, noindex + robots disallow + sitemap-excluded. Forms redirect per journey. Exactly-once `generate_lead` verified (reload fires nothing). |
| GC-8 | ✅ Done | First-touch (30-day) utm_*/gclid/fbclid/landing_page/referrer/source_code → hidden fields → Convex metadata → email/Sheets/webhook. Verified end-to-end incl. retry-after-error (bug found + fixed, see Findings). |
| GC-9 | ✅ Done | All four journeys email `LEAD_NOTIFICATION_EMAILS` (comma list = the two addresses; falls back to legacy env / CONTACT_EMAIL). **Consultation/site-audit/contact previously emailed nobody.** CRM webhook: `LEAD_WEBHOOK_URL` JSON POST — feasible, confirmed. |
| F-1 | ✅ Done | Phone required (07XX/01XX/+254 normalized to E.164, other +international allowed, <9 digits rejected — acceptance cases in unit tests + live probe). Email optional. Numeric keypad + placeholder. |
| F-2 | ✅ Done | 6 grouped options exactly as briefed; legacy 13 slugs rejected by schema. |
| F-3 | ✅ Done | Order: Name*→Phone*→Company*→Sector*→Requirement*→Capacity→Email→Message. ≤5 required per journey (topic = requirement on consult/audit). Capacity bands stored end-to-end. |
| F-4 | ✅ Done | Consent line + privacy link under every submit (copy verbatim). |
| F-5 | ✅ Done | "Get my 48-hour quote" / "Book my consultation" / "Book my free site audit". |
| F-6 | ✅ Code-complete, env-gated | Embed renders under site-audit form when `NEXT_PUBLIC_BOOKING_URL` set; Calendly/Zoho postMessage → `booking_confirmed`. Needs NSI booking account to activate + test. |
| F-7 | ✅ Done / env for reCAPTCHA | Honeypot + 3 s fill-gate live on all forms (spam pretends success, stores nothing). reCAPTCHA v3 activates with the two keys; fail-open by design. No visible challenge. |
| T-1 | ✅ Done | Four tiles under hero, brief copy verbatim, house icon style. |
| T-2 | ✅ Component done, content-gated | `CaseStrip` (+ sector filter for sector pages) renders NOTHING until verified blurbs go into `src/lib/case-studies.ts`. Format samples deliberately not published. |
| T-3 | ✅ Scaffold, content-gated | Strip above footer renders once NSI wording lands in `COMPLIANCE_STATEMENTS`. |
| T-4 | ⏳ Post-event | Not built (photos exist only after 8–10 Jul). |
| P-1 | ✅ Done / N-A in part | No homepage hero video exists (hero = static priority image, poster-first architecture). Oversized below-fold films transcoded: 5.9→2.0 MB, 3.8→1.5 MB, 3.4→1.1 MB — all ≤3 MB. |
| P-2 | ✅ Already met | `next/image` everywhere (WebP/AVIF, srcset, lazy, explicit dims); zero raw `<img>` (audited). |
| P-3 | ⏳ External evidence | Local prod build clean; PageSpeed 70+/LCP/CLS evidence requires the deployed URL — run after Netlify deploy, attach before/after. |
| P-4 | ✅ Already met | Netlify edge CDN + `@netlify/plugin-nextjs` caching. No Cloudflare needed. |
| S-1 | ⏳ Awaiting keyword map | Existing titles/H1s already keyword-mapped; deltas only once NSI map arrives (P2). |
| S-2 | ⏳ External | sitemap.xml live; GSC verification + GBP link consistency are console tasks. |
| S-3 | ✅ Already done | LocalBusiness JSON-LD with phone/address/hours shipped pre-CR; phone now 718-consistent. |

## GTM container wiring (NSI/agency side)

Set `NEXT_PUBLIC_GTM_ID` and configure inside the container:

| dataLayer event | GTM trigger (Custom Event) | Tags |
|---|---|---|
| *(container load)* | Initialization | GA4 Config; Meta Pixel base `PageView` |
| `page_view` | `page_view` | GA4 event `page_view` (SPA navs — do NOT also use History Change, or you double-count); Meta `PageView` |
| `generate_lead` | `generate_lead` | GA4 `generate_lead` (params `journey`, `source_code`) → mark key event; Meta `Lead` (`content_name` = journey) |
| `whatsapp_click` | `whatsapp_click` | GA4 event (params `source_code`, `page_path`) |
| `call_click` | `call_click` | GA4 event (param `page_path`) |
| `booking_confirmed` | `booking_confirmed` | GA4 event → key event |
| `view_content` | `view_content` | Meta `ViewContent` (`content_name`, `content_type`) |

Journey param values: `quote` · `consultation` · `site_audit` · `contact` (contact = the 4th form, reported for completeness; filter if unwanted).

## Env vars to set at deploy (all optional → feature off when empty)

```
NEXT_PUBLIC_GTM_ID              GTM container (GC-4/5/6)
CONTACT_PHONE / NEXT_PUBLIC_CONTACT_PHONE   only to override +254 718 727 334
LEAD_NOTIFICATION_EMAILS        info@northstarimpex.co.ke,<second address>
LEAD_WEBHOOK_URL                Zoho Bigin (via Zoho Flow) endpoint
NEXT_PUBLIC_BOOKING_URL         Calendly/Zoho Bookings embed URL (F-6)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY / RECAPTCHA_SECRET_KEY   (F-7)
```

## Still needed from NSI (brief §8)

GTM container ID · GA4 property access · Pixel/Dataset ID · booking account →
embed URL · second notification email · reCAPTCHA keys (registered to
northstarimpex.co.ke) · three verified T-2 blurbs · S-1 keyword map · GBP
confirmation that +254 718 727 334 is the NAP number.

## Verification evidence (2 Jul, local prod build)

- 130 unit tests green; lint, typecheck, `next build` (62 routes) green.
- Browser-driven: quote journey submitted end-to-end → `/thank-you/quote/`,
  one `generate_lead` (reload → zero), Convex row with normalized phone
  `+254712345678`, capacity band, full attribution metadata incl.
  `sourceCode`.
- 8-digit phone rejected server-side with the friendly message; UTM survives
  a failed-then-retried submit (bug found in verification and fixed —
  `fix(forms): survive React 19 post-action form reset`).
- Mobile 390×844 (Playwright): sticky bar visible/hides on focus/returns on
  blur, float clears the bar, correct tel/wa.me links, both events fire,
  zero horizontal overflow with the proof band.
- Two QA rows left in the **dev** Convex deployment ("QA Probe",
  "Retry Probe") — delete from the dashboard at leisure.
- Android/iPhone physical-device pass, GA4 DebugView, Pixel Helper, and
  PageSpeed evidence require the deployed site + NSI IDs → run during the
  7 Jul QA window.
