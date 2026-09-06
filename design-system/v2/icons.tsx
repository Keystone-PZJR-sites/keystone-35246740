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

/** IconSliderArrow — the slider label-row arrow (spec 012 §4), exported
 * verbatim from the slider set 613:21217 (its 13×10 geometry differs
 * from IconArrowRight's 24×24 cut, so it ships as its own export) —
 * currentColor. Non-square: `size` is the width; height rides the
 * intrinsic 13:10 ratio. */
export function IconSliderArrow({ size = 13, className }: Props) {
  return (
    <svg width={size} height={(size * 10) / 13} viewBox="0 0 13 10" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.8569 4.65105C13.0476 4.84359 13.0477 5.15647 12.8569 5.34895L8.24627 10L7.55444 9.30211L10.663 6.16627C10.9093 5.91781 10.7349 5.49299 10.3866 5.49299H0V4.50701H10.3866C10.7349 4.50701 10.9093 4.08219 10.663 3.83373L7.55444 0.697894L8.24627 0L12.8569 4.65105Z" fill="currentColor" />
    </svg>
  );
}

/** IconStar — the case-study stat star (spec 014 §7.2), exported
 * verbatim from the card set's stat3-container slot via the console
 * bridge 2026-08-28 (15×14, one path; the export's #989281 fill is
 * text/500 — normalized to currentColor, inked at the mount).
 * Non-square: `size` is the width; height rides the intrinsic 15:14
 * ratio. */
export function IconStar({ size = 15, className }: Props) {
  return (
    <svg width={size} height={(size * 14) / 15} viewBox="0 0 15 14" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.81693 4.60799L15 5.34781L11.2488 8.93447L12.1347 14L7.49921 11.6076L2.86456 14L3.7496 8.93447L0 5.34781L5.18149 4.60799L7.5 0L9.81693 4.60799Z" fill="currentColor" />
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

/** IconChevronDownSmall — the FAQ drawer chevron (spec 013 §4, §9 R8).
 * The set mounts the 16-grid chevron resized to 12, which keeps the
 * stroke absolute at 1.25 — a scaled SVG renders 0.94, so the rendered
 * geometry ships verbatim (the 012 IconSliderArrow precedent). Exported
 * via the console bridge 2026-08-28; ink normalized to currentColor
 * (tints border/400 through the component layer). */
export function IconChevronDownSmall({ size = 12, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2.875 4.74976L6 7.87476L9.125 4.74976" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}

/** _nav-menu-mobile (520:15982) — 28-grid, currentColor. Consumer is the
 * Phase 4 nav. Re-exported 2026-08-24 after design resized the set
 * 32 → 28 (spec 005 §9). */
export function IconNavMenu({ open = false, size = 28, className }: Props & { open?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      {open ? (
        <path d="M20.1873 9.0498L15.2372 13.999L20.1873 18.9491L18.9491 20.1873L13.999 15.2372L9.0498 20.1873L7.8125 18.95L12.7617 13.9999L7.8125 9.0498L9.0498 7.8125L13.999 12.7617L18.9491 7.8125L20.1873 9.0498Z" fill="currentColor" />
      ) : (
        <path d="M21.875 18.375V20.125H6.125V18.375H21.875ZM21.875 13.125V14.875H6.125V13.125H21.875ZM21.875 7.875V9.625H6.125V7.875H21.875Z" fill="currentColor" />
      )}
    </svg>
  );
}

/** icons/blog (540:23965) — 20-grid, currentColor (tints with its chip
 * label, spec 005 §8). Exported via the console bridge 2026-08-24. */
export function IconBlog({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10.8333 8.33301H6.66667V7.29134H10.8333V8.33301Z" fill="currentColor" />
      <path d="M13.3333 5.83301H6.66667V4.79134H13.3333V5.83301Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.5625 14.4788H14.6875V17.1872H16.5625V18.2288H5.625C4.41688 18.2288 3.4375 17.2495 3.4375 16.0413V3.95801C3.4375 2.74988 4.41688 1.77051 5.625 1.77051H16.5625V14.4788ZM5.625 2.81217C4.99217 2.81217 4.47917 3.32518 4.47917 3.95801V13.8571C4.86446 13.5925 5.33063 13.4372 5.83333 13.4372H15.5208V2.81217H5.625Z" fill="currentColor" />
    </svg>
  );
}

/** icons/grader (540:23964) — 20-grid, currentColor (tints with its chip
 * label, spec 005 §8). Exported via the console bridge 2026-08-24. */
export function IconGrader({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.47884 1.77051H9.99967C14.5445 1.77051 18.2288 5.45483 18.2288 9.99967C18.2288 14.5445 14.5445 18.2288 9.99967 18.2288C5.45483 18.2288 1.77051 14.5445 1.77051 9.99967C1.77051 8.72599 2.0602 7.51856 2.5778 6.44092L2.80322 5.97135L3.74235 6.4222L3.51693 6.89176C3.06544 7.83171 2.81217 8.8854 2.81217 9.99967C2.81217 13.9692 6.03013 17.1872 9.99967 17.1872C13.9692 17.1872 17.1872 13.9692 17.1872 9.99967C17.1872 6.20532 14.2468 3.09943 10.5205 2.83252V4.89551H9.47884V1.77051ZM12.8122 9.99967C12.8122 11.553 11.553 12.8122 9.99967 12.8122C8.44636 12.8122 7.18717 11.553 7.18717 9.99967C7.18717 9.41138 7.36747 8.86506 7.67627 8.41357L4.21436 4.95166L3.84652 4.58301L4.58301 3.84652L4.95166 4.21436L8.41357 7.67627C8.86506 7.36747 9.41138 7.18717 9.99967 7.18717C11.553 7.18717 12.8122 8.44636 12.8122 9.99967Z" fill="currentColor" />
    </svg>
  );
}

/** icons/podcast (540:23963) — 20-grid, currentColor (tints with its chip
 * label, spec 005 §8). Exported via the console bridge 2026-08-24. */
export function IconPodcast({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.48014 16.3335C6.92799 16.1394 4.77255 14.5308 3.79411 12.2913L3.58496 11.8145L4.53955 11.397L4.74788 11.8747C5.63243 13.8992 7.6525 15.3122 10.001 15.3122C12.3494 15.3121 14.3686 13.8991 15.2533 11.8747L15.4624 11.397L16.417 11.8145L16.2078 12.2913C15.2294 14.5308 13.074 16.1393 10.5218 16.3335V18.2288H9.48014V16.3335ZM14.0635 9.58301C14.0635 11.8266 12.2446 13.6455 10.001 13.6455C7.75734 13.6455 5.93848 11.8267 5.93848 9.58301V5.83301C5.93848 3.58935 7.75734 1.77051 10.001 1.77051C12.2446 1.77054 14.0635 3.58937 14.0635 5.83301V9.58301Z" fill="currentColor" />
    </svg>
  );
}

/** icons/website (613:21309) — intrinsic gray two-tone.
 * Exported via the console bridge 2026-08-27 (spec 011 §8). */
export function IconWebsite({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5.41667 6.25033C5.41667 6.71056 5.04357 7.08366 4.58333 7.08366C4.1231 7.08366 3.75 6.71056 3.75 6.25033C3.75 5.79009 4.1231 5.41699 4.58333 5.41699C5.04357 5.41699 5.41667 5.79009 5.41667 6.25033Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M7.91667 6.25033C7.91667 6.71056 7.54357 7.08366 7.08333 7.08366C6.6231 7.08366 6.25 6.71056 6.25 6.25033C6.25 5.79009 6.6231 5.41699 7.08333 5.41699C7.54357 5.41699 7.91667 5.79009 7.91667 6.25033Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M9.58333 7.08366C10.0436 7.08366 10.4167 6.71056 10.4167 6.25033C10.4167 5.79009 10.0436 5.41699 9.58333 5.41699C9.12308 5.41699 8.75 5.79009 8.75 6.25033C8.75 6.71056 9.12308 7.08366 9.58333 7.08366Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M1.25 2.91699V16.2503H9.75V15.0003H2.5V4.16699H16.6667V8.08366H17.9167V2.91699H1.25Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M11.7506 14.1087C12.9019 14.1087 13.6109 14.3635 14.0409 14.7934C14.4708 15.2234 14.7256 15.9325 14.7256 17.0837H15.7756C15.7756 15.9325 16.0304 15.2234 16.4604 14.7934C16.8904 14.3635 17.5994 14.1087 18.7507 14.1087V13.0587C17.5994 13.0587 16.8904 12.8039 16.4604 12.3739C16.0304 11.9439 15.7756 11.2349 15.7756 10.0837H14.7256C14.7256 11.2349 14.4708 11.9439 14.0409 12.3739C13.6109 12.8039 12.9019 13.0587 11.7506 13.0587V14.1087Z" fill="var(--color-darkgray-100, #847f71)" />
    </svg>
  );
}

/** icons/search (613:21386) — intrinsic gray two-tone.
 * Exported via the console bridge 2026-08-27 (spec 011 §8). */
export function IconSearch({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2.69531 9.77893C2.69547 6.40861 5.19611 3.62341 8.44336 3.17542L8.52832 3.79456L8.61426 4.4137C5.97698 4.77754 3.94547 7.0415 3.94531 9.77893C3.94531 12.7704 6.37077 15.1959 9.3623 15.1959C10.8581 15.1958 12.2115 14.5899 13.1924 13.609C14.0071 12.7941 14.5626 11.7223 14.7275 10.527L15.3467 10.6129L15.9658 10.6979C15.7924 11.9548 15.2672 13.0983 14.4961 14.0289L17.3037 16.8375L16.4199 17.7213L13.6123 14.9137C12.4588 15.8695 10.9777 16.4458 9.3623 16.4459C5.68041 16.4459 2.69531 13.4608 2.69531 9.77893Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M10.1947 6.11263C11.2911 6.11263 11.9663 6.3553 12.3759 6.76476C12.7853 7.1743 13.028 7.84956 13.028 8.94596H14.028C14.028 7.84956 14.2707 7.1743 14.6801 6.76476C15.0897 6.3553 15.7649 6.11263 16.8613 6.11263V5.11263C15.7649 5.11263 15.0897 4.86996 14.6801 4.4605C14.2707 4.05096 14.028 3.3757 14.028 2.2793H13.028C13.028 3.3757 12.7853 4.05096 12.3759 4.4605C11.9663 4.86996 11.2911 5.11263 10.1947 5.11263V6.11263Z" fill="var(--color-darkgray-100, #847f71)" />
    </svg>
  );
}

/** icons/ai-chat (613:21385) — intrinsic gray two-tone.
 * Exported via the console bridge 2026-08-27 (spec 011 §8). */
export function IconAiChat({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10.4775 5.53027C10.4775 6.62941 10.721 7.3126 11.1367 7.72852C11.5526 8.14442 12.2357 8.38769 13.335 8.3877V9.33984C12.2357 9.33985 11.5526 9.58313 11.1367 9.99902C10.7209 10.4149 10.4775 11.098 10.4775 12.1973H9.52539C9.52539 11.098 9.28204 10.4149 8.86621 9.99902C8.45028 9.58322 7.76708 9.33984 6.66797 9.33984V8.3877C7.76724 8.3877 8.45029 8.14441 8.86621 7.72852C9.28204 7.31262 9.52539 6.62955 9.52539 5.53027H10.4775Z" fill="var(--color-darkgray-100, #847f71)" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.5 15.5303H12.7393L9.99609 17.8027L7.28516 15.5303H2.5V2.19727H17.5V15.5303ZM3.75 14.2803H7.74023L7.91406 14.4268L10 16.1748L12.1143 14.4238L12.2881 14.2803H16.25V3.44727H3.75V14.2803Z" fill="var(--color-lightgray-800, #b1aa9a)" />
    </svg>
  );
}

/** icons/maps (613:21383) — intrinsic gray two-tone.
 * Exported via the console bridge 2026-08-27 (spec 011 §8). */
export function IconMaps({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66699 14.792V5.20801C1.66717 3.7125 2.87949 2.50018 4.375 2.5H6.45898V12.708C6.45898 13.0531 6.17901 13.3328 5.83398 13.333C5.48881 13.333 5.20898 13.0532 5.20898 12.708V3.75H4.375C3.56984 3.75018 2.91717 4.40285 2.91699 5.20801V14.792C2.91682 15.137 2.63706 15.417 2.29199 15.417C1.94692 15.417 1.66717 15.137 1.66699 14.792Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M10.4167 5V6.25H5.20866V5H10.4167Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M16.25 11.25H17.5V17.5H4.375C2.87949 17.4998 1.66717 16.2875 1.66699 14.792C1.66699 13.2963 2.87938 12.0832 4.375 12.083H6.45898V13.333H4.375C3.56974 13.3332 2.91699 13.9867 2.91699 14.792C2.91717 15.5971 3.56985 16.2498 4.375 16.25H16.25V11.25Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M11.6664 7.16669C12.7628 7.16669 13.4381 7.40936 13.8476 7.81882C14.2571 8.22836 14.4998 8.90363 14.4998 10H15.4998C15.4998 8.90363 15.7425 8.22836 16.1519 7.81882C16.5615 7.40936 17.2367 7.16669 18.3331 7.16669V6.16668C17.2367 6.16668 16.5615 5.92401 16.1519 5.51454C15.7425 5.10501 15.4998 4.42974 15.4998 3.33333H14.4998C14.4998 4.42974 14.2571 5.10501 13.8476 5.51454C13.4381 5.92401 12.7628 6.16668 11.6664 6.16668V7.16669Z" fill="var(--color-darkgray-100, #847f71)" />
    </svg>
  );
}

/** icons/reception (613:21384) — intrinsic gray two-tone.
 * Exported via the console bridge 2026-08-27 (spec 011 §8). */
export function IconReception({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16.875 15.4163V16.6663H1.875V15.4163H16.875Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M8.75 13.1247H10V16.0417H8.75V13.1247Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M11.875 3.33301V4.58301H6.875V3.33301H11.875Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M10 4.16634V6.87435H9.375C5.82156 6.87435 3.41135 9.48031 3.15039 12.9163H16.875V14.1663H1.875V13.5413C1.875 9.42751 4.54195 5.96265 8.75 5.64974V4.16634H10Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M11.4583 8.41634C12.5547 8.41634 13.23 8.65901 13.6395 9.06848C14.049 9.47802 14.2917 10.1533 14.2917 11.2497H15.2917C15.2917 10.1533 15.5343 9.47802 15.9438 9.06848C16.3533 8.65901 17.0286 8.41634 18.125 8.41634V7.41634C17.0286 7.41634 16.3533 7.17367 15.9438 6.7642C15.5343 6.35467 15.2917 5.6794 15.2917 4.58299H14.2917C14.2917 5.6794 14.049 6.35467 13.6395 6.7642C13.23 7.17367 12.5547 7.41634 11.4583 7.41634V8.41634Z" fill="var(--color-darkgray-100, #847f71)" />
    </svg>
  );
}

/** icons/reviews (613:21382) — intrinsic gray two-tone.
 * Exported via the console bridge 2026-08-27 (spec 011 §8). */
export function IconReviews({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0101 14.1667H11.6771V12.9167H16.2601V17.4997H15.0101V14.1667Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M2.91732 2.5H4.16732V5.83301H7.50033V7.08301H2.91732V2.5Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M2.08398 10V9.375H3.33398V10C3.33398 13.4517 6.13221 16.25 9.58398 16.25C11.6154 16.25 13.4628 15.2818 14.6152 13.7852L14.9971 13.29L15.9873 14.0527L15.6064 14.5479C14.2237 16.3436 12.0136 17.5 9.58398 17.5C5.44185 17.5 2.08398 14.1421 2.08398 10Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M10.2084 2.5V3.75H9.58342C7.5522 3.75013 5.70447 4.71834 4.55217 6.21484L4.17131 6.70996L3.1801 5.94727L3.56193 5.45215C4.94453 3.65656 7.15404 2.50013 9.58342 2.5H10.2084Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M11.25 7.16665C12.3464 7.16665 13.0217 7.40932 13.4312 7.81879C13.8407 8.22832 14.0833 8.90359 14.0833 10H15.0834C15.0834 8.90359 15.326 8.22832 15.7355 7.81879C16.145 7.40932 16.8203 7.16665 17.9167 7.16665V6.16665C16.8203 6.16665 16.145 5.92398 15.7355 5.51451C15.326 5.10497 15.0834 4.4297 15.0834 3.3333H14.0833C14.0833 4.4297 13.8407 5.10497 13.4312 5.51451C13.0217 5.92398 12.3464 6.16665 11.25 6.16665V7.16665Z" fill="var(--color-darkgray-100, #847f71)" />
    </svg>
  );
}

/** icons/tokens (613:21381) — intrinsic gray two-tone.
 * Exported via the console bridge 2026-08-27 (spec 011 §8). */
export function IconTokens({ size = 20, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.083 9.99902C17.0828 6.08716 13.9109 2.91602 9.99902 2.91602C6.08726 2.91619 2.91619 6.08726 2.91602 9.99902C2.91602 13.9109 6.08716 17.0828 9.99902 17.083C13.911 17.083 17.083 13.911 17.083 9.99902ZM18.333 9.99902C18.333 14.6014 14.6014 18.333 9.99902 18.333C5.3968 18.3328 1.66602 14.6013 1.66602 9.99902C1.66619 5.39691 5.39691 1.66619 9.99902 1.66602C14.6013 1.66602 18.3328 5.3968 18.333 9.99902Z" fill="var(--color-lightgray-800, #b1aa9a)" />
      <path d="M6.666 10.4994C7.7624 10.4994 8.43767 10.7421 8.84721 11.1516C9.25668 11.5611 9.49935 12.2364 9.49935 13.3328H10.4994C10.4994 12.2364 10.742 11.5611 11.1515 11.1516C11.561 10.7421 12.2363 10.4994 13.3327 10.4994V9.49941C12.2363 9.49941 11.561 9.25674 11.1515 8.84727C10.742 8.43774 10.4994 7.76247 10.4994 6.66606H9.49935C9.49935 7.76247 9.25668 8.43774 8.84721 8.84727C8.43767 9.25674 7.7624 9.49941 6.666 9.49941V10.4994Z" fill="var(--color-darkgray-100, #847f71)" />
    </svg>
  );
}

/* ---- the gallery viewer's rail icons (spec 016 §2.1/§5.1) ----
 * Six verbatim console-bridge exports from the gallery icon components
 * (661:9454–9458 · 661:9471), 2026-08-29: 14-grid flattened-fill
 * vectors, mounted at 16 in the gallery-button (fills scale cleanly on
 * resize, unlike the 013 R8 stroke case). Ink normalized to
 * currentColor — the button state supplies it (text/200; text/600
 * disabled). File note (016 §9 build record): the desktop-view
 * component's fills read bound text/100 where every sibling reads
 * text/200 — flagged to design; nothing builds from it (the ink here
 * is the mount's). */

/** icons/left-chevron (661:9454) — the viewer's previous-site glyph. */
export function IconChevronLeftSm({ size = 16, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8.11475 3.04434L4.16016 6.99961L4.46914 7.30928L8.42441 11.2646L9.04307 10.6459L8.73408 10.3362L5.39746 6.99961L8.73408 3.66367L9.04307 3.354L8.42441 2.73535L8.11475 3.04434Z" fill="currentColor" />
    </svg>
  );
}

/** icons/right-chevron (661:9455) — the viewer's next-site glyph. */
export function IconChevronRightSm({ size = 16, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5.85117 3.04434L9.80576 6.99961L9.49678 7.30928L5.5415 11.2646L4.92285 10.6459L5.23184 10.3362L8.56846 6.99961L5.23184 3.66367L4.92285 3.354L5.5415 2.73535L5.85117 3.04434Z" fill="currentColor" />
    </svg>
  );
}

/** icons/desktop-view (661:9458) — the viewer's desktop-mode glyph. */
export function IconDesktopView({ size = 16, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.25 1.75V10.2081H1.75V1.75H12.25ZM2.625 9.33311H11.375V2.625H2.625V9.33311Z" fill="currentColor" />
      <path d="M13.4161 9.33301V12.2499H0.583008V9.33301H13.4161ZM1.45801 11.3749H12.5411V10.208H1.45801V11.3749Z" fill="currentColor" />
    </svg>
  );
}

/** icons/tablet-view (661:9456) — the viewer's tablet-mode glyph. */
export function IconTabletView({ size = 16, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6661 1.16699V12.8339H2.33301V1.16699H11.6661ZM3.20801 11.9589H10.7911V2.04199H3.20801V11.9589Z" fill="currentColor" />
      <path d="M9.33389 10.208V11.083H4.66699V10.208H9.33389Z" fill="currentColor" />
    </svg>
  );
}

/** icons/mobile-view (661:9457) — the viewer's mobile-mode glyph. */
export function IconMobileView({ size = 16, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.0839 0.583008V13.4161H2.91699V0.583008H11.0839ZM3.79199 12.5411H10.2089V1.45801H3.79199V12.5411ZM8.16699 2.04111V2.91611H5.83389V2.04111H8.16699Z" fill="currentColor" />
    </svg>
  );
}

/** icons/gallery-close (661:9471) — the viewer's close glyph. */
export function IconGalleryClose({ size = 16, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9728 3.646L10.6638 3.95566L7.61904 6.99971L10.9728 10.3541L10.3541 10.9728L6.99971 7.61904L3.95566 10.6638L3.646 10.9728L3.02734 10.3541L6.38105 6.99971L3.33633 3.95566L3.02734 3.646L3.646 3.02734L3.95566 3.33633L6.99971 6.38105L10.3541 3.02734L10.9728 3.646Z" fill="currentColor" />
    </svg>
  );
}

/* ---- the case-study page's glyphs (spec 017 §5.4) ----
 * Verbatim console-bridge exports from the Case Study section's rd2
 * frame, 2026-08-31. The six stack icons are hue-toned two-tone cuts
 * (glyph on the hue's 400 step, sparkle on its dark step) at per-icon
 * intrinsic boxes (32/28/32/28/26/30) — distinct draws from the gray
 * 011 list family, so they ship as their own exports; the smaller
 * bands mount them scaled (fills scale cleanly). Layer-name note
 * (017 §9): the rm/rs/rt cells carry stale names ("website" on the
 * ads cell, "listings2" on reviews) — glyph identity was verified
 * against the rd2 draws; nothing builds from the names. */

/** IconDoubleCheckmark (017 §3.3) — the checklist glyph: two checks on
 * the teal/400 + teal/500 pair (intrinsic two-tone; the strokes are
 * outlined fills, so the 20-box Shift mount scales cleanly). */
export function IconDoubleCheckmark({ size = 24, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5559 7.91013L7.53438 17.0777L3.4375 12.9808L4.49805 11.9203L5.02891 12.45L7.46055 14.8816L13.934 7.48708L14.4273 6.92224L15.5559 7.91013Z" fill="var(--color-teal-400, #5bc3b3)" />
      <path d="M20.5574 7.91013L12.5699 17.039L11.4414 16.0511L19.4289 6.92224L20.5574 7.91013Z" fill="var(--color-teal-500, #4aac9d)" />
    </svg>
  );
}

/** IconStarLg (017 §3.2) — the intro-stat star. Its own 25×24 cut
 * (non-uniform proportions vs IconStar's 15×14 — not a glyph match,
 * so it ships verbatim per the reuse rule); single color, normalized
 * to currentColor (inked yellow/400 at the mount). Non-square:
 * `size` is the width; height rides the intrinsic 25:24 ratio. */
export function IconStarLg({ size = 25, className }: Props) {
  return (
    <svg width={size} height={(size * 24) / 25} viewBox="0 0 25 24" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16.3616 7.89941L25 9.16767L18.748 15.3162L20.2244 24L12.4987 19.8987L4.77426 24L6.24934 15.3162L0 9.16767L8.63581 7.89941L12.5 0L16.3616 7.89941Z" fill="currentColor" />
    </svg>
  );
}

/** stack/website (017 §3.7 cell 1) — teal two-tone, 32-grid. */
export function IconStackWebsite({ size = 32, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.125 10.375C9.125 11.0654 8.56535 11.625 7.875 11.625C7.18465 11.625 6.625 11.0654 6.625 10.375C6.625 9.68465 7.18465 9.125 7.875 9.125C8.56535 9.125 9.125 9.68465 9.125 10.375Z" fill="var(--color-teal-400, #5bc3b3)" />
      <path d="M12.875 10.375C12.875 11.0654 12.3153 11.625 11.625 11.625C10.9346 11.625 10.375 11.0654 10.375 10.375C10.375 9.68465 10.9346 9.125 11.625 9.125C12.3153 9.125 12.875 9.68465 12.875 10.375Z" fill="var(--color-teal-400, #5bc3b3)" />
      <path d="M15.375 11.625C16.0654 11.625 16.625 11.0654 16.625 10.375C16.625 9.68465 16.0654 9.125 15.375 9.125C14.6846 9.125 14.125 9.68465 14.125 10.375C14.125 11.0654 14.6846 11.625 15.375 11.625Z" fill="var(--color-teal-400, #5bc3b3)" />
      <path d="M2.875 5.375V25.375H15.625V23.5H4.75V7.25H26V13.125H27.875V5.375H2.875Z" fill="var(--color-teal-400, #5bc3b3)" />
      <path d="M18.6259 22.1625C20.3528 22.1625 21.4163 22.5447 22.0613 23.1896C22.7063 23.8346 23.0885 24.8982 23.0885 26.625H24.6635C24.6635 24.8982 25.0457 23.8346 25.6906 23.1896C26.3356 22.5447 27.3991 22.1625 29.126 22.1625V20.5875C27.3991 20.5875 26.3356 20.2053 25.6906 19.5604C25.0457 18.9154 24.6635 17.8518 24.6635 16.125H23.0885C23.0885 17.8518 22.7063 18.9154 22.0613 19.5604C21.4163 20.2053 20.3528 20.5875 18.6259 20.5875V22.1625Z" fill="var(--color-teal-600, #318175)" />
    </svg>
  );
}

/** stack/meta-ads (017 §3.7 cell 2) — orange two-tone, 28-grid. */
export function IconStackAds({ size = 28, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M23.4404 8.90479H23.4626C25.7609 8.90488 27.6239 10.7679 27.624 13.0662C27.6238 15.3643 25.7608 17.2274 23.4626 17.2275H23.4404V23.7251L15.374 19.8132V25.593H9.14307V18.4221H7.92627C6.28911 18.422 4.82296 17.6859 3.8418 16.5303L5.1748 15.3989C5.83767 16.1795 6.82444 16.672 7.92627 16.6721H11.8313V8.03662L23.4404 2.40723V8.90479ZM10.8931 23.843H13.624V18.9639L12.5046 18.4221H10.8931V23.843ZM13.5813 9.13037V16.9985L21.6904 20.9309V5.19971L13.5813 9.13037ZM23.4404 15.4775H23.4626C24.7943 15.4774 25.8738 14.3978 25.874 13.0662C25.8739 11.7344 24.7944 10.6549 23.4626 10.6548H23.4404V15.4775Z" fill="var(--color-orange-400, #f57e56)" />
      <path d="M0.382812 9.44005C1.89379 9.44005 2.8244 9.77448 3.38879 10.3388C3.95308 10.9032 4.28751 11.8338 4.28751 13.3448H5.66564C5.66564 11.8338 6.00007 10.9032 6.56436 10.3388C7.12875 9.77448 8.05936 9.44005 9.57034 9.44005V8.06193C8.05936 8.06193 7.12875 7.7275 6.56436 7.1632C6.00007 6.59881 5.66564 5.66821 5.66564 4.15723H4.28751C4.28751 5.66821 3.95308 6.59881 3.38879 7.1632C2.8244 7.7275 1.89379 8.06193 0.382812 8.06193V9.44005Z" fill="var(--color-orange-600, #a03722)" />
    </svg>
  );
}

/** stack/front-desk (017 §3.7 cell 3) — blue two-tone, 32-grid. */
export function IconStackFrontDesk({ size = 32, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M26.3125 24.125V26H3.8125V24.125H26.3125Z" fill="var(--color-blue-400, #3393ff)" />
      <path d="M14.125 20.6875H16V25.063H14.125V20.6875Z" fill="var(--color-blue-400, #3393ff)" />
      <path d="M18.8125 6V7.875H11.3125V6H18.8125Z" fill="var(--color-blue-400, #3393ff)" />
      <path d="M16 7.25V11.312H15.0625C9.73234 11.312 6.11703 15.2209 5.72559 20.375H26.3125V22.25H3.8125V21.3125C3.8125 15.1418 7.81293 9.94446 14.125 9.4751V7.25H16Z" fill="var(--color-blue-400, #3393ff)" />
      <path d="M18.1875 13.625C19.8321 13.625 20.845 13.989 21.4593 14.6032C22.0735 15.2175 22.4375 16.2304 22.4375 17.875H23.9375C23.9375 16.2304 24.3015 15.2175 24.9157 14.6032C25.53 13.989 26.5429 13.625 28.1875 13.625V12.125C26.5429 12.125 25.53 11.761 24.9157 11.1468C24.3015 10.5325 23.9375 9.51958 23.9375 7.87497H22.4375C22.4375 9.51958 22.0735 10.5325 21.4593 11.1468C20.845 11.761 19.8321 12.125 18.1875 12.125V13.625Z" fill="var(--color-blue-700, #24509e)" />
    </svg>
  );
}

/** stack/content (017 §3.7 cell 4) — yellow two-tone, 28-grid. */
export function IconStackContent({ size = 28, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.4688 8.9021C12.4687 7.35304 11.2401 6.125 9.7583 6.125H1.96875V22.0271H9.7583C10.81 22.0271 11.7318 22.2586 12.4688 22.7295V8.9021ZM14.2188 22.7295C14.9557 22.2586 15.8775 22.0271 16.9292 22.0271H24.7188V12.25H26.4688V23.7771H16.9292C15.8937 23.7771 15.2432 24.0634 14.8528 24.4453C14.4639 24.8259 14.2188 25.4134 14.2188 26.25H12.4688C12.4688 25.4134 12.2236 24.8259 11.8347 24.4453C11.4443 24.0634 10.7938 23.7771 9.7583 23.7771H0.21875V4.375H9.7583C11.2364 4.375 12.5339 5.10403 13.3438 6.21729C14.1536 5.10403 15.4511 4.375 16.9292 4.375V6.125C15.4474 6.125 14.2188 7.35304 14.2188 8.9021V22.7295Z" fill="var(--color-yellow-400, #f5b83d)" />
      <path d="M24.0313 1.75C24.0313 3.19262 24.3508 4.0893 24.8965 4.63519C25.4424 5.18106 26.3388 5.50036 27.7817 5.50037V6.75006C26.3389 6.75007 25.4424 7.06937 24.8965 7.61523C24.3507 8.16112 24.0313 9.05767 24.0313 10.5004H22.7816C22.7816 9.05767 22.4622 8.16112 21.9164 7.61523C21.3705 7.0695 20.4738 6.75006 19.0312 6.75006V5.50037C20.474 5.50037 21.3706 5.18106 21.9164 4.63519C22.4622 4.08932 22.7816 3.1928 22.7816 1.75H24.0313Z" fill="var(--color-yellow-700, #70531a)" />
    </svg>
  );
}

/** stack/reviews (017 §3.7 cell 5) — pink two-tone, 26-grid. */
export function IconStackReviews({ size = 26, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7163 6.29541C13.7163 7.94412 14.0815 8.9689 14.7051 9.59277C15.3289 10.2166 16.3535 10.5815 18.0024 10.5815V12.0098C16.3535 12.0098 15.3289 12.3747 14.7051 12.9985C14.0813 13.6224 13.7163 14.647 13.7163 16.2959H12.2881C12.2881 14.647 11.9231 13.6224 11.2993 12.9985C10.6754 12.3748 9.65062 12.0098 8.00195 12.0098V10.5815C9.65086 10.5815 10.6754 10.2166 11.2993 9.59277C11.9231 8.96892 12.2881 7.94432 12.2881 6.29541H13.7163Z" fill="var(--color-pink-700, #783551)" />
      <path fillRule="evenodd" clipRule="evenodd" d="M24.25 21.2954H17.1089L12.9941 24.7041L8.92773 21.2954H1.75V1.2959H24.25V21.2954ZM3.625 19.4204H9.61035L9.87109 19.6401L13 22.2622L16.1714 19.6357L16.4321 19.4204H22.375V3.1709H3.625V19.4204Z" fill="var(--color-pink-400, #f38bb0)" />
    </svg>
  );
}

/** stack/reporting (017 §3.7 cell 6) — purple two-tone, 30-grid. */
export function IconStackReporting({ size = 30, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5141 21.25H17.5146V19.375H24.3891V26.2495H22.5141V21.25Z" fill="var(--color-purple-400, #9c69ea)" />
      <path d="M4.375 3.75H6.25V8.74951H11.2495V10.6245H4.375V3.75Z" fill="var(--color-purple-400, #9c69ea)" />
      <path d="M3.125 15V14.0625H5V15C5 20.1776 9.19733 24.375 14.375 24.375C17.4221 24.375 20.1932 22.9226 21.9219 20.6777L22.4946 19.9351L23.98 21.0791L23.4087 21.8218C21.3346 24.5153 18.0194 26.25 14.375 26.25C8.16179 26.25 3.125 21.2131 3.125 15Z" fill="var(--color-purple-400, #9c69ea)" />
      <path d="M15.3116 3.75V5.625H14.3742C11.3273 5.62519 8.55573 7.07751 6.82728 9.32227L6.25599 10.0649L4.76917 8.9209L5.34192 8.17822C7.41582 5.48485 10.7301 3.75019 14.3742 3.75H15.3116Z" fill="var(--color-purple-400, #9c69ea)" />
      <path d="M16.874 10.75C18.5186 10.75 19.5315 11.114 20.1458 11.7282C20.76 12.3425 21.124 13.3554 21.124 15H22.6241C22.6241 13.3554 22.9881 12.3425 23.6023 11.7282C24.2166 11.114 25.2295 10.75 26.8741 10.75V9.24997C25.2295 9.24997 24.2166 8.88597 23.6023 8.27177C22.9881 7.65746 22.6241 6.64456 22.6241 4.99995H21.124C21.124 6.64456 20.76 7.65746 20.1458 8.27177C19.5315 8.88597 18.5186 9.24997 16.874 9.24997V10.75Z" fill="var(--color-purple-700, #4f2573)" />
    </svg>
  );
}

/** icons/system-intersect (799:60946) — the system diagram's drawn
 * five-circle boolean (spec 019 §7), exported verbatim through the
 * bridge 2026-09-05 and normalized to currentColor. The viewBox is the
 * export's rendered bounds (26.64 × 25.91); the mount binds text/050
 * and sizes the box as ratios of the ring diameter, so one export
 * scales with R at every band. */
export function IconSystemIntersect({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26.6445 25.9062" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3223 0C15.7186 1.28047 18.0561 2.73965 20.3164 4.38184C22.5764 6.0238 24.6864 7.79561 26.6445 9.67871C26.1673 12.3533 25.5029 15.0277 24.6396 17.6846C23.7764 20.3415 22.7426 22.8956 21.5566 25.3398C18.8656 25.7124 16.1168 25.9062 13.3232 25.9062C10.5292 25.9062 7.78034 25.7125 5.08887 25.3398C3.90306 22.8958 2.87102 20.3412 2.00781 17.6846C1.14434 15.0271 0.477298 12.3529 0 9.67773C1.95797 7.79478 4.06833 6.02369 6.32812 4.38184C8.58833 2.7397 10.926 1.28044 13.3223 0Z" fill="currentColor" />
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
