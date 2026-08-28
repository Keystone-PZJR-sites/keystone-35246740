/** v2 primitives — Slider (spec 012 §4, set 613:21217). Three sizes
 * (sm 160 · md 192 · lg 224, all 45 designed height), three snap
 * states (less · middle · more), three progress hues (the persona
 * pairs, 200 → 400).
 *
 * The primitive is PROPORTIONAL over its width (the 011 R16 taxonomy
 * applied over the width instead of a lattice cell): every interior
 * value is a designed-px-over-width fraction of the size's designed
 * width, so the bare primitive renders the designed size and a section
 * mount drives the width from a weight-riding constant (--sldr-w).
 * The focus ring stays material (a11y chrome).
 *
 * The control is presentational plus a native range input: the input
 * carries the semantics (min 0 · max 2 · step 1, the accessible name,
 * aria-valuetext) and the keyboard; it renders DISABLED so a no-JS
 * page never offers an unwirable control (§7.3) — the section island
 * enables it on mount and owns every pointer gesture (drag tracks
 * live and snaps on release, which a stepped native range cannot do).
 * `forceState`/`forceHue` render a non-default rest statically for the
 * /primitives catalog; the island drives the same attributes live. */

import { IconSliderArrow } from "../icons";

export type SliderState = "less" | "middle" | "more";
export type SliderHue = "pink" | "blue" | "purple";
type SliderSize = "sm" | "md" | "lg";

const STATE_VALUE: Record<SliderState, number> = { less: 0, middle: 1, more: 2 };

interface SliderProps {
  size?: SliderSize;
  /** Accessible name for the native range input. */
  label: string;
  /** aria-valuetext for the resting state (the persona name). */
  valueText?: string;
  forceState?: SliderState;
  forceHue?: SliderHue;
}

export function Slider({ size = "lg", label, valueText, forceState = "less", forceHue = "pink" }: SliderProps) {
  return (
    <span className="sldr" data-size={size} data-state={forceState} data-hue={forceHue}>
      <span className="sldr-row">
        <i className="sldr-track" aria-hidden="true" />
        <i className="sldr-progress" aria-hidden="true">
          <i className="sldr-p" data-hue="pink" />
          <i className="sldr-p" data-hue="blue" />
          <i className="sldr-p" data-hue="purple" />
        </i>
        {/* the notch stays visible OVER the progress fill (design
            direction at build review 2026-08-28, matching the set's
            `more` state order); the thumb still covers it at middle */}
        <i className="sldr-notch" aria-hidden="true" />
        <i className="sldr-thumb" aria-hidden="true" />
        <input
          className="sldr-input"
          type="range"
          min={0}
          max={2}
          step={1}
          defaultValue={STATE_VALUE[forceState]}
          disabled
          aria-label={label}
          aria-valuetext={valueText}
        />
      </span>
      <span className="sldr-labels">
        <span>Less work</span>
        <IconSliderArrow className="sldr-glyph" />
        <span>More work</span>
      </span>
    </span>
  );
}
