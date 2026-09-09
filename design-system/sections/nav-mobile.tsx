"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { trapModalTab } from "@/design-system/lib/focus-trap";
import { lockScroll } from "@/design-system/lib/scroll-lock";
import { IconChevronDownMedium, IconNavMenu } from "../icons";

export interface NavMobileRow {
  id: string;
  label: string;
  /** Plain rows link; drawer rows disclose. */
  href?: string;
  drawer?: ReactNode;
  /** Whole-tick push-down per band. */
  group?: { rm: number; rs: number; rt: number };
  /** The open box height; it can be shorter than its push-down group. */
  boxTicks?: { rm: number; rs: number; rt: number };
}

/** Both glyphs share a grid cell so CSS can crossfade them. */
function GlyphStack() {
  return (
    <span className="knav-glyphstack" aria-hidden="true">
      <IconNavMenu className="knav-glyph-menu" />
      <IconNavMenu className="knav-glyph-x" open />
    </span>
  );
}

/* Extra rail cells are clipped to the available panel height. */
const RAIL_CELL_COUNT = 40;

export function NavMobile({
  homeHref,
  rows,
  buttons,
}: {
  homeHref: string;
  rows: NavMobileRow[];
  buttons: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  /** Defer same-page anchors until scroll-lock cleanup restores position. */
  const pendingHashRef = useRef<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const unlock = lockScroll();
    panelRef.current?.focus({ preventScroll: true });
    return unlock;
  }, [open]);

  useEffect(() => {
    if (open) return;
    const hash = pendingHashRef.current;
    if (!hash) return;
    pendingHashRef.current = null;
    /* scrollIntoView also handles repeated clicks on the current hash. */
    window.location.hash = hash;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [open]);

  /** Pointer closes suppress Safari's programmatic focus ring; keyboard closes keep it. */
  const close = (viaKeyboard = false) => {
    setOpen(false);
    setOpenDrawer(null);
    const toggle = toggleRef.current;
    if (toggle) {
      if (viaKeyboard) delete toggle.dataset.quietFocus;
      else toggle.dataset.quietFocus = "";
      toggle.focus({ preventScroll: true });
    }
  };

  return (
    <div
      className="knav-m"
      data-open={open || undefined}
      onKeyDown={(e) => {
        if (!open) return;
        if (e.key === "Escape") close(true);
        else if (panelRef.current) trapModalTab(e, panelRef.current);
      }}
    >
      <div className="knav-mbar">
        <a className="knav-logo" href={homeHref} aria-label="Keystone — home">
          <i className="knav-mark" aria-hidden="true" />
        </a>
        <i className="knav-vr knav-mvr" aria-hidden="true" />
        <button
          ref={toggleRef}
          type="button"
          className="knav-mtoggle"
          aria-expanded={open}
          aria-controls="knav-panel"
          aria-label="Menu"
          onClick={() => (open ? close() : setOpen(true))}
          onBlur={(e) => delete e.currentTarget.dataset.quietFocus}
          onKeyDown={(e) => delete e.currentTarget.dataset.quietFocus}
        >
          <GlyphStack />
        </button>
      </div>

      <div className="knav-catch" aria-hidden="true" onClick={() => close()} />

      <div
        id="knav-panel"
        ref={panelRef}
        className="knav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        onClick={(e) => {
          /* Same-page anchors wait for scroll unlock; other links navigate normally. */
          const a = (e.target as HTMLElement).closest("a");
          if (!a) return;
          const url = new URL(a.href, window.location.href);
          if (url.hash && url.pathname === window.location.pathname) {
            e.preventDefault();
            pendingHashRef.current = url.hash;
          }
          close();
        }}
      >
        <div className="knav-pin">
          <div className="knav-ptop">
            <a className="knav-wordmark" href={homeHref} aria-label="Keystone — home">
              <i className="knav-wmark" aria-hidden="true" />
            </a>
            <div className="knav-prailtop">
              <span className="knav-plogo">
                <i className="knav-mark" aria-hidden="true" />
              </span>
              <i className="knav-vr knav-mvr" aria-hidden="true" />
              <button
                type="button"
                className="knav-mtoggle"
                aria-expanded={open}
                aria-controls="knav-panel"
                aria-label="Close menu"
                onClick={() => close()}
              >
                <GlyphStack />
              </button>
            </div>
          </div>

          <ul className="knav-list">
            {rows.map((row) => {
              if (!row.drawer) {
                return (
                  <li key={row.id} className="knav-slot">
                    <a className="knav-row" href={row.href}>
                      <span className="knav-rlabel">{row.label}</span>
                    </a>
                  </li>
                );
              }
              const isOpen = openDrawer === row.id;
              return (
                <li
                  key={row.id}
                  className="knav-slot knav-gslot"
                  data-open={isOpen || undefined}
                  style={
                    {
                      "--g-rm": row.group!.rm,
                      "--g-rs": row.group!.rs,
                      "--g-rt": row.group!.rt,
                      "--bt-rm": row.boxTicks!.rm,
                      "--bt-rs": row.boxTicks!.rs,
                      "--bt-rt": row.boxTicks!.rt,
                    } as CSSProperties
                  }
                >
                  <div className="knav-gbox">
                    <button
                      type="button"
                      className="knav-row knav-gtrigger"
                      aria-expanded={isOpen}
                      aria-controls={`knav-g-${row.id}`}
                      onClick={() => setOpenDrawer(isOpen ? null : row.id)}
                    >
                      <span className="knav-rlabel">{row.label}</span>
                      <IconChevronDownMedium className="knav-rchev" />
                    </button>
                    <div className="knav-chips" id={`knav-g-${row.id}`}>
                      <div className="knav-chipsin">{row.drawer}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="knav-prail" aria-hidden="true">
            {Array.from({ length: RAIL_CELL_COUNT }, (_, i) => (
              <i key={i} className="knav-pcell" />
            ))}
          </div>

          <div className="knav-pbtns">{buttons}</div>
        </div>
      </div>
    </div>
  );
}
