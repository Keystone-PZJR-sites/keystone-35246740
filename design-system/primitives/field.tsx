/** Labeled text, textarea, and checkbox field primitives. */

import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

interface FieldShellProps {
  id: string;
  label: ReactNode;
  required?: boolean;
  helpText?: string | null;
  children: ReactNode;
}

function FieldShell({ id, label, required, helpText, children }: FieldShellProps) {
  const helpId = helpText ? `${id}-help` : undefined;
  return (
    <div className="ks-field">
      <label className="ks-field-label" htmlFor={id}>
        <span>{label}</span>
        {required ? <span className="ks-field-req" aria-hidden="true">*</span> : null}
      </label>
      {children}
      {helpText ? (
        <p className="ks-field-help" id={helpId}>
          {helpText}
        </p>
      ) : null}
    </div>
  );
}

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  id: string;
  label: ReactNode;
  helpText?: string | null;
};

export function FieldText({ id, label, helpText, required, ...input }: TextInputProps) {
  const helpId = helpText ? `${id}-help` : undefined;
  return (
    <FieldShell id={id} label={label} required={required} helpText={helpText}>
      <div className="ks-field-control">
        <input id={id} required={required} aria-describedby={helpId} {...input} />
      </div>
    </FieldShell>
  );
}

type FieldTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> & {
  id: string;
  label: ReactNode;
  helpText?: string | null;
};

export function FieldTextarea({ id, label, helpText, required, rows = 5, ...input }: FieldTextareaProps) {
  const helpId = helpText ? `${id}-help` : undefined;
  return (
    <FieldShell id={id} label={label} required={required} helpText={helpText}>
      <div className="ks-field-control" data-kind="textarea">
        <textarea id={id} required={required} rows={rows} aria-describedby={helpId} {...input} />
      </div>
    </FieldShell>
  );
}

interface FieldCheckboxProps {
  id: string;
  name: string;
  label: ReactNode;
  required?: boolean;
  helpText?: string | null;
  value?: string;
}

export function FieldCheckbox({
  id,
  name,
  label,
  required,
  helpText,
  value = "on",
}: FieldCheckboxProps) {
  const helpId = helpText ? `${id}-help` : undefined;
  const labelId = `${id}-label`;
  return (
    <div className="ks-field ks-field-check">
      <div className="ks-field-check-row">
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          required={required}
          aria-describedby={[labelId, helpId].filter(Boolean).join(" ") || undefined}
        />
        <label id={labelId} htmlFor={id} className="ks-field-check-label">
          {label}
          {required ? <span className="ks-field-req" aria-hidden="true">*</span> : null}
        </label>
      </div>
      {helpText ? (
        <p className="ks-field-help" id={helpId}>
          {helpText}
        </p>
      ) : null}
    </div>
  );
}
