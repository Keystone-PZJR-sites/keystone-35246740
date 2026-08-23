# Agent rules — keystone-35246740

This branch (`new-brand-marketing-site`) is the **new-brand rebuild** of the
Keystone corporate site. Before doing anything:

1. Read `docs/rebuild/plan.md` — phasing, decision log, source-of-truth
   hierarchy, and spec cadence for the rebuild.
2. Rebuild specs live in `docs/rebuild/specs/` (series from 001). Specs are
   approved before implementation and written just-in-time from fresh Figma
   MCP reads — see plan.md, "Spec cadence".
3. `docs/rules/rules.md` is **partially superseded** for rebuild work; its
   header banner lists exactly which sections the rebuild plan replaces.
   Everything else in it (server/client discipline, token centrality, effects
   hygiene, accessibility, MCP-only Figma reads) remains in force.
4. The old-brand site ships from `main` — its code and docs in this repo
   describe that site until the rebuild replaces them phase by phase. Never
   delete pages or routes without explicit instruction.

All geometry, type, and token values come from the live Figma file
`ks-MarketingSite` through the Figma MCP — never from screenshots, memory, or
prior extractions.

Write all commit messages in ASD-STE100 Simplified Technical English (see
"Git Workflow" in `docs/rules/rules.md`): active voice, one idea per
sentence, 20 words or fewer per sentence, plain approved words.
