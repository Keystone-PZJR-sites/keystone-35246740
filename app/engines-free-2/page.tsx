import { NavChrome } from "@/design-system/v2/sections/nav";
import { EnginesFree2Section } from "@/design-system/v2/sections/engines-free-2";
import { HeroDevControls } from "../hero/controls";

/** /engines-free-2 — SANDBOX: the engine section under the
 * distance-mapped free scroll contract (ten stops — each engine's a
 * at its rest, its b mid-travel to the next; hysteresis at the
 * boundaries; the idle timer keeps cycling when scroll parks; still
 * no clamp and no snap). Compare against /engines-free (dwell-timer
 * free scroll) and /engines-next (canonical §9 R20 paged). */
export default function EnginesFree2DevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <div className="efdev2-runway">
          <p>
            Distance-mapped sandbox — scroll through: ten stage stops, every a
            and b drawing on the path; no snap, no clamp; idle still cycles.
          </p>
        </div>
        <EnginesFree2Section />
        <div className="efdev2-tail">
          <p>Past the section — all ten drawings were reachable on the way.</p>
        </div>
      </main>
      <HeroDevControls />
    </div>
  );
}
