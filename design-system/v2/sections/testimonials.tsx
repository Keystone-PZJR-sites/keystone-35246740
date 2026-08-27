/** v2 sections — testimonials (spec 009). Server component.
 *
 * The fourth and last Phase 5 homepage section. At rd2 it is the
 * rebuild's first full-grid composition: a fully painted lattice with
 * six content elements — three circle photos and three quote cards —
 * staggered across it (§5). Below 1344 the same six elements present
 * as an auto-rotating strip (photo + card pairs) with the side-by-side
 * control pair (§6). One DOM, band-gated presentation (v5 §7.5): the
 * six elements live once, in three slide list items; the strip lays
 * the slides out on the flex track, and at rd2 each element positions
 * absolutely to its §5 grid cell — the photo–card pairings differ
 * between the grid and the strip by design (§9), which is why the
 * re-slotting is per element, not per slide.
 *
 * The lattice is §2's full grid paint (per-cell stroke visibility read
 * through the console bridge at spec time): the field below the header
 * rows, the engine's rail continuing through them, the f-cell and
 * circle ornaments, and the control-row gaps. The photos are the three
 * 672×672 placeholder exports (§5) — single tier, one <picture> per
 * photo, empty alts (ambient).
 *
 * The only client code is the block island (testimonials-block.tsx):
 * the entrance observer and beats, the strip track, the dwell timer,
 * the clones' wrap, and the decode priming. Header and grid chrome are
 * server-rendered; a no-JS render shows the settled at-rest state with
 * the controls inert.
 */

import type { ReactNode } from "react";
import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { GridButton } from "../primitives/grid-button";
import { InterpText } from "../primitives/text";
import { TESTIMONIAL_IMAGES } from "../media";
import { TestimonialsBlock } from "./testimonials-block";

const BANDS: GridBand[] = ["rm", "rs", "rt", "rd1", "rd2"];

/* ---- the full grid paint (§2): plain-cell runs merged into regions
   (adjacent regions share lines by v5 line-inclusive overlap), the
   bg/200 f-cells, and the outline-only circles layered on the painted
   field. The control-row gaps host the arrow pair — the file draws no
   lattice cells there; the controls paint their own cell chrome. ---- */

interface R {
  gx: number;
  gy: number;
  gw?: number;
  gh?: number;
}
interface BandMap {
  regions: R[];
  fills: { gx: number; gy: number }[];
  circles: { gx: number; gy: number }[];
  /** corner triangles (§2 as amended 2026-08-27): the cells the draft
   * read as square f-cells are corner-to-corner triangle vectors in
   * the file — rt/rd1 0×5 and rd2 0×9; none below the 768 design */
  tris?: { gx: number; gy: number }[];
}

const FIELD: Record<GridBand, BandMap> = {
  rm: {
    regions: [
      { gx: 11, gy: 0, gh: 4 },
      { gx: 0, gy: 4, gw: 12, gh: 6 },
      { gx: 0, gy: 10, gw: 9 },
      { gx: 11, gy: 10 },
    ],
    fills: [{ gx: 11, gy: 0 }],
    circles: [{ gx: 1, gy: 4 }],
  },
  rs: {
    regions: [
      { gx: 9, gy: 0, gw: 3, gh: 3 },
      { gx: 0, gy: 3, gw: 12, gh: 5 },
      /* the control-row corner cell paints post-fix (§9 F7) */
      { gx: 0, gy: 8, gw: 8 },
      { gx: 10, gy: 8, gw: 2 },
    ],
    fills: [{ gx: 11, gy: 0 }],
    circles: [{ gx: 10, gy: 3 }],
  },
  rt: {
    regions: [
      { gx: 8, gy: 0, gw: 4, gh: 2 },
      { gx: 0, gy: 2, gw: 12, gh: 4 },
      { gx: 0, gy: 6, gw: 8 },
      { gx: 10, gy: 6, gw: 2 },
    ],
    fills: [{ gx: 11, gy: 0 }],
    tris: [{ gx: 0, gy: 5 }],
    circles: [
      { gx: 1, gy: 2 },
      { gx: 8, gy: 3 },
    ],
  },
  rd1: {
    regions: [
      { gx: 8, gy: 0, gw: 4, gh: 2 },
      { gx: 0, gy: 2, gw: 12, gh: 4 },
      { gx: 0, gy: 6, gw: 8 },
      { gx: 10, gy: 6, gw: 2 },
      { gx: 0, gy: 7, gw: 12 },
    ],
    fills: [
      { gx: 11, gy: 0 },
      { gx: 11, gy: 7 },
    ],
    tris: [{ gx: 0, gy: 5 }],
    circles: [
      { gx: 1, gy: 2 },
      { gx: 8, gy: 3 },
    ],
  },
  rd2: {
    regions: [
      { gx: 8, gy: 0, gw: 4, gh: 2 },
      { gx: 0, gy: 2, gw: 12, gh: 9 },
    ],
    fills: [
      { gx: 11, gy: 0 },
      { gx: 11, gy: 10 },
    ],
    tris: [{ gx: 0, gy: 9 }],
    circles: [
      { gx: 7, gy: 5 },
      { gx: 0, gy: 6 },
      { gx: 5, gy: 7 },
      { gx: 11, gy: 9 },
    ],
  },
};

/* ---- content (§3/§4). One unified header line at every band (§9 F4);
   the quotes ship curly per the 008 F8 canon; the attribution is
   placeholder content on every card (decision 2026-08-26 — a content
   pass replaces it before cutover, tracked in §9, not a build gate). ---- */

const HEADLINE = "A system that feels designed for your business.";

type CardColor = "green" | "brown" | "yellow";

interface Testimonial {
  color: CardColor;
  quote: ReactNode;
  name: string;
  business: string;
}

/* canonical order green · brown · yellow — the strip's slide order (§4) */
const TESTIMONIALS: Testimonial[] = [
  {
    color: "green",
    quote:
      "\u201cI\u2019ve got more leads than I can chase down and now I\u2019m actually hiring because of it.\u201d",
    name: "Kelly L.",
    business: "Zivel Palm Coast",
  },
  {
    color: "brown",
    quote:
      "\u201cDoesn\u2019t matter if someone calls, texts, or fills out a form. It\u2019s all one conversation now.\u201d",
    name: "Kelly L.",
    business: "Zivel Palm Coast",
  },
  {
    color: "yellow",
    /* designed break after "Now I have" at rd2 only (§4); the space
       after the gated <br> collapses at the line start when it shows */
    quote: (
      <>
        {"\u201cI had five logins, three vendors, and zero answers. Now I have"}
        <br className="tst-br" /> {"one conversation.\u201d"}
      </>
    ),
    name: "Kelly L.",
    business: "Zivel Palm Coast",
  },
];

/* ---- the card (§4) and the photo (§5). Clones render the same
   chrome as plain divs — presentation-only, hidden from the tree
   (their whole slide is aria-hidden), no entrance beats. ---- */

function Card({ t, clone = false }: { t: Testimonial; clone?: boolean }) {
  const Quote = clone ? "div" : "blockquote";
  const Attr = clone ? "div" : "figcaption";
  const inner = (
    <>
      <Quote className="tst-quote">{t.quote}</Quote>
      <Attr className="tst-attr">
        <span className="tst-name">{t.name}</span>
        <span className="tst-badge">{t.business}</span>
      </Attr>
    </>
  );
  if (clone) {
    return (
      <div className="tst-card" data-color={t.color}>
        {inner}
      </div>
    );
  }
  return (
    <figure className={`tst-card tst-part tst-card-${t.color}`} data-color={t.color}>
      {inner}
    </figure>
  );
}

/** Single-tier placeholder through the 006/007/008 <picture> pattern
 * (one source file serves every band, §5); the real art-directed tier
 * set drops into the same markup. Photos 01 and 02 are eager — they
 * are at-rest visible at every band and the entrance needs their
 * pixels (§7.1); photo 03 is at-rest visible only at rd2, where the
 * island primes it (with the clones' repeats, which share the cached
 * URLs). */
function Photo({ index, clone = false }: { index: number; clone?: boolean }) {
  const img = TESTIMONIAL_IMAGES[index];
  return (
    <div className={clone ? "tst-photo" : `tst-photo tst-part tst-photo-${index + 1}`}>
      <picture>
        <img
          src={img.src}
          width={img.width}
          height={img.height}
          alt=""
          decoding="async"
          loading={!clone && index < 2 ? "eager" : "lazy"}
        />
      </picture>
    </div>
  );
}

/* ---- the control pair (§6): the spec 007 grid-button primitive,
   side-by-side, back (square) left of forward (round), sized per band
   at §2's cells. Navigation loops (§7.3) so neither button ever
   disables; rd2 has no controls — the grid does not rotate. ---- */

const CTRL_SIZES: Partial<Record<GridBand, "xs" | "sm" | "md" | "lg">> = {
  rm: "xs",
  rs: "sm",
  rt: "md",
  rd1: "lg",
};

export function TestimonialsSection() {
  return (
    <section className="sec v2-tst" aria-labelledby="tst-heading">
      {/* the designed section-top rule (§1): 1px border/000 on the
          section's first row line, spanning 11t/9t/8t/8t/11t — the
          first designed top rule that is not full width. Chrome. */}
      <i className="tst-toprule" aria-hidden="true" />

      {/* the full grid paint (§2) */}
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => [
          ...FIELD[band].regions.map((r, i) => (
            <GridRegion key={`${band}-r${i}`} band={band} {...r} />
          )),
          ...FIELD[band].fills.map((o) => (
            <GridDecor key={`${band}-f${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell fill" />
            </GridDecor>
          )),
          ...(FIELD[band].tris ?? []).map((o) => (
            <GridDecor key={`${band}-t${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="tst-tri" />
            </GridDecor>
          )),
          ...FIELD[band].circles.map((o) => (
            <GridDecor key={`${band}-o${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell round" />
            </GridDecor>
          )),
        ])}
      </div>

      {/* header (§3) — one unified line (§9 F4), centered in its
          block; the weight/tracking switch at the 1344 gate rides two
          band-gated spans (the 007 pattern); size interpolates. */}
      <div className="tst-header tst-part" data-landmark="head">
        <h2 className="tst-h2" id="tst-heading">
          <InterpText as="span" style="display-serif-xs-extralight" className="tst-h2-lo">
            {HEADLINE}
          </InterpText>
          <InterpText as="span" style="display-serif-md-plus-thin" className="tst-h2-hi">
            {HEADLINE}
          </InterpText>
        </h2>
      </div>

      {/* the content block (§5/§6/§7) — the one client island. Three
          slides (photo + card pairs, the strip's pairings) plus three
          aria-hidden tail clones for the seamless wrap; at rd2 the six
          real elements re-slot onto the grid and the clones drop. */}
      <TestimonialsBlock>
        <div className="tst-window" data-landmark="strip">
          <ul className="tst-track">
            {TESTIMONIALS.map((t, i) => (
              <li className="tst-slide" key={t.color}>
                <Photo index={i} />
                <Card t={t} />
              </li>
            ))}
            {TESTIMONIALS.map((t, i) => (
              <li className="tst-slide tst-clone" key={`clone-${t.color}`} aria-hidden="true">
                <Photo index={i} clone />
                <Card t={t} clone />
              </li>
            ))}
          </ul>
        </div>
        {(Object.keys(CTRL_SIZES) as GridBand[]).map((band) => (
          <div key={band} className={`tst-ctrl tst-ctrl-${band}`} data-landmark="ctrl">
            <GridButton direction="back" size={CTRL_SIZES[band]} label="Previous testimonial" />
            <GridButton direction="forward" size={CTRL_SIZES[band]} label="Next testimonial" />
          </div>
        ))}
      </TestimonialsBlock>
    </section>
  );
}
