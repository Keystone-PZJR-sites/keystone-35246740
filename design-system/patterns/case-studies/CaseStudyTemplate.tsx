import { ContentSection } from '@/design-system/sections/ContentSection';
import { CtaBand } from '@/design-system/sections/CtaBand';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyBlocks } from './CaseStudyBlocks';
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
 * pattern and driven by one `CaseStudyContent` object. When the story supplies a
 * `blocks` array it renders the long-form, block-driven layout (TL;DR, prose,
 * charts, callouts, stat bands, before/after, pull quotes, galleries, timelines,
 * tools); otherwise it falls back to the legacy comparison / narrative / quote
 * sections. Closes with an other-stories row and the green CTA band. Mount inside
 * InnerPageShell. See spec 051.
 */
export function CaseStudyTemplate({ content, otherStories = [] }: CaseStudyTemplateProps) {
  const { hero, blocks, comparison, narrative, quote, closing } = content;

  return (
    <div className="case-studies-page" data-theme="custom">
      <main>
        <CaseStudyHero content={hero} />

        {blocks && blocks.length > 0 ? (
          <CaseStudyBlocks blocks={blocks} />
        ) : (
          <>
            {comparison ? <CaseStudyComparison content={comparison} /> : null}
            {narrative ? <CaseStudyNarrative content={narrative} /> : null}
            {quote ? <CaseStudyQuote content={quote} /> : null}
          </>
        )}

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
