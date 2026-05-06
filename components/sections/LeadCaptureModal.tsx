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
import { submitLeadFormAction } from 'keystone-design-bootstrap';
import type { FormFieldDefinition, FormFieldItem } from 'keystone-design-bootstrap/types';
import { KeystoneMark } from '@/components/elements';

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

// ============================================================
// Context
// ============================================================

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

// ============================================================
// Provider props
// ============================================================

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

// ============================================================
// Internal: Floating label input
// ============================================================

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
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = isFocused || hasValue;

  // Destructure RHF callbacks so we can call both ours and theirs
  const { ref, name, onChange: rhfOnChange, onBlur: rhfOnBlur } = registerProps;

  return (
    <label htmlFor={id} className={`lc-field-wrapper${isActive ? ' is-active' : ''}${isFocused ? ' is-focused' : ''}`}>
      <span className="lc-field-label">{placeholder}</span>
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        className="lc-field-input"
        autoComplete={type === 'email' ? 'email' : 'on'}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
          rhfOnBlur(e);
        }}
        onChange={(e) => {
          setHasValue(e.target.value.length > 0);
          rhfOnChange(e);
        }}
      />
    </label>
  );
}

// ============================================================
// Internal: Phone input with country code dropdown
// ============================================================

interface PhoneInputProps {
  id: string;
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  caretDownSrc: string;
}

function PhoneInput({ id, placeholder, registerProps, caretDownSrc }: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);
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
      <label htmlFor={id} className={`lc-phone-input-wrapper${isFocused ? ' is-focused' : ''}`}>
        <input
          id={id}
          ref={ref}
          name={name}
          type="tel"
          value={displayValue}
          className="lc-field-input"
          placeholder={maskPlaceholder || placeholder}
          autoComplete="tel-national"
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            rhfOnBlur(e);
          }}
          onChange={handlePhoneChange}
        />
      </label>
    </div>
  );
}

// ============================================================
// Internal: Helpers to identify field types
// ============================================================

function isPhoneField(field: FormFieldDefinition): boolean {
  return (
    field.type === 'tel' ||
    field.type === 'phone' ||
    field.name.includes('phone') ||
    field.name.includes('mobile')
  );
}

function isTextareaField(field: FormFieldDefinition): boolean {
  return (
    field.type === 'textarea' ||
    field.name === 'message' ||
    field.name === 'description' ||
    field.name === 'note'
  );
}

function isHiddenField(field: FormFieldDefinition): boolean {
  return field.type === 'hidden';
}

function isCheckboxField(field: FormFieldDefinition): boolean {
  return field.type === 'checkbox';
}

function isCheckboxGroupField(field: FormFieldDefinition): boolean {
  return field.type === 'checkbox_group';
}

// ============================================================
// Internal: Checkbox field (single consent checkbox)
// ============================================================

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

// ============================================================
// Internal: Checkbox group field (multiple selectable options)
// ============================================================

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

// ============================================================
// Internal: Render a single form field
// ============================================================

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

  if (isHiddenField(field)) {
    return (
      <input
        type="hidden"
        value={field.value ?? ''}
        {...register(field.name)}
      />
    );
  }

  if (isCheckboxField(field)) {
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
  }

  if (isCheckboxGroupField(field)) {
    return (
      <CheckboxGroupField
        field={field}
        fieldIndex={fieldIndex}
        companyName={companyName}
      />
    );
  }

  if (isTextareaField(field)) {
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
  }

  if (isPhoneField(field)) {
    return (
      <PhoneInput
        id={inputId}
        placeholder={placeholder}
        registerProps={registerProps}
        caretDownSrc={caretDownSrc}
      />
    );
  }

  const inputType = field.type === 'email' ? 'email' : 'text';

  return (
    <FloatingLabelInput
      id={inputId}
      type={inputType}
      placeholder={placeholder}
      registerProps={registerProps}
    />
  );
}

// ============================================================
// Internal: Render a form row (one or more fields side-by-side)
// ============================================================

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

// ============================================================
// Internal: Modal
// ============================================================

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

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
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (values: Record<string, string>) => {
    setSubmitState('submitting');
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value != null) formData.append(key, String(value));
    });
    if (leadFormDefinition?.id) {
      formData.append('form_id', String(leadFormDefinition.id));
    }
    try {
      const result = await submitLeadFormAction(formData);
      if (result.success) {
        setSubmitState('success');
        reset();
      } else {
        setSubmitState('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitState('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Focus first input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const firstInput = cardRef.current?.querySelector<HTMLElement>('input, textarea');
      firstInput?.focus();
    }, 80);
    return () => clearTimeout(timer);
  }, []);

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

  const fields = leadFormDefinition?.fields ?? [];
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

        {/* Form card */}
        <div
          ref={cardRef}
          className="lc-card"
          role="document"
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
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

// ============================================================
// Provider
// ============================================================

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (displayModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
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
