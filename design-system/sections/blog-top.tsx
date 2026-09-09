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
import { SITE_LINKS } from "../site-links";
import { BlogSearchIsland } from "./blog-search-island";
import { BLOG_TOP_CONTENT } from "./blog-top-data";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

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
  ],
  rt: [
    { gx: 11, gy: 4 },
    { gx: 0, gy: 5, gw: 12, gh: 7 },
  ],
  rd1: [
    { gx: 11, gy: 2, gh: 2 },
    { gx: 0, gy: 4, gw: 12, gh: 5 },
  ],
  rd2: [
    { gx: 11, gy: 2, gh: 2 },
    { gx: 0, gy: 4, gw: 12, gh: 5 },
  ],
};

const ORNAMENTS: Record<GridBand, R[]> = {
  rm: [{ gx: 11, gy: 6 }],
  rs: [{ gx: 11, gy: 6 }],
  rt: [{ gx: 11, gy: 5 }],
  rd1: [{ gx: 11, gy: 3 }],
  rd2: [{ gx: 11, gy: 3 }],
};

export function BlogTopSection({
  youtubeUrl,
  searchQuery = "",
}: {
  youtubeUrl?: string;
  searchQuery?: string;
}) {
  return (
    /* The pre-paint data-js attribute intentionally precedes hydration. */
    <section
      className="sec blog-top"
      aria-label="Blog"
      data-landmark="blog-top"
      suppressHydrationWarning
    >
      {/* Set before paint so JavaScript users do not see the no-JS search state flash. */}
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

      <header className="bt-head">
        <InterpText as="p" style="text-xs-medium" className="bt-slug">
          {BLOG_TOP_CONTENT.eyebrow}
        </InterpText>
        <InterpText as="h1" style="display-serif-sm-plus-thin" className="bt-h1">
          {BLOG_TOP_CONTENT.title}
        </InterpText>
      </header>

      <article className="bt-card bt-podcast">
        <div className="bt-card-top">
          <div className="bt-card-titlerow">
            <InterpText as="h2" style="display-serif-xs-regular" className="bt-card-title">
              {BLOG_TOP_CONTENT.podcastTitle}
            </InterpText>
            <span className="bt-chip" aria-hidden="true">
              <IconPodcast size={16} />
            </span>
          </div>
          <InterpText as="p" style="text-md-light" className="bt-card-desc">
            {BLOG_TOP_CONTENT.podcastDescription}
          </InterpText>
        </div>
        <div className="bt-card-action">
          <InterpText as="p" style="text-nav-label" className="bt-listen">
            {BLOG_TOP_CONTENT.listenLabel}
          </InterpText>
          <ul className="bt-socials">
            <li>
              <a className="bt-social" href={SITE_LINKS.spotify} aria-label="Listen on Spotify">
                <IconSocialSpotify />
              </a>
            </li>
            {youtubeUrl && (
              <li>
                <a className="bt-social" href={youtubeUrl} aria-label="Listen on YouTube">
                  <IconSocialYoutube />
                </a>
              </li>
            )}
            <li>
              <a
                className="bt-social"
                href={SITE_LINKS.applePodcasts}
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
              {BLOG_TOP_CONTENT.graderTitle}
            </InterpText>
            <span className="bt-chip" aria-hidden="true">
              <IconGrader size={16} />
            </span>
          </div>
          <InterpText as="p" style="text-md-light" className="bt-card-desc">
            {BLOG_TOP_CONTENT.graderDescription}
          </InterpText>
        </div>
        <div className="bt-card-action">
          <div className="bt-grader bt-grader-md">
            <GraderInput size="md" chrome="brown" />
          </div>
          <div className="bt-grader bt-grader-lg">
            <GraderInput size="lg" chrome="brown" />
          </div>
        </div>
      </article>

      <div className="bt-bh">
        <div className="bt-bh-row">
          <div className="bt-bh-title">
            <span className="bt-bh-chip" aria-hidden="true">
              <IconBlog size={16} />
            </span>
            <InterpText as="h2" style="display-serif-xs-extralight" className="bt-bh-h2">
              {BLOG_TOP_CONTENT.blogHeading}
            </InterpText>
          </div>
          <BlogSearchIsland initialQuery={searchQuery} />
        </div>
      </div>
    </section>
  );
}
