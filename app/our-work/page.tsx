import type { Metadata } from "next";
import { OurWorkPage } from "@/design-system/pages/our-work";
import OurWorkGridCheck from "../grid/pages/our-work";

/** The Our Work page with its development-only sweep hook. */
export const metadata: Metadata = {
  title: "Our Work | Keystone",
};

export default async function OurWork({
  searchParams,
}: {
  searchParams: Promise<{ gallery?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.gallery) ? params.gallery[0] : params.gallery;
  const parsed = raw === undefined ? NaN : raw === "" ? 1 : Number.parseInt(raw, 10);
  const openGallerySite = Number.isFinite(parsed) ? parsed : undefined;
  return <OurWorkPage gridCheck={<OurWorkGridCheck />} openGallerySite={openGallerySite} />;
}
