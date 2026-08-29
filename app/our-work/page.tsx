import type { Metadata } from "next";
import { OurWorkPage } from "@/design-system/v2/our-work";

/** `/our-work` — the new-brand Our Work page (spec 014 §8.4). The page
 * mounts the shared composition bare; `/our-work-fixture` mounts the
 * same composition as the permanent QA surface. The route the nav,
 * footer, and the 007/008 button bars already target. The title is the
 * placeholder metadata — the pre-launch metadata wipe (010 §7 F2 /
 * checklist G4) covers the final copy. */
export const metadata: Metadata = {
  title: "Our Work | Keystone",
};

export default function OurWork() {
  return <OurWorkPage />;
}
