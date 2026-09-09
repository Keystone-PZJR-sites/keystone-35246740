"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { IconSearchGlyph } from "../icons";

export function BlogSearchIsland({ initialQuery = "" }: { initialQuery?: string }) {
  const [open, setOpen] = useState(Boolean(initialQuery));
  /* Move focus only after user-triggered state changes. */
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
          defaultValue={initialQuery}
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
