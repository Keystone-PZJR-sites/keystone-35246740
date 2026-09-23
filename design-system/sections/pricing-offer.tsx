/** Pricing offer, included services, and responsive lattice decoration. */

import type { CSSProperties, ReactNode } from "react";
import { GridRegion, GridDecor, type GridBand } from "../grid/region";
import { ButtonFill, ButtonGhost } from "../primitives/buttons";
import { PricingButton } from "../primitives/pricing-button";
import { Slug } from "../primitives/slug";
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

/* Adjacent lattice regions share boundary lines. */

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
      { gx: 9, gy: 6, gw: 3, gh: 42 },
    ],
    circles: [
      { gx: 11, gy: 5 },
      { gx: 10, gy: 14 },
      { gx: 9, gy: 29 },
    ],
    fillCircles: [
      { gx: 9, gy: 7 },
      { gx: 11, gy: 45 },
    ],
    squares: [
      { gx: 11, gy: 12 },
      { gx: 11, gy: 23 },
    ],
  },
  rs: {
    regions: [
      { gx: 11, gy: 4 },
      { gx: 10, gy: 5, gw: 2 },
      { gx: 9, gy: 6, gw: 3, gh: 15 },
      { gx: 9, gy: 21, gw: 2 },
      { gx: 9, gy: 22, gw: 3, gh: 5 },
    ],
    circles: [
      { gx: 11, gy: 5 },
      { gx: 9, gy: 7 },
      { gx: 10, gy: 14 },
      { gx: 9, gy: 19 },
      { gx: 9, gy: 22 },
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

/* Card mosaics use page-tick cells; --dx and --dy set hover movement. */

function cellStyle(cx: number, cy: number, dx = 0, dy = 0): CSSProperties {
  return { "--cx": cx, "--cy": cy, "--dx": dx, "--dy": dy };
}

function MosaicStrip() {
  return (
    <span className="po-mosaic po-mosaic-strip" aria-hidden="true">
      <i className="v" style={{ "--n": 1 }} />
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <i key={n} className="h" style={{ "--n": n }} />
      ))}
      <i className="c fillc" style={cellStyle(1, 2, 0, 1)} />
    </span>
  );
}

function MosaicField() {
  return (
    <span className="po-mosaic po-mosaic-field" aria-hidden="true">
      {[1, 2, 3, 4].map((n) => (
        <i key={`v${n}`} className="v" style={{ "--n": n }} />
      ))}
      {[1, 2, 3, 4].map((n) => (
        <i key={`h${n}`} className="h" style={{ "--n": n }} />
      ))}
      <i className="c" style={cellStyle(3, 0, 0, 1)} />
      <i className="c" style={cellStyle(4, 3, -1, 0)} />
      <i className="c po-c-rt-up" style={cellStyle(1, 4, 1, 0)} />
    </span>
  );
}

const ITEM_ICONS: Record<Exclude<IncludedIcon, "logomark">, ReactNode> = {
  website: <IconWebsite />,
  search: <IconSearch />,
  "ai-chat": <IconAiChat />,
  maps: <IconMaps />,
  reception: <IconReception />,
  reviews: <IconReviews />,
  tokens: <IconTokens />,
};

const LIST_HEAD = "What’s included:";

function ItemIcon({ icon }: { icon: IncludedIcon }) {
  if (icon === "logomark") {
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
        <li key={item.icon} className="type">
          <ItemIcon icon={item.icon} />
          <span className="po-item-text">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** A chat row; its mount sets `--btn-size` and the label step per band. */
function ChatRow({ className }: { className: string }) {
  return (
    <div className={`po-chat ${className}`} data-landmark="chat">
      <span className="po-chat-row">
        <span className="type type-fixed ts-text-md-light po-chat-label">Got a question?</span>
        <ButtonGhost size="inherit" color="brown" icon={<IconChat />} action="open-chat">
          Talk to us
        </ButtonGhost>
      </span>
    </div>
  );
}

export function PricingOfferSection() {
  return (
    <section className="sec pricing-offer-section">
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

      <header className="po-header" data-landmark="head">
        <Slug>Pricing</Slug>
        <h1 className="type ts-display-serif-sm-plus-thin po-h1">
          Pay for the work, not the retainer.
        </h1>
        {/* Segments become one flowing paragraph at the widest band. */}
        <p className="type ts-text-md-light po-subhead">
          <span className="po-sub-seg">$50/month for a sales and marketing team.</span>{" "}
          <span className="po-sub-seg">Sounds ridiculous, but it’s true.</span>
        </p>
        <ChatRow className="po-chat-head" />
      </header>

      {/* The card and button form one tick-aligned geometry unit. */}
      <div className="po-card-wrap" data-landmark="card">
        <div className="po-card">
          <MosaicStrip />
          <MosaicField />
          <p className="po-price">
            <span className="type ts-display-sans-4xl-light po-price-num">$50</span>
            <span className="type type-fixed ts-text-xs-light po-price-per">/month</span>
          </p>
          <p className="type ts-text-lg-light po-fine">
            No setup fee. No contract.
            <br />
            Cancel anytime.
          </p>
        </div>
        <div className="po-cardbtn">
          <PricingButton size="inherit" href={PRICING_CHECKOUT_URL} external>
            Start today
          </PricingButton>
        </div>
        <span className="type type-fixed ts-text-2xs-medium po-tag">No asterisks.</span>
      </div>

      <ChatRow className="po-chat-card" />

      {/* Layout switches between one list box and a staggered pair. */}
      <div className="po-list po-list-single" data-landmark="list">
        <h2 className="type ts-text-md-medium po-list-head">{LIST_HEAD}</h2>
        <ItemList items={INCLUDED_ITEMS} />
        <div className="po-list-cta">
          <ButtonFill size="sm" chrome="teal" href={PRICING_CHECKOUT_URL} external>
            Start today
          </ButtonFill>
        </div>
      </div>
      <div className="po-list po-list-pair" data-landmark="list">
        <div className="po-box po-box-l">
          <h2 className="type ts-text-md-medium po-list-head">{LIST_HEAD}</h2>
          <ItemList items={INCLUDED_ITEMS.slice(0, 4)} />
        </div>
        <div className="po-box po-box-r">
          <ItemList items={INCLUDED_ITEMS.slice(4)} />
          <div className="po-list-cta">
            <ButtonFill size="inherit" chrome="teal" href={PRICING_CHECKOUT_URL} external>
              Start today
            </ButtonFill>
          </div>
        </div>
      </div>

      <ChatRow className="po-chat-list" />
    </section>
  );
}
