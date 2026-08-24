/** v2 icons — geometry exported verbatim from the Figma icon sheet
 * (519:5431) and component glyphs via the console bridge, 2026-08-23
 * (spec 003 §6). Path data is NEVER edited; the only transformation is
 * paint normalization:
 *
 * - Two-tone icons keep their intrinsic palettes as token vars with the
 *   exported hex as fallback (they do not tint with text).
 * - Single-color glyphs (arrows, nav triggers, nav menu, spinner head)
 *   are normalized to currentColor — the consuming component sets the
 *   color from tokens per chrome/state.
 *
 * All icons are decorative: aria-hidden, no roles; the owning control
 * carries the accessible name.
 */

interface IconProps {
  /** Rendered box in px; the viewBox stays intrinsic. */
  size?: number;
  className?: string;
}

type Props = IconProps & { title?: never };

/** icons/projects (58:5449) — intrinsic brown two-tone.
 * Re-exported 2026-08-23 after the sticker-sheet rebuild. */
export function IconProjects({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15 1.84961V3.09961H5V1.84961H15Z" fill="var(--color-brown-400, #ad8261)" />
      <path d="M16.666 4.7666V6.0166H3.33301V4.7666H16.666Z" fill="var(--color-brown-400, #ad8261)" />
      <path d="M17.084 8.93262H2.91699V16.5996H9.625V17.8496H1.66699V7.68262H18.334V12.3906H17.084V8.93262Z" fill="var(--color-brown-400, #ad8261)" />
      <path d="M11.5 16.6849C12.5969 16.6849 13.2726 16.9276 13.6823 17.3373C14.092 17.7471 14.3348 18.4227 14.3348 19.5196H15.3352C15.3352 18.4227 15.578 17.7471 15.9877 17.3373C16.3974 16.9276 17.0731 16.6849 18.17 16.6849V15.6844C17.0731 15.6844 16.3974 15.4416 15.9877 15.0319C15.578 14.6222 15.3352 13.9466 15.3352 12.8496H14.3348C14.3348 13.9466 14.092 14.6222 13.6823 15.0319C13.2726 15.4416 12.5969 15.6844 11.5 15.6844V16.6849Z" fill="var(--color-brown-600, #72523b)" />
    </svg>
  );
}

/** icons/approach (58:5450) — intrinsic teal two-tone.
 * Re-exported 2026-08-23 after the sticker-sheet rebuild. */
export function IconApproach({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M1.67188 10.3281C1.67205 5.72877 5.40065 2.00018 10 2C10.3123 2 10.621 2.01721 10.9248 2.05078L10.8564 2.66699L10.7891 3.2832C10.5304 3.25461 10.2667 3.24023 10 3.24023C6.08548 3.24041 2.91229 6.41361 2.91211 10.3281C2.91211 14.2428 6.08538 17.4168 10 17.417C13.9148 17.417 17.0889 14.2429 17.0889 10.3281C17.0889 10.0616 17.0735 9.79868 17.0449 9.54004L17.6611 9.47168L18.2773 9.4043C18.3109 9.70782 18.3291 10.016 18.3291 10.3281C18.3291 14.9277 14.5996 18.6572 10 18.6572C5.40054 18.6571 1.67188 14.9276 1.67188 10.3281ZM5.00488 10.3174C5.005 7.72143 6.98153 5.58813 9.51172 5.33691L9.57227 5.95312L9.63379 6.57031C7.73155 6.7592 6.24524 8.36518 6.24512 10.3174C6.24512 12.3971 7.93112 14.0828 10.0107 14.083C11.963 14.083 13.5698 12.5975 13.7588 10.6953L14.375 10.7568L14.9922 10.8174C14.7408 13.3475 12.6068 15.3232 10.0107 15.3232C7.24629 15.323 5.00488 13.0819 5.00488 10.3174Z" fill="var(--color-teal-400, #5bc3b3)" />
      <path d="M15.2507 8.12533H11.8757V4.75033L14.7923 1.66699L15.6257 4.37533L18.334 5.20866L15.2507 8.12533Z" fill="var(--color-teal-600, #318175)" />
      <path d="M16.1201 3.87891L19.5312 4.92871L15.6758 8.57617L15.4961 8.74512H12.1318L10.0215 10.8555L9.14453 9.97852L11.2549 7.86816V4.50391L11.4238 4.32422L15.0713 0.46875L16.1201 3.87891ZM12.4951 4.99707V7.50488H15.0029L17.1348 5.48828L15.1289 4.87109L14.5107 2.86426L12.4951 4.99707Z" fill="var(--color-teal-600, #318175)" />
    </svg>
  );
}

/** icons/case-studies (58:5451) — intrinsic gray two-tone.
 * Re-exported 2026-08-23 after the sticker-sheet rebuild. */
export function IconCaseStudies({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15.625 10.5752H13.293L10.5312 10.5859L8.03125 8.0752H4.375V3.875H15.625V10.5752Z" fill="var(--color-darkgray-300, #5d5a56)" />
      <path d="M8.55078 6.83398L8.73438 7.0166L11.0518 9.33398H18.334V18.501H1.66699V6.83398H8.55078ZM2.91699 17.251H17.084V10.584H10.5332L10.3496 10.4014L8.03223 8.08398H2.91699V17.251Z" fill="var(--color-darkgray-100, #847f71)" />
    </svg>
  );
}

/** icons/chat (91:8492) — intrinsic brown two-tone. */
export function IconChat({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.166 2.41635V3.66635H2.83301V14.4994H7.65625L9.91699 16.3939L12.0303 14.6429L12.2041 14.4994H17V9.49936H18.25V15.7494H12.6553L9.91211 18.0218L7.20117 15.7494H1.58301V2.41635H11.166Z" fill="var(--color-brown-400, #ad8261)" />
      <path d="M12.4163 5.39251C13.5156 5.39251 14.1984 5.63576 14.6143 6.05167C15.0302 6.46759 15.2734 7.15042 15.2734 8.24967H16.2258C16.2258 7.15042 16.4691 6.46759 16.8849 6.05167C17.3008 5.63576 17.9837 5.39251 19.083 5.39251V4.44017C17.9837 4.44017 17.3008 4.19692 16.8849 3.78102C16.4691 3.36512 16.2258 2.68228 16.2258 1.58301H15.2734C15.2734 2.68228 15.0302 3.36512 14.6143 3.78102C14.1984 4.19692 13.5156 4.44017 12.4163 4.44017V5.39251Z" fill="var(--color-brown-600, #72523b)" />
    </svg>
  );
}

/** icons/sparkle (91:8477 teal · 519:5462 red) — one geometry, two-tone
 * palette driven by --sparkle-a / --sparkle-b (teal defaults; the grader
 * error state switches them to the red pair, spec 003 §5). */
export function IconSparkle({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M0.0839844 12.5164C2.78852 12.5164 4.59889 13.1132 5.74306 14.2573C6.88719 15.4015 7.48398 17.2118 7.48398 19.9164H8.68398C8.68398 17.2118 9.28078 15.4015 10.4249 14.2573C11.5691 13.1132 13.3794 12.5164 16.084 12.5164V11.3164C13.3794 11.3164 11.5691 10.7196 10.4249 9.57545C9.28078 8.43129 8.68398 6.62092 8.68398 3.91638H7.48398C7.48398 6.62092 6.88719 8.43129 5.74306 9.57545C4.59889 10.7196 2.78852 11.3164 0.0839844 11.3164V12.5164Z" fill="var(--sparkle-a, var(--color-teal-400, #5bc3b3))" />
      <path d="M13.2505 3.89251C14.3498 3.89251 15.0326 4.13576 15.4485 4.55167C15.8644 4.96759 16.1076 5.65042 16.1076 6.74967H17.06C17.06 5.65042 17.3033 4.96759 17.7191 4.55167C18.135 4.13576 18.8179 3.89251 19.9172 3.89251V2.94017C18.8179 2.94017 18.135 2.69692 17.7191 2.28102C17.3033 1.86512 17.06 1.18228 17.06 0.0830078H16.1076C16.1076 1.18228 15.8644 1.86512 15.4485 2.28102C15.0326 2.69692 14.3498 2.94017 13.2505 2.94017V3.89251Z" fill="var(--sparkle-b, var(--color-teal-600, #318175))" />
    </svg>
  );
}

/** IconArrowRight (519:6635) — currentColor. */
export function IconArrowRight({ size = 24, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M20.6924 11.5576C20.9363 11.8017 20.9364 12.1983 20.6924 12.4423L14.7959 18.3388L13.9112 17.454L17.8867 13.4785C18.2017 13.1635 17.9786 12.625 17.5331 12.625H4.25L4.25 11.375H17.5331C17.9786 11.375 18.2017 10.8364 17.8867 10.5214L13.9112 6.5459L14.7959 5.66113L20.6924 11.5576Z" fill="currentColor" />
    </svg>
  );
}

/** IconArrowLeft (519:6634) — currentColor. */
export function IconArrowLeft({ size = 24, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4.43296 11.5576C4.18908 11.8017 4.18895 12.1983 4.43296 12.4423L10.3294 18.3388L11.2142 17.454L7.23866 13.4785C6.92367 13.1635 7.14676 12.625 7.59221 12.625H20.8753V11.375H7.59221C7.14676 11.375 6.92367 10.8364 7.23866 10.5214L11.2142 6.5459L10.3294 5.66113L4.43296 11.5576Z" fill="currentColor" />
    </svg>
  );
}

/** _nav-trigger-icon (7:62) — 10-grid stroked glyphs, currentColor.
 * chevron = closed trigger · arrow = external/forward · hover = open. */
export function IconNavTrigger({
  variant = "chevron",
  size = 10,
  className,
}: Props & { variant?: "chevron" | "arrow" | "hover" }) {
  const d =
    variant === "arrow"
      ? "M5.88379 6.40234V2.86681H2.34826"
      : variant === "hover"
        ? "M2.5 6L5 3.5L7.5 6"
        : "M2.5 3.5L5 6L7.5 3.5";
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d={d} stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}

/** IconChevronDownMedium (523:19955) — 16-grid stroked chevron,
 * currentColor. The footer accordion trigger glyph (spec 004 §7);
 * exported via the console bridge 2026-08-23. */
export function IconChevronDownMedium({ size = 16, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3.83301 6.33301L7.99967 10.4997L12.1663 6.33301" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}

/** _nav-menu-mobile (520:15982) — 32-grid, currentColor. Consumer is the
 * Phase 4 nav; committed with the sheet (spec 003 §6). */
export function IconNavMenu({ open = false, size = 32, className }: Props & { open?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      {open ? (
        <>
          <path d="M23.0708 21.6566L21.6566 23.0708L8.92871 10.3429L10.3429 8.92871L23.0708 21.6566Z" fill="currentColor" />
          <path d="M23.0708 10.3431L21.6566 8.92887L8.92871 21.6568L10.3429 23.071L23.0708 10.3431Z" fill="currentColor" />
        </>
      ) : (
        <path d="M25 21V23H7V21H25ZM25 15V17H7V15H25ZM25 9V11H7V9H25Z" fill="currentColor" />
      )}
    </svg>
  );
}

/** IconLoadingCircle (button-arrow loading glyph) — track stays the
 * alpha-ink token; the head is currentColor per chrome. */
export function IconLoadingCircle({ size = 24, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M20.625 12C20.625 7.23655 16.7634 3.375 12 3.375C7.23655 3.375 3.375 7.23655 3.375 12C3.375 16.7634 7.23655 20.625 12 20.625C16.7634 20.625 20.625 16.7634 20.625 12ZM21.875 12C21.875 17.4538 17.4538 21.875 12 21.875C6.54619 21.875 2.125 17.4538 2.125 12C2.125 6.54619 6.54619 2.125 12 2.125C17.4538 2.125 21.875 6.54619 21.875 12Z" fill="var(--color-alpha-black-20, rgba(0, 0, 0, 0.2))" />
      <path d="M21.875 12C21.875 17.4538 17.4538 21.875 12 21.875V20.625C16.7634 20.625 20.625 16.7634 20.625 12H21.875Z" fill="currentColor" />
    </svg>
  );
}
