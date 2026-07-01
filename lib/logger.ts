/**
 * Backward-compatible app import path that now delegates to the shared
 * bootstrap tracking logger.
 */
export {
  CHANNEL_COLORS,
  log,
  warn,
  error,
  type LogLevel,
  type LogOptions,
} from 'keystone-design-bootstrap/tracking';
