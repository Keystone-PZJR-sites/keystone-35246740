import type { Metadata } from "next";
import { OurWorkPage } from "@/design-system/v2/our-work";
import OurWorkQa from "../our-work-qa";

/** `/our-work` — the new-brand Our Work page (spec 014 §8.4). OurWorkQa
 * is the sweep hook (dev-only; production aliases it to a null stub). */
export const metadata: Metadata = {
  title: "Our Work | Keystone",
};

export default function OurWork() {
  return <OurWorkPage qa={<OurWorkQa />} />;
}
