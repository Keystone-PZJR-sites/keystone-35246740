import type { JobPosting } from 'keystone-design-bootstrap/types';
import { Card } from '@/design-system/primitives/Card';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';
import { Pill } from '@/design-system/primitives/Pill';

export interface JobListProps {
  jobs: JobPosting[];
}

/**
 * Typed open-roles list. Active postings render as compact, display-only rows —
 * title and a tag or two on the left, location on the right.
 */
export function JobList({ jobs }: JobListProps) {
  const active = jobs.filter((j) => j.status === 'active');

  if (active.length === 0) {
    return (
      <Card tone="cream" className="ks-feature-card">
        <Heading level={3} size="sm" font="body" tone="primary">
          No open roles right now
        </Heading>
        <Text variant="body" tone="secondary">
          We&rsquo;re always glad to meet great people — reach out and introduce yourself.
        </Text>
      </Card>
    );
  }

  return (
    <ul className="ks-job-list">
      {active.map((job) => (
        <li key={job.id}>
          <Card tone="cream" className="ks-job-row">
            <div className="ks-job-row__main">
              <Heading
                level={3}
                size="sm"
                font="body"
                tone="primary"
                className="ks-job-row__title"
              >
                {job.title}
              </Heading>
              <div className="ks-tag-row">
                <Pill tone="cream" size="sm">
                  {job.employment_type}
                </Pill>
                {job.remote_ok ? (
                  <Pill tone="accent" size="sm">
                    Remote OK
                  </Pill>
                ) : null}
              </div>
            </div>
            <div className="ks-job-row__meta">
              <Text variant="small" tone="tertiary" as="span">
                {job.location}
              </Text>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
