import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { GraderInput } from "../primitives/grader";
import { Slug } from "../primitives/slug";
import {
  IconBlog,
  IconGrader,
  IconPodcast,
  IconSocialApplePodcasts,
  IconSocialSpotify,
  IconSocialYoutube,
} from "../icons";
import { EXTERNAL_LINK, SITE_LINKS } from "../site-links";
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
        <Slug>{BLOG_TOP_CONTENT.eyebrow}</Slug>
        <h1 className="type bt-h1">
          {BLOG_TOP_CONTENT.title}
        </h1>
      </header>

      <article className="bt-card bt-podcast">
        <div className="bt-card-top">
          <div className="bt-card-titlerow">
            <h2 className="type bt-card-title">
              {BLOG_TOP_CONTENT.podcastTitle}
            </h2>
            <span className="bt-chip" aria-hidden="true">
              <IconPodcast size={16} />
            </span>
          </div>
          <p className="type bt-card-desc">
            {BLOG_TOP_CONTENT.podcastDescription}
          </p>
        </div>
        <div className="bt-card-action">
          <p className="type bt-listen">
            {BLOG_TOP_CONTENT.listenLabel}
          </p>
          <ul className="bt-socials">
            <li>
              <a
                className="bt-social"
                href={SITE_LINKS.spotify}
                aria-label="Listen on Spotify"
                {...EXTERNAL_LINK}
              >
                <IconSocialSpotify />
              </a>
            </li>
            {youtubeUrl && (
              <li>
                <a
                  className="bt-social"
                  href={youtubeUrl}
                  aria-label="Listen on YouTube"
                  {...EXTERNAL_LINK}
                >
                  <IconSocialYoutube />
                </a>
              </li>
            )}
            <li>
              <a
                className="bt-social"
                href={SITE_LINKS.applePodcasts}
                aria-label="Listen on Apple Podcasts"
                {...EXTERNAL_LINK}
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
            <h2 className="type bt-card-title">
              {BLOG_TOP_CONTENT.graderTitle}
            </h2>
            <span className="bt-chip" aria-hidden="true">
              <IconGrader size={16} />
            </span>
          </div>
          <p className="type bt-card-desc">
            {BLOG_TOP_CONTENT.graderDescription}
          </p>
        </div>
        <div className="bt-card-action">
          <div className="bt-grader">
            <GraderInput size="inherit" chrome="brown" />
          </div>
        </div>
      </article>

      <div className="bt-bh">
        <div className="bt-bh-row">
          <div className="bt-bh-title">
            <span className="bt-bh-chip" aria-hidden="true">
              <IconBlog size={16} />
            </span>
            <h2 className="type bt-bh-h2">
              {BLOG_TOP_CONTENT.blogHeading}
            </h2>
          </div>
          <BlogSearchIsland initialQuery={searchQuery} />
        </div>
      </div>
    </section>
  );
}
