/** The disabled native input supplies semantics until the section island
 * enables it and owns pointer gestures. */

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
        {/* The notch stays above the progress fill and below the thumb. */}
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
