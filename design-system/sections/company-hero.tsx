import { GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { Slug } from "../primitives/slug";
import { COMPANY_HERO } from "./company-data";
import {
  COMPANY_HERO_VIDEO_POSTERS,
  COMPANY_HERO_VIDEO_SEQUENCE,
} from "./company-hero-data";
import { CompanyHeroVideo } from "./company-hero-island";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

interface R {
  gx: number;
  gy?: number;
  gyb?: number;
  gw?: number;
  gh?: number;
}

/* Lattice: seated media frame only (the bp-content-grid idiom,
 * blog-post.tsx) — a local frame rides the figure, so its gy 0 is the
 * slab's top edge. The field starts 1t down and matches the slab
 * height, leaving one exposed row below the slab (the figure's bottom
 * padding, kept inside the section). No section-level paint: like the
 * post, the next content starts one tick below the frame (the story's
 * padding-top). */

/* The blog-post recipe through rt, with one media row added at rd:
 * rm/rs field only; rt adds the 10t row on the slab's top edge; rd
 * scales the field to the 5t slab (the post goes quiet at rd only for
 * its TOC rail — this page paints). */
const MEDIA_FRAME: Record<GridBand, R[]> = {
  rm: [{ gx: 0, gy: 1, gw: 12, gh: 6 }],
  rs: [{ gx: 0, gy: 1, gw: 12, gh: 6 }],
  rt: [
    { gx: 1, gy: 0, gw: 10 },
    { gx: 0, gy: 1, gw: 12, gh: 6 },
  ],
  rd1: [
    { gx: 1, gy: 0, gw: 10 },
    { gx: 0, gy: 1, gw: 12, gh: 5 },
  ],
  rd2: [
    { gx: 1, gy: 0, gw: 10 },
    { gx: 0, gy: 1, gw: 12, gh: 5 },
  ],
};

export function CompanyHeroSection() {
  return (
    <section
      className="sec company-hero"
      aria-label="About Keystone"
      data-landmark="company-hero"
    >
      <header className="coh-head" data-landmark="head">
        <Slug>{COMPANY_HERO.eyebrow}</Slug>
        <InterpText as="h1" style="display-serif-sm-plus-thin" className="coh-h1">
          {COMPANY_HERO.title}
        </InterpText>
      </header>

      <figure className="coh-media" data-landmark="media">
        <div className="gx co-bleed-grid" aria-hidden="true">
          {BANDS.map((band) =>
            MEDIA_FRAME[band].map((r, i) => (
              <GridRegion key={`${band}-m${i}`} band={band} {...r} />
            )),
          )}
        </div>
        <div className="coh-frame">
          <CompanyHeroVideo
            clips={COMPANY_HERO_VIDEO_SEQUENCE}
            posters={COMPANY_HERO_VIDEO_POSTERS}
          />
        </div>
      </figure>
    </section>
  );
}
