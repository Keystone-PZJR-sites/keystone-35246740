/** v2 primitives — GridButton (spec 007 §6): the carousel control that
 * lives in a lattice cell. Server component; states are CSS-driven.
 *
 * The cell chrome is the button itself: 1px border/000 ring, unfilled
 * (§9 R14), radius-full forward / square back. Five sizes map to the
 * five anchor cell sizes (xs 32 · sm 48 · md 64 · lg 80 · xl 112); the
 * inner disc/square and glyph are material per size, and a mounting
 * section may override the cell box to ride the tick (the material vs
 * tick-riding law — the section owns each instance's width).
 *
 * Hover inherits the button-arrow pass-through on the aliased tokens:
 * two stacked glyphs on `left` transitions, forward exits right and
 * re-enters left, back mirrored. The optional `forceState` prop is for
 * the /primitives QA matrix only.
 */

import { IconArrowLeft, IconArrowRight } from "../icons";

interface GridButtonProps {
  direction: "forward" | "back";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** The control is icon-only; the name is mandatory. */
  label: string;
  disabled?: boolean;
  forceState?: "hover" | "focus";
}

export function GridButton({
  direction,
  size = "xs",
  label,
  disabled = false,
  forceState,
}: GridButtonProps) {
  const Glyph = direction === "forward" ? IconArrowRight : IconArrowLeft;
  return (
    <button
      type="button"
      className="gbtn"
      data-direction={direction}
      data-size={size}
      data-state={forceState}
      disabled={disabled}
      aria-label={label}
    >
      <span className="gbtn-inner">
        {/* two stacked glyphs for the hover pass-through (the button-arrow
            glyph-stack pattern — alias, never fork) */}
        <Glyph className="gbtn-main" />
        <Glyph className="gbtn-ghost" />
      </span>
    </button>
  );
}
