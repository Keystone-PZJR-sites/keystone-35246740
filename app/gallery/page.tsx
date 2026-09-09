import { redirect } from "next/navigation";

/** Old-site bookmark. Opens Our Work with the gallery on the first site. */
export default function GalleryAliasPage() {
  redirect("/our-work/?gallery=1");
}
