/** v2 primitives — GraderInput (spec 003 §5, as amended 2026-09-08:
 * the redrawn set — 56/48/44 pills, a brown chrome, and the
 * business-name field copy replacing the url field).
 * A real form: labeled text field + button-arrow submit. Visual states
 * are CSS-driven (:hover, :focus-within, :placeholder-shown); the
 * consumer owns *when* error and loading happen and passes them in.
 * The set's active-state grader-select-menu (business suggestions)
 * ships as the presentational GraderSelectMenu below (spec 024 §4 —
 * the 003 §5 deferral closed): props-driven, no data wiring, no
 * island behavior — the wiring workstream owns when it opens, what
 * selection does, and the listbox interaction contract.
 * `forceState` is for QA state forcing only.
 */

import { useId } from "react";
import { ButtonArrow } from "./buttons";
import { IconSparkle } from "../icons";

interface GraderInputProps {
  size?: "lg" | "md" | "sm";
  chrome?: "teal" | "brown";
  name?: string;
  label?: string;
  placeholder?: string;
  action?: string;
  /** Error message; its presence switches the error state on. */
  error?: string;
  loading?: boolean;
  defaultValue?: string;
  forceState?: "hover" | "focus" | "active" | "filled";
}

export function GraderInput({
  size = "lg",
  chrome = "teal",
  name = "business",
  label = "Your business name",
  placeholder = "Your business name",
  action,
  error,
  loading = false,
  defaultValue,
  forceState,
}: GraderInputProps) {
  const errorId = useId();
  return (
    <form
      className="grader"
      data-size={size}
      data-chrome={chrome}
      data-error={error ? "" : undefined}
      data-state={forceState}
      action={action}
    >
      <div className="grader-field">
        <span className="grader-sparkle">
          <IconSparkle />
        </span>
        <input
          type="text"
          name={name}
          aria-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete="organization"
        />
        <ButtonArrow
          type="submit"
          size={size}
          chrome={error ? "gray" : chrome}
          loading={loading}
          label="Grade my site"
        />
      </div>
      {error && (
        <p className="grader-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export interface GraderSuggestion {
  name: string;
  address: string;
}

interface GraderSelectMenuProps {
  suggestions: GraderSuggestion[];
  /** The pill size the menu rides under — the drawn gap and item type
   * follow it (024 §4: gap 12 lg · 8 md/sm; item text md/md/sm). */
  size?: "lg" | "md" | "sm";
  /** Consumer-owned selection highlight; hover is CSS. */
  selectedIndex?: number;
}

/** The grader's business-suggestion menu (spec 024 §4; drawn in the
 * set's brown active variants, `503:25844`). Presentational only —
 * the consumer mounts it below the pill (menu width = pill width) and
 * owns open state, selection, and interaction semantics. */
export function GraderSelectMenu({ suggestions, size = "lg", selectedIndex }: GraderSelectMenuProps) {
  return (
    <ul className="grader-menu" data-size={size}>
      {suggestions.map((s, i) => (
        <li
          key={`${s.name}-${i}`}
          className="grader-menu-item"
          data-selected={i === selectedIndex ? "" : undefined}
        >
          <span className="grader-menu-name">{s.name}</span>
          <span className="grader-menu-address">{s.address}</span>
        </li>
      ))}
    </ul>
  );
}
