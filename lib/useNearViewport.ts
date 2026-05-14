'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when the element referenced by `ref` comes within `rootMargin`
 * of the viewport. Once triggered it stays true and the observer disconnects —
 * this is a one-shot "near enough to start loading" signal.
 *
 * ## Why the 1 500 ms delay?
 * GSAP ScrollSmoother applies CSS transforms to #smooth-content immediately on
 * mount. IntersectionObserver sees transformed positions, not document-flow
 * positions, so every section appears to intersect the viewport simultaneously
 * on first render — firing all below-the-fold video loads at T≈908ms alongside
 * the hero. The delay gives the hero video ~1.5 s of uncontested bandwidth
 * before any other section starts preloading its clips.
 *
 * Users who scroll quickly still see videos load as they approach — the observer
 * fires the moment they scroll within rootMargin of the section.
 *
 * Usage:
 *   const sectionRef = useRef<HTMLElement>(null);
 *   const isNear = useNearViewport(sectionRef, '1000px');
 */
export function useNearViewport(
  ref: React.RefObject<HTMLElement | null>,
  rootMargin = '1000px',
): boolean {
  const [isNear, setIsNear] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el || isNear) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, isNear, ready]);

  return isNear;
}
