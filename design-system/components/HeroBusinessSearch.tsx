'use client';

// Hero business search — an Owner-style "find your business" typeahead that
// powers the Keystone Grader entry point. Typing queries the Grader API's
// Google Places search; choosing a result (or submitting) opens the Grader in a
// new tab pre-loaded with the business, which auto-starts the scan.
//
// Layout note: the homepage hero clips overflow and anchors its content band to
// the bottom of the viewport, so the results menu opens UPWARD (bottom-full) to
// stay on-screen and avoid being clipped.

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { SearchLg, ArrowNarrowRight } from '@untitledui/icons';
import {
  GRADER_API_URL,
  graderScanUrl,
  type GraderSuggestion,
} from '@/design-system/constants/grader';

export interface HeroBusinessSearchProps {
  /** Field placeholder, e.g. "Find your business". */
  placeholder: string;
  /** Submit-button label / aria-label, e.g. "Get my AI report". */
  buttonLabel: string;
  /** Sizing context — the hero renders a desktop and a mobile instance. */
  variant?: 'desktop' | 'mobile';
  /**
   * Which way the results menu opens. The desktop hero band is bottom-anchored
   * so it opens 'up'; the mobile content zone has room below so it opens 'down'.
   */
  menuPlacement?: 'up' | 'down';
  className?: string;
}

// Typeahead tuning: debounce keystrokes before hitting the API and cap the menu
// so it never overruns the hero's limited vertical room.
const DEBOUNCE_MS = 200;
const MAX_RESULTS = 4;
const REQUEST_TIMEOUT_MS = 8000;
// Close the menu just after blur so a click on a result still registers.
const BLUR_CLOSE_MS = 120;
// Searching indicator — three dots that bounce in sequence.
const DOT_COUNT = 3;
const DOT_STAGGER_S = 0.16;
const DOT_DURATION_S = 0.8;

/** Animated "…" shown in the submit button while a search is in flight. */
function SearchingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Searching" role="status">
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-current"
          style={{ animationDelay: `${i * DOT_STAGGER_S}s`, animationDuration: `${DOT_DURATION_S}s` }}
        />
      ))}
    </span>
  );
}

export function HeroBusinessSearch({
  placeholder,
  buttonLabel,
  variant = 'desktop',
  menuPlacement = 'up',
  className,
}: HeroBusinessSearchProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const [results, setResults] = useState<GraderSuggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live typeahead via the Grader API, debounced; an empty query clears results.
  useEffect(() => {
    let live = true;
    const id = setTimeout(async () => {
      const q = query.trim();
      if (!q) {
        if (live) {
          setResults([]);
          setSearching(false);
        }
        return;
      }
      try {
        const resp = await fetch(
          `${GRADER_API_URL}/search?q=${encodeURIComponent(q)}`,
          { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) },
        );
        if (!resp.ok) throw new Error(String(resp.status));
        const data = (await resp.json()) as GraderSuggestion[];
        if (live) setResults(data.slice(0, MAX_RESULTS));
      } catch {
        if (live) setResults([]);
      } finally {
        if (live) setSearching(false);
      }
    }, DEBOUNCE_MS);
    return () => {
      live = false;
      clearTimeout(id);
    };
  }, [query]);

  const showMenu = focused && results.length > 0;

  function openGrader(business: GraderSuggestion) {
    window.open(graderScanUrl(business), '_blank', 'noopener,noreferrer');
  }

  function choose(s: GraderSuggestion) {
    setQuery(s.name);
    openGrader(s);
  }

  /**
   * Submit without an explicit pick: prefer the top suggestion, else scan
   * exactly what the visitor typed (identity resolved server-side). An empty
   * box does nothing.
   */
  function submit() {
    const q = query.trim();
    if (results[0]) openGrader(results[0]);
    else if (q) openGrader({ id: '', name: q, address: '' });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!showMenu) {
      if (e.key === 'Enter') submit();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(results[active] ?? results[0]);
    }
  }

  const isDesktop = variant === 'desktop';

  return (
    <div className={clsx('relative w-full', isDesktop ? 'max-w-xl' : 'max-w-md', className)}>
      <div
        className={clsx(
          'flex items-center bg-[var(--color-surface-card)] transition-shadow',
          isDesktop ? 'h-16 gap-3 rounded-2xl pl-5 pr-2' : 'h-14 gap-2.5 rounded-xl pl-4 pr-1.5',
          focused
            ? 'shadow-[0_18px_44px_-20px_rgba(4,32,25,0.55)]'
            : 'shadow-[0_10px_30px_-18px_rgba(4,32,25,0.5)]',
        )}
      >
        <SearchLg
          className={clsx('shrink-0', isDesktop ? 'size-5' : 'size-[18px]')}
          color="var(--color-text-placeholder)"
          aria-hidden="true"
        />
        <input
          value={query}
          onChange={(e) => {
            const next = e.target.value;
            setQuery(next);
            setActive(0);
            setFocused(true);
            // Immediate feedback: flip the button to its searching state the
            // moment the visitor types (before the debounce/fetch resolves).
            setSearching(next.trim().length > 0);
          }}
          onFocus={() => {
            if (blurTimer.current) clearTimeout(blurTimer.current);
            setFocused(true);
          }}
          onBlur={() => {
            blurTimer.current = setTimeout(() => setFocused(false), BLUR_CLOSE_MS);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
          className={clsx(
            "min-w-0 flex-1 bg-transparent font-['FK_Grotesk_Neue',sans-serif] tracking-[-0.01em] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-placeholder)]",
            isDesktop ? 'text-lg' : 'text-base',
          )}
        />
        <button
          type="button"
          onClick={submit}
          aria-label={buttonLabel}
          className={clsx(
            "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[var(--color-hero-accent)] font-['FK_Grotesk_Neue',sans-serif] tracking-[-0.01em] text-[var(--color-hero-bg)] transition-colors hover:bg-[var(--color-hero-accent-hover)]",
            isDesktop ? 'h-12 px-5 text-base' : 'h-11 px-3.5 text-base',
          )}
        >
          {searching ? (
            <SearchingDots />
          ) : (
            <>
              <span>{buttonLabel}</span>
              <ArrowNarrowRight size={isDesktop ? 18 : 16} color="var(--color-hero-bg)" />
            </>
          )}
        </button>
      </div>

      {showMenu && (
        <ul
          className={clsx(
            'absolute inset-x-0 z-[60] max-h-72 overflow-y-auto rounded-2xl border border-[var(--color-border-tertiary)] bg-[var(--color-surface-card)] py-1.5 text-left shadow-[0_24px_60px_-24px_rgba(4,32,25,0.6)]',
            menuPlacement === 'up' ? 'bottom-full mb-2' : 'top-full mt-2',
          )}
        >
          {results.map((s, i) => (
            <li key={s.id || `${s.name}-${i}`}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(s)}
                className={clsx(
                  "flex w-full flex-col gap-0.5 px-5 py-2.5 text-left font-['FK_Grotesk_Neue',sans-serif] transition-colors",
                  active === i ? 'bg-[var(--color-hero-bg)]' : 'hover:bg-[var(--color-bg-secondary)]',
                )}
              >
                <span
                  className="text-[0.95rem] font-medium"
                  style={{ color: active === i ? 'var(--color-hero-text)' : 'var(--color-text-primary)' }}
                >
                  {s.name}
                </span>
                <span
                  className="text-xs"
                  style={{ color: active === i ? 'var(--color-hero-accent)' : 'var(--color-text-tertiary)' }}
                >
                  {s.address}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
