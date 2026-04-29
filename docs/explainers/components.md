# Components Reference

Reusable components live in `components/`. TypeScript interfaces are defined in each component's own file — read the source, don't guess at prop names.

This file is updated as components are built. For the planned component inventory, see [`docs/specs/001_splash_page_alpha.md`](../specs/001_splash_page_alpha.md).

---

## Component Rules

1. **One component per file.** Named export, no default exports.
2. **All content via props.** No hardcoded strings, images, or colors in component files.
3. **TypeScript interfaces** declared in the same file, above the component.
4. **`'use client'` only when necessary** — GSAP, browser events, React state.
5. **Responsive classes** on every component. Test at mobile (< 768px), tablet (768–1279px), desktop (≥ 1280px).
6. **Barrel exports** — always re-export from `components/sections/index.ts` and `components/elements/index.ts`.
