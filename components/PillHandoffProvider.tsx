'use client';

import { createContext, useContext, useMemo, useRef } from 'react';

/**
 * EveryChannel and ProductScreens animate pills as if they fly between two
 * sections. EveryChannel captures the viewport rect of each labelled pill at
 * its Complete state; ProductScreens reads those rects at the start of its
 * own entrance to position the matching pills as if they had drifted in from
 * the previous section.
 *
 * The handoff is imperative — neither side renders from these rects, both
 * sides write/read once during animation setup. We still surface the store
 * through React context (instead of a module-level `let`) so the dependency
 * is visible on the component tree, hot-reload doesn't leak state across
 * unrelated trees, and tests can construct a fresh store per render.
 */

interface PillHandoffApi {
  setDesktopRects: (map: Map<string, DOMRect>) => void;
  getDesktopRects: () => Map<string, DOMRect>;
  setMobileRects:  (map: Map<string, DOMRect>) => void;
  getMobileRects:  () => Map<string, DOMRect>;
}

const PillHandoffContext = createContext<PillHandoffApi | null>(null);

export function PillHandoffProvider({ children }: { children: React.ReactNode }) {
  // Refs (not state): mutating these does NOT trigger a render — animation
  // code reads the current values directly when it needs them.
  const desktopRef = useRef<Map<string, DOMRect>>(new Map());
  const mobileRef  = useRef<Map<string, DOMRect>>(new Map());

  // Memoised so consumers can list the api in their dependency arrays without
  // triggering re-runs every render.
  const api = useMemo<PillHandoffApi>(() => ({
    setDesktopRects: (map) => { desktopRef.current = map; },
    getDesktopRects: () => desktopRef.current,
    setMobileRects:  (map) => { mobileRef.current = map; },
    getMobileRects:  () => mobileRef.current,
  }), []);

  return (
    <PillHandoffContext.Provider value={api}>
      {children}
    </PillHandoffContext.Provider>
  );
}

export function usePillHandoff(): PillHandoffApi {
  const api = useContext(PillHandoffContext);
  if (!api) {
    throw new Error('usePillHandoff requires <PillHandoffProvider> in the tree');
  }
  return api;
}
