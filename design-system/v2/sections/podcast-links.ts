/** v2 sections — the shared podcast destinations (spec 024 §8).
 *
 * Lifted from the footer's local constants so the blog landing's
 * podcast card and the footer read one source. The Spotify URL ships
 * WITHOUT its `?si=` share-tracking parameter (owner ruling at the
 * 024 preparation review, §9 R4) — the footer follows through this
 * module; the render is identical.
 *
 * YouTube is deliberately not a constant here: it rides
 * `company_information.youtube_url` through each page's fetch (the
 * 004 wiring; consumers render "#" when absent).
 */

export const PODCAST_SPOTIFY_URL =
  "https://open.spotify.com/show/41MuXEI3TIvCAQW20Ko9cX";
export const PODCAST_APPLE_PODCASTS_URL =
  "https://podcasts.apple.com/us/podcast/made-locally/id1895736090";
