import { NavChrome } from "@/design-system/v2/sections/nav";
import { EnginesFreeSection } from "@/design-system/v2/sections/engines-free";
import { HeroDevControls } from "../hero/controls";

/** /engines-free — SANDBOX: the engine section under the free scroll
 * contract (no paged clamp, no snap; the stage follows the nearest
 * rest live and the a↔b timer runs whenever the scroll is idle).
 * Compare against /engines-next (the canonical §9 R20 paged page).
 * Same shape as that page: a viewport-tall runway above so the
 * approach is observable, a tail below so the release is scrollable
 * past; the shared dev controls drive the reduced-motion simulation. */
export default function EnginesFreeDevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <div className="efdev-runway">
          <p>
            Free-scroll sandbox — scroll through: no snap, no clamp; the stage
            crossfades at each midpoint and the timer runs when scroll idles.
          </p>
        </div>
        <EnginesFreeSection />
        <div className="efdev-tail">
          <p>Past the section — the pin has released; no snap-back occurred.</p>
        </div>
      </main>
      <HeroDevControls />
    </div>
  );
}
