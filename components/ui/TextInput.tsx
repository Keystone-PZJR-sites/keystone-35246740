import clsx from 'clsx';
import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type TextInputProps = {
  id: string;
  type?: 'text' | 'email';
  registerProps?: UseFormRegisterReturn;
  error?: boolean;
  errorMessage?: string;
  breakpoint?: 'desktop' | 'mobile';
  property1?: 'active' | 'default' | 'filled' | 'focused' | 'hover';
  input?: string;
  label?: string;
  className?: string;
  onFieldFocus?: () => void;
};

export function TextInput({
  id,
  type = 'text',
  registerProps,
  error,
  errorMessage,
  breakpoint = 'desktop',
  property1 = 'default',
  input = 'Input',
  label = 'Input Label',
  className,
  onFieldFocus,
}: TextInputProps) {
  const errorId = error && errorMessage ? `${id}-error` : undefined;
  const interactive = Boolean(registerProps);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const resolvedState: TextInputProps['property1'] = interactive
    ? (isFocused ? 'active' : (hasValue ? 'filled' : 'default'))
    : property1;
  const showFloatingContent = ['active', 'filled'].includes(resolvedState ?? 'default');
  const registerOnBlur = registerProps?.onBlur;
  const registerOnChange = registerProps?.onChange;

  return (
    <div className={clsx('lc-field-group', className)}>
      <label
        htmlFor={id}
        className={clsx(
          'lc-field-wrapper',
          `lc-field-wrapper--${breakpoint}`,
          `lc-field-wrapper--${resolvedState}`,
          error && 'lc-field-wrapper--error',
          interactive && 'lc-field-wrapper--interactive'
        )}
      >
        {interactive ? (
          <>
            <span className="lc-field-label">{label}</span>
            <input
              id={id}
              {...registerProps}
              type={type}
              placeholder=""
              className={clsx('lc-field-input', showFloatingContent && 'lc-field-input--visible')}
              autoComplete={type === 'email' ? 'email' : 'on'}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={errorId}
              onFocus={() => {
                setIsFocused(true);
                onFieldFocus?.();
              }}
              onBlur={(e) => {
                setIsFocused(false);
                registerOnBlur?.(e);
              }}
              onChange={(e) => {
                setHasValue(e.currentTarget.value.trim().length > 0);
                registerOnChange?.(e);
              }}
            />
          </>
        ) : showFloatingContent ? (
          <>
            <span className="lc-field-label lc-field-label--floating">{label}</span>
            <span className="lc-field-value">{input}</span>
          </>
        ) : (
          <span className="lc-field-label">{label}</span>
        )}
      </label>
      {error && errorMessage && (
        <p id={errorId} className="lc-field-error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

