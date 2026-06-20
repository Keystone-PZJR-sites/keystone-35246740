// ============================================================
// Keystone Design System — Primitives barrel
// ============================================================
// The lowest-level building blocks. Pages, components, and
// sections compose from these; they never reach below the token
// layer. Import from '@/design-system/primitives' or the
// top-level '@/design-system' barrel.
// ============================================================

// Typography
export { Text } from './Text';
export type { TextProps, TextTone, TextVariant } from './Text';
export { Heading } from './Heading';
export type { HeadingProps, HeadingLevel, HeadingSize } from './Heading';
export { Eyebrow } from './Eyebrow';
export type { EyebrowProps } from './Eyebrow';

// Surfaces & layout
export { Card } from './Card';
export type { CardProps, CardTone, CardRadius } from './Card';

// Actions
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonTone } from './Button';
export { Link } from './Link';
export type { LinkProps, LinkTone } from './Link';

// Indicators
export { Pill } from './Pill';
export type { PillProps, PillTone } from './Pill';
export { Badge } from './Badge';
export type { BadgeProps, BadgeTone } from './Badge';

// Inputs
export { QuantityStepper } from './QuantityStepper';
export type { QuantityStepperProps } from './QuantityStepper';

// Lead-capture / form primitives (Figma-exact, from spec 008/029)
export { CtaDefault } from './CtaDefault';
export { CtaSecondary } from './CtaSecondary';
export { CloseButton } from './CloseButton';
export { TextInput } from './TextInput';
export { Textfield } from './Textfield';
export { MobileNumberInput } from './MobileNumberInput';

// Brand marks
export { KeystoneMark } from './KeystoneMark';
export { KeystoneWordmark } from './KeystoneWordmark';
export { SocialIcon } from './SocialIcon';
export type { SocialPlatform, SocialIconVariant } from './SocialIcon';
