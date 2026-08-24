"use client";

/** v2 sections — the footer nav accordion island (spec 004 §4–§5).
 *
 * One DOM, two structures: below 768 the groups are disclosure rows
 * (single-open accordion); from 768 they are static columns and no
 * accordion semantics remain in the tree (the trigger button is
 * display:none, so it and its ARIA leave the accessibility tree; the
 * static heading shows instead).
 *
 * The rail-extension layer carries the drawer's lattice growth (§5):
 * cells fade in with a 40ms cascade away from the drawer on open and
 * fade with the collapse on close. Cell positions are section-local
 * ticks — the layer is a sibling of .gx inside the section. Extension
 * counts per band equal the open drawer's extra ticks (open − 2).
 */

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { IconChevronDownMedium } from "../icons";

export interface FooterNavGroup {
  id: string;
  label: string;
  /** Open drawer heights in ticks per accordion band (§5). */
  openRm: number;
  openRs: number;
  /** The group's item list, server-rendered. */
  list: ReactNode;
}

/* Rail extensions, section-local: rm — right rail below gy 18, up to 5
   cells; rs — both rails below gy 15, up to 4 cells each (§5). */
const EXT_RM = { gx: [11], gy0: 18, max: 5 };
const EXT_RS = { gx: [0, 11], gy0: 15, max: 4 };

function extCells(
  band: "rm" | "rs",
  cfg: { gx: number[]; gy0: number; max: number },
  active: number,
) {
  return cfg.gx.flatMap((gx) =>
    Array.from({ length: cfg.max }, (_, i) => (
      <div
        key={`${band}-${gx}-${i}`}
        className={`f-ext ${band}${i < active ? " on" : ""}`}
        style={
          {
            "--gx": gx,
            "--gy": cfg.gy0 + i,
            "--i": i,
          } as CSSProperties
        }
      />
    )),
  );
}

export function FooterNav({ groups }: { groups: FooterNavGroup[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = groups.find((g) => g.id === openId);

  return (
    <>
      <div className="f-railext" aria-hidden="true">
        {extCells("rm", EXT_RM, open ? open.openRm - 2 : 0)}
        {extCells("rs", EXT_RS, open ? open.openRs - 2 : 0)}
      </div>
      <nav className="f-nav" aria-label="Footer">
        <ul className="fnav-groups">
          {groups.map((g) => {
            const isOpen = g.id === openId;
            return (
              <li
                key={g.id}
                className="fnav-group"
                data-open={isOpen || undefined}
                style={
                  { "--open-rm": g.openRm, "--open-rs": g.openRs } as CSSProperties
                }
              >
                <h3 className="fnav-h">
                  <button
                    type="button"
                    className="fnav-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`fnav-${g.id}`}
                    onClick={() => setOpenId(isOpen ? null : g.id)}
                  >
                    <span className="fnav-hg">
                      <span className="fnav-dot" data-g={g.id} aria-hidden="true" />
                      <span className="fnav-name">{g.label}</span>
                    </span>
                    <IconChevronDownMedium className="fnav-chevron" />
                  </button>
                  <span className="fnav-static">
                    <span className="fnav-dot" data-g={g.id} aria-hidden="true" />
                    <span className="fnav-name">{g.label}</span>
                  </span>
                </h3>
                <div className="fnav-listwrap" id={`fnav-${g.id}`}>
                  {g.list}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
