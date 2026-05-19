'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LeadCaptureStandalone } from '@/components/sections';
import type { LeadCaptureCloseReason } from '@/components/sections';

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
    <LeadCaptureStandalone
      markColor="#6ECC8B"
      ctaArrowSrc="/lead-capture/lead-capture-cta-arrow.svg"
      submitLabel="Get in touch"
      subheadline="The modern sales and marketing team for local businesses. Reach out below to connect with our team."
      termsHref="/terms-of-service"
      privacyHref="/privacy-policy"
      onClose={handleClose}
    />
  );
}
