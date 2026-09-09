"use client";

/** Single-open FAQ state, content measurement, and rail extension cells. */

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { FaqQuestion } from "../primitives/faq-question";
import type { FaqItem } from "./faq-data";

/* The first growth row follows the static rail run in each band. */
const EXT_BANDS = [
  { band: "rm", gx: [11], gy0: 15 },
  { band: "rs", gx: [10, 11], gy0: 8 },
  { band: "rt", gx: [11], gy0: 6 },
  { band: "rd1", gx: [11], gy0: 6 },
  { band: "rd2", gx: [11], gy0: 6 },
] as const;

export function FaqIsland({ items }: { items: FaqItem[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  /** Measured open − closed ticks per item, current band. */
  const [extras, setExtras] = useState<number[]>([]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const sec = list.closest<HTMLElement>(".sec");
    const rows = [...list.querySelectorAll<HTMLElement>(".fq")];
    if (!sec || rows.length === 0) return;
    const answers = rows.map((row) => row.querySelector<HTMLElement>(".fq-answer"));

    const measure = () => {
      const t = sec.getBoundingClientRect().width / 12;
      if (!(t > 0)) return;
      const next = rows.map((row, i) => {
        const answer = answers[i];
        if (!answer) return 0;
        const style = getComputedStyle(row);
        const closed = parseFloat(style.getPropertyValue("--fq-closed")) || 1;
        const padTop = parseFloat(style.paddingTop) || 0;
        const contentBottom =
          answer.getBoundingClientRect().bottom - row.getBoundingClientRect().top;
        /* Use the smallest whole tick with balanced bottom padding. */
        const open = Math.max(closed, Math.ceil((contentBottom + padTop - 0.5) / t));
        row.style.setProperty("--fq-open", String(open));
        row.style.setProperty("--drawer-extra", String(open - closed));
        return open - closed;
      });
      setExtras((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next,
      );
    };

    /* Re-measure on every tick, band, or height change. */
    const ro = new ResizeObserver(measure);
    ro.observe(sec);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

  const openIdx = items.findIndex((item) => item.id === openId);
  const activeExtra = openIdx >= 0 ? (extras[openIdx] ?? 0) : 0;
  const maxExtra = extras.reduce((a, b) => Math.max(a, b), 0);

  return (
    <>
      <div className="faq-railext" aria-hidden="true">
        {EXT_BANDS.map(({ band, gx, gy0 }) =>
          gx.flatMap((col) =>
            Array.from({ length: maxExtra }, (_, i) => (
              <i
                key={`${band}-${col}-${i}`}
                className={`faq-ext ${band}${i < activeExtra ? " on" : ""}`}
                style={{ "--gx": col, "--gy": gy0 + i, "--i": i } as CSSProperties}
              />
            )),
          ),
        )}
      </div>
      <ul className="faq-questions" data-landmark="questions" ref={listRef}>
        {items.map((item) => (
          <FaqQuestion
            key={item.id}
            id={`faq-${item.id}`}
            open={openId === item.id}
            onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </ul>
    </>
  );
}
