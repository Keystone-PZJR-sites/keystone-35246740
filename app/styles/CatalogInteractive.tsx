'use client';

import { useState } from 'react';
import { Pill, Button, CloseButton, CtaSecondary } from '@/design-system/primitives';
import { useLeadCapture } from '@/design-system/components';

/** Interactive Pill toggle group — demonstrates the active state. */
export function PillToggleDemo() {
  const options = ['Website', 'Ads', 'Social', 'Sales'];
  const [active, setActive] = useState('Website');
  return (
    <>
      {options.map((option) => (
        <Pill
          key={option}
          tone="outline"
          active={active === option}
          onClick={() => setActive(option)}
        >
          {option}
        </Pill>
      ))}
    </>
  );
}

/** Opens the shared lead-capture modal to dogfood the component. */
export function LeadCaptureTrigger() {
  const { openModal } = useLeadCapture();
  return (
    <Button onClick={(event) => openModal(event.currentTarget as HTMLElement)} withArrow>
      Open lead capture
    </Button>
  );
}

/** Close + cancel controls, which require click handlers. */
export function FormControlsDemo() {
  const noop = () => {};
  return (
    <>
      <CloseButton onClick={noop} />
      <CtaSecondary onClick={noop} />
    </>
  );
}
