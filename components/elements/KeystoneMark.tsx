interface KeystoneMarkProps {
  color: string;
  className?: string;
  width?: number;
  height?: number;
  'aria-hidden'?: boolean | 'true' | 'false';
  alt?: string;
}

/**
 * The Keystone geometric mark rendered as an inline SVG.
 * Accepts any CSS color string via the `color` prop.
 */
export function KeystoneMark({
  color,
  className,
  width = 36,
  height = 41,
  'aria-hidden': ariaHidden,
  alt,
}: KeystoneMarkProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36.1826 40.9523"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
      role={alt ? 'img' : undefined}
      aria-label={alt}
      aria-hidden={ariaHidden ?? (alt ? undefined : true)}
    >
      <path d="M12.0675 13.6473L0 20.471V6.82366L12.0675 0V13.6473Z" fill={color} />
      <path d="M12.0675 13.6473L0 20.471V6.82366L12.0675 0V13.6473Z" fill={color} />
      <path d="M0 34.1287L12.0675 40.9523V27.3002L0 20.4766V34.1287Z" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.1826 40.9512L12.0391 27.2988V13.6514L36.1777 0.00390625L36.1826 40.9512ZM24.1172 20.4766L36.1631 27.3301V13.6221L24.1172 20.4766Z"
        fill={color}
      />
    </svg>
  );
}
