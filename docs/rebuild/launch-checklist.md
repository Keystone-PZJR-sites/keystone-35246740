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
| Home | v2: 018–022 (sections) · 023 (assembly + cutover) — v1 (006–010) retired at the 023 §4 cutover | **v2 built + cut over 2026-09-08** — `/` serves the v2 composition; the §5 retirement list executed (modules, routes, assets, the v1 expectations); `/home-fixture` and `/engines-free-2` retired the same evening (023 §9 B5) — the sweep and homepage QA run on `/`; the budget record in 023 §9. **Open post-swap work: the checklist below** (owner ruling 2026-09-08 — swap now, finish after) |
| Pricing | 011 (offer) · 012 (price scale + personas) · 013 (FAQ + assembly) | **built + verified 2026-08-28** — 011 built + audited 2026-08-27 (incl. the designed 576 frame, 011 §9 R15); 012 built + verified 2026-08-28; **013 approved + built 2026-08-28** (FAQ with content-derived drawer heights per §9 R7, page expectations, the exposed-cell clearance assertion, the `/pricing-fixture` sweep leg — three routes green in one run; five islands; `/pricing` 133 B route JS · 107 kB first load, static). **Pending gates:** G9 (the FAQ answer content pass) and G6 (owner sign-off on the assembled page) |
| Our Work | 014 (header + case studies, **built 2026-08-28**) · 015 (gallery, **built 2026-08-28**) · 016 (overlay + assembly) | **in build** — **014 approved + built + verified 2026-08-28** (zero-drift re-extraction; every landmark rendered-bounds-re-verified at build; two §2 deviations + the label-wrap erratum amended in place — 014 §9 build record; verified at the five anchors + nine slice widths). Same-evening owner revisions (014 §4/§6.0): the site-image stroke and the **rises-only entrance** (no nav beat, no sweep, no highlights; the 006 orchestrator generalized at its second consumer; G8 audits this choreography with the rest). **2026-08-29 revision (014 §9): the whole-card interaction** — the card is the link, hover dresses it (block shadow on the borrowed card-shadow grammar, sooner-resolving hairline darken, the inline button's hover), the resting image shadow removed, the button states re-inked, and the choreography now settles on card 1's rise (**five beats** — G8 audits the reshaped run). **015 approved + built + verified 2026-08-28** (zero-drift re-extraction; every value rendered-bounds-re-verified pre-build, no build errata — 015 §9 build record; the gallery spliced into the composition, the strip machine the page's second island; the snap and ghost grammars promoted at their second consumers; the 012 persona-ghost erratum fixed in step; verified at the five anchors + nine slice widths, sweep green; `/our-work` 1.97 kB route JS · 107 kB first load, static). **016 approved + built 2026-08-29** (drafted, approved — §6 motion values covered — and built the same day; zero-drift re-extraction; every value rendered-bounds-re-verified pre-build): the fullscreen gallery viewer (live embeds under the `gallery-navRail`, site paging with the drawn disabled clamp, the view switcher, the §3 stage math, the rm/rs `data-k` handoff, the 015 thumbnails as triggers) + the page assembly (expectations module with the §9-amended `cta` clearance exception, the `/our-work-fixture` sweep leg with hermetic viewer drives — four routes green in one run, 445 checks). Budgets: static, six islands, `/our-work` 133 B route JS · 108 kB first load. Reduced-motion and no-JS verified 2026-08-29 (state-to-state open/close, inert triggers, no viewer chrome in the no-JS tree). **Open on the 016 acceptance:** the shared-icons-chunk ~1 kB first-load ripple on `/` and `/pricing` against the byte-unchanged line (owner ruling — 016 §9); one file flag with design (the desktop-view icon's `text/100` ink binding). **Pending gates:** G6 (owner sign-off on the assembled page); G8 audits the five-beat choreography with the rest |
| Case Studies | 017 (template + Palm Coast Zivel + assembly; phased — A: template + Zivel, B: content passes) | **approved + built + verified 2026-08-31** (approved with the §6 motion values, built the same night — 017 §9 build record). One-drift re-extraction (the new `display-serif/2xs+/ExtraLight` quote step); every §1–§5 value re-verified from rendered bounds pre-build; the §2 exposure corrected at build (the "full-field" was the presence read — the painted map is the staircase + rail + widenings + the pre-footer full row; the hero §2 erratum class) and the rs run below The Business re-read +1t (the F5c knock-on) — both amended in place. Landed: the fifteen Zivel page tiers + the `caseStudyPageSrc` builder, eight verbatim icon exports (the double-checkmark, the six hue-toned stack glyphs, the 25×24 star cut), the `CaseStudyButton` primitive (+ `/primitives` rows), nine sections, the rd2 sticky-TOC island (scrollspy on the §4 one-third rule), the §6 four-beat entrance (the orchestrator's third consumer), `/case-studies/[slug]` (unpopulated slugs 404) + the noindexed `/case-study-fixture`, the expectations module and the sweep leg — **five routes green in one run, 499 checks**, incl. the TOC drives; renders compared against the file at rm/rd2 — identical. Two harness errata found by this page fixed in step (the probe-rounded assertion tick; the settle waits now prefix-match `v2-choreo*`). Reduced-motion/no-JS verified. **Pending:** the production-build budget pass (owner coordination — the .next hazard), G6 sign-off, the two byte-only export re-cuts (rt header 648 · rm result 672), and the file flags riding with design (017 §9: the rt stack-subhead ink, the rs funnel double space, the button set's dropped underline, the four invisible ○ cells). **Phase B landed 2026-09-04 as draft content passes** (YHS · Bare Lúx: records rewritten from the v1 case studies, per-band `extraTicks` growth under the clearance law, image tiers cut build-side from three single masters per study — 017 §5.1/§9 as amended). Pending on Phase B: owner copy approval, the owner-supplied $25k MRR figure verified against prod, and verbatim per-band exports if design wants them (the build-side tiers swap byte-only) |
| Solutions | — | not started |
| Company | — | not started |
| Resources | — | not started |

Old paths that return as rebuilt pages (like `/pricing`) shrink the
dead-URL surface as they land; whatever never returns stays a 404
(010 §7 F3 — pure 404s, zero backwards compatibility).

## Gates — all green before launch

| # | gate | status |
|---|---|---|
| G1 | Every page's spec acceptance checked; the grid sweep green in CI on `/`, `/pricing`, `/our-work`, and `/case-studies/palm-coast-zivel` | homepage done 2026-08-27; re-check per page |
| G2 | Token layer re-extracted from the Figma variables API for each phase's build; diffs recorded and flowed through tokens | standing rule — last run 2026-08-27 (one drift: `text/xl/Light` ps 0 → 12, no consumer) |
| G3 | **Testimonials content pass** (spec 009 decision): real quotes and attribution replace the placeholder copy; real photos arrive as an art-directed tier set into the existing `<picture>` markup and registry entries — no structural change | **open — design** |
| G4 | **The pre-launch metadata wipe** (010 §7 F2) — one content pass once all pages are done; see the inventory below | **open — design content decision** |
| G5 | **The mobile-class LCP decision** (010 §7 F5); see the note below | **open — owner** |
| G6 | Owner sign-off on every assembled page at the five anchors and one width per slice | open |
| G7 | **Accessibility review** — assembled-site pass against the rules.md Accessibility Baseline once every page is built; see the note below | **open** |
| G8 | **Loading-animation audit** — timing, hydration, and settle of every page's load choreography (006 §6 · 002.r1 §5); the start clock follows the G5 decision; see the note below | **open** |
| G9 | **FAQ answer content pass** (013 §9 F1, owner decision 2026-08-28): answer 1's copy ships as the designed placeholder under all six pricing-FAQ questions; the five real answers land as a copy-only change to the FAQ data module before cutover | **open — design** |
| G10 | **Engine-section native visual pass** (020 §7, owner direction 2026-09-06): the thirty placeholder exports under `engines-v2/` are replaced by native/production visuals (the 019 grain primitive's second consumer arrives with this pass). The file's **engagement `engine-detail` variants are drawn as empty stubs** (020 §9 R13) — the drawings themselves are with design. *Priority raised 2026-09-06 (020 §9 R21): the stacks now rest on the `a` drawings, so the engagement stub is the resting visual below the rd gate — visible on every phone until the pass lands.* | **open — design** |

## Homepage v2 — the post-swap checklist (023 §6, mirrored at the cutover commit)

The owner's working list once `/` serves the v2 homepage (owner ruling
2026-09-08 — swap now, finish after). None of these blocked the swap;
items 1 and 4 carry owner decisions.

1. **[owner ruling] The phone/tablet engine section — the
   interaction is PARKED** (2026-09-08 evening, 020 §9 R30; it
   supersedes the same-day R28 hijack ruling). The R28 gesture
   hijack failed on real touch devices and lagged page scrolling;
   it is pulled. The stacks are static — the drawn `a` rest with
   the two-dot indicator — until a new small-band contract is
   ruled. A touch-capable rework candidate is preserved in the
   branch stash (020 §9 R30).
2. **[build, after item 1] The 384/768 engine pass** — re-opens
   when the new contract is ruled. The R28/R29 breadcrumb redraw
   (the discrete two-dot set, viewed square · upcoming round) is
   built and stands at every band. One file residual with design:
   the 1344 state frames' active panels still carry stale old-set
   breadcrumb instances (020 §9 R28).
3. **[design → build] The engine native-visuals pass** (= G10). The
   ten illustrations (+ thirty small-band cuts) are placeholder
   exports; production art replaces them file-for-file through the
   registry, and the grain primitive gains its engine consumer.
4. **[owner ruling] Mobile headline speed (LCP)** (= G5, re-measured
   on the v2 hero — the 023 §3/§9 budget record). Accept the number as
   baseline, or rework the load entrance so the headline paints before
   JavaScript (recommended before launch if the number stays ~5s;
   never a swap blocker).
5. **[owner ruling] The budget line.** Measured first (owner
   2026-09-08); guide: within ~10–15% of the v1 112 kB first load
   passes, above investigates. The measurement is in 023 §9.
6. **[watch] The 022 stat-label wrap** (022 §9 B7) when the remaining
   copy passes land.
7. **[launch gate, unchanged] The pre-launch metadata wipe** (= G4),
   plus the standing launch-checklist gates (sign-off, the big-bang
   sequencing).

## Punch list — auxiliary to-dos

Small owner-requested items. Not gates — they do not block launch,
but they should land before cutover. Each item records its date and
clears with a strikethrough or removal in the landing commit.

- [ ] Add an Accessibility Statement to the footer (owner, 2026-08-28).
- [ ] Add X to the footer's social links (owner, 2026-08-28).

## The launch steps (after all gates are green)

1. Deploy this branch as the production site; the old-brand site
   retires when this branch becomes the production deploy.
   The sweep runs on the live pages. Every QA route 404s.
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

The assembled-site timing / hydration / settle audit of the
choreography itself is **G8**. It re-runs against whichever start
this decision picks.

## G7 detail — the accessibility review

The standing baseline (`docs/rules/rules.md`, Accessibility) is the
law. Spec acceptance already carries per-section boxes; this gate is
the assembled-site pass those boxes do not cover. It runs once every
page is built, at the five anchors and one width per slice.

Closes when all of the following hold on every launched page:

- Each page's spec accessibility acceptance is checked, or an open
  flag is resolved or recorded as accepted.
- Every interactive element is keyboard-reachable and operable, with
  a visible `:focus-visible` style. Overlays move focus in and restore
  it on close. No focus traps except designed dialogs.
- Color contrast meets WCAG AA (4.5:1 body text, 3:1 large text/UI).
- `prefers-reduced-motion: reduce` and no-JS render the same settled
  state (already in spec acceptance; re-checked on the assembled
  pages).
- The accessibility tree carries only real content: decorative SVGs,
  lattice chrome, ornament cells, and clone slides are `aria-hidden`.
  Native elements before ARIA (lists, buttons, nav, figures).

Known deferred flag, carried here until design closes it:

- **Spec 008 §9 F9** — engine title-ink contrast. White on the /400
  fills measures below the 3:1 large-text floor on visibility, ads,
  and brand (reception and engagement pass). The engine name is also
  each card's accessible button name, so the low-contrast render is
  not the only path to the information. Design resolves the pairs or
  records acceptance; the section's accessibility box stays unchecked
  until then.

## G8 detail — the loading-animation audit

Spec 006 §6 is the homepage cascade; spec 002.r1 §5 is the settle
contract later pages inherit. This gate is the assembled-site pass
of that motion — not the LCP-budget call (that is G5), but whether
the choreography actually starts, times, and ends as designed once
every page is built.

**Start clock (coupled to G5).** Today, delays run from page ready:
fonts loaded, first frame after the orchestrator island hydrates
(006 §6). The cold-load guard holds choreographed content hidden
until `v2-load`. G5 option 2 moves that flip to an inline script
after `document.fonts.ready`, so this audit re-runs against
whichever start the owner picks — including, under option 2, that
the orchestrator reconstructs in-flight or finished state on mount
instead of assuming it starts the run.

Closes when all of the following hold:

- **Timing.** On every page that specs a load choreography, computed
  delays, durations, easings, and fill modes match the spec table.
  The highlight pass starts only after the fade-rises settle; the
  carousel's first advance waits for the highlight (006: +4500ms
  from load start, then 3500ms dwell).
- **Hydration.** No flash of settled content then a replay; no
  hydration mismatches. The cold-load guard holds choreographed
  content hidden until `v2-load`; un-choreographed page content is
  not held. CLS stays on transform/opacity only (010 §4.2).
- **Settle.** The last beat marks `v2-settled`; resizing across
  gates does not replay the load; the grid sweep waits for settled
  before it asserts (010 §3). Dev replay still works (clears the
  mark, re-flips `v2-load`).
- **Reduced motion and no-JS.** Both render the same settled state:
  no sweep, no fade-rise, chips born branded, no timers. Reduced
  motion needs no settle mark.
- **Pages with no choreography** render settled from first paint
  (pricing offer: 011 §9 R10 — none supplied). They must not inherit
  a hide-until-hydrate. A later page that specs an entrance
  inherits 006's orchestrator and this audit; it does not invent a
  second start clock.

---

## Maintaining this checklist

- A page completion updates its row and re-checks G1 in the same
  commit as the phase's final acceptance.
- A new launch-relevant obligation discovered in any spec's build
  lands here as a gate row (or a step), citing its spec section —
  the spec stays the frozen record, this file carries the status.
- A resolved gate keeps one line: the decision, the date, who made
  it.
