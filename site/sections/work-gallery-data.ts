/** Gallery sites in image and strip order. This module supplies labels,
 * alt text, mosaic placement, and viewer URLs. */

interface GallerySite {
  /** Image number in the gallery media set. */
  image: number;
  /** Display name. */
  name: string;
  /** Live site embedded by the gallery viewer. */
  url: string;
  /** Mosaic grid area: row-start / col-start /
   * row-end / col-end on the 3×5 template. */
  area: string;
  /** The tile sits on the
   * mosaic's east lattice edge (the tick-11 rail line). */
  east?: boolean;
  /** …or on its south edge (the full-lattice row's top line). */
  south?: boolean;
}

/** DOM order equals strip order; the mosaic repositions the same nodes. */
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
