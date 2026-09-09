export const BLOG_FEATURE_TICKS = { rm: 16, rt: 4, rd: 3 } as const;
export const BLOG_FEATURE_GAP_TICKS = 2;

const RM_CARD_TICKS = 10;
const RM_CARD_GAP_TICKS = 1;
const RT_CARD_PX = 352;
const RT_CARD_GAP_PX = 48;
const RT_TICK_PX = 64;
const RD_CARD_TICKS = 3;
const RD_COLUMNS = 3;
const RD_ROW_GAP_TICKS = 1;

export interface BlogStackTicks {
  rm: number;
  rt: number;
  rd: number;
}

export function blogStackTicks(count: number): BlogStackTicks {
  if (count <= 0) return { rm: 0, rt: 0, rd: 0 };
  const rows = Math.ceil(count / RD_COLUMNS);
  return {
    rm: RM_CARD_TICKS * count + RM_CARD_GAP_TICKS * (count - 1),
    rt: Math.ceil((RT_CARD_PX * count + RT_CARD_GAP_PX * (count - 1)) / RT_TICK_PX),
    rd: RD_CARD_TICKS * rows + RD_ROW_GAP_TICKS * (rows - 1),
  };
}
