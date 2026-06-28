import { ContentSection } from '@/design-system/sections/ContentSection';
import { CaseStudyTldr } from './CaseStudyTldr';
import { CaseStudyProseSection } from './CaseStudyProseSection';
import { CaseStudyCallout } from './CaseStudyCallout';
import { CaseStudyChart } from './CaseStudyChart';
import { CaseStudyStatBand } from './CaseStudyStatBand';
import { CaseStudyComparison } from './CaseStudyComparison';
import { CaseStudyQuote } from './CaseStudyQuote';
import { CaseStudyGallery } from './CaseStudyGallery';
import { CaseStudyTimeline } from './CaseStudyTimeline';
import { CaseStudyTools } from './CaseStudyTools';
import type { CaseStudyBlock } from './types';

export interface CaseStudyBlocksProps {
  blocks: CaseStudyBlock[];
}

/**
 * Renders an authored long-form case study: each typed block in the `blocks`
 * array maps to its section component, in order. This is the body of the detail
 * page beneath the hero.
 */
export function CaseStudyBlocks({ blocks }: CaseStudyBlocksProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case 'tldr':
            return <CaseStudyTldr key={key} block={block} />;
          case 'prose':
            return <CaseStudyProseSection key={key} block={block} />;
          case 'callout':
            return (
              <ContentSection key={key} ariaLabel="Highlight" className="ks-cs-callout-section">
                <CaseStudyCallout {...block} />
              </ContentSection>
            );
          case 'chart':
            return <CaseStudyChart key={key} block={block} />;
          case 'stat-band':
            return <CaseStudyStatBand key={key} block={block} />;
          case 'comparison':
            return <CaseStudyComparison key={key} content={block} />;
          case 'quote':
            return <CaseStudyQuote key={key} content={block} />;
          case 'gallery':
            return <CaseStudyGallery key={key} block={block} />;
          case 'timeline':
            return <CaseStudyTimeline key={key} block={block} />;
          case 'tools':
            return <CaseStudyTools key={key} block={block} />;
          default: {
            // Exhaustiveness: a new block type must be handled above, or this
            // line fails to compile (block is no longer `never` here).
            const exhaustive: never = block;
            return exhaustive;
          }
        }
      })}
    </>
  );
}
