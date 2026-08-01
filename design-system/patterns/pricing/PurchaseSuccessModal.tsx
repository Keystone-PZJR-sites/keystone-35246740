'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseButton } from '@/design-system/primitives/CloseButton';
import { lockScroll } from '@/lib/scrollLock';

export interface PurchaseSuccessModalCopy {
  title: string;
  body: string;
  questionsLead: string;
  supportEmail: string;
  closeLabel: string;
}

export interface PurchaseSuccessModalProps {
  copy: PurchaseSuccessModalCopy;
}

/**
 * Post-checkout acknowledgement. Opens on mount and stays open until the
 * visitor explicitly clicks the close control — no Escape, no backdrop dismiss,
 * no auto-close timer.
 */
export function PurchaseSuccessModal({ copy }: PurchaseSuccessModalProps) {
  const titleId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!open) return;
    const unlock = lockScroll();
    const closeButton = cardRef.current?.querySelector<HTMLButtonElement>('button');
    closeButton?.focus();
    return unlock;
  }, [open]);

  if (!open || !portalTarget) return null;

  return createPortal(
    <div
      className="ks-purchase-success"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-theme="custom"
    >
      <div className="ks-purchase-success__backdrop" aria-hidden="true" />
      <div className="ks-purchase-success__card" ref={cardRef}>
        <div className="ks-purchase-success__close">
          <CloseButton
            onClick={() => setOpen(false)}
            ariaLabel={copy.closeLabel}
            className="ks-purchase-success__close-btn"
          />
        </div>
        <h2 id={titleId} className="ks-purchase-success__title">
          {copy.title}
        </h2>
        <p className="ks-purchase-success__body">{copy.body}</p>
        <p className="ks-purchase-success__questions">
          {copy.questionsLead}{' '}
          <a href={`mailto:${copy.supportEmail}`} className="ks-purchase-success__email">
            {copy.supportEmail}
          </a>
          .
        </p>
      </div>
    </div>,
    portalTarget
  );
}
