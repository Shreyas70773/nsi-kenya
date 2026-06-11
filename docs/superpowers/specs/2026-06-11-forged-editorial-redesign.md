# Forged Editorial — experience redesign (2026-06-11)

Decision record for the ground-up visual/experience redesign executed on
branch `redesign/experience`. The 2026-05-25 foundation spec remains the
content/SEO/IA authority; this document records the new presentation system
layered over it.

## User decisions (locked in brainstorming, 2026-06-11)

| Topic | Decision |
|---|---|
| Identity | Evolve dramatically: keep logo + brand red, new art direction |
| Scope | Flagship pages (/, /products/iot/, /about/, /products/) full experience; all pages inherit the system |
| Performance | Performance-gated: full GSAP+WebGL only on capable devices; graceful fallbacks; Lighthouse budgets stay |
| 3D content | CAD tank assembly (home), IoT telemetry scene (/products/iot/), parallax-enhanced photography (site-wide) |
| Gradients | Flat UI chrome (no CSS gradients); real lighting allowed inside WebGL/photography; existing photo washes stay |
| Palette mood | Cream-led with dark "iron" statement sections — premium, easy on the eyes |
| Experience furniture | Cinematic intro, custom cursor + magnetic UI, route-wipe transitions, living micro-details |
| Copy | Light polish only; H1s/URLs/schema untouched |
| Assets | Higgsfield MCP available for asset generation when needed |

## The system

**Concept: "Forged Editorial."** The site reads like a precision fabrication
document brought to life: mono spec labels, register marks, numbered section
indices, hairline rules, film grain — punctuated by iron statement sections
where the craft itself moves (3D assembly, telemetry, big type).

### Type
- Display: **Archivo variable** (`--font-display`, wdth axis). Utilities:
  `.font-display` (tight tracking), `.font-display-wide` (wdth 125,
  footer wordmark/statements), `.font-display-condensed` (wdth 75, towering
  numerals). Display headlines use `font-semibold`+.
- Body: Geist (unchanged). Labels: Geist Mono via `.font-mono-label`.

### Color
- Existing cream/iron/red tokens unchanged. Iron statement sections reuse the
  `[data-theme="dark"]` subtree remap (no parallel palette) via
  `<Section theme="iron">` — all semantic utilities recolor automatically.
- `--ns-hairline` token for document-grid rules; `.grain` SVG-noise overlay
  (not a gradient) on iron sections.

### Experience layer (`src/components/experience/`)
- `ExperienceProvider` + `useExperience()` — capability tiers:
  `static` (reduced motion) / `lite` (save-data, no WebGL, <4GB) / `full`.
- `CustomCursor` — dot + trailing ring; `data-cursor="view"` +
  `data-cursor-label` opt-in; tier full + fine pointer only.
- `PageTransition` — capture-phase link interception, iron panel + red edge
  wipe between routes; failsafe retract; back/forward skips wipe.
- `IntroSequence` — once per session: star self-draw, counter, field lift.
  `useIntroGate()` defers hero choreography.

### Motion vocabulary (`src/components/motion/`)
- `TextReveal` — SplitText masked-line rise (scroll or mount mode).
- `Reveal` — cascade with `fade-up` / `mask` / `scale-in` effects.
- `CountUp`, `Magnetic`, `Parallax(/Image)`, `Marquee` (velocity-reactive).
- `SmoothScroll` now drives Lenis via the GSAP ticker (pin-accurate).

### WebGL (`src/components/scenes/`)
- `SceneFrame` — dynamic import + IntersectionObserver + tier gate; real
  photography fallback always renders for SSR/no-JS/lite.
- `TankScene` — flat-shaded + edge-drawn tank, assembles course-by-course,
  scroll-scrubbed (homepage `FabricationSection`, pinned ~260vh on md+).
- `TelemetryScene` — particle stream from wireframe tank to data plane
  (IoT page), time-driven.
- Deps: `three`, `@react-three/fiber` (no drei). Never in the shared bundle.

### Signature sections
- Homepage: framed parallax hero → velocity marquee → bento → pinned
  fabrication sequence (iron) → CountUp stats → horizontal industries
  gallery (pinned md+, snap-scroll mobile) → work cards → iron CtaBand.
- Footer: iron, conversion marquee strip, cropped outlined NORTH STAR
  wordmark.
- Header: retreats on scroll-down, returns on scroll-up; red register dot on
  the active route.

### Accessibility / performance posture
- All motion honors `prefers-reduced-motion` (tier `static`).
- Content is server-rendered and final-state-visible without JS; GSAP only
  enhances. No layout-shifting animation (transform/opacity only).
- WebGL: lazy, code-split, DPR clamped ≤1.75, mounted only near viewport on
  `full` tier.

## Out of scope (this pass)
- Shader-displacement photography (parallax covers the photographic depth
  brief; revisit if a flagship needs it).
- Sound design. Admin UI restyle. New imagery.
