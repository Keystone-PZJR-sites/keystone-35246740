'use client';

import type { ReactNode } from 'react';
import { Button } from '@/design-system/primitives/Button';
import type { ButtonProps } from '@/design-system/primitives/Button';
import { useGetInTouchCta } from '@/design-system/hooks/useGetInTouchCta';

export interface CtaModalButtonProps {
  /** Button text. Defaults to "Get a free demo". */
  children?: ReactNode;
  variant?: ButtonProps['variant'];
  tone?: ButtonProps['tone'];
  size?: ButtonProps['size'];
  withArrow?: boolean;
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

/**
 * The single CTA that opens the lead-capture ("get a free demo") modal. It owns
 * the modal-trigger logic so call sites just drop in a styled button with
 * whatever title / appearance they need — no href interception. The underlying
 * anchor keeps the /get-in-touch href for no-JS, and on mobile the hook routes
 * to that page instead of opening the desktop modal.
 */
export function CtaModalButton({
  children = 'Get a free demo',
  variant = 'primary',
  tone = 'default',
  size = 'lg',
  withArrow = false,
  fullWidth = false,
  className,
  'aria-label': ariaLabel,
}: CtaModalButtonProps) {
  const { href, onGetInTouchClick } = useGetInTouchCta();
  return (
    <Button
      variant={variant}
      tone={tone}
      size={size}
      href={href}
      withArrow={withArrow}
      fullWidth={fullWidth}
      className={className}
      aria-label={ariaLabel}
      onClick={onGetInTouchClick}
    >
      {children}
    </Button>
  );
}
