/** slider (613:21216 set): four rest stops, one per persona, with a hue
 * per stop. The disabled native input supplies semantics until the
 * section island enables it and owns pointer gestures. */

import { IconSliderArrow } from "../icons";
import type { PersonaHue } from "./persona-card";

/** Rest stop index; the island writes it to `data-k`. */
export type SliderStop = 0 | 1 | 2 | 3;
export const SLIDER_STOPS = 4;
type SliderSize = "sm" | "md" | "lg" | "inherit";

const HUES: PersonaHue[] = ["pink", "teal", "blue", "purple"];

interface SliderProps {
  size?: SliderSize;
  /** Accessible name for the native range input. */
  label: string;
  /** aria-valuetext for the resting stop (the persona name). */
  valueText?: string;
  forceStop?: SliderStop;
  forceHue?: PersonaHue;
}

export function Slider({
  size = "lg",
  label,
  valueText,
  forceStop = 0,
  forceHue = "pink",
}: SliderProps) {
  return (
    <span
      className="sldr"
      data-size={size === "inherit" ? undefined : size}
      data-k={forceStop}
      data-hue={forceHue}
    >
      <span className="sldr-row">
        <i className="sldr-track" aria-hidden="true" />
        <i className="sldr-progress" aria-hidden="true">
          {HUES.map((hue) => (
            <i key={hue} className="sldr-p" data-hue={hue} />
          ))}
        </i>
        {/* Notches mark the interior stops, above the fill and below the thumb. */}
        <i className="sldr-notch" style={{ "--n": 1 }} aria-hidden="true" />
        <i className="sldr-notch" style={{ "--n": 2 }} aria-hidden="true" />
        <i className="sldr-thumb" aria-hidden="true" />
        <input
          className="sldr-input"
          type="range"
          min={0}
          max={SLIDER_STOPS - 1}
          step={1}
          defaultValue={forceStop}
          disabled
          aria-label={label}
          aria-valuetext={valueText}
        />
      </span>
      <span className="type ts-text-xs-regular sldr-labels">
        <span>Less work</span>
        <IconSliderArrow className="sldr-glyph" />
        <span>More work</span>
      </span>
    </span>
  );
}
