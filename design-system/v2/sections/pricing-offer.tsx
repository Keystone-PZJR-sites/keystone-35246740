/** v2 sections — pricing-offer (spec 011). Server component, zero
 * client islands: hover is CSS, the CTAs are links, the chat buttons
 * are inert (§8). The pricing page's first section — page rows 0 → the
 * price-scale top: the header, the chat rows, the $50 card with its
 * CTA and hanging tag, and the included list.
 *
 * The section is born settled — no load choreography was supplied
 * (§9 R10); a no-JS render is identical.
 *
 * The rs band is derived from rm (§1.1, owner decision 2026-08-27):
 * the rm structure re-laid on the 48px tick, type and material holding
 * the rm designed values, block heights the smallest whole ticks that
 * fit. Design evaluates the built band manually on the dev route; the
 * evaluated totals land as a dated §1 amendment.
 *
 * The lattice over the section is §2's east-edge staircase plus the
 * ornament cells, drawn through the spec 002 vocabulary; the two
 * grid-hygiene flags (§9 F1 resolved / F2 open) are design-side —
 * neither is built.
 */

import type { CSSProperties, ReactNode } from "react";
import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonFill, ButtonGhost } from "../primitives/buttons";
import { PricingButton } from "../primitives/pricing-button";
import {
  IconAiChat,
  IconChat,
  IconMaps,
  IconReception,
  IconReviews,
  IconSearch,
  IconTokens,
  IconWebsite,
} from "../icons";
import { INCLUDED_ITEMS, PRICING_CHECKOUT_URL, type IncludedIcon } from "./pricing-offer-data";

/* ---- the exposure map (§2): the east-edge staircase descending from
   the top-right corner, plus the ornament cells — verified cell-by-cell
   against rendered bounds 2026-08-27. Runs merge into regions (adjacent
   regions share lines by v5 line-inclusive overlap); ornaments overlay
   the painted field. The rs staircase derives from rm (§1.1): the same
   descent, the run extended to the derived section end. ---- */

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
  fillCircles?: Cell[];
  squares: Cell[];
}

const FIELD: Record<GridBand, BandMap> = {
  rm: {
    regions: [
      { gx: 11, gy: 4 },
      { gx: 10, gy: 5, gw: 2 },
      { gx: 9, gy: 6, gw: 3, gh: 39 },
    ],
    circles: [
      { gx: 11, gy: 5 },
      { gx: 10, gy: 14 },
      { gx: 9, gy: 29 },
    ],
    fillCircles: [{ gx: 9, gy: 7 }],
    squares: [
      { gx: 11, gy: 12 },
      { gx: 11, gy: 23 },
    ],
  },
  /* designed 2026-08-27 (frame 634:33130, §2 amendment — §9 R15); the
     invisible [8,13] cell in the file's Grid layer is a hygiene flag,
     not built */
  rs: {
    regions: [
      { gx: 11, gy: 4 },
      { gx: 10, gy: 5, gw: 2 },
      { gx: 9, gy: 6, gw: 3, gh: 15 },
      { gx: 9, gy: 21, gw: 2 },
    ],
    circles: [
      { gx: 11, gy: 5 },
      { gx: 9, gy: 7 },
      { gx: 10, gy: 14 },
      { gx: 9, gy: 19 },
    ],
    squares: [{ gx: 11, gy: 20 }],
  },
  rt: {
    regions: [
      { gx: 11, gy: 2 },
      { gx: 10, gy: 3, gw: 2 },
      { gx: 9, gy: 4, gw: 3 },
      { gx: 8, gy: 5, gw: 4, gh: 11 },
    ],
    circles: [
      { gx: 11, gy: 3 },
      { gx: 9, gy: 5 },
      { gx: 8, gy: 15 },
    ],
    fillCircles: [{ gx: 11, gy: 14 }],
    squares: [{ gx: 11, gy: 7 }],
  },
  /* re-read 2026-08-27 evening after the frame dropped its first row
     (everything 1t up; §9 R18 follow-up) */
  rd1: {
    regions: [
      { gx: 11, gy: 2 },
      { gx: 10, gy: 3, gw: 2 },
      { gx: 9, gy: 4, gw: 3 },
      { gx: 8, gy: 5, gw: 4, gh: 10 },
    ],
    circles: [
      { gx: 11, gy: 3 },
      { gx: 9, gy: 5 },
      { gx: 8, gy: 11 },
    ],
    squares: [{ gx: 11, gy: 12 }],
  },
  rd2: {
    regions: [
      { gx: 11, gy: 2 },
      { gx: 10, gy: 3, gw: 2 },
      { gx: 9, gy: 4, gw: 3 },
      { gx: 8, gy: 5, gw: 4 },
      { gx: 7, gy: 6, gw: 5, gh: 4 },
      { gx: 8, gy: 10, gw: 4, gh: 3 },
    ],
    circles: [
      { gx: 11, gy: 3 },
      { gx: 9, gy: 5 },
      { gx: 8, gy: 12 },
    ],
    fillCircles: [{ gx: 11, gy: 11 }],
    squares: [{ gx: 11, gy: 5 }],
  },
};

const BANDS = Object.keys(FIELD) as GridBand[];

/* ---- the card mosaics (§4): tick-riding 1t cells registered with the
   page lattice, clipped by the card box. rm/rs: the 2×7 strip on the
   card's right edge (page ticks 9–11), circle at strip [1,2], filled
   teal/150 (100% — amended 2026-08-27, §9). rt/rd1/rd2: the 5×5 field
   from the card's top-left, stroke-only circles at [3,0] · [4,3] ·
   [1,4], uniform across the three bands (§9 R5). --dx/--dy are the §7.1
   designed shift directions. ---- */

function cellStyle(cx: number, cy: number, dx = 0, dy = 0): CSSProperties {
  return { "--cx": cx, "--cy": cy, "--dx": dx, "--dy": dy } as CSSProperties;
}

function MosaicStrip() {
  return (
    <span className="po-mosaic po-mosaic-strip" aria-hidden="true">
      <i className="v" style={{ "--n": 1 } as CSSProperties} />
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <i key={n} className="h" style={{ "--n": n } as CSSProperties} />
      ))}
      {/* slides down (§7.1) */}
      <i className="c fillc" style={cellStyle(1, 2, 0, 1)} />
    </span>
  );
}

function MosaicField() {
  return (
    <span className="po-mosaic po-mosaic-field" aria-hidden="true">
      {[1, 2, 3, 4].map((n) => (
        <i key={`v${n}`} className="v" style={{ "--n": n } as CSSProperties} />
      ))}
      {[1, 2, 3, 4].map((n) => (
        <i key={`h${n}`} className="h" style={{ "--n": n } as CSSProperties} />
      ))}
      {/* designed directions (§7.1): down · left · right; the rs
          design carries the first two circles only (§9 R15) */}
      <i className="c" style={cellStyle(3, 0, 0, 1)} />
      <i className="c" style={cellStyle(4, 3, -1, 0)} />
      <i className="c po-c-rt-up" style={cellStyle(1, 4, 1, 0)} />
    </span>
  );
}

/* ---- the included list (§5) ---- */

const ITEM_ICONS: Record<Exclude<IncludedIcon, "logomark">, ReactNode> = {
  website: <IconWebsite />,
  search: <IconSearch />,
  "ai-chat": <IconAiChat />,
  maps: <IconMaps />,
  reception: <IconReception />,
  reviews: <IconReviews />,
  tokens: <IconTokens />,
};

const LIST_HEAD = "What\u2019s included:";

function ItemIcon({ icon }: { icon: IncludedIcon }) {
  if (icon === "logomark") {
    /* the brand logomark at material size on a bg/200 radius-md box,
       tinted text/400 (the nav's mask construction) */
    return (
      <span className="po-item-icon po-item-icon-brand" aria-hidden="true">
        <i className="po-logomark" />
      </span>
    );
  }
  return (
    <span className="po-item-icon" aria-hidden="true">
      {ITEM_ICONS[icon]}
    </span>
  );
}

function ItemList({ items }: { items: typeof INCLUDED_ITEMS }) {
  return (
    <ul className="po-items">
      {items.map((item) => (
        <li key={item.icon}>
          <ItemIcon icon={item.icon} />
          {/* the wrap-pinning text column (--po-item-w-*) */}
          <span className="po-item-text">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---- the chat row (§6): label + the 003 ButtonGhost (brown,
   icons/chat) rendering the inert open-chat action (the 006 §9
   contract) — wired when the chat widget lands (§9 R9). ---- */

function ChatRow({ ghost }: { ghost: "sm" | "lg" }) {
  return (
    <>
      <span className="po-chat-label">Got a question?</span>
      <ButtonGhost size={ghost} color="brown" icon={<IconChat />} action="open-chat">
        Talk to us
      </ButtonGhost>
    </>
  );
}

export function PricingOfferSection() {
  return (
    <section className="sec v2-po">
      {/* the staircase and ornament cells (§2) */}
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
          ...(FIELD[band].fillCircles ?? []).map((o) => (
            <GridDecor key={`${band}-fo${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell fill round" />
            </GridDecor>
          )),
          ...FIELD[band].squares.map((o) => (
            <GridDecor key={`${band}-f${o.gx}-${o.gy}`} band={band} gx={o.gx} gy={o.gy}>
              <span className="f-cell fill" />
            </GridDecor>
          )),
        ])}
      </div>

      {/* header (§3): slug · H1 · subhead (· chat row at rt/rd1) */}
      <header className="po-header" data-landmark="head">
        <p className="po-slug">
          <i className="po-slug-dot" aria-hidden="true" />
          Pricing
        </p>
        <h1 className="po-h1">Pay for the work, not the retainer.</h1>
        {/* two designed paragraphs at rm/rt/rd1 (the break after
            "team.", paragraph spacing 12), one flowing paragraph at
            rd2 — the segments switch block/inline at the 1130 gate */}
        <p className="po-subhead">
          <span className="po-sub-seg">$50/month for a sales and marketing team.</span>{" "}
          <span className="po-sub-seg">Sounds ridiculous, but it{"\u2019"}s true.</span>
        </p>
        <div className="po-chat po-chat-head-rt" data-landmark="chat">
          <ChatRow ghost="sm" />
        </div>
        <div className="po-chat po-chat-head-rd1" data-landmark="chat">
          <ChatRow ghost="lg" />
        </div>
      </header>

      {/* the pricing card (§4): the card + button container is the
          whole-tick geometry unit; the white card absorbs the button's
          material height (the tick wins); the tag hangs below */}
      <div className="po-card-wrap" data-landmark="card">
        <div className="po-card">
          <MosaicStrip />
          <MosaicField />
          <p className="po-price">
            <span className="po-price-num">$50</span>
            <span className="po-price-per">/month</span>
          </p>
          <p className="po-fine">
            No setup fee. No contract.
            <br />
            Cancel anytime.
          </p>
        </div>
        <div className="po-cardbtn po-cardbtn-xs">
          <PricingButton size="xs" href={PRICING_CHECKOUT_URL}>
            Start today
          </PricingButton>
        </div>
        <div className="po-cardbtn po-cardbtn-sm">
          <PricingButton size="sm" href={PRICING_CHECKOUT_URL}>
            Start today
          </PricingButton>
        </div>
        <div className="po-cardbtn po-cardbtn-md">
          <PricingButton size="md" href={PRICING_CHECKOUT_URL}>
            Start today
          </PricingButton>
        </div>
        <div className="po-cardbtn po-cardbtn-lg">
          <PricingButton size="lg" href={PRICING_CHECKOUT_URL}>
            Start today
          </PricingButton>
        </div>
        <div className="po-cardbtn po-cardbtn-xl">
          <PricingButton size="xl" href={PRICING_CHECKOUT_URL}>
            Start today
          </PricingButton>
        </div>
        <span className="po-tag">No asterisks.</span>
      </div>

      {/* rm/rs chat row after the card's tag (§1/§6) */}
      <div className="po-chat po-chat-card" data-landmark="chat">
        <ChatRow ghost="sm" />
      </div>

      {/* the included list (§5) — one box at rm/rs/rd2 (the CTA shows
          at rm/rs only; at rd2 the card's xl button is the block's
          only CTA), two staggered 5t boxes at rt/rd1 */}
      <div className="po-list po-list-single" data-landmark="list">
        <h2 className="po-list-head">{LIST_HEAD}</h2>
        <ItemList items={INCLUDED_ITEMS} />
        <div className="po-list-cta">
          <ButtonFill size="sm" chrome="teal" href={PRICING_CHECKOUT_URL}>
            Start today
          </ButtonFill>
        </div>
      </div>
      <div className="po-list po-list-pair" data-landmark="list">
        <div className="po-box po-box-l">
          <h2 className="po-list-head">{LIST_HEAD}</h2>
          <ItemList items={INCLUDED_ITEMS.slice(0, 4)} />
        </div>
        <div className="po-box po-box-r">
          <ItemList items={INCLUDED_ITEMS.slice(4)} />
          <div className="po-list-cta">
            <span className="po-cta-rt">
              <ButtonFill size="sm" chrome="teal" href={PRICING_CHECKOUT_URL}>
                Start today
              </ButtonFill>
            </span>
            <span className="po-cta-rd1">
              <ButtonFill size="md" chrome="teal" href={PRICING_CHECKOUT_URL}>
                Start today
              </ButtonFill>
            </span>
          </div>
        </div>
      </div>

      {/* the chat row after the list: rm/rs (+30) · rt (+30) · rd2
          (centered in the 2t gap, label indented 12) — none at rd1 */}
      <div className="po-chat po-chat-list" data-landmark="chat">
        <ChatRow ghost="sm" />
      </div>
      <div className="po-chat po-chat-list-rd2" data-landmark="chat">
        <ChatRow ghost="lg" />
      </div>
    </section>
  );
}
