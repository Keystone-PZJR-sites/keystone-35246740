import type { Metadata } from 'next';
import type { TeamMember } from 'keystone-design-bootstrap/types';
import { getTeamMembers } from 'keystone-design-bootstrap/lib/server-api';
import {
  CenteredHero,
  ContentSection,
  TeamShowcase,
  QuoteWall,
  BackerGrid,
  CtaBand,
} from '@/design-system';
import { LEADERSHIP_PAGE } from '@/data';

export const metadata: Metadata = {
  title: LEADERSHIP_PAGE.meta.title,
  description: LEADERSHIP_PAGE.meta.description,
};

export default async function TeamPage() {
  const content = LEADERSHIP_PAGE;
  const teamMembers = (await (getTeamMembers() as Promise<TeamMember[] | null>)) ?? [];

  return (
    <div className="inner-page" data-theme="custom">
      <CenteredHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
      />

      <main>
        {/* Leadership grid — live team API. */}
        {teamMembers.length > 0 ? (
          <ContentSection
            eyebrow={content.team.eyebrow}
            title={content.team.title}
            description={content.team.description}
            ariaLabel="Leadership team"
          >
            <TeamShowcase members={teamMembers} />
          </ContentSection>
        ) : null}

        {/* Quotes from investors — the page's one dark band (sample content). */}
        <ContentSection
          tone="ink"
          eyebrow={content.quotes.eyebrow}
          title={content.quotes.title}
          description={content.quotes.description}
          centered
          ariaLabel="Quotes from investors"
        >
          <QuoteWall quotes={content.quotes.items} ariaLabel="What investors say" />
        </ContentSection>

        {/* Backed by — the real investor gallery. */}
        <ContentSection
          eyebrow={content.backed.eyebrow}
          title={content.backed.title}
          description={content.backed.description}
          ariaLabel="Backed by"
        >
          <BackerGrid backers={content.backed.items} ariaLabel="Our investors" />
        </ContentSection>
      </main>

      <CtaBand
        tone="accent"
        fullBleed
        title={content.closing.title}
        primary={{ label: content.closing.actionLabel, href: content.closing.actionHref }}
      />
    </div>
  );
}
