import { ContentSection } from '@/design-system/sections/ContentSection';
import { Pill } from '@/design-system/primitives/Pill';
import type { IndustryAudienceSection } from './IndustryPageTemplate';

export interface IndustryAudiencesProps {
  section: IndustryAudienceSection;
}

/**
 * "Who it's for" — a centered block naming the specific kinds of business inside
 * a business type as a wrapped row of quiet rounded tags, so a visitor sees
 * themselves immediately. Content-driven; built from primitives. See spec 053.
 */
export function IndustryAudiences({ section }: IndustryAudiencesProps) {
  return (
    <ContentSection
      eyebrow={section.eyebrow}
      title={section.title}
      description={section.description}
      centered
      ariaLabel="Who it's for"
    >
      <ul className="ks-ind-audiences">
        {section.items.map((item) => (
          <li key={item}>
            <Pill tone="outline" size="md">
              {item}
            </Pill>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}
