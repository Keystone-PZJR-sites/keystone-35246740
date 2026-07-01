'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { firePixelEvent } from 'keystone-design-bootstrap/tracking';

type RouteRule = {
  pattern: RegExp;
  getParams: (match: RegExpMatchArray) => { contentName: string; contentCategory: string };
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

/**
 * Customer-site patch: track ViewContent for custom routes that are not mapped
 * in keystone-design-bootstrap's shared MetaPixelTracker.
 */
export function CustomPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    for (const rule of CUSTOM_ROUTE_RULES) {
      const match = pathname.match(rule.pattern);
      if (match) {
        const { contentName, contentCategory } = rule.getParams(match);
        firePixelEvent('ViewContent', { contentName, contentCategory });
        break;
      }
    }
  }, [pathname]);

  return null;
}
