# Site Rules — World-Class Marketing Site Standards

These are non-negotiable rules. Every agent, designer, and contributor must read and follow this document before touching a single file.

---

## 0. Spec-First Development

**Never write code before there is a spec.**

The development flow for every meaningful piece of work is:

1. **Write the spec first.** Create a numbered spec file in `docs/specs/` before a single line of implementation code is written. The spec must include: scope (in and out), Figma reference(s) with node IDs, a section-by-section or feature-by-feature breakdown, and acceptance criteria designed before implementation, not after.
2. **Get the spec approved.** Do not start building until the spec is reviewed and signed off.
3. **Build against the spec.** Every implementation decision should trace back to something in the spec. If you are doing something not in the spec, stop and update the spec first.
4. **Check off the acceptance criteria.** The spec is not done until every item is verified.

### Spec numbering

Specs are sequentially numbered using zero-padded three-digit prefixes: `001_splash_page_alpha.md`, `002_about_page.md`, `003_blog_section.md`, and so on. Never reuse a number. Never skip a number. Numbers are assigned in the order work begins, not in the order sections appear on the page.

### How to write a spec

Specs are authored by designers, not engineers. A spec describes **what the section looks like and how it behaves** — never how to build it. The right reader for a spec is a non-technical person who knows Figma; the right author is that same person.

**Write in design language, not engineering language.** Describe colors, sizes, spacing, motion, and visual states in plain words. Do not mention component names, libraries, CSS properties, or implementation patterns. A good test: if the sentence could only be written by an engineer, it does not belong in the spec.

**Always include a Figma link for every visual state.** Link to the exact node for the start state, the end state, and any intermediate states. All exact values — colors, font sizes, spacing, corner radii — come from Figma, not from the spec author's memory.

**No exact values in specs.** Do not write hex codes, pixel measurements, font sizes, timing values, or any other numeric design token into a spec. These values belong exclusively in Figma — writing them into a spec creates a second copy that will inevitably drift out of sync. Use visual language instead: describe a color as "the site's dark green" or "a muted warm gray", describe a size as "compact" or "full-width", describe timing as "a quick fade". When the implementer needs a precise value, they look it up in the linked Figma node. The one exception is breakpoint widths defined in the project rules (768px, 1280px) — those are project conventions, not Figma design values, and may appear in specs.

**Describe every visual state explicitly.** For animated or interactive sections, describe what the section looks like before any interaction, during the interaction, and when the interaction is complete. If a state is not described, it will be guessed.

**Describe scroll and animation behavior as observable outcomes.** "As the visitor scrolls, the headline slides upward until both lines have fully exited the top of the screen" is a good spec sentence. It says what the visitor sees, not what code achieves it. Cover: what triggers the motion, what moves, in which direction, how far, whether it is tied to scroll position or time-based, whether it reverses, and whether it auto-completes.

**Describe responsive behavior explicitly.** State what changes at mobile, tablet, and desktop — what is hidden, what scales, what repositions. Do not assume the engineer will infer it from the desktop design.

**Describe edge cases.** At minimum: what happens on mobile, and what happens when the visitor has reduced motion turned on in their OS. These are not engineering concerns — they are design decisions that belong in the spec.

**Acceptance criteria must be observable, not technical.** Each item should be something a non-engineer can verify by looking at the browser. "The headline slides fully off the top of the screen" is a good criterion. "The GSAP y-translation equals negative sectionHeight" is not — it belongs in no document.

**No code snippets.** Ever. See Rule 15.

---

## 1. Do Not Hallucinate

- **Never invent content, copy, or data.** Every string on the page must come from props, the Figma design, or explicit instruction. Do not fill in placeholder text, make up company names, or fabricate statistics.
- **Never invent component APIs.** If you are unsure of a prop's name or type, check the component file before using it.
- **Never assume a file or export exists.** Check it with an import or by reading the source.
- If something is unclear, stop and ask. A wrong assumption costs more time to undo than asking.

---

## 2. Everything is Prop-Driven

- **No hardcoded content in component files.** Every piece of text, image URL, color variant, label, or configuration must be passed as a prop.
- Derive sensible TypeScript interfaces for every component. Prefer explicit named types over `any` or `object`.
- Provide default prop values only for layout/style options (e.g. `variant`, `size`), never for content.
- Server components fetch data and pass it down. Client components receive data as props and render it.

---

## 3. Zero Build Errors and Warnings

- **Before every commit, run the two checks below. No exceptions.**
- Zero TypeScript errors — verified with `npx tsc --noEmit`.
- Zero ESLint errors or warnings — verified with `npm run lint`. Fix the root cause, never suppress with `// eslint-disable`.
- Zero unused imports, variables, or dead code.
- If an error is introduced, fix it before doing anything else.

**Do not use `npm run build` as a pre-commit check.** Running a production build invalidates Next.js's incremental dev cache (the `.next` directory), causing the dev server to fully recompile all assets on the next request — stale stylesheets, slow reloads, and lost HMR state. `tsc --noEmit` + `npm run lint` gives identical signal in ~5 seconds with zero side-effects.

`npm run build` should only be run when explicitly testing the production output (e.g. before a deploy, or to verify bundle size).

---

## 4. Responsive-Native

This site has three primary viewports that must all work correctly:

| Breakpoint | Width | Tailwind prefix |
|-----------|-------|----------------|
| Mobile | < 768px | (base) |
| Tablet | 768px – 1279px | `md:` |
| Desktop | ≥ 1280px | `lg:` |

- Design from the **desktop** layout first (the Figma is at 1440px wide), then adapt down.
- Every section must be tested at all three breakpoints before being considered complete.
- Never use fixed pixel widths that cause horizontal overflow on mobile.
- Text must scale down gracefully — massive FK Screamer headlines (216px on desktop) need deliberate size reductions on tablet and mobile.
- Touch targets must be at least 44×44px on mobile.
- No hover-only interactions — all interactive states must also work on touch.

---

## 5. Use Robust, Well-Maintained Libraries for Complex Things

- **Animations:** Use GSAP. Do not roll custom animation logic with `requestAnimationFrame` or `setInterval`. See `docs/explainers/animations.md`.
- **Carousels/sliders:** Use Embla Carousel (already installed).
- **Forms:** Use React Hook Form (already installed via the data layer).
- **Icons:** Use `@untitledui/icons` (already installed). Do not import random SVGs inline.
- Do not add a library to do something that can be done cleanly with 5 lines of CSS or one Tailwind class.
- Before installing anything new, check if the functionality already exists in the current dependencies.

---

## 6. Styling

- **Tailwind for layout and spacing.** Use Tailwind utility classes for flex, grid, padding, margin, width, height, and display. Don't write custom CSS for things Tailwind handles in one class.
- **Design tokens for colors, fonts, and radius.** Reference CSS custom properties from `[data-theme="custom"]` in `styles/custom-overrides.css` — not hardcoded hex values in class names.
- **Arbitrary Tailwind values only for one-off exceptions.** If the same value appears in more than one place, it belongs in `custom-overrides.css` as a token, not repeated as `[value]` across components.
- **No inline `style={{}}` props**, except to pass a CSS variable to GSAP or to forward a dynamic value from props (e.g. a variable-width element). Never use inline styles for static visual properties.
- **All custom CSS goes in `styles/custom-overrides.css`.** No CSS modules, no `styled-components`, no `emotion`, no `<style>` tags in components.
- **No `!important`.** If you need to override something, fix the specificity instead.

---

## 7. Never Delete Files

- **Do not delete pages, components, or config files without explicit instruction.**
- Pages that aren't linked anywhere are intentionally orphaned — they may be used as landing pages, linked externally, or SEO-indexed. Deleting them breaks live URLs.
- If something looks unused, add a comment flagging it. Do not remove it.

## 8. Server vs. Client Components

- Default to **Server Components**. Only add `'use client'` when the component needs GSAP animations (`useLayoutEffect`, `useRef`), browser APIs (`window`, `document`), React state or effects, or event handlers.
- Never add `'use client'` to page-level files (`app/*/page.tsx`). Push interactivity to leaf components.
- Never call API fetch functions inside client components.

---

## 9. Accessibility Baseline

- All images must have meaningful `alt` text. Decorative images use `alt=""`.
- Videos that autoplay must be `muted` and `playsInline`. Never autoplay audio.
- Interactive elements must be keyboard-navigable.
- GSAP animations must respect `prefers-reduced-motion`. Always wrap in `gsap.matchMedia()` using the `(prefers-reduced-motion: no-preference)` media query.
- Color contrast must meet WCAG AA minimum (4.5:1 for body text, 3:1 for large text/UI).

---

## 10. Fonts are Licensed

The FK font family (FK Screamer, FK Grotesk Neue Trial, FK Grotesk Mono Trial, FK Roman Standard Trial, FK Screamer Legacy Trial) is a **licensed commercial font**. It is not available from Google Fonts or Fontsource.

- Do not attempt to `@import` FK fonts from a CDN or public URL.
- Font files will be added to `public/fonts/` and loaded via `@font-face` in `custom-overrides.css`.
- Until font files are provided, use system-font fallbacks for development — but do not ship without the real fonts.
- The full font stack and fallbacks are defined in `styles/custom-overrides.css` — read it for exact font names and weights.

---

## 11. Component Organization

All components live under `components/`. Section components (one per Figma section) go in `components/sections/`. Small reusable elements go in `components/elements/`. Each subfolder has an `index.ts` that re-exports everything. One component per file, named exports only, no default exports.

---

## 12. Phase 1 Scope

Phase 1 is a **single-page site** based on the Figma (node `915:2616`). The existing pages under `app/` are intentional orphans — do not delete them, do not link to them from the new homepage, do not touch them.

Phase 2 will expand this into a full multi-page marketing site. Build Phase 1 so that Phase 2 is easy: clean component boundaries, prop-driven everything, no content hardcoded.

See [`docs/specs/001_splash_page_alpha.md`](../specs/001_splash_page_alpha.md) for the exact scope, section breakdown, and acceptance criteria.

---

## 13. Git Workflow

Work on a branch, never commit directly to `main`. Branch names follow the pattern `feature/`, `fix/`, `docs/`, or `chore/` followed by a short description.

Commit messages use [Conventional Commits](https://www.conventionalcommits.org/) format: a type prefix (`feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `perf`) followed by a short imperative summary. Example: `feat: add HeroSection with video background`.

Each commit should be one logical unit of work — not ten micro-commits for a single feature, and not an unrelated mix of features and chores in the same commit. `npm run build` must pass before every commit. `git push --force` to `main` is forbidden. PRs should be squashed to a small number of logical commits before merging.

---

## 14. Docs Stay in Sync with Code

**Docs are part of the codebase, not an afterthought.**

- Every commit that changes behavior, adds a component, introduces a pattern, or changes a convention must also update any affected docs in the same commit.
- If something is not covered by any existing doc and should be, create a new file in the appropriate subfolder (`rules/`, `specs/`, or `explainers/`).
- If a rule no longer reflects how the codebase actually works, update it — do not leave misleading guidance in place.
- Stale docs are worse than no docs. A reader who follows outdated guidance wastes more time than a reader who knows to go look at the code.
- The test: before committing, ask "if someone read only the docs and then read only the code, would they be consistent?" If not, fix the docs first.

---

## 15. How to Write Docs

- **Minimalist.** Say the thing in as few words as possible. If a sentence can be cut without losing meaning, cut it.
- **No code snippets** unless there is genuinely no other way to convey the information. Patterns and conventions can almost always be described in plain language.
- **Written for a minimally technical audience.** Assume the reader knows what a component and a prop are, but not much more. No jargon, no acronyms without explanation, no inside references.
- **Docs describe what exists.** Never document planned or future components, patterns, or conventions — that belongs in a spec. If something isn't built yet, it doesn't go in an explainer.
- **One idea per sentence.** No long compound sentences joined by semicolons and em-dashes that require re-reading to parse.
- **No preamble.** Get to the point immediately. Do not open with "This document covers…" or "The purpose of this file is…"

---

## 16. Public Asset Naming

All static assets live in `/public/`. Assets for a specific section go in a subfolder named after that section (e.g., `/public/work-showcase/`).

Before naming a new asset, scan the existing files in the target folder and match the naming pattern you observe — separators, prefixes, ordering of parts, and casing style. If the folder already has a consistent pattern, follow it exactly. If there are no existing files yet, use lowercase `kebab-case` with descriptive parts ordered from most general to most specific (e.g., `health-ads-photo-1.png` rather than `photo1-ads-health.png`).

Every asset name must be identifiable by name alone without opening the file. Generic names like `rect4.png`, `img1.png`, or `icon.svg` are not acceptable.

When an asset is replaced or made redundant, delete it immediately. Dead assets cause confusion and increase build size.

---

## 17. SVG Export Rules

**Never export SVGs using Figma's Exclude / Boolean Subtract technique.** This technique creates a single path with transparent cutout holes that rely on a `background-color` set in the HTML container to make the cutouts visible. It causes a white anti-aliasing halo around circular containers regardless of `overflow: hidden`.

Export SVGs as flattened compositions instead: the background shape is one `<path>` and any foreground letterforms or elements are separate `<path>` elements with explicit fills. The resulting SVG is fully self-contained and requires no background color in the HTML.

If you receive an SVG from Figma that uses the Exclude technique, ask the designer to re-export it as a flattened composition.

---

## 18. CSS Transition Constraints

**`transition-colors` does not work on gradients.** CSS cannot interpolate between a solid color and a `background-image` (gradient). To animate a gradient in/out: keep the element's solid background color, add an absolutely-positioned child div that contains the gradient, and transition that child's `opacity` from 0 to 1. Place the overlay as the first DOM child so all other content paints on top of it.

**`transition-colors` is overridden by inline `style` color props.** If you apply `style={{ color: activeColor }}` to set an active state, the inline style wins at every point in the transition and the CSS transition has no visible effect. Apply the inline style only when active (`style={isActive ? { color } : undefined}`) and let the CSS class handle the default color and the easing.

**`mix-blend-mode: luminosity` and a transitioning parent background interact badly.** When a photo is desaturated via `mix-blend-mode: luminosity` and its parent container also transitions its `background-color`, the photo blinks visually mid-transition. Use a CSS `filter` approach for desaturation on any card whose background color also transitions.

---

## 20. Search Before You Build

**Before creating anything new, verify it does not already exist.**

- **Components:** Search `components/` before building any new element. Many visual elements — icons, marks, wordmarks, decorative shapes — are already implemented as inline React components with prop-driven color and size. An SVG file in `public/` is never the right answer when a component already exists for the same thing.
- **Assets:** Before adding any file to `public/`, check whether the same asset is already present elsewhere in the folder tree. Figma exports often produce exact duplicates of already-committed files. Delete duplicates immediately — two copies of the same asset will always diverge.
- **Design tokens:** Before writing any color, spacing, or font value into a component or stylesheet, check `styles/custom-overrides.css` for an existing token. Using a token is always preferable to repeating a raw value.
- **Library utilities:** Before writing any helper logic, check whether a function already exists in `keystone-design-bootstrap` or another installed package. See Rule 5.

**The Figma MCP does not know the codebase.** It exports whatever Figma contains — including assets and shapes that are already implemented as components, tokens, or files in the repo. Always cross-reference its output against what already exists before committing anything it produces.

---

## 19. Code Is the Source of Truth

**Specs document intent; code holds the current values.** Colors, spacing, measurements, animation timings, and data values in the codebase are always authoritative. Spec files capture design intent at a point in time and may be out of date.

When continuing work beyond a spec — adding features, fixing bugs, or iterating — never revert to values written in the spec. Read the actual code to find what is currently in use and preserve it. Only consult the spec to understand the purpose or intent behind a section, not to recover numbers.
