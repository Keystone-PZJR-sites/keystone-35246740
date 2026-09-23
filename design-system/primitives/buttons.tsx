/** Fill, ghost, and icon button primitives. */

import type { ReactNode } from "react";
import { IconArrowRight, IconCaseStudies, IconLoadingCircle, IconNavTrigger } from "../icons";
import { EXTERNAL_LINK } from "../site-links";

type ForceableState = "hover" | "focus";

/** `inherit` takes `--btn-size` from an ancestor, which a section sets per
 * band so one control serves every band. */
type FillSize = "xl" | "lg" | "md" | "sm" | "inherit";
type GhostSize = FillSize | "xs";

interface ButtonFillProps {
  size?: FillSize;
  chrome?: "teal" | "gray";
  shape?: "pill" | "box";
  type?: "button" | "submit";
  /** Renders link chrome when provided. */
  href?: string;
  /** Open in a new tab (external destinations). */
  external?: boolean;
  /** Behavior hook rendered as data-action. */
  action?: string;
  disabled?: boolean;
  forceState?: ForceableState;
  children: ReactNode;
}

function sizeAttr(size: GhostSize): string | undefined {
  return size === "inherit" ? undefined : size;
}

export function ButtonFill({
  size = "lg",
  chrome = "teal",
  shape = "pill",
  type = "button",
  href,
  external = false,
  action,
  disabled = false,
  forceState,
  children,
}: ButtonFillProps) {
  const label = (
    <span className="type type-fixed btn-body">
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
        data-size={sizeAttr(size)}
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
      data-size={sizeAttr(size)}
      data-chrome={chrome}
      data-shape={shape}
      data-state={forceState}
      data-action={action}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

interface ButtonGhostProps {
  size?: GhostSize;
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
    <span className="type type-fixed btn-body">
      <span className="btn-icon">{icon}</span>
      {children}
    </span>
  );
  if (href !== undefined) {
    return (
      <a
        href={href}
        className="btn-ghost"
        data-size={sizeAttr(size)}
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
      data-size={sizeAttr(size)}
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
  size?: "lg" | "md" | "sm" | "inherit";
  chrome?: "teal" | "gray" | "brown";
  /** A URL renders link chrome; null renders disabled non-link chrome. */
  href?: string | null;
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
  href,
  disabled = false,
  loading = false,
  forceState,
  label,
  type = "button",
}: ButtonArrowProps) {
  const glyph = (
    <span className="btn-arrow-body">
      {loading ? (
        <IconLoadingCircle />
      ) : (
        <>
          {/* Stacked glyphs create the hover pass-through. */}
          <IconArrowRight className="btn-arrow-main" />
          <IconArrowRight className="btn-arrow-ghost" />
        </>
      )}
    </span>
  );
  if (typeof href === "string") {
    return (
      <a
        href={href}
        className="btn-arrow"
        data-size={sizeAttr(size)}
        data-chrome={chrome}
        data-state={forceState}
        aria-label={label}
      >
        {glyph}
      </a>
    );
  }
  if (href === null) {
    return (
      <span
        className="btn-arrow"
        data-size={sizeAttr(size)}
        data-chrome={chrome}
        data-state="disabled"
        aria-disabled="true"
        aria-label={label}
      >
        {glyph}
      </span>
    );
  }
  return (
    <button
      type={type}
      className="btn-arrow"
      data-size={sizeAttr(size)}
      data-chrome={chrome}
      data-state={forceState}
      data-loading={loading || undefined}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-label={label}
    >
      {glyph}
    </button>
  );
}
