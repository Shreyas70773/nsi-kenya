import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Blog post catalogue. Each post is a TS object with a JSX `body`. Posts
 * appear in /blog/ and at /blog/[slug]/. To add a new post, append to the
 * `BLOG_POSTS` array.
 *
 * Images: local PNGs from `/public/images/...` re-used from the
 * corresponding product / industry / workshop page.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;          // ISO date
  readingMinutes: number;
  tags: readonly string[];
  /** Hero image URL (Picsum seed gives a deterministic photo). */
  heroImage: string;
  /** alt text for the hero. */
  heroImageAlt: string;
  /** Article body rendered inside <Prose> by the page. */
  body: ReactNode;
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "flow-meter-selection-kenya-industrial",
    title: "Choosing a flow meter for a Kenyan industrial loop",
    excerpt:
      "Electromagnetic, vortex, ultrasonic, Coriolis, or thermal-mass? The medium, the pipe size, and the accuracy you actually need decide which one belongs on the line.",
    publishedAt: "2026-05-26",
    readingMinutes: 7,
    tags: ["Instruments", "Flow"],
    heroImage: "/images/products/instruments-flow-hero.png",
    heroImageAlt:
      "Electromagnetic flow meter installed on a stainless process line at a Kenyan plant",
    body: (
      <>
        <p>
          A flow meter looks like a one-line item on the BOM. It isn&apos;t.
          The wrong technology on the wrong medium produces readings that
          drift, that lie about totalised volume, or that simply stop
          working after the third cleaning cycle. Here is the conversation
          we have with most buyers, in the order we have it.
        </p>

        <h2>Electromagnetic: the default for conductive liquids</h2>
        <p>
          If the medium is water-like and electrically conductive (above
          roughly 5 µS/cm), electromagnetic is the right answer. No moving
          parts in the flow stream, no pressure drop, accuracy to ±0.2%
          of rate with proper sizing. Use it for raw water, ETP effluent,
          beverage base, dairy, and anything with even mild
          conductivity.
        </p>
        <p>
          The two failure modes to know: empty-pipe readings (solved with
          empty-pipe detection on the transmitter) and ground-loop noise
          (solved with proper grounding rings on plastic pipe). Both are
          install-quality problems, not meter problems.
        </p>

        <h2>Vortex: steam, gas, and the hot liquids electromagnetic won&apos;t handle</h2>
        <p>
          Vortex meters work on the principle of vortex shedding behind a
          bluff body in the flow stream. They handle steam, dry gas, and
          superheated liquids where electromagnetic can&apos;t. Accuracy
          is typically ±1% of rate, which is good enough for utility
          metering but not for custody transfer.
        </p>
        <p>
          The catch: a vortex meter has a minimum flow below which the
          shedding becomes unstable. Sized too generously, the meter
          spends much of its operating range below this threshold and
          reports zero. Size against the minimum flow, not the maximum.
        </p>

        <h2>Ultrasonic: clean liquids, no contact with the medium</h2>
        <p>
          Ultrasonic transit-time meters work for clean liquids in metal
          pipes and are non-invasive: the transducers clamp onto the
          outside of the pipe. Use them for utility water metering on
          large pipe sizes (above DN300, where the cost of an inline
          electromagnetic becomes punishing), and for retrofits where
          cutting into an existing line isn&apos;t practical.
        </p>
        <p>
          Doppler ultrasonics, on the other hand, work for dirty liquids
          but with worse accuracy. They&apos;re a niche tool, not the
          default.
        </p>

        <h2>Coriolis: when you need mass, not volume</h2>
        <p>
          Coriolis meters measure mass flow directly by detecting the
          deflection of a vibrating tube under flow. Accuracy is ±0.1%
          of rate, the highest of any technology in the lineup. Use them
          for custody-transfer applications, edible-oil blending,
          chemical dosing where mass balance is the metric, and any
          process where density also matters.
        </p>
        <p>
          They are also the most expensive technology by a wide margin
          and the most pressure-drop-heavy. Specify Coriolis only when
          mass-flow accuracy is actually the requirement.
        </p>

        <h2>Thermal mass: for low-flow gas</h2>
        <p>
          Thermal mass meters work by measuring the heat carried away
          from a heated element by the flowing gas. Use them for low-
          flow gas metering (compressed air consumption, nitrogen blanket
          flow, biogas) where the volumetric flow is too small for a
          vortex to resolve.
        </p>

        <h2>The questions we wish more buyers asked us</h2>
        <p>
          Medium, conductivity if it&apos;s a liquid, pipe size,
          temperature, pressure, accuracy requirement, and turndown ratio.
          From those seven answers, the right technology falls out
          mechanically. The full instrument range is on the{" "}
          <Link href="/products/instruments/flow/">flow meter page</Link>;
          for a wider context on how flow integrates with the rest of
          your monitoring, see the{" "}
          <Link href="/products/iot/">remote monitoring page</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "structural-fabrication-nairobi-pipe-racks",
    title: "Structural fabrication in Nairobi: pipe racks, tank supports, walkways",
    excerpt:
      "Tanks and silos don't stand alone. The platforms, racks, and supports around them are usually the load-bearing schedule risk. Here is how we approach the rest of the steel.",
    publishedAt: "2026-05-26",
    readingMinutes: 6,
    tags: ["Structural", "Workshop"],
    heroImage: "/images/products/structural-works-hero.png",
    heroImageAlt:
      "Galvanised structural steel pipe rack at a Kenyan industrial plant",
    body: (
      <>
        <p>
          A new tank doesn&apos;t arrive on a flatbed and stand itself up.
          Behind every install there is a foundation, a support frame, a
          walkway to the manway, and a pipe rack threading the new vessel
          into your existing utilities. The rest of the steel is usually
          two to three times the weight of the tank itself. Here is how
          we approach it.
        </p>

        <h2>Pipe racks come first</h2>
        <p>
          A pipe rack is the spine of an industrial plant. Get it right
          and every future addition has somewhere to land; get it wrong
          and every future utility goes overhead on its own bespoke
          support. We design pipe racks per Eurocode 3 with realistic
          future-capacity allowances, typically 30 to 50 percent
          headroom on the original utility count.
        </p>
        <p>
          On heat: insulated lines carry surface temperatures the rest
          of the rack does not. We hold dissimilar utilities apart with
          spacer rings and we hot-dip galvanise the entire rack so the
          coating survives the steam-trap drips that always end up
          falling onto the structural members below.
        </p>

        <h2>Tank supports: skirts, saddles, legs</h2>
        <p>
          For vertical tanks above 5 m³, a welded skirt is the right
          answer; below that, three or four leg supports work fine.
          Horizontal tanks ride on saddles, sized so the contact stress
          stays within the shell&apos;s allowable. Where the tank carries
          jacketed heating, we leave thermal expansion clearance at one
          end of the saddle so the shell can grow without dragging the
          support frame.
        </p>
        <p>
          The trick most fabricators miss: tank supports need a
          dye-penetrant inspection on every gusset weld. The shell weld
          gets inspected because everyone remembers it; the support
          gusset gets inspected because we have a checklist that does
          not.
        </p>

        <h2>Walkways and access</h2>
        <p>
          Every tank above 3 m in height gets a walkway around the top
          for sample ports, manways, and instrumentation maintenance.
          Standard: galvanised grating decking with toe-board and
          handrail per OSHA-style geometry, ladder access with caged
          fall protection above 6 m, and a rest platform every 6 m of
          vertical climb.
        </p>
        <p>
          We design walkways with the operator&apos;s actual workflow in
          mind. The most common mistake is to drop the access ladder on
          the far side of the tank from the instrument panel, which
          means the operator carries his tools around the platform every
          time. Place the ladder where the work is.
        </p>

        <h2>Where structural sits in our scope</h2>
        <p>
          Most of our customers buy structural alongside the tank or
          silo. A single workshop turnaround is faster, the structural
          steel arrives with the right coating already on it, and the
          tank-to-support interface fit is checked in the workshop, not
          on the install site. The{" "}
          <Link href="/products/structural-works/">
            structural fabrication page
          </Link>{" "}
          carries the full scope; see the{" "}
          <Link href="/about/local-manufacturing/">
            local manufacturing page
          </Link>{" "}
          for the workshop process behind it.
        </p>
      </>
    ),
  },
  {
    slug: "specifying-stainless-tank-kenya-fnb",
    title: "How to specify a stainless tank for a Kenyan F&B plant",
    excerpt:
      "Material grade, surface finish, sanitary fittings, and the questions your fabricator wishes you'd ask first.",
    publishedAt: "2026-05-26",
    readingMinutes: 7,
    tags: ["Tanks", "Food & Beverage"],
    heroImage: "/images/products/tanks-stainless-steel-hero.png",
    heroImageAlt:
      "Polished stainless steel processing tank inside a Kenyan F&B plant",
    body: (
      <>
        <p>
          A stainless tank looks like a simple purchase. It is anything
          but. The same outer cylinder, in two different specifications,
          can carry a five-times price gap, a four-times difference in
          service life, and the difference between passing and failing a
          KEBS audit. Here is the conversation we have with most F&B
          buyers, in the order we have it.
        </p>

        <h2>Material grade comes first</h2>
        <p>
          304 is the default for most dairy, beverage, and edible-oil
          duty. It handles chlorides up to roughly 200 ppm without
          pitting, and it is the right answer for somewhere between
          seventy and eighty percent of the F&B tanks we ship.
        </p>
        <p>
          316L is the upgrade when chlorides exceed that threshold. The
          most common triggers are whey concentrates (high chloride),
          acid CIP loops (caustic-then-acid wash chemistry), and any
          process that crosses into pharmaceutical-adjacent duty. The
          low-carbon variant resists weld-zone sensitisation during
          repeated CIP cycles, which is why the L grade matters and not
          just 316 generically.
        </p>

        <h2>Surface finish second</h2>
        <p>
          Surface finish is specified as Ra (roughness average) in
          microns. For food contact, target Ra ≤ 0.8 μm; for
          pharmaceutical-adjacent duty, target Ra ≤ 0.4 μm. A rougher
          finish gives bacteria more places to hide and makes CIP cycles
          less effective; a finer finish costs more and rarely matters
          outside pharma-adjacent processes.
        </p>

        <h2>Fittings, last but not least</h2>
        <p>
          Sanitary tri-clamp throughout. Tri-clamp fittings can be
          cleaned, inspected, and replaced without cutting the line, and
          they leave no crevices for bacteria to colonise. NPT and BSP
          threads are not appropriate for food contact and should not
          appear in your spec.
        </p>
        <p>
          Standard fittings on a food-grade tank: tri-clamp manway,
          sanitary drain, CIP spray ball, sight glass, temperature port,
          and pre-tapped instrument ports for level and pH. We ship all
          tanks pre-tapped for these even when the customer plans to add
          instruments later; the cost is low and the retrofit cost is
          high.
        </p>

        <h2>The conversation we wish more buyers had with us</h2>
        <p>
          Tell us the medium, the volume, the cycle frequency, the CIP
          chemistry, and the lead-time pressure. Almost every other
          decision falls out of those five answers. Want a starting
          point on the stainless side?{" "}
          <Link href="/products/tanks/stainless-steel/">
            The stainless tanks page
          </Link>{" "}
          carries the standard spec sheet; we customise from there.
        </p>
      </>
    ),
  },
  {
    slug: "nema-discharge-parameters-explained",
    title: "Reading the NEMA discharge parameters table, for plants that need to pass",
    excerpt:
      "The 10 parameters that decide whether your effluent enters a public sewer or an environmental discharge route, what each one means, and what equipment hits each target.",
    publishedAt: "2026-05-22",
    readingMinutes: 9,
    tags: ["ETP", "Compliance"],
    heroImage: "/images/industries/etp-water-treatment-hero.png",
    heroImageAlt:
      "Outdoor effluent treatment plant clarifier with surface ripple at a Kenyan factory",
    body: (
      <>
        <p>
          NEMA inspections in Kenya turn on a small set of parameters
          drawn from the Environmental Management and Coordination Act,
          Water Quality Regulations. The same parameter list appears on
          our{" "}
          <Link href="/industries/etp-water-treatment/#nema-parameters">
            ETP page
          </Link>
          ; this article walks through what each parameter actually
          measures and which piece of equipment usually controls it.
        </p>

        <h2>BOD₅ and COD: the organic load</h2>
        <p>
          Biochemical Oxygen Demand (BOD) measures the oxygen biological
          organisms need to break down the organic matter in your
          effluent. Chemical Oxygen Demand (COD) measures the oxygen
          needed for chemical oxidation of all organic matter, biodegradable
          or not. COD is therefore always higher than BOD; the ratio
          between them tells you how biodegradable your effluent is.
        </p>
        <p>
          The NEMA discharge limit for BOD is 30 mg/L (environment) or
          500 mg/L (public sewer); for COD it is 50 mg/L (environment)
          or 1000 mg/L (public sewer). The equipment that hits these
          limits is the biological treatment stage of your ETP: aeration
          basins, activated-sludge reactors, or sequencing batch
          reactors.
        </p>

        <h2>TSS: the suspended solids</h2>
        <p>
          Total Suspended Solids (TSS) measures particulates that do not
          settle quickly. NEMA limits: 30 mg/L (environment), 250 mg/L
          (public sewer). Controlled at the clarifier (gravity
          settling), DAF unit (dissolved-air flotation), or the
          tertiary-stage filter.
        </p>

        <h2>pH: the acidity / alkalinity</h2>
        <p>
          NEMA expects 6.5 to 8.5 for environmental discharge, 6.0 to
          9.0 for sewer discharge. Controlled via dosing of caustic
          (sodium hydroxide) or acid (sulphuric or hydrochloric) at the
          neutralisation stage. The right instrument is a continuous pH
          sensor with PID-controlled dosing pumps.
        </p>

        <h2>Nutrients: TN, TP, and NH₃-N</h2>
        <p>
          Total Nitrogen, Total Phosphorus, and Ammonia Nitrogen are
          nutrient parameters. Excess nutrients in a receiving water
          body drive algal blooms. NEMA limits sit in the low
          single-digits to low-tens of mg/L. Controlled via biological
          nutrient removal (BNR) stages, which is to say, longer
          retention times and specific aerobic / anoxic zoning in the
          aeration train.
        </p>

        <h2>The instrumentation that proves it</h2>
        <p>
          You cannot manage what you do not measure. The single most
          useful instrument on an ETP is the multi-parameter analyzer
          at the discharge point: pH, conductivity, DO, turbidity, and
          temperature in one panel, logged continuously, exportable for
          NEMA reporting. We supply these on every ETP project we touch.
          See the{" "}
          <Link href="/products/instruments/liquid-analysis/">
            liquid analysis instruments page
          </Link>{" "}
          for the supplied range.
        </p>

        <h2>How we approach an ETP inspection</h2>
        <p>
          If you have an inspection scheduled, the right starting point
          is a baseline measurement of all 10 parameters at your current
          discharge point. From there we know which stages of the train
          need attention and which equipment retrofits will move the
          needle on which parameter. The audit takes one day on-site;
          the brief lands inside a week.
        </p>
      </>
    ),
  },
  {
    slug: "zinc-alum-vs-carbon-steel-tco",
    title: "Zinc-alum vs carbon steel: the 30-year math, for Kenyan operators",
    excerpt:
      "Initial cost is rarely the right way to spec a water tank. Here is the lifecycle math that decides why our larger water-storage installs land in zinc-alum, not carbon.",
    publishedAt: "2026-05-19",
    readingMinutes: 6,
    tags: ["Tanks", "Lifecycle"],
    heroImage: "/images/products/tanks-zinc-alum-hero.png",
    heroImageAlt:
      "Side-by-side comparison of zinc-alum and carbon-steel tank construction",
    body: (
      <>
        <p>
          The default answer for bulk industrial water storage in Kenya
          is &quot;carbon steel because it is cheapest.&quot; The
          default answer is wrong above roughly 200 cubic metres of
          capacity, and we publish the math because nobody else does.
        </p>

        <h2>Bare carbon steel in Kenyan humidity</h2>
        <p>
          Untreated carbon steel in Kenyan humidity reaches end of life
          in eight to twelve years. Coatings (paint or epoxy) buy you
          three to five years per coat, so a coated carbon-steel tank
          needs recoating two to three times per decade.
        </p>
        <p>
          Each recoat means draining the tank, isolating the supply
          line, surface-prepping the interior, applying the coating
          system, and curing. That is one to two weeks of plant downtime
          plus the recoat cost. Over a thirty-year horizon, that adds up
          to six to ten recoat cycles, or roughly twelve to twenty weeks
          of accumulated downtime.
        </p>

        <h2>Bolted zinc-alum, same horizon</h2>
        <p>
          Zinc-aluminium steel (55 percent aluminium, 43.5 percent zinc)
          forms a self-healing barrier coating. At any cut or scratch,
          the zinc sacrificially protects the steel underneath. Service
          life in unsheltered Kenyan conditions runs to thirty years and
          beyond, with no recoating required during the design life.
        </p>
        <p>
          At our typical tank sizes above 200 cubic metres, the initial
          cost premium over carbon steel is in the range of fifteen to
          twenty-five percent. At twenty years and again at thirty
          years, the math swings hard in favour of zinc-alum:
        </p>
        <ul>
          <li>
            <strong>Carbon steel:</strong> 2 to 3 full replacement
            cycles in 30 years, 12 to 20 weeks accumulated downtime,
            plus recoat labour every 3 to 5 years.
          </li>
          <li>
            <strong>Zinc-alum:</strong> 1 install, 0 recoats, zero
            replacement downtime over the same horizon.
          </li>
        </ul>

        <h2>The exception worth noting</h2>
        <p>
          Carbon steel still wins under one hundred cubic metres of
          capacity, where the zinc-alum modular-panel economics do not
          land yet. We quote both options openly when a tank sits on the
          boundary; the right answer depends on your replacement
          tolerance and your downtime cost.
        </p>
        <p>
          The longer version of this argument, plus a spec sheet for the
          zinc-alum range, lives on the{" "}
          <Link href="/products/tanks/zinc-alum/">zinc-alum tanks page</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "safaricom-nb-iot-tank-monitoring-kenya",
    title: "Safaricom NB-IoT for industrial tank monitoring in Kenya",
    excerpt:
      "The connectivity choice that actually works for low-bandwidth, multi-year-battery tank monitoring across Kenya, and why we recommend it as the default for single-tank sites.",
    publishedAt: "2026-05-15",
    readingMinutes: 5,
    tags: ["IoT", "Monitoring"],
    heroImage: "/images/products/iot-hero.png",
    heroImageAlt:
      "Remote NB-IoT gateway box mounted on a pole at a Kenyan tank site",
    body: (
      <>
        <p>
          We recommend Safaricom NB-IoT as the default connectivity
          option for single-tank monitoring sites in Kenya. Here is what
          drives that choice.
        </p>

        <h2>What NB-IoT actually is</h2>
        <p>
          Narrowband-IoT (NB-IoT) is a cellular protocol designed for
          low-bandwidth, low-power, deep-coverage devices. The data rate
          is small (a few kilobits per second), the message overhead is
          small, and the radio is optimised for battery operation. A
          well-designed NB-IoT sensor can run for three to five years on
          a primary lithium battery while reporting a tank level every
          fifteen minutes.
        </p>

        <h2>Why Kenya specifically</h2>
        <p>
          Safaricom rolled out NB-IoT coverage across most of the
          country between 2020 and 2023. The base-station coverage
          reaches sites where 4G LTE signal is patchy or non-existent.
          For a tank installed at an off-grid water-treatment site,
          NB-IoT is often the only viable cellular option.
        </p>

        <h2>How it shows up on a tank</h2>
        <p>
          Physically: a small gateway box mounted near the tank, with
          one or two cables descending to the level transmitter, the
          flow meter, or whichever instrument the site is monitoring.
          Power comes from either a primary battery (multi-year life)
          or a small solar panel.
        </p>
        <p>
          Data: the gateway packages each reading into a small message
          and sends it over the Safaricom NB-IoT network to a cloud
          ingestion endpoint. We host that endpoint and run the
          monitoring app, or we push the data into your existing SCADA
          system, depending on what suits your IT setup.
        </p>

        <h2>When we do not recommend NB-IoT</h2>
        <p>
          Two cases: a multi-tank plant where on-prem LoRaWAN gives you
          a single gateway covering twenty instruments at lower
          operating cost, and a high-bandwidth site where you need
          real-time streaming for SCADA integration (4G LTE is better
          there). Most of our installs are single-tank or low-bandwidth,
          which is why NB-IoT is the default recommendation.
        </p>
        <p>
          Full IoT page is at{" "}
          <Link href="/products/iot/">/products/iot/</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "inside-the-workshop-tig-welding-stainless",
    title: "Inside the workshop: what TIG-welding a stainless tank actually looks like",
    excerpt:
      "A walk through the welding bay, the argon backing setup, the dye-penetrant test station, and the difference a calibrated argon flow rate makes to a finished seam.",
    publishedAt: "2026-05-10",
    readingMinutes: 6,
    tags: ["Workshop", "Process"],
    heroImage: "/images/about/workshop-tig-welding.png",
    heroImageAlt:
      "TIG welder mid-strike on a polished stainless steel tank seam",
    body: (
      <>
        <p>
          A stainless tank is what comes out of the welding bay. The
          welding bay is what we live in. Here is what actually happens
          in there, in the order it happens.
        </p>

        <h2>Edge prep</h2>
        <p>
          Before any weld goes down, the plate edges are bevelled and
          cleaned with a stainless-only wire brush. Carbon-steel
          contamination on a stainless weld zone causes corrosion years
          later, so the workshop separates carbon and stainless tooling
          completely. Stainless wire brushes are tagged with a yellow
          band; nothing else touches the stainless plate.
        </p>

        <h2>Argon backing</h2>
        <p>
          TIG welding stainless requires argon backing on the inside of
          the seam during welding. Without it, the back of the weld
          oxidises and you get the classic black &quot;sugar&quot; that
          can crack under cycling. The shop runs a fixed argon flow
          rate, measured at the regulator, on every seam.
        </p>

        <h2>The strike and the bead</h2>
        <p>
          The welder strikes the arc with a sharp tap-and-lift, then
          establishes a small molten pool. The torch moves in a
          consistent forward weave; filler wire is added on the leading
          edge of the pool. A good TIG bead on stainless looks like a
          row of overlapping coins, all the same size, with no
          discolouration on either side of the seam.
        </p>

        <h2>Dye penetrant</h2>
        <p>
          Every completed seam goes to the dye-penetrant test station.
          Penetrant is sprayed on, allowed to dwell, wiped off, and a
          developer is applied. Any crack or porosity in the seam pulls
          penetrant up and shows as a red mark against the white
          developer background. Pass criteria are written on the
          inspection sheet for each vessel.
        </p>

        <h2>The finishing pass</h2>
        <p>
          After dye penetrant, the seam is mechanically polished to the
          spec'd surface roughness (Ra). For food-grade vessels we
          target Ra ≤ 0.8 μm; for pharma-adjacent, Ra ≤ 0.4 μm. The
          polished surface is what your operator sees and what the
          inspector measures.
        </p>

        <p>
          More on the workshop and the rest of the fabrication process
          is on the{" "}
          <Link href="/about/local-manufacturing/">
            Local Manufacturing page
          </Link>
          .
        </p>
      </>
    ),
  },
] as const;

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
