"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { FormDefinition, FormFieldDefinition, FormFieldItem } from "@keystone-sites/core/types";
import { captureEvent, firePixelEvent, setPixelUserData } from "@keystone-sites/services/tracking";
import { FieldCheckbox, FieldText, FieldTextarea } from "../primitives/field";
import { ButtonFill } from "../primitives/buttons";
import { SITE_LINKS } from "../site-links";
import {
  CONTACT_ERROR_FALLBACK,
  CONTACT_FALLBACK_FIELDS,
  CONTACT_NETWORK_ERROR,
  CONTACT_SUBMIT_LABEL,
  CONTACT_SUBMITTING_LABEL,
  CONTACT_SUCCESS_MESSAGE,
} from "../pages/contact-data";

type Status = "idle" | "submitting" | "success" | "error";

interface ContactFormIslandProps {
  form: FormDefinition | null;
}

/** API consent copy may include markdown emphasis (`**…**`); strip it and link legal phrases. */
function consentLabel(label: string): ReactNode {
  const plain = label.replace(/\*\*/g, "");
  const parts = plain.split(/(Terms of Service|Privacy Policy)/g);
  return parts.map((part, index) => {
    if (part === "Terms of Service") {
      return (
        <a key={index} href={SITE_LINKS.terms}>
          Terms of Service
        </a>
      );
    }
    if (part === "Privacy Policy") {
      return (
        <a key={index} href={SITE_LINKS.privacy}>
          Privacy Policy
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function checkboxLabel(field: FormFieldDefinition): ReactNode {
  const plain = (field.label ?? "").replace(/\*\*/g, "");
  if (field.name === "tos_privacy_consent") return consentLabel(plain);
  return plain;
}

function autoCompleteFor(name: string, type: string): string | undefined {
  switch (name) {
    case "firstName":
      return "given-name";
    case "lastName":
      return "family-name";
    case "email":
      return "email";
    case "phone":
      return "tel";
    default:
      return type === "email" ? "email" : type === "tel" ? "tel" : undefined;
  }
}

function renderField(field: FormFieldDefinition, key: string) {
  const type = (field.type ?? "text").toLowerCase();
  const id = `contact-${field.name}`;

  if (type === "hidden") {
    return <input key={key} type="hidden" name={field.name} value={field.value ?? ""} />;
  }

  if (type === "checkbox") {
    return (
      <FieldCheckbox
        key={key}
        id={id}
        name={field.name}
        label={checkboxLabel(field)}
        required={Boolean(field.required)}
        helpText={field.help_text}
      />
    );
  }

  if (type === "textarea") {
    return (
      <FieldTextarea
        key={key}
        id={id}
        name={field.name}
        label={field.label}
        required={Boolean(field.required)}
        placeholder={field.placeholder ?? undefined}
        helpText={field.help_text}
      />
    );
  }

  const inputType = type === "email" || type === "tel" ? type : "text";
  return (
    <FieldText
      key={key}
      id={id}
      name={field.name}
      type={inputType}
      label={field.label}
      required={Boolean(field.required)}
      placeholder={field.placeholder ?? undefined}
      helpText={field.help_text}
      autoComplete={autoCompleteFor(field.name, inputType)}
    />
  );
}

function renderItems(items: FormFieldItem[]) {
  return items.map((item, index) => {
    if (Array.isArray(item)) {
      return (
        <div key={`row-${index}`} className="contact-form-row">
          {item.map((field, fieldIndex) => renderField(field, `${field.name}-${fieldIndex}`))}
        </div>
      );
    }
    return renderField(item, `${item.name}-${index}`);
  });
}

function fallbackItems(): FormFieldItem[] {
  return CONTACT_FALLBACK_FIELDS;
}

export function ContactFormIsland({ form }: ContactFormIslandProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fields = form?.fields?.length ? form.fields : fallbackItems();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const formElement = event.currentTarget;
    const values: Record<string, string> = {};
    new FormData(formElement).forEach((value, key) => {
      if (typeof value === "string") values[key] = value;
    });

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "lead", ...values }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        message?: string;
        eventId?: string;
      };

      if (result.success) {
        await setPixelUserData({ email: values.email, phone: values.phone });
        firePixelEvent("Lead", undefined, result.eventId);
        captureEvent("form_submitted", {
          form_type: "lead",
          ...(result.eventId ? { event_id: result.eventId } : {}),
        });
        setStatus("success");
        formElement.reset();
        return;
      }

      captureEvent("form_failed", {
        form_type: "lead",
        error: result.error ?? "unknown",
      });
      setErrorMessage(result.error ?? CONTACT_ERROR_FALLBACK);
      setStatus("error");
    } catch {
      captureEvent("form_failed", { form_type: "lead", error: "network" });
      setErrorMessage(CONTACT_NETWORK_ERROR);
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      {renderItems(fields)}

      <div className="contact-form-actions">
        <ButtonFill type="submit" size="lg" chrome="teal" disabled={status === "submitting"}>
          {status === "submitting" ? CONTACT_SUBMITTING_LABEL : CONTACT_SUBMIT_LABEL}
        </ButtonFill>
      </div>

      <div className="contact-form-status" aria-live="polite" role="status">
        {status === "success" ? CONTACT_SUCCESS_MESSAGE : null}
      </div>
      {status === "error" && errorMessage ? (
        <p className="contact-form-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
