# Launch checklist

The living source of truth for the big-bang launch. Every page completion
adds its row and any new gates here, in the same commit as the work.

Launch is **big-bang** (owner decision 2026-08-27): nothing deploys until every
page is built. The old-brand site ships from `main` until cutover; launch means
deploying this branch in its place. `/` already serves the homepage, so there
is no promote step. Execution only on the owner's explicit go.

---

## Page completions

Every page must be built, verified at the five anchors and one width per
structural slice (scrollbar forced on), and green in the grid sweep before the
gates below can close.

| page | status |
|---|---|
| Home | **built + cut over 2026-09-08** — `/` serves the v2 composition; the v1 homepage, its fixture routes, and their assets are retired. Open post-swap work: the list below. |
| Pricing | **built + verified 2026-08-28** — offer, price scale + personas, FAQ + assembly; five islands; `/pricing` static. Pending gates: G9 (FAQ answer copy) and G6 (owner sign-off). |
| Our Work | **built + verified 2026-08-29** — header + case studies, gallery, fullscreen viewer + assembly; six islands; `/our-work` static. Reduced-motion and no-JS verified. Pending: G6; G8 audits the five-beat entrance; one design flag (the desktop-view icon's `text/100` ink binding). |
| Case Studies | **template + Palm Coast Zivel built + verified 2026-08-31**; `/case-studies/[slug]` (unpopulated slugs 404). **Content passes landed 2026-09-04 as drafts** (Your Health Solutions · Bare Lúx Studio: per-band `extraTicks` growth under the clearance law, image tiers cut build-side). Pending: owner copy approval; the $25k MRR figure verified against production; G6; the production-build budget pass; two byte-only export re-cuts (rt header 648 · rm result 672); design flags (the rt stack-subhead ink, the rs funnel double space, the button set's dropped underline, the four invisible ○ cells). |
| Solutions | not started |
| Company | not started |
| Resources | not started |

Old paths that return as rebuilt pages (like `/pricing`) shrink the dead-URL
surface as they land; whatever never returns stays a pure 404 (owner decision —
zero backwards compatibility).

## Gates — all green before launch

| # | gate | status |
|---|---|---|
| G1 | The grid sweep green on `/`, `/pricing`, `/our-work`, and `/case-studies/palm-coast-zivel`; every page verified at the five anchors and one width per slice | re-check per page |
| G2 | Token layer re-extracted from the Figma variables API before each page build; diffs flowed through tokens | standing rule — last run 2026-08-27 (one drift: `text/xl/Light` paragraph spacing 0 → 12, no consumer) |
| G3 | **Testimonials content pass**: real quotes and attribution replace the placeholder copy; real photos arrive as an art-directed tier set into the existing `<picture>` markup and registry entries — no structural change | **open — design** |
| G4 | **The pre-launch metadata wipe** — one content pass once all pages are done; inventory below | **open — design content decision** |
| G5 | **The mobile-class LCP decision**; note below | **open — owner** |
| G6 | Owner sign-off on every assembled page at the five anchors and one width per slice | open |
| G7 | **Accessibility review** — assembled-site pass against the accessibility baseline (`.cursor/rules/50-react-effects-a11y.mdc`) once every page is built; note below | **open** |
| G8 | **Loading-animation audit** — timing, hydration, and settle of every page's load choreography; the start clock follows the G5 decision; note below | **open** |
| G9 | **FAQ answer content pass** (owner decision 2026-08-28): answer 1's copy ships as the designed placeholder under all six pricing-FAQ questions; the five real answers land as a copy-only change to the FAQ data module | **open — design** |
| G10 | **Engine-section native visual pass** (owner direction 2026-09-06): the thirty placeholder exports under `engines-v2/` are replaced by production visuals (the grain primitive gains its engine consumer). The engagement `engine-detail` variants are drawn as empty stubs in the file — the drawings are with design. Priority raised 2026-09-06: the stacks rest on the `a` drawings, so the engagement stub is the resting visual below the rd gate on every phone. | **open — design** |

## Homepage — the post-swap checklist

The owner's working list once `/` served the v2 homepage (owner ruling
2026-09-08 — swap now, finish after). Items 1 and 4 carry owner decisions.

1. **[owner review] The phone/tablet engine section.** It still runs the
   earlier timer + swipe behaviour while desktop carries the free-scroll
   contract (deferred 2026-09-06). Review on `/` at phone width; decide whether
   aligning it jumps the queue.
2. **[build, after item 1] The 384/768 engine pass** — whatever item 1 rules.
3. **[design → build] The engine native-visuals pass** (= G10). Production art
   replaces the placeholder exports file-for-file through the registry.
4. **[owner ruling] Mobile headline speed (LCP)** (= G5, re-measured on the v2
   hero). Accept the number as baseline, or rework the load entrance so the
   headline paints before JavaScript (recommended before launch if the number
   stays ~5s; never a swap blocker).
5. **[owner ruling] The budget line.** Guide: within ~10–15% of the v1 112 kB
   first load passes; above investigates.
6. **[watch] The case-study-carousel stat-label wrap** when the remaining copy
   passes land.
7. **[launch gate] The pre-launch metadata wipe** (= G4), plus the standing
   gates (sign-off, the big-bang sequencing).

## Punch list — auxiliary to-dos

Not gates, but they should land before cutover. Each item records its date and
clears in the landing commit.

- [ ] Add an Accessibility Statement to the footer (owner, 2026-08-28).
- [ ] Add X to the footer's social links (owner, 2026-08-28).

## The launch steps (after all gates are green)

1. Deploy this branch as the production site; the old-brand site retires when
   this branch becomes the production deploy. The sweep runs on the live pages.
2. `/` is indexable (no robots meta) and carries the wiped metadata; a sitemap
   for the new site is built once its pages exist.
3. The head contract verified on the deployed `/`: the light guard and light
   theme-color, the two site-font preloads, nothing else.
4. The budgets re-measured on the launch build and within budget (as adjusted
   by the G5 decision).

## Rollback

Redeploy `main`'s old-brand build. The two sites never shared a deploy, so the
escape line is the previous deployment, not a revert.

---

## G4 detail — the metadata-wipe inventory

The standing copy ships on dev builds as-is; the whole set is replaced in one
pass right before launch:

- **Title** (and derived og:/twitter:title): currently "Keystone | Sales &
  Marketing for Local Businesses"; no title template.
- **Description** (and derived og:/twitter:description): the standing
  old-brand copy in `app/layout.tsx`.
- **Social image**: `/og-image.png` (1200×630) is old-brand art — needs a
  new-brand card.
- **Manifest** (`/site.webmanifest`): still old-brand colors (theme `#042019`,
  background `#063126`) — flips in the same pass.
- **Icons**: favicon set + apple-icon carry the brand mark — brand-neutral
  enough to keep unless design says otherwise.
- Already resolved: theme-color meta ships the light `bg/100` (`#f8f7f2`).

## G5 detail — the mobile-class LCP decision

Measured 2026-08-27 (Lighthouse, local production build, default throttling):
384-class LCP **5.33s**, 768-class **5.25s**, against the 2.5s budget.
Everything else is within budget (1344-class LCP 1.12s · CLS 0.000 · TBT ≤
28ms · 128 B route JS · 111 kB first load).

The cause is designed, not a defect: at the mobile classes the LCP element is
the H1, and the cold-load guard holds choreographed content hidden until the
orchestrator island hydrates — simulated slow-4G defers hydration by seconds.
Real users on ordinary connections see the choreography start well under a
second.

The owner picks one of two resolutions:

1. **Accept and re-baseline** — record the budget as "LCP within 2.5s of
   hydration", keeping the orchestration as built. Cost: Core Web Vitals / SEO
   optics on slow-network scores.
2. **Pre-hydration orchestration.** A few lines of inline script in the page
   HTML add `v2-load` after `document.fonts.ready`, so the choreography starts
   when HTML + CSS + fonts arrive instead of waiting for React. The CSS beats
   stay identical. Animations can then finish **before** the island hydrates,
   so the orchestrator must reconstruct state on mount (detect a finished or
   in-flight run — `document.getAnimations()` — and mark `v2-settled`
   accordingly) instead of assuming it starts the run. No-JS and reduced-motion
   behaviour are unaffected.

G8 re-runs against whichever start this decision picks.

## G7 detail — the accessibility review

The accessibility baseline in the rules is the law; this gate is the
assembled-site pass. It runs once every page is built, at the five anchors and
one width per slice. Closes when, on every launched page:

- Every interactive element is keyboard-reachable and operable, with a visible
  `:focus-visible` style. Overlays move focus in and restore it on close. No
  focus traps except designed dialogs.
- Color contrast meets WCAG AA (4.5:1 body text, 3:1 large text/UI).
- `prefers-reduced-motion: reduce` and no-JS render the same settled state.
- The accessibility tree carries only real content: decorative SVGs, lattice
  chrome, ornament cells, and clone slides are `aria-hidden`. Native elements
  before ARIA.

Known deferred flag, carried here until design closes it:

- **Engine title-ink contrast.** White on the /400 fills measures below the
  3:1 large-text floor on visibility, ads, and brand (reception and engagement
  pass). The engine name is also each card's accessible button name, so the
  low-contrast render is not the only path to the information. Design resolves
  the pairs or records acceptance.

## G8 detail — the loading-animation audit

The homepage load cascade and the settle contract later pages inherit. This
gate is the assembled-site pass of that motion — not the LCP-budget call (G5),
but whether the choreography starts, times, and ends as designed once every
page is built.

**Start clock (coupled to G5).** Today, delays run from page ready: fonts
loaded, first frame after the orchestrator island hydrates. The cold-load guard
holds choreographed content hidden until `v2-load`. G5 option 2 moves that flip
to an inline script after `document.fonts.ready`.

Closes when all of the following hold:

- **Timing.** On every page with a load choreography, computed delays,
  durations, easings, and fill modes match the values in `tokens/motion.css`
  and the section's CSS. The highlight pass starts only after the fade-rises
  settle; the carousel's first advance waits for the highlight (+4500ms from
  load start, then 3500ms dwell).
- **Hydration.** No flash of settled content then a replay; no hydration
  mismatches. Un-choreographed content is not held. CLS stays on
  transform/opacity only.
- **Settle.** The last beat marks `v2-settled`; resizing across gates does not
  replay the load; the grid sweep waits for settled before it asserts. Dev
  replay still works.
- **Reduced motion and no-JS.** Both render the same settled state: no sweep,
  no fade-rise, chips born branded, no timers.
- **Pages with no choreography** (pricing offer) render settled from first
  paint and never inherit a hide-until-hydrate. A later page with an entrance
  inherits the orchestrator and this audit; it does not invent a second start
  clock.

---

## Maintaining this checklist

- A page completion updates its row and re-checks G1 in the same commit as its
  final verification.
- A new launch-relevant obligation lands here as a gate row or a step, pointing
  at the code that carries it.
- A resolved gate keeps one line: the decision, the date, who made it.
