/** v2 primitives — GraderInput (spec 003 §5).
 * A real form: labeled url field + button-arrow submit. Visual states
 * are CSS-driven (:hover, :focus-within, :placeholder-shown); the
 * consumer owns *when* error and loading happen and passes them in.
 * `forceState` is for the /primitives QA matrix only.
 */

import { useId } from "react";
import { ButtonArrow } from "./buttons";
import { IconSparkle } from "../icons";

interface GraderInputProps {
  size?: "lg" | "md" | "sm";
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
  name = "url",
  label = "Your website address",
  placeholder = "yourbusiness.com",
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
          inputMode="url"
          name={name}
          aria-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete="url"
        />
        <ButtonArrow
          type="submit"
          size={size}
          chrome={error ? "gray" : "teal"}
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
