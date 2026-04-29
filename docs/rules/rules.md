# Site Rules — World-Class Marketing Site Standards

These are non-negotiable rules. Every agent, designer, and contributor must read and follow this document before touching a single file.

---

## 0. Spec-First Development

**Never write code before there is a spec.**

The development flow for every meaningful piece of work is:

1. **Write the spec first.** Create a numbered spec file in `docs/specs/` before a single line of implementation code is written. The spec must include: scope (in and out), Figma reference(s) with node IDs, a section-by-section or feature-by-feature breakdown, and a **build checklist / acceptance criteria** designed before implementation, not after.
2. **Get the spec approved.** Do not start building until the spec is reviewed and signed off.
3. **Build against the spec.** Every implementation decision should trace back to something in the spec. If you are doing something not in the spec, stop and update the spec first.
4. **Check off the acceptance criteria.** The spec is not done until every item on the build checklist is verified.

### Spec numbering

Specs are sequentially numbered using zero-padded three-digit prefixes: `001_splash_page_alpha.md`, `002_about_page.md`, `003_blog_section.md`, and so on. Never reuse a number. Never skip a number. Numbers are assigned in the order work begins, not in the order sections appear on the page.

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

- **`npm run build` must pass before every commit. No exceptions.**
- Zero TypeScript errors (`tsc --noEmit` is run as part of the build).
- Zero ESLint errors or warnings. Fix the root cause, never suppress with `// eslint-disable`.
- Zero unused imports, variables, or dead code.
- If a build error is introduced, fix it before doing anything else.

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

---

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
