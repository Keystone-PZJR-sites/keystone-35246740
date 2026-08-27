# Launch checklist

The **living source of truth** for the big-bang launch. Extracted from
spec 010 §5 on 2026-08-27 (the spec's §5 stays the frozen Phase 6
record; its dated amendment points here). Every page completion adds
its rows and any new gates here, in the same commit as the work —
"Docs Stay in Sync With Code".

Launch is **big-bang** (owner decision 2026-08-27): nothing deploys
until every page is built. The old-brand site ships from `main` until
cutover; launch means deploying this branch in its place. `/` already
mounts the homepage, so there is no promote step. Execution only on
the owner's explicit go.

---

## Page completions

Every page must be built, its spec's acceptance checked at the five
anchors and one width per structural slice, and the sweep green,
before the gates below can close.

| page | spec(s) | status |
|---|---|---|
| Home | 006–009 (sections) · 010 (assembly) | **built + verified 2026-08-27** |
| Pricing | — (next, owner decision 2026-08-27) | not started |
| Our Work | — | not started |
| Solutions | — | not started |
| Company | — | not started |
| Resources | — | not started |

Old paths that return as rebuilt pages (like `/pricing`) shrink the
dead-URL surface as they land; whatever never returns stays a 404
(010 §7 F3 — pure 404s, zero backwards compatibility).

## Gates — all green before launch

| # | gate | status |
|---|---|---|
| G1 | Every page's spec acceptance checked; the grid sweep green in CI on `/grid`, `/home-fixture`, and each page's QA route | homepage done 2026-08-27; re-check per page |
| G2 | Token layer re-extracted from the Figma variables API for each phase's build; diffs recorded and flowed through tokens | standing rule — last run 2026-08-27 (one drift: `text/xl/Light` ps 0 → 12, no consumer) |
| G3 | **Testimonials content pass** (spec 009 decision): real quotes and attribution replace the placeholder copy; real photos arrive as an art-directed tier set into the existing `<picture>` markup and registry entries — no structural change | **open — design** |
| G4 | **The pre-launch metadata wipe** (010 §7 F2) — one content pass once all pages are done; see the inventory below | **open — design content decision** |
| G5 | **The mobile-class LCP decision** (010 §7 F5); see the note below | **open — owner** |
| G6 | Owner sign-off on every assembled page at the five anchors and one width per slice | open |

## The launch steps (after all gates are green)

1. Deploy this branch as the production site; the old-brand site
   retires when this branch becomes the production deploy.
   `/home-fixture` stays the permanent QA surface, noindexed.
2. `/` is indexable (no robots meta) and carries the wiped metadata;
   a **sitemap for the new site** replaces the purged old-site proxy
   (built only when its pages exist — 010 §6.3); every dev route
   keeps `robots: index false`.
3. The head contract verified on the deployed `/`: the light guard
   and light theme-color, the two site-font preloads, nothing else
   (010 §4.1).
4. The budgets re-measured on the launch build and within budget
   (010 §4.2, as adjusted by the G5 decision).

## Rollback

Redeploying `main`'s old-brand build. The two sites never shared a
deploy, so the escape line is the previous deployment, not a revert.

---

## G4 detail — the metadata-wipe inventory (010 §7 F2)

The standing copy ships on dev builds as-is; the whole set is
replaced in one pass right before launch:

- **Title** (and derived og:/twitter:title): currently "Keystone |
  Sales & Marketing for Local Businesses"; no title template.
- **Description** (and derived og:/twitter:description): the standing
  old-brand copy in `app/layout.tsx`.
- **Social image**: `/og-image.png` (1200×630) is **old-brand art**
  (the dark-green FK Screamer card) — needs a new-brand card.
- **Manifest** (`/site.webmanifest`): still old-brand colors (theme
  `#042019`, background `#063126`) — flips in the same pass.
- **Icons**: favicon set + apple-icon carry the brand mark —
  brand-neutral enough to keep unless design says otherwise.
- Already resolved at the purge: theme-color meta ships the light
  `bg/100` (`#f8f7f2`).

## G5 detail — the mobile-class LCP decision (010 §7 F5)

Measured 2026-08-27 (Lighthouse, local production build, default
throttling): 384-class LCP **5.33s**, 768-class **5.25s**, against
spec 010 §4.2's 2.5s budget. Everything else is comfortably within
budget (1344-class LCP 1.12s · CLS 0.000 · TBT ≤ 28ms · 128 B route
JS · 111 kB first load).

The cause is designed, not a defect: at the mobile classes the LCP
element is the H1, not §4.2's predicted hero image, and the spec 006
cold-load guard holds choreographed content hidden until the
orchestrator island hydrates — simulated slow-4G defers hydration by
seconds. Real users on ordinary connections see the choreography
start well under a second.

The owner picks one of two resolutions:

1. **Accept and re-baseline** — record the budget as "LCP within
   2.5s of hydration" (or similar), keeping the orchestration as
   built. Cost: Core-Web-Vitals / SEO optics on slow-network scores.
2. **Commission a 006.r1 — pre-hydration orchestration.** A few
   lines of inline script in the page HTML add `v2-load` (after
   `document.fonts.ready`), so the choreography starts as soon as
   HTML + CSS + fonts arrive instead of waiting for React. The CSS
   beats stay identical; nothing visual changes except the start
   time on slow connections. The surgery is in the settle contract
   (002.r1 §5): animations can then finish **before** the island
   hydrates, so the orchestrator must reconstruct state on mount
   (detect a finished or in-flight run — e.g. `document.
   getAnimations()` — and mark `v2-settled` accordingly, racing the
   final beat safely) instead of assuming it starts the run. No-JS
   and reduced-motion behavior are unaffected (the inline script
   never runs without JS; the guard's media query already excludes
   reduced motion).

---

## Maintaining this checklist

- A page completion updates its row and re-checks G1 in the same
  commit as the phase's final acceptance.
- A new launch-relevant obligation discovered in any spec's build
  lands here as a gate row (or a step), citing its spec section —
  the spec stays the frozen record, this file carries the status.
- A resolved gate keeps one line: the decision, the date, who made
  it.
