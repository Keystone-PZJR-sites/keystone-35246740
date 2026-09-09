import type { BlogLandingModel } from "@/design-system/sections/blog-data";
import { blogListsTicks } from "@/design-system/sections/blog-lists";
import type { Band } from "../bands";
import type { GridExpectations } from "../expectations";

const BANDS: readonly Band[] = ["rm", "rs", "rt", "rd1", "rd2"];
const TOP: Record<Band, number> = { rm: 28, rs: 28, rt: 15, rd1: 11, rd2: 11 };
const FOOTER: Record<Band, number> = { rm: 24, rs: 21, rt: 15, rd1: 12, rd2: 11 };

export function blogExpectations(landing: BlogLandingModel): GridExpectations {
  const ticks = blogListsTicks(landing);
  const lists: Record<Band, number> = {
    rm: ticks.rm,
    rs: ticks.rm,
    rt: ticks.rt,
    rd1: ticks.rd,
    rd2: ticks.rd,
  };
  const stack = [
    { id: "blog-top", h: TOP },
    ...(lists.rm > 0 ? [{ id: "blog-lists", h: lists }] : []),
    { id: "footer", h: FOOTER },
  ];
  const tops = Object.fromEntries(BANDS.map((band) => [band, 0])) as Record<Band, number>;
  const sections = stack.map(({ id, h }) => ({
    id,
    rows: Object.fromEntries(
      BANDS.map((band) => {
        const top = tops[band];
        tops[band] += h[band];
        return [band, { top, h: h[band] }];
      }),
    ),
  }));

  return {
    totals: { ...tops },
    sections,
    clearanceExceptions: ["feat", "top", "nav"],
    secLandmarksAreIdentity: true,
  };
}
