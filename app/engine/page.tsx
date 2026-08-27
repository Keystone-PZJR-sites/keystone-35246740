import { NavChrome } from "@/design-system/v2/sections/nav";
import { EngineSection } from "@/design-system/v2/sections/engine";
import { EngineDevControls } from "./controls";

/** /engine — the section beneath the mounted nav (spec 008 §8.6). The
 * section stays server-rendered; the dev controls drive the
 * interrupt-storm through the cards' real click path and the
 * reduced-motion simulation through the page root's data-motion
 * attribute. No v2-choreo class — this page mounts no load
 * orchestrator; the section has no scripted entrance (§9). */
export default function EngineDevPage() {
  return (
    <div className="page">
      <NavChrome />
      <main>
        <EngineSection />
      </main>
      <EngineDevControls />
    </div>
  );
}
