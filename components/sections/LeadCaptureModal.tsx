'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import type { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import gsap from 'gsap';
import { useFormDefinitions } from 'keystone-design-bootstrap/next/contexts/form-definitions';
import type { FormFieldDefinition, FormFieldItem } from 'keystone-design-bootstrap/types';
import { KeystoneMark } from '@/components/elements';
import { lockScroll } from '@/lib/scrollLock';
import { classifyField } from '@/lib/leadFormFields';
import { useLeadSubmit } from '@/lib/useLeadSubmit';

// ─── Phone / country utilities from keystone-design-bootstrap ──────────────
// countries is imported via a types/keystone-design-bootstrap.d.ts declaration
// because the package's wildcard export ("./utils/*") is not resolvable by
// TypeScript's compiler — the bundler resolves it correctly at runtime.
import countries from 'keystone-design-bootstrap/utils/countries';

type Country = typeof countries[0];

/** Strip the country-code prefix from a full phoneMask to get the national format. */
function getNationalMask(country: Country | undefined): string {
  if (!country?.phoneMask) return '';
  const code = country.phoneCode.startsWith('+') ? country.phoneCode : `+${country.phoneCode}`;
  const escaped = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return country.phoneMask.replace(new RegExp(`^\\s*${escaped}[\\s-]*`), '').trim();
}

/** Format a raw digit string into a mask pattern where '#' is one digit. */
function formatDigitsToMask(digits: string, mask: string): string {
  if (digits.length === 0) return '';
  let i = 0;
  let out = '';
  for (const c of mask) {
    if (c === '#') {
      if (i < digits.length) out += digits[i++];
      else break;
    } else if (i < digits.length) {
      out += c;
    }
  }
  return out;
}

// ─── Context ────────────────────────────────────────────────────────────────

interface LeadCaptureContextValue {
  openModal: (triggerElement?: HTMLElement) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

export function useLeadCapture(): LeadCaptureContextValue {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) throw new Error('useLeadCapture must be used within LeadCaptureProvider');
  return ctx;
}

// ─── Provider props ─────────────────────────────────────────────────────────

export interface LeadCaptureProviderProps {
  children: React.ReactNode;
  wordmarkSrc: string;
  markColor: string;
  ctaArrowSrc: string;
  submitLabel: string;
  subheadline: string;
  termsHref: string;
  privacyHref: string;
}

// ─── Internal: Floating label input ─────────────────────────────────────────

interface FloatingLabelInputProps {
  id: string;
  type?: string;
  placeholder: string;
  registerProps: UseFormRegisterReturn;
}

function FloatingLabelInput({
  id,
  type = 'text',
  placeholder,
  registerProps,
}: FloatingLabelInputProps) {
  // Focused / has-value styling is driven entirely from CSS via :focus-within
  // and :placeholder-shown — no React state involved. The space placeholder is
  // what makes :placeholder-shown work as an inverse of hasValue; users never
  // see it because the input is opacity:0 until active.
  return (
    <label htmlFor={id} className="lc-field-wrapper">
      <span className="lc-field-label">{placeholder}</span>
      <input
        id={id}
        {...registerProps}
        type={type}
        placeholder=" "
        className="lc-field-input"
        autoComplete={type === 'email' ? 'email' : 'on'}
      />
    </label>
  );
}

// ─── Internal: Phone input with country code dropdown ──────────────────────

interface PhoneInputProps {
  id: string;
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  caretDownSrc: string;
}

function PhoneInput({ id, placeholder, registerProps, caretDownSrc }: PhoneInputProps) {
  // Focus visual lives in CSS (:focus-within). Country and display value still
  // need React state because they affect the masked rendering and the value
  // dispatched into RHF — those are not derivable from the DOM.
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [displayValue, setDisplayValue] = useState('');

  const { ref, name, onChange: rhfOnChange, onBlur: rhfOnBlur } = registerProps;

  const selectedCountry = countries.find((c) => c.code === selectedCountryCode);
  const nationalMask = getNationalMask(selectedCountry);
  const phoneCode = selectedCountry
    ? selectedCountry.phoneCode.startsWith('+')
      ? selectedCountry.phoneCode
      : `+${selectedCountry.phoneCode}`
    : '+1';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    const formatted = nationalMask ? formatDigitsToMask(digits, nationalMask) : digits;
    setDisplayValue(formatted);
    const fullValue = formatted ? `${phoneCode} ${formatted}` : '';
    rhfOnChange({ target: { name, value: fullValue } });
  };

  const handleCountryChange = (newCode: string) => {
    setSelectedCountryCode(newCode);
    setDisplayValue('');
    rhfOnChange({ target: { name, value: '' } });
  };

  const maskPlaceholder = nationalMask ? nationalMask.replace(/#/g, '0') : '';

  return (
    <div className="lc-phone-wrapper">
      {/* Country code pill — native <select> overlaid invisibly so clicking the pill opens it */}
      <div className="lc-country-dropdown">
        <Image src={caretDownSrc} width={16} height={16} alt="" aria-hidden="true" />
        <span className="lc-country-code">{phoneCode}</span>
        <select
          className="lc-country-select"
          value={selectedCountryCode}
          aria-label="Country code"
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          {countries.map((c) => {
            const code = c.phoneCode.startsWith('+') ? c.phoneCode : `+${c.phoneCode}`;
            return (
              <option key={c.code} value={c.code}>
                {c.name} ({code})
              </option>
            );
          })}
        </select>
      </div>

      {/* Phone number input — plain, no floating label */}
      <label htmlFor={id} className="lc-phone-input-wrapper">
        <input
          id={id}
          ref={ref}
          name={name}
          type="tel"
          value={displayValue}
          className="lc-field-input"
          placeholder={maskPlaceholder || placeholder}
          autoComplete="tel-national"
          onBlur={rhfOnBlur}
          onChange={handlePhoneChange}
        />
      </label>
    </div>
  );
}

// ─── Field classification, identity field lookup, and submit logic all live
// ─── in `lib/leadFormFields.ts` and `lib/useLeadSubmit.ts`.

// ─── Internal: Checkbox field (single consent checkbox) ─────────────────────

interface CheckboxFieldProps {
  field: FormFieldDefinition;
  fieldIndex: number;
  register: UseFormRegister<Record<string, string>>;
  companyName: string;
  termsHref: string;
  privacyHref: string;
}

function CheckboxField({
  field,
  fieldIndex,
  register,
  companyName,
  termsHref,
  privacyHref,
}: CheckboxFieldProps) {
  const inputId = `lc-field-${fieldIndex}-${field.name}`;
  const { ref, name, onChange, onBlur } = register(field.name, {
    required: field.required ?? false,
  });

  // Replace {{company_name}} with the actual company name
  const companyNameClean = companyName.replace(/\*\*/g, '').trim();
  let labelText = companyNameClean
    ? (field.label ?? '').replace(/\{\{company_name\}\}/gi, companyNameClean)
    : (field.label ?? '');

  // Inject ToS / Privacy links for the consent field
  if (field.name === 'tos_privacy_consent' && termsHref && privacyHref) {
    labelText = labelText
      .replace(/\*\*Terms of Service\*\*/gi, `**[Terms of Service](${termsHref})**`)
      .replace(/\*\*Privacy Policy\*\*/gi, `**[Privacy Policy](${privacyHref})**`);
  }

  return (
    <div className="lc-checkbox-row">
      <div className="lc-checkbox-control">
        <input
          id={inputId}
          ref={ref}
          name={name}
          type="checkbox"
          className="lc-checkbox-input"
          onChange={onChange}
          onBlur={onBlur}
          aria-describedby={`${inputId}-label`}
        />
        <div className="lc-checkbox-visual" aria-hidden="true" />
      </div>
      <label
        htmlFor={inputId}
        id={`${inputId}-label`}
        className="lc-checkbox-label"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <span>{children}</span>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="lc-checkbox-link"
              >
                {children}
              </a>
            ),
          }}
        >
          {labelText}
        </ReactMarkdown>
      </label>
    </div>
  );
}

// ─── Internal: Checkbox group field (multiple selectable options) ──────────

interface CheckboxGroupFieldProps {
  field: FormFieldDefinition;
  fieldIndex: number;
  companyName: string;
}

function CheckboxGroupField({ field, fieldIndex, companyName }: CheckboxGroupFieldProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const options = field.options ?? [];
  const companyNameClean = companyName.replace(/\*\*/g, '').trim();
  const legendText = companyNameClean
    ? (field.label ?? '').replace(/\{\{company_name\}\}/gi, companyNameClean)
    : (field.label ?? '');

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <fieldset className="lc-checkbox-group-fieldset">
      {legendText && (
        <legend className="lc-checkbox-group-legend">{legendText}</legend>
      )}
      {/* Hidden input carries the comma-separated selection on submit */}
      <input type="hidden" name={field.name} value={selected.join(',')} />
      <div className="lc-checkbox-group-options">
        {options.map((opt, i) => {
          const optId = `lc-field-${fieldIndex}-${field.name}-${i}`;
          const checked = selected.includes(opt.value);
          return (
            <div key={opt.value} className="lc-checkbox-row">
              <div className="lc-checkbox-control">
                <input
                  id={optId}
                  type="checkbox"
                  className="lc-checkbox-input"
                  checked={checked}
                  onChange={() => toggle(opt.value)}
                />
                <div className="lc-checkbox-visual" aria-hidden="true" />
              </div>
              <label htmlFor={optId} className="lc-checkbox-label">
                {opt.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

// ─── Internal: Render a single form field ──────────────────────────────────

interface FormFieldProps {
  field: FormFieldDefinition;
  fieldIndex: number;
  register: UseFormRegister<Record<string, string>>;
  caretDownSrc: string;
  companyName: string;
  termsHref: string;
  privacyHref: string;
}

function FormField({ field, fieldIndex, register, caretDownSrc, companyName, termsHref, privacyHref }: FormFieldProps) {
  const inputId = `lc-field-${fieldIndex}-${field.name}`;
  const placeholder = field.placeholder || field.label || '';
  const registerProps = register(field.name, { required: field.required ?? false });
  const classification = classifyField(field);

  switch (classification.kind) {
    case 'hidden':
      return (
        <input
          type="hidden"
          value={field.value ?? ''}
          {...register(field.name)}
        />
      );

    case 'checkbox':
      return (
        <CheckboxField
          field={field}
          fieldIndex={fieldIndex}
          register={register}
          companyName={companyName}
          termsHref={termsHref}
          privacyHref={privacyHref}
        />
      );

    case 'checkbox_group':
      return (
        <CheckboxGroupField
          field={field}
          fieldIndex={fieldIndex}
          companyName={companyName}
        />
      );

    case 'textarea':
      return (
        <div className="lc-textarea-wrapper">
          <label htmlFor={inputId} className="sr-only">
            {field.label}
          </label>
          <textarea
            id={inputId}
            className="lc-textarea"
            placeholder={placeholder}
            {...registerProps}
          />
        </div>
      );

    case 'phone':
      return (
        <PhoneInput
          id={inputId}
          placeholder={placeholder}
          registerProps={registerProps}
          caretDownSrc={caretDownSrc}
        />
      );

    case 'email':
    case 'text':
      return (
        <FloatingLabelInput
          id={inputId}
          type={classification.kind === 'email' ? 'email' : 'text'}
          placeholder={placeholder}
          registerProps={registerProps}
        />
      );
  }
}

// ─── Internal: Render a form row (one or more fields side-by-side) ─────────

interface FormRowProps {
  item: FormFieldItem;
  baseIndex: number;
  register: UseFormRegister<Record<string, string>>;
  caretDownSrc: string;
  companyName: string;
  termsHref: string;
  privacyHref: string;
}

function FormRow({ item, baseIndex, register, caretDownSrc, companyName, termsHref, privacyHref }: FormRowProps) {
  if (Array.isArray(item)) {
    return (
      <div className="lc-field-row">
        {item.map((field, i) => (
          <div key={field.name} className="lc-field-row-item">
            <FormField
              field={field}
              fieldIndex={baseIndex + i}
              register={register}
              caretDownSrc={caretDownSrc}
              companyName={companyName}
              termsHref={termsHref}
              privacyHref={privacyHref}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <FormField
      field={item}
      fieldIndex={baseIndex}
      register={register}
      caretDownSrc={caretDownSrc}
      companyName={companyName}
      termsHref={termsHref}
      privacyHref={privacyHref}
    />
  );
}

// ─── Internal: Modal ────────────────────────────────────────────────────────

interface ModalProps {
  closeModal: () => void;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  wordmarkSrc: string;
  markColor: string;
  ctaArrowSrc: string;
  submitLabel: string;
  subheadline: string;
  termsHref: string;
  privacyHref: string;
}

function Modal({
  closeModal,
  overlayRef,
  wordmarkSrc,
  markColor,
  ctaArrowSrc,
  submitLabel,
  subheadline,
  termsHref,
  privacyHref,
}: ModalProps) {
  const { leadFormDefinition } = useFormDefinitions();
  const { register, handleSubmit, reset } = useForm<Record<string, string>>();
  const cardRef = useRef<HTMLDivElement>(null);

  const fields = leadFormDefinition?.fields ?? [];

  const { state: submitState, errorMessage, submit } = useLeadSubmit({
    fields,
    formId: leadFormDefinition?.id,
    onSuccess: reset,
  });

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Move focus into the modal — but to the dialog container, not any field.
  // Focusing First Name (Spec 008's original behaviour) triggered 1Password
  // and similar extensions to surface their autofill dropdown the instant the
  // modal opened. Focusing the card keeps keyboard users inside the modal
  // (Escape works, Tab walks fields in order) without activating an input.
  // See Spec 028 and `docs/rules/rules.md` § Focus management. preventScroll
  // keeps the viewport anchored — focusing inside a freshly-portaled modal
  // could otherwise trigger the browser's "scroll into view" behaviour.
  useLayoutEffect(() => {
    cardRef.current?.focus({ preventScroll: true });
  }, []);

  // Size the overlay to the visual viewport so the soft keyboard can't
  // bury the submit button or the message field on mobile. The overlay is
  // position:fixed and the layout viewport doesn't shrink when the keyboard
  // appears (especially on iOS Safari), so without this, position:fixed +
  // inset:0 covers the area behind the keyboard. visualViewport.height
  // reflects the actual visible area; we mirror it onto the overlay and
  // re-sync on resize (keyboard up/down, device rotation). Fallback to
  // 100dvh in CSS covers the SSR-to-first-paint window and the no-API case.
  useLayoutEffect(() => {
    const vv = window.visualViewport;
    const overlay = overlayRef.current;
    if (!vv || !overlay) return;
    const sync = () => {
      overlay.style.height = `${vv.height}px`;
    };
    sync();
    vv.addEventListener('resize', sync);
    return () => {
      vv.removeEventListener('resize', sync);
      overlay.style.height = '';
    };
  }, [overlayRef]);

  // Auto-close after success
  useEffect(() => {
    if (submitState !== 'success') return;
    const timer = setTimeout(() => {
      closeModal();
    }, 3000);
    return () => clearTimeout(timer);
  }, [submitState, closeModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const companyName = leadFormDefinition?.company_name ?? '';

  return (
    <div
      ref={overlayRef}
      className="lc-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Get in touch with Keystone"
      onClick={handleBackdropClick}
    >
      {/* Fixed backdrop — covers full viewport even when overlay is scrolled */}
      <div className="lc-backdrop" aria-hidden="true" />

      {/* Scrollable content area */}
      <div className="lc-content-area" aria-hidden="false" onClick={handleBackdropClick}>
        {/* Keystone K mark floating above card */}
        <div className="lc-kmark-wrapper" aria-hidden="true">
          <KeystoneMark color={markColor} width={38} height={43} />
        </div>

        {/* Form card. tabIndex={-1} so it can receive programmatic focus on
            modal open without entering the natural Tab order (Spec 028). */}
        <div
          ref={cardRef}
          className="lc-card"
          role="document"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card background SVG (folded top-right corner) */}
          <Image
            src="/lead-capture/lead-capture-card-bg.svg"
            className="lc-card-bg"
            alt=""
            aria-hidden="true"
            width={480}
            height={599}
          />

          {/* Card content */}
          <div className="lc-card-inner">
            {submitState === 'success' ? (
              <div className="lc-success">
                <Image
                  src={wordmarkSrc}
                  alt="keystone"
                  width={154}
                  height={30}
                  className="lc-wordmark"
                />
                <p className="lc-success-message">
                  Thanks for reaching out! Our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(submit)} noValidate>
                {/* Form header: wordmark + subheadline */}
                <div className="lc-form-header">
                  <Image
                    src={wordmarkSrc}
                    alt="keystone"
                    width={154}
                    height={30}
                    className="lc-wordmark"
                  />
                  <p className="lc-subheadline">{subheadline}</p>
                </div>

                {/* Form fields — compute start indices ahead of render */}
                <div className="lc-form-stack">
                  {(() => {
                    let counter = 0;
                    return fields.map((item) => {
                      const startIndex = counter;
                      counter += Array.isArray(item) ? item.length : 1;
                      return (
                        <FormRow
                          key={Array.isArray(item) ? item.map((f) => f.name).join('-') : item.name}
                          item={item}
                          baseIndex={startIndex}
                          register={register}
                          caretDownSrc="/lead-capture/lead-capture-caret-down.svg"
                          companyName={companyName}
                          termsHref={termsHref}
                          privacyHref={privacyHref}
                        />
                      );
                    });
                  })()}

                  {/* Error message */}
                  {submitState === 'error' && errorMessage && (
                    <p className="lc-error-message" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </div>

                {/* Bottom row: Terms/Privacy links + Submit button */}
                <div className="lc-bottom-row">
                  <div className="lc-legal-links">
                    <a
                      href={termsHref}
                      className="lc-legal-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms
                    </a>
                    <a
                      href={privacyHref}
                      className="lc-legal-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="lc-submit-btn"
                    aria-label={submitLabel}
                  >
                    <span>{submitLabel}</span>
                    <Image
                      src={ctaArrowSrc}
                      width={20}
                      height={20}
                      alt=""
                      aria-hidden="true"
                      className="lc-submit-arrow"
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Provider ──────────────────────────────────────────────────────────────

export function LeadCaptureProvider({
  children,
  wordmarkSrc,
  markColor,
  ctaArrowSrc,
  submitLabel,
  subheadline,
  termsHref,
  privacyHref,
}: LeadCaptureProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const openModal = useCallback((triggerElement?: HTMLElement) => {
    if (triggerElement) triggerElementRef.current = triggerElement;
    setIsOpen(true);
    setDisplayModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({ openModal, closeModal, isOpen }),
    [openModal, closeModal, isOpen]
  );

  // Prevent body scroll when modal is open. `lockScroll()` returns the unlock
  // function so cleanup can never accidentally lock when it should unlock.
  // Branches to ScrollSmoother.paused() on the homepage; otherwise pins the
  // body via position:fixed (iOS-Safari-safe). See `lib/scrollLock.ts`.
  useEffect(() => {
    if (!displayModal) return;
    return lockScroll();
  }, [displayModal]);

  // Animate in when modal becomes visible
  useLayoutEffect(() => {
    if (!displayModal || !overlayRef.current) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(overlayRef.current, { opacity: 1 });
    });
    return () => mm.revert();
  }, [displayModal]);

  // Animate out when isOpen flips to false
  useEffect(() => {
    if (isOpen || !displayModal) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setDisplayModal(false);
          triggerElementRef.current?.focus({ preventScroll: true });
          triggerElementRef.current = null;
        },
      });
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      setDisplayModal(false);
      triggerElementRef.current?.focus({ preventScroll: true });
      triggerElementRef.current = null;
    });
    return () => mm.revert();
  }, [isOpen, displayModal]);

  const modal = displayModal ? (
    <Modal
      closeModal={closeModal}
      overlayRef={overlayRef}
      wordmarkSrc={wordmarkSrc}
      markColor={markColor}
      ctaArrowSrc={ctaArrowSrc}
      submitLabel={submitLabel}
      subheadline={subheadline}
      termsHref={termsHref}
      privacyHref={privacyHref}
    />
  ) : null;

  return (
    <LeadCaptureContext.Provider value={contextValue}>
      {children}
      {typeof window !== 'undefined' && displayModal && createPortal(modal, document.body)}
    </LeadCaptureContext.Provider>
  );
}
