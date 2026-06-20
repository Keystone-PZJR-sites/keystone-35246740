'use client';

// Presentation kit for the /styles catalog.
// Route-local helpers, each built from design-system primitives so the
// catalog dogfoods the system. No prose / narrative — labels and values only.

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Heading, Text } from '@/design-system/primitives';
import type {
  ColorToken,
  ColorFamily,
  ScaleToken,
  StatusColor,
  TypeStep,
} from '@/design-system/tokens/catalog';

/** Top of every panel: the panel title + an optional one-line meta. */
export function PanelHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <header className="mb-8 flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--color-border-tertiary)] pb-4">
      <Heading level={2} size="lg" font="body">
        {title}
      </Heading>
      {meta ? (
        <Text variant="caption" tone="quaternary" className="font-mono uppercase tracking-wide">
          {meta}
        </Text>
      ) : null}
    </header>
  );
}

/** A labeled block within a panel. */
export function Group({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12 last:mb-0">
      <div className="mb-4">
        <Heading level={3} size="sm" font="body">
          {label}
        </Heading>
        {note ? (
          <Text variant="small" tone="quaternary" className="mt-1">
            {note}
          </Text>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/** A single color swatch tile: chip + token name + value + role. */
export function Swatch({ token, themeScoped }: { token: ColorToken; themeScoped?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-[var(--color-border-tertiary)] bg-[var(--color-surface-card)]">
      <div className="h-16 w-full" style={{ backgroundColor: `var(--${token.variable})` }} />
      <figcaption className="p-3">
        <Text variant="small" className="font-mono font-medium">
          --{token.variable}
        </Text>
        <Text variant="caption" tone="quaternary" className="mt-0.5 font-mono">
          {token.value}
          {themeScoped ? ' · themed' : ''}
        </Text>
        <Text variant="caption" tone="tertiary" className="mt-1.5">
          {token.role}
        </Text>
      </figcaption>
    </figure>
  );
}

export function SwatchGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{children}</div>;
}

/** A palette ramp: real token steps, light → dark, labelled beneath each cell. */
export function Ramp({ family }: { family: ColorFamily }) {
  return (
    <div className="flex gap-2">
      {family.steps.map((step) => (
        <div key={step.variable} className="min-w-0 flex-1">
          <div
            className="h-16 rounded-md border border-[var(--color-border-tertiary)]"
            style={{ backgroundColor: `var(--${step.variable})` }}
            title={`--${step.variable}`}
          />
          <Text variant="caption" tone="tertiary" className="mt-1.5 block truncate">
            {step.step}
          </Text>
          <Text variant="caption" tone="quaternary" className="block truncate font-mono">
            {step.value}
          </Text>
        </div>
      ))}
    </div>
  );
}

/** Semantic status row: tint / border / text / solid for one status. */
export function StatusRow({ status }: { status: StatusColor }) {
  const cells: Array<{ key: string; value: string }> = [
    { key: 'bg', value: status.bg },
    { key: 'border', value: status.border },
    { key: 'text', value: status.text },
    { key: 'solid', value: status.solid },
  ];
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[var(--color-border-tertiary)] bg-[var(--color-surface-card)] p-4">
      <Text variant="small" className="font-medium capitalize">
        {status.name}
      </Text>
      <div className="grid grid-cols-4 gap-2">
        {cells.map((cell) => (
          <div key={cell.key}>
            <div
              className="h-10 w-full rounded-md border border-[var(--color-border-tertiary)]"
              style={{ backgroundColor: cell.value }}
            />
            <Text variant="caption" tone="quaternary" className="mt-1">
              {cell.key}
            </Text>
            <Text variant="caption" tone="tertiary" className="block font-mono">
              {cell.value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A token reference table (name · variable · value · note). */
export function SpecTable({ tokens }: { tokens: ScaleToken[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border-tertiary)] bg-[var(--color-surface-card)]">
      {tokens.map((token) => (
        <div
          key={token.variable}
          className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border-tertiary)] px-4 py-2.5 last:border-b-0"
        >
          <Text variant="small" className="min-w-[96px] font-medium">
            {token.name}
          </Text>
          <div className="flex flex-1 items-baseline justify-end gap-4 text-right">
            {token.note ? (
              <Text variant="caption" tone="quaternary" className="hidden sm:block">
                {token.note}
              </Text>
            ) : null}
            <Text variant="caption" tone="tertiary" className="hidden font-mono md:block">
              --{token.variable}
            </Text>
            <Text variant="small" tone="secondary" className="min-w-[64px] font-mono">
              {token.value}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}

/** One row of the type scale: live specimen + its spec. */
export function TypeRow({ step }: { step: TypeStep }) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--color-border-tertiary)] py-6 last:border-b-0 md:flex-row md:items-baseline md:justify-between md:gap-8">
      <div
        className="min-w-0 flex-1 truncate text-[var(--color-text-primary)]"
        style={{
          fontFamily: `var(--${step.fontVar})`,
          fontSize: `var(--${step.sizeToken})`,
          lineHeight: step.lineHeight,
        }}
      >
        {step.name}
      </div>
      <div className="flex shrink-0 flex-col gap-0.5 md:items-end md:text-right">
        <Text variant="small" className="font-medium">
          {step.name}
        </Text>
        <Text variant="caption" tone="quaternary" className="font-mono">
          {step.primitive}
        </Text>
        <Text variant="caption" tone="tertiary" className="font-mono">
          {step.size} / {step.lineHeight}
        </Text>
      </div>
    </div>
  );
}

// Device presets for the PreviewFrame toggle. All four are fixed logical
// widths scaled down to fit the catalog column, so each component is inspected
// at a real device viewport. The two web widths bracket the desktop nav's
// fluid band (narrow ≈ just above the mobile cutoff, wide ≈ the band ceiling).
export type PreviewDevice = 'phone' | 'tablet' | 'narrow-web' | 'wide-web';
const DEVICE_WIDTH: Record<PreviewDevice, number> = {
  phone: 390,
  tablet: 834,
  'narrow-web': 1000,
  'wide-web': 1600,
};
const DEVICES: { id: PreviewDevice; label: string }[] = [
  { id: 'phone', label: 'Phone' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'narrow-web', label: 'Narrow web' },
  { id: 'wide-web', label: 'Wide web' },
];

/**
 * The universal preview surface for every catalog component. Renders its
 * children inside an iframe — a real nested viewport — so `vw`, media queries,
 * and `position: fixed` all resolve to the frame rather than the page. A
 * phone / tablet / narrow-web / wide-web toggle switches the logical viewport
 * width; each width is scaled down to fit the catalog column.
 *
 * The page's own stylesheets (Tailwind, the design system, @font-face) are
 * cloned into the frame, and the children are portaled into its body so they
 * stay live React (events, state, and context all carry across the portal).
 */
export function PreviewFrame({
  children,
  title,
  surface = 'cream',
  defaultDevice = 'narrow-web',
  padded = true,
  minHeight = 0,
}: {
  children: ReactNode;
  title: string;
  /** Backdrop the component sits on inside the frame. */
  surface?: 'cream' | 'ink';
  /** Device the frame opens on. */
  defaultDevice?: PreviewDevice;
  /** Pad the content (primitives); set false for edge-to-edge chrome. */
  padded?: boolean;
  /** Floor for content that contributes no flow height (a fixed-position bar). */
  minHeight?: number;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [device, setDevice] = useState<PreviewDevice>(defaultDevice);
  const [metrics, setMetrics] = useState({ vw: 0, display: 0, height: Math.max(minHeight, 160) });

  // Initialize the frame's document in a callback ref (fires at commit, when
  // the iframe is in the DOM and its about:blank document is available) rather
  // than via onLoad — a src-less iframe's load can fire before a listener is
  // attached. We clone the page's stylesheets in, theme the body so themed
  // tokens resolve, and expose its body as the portal mount node. Memoized on
  // `surface` so a stable identity doesn't re-init the frame every render.
  const initFrame = useCallback(
    (iframe: HTMLIFrameElement | null) => {
      const doc = iframe?.contentDocument;
      if (!doc) {
        setMountNode(null);
        return;
      }
      document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
        doc.head.appendChild(node.cloneNode(true));
      });
      doc.body.style.margin = '0';
      doc.body.style.background = surface === 'ink' ? 'var(--color-hero-bg)' : 'var(--color-bg-primary)';
      doc.body.setAttribute('data-theme', 'custom');
      setMountNode(doc.body);
    },
    [surface],
  );

  useLayoutEffect(() => {
    if (!mountNode) return;
    const measure = () => {
      // Use the canvas content-box width (clientWidth includes the padding),
      // so a scaled frame fits inside the padded area instead of overflowing
      // it and getting clipped by the outer overflow-hidden.
      const el = canvasRef.current;
      let canvasW = 0;
      if (el) {
        const cs = getComputedStyle(el);
        canvasW = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      }
      const vw = DEVICE_WIDTH[device];
      // Measure the portaled content wrapper, not the iframe body: cloned global
      // CSS couples the body/html height to the iframe's own height, so the
      // body's scrollHeight reports the frame height (not the content) once it
      // fits and could never shrink back. The wrapper is a normal in-flow block,
      // so its scrollHeight is always the true content height.
      const content = contentRef.current ?? mountNode;
      setMetrics({ vw, display: Math.min(canvasW, vw), height: Math.max(content.scrollHeight, minHeight) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(contentRef.current ?? mountNode);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [mountNode, device, minHeight]);

  const scale = metrics.vw ? metrics.display / metrics.vw : 1;

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border-tertiary)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border-tertiary)] bg-[var(--color-bg-secondary)] px-3 py-2">
        <div className="flex gap-1" role="group" aria-label="Preview device width">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDevice(d.id)}
              aria-pressed={device === d.id}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                device === d.id
                  ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <Text variant="caption" tone="quaternary" className="font-mono">
          {metrics.vw ? `${Math.round(metrics.vw)}px` : '—'}
        </Text>
      </div>

      <div ref={canvasRef} className="flex justify-center bg-[var(--color-bg-tertiary)] p-4">
        <div
          className="overflow-hidden rounded-lg border border-[var(--color-border-tertiary)]"
          style={{ width: metrics.display || '100%', height: metrics.height * scale }}
        >
          <iframe
            ref={initFrame}
            title={title}
            style={{
              width: metrics.vw || '100%',
              height: metrics.height,
              border: 0,
              display: 'block',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
          {mountNode
            ? createPortal(
                <div ref={contentRef} className={padded ? 'p-6' : undefined}>
                  {children}
                </div>,
                mountNode,
              )
            : null}
        </div>
      </div>
    </div>
  );
}
