/** Responsive gallery. One image list renders as a horizontal strip at
 * rm/rs and as a mosaic at larger bands. Strip state affects only the
 * narrow layout. The overlay opens through `data-action="open-gallery"`. */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonFill } from "../primitives/buttons";
import { GALLERY_TIERS, gallerySrc } from "../media";
import { GALLERY_SITES } from "./work-gallery-data";
import { WorkGalleryIsland } from "./work-gallery-island";
import type { CSSProperties } from "react";

/* East rail and pre-footer lattice in section-local ticks. */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}
interface Cell {
  gx: number;
  gy: number;
}
interface BandMap {
  regions: R[];
  circles: Cell[];
  squares: Cell[];
}

const FIELD: Record<GridBand, BandMap> = {
  rm: {
    regions: [
      { gx: 11, gy: 0, gh: 11 },
      { gx: 0, gy: 11, gw: 12 },
    ],
    circles: [],
    squares: [{ gx: 11, gy: 11 }],
  },
  rs: {
    regions: [
      { gx: 11, gy: 0, gh: 10 },
      { gx: 0, gy: 10, gw: 12 },
    ],
    circles: [{ gx: 10, gy: 10 }],
    squares: [],
  },
  rt: {
    regions: [
      { gx: 11, gy: 0, gh: 15 },
      { gx: 0, gy: 15, gw: 12 },
    ],
    circles: [],
    squares: [],
  },
  rd1: {
    regions: [
      { gx: 11, gy: 0, gh: 14 },
      { gx: 0, gy: 14, gw: 12 },
    ],
    circles: [],
    squares: [],
  },
  rd2: {
    regions: [
      { gx: 11, gy: 0, gh: 14 },
      { gx: 0, gy: 14, gw: 12 },
    ],
    circles: [],
    squares: [],
  },
};

const BANDS = Object.keys(FIELD) as GridBand[];

const CTA_LABEL = "View fullscreen";

export function WorkGallerySection() {
  const fallback = GALLERY_TIERS[GALLERY_TIERS.length - 1];
  return (
    <section className="sec work-gallery-section">
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          ...FIELD[band].regions.map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band} {...r} />
          )),
          ...FIELD[band].circles.map((o) => (
            <GridDecor key={`${band}-o${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell round" />
            </GridDecor>
          )),
          ...FIELD[band].squares.map((o) => (
            <GridDecor key={`${band}-f${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell fill" />
            </GridDecor>
          )),
        ])}
      </div>

      {/* The presentational break does not interrupt the accessible name. */}
      <header className="wg-head" data-landmark="gallery-head">
        <h2 className="wg-title">
          The
          <br />
          Gallery
        </h2>
        <div className="wg-cta wg-cta-sm">
          <ButtonFill size="sm" chrome="gray" action="open-gallery">
            {CTA_LABEL}
          </ButtonFill>
        </div>
        <div className="wg-cta wg-cta-md">
          <ButtonFill size="md" chrome="gray" action="open-gallery">
            {CTA_LABEL}
          </ButtonFill>
        </div>
        <div className="wg-cta wg-cta-lg">
          <ButtonFill size="lg" chrome="gray" action="open-gallery">
            {CTA_LABEL}
          </ButtonFill>
        </div>
      </header>

      {/* One list renders as a focusable strip or mosaic; each image opens the viewer. */}
      <WorkGalleryIsland>
        <div className="wg-view" role="group" aria-label="Gallery" data-landmark="gallery">
          <ul className="wg-list">
            {GALLERY_SITES.map((site, i) => (
              <li
                key={site.image}
                className="wg-slide"
                data-active={i === 0 ? "" : undefined}
                data-east={site.east || undefined}
                data-south={site.south || undefined}
                style={{ "--wg-area": site.area } as CSSProperties}
              >
                <picture>
                  {GALLERY_TIERS.filter((t) => t.media !== null).map((t) => (
                    <source
                      key={t.cut}
                      media={t.media ?? undefined}
                      srcSet={gallerySrc(site.image, t.cut)}
                      width={t.width}
                      height={t.height}
                    />
                  ))}
                  <img
                    src={gallerySrc(site.image, fallback.cut)}
                    width={fallback.width}
                    height={fallback.height}
                    alt={`The ${site.name} website`}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <button type="button" className="wg-show" aria-label={`Show ${site.name}`} />
                <button
                  type="button"
                  className="wg-open"
                  data-action="open-gallery"
                  data-gallery-site={i + 1}
                  aria-label={`View ${site.name} fullscreen`}
                />
              </li>
            ))}
          </ul>
        </div>
      </WorkGalleryIsland>
    </section>
  );
}
