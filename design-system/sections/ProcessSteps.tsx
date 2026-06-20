import type { ReactNode } from 'react';
import clsx from 'clsx';
import { ArrowUpRight } from '@untitledui/icons';
import { Eyebrow } from '@/design-system/primitives/Eyebrow';
import { Heading } from '@/design-system/primitives/Heading';
import { Text } from '@/design-system/primitives/Text';

export interface ProcessStepService {
  label: string;
  href: string;
}

export interface ProcessStepItem {
  /** Stable key. */
  id: string;
  /** Displayed step number (e.g. "01"). Auto-derived from order when omitted. */
  number?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** The visual beside the copy — an image, a mock, or any block. */
  media: ReactNode;
  /** Optional links to the relevant service pages, shown as ghost-arrow chips. */
  services?: ProcessStepService[];
  /** Tint of the soft panel behind the media. Defaults to a cream shade. */
  panel?: 'cream' | 'cream-strong' | 'none';
}

export interface ProcessStepsProps {
  steps: ProcessStepItem[];
  /** Landmark label for the ordered list. */
  ariaLabel?: string;
}

/**
 * A numbered "how it works" narrative: an ordered sequence of steps, each a big
 * numbered node on a connecting rail, a title + copy, optional service-page
 * chips, and a framed media panel. Stacks below 985px (number, copy, then
 * media). Built from primitives and tokens; no animation. See spec 040.
 */
export function ProcessSteps({ steps, ariaLabel }: ProcessStepsProps) {
  return (
    <ol className="ks-process" aria-label={ariaLabel}>
      {steps.map((step, index) => {
        const number = step.number ?? String(index + 1).padStart(2, '0');
        const panel = step.panel ?? 'cream';
        return (
          <li key={step.id} className="ks-process__step">
            <div className="ks-process__rail" aria-hidden="true">
              <span className="ks-process__node">{number}</span>
            </div>

            <div className="ks-process__body">
              {step.eyebrow ? <Eyebrow tone="brand">{step.eyebrow}</Eyebrow> : null}
              <Heading level={3} size="md" font="body" className="ks-process__title">
                {step.title}
              </Heading>
              <Text variant="body" tone="tertiary" className="ks-process__copy">
                {step.description}
              </Text>
              {step.services && step.services.length > 0 ? (
                <ul className="ks-process__services">
                  {step.services.map((service) => (
                    <li key={service.href}>
                      <a className="ks-process__chip" href={service.href}>
                        <span>{service.label}</span>
                        <ArrowUpRight className="ks-process__chip-arrow" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div
              className={clsx(
                'ks-process__media',
                panel !== 'none' && `ks-process__media--panel-${panel}`,
              )}
            >
              {step.media}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
