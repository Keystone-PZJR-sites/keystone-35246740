"use client";

/** v2 sections — the homepage load orchestrator mount (spec 006 §6).
 * The engine lives in load-orchestrator.tsx (generalized 2026-08-28 at
 * its second consumer — the Our Work entrance, 014 §6 as amended);
 * this wrapper pins the homepage's final beat so the composition and
 * behavior are unchanged: the run settles when the reading-order-final
 * chip's wipe lands (the pseudo-element's animationend fires on the
 * owning chip). */

import { LoadOrchestrator } from "./load-orchestrator";

export function HeroLoad() {
  return <LoadOrchestrator finalAnimation="hx-chip-wipe" finalSelector='[data-chip="follow-ups"]' />;
}
