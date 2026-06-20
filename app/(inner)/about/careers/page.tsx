import type { Metadata } from 'next';
import type { JobPosting, TeamMember } from 'keystone-design-bootstrap/types';
import { getJobPostings, getTeamMembers } from 'keystone-design-bootstrap/lib/server-api';
import {
  SplitHero,
  ContentSection,
  TeamShowcase,
  QuoteWall,
  FeatureGrid,
  BackerGrid,
  JobList,
  CtaBand,
} from '@/design-system';
import { TeamCollage } from '@/design-system/patterns/careers';
import { CAREERS_PAGE, CAREERS_ROLES_ANCHOR } from '@/data';

export const metadata: Metadata = {
  title: CAREERS_PAGE.meta.title,
  description: CAREERS_PAGE.meta.description,
};

export default async function CareersPage() {
  const content = CAREERS_PAGE;
  const [jobs, teamMembers] = await Promise.all([
    getJobPostings() as Promise<JobPosting[] | null>,
    getTeamMembers() as Promise<TeamMember[] | null>,
  ]);

  return (
    <div className="inner-page" data-theme="custom">
      <SplitHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        primary={content.hero.primary}
        secondary={content.hero.secondary}
        media={<TeamCollage tiles={content.collage} />}
      />

      <main>
        {teamMembers && teamMembers.length > 0 ? (
          <ContentSection
            eyebrow={content.team.eyebrow}
            title={content.team.title}
            description={content.team.description}
            ariaLabel="Leadership team"
          >
            <TeamShowcase members={teamMembers} />
          </ContentSection>
        ) : null}

        {/* Life at Keystone — a culture quote wall (sample content). */}
        <ContentSection
          eyebrow={content.stories.eyebrow}
          title={content.stories.title}
          description={content.stories.description}
          centered
          ariaLabel="Life at Keystone"
        >
          <QuoteWall quotes={content.stories.items} ariaLabel="What our team says" />
        </ContentSection>

        {/* What we value in every hire. */}
        <ContentSection
          eyebrow={content.values.eyebrow}
          title={content.values.title}
          description={content.values.description}
          centered
          ariaLabel="Our values"
        >
          <FeatureGrid items={content.values.items} />
        </ContentSection>

        {/* Mid-page values call to action (inset ink panel). */}
        <CtaBand
          eyebrow={content.valuesBand.eyebrow}
          title={content.valuesBand.title}
          description={content.valuesBand.description}
          primary={{ label: content.valuesBand.actionLabel, href: content.valuesBand.actionHref }}
        />

        {/* Backed by — an "in good company" proof block (sample content). */}
        <ContentSection
          eyebrow={content.backers.eyebrow}
          title={content.backers.title}
          description={content.backers.description}
          centered
          ariaLabel="Backed by"
        >
          <BackerGrid backers={content.backers.items} ariaLabel="Our backers" />
        </ContentSection>

        {/* Open roles — the hero CTA's jump target. */}
        <ContentSection
          id={CAREERS_ROLES_ANCHOR}
          eyebrow={content.roles.eyebrow}
          title={content.roles.title}
          description={content.roles.description}
          ariaLabel="Open positions"
        >
          <JobList jobs={jobs ?? []} />
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
