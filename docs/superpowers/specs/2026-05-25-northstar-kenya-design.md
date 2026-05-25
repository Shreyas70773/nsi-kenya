---
project: North Star Impex Kenya LTD — Website Foundation
date: 2026-05-25
status: design-locked, ready for implementation planning
owner: Shreyas Sunil
related:
  - ./NEXT-CONTEXT-START-HERE-northstar-kenya.md
  - ../research/2026-05-25-kenya-serp-snapshot.md
  - C:/Users/Shreyas Sunil/Downloads/ICP_Profile_Industrial_Tanks_East_Africa.md
  - C:/Users/Shreyas Sunil/Downloads/supmea-list.md
---

# North Star Impex Kenya — Website Foundation Document

> **Reading this in a fresh context?** Start with [NEXT-CONTEXT-START-HERE-northstar-kenya.md](./NEXT-CONTEXT-START-HERE-northstar-kenya.md) for the 5-minute bootstrap. Then return here for the full spec.

## Executive Summary

North Star Impex Kenya LTD is an **independent Kenyan industrial infrastructure brand** — separate from Pumea (UAE), no public link, distinct positioning. The website is a B2B sales site targeting CEOs and Managing Directors of mid-to-large industrial operations across Kenya and East Africa, primarily in food & beverage, ETP/water treatment, and alcohol/chemical processing.

**Product line:** stainless steel tanks, epoxy-lined tanks, zinc-alum tanks, silos & grain storage, structural fabrication works, process instruments (flow, level, pressure, liquid analysis, temperature, system products), and **optional cloud-ready remote monitoring** on every install.

**The website strategy in one sentence:** Win Kenya by being the first industrial-grade supplier site that combines (a) named local reference work, (b) full-range product depth no Kenya competitor matches, (c) NEMA/KEBS-fluent compliance content, and (d) optional IoT monitoring that no local competitor offers as standard.

**Codebase:** New standalone repo (not part of the Pumea monorepo). Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui. Pattern-aligned with Pumea where useful; visually and editorially distinct.

**Design ownership:** The user designs the entire visual system in Figma and hands it to implementation via Figma MCP. Implementation references three design philosophies: **emil-design-eng** (Emil Kowalski's polish/animation principles), **impeccable** (high-end frontend interfaces), and **gpt-taste** / **design-taste-frontend** (motion + premium UI rules). Implementation must produce intentional placeholders for imagery the user will generate.

---

## Section 1 — Positioning & Brand Pillars

### One-line positioning

> **North Star Impex Kenya** is a Kenya-based industrial infrastructure partner: stainless steel, epoxy-lined, and zinc-alum tanks; silos and grain storage; structural fabrication works; and process instruments (flow, level, pressure, water quality, temperature) — all with optional cloud-ready remote monitoring for operators who want it. Locally manufactured and supported, anchored to Crywan Industries as our Kenya reference.

### Five brand pillars (load-bearing claims every page reinforces)

1. **Local accountability.** Kenya-registered, Kenya-staffed, reachable by phone, on-site within days. The #1 value driver per the ICP.
2. **Full-range single supplier.** Tanks (SS, epoxy, zinc-alum), structural works, silos and grain storage, and process instruments under one roof. **No current Kenya competitor matches this breadth** — Desbro/Techwin do tanks, Pipeco/SBS do zinc-alum only, Kubtech does instruments only.
3. **Built to last vs. carbon steel.** Zinc-alum and stainless head-to-head with the carbon-steel default. Lifecycle cost, not sticker price. The shortest path to a closed deal per the ICP.
4. **Cloud-ready when you want it.** Every flowmeter, level transmitter, pressure transmitter, and tank gauge we install **can be** wired into a remote-monitoring app if the customer chooses it. Not pushed as default. No local competitor offers this as a standard option.
5. **Reference-grade work.** Anchored to **Crywan Industries (Kenya)** plus East-Africa-adjacent track record. Trust is the gate; named references open it.

### Audience promise

Trust before price. Ambition over fear (except in ETP, where compliance pressure flips the frame to consequence-avoidance). Speak to CEOs and MDs as economic peers — not as procurement.

### Tone direction

- Confident, plain, materially specific. Real grades, real specs, real failure modes — not adjectives.
- East African business English. No GCC/Arabic register, no American "B2B SaaS" voice.
- Industrial-modern: machinery photography that looks built, not rendered. IoT screens that look like real plant dashboards, not consumer apps.

### What we are NOT (homepage must make this clear)

- Not an importer or trader. Not a software company (the IoT app supports the equipment business, not the other way around). Not a carbon-steel commodity yard. Not a Nairobi-only player. Not the cheapest option.

---

## Section 2 — ICP & Buyer Journey

### Decision-maker map

| Role | Title patterns | Authority | What they want | How the site talks to them |
|---|---|---|---|---|
| **Primary** | CEO, MD, Founder, Plant Director, Owner | Signs the deal. No deal without them. | "Have you done this in Kenya? Show me proof." Named clients, local presence, photos of actual installs. | Lead the homepage and case studies at them. Crywan-first. Plain industrial English. CTAs that say "Call me" or "Visit the plant." |
| **Influencer** | Plant Manager, Operations Head, Production Manager | Identifies the need, raises it. Cannot buy. Can kill the deal technically. | Process fit, maintenance burden, delivery reliability, lead times, post-sale support model. | Equipment pages, systems pages, spec sheets, comparison content. Honest about installation requirements. Lead times stated openly. |
| **Non-player** | Procurement Manager, Buying Officer | Paperwork. Comes in after CEO has decided. | Pro-forma invoice, tax/registration docs. | Quote-request flow handles them transactionally. Do NOT design content for procurement. |

**Design implication:** Two parallel reading paths on every commercial page — a CEO path (story, proof, outcome) and a Plant Manager path (specs, materials, install, support). Same page, different surfaces. Kenya competitors only build the Plant Manager path and lose the CEO sale.

### Industry-specific journey maps

**Food & Beverage (Priority 1, recurring, ambition-driven)**
- *Triggers:* Capacity expansion, new product line, new facility, food-safety audit, replacement of aging tanks.
- *Frame:* "We're growing — equip us to grow." Optimistic.
- *Unlocks:* Named F&B reference (Crywan, or any dairy/beverage/food processor we can credibly name). Site visit. Plant-side photos.
- *Site treatment:* `/industries/food-and-beverage/` is the largest industry page. Sub-applications: dairy, beverage, edible oils, brewing, bakery/grain. Each leads with stainless + epoxy options, ties to silos + instruments.

**ETP / Water Treatment (Priority 2, fastest cycle, fear-driven exception)**
- *Triggers:* NEMA inspection failure, discharge compliance deadline, donor-funded project, plant audit, new sewerage standard.
- *Frame:* Consequence-avoidance. Compliance pressure is the motivator — not growth.
- *Unlocks:* Speed, NEMA familiarity, ability to specify a system that will pass inspection.
- *Site treatment:* `/industries/etp-water-treatment/` leads with NEMA discharge standards table, references EMCA CAP 387. The ONE page where direct, compliance-fear language is appropriate. Express quote path `/request-quote/urgent-etp/`.

**Alcohol & Chemical Processing (Priority 3, slow, trust-heavy)**
- *Triggers:* Distillery/brewery scale-up, tank corrosion from existing CS, new processing line, safety/containment.
- *Frame:* Cautious. Price-sensitive in first conversation. Trust-driven in final conversation.
- *Unlocks:* Material specs, corrosion comparisons, containment standards, referenced installs.
- *Site treatment:* Heavy on material-science content. Programmatic `/compare/` and `/best/` surfaces serve these audiences.

### Objection map (top 8, with site-level answers)

| # | Objection | Site-level answer |
|---|---|---|
| 1 | "Have you done this in Kenya?" | Crywan case study on homepage above the fold + `/case-studies/crywan-industries-kenya/` + named in `/about/`. |
| 2 | "Are you an importer or do you make this locally?" | `/about/local-manufacturing/` with photos, address, fabrication process. Trust-strip on every commercial page: *"Fabricated in Kenya. Supported in Kenya."* |
| 3 | "Why pay more than carbon steel?" | `/compare/zinc-alum-vs-carbon-steel/` lifecycle TCO page with numbers, corrosion photos, replacement-cycle math. |
| 4 | "What if something breaks after delivery?" | Response-time commitments, parts inventory in Nairobi, named service contact. |
| 5 | "Will this meet NEMA standards?" (ETP only) | NEMA-explicit copy, parameters table, "designed to comply with EMCA CAP 387." |
| 6 | "Can your instruments connect to our system?" | `/products/instruments/` lists protocols (4–20mA, Modbus RTU/RS485, HART). IoT page covers cloud-ready capability. |
| 7 | "How long until delivery?" | Lead times stated openly on every category page. |
| 8 | "What if I want to start small?" | Modular tank sizing, "start with one, expand later" framing tied to recurring-order pattern. |

### Trust-gate constraint (the Crywan-only problem)

Because Crywan is the only named Kenya client at launch, this is a design constraint, not a content gap to backfill later:

1. **Anchor everything to Crywan visibly.** Homepage hero, About page, dedicated case study, mentioned in industry pages where applicable. Repetition is the point.
2. **Anonymized-but-specific patterns.** Where East-Africa-adjacent track record is genuinely useful, write it concretely: *"a 12-tank stainless installation for a West African dairy processor running [X capacity]"* — never *"a leading client in the region."* Specificity earns trust where the name can't be used.
3. **Convertible proof CTAs.** Above every commercial page: *"We'll put you on the phone with an existing customer before you commit."* `/talk-to-a-customer/` is a first-class URL — not a button modal.

**Graduation plan:** every closed deal becomes a candidate case study. The `/case-studies/[slug]/` template is built for additions on day one. The admin surface (Section 8) supports rapid publishing.

---

## Section 3 — Information Architecture & Route Map

### Primary navigation (top bar — 5 items max)

```
Products  |  Industries  |  Case Studies  |  About  |  [Get a Quote]
```

Secondary nav (footer): Resources, Locations, Blog, Contact.

### Full route map

**Top-level & product surfaces**
```
/                                          (homepage)
/products/                                 (overview)
/products/tanks/                           (tanks overview)
/products/tanks/stainless-steel/
/products/tanks/epoxy-lined/
/products/tanks/zinc-alum/
/products/silos/                           (silos overview)
/products/silos/grain-storage/
/products/silos/feed-storage/
/products/silos/industrial-bulk/
/products/structural-works/                (fabrication / steel works)
/products/instruments/                     (instruments overview — gateway)
/products/instruments/flow/                (flow meters category)
/products/instruments/level/               (level transmitters category)
/products/instruments/pressure/
/products/instruments/liquid-analysis/     (pH, EC, DO, turbidity, TSS, multi-param)
/products/instruments/temperature/
/products/instruments/system-products/     (recorders, indicators, signal isolators)
/products/iot/                             (cloud-ready monitoring — optional capability)
/products/iot/how-it-works/                (architecture, supported instruments, app screens)
```

**Industries**
```
/industries/
/industries/food-and-beverage/             (priority 1)
/industries/food-and-beverage/dairy/
/industries/food-and-beverage/beverage/
/industries/food-and-beverage/edible-oils/
/industries/food-and-beverage/brewing/
/industries/food-and-beverage/bakery-grain/
/industries/etp-water-treatment/           (priority 2 — NEMA-led)
/industries/etp-water-treatment/food-processing-etp/
/industries/etp-water-treatment/textile-etp/
/industries/etp-water-treatment/municipal-water/
/industries/alcohol-distilling/            (priority 3)
/industries/chemical-processing/           (priority 3)
```

**Case Studies**
```
/case-studies/
/case-studies/crywan-industries-kenya/     (flagship — load-bearing)
/case-studies/[slug]/                      (template ready for additions)
```

**About**
```
/about/
/about/local-manufacturing/                (the "we make it here" page)
/about/our-track-record/                   (anonymized regional installs)
/about/team/
/about/certifications/                     (NEMA, ISO, KEBS, etc.)
```

**Locations (Kenya deep + EA country-level)**
```
/locations/
/locations/kenya/
/locations/nairobi/                        (primary — industrial parks named)
/locations/mombasa/
/locations/kisumu/
/locations/nakuru/
/locations/eldoret/
/locations/thika/
/locations/uganda/
/locations/tanzania/
/locations/ethiopia/
/locations/rwanda/                         (future)
/locations/drc/                            (future)
```

**Programmatic SEO surfaces**
```
/best/[product]-for-[use-case]/
/compare/[a-vs-b]/
/cost/[solution]-in-[location]/
```

**Resources & Tools**
```
/resources/
/resources/guides/
/resources/spec-sheets/
/resources/[slug]/
/tools/tank-sizing-calculator/
/tools/lifecycle-tco/                      (zinc-alum vs CS — flagship)
/tools/nema-compliance-checker/            (ETP-specific, lead capture)
/blog/
/blog/[slug]/
```

**Conversion routes**
```
/contact/
/request-quote/
/request-quote/[intent]/                   intents: explore | evaluate | purchase | urgent-etp
/request-quote/success/
/book-consultation/                        (Plant Manager-facing)
/request-site-audit/                       (CEO-facing — implies field presence)
/talk-to-a-customer/                       (the trust-gate CTA — books a reference call)
```

**Admin (auth-gated)**
```
/admin/login/
/admin/                                    (dashboard)
/admin/case-studies/                       (CRUD)
/admin/case-studies/new/
/admin/case-studies/[id]/edit/
/admin/blog/
/admin/blog/new/
/admin/blog/[id]/edit/
/admin/spec-sheets/                        (PDF upload library)
/admin/media/                              (image/video library)
/admin/iot-screenshots/                    (app mockup uploads)
/admin/settings/
```

**LLM discovery & static**
```
/llms.txt                                  (concise AI-readable site map)
/llms-full.txt                             (extended — full product copy, case study text, NEMA reference)
/sitemap.xml
/robots.txt
/privacy/
/terms/
```

### Launch tiers

**Tier 1 — Day-1 launchable (~28 pages):** Homepage, all `/products/*` overviews, four flagship product pages (SS tanks, zinc-alum, grain silos, structural works), `/products/instruments/` gateway, `/products/iot/`, `/industries/`, F&B + ETP industry pages, `/case-studies/crywan-industries-kenya/`, `/about/`, `/about/local-manufacturing/`, `/locations/kenya/`, `/locations/nairobi/`, full conversion route set including `/talk-to-a-customer/`.

**Tier 2 — Within 30 days (~30 more pages):** Remaining product sub-pages, all 6 instrument category pages, F&B sub-applications, alcohol + chemical industries, remaining Kenya cities, EA country pages, resources hub, first 3 flagship `/compare/` pages.

**Tier 3 — SEO engine (ongoing):** Programmatic `/best/`, `/compare/`, `/cost/` expansion driven by keyword research; blog cadence; case studies as deals close.

### Critical IA decisions baked in

1. **No `/solutions/` and no `/systems/` parallel taxonomies.** Pumea has both, which creates SEO cannibalization. North Star uses one taxonomy: Products × Industries. The programmatic `/best/[product]-for-[use-case]/` surface is the only intersection layer.
2. **`/products/iot/` lives under products.** Capability layered on equipment, not a separate business.
3. **`/talk-to-a-customer/` is a real URL.** First-class architecture decision — the single most differentiated IA choice against Desbro/Techwin/Pipeco.
4. **`/locations/nairobi/` ranks on its own** — not a redirect to `/locations/kenya/`. Industrial estates named (Athi River, Ruiru, Mlolongo, Industrial Area, Mombasa Road) for local SEO.
5. **Instruments gateway is conversion, category pages are SEO.** Plant Managers land on category pages from Google; CEOs land on the gateway to understand breadth.

### What's deliberately NOT built

- No per-SKU instrument pages (per "category pages only" decision). Spec sheets are PDF downloads off category pages.
- No `/solutions/` or `/systems/` taxonomies.
- No e-commerce.
- No customer portal at launch (deferred sub-project).

---

## Section 4 — Content Scope Per Page

### Homepage (`/`)

**Primary query target:** `industrial tanks Kenya`, `stainless steel tanks Nairobi`, `tank supplier Kenya`

**Must-say:**
1. Hero — *"Industrial tanks, silos, and instruments. Made in Kenya. Trusted by Crywan Industries."* Crywan name above the fold.
2. Five-pillar strip (Section 1)
3. Product matrix — visual bento of tanks / silos / structural works / instruments / IoT
4. Industries strip — F&B / ETP / Alcohol / Chemical
5. Crywan case study card
6. "What carbon steel actually costs you" — TCO teaser → `/compare/zinc-alum-vs-carbon-steel/`
7. Trust strip — "Fabricated in Kenya. Delivered across East Africa. On-site within 48 hours."
8. CTA hierarchy: Primary *Get a Quote* / Secondary *Talk to one of our customers* / Tertiary *Book a site audit*

### `/products/` (Overview)

One paragraph framing North Star as single-supplier. Five product cards (tanks, silos, structural works, instruments, IoT). No pricing.

### `/products/tanks/stainless-steel/` (Flagship product page template)

**Primary query:** `stainless steel tank Kenya`, `SS tank Nairobi food grade`, `304/316 stainless steel tank Kenya`

**Must-say:**
1. Headline + 2-line lede stating material grade options (304, 316L), capacity range, applications
2. **Specifications block** — capacity range, wall thickness, finish, weld certifications, surface roughness (Ra), drain/manway/CIP options, design pressure
3. **Applications block** — F&B (dairy, beverage, edible oils), pharma-adjacent, ETP. Photo + 1-line outcome each.
4. **Cloud-ready callout** — *"Optional: every SS tank can be installed with level, temperature, and pressure instruments wired to our remote monitoring app."*
5. **Material comparison row** — SS vs Epoxy vs Zinc-Alum vs Carbon Steel mini-table linking to `/compare/` pages
6. **Lead time** — stated openly
7. **Crywan reference inline**
8. CTAs: *Get a quote for SS tanks*, *Download SS tank spec sheet*

**Template applies to:** `/products/tanks/epoxy-lined/`, `/products/tanks/zinc-alum/`, `/products/silos/grain-storage/`, etc.

### `/products/tanks/zinc-alum/` (Strategic — easiest close)

Comparison row leads. Zinc-alum vs carbon steel is the headline argument. TCO math embedded directly. Photo evidence of corroded CS vs intact zinc-alum side-by-side.

### `/products/instruments/` (Gateway)

Frame six categories — flow, level, pressure, liquid analysis, temperature, system products. State protocol compatibility upfront (4–20mA, Modbus RTU, HART, RS485). Connect to IoT.

### `/products/instruments/[category]/` (Category page template)

**Primary queries per category:**
- Flow: `electromagnetic flow meter Kenya`, `ultrasonic flow meter Nairobi`, `flow meter supplier Kenya`
- Level: `radar level transmitter Kenya`, `ultrasonic level meter Kenya`, `tank level sensor Kenya`
- Pressure: `pressure transmitter Kenya`, `differential pressure transmitter Nairobi`
- Liquid analysis: `pH meter industrial Kenya`, `dissolved oxygen meter Kenya`, `multi-parameter water analyzer Kenya`
- Temperature: `RTD temperature sensor Kenya`, `temperature transmitter Nairobi`
- System products: `paperless recorder Kenya`, `process indicator Kenya`, `signal isolator Kenya`

**Must-say:**
1. Category overview — what these instruments do, when to use what
2. Sub-types — bullet list with one-line descriptions
3. Application matrix — instrument fit per industry
4. Protocols & outputs
5. IoT-ready note
6. "Request spec sheet" CTA
7. Cross-link to `/compare/` pages

### `/products/iot/` (The optional capability)

**Primary query:** `tank monitoring Kenya`, `remote tank level sensor Kenya`, `IoT industrial monitoring Nairobi`, `cloud connected tank Kenya`

**Must-say:**
1. Headline that doesn't oversell — *"Optional remote monitoring for your tanks and instruments. Available on every install."*
2. How it works — 3-step diagram: instrument → gateway → cloud → phone/browser
3. What you see — annotated screenshots (Figma-driven): tank levels, flow trends, alarm log, multi-site overview
4. Supported instruments — "any flow / level / pressure / water-quality / temperature instrument we install"
5. Connectivity options — **LoRa, Safaricom NB-IoT (named explicitly), cellular, Ethernet, Wi-Fi**
6. Data handling — *"Your data, stored on infrastructure you choose. We can host it, or push it into your own systems."*
7. **Not-pushy positioning** — *"We don't bundle this into our tank quotes. Ask for it if you want it. Most of our customers don't need it on day one — many add it later as their operations scale."*
8. **No pricing** (per user requirement)
9. CTAs: *Book an IoT demo*, *See it on a real install*

### `/products/iot/how-it-works/` (Technical deep-dive)

Architecture diagram, protocols, security model, on-premise vs cloud options. SEO: `industrial IoT architecture`, `tank monitoring system Kenya`.

### `/industries/food-and-beverage/` (Industry overview template)

**Primary query:** `food and beverage equipment supplier Kenya`, `dairy plant tanks Nairobi`, `food processing tanks Kenya`

**Must-say:**
1. Industry framing — capacity expansion + new product line + audit-driven trigger patterns
2. Sub-applications grid (dairy, beverage, edible oils, brewing, bakery/grain)
3. Equipment fit table — F&B → SS tanks (primary), epoxy (secondary), silos, instruments
4. Crywan card if F&B-relevant
5. Anonymized-but-specific regional examples
6. Compliance — KEBS food-grade standards, 304/316L by name
7. CTAs: industry-specific quote intent

### `/industries/etp-water-treatment/` (Compliance-fear page — the exception)

**Primary query:** `NEMA compliant ETP Kenya`, `effluent treatment plant tanks Kenya`, `wastewater treatment equipment Nairobi`, `EMCA CAP 387 compliance`

**Must-say:**
1. Direct, consequence-driven hero — *"NEMA effluent standards have tightened. Failing inspection halts production. We supply the tanks and monitoring instruments that pass."*
2. **NEMA parameters table** — BOD, COD, TSS, pH, TN, TP, NH₃-N with discharge limits. **No Kenya competitor publishes this on a supplier site.** Owning this = ranking #1 for ETP-compliance queries.
3. EMCA CAP 387 reference
4. Equipment for ETP — SS tanks, epoxy-lined, instruments (pH, EC, DO, turbidity, TSS, multi-parameter)
5. The multi-parameter analyzer as the ETP centerpiece
6. Urgent path — *"Compliance deadline pressure? We expedite ETP equipment within 2–3 weeks."* → `/request-quote/urgent-etp/`
7. Optional IoT framing — *"For ETP plants under continuous monitoring obligations, our cloud-connected analyzers stream parameter data 24/7 with alarm logs."*

### `/case-studies/crywan-industries-kenya/` (The heavy lifter)

**Primary query:** `Crywan Industries Kenya`, `stainless steel tank installation Kenya case study`

**Must-say:**
1. The client — who Crywan is, what they make, scale of operations
2. The brief — what they needed, why
3. The solution — what we supplied, specs, install timeline
4. The outcome — operational result (uptime, capacity, hygiene compliance)
5. Photos — real install photos
6. Optional pull quote from Crywan leadership
7. **"Want to talk to Crywan?"** CTA → `/talk-to-a-customer/`
8. Related products inline

### `/about/local-manufacturing/`

**Primary query:** `tank manufacturer Kenya`, `industrial fabrication Nairobi`, `Kenya-based tank supplier`

**Must-say:** Workshop location. Photos. Fabrication process (cutting, rolling, welding, finishing). Team size. Capacity numbers. *"This is not an import. This is built here."*

### `/locations/nairobi/` (Geo-SEO flagship)

**Primary query:** `tank supplier Nairobi`, `industrial equipment Nairobi`, `silo Nairobi`

**Must-say:**
1. Nairobi-specific framing — *"We deliver to plants across Nairobi within 48 hours."*
2. **Industrial estates named** — Athi River, Ruiru, Mlolongo, Industrial Area, Mombasa Road corridor, Tatu City, Thika Road
3. Local case study if available
4. Delivery routes / logistics
5. **LocalBusiness JSON-LD schema** (the local-pack ranker)
6. CTA: *Request a site visit in Nairobi*

Same template scaled for Mombasa, Kisumu, Nakuru, Eldoret, Thika.

### `/talk-to-a-customer/`

**Must-say:**
1. *"Before you buy from us, talk to someone who already has."*
2. Short form: name, company, industry, what you're considering
3. *"Within 24 hours we'll connect you with an existing customer in your industry."*
4. **Honest disclosure** — *"We'll only share contacts who have agreed to be references. Currently that's primarily our Kenya anchor Crywan Industries. As our reference network grows, we expand this."*

### `/request-quote/` and `/request-quote/[intent]/`

Four intents: `explore` (early-stage), `evaluate` (technical specs), `purchase` (ready to buy), `urgent-etp` (compliance fast-track). Each loads a tailored form.

### Programmatic SEO pages

**Template:**
1. Strong H1 matching the query
2. 2-paragraph intro
3. **Real comparison content** — not boilerplate
4. Specifications side-by-side
5. Recommendation — *"For Kenya operators, we recommend X because Y."*
6. Internal links to product pages
7. CTA

### Image strategy (user-generated workflow)

- **Track A — Real photography (preferred):** Crywan install (with permission), Nairobi workshop, fabrication-in-progress, actual tanks/silos/instruments from past installs, real client environments, the team.
- **Track B — Generated imagery:** User generates via image-gen tools. Implementation provides specific art-directed prompts (composition, subject, lighting, mood, aspect ratio, design role) for every image slot. Placeholders in code must look intentional — correct aspect ratio, considered crop, labeled with intended subject. No abstract shapes, no AI gradient blobs, no generic factory stock.

**Implementation rule:** When scaffolding any page that needs imagery, list image slots at end of message in one block — location, role (hero/card/inline/diagram), aspect ratio, and copy-pasteable prompt.

**Placeholder pattern:**
```
aspect-[16/9] (hero) / aspect-[4/3] (cards) / aspect-[3/4] (portraits) / aspect-[21/9] (panoramic)
bg-[neutral-token] rounded-2xl
optional: thin label "[Intended subject]" centered in muted text
```

### Content scope NOT in this spec (deliberate)

- Specific copy for every page — copywriting deliverable downstream
- Full image asset list — separate visual brief
- Translation/Swahili copy — English only at launch

---

## Section 5 — SEO Map, Schema, hreflang, Keyword Strategy

### Core SEO architecture

- **Canonical domain:** `northstarimpex.co.ke` (primary). Redirect `.com`, `.net`.
- **hreflang:** `en-KE` locale at launch. `<html lang="en-KE">` on every page.
- **URL pattern:** trailing-slash, lowercase, kebab-case, no query strings on canonical URLs.
- **Sitemap:** `sitemap.xml` auto-generated (mirror Pumea's `src/app/sitemap.ts` pattern).
- **robots.txt:** Allow all except `/admin/`, `/request-quote/success/`, preview routes.
- **llms.txt:** `/llms.txt` + `/llms-full.txt`, referenced from robots.

### JSON-LD schema set

Every page: BreadcrumbList + Organization. Page-type-specific schemas:

| Page type | Schemas |
|---|---|
| Homepage | `Organization` (with address, areaServed, contactPoint, sameAs), `WebSite` with `SearchAction` |
| `/products/.../[product]/` | `Product` (manufacturer, material, category), `BreadcrumbList`, `FAQPage` if FAQ block present |
| `/industries/[slug]/` | `Service` (serviceType, areaServed, provider), `BreadcrumbList` |
| `/locations/[city]/` | **`LocalBusiness`** (address, geo, openingHoursSpecification, areaServed), `BreadcrumbList` — *the local-pack ranker* |
| `/case-studies/[slug]/` | `Article` + `Organization` (client) + `Product` (installed) |
| `/compare/[a-vs-b]/` | `Article` with `about: [Product, Product]` |
| `/blog/[slug]/` | `BlogPosting` |
| `/resources/[slug]/` | `Article` |
| `/products/iot/` | `SoftwareApplication` |

### Keyword strategy (from firecrawl SERP analysis — see research/ doc for raw data)

**Tier 1 — Head terms (commercial intent, fight directly):**

| Keyword | Competitor to displace | Target page |
|---|---|---|
| stainless steel tank Kenya | Desbro Engineering | `/products/tanks/stainless-steel/` |
| zinc aluminum tank Kenya | Pipeco Africa, SBS Tanks | `/products/tanks/zinc-alum/` |
| industrial silo Kenya | Techwin Limited | `/products/silos/industrial-bulk/` |
| grain storage silo Kenya | Kentainers, Silo Africa | `/products/silos/grain-storage/` |
| ETP Kenya / effluent treatment Kenya | Maji Hill, Afriwell, Elikham | `/industries/etp-water-treatment/` |
| tank supplier Nairobi | Desbro, Trivon, Bonafine | `/locations/nairobi/` + homepage |
| flow meter supplier Kenya | Kubtech (Endress+Hauser) | `/products/instruments/flow/` |

**Tier 2 — Mid-tail:** `radar level transmitter Kenya`, `ultrasonic level meter Kenya`, `pH meter industrial Kenya`, `dissolved oxygen meter Kenya`, `pressure transmitter Kenya`, `paperless recorder Kenya`, `multi-parameter water analyzer Kenya`, `epoxy lined tank Kenya`, `food grade tank Kenya`, `dairy tank Kenya`, `brewery tank Kenya`, `tank manufacturer Nairobi`, `structural fabrication Nairobi`, `industrial fabrication Kenya`.

**Tier 3 — Long-tail (programmatic engine):** `/best/[product]-for-[use-case]/`, `/compare/[a-vs-b]/`, `/cost/[solution]-in-[location]/`.

**Tier 4 — Defensible niche (almost no competition):** `NEMA compliant tank Kenya`, `EMCA CAP 387 effluent equipment`, `KEBS food grade tank supplier`, `cloud connected tank Kenya`, `remote tank monitoring Nairobi`, `IoT tank level sensor Kenya`, `local manufacturer industrial tank Kenya`, `tank supplier with reference clients Kenya`.

### SERP-driven content insights (from firecrawl pass — 2026-05-25)

1. **No Kenya tank site publishes the NEMA discharge parameters table.** Owning this = ranking #1 for ETP-compliance queries.
2. **None publish a lifecycle TCO calculator** for zinc-alum vs carbon steel. Ownership = global ranking for "zinc alum vs carbon steel."
3. **`.co.ke` domain signal** — three of top-10 SS tank results use it. We must too.
4. **Safaricom NB-IoT** on the IoT page is a high-trust local signal international competitors won't have.
5. **Kenya competitors lead with named clients** (Desbro/dairy, Techwin/brewery). We must too — Crywan-first.
6. **Most ranking pages are thin** ("best prices in Kenya" copy). Our content depth will beat them in the helpful-content era.

### Programmatic SEO governance (avoiding thin content)

1. **No combinatorial generation.** Each page hand-edited to 300–500+ words of unique content. Pick the 20–30 permutations that map to real customer questions.
2. **Internal linking obligation.** Every programmatic page links to: relevant product, relevant industry, relevant case study, one related comparison.
3. **Refresh cadence.** Quarterly review. Pages stuck below position 30 get rewritten or removed.

### Technical SEO (table-stakes)

- Core Web Vitals green at launch (Next.js 14 App Router + RSC default)
- Mobile-first responsive (Kenya is mobile-majority)
- Structured data validated via Google Rich Results test in build pipeline
- Open Graph + Twitter cards on every page
- Canonical URLs (no `?utm=` duplicate-content issues)
- Image alt text mandatory (build-time check)
- All primary content RSC-rendered

### Pre-launch SEO research checklist

Run before content writing kicks off:
1. **Keyword volumes** for each Tier 1 term via Kenya-localized SERP analysis
2. **Competitor content audits** — full scrape of Desbro, Techwin, Pipeco, SBS, Maji Hill, Afriwell, Kubtech
3. **NEMA + KEBS publication scrape** — canonical regulatory documents for accurate referencing
4. **People Also Ask + related searches** for each Tier 1 query → feeds FAQ blocks
5. **Backlink targets** — Kenya industry directories (KAM, KEPSA, KMA), trade publications, NEMA-related sites

Output: a `content-brief.md` per Tier 1 page with exact queries, PAA questions, competitor headlines, link targets.

---

## Section 6 — IoT Product Narrative

### Page architecture

```
/products/iot/                  Marketing-led, optional-capability framing, demo CTA
/products/iot/how-it-works/     Technical deep-dive, architecture diagram, protocol list
```

No customer login portal at launch. No pricing page. No app screens hosted at separate URLs — all visuals live inside the two pages above.

### The 3-step story (every IoT visual reinforces this)

```
1. INSTRUMENT   →   2. GATEWAY   →   3. CLOUD   →   4. YOUR APP
   (Supmea-       (LoRa/NB-IoT/    (data         (phone/browser
    spec'd flow,   cellular/        ingestion,    dashboard,
    level, pH,     ethernet)        time-series   alarms,
    etc.)                           store)        multi-site)
```

### What the app shows (Figma-driven mockups)

The IoT product page surfaces 4–6 annotated screen mockups. The user will design these in Figma; this spec defines what each screen must communicate:

1. **Single-tank dashboard** — current level, 24h trend, alarm threshold lines, last-refresh timestamp, instrument health indicator.
2. **Multi-site overview** — map of Kenya/East Africa with site pins, traffic-light status per site, drill-down on click.
3. **Alarm log** — recent alarms, ack/resolved states, who acknowledged, time-to-resolve.
4. **Process trend chart** — flow + level + temperature + pH on one timeline, zoomable, exportable.
5. **Reports view** — daily/weekly/monthly summary auto-generated, downloadable PDF.
6. **Settings / users** — minimal — who has access, alarm recipients.

### Supported instruments

Frame as: *"Any flow, level, pressure, water-quality, or temperature instrument we install can be wired to the monitoring app."* Behind that statement, the supported list maps to the full 154-SKU catalog from the Supmea sourcing (not surfaced to the public — but supports any RFQ that comes in):

- **Flow:** electromagnetic (incl. battery-powered for off-grid), vortex (with T&P compensation), turbine, ultrasonic (handheld, wall-mount, Doppler), Coriolis mass, thermal mass
- **Level:** ultrasonic (standard, mud, compact), radar (26GHz, 60GHz, 76–81GHz, 80GHz, long-range, guided-wave, river), hydrostatic submersible (slurry, PTFE, high-temp), differential pressure level
- **Pressure:** standard transmitters, differential pressure, combined P+T
- **Liquid analysis:** pH/ORP (industrial, dual-channel, plastic/glass body, HF-resistant, digital RS485), conductivity/TDS (2-pole, 4-pole, graphite, alloy), dissolved oxygen (membrane, optical, electrochemical), turbidity (low-range, high-range), TSS/SS, multi-parameter, residual chlorine, ammonia
- **Temperature:** RTD, thermocouple, Hirschmann-connector, programmable transmitter
- **System products:** paperless recorders, chart recorders, process indicators, totalizers, fuzzy-PID controllers, signal isolators, signal generators

This list is **not displayed publicly as a SKU dump.** It's the technical inventory backing the "any instrument" claim — used by sales for RFQ matching.

### Connectivity options (must be on the page by name)

| Option | When to recommend |
|---|---|
| **Safaricom NB-IoT** | Single-tank or low-bandwidth remote sites in Kenya — primary recommendation, low power, multi-year battery |
| **LoRaWAN** | Multi-tank sites, on-prem gateway, no carrier dependency |
| **4G/LTE cellular** | High-bandwidth multi-instrument sites, real-time streaming |
| **Ethernet / Wi-Fi** | Plants with existing IT infrastructure |

**Critical Kenya signal:** Naming Safaricom NB-IoT explicitly — international competitors won't, and it tells the buyer we understand local connectivity infrastructure.

### Data handling (the trust-anchor of the IoT page)

- *"Your data, stored on infrastructure you choose. We can host it for you, or push it into your own systems."*
- Mention export formats (CSV, JSON, Modbus-over-TCP for SCADA integration)
- Security: TLS in transit, AES-256 at rest, role-based access, audit log
- **No third-party data sharing.** Explicit statement.

### The not-pushy positioning (essential)

> "We don't bundle cloud monitoring into our tank quotes. Ask for it if you want it. Most of our customers don't need it on day one — many add it later as their operations scale. The capability is there when you need it."

This frames North Star as equipment-first, software-second — aligned with the "we are NOT a software company" stance from Section 1.

### Image prompts needed (for user generation)

1. **Hero shot for `/products/iot/`** — *"A real industrial plant control room in Kenya, dusk lighting, a Plant Manager standing in front of a wall-mounted dashboard showing tank levels. Camera positioned over their shoulder. Authentic — not glossy AI render. 16:9 widescreen. Mood: capable, calm, modern-industrial."*
2. **3-step diagram** — *"Clean technical diagram showing: industrial tank with mounted sensor → wireless gateway box on a pole → cloud icon → phone showing a dashboard. Minimal vector style, single accent color, white background. 16:9."*
3. **Single-tank dashboard mockup** — *"Phone-frame mockup of a tank-monitoring app dashboard. Shows: current liquid level (78%), 24-hour level trend line, alarm threshold horizontal lines, timestamp 'Updated 2 min ago'. Dark mode interface, monospace numerals, single accent color. 9:16 portrait."*
4. **Multi-site overview mockup** — *"Browser-frame mockup showing a Kenya map with 5 site pins. Each pin colored green/amber/red. Side panel showing a list view of the same sites with status badges. 16:9 landscape."*
5. **Alarm log mockup** — *"Browser-frame showing a tabular alarm log. Columns: timestamp, site, instrument, severity (icons), acknowledged-by, action-taken. Subtle row striping, dark theme. 16:9 landscape."*
6. **Process trend chart mockup** — *"Browser-frame showing a time-series chart with 3 overlaid lines: flow rate, temperature, pH. Zoomable axis, legend, hover tooltip on a data point. Dark theme. 16:9 landscape."*
7. **Connectivity options visual** — *"Infographic showing 4 connectivity icons: NB-IoT (Safaricom mast), LoRa (gateway pole), 4G/LTE (cell tower), Ethernet (port). Each with a brief use-case label. Horizontal layout. 21:9 panoramic."*

---

## Section 7 — Design Tokens & Component Direction

**Design ownership:** The user designs the visual system in Figma and hands it via Figma MCP. This section captures engineering-side principles that implementation must respect regardless of specific Figma choices.

### Reference design philosophies

Three skills inform implementation discipline (URLs the user provided are reference reading; equivalents may be installed locally as `emil-design-eng`, `impeccable`, `gpt-taste` / `design-taste-frontend`):

- **Emil Kowalski (emil-design-eng)** — Animation timing, the invisible polish that makes software feel great. Use for: button feedback, page transitions, modal entrances, micro-interactions.
- **Impeccable (impeccable)** — High-end frontend interfaces. Use for: hierarchy, spacing, typography rhythm, premium feel without flash.
- **Taste (gpt-taste / design-taste-frontend)** — UX/UI motion engineering, strict layout variance, GSAP-driven scrolltriggers, asymmetric grids, perpetual micro-motion, hardware-accelerated performance.

When in doubt during implementation, the priority order is: **Figma source of truth → Emil's polish principles → Impeccable's hierarchy → Taste's motion vocabulary.**

### Core visual principles (engineering-side rules)

1. **Industrial-modern, not consumer-app.** Real photography of plants and tanks. Spec-sheet typography. Information density appropriate to a B2B audience that reads.
2. **NO gradients.** Anywhere. Solid colors, flat surfaces, real photography.
3. **Real photography over illustration.** Every visual implies an actual subject. No abstract shapes, no AI-blob filler.
4. **Two-track typography** — display (uppercase, tight tracking, heavy weight) for headlines; sans-serif body for prose.
5. **Hardware-accelerated motion.** Transform + opacity only for animations. Never animate width/height/top/left.
6. **Cache-friendly responsive imagery.** Next.js `<Image>` with sized variants for mobile (Kenya = mobile-majority).

### Component patterns (carried forward, adapted from Pumea)

Bento-grid card patterns Pumea uses are a strong starting point — the user can carry/adapt:

```
Light card:   rounded-3xl border border-[#E8E5DF] bg-white p-7 md:p-8
Dark card:    rounded-3xl border border-[#252320] bg-[#181714] p-7
Accent card:  rounded-3xl bg-[ACCENT_TOKEN] p-7
Hover:        transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl
```

**However**: Pumea's bronze/cream palette is GCC-coded. North Star Kenya should NOT inherit it. The user will define the new palette in Figma. Likely directions to test:
- Earth-and-iron — deep forest green, weathered steel, off-white (industrial Kenya)
- Sky-and-savanna — savanna ochre, deep blue, bone (East African landscape, modernized)
- Industrial-noir — near-black, machined-aluminum grey, single bright accent

Implementation should expose colors as CSS custom properties or Tailwind tokens so the Figma-defined palette swaps cleanly. Do NOT hardcode hex values inline.

### Image placeholder pattern (per user feedback memory)

When implementing pages that need imagery the user will generate:

```tsx
<div
  className="aspect-[4/3] rounded-2xl bg-[var(--placeholder-bg)] flex items-center justify-center border border-dashed border-[var(--placeholder-border)]"
  data-image-slot="hero | card | inline | diagram"
  data-image-role="Crywan Industries SS tank install — wide shot"
>
  <span className="text-xs uppercase tracking-[0.22em] text-[var(--placeholder-label)]">
    {imageDescription}
  </span>
</div>
```

The slot looks intentional — visible label, considered aspect ratio, surrounding spacing matching the final image's role. Implementation surfaces a prompt list at the end of every scaffold message for the user to generate.

### Motion vocabulary (from Emil + Taste)

- **Entrance:** opacity 0 → 1 + translateY(8px → 0), duration 300–400ms, ease-out
- **Hover lift:** translateY(0 → -4px), duration 200ms
- **Scroll-triggered reveals:** GSAP ScrollTrigger, batched, hardware-accelerated
- **Page transitions:** crossfade only, no slide. 200ms.
- **Loading states:** skeleton blocks at exact final-content dimensions (no layout shift)

### Accessibility (non-negotiable)

- WCAG AA contrast minimums (verified in build)
- Focus rings visible on all interactive elements
- Keyboard-navigable everywhere (escape modal closes, tab order logical)
- Reduced-motion respected (`prefers-reduced-motion` halts non-essential animation)
- Alt text on every image (build-time check)
- Form labels visible, not placeholder-only

---

## Section 8 — Tech Stack & Repo Layout

### Stack (new standalone repo)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 App Router | RSC by default, edge runtime where applicable |
| Language | TypeScript (strict) | No `any` in checked-in code |
| Styling | Tailwind CSS 3.x | Tokens via CSS custom properties for theme swap |
| UI primitives | shadcn/ui | Copy-into-repo pattern, not a dep |
| Forms | react-hook-form + zod | Server-side validation matching client schema |
| CMS / content store | Postgres (Neon or Supabase) | Hosts case studies, blog posts, admin uploads metadata |
| Image storage | Vercel Blob (or Cloudflare R2) | Imageable via Next/Image |
| Auth (admin only) | NextAuth.js (Credentials provider) or Lucia | Session cookie, no public signup |
| Email | Resend or Postmark | Quote-request transactional + reference-call requests |
| Deployment | Vercel | northstarimpex.co.ke primary domain |
| Analytics | Plausible (self-hosted optional) or PostHog | Privacy-friendly; avoid GA4 if possible |
| Search Console / Bing | Required | Submit sitemap.xml at launch |
| Monitoring | Sentry | Error tracking, performance budgets |

### Repo structure

```
northstar-website/
├── README.md                          (project overview, dev setup, deploy)
├── CLAUDE.md                          (instructions for future Claude sessions)
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── next-sitemap.config.js
├── docs/
│   ├── specs/                         (carry the foundation spec from this doc)
│   ├── research/                      (SERP snapshots, competitor scrapes)
│   └── content-briefs/                (per-page content briefs from Section 5 checklist)
├── public/
│   ├── images/                        (user-generated, committed where small enough; CDN-hosted otherwise)
│   ├── pdfs/                          (spec sheets)
│   ├── llms.txt
│   └── llms-full.txt
├── src/
│   ├── app/
│   │   ├── (marketing)/               (public marketing routes — route group)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               (homepage)
│   │   │   ├── products/
│   │   │   ├── industries/
│   │   │   ├── case-studies/
│   │   │   ├── about/
│   │   │   ├── locations/
│   │   │   ├── resources/
│   │   │   ├── tools/
│   │   │   ├── blog/
│   │   │   ├── best/[slug]/
│   │   │   ├── compare/[slug]/
│   │   │   ├── cost/[slug]/
│   │   │   ├── contact/
│   │   │   ├── request-quote/
│   │   │   ├── book-consultation/
│   │   │   ├── request-site-audit/
│   │   │   └── talk-to-a-customer/
│   │   ├── admin/                     (auth-gated route group)
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   ├── page.tsx               (dashboard)
│   │   │   ├── case-studies/
│   │   │   ├── blog/
│   │   │   ├── spec-sheets/
│   │   │   ├── media/
│   │   │   ├── iot-screenshots/
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── quote/                 (quote-request handler)
│   │   │   ├── reference-call/        (talk-to-a-customer handler)
│   │   │   ├── admin/                 (admin CRUD)
│   │   │   └── upload/                (signed-URL upload to Blob/R2)
│   │   ├── llms.txt/route.ts          (dynamic generation from content-map)
│   │   ├── llms-full.txt/route.ts
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ui/                        (shadcn primitives)
│   │   ├── marketing/                 (homepage, product cards, industry strips)
│   │   ├── conversion/                (quote forms, talk-to-customer form, CTAs)
│   │   ├── admin/                     (CRUD forms, upload widgets)
│   │   └── iot/                       (mockup-rendering components)
│   ├── lib/
│   │   ├── content-map.ts             (mirror of Pumea pattern — drives sitemap + nav + breadcrumbs)
│   │   ├── industries.ts
│   │   ├── products.ts
│   │   ├── locations.ts
│   │   ├── constants.ts               (SITE_URL, SITE_NAME, contact details)
│   │   ├── db.ts                      (Postgres client)
│   │   ├── auth.ts                    (NextAuth/Lucia config)
│   │   ├── schema.ts                  (Zod schemas — shared client/server)
│   │   ├── seo.ts                     (JSON-LD generators per page type)
│   │   └── storage.ts                 (Blob/R2 client wrapper)
│   ├── content/
│   │   └── (reserved — static reference content if needed; case studies and blog posts are DB-driven via /admin/)
│   └── styles/
│       └── globals.css                (Tailwind base + CSS custom properties for theme)
└── tests/
    ├── e2e/                           (Playwright — happy paths for quote, talk-to-customer)
    └── unit/                          (Vitest — content map integrity, sitemap generation)
```

### Environment variables (`.env.example`)

```
# Site
SITE_URL=https://northstarimpex.co.ke
SITE_NAME="North Star Impex Kenya"
CONTACT_EMAIL=hello@northstarimpex.co.ke
CONTACT_PHONE=+254-XXX-XXXXXX

# Database
DATABASE_URL=postgres://...
DIRECT_URL=postgres://...               # Neon/Supabase direct connection for migrations

# Auth (admin)
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://northstarimpex.co.ke
ADMIN_EMAIL_ALLOWLIST=                  # comma-separated emails

# Storage
BLOB_READ_WRITE_TOKEN=                  # Vercel Blob, or
R2_ACCESS_KEY_ID=                       # Cloudflare R2
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_ENDPOINT=

# Email
RESEND_API_KEY=
QUOTE_NOTIFICATION_EMAIL=               # internal recipient for incoming quotes

# Analytics
PLAUSIBLE_DOMAIN=northstarimpex.co.ke

# Monitoring
SENTRY_DSN=

# Research / external (optional, dev-only)
FIRECRAWL_API_KEY=
```

### Content-map architecture

Mirror Pumea's pattern — single source of truth for sitemap + nav + breadcrumbs + JSON-LD + llms.txt:

```ts
// src/lib/content-map.ts
export const PRODUCTS = [
  { slug: 'tanks/stainless-steel', name: 'Stainless Steel Tanks', category: 'tanks', ... },
  { slug: 'tanks/zinc-alum', name: 'Zinc-Alum Tanks', ... },
  // ...
] as const

export const INDUSTRIES = [...]
export const LOCATIONS = [...]
export const CASE_STUDIES = [...]
export const COMPARE_PAGES = [...]
export const BEST_PAGES = [...]
export const COST_PAGES = [...]
```

All routes, sitemap entries, nav items, breadcrumb trails, and JSON-LD generators read from these arrays. Adding a new page = updating the array (or admin entry).

### Build pipeline checks

- TypeScript strict pass
- ESLint (Next.js + Tailwind plugin)
- Build-time check: every image has alt text
- Build-time check: every page has a `<title>` and meta description
- Build-time check: Rich Results validator on representative pages
- Build-time check: no broken internal links
- Lighthouse CI on PR previews (Performance ≥ 90, SEO 100, Accessibility ≥ 95)

### Deployment

- Vercel primary. Preview deploys on every PR.
- Custom domain: `northstarimpex.co.ke`. Redirect `.com`, `.net`, `www.` subdomain.
- DNS at registrar.
- HTTPS via Vercel cert.
- Edge functions where relevant (sitemap, llms.txt).

---

## Section 9 — Trust Constraint Plan (Crywan-Only Anchor)

The site launches with one named Kenya reference. This is a constraint to design around — not a content gap to apologize for or backfill silently. The plan has three parts: **anchoring**, **substituting**, and **graduating**.

### Anchoring (use the one we have, repeatedly)

- Homepage hero mentions Crywan by name above the fold
- About page mentions Crywan in the second paragraph
- `/case-studies/crywan-industries-kenya/` is the flagship case study, linked from every product page that applies
- Industry pages (F&B if Crywan is F&B; adjust per actual Crywan industry) reference Crywan inline
- `/talk-to-a-customer/` honestly states Crywan is the current reference

The site does not pretend to have more references than it does. Honesty + repetition is more credible than vague claims.

### Substituting (anonymized-but-specific)

For non-Kenya track record from the broader operation, use the pattern:

> "We've delivered a 12-tank 304 stainless installation for a West African dairy processor running 50,000L/day. We've supplied an ETP equipment train for a textile processor with 8 process tanks and a multi-parameter analyzer cluster. We've built a 200-MT grain silo array for a feed mill in Asia."

Rules:
- Always specific (capacity, count, application) — never *"a leading client in the region"*
- Always anonymized at the company level
- Only used when the use case is materially comparable to what a Kenya prospect would buy
- **Risk to manage:** do not let the anonymized list inadvertently identify Pumea or West Africa references — keep names of countries/regions general where needed for the "independent brand, no Pumea link" positioning

### Graduating (turn closed deals into named cases)

Every closed deal post-launch is a case-study candidate. The admin surface supports rapid publishing:

1. Sales captures permission to publish during close (separate clause in agreement)
2. Once equipment is installed and operating, schedule photography + short interview
3. Admin uploads photos + drafts the case study
4. Publish, link from relevant product/industry pages, push to sitemap
5. Add to `/talk-to-a-customer/` reference list (with client's explicit consent)

Target: 3 named Kenya references within 12 months of launch.

### Reference-call workflow (`/talk-to-a-customer/`)

When a prospect submits the form:
1. Form fires to `internal@northstarimpex.co.ke` + Slack alert
2. Sales reviews the prospect's industry/scale within 4 working hours
3. Sales selects the most relevant existing reference (initially: always Crywan)
4. Sales contacts Crywan to confirm willingness (Crywan must have agreed to this in advance)
5. Sales facilitates introduction by email or scheduled call
6. Follow up post-call to capture prospect's reaction → sales signal

The honest disclosure on the page ("currently primarily Crywan; growing the network") sets expectations correctly. A prospect who values references will not be put off by transparency — they'll be reassured.

---

## Section 10 — Pre-Launch Research Checklist

Before content writing begins in earnest, run these via firecrawl + standard SEO tooling:

### Research stage 1 — Competitor content audit

Full-site scrape (firecrawl-crawl) of each direct competitor. Output: per-competitor profile noting page count, content depth, gaps, weak pages, ranking pages, named clients, technology vocabulary, lead-capture mechanisms.

| Competitor | URL | Why audit |
|---|---|---|
| Desbro Engineering | desbroeng.com | SS tank leader in dairy — named client model to study |
| Techwin Limited | techwin.co.ke | Brewery silo + SS tank — direct overlap |
| Pipeco Africa | pipecoafrica.com | Zinc-alum leader |
| SBS Tanks East Africa | sbstanks.co.ke | Zinc-alum competitor |
| Maji Hill | majihill.co.ke | ETP — NEMA-compliance content benchmark |
| Afriwell | (Facebook) | ETP — 24-year track record positioning |
| Elikham Systems | elikhamsystems.co.ke | SBR wastewater — technical content depth |
| Kubtech Engineering | kubtech.co.ke | Endress+Hauser local rep — instruments competitor |
| Kentainers | kentainers.co.ke | Grain silo — polymer focus, niche overlap |

### Research stage 2 — Regulatory / canonical source scrape

Pull the canonical legal/regulatory documents that ETP and food-safety pages must reference accurately:

- **NEMA** (nema.go.ke) — discharge standards, EMCA CAP 387 text, license categories
- **KEBS** — food-grade material standards (KS ISO 4531-1, KS 05-100, etc.)
- **KEPSA / KAM** — industry directory and association memberships (potential backlinks)
- **Ministry of Industrialization** — manufacturing license documentation

### Research stage 3 — SERP intelligence for each Tier 1 query

Per Tier 1 keyword, capture:
- Top 10 SERP results (URL, title, meta description, position)
- People Also Ask questions
- Related searches
- Featured snippets (if any)
- Local pack composition (for geo queries)

This feeds the FAQ blocks on each Tier 1 page and the H2/H3 structure that matches search intent.

### Research stage 4 — Backlink target list

Kenya industry directories, trade publications, and association sites for outreach:

- KAM (Kenya Association of Manufacturers)
- KEPSA (Kenya Private Sector Alliance)
- Kenya National Chamber of Commerce
- East African Business Council
- AFFCO / food-processing trade associations
- Brewers Association of Kenya
- Water sector publications (Maji magazine, etc.)
- Government tender portals (PPRA)

### Research stage 5 — Image generation prompt library

Compile master prompt list for every image slot defined across Tier 1 pages. Output: a single `image-prompts.md` doc the user generates from, ordered by page. (Implementation surfaces these on-demand per page as well — this is the consolidated source.)

### Output of research stage

A directory of:
```
docs/content-briefs/
├── homepage.md
├── products-tanks-stainless-steel.md
├── products-tanks-zinc-alum.md
├── products-silos-grain-storage.md
├── industries-food-and-beverage.md
├── industries-etp-water-treatment.md
├── locations-nairobi.md
├── case-study-crywan.md
├── compare-zinc-alum-vs-carbon-steel.md
└── ... (one per Tier 1 page)

docs/competitors/
├── desbro.md
├── techwin.md
├── pipeco.md
├── maji-hill.md
└── ...

docs/regulatory/
├── nema-discharge-standards.md
├── emca-cap-387-summary.md
└── kebs-food-grade-standards.md

docs/image-prompts.md
```

Each content brief contains: primary query, secondary queries, PAA questions, competitor headlines for the same query, recommended H1/H2/H3 outline, recommended internal links, image slots, JSON-LD type, and a target word count.

This is the handoff to copywriting — a copywriter (or future Claude) can take any content brief and produce a finished page without re-deriving the SEO strategy.

---

## Appendix A — Decisions Locked

| Decision | Choice | Notes |
|---|---|---|
| Brand relationship to Pumea | Independent, no public link | Different positioning, different visual identity, Kenya-focused |
| Company name | North Star Impex Kenya LTD | Primary domain `northstarimpex.co.ke` |
| IoT scope at launch | Marketing + lightweight product page, no pricing shown | Optional capability, not pushed |
| Geographic SEO scope | Kenya deep + East Africa country-level | Kenya cities individually, neighbors at country page only |
| Codebase | New standalone repo | Not a fork of Pumea, not in the same monorepo |
| Instrument catalog presentation | Category pages only (6 pages, not 154 SKU pages) | Frames as solutions provider, not catalog reseller |
| Reference client strategy | Design around Crywan-only constraint | Anchor + anonymize + graduate plan |
| Languages | English only at launch | Kenya business language |
| Image generation | User-driven; implementation provides prompts | Intentional placeholders, never fabricated URLs |
| Design system | Figma source of truth (user) | Spec defines engineering-side rules only |
| Programmatic SEO | `/best/`, `/compare/`, `/cost/` — hand-edited, not combinatorial | 20–30 pages per surface, refresh quarterly |
| Trust-gate CTA | `/talk-to-a-customer/` as a first-class URL | Honest disclosure about reference network |
| LLM discoverability | `/llms.txt` + `/llms-full.txt` | Generated from content map |
| Admin surface | Auth-gated `/admin/` with uploads (case studies, blog, spec sheets, media, IoT screenshots) | NextAuth/Lucia, single-admin role at launch |
| No `/solutions/` or `/systems/` taxonomies | Confirmed | Folded into Products × Industries |
| No e-commerce | Confirmed | B2B sales site, everything routes to quote |
| No customer portal at launch | Confirmed | Deferred sub-project |

---

## Appendix B — How This Document Transfers to the Next Context

When you (a fresh Claude session) open the new `northstar-website` repo to start building:

1. **Read [NEXT-CONTEXT-START-HERE-northstar-kenya.md](./NEXT-CONTEXT-START-HERE-northstar-kenya.md) first** — it's the 5-minute bootstrap with exact next steps.
2. **Read this entire document** — it is the design authority. Every architectural decision is here. If something is ambiguous, prefer the explicit guidance in this doc over inference from existing code.
3. **Read [the Kenya SERP research snapshot](../research/2026-05-25-kenya-serp-snapshot.md)** — it has the raw competitor data and ranking landscape from 2026-05-25. Re-run if more than 30 days have elapsed.
4. **Read the source ICP** at `C:/Users/Shreyas Sunil/Downloads/ICP_Profile_Industrial_Tanks_East_Africa.md` if available — it is the canonical buyer-psychology source.
5. **Read the Supmea catalog** at `C:/Users/Shreyas Sunil/Downloads/supmea-list.md` for the instrument inventory backing the "any instrument" IoT claim.
6. **Do NOT** assume the existing `pumea/` codebase patterns transfer 1:1. Pumea is the structural reference for Next.js + sitemap + content-map patterns. It is NOT the brand or palette or copy reference — North Star is independent.
7. **Do NOT** mention Pumea, Supmea (the partner relationship is private), or any other partner brand in user-facing copy.
8. **Use the brainstorming → writing-plans → implementation flow.** This document is the brainstorm output. The next step is `writing-plans` to break Tier 1 into implementable plans.

---

*End of foundation document. Status: design-locked. Next step: write implementation plan via `superpowers:writing-plans` skill.*
