import { ContentSection } from '@/design-system/sections/ContentSection';
import { CtaBand } from '@/design-system/sections/CtaBand';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyComparison } from './CaseStudyComparison';
import { CaseStudyNarrative } from './CaseStudyNarrative';
import { CaseStudyQuote } from './CaseStudyQuote';
import { CaseStudyCard } from './CaseStudyCard';
import type { CaseStudyContent, CaseStudyCardContent } from './types';

/** A trimmed reference to another story, for the "other success stories" row. */
export interface CaseStudyOtherStory {
  slug: string;
  content: CaseStudyCardContent;
}

export interface CaseStudyTemplateProps {
  content: CaseStudyContent;
  /** Up to two other published stories shown at the foot of the page. */
  otherStories?: CaseStudyOtherStory[];
}

/**
 * The full body of a case-study detail page, composed from the case-studies
 * pattern and driven by one `CaseStudyContent` object: hero, before/after
 * contrast, narrative, pull quote, an other-stories row, and the green closing
 * band. Mount inside InnerPageShell. See spec 051.
 */
export function CaseStudyTemplate({ content, otherStories = [] }: CaseStudyTemplateProps) {
  const { hero, comparison, narrative, quote, closing } = content;

  return (
    <div className="case-studies-page" data-theme="custom">
      <main>
        <CaseStudyHero content={hero} />
        <CaseStudyComparison content={comparison} />
        <CaseStudyNarrative content={narrative} />
        <CaseStudyQuote content={quote} />

        {otherStories.length > 0 && (
          <ContentSection
            eyebrow="More stories"
            title="Other success stories"
            centered
            ariaLabel="Other success stories"
          >
            <div className="ks-cs-others">
              {otherStories.map((story) => (
                <CaseStudyCard
                  key={story.slug}
                  slug={story.slug}
                  content={story.content}
                  variant="tile"
                />
              ))}
            </div>
          </ContentSection>
        )}

        <CtaBand tone="accent" fullBleed title={closing.title} primary={closing.action} />
      </main>
    </div>
  );
}
