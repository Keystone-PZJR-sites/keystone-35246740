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
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import type { FieldErrors, RegisterOptions, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import gsap from 'gsap';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useFormDefinitions } from 'keystone-design-bootstrap/next/contexts/form-definitions';
import type { FormFieldDefinition, FormFieldItem } from 'keystone-design-bootstrap/types';
import { KeystoneMark, KeystoneWordmark } from '@/design-system/primitives';
import { lockScroll } from '@/lib/scrollLock';
import { classifyField } from '@/lib/leadFormFields';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import {
  CloseButton,
  CtaDefault,
  CtaSecondary,
  MobileNumberInput,
  Textfield,
  TextInput,
} from '@/design-system/primitives';

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

export interface LeadCaptureProviderProps {
  children: ReactNode;
  wordmarkColor: string;
  markColor: string;
  ctaArrowSrc: string;
  submitLabel: string;
  subheadline: string;
  termsHref: string;
  privacyHref: string;
}

export type LeadCaptureCloseReason = 'dismiss' | 'success';

function fieldError(errors: FieldErrors<Record<string, string>>, fieldName: string): string | undefined {
  const raw = errors[fieldName]?.message;
  if (!raw) return undefined;
  return String(raw);
}

interface FormFieldProps {
  field: FormFieldDefinition;
  fieldIndex: number;
  register: UseFormRegister<Record<string, string>>;
  errors: FieldErrors<Record<string, string>>;
}

function FormField({
  field,
  fieldIndex,
  register,
  errors,
}: FormFieldProps) {
  const inputId = `lc-field-${fieldIndex}-${field.name}`;
  const placeholder = field.placeholder || field.label || '';
  const classification = classifyField(field);
  const messageLabel = field.label || placeholder || 'This field';
  const requiredMessage = `${messageLabel} is required`;
  const errorEntry = errors[field.name];
  const error = errorEntry ? (fieldError(errors, field.name) ?? requiredMessage) : undefined;

  switch (classification.kind) {
    case 'hidden':
      return <input type="hidden" value={field.value ?? ''} {...register(field.name)} />;

    case 'checkbox':
      return null;

    case 'checkbox_group':
      return null;

    case 'textarea': {
      const registerOptions: RegisterOptions<Record<string, string>, string> = {
        required: requiredMessage,
      };
      const registerProps = register(field.name, registerOptions);
      return (
        <Textfield
          id={inputId}
          value={placeholder}
          registerProps={registerProps as UseFormRegisterReturn}
          error={Boolean(error)}
          errorMessage={error}
          state="default"
        />
      );
    }

    case 'phone': {
      const phoneLabel = 'MOBILE PHONE';
      const registerOptions: RegisterOptions<Record<string, string>, string> = {
        required: requiredMessage,
      };
      const registerProps = register(field.name, registerOptions);
      return (
        <MobileNumberInput
          id={inputId}
          registerProps={registerProps as UseFormRegisterReturn}
          error={Boolean(error)}
          errorMessage={error}
          label={phoneLabel || 'MOBILE PHONE'}
          state="default"
        />
      );
    }

    case 'email':
    case 'text': {
      const registerOptions: RegisterOptions<Record<string, string>, string> = {
        required: requiredMessage,
      };
      if (classification.kind === 'email') {
        registerOptions.pattern = {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email address.',
        };
      }
      const registerProps = register(field.name, registerOptions);
      return (
        <TextInput
          id={inputId}
          type={classification.kind === 'email' ? 'email' : 'text'}
          registerProps={registerProps as UseFormRegisterReturn}
          error={Boolean(error)}
          errorMessage={error}
          label={classification.kind === 'email' ? 'EMAIL' : placeholder}
          property1="default"
        />
      );
    }
  }
}

interface FormRowProps {
  item: FormFieldItem;
  baseIndex: number;
  register: UseFormRegister<Record<string, string>>;
  errors: FieldErrors<Record<string, string>>;
}

function FormRow({
  item,
  baseIndex,
  register,
  errors,
}: FormRowProps) {
  if (Array.isArray(item)) {
    const visibleFields = item.filter((field) => {
      const kind = classifyField(field).kind;
      return kind !== 'checkbox' && kind !== 'checkbox_group';
    });
    if (visibleFields.length === 0) return null;
    return (
      <div className="lc-field-row lc-reveal-row">
        {visibleFields.map((field, i) => (
          <div key={field.name} className="lc-field-row-item">
            <FormField
              field={field}
              fieldIndex={baseIndex + i}
              register={register}
              errors={errors}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="lc-reveal-row">
      <FormField
        field={item}
        fieldIndex={baseIndex}
        register={register}
        errors={errors}
      />
    </div>
  );
}

interface ModalProps {
  closeModal: (reason?: LeadCaptureCloseReason) => void;
  overlayRef: RefObject<HTMLDivElement | null>;
  markColor: string;
  ctaArrowSrc: string;
  submitLabel: string;
  subheadline: string;
  termsHref: string;
  privacyHref: string;
  mode?: 'modal' | 'standalone';
}

function Modal({
  closeModal,
  overlayRef,
  markColor,
  ctaArrowSrc,
  submitLabel,
  subheadline,
  termsHref,
  privacyHref,
  mode = 'modal',
}: ModalProps) {
  void subheadline;
  const isStandalone = mode === 'standalone';

  const { leadFormDefinition } = useFormDefinitions();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Record<string, string>>();
  const cardRef = useRef<HTMLDivElement>(null);
  const formShellRef = useRef<HTMLDivElement>(null);
  const successShellRef = useRef<HTMLDivElement>(null);
  const subheadlineDesktopRef = useRef<HTMLParagraphElement>(null);
  const subheadlineMobileRef = useRef<HTMLParagraphElement>(null);
  const formTitleRef = useRef<HTMLHeadingElement>(null);
  const [showSuccessContent, setShowSuccessContent] = useState(false);
  const isStandaloneClosingRef = useRef(false);

  const fields = leadFormDefinition?.fields ?? [];
  const { state: submitState, errorMessage, submit } = useLeadSubmit({
    fields,
    formId: leadFormDefinition?.id,
    onSuccess: reset,
  });
  const isProcessing = submitState === 'submitting' || submitState === 'success';

  const requestClose = useCallback((reason: LeadCaptureCloseReason = 'dismiss') => {
    if (!isStandalone || typeof window === 'undefined' || window.innerWidth >= 640) {
      closeModal(reason);
      return;
    }
    if (reason === 'success') {
      closeModal('success');
      return;
    }
    if (isStandaloneClosingRef.current) return;
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card) {
      closeModal(reason);
      return;
    }

    isStandaloneClosingRef.current = true;
    gsap
      .timeline({
        onComplete: () => {
          closeModal(reason);
        },
      })
      .to(card, { y: 36, duration: 0.24, ease: 'power3.in' }, 0)
      .to(overlay, { opacity: 0, duration: 0.2, ease: 'power1.in' }, 0);
  }, [closeModal, isStandalone, overlayRef]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [requestClose]);

  useLayoutEffect(() => {
    if (window.innerWidth < 640) return;
    cardRef.current?.focus({ preventScroll: true });
  }, [overlayRef]);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card) return;
    const vv = window.visualViewport;
    let hasFocusedEditable = false;

    const isEditable = (element: Element | null): element is HTMLElement =>
      Boolean(
        element instanceof HTMLElement &&
          element.matches('input, textarea, select, [contenteditable=""], [contenteditable="true"]')
      );

    const applyKeyboardPadding = () => {
      if (window.innerWidth >= 640 || !hasFocusedEditable) {
        card.style.setProperty('--lc-keyboard-pad', '0px');
        overlay?.style.setProperty('--lc-keyboard-pad', '0px');
        return;
      }
      const keyboardHeight = vv ? Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)) : 0;
      const value = `${keyboardHeight}px`;
      card.style.setProperty('--lc-keyboard-pad', value);
      overlay?.style.setProperty('--lc-keyboard-pad', value);
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!isEditable(target)) return;
      hasFocusedEditable = true;
      applyKeyboardPadding();
      window.setTimeout(() => {
        target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }, 120);
    };

    const onFocusOut = () => {
      window.setTimeout(() => {
        const active = document.activeElement;
        hasFocusedEditable = isEditable(active) && card.contains(active);
        applyKeyboardPadding();
      }, 50);
    };

    card.addEventListener('focusin', onFocusIn);
    card.addEventListener('focusout', onFocusOut);
    vv?.addEventListener('resize', applyKeyboardPadding);
    window.addEventListener('orientationchange', applyKeyboardPadding);

    return () => {
      card.removeEventListener('focusin', onFocusIn);
      card.removeEventListener('focusout', onFocusOut);
      vv?.removeEventListener('resize', applyKeyboardPadding);
      window.removeEventListener('orientationchange', applyKeyboardPadding);
      card.style.setProperty('--lc-keyboard-pad', '0px');
      overlay?.style.setProperty('--lc-keyboard-pad', '0px');
    };
  }, [overlayRef]);

  useLayoutEffect(() => {
    if (!isStandalone || typeof window === 'undefined' || window.innerWidth >= 640) return;
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card) return;
    isStandaloneClosingRef.current = false;
    gsap.set(overlay, { opacity: 0 });
    gsap.set(card, { y: 40 });
    const tl = gsap
      .timeline()
      .to(overlay, { opacity: 1, duration: 0.2, ease: 'power1.out' }, 0)
      .to(card, { y: 0, duration: 0.28, ease: 'power3.out' }, 0);
    return () => {
      tl.kill();
    };
  }, [isStandalone, overlayRef]);

  useEffect(() => {
    if (submitState !== 'success') return;
    if (isStandalone && typeof window !== 'undefined' && window.innerWidth < 640) {
      requestClose('success');
      return;
    }
    const timer = setTimeout(() => {
      requestClose('success');
    }, 3500);
    return () => clearTimeout(timer);
  }, [submitState, requestClose, isStandalone]);

  useLayoutEffect(() => {
    if (submitState !== 'success' || !cardRef.current || !formShellRef.current) return;
    const card = cardRef.current;
    const formShell = formShellRef.current;
    const subheadlineDesktop = subheadlineDesktopRef.current;
    const subheadlineMobile = subheadlineMobileRef.current;
    const formTitle = formTitleRef.current;
    const successHeight = window.innerWidth < 640 ? 122 : 226;
    const cardRect = card.getBoundingClientRect();
    const collapseDelta = Math.max(0, cardRect.height - successHeight);
    card.scrollTop = 0;
    const fadeTargets = [formShell, subheadlineDesktop, subheadlineMobile, formTitle].filter(
      Boolean
    ) as HTMLElement[];

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline();
      tl.to(fadeTargets, { opacity: 0, y: -6, duration: 0.2, ease: 'power1.inOut' }, 0);
      tl.call(() => setShowSuccessContent(true), [], 0.2);
      tl.to(
        card,
        {
          height: successHeight,
          y: collapseDelta,
          duration: 0.36,
          ease: 'power2.in',
        },
        0.2
      );
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      setShowSuccessContent(true);
    });
    return () => mm.revert();
  }, [submitState]);

  useLayoutEffect(() => {
    if (!showSuccessContent || !successShellRef.current) return;
    const successShell = successShellRef.current;
    gsap.fromTo(
      successShell,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power1.inOut' }
    );
  }, [showSuccessContent]);

  const handleBackdropClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (isStandalone) return;
    if (e.target === e.currentTarget) requestClose();
  };

  return (
    <div
      ref={overlayRef}
      className={clsx('lc-overlay', isStandalone && 'lc-overlay--standalone')}
      role="dialog"
      aria-modal="true"
      aria-label="Get in touch with Keystone"
      onClick={isStandalone ? undefined : handleBackdropClick}
    >
      {!isStandalone && <div className="lc-backdrop" aria-hidden="true" />}
      <div className="lc-content-area" onClick={isStandalone ? undefined : handleBackdropClick}>
        {isStandalone && (
          <button type="button" className="lc-standalone-nav" onClick={() => requestClose()}>
            {/* Near-white wordmark on the standalone modal's dark surface. No
                palette role names this exact off-white (it is whiter than the
                cream hero-text token), so the literal stays — see "Hex values
                are tokens" in docs/rules/rules.md. */}
            <KeystoneWordmark color="#F8F7F2" width={104} height={20} className="lc-standalone-nav-wordmark" />
          </button>
        )}
        <div
          ref={cardRef}
          className={clsx(
            'lc-card',
            submitState === 'success' && 'lc-card--success',
            isStandalone && 'lc-card--standalone'
          )}
          role="document"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="lc-card-inner">
            <div className="lc-header-row lc-reveal-row">
              <KeystoneMark color={markColor} width={31} height={34} />
              {!showSuccessContent && (
                <p ref={subheadlineMobileRef} className="lc-subheadline lc-subheadline-mobile">
                  <span>Keystone is the </span>
                  <span className="lc-subheadline-emphasis">modern sales and marketing team</span>
                  <span> for local businesses.</span>
                </p>
              )}
              <CloseButton className="lc-desktop-close" onClick={requestClose} />
            </div>

            {!showSuccessContent && (
              <>
                <p ref={subheadlineDesktopRef} className="lc-subheadline lc-subheadline-desktop lc-reveal-row">
                  <span>Keystone is the </span>
                  <span className="lc-subheadline-emphasis">modern sales and marketing team</span>
                  <span> for local businesses.</span>
                </p>
                <h2 ref={formTitleRef} className="lc-form-title lc-reveal-row">
                  TELL US ABOUT <span>YOUR BUSINESS</span>
                </h2>
              </>
            )}

            {!showSuccessContent && (
              <div ref={formShellRef} className="lc-form-shell">
                <form onSubmit={handleSubmit(submit)} noValidate>
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
                            errors={errors}
                          />
                        );
                      });
                    })()}
                    {submitState === 'error' && errorMessage && (
                      <p className="lc-error-message" role="alert">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <div className={clsx('lc-bottom-row lc-reveal-row', isProcessing && 'lc-bottom-row--submitting')}>
                    <p className="lc-terms-copy">
                      By submitting you agree to our{' '}
                      <a href={termsHref} target="_blank" rel="noopener noreferrer">
                        Terms
                      </a>{' '}
                      &{' '}
                      <a href={privacyHref} target="_blank" rel="noopener noreferrer">
                        Privacy
                      </a>
                      .
                    </p>
                    <div className={clsx('lc-cta-row', isProcessing && 'lc-cta-row--submitting')}>
                      <CtaSecondary
                        onClick={requestClose}
                        className={clsx('lc-cta-secondary-desktop', isProcessing && 'lc-cta-secondary--submitting')}
                      />
                      <CtaSecondary
                        onClick={requestClose}
                        className={clsx('lc-cta-secondary-mobile', isProcessing && 'lc-cta-secondary--submitting')}
                        mobileIconOnly
                      />
                      <CtaDefault
                        type="submit"
                        disabled={isProcessing}
                        isLoading={isProcessing}
                        label={submitLabel}
                        arrowSrc={ctaArrowSrc}
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {showSuccessContent && (
              <div ref={successShellRef} className="lc-success-shell">
                <h3 className="lc-success-title">
                  THANK YOU <span>WE&apos;LL BE IN TOUCH</span>
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface LeadCaptureStandaloneProps {
  markColor: string;
  ctaArrowSrc: string;
  submitLabel: string;
  subheadline: string;
  termsHref: string;
  privacyHref: string;
  onClose: (reason?: LeadCaptureCloseReason) => void;
}

export function LeadCaptureStandalone({
  markColor,
  ctaArrowSrc,
  submitLabel,
  subheadline,
  termsHref,
  privacyHref,
  onClose,
}: LeadCaptureStandaloneProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  return (
    <Modal
      closeModal={onClose}
      overlayRef={overlayRef}
      markColor={markColor}
      ctaArrowSrc={ctaArrowSrc}
      submitLabel={submitLabel}
      subheadline={subheadline}
      termsHref={termsHref}
      privacyHref={privacyHref}
      mode="standalone"
    />
  );
}

export function LeadCaptureProvider({
  children,
  wordmarkColor,
  markColor,
  ctaArrowSrc,
  submitLabel,
  subheadline,
  termsHref,
  privacyHref,
}: LeadCaptureProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [mobileSuccessVisible, setMobileSuccessVisible] = useState(false);
  const mobileSuccessRef = useRef<HTMLDivElement | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const openModal = useCallback((triggerElement?: HTMLElement) => {
    setMobileSuccessVisible(false);
    if (window.innerWidth < 640) {
      router.push('/get-in-touch');
      return;
    }
    if (triggerElement) triggerElementRef.current = triggerElement;
    setIsOpen(true);
    setDisplayModal(true);
  }, [router]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({ openModal, closeModal, isOpen }),
    [openModal, closeModal, isOpen]
  );

  useEffect(() => {
    if (!displayModal) return;
    if (window.innerWidth < 640) return;
    return lockScroll();
  }, [displayModal]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 640) return;
    if (displayModal) return;
    const url = new URL(window.location.href);
    const shouldShowSuccess = url.searchParams.get('lc') === 'success';
    if (!shouldShowSuccess) return;

    url.searchParams.delete('lc');
    const nextSearch = url.searchParams.toString();
    const nextUrl = `${url.pathname}${nextSearch ? `?${nextSearch}` : ''}${url.hash}`;
    window.history.replaceState(window.history.state, '', nextUrl);

    queueMicrotask(() => {
      setMobileSuccessVisible(true);
    });
  }, [displayModal]);

  useEffect(() => {
    if (!mobileSuccessVisible || !mobileSuccessRef.current) return;
    const el = mobileSuccessRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }
    );
    const timer = window.setTimeout(() => setMobileSuccessVisible(false), 3500);
    return () => window.clearTimeout(timer);
  }, [mobileSuccessVisible]);

  useLayoutEffect(() => {
    if (!displayModal || !overlayRef.current) return;
    const overlay = overlayRef.current;
    const card = overlay.querySelector('.lc-card');
    const revealRows = overlay.querySelectorAll('.lc-reveal-row');
    if (!card) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      gsap.set(revealRows, { opacity: 0, y: 8 });
      const tl = gsap.timeline();
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' }, 0);
      tl.fromTo(
        card,
        isDesktop ? { xPercent: 110 } : { yPercent: 110 },
        { xPercent: 0, yPercent: 0, duration: 0.3, ease: 'power3.out' },
        0
      );
      tl.to(revealRows, { opacity: 1, y: 0, duration: 0.2, stagger: 0.04, ease: 'power1.out' }, 0.3);
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(card, { xPercent: 0, yPercent: 0 });
      gsap.set(revealRows, { opacity: 1, y: 0 });
    });
    return () => mm.revert();
  }, [displayModal]);

  useEffect(() => {
    if (isOpen || !displayModal) return;
    const overlay = overlayRef.current;
    const card = overlay?.querySelector('.lc-card');
    if (!overlay || !card) return;

    const completeClose = () => {
      setDisplayModal(false);
      triggerElementRef.current?.focus({ preventScroll: true });
      triggerElementRef.current = null;
    };

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const tl = gsap.timeline({ onComplete: completeClose });
      tl.to(
        card,
        isDesktop ? { xPercent: 110, duration: 0.25, ease: 'power4.in' } : { yPercent: 110, duration: 0.25, ease: 'power4.in' },
        0
      );
      tl.to(overlay, { opacity: 0, duration: 0.2, ease: 'power1.in' }, 0);
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      completeClose();
    });
    return () => mm.revert();
  }, [isOpen, displayModal]);

  void wordmarkColor;

  const modal = displayModal ? (
    <Modal
      closeModal={closeModal}
      overlayRef={overlayRef}
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
      {typeof window !== 'undefined' && mobileSuccessVisible && createPortal(
        <div className="lc-mobile-success-overlay" role="status" aria-live="polite">
          <div ref={mobileSuccessRef} className="lc-mobile-success-card">
            <h3 className="lc-mobile-success-text">
              THANK YOU <span>WE&apos;LL BE IN TOUCH</span>
            </h3>
            <button
              type="button"
              className="lc-mobile-success-close"
              aria-label="Close success message"
              onClick={() => setMobileSuccessVisible(false)}
            >
              <svg
                className="lc-mobile-success-close-icon"
                viewBox="0 0 12 12"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>,
        document.body
      )}
    </LeadCaptureContext.Provider>
  );
}

