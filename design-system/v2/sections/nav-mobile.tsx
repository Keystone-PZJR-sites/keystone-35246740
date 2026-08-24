"use client";

/** v2 sections — the mobile nav island (spec 005 §2, §4–§6, §7).
 *
 * The closed rail is absolute at the page top and scrolls away; the
 * panel is a full-height fixed sheet drawing down from the viewport top
 * in the footer grammar (§6.6). The panel is a focus-managed
 * aria-modal dialog: focus moves to the container (never auto-focused
 * into a control), Escape and outside-click close, focus returns to the
 * toggle, body scroll locks through lib/scrollLock only.
 *
 * The Solutions/Resources rows are disclosure-only buttons (§7 F11) in
 * the footer drawer grammar — single-open, the header label pinned, the
 * box drawing down to its designed height while the rows below ride the
 * whole-tick push-down (§5). Chips and buttons arrive server-rendered.
 */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { lockScroll } from "@/lib/scrollLock";
import { IconChevronDownMedium, IconNavMenu } from "../icons";

export interface NavMobileRow {
  id: string;
  label: string;
  /** Plain rows link; drawer rows disclose. */
  href?: string;
  drawer?: ReactNode;
  /** Whole-tick push-down per band (§5, "group"). */
  group?: { rm: number; rs: number; rt: number };
  /** The open box's own whole-tick height per band (§5, "box") — at rs
   * it is smaller than the group and the remainder is clear space. */
  boxTicks?: { rm: number; rs: number; rt: number };
}

/** Both glyphs stack in one grid cell; the swap is CSS (§6.4). */
function GlyphStack() {
  return (
    <span className="knav-glyphstack" aria-hidden="true">
      <IconNavMenu className="knav-glyph-menu" />
      <IconNavMenu className="knav-glyph-x" open />
    </span>
  );
}

/* The right-rail ornament (§4): 1t cells from the list top to the panel
   bottom; the build fills the available height, extra cells clipped.
   The circle rows are band-dependent and handled in CSS. */
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
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const unlock = lockScroll();
    panelRef.current?.focus({ preventScroll: true });
    return unlock;
  }, [open]);

  /** Close and return focus to the toggle (§7). Pointer-initiated
   * closes mark the toggle so the focus ring stays quiet — iOS Safari
   * treats programmatic focus as :focus-visible and would paint the
   * ring after a tap. Keyboard closes (Escape) keep the ring. The mark
   * clears on blur or the next key press. */
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
        if (e.key === "Escape" && open) close(true);
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

      {/* the designed click-catcher over the exposed 1t strip — no fill,
          no visual scrim (§4) */}
      <div className="knav-catch" aria-hidden="true" onClick={close} />

      <div
        id="knav-panel"
        ref={panelRef}
        className="knav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
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
                onClick={close}
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
