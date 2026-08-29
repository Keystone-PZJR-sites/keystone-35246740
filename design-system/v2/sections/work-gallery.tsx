/** v2 sections — work-gallery (spec 015). The Our Work page's second
 * section: page rows from the gallery-header top (014's section end)
 * to the footer top — the header ("The Gallery" · the View-fullscreen
 * CTA), the nine-image mosaic at rt/rd1/rd2, the horizontal strip at
 * rm/rs, and the pre-footer full-lattice row.
 *
 * One DOM serves both renderings (§5): the nine images render once in
 * the strip order 01–09; the rt+ bands lay them on the §4 grid
 * (explicit grid areas from the data module), the rm/rs bands lay
 * them on the strip track. The band switch is the container-query
 * gate; the strip's island state never leaks into the mosaic
 * rendering (the k custom property drives only the strip-scope
 * translate, and the ghost dressing resets above the gate).
 *
 * The island (work-gallery-island.tsx) is this section's one client
 * island — the §5.1 strip machine, inert above the rs gate (it
 * measures the container, never matchMedia; the 008 precedent). A
 * no-JS render is the settled strip at k=1; the mosaic bands need no
 * JavaScript. No entrance — the section sits below the 014 §6.0 fold
 * at every band and is born settled (plan.md 2026-08-28); the page's
 * rises-only choreography is untouched.
 *
 * The View-fullscreen CTA is the built 003 ButtonFill's gray chrome
 * (§3.1 — the set's full chrome=gray axis; sizes sm/sm/md/md/lg per
 * band, the 011 po-cardbtn band-gated-mount pattern). It ships as a
 * real button on the inert data-action="open-gallery" contract (§9
 * F6, the 006 open-chat precedent); 016 wires the overlay.
 *
 * The lattice over these rows is minimal (§2): the east rail (col 11)
 * through every section row and the pre-footer full-lattice row, with
 * ■[11,86] at rm and ○[10,63] at rs (page rows; the maps below are
 * section-local). The header block carries the section's own top
 * hairline (§2) in work-gallery.css. Every cell, landmark, tile, and
 * slide was verified against rendered bounds at build, 2026-08-28. */

import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonFill } from "../primitives/buttons";
import { GALLERY_TIERS, gallerySrc } from "../media";
import { GALLERY_SITES } from "./work-gallery-data";
import { WorkGalleryIsland } from "./work-gallery-island";
import type { CSSProperties } from "react";

/* ---- the exposure map (§2), section-local rows (page row = gy +
   the gallery-header top 75/53/29/26/22). The east rail runs to the
   full-lattice row, which supplies the rail's last cell; the rm/rs
   ornaments sit in their bands' full rows. ---- */

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
    <section className="sec v2-wg">
      {/* the east rail, the pre-footer full-lattice row, and the
          rm/rs ornaments (§2) */}
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

      {/* the gallery header (§3): the title west, the CTA east, both
          vertically centered in the tick-height block; the forced
          two-line break is presentational (§9 F3 — the accessible
          name reads through the <br>) */}
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

      {/* the gallery (§4/§5): one list, two renderings. The viewport
          is the §5.1 focusable group in strip mode (the island sets
          tabIndex below the gate); the ghost-click overlays are real
          buttons, present only in strip mode (CSS). Slide 1 is the
          server-rendered active slide (a no-JS render is the settled
          strip at k=1). */}
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
              </li>
            ))}
          </ul>
        </div>
      </WorkGalleryIsland>
    </section>
  );
}
