import { HomeNextPage } from "@/design-system/v2/home-next";

/** The QA mount of the homepage v2 composition (spec 018 §8). The
 * devtools mount and expectations arrive with spec 023's assembly —
 * this route exists now so the QA surface's URL is stable. */
export default function HomeNextFixturePage() {
  return <HomeNextPage />;
}
