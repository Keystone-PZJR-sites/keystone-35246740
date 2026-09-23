/** Landing hero: eyebrow, h1, subhead, and the CTA row rising in
 * sequence, then a seated media frame (the company-hero idiom). Part of
 * the landing kit — see pages/landing.tsx. */

import { GridRegion, type GridBand } from "../grid/region";
import type { PictureSet } from "../media";
import { CtaRow, type CtaLink } from "../primitives/cta-row";
import { Picture } from "../primitives/picture";
import { Slug } from "../primitives/slug";

export interface LandingHeroData {
  eyebrow: string;
  title: string;
  subhead: string;
  cta: CtaLink;
  /** Ambient photography for the seated media frame under the copy. */
  picture: PictureSet;
}

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* Lattice: the copy sits in unpainted air; the media frame is seated —
 * a 12-column field one tick under the slab's top edge, 6 rows through
 * rt and 5 from rd, with a 10-column row on the slab's edge from rt.
 * The frame's exposed bottom row is the section's painted closer. */
const MEDIA_FRAME: Record<GridBand, { gx: number; gy: number; gw: number; gh?: number }[]> = {
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

export function LandingHeroSection({ data }: { data: LandingHeroData }) {
  return (
    <section className="sec ld-sec ld-hero" aria-label={data.eyebrow} data-landmark="ld-hero">
      <header className="ld-hero-head" data-landmark="head">
        <Slug className="hx-rise">{data.eyebrow}</Slug>
        <h1 className="type ts-display-serif-sm-plus-thin ramp-h1 ld-hero-h1 hx-rise">
          {data.title}
        </h1>
        <p className="type ts-text-md-light ramp-body ld-hero-sub hx-rise">{data.subhead}</p>
        <CtaRow cta={data.cta} className="ld-hero-cta hx-rise" />
      </header>

      <figure className="ld-hero-media hx-rise" data-landmark="media">
        <div className="gx ld-bleed" aria-hidden="true">
          {BANDS.map((band) =>
            MEDIA_FRAME[band].map((r, i) => (
              <GridRegion key={`${band}-m${i}`} band={band} {...r} />
            )),
          )}
        </div>
        <div className="ld-hero-frame">
          <Picture set={data.picture} priority />
        </div>
      </figure>
    </section>
  );
}
