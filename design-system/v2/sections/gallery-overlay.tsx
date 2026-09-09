"use client";

/** v2 sections — the fullscreen gallery viewer (spec 016 §4, §8.1).
 * The Our Work page's one new client island: a viewport takeover on
 * --z-modal paging the nine 015 sites as live embeds under the
 * browser-chrome rail. Behavioral ancestor: the v1 /gallery site-frame
 * takeover (old spec 054) — cited as precedent, never built from.
 *
 * One machine owning three values (§4): open (the phase), s ∈ 1…9 (the
 * embedded site, in the 015 strip order), v (the view mode). At most
 * one iframe is mounted; it is keyed by s so paging replaces the
 * element — swapping src on a live iframe would push a session history
 * entry per page and break the back button.
 *
 * Writers (§4.1): the delegated document listener wires the standing
 * data-action="open-gallery" contract (the 006 contract's promised
 * wiring — the 015 CTA markup is untouched). A thumbnail trigger
 * passes its own site through data-gallery-site (§4.4); the CTA reads
 * the strip's published k from the section root's data-k (present only
 * at rm/rs — the DOM as the one shared source; the islands stay
 * otherwise independent), else s = 1. The chevrons and Left/Right
 * arrows on the viewer chrome write s∓1 clamped at 1/9 (the end
 * chevron renders the drawn disabled state with the real attribute);
 * keys inside the embedded document belong to the embedded site. The
 * switcher radiogroup writes v; a choice persists while open and the
 * default re-derives at the next open (§3). Escape and the close
 * button close.
 *
 * On open: scroll locks through v2/lib/scroll-lock (the single
 * approved entry point; the kept gutter means the viewer's measured
 * width equals the page's), focus moves to the dialog container
 * (tabIndex -1, the standing focus law) and returns to the opener on
 * close, both with preventScroll.
 *
 * The stage (§3): the island measures the overlay root (ResizeObserver
 * — never matchMedia, the standing rule) and computes the embed's
 * layout box per view mode against the reference widths read from
 * computed style (--gv-ref-*, their single source). Reference ≤ viewer:
 * natural width, centered, full height under the rail — except mobile
 * at wide viewers, the 384 × 832 float (the §9 F8 phone proportion;
 * the width never scales, so the embed stays a true 384-px mobile
 * viewport; height clamps on short viewers). Reference > viewer:
 * fit-width scaling — the box lays out at the reference width, CSS-
 * scaled by viewer/reference, its layout height the available height
 * over the scale so the scaled box fills the sub-rail area exactly.
 *
 * Close motion (§6): the fade-out plays on the drawer clock and the
 * unmount rides its animationend; under reduced motion the fade
 * computes to 0s and the close is state-to-state (no wait). The scroll
 * lock's unlock runs as the mount effect's cleanup. A no-JS render
 * never mounts the viewer (the portal exists only after hydration);
 * the triggers hold their standing inert posture (§4.5). */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { lockScroll } from "../lib/scroll-lock";
import {
  IconChevronLeftSm,
  IconChevronRightSm,
  IconDesktopView,
  IconGalleryClose,
  IconMobileView,
  IconTabletView,
} from "../icons";

export interface GalleryViewerSite {
  /** The 015 canon name — the rail label and the iframe title (§4.2). */
  name: string;
  /** The live production site (§4.2 — the owner's operational surface). */
  url: string;
}

type ViewMode = "desktop" | "tablet" | "mobile";
type Phase = "closed" | "open" | "closing";

/* the standing structural gates (002.r1) on the viewer's own width:
   default view mode mobile <470 · tablet 470–665 · desktop ≥665 (§3);
   desktop mode below the rt gate renders the 1344 reference scaled */
const RS_GATE = 470;
const RT_GATE = 665;

const VIEW_MODES: Array<{ id: ViewMode; label: string; Icon: typeof IconDesktopView }> = [
  { id: "desktop", label: "Desktop view", Icon: IconDesktopView },
  { id: "tablet", label: "Tablet view", Icon: IconTabletView },
  { id: "mobile", label: "Mobile view", Icon: IconMobileView },
];

export function GalleryOverlay({ sites }: { sites: GalleryViewerSite[] }) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const [s, setS] = useState(1);
  const [v, setV] = useState<ViewMode>("desktop");
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const mounted = phase !== "closed";

  useEffect(() => {
    // The approved hydration-safe portal-target pattern (rules.md,
    // "Client-only state initialised after hydration").
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortalTarget(document.body);
  }, []);

  /* the delegated open-gallery listener (§4.1/§8.1) */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const trigger = target?.closest<HTMLElement>('[data-action="open-gallery"]');
      if (!trigger) return;
      // a thumbnail passes its own site (§4.4); the CTA opens on the
      // strip's published k at rm/rs and site 1 at rt+ (§4.1)
      const read = trigger.dataset.gallerySite ?? trigger.closest<HTMLElement>("[data-k]")?.dataset.k;
      const next = read ? parseInt(read, 10) : 1;
      openerRef.current = trigger;
      setS(Number.isFinite(next) ? Math.max(1, Math.min(sites.length, next)) : 1);
      // the default view mode per §3 — the page width equals the
      // viewer's width at mount (the kept scrollbar gutter)
      const w = document.documentElement.clientWidth;
      setV(w < RS_GATE ? "mobile" : w < RT_GATE ? "tablet" : "desktop");
      setPhase("open");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [sites.length]);

  /* scroll lock + focus in while the takeover is mounted (§4.1); the
     unlock callback is the cleanup (the standing scroll-lock contract) */
  useEffect(() => {
    if (!mounted) return;
    const unlock = lockScroll();
    rootRef.current?.focus({ preventScroll: true });
    return unlock;
  }, [mounted]);

  /* the §3 stage math, re-run on viewer resizes and mode switches */
  useLayoutEffect(() => {
    if (!mounted) return;
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const layout = () => {
      const w = root.clientWidth;
      const availH = stage.clientHeight;
      const cs = getComputedStyle(root);
      const gvRef = (name: string) => parseFloat(cs.getPropertyValue(name));
      const ref =
        v === "mobile"
          ? gvRef("--gv-ref-mobile")
          : v === "tablet"
            ? gvRef("--gv-ref-tablet")
            : w >= RT_GATE
              ? w
              : gvRef("--gv-ref-desktop");
      let x = 0;
      let y = 0;
      const boxW = ref;
      let boxH = availH;
      let scale = 1;
      if (ref > w) {
        // fit-width scaling (§3): layout at the reference width, scaled
        // to fill the sub-rail area exactly
        scale = w / ref;
        boxH = availH / scale;
      } else if (v === "mobile") {
        // the wide-viewer float (§3, the §9 F8 resolution): a true
        // 384-px mobile viewport at the phone proportion, centered;
        // the height clamps to the available space, never the width
        boxH = Math.min(gvRef("--gv-mobile-float-h"), availH);
        x = (w - boxW) / 2;
        y = (availH - boxH) / 2;
      } else {
        x = (w - ref) / 2;
      }
      stage.style.setProperty("--gv-embed-x", `${x}px`);
      stage.style.setProperty("--gv-embed-y", `${y}px`);
      stage.style.setProperty("--gv-embed-w", `${boxW}px`);
      stage.style.setProperty("--gv-embed-h", `${boxH}px`);
      stage.style.setProperty("--gv-embed-scale", `${scale}`);
    };
    const ro = new ResizeObserver(layout);
    ro.observe(root);
    layout();
    return () => ro.disconnect();
  }, [mounted, v]);

  const close = () => {
    openerRef.current?.focus({ preventScroll: true });
    openerRef.current = null;
    const root = rootRef.current;
    // reduced motion runs the fade at 0s (§6.3) — close state-to-state
    // instead of waiting for an animationend that never fires
    if (root && !parseFloat(getComputedStyle(root).animationDuration)) {
      setPhase("closed");
      return;
    }
    setPhase("closing");
  };

  const page = (d: 1 | -1) => {
    const next = Math.max(1, Math.min(sites.length, s + d));
    setS(next);
    // the end chevron disables under the pointer/focus at the clamp —
    // keep focus inside the dialog so keys and Escape stay live
    if (next === 1 || next === sites.length) {
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest(".gv-pager")) {
        rootRef.current?.focus({ preventScroll: true });
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      page(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      page(1);
    }
  };

  const site = sites[s - 1];
  if (!portalTarget || !mounted || !site) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="gv"
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name} — live website`}
      tabIndex={-1}
      data-closing={phase === "closing" || undefined}
      onKeyDown={onKeyDown}
      onAnimationEnd={(e) => {
        if (phase === "closing" && e.target === e.currentTarget) setPhase("closed");
      }}
    >
      <div className="gv-rail">
        <span className="gv-logo" aria-hidden="true">
          <i className="gv-mark" />
        </span>
        <i className="gv-divider" aria-hidden="true" />
        {/* static text, not a control (§2) */}
        <span className="gv-label">Keystone Gallery</span>
        <div className="gv-east">
          <span className="gv-name">{site.name}</span>
          <div className="gv-pager">
            <button
              type="button"
              className="gv-btn"
              aria-label="Previous site"
              disabled={s === 1}
              onClick={() => page(-1)}
            >
              <IconChevronLeftSm />
            </button>
            <button
              type="button"
              className="gv-btn"
              aria-label="Next site"
              disabled={s === sites.length}
              onClick={() => page(1)}
            >
              <IconChevronRightSm />
            </button>
          </div>
          <div className="gv-switch" role="radiogroup" aria-label="Preview viewport">
            {VIEW_MODES.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="radio"
                className="gv-btn"
                aria-checked={v === id}
                aria-label={label}
                onClick={() => setV(id)}
              >
                <Icon />
              </button>
            ))}
          </div>
          <button type="button" className="gv-btn" aria-label="Close gallery" onClick={close}>
            <IconGalleryClose />
          </button>
        </div>
      </div>
      <div className="gv-stage" ref={stageRef}>
        {/* keyed by s: paging replaces the element (one iframe mounted,
            no history entries); nothing loads until the viewer opens
            and the scrim shows through while a site loads (§4.3) */}
        <iframe key={s} className="gv-embed" src={site.url} title={`${site.name} — live website`} />
      </div>
    </div>,
    portalTarget,
  );
}
