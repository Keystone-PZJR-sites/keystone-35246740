/** Keystone Grader entry points (spec 025 §3).
 *
 * The grader-input's typeahead asks the Grader API for business
 * suggestions (Google Places + independent websites) and hands the
 * chosen one to the Grader web app, which reads these params on load
 * and opens the business hub directly — no landing step.
 *
 * Plain constants and pure functions, no 'use client': the URL builders
 * serve the server-rendered form (the no-JS fallback action) and the
 * client island alike. The only external endpoints on this site live
 * here, read from the environment (.env locally; the deploy's build
 * env) with no in-code defaults — a missing value fails the build's
 * prerender rather than shipping a guessed endpoint. Carried over from
 * the retired v1 hero search (main: design-system/constants/grader.ts)
 * — the wire contract is unchanged.
 */

/** `NEXT_PUBLIC_*` values are inlined at build time, so each one must be
 * spelled out as a literal `process.env.NAME` read (no dynamic lookup). */
function required(name: string, value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error(`Missing environment variable ${name} (see .env — the Grader entry points).`);
  }
  return trimmed;
}

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function splitCsv(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

/** The public Grader web app — the deep-link target, opened in a new tab. */
export const GRADER_URL = trimTrailingSlash(
  required("NEXT_PUBLIC_GRADER_URL", process.env.NEXT_PUBLIC_GRADER_URL),
);

/** The Grader API base (the blue-ocean backend). */
export const GRADER_API_BASE_URL = trimTrailingSlash(
  required("NEXT_PUBLIC_GRADER_API_URL", process.env.NEXT_PUBLIC_GRADER_API_URL),
);

/** Search endpoint paths, tried in order (comma-separated in the env). */
export const GRADER_SEARCH_PATHS = splitCsv(
  required("NEXT_PUBLIC_GRADER_SEARCH_PATHS", process.env.NEXT_PUBLIC_GRADER_SEARCH_PATHS),
);

/** One typeahead request's ceiling before the next path is tried. */
export const GRADER_SEARCH_TIMEOUT_MS = 8000;

/** A business suggestion from the Grader search endpoint. */
export interface GraderSuggestion {
  /** Google Places place_id, or the synthetic `web:{domain}` for a website pick. */
  id: string;
  name: string;
  address: string;
  website?: string | null;
}

export interface GraderSearchResponse {
  places: GraderSuggestion[];
  web: GraderSuggestion[];
}

export const EMPTY_GRADER_SEARCH: GraderSearchResponse = { places: [], web: [] };

function isSuggestion(value: unknown): value is GraderSuggestion {
  if (!value || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return typeof r.id === "string" && typeof r.name === "string" && typeof r.address === "string";
}

/** Accept the grouped `{ places, web }` body and the legacy flat array;
 * drop anything that is not a well-formed suggestion. */
export function normalizeGraderSearchResponse(body: unknown): GraderSearchResponse {
  if (Array.isArray(body)) return { places: body.filter(isSuggestion), web: [] };
  if (body && typeof body === "object") {
    const r = body as Record<string, unknown>;
    return {
      places: Array.isArray(r.places) ? r.places.filter(isSuggestion) : [],
      web: Array.isArray(r.web) ? r.web.filter(isSuggestion) : [],
    };
  }
  return EMPTY_GRADER_SEARCH;
}

/** The Grader deep link for a chosen business. The hub keys on `placeId`;
 * name/address/website let it skip the metadata lookup. */
export function graderScanUrl(business: GraderSuggestion): string {
  const params = new URLSearchParams({ placeId: business.id });
  if (business.name.trim()) params.set("name", business.name.trim());
  if (business.address.trim()) params.set("address", business.address.trim());
  if (business.website?.trim()) params.set("website", business.website.trim());
  return `${GRADER_URL}/?${params.toString()}`;
}

export function graderSearchApiUrl(query: string, path: string): string {
  return `${GRADER_API_BASE_URL}${path}?q=${encodeURIComponent(query)}`;
}

/** Query the search endpoint, walking the configured paths until one
 * answers; a non-OK response or a network error moves to the next path,
 * exhausting them yields the empty response. An aborted signal stops
 * the walk immediately (re-thrown so the caller can ignore stale runs). */
export async function fetchGraderSuggestions(
  query: string,
  signal?: AbortSignal,
): Promise<GraderSearchResponse> {
  for (const path of GRADER_SEARCH_PATHS) {
    try {
      const timeout = AbortSignal.timeout(GRADER_SEARCH_TIMEOUT_MS);
      const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
      const resp = await fetch(graderSearchApiUrl(query, path), { signal: combined });
      if (!resp.ok) continue;
      return normalizeGraderSearchResponse(await resp.json());
    } catch (error) {
      if (signal?.aborted) throw error;
      // timeout or network failure — try the next configured path
    }
  }
  return EMPTY_GRADER_SEARCH;
}
