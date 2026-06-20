import type { ReactNode } from 'react';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

export interface TimelineMilestone {
  /** Stable key. */
  id: string;
  /** Phase label above the headline, e.g. "Today", "In 3 years". */
  phase: string;
  title: ReactNode;
  description: ReactNode;
  /** Optional quieter footnote beneath the copy. */
  footnote?: ReactNode;
}

export interface TimelineProps {
  milestones: TimelineMilestone[];
  /** Landmark label for the ordered list. */
  ariaLabel?: string;
}

/**
 * A "where we're going" narrative: an ordered sequence of milestones on a
 * connecting rail, each a phase label, a headline, supporting copy, and an
 * optional footnote. No media, no numbers — the structural sibling of
 * ProcessSteps for forward-looking timelines. Built from primitives and tokens;
 * no animation. See spec 043.
 */
export function Timeline({ milestones, ariaLabel }: TimelineProps) {
  return (
    <ol className="ks-timeline" aria-label={ariaLabel}>
      {milestones.map((milestone) => (
        <li key={milestone.id} className="ks-timeline__item">
          <div className="ks-timeline__rail" aria-hidden="true">
            <span className="ks-timeline__node" />
          </div>
          <div className="ks-timeline__body">
            <Eyebrow tone="brand">{milestone.phase}</Eyebrow>
            <Heading level={3} size="md" font="body" className="ks-timeline__title">
              {milestone.title}
            </Heading>
            <Text variant="body" tone="tertiary" className="ks-timeline__copy">
              {milestone.description}
            </Text>
            {milestone.footnote ? (
              <Text variant="small" tone="quaternary" className="ks-timeline__footnote">
                {milestone.footnote}
              </Text>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
