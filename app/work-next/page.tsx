import { NavChrome } from "@/design-system/v2/sections/nav";
import { WorkDeckSection } from "@/design-system/v2/sections/work-deck";
import { HeroDevControls } from "../hero-next/controls";

/** /work-next — the work section beneath the mounted nav (spec 021
 * §8). No load orchestrator mounts here, so the page renders
 * statically; the section is born settled and the deck's island owns
 * the click machine. Click, Enter, or Space anywhere on the deck
 * advances one position; six clicks return to Your Health Solutions. */
export default function WorkNextDevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <div className="wddev-runway">
          <p>The work section is below — click the deck to cycle the six sites.</p>
        </div>
        <WorkDeckSection />
        <div className="wddev-tail">
          <p>Past the section.</p>
        </div>
      </main>
      <HeroDevControls />
    </div>
  );
}
