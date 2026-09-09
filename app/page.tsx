import { HomePage } from "@/design-system/pages/home";
import HomeGridCheck from "./grid/pages/home";

/** The homepage. The development-only sweep hook has no visible output. */
export default function Home() {
  return <HomePage gridCheck={<HomeGridCheck />} />;
}
