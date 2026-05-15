import clsx from 'clsx';
import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type TextfieldProps = {
  className?: string;
  id?: string;
  breakpoint?: 'desktop' | 'mobile';
  state?: 'default' | 'active' | 'focused' | 'hover' | 'filled';
  value?: string;
  registerProps?: UseFormRegisterReturn;
  error?: boolean;
  errorMessage?: string;
  onFieldFocus?: () => void;
};

export function Textfield({
  className,
  id = 'textfield',
  breakpoint = 'desktop',
  state = 'default',
  value = 'Tell us a little about your business.',
  registerProps,
  error = false,
  errorMessage,
  onFieldFocus,
}: TextfieldProps) {
  const interactive = Boolean(registerProps);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const errorId = error && errorMessage ? `${id}-error` : undefined;
  const resolvedState: TextfieldProps['state'] = interactive
    ? hasValue
      ? (isFocused ? 'active' : 'filled')
      : (isFocused ? 'focused' : 'default')
    : state;

  const registerOnChange = registerProps?.onChange;
  const registerOnBlur = registerProps?.onBlur;

  return (
    <div className={clsx('lc-field-group', className)}>
      <div
        className={clsx(
          'lc-textfield',
          `lc-textfield--${breakpoint}`,
          `lc-textfield--${resolvedState}`,
          interactive && 'lc-textfield--interactive',
          error && 'lc-textfield--error'
        )}
      >
        {interactive ? (
          <textarea
            id={id}
            {...registerProps}
            className="lc-textfield-input"
            placeholder={value}
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
        ) : (
          <p className="lc-textfield-text">{value}</p>
        )}
      </div>
      {error && errorMessage && (
        <p id={errorId} className="lc-field-error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

