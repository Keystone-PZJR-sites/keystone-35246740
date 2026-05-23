interface HowItWorksPillProps {
  label: string;
  bg: string;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export function HowItWorksPill({
  label,
  bg,
  text,
  active = false,
  onClick,
}: HowItWorksPillProps) {
  if (onClick) {
    return (
      <button
        type="button"
        className="hiw-pill hiw-pill-button"
        data-active={active ? 'true' : 'false'}
        style={{
          backgroundColor: active ? bg : 'transparent',
          color: active ? text : bg,
          borderColor: bg,
        }}
        onClick={onClick}
        aria-pressed={active}
      >
        {label}
      </button>
    );
  }

  return (
    <span
      className="hiw-pill"
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
    </span>
  );
}
