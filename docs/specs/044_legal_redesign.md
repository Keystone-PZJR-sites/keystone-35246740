# Spec 044 — Legal pages (redesign + route consolidation)

**Status:** Approved — in implementation
**Type:** A redesign of the legal documents (`/privacy`, `/terms`) into the new inner-page language, plus a cleanup that consolidates the duplicated legal routes onto a single canonical pair. Replaces the dark `inner-page-header` + centered blog-article layout from spec 010 with a clean two-column document layout (sticky sidebar + long-form body).
**Reference:** A small-business software company's legal page (an Owner.com-style site): a light page with a left sidebar listing every legal document (the current one marked with a dot), beside a single long-form column with the document title, an "Updated" line, and the policy body. Built per the "Reference-Driven Components" workflow; no Figma. The layout is matched; all body copy comes from the backend (`company_information.*_markdown`), not the reference.
**Depends on:** 010 (the original legal pages — `LegalDocumentPage`, `buildLegalPlaceholders`, `replaceLegalPlaceholders`), the inner-page shell, and the shared blog prose (spec 038).
**Names:** `LegalDocumentPage` (rebuilt in place), `LegalDoc` (new exported type), and `data/legal-pages.ts` holding the canonical `LEGAL_DOCS` list. All open to a rename.

---

## What this is

The legal pages are the privacy policy and terms of service. Their body text is authored in the backend and fetched at request time; this spec only changes how that text is presented and where the pages live.

Before this spec the site shipped **four** legal routes: `/privacy-policy` and `/terms-of-service` held the real pages, while `/privacy` and `/terms` were thin re-export shims. The footer linked to the short routes, the lead-capture modal linked to the long ones — the same documents reachable at two URLs. This spec collapses that to one canonical pair, `/privacy` and `/terms`, and deletes the duplicates.

The page chrome (site nav, footer, lead-capture modal) comes from the standard `(inner)` route-group shell. This spec supplies the body between the nav and the footer.

---

## Scope

### In scope

- **`LegalDocumentPage`** rebuilt as a two-column layout on the light inner-page surface: a sticky left sidebar (`nav`) listing every legal document — the active one marked with a brand dot and `aria-current="page"` — beside a single document column with the title, an "Updated {year}" line, and the markdown body rendered through the shared blog prose. Stacks to one column below 768px.
- **`LegalDoc`** — a new exported type (`{ label, href }`) for a sidebar entry.
- **`data/legal-pages.ts`** — the canonical `LEGAL_DOCS` list, exported from `@/data`. Both pages pass it and mark their own `href` active. Adding a future legal page is one entry here.
- **Route consolidation** — the real page bodies move into `app/(inner)/privacy/page.tsx` and `app/(inner)/terms/page.tsx`; `app/(inner)/privacy-policy/` and `app/(inner)/terms-of-service/` are deleted.
- **Repointing** — every reference to the deleted routes moves to the canonical pair: the lead-capture `termsHref`/`privacyHref` in `InnerPageShell`, the homepage, the `/styles` page, and `/get-in-touch`, plus the legacy footer links in `config/index.ts`.
- **`patterns/legal.css`** — a new tokenized stylesheet for the layout, imported in the styles index. The orphaned `.legal-effective-date` rule is removed from `inner-page.css`.
- The `/styles` catalog gains a **Legal** panel showing `LegalDocumentPage` with sample markdown.

### Out of scope

- **Authoring legal copy.** The body text stays sourced from `company_information.privacy_policy_markdown` / `terms_of_service_markdown`; the placeholder substitution (spec 010) is unchanged.
- **Per-document "last updated" timestamps.** The backend exposes no per-policy revision date, so the header shows the effective year (the existing signal), labeled "Updated".
- **Extra legal documents** (disclaimer, accessibility, etc.). The sidebar lists only the documents the site actually has; new ones are added via `LEGAL_DOCS` when their content exists.

---

## Visual design

Exact colors, sizes, and spacing are chosen at implementation against our tokens. The result reads as Keystone — the cream inner-page surface, ink body type, brand-green active dot, our display/body fonts. The mobile↔desktop hand-off is the app-wide **768px** boundary (the layout's single grid breakpoint).

### 1. Sidebar

A small uppercase "Legal" label over a vertical list of document links. Each link is a brand-dot slot plus a label; the active document fills the dot with brand green and bolds the label. At ≥768px the sidebar is sticky under the floating nav; below it the sidebar stacks above the document.

### 2. Document column

The document title (a body-font heading, not the loud display face), an "Updated {year}" line, and a hairline divider, above the markdown body rendered through the shared blog prose at a comfortable reading measure. An empty document shows the shared "coming soon" empty state.

---

## Content & data sources

| Element | Source |
|---|---|
| Sidebar entries | `LEGAL_DOCS` in `data/legal-pages.ts` |
| Document title | The page (`"Privacy Policy"` / `"Terms of Service"`) |
| Updated line | `buildLegalPlaceholders().effectiveYear` |
| Body markdown | `company_information.privacy_policy_markdown` / `terms_of_service_markdown`, with placeholders substituted (spec 010) |

---

## New / changed components

### Patterns (`design-system/patterns/legal/`)

- **`LegalDocumentPage`** — props `title`, `updated?`, `contentMarkdown`, `docs: LegalDoc[]`, `activeHref`. The two-column sidebar + document layout; presentational.
- **`LegalDoc`** — new exported type for a sidebar entry.

### Data

- **`data/legal-pages.ts`** — `LEGAL_DOCS: LegalDoc[]`, the canonical ordered list of legal routes.

### Tokens

- None new. The layout reuses existing color, border, spacing, motion, and type roles.

---

## Accessibility

- The sidebar is a `nav` with an accessible name; the active link carries `aria-current="page"` and is distinguished by weight, not the dot alone (the dot is `aria-hidden`).
- Links have discernible text and a visible focus ring; the whole layout is keyboard reachable.
- Color contrast meets WCAG AA on the cream surface for body text, links, and the active state.

---

## Responsive behavior

- The layout hands off at **768px**: two columns (sticky 220px sidebar + fluid document) above, a single stacked column below, with no horizontal overflow at 390px.

---

## Acceptance criteria

- [ ] `/privacy` and `/terms` render in the new two-column layout (sticky sidebar listing both documents with the current one active, beside the rendered markdown body) inside the standard inner-page shell.
- [ ] `/privacy-policy` and `/terms-of-service` no longer exist; every former reference points at `/privacy` or `/terms` (footer, lead-capture modal, homepage, `/styles`, `/get-in-touch`).
- [ ] The sidebar is driven by `LEGAL_DOCS`; adding a legal page is a single entry there.
- [ ] At ≥768px the layout is two-column with a sticky sidebar; below it everything stacks with no horizontal overflow at 390px.
- [ ] `LegalDocumentPage` appears in the `/styles` catalog.
- [ ] `npx tsc --noEmit` and `npm run lint` pass; the affected explainer is updated in the same commit.
