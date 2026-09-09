"use client";

/** v2 sections — the blog search island (spec 024 §5/§6).
 *
 * The section's one island. The module is a real GET form
 * (`/blog?q=`) whose submit is native navigation — the island owns
 * only the open/close + focus contract:
 *
 * - The collapsed rest is a button (aria-expanded) that opens the
 *   pill and moves focus into the input; Escape closes and returns
 *   focus to the rest button. Focus moves only on user transitions,
 *   never on mount.
 * - Open/close is CSS (the [data-open] attribute; the width morph and
 *   the standing asymmetry live in blog-top.css). Reduced motion
 *   renders state-to-state — the island sets no styles.
 * - The server HTML is the OPEN functional form (the no-JS posture,
 *   024 §9 R3); the section's pre-paint [data-js] flip renders the
 *   collapsed rest from the first frame on JS loads (§9 R4). The
 *   island's initial state (closed) matches that CSS state, so
 *   hydration changes nothing visible.
 */

import { useLayoutEffect, useRef, useState } from "react";
import { IconSearchGlyph } from "../icons";

export function BlogSearchIsland() {
  const [open, setOpen] = useState(false);
  /* focus rides user transitions only — never the mount */
  const interacted = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const restRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!interacted.current) return;
    if (open) {
      inputRef.current?.focus({ preventScroll: true });
    } else {
      restRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <div className="bt-search" data-open={open ? "" : undefined}>
      <button
        ref={restRef}
        type="button"
        className="bt-search-rest"
        aria-expanded={open}
        aria-label="Search the blog"
        onClick={() => {
          interacted.current = true;
          setOpen(true);
        }}
      >
        <IconSearchGlyph />
      </button>
      <form
        role="search"
        action="/blog"
        method="get"
        className="bt-search-pill"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            interacted.current = true;
            setOpen(false);
          }
        }}
      >
        <input
          ref={inputRef}
          type="text"
          name="q"
          placeholder="Search..."
          aria-label="Search the blog"
        />
        <button type="submit" className="bt-search-go" aria-label="Search">
          <IconSearchGlyph />
        </button>
      </form>
    </div>
  );
}
