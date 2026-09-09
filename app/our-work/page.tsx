import type { Metadata } from "next";
import { OurWorkPage } from "@/design-system/pages/our-work";
import OurWorkGridCheck from "../grid/pages/our-work";

/** The Our Work page with its development-only sweep hook. */
export const metadata: Metadata = {
  title: "Our Work | Keystone",
};

export default function OurWork() {
  return <OurWorkPage gridCheck={<OurWorkGridCheck />} />;
}
