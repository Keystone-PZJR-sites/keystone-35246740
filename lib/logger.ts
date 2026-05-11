/**
 * Central logger.
 *
 * Default state: **enabled** (logs reach the console in both development and
 * production) so that motion / pin / animation diagnostics stay visible while
 * we iterate. A single switch turns the firehose off when we want a clean
 * console — see "Disabling" below.
 *
 * Why a wrapper around `console.log`
 * ──────────────────────────────────
 * Raw `console.log` is forbidden in production code. Going through this
 * module instead means:
 *   - We have *one* knob to silence every log on the site.
 *   - Channel-coloured output is consistent everywhere.
 *   - Numeric details are auto-formatted to 4 decimals at every call site.
 *   - We can later swap the implementation for a real logger (Sentry breadcrumb,
 *     Datadog browser RUM, etc.) without touching any call site.
 *
 * Disabling
 * ─────────
 * 1. Build-time (production silence):
 *      set `NEXT_PUBLIC_LOGGING_DISABLED=1` in `.env.production` (or
 *      `.env.local`) before `next build`. The bundler inlines the flag and
 *      tree-shakes the call sites entirely — zero runtime cost.
 *
 * 2. Runtime (silence a live tab without rebuilding):
 *      `window.__loggingDisabled = true` from the browser console.
 *      Re-enable with `window.__loggingDisabled = false`.
 *
 * Channels
 * ────────
 * A "channel" is just a string tag (`'hero-pin'`, `'work-pin'`,
 * `'social-proof-modal'`, …) that prefixes every log line and chooses its
 * colour. To add a new channel, either:
 *   - register it in `CHANNEL_COLORS` below for a recognisable accent, or
 *   - just call `log('whatever', 'EVENT', { … })` and accept the gray default.
 */

const BUILD_DISABLED = process.env.NEXT_PUBLIC_LOGGING_DISABLED === '1';

interface LoggingWindow extends Window {
  __loggingDisabled?: boolean;
}

function isEnabled(): boolean {
  if (BUILD_DISABLED) return false;
  if (typeof window === 'undefined') return true;
  return (window as LoggingWindow).__loggingDisabled !== true;
}

/**
 * Channel → accent colour. Registered channels paint with a recognisable hue;
 * unregistered channels fall through to gray. Keep this list in alphabetical
 * order within each group so additions don't drift.
 */
export const CHANNEL_COLORS: Record<string, string> = {
  // Section pins (desktop)
  'every-channel-pin':   '#9febd7',
  'hero-pin':            '#6ecc8b',
  'pricing-pin':         '#399587',
  'product-screens-pin': '#4fafa0',
  'social-proof-pin':    '#ffbb8a',
  'value-props-pin':     '#e0a733',
  'work-pin':            '#f57e56',

  // Section pins (mobile)
  'mobile-every-channel-pin':   '#7ed9c6',
  'mobile-hero-pin':            '#f0eee6',
  'mobile-pricing-pin':         '#80d4ff',
  'mobile-product-screens-pin': '#3a9085',
  'mobile-social-proof-pin':    '#ffd580',
  'mobile-value-props-pin':     '#4fafa0',
};

function formatDetail(detail: Record<string, unknown>): string {
  return Object.entries(detail)
    .map(([k, v]) => `${k}=${typeof v === 'number' ? v.toFixed(4) : v}`)
    .join('  ');
}

/**
 * Log a structured event on a channel. Silent when the global switch is off.
 * `detail` is rendered as `key=value` pairs with numbers truncated to 4 dp.
 */
export function log(
  channel: string,
  event: string,
  detail: Record<string, unknown> = {},
): void {
  if (!isEnabled()) return;
  const color = CHANNEL_COLORS[channel] ?? '#aaa';
  const detailStr = formatDetail(detail);
  console.log(
    `%c[${channel}] %c${event}%c ${detailStr}`,
    `color:${color}; font-weight:bold`,
    'color:#fff; font-weight:bold',
    'color:#999; font-weight:normal',
  );
}

/** Warning channel — always reaches the console regardless of the global flag,
 *  because warnings are for things developers must see when they happen. */
export function warn(channel: string, event: string, detail: Record<string, unknown> = {}): void {
  const color = CHANNEL_COLORS[channel] ?? '#aaa';
  console.warn(
    `%c[${channel}] %c${event}%c ${formatDetail(detail)}`,
    `color:${color}; font-weight:bold`,
    'color:#f5a623; font-weight:bold',
    'color:#999; font-weight:normal',
  );
}

/** Error channel — same rationale as `warn`, never silenced. */
export function error(channel: string, event: string, detail: Record<string, unknown> = {}): void {
  const color = CHANNEL_COLORS[channel] ?? '#aaa';
  console.error(
    `%c[${channel}] %c${event}%c ${formatDetail(detail)}`,
    `color:${color}; font-weight:bold`,
    'color:#e94e4e; font-weight:bold',
    'color:#999; font-weight:normal',
  );
}
