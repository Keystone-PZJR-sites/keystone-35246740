import type { ReactNode } from 'react';

export interface PageHeroProps {
  /** Page H1. Rendered in the FK Screamer headline face, accent green. */
  title: ReactNode;
  /** Supporting line beneath the title. */
  subtitle?: ReactNode;
  /** Small uppercase label above the title. */
  eyebrow?: ReactNode;
}

/**
 * The standard inner-page hero: a dark "ink" header that the site
 * nav floats over, reading as one continuous block. Every non-home
 * page opens with this so the brand entrance is identical across
 * the site.
 */
export function PageHero({ title, subtitle, eyebrow }: PageHeroProps) {
  return (
    <header className="inner-page-header">
      <div className="inner-page-header-inner">
        {eyebrow ? <span className="inner-page-eyebrow">{eyebrow}</span> : null}
        <h1 className="inner-page-title">{title}</h1>
        {subtitle ? <p className="inner-page-subtitle">{subtitle}</p> : null}
      </div>
    </header>
  );
}
