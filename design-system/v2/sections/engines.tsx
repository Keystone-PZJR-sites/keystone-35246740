/** v2 sections — the engine section (spec 020). Server component.
 *
 * Five marketing engines, two visualization states each — ten states,
 * 01a → 05b; scroll is the only control (§0). Two constructions, both
 * in this render, CSS-gated at the rd1 structural gate (860):
 *
 * - **Interactive (rd1/rd2)** — the fluid paradigm (§6): a normal-flow
 *   left column of five 6t panels drives a top-stuck 6t stage; the
 *   sticky slug row rides at pin top (§9 R2) and the stage one tick
 *   under it. The pinned lattice (§2) and the sliver-row outline ride
 *   a sticky assembly behind the flow content, so the drawn viewport's
 *   cells never move through the ten states. The one client island
 *   (EnginesScroll) owns the §6 scroll mapping, the runway plateaus,
 *   the snap, the swaps, and the indicator on one rAF clock; the 20t
 *   runway spacer is flow height only when the island marks the
 *   section ready, so no-JS renders the pure flow with the stage
 *   holding 01a (§9 R6).
 *
 * - **Static stack (base/rs/rt)** — the drawn stack (§5): slug row (rt
 *   only, §9 R8), five panels of engine-box over full-bleed visual,
 *   mounting the `-02` drawings (§9 R1), born settled, no indicator,
 *   zero islands in this variant.
 *
 * The left column carries all meaning; the stage subtree and the stack
 * visuals are decorative (aria-hidden, empty alt — the 018 R6
 * posture). Placeholder drawings by owner direction (§7); the media
 * registry carries the tier facts.
 */

import { GridDecor, GridRegion, type GridBand } from "../grid/region";
import { InterpText } from "../primitives/text";
import { ENGINE_V2_CUTS, ENGINE_V2_MD_MEDIA, engineV2PlaceholderSrc } from "../media";
import { ENGINES_V2, ENGINES_V2_SLUG, type EngineV2Copy } from "./engines-data";
import { EnginesScroll } from "./engines-scroll";

const STACK_BANDS: GridBand[] = ["rm", "rs"];
const IO_BANDS: GridBand[] = ["rd1", "rd2"];

/** The ten stage states in scroll order (§4/§6). */
const STAGE_STATES = ENGINES_V2.flatMap((engine) =>
  (["01", "02"] as const).map((state) => ({ engine, state })),
);

function EngineCopyBlock({ engine }: { engine: EngineV2Copy }) {
  return (
    <div className="e2-text">
      <InterpText as="h3" style="display-serif-md-plus-extralight" className="e2-name">
        {engine.name}
      </InterpText>
      {/* mounted as the 384 anchor's style; engines.css aliases the
          drawn text/xl/Light over it from the rt gate (the 019 slug
          construction — alias, never fork) */}
      <div className="e2-desc">
        <InterpText as="p" style="text-md-light">
          {engine.tagline}
        </InterpText>
        <InterpText as="p" style="text-md-light">
          {engine.body[0]}
        </InterpText>
        <InterpText as="p" style="text-md-light">
          {engine.body[1]}
        </InterpText>
      </div>
    </div>
  );
}

export function EnginesSection() {
  return (
    <section
      className="sec v2-engines"
      aria-label="Five marketing engines"
      data-landmark="engines"
    >
      {/* the flow exposure map (§2, as amended §9 R12) — the leading
          full-lattice seam row at every band; the stack bands' east
          rails and the seam's filled ○ ornament at [11,0] (384/rs);
          the rd bands' remaining cells ride the pin below */}
      <div className="gx" aria-hidden="true">
        {STACK_BANDS.map((band) => [
          <GridRegion key={`${band}-seam`} band={band} gx={0} gy={0} gw={12} gh={1} />,
          <GridDecor key={`${band}-orn`} band={band} gx={11} gy={0}>
            <span className="f-cell fill round" />
          </GridDecor>,
          <GridRegion key={`${band}-rail`} band={band} gx={11} gy={1} gw={1} gh={127} />,
        ])}
        <GridRegion band="rt" gx={0} gy={0} gw={12} gh={1} />
        <GridRegion band="rt" gx={10} gy={1} gw={2} gh={96} />
        {IO_BANDS.map((band) => (
          <GridRegion key={`${band}-seam`} band={band} gx={0} gy={0} gw={12} gh={1} />
        ))}
      </div>

      {/* the seam row's flow height (r18/r25/r41 — §1/§9 R12) */}
      <div className="e2-seam" aria-hidden="true" />

      {/* ---- the interactive construction (rd1/rd2 — §1/§4/§6) ---- */}
      <div className="e2-io">
        <div className="e2-slugrow">
          <p className="e2-slug">
            <span className="e2-marker" aria-hidden="true" />
            <InterpText as="span" style="text-sm-medium" className="e2-sluglabel">
              {ENGINES_V2_SLUG}
            </InterpText>
          </p>
        </div>
        <div className="e2-body">
          {/* the pinned viewport's lattice (§2) — sticky behind the
              flow content, static through all ten states. The sliver
              row carries no outline (amended 2026-09-06, §9 R14 — the
              883:99636 redraw dropped it; the sliver look is the
              boxes' own borders, so no pinned rule ever crosses a
              moving panel) */}
          <div className="e2-pinhost" aria-hidden="true">
            <div className="e2-pin">
              {IO_BANDS.map((band) => [
                <GridRegion key={`${band}-field`} band={band} gx={7} gy={0} gw={5} gh={5} />,
                <GridRegion key={`${band}-wide`} band={band} gx={6} gy={5} gw={6} gh={2} />,
                <GridDecor key={`${band}-o1`} band={band} gx={8} gy={0}>
                  <span className="f-cell round" />
                </GridDecor>,
                <GridDecor key={`${band}-o2`} band={band} gx={11} gy={5}>
                  <span className="f-cell round" />
                </GridDecor>,
              ])}
            </div>
          </div>

          {/* the column's sticky window (§6 as amended, §9 R15/R16):
              once the island marks the section ready, this wrapper
              pins with the assembly — the compositor holds it, so a
              runway can never jitter the panels; the island
              translates the column inside it through the free travels
              only. Unclipped (R16): the inactive card runs to the
              viewport's edge; the slug row's mask hides the overflow
              above the pin line. Without the island it is a plain
              flow wrapper (the no-JS render keeps every engine's copy
              reachable). Panel 0 is born lit (the drawn 01a rest);
              the island lights each panel as it reaches the active
              slot. */}
          <div className="e2-vp">
            <ul className="e2-col">
              {ENGINES_V2.map((engine, i) => (
                <li
                  className="e2-panel"
                  key={engine.id}
                  data-engine={engine.id}
                  data-lit={i === 0 ? "" : undefined}
                >
                  <div className="e2-card">
                    <span className="e2-dot" aria-hidden="true" />
                    <EngineCopyBlock engine={engine} />
                    {/* the a/b indicator (§6.2) — track pill + square
                        dot on bg/500, the growing text/300 overlay;
                        arrangement swaps at the b rest */}
                    <span className="e2-bc" aria-hidden="true">
                      <i className="e2-bc-pill" />
                      <i className="e2-bc-dot" />
                      <i className="e2-bc-fill" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="e2-rail">
            <div className="e2-stage" aria-hidden="true">
              {STAGE_STATES.map(({ engine, state }, i) => (
                <div
                  className="e2-drawing"
                  key={`${engine.id}-${state}`}
                  data-stage-index={i}
                  data-active={i === 0 ? "" : undefined}
                >
                  <img
                    src={engineV2PlaceholderSrc(engine.id, state)}
                    width={ENGINE_V2_CUTS.xl.width}
                    height={ENGINE_V2_CUTS.xl.height}
                    alt=""
                    loading={i <= 1 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- the static stack (base/rs/rt — §5) ---- */}
      <div className="e2-stack">
        <div className="e2-stackslug">
          <p className="e2-slug">
            <span className="e2-marker" aria-hidden="true" />
            <InterpText as="span" style="text-xs-regular" className="e2-sluglabel">
              {ENGINES_V2_SLUG}
            </InterpText>
          </p>
        </div>
        <ul className="e2-stacklist">
          {ENGINES_V2.map((engine) => (
            <li className="e2-spanel" key={engine.id} data-engine={engine.id}>
              <div className="e2-sbox">
                <div className="e2-scard">
                  <span className="e2-dot" aria-hidden="true" />
                  <EngineCopyBlock engine={engine} />
                </div>
              </div>
              <div className="e2-svisual" aria-hidden="true">
                <picture>
                  <source
                    media={ENGINE_V2_MD_MEDIA}
                    srcSet={engineV2PlaceholderSrc(engine.id, "02", "md")}
                    width={ENGINE_V2_CUTS.md.width}
                    height={ENGINE_V2_CUTS.md.height}
                  />
                  <img
                    src={engineV2PlaceholderSrc(engine.id, "02", "xs")}
                    width={ENGINE_V2_CUTS.xs.width}
                    height={ENGINE_V2_CUTS.xs.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <EnginesScroll />
    </section>
  );
}
