/** Fill, ghost, and icon button primitives. */

import type { ReactNode } from "react";
import { IconArrowRight, IconCaseStudies, IconLoadingCircle, IconNavTrigger } from "../icons";
import { EXTERNAL_LINK } from "../site-links";

type ForceableState = "hover" | "focus";

interface ButtonFillProps {
  size?: "xl" | "lg" | "md" | "sm";
  chrome?: "teal" | "gray";
  shape?: "pill" | "box";
  type?: "button" | "submit";
  /** Renders link chrome when provided. */
  href?: string;
  /** Open in a new tab (external destinations). */
  external?: boolean;
  /** Behavior hook rendered as data-action. */
  action?: string;
  forceState?: ForceableState;
  children: ReactNode;
}

export function ButtonFill({
  size = "lg",
  chrome = "teal",
  shape = "pill",
  type = "button",
  href,
  external = false,
  action,
  forceState,
  children,
}: ButtonFillProps) {
  const label = (
    <span className="btn-label">
      {children}
      <span className="btn-glyph">
        <IconNavTrigger variant="arrow" />
      </span>
    </span>
  );
  if (href !== undefined) {
    return (
      <a
        href={href}
        className="btn-fill"
        data-size={size}
        data-chrome={chrome}
        data-shape={shape}
        data-state={forceState}
        data-action={action}
        {...(external ? EXTERNAL_LINK : {})}
      >
        {label}
      </a>
    );
  }
  return (
    <button
      type={type}
      className="btn-fill"
      data-size={size}
      data-chrome={chrome}
      data-shape={shape}
      data-state={forceState}
      data-action={action}
    >
      {label}
    </button>
  );
}

interface ButtonGhostProps {
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  color?: "brown" | "teal" | "gray";
  /** Leading icon; icons keep their intrinsic two-tone palettes. */
  icon?: ReactNode;
  /** Renders link chrome when provided. */
  href?: string;
  /** Open in a new tab (external destinations). */
  external?: boolean;
  /** Behavior hook rendered as data-action — "open-chat" opens the site
   * chat (sections/site-chat-open.tsx); "open-gallery" the work gallery. */
  action?: string;
  disabled?: boolean;
  forceState?: ForceableState;
  children: ReactNode;
}

export function ButtonGhost({
  size = "lg",
  color = "brown",
  icon = <IconCaseStudies />,
  href,
  external = false,
  action,
  disabled = false,
  forceState,
  children,
}: ButtonGhostProps) {
  const content = (
    <>
      <span className="btn-icon">{icon}</span>
      {children}
    </>
  );
  if (href !== undefined) {
    return (
      <a
        href={href}
        className="btn-ghost"
        data-size={size}
        data-color={color}
        data-state={forceState}
        data-action={action}
        {...(external ? EXTERNAL_LINK : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className="btn-ghost"
      data-size={size}
      data-color={color}
      data-state={forceState}
      data-action={action}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

interface ButtonArrowProps {
  size?: "lg" | "md" | "sm";
  chrome?: "teal" | "gray" | "brown";
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
      {loading ? (
        <IconLoadingCircle />
      ) : (
        <>
          {/* Stacked glyphs create the hover pass-through. */}
          <IconArrowRight className="btn-arrow-main" />
          <IconArrowRight className="btn-arrow-ghost" />
        </>
      )}
    </button>
  );
}
