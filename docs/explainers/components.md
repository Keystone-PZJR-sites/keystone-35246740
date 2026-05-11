# Components Reference

Reusable components live in `components/`. TypeScript interfaces are defined in each component's own file — read the source, don't guess at prop names.

---

## Directory structure

| Directory | What goes here |
|-----------|---------------|
| `components/sections/` | One component per homepage section (HeroAnimatic, WorkShowcase, etc.) plus shared inner-page chrome (InnerNav). Sections with a structurally different mobile layout get a dedicated `Mobile*.tsx` file alongside the desktop file (e.g. `MobileHero.tsx` alongside `HeroAnimatic.tsx`). |
| `components/elements/` | Small shared UI primitives reused across many pages (e.g. KeystoneMark). |
| `components/blog/` | Components specific to the blog pages (BlogPostCard, BlogFeaturedCard, BlogFilterBar, BlogPagination, utils). |
| `components/legal/` | Shared component and utilities for legal document pages (Terms of Service, Privacy Policy). |
| `components/<page>/` | For any future page that needs more than one or two components, follow the `blog/` or `legal/` pattern: one directory, one `index.ts` barrel export. |

---

## Component Rules

1. **One component per file.** Named export, no default exports.
2. **All content via props.** No hardcoded strings, images, or colors in component files.
3. **TypeScript interfaces** declared in the same file, above the component.
4. **`'use client'` only when necessary** — GSAP, browser events, React state.
5. **Responsive classes** on every component. Test at mobile (< 768px), tablet (768–1279px), desktop (≥ 1280px).
6. **Barrel exports** — every directory under `components/` must have an `index.ts` that re-exports everything in that directory.

---

## Shared hooks

| Hook | Lives in | Use for |
|------|----------|---------|
| `useEmblaWithIndex` | `lib/useEmblaWithIndex.ts` | Every mobile horizontal carousel. Owns Embla init, active-index tracking, `scrollTo` helper, `select` listener cleanup, and `prefers-reduced-motion: reduce` ⇒ snap-duration-0. Callers pass their own Embla options object and render their own slides. |

`MobileValueProps` (Spec 019) and `MobileWorkShowcase` (Spec 023) both consume `useEmblaWithIndex`. Any future mobile carousel does too — never inline `useEmblaCarousel` plus a hand-rolled `select`-event `useEffect` again.
