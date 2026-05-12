# Spec 027 — Section Height Floor Becomes a Per-Section Opt-In

**Status:** Ready for implementation
**Realigns:** Spec 026 (Section Layout Refactor — replaced the global `min-height: 100svh` floor introduced there)
**Depends on:** Spec 026 (Section Layout Refactor)

---

## What this spec changes

Spec 026 established that every homepage section was sized to its content with a `min-height: 100svh` floor, so a section seen on its own would always fill the visible window. That floor is no longer the default.

Sections size to their content, full stop. The breathing room above and below the content comes from the same `--section-padding-y` token Spec 026 introduced, and that is the only height contribution the section adds beyond what its children require. On a tall window, two adjacent sections may both be visible at once. That is intentional.

A section may opt back into the `min-height: 100svh` floor in its own stylesheet when its layout depends on a known section height. The opt-in is a single CSS line per section, and every opt-in carries an inline comment explaining what would visually break without it.

---

## Why

The Spec 026 floor was a holdover from the pre-026 era when every section was locked to `100vh`. Once layouts moved into normal flow, the floor stopped paying its own way: most sections had no internal layout that depended on the section being a viewport tall, so the floor only added empty space below content that already looked complete.

The visitor concern Spec 026 protected against — a section "feeling small" on a tall window — turned out not to materialise in practice. With consistent `--section-padding-y` and content-driven heights, every section reads as intentionally sized to its contents. Sections that genuinely need a viewport-sized canvas (the hero entry hook, the scattered-thumbnail collages, the flex-grow-driven product-screen card) keep the floor as a deliberate exception.

---

## Sections that keep the floor

Each of these opts into `min-height: 100svh` because removing it would visually break the layout, not just shorten it. The rationale lives in a code comment immediately above the rule.

- **Hero (desktop).** The hero is the page's entry hook and is designed to fill the visible viewport on first load. Sizing it to content would feel anti-climactic on a tall window. (Mobile hero does not opt in — the 40 svh video band plus the headline / subheadline / CTA stack fill enough of a phone screen at intrinsic size to feel intentional.)
- **Social Proof** (desktop and mobile). Six floating thumbnails are absolutely positioned at percentages of section bounds. Without a definite section height the percentages collapse and the thumbnails crowd the headline.
- **Every Channel** (desktop and mobile). Pills are scattered at section-percentage positions; on mobile, the text and video band are also part of the collage. Same reason as Social Proof.
- **Product Screens** (desktop and mobile). The dark card / deco panel uses `flex: 1` to absorb the section's vertical space; without a definite section height the flex child resolves to its content height and the screenshot zone collapses.
- **Value Props** (desktop and mobile). Desktop cards' interior (video panel, copy panel) is absolutely positioned at percentages of card height — without a definite section height the cards collapse to their min-height (~400 px) and the video panel shrinks to ~211 px, well below the Figma intent. Mobile carousel viewport uses `flex: 1` and would resolve to 0.

The section list and rationale also lives in `docs/explainers/responsive.md` § Section Heights — that doc is the source consulted by anyone editing layout, so it must stay in sync with this spec.

---

## Sections that do not keep the floor

These sections size to their content and have no `min-height` declaration. Adding one in the future is allowed only by writing a follow-on spec.

- Pricing (desktop and mobile).
- Value Props — see opt-in list above. *(Listed twice intentionally: a future maintainer scanning this section list shouldn't conclude Value Props is content-driven without reading the opt-in note.)*
- Work Showcase desktop. Mobile Work Showcase has always been content-driven (its content exceeds one viewport).
- Mobile Hero.

---

## Acceptance criteria

- [ ] No section's stylesheet contains `min-height: 100svh` (or any other `100*vh*` floor) without a comment immediately above explaining what visually breaks without it.
- [ ] `docs/explainers/responsive.md` § Section Heights describes the new default (content-driven) and lists every opt-in section with the same rationale this spec captures, in the same order.
- [ ] Pricing (desktop and mobile), Work Showcase desktop, and Mobile Hero are content-driven. Their `min-height` is unset; their height equals their content + `--section-padding-y` top and bottom.
- [ ] Hero desktop, Social Proof (desktop and mobile), Every Channel (desktop and mobile), Product Screens (desktop and mobile), and Value Props (desktop and mobile) keep the `min-height: 100svh` floor with the explanatory comment.
- [ ] At 1440 × 1400 px (tall desktop), the content-driven sections render at their content height with the cream / surrounding background visible below; the next section appears immediately. No section appears empty or "hung".
- [ ] At 1440 × 760 px (short desktop), every section's content is visible with no clipping. The opt-in sections still grow past their floor when content requires.
- [ ] At 393 × 852 px (iPhone 14 reference) and 393 × 1100 px (taller phone in landscape-flipped view), the mobile sections behave identically to the desktop equivalents per the rules above.
- [ ] All entrance animations from Spec 026 still play once on viewport entry. No animation depends on the section being a known height; any that did has been updated to read the section's actual `offsetHeight` at trigger time.
- [ ] `prefers-reduced-motion: reduce` behaviour is unchanged: every section displays its final state immediately on mount.
- [ ] No section uses `h-screen`, `height: 100vh`, or 100vh-based positional math (this carries forward from Spec 026 unchanged).

---

## Scope notes

This spec is layout-only. It does not change:

- Pin behaviour. Spec 026 retired the pin system; the homepage remains a normal scrolling page.
- Entrance animation timing or which sections animate.
- The `--section-padding-y` token or the named exceptions to it (Product Screens uses `--ps-card-inset`, footers handle their own padding).
- The `svh` unit choice — when a section opts into the floor it uses `svh`, not `vh` or `dvh`. Rationale is in Spec 026.
