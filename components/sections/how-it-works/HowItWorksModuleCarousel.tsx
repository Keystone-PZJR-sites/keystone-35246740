'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { HowItWorksMediaItem, HowItWorksModuleId } from '@/data/how-it-works';

interface HowItWorksModuleCarouselProps {
  moduleId: HowItWorksModuleId;
  moduleLabel: string;
  items: HowItWorksMediaItem[];
}

export function HowItWorksModuleCarousel({
  moduleId,
  moduleLabel,
  items,
}: HowItWorksModuleCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        setPreviousIndex(current);
        return current + 1 >= items.length ? 0 : current + 1;
      });
    }, 3000);

    return () => window.clearInterval(timer);
  }, [items.length, prefersReducedMotion]);

  useEffect(() => {
    if (previousIndex === null) return;
    const timer = window.setTimeout(() => setPreviousIndex(null), 700);
    return () => window.clearTimeout(timer);
  }, [previousIndex]);

  return (
    <div className="hiw-module-carousel">
      <div className="hiw-module-carousel-focus-shell">
        <div
          className="hiw-module-carousel-viewport"
          role="region"
          aria-label={`${moduleLabel} examples carousel`}
        >
          <div className="hiw-module-carousel-image-shell" data-module-id={moduleId}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const isPrevious = previousIndex === index && previousIndex !== activeIndex;
              if (!isActive && !isPrevious) return null;

              return (
                <Image
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="hiw-module-carousel-image"
                  data-state={isActive ? 'active' : 'previous'}
                  unoptimized
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
