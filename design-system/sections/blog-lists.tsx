import { GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { ButtonFill } from "../primitives/buttons";
import { ArticleCard, FeaturedArticleCard } from "./blog-cards";
import type { BlogCardModel, BlogLandingModel } from "./blog-data";

const FEAT_T = { rm: 16, rt: 4, rd: 3 } as const;
const GAP_AFTER_FEAT = 2;
const GAP_BEFORE_CATS = 3;
const CAT_GAP = { rm: 2, rt: 2, rd: 1 } as const;
const PRE_FOOTER_T = 2;
const RT_CARD = 352;
const RT_GAP = 48;

function stackRm(n: number): number {
  return 11 * n - 1;
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
  const titleT = fam === "rm" ? 2 : 1;
  const recent = nRecent > 0 ? titleT + stack(nRecent) : 0;
  const catTitleT = fam === "rm" ? 3 : 1;
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
    midGapRow = total + 1;
    total += GAP_BEFORE_CATS + catsT;
  }
  total += PRE_FOOTER_T;
  return { recent, catSections, midGapRow, total };
}

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

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}

function exposureFor(fam: "rm" | "rt" | "rd", t: FamilyTicks): R[] {
  const regions: R[] = [];
  if (fam === "rd") {
    regions.push({ gx: 0, gy: 0, gw: 12, gh: 2 });
    regions.push({ gx: 0, gy: 3, gw: 12, gh: 1 });
  } else {
    regions.push({ gx: 0, gy: 0, gw: 12, gh: FEAT_T[fam] + 1 });
  }
  if (t.midGapRow !== null) {
    regions.push({ gx: 0, gy: t.midGapRow, gw: 12, gh: 1 });
  }
  regions.push({ gx: 0, gy: t.total - 1, gw: 12, gh: 1 });
  return regions;
}

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
  if (!landing.featured) return null;

  return (
    <section className="sec blog-lists" aria-label="Articles" data-landmark="blog-lists">
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
