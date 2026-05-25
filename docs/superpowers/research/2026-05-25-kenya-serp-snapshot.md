---
project: North Star Impex Kenya — SERP Research Snapshot
date: 2026-05-25
method: Firecrawl search API, country=KE, top 10 results per query
status: snapshot — re-run if >30 days old
related: ../specs/2026-05-25-northstar-kenya-design.md
---

# Kenya SERP Snapshot — 2026-05-25

This is the raw competitive intelligence behind the keyword strategy in Section 5 of the foundation spec. Captured via Firecrawl with `--country ke --limit 10` per query.

## Re-run instructions

```bash
export FIRECRAWL_API_KEY=fc-...
firecrawl search "<query>" --country ke --limit 10 -o .firecrawl/search-<topic>-ke.json --json
```

Re-run quarterly minimum. Re-run before any new content strategy planning.

---

## Query 1 — "stainless steel tanks Kenya supplier"

Top 10 results (positions 1–10):

| # | URL | Title / Operator | Domain signal |
|---|---|---|---|
| 1 | trivontrading.co.ke | Trivon Trading — SS storage tank, water vending scale | `.co.ke` |
| 2 | desbroeng.com | **Desbro Engineering** — leader in customised SS tanks, vessels, silos for dairy in Kenya/EA | `.com` |
| 3 | pipecoafrica.com | Pipeco Africa — bolted zinc-alum tanks (off-topic but ranking for SS) | `.com` |
| 4 | bonafinetrading.co.ke | Bonafine Trading — SS storage tanks, "best prices in Kenya" copy | `.co.ke` |
| 5 | facebook.com/TechwinLimited | Techwin — customised SS processing tanks, phone-led | Facebook |
| 6 | machinesequipments.com | Machines Equipments — SS tanks aggregator | `.com` |
| 7 | volza.com | Volza — supplier directory aggregator (17 KE manufacturers listed) | `.com` |
| 8 | olmectechnical.co.ke | Olmec Technical — SS storage tanks, water vending | `.co.ke` |
| 9 | evolvingtechkenya.com | Evolving Technologies — leading SS fabricators in Nairobi for food processing | `.com` |
| 10 | neematechnologies.co.ke | Neema Technologies — bulk milk coolers, 304 SS | `.co.ke` |

**Insights:**
- Top organic spot (Desbro) leads with dairy-named industry positioning + "across Kenya and EA" scope claim
- Three of top 10 use `.co.ke` — confirms domain choice
- Most others are commodity water-vending scale (Trivon, Bonafine, Olmec) — easy to outclass with industrial content depth
- Pipeco ranks for SS despite being zinc-alum specialist — Google is treating "tank Kenya" broadly
- Aggregators (Volza, Machines Equipments) eat 2 slots — opportunity to outrank with authoritative product content
- Facebook page in top 10 = local SEO is undeserved in this space

**Strategy:** Beat Desbro by being the next industrial-scale SS supplier with named Kenya client (Crywan) and broader product range. Target `/products/tanks/stainless-steel/`.

---

## Query 2 — "silo manufacturer Nairobi grain storage"

| # | URL | Operator | Notes |
|---|---|---|---|
| 1 | siloafrica.com | Silo Africa — smallholder farmer focus, Utawala Nairobi | Smallholder, not industrial |
| 2 | facebook.com/kentainersLtd | Kentainers — small polymer silos, 35kg capacity | Small-scale |
| 3 | kentainers.co.ke | Kentainers — polymer grain silo | Small-scale |
| 4 | instagram.com | Kentainers IG — domestic silo UV-resistant | Social |
| 5 | techwin.co.ke | **Techwin** — brewery grain silos 10-100MT, food-grade, aeration + inventory tracking + pest control | **Direct industrial competitor** |
| 6 | openjicareport.jica.go.jp | JICA report — feasibility study, KE silo project | Reference / historical |
| 7 | cimbria.com | Cimbria — international turnkey silo plants | International |
| 8 | ramco-group.com | Ramco — Kentainers Gransilo product launch | Industry news |
| 9 | researchgate.net | Metal silo grain storage technology + Kenya food security | Academic |
| 10 | brazafric.com | Brazafric — Kikapu silos 6-ton galvanized | Mid-scale |

**Insights:**
- Techwin is the only direct industrial competitor for brewery/F&B silos
- Most ranking results are smallholder or polymer (Silo Africa, Kentainers) — different category, not direct overlap
- International players (Cimbria) rank but are import-dependent — Kenya buyers will discount them per ICP
- JICA report indicates government-funded silo projects — donor-driven buying triggers exist
- **Wide gap for industrial-scale F&B silos with named clients**

**Strategy:** Target `/products/silos/grain-storage/` and `/products/silos/industrial-bulk/`. Lead with brewery and F&B scale (10-500MT). Compete directly with Techwin via better content depth + Crywan reference if applicable.

---

## Query 3 — "ETP wastewater treatment tank Kenya NEMA"

| # | URL | Operator | NEMA mention |
|---|---|---|---|
| 1 | majihill.co.ke | **Maji Hill** — NEMA-approved ETPs for industrial/commercial, food processing | Yes — leads with NEMA |
| 2 | forum.susana.org | SuSanA forum — KE NEMA environmental discharge standards | Yes — discussion |
| 3 | instagram.com/reel/.../DOEiJ9sjvsh | Maji Hill IG — NEMA-compliant ETP services | Yes |
| 4 | blueflamebiodigesters.com | Blueflame — NEMA guidelines, effluent discharge thresholds | Yes |
| 5 | researchgate.net | Wastewater treatment system efficiencies in Kenya, NEMA standards | Yes |
| 6 | facebook.com/NTVKenya/.../afriwell... | **Afriwell** — 24 yrs experience, ETP + STP + DAF | Yes |
| 7 | nema.go.ke | **NEMA** government site — primary regulator | (regulator itself) |
| 8 | disclosuresservice.ifc.org | IFC EIA project report — ETP recycling case study | Yes |
| 9 | ensun.io | ensun directory — top 20 ETP plant manufacturers in Kenya | Aggregator |
| 10 | elikhamsystems.co.ke | **Elikham Systems** — SBR biological wastewater, undercuts NEMA limits | Yes — technical depth |

**Insights:**
- **NEMA is mentioned in 8 of 10 top results** — confirms ICP signal: compliance-driven buying
- Three direct competitors: Maji Hill (food-processing ETP), Afriwell (24-yr legacy), Elikham (SBR specialty)
- All three are **full-plant designers** — they design the ETP system, not just supply tanks/instruments
- NEMA's own site ranks #7 — high authority signal, opportunity to backlink with NEMA-accurate content
- IFC EIA report ranking = donor-funded projects appear here = buying-trigger pattern from ICP confirmed
- **No competitor publishes a NEMA discharge parameters table on a supplier site**

**Strategy:** `/industries/etp-water-treatment/` MUST include the NEMA parameters table (BOD, COD, TSS, pH, TN, TP, NH₃-N with discharge limits). EMCA CAP 387 referenced by name. Position North Star as **the equipment supplier inside the ETP scope** — not competing with Maji Hill on full-plant design, but supplying the tanks + instruments + IoT they'd specify.

---

## Query 4 — "zinc aluminum tank water storage Kenya"

| # | URL | Operator | Notes |
|---|---|---|---|
| 1 | pipecoafrica.com/bolted-zinc-aluminum-steel-tanks-kenya | **Pipeco Africa** — bolted zinc-alum, corrosion-resistant | Direct competitor |
| 2 | facebook.com/MawongpaBhutan | Mawongpa Bhutan — Zincalume promotion | Off-market |
| 3 | uplexinfra.com | Uplex Infra — Zinc Aluminium Water Tank Manufacturer, 200,000L | Indian manufacturer |
| 4 | beyondforest.org | Beyond Forest — steel water tank prices 2026 Kenya guide | Editorial / pricing |
| 5 | scribd.com | Kentank Water Tanks — 30-year polymer specs | Polymer (different) |
| 6 | sbstanks.co.ke | **SBS Tanks East Africa** — Zincalume tanks with custom liners | Direct competitor |
| 7 | youtube.com | Zinc aluminium tank erection checkpoints | Tutorial / how-to |
| 8 | indiamart.com | IndiaMART — Zincalume specs (55% Al, 43.5% Zn, 1.5% Si) | International |
| 9 | tsisteels.com | TSI Steels — Kenya zinc-alum manufacturer | Competitor (Indian-affiliated) |
| 10 | facebook.com/groups | Group post — fabrication for tanks any size | Social |

**Insights:**
- Pipeco Africa is the head-on competitor for zinc-alum Kenya
- SBS Tanks East Africa is the secondary competitor (with custom liners as a differentiator)
- TSI Steels is a third Kenya zinc-alum competitor (likely India-linked)
- All three are **zinc-alum specialists only** — they don't bundle SS, epoxy, instruments, or silos
- Beyond Forest's price-guide editorial ranks at #4 — content marketing opportunity for North Star (zinc-alum vs CS TCO content)

**Strategy:** `/products/tanks/zinc-alum/` competes head-on with Pipeco/SBS/TSI. North Star's differentiator: **single supplier across SS + epoxy + zinc-alum + silos + structural + instruments**. Zinc-alum vs carbon-steel TCO content (Section 5 Tier 4) is the long-tail moat — Pipeco/SBS don't publish this.

---

## Query 5 — "flowmeter level transmitter supplier Kenya East Africa"

| # | URL | Operator | Kenya presence |
|---|---|---|---|
| 1 | kubtech.co.ke/about/endress-hauser-kenya | **Kubtech Engineering** — official local rep for Endress+Hauser in Kenya | Strong KE presence |
| 2 | kevitits.com | Kevit Industrial Technologies — Iran/Dubai/Egypt (off-market for KE) | No KE |
| 3 | new.abb.com | ABB — multivariable transmitters, international | Global |
| 4 | brooksinstrument.com | Brooks Instrument — precision flow/pressure | International |
| 5 | hach.com | Hach — flow solutions, McCrometer | International |
| 6 | flowline.com | Flowline — level sensors | International |
| 7 | tek-trol.com | Tek-Trol — measurement instrumentation | International |
| 8 | krohne.com/en-ke | **KROHNE Kenya** — custody transfer metering, oil & gas | Global with KE subdomain |
| 9 | innovatecsystems.in/kenya | Innovatec Systems — temperature transmitters in Kenya | Indian, KE branch |
| 10 | badgermeter.com | Badger Meter — distributor finder | International |

**Insights:**
- **Only TWO real Kenya-native instrument suppliers in top 10:** Kubtech (Endress+Hauser rep) and KROHNE KE (global brand with KE presence)
- 8 of 10 results are international brands — Kenya buyers click through to find a local representative
- Kubtech is the strongest competitor — owning Endress+Hauser (the premium global brand) gives them authority
- KROHNE's subdomain strategy (`/en-ke/`) confirms hreflang/country-locale signal matters
- **Wide opportunity** for Kenya-native instrument supplier with category depth

**Strategy:** `/products/instruments/[category]/` pages compete against Kubtech directly. North Star's advantage: full instrument category depth (flow, level, pressure, liquid analysis, temperature, system products) AND tank-supplier context AND IoT-ready capability — Kubtech only does instruments, no tanks, no IoT.

---

## Query 6 — "IoT tank monitoring remote level sensor Kenya"

| # | URL | Operator | Kenya presence |
|---|---|---|---|
| 1 | farmo.com.au | Farmo — Australian IoT water level monitor | None |
| 2 | iconprocon.com | Iconprocon — Sentinel wireless tank telemetry | International |
| 3 | amazon.com | Amazon — generic IoT level monitor | Consumer |
| 4 | facebook.com/groups | Kenya FB group — tank level controller solutions | Social, no brand |
| 5 | nikeson.com | Nikeson — Sentinel smart WiFi sensor (oil tanks) | International |
| 6 | thingsboard.io | ThingsBoard — IoT platform | Platform (not product) |
| 7 | sense.digitalmatter.com | Digital Matter — water tank monitoring | International |
| 8 | holykell.com | Holykell — LoRaWAN level sensor for farm tanks | International |
| 9 | instagram.com/p/CMRMm6PguJn | **Mobi Water Nanyuki** — smart tank level sensor for utilities | Kenya-native (single mention) |
| 10 | digi.com | Digi International — remote tank monitoring | International |

**Insights:**
- **Only ONE Kenya-native player ranks: Mobi Water** — and it's an Instagram post from a Mt Kenya project, not a major commercial site
- 9 of 10 results are international platforms or hardware vendors
- Facebook group discussion (#4) shows market awareness but no dominant local provider
- **This is a wide-open lane.** No established Kenya brand owns "tank monitoring Kenya."

**Strategy:** `/products/iot/` can rank as the **first Kenya-native industrial tank monitoring offering with named local connectivity (Safaricom NB-IoT)**. Position not as a "feature" but as a **category North Star defines for Kenya**. Tier 4 keyword set in spec Section 5 — `cloud connected tank Kenya`, `remote tank monitoring Nairobi`, `IoT tank level sensor Kenya` — should rank within 6 months of launch with minimal effort.

---

## Cross-cutting findings

### Competitive landscape summary

| Category | Top Kenya competitor | Differentiator vs. them |
|---|---|---|
| SS tanks | Desbro Engineering | Crywan reference + full product range + IoT |
| Zinc-alum | Pipeco Africa | Full product range (Pipeco is zinc-alum-only) |
| Silos (industrial) | Techwin Limited | Crywan reference + IoT + instruments bundled |
| Silos (smallholder) | Kentainers, Silo Africa | Different category — don't compete; defer to them |
| ETP | Maji Hill, Afriwell, Elikham | Equipment-supplier positioning (not full-plant designers) + NEMA table content |
| Instruments | Kubtech (Endress+Hauser) | Local manufacturing claim + tank context + IoT bundling |
| IoT monitoring | (none — open lane) | Be first; name Safaricom NB-IoT |
| Aggregator threats | Volza, Machines Equipments, ensun | Direct authoritative content with named clients |

### Domain & trust signals

- `.co.ke` extension boosts Kenya SERP confidence (3 of 10 top SS tank results)
- Named clients in titles (Desbro/dairy, Techwin/brewery) correlate with top positions
- "NEMA-approved" or "NEMA-compliant" mentions are table-stakes for ETP
- "Made in Kenya" / "locally fabricated" language differentiates from import-pricing aggregators
- Phone-number-led calls-to-action (Techwin's "Call 0743793878" in title) reflect the trust-via-direct-contact pattern from the ICP

### Content-depth gaps to exploit

1. **No competitor publishes the NEMA discharge parameters table.**
2. **No competitor publishes a lifecycle TCO calculator** for zinc-alum vs carbon steel.
3. **No competitor names Safaricom NB-IoT** as a connectivity option.
4. **No competitor has reference-call CTA** (`/talk-to-a-customer/` equivalent).
5. **No competitor has both deep product range AND named clients AND IoT** — that triple is the position.

### Format gaps

- Most ranking pages are thin (<500 words of unique content). Helpful-content depth wins.
- Most have no programmatic SEO. `/best/`, `/compare/`, `/cost/` surfaces will run unopposed in many long-tail queries.
- Mobile UX is generally weak across competitors — clean responsive design is a differentiator.
- Almost no competitor uses JSON-LD structured data. LocalBusiness schema on city pages will be a free local-pack edge.

---

## Raw data location

Original JSON outputs in:

```
.firecrawl/search-ss-tanks-ke.json
.firecrawl/search-silos-ke.json
.firecrawl/search-etp-ke.json
.firecrawl/search-zincalum-ke.json
.firecrawl/search-instruments-ke.json
.firecrawl/search-iot-ke.json
```

When this repo is migrated or the new `northstar-website` repo is created, copy these JSON files into `northstar-website/docs/research/firecrawl-snapshots-2026-05-25/` for archival.

---

*End of snapshot. Next research run: any time before 2026-08-25, or sooner if a major Kenya regulatory event (NEMA standard update, KEBS revision) is announced.*
