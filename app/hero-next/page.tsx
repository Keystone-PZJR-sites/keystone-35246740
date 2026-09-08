import { NavChrome } from "@/design-system/v2/sections/nav";
import { HeroV2Section } from "@/design-system/v2/sections/hero-v2";
import { HeroDevControls } from "./controls";

/** /hero-next — the v2 hero beneath the mounted nav, so the load
 * choreography is complete (including the nav's t=0 entry). The
 * section stays server-rendered; the shared dev controls drive the
 * replay (v2:replay) and the reduced-motion simulation (data-motion). */
export default function HeroNextDevPage() {
  return (
    /* v2-choreo opts this page into the cold-load guard */
    <div className="page v2-choreo">
      <NavChrome />
      <main>
        <HeroV2Section />
      </main>
      <HeroDevControls />
    </div>
  );
}
