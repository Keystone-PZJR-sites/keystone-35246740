"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { trapModalTab } from "../lib/focus-trap";
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
  /** Label used in the rail and iframe title. */
  name: string;
  url: string;
}

type ViewMode = "desktop" | "tablet" | "mobile";
type Phase = "closed" | "open" | "closing";

const RS_GATE = 470;
const RT_GATE = 665;

const VIEW_MODES: Array<{ id: ViewMode; label: string; Icon: typeof IconDesktopView }> = [
  { id: "desktop", label: "Desktop view", Icon: IconDesktopView },
  { id: "tablet", label: "Tablet view", Icon: IconTabletView },
  { id: "mobile", label: "Mobile view", Icon: IconMobileView },
];

export function GalleryOverlay({
  sites,
  openSite,
}: {
  sites: GalleryViewerSite[];
  /** 1-based site index from `?gallery=` (e.g. /gallery → first site). */
  openSite?: number;
}) {
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const initialSite =
    openSite !== undefined
      ? Math.max(1, Math.min(sites.length || 1, openSite || 1))
      : null;
  const [phase, setPhase] = useState<Phase>(initialSite ? "open" : "closed");
  const [s, setS] = useState(initialSite ?? 1);
  const [v, setV] = useState<ViewMode>("desktop");
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const mounted = phase !== "closed";

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const trigger = target?.closest<HTMLElement>('[data-action="open-gallery"]');
      if (!trigger) return;
      // A thumbnail provides its site; a section CTA falls back to its published index.
      const read = trigger.dataset.gallerySite ?? trigger.closest<HTMLElement>("[data-k]")?.dataset.k;
      const next = read ? parseInt(read, 10) : 1;
      openerRef.current = trigger;
      setS(Number.isFinite(next) ? Math.max(1, Math.min(sites.length, next)) : 1);
      const w = document.documentElement.clientWidth;
      setV(w < RS_GATE ? "mobile" : w < RT_GATE ? "tablet" : "desktop");
      setPhase("open");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [sites.length]);

  /* Drop ?gallery= after the deep-linked open so refresh stays closed. */
  useEffect(() => {
    if (!initialSite) return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("gallery")) return;
    params.delete("gallery");
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
    );
  }, [initialSite]);

  useEffect(() => {
    if (!mounted) return;
    const unlock = lockScroll();
    rootRef.current?.focus({ preventScroll: true });
    return unlock;
  }, [mounted]);

  /* Recompute iframe placement when the viewer or mode changes. */
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
        // Lay out at the reference width, then scale to fit.
        scale = w / ref;
        boxH = availH / scale;
      } else if (v === "mobile") {
        // Keep a true mobile viewport width and clamp only its height.
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
    // A zero-duration fade never emits the animation event used to unmount.
    if (root && !parseFloat(getComputedStyle(root).animationDuration)) {
      setPhase("closed");
      return;
    }
    setPhase("closing");
  };

  const page = (d: 1 | -1) => {
    const next = Math.max(1, Math.min(sites.length, s + d));
    setS(next);
    // Keep focus in the dialog when the active pager button becomes disabled.
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
    } else if (rootRef.current) {
      trapModalTab(e, rootRef.current);
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
        <span className="gv-label">Keystone Gallery</span>
        <div className="gv-east">
          <span className="gv-name">{site.name}</span>
          <div className="gv-pager">
            <button
              type="button"
              className="gv-btn"
              aria-label="Previous gallery item"
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
        {/* Replacing the keyed iframe avoids adding each preview to session history. */}
        <iframe key={s} className="gv-embed" src={site.url} title={`${site.name} — live website`} />
      </div>
    </div>,
    portalTarget,
  );
}
