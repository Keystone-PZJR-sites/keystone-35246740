/** Work sites in front-to-back cascade order. Asset numbers run in reverse,
 * so each site owns its explicit file mapping. */

export interface WorkSite {
  slug: string;
  name: string;
  category: string | null;
  /** Export file number. */
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
