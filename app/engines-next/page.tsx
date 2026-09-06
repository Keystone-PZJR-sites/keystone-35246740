import { NavChrome } from "@/design-system/v2/sections/nav";
import { EnginesSection } from "@/design-system/v2/sections/engines";
import { HeroDevControls } from "../hero/controls";

/** /engines-next — the engine section beneath the mounted nav, below a
 * viewport-tall runway so the pre-pin approach is observable (spec 020
 * §8). No load orchestrator mounts here, so the page renders
 * statically; the section's own island owns the scroll contract. A
 * tail block follows the section so the 05b release and the empty
 * sliver row are scrollable past. */
export default function EnginesNextDevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <div className="engdev-runway">
          <p>
            Scroll down — the section pins at the nav; the carousel timer cycles each
            engine&rsquo;s two illustrations and scroll snaps between engines.
          </p>
        </div>
        <EnginesSection />
        <div className="engdev-tail">
          <p>Past the section — the pin has released on the Engagement rest.</p>
        </div>
      </main>
      <HeroDevControls />
    </div>
  );
}
