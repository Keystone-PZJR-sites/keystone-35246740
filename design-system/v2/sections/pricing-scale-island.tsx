"use client";

/** v2 sections — the pricing-scale island (spec 012 §6/§7).
 *
 * One state k ∈ {0, 1, 2} owns the section (one source of truth); the
 * slider and the strip are two views of it. The island holds k and
 * writes it as attributes and custom properties; every position and
 * transition derives in CSS — the strip translate is
 * −k × (card + 1t) in ticks (geometry, never a px constant), the
 * slider thumb/progress ride the state fraction, and the snap runs on
 * the one --ps-snap-dur clock.
 *
 * Inputs, all writing the same k (§6): dragging the thumb (tracks the
 * pointer live through --sldr-f with data-dragging killing the
 * transition; snaps to the nearest of the three positions on
 * release); pressing the track (snaps to the nearest position to the
 * release point); arrow keys on the focused native range input;
 * swiping the strip (tracks live through --ps-drag-dx; snaps to the
 * nearest state on release); clicking an inactive card's overlay
 * button. No timers, no arrow controls — the section never moves on
 * its own.
 *
 * The range inputs render disabled on the server (§7.3 — a no-JS page
 * never offers an unwirable control); the island enables them on
 * mount. Reduced motion needs nothing here: the writes are
 * state-to-state and the CSS transition kill renders them instantly.
 * k is re-derived from the DOM on mount so an HMR remount never
 * resets a live section. */

import { useEffect, useRef, type ReactNode } from "react";
import type { SliderHue, SliderState } from "../primitives/slider";

const STATES: SliderState[] = ["less", "middle", "more"];

interface IslandPersona {
  hue: SliderHue;
  tagLabel: string;
}

interface PricingScaleIslandProps {
  personas: IslandPersona[];
  children: ReactNode;
}

export function PricingScaleIsland({ personas, children }: PricingScaleIslandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const personasRef = useRef(personas);
  personasRef.current = personas;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const strip = root.querySelector<HTMLElement>(".ps-strip");
    const viewport = root.querySelector<HTMLElement>(".ps-carousel");
    const sliders = [...root.querySelectorAll<HTMLElement>(".sldr")];
    const inputs = sliders.map((s) => s.querySelector<HTMLInputElement>(".sldr-input"));
    const rows = sliders.map((s) => s.querySelector<HTMLElement>(".sldr-row"));
    const thumbs = sliders.map((s) => s.querySelector<HTMLElement>(".sldr-thumb"));
    const cards = [...root.querySelectorAll<HTMLElement>(".pcard")];
    const slots = [...root.querySelectorAll<HTMLElement>(".ps-slot")];
    const overlays = cards.map((c) => c.querySelector<HTMLButtonElement>(".pcard-overlay"));
    if (!strip || !viewport || cards.length === 0) return;
    const COUNT = cards.length;

    /* re-derive k from the rendered state (HMR-safe, engine pattern) */
    let k = Math.max(
      0,
      cards.findIndex((c) => c.dataset.state === "active"),
    );

    const commit = (next: number) => {
      const clamped = Math.max(0, Math.min(COUNT - 1, next));
      if (clamped === k) return;
      k = clamped;
      const persona = personasRef.current[k];
      strip.style.setProperty("--ps-k", String(k));
      sliders.forEach((s) => {
        s.dataset.state = STATES[k];
        s.dataset.hue = persona.hue;
      });
      inputs.forEach((input) => {
        if (!input) return;
        input.value = String(k);
        input.setAttribute("aria-valuetext", persona.tagLabel);
      });
      cards.forEach((c, i) => {
        c.dataset.state = i === k ? "active" : "inactive";
      });
    };

    /* ---- the native inputs: keyboard (arrow keys, home/end) ---- */

    const onInput = (input: HTMLInputElement) => () => commit(Number(input.value));
    const inputHandlers = inputs.map((input) => (input ? onInput(input) : null));

    /* ---- slider gestures: thumb drag tracks live, track press snaps
       to the nearest position on release (§6) ---- */

    const sliderCleanups = sliders.map((slider, si) => {
      const row = rows[si];
      const thumb = thumbs[si];
      if (!row || !thumb) return () => undefined;

      let dragging = false;
      let pressed = false;
      let grabOffset = 0;
      let lastF = 0;

      const fFrom = (clientX: number, offset: number) => {
        const rect = row.getBoundingClientRect();
        const raw = (clientX - offset - rect.left) / Math.max(rect.width, 1);
        return Math.max(0, Math.min(1, raw));
      };

      const onDown = (e: PointerEvent) => {
        if (!e.isPrimary) return;
        pressed = true;
        const target = e.target as Node;
        if (thumb === target || thumb.contains(target)) {
          const tr = thumb.getBoundingClientRect();
          grabOffset = e.clientX - (tr.left + tr.width / 2);
          dragging = true;
          slider.dataset.dragging = "";
          lastF = fFrom(e.clientX, grabOffset);
          slider.style.setProperty("--sldr-f", String(lastF));
        }
        /* capture is an optimization, not a requirement (the engine
           precedent) — a failure must not kill the gesture */
        try {
          row.setPointerCapture(e.pointerId);
        } catch {
          /* uncapturable pointer — move/up still arrive through the row */
        }
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        lastF = fFrom(e.clientX, grabOffset);
        slider.style.setProperty("--sldr-f", String(lastF));
      };
      const onUp = (e: PointerEvent) => {
        if (!pressed) return;
        pressed = false;
        if (dragging) {
          dragging = false;
          /* transitions back on, state committed under the live value,
             then the override comes off — the snap runs f → k on the
             one clock */
          delete slider.dataset.dragging;
          commit(Math.round(lastF * (COUNT - 1)));
          slider.style.removeProperty("--sldr-f");
        } else {
          commit(Math.round(fFrom(e.clientX, 0) * (COUNT - 1)));
        }
      };
      const onCancel = () => {
        if (!pressed) return;
        pressed = false;
        if (dragging) {
          dragging = false;
          delete slider.dataset.dragging;
          slider.style.removeProperty("--sldr-f");
        }
      };

      row.addEventListener("pointerdown", onDown);
      row.addEventListener("pointermove", onMove);
      row.addEventListener("pointerup", onUp);
      row.addEventListener("pointercancel", onCancel);
      return () => {
        row.removeEventListener("pointerdown", onDown);
        row.removeEventListener("pointermove", onMove);
        row.removeEventListener("pointerup", onUp);
        row.removeEventListener("pointercancel", onCancel);
        delete slider.dataset.dragging;
        slider.style.removeProperty("--sldr-f");
      };
    });

    /* ---- strip swipe: tracks the pointer live, snaps to the nearest
       state on release; a real swipe suppresses the click so the
       overlay buttons never double-fire (§6) ---- */

    let stripDragging = false;
    let suppressClick = false;
    let startX = 0;
    let dx = 0;
    let pitch = 1;

    const onStripDown = (e: PointerEvent) => {
      if (!e.isPrimary || slots.length < 2) return;
      /* rects, not offsets — exact under the live translate */
      pitch = slots[1].getBoundingClientRect().left - slots[0].getBoundingClientRect().left;
      if (pitch <= 0) return;
      stripDragging = true;
      suppressClick = false;
      startX = e.clientX;
      dx = 0;
      strip.dataset.dragging = "";
      /* capture waits for real movement: capturing here would retarget
         the derived click to the viewport and the overlay buttons
         would never receive theirs */
    };
    const onStripMove = (e: PointerEvent) => {
      if (!stripDragging) return;
      /* clamp the live offset to the strip's travel — no overscroll */
      dx = Math.max((k - (COUNT - 1)) * pitch, Math.min(k * pitch, e.clientX - startX));
      strip.style.setProperty("--ps-drag-dx", `${dx}px`);
      if (!suppressClick && Math.abs(e.clientX - startX) > 6) {
        suppressClick = true;
        try {
          viewport.setPointerCapture(e.pointerId);
        } catch {
          /* uncapturable pointer — move/up still arrive through the viewport */
        }
      }
    };
    const onStripUp = () => {
      if (!stripDragging) return;
      stripDragging = false;
      delete strip.dataset.dragging;
      commit(Math.round(k - dx / pitch));
      strip.style.removeProperty("--ps-drag-dx");
    };
    /* the suppressed click fires after pointerup — swallow it once */
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return;
      e.stopPropagation();
      e.preventDefault();
      suppressClick = false;
    };
    /* a swipe starting on a card photo must not become a native image
       drag — the browser would cancel the pointer stream mid-gesture */
    const onDragStart = (e: DragEvent) => e.preventDefault();

    /* ---- inactive-card overlays ---- */

    const overlayHandlers = overlays.map((_, i) => () => commit(i));

    /* ---- wiring ---- */

    inputs.forEach((input, i) => {
      if (!input) return;
      input.disabled = false;
      const handler = inputHandlers[i];
      if (handler) input.addEventListener("input", handler);
    });
    overlays.forEach((b, i) => b?.addEventListener("click", overlayHandlers[i]));
    viewport.addEventListener("pointerdown", onStripDown);
    viewport.addEventListener("pointermove", onStripMove);
    viewport.addEventListener("pointerup", onStripUp);
    viewport.addEventListener("pointercancel", onStripUp);
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("dragstart", onDragStart);

    return () => {
      inputs.forEach((input, i) => {
        if (!input) return;
        input.disabled = true;
        const handler = inputHandlers[i];
        if (handler) input.removeEventListener("input", handler);
      });
      overlays.forEach((b, i) => b?.removeEventListener("click", overlayHandlers[i]));
      viewport.removeEventListener("pointerdown", onStripDown);
      viewport.removeEventListener("pointermove", onStripMove);
      viewport.removeEventListener("pointerup", onStripUp);
      viewport.removeEventListener("pointercancel", onStripUp);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("dragstart", onDragStart);
      sliderCleanups.forEach((cleanup) => cleanup());
      delete strip.dataset.dragging;
      strip.style.removeProperty("--ps-drag-dx");
    };
  }, []);

  return (
    <div className="ps-island" ref={ref}>
      {children}
    </div>
  );
}
