# 054 — "Our Work" nav group + live-site Gallery

**Status:** Implemented
**Depends on:** 034 (full site navigation), 050 (industry pages & resources nav), 051 (case studies)

---

## What this is

Two related changes: a navigation regrouping that gives Keystone's proof-of-work
destinations a home of their own, and a new Gallery page that shows real,
live websites Keystone has built — embedded, browsable, and expandable.

## Navigation

A new dropdown named **Our Work** becomes the *first* top-level item, before
Solutions. It is a compact menu (like Company and Resources) with one column of
three links:

- **Gallery** — the new page described below
- **Case Studies** — moved here from the Resources dropdown
- **How it Works** — moved here from its top-level nav slot

Its promo tiles echo the group's purpose: one green tile pointing at the
Gallery, one orange tile pointing at Case Studies.

Consequences elsewhere in the bar: the top-level "How it Works" link is gone,
and Resources now holds only Blog and Grader. Nothing else moves. The same
structure feeds desktop and mobile menus, as always.

## Gallery page (`/gallery`)

A quiet, editorial page on the cream surface, opening with the centered inner
hero (eyebrow, title, supporting line) and closing with the full-bleed green
CTA band — same bookends as the Case Studies gallery.

Between them, a single vertical column of **showcase entries**, one per
website. Each entry is a white card with two parts:

1. **A story header.** The business name in the display face, with a small
   uppercase eyebrow naming its industry. Beside or beneath it, a short
   narrative paragraph about the business. Below the narrative, a row of
   small facts — founded year, founder, location(s) — each an oversized-label
   pair like the case-study KPI rows. Facts vary per business; whatever is
   unknown is simply absent. A final row of small pills lists the website's
   key attributes ("Online booking", "Bilingual", …), also optional.
2. **The live site itself.** A full-width framed embed of the production
   website, tall enough to read the hero. A visible control in the frame's
   corner expands the embed into a **fullscreen takeover**: the page behind
   locks, the site fills the viewport edge to edge on a dark scrim with a
   slim header carrying the business name, a "visit site" action, and a
   close control. Escape or the close control returns to the page exactly
   where the visitor left it.

Mobile: the story header stacks; the fact row wraps; the embed keeps a
shorter portrait-friendly height; the fullscreen takeover behaves the same.

`prefers-reduced-motion`: the takeover appears and disappears without
animation.

## Acceptance criteria

- [x] "Our Work" is the first top-level nav item on desktop and mobile.
- [x] Gallery, Case Studies, and How it Works all reachable from it.
- [x] "How it Works" no longer appears top-level; Case Studies no longer in Resources.
- [x] `/gallery` renders every showcase entry with its metadata and live embed.
- [x] Expanding an embed takes over the full screen; Escape and the close control both exit and restore scroll position.
