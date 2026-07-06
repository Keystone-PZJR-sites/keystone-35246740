// Keystone Grader entry points. The hero search calls the Grader API for Google
// Places + website typeahead, then deep-links into the Grader web app — which
// reads these params on load and starts the scan immediately (skipping its own
// landing). Kept here (plain constants, no 'use client') so both server and
// client modules can import the same literals.

function _trimTrailingSlash(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function _splitCsv(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

/** Public Grader web app — the deep-link target opened in a new tab. */
export const GRADER_URL = _trimTrailingSlash(
  process.env.NEXT_PUBLIC_GRADER_URL ?? 'https://grader.keystone.app',
);

/** Grader API base URL (Blue Ocean backend in production). */
export const GRADER_API_BASE_URL = _trimTrailingSlash(
  process.env.NEXT_PUBLIC_GRADER_API_URL ??
    'https://keystone-blue-ocean-api-f52e6c3a71af.herokuapp.com',
);

/**
 * Search endpoint fallbacks in priority order.
 * - New API router: /grader/search
 * - Legacy router: /search
 */
export const GRADER_SEARCH_PATHS = _splitCsv(
  process.env.NEXT_PUBLIC_GRADER_SEARCH_PATHS ?? '/grader/search,/search',
);

/** A business suggestion from the Grader `/grader/search` endpoint. */
export interface GraderSuggestion {
  /** Google Places place_id or synthetic `web:{domain}`; empty for free text. */
  id: string;
  name: string;
  address: string;
  website?: string | null;
}

export type GraderSearchResponse = {
  places: GraderSuggestion[];
  web: GraderSuggestion[];
};

const EMPTY_SEARCH: GraderSearchResponse = { places: [], web: [] };

/** Normalize grouped `{ places, web }` and legacy flat-array responses. */
export function normalizeGraderSearchResponse(body: unknown): GraderSearchResponse {
  if (Array.isArray(body)) {
    return { places: body as GraderSuggestion[], web: [] };
  }
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>;
    return {
      places: Array.isArray(record.places) ? (record.places as GraderSuggestion[]) : [],
      web: Array.isArray(record.web) ? (record.web as GraderSuggestion[]) : [],
    };
  }
  return EMPTY_SEARCH;
}

/**
 * Build the Grader deep link for a chosen business. The Grader reconstructs a
 * Suggestion from these params and auto-starts the scan; `name` is the only
 * required field (free-text scans pass an empty `id`/`address`).
 */
export function graderScanUrl(business: GraderSuggestion): string {
  const params = new URLSearchParams();
  if (business.id) params.set('placeId', business.id);
  params.set('name', business.name);
  if (business.address) params.set('address', business.address);
  if (business.website) params.set('website', business.website);
  return `${GRADER_URL}/?${params.toString()}`;
}

/** Build a concrete API URL for one configured search path. */
export function graderSearchApiUrl(query: string, path: string): string {
  return `${GRADER_API_BASE_URL}${path}?q=${encodeURIComponent(query)}`;
}
