"use client";

import { LoadOrchestrator } from "./load-orchestrator";

export function HeroLoad() {
  return <LoadOrchestrator finalAnimation="hx-chip-wipe" finalSelector='[data-chip="follow-ups"]' />;
}
