'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LeadCaptureStandalone, LEAD_CAPTURE_COPY } from '@/design-system';
import type { LeadCaptureCloseReason } from '@/design-system';

export default function GetInTouchPage() {
  const router = useRouter();

  const handleClose = useCallback((reason?: LeadCaptureCloseReason) => {
    if (reason === 'success') {
      router.replace('/?lc=success');
      return;
    }
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push('/');
  }, [router]);

  return (
    <LeadCaptureStandalone {...LEAD_CAPTURE_COPY} onClose={handleClose} />
  );
}
