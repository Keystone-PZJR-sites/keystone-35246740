import type { FormFieldDefinition, FormFieldItem } from 'keystone-design-bootstrap/types';

/**
 * `FormFieldDefinition.type` from the API is a free-form string, so the kind
 * the UI needs to render isn't a 1:1 match with `field.type`. `classifyField`
 * resolves the field down to a closed discriminated union; every render path
 * (and every submit-time consumer) switches on the `kind` and never re-sniffs
 * `field.type` or `field.name`.
 */
export type FieldKind =
  | { kind: 'hidden' }
  | { kind: 'checkbox' }
  | { kind: 'checkbox_group' }
  | { kind: 'textarea' }
  | { kind: 'phone' }
  | { kind: 'email' }
  | { kind: 'text' };

export function classifyField(field: FormFieldDefinition): FieldKind {
  switch (field.type) {
    case 'hidden':         return { kind: 'hidden' };
    case 'checkbox':       return { kind: 'checkbox' };
    case 'checkbox_group': return { kind: 'checkbox_group' };
    case 'textarea':       return { kind: 'textarea' };
    case 'tel':
    case 'phone':          return { kind: 'phone' };
    case 'email':          return { kind: 'email' };
  }

  // Fallback: a small set of conventional field names without an explicit type.
  // Kept narrow on purpose; new fields should arrive with a real `field.type`.
  if (field.name.includes('phone') || field.name.includes('mobile')) {
    return { kind: 'phone' };
  }
  if (field.name === 'message' || field.name === 'description' || field.name === 'note') {
    return { kind: 'textarea' };
  }
  return { kind: 'text' };
}

/** Flatten the `FormFieldItem[]` (which may contain nested arrays for side-by-side rows). */
export function flattenFields(items: FormFieldItem[]): FormFieldDefinition[] {
  return items.flatMap((item) => (Array.isArray(item) ? item : [item]));
}

/**
 * Return the field names that hold the user's email and phone, derived once
 * from the form definition (not by sniffing submitted values at submit time).
 * Used by tracking / pixel matching to pull the right values out of the
 * already-typed submission payload.
 */
export function findIdentityFieldNames(
  items: FormFieldItem[],
): { emailFieldName?: string; phoneFieldName?: string } {
  let emailFieldName: string | undefined;
  let phoneFieldName: string | undefined;

  for (const field of flattenFields(items)) {
    const { kind } = classifyField(field);
    if (kind === 'email' && !emailFieldName) emailFieldName = field.name;
    if (kind === 'phone' && !phoneFieldName) phoneFieldName = field.name;
  }

  return { emailFieldName, phoneFieldName };
}

/**
 * Names of required checkbox fields the lead modal treats as implied consent.
 *
 * The modal has no checkbox UI — consent checkboxes render as `null` and the
 * "By submitting you agree to our Terms & Privacy" copy stands in for them.
 * A required consent checkbox (e.g. `tos_privacy_consent`) is therefore never
 * collected from the DOM, so the submit path must send it as `true` explicitly
 * or the backend rejects the submission with "Field is required".
 */
export function findImpliedConsentFieldNames(items: FormFieldItem[]): string[] {
  return flattenFields(items)
    .filter((field) => classifyField(field).kind === 'checkbox' && field.required)
    .map((field) => field.name);
}
