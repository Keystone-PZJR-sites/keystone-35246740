import clsx from 'clsx';
import Image from 'next/image';

type CtaDefaultProps = {
  label: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
  className?: string;
  property1?: 'default' | 'hover' | 'focused';
  arrowSrc?: string;
  isLoading?: boolean;
};

export function CtaDefault({
  label,
  onClick,
  type = 'button',
  disabled = false,
  className,
  property1 = 'default',
  arrowSrc = '/media/lead-capture/lead-capture-cta-arrow.svg',
  isLoading = false,
}: CtaDefaultProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={clsx(
        'lc-cta-default',
        isLoading && 'lc-cta-default--loading',
        property1 === 'hover' && 'lc-cta-default--hover',
        property1 === 'focused' && 'lc-cta-default--focused',
        className
      )}
      aria-busy={isLoading ? 'true' : 'false'}
      onClick={onClick}
    >
      <span className="lc-cta-default-content">
        <span>{label}</span>
        <span className="lc-submit-arrow-slider" aria-hidden="true">
          <span className="lc-submit-arrow-track lc-submit-arrow-track--a">
            <Image src={arrowSrc} width={20} height={20} alt="" />
          </span>
          <span className="lc-submit-arrow-track lc-submit-arrow-track--b">
            <Image src={arrowSrc} width={20} height={20} alt="" />
          </span>
        </span>
      </span>
      <span className="lc-cta-loading-spinner" aria-hidden="true">
        <span className="lc-cta-loading-spinner-outer" />
        <span className="lc-cta-loading-spinner-inner" />
      </span>
    </button>
  );
}

