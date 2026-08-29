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
