/** v2 primitives — ButtonFill, ButtonGhost, ButtonArrow (spec 003).
 * Server components; states are CSS-driven. The optional `forceState`
 * prop exists for the /primitives QA matrix only — it renders a
 * non-default state statically and must not be used in real sections.
 */

import type { ReactNode } from "react";
import { IconArrowRight, IconCaseStudies, IconLoadingCircle, IconNavTrigger } from "../icons";

type ForceableState = "hover" | "focus";

interface ButtonFillProps {
  size?: "xl" | "lg" | "md" | "sm";
  chrome?: "teal" | "gray";
  shape?: "pill" | "box";
  type?: "button" | "submit";
  forceState?: ForceableState;
  children: ReactNode;
}

export function ButtonFill({
  size = "lg",
  chrome = "teal",
  shape = "pill",
  type = "button",
  forceState,
  children,
}: ButtonFillProps) {
  return (
    <button
      type={type}
      className="btn-fill"
      data-size={size}
      data-chrome={chrome}
      data-shape={shape}
      data-state={forceState}
    >
      <span className="btn-label">
        {children}
        <span className="btn-glyph">
          <IconNavTrigger variant="arrow" />
        </span>
      </span>
    </button>
  );
}

interface ButtonGhostProps {
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  color?: "brown" | "teal" | "gray";
  /** Leading icon; icons keep their intrinsic two-tone palettes. */
  icon?: ReactNode;
  disabled?: boolean;
  forceState?: ForceableState;
  children: ReactNode;
}

export function ButtonGhost({
  size = "lg",
  color = "brown",
  icon = <IconCaseStudies />,
  disabled = false,
  forceState,
  children,
}: ButtonGhostProps) {
  return (
    <button
      type="button"
      className="btn-ghost"
      data-size={size}
      data-color={color}
      data-state={forceState}
      disabled={disabled}
    >
      <span className="btn-icon">{icon}</span>
      {children}
    </button>
  );
}

interface ButtonArrowProps {
  size?: "lg" | "md" | "sm";
  chrome?: "teal" | "gray";
  disabled?: boolean;
  loading?: boolean;
  forceState?: ForceableState | "disabled";
  /** The control is icon-only; the name is mandatory. */
  label: string;
  type?: "button" | "submit";
}

export function ButtonArrow({
  size = "lg",
  chrome = "teal",
  disabled = false,
  loading = false,
  forceState,
  label,
  type = "button",
}: ButtonArrowProps) {
  return (
    <button
      type={type}
      className="btn-arrow"
      data-size={size}
      data-chrome={chrome}
      data-state={forceState}
      data-loading={loading || undefined}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-label={label}
    >
      {loading ? <IconLoadingCircle /> : <IconArrowRight />}
    </button>
  );
}
