import { useMemo, useState, type ChangeEvent, type CSSProperties } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import type { UseFormRegisterReturn } from 'react-hook-form';
import * as CountryFlags from '@untitledui/country-flags';
import countries from 'keystone-design-bootstrap/utils/countries';

type Country = typeof countries[0];

type MobileNumberInputProps = {
  className?: string;
  id?: string;
  registerProps?: UseFormRegisterReturn;
  error?: boolean;
  errorMessage?: string;
  breakpoint?: 'desktop' | 'mobile';
  state?: 'default' | 'hover' | 'focused' | 'active' | 'filled';
  countryCode?: string;
  label?: string;
  number?: string;
  caretDownSrc?: string;
  onFieldFocus?: () => void;
};

function getNationalMask(country: Country | undefined): string {
  if (!country?.phoneMask) return '';
  const code = country.phoneCode.startsWith('+') ? country.phoneCode : `+${country.phoneCode}`;
  const escaped = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return country.phoneMask.replace(new RegExp(`^\\s*${escaped}[\\s-]*`), '').trim();
}

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

function titleCaseIsoCode(code: string): string {
  if (code.length < 2) return 'Us';
  return `${code.charAt(0).toUpperCase()}${code.charAt(1).toLowerCase()}`;
}

export function MobileNumberInput({
  className,
  id = 'mobile-number',
  registerProps,
  error,
  errorMessage,
  breakpoint = 'desktop',
  state = 'default',
  countryCode = '+1',
  label = 'MOBILE PHONE',
  number = '(818) 370',
  caretDownSrc = '/lead-capture/lead-capture-caret-down.svg',
  onFieldFocus,
}: MobileNumberInputProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const interactive = Boolean(registerProps);
  const { ref, name, onChange: rhfOnChange, onBlur: rhfOnBlur } = registerProps ?? {};
  const resolvedState: MobileNumberInputProps['state'] = interactive
    ? displayValue.length > 0
      ? (isFocused ? 'active' : 'filled')
      : (isFocused ? 'focused' : 'default')
    : state;
  const hasFloatingValue = ['focused', 'active', 'filled'].includes(resolvedState ?? 'default');

  const selectedCountry = countries.find((c) => c.code === selectedCountryCode);
  const nationalMask = getNationalMask(selectedCountry);
  const phoneCode = selectedCountry
    ? selectedCountry.phoneCode.startsWith('+')
      ? selectedCountry.phoneCode
      : `+${selectedCountry.phoneCode}`
    : '+1';

  const FlagComponent = useMemo(() => {
    const countryCode = titleCaseIsoCode(selectedCountryCode);
    const key = `Flag${countryCode}` as keyof typeof CountryFlags;
    return CountryFlags[key] ?? CountryFlags.FlagUs;
  }, [selectedCountryCode]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    const formatted = nationalMask ? formatDigitsToMask(digits, nationalMask) : digits;
    setDisplayValue(formatted);
    const fullValue = formatted ? `${phoneCode} ${formatted}` : '';
    if (rhfOnChange && name) rhfOnChange({ target: { name, value: fullValue } });
  };

  const handleCountryChange = (newCode: string) => {
    const digits = displayValue.replace(/\D/g, '');
    const newCountry = countries.find((c) => c.code === newCode);
    const newMask = getNationalMask(newCountry);
    const newPhoneCode = newCountry
      ? newCountry.phoneCode.startsWith('+')
        ? newCountry.phoneCode
        : `+${newCountry.phoneCode}`
      : '+1';
    const reformatted = newMask ? formatDigitsToMask(digits, newMask) : digits;

    setSelectedCountryCode(newCode);
    setDisplayValue(reformatted);
    if (rhfOnChange && name) {
      rhfOnChange({
        target: { name, value: reformatted ? `${newPhoneCode} ${reformatted}` : '' },
      });
    }
  };

  const phoneCodePadding = `calc(${Math.max(phoneCode.length, 2)}ch + 10px)`;
  const phoneCodePaddingVar = '--lc-phone-code-padding' as const;

  return (
    <div className={clsx('lc-field-group', className)}>
      <div
        className={clsx(
          'lc-phone-wrapper',
          `lc-phone-wrapper--${breakpoint}`,
          `lc-phone-wrapper--${resolvedState}`,
          error && 'lc-phone-wrapper--error',
          hasFloatingValue && 'lc-phone-wrapper--with-value'
        )}
      >
        <div className="lc-country-dropdown">
          <Image src={caretDownSrc} width={16} height={16} alt="" aria-hidden="true" />
          <span className="lc-country-flag" aria-hidden="true">
            <FlagComponent width={24} height={16} />
          </span>
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

        <div
          className="lc-phone-input-wrapper"
          style={{ [phoneCodePaddingVar]: phoneCodePadding } as CSSProperties}
        >
          {interactive ? (
            <label htmlFor={id} className="lc-phone-input-label">
              <span className={clsx('lc-phone-floating-label', error && 'lc-phone-floating-label--error')}>
                {label}
              </span>
              <span className="lc-phone-value-code" aria-hidden="true">
                {phoneCode}
              </span>
              <input
                id={id}
                ref={ref}
                name={name}
                type="tel"
                inputMode="numeric"
                value={displayValue}
                className={clsx('lc-field-input', 'lc-phone-input', hasFloatingValue ? 'lc-phone-input--floating' : 'lc-phone-input--rest')}
                placeholder=""
                autoComplete="tel-national"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error && errorMessage ? `${id}-error` : undefined}
                onBlur={(e) => {
                  setIsFocused(false);
                  rhfOnBlur?.(e);
                }}
                onChange={handlePhoneChange}
                onFocus={() => {
                  setIsFocused(true);
                  onFieldFocus?.();
                }}
              />
            </label>
          ) : hasFloatingValue ? (
            <div className="lc-phone-static-value">
              <span className={clsx('lc-phone-floating-label', error && 'lc-phone-floating-label--error')}>
                {label}
              </span>
              <span className="lc-phone-value">
                <span className="lc-phone-value-code">{countryCode}</span>
                <span>{number}</span>
              </span>
            </div>
          ) : (
            <span className="lc-phone-label">{label}</span>
          )}
        </div>
      </div>
      {error && errorMessage && (
        <p id={`${id}-error`} className="lc-field-error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

