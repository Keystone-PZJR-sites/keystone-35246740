import { GridDecor, GridRegion, type GridBand } from "../grid/region";
import { ButtonGhost } from "../primitives/buttons";
import { IconChat } from "../icons";
import { FaqIsland } from "./faq-island";
import { FAQ_HEAD, FAQ_ITEMS } from "./faq-data";

/** v2 sections — faq (spec 013). Server component with one client
 * island (faq-island.tsx — the §5 single-open machine, the §6 height
 * animation, and the §4 R7 content-derived open heights). The pricing
 * page's last section — page rows from the 012 section end to the
 * footer top: the FAQ header block, the six-question accordion, and
 * the 1t pre-footer lattice row.
 *
 * The section is born settled — no load choreography (like 011/012);
 * a no-JS render is the settled closed section with the answer copy
 * in the HTML. The chat buttons render the inert open-chat action
 * (the 006 §9 contract) until the chat widget's own spec lands.
 *
 * The stack is flow, not fixed height: header (absolute from rt up,
 * where it sits beside the questions) · the questions list · the gap
 * row — so an open drawer grows the section and pushes the gap row
 * and the footer down (the 004 construction). The lattice over the
 * section is §2's east staircase at its final single-rail step; the
 * gap row carries the full 12-cell lattice and the three ornament
 * cells; the island's extension cells carry a drawer's growth rows. */

/* ---- the exposure map (§2): the narrowed rail over the section's
   rest rows, verified against rendered bounds 2026-08-28 at build.
   The gap row is separate — a flow element, so it moves with drawer
   growth. ---- */

interface Rail {
  gx: number;
  gy: number;
  gw?: number;
  gh: number;
}

const RAIL: Record<GridBand, Rail> = {
  rm: { gx: 11, gy: 0, gh: 15 },
  rs: { gx: 10, gy: 0, gw: 2, gh: 8 },
  rt: { gx: 11, gy: 0, gh: 6 },
  rd1: { gx: 11, gy: 0, gh: 6 },
  rd2: { gx: 11, gy: 0, gh: 6 },
};

const BANDS = Object.keys(RAIL) as GridBand[];

/* ---- the chat row (§3): the 011 grammar — label + the 003
   ButtonGhost (brown, icons/chat) on the inert open-chat contract.
   Per-band labels are design intent (§9 F3). ---- */

function ChatRow({
  ghost,
  label,
  className,
}: {
  ghost: "sm" | "md" | "lg";
  label: string;
  className: string;
}) {
  return (
    <div className={`faq-chat ${className}`}>
      <span className="faq-chat-label">{label}</span>
      <ButtonGhost size={ghost} color="brown" icon={<IconChat />} action="open-chat">
        Talk to us
      </ButtonGhost>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="sec v2-faq">
      {/* the east rail at its final staircase step (§2) */}
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => (
          <GridRegion key={band} band={band} {...RAIL[band]} />
        ))}
      </div>

      {/* the header block (§3): transparent box, 1px top hairline on
          the section top row line; rm/rs center the head and carry no
          chat row (011's section already holds theirs) */}
      <div className="faq-header" data-landmark="header">
        <div className="faq-head-box">
          <h2 className="faq-head">{FAQ_HEAD}</h2>
        </div>
        <ChatRow ghost="sm" label="Got a question?" className="faq-chat-rt" />
        <ChatRow ghost="md" label="Got a question?" className="faq-chat-rd1" />
        <ChatRow ghost="lg" label="Got another question?" className="faq-chat-rd2" />
      </div>

      {/* the accordion + the rail-extension layer (§4–§6) */}
      <FaqIsland items={FAQ_ITEMS} />

      {/* the 1t pre-footer gap row (§1/§2): a full 12-cell lattice row
          in flow — an open drawer pushes it and the footer down — with
          the ornament cells (rm/rs/rt per the map) */}
      <div className="faq-gaprow" aria-hidden="true">
        <div className="gx">
          {BANDS.map((band) => (
            <GridRegion key={band} band={band} gx={0} gy={0} gw={12} gh={1} />
          ))}
          <GridDecor band="rm" gx={11} gy={0}>
            <span className="f-cell fill" />
          </GridDecor>
          <GridDecor band="rs" gx={10} gy={0}>
            <span className="f-cell round" />
          </GridDecor>
          <GridDecor band="rt" gx={11} gy={0}>
            <span className="f-cell fill" />
          </GridDecor>
        </div>
      </div>
    </section>
  );
}
