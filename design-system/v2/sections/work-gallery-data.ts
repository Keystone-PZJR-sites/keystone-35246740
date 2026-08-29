/** v2 sections — the Our Work gallery content (spec 015 §4/§5/§7).
 * The nine sites in the export/strip order 01 → 09 (§9 F4, owner
 * decision 2026-08-28 — including 08 EntheaCare before 09 Lune
 * Bodywork, the reverse of the mosaic's reading order). Names are the
 * owner's canon (§9 F5; "Izakali" with the 'l' — the wordmark's
 * spelling, resolved 2026-08-28); they feed the alt text ("The {name}
 * website", the 014 pattern), the ghost buttons ("Show {name}"), and
 * the 016 overlay. */

export interface GallerySite {
  /** Export/file number — gallery-{tier}-{NN}.webp (§7.1). */
  image: number;
  /** The owner's canonical site name (§9 F5). */
  name: string;
  /** Mosaic grid area (§4 slot map, rt+): row-start / col-start /
   * row-end / col-end on the 3×5 template. */
  area: string;
  /** Line-inclusive trailing edges (011 R17): the tile sits on the
   * mosaic's east lattice edge (the tick-11 rail line). */
  east?: boolean;
  /** …or on its south edge (the full-lattice row's top line). */
  south?: boolean;
}

/** DOM order = strip order 01–09; the mosaic lays the same nine on
 * explicit grid areas (§5's one-DOM rule). */
export const GALLERY_SITES: GallerySite[] = [
  { image: 1, name: "Izakali body practice", area: "1 / 1 / 3 / 3" },
  { image: 2, name: "House of Aesthetics", area: "1 / 3 / 2 / 4", east: true },
  { image: 3, name: "DreFadez Barber", area: "2 / 3 / 3 / 4", east: true },
  { image: 4, name: "Ora Medical Clinic", area: "3 / 1 / 4 / 2" },
  { image: 5, name: "State College Barbershops & Tattoo", area: "3 / 2 / 4 / 3" },
  { image: 6, name: "X2Talent Recruiting", area: "3 / 3 / 4 / 4", east: true },
  { image: 7, name: "Davin Security", area: "4 / 1 / 5 / 2" },
  { image: 8, name: "EntheaCare", area: "5 / 1 / 6 / 2", south: true },
  { image: 9, name: "Lune Bodywork", area: "4 / 2 / 6 / 4", east: true, south: true },
];
