'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when the element referenced by `ref` comes within `rootMargin`
 * of the viewport. Once triggered it stays true and the observer disconnects —
 * this is a one-shot "near enough to start loading" signal.
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

  useEffect(() => {
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
  }, [ref, rootMargin, isNear]);

  return isNear;
}
