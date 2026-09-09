"use client";

/** The grader-input's typeahead source.
 *
 * Owns the debounce, the in-flight request, and the answer; the island
 * owns the query. One state cell — `{ groups, resultsFor }` — and the
 * status is derived from it (the answer matches the current query ⇒
 * ready; otherwise loading), so nothing has to be kept in sync by hand.
 *
 * The answer keeps the API's two groups — Google Places, then
 * independent websites — each capped, plus the flat row order the
 * keyboard walks. Edge cases handled here: keystrokes inside the
 * debounce window never fetch; a superseded request is aborted and its
 * late answer dropped; clearing the field cancels everything; identical
 * queries answer from a small cache so backspacing never flickers; the
 * previous answer stays on screen while the next one loads (the island
 * decides whether to keep showing it).
 */

import { useEffect, useMemo, useState } from "react";
import {
  fetchGraderSuggestions,
  type GraderSearchResponse,
  type GraderSuggestion,
} from "./grader";

/** Keystroke settle time before a request goes out. */
const DEBOUNCE_MS = 200;
/** Rows offered per group. */
const MAX_PLACES = 5;
const MAX_WEB = 3;
/** Answers remembered per session (queries are short; this is tiny). */
const CACHE_SIZE = 50;

export type GraderSearchStatus = "idle" | "loading" | "ready";

export interface GraderSearchGroups {
  /** Google Places matches (`id` is the place_id). */
  places: GraderSuggestion[];
  /** Independent websites (`id` is `web:{domain}`). */
  web: GraderSuggestion[];
}

export interface GraderSearchState {
  /** `idle` while the query is blank. */
  status: GraderSearchStatus;
  /** The two groups, deduplicated and capped — what the menu renders. */
  groups: GraderSearchGroups;
  /** The groups flattened in display order — what the keyboard walks. */
  results: GraderSuggestion[];
  /** The query `groups` answers ("" until the first answer). */
  resultsFor: string;
}

interface Answer {
  groups: GraderSearchGroups;
  resultsFor: string;
}

const EMPTY_GROUPS: GraderSearchGroups = { places: [], web: [] };
const EMPTY_ANSWER: Answer = { groups: EMPTY_GROUPS, resultsFor: "" };

function capped(items: GraderSuggestion[], max: number, seen: Set<string>): GraderSuggestion[] {
  const out: GraderSuggestion[] = [];
  for (const item of items) {
    if (out.length >= max) break;
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}

function group(response: GraderSearchResponse): GraderSearchGroups {
  const seen = new Set<string>();
  return {
    places: capped(response.places, MAX_PLACES, seen),
    web: capped(response.web, MAX_WEB, seen),
  };
}

const cache = new Map<string, GraderSearchGroups>();

function remember(query: string, groups: GraderSearchGroups) {
  if (cache.size >= CACHE_SIZE) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(query, groups);
}

function state(status: GraderSearchStatus, groups: GraderSearchGroups, resultsFor: string): GraderSearchState {
  return { status, groups, results: [...groups.places, ...groups.web], resultsFor };
}

/** `enabled` false parks the search (no fetch, `idle`) — the island uses
 * it once a business is chosen, so the chosen name is never looked up. */
export function useGraderSearch(query: string, enabled = true): GraderSearchState {
  const q = enabled ? query.trim() : "";
  const [answer, setAnswer] = useState<Answer>(EMPTY_ANSWER);

  useEffect(() => {
    if (!q || cache.has(q)) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetchGraderSuggestions(q, controller.signal)
        .then((response) => {
          if (controller.signal.aborted) return;
          const groups = group(response);
          remember(q, groups);
          setAnswer({ groups, resultsFor: q });
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setAnswer({ groups: EMPTY_GROUPS, resultsFor: q });
        });
    }, DEBOUNCE_MS);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [q]);

  return useMemo<GraderSearchState>(() => {
    if (!q) return state("idle", EMPTY_GROUPS, "");
    // A remembered query answers in the same render — no fetch, no flicker.
    const cached = cache.get(q);
    if (cached) return state("ready", cached, q);
    return state(answer.resultsFor === q ? "ready" : "loading", answer.groups, answer.resultsFor);
  }, [q, answer]);
}
