/** v2 sections — the work-deck roster + registry (spec 021 §4/§7,
 * §9 F3/R6). The six sites in cascade order, front → back, as received
 * 2026-09-06 — the rotation cycles this order and the chrome belongs
 * to the site, not the slot. `file` maps each slug to its export
 * number: the numbering is reversed against the cascade order (owner,
 * §7 — a recorded numbering mistake, not re-cut), so the map is
 * explicit here and nowhere else. The chrome color pairs are bound in
 * work-deck.css per slug (the §4 token bindings — the mixed steps
 * purple/300+350 and blue/250+350 are drawn intent). Ora carries its
 * category in its name (§9 R5) — `category` is null. */

export interface WorkSite {
  slug: string;
  name: string;
  category: string | null;
  /** export file number (§7 registry: yhs→06 … miriam→01) */
  file: number;
}

export const WORK_SITES: WorkSite[] = [
  { slug: "yhs", name: "Your Health Solutions", category: "MedSpa", file: 6 },
  { slug: "lune", name: "Lune Bodywork", category: "Massage", file: 5 },
  { slug: "x20", name: "X20 Studio", category: "Pilates Gym", file: 4 },
  { slug: "drefadez", name: "DreFadez", category: "Barbershop", file: 3 },
  { slug: "ora", name: "Ora Medical Clinic", category: null, file: 2 },
  { slug: "miriam", name: "Miriam Merim", category: "Therapist", file: 1 },
];
