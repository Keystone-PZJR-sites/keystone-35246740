/** v2 sections — the blog landing top (spec 024). Server component.
 *
 * The slice (§1): the page H1 header (the standing slug pair over the
 * serif Thin headline — flowed content at material y, off the ticks),
 * the two feature cards (the Made Locally podcast card on the yellow
 * chrome; the Grader card on the brown chrome mounting the 003
 * primitive), and the blog header row (icon slug + `The Blog` h2 +
 * the collapsing search module). The lists below are spec 025.
 *
 * Three drawn anchors (384 · 768 · 1344, plan.md three-anchor policy):
 * rs derives from the 384 design (pure zoom — the 018 R9 midpoint
 * split is NOT pre-applied; §1 reserves it for the built evaluation),
 * rd1 from the 1344 design zooming on the tick.
 *
 * The search module (§5): a real GET form. No-JS renders the OPEN
 * functional pill (§9 R3); the inline flip below sets [data-js] on
 * the section synchronously — before first paint — so a JS load
 * renders the drawn collapsed rest from the first frame (§9 R4, the
 * cold-load-guard doctrine). The one island (blog-search-island)
 * owns open/close, focus, and Escape.
 *
 * Podcast links: Spotify/Apple ride the shared podcast-links module
 * (§8); YouTube arrives per the 004 wiring (`youtube_url`, "#" when
 * absent). The whole card is NOT a link — only the three discs (§5).
 */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { GraderInput } from "../primitives/grader";
import {
  IconBlog,
  IconGrader,
  IconPodcast,
  IconSocialApplePodcasts,
  IconSocialSpotify,
  IconSocialYoutube,
} from "../icons";
import { BlogSearchIsland } from "./blog-search-island";
import { PODCAST_SPOTIFY_URL, PODCAST_APPLE_PODCASTS_URL } from "./podcast-links";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* ---- exposure map (§2), section-local ticks — read per-cell through
   the bridge at the spec's writing and re-verified at the build's
   fresh-read pass (§9 R4). Exposure is stroke visibility on the Grid
   cells (the 022 B13 encoding). 384: east rail col 11 rows 5–7 + the
   full field rows 8–23 (the cards' rows + the r23 clearance row);
   768: col 11 row 4 + full rows 5–11; 1344: col 11 rows 2–3 + full
   rows 4–8. The blog-header rows are bare at every anchor; the next
   full row (r28 · r15 · r11) is spec 025's region. */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}

const SECTION_MAP: Record<GridBand, R[]> = {
  rm: [
    { gx: 11, gy: 5, gh: 3 },
    { gx: 0, gy: 8, gw: 12, gh: 16 },
  ],
  rs: [
    { gx: 11, gy: 5, gh: 3 },
    { gx: 0, gy: 8, gw: 12, gh: 16 },
  ], // derived from 384 (§1)
  rt: [
    { gx: 11, gy: 4 },
    { gx: 0, gy: 5, gw: 12, gh: 7 },
  ],
  rd1: [
    { gx: 11, gy: 2, gh: 2 },
    { gx: 0, gy: 4, gw: 12, gh: 5 },
  ], // derived from 1344 (§1)
  rd2: [
    { gx: 11, gy: 2, gh: 2 },
    { gx: 0, gy: 4, gw: 12, gh: 5 },
  ],
};

/* the ○ ornaments (§2 as amended — §9 R2): one unfilled circle per
   anchor on the east rail */
const ORNAMENTS: Record<GridBand, R[]> = {
  rm: [{ gx: 11, gy: 6 }],
  rs: [{ gx: 11, gy: 6 }],
  rt: [{ gx: 11, gy: 5 }],
  rd1: [{ gx: 11, gy: 3 }],
  rd2: [{ gx: 11, gy: 3 }],
};

/* the §3/§4 copy canon — read from the drawn nodes at the build's
   fresh-read pass */
const H1_CANON = "Resources for growing your business.";
const PODCAST_DESC =
  "Conversations with small business owners building on their own.";
const GRADER_DESC =
  "A free look at how your business shows up online, and what to fix first.";

export function BlogTopSection({ youtubeUrl }: { youtubeUrl?: string }) {
  return (
    /* suppressHydrationWarning: the pre-paint [data-js] flip below is a
       deliberate pre-hydration attribute (the theme-script pattern) —
       React 19 leaves it in place and would otherwise log a dev-only
       mismatch warning for it */
    <section
      className="sec v2-bt"
      aria-label="Blog"
      data-landmark="blog-top"
      suppressHydrationWarning
    >
      {/* the no-flash flip (§5 as amended, §9 R4): no-JS keeps the OPEN
          functional search form; with JS this synchronous flip lands
          before first paint so the drawn collapsed rest renders from
          the first frame — the cold-load-guard doctrine. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.currentScript.parentElement.setAttribute('data-js','')",
        }}
      />

      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          ...SECTION_MAP[band].map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band} {...r} />
          )),
          ...ORNAMENTS[band].map((o, i) => (
            <GridDecor key={`${band}-o${i}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell round" />
            </GridDecor>
          )),
        ])}
      </div>

      {/* the page H1 header (§3 as amended §9 R2): the standing slug
          pair above the headline; flowed content at material y */}
      <header className="bt-head">
        <InterpText as="p" style="text-xs-medium" className="bt-slug">
          The Blog
        </InterpText>
        <InterpText as="h1" style="display-serif-sm-plus-thin" className="bt-h1">
          {H1_CANON}
        </InterpText>
      </header>

      {/* the feature cards (§4): flush pair, the grader 1t lower at
          rt/rd2, stacked on a 1t gap at base. DOM order is paint
          order — the grader's border wins the shared col-6 pixel
          (the line-inclusive law; z-order decides). */}
      <article className="bt-card bt-podcast">
        <div className="bt-card-top">
          <div className="bt-card-titlerow">
            <InterpText as="h2" style="display-serif-xs-regular" className="bt-card-title">
              Made Locally
            </InterpText>
            <span className="bt-chip" aria-hidden="true">
              <IconPodcast size={16} />
            </span>
          </div>
          <InterpText as="p" style="text-md-light" className="bt-card-desc">
            {PODCAST_DESC}
          </InterpText>
        </div>
        <div className="bt-card-action">
          <InterpText as="p" style="text-nav-label" className="bt-listen">
            LISTEN ON
          </InterpText>
          <ul className="bt-socials">
            <li>
              <a className="bt-social" href={PODCAST_SPOTIFY_URL} aria-label="Listen on Spotify">
                <IconSocialSpotify />
              </a>
            </li>
            <li>
              <a className="bt-social" href={youtubeUrl ?? "#"} aria-label="Listen on YouTube">
                <IconSocialYoutube />
              </a>
            </li>
            <li>
              <a
                className="bt-social"
                href={PODCAST_APPLE_PODCASTS_URL}
                aria-label="Listen on Apple Podcasts"
              >
                <IconSocialApplePodcasts />
              </a>
            </li>
          </ul>
        </div>
      </article>

      <article className="bt-card bt-gcard">
        <div className="bt-card-top">
          <div className="bt-card-titlerow">
            <InterpText as="h2" style="display-serif-xs-regular" className="bt-card-title">
              The Grader
            </InterpText>
            <span className="bt-chip" aria-hidden="true">
              <IconGrader size={16} />
            </span>
          </div>
          <InterpText as="p" style="text-md-light" className="bt-card-desc">
            {GRADER_DESC}
          </InterpText>
        </div>
        {/* the 003 form on the brown chrome (§4): md below the rd1
            gate, lg from it — two mounts, display-gated (the wd-cta
            pattern; display:none leaves the a11y tree) */}
        <div className="bt-card-action">
          <div className="bt-grader bt-grader-md">
            <GraderInput size="md" chrome="brown" />
          </div>
          <div className="bt-grader bt-grader-lg">
            <GraderInput size="lg" chrome="brown" />
          </div>
        </div>
      </article>

      {/* the blog header row (§3): icon slug + h2 + the search module,
          right-flush; at base the open pill replaces the title (§4) */}
      <div className="bt-bh">
        <div className="bt-bh-row">
          <div className="bt-bh-title">
            <span className="bt-bh-chip" aria-hidden="true">
              <IconBlog size={16} />
            </span>
            <InterpText as="h2" style="display-serif-xs-extralight" className="bt-bh-h2">
              The Blog
            </InterpText>
          </div>
          <BlogSearchIsland />
        </div>
      </div>
    </section>
  );
}
