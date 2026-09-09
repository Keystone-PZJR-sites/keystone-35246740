"use client";

/** v2 primitives — GraderInput (spec 003 §5, as amended 2026-09-08:
 * the redrawn set — 56/48/44 pills, a brown chrome, and the
 * business-name field copy replacing the url field; behaviour spec 025).
 *
 * A real form and the site's Grader entry point: typing asks the Grader
 * API for business matches (lib/use-grader-search), the set's
 * grader-select-menu offers them, and choosing one — or submitting —
 * opens the Keystone Grader in a new tab on that business. Visual
 * states stay CSS-driven (:hover, :focus-within, :placeholder-shown);
 * this island owns only the query, the active row, and the hand-off.
 * Without JS the form still submits: a GET to the Grader with the typed
 * name, which lands on its search. `forceState` is for QA matrices only.
 *
 * Hand-off rules (§4): a chosen row opens at once (a user gesture, so
 * no popup blocker in the way). Submit with matches opens the active
 * row (the top match when none is highlighted). Submit while the
 * answer is still loading pre-opens the tab inside the gesture, waits,
 * then points it at the match — or closes it and shows the error when
 * nothing matched. Submit with nothing matched shows the error; editing
 * clears it. Blank never submits.
 */

import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, FormEvent, KeyboardEvent } from "react";
import { ButtonArrow } from "./buttons";
import { GraderSelectMenu, type GraderMenuLabels } from "./grader-menu";
import { IconSparkle } from "../icons";
import { GRADER_URL, graderScanUrl, type GraderSuggestion } from "../lib/grader";
import { useGraderSearch } from "../lib/use-grader-search";

/** The Grader deep-link param the no-JS GET carries (lib/grader.ts). */
const FIELD_NAME = "name";
const WINDOW_FEATURES = "noopener,noreferrer";
/** The menu's group labels — the Grader app's own naming for the two sources. */
const GROUP_LABELS: GraderMenuLabels = { places: "Google Places", web: "Websites" };

interface GraderInputProps {
  size?: "lg" | "md" | "sm";
  chrome?: "teal" | "brown";
  label?: string;
  placeholder?: string;
  /** The submit control's accessible name. */
  submitLabel?: string;
  /** The suggestion listbox's accessible name. */
  menuLabel?: string;
  /** The two group labels inside the menu (Google Places · websites). */
  groupLabels?: GraderMenuLabels;
  /** Shown when a submit finds no business to grade. */
  noMatchMessage?: string;
  defaultValue?: string;
  forceState?: "hover" | "focus" | "active" | "filled";
}

interface ActiveRow {
  index: number;
  /** The query the index belongs to; a new answer resets to the top row. */
  resultsFor: string;
}

export function GraderInput({
  size = "lg",
  chrome = "teal",
  label = "Your business name",
  placeholder = "Your business name",
  submitLabel = "Grade my site",
  menuLabel = "Business suggestions",
  groupLabels = GROUP_LABELS,
  noMatchMessage = "We couldn’t find that business — choose one of the suggestions.",
  defaultValue = "",
  forceState,
}: GraderInputProps) {
  const baseId = useId();
  const listId = `${baseId}-list`;
  const errorId = `${baseId}-error`;
  const optionId = (index: number) => `${baseId}-opt-${index}`;

  const [query, setQuery] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  /** Escape hides the menu until the next edit or arrow key. */
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState<ActiveRow>({ index: 0, resultsFor: "" });
  const [chosen, setChosen] = useState<GraderSuggestion | null>(null);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const pendingTab = useRef<Window | null>(null);

  const search = useGraderSearch(query, !chosen);
  const trimmed = query.trim();
  const activeIndex =
    active.resultsFor === search.resultsFor
      ? Math.min(active.index, Math.max(search.results.length - 1, 0))
      : 0;
  const open =
    focused && !dismissed && !chosen && !error && !pending && search.results.length > 0;
  const searching = search.status === "loading";

  function openGrader(item: GraderSuggestion) {
    window.open(graderScanUrl(item), "_blank", WINDOW_FEATURES);
  }

  function choose(item: GraderSuggestion) {
    setChosen(item);
    setQuery(item.name);
    setError(false);
    openGrader(item);
  }

  // The deferred hand-off: a submit that landed while the answer was
  // loading resolves on the first ready answer — the top match becomes
  // the choice, or the error shows. Clearing the field mid-wait cancels
  // it instead. Adjusted during render (the sanctioned
  // derive-state-while-rendering form); the tab follows below.
  if (pending && search.status !== "loading") {
    setPending(false);
    if (search.status === "ready") {
      const match = search.results[0];
      if (match) {
        setChosen(match);
        setQuery(match.name);
      } else {
        setError(true);
      }
    }
  }

  // The pre-opened tab is an external system: once the wait is over it
  // is pointed at the chosen business, or closed when nothing matched.
  // (A tab the visitor already closed, or a blocked pre-open, is simply
  // left alone — the next submit opens the choice inside its gesture.)
  useEffect(() => {
    const tab = pendingTab.current;
    if (!tab || pending) return;
    pendingTab.current = null;
    if (chosen && !tab.closed) {
      tab.opener = null;
      tab.location.href = graderScanUrl(chosen);
    } else {
      tab.close();
    }
  }, [pending, chosen]);

  // Never leave a blank tab behind if the island unmounts mid-wait.
  useEffect(
    () => () => {
      pendingTab.current?.close();
      pendingTab.current = null;
    },
    [],
  );

  function submit() {
    if (!trimmed || pending) return;
    if (chosen && chosen.name === trimmed) {
      openGrader(chosen);
      return;
    }
    if (search.status === "loading") {
      pendingTab.current = window.open("", "_blank");
      setPending(true);
      return;
    }
    const match = search.results[open ? activeIndex : 0];
    if (match) choose(match);
    else setError(true);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing) return;
    setFocused(true);
    const count = search.results.length;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        if (chosen) {
          // re-open the search on the chosen name; the answer lands with the top row active
          e.preventDefault();
          setChosen(null);
          setDismissed(false);
          return;
        }
        if (!count) return;
        e.preventDefault();
        setDismissed(false);
        const step = e.key === "ArrowDown" ? 1 : count - 1;
        setActive({ index: (activeIndex + step) % count, resultsFor: search.resultsFor });
        break;
      }
      case "Home":
      case "End":
        if (!open) return;
        e.preventDefault();
        setActive({ index: e.key === "Home" ? 0 : count - 1, resultsFor: search.resultsFor });
        break;
      case "Escape":
        if (!open) return;
        e.preventDefault();
        setDismissed(true);
        break;
      default:
        return;
    }
  }

  function onBlur(e: FocusEvent<HTMLFormElement>) {
    // focus moving within the form (to the button, or a row) keeps the menu
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setFocused(false);
  }

  return (
    <form
      className="grader"
      data-size={size}
      data-chrome={chrome}
      data-error={error ? "" : undefined}
      data-state={forceState}
      data-open={open || undefined}
      action={`${GRADER_URL}/`}
      method="get"
      target="_blank"
      onSubmit={onSubmit}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
    >
      <div className="grader-field">
        <span className="grader-sparkle">
          <IconSparkle />
        </span>
        <input
          type="text"
          name={FIELD_NAME}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            // typing proves focus — covers a field focused before hydration,
            // where the focus event fired with no listener attached yet
            setFocused(true);
            setChosen(null);
            setDismissed(false);
            setError(false);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-label={label}
          aria-autocomplete="list"
          aria-busy={searching || undefined}
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={open ? optionId(activeIndex) : undefined}
          aria-invalid={error || undefined}
          aria-describedby={error ? errorId : undefined}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <ButtonArrow
          type="submit"
          size={size}
          chrome={error ? "gray" : chrome}
          // the set's drawn loading state covers both waits: the typeahead
          // request and the deferred hand-off
          loading={pending || searching}
          label={submitLabel}
        />
      </div>
      {open && (
        <GraderSelectMenu
          id={listId}
          label={menuLabel}
          groups={search.groups}
          groupLabels={groupLabels}
          activeIndex={activeIndex}
          optionId={optionId}
          onActivate={(index) => setActive({ index, resultsFor: search.resultsFor })}
          onChoose={choose}
        />
      )}
      {error && (
        <p className="grader-error" id={errorId} role="alert">
          {noMatchMessage}
        </p>
      )}
    </form>
  );
}
