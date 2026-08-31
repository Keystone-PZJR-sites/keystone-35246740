/** v2 sections — the Our Work gallery content (spec 015 §4/§5/§7).
 * The nine sites in the export/strip order 01 → 09 (§9 F4, owner
 * decision 2026-08-28 — including 08 EntheaCare before 09 Lune
 * Bodywork, the reverse of the mosaic's reading order). Names are the
 * owner's canon (§9 F5; "Izakali" with the 'l' — the wordmark's
 * spelling, resolved 2026-08-28); they feed the alt text ("The {name}
 * website", the 014 pattern), the ghost buttons ("Show {name}"), and
 * the 016 viewer's rail label and iframe title. The urls are the live
 * production sites the viewer embeds (016 §4.2 — received from the
 * owner 2026-08-29; the owner's operational surface): one module feeds
 * the section, the alt text, and the viewer. */

export interface GallerySite {
  /** Export/file number — gallery-{tier}-{NN}.webp (§7.1). */
  image: number;
  /** The owner's canonical site name (§9 F5). */
  name: string;
  /** The live production site the 016 viewer embeds (016 §4.2). */
  url: string;
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
  {
    image: 1,
    name: "Izakali body practice",
    url: "https://keystone-site-prod-dulce-luna-massage-wellnes-gfm36wi3.rahul-0b6.workers.dev/",
    area: "1 / 1 / 3 / 3",
  },
  {
    image: 2,
    name: "House of Aesthetics",
    url: "https://keystone-site-prod-house-of-aesthetics-o9vcdsfn.rahul-0b6.workers.dev/",
    area: "1 / 3 / 2 / 4",
    east: true,
  },
  {
    image: 3,
    name: "DreFadez Barber",
    url: "https://keystone-site-prod-drefadez-hvzjaquz.rahul-0b6.workers.dev/",
    area: "2 / 3 / 3 / 4",
    east: true,
  },
  {
    image: 4,
    name: "Ora Medical Clinic",
    url: "https://keystone-site-prod-ora-medical-clinic-wniko3sf.rahul-0b6.workers.dev/",
    area: "3 / 1 / 4 / 2",
  },
  // renamed 2026-08-29 (owner, 016 prep — the Izakali precedent: the
  // canon follows the site's own title; 015 §9 carries the amendment)
  {
    image: 5,
    name: "Jesse’s Barbershop & Tattoo",
    url: "https://keystone-site-prod-jesse-s-barbershop-2-b2zum1m8.rahul-0b6.workers.dev/",
    area: "3 / 2 / 4 / 3",
  },
  {
    image: 6,
    name: "X2Talent Recruiting",
    url: "https://keystone-site-prod-x2talent-t7540oy7.rahul-0b6.workers.dev/",
    area: "3 / 3 / 4 / 4",
    east: true,
  },
  {
    image: 7,
    name: "Davin Security",
    url: "https://keystone-site-prod-davin-security-wqpbsfjs.rahul-0b6.workers.dev/",
    area: "4 / 1 / 5 / 2",
  },
  {
    image: 8,
    name: "EntheaCare",
    url: "https://keystone-site-prod-enthea-care-mwv8s7a3.rahul-0b6.workers.dev/",
    area: "5 / 1 / 6 / 2",
    south: true,
  },
  {
    image: 9,
    name: "Lune Bodywork",
    url: "https://keystone-site-prod-rebeccaeberhardtcmt-7igkyq6p.rahul-0b6.workers.dev/",
    area: "4 / 2 / 6 / 4",
    east: true,
    south: true,
  },
];
