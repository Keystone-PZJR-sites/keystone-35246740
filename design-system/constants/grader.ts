// Keystone Grader entry points. The hero search calls the Grader API for Google
// Places typeahead, then deep-links into the Grader web app — which reads these
// params on load and starts the scan immediately (skipping its own landing).
// Kept here (plain constants, no 'use client') so both server and client modules
// can import the same literals.

/** Public Grader web app — the deep-link target opened in a new tab. */
export const GRADER_URL = 'https://grader.keystone.app';

/** Grader API — backs the hero's Google Places autocomplete via `/search`. */
export const GRADER_API_URL = 'https://keystone-grader-api-bae48132b46d.herokuapp.com';

/** A Google Places result as returned by the Grader API `/search` endpoint. */
export interface GraderSuggestion {
  /** Google Places place_id; empty when scanning free text the visitor typed. */
  id: string;
  name: string;
  address: string;
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
  return `${GRADER_URL}/?${params.toString()}`;
}
