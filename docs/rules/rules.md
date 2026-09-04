# Site Rules

> Revised 2026-08-27, the day the old-brand site was purged from this
> branch (owner decision — see plan.md, decision log). These rules
> describe the only site in this tree: the new-brand rebuild under
> `design-system/v2/`. The old-brand site still ships from `main`,
> where the pre-revision rules remain authoritative for it. The old
> spec series (`docs/specs/`) stays frozen here as a historical record.

Non-negotiable standards for this codebase. Read this before touching a file.

Rules are grouped by theme and titled, not numbered for posterity — refer to them by title in code comments and PRs so renumbering never invalidates a reference.

---

# § Process & Workflow

## Specs Come First

**New sections, features, and rewrites never begin as code — there is a spec first** (surgical changes are the exception, see below). The flow:

1. A spec is written describing what the section looks like and how it behaves, numbered `001_…`, `002_…`, sequential and never reused, in `docs/rebuild/specs/`.
2. Spec is approved before any implementation begins.
3. Implementation traces back to something in the spec. Out-of-spec work stops to update the spec first.
4. Acceptance criteria are checked off in the spec when verified.

Specs follow the just-in-time cadence in plan.md — one phase ahead at most, written from fresh MCP node reads when the phase's inputs are stable.

Specs speak the grid's language: ticks, anchors, and cells are the numeric vocabulary, and the material px values read from the nodes at writing time are the implementation contract — see "Rebuild Spec Conventions".

The old series (`docs/specs/`) described the old-brand site. It is frozen: never edit it, never build from it.

---

## Rebuild Spec Conventions

The shape specs converged on over 001–006. New specs inherit it.

**Header.** Status (with approval date) · Depends on (prior specs) · Sources — the exact Figma node IDs read, with read dates, plus design decisions and motion intent received, each dated.

**Body order.** Tick-total anatomy table per band → exposure map (regions and ornament cells in zero-based section-local ticks) → content blocks with per-anchor value tables → motion → new assets and non-token constants → semantics and deliverable → resolutions record (§9) → acceptance criteria.

**Conventions that hold across every spec:**

- Every geometry fact is read off the nodes at writing time; nothing is scaled from a neighboring anchor.
- Non-token designed constants are **enumerated in the spec** and live only in the component token layer (`design-system/v2/tokens/component.css`), per band only where used.
- Motion intent arrives from design in plain language; the spec chooses the values and approval covers both (see "Motion Grammars").
- Draft flags go to design; fixes are re-read from the nodes; §9 records every resolution. Nothing is built from a node known to be wrong.
- Every spec ships a **permanent, noindexed dev route** as its QA surface (`/grid`, `/primitives`, `/footer`, `/nav`, `/hero`, `/portfolio`, `/engine`, `/testimonials`; `/home-fixture` is the QA mount of the assembled homepage `/` renders).
- The acceptance preamble is standard: *at each of the five anchors and one arbitrary mid-band width per band, scrollbar forced on.* Checked boxes carry the measured evidence in parentheses.
- Acceptance always includes: the client-island count, the route's JS size, and every value tracing to a token or an enumerated constant.

---

## What Needs a Spec

Specs gate **new work** — a new section, a new feature, or a rewrite of existing design. Anything that gives a non-technical reader a new picture of what a section looks like or how it behaves starts with a spec.

**Surgical changes to already-built, already-specced work do not need a spec.** A breakpoint tweak, a type-weight or spacing adjustment, a copy fix, a new token, or a bug fix traces back to the existing spec's intent. Capture it in the code and the affected docs — see "Docs Stay in Sync With Code" — instead of writing a new spec.

The test: if describing the change would require a new Figma frame, write a spec. If a reader could see the whole change by diffing the implementation, skip it.

---

## Specs Are Immutable

Specs are append-only, like database migrations. Once a spec exists, its body is not edited to reflect new behaviour, new defaults, or new intent. The `Status` line and acceptance-criteria checkboxes within an existing spec may be updated as that spec is implemented and verified — nothing else.

When the design intent changes, write a **new spec** with the next sequential number. The new spec describes what is changing and why, and lists the prior spec under `Depends on:`. The old spec stays exactly as it was — a frozen statement of what the design intended at the time it was written.

This matters because specs are referenced from code comments, commit messages, and other specs by their number. Editing an old spec invalidates every reference to it without warning. A reader who follows a `// see Spec 011` comment expects to find what Spec 011 said when the comment was written — not a later edit.

Two exceptions exist for revising the same section:

- **`.r1`, `.r2` suffixes on the same number** — a focused revision of one section that supersedes earlier revisions of that same section. Use this when the revision is contained to one section's visual design.
- **A new sequential number with a `_refresh` (or similar) suffix** — a substantive redesign that needs to live alongside the original. Use this when the change is large enough that future readers benefit from seeing both side by side.

In both cases the prior spec is left unedited.

**Amendment protocol.** The same-day design-fix cadence (flag → fix in Figma → re-read → record) produces post-approval changes too small for a new spec. These land as a **dated inline amendment** at the value they change ("amended 2026-08-24 — …") plus an entry in the spec's resolutions record (§9) — the body always carries the built truth, the record carries the history. Errata found at build follow the same shape. Wholesale redesigns still get a new sequential number. The Status line, acceptance checkboxes, dated amendments, and the resolutions record are the only mutable zones of a spec.

---

## Figma Links Are Read Through the MCP

Every Figma node URL in a spec, comment, or chat message exists to be opened through the Figma MCP. This applies to spec authoring, implementation, asset refreshes, and revisions — every workflow that touches the design.

Before writing or updating a spec that references a Figma node, run `get_metadata`, `get_variable_defs`, and `get_design_context` on that node. Before implementing or refreshing a section, do the same. The MCP returns the structural facts — layer names, sizes, asset URLs, bound variables, per-tool variants — that a screenshot or recollection cannot. Specs written from a Figma URL in a browser tab or from prior implementations always drift.

**If the Figma MCP is unreachable, stop.** Do not write the spec. Do not implement the section. Do not approximate values from the screenshot or carry them over from the previous implementation. Report the failure (which server, which tool, which node) and wait for the MCP to be restored. The user has explicit Figma MCP access for this project; needing it is never a surprise.

Acceptable recovery steps:

- Server reports unauthenticated → run its `mcp_auth` tool.
- Server requires Figma Desktop and Figma Desktop is closed → ask the user to open Figma Desktop with the file loaded.
- Node ID is malformed or the node was deleted → ask the user to re-share the URL.

Falling back to "I'll just read the screenshot" or "the data file probably still matches" is not on the list.

### Node reads have known blind spots

- `get_metadata` returns position and size only — it cannot see corner radius, fills, or interactivity. Any cell that might be ornament or a control is read per-node with `get_design_context`.
- Inside a Figma **grid auto-layout**, a child's metadata `x`/`y` can be a stale cached value that disagrees with where the grid renders it. Geometry transcribed from a grid auto-layout is verified against rendered bounds (`absoluteBoundingBox`, via the console bridge) before it is committed. Never trust metadata coordinates alone.
- Stroke alignment produces ±0.5/±1px artifacts in node reads: frames at x −0.5, a 577-wide frame, insets reading 23/31/33 where the design means 24/32. Recognize the class and read the intended whole value; do not transcribe the artifact.

### The console bridge

"The console bridge" is the Figma console MCP (`figma_execute` and its siblings): it runs JavaScript inside the live Figma file and returns what the standard read tools cannot — rendered bounds (`absoluteBoundingBox`), effect values, and verbatim SVG exports of vector geometry. Use it to verify transcription against rendered truth, to export icon geometry (see "SVG Export Rules"), and for any read where cached metadata is suspect.

### The file can be wrong — never build the error

Anchor frames and component sets occasionally contain design errors: a mis-bound variable, a stray ornament cell, stale copy overrides. When a node disagrees with the established pattern or with its siblings, flag it to design instead of building it. The loop: flag at draft → design fixes in Figma or records a decision → **re-read the touched nodes after the fix** → record the resolution in the spec's §9. Building a known error "to match the file" is never correct.

### Re-extract the token layer before every build

Token values are re-extracted from the Figma variables API before each phase's build (spec 001 rule). Silent design-side changes — a shadow re-ink, type-style drift — arrive through re-extraction and flow to built sections through the tokens with no code change. Skipping the re-extraction ships stale values.

---

## Code Is the Source of Truth

Specs document intent at a point in time. Code holds the current values. When extending or fixing work beyond a spec, read the actual code for measurements, copy, animation timings, and data values — never recover them from the spec. Consult the spec only for purpose and intent.

---

## Docs Stay in Sync With Code

Every commit that changes behaviour, adds a component, introduces a pattern, or shifts a convention updates the affected docs in the same commit. If something should be covered and isn't, add it. If a rule no longer matches reality, update it. Stale docs are worse than none — a reader following outdated guidance loses more time than one who knows to read the code.

The test before committing: if someone read only the docs and only the code, would they be consistent? If not, fix the docs first.

---

## How to Write Docs

- **Minimal.** Cut every sentence that adds no information.
- **No code snippets** unless the rule cannot be conveyed in prose.
- **Minimally technical audience.** Reader knows what a component and a prop are; assume nothing more.
- **Document what exists.** Future or planned work goes in specs, not explainers or rules.
- **One idea per sentence.** No daisy-chained semicolons.
- **No preamble.** No "This document covers…" openings.

---

## Git Workflow

**Do not commit unless asked.** Agents leave the working tree uncommitted. Do not run `git commit`, `git add` (as a prelude to a commit), or `git push` unless the human explicitly asks in that turn. Finishing a spec, passing `tsc`/`lint`, or completing a phase is not permission. When asked, follow the rest of this section.

Branch names: `feature/`, `fix/`, `docs/`, `chore/`. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:`, `perf:` followed by an imperative summary.

Commit messages (summary and body) are written in [ASD-STE100 Simplified Technical English](https://www.asd-ste100.org/): active voice, imperative or simple present tense, one idea per sentence, sentences of 20 words or fewer, plain approved words (write "start", not "initiate"; "use", not "utilize"), no noun clusters of more than three words.

One commit = one logical unit of work. Bias toward the smallest complete unit: one spec, one token layer, one primitive, one section. A whole phase is too large. Related docs stay in the same commit as the change they describe (see "Docs Stay in Sync With Code"). `npx tsc --noEmit` and `npm run lint` must pass before every commit. `git push --force` to `main` is forbidden. PRs squash to a small number of logical commits before merge.

---

# § Code Quality Baseline

## Don't Hallucinate

- Never invent content, copy, or data. Every string on the page comes from a prop, Figma, or an explicit instruction.
- Never invent component APIs. If a prop's name or type is unclear, read the component.
- Never assume a file or export exists. Verify with an import or by reading the source.
- When unclear, stop and ask. Undoing a bad assumption costs more than the question.

---

## Zero Errors and Warnings

Before every commit:

- `npx tsc --noEmit` — zero TypeScript errors.
- `npm run lint` — zero ESLint errors or warnings.
- Zero unused imports, variables, or dead code.

**Fix the cause. Don't suppress.** `// eslint-disable`, `// @ts-ignore`, `// @ts-expect-error`, and `// @ts-nocheck` are not solutions; they hide problems. If a rule misfires on a genuine edge case, comment why and raise it — never silently suppress.

**Don't use `npm run build` as a pre-commit check.** It invalidates Next.js's incremental dev cache and causes a full rebuild on the next dev request. `tsc --noEmit + lint` gives identical signal in seconds with no side-effects. Reserve `next build` for deploy verification or bundle-size checks.

---

## Search Before You Build

Verify nothing already exists before creating anything new.

- **Icons and marks:** vector geometry lives in `design-system/v2/icons.tsx` (verbatim Figma exports) and `public/media/brand/` through the media registry. Never re-export what exists.
- **Assets:** check `design-system/v2/media.ts` and `public/media/` before adding a file. Figma exports often duplicate already-committed assets. Two copies will diverge.
- **Design tokens:** check the `design-system/v2/tokens/` layers before writing any color, spacing, type, motion, or z value.
- **Library utilities:** check the `@keystone-sites/*` packages before writing data-layer helpers.

**The Figma MCP does not know the codebase.** It exports whatever Figma contains, including assets and shapes already implemented. Always cross-reference its output before committing.

**The Figma MCP names assets with SHA hashes** (`bf2d9cdd….svg`). These names are meaningless and never ship. Rename to descriptive kebab-case or delete if the asset already exists under another name.

---

## Plain Text Contains Plain Characters

User-facing strings use literal Unicode characters. Apostrophe is `'`, ampersand is `&`, emoji is the emoji. Escapes like `\u2019`, `\u0026` belong only where a literal cannot appear (regex normalisation, identifiers).

**The one exception is invisible characters whose presence is significant** — `\u00a0` (NBSP), `\u200d` (ZWJ), `\u202f` (narrow NBSP). A literal NBSP is indistinguishable from a regular space in source and silently changes layout; the escape makes intent reviewable. Comment the line so the reason is obvious.

---

## Values Are Defined Centrally, Never Hardcoded Inline

Any value that *means* something is defined once, in a central place, and referenced by name — never inlined as a bare literal. **This holds even when there is only one reference today.** A named definition documents intent, gives the value a single home to edit, and survives the day a second reference appears — and it always does.

Where the central definition lives, by kind:

- **Design values** — color, spacing, radius, type, z-index, motion → a token in the `design-system/v2/tokens/` layers.
- **Spec-enumerated non-token constants** → the component token layer (`v2/tokens/component.css`), per band only where used. Constants that reference `--t` or the interpolation weights are declared in a `.page` block, never `:root` (spec 002.r1's scope rule — a custom property resolves its inner `var()`s where it is declared).
- **Per-island magic numbers** — timings, beat positions, thresholds → a named-constants block at the top of the island file. A designer reads the block, changes a value, and knows exactly what they changed.
- **Repeated CSS values** — a delay reused across rules, a shared curve → a custom property or named token referenced everywhere (see "Motion Grammars" for promotion).

The carve-out is meaning, not count. A value genuinely incidental to one spot that names no shared concept may stay inline, with a comment when its origin isn't obvious. The test: if another file could ever need to agree on the value, or a reader would ask "why this number?", it gets a central name.

---

## Comments Explain Why, Not What

Comments that narrate what the next line does are noise. `// Increment counter` above `counter++` is read once, ignored, and drifts.

Useful comments capture:

- A non-obvious *why*: "The offset grows from 0,0 after the box lands because a hard shadow never paints while its box moves."
- A constraint the code cannot express: "The rest offsets are designed — see spec 009 §5."
- A trade-off that survived a discussion.

Block-letter `// =================` banners that label "what the next 200 lines render" are not comments — they're a substitute for splitting the file. The right fix is the split.

When in doubt, delete the comment and let the code speak. Naming a variable, extracting a function, or adding a type often replaces a comment with structure.

---

# § Architecture

## Server vs Client Components

Default to **Server Components**. Add `'use client'` only for: browser APIs (`window`, `document`, measurement), React state or effects, or event handlers.

Never put `'use client'` on page-level files (`app/*/page.tsx`). Push interactivity into leaf islands — each section ships at most one, and the spec's acceptance counts them. Never call API fetch functions inside client components.

---

## The Design System Is Central

All brand UI lives under `design-system/v2/` and is consumed through it. The layers build strictly upward — **tokens → base → grid → primitives → sections** — and a layer may use the layers above it, never below.

- **Tokens** (`v2/tokens/`): primitives · semantic · type · motion · `component.css` (the component token layer holding every spec-enumerated non-token constant). The only place colors, fonts, radii, spacing, z-index, and motion values are defined.
- **Base** (`v2/base.css`): the document reset the sections were verified under, and the site root (`.v2-root`, carried by `body` in the root layout). Part of the rendering contract — do not restyle it casually.
- **Grid** (`v2/grid/`): the spec 002/002.r1 engine and exposure vocabulary.
- **Primitives** (`v2/primitives/`): the lowest-level building blocks (buttons, grader, text, footer-item, grid-button). Build everything from these; never hand-roll a styled `<button>` or `<h2>` in a page.
- **Sections** (`v2/sections/`): full-width page sections and the site chrome (nav, footer).
- Plus `icons.tsx` (verbatim Figma exports), `media.ts` (the media registry), `lib/` (shared client utilities — currently the scroll lock), and `home.tsx` (the assembled homepage composition).

All custom CSS lives in these layers, assembled by `v2/index.css` in cascade order — edit the file for the layer you work on; never add rules to the index. Dev-route QA styles live in the route's own css file. No CSS modules, styled-components, emotion, `<style>` tags (the root layout's cold-load guard is the sole, commented exception), and no utility-class framework.

Every change to a primitive or token updates the `/primitives` catalog in the same commit.

---

## Component Organization

All components under `design-system/v2/`. One component per file. Named exports only. A section and its sub-components share a name prefix (`nav.tsx` · `nav-desktop.tsx` · `nav-mobile.tsx`); a section's island is its own file.

---

## Pages Compose From the Design System

A page file mounts design-system pieces and feeds them data — nothing more. A page never defines its own nav, footer, hero chrome, or colors.

Data fetched from `@keystone-sites/core/lib/server-api` is typed at the page boundary against the package's entity types before being passed into a typed component. Several API helpers return `unknown` or occasionally return objects where a string is typed — validate at the fetch site and render only fields verified to be the expected shape.

---

## Files Stay Small

A component file past ~500 lines is a missing folder. Long files hide structure, make every diff noisy, and let unrelated concerns drift together. Split the section into its own folder with an index barrel, one file per visually distinct sub-component, colocated `types.ts`.

The rule is about ceilings, not floors. A 200-line section is fine; a 3000-line file is not. The signal is "I cannot hold the whole file in my head."

The same applies to data — a section's content array does not belong in the same file as its component.

---

## Sub-component Boundaries Are Real

A "sub-component" buried inside the same file as its parent is still its own component. A thing is a sub-component when:

- It has a discrete prop interface and a discrete output.
- It can be reasoned about without reading the parent's render.
- It would have a name in the spec.

Pure layout primitives (wrapper divs, flex rows that exist only to lay out children) stay inline.

---

## Everything Is Prop-Driven

- **No hardcoded content in components.** Every string, image URL, color variant, label, and configuration is a prop or a typed data module the component imports.
- TypeScript interfaces for every component. Never `any`. Never `object`.
- Default prop values only for layout/style options (`variant`, `size`), never content.
- Server components fetch data and pass it down. Client islands receive data as props or read it from the DOM/computed style per their spec.

---

## One Source of Truth for State

A piece of state lives in exactly one place. Either React owns it and the animation/timer code reads it, or the animation/timer code owns it and React reads it. Not both.

The smell: forcing a synchronous React update from inside an animation or timer callback to keep two owners agreeing. That tells you the two are racing and the sync is suppressing the race rather than fixing it. Pick one owner — drive the value from React state and let the timer read via a ref, or drive it from the timeline and treat React as a passive observer.

Same for focus (the DOM owns; React calls `.focus()`, reads via events) and form state (uncontrolled inputs own their value; the submit handler reads it).

---

## No Module-Level Mutable State

A `let` declared at the top of a module that one component reassigns and another reads is a hidden global. Works in development, fails in tests, breaks under React Strict Mode, leaks across navigations.

A common temptation is a module-level `Map` shared across sections, justified as "fine because we don't want re-renders." The right tool is a React context whose value is a `useRef` (or a small imperative API memoised with `useMemo`) — lifetime scoped to the React tree, dependency visible on the component graph, fresh per render in tests.

Acceptable module-level state:

- `const` registries that never change after import.
- An exported `let` assigned exactly once during module evaluation.

Anything else — caches, handoffs, "current state" trackers — uses React state, refs, or events.

---

## Prefer Native CSS State Over JavaScript State

If a state can be expressed via `:hover`, `:focus-within`, `:focus-visible`, `:has()`, `data-*` attributes, or container/media queries, use CSS. A `useState` whose only job is to add a class on focus is wasted memory, an extra render, and a hydration risk.

JavaScript state is appropriate when:

- The state must be observed by code outside the affected element.
- It cannot be derived from CSS pseudo-classes (multi-selection, debounced flags, timers).
- The island must read it to drive behaviour.

The v2 islands follow this: state the CSS can carry lives in `data-*` attributes and classes; JS owns only what it must (timers, offsets, springs).

---

## Discriminated Unions Over String Sniffing

Type-narrow with a discriminator field, never with string matching on names. Every variant carries an explicit `type` literal. Every consumer narrows on that literal. TypeScript fails the build if a new variant is added without handling. A renderer is a single exhaustive `switch`.

If the source data lacks a discriminator (an external schema), classify it once at the boundary into a closed union and switch on that — never re-sniff strings at every render.

---

## Data Models Are Typed at the Boundary

The shape of every external response is parsed and typed before it enters the app. A response from `fetch(...)` is not `{ success: boolean }` just because someone wrote `as { success: boolean }` — the cast lies the moment the API changes.

The pattern:

1. Declare the response type once.
2. Validate the parsed body against it (a small hand-written `parseFooResponse(raw: unknown)` validator is the simplest version).
3. Use the validated value, not the raw `.json()` result.

Third-party SDKs that already return typed responses are trusted — the cast at *our* boundary is what is forbidden.

---

## Effects Are Idempotent

Every `useEffect`, `useLayoutEffect`, and event listener must be safe to set up, tear down, and set up again. React Strict Mode mounts components twice in development. HMR reloads single files. Browser bfcache resurrects pages from snapshot.

The patterns:

1. **Always return a cleanup.** Every `addEventListener` pairs with `removeEventListener`. Every `setTimeout`/`setInterval` with a clear. Every `ResizeObserver`/`IntersectionObserver` with `disconnect()`.
2. **Guard one-time global setup against double-invocation.**
3. **Capture refs at effect start, not at cleanup.** A cleanup callback that closes over `ref.current` may see `null` by the time it runs. Save into a local inside the effect body and reference that local from the cleanup.
4. **Never depend on initial mount being the only mount.** Subscriptions, timers, and animations should produce the same observable state whether they run once, twice, or fifty times.

The smell that says you've broken this rule: "works the first time but breaks after a hot reload" or "double-fires animations in development." The fix is the cleanup, not a `useRef` flag papering over it.

---

# § Styling & Tokens

## No UI Runtime Libraries Without Cause

The site ships **zero UI runtime libraries** — no animation engine, no carousel library, no form library. Motion is CSS (see "Motion Grammars"); the interactive behaviours are small specced islands; forms are uncontrolled inputs feeding the Keystone route handlers. This is a feature: the homepage's route JS is measured in hundreds of bytes and the spec acceptance counts every island.

Before adding any dependency: demonstrate the need in the spec, check whether the existing islands or the `@keystone-sites/*` packages already cover it, and prefer the platform. A library that earns its place is added deliberately — never as a reflex.

---

## Styling Lives in the Token Layers

- **Design tokens for every color, font, radius, spacing, z, and motion value** — reference the custom properties from `design-system/v2/tokens/`. Never hardcoded hex or magic px in component CSS.
- **Structure rides the grid** — ticks (`--t`), the interpolation weights, em at anchor ratios, or fixed material px per band, per the four units (002.r1). See "Grid & Type Laws".
- **All custom CSS lives in the v2 layers** assembled by `v2/index.css`; dev-route QA styles in the route's css file.

### Inline `style={{}}` is allowed only for

1. **Forwarding a prop** the CSS cannot know — a per-card color role, a per-frame index.
2. **CSS custom properties** consumed by a stylesheet rule — the islands' `setProperty("--eng-x", …)` pattern and `style={{ '--gx': n }}` grid placement.
3. **Transient animation state** — `willChange` on an element about to move.

If a value never changes per instance, it belongs in a class.

### Hex values are tokens

Every hex color exists as a custom property in the v2 token layers. The token name describes the role, not the hue. Hardcoded hex inside component files is forbidden; the two commented cold-load literals in the root layout (the guard style and the theme-color, which no stylesheet can serve) are the standing exceptions.

### `!important` is forbidden

It is never the answer to a specificity fight — fix the cascade. The base reset's `[hidden]` rule is the one standing exception (part of the document contract).

### Repeated values become tokens

If the same literal appears in two places with the *same* design intent, promote it to a custom property. Two copies always drift. Motion constants promote at their second consumer (see "Motion Grammars").

---

## Fonts Are Licensed

Both site fonts — **GT Standard Standard VF** and **PP Kyoto Variable Upright** — are licensed and **not** on Google Fonts or Fontsource. Never `@import` them from a CDN or public URL; never commit them to a public mirror. Files live in `public/media/fonts/`, loaded via `@font-face` in `design-system/v2/tokens/fonts.css` and preloaded by the root layout. The axis facts, weight mappings, and per-step optical-size pins are the implementation contract in spec 001 — read it before touching type. (GT Standard's variable default weight is 900: every style sets an explicit weight or text renders Black.)

---

## SVG Export Rules

**Never export SVGs using Figma's Exclude / Boolean Subtract technique.** It creates a single path with transparent cutout holes that depend on a `background-color` in the HTML container to make the cutouts visible — and produces a white anti-aliasing halo around circular containers regardless of `overflow: hidden`.

Export flattened compositions instead: the background shape is one `<path>`, foreground letterforms or elements are separate `<path>` elements with explicit fills. The resulting SVG is self-contained.

If you receive an Exclude-style SVG from Figma, ask for a flattened re-export.

**Vector geometry is never hand-authored.** Icons and marks are exported verbatim from Figma through the console bridge; the only permitted edit is normalizing paint to `currentColor` where the icon tints with text. Shapes with no vector geometry — dots, plain circles and squares, the corner triangles — are built as CSS with token fills instead of exported files: the rule protects geometry, and a circle has none. (Specs 003 §6, 004 §7, 009 §9 — the CSS-dot doctrine.)

---

## Decorative SVG Has a Threshold

| Use | Where it lives |
|-----|----------------|
| Used once, decorative, ≤ ~20 lines of markup | inline in the component |
| Used twice or more, anywhere on site | an export in `v2/icons.tsx` with `color`/`size` props |
| Complex multi-layer artwork | SVG file in `public/media/`, registered in `v2/media.ts` |

A repeated icon collapses into one definition referenced N times. Either way, the SVG markup appears in source exactly once.

---

## Images Are Art-Directed Tier Sets

Sections render photography as `<picture>` with one media-gated `<source>` per width tier and the smallest tier as the `<img>` fallback — the tier cuts follow the structural gates (spec 002.r1), because tiers are art direction, not resolution steps; cut each at 2× its band's rendered frame size. Explicit `width`/`height` on every image; WebP only; empty `alt` for ambient photography. Eager/lazy and decode-priming follow each section's spec. `<source media>` is viewport-based and may lag the container band by a scrollbar width near a band edge — accepted as a density-only effect; geometry stays CSS-driven.

The deploy serves static assets directly (`images.unoptimized`); the tier markup, not an optimizer, is the delivery mechanism. Every asset path comes from the media registry (`v2/media.ts`) — see "Public Asset Naming & The Media Registry".

---

## The Z-Index Scale

Stop inventing z-index numbers. The tokens live in `v2/tokens/component.css` (`--z-base` · `--z-raised` · `--z-sticky` · `--z-nav` · `--z-modal` · `--z-portal`). Within a single component, small relative values (`z-index: 1/2/3`) may order siblings inside an *isolated* stacking context (the sections isolate; the lattice overlay sits at −1 by construction). The named tokens apply to anything that stacks against the rest of the page.

Define once. Reference everywhere. No raw numbers above `3` in component files.

---

## Motion Grammars

Motion is a vocabulary of named CSS grammars, not per-section improvisation. The global grammars live in `design-system/v2/tokens/motion.css`, each with a prose definition in the file: **draw-down**, **fade-rise**, the **chip wipe**, the **carousel slide**.

- **Reuse before inventing.** A new section reaches for an existing grammar first. A genuinely new grammar is named, defined in prose, and specced.
- **Design supplies intent; the spec chooses values.** Motion intent arrives from design in plain language; durations, curves, and staggers are chosen in the spec and approved with it.
- **Constants are born in the component token layer and promote at their second consumer** — to `tokens/motion.css`, values unchanged, prior names becoming aliases.
- **Alias, never fork curves.** A grammar that wants an existing curve aliases its token.
- **Open/close asymmetry.** Opens run the ease-in-out curve; closes run the ease-out. A hard shadow never paints while its box moves: the offset grows from 0,0 after the box lands and drops at once on close.
- **Choreographies settle** (002.r1): a load choreography ends its run explicitly, so band-gated display variants never replay animations on resize.
- **`prefers-reduced-motion: reduce` renders every grammar state-to-state** — no transitions, no timers, elements born in their settled state. A no-JS render shows the same settled state.

---

## Public Asset Naming & The Media Registry

Static media lives under `/public/media/`, organized by **function** (what the asset _is_): `hero-carousel/`, `portfolio/`, `engines/`, `testimonials/`, `brand/`, `fonts/`. Only site metadata kept at the public root for tooling conventions is exempt: favicons, `og-image.png`, and `site.webmanifest`.

`design-system/v2/media.ts` is the **central media registry** — the single source of truth mapping every asset to its path with a typed descriptor. Code never hardcodes an asset path; it references a registry entry or builder. The only literal paths allowed are the contexts that cannot import TS: `@font-face` rules in `fonts.css`, the root layout's preload hrefs, and favicon/og/manifest references in app metadata.

Before naming a new asset, scan the existing files in the target folder and match the naming pattern. If the folder has no pattern yet, use lowercase `kebab-case` with parts ordered most general to most specific.

Every name must be identifiable without opening the file. `rect4.png`, `img1.png`, `icon.svg` are not acceptable.

When an asset is replaced or made redundant, delete it (and its registry entry). Dead assets confuse readers and increase build size.

---

# § Layout & Responsive

## Responsive-Native

**Five anchors, nearest-anchor rendering.** The design exists at five anchor widths (384 · 576 · 768 · 960 · 1344); the tick is the page container's width ÷ 12, **capped at the rd2 anchor's 112px** (spec 002.r2, revised 2026-09-03 — previously uncapped pure zoom). Base CSS is the 384 design (mobile-first); the four structural switches (`rs` · `rt` · `rd1` · `rd2`) are gated by **container queries** — never media queries — at the bands' **geometric midpoints** (470 · 665 · 860 · 1130, spec 002.r1), so every width renders the nearest anchor's design: stretched below its anchor, compressed above the gate (worst-case zoom ~±20%). In a compressed slice the weights collapse to a pure zoom of the slice's anchor, so wrap counts and designed clearances hold by construction; from the anchor up, the designed interpolation lines run as before. Above 1344 the tick caps, the weights pin at exactly 0/1, and **the 1344 design renders byte-exact at every wider width**: the page box (12t) centers on a whole-pixel offset and the freed gutters paint the **side fields** — full-height lattice strips both sides, sparsely ornamented by a deterministic server-side hash, clipping mid-cell at the container edge, never animated (002.r2 §4; the fields carry their own `.gf-*` vocabulary so no choreography or audit selector collects them). Fixed chrome (the desktop nav bar and drawer) carries the page's `--page-x` offset. Below 384 the base band's line extrapolates downward. Type steps down at gates — invisible to fixed-width devices.

JavaScript that needs the current band measures the container (ResizeObserver) or reads computed style, never `matchMedia`. Mechanics: `docs/rebuild/reference/GRID-SPEC.md` (v5) as amended by specs 002 and 002.r1; the laws that emerged in the build are in "Grid & Type Laws" below. Every section is verified at all five anchors and at a width per structural slice, scrollbar forced on.

Always:

- Never use fixed pixel widths that overflow on mobile.
- Touch targets are at least 44 × 44 px on mobile.
- No hover-only interactions; every state must work on touch. Hover styles sit under hover-capable media.

---

## Grid & Type Laws

Laws discovered while building specs 002–009. GRID-SPEC.md v5 (as amended by specs 002 and 002.r1) remains the normative mechanics; these govern on top of it. Refer to them by name.

- **Hold-then-switch.** Interpolation runs between a band's two anchors only when both carry the same structure. When a band boundary is also a structural switch, the shared-anchor pair breaks: type holds its last designed value across the band and switches with the structure at the gate.
- **Size and line-height interpolate; weight and tracking are band constants**, restated per band and switching only at band boundaries.
- **Band constants ride the weights.** A designed value that is constant across a band is written `calc((wA + wB) * V)`, never `Vpx`. The sum resolves to 1px through the interpolation zones and collapses to the anchor zoom in the compressed slices, so the constant shrinks with the tick. The same construction carries wrap-pinning text columns and flow gaps. Fixed px is the four-units defect in its most common disguise: it broke the pricing wraps and the footer's rail clearance the day those sections met the compressed slices (011/004 errata, 2026-08-27).
- **Line-inclusive content boxes.** A bordered content box whose edge lies on exposed lattice is sized `k·t + 1px`, so its border lands on the line's canonical pixel (`[k·t, k·t+1)`). A box sized `k·t` exactly sits one pixel short and doubles the hairline (011 §9 R17). Touching boxes then share the edge pixel; z-order decides whose ink and shadow paint on top.
- **The four units (spec 002.r1).** Geometry rides ticks; text columns (wrap-pinning widths, text-block heights in flow margins) ride the weights; line-internal spacing (inline gaps, chip paddings) rides the type in em at exact anchor ratios; material (buttons, icons, marks, control inners) stays fixed px per band. A px value that encodes any of the first three is a defect — it breaks rag, fit, or clearance in the compressed slices. Constants that reference `--t` or the weights are declared on `.page`, never `:root`.
- **Choreographies settle (spec 002.r1).** A load choreography ends its run explicitly — the orchestrator marks the page settled on the final beat's `animationend` and the choreography's animations turn off. Band-gated display variants re-entering the tree then have nothing to restart, so resizing across gates never replays motion.
- **The tick wins.** A whole-tick box height governs over its declared padding sum. Where designed content hugs shorter than the tick height, the slack compresses padding or sits as clear space; content stays anchored per the spec.
- **Content clears the lattice (owner ruling, 2026-09-04).** Flowed content never touches a tick line or another block, and keeps **at least half a tick** of vertical clearance from the next section (or from a bottom-anchored block below it in the same frame). When populating a fixed-frame template with new content — the case-study pages are the archetype — the population pass is responsible for where the next block starts: an interior that runs longer than the drawn archetype grows its frame by **whole ticks** until the clearance holds, so the anchored block and everything below slide down and begin on the next tick. Copy never silently compresses the gap. **The painted lattice rides the growth** — grid cells drawn against content are anchored to it, not to the section top: the widenings beside a stat row and the tail rails shift down with the frame bottom, the leading rail extends, and ornaments move with the run they sit in. A painted cell that holds its drawn row while the content moves is the same defect as the collision it was drawn beside. (Found on the Bare Lúx overview, 2026-09-04: the checklist touched the bottom-anchored stat row; the template carries per-study whole-tick growth and the anchored lattice model for it — spec 017 §5.1 as amended.)
- **Derived states.** When design supplies one archetype state, siblings derive as the smallest whole-tick height that fits their content at the band's internals. The derivation rule is written in the spec and sanctioned by design.
- **Audits at rest.** Mid-flight motion may be transiently fractional-tick by design; the stack-sum and landmark audits are asserted at rest in every state. The harness also asserts **exposed-cell clearance** (spec 013 §7.3, closing the gap the footer's rail collision hid in until the 011 review): no landmark content box intersects a rendered exposed cell at any audited width; designed overlaps are declared in the page's expectations module, never tolerated silently. The assertion's first run caught the 007/008 button-bars colliding at compressed-slice widths (fixed as errata, 2026-08-28) — treat a clearance failure as that defect class first.
- **Material vs. tick-riding vs. proportional vs. overlay chrome.** Primitives are material: fixed px per size variant, never band-aware. Sections choose the size variant per band and own each instance's width. A spec may instead declare a primitive **proportional** (the 011 pricing-button): the control is drawn in units of its lattice cell — every interior value a designed-px-over-anchor-cell fraction — so a mount that passes the page tick scales the whole control with the grid, while the bare primitive renders the designed anchor size. The tell in the file: when a set's cells equal the band anchor ticks (32/48/64/80/112), the design is tick-riding drawn at 1:1 — read those px as `1t`. Overlay chrome (the nav) never participates in a section's tick stack.
- **Rendered truth over metadata.** Every landmark is verified against rendered bounds, never Figma metadata x/y — see "Figma Links Are Read Through the MCP".

---

## Layout Must Scale — No Fragile Positioning

A layout is fragile when it looks correct on one viewport size and drifts on any other. On this grid, structure is ticks and weights — a raw px position is almost always wrong (see "The four units").

### Absolute positioning is acceptable only for

1. **Media fills** — `position: absolute; inset: 0; object-fit: cover` on a relatively-positioned parent sized by the grid.
2. **The exposure vocabulary** — the engine's lattice regions, cells, and decors position absolutely by construction (`--gx`/`--gy` ticks).
3. **Overlay layers** — the nav chrome, modal backdrops, decorative pseudo-elements.
4. **True escape from document flow** — a viewport-fixed control, positioned relative to the viewport, not to variable content.

Everything else uses normal flow (flex, grid, block) so the layout responds to actual content and container size.

### Anti-patterns

| Anti-pattern | Why it breaks | Fix |
|--------------|---------------|-----|
| Fixed px coords from Figma's ruler | Correct at one canvas size; wrong everywhere else. | Ticks/weights, flex order + margin. |
| Fixed px widths on text containers | Clips or re-rags off-anchor. | Weight-riding wrap boxes (002.r1 §4). |
| Fixed px heights on sub-containers | Breaks the tick stack. | Whole-tick heights; "The tick wins". |
| `line-height: 0` as a spacing hack | Resets must propagate through every child. | Flex column + gap. |
| Magic gaps | Don't adapt across bands. | Tick or em expressions per the four units. |

---

# § Effects & Hydration

## Browser APIs Live Inside Effects (Hydration Is Sacred)

`window`, `document`, `navigator`, and any DOM measurement API run only inside `useEffect`, `useLayoutEffect`, or event handlers. Never at module scope, never at the top of a component body, never in a `useMemo` initialiser that runs synchronously on the server.

The first client render must produce React output that matches the SSR HTML byte-for-byte. Common hydration-mismatch sources:

1. **`Math.random()` / `Date.now()` during render** — sampled twice (server, client), never matches. Move to `useEffect`, or pre-compute on the server and thread down as a prop.
2. **`new Date().getFullYear()` (or any wall-clock read) during render** — usually identical, mismatches across midnight UTC. Thread as a prop from a server component, hardcode, or wrap the span in `suppressHydrationWarning` if the brief flash is acceptable.
3. **`typeof window !== 'undefined'` short-circuits that change render output** — keep the gating value `null` through SSR *and* the first client render, then flip after hydration.
4. **Locale-sensitive formatting during render** — format on the server with an explicit locale, pass the string down.

### Client-only state initialised after hydration

The portal-target case is the canonical example. SSR has no `document.body`; the client does. Hydration-safe:

```ts
const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setPortalTarget(document.body);
}, []);
```

This is the **only** approved use of `setState` inside a top-level `useEffect` body. Every other case has a better tool (event handler, derived render, ref). The lint disable is required and is always paired with a comment pointing back to this guidance.

A `useMemo` that returns `document.body` on the client (and `null` on the server) is **not** equivalent: `{portalTarget && createPortal(...)}` produces an extra fiber on the client that the SSR HTML lacks.

### Layout reads belong in `useLayoutEffect`

`getBoundingClientRect()`, `offsetWidth`, `scrollHeight`, and similar run in `useLayoutEffect` so the read happens after layout but before paint. A regular `useEffect` works but produces a flash when paint commits before the read drives a follow-up update.

---

## UI Coordinates Through Events, Not Timers

`setTimeout` is not a synchronisation primitive. If you're waiting "for the layout to settle", "for the focus to land", "for the next paint", or "for the panel to be visible", there is a real event to listen to.

| Wait reason | Use instead |
|-------------|-------------|
| Wait for a CSS animation | `animationend` (the settle contract is built on it) |
| Wait for a CSS transition | `transitionend` |
| Wait for an image | `decode()`, `load` |
| Wait for the next paint | `requestAnimationFrame` |
| Wait for an element to focus correctly | `focus({ preventScroll: true })` called synchronously in the right effect |

`setTimeout` is fine for things that genuinely fire on a timer — auto-advancing carousels, debounce intervals. It is not fine for "I think this should be ready by now."

---

## CSS Transition Constraints

- **`transition-colors` does not work on gradients.** CSS cannot interpolate between a solid color and a `background-image`. To animate a gradient in/out: keep the element's solid color, place an absolutely-positioned child containing the gradient, and transition that child's `opacity`.
- **A CSS color transition is overridden by an inline `style` color.** The inline style wins at every point in the transition. Apply the inline style only when active and let the CSS class handle the default and the easing.
- **`mix-blend-mode: luminosity` and a transitioning parent background interact badly.** Use a CSS `filter` for desaturation on any element whose background also transitions (the portfolio's desaturation directive, spec 007).
- **Never start a `translate`/transform transition inside an element whose paint is transitioning.** The transition promotes the child to a compositor layer, and the layer's creation re-rasters the ancestor mid paint-transition — a one-frame flicker that survives `will-change` (found on the button glyph 2026-08-25; re-hit on the pricing-button circle 2026-08-27). Animate a paint-in-place offset instead — relative `left` for the small moves this site makes (the 003 glyph doctrine). `translate` stays fine where no ancestor paint transitions (the nav and card mosaics).

---

## Body Scroll Locking Has One Approved Approach

`document.body.style.overflow = 'hidden'` is a footgun on iOS Safari: it often doesn't prevent touch scroll and it loses the scroll position on close.

The single approved entry point is `design-system/v2/lib/scroll-lock.ts`. Every overlay calls `lockScroll()` and stores the returned unlock callback as its effect cleanup. The technique (fixed body at `-scrollY`, `overflow-y: scroll` to keep the scrollbar gutter so the container width the grid reads never changes) is documented in the module.

Never set `document.body.style.overflow` directly from a component. Never invent a parallel scroll-lock helper. New edge cases update the module.

---

## No Raw Console Logging in Shipped Code

`console.log` calls survive code review by accident, ship unconditionally, and have no single off switch. The v2 islands currently ship none — keep it that way. When diagnostics become genuinely necessary, add **one** central logger module with channel names and build-time/runtime kill switches, and route everything through it. `console.warn`/`console.error` for developer-must-see conditions are acceptable in the interim, sparingly.

---

# § Accessibility

## Accessibility Baseline

- All images have meaningful `alt` text. Decorative and ambient images use `alt=""`.
- Every interactive element is keyboard-navigable and has a visible `:focus-visible` style.
- `prefers-reduced-motion: reduce` renders every grammar state-to-state (see "Motion Grammars") — no transitions, no timers, elements born settled. A no-JS render shows the same settled state.
- Auto-rotation pauses on hover and focus; timers run only in-viewport with the document visible (the spec 009 timer discipline).
- Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text/UI); spec acceptance carries the measured ratios.

### Semantic HTML before ARIA

Use the native element if one exists. Lists are `<ul><li>`, not `<div role="list">`. Buttons are `<button>`, not `<div onClick>`. Navigation is `<nav>`. Testimonials are figures with blockquotes and captions (spec 009 §8.5 is the reference shape).

### No interactive `<div>`

Anything the user can click, hover, focus, or activate as a *control* is a `<button>` or `<a>`. A `<div>` with an `onClick` skips the focus ring, the keyboard activation, and the assistive-tech announcement that come for free. Style the button to not look like a button if the design calls for it; never start with the wrong element.

The narrow exception is **modal backdrop dismissal**: a backdrop `<div>` whose `onClick` closes when the click target *is* the backdrop. Keyboard dismissal still wires through Escape, and the dialog still contains a real focusable close affordance.

### Focus management

When an overlay opens, focus moves into it — by default to the container (`tabIndex={-1}`), not to the first input (auto-focusing an input surfaces password-manager dropdowns uninvited). When it closes, focus returns to the element that opened it. Use `focus({ preventScroll: true })` in both directions.

### Decorative SVGs and chrome

Decorative SVGs use `aria-hidden="true"` and no `alt`. Meaningful SVGs use `role="img"` plus an accessible name. The lattice chrome, ornament cells, and clone slides are `aria-hidden`; the accessibility tree carries only real content.

---

# § Forms & Data

## Forms Stay Small and Uncontrolled

The site's forms are tiny (the grader input, a future signup): an uncontrolled `<form>` with `new FormData(e.currentTarget)` in the submit handler. Anything more elaborate (per-character `useState`, manual JSON assembly) is over-engineered.

The network call, response validation, and the `idle | submitting | success | error` lifecycle live in a single hook the form consumes; the form decides what the states look like. Submissions go through the Keystone route handlers (`app/api/form`, `app/api/chat` — `@keystone-sites/core`).

Validation lives in the form definition, never as ad-hoc `if (!value.trim()) return` strewn through the submit handler. If a genuinely complex multi-field validated form arrives, choose a form library deliberately then (see "No UI Runtime Libraries Without Cause").

---

# § Project Conventions

## Never Delete Pages or Routes

- Do not delete pages, route handlers, or config files without explicit instruction. (The 2026-08-27 purge of the old-brand site was such an instruction — recorded in plan.md's decision log.)
- If a page or route looks unused, add a comment flagging it. Do not remove it.

This rule does not block refactoring of internal code: utility modules, helper functions, and components may be moved or merged when the replacement preserves observable behaviour. The boundary is the URL surface (and other public contracts) — those never disappear silently.

---

## Site Scope

One site lives in this tree: the **new-brand rebuild** (sitemap: Home · Our Work · Solutions · Pricing · Company · Resources), built phase by phase under `design-system/v2/` per [`docs/rebuild/plan.md`](../rebuild/plan.md). Launch is **big-bang** (owner decision 2026-08-27): nothing deploys until the site is complete; the old-brand site ships from `main` until then.

`/` renders the assembled homepage. The dev routes (`/grid`, `/primitives`, `/footer`, `/nav`, `/hero`, `/portfolio`, `/engine`, `/testimonials`, `/home-fixture`) are permanent QA surfaces and noindexed. The nav links to pages that do not exist yet 404 by owner decision (spec 010 §7 F1) until those pages are built.
