import { NavChrome } from "@/design-system/v2/sections/nav";
import { EnginesSection } from "@/design-system/v2/sections/engines";
import { HeroDevControls } from "../hero/controls";

/** /engines-free-2 — the engine section's QA page (spec 020 §8 as
 * re-ruled §9 R24, tuned §9 R25; the successor to the retired
 * /engines-next). The canonical section mounts below a viewport-tall
 * runway so the approach, the ten distance-mapped stops (the 25/75
 * lap boundaries, no clock), and the release are reachable by
 * scroll; a tail block follows so the release is scrollable past.
 * The shared dev controls drive the reduced-motion simulation
 * (data-motion). */
export default function EnginesFree2DevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <div className="efdev2-runway">
          <p>
            Scroll down — the section pins at the nav; ten stage stops ride the
            scroll (every a and b drawing on the path, no snap, no clamp, no
            auto progression — swaps at 25% and 75% of each lap).
          </p>
        </div>
        <EnginesSection />
        <div className="efdev2-tail">
          <p>Past the section — the pin has released in free flow.</p>
        </div>
      </main>
      <HeroDevControls />
    </div>
  );
}
