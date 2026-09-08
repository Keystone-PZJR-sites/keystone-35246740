/** v2 primitives — GraderInput (spec 003 §5, as amended 2026-09-08:
 * the redrawn set — 56/48/44 pills, a brown chrome, and the
 * business-name field copy replacing the url field).
 * A real form: labeled text field + button-arrow submit. Visual states
 * are CSS-driven (:hover, :focus-within, :placeholder-shown); the
 * consumer owns *when* error and loading happen and passes them in.
 * The set's active-state grader-select-menu (business suggestions) is
 * consumer behavior and is NOT built here — it lands with the blog
 * page's spec. `forceState` is for the /primitives QA matrix only.
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
