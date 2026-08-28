"use client";

/** v2 sections — the FAQ island (spec 013 §5/§6, §4 R7).
 *
 * A single-open accordion (the 004 decision, adopted §5): at most one
 * drawer open; opening B while A is open runs both height animations
 * concurrently (the swap is one state write, both transitions run on
 * their own rules); focus stays on the pressed header.
 *
 * The R7 derivation: open heights are content-derived — the smallest
 * whole-tick height whose bottom padding ≥ its top padding. The island
 * measures each answer at rest (the answers stay in layout when
 * closed) and publishes per item:
 *   --fq-open       the open height in ticks (the CSS height rule)
 *   --drawer-extra  open − closed ticks (the §7.2 audit contract)
 * re-measuring whenever the section resizes (tick/band changes) and
 * after fonts load. New questions or the G9 real answers re-derive
 * automatically — no constants to edit.
 *
 * The rail cascade (§6, the 004 grammar at its second consumer): the
 * growth ticks extend the exposed rail below the static run; cells
 * fade in staggered --motion-rail-stagger away from the drawer and
 * fade with the collapse on close. Cell positions are section-local
 * ticks; counts follow the measured extras.
 *
 * Reduced motion needs nothing here — the writes are state-to-state
 * and the CSS transition kills render them instantly. A no-JS render
 * is the settled closed section with the answer copy in the HTML. */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FaqQuestion } from "../primitives/faq-question";
import type { FaqItem } from "./faq-data";

/* Rail-extension anchors, section-local ticks (§2/§6): the first
   growth row sits directly below the static rail run per band. */
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

  useEffect(() => {
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
        /* R7: smallest whole tick with bottom pad ≥ top pad; the
           half-pixel guard absorbs subpixel noise at exact fits */
        const open = Math.max(closed, Math.ceil((contentBottom + padTop - 0.5) / t));
        row.style.setProperty("--fq-open", String(open));
        row.style.setProperty("--drawer-extra", String(open - closed));
        return open - closed;
      });
      setExtras((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next,
      );
    };

    /* the observer delivers an initial callback on observe, and again
       on every tick/band/height change — measure is idempotent */
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
