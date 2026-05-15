import clsx from 'clsx';

type CtaSecondaryProps = {
  onClick: () => void;
  className?: string;
  property1?: 'default' | 'hover' | 'focused';
  mobileIconOnly?: boolean;
};

export function CtaSecondary({
  onClick,
  className,
  property1 = 'default',
  mobileIconOnly = false,
}: CtaSecondaryProps) {
  return (
    <button
      type="button"
      className={clsx(
        'lc-cta-secondary',
        property1 === 'hover' && 'lc-cta-secondary--hover',
        property1 === 'focused' && 'lc-cta-secondary--focused',
        mobileIconOnly && 'lc-cta-secondary--icon-only',
        className
      )}
      onClick={onClick}
      aria-label="Cancel"
    >
      {!mobileIconOnly && <span>Cancel</span>}
      <svg
        aria-hidden="true"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

