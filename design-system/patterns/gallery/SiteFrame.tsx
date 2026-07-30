'use client';

// The live-site embed inside a gallery entry (spec 054): a full-width framed
// iframe of the production website, plus an expand control that takes the site
// fullscreen. The expand button is rendered into the entry's story header (top
// right) via the `expandSlot` callback so it sits with the description, not
// over the iframe. The takeover portals to <body>, locks scroll through the
// site's single approved scroll-lock, and exits on Escape or the close control.
// A viewport switcher in the takeover bar constrains the iframe to mobile,
// tablet, or full-width so the visitor can preview responsive layouts.

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseButton } from '@/design-system/primitives/CloseButton';
import { lockScroll } from '@/lib/scrollLock';

export type GalleryViewport = 'mobile' | 'tablet' | 'full';

/** Preview widths for the fullscreen takeover switcher — phone / tablet / fluid. */
const VIEWPORT_WIDTH_MOBILE = '390px';
const VIEWPORT_WIDTH_TABLET = '768px';
const VIEWPORT_WIDTH_FULL = '100%';

const VIEWPORTS: { id: GalleryViewport; label: string; width: string }[] = [
  { id: 'mobile', label: 'Mobile', width: VIEWPORT_WIDTH_MOBILE },
  { id: 'tablet', label: 'Tablet', width: VIEWPORT_WIDTH_TABLET },
  { id: 'full', label: 'Full', width: VIEWPORT_WIDTH_FULL },
];

export interface SiteFrameProps {
  /** Business name, used for frame titles and the takeover header. */
  name: string;
  /** The live site to embed. */
  url: string;
  /**
   * Optional render slot for the expand control. When provided, the button is
   * handed to the parent (the story header) instead of floating over the iframe.
   */
  expandSlot?: (expandButton: ReactNode) => ReactNode;
}

function ExpandIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.5 1H13M13 1V5.5M13 1L7.75 6.25M5.5 13H1M1 13V8.5M1 13L6.25 7.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteFrame({ name, url, expandSlot }: SiteFrameProps) {
  const [expanded, setExpanded] = useState(false);
  const [viewport, setViewport] = useState<GalleryViewport>('full');
  const unlockRef = useRef<(() => void) | null>(null);
  const closeButtonRef = useRef<HTMLDivElement | null>(null);
  const viewportGroupId = useId();

  const open = useCallback(() => {
    unlockRef.current = lockScroll();
    setViewport('full');
    setExpanded(true);
  }, []);

  const close = useCallback(() => {
    setExpanded(false);
    unlockRef.current?.();
    unlockRef.current = null;
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.querySelector('button')?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [expanded, close]);

  // Never leave the page scroll-locked if the frame unmounts mid-takeover.
  useEffect(() => () => unlockRef.current?.(), []);

  const expandButton = (
    <button
      type="button"
      className="ks-gallery-frame__expand"
      onClick={open}
      aria-label={`View ${name} fullscreen`}
    >
      <ExpandIcon />
      <span>Fullscreen</span>
    </button>
  );

  const activeWidth = VIEWPORTS.find((v) => v.id === viewport)?.width ?? '100%';

  return (
    <>
      {expandSlot ? expandSlot(expandButton) : null}

      <div className="ks-gallery-frame">
        <iframe
          src={url}
          title={`${name} — live website`}
          className="ks-gallery-frame__iframe"
          loading="lazy"
        />
        {!expandSlot ? expandButton : null}

        {expanded
          ? createPortal(
              <div
                className="ks-gallery-takeover"
                role="dialog"
                aria-modal="true"
                aria-label={`${name} — live website`}
              >
                <div className="ks-gallery-takeover__bar">
                  <span className="ks-gallery-takeover__name">{name}</span>
                  <div
                    className="ks-gallery-takeover__viewports"
                    role="radiogroup"
                    aria-label="Preview viewport"
                    id={viewportGroupId}
                  >
                    {VIEWPORTS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={viewport === option.id}
                        className={
                          viewport === option.id
                            ? 'ks-gallery-takeover__viewport ks-gallery-takeover__viewport--active'
                            : 'ks-gallery-takeover__viewport'
                        }
                        onClick={() => setViewport(option.id)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="ks-gallery-takeover__actions" ref={closeButtonRef}>
                    <CloseButton onClick={close} ariaLabel="Close fullscreen view" />
                  </div>
                </div>
                <div className="ks-gallery-takeover__stage">
                  <iframe
                    src={url}
                    title={`${name} — live website, fullscreen`}
                    className="ks-gallery-takeover__iframe"
                    style={{ width: activeWidth }}
                    data-viewport={viewport}
                  />
                </div>
              </div>,
              document.body,
            )
          : null}
      </div>
    </>
  );
}
