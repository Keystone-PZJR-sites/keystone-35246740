'use client';

// Hero business search — an Owner-style "find your business" typeahead that
// powers the Keystone Grader entry point. Typing queries the Grader API's
// Google Places + website search; choosing a result (or submitting) opens the
// Grader in a new tab pre-loaded with the business, which auto-starts the scan.
//
// Layout note: the homepage hero clips overflow and anchors its content band to
// the bottom of the viewport, so the results menu opens UPWARD (bottom-full) to
// stay on-screen and avoid being clipped.

import clsx from 'clsx';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { SearchLg, ArrowNarrowRight } from '@untitledui/icons';
import {
  GRADER_SEARCH_PATHS,
  graderScanUrl,
  graderSearchApiUrl,
  normalizeGraderSearchResponse,
  type GraderSearchResponse,
  type GraderSuggestion,
} from '@/design-system/constants/grader';

export interface HeroBusinessSearchProps {
  placeholder: string;
  buttonLabel: string;
  variant?: 'desktop' | 'mobile';
  menuPlacement?: 'up' | 'down';
  className?: string;
}

type SearchStatus = 'idle' | 'loading' | 'ready';

type SearchSection = {
  key: 'places' | 'web';
  label: string;
  items: GraderSuggestion[];
};

const DEBOUNCE_MS = 200;
const MAX_RESULTS = 4;
const REQUEST_TIMEOUT_MS = 8000;
const BLUR_CLOSE_MS = 120;
const EMPTY_RESULTS: GraderSearchResponse = { places: [], web: [] };

const COPY = {
  searching: 'Searching…',
  preparing: 'Preparing scan…',
  noResults: 'No matches — try a different name or website',
  placesSection: 'Google Places',
  webSection: 'Websites',
} as const;

async function fetchSuggestions(query: string): Promise<GraderSearchResponse> {
  for (const path of GRADER_SEARCH_PATHS) {
    try {
      const resp = await fetch(graderSearchApiUrl(query, path), {
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!resp.ok) continue;
      return normalizeGraderSearchResponse(await resp.json());
    } catch {
      // Try the next configured endpoint.
    }
  }
  return EMPTY_RESULTS;
}

function SearchingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Searching" role="status">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-current"
          style={{ animationDelay: `${i * 0.16}s`, animationDuration: '0.8s' }}
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
  const listboxId = useId();
  const [query, setQueryState] = useState('');
  const [focused, setFocused] = useState(false);
  const [fetchStatus, setFetchStatus] = useState<Exclude<SearchStatus, 'idle'>>('loading');
  const [results, setResults] = useState<GraderSearchResponse>(EMPTY_RESULTS);
  const [preparing, setPreparing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const requestRef = useRef(0);
  const preparingRef = useRef(false);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;
  const status: SearchStatus = hasQuery ? fetchStatus : 'idle';

  const setQuery = useCallback((value: string) => {
    setQueryState(value);
    setActiveIndex(0);
    if (value.trim()) {
      setFetchStatus('loading');
    }
  }, []);

  useEffect(() => {
    const q = trimmedQuery;
    if (!q) {
      requestRef.current += 1;
      setResults(EMPTY_RESULTS);
      return;
    }

    let live = true;
    const debounceId = setTimeout(() => {
      const reqId = ++requestRef.current;
      void fetchSuggestions(q)
        .then((api) => {
          if (!live || reqId !== requestRef.current) return;
          setResults({
            places: api.places.slice(0, MAX_RESULTS),
            web: api.web.slice(0, MAX_RESULTS),
          });
          setActiveIndex(0);
          setFetchStatus('ready');
        })
        .catch(() => {
          if (!live || reqId !== requestRef.current) return;
          setResults(EMPTY_RESULTS);
          setActiveIndex(0);
          setFetchStatus('ready');
        });
    }, DEBOUNCE_MS);

    return () => {
      live = false;
      clearTimeout(debounceId);
    };
  }, [trimmedQuery]);

  const sections = useMemo<SearchSection[]>(() => {
    const out: SearchSection[] = [];
    const places = hasQuery ? results.places : [];
    const web = hasQuery ? results.web : [];
    if (places.length > 0) {
      out.push({ key: 'places', label: COPY.placesSection, items: places });
    }
    if (web.length > 0) {
      out.push({ key: 'web', label: COPY.webSection, items: web });
    }
    return out;
  }, [hasQuery, results]);

  const flatResults = useMemo(
    () => sections.flatMap((section) => section.items),
    [sections],
  );

  const showDropdown = focused && hasQuery;
  const canSubmit = !preparing && status === 'ready' && flatResults.length > 0;
  const showLoading = showDropdown && !preparing && status === 'loading';
  const showEmpty =
    showDropdown && !preparing && status === 'ready' && flatResults.length === 0;
  const showResults = showDropdown && !preparing && status === 'ready' && flatResults.length > 0;
  const showPanel = showDropdown || preparing;

  useEffect(
    () => () => {
      if (blurTimerRef.current != null) {
        clearTimeout(blurTimerRef.current);
      }
    },
    [],
  );

  function openGrader(business: GraderSuggestion) {
    window.open(graderScanUrl(business), '_blank', 'noopener,noreferrer');
  }

  const choose = useCallback(async (suggestion: GraderSuggestion) => {
    if (preparingRef.current) return;
    preparingRef.current = true;
    setPreparing(true);
    setQueryState(suggestion.name);
    setFocused(true);
    try {
      openGrader(suggestion);
    } finally {
      preparingRef.current = false;
      setPreparing(false);
    }
  }, []);

  function closeDropdown() {
    if (blurTimerRef.current != null) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
    }
    setFocused(false);
  }

  function submit() {
    const q = trimmedQuery;
    if (canSubmit) {
      void choose(flatResults[0]);
      return;
    }
    if (q) openGrader({ id: '', name: q, address: '' });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (preparing) {
      e.preventDefault();
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
      return;
    }
    if (!showResults) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submit();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((index) => (index + 1) % flatResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((index) => (index - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      void choose(flatResults[activeIndex] ?? flatResults[0]);
    }
  }

  const isDesktop = variant === 'desktop';
  const showButtonSearching = hasQuery && status === 'loading';
  let rowIndex = 0;

  return (
    <div className={clsx('relative w-full', isDesktop ? 'max-w-xl' : 'max-w-md', className)}>
      <div
        className={clsx(
          'flex items-center bg-[var(--color-surface-card)] transition-shadow',
          isDesktop ? 'h-16 gap-3 rounded-2xl pl-5 pr-2' : 'h-14 gap-2.5 rounded-xl pl-4 pr-1.5',
          focused || preparing
            ? 'shadow-[0_18px_44px_-20px_rgba(4,32,25,0.55)]'
            : 'shadow-[0_10px_30px_-18px_rgba(4,32,25,0.5)]',
          preparing && 'opacity-90',
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
            if (preparing) return;
            setQuery(e.target.value);
            setFocused(true);
          }}
          onFocus={() => {
            if (blurTimerRef.current != null) {
              clearTimeout(blurTimerRef.current);
              blurTimerRef.current = null;
            }
            setFocused(true);
          }}
          onBlur={() => {
            if (preparing) return;
            blurTimerRef.current = setTimeout(() => {
              blurTimerRef.current = null;
              setFocused(false);
            }, BLUR_CLOSE_MS);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-busy={preparing || status === 'loading'}
          aria-controls={showPanel ? listboxId : undefined}
          disabled={preparing}
          autoComplete="off"
          className={clsx(
            "min-w-0 flex-1 bg-transparent font-['FK_Grotesk_Neue',sans-serif] tracking-[-0.01em] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-placeholder)] disabled:cursor-wait",
            isDesktop ? 'text-lg' : 'text-base',
          )}
        />
        <button
          type="button"
          onClick={submit}
          disabled={preparing}
          aria-label={buttonLabel}
          className={clsx(
            "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[var(--color-hero-accent)] font-['FK_Grotesk_Neue',sans-serif] tracking-[-0.01em] text-[var(--color-hero-bg)] transition-colors hover:bg-[var(--color-hero-accent-hover)] disabled:cursor-wait",
            isDesktop ? 'h-12 px-5 text-base' : 'h-11 px-3.5 text-base',
          )}
        >
          {preparing || showButtonSearching ? (
            <SearchingDots />
          ) : (
            <>
              <span>{buttonLabel}</span>
              <ArrowNarrowRight size={isDesktop ? 18 : 16} color="var(--color-hero-bg)" />
            </>
          )}
        </button>
      </div>

      {showPanel && (
        <div
          id={listboxId}
          role="listbox"
          className={clsx(
            'absolute inset-x-0 z-[60] max-h-72 overflow-y-auto rounded-2xl border border-[var(--color-border-tertiary)] bg-[var(--color-surface-card)] py-1.5 text-left shadow-[0_24px_60px_-24px_rgba(4,32,25,0.6)]',
            menuPlacement === 'up' ? 'bottom-full mb-2' : 'top-full mt-2',
          )}
        >
          {preparing && (
            <div className="flex items-center gap-3 px-5 py-4">
              <SearchingDots />
              <span className="text-sm text-[var(--color-text-tertiary)] font-['FK_Grotesk_Neue',sans-serif]">
                {COPY.preparing}
              </span>
            </div>
          )}

          {showLoading && (
            <div className="flex items-center gap-3 px-5 py-4">
              <SearchingDots />
              <span className="text-sm text-[var(--color-text-tertiary)] font-['FK_Grotesk_Neue',sans-serif]">
                {COPY.searching}
              </span>
            </div>
          )}

          {showEmpty && (
            <div className="px-5 py-4">
              <span className="text-sm text-[var(--color-text-tertiary)] font-['FK_Grotesk_Neue',sans-serif]">
                {COPY.noResults}
              </span>
            </div>
          )}

          {showResults &&
            sections.map((section) => (
              <div key={section.key}>
                <div className="px-5 pb-1 pt-2 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)] font-['FK_Grotesk_Neue',sans-serif]">
                  {section.label}
                </div>
                <ul>
                  {section.items.map((suggestion) => {
                    const index = rowIndex++;
                    return (
                      <li key={suggestion.id || `${suggestion.name}-${index}`}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={activeIndex === index}
                          onMouseDown={(e) => e.preventDefault()}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => void choose(suggestion)}
                          className={clsx(
                            "flex w-full flex-col gap-0.5 px-5 py-2.5 text-left font-['FK_Grotesk_Neue',sans-serif] transition-colors",
                            activeIndex === index
                              ? 'bg-[var(--color-hero-bg)]'
                              : 'hover:bg-[var(--color-bg-secondary)]',
                          )}
                        >
                          <span
                            className="text-[0.95rem] font-medium"
                            style={{
                              color:
                                activeIndex === index
                                  ? 'var(--color-hero-text)'
                                  : 'var(--color-text-primary)',
                            }}
                          >
                            {suggestion.name}
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              color:
                                activeIndex === index
                                  ? 'var(--color-hero-accent)'
                                  : 'var(--color-text-tertiary)',
                            }}
                          >
                            {suggestion.address}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
