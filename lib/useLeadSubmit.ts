'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  setPixelUserData,
  firePixelEvent,
  captureEvent,
} from 'keystone-design-bootstrap/tracking';
import type { FormFieldItem } from 'keystone-design-bootstrap/types';
import { findIdentityFieldNames } from './leadFormFields';

export type LeadSubmitState = 'idle' | 'submitting' | 'success' | 'error';

const DEFAULT_ERROR = 'Something went wrong. Please try again.';

interface FormResponse {
  success: boolean;
  error?: string;
  eventId?: string;
}

/** Narrow `unknown` (the JSON.parse return) to the documented response shape.
 *  Every external boundary gets a real validator, not an `as` cast. */
function parseFormResponse(raw: unknown): FormResponse {
  if (!raw || typeof raw !== 'object') {
    return { success: false, error: DEFAULT_ERROR };
  }
  const obj = raw as Record<string, unknown>;
  return {
    success: obj.success === true,
    error:   typeof obj.error === 'string' ? obj.error : undefined,
    eventId: typeof obj.eventId === 'string' ? obj.eventId : undefined,
  };
}

interface UseLeadSubmitArgs {
  /** Items from the form definition; used to find which fields hold email/phone. */
  fields: FormFieldItem[];
  /** Optional form id from the definition; included in the payload when present. */
  formId?: string | number;
  /** Called once after the success state is reached, e.g. to reset the form. */
  onSuccess?: () => void;
}

interface UseLeadSubmitReturn {
  state: LeadSubmitState;
  errorMessage: string;
  submit: (values: Record<string, string>) => Promise<void>;
}

/**
 * Lead-form submission for the lead capture modal.
 *
 * Pulls the email/phone field names from the typed form definition once —
 * no string-sniffing at submit time — POSTs to /api/form, and fires the
 * Meta + PostHog tracking calls. The hook owns the four states
 * (`idle | submitting | success | error`); the consumer renders them.
 */
export function useLeadSubmit({
  fields,
  formId,
  onSuccess,
}: UseLeadSubmitArgs): UseLeadSubmitReturn {
  const [state, setState] = useState<LeadSubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Memoise so `submit`'s identity stays stable across renders unless the
  // form definition itself changes.
  const identity = useMemo(() => findIdentityFieldNames(fields), [fields]);

  const submit = useCallback(
    async (values: Record<string, string>) => {
      setState('submitting');
      setErrorMessage('');

      try {
        const payload: Record<string, string | number> = { formType: 'lead', ...values };
        if (formId !== undefined) payload.form_id = formId;

        const response = await fetch('/api/form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = parseFormResponse(await response.json());

        if (!result.success) {
          setErrorMessage(result.error ?? DEFAULT_ERROR);
          setState('error');
          return;
        }

        // Hash and store identity for Meta advanced matching, then fire Lead.
        // captureEvent is a silent no-op when PostHog is not configured.
        await setPixelUserData({
          email: identity.emailFieldName ? values[identity.emailFieldName] : undefined,
          phone: identity.phoneFieldName ? values[identity.phoneFieldName] : undefined,
        });
        firePixelEvent('Lead', undefined, result.eventId);
        captureEvent('form_submitted', {
          form_type: 'lead',
          ...(result.eventId && { event_id: result.eventId }),
        });

        setState('success');
        onSuccess?.();
      } catch {
        setErrorMessage(DEFAULT_ERROR);
        setState('error');
      }
    },
    [formId, identity.emailFieldName, identity.phoneFieldName, onSuccess],
  );

  return { state, errorMessage, submit };
}
