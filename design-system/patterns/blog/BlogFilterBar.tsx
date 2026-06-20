'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { SearchLg } from '@untitledui/icons';
import type { BlogPostTag } from 'keystone-design-bootstrap/types';

interface BlogFilterBarProps {
  tags: BlogPostTag[];
  currentQuery?: string;
  currentTag?: string;
}

export function BlogFilterBar({ tags, currentQuery, currentTag }: BlogFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset to page 1 whenever a filter changes
      params.delete('page');
      const qs = params.toString();
      router.push(`/blog${qs ? `?${qs}` : ''}`);
    },
    [router, searchParams],
  );

  const handleTagClick = (slug: string) => {
    updateFilter('tag', currentTag === slug ? null : slug);
  };

  const handleClear = () => {
    router.push('/blog');
  };

  const hasActiveFilter = !!(currentQuery || currentTag);

  return (
    <div className="blog-filter-bar">
      {/* Search — submits as a native form so it works without JS too */}
      <form action="/blog" method="get" className="blog-search-form" role="search">
        {currentTag && <input type="hidden" name="tag" value={currentTag} />}
        <div className="blog-search-input-wrapper">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            name="q"
            defaultValue={currentQuery}
            placeholder="Search articles…"
            className="blog-search-input"
            autoComplete="off"
          />
          <button type="submit" className="blog-search-btn" aria-label="Search">
            <SearchLg className="blog-search-icon" aria-hidden="true" />
          </button>
        </div>
      </form>

      {/* Tag pills */}
      {tags.length > 0 && (
        <div className="blog-tag-filter" role="group" aria-label="Filter by tag">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagClick(tag.slug)}
              className={`blog-filter-tag${currentTag === tag.slug ? ' is-active' : ''}`}
              aria-pressed={currentTag === tag.slug}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {/* Clear filters */}
      {hasActiveFilter && (
        <button type="button" onClick={handleClear} className="blog-clear-btn">
          Clear filters
        </button>
      )}
    </div>
  );
}
