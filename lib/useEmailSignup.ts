'use client';

import { useState } from 'react';
import { setPixelUserData, captureEvent } from 'keystone-design-bootstrap/tracking';

export type EmailSignupState = 'idle' | 'submitting' | 'success' | 'error';

interface UseEmailSignupReturn {
  state: EmailSignupState;
  errorMessage: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const DEFAULT_ERROR = 'Something went wrong. Please try again.';

/** Narrow `unknown` (the JSON.parse return) to the shape this endpoint promises.
 *  Every external boundary gets a real validator, not an `as` cast. */
function parseFormResponse(raw: unknown): { success: boolean; error?: string } {
  if (!raw || typeof raw !== 'object') {
    return { success: false, error: DEFAULT_ERROR };
  }
  const obj = raw as Record<string, unknown>;
  return {
    success: obj.success === true,
    error:   typeof obj.error === 'string' ? obj.error : undefined,
  };
}

/**
 * Footer email-signup logic, shared by `OversizedFooter` and `MobileFooter`.
 *
 * Form values are uncontrolled (read out of `FormData` in the submit handler)
 * since both forms have a single `email` field — heavier React Hook Form
 * machinery would be overkill here. The hook handles fetch, response
 * validation, and tracking calls; the consumer only decides how to render
 * the four states.
 */
export function useEmailSignup(): UseEmailSignupReturn {
  const [state, setState] = useState<EmailSignupState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    if (!email) return;

    setState('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'marketing_list_signup', email }),
      });
      const result = parseFormResponse(await res.json());

      if (result.success) {
        await setPixelUserData({ email });
        captureEvent('form_submitted', { form_type: 'marketing_list_signup' });
        setState('success');
        form.reset();
      } else {
        setErrorMessage(result.error ?? DEFAULT_ERROR);
        setState('error');
      }
    } catch {
      setErrorMessage(DEFAULT_ERROR);
      setState('error');
    }
  };

  return { state, errorMessage, handleSubmit };
}
