'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type {
  EmblaViewportRefType,
  UseEmblaCarouselType,
} from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

/**
 * Shared Embla wrapper for every mobile horizontal carousel on the site.
 *
 * Consumers (MobileValueProps, MobileWorkShowcase) pass their own Embla
 * options object — alignment, containScroll, dragFree, loop — so each
 * carousel keeps its own visual behaviour. The hook owns the cross-cutting
 * concerns that would otherwise be duplicated in every section:
 *
 * 1. Embla initialisation via `useEmblaCarousel`.
 * 2. `prefers-reduced-motion: reduce` ⇒ Embla snap duration of 0 (instant),
 *    so the section requires no per-component reduced-motion plumbing.
 * 3. Active-slide tracking through the Embla `select` event.
 * 4. Idempotent setup/teardown of the `select` listener.
 *
 * The hook owns no markup; callers attach `emblaRef` to their viewport
 * element and render their own slides inside the container.
 *
 * Read the matchMedia value once at hook call time. The whole component is
 * a client component (`'use client'`) and Embla itself only initialises
 * after mount, so SSR never sees a value that needs to match the client.
 */
export function useEmblaWithIndex(options: EmblaOptionsType): {
  emblaRef: EmblaViewportRefType;
  emblaApi: UseEmblaCarouselType[1];
  activeIndex: number;
  scrollTo: (index: number) => void;
} {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    reducedMotion ? { ...options, duration: 0 } : options,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  return { emblaRef, emblaApi, activeIndex, scrollTo };
}
