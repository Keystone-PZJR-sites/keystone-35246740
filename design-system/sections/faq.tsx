import { GridDecor, GridRegion, type GridBand } from "../grid/region";
import { ButtonGhost } from "../primitives/buttons";
import { IconChat } from "../icons";
import { FaqIsland } from "./faq-island";
import { FAQ_HEAD, FAQ_ITEMS } from "./faq-data";

/** Pricing FAQ with a single-open accordion and responsive grid decoration. */

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
    <section className="sec faq-section">
      {/* East rail. */}
      <div className="gx" aria-hidden="true">
        {BANDS.map((band) => (
          <GridRegion key={band} band={band} {...RAIL[band]} />
        ))}
      </div>

      {/* Header and responsive chat actions. */}
      <div className="faq-header" data-landmark="header">
        <div className="faq-head-box">
          <h2 className="faq-head">{FAQ_HEAD}</h2>
        </div>
        <ChatRow ghost="sm" label="Got a question?" className="faq-chat-rt" />
        <ChatRow ghost="md" label="Got a question?" className="faq-chat-rd1" />
        <ChatRow ghost="lg" label="Got another question?" className="faq-chat-rd2" />
      </div>

      <FaqIsland items={FAQ_ITEMS} />

      {/* The flow-based gap row moves with accordion growth. */}
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
