# Image Prompts — One Slot, One Image, No Reuse

> **The rule:** every image on this site appears in exactly one place. If a
> slot needs visual content, it gets its own prompt and its own file. No
> photo is reused across pages.

This document lists every image slot on the site, organized by page. For each
slot:

- **ID** — short identifier we use in commit messages and code comments
- **Slot path** — where it'll be saved in the repo (`public/images/...`)
- **Aspect ratio** — what dimensions to target when you generate it
- **Prompt** — the art-directed brief; copy/paste into your image generator

When you've generated a batch, drop the files at the paths shown, then tell
me which IDs you've completed. I'll do a single sweep to rewire every slot in
one commit.

**Style register (applies to every prompt):** editorial photojournalism, not
stock, not AI render. Phase One medium-format quality. Documentary, not
promotional. Warm-cream highlights, deep iron-black shadows, accent of brand
red where natural (red display panels, red safety equipment, red logo tags).
No watermarks, no captions, no people facing the camera unless the slot
explicitly calls for it. Subject must look like it's actually in Kenya or
East Africa.

---

## Part 1 — Already in use, no change needed (11 images)

These eleven images already exist and stay where they are. Listed here so the
inventory is complete.

| ID | Slot path | Used on |
|---|---|---|
| EXISTING-01 | `public/images/home/hero-tank-farm.png` | Homepage hero |
| EXISTING-02 | `public/images/home/tanks-weld-bead.png` | Homepage bento "Tanks" card |
| EXISTING-03 | `public/images/home/silos-corrugated.png` | Homepage bento "Silos" card |
| EXISTING-04 | `public/images/home/instruments-flow-meter.png` | Homepage bento "Instruments" card |
| EXISTING-05 | `public/images/home/structural-gantry.png` | Homepage bento "Structural Works" card |
| EXISTING-06 | `public/images/home/iot-kisumu-plant.png` | Homepage bento "Remote Monitoring" card |
| EXISTING-07 | `public/images/home/crywan-reference-dusk.png` | Homepage Crywan reference card |
| EXISTING-08 | `public/images/home/sector-fnb.png` | Homepage sector card "F&B" |
| EXISTING-09 | `public/images/home/sector-etp.png` | Homepage sector card "ETP" |
| EXISTING-10 | `public/images/home/sector-alcohol.png` | Homepage sector card "Alcohol" |
| EXISTING-11 | `public/images/home/sector-chemical.png` | Homepage sector card "Chemical" |

Every other slot on the site currently reuses one of these. The rest of this
document is the prompts for the unique replacements.

---

## Part 2 — Phase 1 page heroes (each unique)

### Products section

#### PROD-OV-01 — `/products/` hero
- **Path:** `public/images/products/products-overview-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A panoramic warehouse-yard view of finished industrial equipment ready for delivery: two completed stainless tanks on shipping cradles foreground-left, a galvanised silo standing upright background-right, a stack of structural steel beams middle-ground, and a flatbed truck reversing in. Late afternoon warm sun across the yard, Kenyan sky overhead, no people. Composition: ultra-wide, equipment occupying lower two-thirds, with a clean band of sky for any text overlay. Color grade: warm cream highlights, iron-black shadows. Documentary photojournalism, Phase One medium-format quality.

#### TANKS-OV-01 — `/products/tanks/` hero
- **Path:** `public/images/products/tanks-overview-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> Three tanks side-by-side in a workshop yard, each in a different metallurgy: a polished stainless tank on the left catching warm afternoon light, an epoxy-coated dark-green tank in the centre, and a bolted zinc-alum tank with vertical panel seams on the right. They're at the same scale, ready for dispatch. Composition: ultra-wide, all three tanks visible, with a calm horizon line. Color grade: warm late-day, low contrast, materially specific. Editorial.

#### SST-01 — `/products/tanks/stainless-steel/` hero
- **Path:** `public/images/products/tanks-stainless-steel-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A row of polished 304 stainless steel processing tanks inside a Kenyan F&B plant: jacketed vessels with sanitary tri-clamp fittings clearly visible, sight glasses, CIP spray balls, sloped sanitary floor with central drain. Overhead fluorescent + warm task light. No operator in frame; the equipment is the subject. Composition: ultra-wide, tanks running left-to-right, vanishing-point perspective. Editorial, magazine quality.

#### EPL-01 — `/products/tanks/epoxy-lined/` hero
- **Path:** `public/images/products/tanks-epoxy-lined-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> Interior view of a partially-installed epoxy-lined steel tank inside a Kenyan ETP plant: the visible interior shows the smooth dark-green epoxy coating reflecting overhead light, with a bolted manway in the foreground, dosing-line piping entering from above. Workshop or plant ambient lighting. Composition: ultra-wide, looking diagonally into the tank, leaving the upper-right band quieter for a text overlay. Editorial, gritty industrial.

#### ZA-01 — `/products/tanks/zinc-alum/` hero
- **Path:** `public/images/products/tanks-zinc-alum-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A large bolted zinc-aluminium water tank standing on a concrete plinth outside a Kenyan industrial site, scale and vertical panel seams clearly visible, aluminium dome roof catching the morning sun. The tank should dominate the frame with one or two smaller adjacent tanks in the background. No people. Composition: ultra-wide, low angle looking up the side of the main tank, sky above for headline overlay. Editorial.

#### SILOS-OV-01 — `/products/silos/` hero
- **Path:** `public/images/products/silos-overview-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A six-silo array at a Kenyan feed mill: galvanised cylindrical silos in a single row, an inter-silo catwalk overhead, intake conveyor entering from the left, dispatch chute on the right. Midday warm light, deep blue Kenyan sky. Composition: ultra-wide, silos running left-to-right with catwalk geometry. Editorial.

#### GS-01 — `/products/silos/grain-storage/` hero
- **Path:** `public/images/products/silos-grain-storage-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> Close-distance view of two galvanised grain silos at a Kenyan brewery: corrugated wall pattern, ladder cage and catwalk, conical roof with aeration fan visible at the top, intake conveyor on the left. Warm afternoon light, partial shadows. Composition: ultra-wide, silos filling the right two-thirds, sky and conveyor visible on the left. Editorial.

#### SW-01 — `/products/structural-works/` hero
- **Path:** `public/images/products/structural-works-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A finished structural-steel platform around a process vessel, mid-installation: yellow-painted safety handrails, galvanised grating, ladder access cage, with a fabricator in PPE walking the deck checking bolts. Industrial bay overhead lighting. Composition: ultra-wide, platform geometry leading the eye through the frame. Documentary photojournalism.

#### INST-OV-01 — `/products/instruments/` hero
- **Path:** `public/images/products/instruments-overview-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A close shot of an instrument panel inside a Kenyan plant control room: a row of process indicators and a paperless recorder with live trend lines visible, plus a pressure transmitter and a flow totaliser mounted on the adjacent pipe rack visible through the doorway. Cool tungsten ambient with one warm rim light. Composition: ultra-wide, instruments in sharp focus left-of-centre, control-room context extending right. Editorial.

#### IOT-01 — `/products/iot/` hero
- **Path:** `public/images/products/iot-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> An NB-IoT gateway box mounted on a pole at a remote Kenyan tank site: rugged enclosure with antenna, two CAT5 cables descending to a level transmitter on the tank below, with the warm-coloured Kenyan landscape (savanna scrub, distant hills) in the background. Late afternoon light. Composition: ultra-wide, gateway centre-left, landscape extending right. Editorial.

### Industries section

#### IND-OV-01 — `/industries/` hero
- **Path:** `public/images/industries/industries-overview-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A high vantage point looking down across a mixed industrial estate in Nairobi at dusk: visible elements include a brewery silo cluster, a food processing plant roof, an ETP clarifier with surface ripple, all stitched by access roads. Warm sodium street-lights coming on. Composition: ultra-wide, sweeping panorama, suggesting "where we work" without naming any single industry. Editorial aerial-style.

#### FB-01 — `/industries/food-and-beverage/` hero
- **Path:** `public/images/industries/food-and-beverage-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> Interior of a Kenyan beverage filling line: stainless filling heads moving along a conveyor, glass bottles in motion mid-frame, a quality-control operator in white hygiene whites checking a sample bottle off to the side. Bright overhead lighting, motion blur on the bottles in the conveyor. Composition: ultra-wide, line geometry leading toward a vanishing point right-of-centre. Editorial photojournalism.

#### ETP-01 — `/industries/etp-water-treatment/` hero
- **Path:** `public/images/industries/etp-water-treatment-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A wide angle of an outdoor ETP at a Kenyan factory: a circular clarifier in the foreground with surface ripple and centre bridge, an aeration basin behind it with surface turbulence visible, a sequence of dosing tanks lining the back. Walkway grating between tanks. Early evening warm light. Composition: ultra-wide, water dominating the lower half, plant infrastructure top. No "E.T.P" signage visible (the sector card has that). Editorial.

### Case studies

#### CS-OV-01 — `/case-studies/` hero
- **Path:** `public/images/cases/case-studies-overview-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> An exterior wide shot of a Kenyan industrial plant at golden hour: low warm sun raking across stainless tanks, structural-steel piperack catching highlights, a worker in PPE walking past in the mid-distance with the camera following them from behind. Composition: ultra-wide, plant infrastructure occupying lower two-thirds, sky above. The "reference work" emotional register: dignified, operating, real. Editorial.

#### CS-CRY-INLINE-01 — `/case-studies/crywan-industries-kenya/` inline editorial image
- **Path:** `public/images/cases/crywan-install-detail.png`
- **Aspect:** 16:9 landscape
- **Prompt:**
> A different angle on the Crywan install: close-distance view of two stainless processing tanks side-by-side, sanitary fittings and a pressure gauge cluster in sharp focus mid-frame, with the larger plant context softly out of focus behind. Warm working-day light coming from a roller-door on the right. Composition: 16:9, equipment fills the frame, intentional negative space upper-left. Editorial. (Distinct from the existing crywan-reference-dusk hero, which is the wider dusk silhouette shot; this is the closer-in operational shot.)

### About

#### ABOUT-01 — `/about/` hero
- **Path:** `public/images/about/about-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A wide interior shot of the North Star fabrication workshop in Nairobi: rolled stainless cylinders standing upright on the shop floor, overhead crane visible at the top of frame, a welder mid-distance working a vertical seam, sparks visible. Industrial daylight from high windows. Composition: ultra-wide, shop floor extending left-to-right, dramatic chiaroscuro from the welding. Editorial documentary.

#### ABOUT-WORKSHOP-01 — `/about/` inline workshop card
- **Path:** `public/images/about/about-workshop-card.png`
- **Aspect:** 4:3 landscape
- **Prompt:**
> A different angle on the workshop: a finishing bay with a polished stainless tank receiving a final inspection, an inspector in PPE running gloved hands along a weld seam under a directional inspection light. Warm task light, cool ambient. Composition: 4:3, tank wall fills the right two-thirds, inspector and light source on the left. Editorial.

#### LM-01 — `/about/local-manufacturing/` hero
- **Path:** `public/images/about/local-manufacturing-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> The workshop entrance from outside: roll-up doors open showing the production floor, a flatbed truck reversed up to the loading bay with a finished tank being loaded by overhead crane, Kenyan morning sun on the building. Composition: ultra-wide, building façade taking the upper third, loading activity occupying the lower two-thirds. Documentary.

#### LM-CUTTING-01 — Workshop process: cutting
- **Path:** `public/images/about/workshop-cutting.png`
- **Aspect:** 4:3 landscape
- **Prompt:**
> Industrial CNC plasma cutting table mid-cut on stainless steel plate, sparks and slag flying outward, an operator in welding hood standing back observing. Dark workshop background, the cut sparks the brightest light source. Composition: 4:3, table fills the frame at a slight angle, operator silhouetted left. Dramatic, gritty.

#### LM-ROLLING-01 — Workshop process: plate rolling
- **Path:** `public/images/about/workshop-rolling.png`
- **Aspect:** 4:3 landscape
- **Prompt:**
> A heavy three-roll plate rolling machine in action: a flat steel plate being progressively rolled into a curved shell, operator at the control panel in safety gear, the machine's massive rollers visible. Workshop ambient lighting with directional task light. Composition: 4:3, machine fills the frame, operator small in scale. Industrial documentary.

#### LM-WELDING-01 — Workshop process: TIG welding macro
- **Path:** `public/images/about/workshop-tig-welding.png`
- **Aspect:** 4:3 landscape
- **Prompt:**
> Tight macro of a TIG welding torch mid-strike on a polished stainless steel tank seam: blue arc, individual sparks, welder's gloved hand and torch in sharp focus, the rest of the workshop falls into deep shadow. The arc is the only highlight. Composition: 4:3, torch tip centred, weld seam running diagonally. Magazine-quality.

#### LM-FLATBED-01 — Workshop process: finished delivery
- **Path:** `public/images/about/workshop-flatbed.png`
- **Aspect:** 4:3 landscape
- **Prompt:**
> A completed polished stainless steel tank strapped to a flatbed truck in the workshop yard at sunrise, ready for departure. The driver doing final strap checks. Workshop building in soft focus behind, warm pink-orange sky overhead. Composition: 4:3, tank and truck centred, sky above. Clean, professional, documentary.

### Locations

#### LOC-OV-01 — `/locations/` hero
- **Path:** `public/images/locations/locations-overview-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> An aerial-style wide shot of a flatbed truck on a Kenyan highway between Nairobi and Mombasa carrying a wrapped industrial tank: the truck small-to-mid scale in the frame, the road snaking through arid landscape, distant hills, warm late-afternoon light. Composition: ultra-wide, road as a leading line through the frame, sky above. The "nationwide reach" emotional register. Editorial.

#### LOC-NBO-01 — `/locations/nairobi/` hero
- **Path:** `public/images/locations/nairobi-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A wide elevated view of a Nairobi industrial estate (Athi River or similar): rows of factory roofs, a few cylindrical tanks and silos visible scattered across the estate, Mombasa Road or a similar arterial road cutting through the frame, warm afternoon light, distant Athi plains beyond. Composition: ultra-wide, estate occupying the middle band, road in the lower third, sky above. Editorial aerial.

### Conversion pages

#### CONTACT-01 — `/contact/` hero
- **Path:** `public/images/conversion/contact-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A close shot of a desk phone receiver being lifted, hand in soft focus, the rest of an office desk visible: a notebook with technical sketches, a sample of stainless plate, a coffee cup. Warm window light from the left. Composition: ultra-wide, phone centred, intentional negative space right. Editorial, calmer than the plant-floor shots; the "talk to a human" emotional register.

#### RQ-01 — `/request-quote/` hero
- **Path:** `public/images/conversion/request-quote-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A close shot of a technical drawing laid flat on a workbench: a tank GA drawing visible, with engineering scale, mechanical pencil, and a calculator on top. A hand reaching across to annotate. Warm task-light overhead. Composition: ultra-wide, drawing fills the frame, intentional negative space upper-right. Editorial, the "we'll spec your project" register.

#### RQ-EXP-01 — `/request-quote/explore/` hero
- **Path:** `public/images/conversion/request-quote-explore-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A planning-room moment: a tablet or laptop screen showing a high-level plant block diagram, with someone's hand sketching a markup over it with a stylus. Warm office light. Composition: ultra-wide, screen centred, sketching hand on the right, surrounding workspace softly out of focus. Editorial, exploratory register.

#### RQ-EVAL-01 — `/request-quote/evaluate/` hero
- **Path:** `public/images/conversion/request-quote-evaluate-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A close shot of a spec sheet on a clipboard being annotated, with three different tank material samples (stainless, epoxy-coated, zinc-alum coupon) laid alongside for comparison. Workshop directional light. Composition: ultra-wide, samples and sheet centred, intentional negative space sides. Editorial, evaluative register.

#### RQ-PURCH-01 — `/request-quote/purchase/` hero
- **Path:** `public/images/conversion/request-quote-purchase-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A handshake mid-grip between a fabricator in shop overalls and a procurement manager in office clothes, in the workshop yard with a tank in soft focus behind. Warm directional sun. Composition: ultra-wide, hands centred, both figures cropped at chest, tank behind. The "we're moving to PO" register. Editorial.

#### RQ-URG-01 — `/request-quote/urgent-etp/` hero
- **Path:** `public/images/conversion/request-quote-urgent-etp-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A close shot of a NEMA inspection notice or formal compliance letter on a desk, partially in focus, with the dial of a multi-parameter water analyzer beside it showing one parameter near the red zone. Cool office light. Composition: ultra-wide, document on the left, analyzer dial on the right. The "deadline pressure" register. Editorial.

#### RQ-SUC-01 — `/request-quote/success/` hero
- **Path:** `public/images/conversion/request-quote-success-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A wide view of an engineer at a desk picking up an open-laptop inbox notification, with a Nairobi skyline visible through the office window in the background. Calm midday light. Composition: ultra-wide, engineer left-of-centre, skyline right. The "your request is in good hands" register. Editorial.

#### BC-01 — `/book-consultation/` hero
- **Path:** `public/images/conversion/book-consultation-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A small meeting-room scene: two engineers across a table looking at a plant layout printout on the table between them, one pointing to a section with a pen. Window light from the left. Composition: ultra-wide, table dominating the lower half, engineers mid-frame, layout sheet centre. The "working call" register. Editorial.

#### RSA-01 — `/request-site-audit/` hero
- **Path:** `public/images/conversion/request-site-audit-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A wide on-site shot: two visiting engineers in PPE walking a Kenyan plant's exterior with the operator pointing toward an existing tank, one engineer photographing with a phone, the other taking notes on a clipboard. Mid-afternoon light. Composition: ultra-wide, plant infrastructure left, walking group right. Documentary photojournalism.

### Legal pages

For the legal pages we want quieter visuals (the page content is dry,
the hero shouldn't fight for attention). Material-detail close-ups work
well.

#### PRIV-01 — `/privacy/` hero
- **Path:** `public/images/legal/privacy-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A close abstract macro of a stainless steel weld bead pattern in soft directional light: textured surface dominant, minimal contrast, no other context. The image reads as quiet "craftsmanship and care" without demanding attention. Composition: ultra-wide, surface fills the frame at a slight angle. Texture-only, contemplative.

#### TERMS-01 — `/terms/` hero
- **Path:** `public/images/legal/terms-hero.png`
- **Aspect:** 21:9 cinematic landscape
- **Prompt:**
> A close abstract macro of bolted zinc-alum tank panel seams with a single bolt head in sharp focus: textured galvanised surface, low contrast, no context beyond the material itself. Quiet, structural, contemplative. Composition: ultra-wide, panel seam running diagonally. Texture-only.

---

## Part 3 — Inline image slots (Phase 1)

### IoT app screen mockups (`/products/iot/`)

These are UI mockups, not plant photos. Either generate as design mockups
or have a designer draft them. Each one shows a different screen of the
remote-monitoring app and lives on the IoT page.

#### IOT-SM-01 — Single-tank dashboard
- **Path:** `public/images/iot/screen-single-tank.png`
- **Aspect:** 9:16 portrait (phone-frame)
- **Prompt:**
> Phone-frame UI mockup of a tank-monitoring dashboard for a single tank. Top: tank name ("Tank T-4") and location ("Athi River"). Middle: a circular level gauge showing 78%, plus a 24-hour level trend line chart with two horizontal alarm threshold lines. Bottom: "Updated 2 min ago" with a small green health-check indicator. Dark mode interface, monospace numerals, single brand-red accent on the gauge. Phone frame visible. Clean, real-app credibility.

#### IOT-SM-02 — Multi-site overview
- **Path:** `public/images/iot/screen-multi-site.png`
- **Aspect:** 16:9 browser landscape
- **Prompt:**
> Browser-frame UI mockup of a multi-site monitoring dashboard: a Kenya map with five plant-site pins (Nairobi, Mombasa, Kisumu, Nakuru, Eldoret). Pins coloured green / amber / red for status. Right side panel lists the same five sites with status badges and recent-alarm counts. Dark mode, clean lines, single brand-red accent. Browser frame visible.

#### IOT-SM-03 — Alarm log
- **Path:** `public/images/iot/screen-alarm-log.png`
- **Aspect:** 16:9 browser landscape
- **Prompt:**
> Browser-frame UI mockup of a tabular alarm log. Columns: timestamp, site, instrument, severity (icon-coded), acknowledged-by, action-taken. Subtle row striping, dark theme, monospace timestamps. Filter chips at top for severity and site. Brand-red used for high-severity icons. Browser frame visible.

#### IOT-SM-04 — Process trend chart
- **Path:** `public/images/iot/screen-process-trend.png`
- **Aspect:** 16:9 browser landscape
- **Prompt:**
> Browser-frame UI mockup of a time-series chart: three overlaid lines (flow rate in m³/h, temperature in °C, pH). Y-axis on the left, time on the X-axis, zoom controls top-right, hover tooltip frozen on one data point showing all three values for that timestamp. Dark theme, single brand-red accent on the active line. Browser frame visible.

---

## Part 4 — Tier 2 pages (heroes for pages I'm about to build)

Generate these alongside the Phase 1 prompts; I'll wire them when the pages
ship.

### Tier 2 product detail pages

#### T2-FEED-01 — `/products/silos/feed-storage/` hero
- **Path:** `public/images/products/silos-feed-storage-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> Two galvanised feed silos at a Kenyan feed mill or poultry operation: smaller scale than grain silos, hopper-bottom discharge visible, intake spout coming in from the top via flexible auger, with feed bags stacked nearby suggesting throughput. Late afternoon warm light. Composition: ultra-wide, silos centred, working yard around. Editorial.

#### T2-BULK-01 — `/products/silos/industrial-bulk/` hero
- **Path:** `public/images/products/silos-industrial-bulk-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> A large industrial bulk silo for cement or powder handling at a Kenyan plant: tall cylindrical vessel with a conical hopper bottom, pneumatic conveying line entering at the top, bulk-truck loading bay below. Industrial overhead light or daylight. Composition: ultra-wide, silo dominates with vanishing-point exaggeration, loading area in lower right. Editorial.

#### T2-FLOW-01 — `/products/instruments/flow/` hero
- **Path:** `public/images/products/instruments-flow-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> Macro shot of an electromagnetic flow meter on a process pipe, the digital display showing a live flow rate, the pipe disappearing into the plant context softly out of focus. Cool tungsten with warm rim light. Composition: ultra-wide, meter centred, pipe leading into the frame. Editorial.

#### T2-LEVEL-01 — `/products/instruments/level/` hero
- **Path:** `public/images/products/instruments-level-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> A radar level transmitter mounted on the top of a stainless tank, looking up at the device from below, with the tank cylinder dominating the frame and warm directional light. Composition: ultra-wide, device centred at top, tank surface extending down. Editorial.

#### T2-PRESSURE-01 — `/products/instruments/pressure/` hero
- **Path:** `public/images/products/instruments-pressure-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> A pressure transmitter on a stainless process line, gauge visible showing a live reading, isolation valve adjacent. Plant context in soft focus. Composition: ultra-wide, transmitter centred. Editorial.

#### T2-ANALYSIS-01 — `/products/instruments/liquid-analysis/` hero
- **Path:** `public/images/products/instruments-liquid-analysis-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> A multi-parameter water analyzer panel mounted on a frame above a water-treatment basin: visible pH, conductivity, DO, turbidity readouts on the screen, sensor probes descending into the water below. Cool afternoon light. Composition: ultra-wide, panel centred, water basin below. Editorial.

#### T2-TEMP-01 — `/products/instruments/temperature/` hero
- **Path:** `public/images/products/instruments-temperature-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> An RTD temperature sensor mounted in a tank wall thermowell, with the cable disappearing into the plant background. Warm task-light. Composition: ultra-wide, sensor and thermowell centred. Editorial.

#### T2-SYSTEM-01 — `/products/instruments/system-products/` hero
- **Path:** `public/images/products/instruments-system-products-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> A control-cabinet door open showing a paperless recorder running live trends, plus a stack of process indicators and signal isolators mounted on DIN rail above. Cool cabinet-interior light. Composition: ultra-wide, cabinet contents centred. Editorial.

### Tier 2 industry pages

#### T2-ALCOHOL-01 — `/industries/alcohol-distilling/` hero
- **Path:** `public/images/industries/alcohol-distilling-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> A row of large stainless fermentation tanks at a Kenyan brewery or distillery: pressure-rated vessels, cooling jackets, sample valves, the floor wet from a recent wash-down. Warm overhead lighting plus reflections on the wet floor. Composition: ultra-wide, tanks running left to right, vanishing point. Editorial. (Different from the homepage sector-alcohol shot, which has the copper still + FV-03 tag; this is a wider working-floor shot.)

#### T2-CHEM-01 — `/industries/chemical-processing/` hero
- **Path:** `public/images/industries/chemical-processing-hero.png`
- **Aspect:** 21:9
- **Prompt:**
> A wide view of a chemical processing bay with an epoxy-lined reactor in the centre, surrounded by structural steel platforms, colour-coded process piping (yellow, red, green) entering from multiple sides. PPE-equipped operator small in the background. Cool industrial lighting. Composition: ultra-wide, reactor centred, piping geometry surrounding. Editorial. (Different from the sector-chemical shot, which is the closer R-2501 close-up.)

> **No other location pages.** Per user instruction: Nairobi is the only
> location page. No Mombasa, Kisumu, Nakuru, Eldoret, Thika. No Uganda,
> Tanzania, Ethiopia. The /locations/ overview page exists, but it points
> at Nairobi only.

---

## Wiring instructions for me

When you've generated a batch:

1. Drop the files at the exact paths shown above. Folder structure under
   `public/images/` will create itself as files land.
2. Tell me the **IDs** you've shipped (e.g. "I've done PROD-OV-01, TANKS-OV-01,
   SST-01 through ZA-01, and the four IoT mockups").
3. I'll do a single sweep that rewires every slot in one commit and removes
   any leftover `imageSrc="/images/home/..."` reuse.

No need to ship them all at once. Heroes for the most-visited pages
(homepage already done, products/tanks/stainless-steel, industries/etp,
crywan case study) are the highest-value first batch. Legal pages can wait
until last.

---

## Summary count

- **Already in use (no change):** 11 images
- **Phase 1 hero swaps (this doc, Part 2):** 30 unique hero slots (LOC-KE removed)
- **Phase 1 inline slots (Part 3):** 4 IoT screens + 1 Crywan inline + 5 about/workshop inline = 10 slots
- **Tier 2 page heroes (Part 4):** 10 unique hero slots (8 location/country slots removed per user)

**Total unique images for full site:** ~61 images.
