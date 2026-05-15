import clsx from 'clsx';

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
  property1?: 'default' | 'hover' | 'active';
  ariaLabel?: string;
};

export function CloseButton({
  onClick,
  className,
  property1 = 'default',
  ariaLabel = 'Close',
}: CloseButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={clsx(
        'lc-close-btn',
        property1 === 'hover' && 'lc-close-btn--hover',
        property1 === 'active' && 'lc-close-btn--active',
        className
      )}
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        className="lc-close-btn-icon"
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

