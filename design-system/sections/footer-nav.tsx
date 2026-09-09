"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { IconChevronDownMedium } from "../icons";

export interface FooterNavGroup {
  id: string;
  label: string;
  /** Open drawer heights in ticks per accordion band. */
  openRm: number;
  openRs: number;
  list: ReactNode;
}

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
      <nav className="f-nav" data-landmark="nav" aria-label="Footer">
        <ul className="fnav-groups">
          {groups.map((g) => {
            const isOpen = g.id === openId;
            return (
              <li
                key={g.id}
                className="fnav-group"
                data-drawer=""
                data-open={isOpen || undefined}
                style={
                  {
                    "--open-rm": g.openRm,
                    "--open-rs": g.openRs,
                    "--fnav-extra-rm": g.openRm - 2,
                    "--fnav-extra-rs": g.openRs - 2,
                  } as CSSProperties
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
