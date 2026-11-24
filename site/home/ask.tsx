"use client";

import type { ComposerState } from "@keystone-sites/marketing-design-system/composer";
import { useReducedMotion } from "@keystone-sites/marketing-design-system/motion";
import {
  Children,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ASK_PREFIX, ENTRIES, type Entry } from "./content";

// The composer's empty line, after 28: the ask, and under it a rule drawn across for as long as
// the ask holds. The opener first, in ink and held a little longer, then the five asks, one at a
// time, each rule in its entry's hue.
const HOLD = 3500;
const OPENER_HOLD = 4000;
const OPENER = "do literally anything";
const ASKS: readonly (Entry | undefined)[] = [undefined, ...ENTRIES];
const holdOf = (index: number) => (index === 0 ? OPENER_HOLD : HOLD);

export function AskLine({ fixed }: { fixed?: Entry }) {
  const reduce = useReducedMotion();
  const [at, setAt] = useState(0);
  const held = fixed !== undefined;
  useEffect(() => {
    if (reduce || held) return;
    const timer = window.setTimeout(() => {
      setAt((now) => (now + 1) % ASKS.length);
    }, holdOf(at));
    return () => {
      window.clearTimeout(timer);
    };
  }, [reduce, held, at]);
  const current = held ? fixed : reduce ? undefined : ASKS[at];
  const hold = holdOf(held || reduce ? 0 : at);
  return (
    <span
      className="home-askline"
      data-hue={current?.hue}
      data-still={reduce || held ? "" : undefined}
    >
      <span className="home-askline__text">
        {ASK_PREFIX}
        {current?.ask ?? OPENER}
      </span>
      <span
        key={fixed?.id ?? at}
        className="home-askline__rule"
        style={{ "--home-hold": `${hold}ms` } as CSSProperties}
        aria-hidden
      />
    </span>
  );
}

// The ways `count` lines can share `total` chips evenly, the longer lines first, then later.
function shares(total: number, count: number): number[][] {
  const base = Math.floor(total / count);
  const extra = total % count;
  const out: number[][] = [];
  const place = (from: number, chosen: readonly number[]) => {
    if (chosen.length === extra) {
      out.push(Array.from({ length: count }, (_, line) => base + (chosen.includes(line) ? 1 : 0)));
      return;
    }
    for (let line = from; line < count; line += 1) place(line + 1, [...chosen, line]);
  };
  place(0, []);
  return out;
}

/** A row of chips at the middle of the page, on as few lines as hold them, shared out evenly
    (three and two, or two and three; two and two; two, two and one) rather than leave one on its
    own after a full line. A chip the window hides takes no room. */
export function Chips({
  children,
  ...rest
}: {
  children: ReactNode;
  role?: string;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  // The chips (by their place in the row) that end a line.
  const [breaks, setBreaks] = useState<readonly number[]>([]);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const chips = [...node.querySelectorAll<HTMLElement>(".ks-chip")];
    const measure = () => {
      const gap = parseFloat(getComputedStyle(node).columnGap) || 0;
      const room = node.clientWidth + 0.5;
      const shown = chips
        .map((chip, index) => ({ index, width: chip.offsetWidth }))
        .filter((chip) => chip.width > 0);
      for (let count = 1; count <= shown.length; count += 1) {
        for (const sizes of shares(shown.length, count)) {
          const ends = sizes.map((_, line) =>
            sizes.slice(0, line + 1).reduce((sum, size) => sum + size, 0),
          );
          const fits = sizes.every((size, line) => {
            const run = shown.slice(ends[line]! - size, ends[line]);
            return run.reduce((sum, chip) => sum + chip.width, 0) + gap * (run.length - 1) <= room;
          });
          if (fits || count === shown.length) {
            const next = ends.slice(0, -1).map((end) => shown[end - 1]!.index);
            setBreaks((previous) => (previous.join() === next.join() ? previous : next));
            return;
          }
        }
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    for (const chip of chips) observer.observe(chip);
    return () => {
      observer.disconnect();
    };
  }, []);
  // The lines are broken where they end, rather than each chip put in a line of its own, so a chip
  // keeps its place in the row (and doesn't run its arrival again) as the lines change.
  return (
    <div ref={ref} className="home-chips" {...rest}>
      {items.flatMap((item, index) =>
        breaks.includes(index)
          ? [item, <span key={`break-${index}`} className="home-chips__break" aria-hidden />]
          : [item],
      )}
    </div>
  );
}

/** The entry the fold's composer holds: chosen from the row or from the platform's button, either
    of which drops its prompt in and sets its category as a chip beside the +. */
export type AskState = {
  at: Entry | undefined;
  /** Sets the entry's chip and drops its prompt in. */
  pick: (entry: Entry) => void;
  /** Drops the set chip's prompt in. */
  fill: (entry: Entry) => void;
  /** Takes the chip back out. */
  clear: () => void;
};

export function useAsk(composer: ComposerState): AskState {
  const [at, setAt] = useState<Entry | undefined>(undefined);
  const dropped = useRef("");
  const untouched = () => composer.value === "" || composer.value === dropped.current;
  const fill = (entry: Entry) => {
    dropped.current = entry.prompt;
    composer.load(entry.prompt);
  };
  return {
    at,
    fill,
    pick(entry) {
      setAt(entry);
      fill(entry);
    },
    clear() {
      if (untouched()) composer.setValue("");
      dropped.current = "";
      setAt(undefined);
      composer.focus();
    },
  };
}
