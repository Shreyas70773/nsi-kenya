import { Factory, Timer, Boxes, MapPinned } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const TILES = [
  { icon: Factory, copy: "Fabricated in our Nairobi workshop" },
  { icon: Timer, copy: "Quotes in 48 working hours" },
  { icon: Boxes, copy: "154 instrument SKUs ex-stock" },
  { icon: MapPinned, copy: "Installed & supported nationwide" },
] as const;

/**
 * T-1 proof band: four stat tiles directly under the homepage hero. Copy is
 * contractual (brief §5). Flat surfaces, lucide icons — house idiom.
 */
export function ProofBand() {
  return (
    <section
      aria-label="Why buyers trust us"
      className="border-b border-border/10 px-6 py-10 md:py-12"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal stagger={0.06} yFrom={12}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
            {TILES.map((tile) => (
              <div
                key={tile.copy}
                data-reveal-item
                className="flex items-center gap-3.5 rounded-card border border-border/10 bg-surface px-5 py-4"
              >
                <tile.icon
                  className="h-5 w-5 shrink-0 text-accent"
                  strokeWidth={2}
                  aria-hidden
                />
                <p className="text-sm leading-snug text-text">{tile.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
