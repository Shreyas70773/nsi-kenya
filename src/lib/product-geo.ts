/**
 * GEO/AEO content for product hub pages: a short, lift-verbatim "In brief"
 * answer block and the canonical FAQ set per hub.
 *
 * Single source of truth so the on-page visible text and the FAQPage JSON-LD
 * are byte-identical — Google only rewards FAQ structured data when the same
 * Q&A is visible, and AI engines trust visible+structured agreement. Render
 * the `inBrief` as on-page text and feed `faqs` to both <FaqList> and
 * faqLd().
 */

export type ProductFaq = { question: string; answer: string };

export type ProductGeo = {
  /** ~150-word answer block, written to be quoted verbatim by an AI answer. */
  inBrief: string;
  faqs: readonly ProductFaq[];
};

/** Keyed by hub slug. `satisfies` keeps the literal keys so `PRODUCT_GEO.tanks`
 *  resolves to a defined ProductGeo under noUncheckedIndexedAccess. */
export const PRODUCT_GEO = {
  tanks: {
    inBrief:
      "North Star Impex Kenya fabricates industrial tanks in three materials, each chosen for the medium it has to survive. Stainless 304 and 316L tanks (1–500 m³) handle hygiene duty for food, beverage, dairy and pharmaceutical-adjacent process. Epoxy-lined carbon steel tanks (1–200 m³) handle the corrosive path — ETP chemical dosing and corrosive-media storage. Bolted Zinc Aluminium tanks (50–5,000 m³), supplied with a liner as standard, handle long-cycle bulk-water and process storage. Every tank is built in the company's own workshop: plate is cut, rolled and TIG-welded course by course, then dye-penetrant tested on the welds and hydrostatically tested on the finished shell before it ships — nothing leaves untested. The workshop is regulatory-compliant on ETP equipment, and crews install across East African markets. A specification, capacity and lead time are returned within 48 working hours of a quote request.",
    faqs: [
      {
        question:
          "Which tank material should I choose for my plant?",
        answer:
          "Match the material to the medium. Stainless 304/316L (1–500 m³) is for hygiene duty: food, beverage, dairy, and pharmaceutical-adjacent process. Epoxy-lined carbon steel (1–200 m³) is for the corrosive path: ETP chemical dosing and corrosive-media storage. Bolted Zinc Aluminium (50–5,000 m³), supplied with a liner as standard, is for long-cycle bulk water and process storage. North Star Impex fabricates all three and sizes the tank to the medium it has to survive.",
      },
      {
        question: "What tank capacity range can North Star Impex fabricate?",
        answer:
          "From 1 m³ up to 5,000 m³. Stainless runs 1–500 m³, epoxy-lined runs 1–200 m³, and bolted Zinc Aluminium covers the large bulk range of 50–5,000 m³. The largest single tank fabricated and installed to date is 500 m³ in welded construction; larger volumes are delivered in bolted Zinc Aluminium.",
      },
      {
        question: "Are the tanks food-grade and regulatory-compliant?",
        answer:
          "Yes. Stainless 304 and 316L tanks are fabricated for food, beverage, and dairy duty with hygienic finishes, and the workshop is regulatory-compliant on ETP equipment. Every shell is dye-penetrant tested on the welds and hydrostatically tested before it ships — nothing leaves untested.",
      },
      {
        question: "How long does a tank quote take?",
        answer:
          "North Star Impex returns a specification, capacity, and lead time within 48 working hours of a quote request. Tanks are fabricated in the company's own workshop and installed by its crews across East African markets.",
      },
    ],
  },

  silos: {
    inBrief:
      "North Star Impex Kenya fabricates galvanised and carbon-steel storage silos from 10 to 1,000 metric tonnes for plants across East African markets. The range covers three classes: grain storage silos (10–500 MT) for breweries, food processors and grain handlers; feed silos (5–100 MT) for feed mills and poultry operations; and industrial bulk silos (10–1,000 MT) for cement, powder handling and food ingredients. Conveyor catwalks, aeration, level instrumentation and inventory tracking are specified as options at build time rather than retrofitted later, and any level or inventory data can be connected to the company's remote-monitoring app, personalized to your site. Material is chosen by what you store and how often you cycle it — galvanised steel for longer cycles and humid sites, carbon steel for sheltered or high-throughput duty. Silos are fabricated in North Star Impex's own workshop with a specification and lead time returned within 48 working hours.",
    faqs: [
      {
        question: "What silo capacities does North Star Impex build?",
        answer:
          "From 10 to 1,000 metric tonnes. Grain storage silos run 10–500 MT for breweries, food processors and grain handlers; feed silos run 5–100 MT for feed mills and poultry; industrial bulk silos run 10–1,000 MT for cement, powders and food ingredients. All are fabricated in carbon or galvanised steel.",
      },
      {
        question: "Can the silos include aeration and inventory monitoring?",
        answer:
          "Yes. Conveyor catwalks, aeration, level instrumentation and inventory tracking are all specified as options at build time, not bolted on as retrofits. Level and inventory data can also be connected to North Star Impex's remote-monitoring app, personalized to your site.",
      },
      {
        question: "Galvanised or carbon steel — which silo is right?",
        answer:
          "Both are offered. Galvanised steel resists corrosion and suits longer storage cycles and humid sites; carbon steel is economical for sheltered or high-throughput duty. North Star Impex specifies the material by what you store and how often you cycle it.",
      },
      {
        question: "Who uses these silos?",
        answer:
          "Breweries, feed mills, food processors and bulk-handling plants across East African markets. The silos are sized for grain, animal feed, and industrial bulk materials, and are fabricated in-house with a 48-working-hour quote turnaround.",
      },
    ],
  },

  instruments: {
    inBrief:
      "North Star Impex Kenya supplies process instrumentation across six categories from a single supplier, spanning 154 stocked SKUs. The categories are flow (electromagnetic, vortex, turbine, ultrasonic, Coriolis, thermal mass), level (radar, ultrasonic, hydrostatic, guided-wave), pressure (gauge, absolute, differential, combined pressure-and-temperature), liquid analysis (pH, ORP, conductivity, dissolved oxygen, turbidity, TSS, multi-parameter), temperature (RTD, thermocouple, programmable transmitters), and system products (paperless recorders, indicators, signal isolators, controllers). Every instrument ships with the protocol your plant already speaks — 4–20 mA, Modbus RTU over RS485, HART, or pulse/frequency — so a loop plugs into your SCADA on day one; where a control system needs something bespoke, the team specifies a signal isolator or protocol converter rather than a different instrument. North Star Impex sizes, supplies, installs and cloud-connects each loop, and every instrument can be connected to its remote-monitoring app, personalized to your site.",
    faqs: [
      {
        question: "What process instruments does North Star Impex supply?",
        answer:
          "Six categories from one supplier: flow (electromagnetic, vortex, turbine, ultrasonic, Coriolis, thermal mass), level (radar, ultrasonic, hydrostatic, guided-wave), pressure (gauge, absolute, differential, combined P+T), liquid analysis (pH, ORP, conductivity, DO, turbidity, TSS, multi-parameter), temperature (RTD, thermocouple, programmable transmitters), and system products (paperless recorders, indicators, signal isolators, controllers). The catalogue spans 154 stocked SKUs.",
      },
      {
        question: "Which communication protocols are supported?",
        answer:
          "Every instrument ships with the protocol your plant already speaks: 4–20 mA analogue loop, Modbus RTU over RS485, HART, and pulse/frequency for totalisers. If your control system needs something bespoke, North Star Impex specifies a signal isolator or protocol converter rather than a different instrument, so the loop plugs into your SCADA on day one.",
      },
      {
        question:
          "Does North Star Impex install and commission instruments, or only supply?",
        answer:
          "Both. The team sizes, supplies, installs and connects instruments to cloud dashboards. Instrument loops are sized with your engineers, and every instrument supplied can be connected to a remote-monitoring app personalized to your site.",
      },
      {
        question: "Can these instruments connect to remote monitoring?",
        answer:
          "Yes. Every flow, level, pressure, liquid-analysis or temperature instrument North Star Impex installs can be connected to its cloud dashboard over NB-IoT, LoRaWAN, 4G LTE or Ethernet, personalized to your site.",
      },
    ],
  },

  "structural-works": {
    inBrief:
      "North Star Impex Kenya runs its own in-house structural steel workshop, fabricating the steel envelope around process equipment: operator platforms and access decks, walkways and catwalks, tank supports and saddles, multi-tier pipe racks, equipment skids (pump, instrument, packaged ETP), and plant retrofits including in-situ welding. Structural design is to Eurocode 3 (British Standards on request) and welding to AWS D1.1, using qualified welders and carbon steel S275/S355 with mill, primed, two-coat epoxy or hot-dip galvanised finishes. Concept GA drawings are returned within 5 working days of brief sign-off, and approved drawings to ex-works delivery typically run three to six weeks by tonnage and finish. Workshop capacity is up to 30 tonnes per month, scaling with the order book. Fabricated steel is delivered on flatbed across East African markets with abnormal-load permits handled in-house.",
    faqs: [
      {
        question: "What structural steel does North Star Impex fabricate?",
        answer:
          "Platforms and access decks, walkways and catwalks, tank supports and saddles, multi-tier pipe racks, equipment skids (pump, instrument, packaged ETP), and plant retrofits. All are fabricated in the company's own workshop in carbon steel S275/S355, with mill, primed, two-coat epoxy, or hot-dip galvanised finishes.",
      },
      {
        question: "Which design and welding standards do you work to?",
        answer:
          "Structural design is to Eurocode 3 (British Standards on request) and welding is to AWS D1.1 using MIG and stick processes with qualified welders. Standard materials are carbon steel S275/S355, hot-dip galvanised on request.",
      },
      {
        question: "How fast are drawings and delivery?",
        answer:
          "Concept GA drawings come back within 5 working days of brief sign-off. From approved drawings to ex-works delivery is typically three to six weeks depending on tonnage and finish. Workshop capacity is up to 30 tonnes per month, scaling with the order book.",
      },
      {
        question: "Do you deliver and handle abnormal loads across East Africa?",
        answer:
          "Yes. Fabricated steel is delivered on flatbed across East African markets, and abnormal-load permits are handled in-house. The structural team also installs on site, including in-situ welding and post-weld treatment for plant retrofits.",
      },
    ],
  },

  iot: {
    inBrief:
      "Every tank and instrument North Star Impex installs can be connected to a remote-monitoring app, personalized to the customer's site — cloud-ready oversight of tank level, flow, pressure, temperature and water quality, viewable live from any phone or browser. The path is simple: an instrument feeds an on-site gateway, which uploads to a time-series store hosted on North Star Impex's infrastructure or yours, then to a responsive dashboard with trends and alarms. Four networks are supported and sized to the site: NB-IoT (the default for single-tank, low-bandwidth sites, with a 3–5 year primary battery at 15-minute reporting), LoRaWAN (one yard gateway for 20+ instruments), 4G LTE (real-time SCADA streaming), and Ethernet/Wi-Fi. Data is secured with TLS 1.3 in transit and AES-256 at rest, with role-based audited access and no third-party sharing; export is by CSV, JSON or Modbus-over-TCP.",
    faqs: [],
  },
} satisfies Record<string, ProductGeo>;
