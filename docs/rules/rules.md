# Site Rules

Non-negotiable standards for this codebase. Read this before touching a file.

Rules are grouped by theme and titled, not numbered for posterity — refer to them by title in code comments and PRs so renumbering never invalidates a reference.

---

# § Process & Workflow

## Specs Come First

**Never write code before there is a spec.** The flow:

1. Designer writes a spec in `docs/specs/` describing what the section looks like and how it behaves. Numbered `001_…`, `002_…`, sequential and never reused.
2. Spec is approved before any implementation begins.
3. Implementation traces back to something in the spec. Out-of-spec work stops to update the spec first.
4. Acceptance criteria are checked off in the spec when verified.

Specs are written for a non-technical Figma-literate reader, in design language only:

- **Visual language, not engineering language.** Describe colors, sizes, spacing, and motion in plain words ("the site's dark green", "a quick fade"). No component names, libraries, CSS properties.
- **Figma link for every visual state.** Start, end, and intermediate states — implementer reads exact values from Figma, not from the spec.
- **No exact values.** No hex codes, pixel measurements, font sizes, or timings. These live in Figma. Project breakpoints (768 px, 1280 px) are the only allowed numeric values.
- **Every visual state described.** Pre-interaction, during, and complete. Anything missing will be guessed.
- **Scroll/animation as observable outcomes.** "The headline slides off the top of the screen" — what the visitor sees, not what code achieves it. Cover trigger, what moves, direction, distance, scroll- or time-based, reversibility.
- **Responsive behaviour explicit.** What is hidden, scales, or repositions at mobile / tablet / desktop. Engineers must not infer it.
- **Edge cases noted.** At minimum: mobile and `prefers-reduced-motion`.
- **Acceptance criteria observable.** "The headline slides fully off-screen" — verifiable in a browser by a non-engineer. Never code-shaped.
- **No code snippets.** Ever.

---

## Specs Are Immutable

Specs are append-only, like database migrations. Once a spec exists, its body is not edited to reflect new behaviour, new defaults, or new intent. The `Status` line and acceptance-criteria checkboxes within an existing spec may be updated as that spec is implemented and verified — nothing else.

When the design intent changes, write a **new spec** with the next sequential number. The new spec describes what is changing and why, and lists the prior spec under `Depends on:`. The old spec stays exactly as it was — a frozen statement of what the design intended at the time it was written.

This matters because specs are referenced from code comments, commit messages, and other specs by their number. Editing an old spec invalidates every reference to it without warning. A reader who follows a `// see Spec 011` comment expects to find what Spec 011 said when the comment was written — not a later edit.

Two exceptions exist for revising the same section:

- **`.r1`, `.r2` suffixes on the same number** — a focused revision of one section that supersedes earlier revisions of that same section (`002_work_showcase.md` → `002_work_showcase.r1.md` → `002_work_showcase.r2.md`). Use this when the revision is contained to one section's visual design.
- **A new sequential number with a `_refresh` (or similar) suffix** — a substantive redesign that needs to live alongside the original (`007_productscreens.md` → `024_product_screens_refresh.md`). Use this when the change is large enough that future readers benefit from seeing both side by side.

In both cases the prior spec is left unedited.

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

Branch names: `feature/`, `fix/`, `docs/`, `chore/`. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:`, `perf:` followed by an imperative summary.

One commit = one logical unit of work. `npx tsc --noEmit` and `npm run lint` must pass before every commit. `git push --force` to `main` is forbidden. PRs squash to a small number of logical commits before merge.

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

- **Components:** Many marks, icons, and decorative shapes are inline React components with prop-driven color and size. An SVG file in `public/` is never the right answer when a component already serves the same role.
- **Assets:** Check `public/` before adding a file. Figma exports often duplicate already-committed assets. Two copies will diverge.
- **Design tokens:** Check `[data-theme="custom"]` in CSS before writing any color, spacing, or font value.
- **Library utilities:** Check `keystone-design-bootstrap` and other installed packages before writing helpers.

**The Figma MCP does not know the codebase.** It exports whatever Figma contains, including assets and shapes already implemented. Always cross-reference its output before committing.

**The Figma MCP names assets with SHA hashes** (`bf2d9cdd….svg`). These names are meaningless and never ship. Rename to descriptive kebab-case or delete if the asset already exists under another name.

---

## Plain Text Contains Plain Characters

User-facing strings use literal Unicode characters. Apostrophe is `'`, ampersand is `&`, emoji is the emoji. Escapes like `\u2019`, `\u0026`, `\uD83D\uDC3E` belong only where a literal cannot appear (regex normalisation, identifiers).

**The one exception is invisible characters whose presence is significant** — `\u00a0` (NBSP), `\u200d` (ZWJ), `\u202f` (narrow NBSP). A literal NBSP is indistinguishable from a regular space in source and silently changes layout; the escape makes intent reviewable. Comment the line so the reason is obvious.

---

## Magic Numbers Get Names

Any number that means something gets a constant. Animation timings, beat positions, character durations, stagger amounts — they read as opaque magic until they have names.

The reference pattern for animated components is a small block of named constants at the top of the file (`LINE_STAGGER`, `BEAT_DURATION`, `BEAT_STARTS`, …) that the timeline references by name. A designer can read the constants block, change a value, and know exactly what they changed.

The same applies in CSS: a delay or duration repeated across rules belongs in a custom property; a repeated `cubic-bezier(...)` becomes a named easing token referenced everywhere.

---

## Comments Explain Why, Not What

Comments that narrate what the next line does are noise. `// Increment counter` above `counter++` is read once, ignored, and drifts.

Useful comments capture:

- A non-obvious *why*: "We snap to `p`, not to `1`, because `1` would target an internal proxy that `gsap.killTweensOf` cannot reach."
- A constraint the code cannot express: "Hardcoded mapOffset values come from Figma per industry — see spec 012."
- A trade-off that survived a discussion: "ScrollSmoother applies a transform to `#smooth-content`, so fixed positioning breaks for descendants — that's why this modal portals into `document.body`."

Block-letter `// =================` banners that label "what the next 200 lines render" are not comments — they're a substitute for splitting the file. The right fix is the split.

When in doubt, delete the comment and let the code speak. Naming a variable, extracting a function, or adding a type often replaces a comment with structure.

---

# § Architecture

## Server vs Client Components

Default to **Server Components**. Add `'use client'` only for: GSAP animations (`useLayoutEffect`, `useRef`), browser APIs (`window`, `document`), React state or effects, or event handlers.

Never put `'use client'` on page-level files (`app/*/page.tsx`). Push interactivity into leaf components. Never call API fetch functions inside client components.

---

## Component Organization

All components under `components/`. Section components (one per Figma section) in `components/sections/`. Reusable elements in `components/elements/`. Each subfolder has an `index.ts` barrel. One component per file. Named exports only.

---

## Files Stay Small

A component file past ~500 lines is a missing folder. Long files hide structure, make every diff noisy, and let unrelated concerns drift together. The split pattern:

1. Create `components/sections/<section>/` with an `index.ts` barrel.
2. Move the top-level section to `<section>/<Section>.tsx`.
3. Move each visually distinct sub-component (each card variant, each modal, each shape primitive) to its own file.
4. Section-private types go in a colocated `types.ts` re-exported through the index.

The rule is about ceilings, not floors. A 200-line section is fine; a 3000-line file is not. The signal is "I cannot hold the whole file in my head."

The same applies to data — a section's content array does not belong in the same file as its component.

---

## Sub-component Boundaries Are Real

A "sub-component" buried inside the same file as its parent is still its own component. If `WorkShowcase.tsx` defines `SalesCard`, `AdsCard`, `SocialCard`, `WebCard`, `ContentCard`, and `ListingsCard` inline, those are six components hiding in one file.

A thing is a sub-component when:

- It has a discrete prop interface and a discrete output.
- It can be reasoned about without reading the parent's render.
- It would have a name in the spec.

Pure layout primitives (wrapper divs, flex rows that exist only to lay out children) stay inline.

---

## Everything Is Prop-Driven

- **No hardcoded content in components.** Every string, image URL, color variant, label, and configuration is a prop.
- TypeScript interfaces for every component. Never `any`. Never `object`.
- Default prop values only for layout/style options (`variant`, `size`), never content.
- Server components fetch data and pass it down. Client components receive data as props.

---

## Page Files Compose, Data Files Hold Data

A page file's job is to mount components and pass them props. It is not a content store.

A page running into hundreds of lines of inline data (industry definitions, message threads, photo paths, slide quotes) is a missing data module. That data lives under `data/` — one file per section, exporting the typed arrays the page imports. The page ends up short enough to read in one screen.

`.tsx` if the data contains JSX (small avatars, inline SVGs); `.ts` otherwise. Use the typed exports the section already provides — `WorkCardData[]`, `WorkIndustry[]`, etc.

---

## One Source of Truth for State

A piece of state lives in exactly one place. Either React owns it and the animation library reads it, or the animation library owns it and React reads it. Not both.

The smell: `flushSync(() => setActiveIndex(newIndex))` from inside an animation callback. That tells you React state and the timeline are racing and `flushSync` is suppressing the race rather than fixing it. Pick one owner — drive the value from React `useState` and let the timeline read via a ref, or drive it from the timeline and treat React as a passive observer.

Same for scroll position (ScrollSmoother owns; React reads via API), focus (the DOM owns; React calls `.focus()`, reads via events), and form state (React Hook Form owns; uncontrolled inputs flow into it).

---

## No Module-Level Mutable State

A `let` declared at the top of a module that one component reassigns and another reads is a hidden global. Works in development, fails in tests, breaks under React Strict Mode, leaks across navigations.

A common temptation is a module-level `Map` shared across sections, justified as "fine because we don't want re-renders." The right tool is a React context whose value is a `useRef` (or a small imperative API memoised with `useMemo`) — lifetime scoped to the React tree, dependency visible on the component graph, fresh per render in tests.

Acceptable module-level state:

- `const` registries that never change after import.
- A single `gsap.registerPlugin()` call.
- An exported `let` assigned exactly once during module evaluation.

Anything else — caches, handoffs, "current state" trackers — uses React state, refs, or events.

---

## Prefer Native CSS State Over JavaScript State

If a state can be expressed via `:hover`, `:focus-within`, `:focus-visible`, `:has()`, `data-*` attributes, or media queries, use CSS. A `useState` whose only job is to add a class on focus is wasted memory, an extra render, and a hydration risk.

Canonical example — floating-label input: a naive version tracks `isFocused` and `hasValue` with `useState`. Both are derivable from the input's own DOM: `:focus-within` for focus, `:not(:placeholder-shown)` for has-value (use `placeholder=" "` so the pseudo-class is meaningful).

JavaScript state is appropriate when:

- The state must be observed by code outside the affected element.
- It cannot be derived from CSS pseudo-classes (multi-selection, debounced flags).
- An animation library must read it to drive an animation.

---

## Discriminated Unions Over String Sniffing

Type-narrow with a discriminator field, never with string matching on names. Code like `if (field.name.includes('phone'))` is the anti-pattern — the next field that needs that branch will not be named that way and the bug is invisible until production.

Every variant carries an explicit `type` literal. Every consumer narrows on that literal. TypeScript fails the build if a new variant is added without handling. A renderer is a single exhaustive `switch`.

If the source data lacks a discriminator (an external schema), classify it once at the boundary into a closed union and switch on that — never re-sniff strings at every render.

---

## Data Models Are Typed at the Boundary

The shape of every external response is parsed and typed before it enters the app. A response from `fetch('/api/form')` is not `{ success: boolean }` just because someone wrote `as { success: boolean }` — the cast lies the moment the API changes.

The pattern:

1. Declare the response type once.
2. Validate the parsed body against it (Zod, Valibot, or a small hand-written `parseFooResponse(raw: unknown)` validator — pick one approach, stay with it).
3. Use the validated value, not the raw `.json()` result.

A hand-written validator takes `unknown`, narrows with `typeof === 'object'` checks, and returns a typed result with safe defaults. It is the simplest version of the rule.

Third-party SDKs that already return typed responses are trusted — the cast at *our* boundary is what is forbidden.

---

## Effects Are Idempotent

Every `useEffect`, `useLayoutEffect`, animation context, and event listener must be safe to set up, tear down, and set up again. React Strict Mode mounts components twice in development. HMR reloads single files. Browser bfcache resurrects pages from snapshot.

The patterns:

1. **Always return a cleanup.** Every `addEventListener` pairs with `removeEventListener`. Every `gsap.context(() => …)` pairs with `ctx.revert()`. Every `gsap.matchMedia()` pairs with `mm.revert()`. Every `setInterval` with `clearInterval`. Every `IntersectionObserver` with `disconnect()`. ScrollTriggers are killed implicitly by `gsap.context.revert()` — never wire one outside a context.
2. **Guard one-time global setup against double-invocation.** `ScrollSmoother.get()?.kill()` before `ScrollSmoother.create(...)` ensures the previous instance is torn down before a new one is created.
3. **Capture refs at effect start, not at cleanup.** A cleanup callback that closes over `ref.current` may see `null` by the time it runs. Save into a local inside the effect body and reference that local from the cleanup.
4. **Never depend on initial mount being the only mount.** Subscriptions, timers, and animations should produce the same observable state whether they run once, twice, or fifty times.

The smell that says you've broken this rule: "works the first time but breaks after a hot reload" or "double-fires animations in development." The fix is the cleanup, not a `useRef` flag papering over it.

---

# § Styling & Tokens

## Use Robust Libraries for Complex Things

| Concern | Library |
|---------|---------|
| Animations | GSAP (see `docs/explainers/animations.md`) |
| Carousels / sliders | Embla Carousel |
| Forms | React Hook Form |
| Icons | `@untitledui/icons` |

Don't roll custom animation logic with `requestAnimationFrame` or `setInterval`. Don't add a library for something that fits in five lines of CSS or one Tailwind class. Before installing anything new, check whether existing dependencies already cover it.

---

## Styling: Tailwind, Tokens, Custom CSS

- **Tailwind for layout and spacing** — flex, grid, padding, margin, width, height, display. Don't write custom CSS for what Tailwind handles in one class.
- **Design tokens for colors, fonts, radius** — reference CSS custom properties from `[data-theme="custom"]` in `styles/custom-overrides.css`. Never hardcoded hex values in class names.
- **Arbitrary Tailwind values only for one-off exceptions.** Repeated `[value]` is a missing token.
- **All custom CSS in `styles/custom-overrides.css`.** No CSS modules, styled-components, emotion, `<style>` tags.

### Inline `style={{}}` is allowed only for

1. **Forwarding a prop** the CSS cannot know — a per-card background color, a per-pill `left/top` percentage, a per-image rotation.
2. **CSS custom properties** consumed by a stylesheet rule — `style={{ '--ws-natural-w': '868px' }}` paired with `width: calc(var(--ws-natural-w) * var(--ws-card-scale))` in CSS.
3. **GSAP transient state** — `willChange: 'transform'` on an element about to animate.

If a value never changes per instance, it belongs in a class. The same `fontFamily` repeated twenty times is a missing class.

### Hex values are tokens

Every hex color used by more than one element exists as a CSS custom property in `[data-theme="custom"]`. The token name describes the role (`--color-pricing-tagline`), not the hue (`--color-mint-green`). One-off truly singular values may stay raw, with a comment explaining why no token applies.

Hardcoded hex inside component files is forbidden. A component asks for a color via prop; the page or token system supplies it. Every chip color, photo overlay, and gradient stop comes through as a string from page-level data — components never reach for `'#4f4d4a'` directly.

### `!important` has one approved use

Forbidden everywhere it's used to win a specificity fight. The only acceptable case is overriding GSAP's inline `transform`/`transition` in a `prefers-reduced-motion: reduce` media query, because GSAP's inline style outweighs any class. Even there, prefer killing the GSAP timeline itself.

### Repeated arbitrary values become tokens

If `text-[#4f4d4a]`, `text-[12px]`, or `tracking-[-0.12px]` appears in two places with the *same* design intent, promote it — to a CSS custom property if it's a design token, to a Tailwind utility class if it's a layout primitive. Two copies always drift.

The exception is per-instance values inside a `ScaledMockCard` (see the ScaledMockCard rule below) — the same hex/font/size repeated across mock UIs is intentionally bespoke per mock.

---

## Fonts Are Licensed

The FK font family (FK Screamer, FK Grotesk Neue Trial, FK Grotesk Mono Trial, FK Roman Standard Trial, FK Screamer Legacy Trial) is licensed and **not** on Google Fonts or Fontsource.

- Don't `@import` FK fonts from a CDN or public URL.
- Font files live in `public/fonts/` and load via `@font-face` in `custom-overrides.css`.
- Until files are provided, use system-font fallbacks in development — never ship without the real fonts.
- Read `styles/custom-overrides.css` for exact font names and weights.

---

## SVG Export Rules

**Never export SVGs using Figma's Exclude / Boolean Subtract technique.** It creates a single path with transparent cutout holes that depend on a `background-color` in the HTML container to make the cutouts visible — and produces a white anti-aliasing halo around circular containers regardless of `overflow: hidden`.

Export flattened compositions instead: the background shape is one `<path>`, foreground letterforms or elements are separate `<path>` elements with explicit fills. The resulting SVG is self-contained.

If you receive an Exclude-style SVG from Figma, ask for a flattened re-export.

---

## Decorative SVG Has a Threshold

| Use | Where it lives |
|-----|----------------|
| Used once, decorative, ≤ ~20 lines of markup | inline in the component |
| Used twice or more, anywhere on site | extract to `components/elements/` with `color`/`size` props; variant differences become a `variant` prop |
| Complex multi-layer artwork | SVG file in `public/`, loaded via `next/image` or `<img>` |

A repeated icon collapses into one inline definition (a `CheckmarkIcon` defined once near the top of a section, referenced N times). A duplicated icon across two section files collapses into a shared element. Either way, the SVG markup appears in source exactly once.

---

## Use `next/image` Until It Costs You Performance

`<img>` is forbidden unless `next/image` measurably hurts the page — that's the meaning of `@next/next/no-img-element`. `// eslint-disable-next-line` requires a real reason, not "the image is small."

Approved reasons:

- The image is part of a *layered SVG composition* inside a transform-scaled mock (see ScaledMockCard below). `next/image`'s lazy-loading and srcset machinery interact badly with the transform stack.
- The image is a `data:` URI generated at runtime.
- The source is a same-origin SVG and `next/image` rejects it for unrelated reasons.

Every `eslint-disable` for `no-img-element` carries a justifying comment. If an entire file is exempt for the same reason (e.g. a section that is mostly `ScaledMockCard` instances), write the explanation **once** as a block comment at the top and let the inline disables stand as bookkeeping. Dozens of identical disable comments without explanation means the rule is being treated as a nuisance — fix the cause or document at the file level.

---

## Pixel-Perfect Mocks Use One Approved Scaling Pattern (`ScaledMockCard`)

When the design demands pixel-perfect reproduction of an external interface — an iPhone chat UI, a Meta ad, a search-listings card — use the `ScaledMockCard` pattern. Internal pixel values stay exact; the whole card scales via a single CSS transform.

The pattern:

1. Outer container carries the natural Figma dimensions as CSS custom properties (`--ws-natural-w`, `--ws-natural-h`).
2. A child wrapper is sized to those natural dimensions; `transform: scale(...)` shrinks it to fit.
3. Outer container's actual layout size is `naturalWidth * scale` so flex and Embla measure correctly.

Inside that wrapper:

- **Hardcoded pixel positions and sizes are not a layout violation.** They are part of the mock and they scale together. Don't retrofit pixel-perfect mocks to use proportional layout — they will lose fidelity.
- **Inline typography is exempt** from the "extract repeated arbitrary values" guidance. Each mock UI mimics a different external interface (Instagram's Inter, a vintage menu's Josefin Slab, a search listings card's specific Roboto). Those font/size/letter-spacing values are part of the per-mock visual identity, not theme tokens. Keep them inline at the JSX where the mock is composed.

Outside that wrapper (real site UI), normal layout rules apply in full and pixel positions are forbidden.

The reference implementation lives in the WorkShowcase section.

---

## The Z-Index Scale

Stop inventing z-index numbers. Tokens defined once in `styles/base.css`:

| Layer | Token | Used for |
|-------|-------|----------|
| Base content | `--z-base` (or no z-index) | Document flow |
| Raised content | `--z-raised` | Card lifted on hover, active tab |
| Sticky chrome | `--z-sticky` | Pinned navs, sticky footers |
| Site nav | `--z-nav` | Navigation painting over sections |
| Modal | `--z-modal` | Modal dialog itself |
| Portal | `--z-portal` | Portaled content above ScrollSmoother's transform |

Within a single component, small relative values (`z-[1]`, `z-[2]`, `z-[3]`) may order siblings inside an *isolated* stacking context (e.g. layered photos in one card). The named tokens apply to anything that stacks against the rest of the page.

Define once. Reference everywhere. No raw numbers above `3` in component files. No raw numbers in stylesheets.

---

## Public Asset Naming

All static assets live in `/public/`. Section assets go in a section subfolder (`/public/work-showcase/`).

Before naming a new asset, scan the existing files in the target folder and match the naming pattern — separators, prefixes, ordering, casing. If the folder has no pattern yet, use lowercase `kebab-case` with parts ordered most general to most specific (`health-ads-photo-1.png`, not `photo1-ads-health.png`).

Every name must be identifiable without opening the file. `rect4.png`, `img1.png`, `icon.svg` are not acceptable.

When an asset is replaced or made redundant, delete it. Dead assets confuse readers and increase build size.

---

# § Layout & Responsive

## Responsive-Native

Three primary viewports must all work:

| Breakpoint | Width | Tailwind prefix |
|------------|-------|-----------------|
| Mobile | < 768 px | (base) |
| Tablet | 768 – 1279 px | `md:` |
| Desktop | ≥ 1280 px | `lg:` |

- Design from the **desktop** (Figma is 1440 px wide), then adapt down.
- Test every section at all three breakpoints before considering it done.
- Never use fixed pixel widths that overflow on mobile.
- Text scales gracefully — 216 px headlines need deliberate reductions on tablet/mobile.
- Touch targets are at least 44 × 44 px on mobile.
- No hover-only interactions; every state must work on touch.

---

## Layout Must Scale — No Fragile Positioning

A layout is fragile when it looks correct on one viewport size and drifts on any other.

### Absolute positioning is acceptable only for

1. **Media fills** — `position: absolute; inset: 0; object-fit: cover` on a relatively-positioned parent sized via `aspect-ratio` or flex.
2. **GSAP animation states** — initial `transform`/`opacity`/`y`/`x` set inside a `gsap.context()` that reverts on unmount.
3. **Overlay layers** — modal backdrops, decorative pseudo-elements, gradient overlays.
4. **True escape from document flow** — a viewport-fixed close button, a pinned nav. Position is defined relative to the viewport or modal, not to variable content.

Everything else uses normal flow (flex, grid, block) so the layout responds to actual content and viewport size.

### Anti-patterns

| Anti-pattern | Why it breaks | Fix |
|--------------|---------------|-----|
| Fixed px coords (`top: 415px`, `left: 30.71px`) | Came from Figma's ruler at one canvas size; correct nowhere else. | Flex order + margin, or % of a proportionally sized parent. |
| `calc(50% + Npx)` + `translateX(-50%)` for off-center | The `Npx` shift doesn't scale across phone widths. | `margin-inline: auto` + padding, or a named grid column. |
| Fixed px widths on text containers | Clips or whitespaces on non-reference devices. | `max-width` + `width: 100%`, or `min(Xpx, calc(100% - 48px))`. |
| Fixed px heights on sub-containers | Rigid box that ignores screen height and font size. | `aspect-ratio`, `min-height`, or `vh`/`svh`. |
| `line-height: 0` as a spacing hack | Resets must propagate through every child. | `display: flex; flex-direction: column; gap: Xpx`. |
| Magic gaps (`gap: 227px`) | Doesn't adapt to narrower desktops. | `gap: clamp(24px, 15vw, 227px)`. |

### Proportional collage pattern (footer reference)

1. Outer container has fixed `aspect-ratio` from the Figma canvas — height is always a fixed fraction of width.
2. `padding` and `gap` in `vw` so all breathing room scales with viewport.
3. `font-size` in `vw` so text height equals row height at every width. Mobile-only sections (`md:hidden`) need no min/max cap.
4. Video clips `flex: 1; min-width: 0` fill all unused space proportionally.
5. Invisible `flex: 1` spacer between two text blocks holds proportional space without a video.

The math is documented in the comment block at the top of `styles/sections/oversized-footer.css` and `styles/sections/mobile-footer.css`. Read those before building any new collage.

### Mobile section pattern

Mobile sections pinned full-screen (`height: 100vh`) may use `calc(N / 852 * 100%)` for **vertical** positions because `100%` equals `100vh` — a stable proportional base. Y axis only.

X axis must use one of:

- `left: 50%; transform: translateX(-50%)` for centering.
- `padding-inline: 24px` (or the section's standard gutter) for edge-aligned content.
- `width: calc(100% - 48px)` with `margin-inline: auto` for full-width-minus-gutter.
- Flex or grid for multi-column content.

---

# § Effects & Hydration

## Browser APIs Live Inside Effects (Hydration Is Sacred)

`window`, `document`, `navigator`, and any DOM measurement API run only inside `useEffect`, `useLayoutEffect`, or event handlers. Never at module scope, never at the top of a component body, never in a `useMemo` initialiser that runs synchronously on the server.

The first client render must produce React output that matches the SSR HTML byte-for-byte. Common hydration-mismatch sources, in order of how often they sneak in:

1. **`Math.random()` / `Date.now()` during render** — sampled twice (server, client), never matches. Move to `useEffect`, or pre-compute on the server and thread down as a prop.
2. **`new Date().getFullYear()` (or any wall-clock read) during render** — usually identical, mismatches across midnight UTC. Thread as a prop from a server component, hardcode, or wrap the span in `suppressHydrationWarning` if the brief flash is acceptable.
3. **`typeof window !== 'undefined'` short-circuits that change render output** — a `useMemo` that returns `document.body` on the client and `null` on the server *and* gates a fiber (`{target && createPortal(...)}`) produces a mismatched tree. Keep the gating value `null` through SSR *and* the first client render, then flip after hydration.
4. **Locale-sensitive formatting during render** — `toLocaleDateString` reads the request locale on the server, the browser locale on the client. Format on the server with an explicit locale, pass the string down.

### Client-only state initialised after hydration

The portal-target case is the canonical example. SSR has no `document.body`; the client does. Hydration-safe:

```ts
const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setPortalTarget(document.body);
}, []);
```

This is the **only** approved use of `setState` inside a top-level `useEffect` body. Every other case has a better tool (event handler, derived render, ref). The lint disable is required (the rule fires on every such pattern) and is always paired with a comment pointing back to this guidance.

A `useMemo` that returns `document.body` on the client (and `null` on the server) is **not** equivalent: `{portalTarget && createPortal(...)}` produces an extra fiber on the client that the SSR HTML lacks. The lint rule is wrong about this specific case — trust the pattern.

`useSyncExternalStore` with a server snapshot is the React-blessed alternative when the value-on-mount is more interesting than `null`. For one-shot client-only init, `useState + useEffect + lint disable` is what the codebase uses.

### Layout reads belong in `useLayoutEffect`

`getBoundingClientRect()`, `offsetWidth`, `scrollHeight`, and similar run in `useLayoutEffect` so the read happens after layout but before paint. A regular `useEffect` works but produces a flash when paint commits before the read drives a follow-up update.

---

## UI Coordinates Through Events, Not Timers

`setTimeout` is not a synchronisation primitive. If you're waiting "for the layout to settle", "for the focus to land", "for the next paint", or "for the modal to be visible", there is a real event to listen to.

| Wait reason | Use instead |
|-------------|-------------|
| Wait for an animation | The animation library's `onComplete` callback |
| Wait for a video to start | `loadeddata` or `playing` |
| Wait for the next paint | `requestAnimationFrame` |
| Wait for a CSS transition | `transitionend` |
| Wait for an element to focus correctly | `focus({ preventScroll: true })` called synchronously in the right effect |

`setTimeout` is fine for things that genuinely fire on a timer — auto-advancing carousels, debounce intervals, scheduled retries. It is not fine for "I think this should be ready by now."

---

## CSS Transition Constraints

- **`transition-colors` does not work on gradients.** CSS cannot interpolate between a solid color and a `background-image`. To animate a gradient in/out: keep the element's solid color, place an absolutely-positioned child div containing the gradient as the first DOM child, and transition that child's `opacity`.
- **`transition-colors` is overridden by inline `style` color props.** `style={{ color: activeColor }}` wins at every point in the transition and the CSS transition has no visible effect. Apply the inline style only when active (`style={isActive ? { color } : undefined}`) and let the CSS class handle the default and the easing.
- **`mix-blend-mode: luminosity` and a transitioning parent background interact badly.** A photo desaturated via `mix-blend-mode: luminosity` blinks mid-transition when its parent's `background-color` also transitions. Use a CSS `filter` for desaturation on any card whose background also transitions.

---

## Body Scroll Locking Has One Approved Approach

`document.body.style.overflow = 'hidden'` is a footgun on iOS Safari. It often doesn't actually prevent touch scroll, loses scroll position when the modal closes, and interacts unpredictably with `position: fixed` overlays inside a transformed ancestor (which is what ScrollSmoother creates).

The single approved entry point lives at `lib/scrollLock.ts`. Every modal calls `lockScroll()` and stores the returned `unlock` function as the `useEffect` cleanup. `lockScroll()` branches once internally:

1. **With ScrollSmoother (homepage):** capture `smoother.scrollTop()`, call `paused(true)`, restore both on unlock.
2. **Without ScrollSmoother (inner pages):** capture `window.scrollY`, set `position: fixed; top: -Npx; width: 100%; overflow-y: scroll` on the body, reverse on unlock with `window.scrollTo(0, savedY)`.

Never set `document.body.style.overflow` directly from a component. Never invent a parallel scroll-lock helper. New edge cases (a portal stack, a sub-frame) update `lib/scrollLock.ts`.

---

## Logging Goes Through the Central Logger

Raw `console.log` in production code is forbidden — calls survive code review by accident, ship unconditionally, and there is no single place to silence them. Every diagnostic line goes through `lib/logger.ts`:

```ts
import { log } from '@/lib/logger';

log('hero-pin', 'ENTER_DISPATCHED', { reason });
```

`log(channel, event, detail)` writes a colour-coded line tagged with the channel name. `warn()` and `error()` share the same shape but are never silenced — reserved for things a developer must see when they happen.

**Default state: enabled.** Logs reach the console in both development and production while we iterate on motion choreography. Two switches turn the firehose off:

- Build-time: `NEXT_PUBLIC_LOGGING_DISABLED=1` in `.env.production`. Bundler inlines the flag and tree-shakes every call site.
- Runtime: `window.__loggingDisabled = true` in the browser console.

**No parallel loggers.** Don't introduce `if (DEBUG_X)` blocks scattered across components. New channels pick a name and call `log()`; channels that deserve a recognisable colour register one in `CHANNEL_COLORS` in the logger module.

Third-party `console.warn`/`console.error` propagate normally. Our own warning and error paths use `warn()` / `error()` from the central logger so formatting stays consistent.

---

# § Accessibility

## Accessibility Baseline

- All images have meaningful `alt` text. Decorative images use `alt=""`.
- Autoplay videos are `muted` and `playsInline`. Never autoplay audio. Decorative autoplaying videos carry `aria-hidden="true"`.
- Every interactive element is keyboard-navigable and has a visible `:focus-visible` style.
- GSAP animations respect `prefers-reduced-motion`. Wrap in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`. Skip animations at the GSAP level — never with `!important` resets in CSS.
- Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text/UI).

### Semantic HTML before ARIA

Use the native element if one exists. Lists are `<ul><li>`, not `<div role="list"><div role="listitem">`. Buttons are `<button>`, not `<div onClick>`. Navigation is `<nav>`.

### No interactive `<div>`

Anything the user can click, hover, focus, or activate as a *control* is a `<button>` or `<a>`. A `<div>` with an `onClick` skips the focus ring, the keyboard activation, and the assistive-tech announcement that come for free. Style the button to not look like a button if the design calls for it; never start with the wrong element.

The narrow exception is **modal backdrop dismissal**: a `<div role="dialog" aria-modal="true">` whose `onClick` closes the modal when the click target *is* the backdrop (`e.target === e.currentTarget`), and an inner `<div>` whose `onClick` calls `stopPropagation()` to keep clicks inside the dialog. These are mouse-routing helpers, not controls. Keyboard dismissal still wires through Escape, and the dialog still contains a real focusable close affordance.

### Focus management

When a modal opens, focus moves into it (close button or first input). When it closes, focus returns to the element that opened it. Use `focus({ preventScroll: true })` so the browser doesn't scroll to the element — especially critical inside a transformed ancestor (ScrollSmoother, GSAP `transform`), where the browser miscalculates position and would jump to the top of the document.

### Decorative SVGs

Decorative SVGs use `aria-hidden="true"` and no `alt`. Meaningful SVGs use `role="img"` plus `aria-label` or an inline `<title>`. Never leave an SVG with no accessible name and no `aria-hidden` — screen readers will read its raw markup.

---

# § Forms & Data

## Forms Use the Form Library Already Installed

React Hook Form is the form library. Don't roll a new one. Don't mix raw `useState` for form values with RHF's `register` on the same form. Pick one pattern per form and stay consistent:

- **Multi-field, validated forms** (lead capture, contact, dynamic schemas): RHF — `register` for fields, `handleSubmit` for submit, `formState.errors` for errors.
- **Tiny single-field forms** (footer email signup, newsletter inline): an uncontrolled `<form>` with `new FormData(e.currentTarget).get('email')` in the submit handler. Anything more elaborate (per-character `useState`, manual JSON assembly) is over-engineered.

Either way, the network call, response validation, and tracking lifecycle live in a single hook (`useEmailSignup`, `useLeadSubmit`, …) that the form consumes. The form decides what the four states (`idle | submitting | success | error`) look like; it does not contain `fetch`, response parsing, or analytics inline.

Validation lives in the form definition (schema or RHF `register` options), never as ad-hoc `if (!value.trim()) return` strewn through the submit handler.

---

# § Project Conventions

## Never Delete Pages or Routes

- Do not delete pages, route handlers, or config files without explicit instruction.
- Pages that aren't linked anywhere are intentionally orphaned — they may be used as landing pages, linked externally, or SEO-indexed. Deleting them breaks live URLs.
- If a page or route looks unused, add a comment flagging it. Do not remove it.

This rule does not block refactoring of internal code: utility modules, helper functions, and components may be moved or merged when the replacement preserves observable behaviour. The boundary is the URL surface (and other public contracts) — those never disappear silently.

---

## Phase 1 Scope

Phase 1 is a single-page site based on the Figma (node `915:2616`). The existing pages under `app/` are intentional orphans — don't delete them, don't link to them, don't touch them.

Phase 2 expands this into a full multi-page marketing site. Build Phase 1 so Phase 2 is easy: clean component boundaries, prop-driven everything, no content hardcoded.

See [`docs/specs/001_splash_page_alpha.md`](../specs/001_splash_page_alpha.md) for the exact scope, section breakdown, and acceptance criteria.
