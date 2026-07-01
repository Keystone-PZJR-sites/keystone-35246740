'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { firePixelEvent, log, warn } from 'keystone-design-bootstrap/tracking';

type RouteRule = {
  pattern: RegExp;
  getParams: (match: RegExpMatchArray) => { contentName: string; contentCategory: string };
};

type FbqFn = (method: string, ...args: unknown[]) => void;
type PixelTrackerWindow = Window & {
  fbq?: FbqFn;
  __ks_pageview_fallback_fired?: Record<string, true>;
  __ks_viewcontent_fired?: Record<string, true>;
};

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Checked in order — first match wins.
const CUSTOM_ROUTE_RULES: RouteRule[] = [
  {
    pattern: /^\/industries\/(.+)$/,
    getParams: ([, slug]) => ({ contentName: slugToTitle(slug), contentCategory: 'Industry' }),
  },
  {
    pattern: /^\/industries$/,
    getParams: () => ({ contentName: 'Industries', contentCategory: 'Industries' }),
  },
  {
    pattern: /^\/case-studies\/(.+)$/,
    getParams: ([, slug]) => ({ contentName: slugToTitle(slug), contentCategory: 'Case Study' }),
  },
  {
    pattern: /^\/case-studies$/,
    getParams: () => ({ contentName: 'Case Studies', contentCategory: 'Case Studies' }),
  },
  {
    pattern: /^\/get-in-touch$/,
    getParams: () => ({ contentName: 'Get In Touch', contentCategory: 'Contact' }),
  },
  {
    pattern: /^\/how-it-works$/,
    getParams: () => ({ contentName: 'How It Works', contentCategory: 'Education' }),
  },
  {
    pattern: /^\/pricing$/,
    getParams: () => ({ contentName: 'Pricing', contentCategory: 'Pricing' }),
  },
  {
    pattern: /^\/blog\/(.+)$/,
    getParams: ([, slug]) => ({ contentName: slugToTitle(slug), contentCategory: 'Blog Post' }),
  },
  {
    pattern: /^\/blog$/,
    getParams: () => ({ contentName: 'Blog', contentCategory: 'Blog' }),
  },
  {
    pattern: /^\/about\/team$/,
    getParams: () => ({ contentName: 'Team', contentCategory: 'About' }),
  },
  {
    pattern: /^\/about\/careers$/,
    getParams: () => ({ contentName: 'Careers', contentCategory: 'About' }),
  },
  {
    pattern: /^\/about$/,
    getParams: () => ({ contentName: 'About', contentCategory: 'About' }),
  },
];

function getWindowState(): PixelTrackerWindow | null {
  return typeof window === 'undefined' ? null : (window as PixelTrackerWindow);
}

function getCustomRouteParams(pathname: string): { contentName: string; contentCategory: string } | null {
  for (const rule of CUSTOM_ROUTE_RULES) {
    const match = pathname.match(rule.pattern);
    if (match) {
      return rule.getParams(match);
    }
  }
  return null;
}

async function waitForFbq(maxWaitMs: number, intervalMs: number): Promise<boolean> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < maxWaitMs) {
    const state = getWindowState();
    if (typeof state?.fbq === 'function') return true;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  const state = getWindowState();
  return typeof state?.fbq === 'function';
}

/**
 * Customer-site patch: track ViewContent for custom routes that are not mapped
 * in keystone-design-bootstrap's shared MetaPixelTracker.
 */
export function CustomPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    async function runTracking(): Promise<void> {
      const state = getWindowState();
      if (!state) return;

      const routeKey = `${pathname}${window.location.search}`;
      const customRouteParams = getCustomRouteParams(pathname);
      const fbqReadyImmediately = typeof state.fbq === 'function';

      const fbqReady = fbqReadyImmediately || (await waitForFbq(10_000, 250));
      if (cancelled) return;

      if (!fbqReady) {
        warn('meta-pixel', 'PAGE_TRACKER_FBQ_TIMEOUT', { pathname, routeKey });
        return;
      }

      state.__ks_pageview_fallback_fired = state.__ks_pageview_fallback_fired || {};
      state.__ks_viewcontent_fired = state.__ks_viewcontent_fired || {};

      // Fallback only: bootstrap tries to fire PageView itself. We only fire
      // when fbq was initially missing and became available later.
      if (!fbqReadyImmediately && !state.__ks_pageview_fallback_fired[routeKey]) {
        firePixelEvent('PageView');
        state.__ks_pageview_fallback_fired[routeKey] = true;
        log(
          'meta-pixel',
          'PAGEVIEW_FALLBACK_FIRED',
          { pathname, routeKey },
          { shipToPostHog: true }
        );
      }

      if (customRouteParams && !state.__ks_viewcontent_fired[routeKey]) {
        firePixelEvent('ViewContent', customRouteParams);
        state.__ks_viewcontent_fired[routeKey] = true;
      }
    }

    runTracking();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
