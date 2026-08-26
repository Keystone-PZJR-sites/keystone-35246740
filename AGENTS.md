# Agent rules — keystone-35246740

This branch (`new-brand-marketing-site`) is the **new-brand rebuild** of the
Keystone corporate site. Before doing anything:

1. Read `docs/rebuild/plan.md` — phasing, decision log, source-of-truth
   hierarchy, and spec cadence for the rebuild.
2. Rebuild specs live in `docs/rebuild/specs/` (series from 001). Specs are
   approved before implementation and written just-in-time from fresh Figma
   MCP reads — see plan.md, "Spec cadence".
3. `docs/rules/rules.md` received its rebuild revision (2026-08-25). It now
   carries both sites' rules — rebuild deltas marked inline — plus the
   rebuild-specific sections: "Rebuild Spec Conventions", "Grid & Type Laws
   (rebuild)", "Motion Grammars (rebuild)", the amendment protocol in
   "Specs Are Immutable", and the Figma verification protocol inside
   "Figma Links Are Read Through the MCP". Read it in full.
4. The old-brand site ships from `main` — its code and docs in this repo
   describe that site until the rebuild replaces them phase by phase. Never
   delete pages or routes without explicit instruction.

All geometry, type, and token values come from the live Figma file
`ks-MarketingSite` through the Figma MCP — never from screenshots, memory, or
prior extractions.

Figma verification digest (full protocol in `docs/rules/rules.md`):

- `get_metadata` cannot see radius, fill, or interactivity; grid
  auto-layout children can carry stale `x`/`y`. Verify transcription
  against rendered bounds (`absoluteBoundingBox`) through the Figma
  console MCP ("the console bridge") before committing geometry.
- Stroke alignment causes ±0.5/±1px read artifacts; transcribe the
  intended whole value, not the artifact.
- The file can be wrong — never build a known error. Flag anomalies to
  design, re-read every touched node after the fix, and record the
  resolution in the spec's §9 resolutions record.
- Re-extract the token layer from the Figma variables API before every
  phase build.
- Post-approval changes land as dated inline amendments plus a §9 entry
  ("Specs Are Immutable", rebuild amendment protocol) — never silent
  edits, never a new spec for a same-day fix.

Do not commit, stage, or push unless the human asks in that turn.
Completing a spec or passing checks is not permission to commit. Leave
the working tree dirty and report what is ready. When asked to commit,
write messages in ASD-STE100 Simplified Technical English (see "Git
Workflow" in `docs/rules/rules.md`): active voice, one idea per sentence,
20 words or fewer per sentence, plain approved words. Prefer the smallest
complete commit (one spec, one token layer, one primitive) — not a whole
phase.
