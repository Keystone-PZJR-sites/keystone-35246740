import type { Metadata } from "next";
import { LandingPage } from "@/design-system/pages/landing";
import { FOR_DENTISTS } from "@/design-system/pages/for-dentists-data";

export const metadata: Metadata = {
  title: FOR_DENTISTS.meta.title,
  description: FOR_DENTISTS.meta.description,
};

/* Content-sized landing sections; the page grid is perceptual (flow
 * closer rows), so no whole-tick grid check applies. */
export default function ForDentists() {
  return <LandingPage data={FOR_DENTISTS} />;
}
