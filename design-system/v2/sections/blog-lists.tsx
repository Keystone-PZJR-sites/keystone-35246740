/** v2 sections — the blog landing lists (spec 025). Server component,
 * zero islands: the featured card, the Recent Posts section, and the
 * category sections, all populated from `blog-data.ts`.
 *
 * The first data-driven surface (plan.md 2026-09-08): the drawn
 * three-card / five-section frames are the ARCHETYPE and the §5
 * derived states govern live data — short stacks keep the drawn
 * stride and their boxes round up to the whole tick that fits (§7 R1);
 * empty tags drop their sections (§7 R3); an empty backend renders
 * nothing here (the 024 top + footer stand alone). Every block is
 * tick-sized in flow, so the section total grows and shrinks by whole
 * ticks (the tick-rounding ruling) — the variable tick math lives in
 * `blogListsTicks` below, which the expectations module consumes
 * (code is the source of truth; nothing is restated by hand).
 *
 * The exposure (§2 as amended) is computed per band from the same
 * counts, so the painted lattice rides the data (the painted-lattice-
 * rides-the-growth law): the field behind the featured card, the
 * mid-gap full row before the categories, and the pre-footer bare +
 * full pair anchored to the section's end.
 *
 * Geometry per band family (the v2 two-gate construction — rs rides
 * the 384 design, rd1 the 1344 zoom):
 *   rm  — featured 16t · recent 1t title + 1t gap + stack (cards 10t
 *         on 1t gaps) · categories 2t title + 1t gap + stack, 2t
 *         between sections
 *   rt  — featured 4t · titles 1t · stacks on the 400 stride (352 +
 *         the ruled 48 — §9 R1) in whole-tick boxes (§7 F1/R1)
 *   rd  — featured 3t · titles 1t · one 3t card row per surface, 1t
 *         between category sections
 * Block gaps: featured → recent 2t · → categories 3t; the section
 * ends with the 2t pre-footer band (bare row + full-lattice row). */

import { GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { ButtonFill } from "../primitives/buttons";
import { ArticleCard, FeaturedArticleCard } from "./blog-cards";
import type { BlogCardModel, BlogLandingModel } from "./blog-data";

/* ---- the §1 tick constants (drawn geometry, per band family) ---- */

const FEAT_T = { rm: 16, rt: 4, rd: 3 } as const;
const GAP_AFTER_FEAT = 2;
const GAP_BEFORE_CATS = 3;
const CAT_GAP = { rm: 2, rt: 2, rd: 1 } as const;
const PRE_FOOTER_T = 2;
/** rt stride px (the §9 R1 ruling): card 352 on 48 gaps. */
const RT_CARD = 352;
const RT_GAP = 48;

/** A stacked list's box ticks for n cards (§7 R1: the drawn stride,
 * the box rounded up to the whole tick that fits). */
function stackRm(n: number): number {
  return 11 * n - 1; // 10t cards on 1t gaps — whole-tick by construction
}
function stackRt(n: number): number {
  return Math.ceil((RT_CARD * n + RT_GAP * (n - 1)) / 64);
}

interface FamilyTicks {
  recent: number;
  catSections: number[];
  midGapRow: number | null;
  total: number;
}

function familyTicks(
  fam: "rm" | "rt" | "rd",
  landing: BlogLandingModel,
): FamilyTicks {
  const nRecent = landing.recent.length;
  const stack = (n: number) =>
    fam === "rm" ? stackRm(n) : fam === "rt" ? stackRt(n) : 3;
  const titleT = fam === "rm" ? 2 : 1; // title + its 1t gap at base; 1t else
  const recent = nRecent > 0 ? titleT + stack(nRecent) : 0;
  const catTitleT = fam === "rm" ? 3 : 1; // 2t title + 1t gap at base
  const catSections = landing.categories.map(
    (c) => catTitleT + stack(c.posts.length),
  );
  const catsT =
    catSections.length > 0
      ? catSections.reduce((a, b) => a + b, 0) +
        CAT_GAP[fam] * (catSections.length - 1)
      : 0;
  const feat = FEAT_T[fam];
  let total = feat;
  let midGapRow: number | null = null;
  if (recent > 0) total += GAP_AFTER_FEAT + recent;
  if (catsT > 0) {
    // the drawn mid-gap full-lattice row sits one row into the 3t gap
    midGapRow = total + 1;
    total += GAP_BEFORE_CATS + catsT;
  }
  total += PRE_FOOTER_T;
  return { recent, catSections, midGapRow, total };
}

/** The per-band-family section ticks — the expectations module's
 * source (app/blog-expectations.ts); never restated by hand. */
export function blogListsTicks(landing: BlogLandingModel): {
  rm: number;
  rt: number;
  rd: number;
} {
  if (!landing.featured) return { rm: 0, rt: 0, rd: 0 };
  return {
    rm: familyTicks("rm", landing).total,
    rt: familyTicks("rt", landing).total,
    rd: familyTicks("rd", landing).total,
  };
}

/* ---- exposure (§2 as amended), computed per family ---- */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}

function exposureFor(fam: "rm" | "rt" | "rd", t: FamilyTicks): R[] {
  const regions: R[] = [];
  if (fam === "rd") {
    // full rows behind the featured card's first two rows, the drawn
    // bare third row, then the rule row below (§2)
    regions.push({ gx: 0, gy: 0, gw: 12, gh: 2 });
    regions.push({ gx: 0, gy: 3, gw: 12, gh: 1 });
  } else {
    // the featured rows + one below, one region (§2)
    regions.push({ gx: 0, gy: 0, gw: 12, gh: FEAT_T[fam] + 1 });
  }
  if (t.midGapRow !== null) {
    regions.push({ gx: 0, gy: t.midGapRow, gw: 12, gh: 1 });
  }
  // the pre-footer full-lattice row, anchored to the section's end
  regions.push({ gx: 0, gy: t.total - 1, gw: 12, gh: 1 });
  return regions;
}

/* ---- the blocks ---- */

function CardRow({
  posts,
  stackTicks,
}: {
  posts: BlogCardModel[];
  stackTicks: { rm: number; rt: number };
}) {
  return (
    <ul
      className="bl-stack"
      style={
        {
          "--bl-st-rm": stackTicks.rm,
          "--bl-st-rt": stackTicks.rt,
        } as React.CSSProperties
      }
    >
      {posts.map((post) => (
        <li key={post.slug}>
          <ArticleCard post={post} />
        </li>
      ))}
    </ul>
  );
}

const FAMS: { fam: "rm" | "rt" | "rd"; bands: GridBand[] }[] = [
  { fam: "rm", bands: ["rm", "rs"] },
  { fam: "rt", bands: ["rt"] },
  { fam: "rd", bands: ["rd1", "rd2"] },
];

export function BlogListsSection({ landing }: { landing: BlogLandingModel }) {
  // an empty backend renders no lists (§5; the 024 top + footer stand)
  if (!landing.featured) return null;

  return (
    <section className="sec v2-bl" aria-label="Articles" data-landmark="blog-lists">
      <div className="gx" aria-hidden="true">
        {FAMS.map(({ fam, bands }) => {
          const t = familyTicks(fam, landing);
          return bands.map((band) =>
            exposureFor(fam, t).map((r, i) => (
              <GridRegion key={`${band}-r${i}`} band={band} {...r} />
            )),
          );
        })}
      </div>

      <div className="bl-feat" data-landmark="feat">
        <FeaturedArticleCard post={landing.featured} />
      </div>

      {landing.recent.length > 0 && (
        <div className="bl-recent" data-landmark="recent">
          <div className="bl-sechead">
            <div className="bl-shrow">
              <InterpText
                as="h3"
                style="display-serif-xs-extralight"
                className="bl-h3"
              >
                Recent Posts
              </InterpText>
            </div>
          </div>
          <CardRow
            posts={landing.recent}
            stackTicks={{
              rm: stackRm(landing.recent.length),
              rt: stackRt(landing.recent.length),
            }}
          />
        </div>
      )}

      {landing.categories.length > 0 && (
        <div className="bl-cats" data-landmark="categories">
          {landing.categories.map((cat) => (
            <section
              key={cat.slug}
              className="bl-catsec"
              aria-label={cat.name}
            >
              <div className="bl-sechead">
                <div className="bl-shrow">
                  <InterpText
                    as="h3"
                    style="display-serif-xs-extralight"
                    className="bl-h3"
                  >
                    {cat.name}
                  </InterpText>
                  <ButtonFill
                    size="sm"
                    chrome="gray"
                    href={`/blog?tag=${encodeURIComponent(cat.slug)}`}
                  >
                    View all
                  </ButtonFill>
                </div>
              </div>
              <CardRow
                posts={cat.posts}
                stackTicks={{
                  rm: stackRm(cat.posts.length),
                  rt: stackRt(cat.posts.length),
                }}
              />
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
