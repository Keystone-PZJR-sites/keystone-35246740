"use client";

import { LoadOrchestrator } from "@keystone-sites/marketing-design-system/sections/load-orchestrator";

export function HeroLoad() {
  return (
    <LoadOrchestrator finalAnimation="hx-chip-wipe" finalSelector='[data-chip="follow-ups"]' />
  );
}
