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
      viewBox="0 0 36 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
      role={alt ? 'img' : undefined}
      aria-label={alt}
      aria-hidden={ariaHidden ?? (alt ? undefined : true)}
    >
      <path d="M36.0009 13.6677L24.0031 20.4999L36.0009 27.3321V40.9966L11.998 27.3288V13.671L36.0009 0.0032959V13.6677Z" fill={color} />
      <path d="M11.9971 27.3288V40.9958L0 34.1644V20.4973L11.9971 27.3288Z" fill={color} />
      <path d="M11.9971 13.671L0.00476074 20.4999L0 20.4973V6.83551L11.9971 0.00402832V13.671Z" fill={color} />
    </svg>
  );
}
