'use client';

/**
 * WorkShowcase — “mock UI” gallery (Sales/Ads/Social/Web/Content cards per industry).
 *
 * Why so many `eslint-disable @next/next/no-img-element`?
 * Each card is a `ScaledMockCard` (see the ScaledMockCard pattern in
 * `docs/rules/rules.md`): a fixed-pixel mock UI that lives at the design's
 * intrinsic size and is then transformed via CSS `transform: scale()` so the
 * entire layered composition shrinks/grows as one. Inside that scale-transform
 * context:
 *
 *   - `next/image` injects a `position: absolute` wrapper plus its own srcset
 *     and sizes machinery, both of which are tuned for layout-time sizing.
 *     They fight the synthetic `aspect-ratio` of the parent and produce
 *     subpixel jitter when the card scales.
 *   - The assets are explicitly pre-sized, never lazy candidates for srcset,
 *     and many are `.svg`s where srcset would be a no-op anyway.
 *   - LCP for this section is the headline + first card photo; that one image
 *     is loaded with `next/image` (`fetchPriority="high"`) at the section
 *     level. Everything else is decorative chrome inside the mock UI.
 *
 * Every `<img>` below is therefore intentional and falls under the same
 * exemption. `Image` from `next/image` is still imported and used for any
 * non-`ScaledMockCard` photo in this file.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createSectionPin, logSectionEvent } from '@/lib/sectionPin';

gsap.registerPlugin(ScrollTrigger);

// Cards per industry tab — used to map card index ↔ industry index.
const CARDS_PER_INDUSTRY = 5;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WorkIndustry {
  id: string;
  label: string;
  activeColor: string;
  subLabels: string[];
  subLabelsColor: string;
  chipBg: string;
  chipText: string;
}

export interface HeadlinePart {
  text: string;
  oblique?: boolean;
}

export interface SalesMessage {
  side: 'studio' | 'customer';
  text: string;
  timestamp?: string;
}

export interface SalesCardContent {
  messages: SalesMessage[];
}

export interface AdsCardContentStandard {
  variant?: 'standard';
  profileLabel: string;
  photoSrcs: [string, string, string, string];
  caption: string;
  ctaLabel: string;
  avatarDefaultSrc: string;
  avatarFocusedSrc: string;
  threeDotsIconSrc: string;
  linkArrowDefaultSrc: string;
  linkArrowFocusedSrc: string;
}

/** Home & Property: single hero photo, dark green gradient background */
export interface AdsCardContentHome {
  variant: 'home';
  profileLabel: string;
  heroSrc: string;
  caption: string;
  ctaLabel: string;
  avatarDefaultSrc: string;
  avatarFocusedSrc: string;
  threeDotsIconSrc: string;
  linkArrowDefaultSrc: string;
  linkArrowFocusedSrc: string;
}

/**
 * Food & Drink: full-bleed single photo story format.
 * Photo fills the entire 286×594 card. Caption is a centered rounded box
 * (bg #ddcec2) in the middle of the card — not text at the bottom.
 */
export interface AdsCardContentFood {
  variant: 'food';
  heroSrc: string;
  caption: string;
  ctaLabel: string;
  avatarSrc: string;
  threeDotsIconSrc: string;
  linkIconSrc: string;
}

/**
 * Retail & Services: two overlapping photos, gradient background story format.
 */
export interface AdsCardContentRetail {
  variant: 'retail';
  photo1Src: string;
  photo2Src: string;
  ctaLabel: string;
  threeDotsIconSrc: string;
  linkIconSrc: string;
}

/**
 * Care & Maintenance: 3-photo staggered diagonal layout, dark purple gradient background.
 */
export interface AdsCardContentCare {
  variant: 'care';
  profileName: string;
  photo1Src: string;
  photo2Src: string;
  photo3Src: string;
  caption: string;
  ctaLabel: string;
  avatarSrc: string;
  threeDotsIconSrc: string;
  linkIconSrc: string;
}

export type AdsCardContent = AdsCardContentStandard | AdsCardContentHome | AdsCardContentFood | AdsCardContentRetail | AdsCardContentCare;

export interface SocialCardContent {
  profileName: string;
  photoSrc: string;
  photoOverlaySrc: string;
  caption: string;
  /** Provide either avatarEl (custom rendered element) or avatarDefaultSrc + avatarFocusedSrc */
  avatarEl?: React.ReactNode;
  avatarDefaultSrc?: string;
  avatarFocusedSrc?: string;
  heartIconSrc: string;
  heartIconFocusedSrc: string;
  commentIconSrc: string;
  shareIconSrc: string;
  saveIconSrc: string;
}

export interface WebCardContentStandard {
  variant?: 'standard';
  logoSrc: string;
  navLinks: string[];
  buyButtonLabel: string;
  bookButtonLabel: string;
  heroSrc: string;
  heroHeadlineLines: string[];
  bookCtaLabel: string;
  belowFoldHeading: string;
  galleryImageSrcs: [string, string, string];
}

export interface WebCardContentCare {
  variant: 'care';
  /** Optional logo icon rendered to the left of the brand wordmark */
  logoSrc?: string;
  brandName: string;
  navLinks: string[];
  bookButtonLabel: string;
  heroSrc: string;
  services: [
    { title: string; imageSrc: string },
    { title: string; imageSrc: string },
    { title: string; imageSrc: string },
  ];
}

export interface WebCardContentHome {
  variant: 'home';
  /** Right-side hero photo (Fraunces serif layout) */
  heroSrc: string;
}

/**
 * Food & Drink mobile menu page (chip label WEB).
 * 316×583 card showing the Alma Café website's menu page on mobile:
 * lavender header, logo-mark, nav, hero image with "the menu" overlay,
 * category tabs, section heading, and two menu items with prices.
 */
export interface WebCardContentFoodMenu {
  variant: 'food-menu';
  logoMarkSrc: string;
  heroSrc: string;
  sectionHeading: string;
  menuItems: [
    { name: string; price: string; description: string },
    { name: string; price: string; description: string },
  ];
}

export interface WebCardContentFood {
  variant: 'food';
  /** "alma café" wordmark rendered as text with Josefin Slab Bold */
  wordmarkText: string;
  /** Circular brand mark SVG, centered in the nav bar */
  logoMarkSrc: string;
  /** Instagram icon SVG (right side of nav bar) */
  instagramIconSrc: string;
  /** Facebook icon SVG (right side of nav bar) */
  facebookIconSrc: string;
  /** 4 nav links, lowercase, Josefin Slab, centered below logo */
  navLinks: [string, string, string, string];
  /** Full-width hero image */
  heroSrc: string;
}

/**
 * Retail & Services: minimal desktop browser layout.
 * Header: "mEriDIAn" wordmark (Cormorant Garamond serif, Umbira fallback) + DM Mono nav.
 * Hero section with large wordmark overlay and hero photo.
 */
export interface WebCardContentRetail {
  variant: 'retail';
  /** Full-bleed hero image */
  heroSrc: string;
}

export type WebCardContent = WebCardContentStandard | WebCardContentCare | WebCardContentHome | WebCardContentFood | WebCardContentFoodMenu | WebCardContentRetail;

/**
 * Retail & Services: journal page / content article.
 * Shows "The Journal" header, "mEriDIAn" brand text, a list icon, article text, and 2 photos.
 */
export interface ContentCardContentRetail {
  variant: 'retail';
  photo1Src: string;
  photo2Src: string;
  listIconSrc: string;
  articleTitle: string;
  articleBody: string;
}

export type ContentCardContent =
  | { variant?: 'standard'; wordmarkSrc: string; tagLabel: string; headline: string; byline: string; photoSrc: string; bodyParagraphs: [string, string] }
  | ContentCardContentRetail;

export interface ListingsCardContent {
  businessName: string;
  isOpen?: boolean;
  rating: number;
  reviewCount: number;
  category: string;
  descriptionText: string;
  totalReviewsPill: string;
  replyRatePill: string;
  /**
   * Photo grid layout:
   * - 'grid-2x2' (default): symmetric 2×2 grid [top-left, top-right, bottom-left, bottom-right]
   * - 'tall-left': asymmetric — left column one tall 182px image, right column two 90px images
   *   [tall-left, top-right, bottom-right, unused]
   */
  photoLayout?: 'grid-2x2' | 'tall-left';
  photoSrcs: [string, string, string, string];
  /**
   * Pan offset for the MAP 2 composite within its 252×125px clipping container.
   * Each industry shows a different area of the same River North map.
   * Values come directly from Figma: the `left` and `top` of the MAP 2 node.
   * Required for pixel-perfect match — see spec 012 for per-industry values.
   */
  mapOffset?: { left: number; top: number };
  /**
   * When true, applies scaleX(-1) to the MAP 2 composite and mirrors the pin position.
   * Used for Retail & Services and Care & Maintenance to match Figma's flipped map.
   */
  mapFlipped?: boolean;
}

export type WorkCardData =
  | { type: 'sales'; industryId: string; chipLabel: string; content: SalesCardContent }
  | { type: 'ads'; industryId: string; chipLabel: string; content: AdsCardContent }
  | { type: 'social'; industryId: string; chipLabel: string; content: SocialCardContent }
  | { type: 'web'; industryId: string; chipLabel: string; content: WebCardContent }
  | { type: 'content'; industryId: string; chipLabel: string; content: ContentCardContent }
  | { type: 'listings'; industryId: string; chipLabel: string; content: ListingsCardContent };

export interface WorkShowcaseProps {
  headlineParts: HeadlinePart[];
  industries: WorkIndustry[];
  cards: WorkCardData[];
  /** When true: skip GSAP + Embla, render all cards in a static scrollable grid for preview/testing */
  staticPreview?: boolean;
}

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

function Chip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <div
      className="work-chip flex items-center justify-center whitespace-nowrap rounded-full"
      style={{
        backgroundColor: bg,
        paddingTop: '5px',
        paddingBottom: '4px',
        paddingLeft: '12px',
        paddingRight: '12px',
      }}
    >
      <span
        style={{
          fontFamily: "'FK Grotesk Mono', monospace",
          fontSize: '12px',
          lineHeight: '18px',
          color,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared scaled-card shell — wraps every mock outer div so it scales with the
// viewport via CSS transform. Internal px values stay exact inside the scale.
// ---------------------------------------------------------------------------

function ScaledMockCard({
  naturalWidth,
  naturalHeight,
  className = '',
  style = {},
  innerClassName = '',
  innerStyle = {},
  children,
}: {
  naturalWidth: number;
  naturalHeight: number;
  className?: string;
  style?: React.CSSProperties;
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`ws-scale-root ${className}`.trim()}
      style={{
        '--ws-natural-w': `${naturalWidth}px`,
        '--ws-natural-h': `${naturalHeight}px`,
        ...style,
      } as React.CSSProperties}
    >
      <div
        className={`ws-scale-inner ${innerClassName}`.trim()}
        style={innerStyle}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sales card — iPhone chat UI (302 × 638, rounded-[56px])
// ---------------------------------------------------------------------------

function SalesCard({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: SalesCardContent;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      {/* Phone outer — rounded-[56px] per Figma */}
      <ScaledMockCard
        naturalWidth={302}
        naturalHeight={638}
        className="work-sales-outer"
        style={{ borderRadius: '56px' }}
      >
        {/* Dynamic Island */}
        <div
          className="work-sales-island absolute left-1/2 -translate-x-1/2 rounded-[18px]"
          style={{ top: '14px', width: '97.5px', height: '28px' }}
        />

        {/* Messages area */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col"
          style={{ top: '50px', width: '270px', gap: '16px' }}
        >
          {content.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.side === 'customer' ? 'items-end pl-[24px] gap-[4px]' : 'items-start pr-[24px]'}`}
            >
              <div
                className={`work-sales-${msg.side === 'studio' ? 'studio-bubble' : 'customer-bubble'} w-full`}
                style={{
                  borderRadius:
                    msg.side === 'studio'
                      ? '9.437px 9.437px 9.437px 0'
                      : '9.437px 9.437px 0 9.437px',
                  padding: i === 0 ? '8px' : '8px 10px',
                }}
              >
                <p
                  className={`work-sales-${msg.side === 'studio' ? 'studio-text' : 'customer-text'} leading-[1.2] whitespace-pre-wrap`}
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '12px',
                    letterSpacing: '-0.12px',
                  }}
                >
                  {msg.text}
                </p>
              </div>
              {msg.timestamp && (
                <span
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '10px',
                    lineHeight: '11.797px',
                    color: '#989281',
                  }}
                >
                  {msg.timestamp}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Message input bar */}
        <div
          className="absolute flex items-center"
          style={{ top: '572px', left: '16px', gap: '8px', width: '270px' }}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{ width: '34px', height: '34px', backgroundColor: 'rgba(0,0,0,0.06)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1C4.9 1 4 1.9 4 3v4c0 1.1.9 2 2 2s2-.9 2-2V3c0-1.1-.9-2-2-2z" fill="rgba(0,0,0,0.35)" />
              <path d="M2 5.5v1.5C2 9.43 3.79 11 6 11s4-1.57 4-4V5.5" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="6" y1="11" x2="6" y2="12" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div
            className="flex items-center flex-shrink-0"
            style={{
              width: '228px',
              height: '34px',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '9999px',
              paddingLeft: '13px',
              paddingRight: '13px',
            }}
          >
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px', letterSpacing: '-0.12px', color: 'rgba(0,0,0,0.2)', lineHeight: '1.2' }}>
              Message
            </span>
          </div>
        </div>

        {/* Home indicator */}
        <div
          className="work-sales-indicator absolute bottom-[8px] left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: '92px', height: '4px' }}
        />
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ads card — Facebook/Meta story format (286 × 594, rounded-[8px])
// ---------------------------------------------------------------------------

function AdsCardStandard({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: AdsCardContentStandard;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={286}
        naturalHeight={594}
        style={{ borderRadius: '8px', backgroundColor: '#e0ddd1' }}
      >
        {/* Dark gradient overlay — fades in on hover */}
        <div
          className="work-ads-overlay absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #3a3836, #000000)' }}
        />

        {/* Story progress bar */}
        <div
          className="absolute z-[3]"
          style={{
            top: '15px',
            left: '15px',
            right: '16px',
            height: '3.771px',
            borderRadius: '3.771px',
            backgroundColor: 'rgba(255,255,255,0.35)',
          }}
        >
          <div
            style={{
              width: '94.962px',
              height: '100%',
              borderRadius: '3.771px',
              backgroundColor: '#fcfbf8',
            }}
          />
        </div>

        {/* Profile header */}
        <div
          className="absolute z-[3] flex items-center"
          style={{ top: '33.94px', left: '15.09px', width: '235.892px', gap: '6.622px' }}
        >
          {/* Avatar: default/focused swap via CSS opacity */}
          <div className="relative flex-shrink-0" style={{ width: '35px', height: '35px' }}>
            <Image src={content.avatarDefaultSrc} alt="" width={35} height={35} className="work-ads-avatar-default rounded-full" unoptimized />
            <Image src={content.avatarFocusedSrc} alt="" width={35} height={35} className="work-ads-avatar-focused rounded-full absolute inset-0" unoptimized />
          </div>
          <div className="flex flex-col" style={{ gap: '3.771px' }}>
            <span
              className="work-ads-profile-text font-semibold leading-none"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '13.243px',
                letterSpacing: '-0.1324px',
              }}
            >
              {content.profileLabel.split('/')[0]?.trim()}
            </span>
            <span
              className="work-ads-profile-text leading-none"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '10.419px',
                letterSpacing: '-0.1042px',
              }}
            >
              Sponsored
            </span>
          </div>
          {/* Three-dots icon */}
          <div
            className="absolute overflow-hidden"
            style={{ right: '0', top: '5.66px', width: '22.629px', height: '22.629px' }}
          >
            <Image
              src={content.threeDotsIconSrc}
              alt=""
              width={23}
              height={23}
              className="ads-icon-bright h-full w-full"
              unoptimized
            />
          </div>
        </div>

        {/* Staggered 2×2 photo grid — z-[2] keeps them above the dark overlay */}
        {/* Photo 1: top-left */}
        <div
          className="work-img-blend absolute overflow-hidden z-[2]"
          style={{
            top: '99.94px',
            left: '14.14px',
            width: '121.63px',
            height: '126.343px',
            borderRadius: '11.314px',
          }}
        >
          <Image src={content.photoSrcs[0]} alt="" fill className="object-cover" unoptimized />
        </div>
        {/* Photo 2: top-right (offset 22px lower) */}
        <div
          className="work-img-blend absolute overflow-hidden z-[2]"
          style={{
            top: '121.63px',
            left: '147.09px',
            width: '122.57px',
            height: '127.286px',
            borderRadius: '11.314px',
          }}
        >
          <Image src={content.photoSrcs[1]} alt="" fill className="object-cover" unoptimized />
        </div>
        {/* Photo 3: bottom-left */}
        <div
          className="work-img-blend absolute overflow-hidden z-[2]"
          style={{
            top: '240.43px',
            left: '14.14px',
            width: '121.63px',
            height: '127.286px',
            borderRadius: '11.314px',
          }}
        >
          <Image src={content.photoSrcs[2]} alt="" fill className="object-cover" unoptimized />
        </div>
        {/* Photo 4: bottom-right (offset 22px lower) */}
        <div
          className="work-img-blend absolute overflow-hidden z-[2]"
          style={{
            top: '263.06px',
            left: '147.09px',
            width: '122.57px',
            height: '126.343px',
            borderRadius: '11.314px',
          }}
        >
          <Image src={content.photoSrcs[3]} alt="" fill className="object-cover" unoptimized />
        </div>

        {/* Caption */}
        <div
          className="absolute z-[2]"
          style={{ top: '436.54px', left: '22.63px', right: '23.89px' }}
        >
          <p
            className="work-ads-caption font-semibold leading-normal"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12.257px',
            }}
          >
            {content.caption}
          </p>
        </div>

        {/* CTA button */}
        <div
          className="work-ads-cta-bg absolute left-1/2 -translate-x-1/2 z-[2] flex items-center justify-center rounded-full"
          style={{
            bottom: '15.09px',
            height: '30.171px',
            padding: '0 11.314px',
            gap: '7.543px',
          }}
        >
          <div className="relative flex-shrink-0" style={{ width: '15.086px', height: '15.086px' }}>
            <Image src={content.linkArrowDefaultSrc} alt="" fill className="object-contain" unoptimized />
            <Image
              src={content.linkArrowFocusedSrc}
              alt=""
              fill
              className="work-ads-link-focused object-contain absolute inset-0"
              unoptimized
            />
          </div>
          <span
            className="work-ads-cta-text font-semibold leading-normal whitespace-nowrap text-center"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12.257px',
            }}
          >
            {content.ctaLabel}
          </span>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ads card — Home variant: single hero photo, dark green gradient bg
// ---------------------------------------------------------------------------

function AdsCardHome({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: AdsCardContentHome;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={286}
        naturalHeight={594}
        style={{ borderRadius: '8px', background: 'linear-gradient(to bottom, #324822, #152312)' }}
      >
        {/* Story progress bar */}
        <div
          className="absolute z-[3]"
          style={{
            top: '15px',
            left: '15px',
            right: '16px',
            height: '3.771px',
            borderRadius: '3.771px',
            backgroundColor: 'rgba(255,255,255,0.35)',
          }}
        >
          <div
            style={{
              width: '94.962px',
              height: '100%',
              borderRadius: '3.771px',
              backgroundColor: '#fcfbf8',
            }}
          />
        </div>

        {/* Profile header */}
        <div
          className="absolute z-[3] flex items-center"
          style={{ top: '33.94px', left: '15.09px', width: '235.892px', gap: '6.622px' }}
        >
          <div className="relative flex-shrink-0" style={{ width: '35px', height: '35px' }}>
            <Image src={content.avatarDefaultSrc} alt="" width={35} height={35} className="work-ads-avatar-default rounded-full" unoptimized />
            <Image src={content.avatarFocusedSrc} alt="" width={35} height={35} className="work-ads-avatar-focused rounded-full absolute inset-0" unoptimized />
          </div>
          <div className="flex flex-col" style={{ gap: '3.771px' }}>
            <span
              className="work-ads-home-profile-text font-semibold leading-none"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '13.243px', letterSpacing: '-0.1324px' }}
            >
              {content.profileLabel.split('/')[0]?.trim()}
            </span>
            <span
              className="work-ads-home-profile-text leading-none"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '10.419px', letterSpacing: '-0.1042px' }}
            >
              Sponsored
            </span>
          </div>
          <div className="absolute overflow-hidden" style={{ right: '0', top: '5.66px', width: '22.629px', height: '22.629px' }}>
            <Image src={content.threeDotsIconSrc} alt="" width={23} height={23} className="ads-icon-bright h-full w-full" unoptimized />
          </div>
        </div>

        {/* Single hero photo — full width, positioned below header */}
        <div
          className="work-img-blend absolute overflow-hidden"
          style={{ top: '106px', left: '0', width: '286px', height: '241px' }}
        >
          <Image src={content.heroSrc} alt="" fill className="object-cover" unoptimized />
        </div>

        {/* Caption text — below the photo */}
        <div
          className="absolute z-[2]"
          style={{ top: '375px', left: '20px', right: '20px' }}
        >
          <p
            className="work-ads-home-caption font-semibold leading-normal whitespace-pre-wrap"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', color: 'white' }}
          >
            {content.caption}
          </p>
        </div>

        {/* CTA button */}
        <div
          className="work-ads-cta-bg absolute left-1/2 -translate-x-1/2 z-[2] flex items-center justify-center rounded-full"
          style={{ bottom: '15.09px', height: '30.171px', padding: '0 11.314px', gap: '7.543px' }}
        >
          <div className="relative flex-shrink-0" style={{ width: '15.086px', height: '15.086px' }}>
            <Image src={content.linkArrowDefaultSrc} alt="" fill className="object-contain" unoptimized />
            <Image src={content.linkArrowFocusedSrc} alt="" fill className="work-ads-link-focused object-contain absolute inset-0" unoptimized />
          </div>
          <span
            className="work-ads-cta-text font-semibold leading-normal whitespace-nowrap text-center"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12.257px' }}
          >
            {content.ctaLabel}
          </span>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ads card — Food variant (Alma Café)
// Full-bleed single photo story. Caption is a centered rounded box with
// bg #ddcec2 at mid-card, not plain text at the bottom.
// ---------------------------------------------------------------------------

function AdsCardFood({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: AdsCardContentFood;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={286}
        naturalHeight={594}
        style={{ borderRadius: '8px', background: 'linear-gradient(rgb(58,56,54) 0%, rgb(0,0,0) 100%)' }}
      >
        {/* Full-bleed background photo — cropped to center */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            alt=""
            src={content.heroSrc}
            fill
            unoptimized
            className="work-img-blend object-cover object-center"
          />
        </div>

        {/* Story progress bar */}
        <div
          className="absolute z-[3]"
          style={{ top: '16px', left: '16px', right: '16px', height: '4px', borderRadius: '3.771px', backgroundColor: 'rgba(255,255,255,0.35)' }}
        >
          <div style={{ width: '94.749px', height: '100%', borderRadius: '3.771px', backgroundColor: '#fcfbf8' }} />
        </div>

        {/* Profile header */}
        <div
          className="absolute z-[3] flex items-center"
          style={{ top: '34px', left: '16px', width: '232px', gap: '6px' }}
        >
          <div className="relative flex-shrink-0" style={{ width: '36px', height: '36px' }}>
            <Image src={content.avatarSrc} alt="" fill className="rounded-full" unoptimized />
          </div>
          <div className="flex flex-col" style={{ gap: '4px', flex: '1 0 0' }}>
            <span
              className="font-semibold leading-none text-white"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '13px', letterSpacing: '-0.13px' }}
            >
              Alma Café
            </span>
            <span
              className="leading-none text-white"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '10px', letterSpacing: '-0.1px' }}
            >
              Sponsored
            </span>
          </div>
          <div className="absolute" style={{ right: '0', top: '6px', width: '22px', height: '22px' }}>
            <Image src={content.threeDotsIconSrc} alt="" fill className="ads-icon-bright" unoptimized />
          </div>
        </div>

        {/* Caption box — centered, mid-card */}
        <div
          className="absolute z-[3] left-1/2 -translate-x-1/2 flex items-center justify-center rounded-[8px]"
          style={{ top: '282px', padding: '8px', backgroundColor: '#ddcec2' }}
        >
          <span
            className="font-semibold text-center leading-normal"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', color: '#8a7050', whiteSpace: 'nowrap' }}
          >
            {content.caption}
          </span>
        </div>

        {/* CTA button */}
        <div
          className="work-ads-cta-bg absolute left-1/2 -translate-x-1/2 z-[3] flex items-center justify-center rounded-[9px]"
          style={{ bottom: '23px', height: '30px', width: '112px', gap: '7px', padding: '0 11px' }}
        >
          <div className="relative flex-shrink-0" style={{ width: '16px', height: '16px' }}>
            <Image src={content.linkIconSrc} alt="" fill className="work-ads-link-focused object-contain" unoptimized />
          </div>
          <span
            className="work-ads-cta-text font-semibold leading-normal whitespace-nowrap text-center"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '13px' }}
          >
            {content.ctaLabel}
          </span>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meridian avatar badge — used in Retail ADS and SOCIAL cards.
// Renders the circular "mEriDIAn" letter badge with DM Mono Light as fallback
// for the proprietary Umbira font. Each letter is positioned and rotated to
// match the Figma design exactly.
// ---------------------------------------------------------------------------

export function MeridianAvatar() {
  const letters = [
    { char: 'm', left: 9,    top: 8,    rotate: -19.52 },
    { char: 'E', left: 26,   top: 3,    rotate: -29.4  },
    { char: 'A', left: 15,   top: 27,   rotate: -10.04 },
    { char: 'N', left: 25,   top: 20,   rotate: -43.79 },
    { char: 'i', left: -4,   top: 4,    rotate: -55.43 },
    { char: 'd', left: -5,   top: 17,   rotate:  54.18 },
    { char: 'I', left: 5,    top: 27,   rotate:  24.8  },
    { char: 'r', left: 7.19, top: -2,   rotate:  70.87 },
  ];
  return (
    <div
      className="relative overflow-hidden rounded-full"
      style={{ width: '36px', height: '36px', background: 'white' }}
    >
      {letters.map(({ char, left, top, rotate }) => (
        <div
          key={`${char}-${left}`}
          className="absolute flex items-center justify-center"
          style={{ left: `${left}px`, top: `${top}px`, transform: `rotate(${rotate}deg)` }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', 'Courier New', monospace",
              fontWeight: 300,
              fontSize: '13px',
              lineHeight: '13.714px',
              color: 'black',
              whiteSpace: 'nowrap',
            }}
          >
            {char}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ads card — Retail variant (Meridian): two overlapping product photos,
// light grey-blue gradient background, "Shop Now" CTA.
// ---------------------------------------------------------------------------

function AdsCardRetail({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: AdsCardContentRetail;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={286}
        naturalHeight={594}
        style={{ borderRadius: '8px', background: 'linear-gradient(to bottom, #d3d7d3, #a8b4c4)' }}
      >
        {/* Story progress bar */}
        <div
          className="absolute z-[3]"
          style={{ top: '16px', left: '16px', right: '16px', height: '4px', borderRadius: '3.771px', backgroundColor: 'rgba(255,255,255,0.35)' }}
        >
          <div style={{ width: '94.749px', height: '100%', borderRadius: '3.771px', backgroundColor: '#fcfbf8' }} />
        </div>

        {/* Profile header */}
        <div
          className="absolute z-[3] flex items-center"
          style={{ top: '34px', left: '16px', width: '232px', gap: '6px' }}
        >
          <div className="relative flex-shrink-0" style={{ width: '36px', height: '36px' }}>
            <MeridianAvatar />
          </div>
          <div className="flex flex-col" style={{ gap: '4px', flex: '1 0 0' }}>
            <span
              className="font-semibold leading-none text-white"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '13px', letterSpacing: '-0.13px' }}
            >
              Meridian
            </span>
            <span
              className="leading-none text-white"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '10px', letterSpacing: '-0.1px' }}
            >
              Sponsored
            </span>
          </div>
          <div className="absolute" style={{ right: '0', top: '6px', width: '22px', height: '22px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={content.threeDotsIconSrc} className="absolute inset-0 w-full h-full block" />
          </div>
        </div>

        {/* Photo 1 — tall left, behind photo 2 */}
        <div
          className="work-img-blend absolute overflow-hidden"
          style={{ height: '312px', left: '16px', top: '105px', width: '208px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={content.photo1Src} className="absolute inset-0 w-full h-full object-cover block" />
        </div>

        {/* Photo 2 — smaller, overlapping on top-right */}
        <div
          className="work-img-blend absolute overflow-hidden"
          style={{ height: '182px', left: '153px', top: '171px', width: '121px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={content.photo2Src} className="absolute inset-0 w-full h-full object-cover block" />
        </div>

        {/* Chevron icon above CTA (expand_less / chevron-up) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[3] flex items-center justify-center overflow-hidden"
          style={{ bottom: '63px', width: '16px', height: '16px' }}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10L8 6L12 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* "Shop Now" CTA */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[3] flex items-center justify-center rounded-full"
          style={{ top: '538px', height: '32px', padding: '0 12px', backgroundColor: '#fcfbf8' }}
        >
          <span
            className="font-semibold text-black leading-none whitespace-nowrap"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '13px' }}
          >
            {content.ctaLabel}
          </span>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ads card — Care variant (Good Dog Grooming): 3 staggered photos on a
// dark purple gradient background, caption text, "Book Now" CTA.
// ---------------------------------------------------------------------------

function AdsCardCare({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: AdsCardContentCare;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={286}
        naturalHeight={594}
        style={{ borderRadius: '8px', background: 'linear-gradient(to bottom, #352745, #382355)' }}
      >
        {/* Story progress bar */}
        <div
          className="absolute z-[3]"
          style={{ top: '16px', left: '16px', right: '16px', height: '4px', borderRadius: '3.771px', backgroundColor: 'rgba(255,255,255,0.35)' }}
        >
          <div style={{ width: '94.749px', height: '100%', borderRadius: '3.771px', backgroundColor: '#fcfbf8' }} />
        </div>

        {/* Profile header */}
        <div
          className="absolute z-[3] flex items-center"
          style={{ top: '34px', left: '16px', width: '232px', gap: '6px' }}
        >
          <div className="relative flex-shrink-0 overflow-hidden rounded-full" style={{ width: '36px', height: '36px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={content.avatarSrc} className="absolute inset-0 w-full h-full block" />
          </div>
          <div className="flex flex-col" style={{ gap: '4px', flex: '1 0 0' }}>
            <span
              className="font-semibold leading-none text-white"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '13px', letterSpacing: '-0.13px' }}
            >
              {content.profileName}
            </span>
            <span
              className="leading-none text-white"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '10px', letterSpacing: '-0.1px' }}
            >
              Sponsored
            </span>
          </div>
          <div className="absolute" style={{ right: '0', top: '6px', width: '22px', height: '22px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={content.threeDotsIconSrc} className="absolute inset-0 w-full h-full block" />
          </div>
        </div>

        {/* Photo 1 — left column, top */}
        <div
          className="work-img-blend absolute overflow-hidden"
          style={{ height: '126px', left: '16.5px', top: '100px', width: '120px', borderRadius: '11.314px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={content.photo1Src} className="absolute inset-0 w-full h-full object-cover block" />
        </div>

        {/* Photo 2 — right column, middle */}
        <div
          className="work-img-blend absolute overflow-hidden"
          style={{ height: '126px', left: '150.5px', top: '163px', width: '120px', borderRadius: '11.314px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={content.photo2Src} className="absolute inset-0 w-full h-full object-cover block" />
        </div>

        {/* Photo 3 — left column, bottom */}
        <div
          className="work-img-blend absolute overflow-hidden"
          style={{ height: '126px', left: '16.5px', top: '240px', width: '120px', borderRadius: '11.314px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={content.photo3Src} className="absolute inset-0 w-full h-full object-cover block" />
        </div>

        {/* Caption text */}
        <p
          className="absolute z-[3] font-semibold text-white text-center whitespace-nowrap"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '20px',
            lineHeight: 'normal',
            left: '70.5px',
            top: '412px',
          }}
        >
          {content.caption}
        </p>

        {/* "Book Now" CTA */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[3] flex items-center justify-center rounded-[9px] bg-white"
          style={{ bottom: '23px', height: '30px', width: '112px', gap: '7.543px', padding: '0 11.314px' }}
        >
          <div className="relative flex-shrink-0" style={{ width: '16px', height: '16px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={content.linkIconSrc} className="absolute inset-0 w-full h-full block" />
          </div>
          <span
            className="font-semibold text-center whitespace-nowrap"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '13px', color: '#242323' }}
          >
            {content.ctaLabel}
          </span>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ads card dispatcher
// ---------------------------------------------------------------------------

function AdsCard({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: AdsCardContent;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  if (content.variant === 'home') {
    return <AdsCardHome content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }
  if (content.variant === 'food') {
    return <AdsCardFood content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }
  if (content.variant === 'retail') {
    return <AdsCardRetail content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }
  if (content.variant === 'care') {
    return <AdsCardCare content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }
  return <AdsCardStandard content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
}

// ---------------------------------------------------------------------------
// Social card — Instagram post format (292 × 424, rounded-[8px])
// ---------------------------------------------------------------------------

function SocialCard({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: SocialCardContent;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={292}
        naturalHeight={424}
        className="work-social-outer"
        style={{ borderRadius: '8px', backdropFilter: 'blur(5.267px)' }}
        innerClassName="flex flex-col"
        innerStyle={{ padding: '17.557px 21.068px', gap: '10.534px' }}
      >
        {/* Profile header */}
        <div
          className="flex items-center flex-shrink-0"
          style={{ width: '250px', gap: '7.023px' }}
        >
          {/* Avatar: default/focused swap via CSS opacity */}
          <div className="relative flex-shrink-0" style={{ width: '36px', height: '36px' }}>
            {content.avatarEl ? (
              <div className="absolute inset-0">{content.avatarEl}</div>
            ) : content.avatarDefaultSrc ? (
              <>
                <Image src={content.avatarDefaultSrc} alt="" width={36} height={36} className="work-social-avatar-default rounded-full" unoptimized />
                <Image src={content.avatarFocusedSrc ?? content.avatarDefaultSrc} alt="" width={36} height={36} className="work-social-avatar-focused rounded-full absolute inset-0" unoptimized />
              </>
            ) : null}
          </div>
          <span
            className="work-social-profile-name font-semibold leading-none"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '14.046px',
              letterSpacing: '-0.1405px',
            }}
          >
            {content.profileName}
          </span>
        </div>

        {/* Photo composite — two layers at opacity-0.8 via CSS, mix-blend-luminosity via CSS */}
        <div
          className="work-img-blend relative flex-shrink-0 overflow-hidden"
          style={{ width: '250px', height: '250px', borderRadius: '7.023px' }}
        >
          {/* Base layer */}
          <Image
            src={content.photoSrc}
            alt=""
            fill
            className="work-social-photo-img object-cover"
            unoptimized
          />
          {/* Detail overlay */}
          <Image
            src={content.photoOverlaySrc}
            alt=""
            fill
            className="work-social-photo-img object-cover"
            unoptimized
          />
        </div>

        {/* Engagement icons */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{ width: '250.188px', height: '20.191px' }}
        >
          {/* Heart icon: gray default → pink focused (both fill, stacked) */}
          <div className="absolute" style={{ left: '0', top: '0', width: '20.147px', height: '20.147px' }}>
            <Image src={content.heartIconSrc} alt="Like" fill className="work-social-heart-default" unoptimized />
            <Image src={content.heartIconFocusedSrc} alt="" fill className="work-social-heart-focused" unoptimized />
          </div>
          <div className="absolute" style={{ left: '33.57px', top: '0', width: '20.101px', height: '20.101px' }}>
            <Image src={content.commentIconSrc} alt="Comment" fill unoptimized />
          </div>
          <div className="absolute" style={{ left: '67.11px', top: '0', width: '20.45px', height: '20.45px' }}>
            <Image src={content.shareIconSrc} alt="Share" fill unoptimized />
          </div>
          <div className="absolute" style={{ left: '230.12px', top: '0.23px', width: '21.596px', height: '21.596px' }}>
            <Image src={content.saveIconSrc} alt="Save" fill unoptimized />
          </div>
        </div>

        {/* Caption */}
        <p
          className="work-social-caption leading-[1.2] flex-shrink-0"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '14.046px',
            width: '250.188px',
          }}
        >
          {content.caption}
        </p>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Web card — studio website mock (868 × 583, rounded-[16px])
// ---------------------------------------------------------------------------

function WebCardStandard({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: WebCardContentStandard;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      {/* Outer wrapper: rounded-[16px], p-[7px] */}
      <ScaledMockCard
        naturalWidth={868}
        naturalHeight={583}
        className="work-web-outer"
        style={{ borderRadius: '16px', backdropFilter: 'blur(12.024px)' }}
        innerStyle={{ padding: '7px' }}
      >
        {/* Inner card */}
        <div
          className="work-web-inner relative overflow-hidden"
          style={{ height: '569px', borderRadius: '10px' }}
        >
          {/* Logo */}
          <div className="absolute" style={{ left: '24px', top: '24px', width: '114px', height: '18px' }}>
            <Image src={content.logoSrc} alt="" fill unoptimized />
          </div>

          {/* Nav links */}
          <div
            className="absolute flex items-center"
            style={{ left: '162px', top: '27px', gap: '24px' }}
          >
            {content.navLinks.map((link) => (
              <span
                key={link}
                className="work-web-nav-link whitespace-nowrap leading-none"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '12.024px',
                  letterSpacing: '-0.1202px',
                }}
              >
                {link}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div
            className="absolute flex items-baseline"
            style={{ right: '20.87px', top: '21.02px', gap: '24px' }}
          >
            <div
              className="work-web-buy-btn-bg flex items-center justify-center rounded-[6px]"
              style={{ padding: '6px' }}
            >
              <span
                className="work-web-buy-btn-text whitespace-nowrap leading-none"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '12.024px',
                  letterSpacing: '-0.1202px',
                }}
              >
                {content.buyButtonLabel}
              </span>
            </div>
            {/* "Book Now" button: CSS ::after pseudo-element handles gradient swap */}
            <div
              className="work-web-book-btn flex items-center justify-center rounded-[6px]"
              style={{ padding: '6px' }}
            >
              <span
                className="relative text-white whitespace-nowrap leading-none"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '12.024px',
                  letterSpacing: '-0.1202px',
                  zIndex: 1,
                }}
              >
                {content.bookButtonLabel}
              </span>
            </div>
          </div>

          {/* Hero image — mix-blend-luminosity; inner div replicates Figma positioning */}
          <div
            className="work-img-blend absolute overflow-hidden"
            style={{ top: '66px', left: '0', width: '855px', height: '384px' }}
          >
            <div className="absolute" style={{ width: '99.97%', height: '148.46%', left: '-0.02%', top: '-14.34%' }}>
              <Image src={content.heroSrc} alt="" fill className="object-cover" unoptimized />
            </div>
          </div>

          {/* Hero headline */}
          <div
            className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
            style={{ top: '227px' }}
          >
            <p
              className="leading-none"
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '50.671px',
                fontWeight: 300,
                color: '#f0eee6',
                letterSpacing: '-0.5067px',
              }}
            >
              {content.heroHeadlineLines.map((line, i) => (
                <span key={i} style={{ display: 'block', lineHeight: '1' }}>{line}</span>
              ))}
            </p>
          </div>

          {/* Book CTA */}
          <div
            className="work-web-cta-bg absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-[6px]"
            style={{ top: '340px', padding: '6px 8px' }}
          >
            <span
              className="work-web-cta-text whitespace-nowrap leading-none"
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '12.024px',
                fontWeight: 700,
                letterSpacing: '-0.1202px',
              }}
            >
              {content.bookCtaLabel}
            </span>
          </div>

          {/* Below-fold heading */}
          <p
            className="work-web-heading absolute left-1/2 -translate-x-1/2 text-center leading-[1.2]"
            style={{
              top: '482px',
              width: '346px',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '-0.24px',
            }}
          >
            {content.belowFoldHeading}
          </p>

          {/* Gallery images */}
          <div
            className="work-img-blend absolute overflow-hidden rounded-[6px]"
            style={{ top: '534px', left: '79px', width: '200px', height: '200px' }}
          >
            <div className="absolute" style={{ width: '100%', height: '150%', top: '0' }}>
              <Image src={content.galleryImageSrcs[0]} alt="" fill className="object-cover" unoptimized />
            </div>
          </div>
          <div
            className="work-img-blend absolute overflow-hidden rounded-[6px] left-1/2 -translate-x-1/2"
            style={{ top: '534px', width: '200px', height: '200px' }}
          >
            <div className="absolute" style={{ width: '100%', height: '150%', top: '-18.5%' }}>
              <Image src={content.galleryImageSrcs[1]} alt="" fill className="object-cover" unoptimized />
            </div>
          </div>
          <div
            className="work-img-blend absolute overflow-hidden rounded-[6px]"
            style={{ top: '534px', left: '575px', width: '200px', height: '200px' }}
          >
            <Image src={content.galleryImageSrcs[2]} alt="" fill className="object-cover" unoptimized />
          </div>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Web card — Care variant: Good Dog Grooming layout (service columns)
// ---------------------------------------------------------------------------

function WebCardCare({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: WebCardContentCare;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={868}
        naturalHeight={583}
        className="work-web-outer"
        style={{ borderRadius: '16px', backdropFilter: 'blur(12.024px)' }}
        innerStyle={{ padding: '7px' }}
      >
        <div
          className="work-web-inner relative overflow-hidden"
          style={{ height: '569px', borderRadius: '10px' }}
        >
          {/* Logo icon (paw print) — left of brand name */}
          {content.logoSrc && (
            <div className="absolute" style={{ left: '47px', top: '30px', width: '24px', height: '27px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={content.logoSrc} className="absolute inset-0 w-full h-full block" />
            </div>
          )}

          {/* Brand name — Bangers font, left-anchored */}
          <p
            className="work-care-web-brand absolute"
            style={{
              left: '76px',
              top: '35px',
              fontFamily: "'Bangers', Impact, sans-serif",
              fontSize: '20px',
              letterSpacing: '0.2px',
              lineHeight: '18px',
            }}
          >
            {content.brandName}
          </p>

          {/* Nav links — Dongle Regular 20px */}
          <div className="absolute flex items-center" style={{ left: '261px', top: '35px', gap: '24px' }}>
            {content.navLinks.map((link) => (
              <span
                key={link}
                className="work-web-nav-link whitespace-nowrap"
                style={{
                  fontFamily: "'Dongle', system-ui, sans-serif",
                  fontSize: '20px',
                  lineHeight: '18px',
                  letterSpacing: '0.2px',
                }}
              >
                {link}
              </span>
            ))}
          </div>

          {/* Social icons: Facebook, Instagram, Yelp — exact Figma positions */}
          <div className="absolute" style={{ left: '622px', top: '34px', width: '20px', height: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/work-showcase/care-web-icon-facebook.svg" className="absolute inset-0 w-full h-full" />
          </div>
          <div className="absolute" style={{ left: '654px', top: '34px', width: '20px', height: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/work-showcase/care-web-icon-instagram.svg" className="absolute inset-0 w-full h-full" />
          </div>
          <div className="absolute" style={{ left: '686px', top: '34px', width: '20px', height: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/work-showcase/care-web-icon-yelp.svg" className="absolute inset-0 w-full h-full" />
          </div>

          {/* Book Now button — Dongle Regular 20px, purple bg */}
          <div
            className="work-care-web-book-btn absolute flex items-center justify-center rounded-full"
            style={{ left: '722px', top: '28px', padding: '8px 16px 7px' }}
          >
            <span
              className="work-care-web-book-text whitespace-nowrap"
              style={{
                fontFamily: "'Dongle', system-ui, sans-serif",
                fontSize: '20px',
                lineHeight: '18px',
                letterSpacing: '0.2px',
              }}
            >
              {content.bookButtonLabel}
            </span>
          </div>

          {/* Hero image — mix-blend-luminosity, full width */}
          <div
            className="work-img-blend absolute overflow-hidden"
            style={{ top: '85px', left: '0', right: '0', height: '377px' }}
          >
            <Image src={content.heroSrc} alt="" fill className="object-cover" unoptimized />
          </div>

          {/* Services row — three columns at bottom */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-start"
            style={{ top: '494px', gap: '12px' }}
          >
            {content.services.map((service) => (
              <div key={service.title} className="flex flex-col items-center" style={{ width: '220px', gap: '8px' }}>
                <p
                  className="work-care-web-service-title text-center w-full"
                  style={{
                    fontFamily: "'Dongle', system-ui, sans-serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    lineHeight: '18px',
                    letterSpacing: '-0.24px',
                  }}
                >
                  {service.title}
                </p>
                <div
                  className="work-img-blend relative overflow-hidden rounded-[8px] w-full"
                  style={{ aspectRatio: '1024/576' }}
                >
                  <Image src={service.imageSrc} alt={service.title} fill className="object-cover" unoptimized />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Web card — Home variant: CanopyWorks (utility bar + Fraunces serif + glows)
// ---------------------------------------------------------------------------

function WebCardHome({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: WebCardContentHome;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  const serviceCategories = [
    { color: '#b9532b', label: 'GROUND CARE' },
    { color: '#1f3a2c', label: 'CANOPY CARE' },
    { color: '#2a6f64', label: 'DIAGNOSIS' },
    { color: '#d08669', label: 'TREE REPORTS' },
    { color: '#b58f80', label: 'EXPERT WITNESS' },
  ];

  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={868}
        naturalHeight={583}
        className="work-web-outer"
        style={{ borderRadius: '16px', backdropFilter: 'blur(12.024px)' }}
        innerStyle={{ padding: '7px' }}
      >
        <div
          className="work-home-web-inner relative overflow-hidden flex flex-col"
          style={{ height: '569px', borderRadius: '10px' }}
        >
          {/* Utility bar */}
          <div
            className="work-home-web-utility flex items-center justify-between flex-shrink-0 overflow-hidden"
            style={{ height: '29.709px', paddingLeft: '56.588px', paddingRight: '56.588px' }}
          >
            <span
              className="work-home-web-utility-text whitespace-nowrap"
              style={{ fontFamily: 'system-ui, sans-serif', fontSize: '9.196px' }}
            >
              ISA Certified Arborist · WE-12847A · CA Contractor #1031482
            </span>
            <div className="flex items-center gap-[16.976px]">
              <span className="work-home-web-utility-text whitespace-nowrap" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '9.196px' }}>
                (626) 448-2290
              </span>
              <span className="work-home-web-utility-text" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '9.196px', opacity: 0.4 }}>·</span>
              <span className="work-home-web-utility-text whitespace-nowrap" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '9.196px' }}>
                info@canopyworksca.com
              </span>
            </div>
          </div>

          {/* Header */}
          <div
            className="work-home-web-header flex items-center justify-between flex-shrink-0 overflow-hidden"
            style={{ height: '70.735px', paddingLeft: '56.588px', paddingRight: '56.588px', borderBottomWidth: '0.707px', borderBottomStyle: 'solid' }}
          >
            {/* Logo: leaf + wordmark */}
            <div className="flex items-center gap-[7.073px]">
              <div className="relative flex-shrink-0" style={{ width: '19.806px', height: '19.806px' }}>
                <Image src="/work-showcase/home-leaf-logo.svg" alt="" fill className="work-home-web-leaf" unoptimized />
              </div>
              <span
                className="work-home-web-brand whitespace-nowrap"
                style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '15.562px', fontWeight: 600, letterSpacing: '-0.3112px' }}
              >
                CanopyWorks
              </span>
            </div>
            {/* Nav */}
            <div className="flex items-center gap-[22.635px]">
              {['Services', 'Service area', 'About', 'Contact'].map((link) => (
                <span
                  key={link}
                  className="work-home-web-nav whitespace-nowrap"
                  style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10.61px' }}
                >
                  {link}
                </span>
              ))}
            </div>
            {/* Right: phone + CTA */}
            <div className="flex items-center gap-[8.488px]">
              <span className="work-home-web-nav whitespace-nowrap" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10.61px' }}>
                (626) 448-2290
              </span>
              <div
                className="work-home-web-cta-btn flex items-center overflow-hidden"
                style={{ paddingLeft: '14.147px', paddingRight: '14.147px', paddingTop: '7.073px', paddingBottom: '7.073px', borderRadius: '706.64px' }}
              >
                <span className="whitespace-nowrap" style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10.61px', fontWeight: 500 }}>
                  Request a consultation
                </span>
              </div>
            </div>
          </div>

          {/* Hero section */}
          <div
            className="relative flex items-start flex-shrink-0 overflow-hidden"
            style={{ flex: '1 0 0', paddingLeft: '56.588px', paddingRight: '56.588px', paddingTop: '39.611px', paddingBottom: '56.588px', gap: '33.953px' }}
          >
            {/* Moss glow — top-left */}
            <div
              className="absolute pointer-events-none"
              style={{ left: '-84.88px', top: '-28.29px', width: '339.527px', height: '339.527px' }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(78,140,78,0.22) 0%, rgba(78,140,78,0.05) 50%, transparent 70%)',
                }}
              />
            </div>
            {/* Clay glow — top-right */}
            <div
              className="absolute pointer-events-none"
              style={{ right: '56px', top: '71px', width: '297.086px', height: '297.086px' }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(208,134,105,0.18) 0%, rgba(208,134,105,0.04) 50%, transparent 70%)',
                }}
              />
            </div>

            {/* Left: headline + stats + CTAs */}
            <div className="flex flex-1 flex-col justify-between min-w-0" style={{ height: '333px' }}>
              <div className="flex flex-col" style={{ gap: '50.929px' }}>
                {/* Headline */}
                <div>
                  <p
                    className="work-home-web-headline"
                    style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '50px', fontWeight: 600, lineHeight: '1.1', letterSpacing: '-1px', marginBottom: 0 }}
                  >
                    Expert tree care,
                  </p>
                  <p
                    className="work-home-web-headline-italic"
                    style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '50px', fontWeight: 600, lineHeight: '1.1', fontStyle: 'italic', letterSpacing: '-1px', marginBottom: 0 }}
                  >
                    from root to crown.
                  </p>
                </div>
                {/* Stats */}
                <div
                  className="flex items-start work-home-web-stats-border"
                  style={{ paddingTop: '16.976px', gap: '16.976px', width: '374.894px', borderTopWidth: '0.707px', borderTopStyle: 'solid' }}
                >
                  {[
                    { num: '21', desc: 'years climbing\ntrees' },
                    { num: '6', desc: 'cities served, no\nminimums' },
                    { num: '100%', desc: 'licensed, bonded, and\ninsured crew' },
                  ].map((stat) => (
                    <div key={stat.num} className="flex flex-1 flex-col" style={{ gap: '4.244px' }}>
                      <span
                        className="work-home-web-stat-num"
                        style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '19.806px', fontWeight: 600, lineHeight: '19.806px' }}
                      >
                        {stat.num}
                      </span>
                      <span
                        className="work-home-web-stat-label"
                        style={{ fontFamily: 'system-ui, sans-serif', fontSize: '9.196px', whiteSpace: 'pre-wrap' }}
                      >
                        {stat.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* CTAs */}
              <div className="flex items-center" style={{ gap: '16.976px' }}>
                <div
                  className="work-home-web-cta-primary flex items-center"
                  style={{ paddingLeft: '16.976px', paddingRight: '16.976px', paddingTop: '9.903px', paddingBottom: '9.903px', borderRadius: '706.64px', gap: '5.659px' }}
                >
                  <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11.318px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    Request a consultation
                  </span>
                  <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11.318px' }}>→</span>
                </div>
                <div
                  className="work-home-web-cta-secondary flex items-center"
                  style={{ paddingLeft: '16.976px', paddingRight: '16.976px', paddingTop: '9.903px', paddingBottom: '9.903px', borderRadius: '706.64px', borderWidth: '0.707px', borderStyle: 'solid' }}
                >
                  <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11.318px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {' '}Call (626) 448-2290
                  </span>
                </div>
              </div>
            </div>

            {/* Right: hero photo */}
            <div
              className="relative overflow-hidden flex-shrink-0"
              style={{ width: '281px', height: '333px', borderRadius: '16.976px' }}
            >
              <Image
                src={content.heroSrc}
                alt=""
                fill
                className="work-card-img object-cover"
                style={{ objectPosition: '-24% 0%' }}
                unoptimized
              />
            </div>
          </div>

          {/* Below-fold: service category row */}
          <div
            className="work-home-web-below flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ height: '60px', borderTopWidth: '0.556px', borderTopStyle: 'solid' }}
          >
            <div className="flex items-center justify-center" style={{ gap: '48px' }}>
              {serviceCategories.map((item) => (
                <div key={item.label} className="flex items-center" style={{ gap: '8px' }}>
                  <div style={{ width: '5.998px', height: '5.998px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                  <span
                    className="work-home-web-nav whitespace-nowrap"
                    style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Web card — Food variant (Alma Café)
// Layout: lavender header with wordmark-left / logo-center / social-right,
// nav row below header, full-width hero image. No overlay text, no buttons.
// ---------------------------------------------------------------------------

function WebCardFood({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: WebCardContentFood;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      {/* Outer wrapper: 868 × 584, rounded-[16px], p-[7px], backdrop-blur */}
      <ScaledMockCard
        naturalWidth={868}
        naturalHeight={584}
        className="work-web-outer"
        style={{ borderRadius: '16px', backdropFilter: 'blur(12.024px)', background: 'rgba(255,255,255,0.3)' }}
        innerClassName="flex items-center justify-center"
        innerStyle={{ padding: '7px' }}
      >
        {/* Inner card: 852 × 568, bg #e6edfa */}
        <div
          className="work-web-inner relative overflow-hidden"
          style={{
            width: '852px',
            height: '568px',
            borderRadius: '10px',
            backgroundColor: '#e6edfa',
          }}
        >
          {/* Hero image — starts at y=150, fills bottom 418px */}
          <div
            className="absolute overflow-hidden"
            style={{ top: '150px', left: 0, width: '852px', height: '418px' }}
          >
            <div className="relative w-full h-full">
              <Image
                src={content.heroSrc}
                alt=""
                fill
                className="object-cover object-center work-img-blend"
                unoptimized
              />
            </div>
          </div>

          {/* Circular logo mark — horizontally centered, top: 23px */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: '23px', width: '52px', height: '52px' }}
          >
            <Image src={content.logoMarkSrc} alt="Alma Café" fill unoptimized />
          </div>

          {/* "alma café" wordmark text — left: 33px, baseline-aligned with icons */}
          <span
            className="absolute whitespace-nowrap leading-none"
            style={{
              left: '33px',
              top: '42px',
              fontFamily: "'Josefin Slab', Georgia, serif",
              fontWeight: 700,
              fontSize: '20px',
              letterSpacing: '-0.2px',
              color: '#8a7050',
            }}
          >
            {content.wordmarkText}
          </span>

          {/* Social icons — Instagram then Facebook, right side, y=42 */}
          <div
            className="absolute"
            style={{ left: '772px', top: '42px', width: '20px', height: '20px' }}
          >
            <Image src={content.instagramIconSrc} alt="Instagram" fill unoptimized />
          </div>
          <div
            className="absolute"
            style={{ left: '808px', top: '42px', width: '20px', height: '20px' }}
          >
            <Image src={content.facebookIconSrc} alt="Facebook" fill unoptimized />
          </div>

          {/* Navigation row — centered, y=107, Josefin Slab, lowercase, terracotta */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            style={{ top: '107px', gap: '24px' }}
          >
            {content.navLinks.map((link, i) => (
              <span
                key={link}
                className="whitespace-nowrap leading-none lowercase"
                style={{
                  fontFamily: "'Josefin Slab', Georgia, serif",
                  fontWeight: i === content.navLinks.length - 1 ? 700 : 600,
                  fontSize: '14px',
                  letterSpacing: '-0.14px',
                  color: '#ff6a56',
                }}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Web card — Food & Drink mobile menu page (Alma Café)
// 316×583 outer card (frosted glass), inner 304×571 white rounded card.
// Header: lavender (#e6edfa) 106px area with logo-mark + Josefin Slab nav.
// Hero image with "the menu" overlay text, category tabs, menu items.
// ---------------------------------------------------------------------------

function WebCardFoodMenu({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: WebCardContentFoodMenu;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  const josefin = "'Josefin Slab', Georgia, serif";
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      {/* Outer frosted-glass shell */}
      <ScaledMockCard
        naturalWidth={316}
        naturalHeight={583}
        className="work-img-blend flex-shrink-0"
        style={{ borderRadius: '16px', backdropFilter: 'blur(12.024px)', backgroundColor: 'rgba(255,255,255,0.3)' }}
      >
        {/* Inner white card, centered, top: 6px */}
        <div
          className="absolute overflow-hidden"
          style={{
            width: '304px',
            height: '571px',
            borderRadius: '10px',
            backgroundColor: 'white',
            top: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Header area — lavender bg, 106px tall */}
          <div
            className="absolute"
            style={{ top: '0', left: '-1px', width: '305px', height: '106px', backgroundColor: '#e6edfa' }}
          />

          {/* Logo mark — centered, 32×32, top: 16px */}
          <div
            className="absolute"
            style={{ top: '16px', left: '50%', transform: 'translateX(-50%)', width: '32px', height: '32px' }}
          >
            <Image src={content.logoMarkSrc} alt="Alma Café" fill unoptimized />
          </div>

          {/* Nav row — centered, top: 64px, Josefin Slab, lowercase */}
          <div
            className="absolute flex items-center"
            style={{ top: '64px', left: '50%', transform: 'translateX(-50%)', gap: '24px', whiteSpace: 'nowrap' }}
          >
            <span style={{ fontFamily: josefin, fontWeight: 600, fontSize: '14px', letterSpacing: '-0.14px', color: '#8a7050', textTransform: 'lowercase' }}>menu</span>
            <span style={{ fontFamily: josefin, fontWeight: 600, fontSize: '14px', letterSpacing: '-0.14px', color: '#ff6a56', textTransform: 'lowercase' }}>about</span>
            <span style={{ fontFamily: josefin, fontWeight: 600, fontSize: '14px', letterSpacing: '-0.14px', color: '#ff6a56', textTransform: 'lowercase' }}>shop</span>
            <span style={{ fontFamily: josefin, fontWeight: 700, fontSize: '14px', letterSpacing: '-0.14px', color: '#ff6a56', textTransform: 'lowercase' }}>order online</span>
          </div>

          {/* Hero image area — top: 106px, 304×187px */}
          <div
            className="absolute overflow-hidden"
            style={{ top: '106px', left: '0', width: '304px', height: '187px', backgroundColor: 'white' }}
          >
            <Image
              alt=""
              src={content.heroSrc}
              width={304}
              height={456}
              unoptimized
              className="absolute max-w-none"
              style={{ width: '100%', height: '243.85%', top: '-106.15%', left: '0' }}
            />
            {/* "the menu" overlay text */}
            <span
              className="absolute"
              style={{
                fontFamily: josefin,
                fontWeight: 600,
                fontSize: '50px',
                letterSpacing: '-0.5px',
                color: 'white',
                textTransform: 'lowercase',
                lineHeight: 1,
                left: '53.5px',
                top: '65px',
                whiteSpace: 'nowrap',
              }}
            >
              the menu
            </span>
          </div>

          {/* Category tabs — top: 301px */}
          <div
            className="absolute flex items-center overflow-hidden"
            style={{
              top: '301px',
              left: '-1px',
              borderBottom: '1px solid rgba(138,112,80,0.3)',
              height: '34px',
            }}
          >
            {/* Active tab: coffee */}
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ padding: '10px 8px', borderBottom: '2px solid #8a7050' }}
            >
              <span style={{ fontFamily: josefin, fontWeight: 600, fontSize: '14px', letterSpacing: '-0.14px', color: '#8a7050', textTransform: 'lowercase' }}>coffee</span>
            </div>
            {(['tea', 'pastries', 'toasts', 'bowls', 'desserts'] as const).map((tab) => (
              <div key={tab} className="flex items-center justify-center flex-shrink-0" style={{ padding: '10px 8px' }}>
                <span style={{ fontFamily: josefin, fontWeight: 600, fontSize: '14px', letterSpacing: '-0.14px', color: '#8a7050', textTransform: 'lowercase' }}>{tab}</span>
              </div>
            ))}
          </div>

          {/* Section heading — centered, top: 375px */}
          <div
            className="absolute"
            style={{ top: '375px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
          >
            <span
              style={{
                fontFamily: josefin,
                fontWeight: 600,
                fontSize: '22px',
                letterSpacing: '-0.22px',
                color: '#ff6a56',
                textTransform: 'lowercase',
                lineHeight: 1,
              }}
            >
              {content.sectionHeading}
            </span>
          </div>

          {/* Menu items — top: 437px, left: 24px, width: 256px */}
          <div
            className="absolute flex flex-col"
            style={{ top: '437px', left: '24px', width: '256px', gap: '16px', textTransform: 'lowercase' }}
          >
            {content.menuItems.map((item, i) => (
              <div key={i} className="flex flex-col" style={{ gap: '12px' }}>
                <div className="flex items-center justify-between" style={{ lineHeight: 1 }}>
                  <span style={{ fontFamily: josefin, fontWeight: 600, fontSize: '14px', letterSpacing: '-0.14px', color: '#8a7050' }}>{item.name}</span>
                  <span style={{ fontFamily: josefin, fontWeight: 500, fontSize: '14px', letterSpacing: '-0.14px', color: '#8a7050' }}>{item.price}</span>
                </div>
                <p style={{ fontFamily: josefin, fontWeight: 600, fontSize: '12px', letterSpacing: '-0.12px', color: '#b4a38e', lineHeight: 1.2, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Web card — Retail variant (Meridian): full-bleed hero, browser chrome,
// "mEriDIAn" wordmark centered in DM Mono nav.
// ---------------------------------------------------------------------------

function WebCardRetail({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: WebCardContentRetail;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={868}
        naturalHeight={582}
        className="work-web-outer"
        style={{ borderRadius: '16px', backdropFilter: 'blur(12.024px)' }}
        innerStyle={{ padding: '7px' }}
      >
        <div
          className="work-web-inner relative overflow-hidden"
          style={{ height: '568px', borderRadius: '10px', backgroundColor: 'white' }}
        >
          {/* Full-bleed hero photo — fills the entire inner card */}
          <div
            className="work-img-blend absolute overflow-hidden"
            style={{ left: '-21px', top: '-14px', width: '894px', height: '593px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={content.heroSrc} className="absolute inset-0 w-full h-full object-cover block" />
          </div>

          {/* Brand wordmark — centered. Figma uses proprietary "Umbira Regular" (non-italic).
              Self-host Umbira via @font-face and add 'Umbira' to the front of this stack. */}
          <p
            className="work-retail-web-brand absolute whitespace-nowrap"
            style={{
              fontFamily: "'Umbira', var(--font-dm-mono), 'DM Mono', monospace",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '18px',
              color: 'black',
              left: 0,
              width: '100%',
              textAlign: 'center',
              top: '34px',
              zIndex: 2,
            }}
          >
            mEriDIAn
          </p>

          {/* Left nav — DM Mono Light */}
          <div
            className="absolute flex items-center z-[2]"
            style={{ left: '27px', top: '34px', gap: '19px' }}
          >
            {['Shop', 'Designers', 'Journal'].map((link) => (
              <span
                key={link}
                className="work-web-nav-link whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: '11px',
                  lineHeight: '18px',
                  letterSpacing: '0.11px',
                  color: 'black',
                }}
              >
                {link}
              </span>
            ))}
          </div>

          {/* Right nav — DM Mono Light */}
          <div
            className="absolute flex items-center z-[2]"
            style={{ left: '736px', top: '34px', gap: '19px' }}
          >
            {['Search', 'Cart'].map((link) => (
              <span
                key={link}
                className="work-web-nav-link whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: '11px',
                  lineHeight: '18px',
                  letterSpacing: '0.11px',
                  color: 'black',
                }}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Web card dispatcher
// ---------------------------------------------------------------------------

function WebCard({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: WebCardContent;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  if (content.variant === 'care') {
    return <WebCardCare content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }
  if (content.variant === 'home') {
    return <WebCardHome content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }
  if (content.variant === 'food') {
    return <WebCardFood content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }
  if (content.variant === 'food-menu') {
    return <WebCardFoodMenu content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }
  if (content.variant === 'retail') {
    return <WebCardRetail content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }
  return <WebCardStandard content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
}

// ---------------------------------------------------------------------------
// Content card — Retail variant (Meridian): The Journal layout.
// "mEriDIAn" wordmark, "The Journal" heading, article title, body, 2 photos.
// ---------------------------------------------------------------------------

function ContentCardRetail({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: ContentCardContentRetail;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <ScaledMockCard
        naturalWidth={316}
        naturalHeight={583}
        className="work-content-outer"
        style={{ borderRadius: '16px' }}
      >
        <div
          className="work-content-inner absolute overflow-hidden"
          style={{
            top: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '304px',
            height: '571px',
            borderRadius: '10px',
          }}
        >
          {/* List/hamburger icon — top-left */}
          <div className="absolute" style={{ left: '12px', top: '14px', width: '20px', height: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={content.listIconSrc} className="absolute inset-0 w-full h-full block" />
          </div>

          {/* Brand wordmark "mEriDIAn" — centered. Figma uses proprietary "Umbira Regular" (non-italic).
              Self-host Umbira via @font-face and add 'Umbira' to the front of this stack. */}
          <p
            className="work-retail-content-brand absolute whitespace-nowrap text-black"
            style={{
              fontFamily: "'Umbira', var(--font-dm-mono), 'DM Mono', monospace",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '18px',
              left: 0,
              width: '100%',
              textAlign: 'center',
              top: '14px',
            }}
          >
            mEriDIAn
          </p>

          {/* Cart (0) — right-aligned, DM Mono */}
          <p
            className="work-content-body absolute whitespace-nowrap text-right"
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '11px',
              lineHeight: '18px',
              letterSpacing: '0.11px',
              right: '12px',
              top: '15px',
            }}
          >
            Cart (0)
          </p>

          {/* "The Journal" heading — DM Mono Light */}
          <p
            className="work-content-headline absolute"
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '23px',
              lineHeight: 'normal',
              letterSpacing: '-0.23px',
              left: '12px',
              top: '88px',
              width: '280px',
            }}
          >
            The Journal
          </p>

          {/* Article photo 1 */}
          <div
            className="absolute overflow-hidden"
            style={{ height: '196px', left: '12px', top: '135px', width: '280px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={content.photo1Src}
              className="work-card-img absolute max-w-none"
              style={{ height: '142.86%', left: '0', top: '-14.03%', width: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Article subtitle */}
          <p
            className="work-content-headline absolute"
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '16px',
              lineHeight: 'normal',
              letterSpacing: '-0.32px',
              left: '12px',
              top: '346px',
              width: '280px',
            }}
          >
            {content.articleTitle}
          </p>

          {/* Article body text */}
          <p
            className="absolute"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12px',
              lineHeight: '1.4',
              letterSpacing: '-0.12px',
              color: '#847f71',
              left: '12px',
              top: '370px',
              width: '280px',
            }}
          >
            {content.articleBody}
          </p>

          {/* "Read more" link */}
          <p
            className="absolute underline"
            style={{
              fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '12px',
              lineHeight: 'normal',
              letterSpacing: '-0.24px',
              left: '12px',
              top: '446px',
              width: '280px',
            }}
          >
            Read more
          </p>

          {/* Article photo 2 */}
          <div
            className="absolute overflow-hidden"
            style={{ height: '196px', left: '12px', top: '498px', width: '280px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={content.photo2Src} className="work-card-img absolute inset-0 w-full h-full object-cover block" />
          </div>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Content card — standard blog article format (316 × 583, rounded-[16px])
// ---------------------------------------------------------------------------

function ContentCard({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: ContentCardContent;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  if (content.variant === 'retail') {
    return <ContentCardRetail content={content} chipLabel={chipLabel} chipBg={chipBg} chipText={chipText} />;
  }

  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      {/* Outer: rounded-[16px], overflow-hidden */}
      <ScaledMockCard
        naturalWidth={316}
        naturalHeight={583}
        className="work-content-outer"
        style={{ borderRadius: '16px' }}
      >
        {/* Inner: positioned 6px from top, centered, rounded-[10px] */}
        <div
          className="work-content-inner absolute overflow-hidden"
          style={{
            top: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '304px',
            height: '571px',
            borderRadius: '10px',
          }}
        >
          {/* Logo wordmark */}
          <div className="absolute" style={{ left: '12px', top: '12px', width: '114px', height: '18px' }}>
            <Image src={content.wordmarkSrc} alt="" fill unoptimized />
          </div>

          {/* Hamburger icon (3 lines) */}
          <div
            className="absolute flex flex-col justify-center"
            style={{ left: '271px', top: '8px', width: '24px', height: '24px', gap: '4px' }}
          >
            <div className="rounded-full" style={{ height: '2px', backgroundColor: '#cbc5b4' }} />
            <div className="rounded-full" style={{ height: '2px', backgroundColor: '#cbc5b4' }} />
            <div className="rounded-full" style={{ height: '2px', width: '16px', backgroundColor: '#cbc5b4' }} />
          </div>

          {/* BLOG tag */}
          <div
            className="work-content-tag-bg absolute flex items-center justify-center rounded-[4px]"
            style={{ left: '12px', top: '58px', padding: '4px 6px' }}
          >
            <span
              className="work-content-tag-text font-bold uppercase whitespace-nowrap leading-none"
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '8px',
                letterSpacing: '0.24px',
              }}
            >
              {content.tagLabel}
            </span>
          </div>

          {/* Article headline */}
          <p
            className="work-content-headline absolute font-light leading-none whitespace-pre-wrap"
            style={{
              top: '87px',
              left: '12px',
              width: '280px',
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 300,
              fontSize: '23px',
              letterSpacing: '-0.23px',
              color: '#242323',
            }}
          >
            {content.headline}
          </p>

          {/* Byline */}
          <p
            className="absolute leading-none"
            style={{
              top: '143px',
              left: '12px',
              width: '277px',
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: '#b1aa9a',
              letterSpacing: '-0.12px',
            }}
          >
            <span>by </span>
            <span>{content.byline}</span>
          </p>

          {/* Article photo */}
          <div
            className="absolute overflow-hidden rounded-[6px]"
            style={{ top: '171px', left: '12px', width: '280px', height: '187px' }}
          >
            <Image src={content.photoSrc} alt="" fill className="work-card-img object-cover" unoptimized />
          </div>

          {/* Body text */}
          <div
            className="absolute"
            style={{ top: '374px', left: '12px', width: '280px' }}
          >
            <p
              className="work-content-body leading-[1.3]"
              style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: '12px', color: '#3a3836' }}
            >
              <strong className="font-semibold">{content.bodyParagraphs[0].split(',')[0]}</strong>
              {content.bodyParagraphs[0].substring(content.bodyParagraphs[0].indexOf(','))}
            </p>
            <p
              className="work-content-body leading-[1.3] mt-[13px]"
              style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: '12px', color: '#3a3836' }}
            >
              {content.bodyParagraphs[1]}
            </p>
          </div>
        </div>
      </ScaledMockCard>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ListingsCard
// ---------------------------------------------------------------------------

function ListingsCard({
  content,
  chipLabel,
  chipBg,
  chipText,
}: {
  content: ListingsCardContent;
  chipLabel: string;
  chipBg: string;
  chipText: string;
}) {
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      {/* 252px simple rounded card — matches Figma exactly (NOT a phone mockup) */}
      <div
        className="work-listings-outer flex flex-col items-start overflow-hidden relative rounded-[8px]"
        style={{ width: '252px', padding: '12px', gap: '12px', backdropFilter: 'blur(5.267px)' }}
      >
        {/* Header row: business name + open status + compact rating + dots */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col" style={{ gap: '4px' }}>
            {/* Business name + Open */}
            <div className="flex items-baseline" style={{ gap: '8px' }}>
              <p
                className="work-listings-business-name font-semibold"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14px', lineHeight: 'normal', letterSpacing: '-0.14px' }}
              >
                {content.businessName}
              </p>
              {content.isOpen && (
                <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', lineHeight: '18px', color: '#4ea764' }}>
                  Open
                </p>
              )}
            </div>
            {/* Compact rating + review count + category */}
            <div className="flex items-center" style={{ gap: '6px' }}>
              <div className="flex items-center" style={{ gap: '2px' }}>
                {/* Star icon */}
                <div className="relative flex-shrink-0" style={{ width: '12px', height: '12px' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 1 L7.35 3.74 L10.37 4.14 L8.19 6.27 L8.71 9.27 L6 7.85 L3.29 9.27 L3.81 6.27 L1.63 4.14 L4.65 3.74 Z"
                      className="work-listings-star"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span
                  className="work-listings-meta-text"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.12px' }}
                >
                  {content.rating.toFixed(1)}
                </span>
              </div>
              <span className="work-listings-meta-text" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.12px' }}>∙</span>
              <span className="work-listings-meta-text whitespace-nowrap" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.12px' }}>
                {content.reviewCount} Reviews
              </span>
              <span className="work-listings-meta-text" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.12px' }}>∙</span>
              <span className="work-listings-meta-text whitespace-nowrap" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.12px' }}>
                {content.category}
              </span>
            </div>
          </div>
          {/* Three-dots menu */}
          <div className="relative flex-shrink-0" style={{ width: '22px', height: '22px' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4" cy="11" r="1.8" className="work-listings-meta-text" fill="currentColor" />
              <circle cx="11" cy="11" r="1.8" className="work-listings-meta-text" fill="currentColor" />
              <circle cx="18" cy="11" r="1.8" className="work-listings-meta-text" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Photo grid — layout determined by photoLayout prop */}
        {content.photoLayout === 'tall-left' ? (
          /* tall-left: left column = one 182px tall photo, right column = two 90px photos */
          <div
            className="work-img-blend w-full flex-shrink-0"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}
          >
            {/* Column 1: single tall photo */}
            <div className="relative overflow-hidden" style={{ height: '182px', borderRadius: '8px 0 0 8px' }}>
              <Image src={content.photoSrcs[0]} alt="" fill className="work-card-img object-cover" unoptimized />
            </div>
            {/* Column 2: two stacked photos */}
            <div className="flex flex-col" style={{ gap: '2px' }}>
              <div className="relative overflow-hidden" style={{ height: '90px', borderRadius: '0 8px 0 0' }}>
                <Image src={content.photoSrcs[1]} alt="" fill className="work-card-img object-cover" unoptimized />
              </div>
              <div className="relative overflow-hidden" style={{ height: '90px', borderRadius: '0 0 8px 0' }}>
                <Image src={content.photoSrcs[3]} alt="" fill className="work-card-img object-cover" unoptimized />
              </div>
            </div>
          </div>
        ) : (
          /* grid-2x2 (default): symmetric 2×2 grid */
          <div
            className="grid work-img-blend w-full flex-shrink-0"
            style={{ gridTemplateColumns: '1fr 1fr', gap: '2px' }}
          >
            {/* Column 1: top-left, bottom-left */}
            <div className="flex flex-col" style={{ gap: '2px' }}>
              <div className="relative overflow-hidden" style={{ height: '90px', borderRadius: '8px 0 0 0' }}>
                <Image src={content.photoSrcs[0]} alt="" fill className="work-card-img object-cover" unoptimized />
              </div>
              <div className="relative overflow-hidden" style={{ height: '90px', borderRadius: '0 0 0 8px' }}>
                <Image src={content.photoSrcs[2]} alt="" fill className="work-card-img object-cover" unoptimized />
              </div>
            </div>
            {/* Column 2: top-right, bottom-right */}
            <div className="flex flex-col" style={{ gap: '2px' }}>
              <div className="relative overflow-hidden" style={{ height: '90px', borderRadius: '0 8px 0 0' }}>
                <Image src={content.photoSrcs[1]} alt="" fill className="work-card-img object-cover" unoptimized />
              </div>
              <div className="relative overflow-hidden" style={{ height: '90px', borderRadius: '0 0 8px 0' }}>
                <Image src={content.photoSrcs[3]} alt="" fill className="work-card-img object-cover" unoptimized />
              </div>
            </div>
          </div>
        )}

        {/* Map section: full-width, 125px tall, with border */}
        <div
          className="relative overflow-hidden work-img-blend flex-shrink-0 w-full"
          style={{ height: '125px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)' }}
        >
          {/* MAP 2 composite — exact Figma SVG layers, offset per industry via mapOffset prop */}
          <div
            className="absolute overflow-hidden"
            style={{
              background: '#85d5eb',
              width: '529.191px',
              height: '414.771px',
              left: `${(content.mapOffset ?? { left: -120.18, top: -69.38 }).left}px`,
              top: `${(content.mapOffset ?? { left: -120.18, top: -69.38 }).top}px`,
              transform: content.mapFlipped ? 'scaleX(-1)' : undefined,
            }}
          >
            {/* imgVector32 — roads base layer */}
            <div className="absolute" style={{ height: '419.172px', left: '-2.75px', top: 0, width: '536.342px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute inset-0 w-full h-full block" src="/work-showcase/map-roads-base.svg" />
            </div>
            {/* imgYellow — yellow highlighted road */}
            <div className="absolute" style={{ height: '400.194px', left: '100.67px', top: '14.03px', width: '272.297px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute inset-0 w-full h-full block" src="/work-showcase/map-roads-yellow.svg" />
            </div>
            {/* imgGreen — green park areas */}
            <div className="absolute" style={{ height: '275.322px', left: '31.08px', top: '139.45px', width: '428.799px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute inset-0 w-full h-full block" src="/work-showcase/map-parks-green.svg" />
            </div>
            {/* imgFrame7 — frame overlay */}
            <div className="absolute" style={{ height: '415.321px', left: '0.55px', top: '0.28px', width: '487.934px' }}>
              <div className="absolute" style={{ inset: '0 0 0 -0.15%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block w-full h-full" src="/work-showcase/map-frame.svg" />
              </div>
            </div>
            {/* imgVector30 — west street layer */}
            <div className="absolute" style={{ height: '417.522px', left: '0.27px', top: '-1.93px', width: '399.094px' }}>
              <div className="absolute" style={{ inset: '0 -0.14% 0 0' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block w-full h-full" src="/work-showcase/map-streets-west.svg" />
              </div>
            </div>
            {/* imgVector33 — east street layer */}
            <div className="absolute" style={{ height: '416.972px', left: '267.07px', top: '-0.55px', width: '267.896px' }}>
              <div className="absolute" style={{ inset: '0 -0.82% -1.06% -0.82%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block w-full h-full" src="/work-showcase/map-streets-east.svg" />
              </div>
            </div>
            {/* imgVector35 + imgVector29 + RIVER NORTH label */}
            <div className="absolute" style={{ height: '415.046px', left: '0.82px', top: '0.28px', width: '490.134px' }}>
              <div className="absolute" style={{ height: '415.046px', left: 0, top: 0, width: '490.134px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="absolute inset-0 w-full h-full block" src="/work-showcase/map-streets-overlay.svg" />
              </div>
              <div className="absolute" style={{ height: '415.046px', left: 0, top: 0, width: '490.134px' }}>
                <div className="absolute" style={{ inset: '-0.13% -0.62% 0 0' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block w-full h-full" src="/work-showcase/map-streets-overlay.svg" />
                </div>
              </div>
              <p
                className="absolute font-semibold whitespace-nowrap"
                style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '9.902px', left: '37.13px', top: '330.88px', color: '#000', lineHeight: 'normal' }}
              >
                RIVER NORTH
              </p>
            </div>
          </div>
          {/* Location pin — imgVector1 */}
          <div className="absolute" style={{ height: '33px', left: '111px', top: '49px', width: '28px' }}>
            <div className="absolute" style={{ inset: '-27.27% -67.86% -57.58% -32.14%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block w-full h-full" src="/work-showcase/map-pin.svg" />
            </div>
          </div>
        </div>

        {/* Review score box + business description */}
        <div className="flex items-start w-full flex-shrink-0" style={{ height: '90px', gap: '10px' }}>
          {/* Score box: 90×90px */}
          <div
            className="work-listings-score-bg flex flex-col items-center justify-center flex-shrink-0 work-img-blend"
            style={{ width: '90px', height: '90px', borderRadius: '16px', gap: '8px' }}
          >
            <span
              className="work-listings-score-num"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '48px', fontWeight: 200, lineHeight: '40px', letterSpacing: '-0.48px' }}
            >
              {content.rating.toFixed(1)}
            </span>
            {/* 5 small stars */}
            <div className="flex items-center" style={{ gap: '2px' }}>
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 0.5 L6.1 2.84 L8.66 3.18 L6.83 4.97 L7.27 7.52 L5 6.29 L2.73 7.52 L3.17 4.97 L1.34 3.18 L3.9 2.84 Z"
                    fill={i < Math.round(content.rating) - 1 ? '#f5a623' : i < Math.round(content.rating) ? '#f5c96e' : '#d6d2c2'}
                  />
                </svg>
              ))}
            </div>
          </div>
          {/* Business description text */}
          <p
            className="work-listings-description flex-1 overflow-hidden h-full"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', lineHeight: '18px', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {content.descriptionText}
          </p>
        </div>

        {/* Stats pills row */}
        <div className="flex items-start w-full flex-shrink-0" style={{ gap: '10px' }}>
          <div
            className="work-listings-pill-bg flex flex-1 items-center justify-center min-w-0 rounded-full"
            style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '2px', paddingBottom: '2px' }}
          >
            <span
              className="work-listings-pill-text whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.12px' }}
            >
              {content.totalReviewsPill}
            </span>
          </div>
          <div
            className="work-listings-pill-bg flex flex-1 items-center justify-center min-w-0 rounded-full"
            style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '2px', paddingBottom: '2px' }}
          >
            <span
              className="work-listings-pill-text whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.12px' }}
            >
              {content.replyRatePill}
            </span>
          </div>
        </div>
      </div>
      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared card renderer — routes a `WorkCardData` to the right variant
// component, looking up chip colours from the matching `WorkIndustry`. Used
// by both the desktop `WorkShowcase` carousel and the `MobileWorkShowcase`
// industry strips, so card visual definitions live in exactly one place.
// ---------------------------------------------------------------------------

export function renderWorkCard(
  card: WorkCardData,
  industries: WorkIndustry[],
  key: string | number,
): React.ReactElement {
  const industry = industries.find((ind) => ind.id === card.industryId);
  const chipBg = industry?.chipBg ?? '#cbc5b4';
  const chipText = industry?.chipText ?? '#4f4d4a';

  switch (card.type) {
    case 'sales':
      return (
        <SalesCard
          key={key}
          content={card.content}
          chipLabel={card.chipLabel}
          chipBg={chipBg}
          chipText={chipText}
        />
      );
    case 'ads':
      return (
        <AdsCard
          key={key}
          content={card.content}
          chipLabel={card.chipLabel}
          chipBg={chipBg}
          chipText={chipText}
        />
      );
    case 'social':
      return (
        <SocialCard
          key={key}
          content={card.content}
          chipLabel={card.chipLabel}
          chipBg={chipBg}
          chipText={chipText}
        />
      );
    case 'web':
      return (
        <WebCard
          key={key}
          content={card.content}
          chipLabel={card.chipLabel}
          chipBg={chipBg}
          chipText={chipText}
        />
      );
    case 'content':
      return (
        <ContentCard
          key={key}
          content={card.content}
          chipLabel={card.chipLabel}
          chipBg={chipBg}
          chipText={chipText}
        />
      );
    case 'listings':
      return (
        <ListingsCard
          key={key}
          content={card.content}
          chipLabel={card.chipLabel}
          chipBg={chipBg}
          chipText={chipText}
        />
      );
  }
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function WorkShowcase({ headlineParts, industries, cards, staticPreview }: WorkShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: false,
    containScroll: false,
    duration: 50,
  });

  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  // Which card has the persistent "in-focus" (lifted + saturated) visual state.
  // Starts at 0 — Embla centers this card on first render with align: 'center'.
  const [focusedCardIndex, setFocusedCardIndex] = useState(0);
  const autoScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoScrollingRef = useRef(false);

  // Refs for the 5 original cards of the first industry — used by the GSAP entrance animation.
  // Explicit refs avoid selecting Embla's prepended loop-clones which share the same class name.
  const initialCardRefs = useRef<(HTMLElement | null)[]>([null, null, null, null, null]);

  // Stable ref so the GSAP closure always calls the current startAutoScroll.
  const startAutoScrollRef = useRef<() => void>(() => {});

  const industryForCard = useCallback(
    (cardIndex: number) => Math.floor(cardIndex / CARDS_PER_INDUSTRY),
    [],
  );

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimerRef.current !== null) {
      clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    isAutoScrollingRef.current = false;
  }, []);

  const scheduleNextScroll = useCallback(() => {
    stopAutoScroll();
    autoScrollTimerRef.current = setTimeout(() => {
      if (!emblaApi) return;
      const currentIndex = emblaApi.selectedScrollSnap();
      const currentIndustry = industryForCard(currentIndex);
      const nextIndustry = (currentIndustry + 1) % industries.length;
      const nextCardIndex = nextIndustry * CARDS_PER_INDUSTRY;
      isAutoScrollingRef.current = true;
      emblaApi.scrollTo(nextCardIndex);
      setFocusedCardIndex(nextCardIndex);
    }, 5000);
  }, [emblaApi, industries.length, industryForCard, stopAutoScroll]);

  const startAutoScroll = useCallback(() => {
    scheduleNextScroll();
  }, [scheduleNextScroll]);

  // Keep the ref current so the GSAP closure never goes stale.
  useEffect(() => { startAutoScrollRef.current = startAutoScroll; }, [startAutoScroll]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveIndustryIndex(industryForCard(index));
    };

    const onSettle = () => {
      if (isAutoScrollingRef.current) {
        isAutoScrollingRef.current = false;
        scheduleNextScroll();
      }
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, industryForCard, scheduleNextScroll]);

  useEffect(() => {
    return () => stopAutoScroll();
  }, [stopAutoScroll]);

  // Apply data-focused imperatively via slideNodes() so Embla's loop clones
  // (created via cloneNode) never inherit the focused state.
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.slideNodes().forEach((slide, i) => {
      slide.dataset.focused = i === focusedCardIndex ? 'true' : 'false';
    });
  }, [emblaApi, focusedCardIndex]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current;
        if (!section) return;

        // Only hide+offset the first 5 cards that will animate in.
        // Hiding all slides would also hide Embla's prepended loop-clones (copies
        // of the last category) which must be visible from the start so the loop
        // to the left works on first load.
        const initialCards = initialCardRefs.current.filter((el): el is HTMLElement => !!el);
        gsap.set(initialCards, { opacity: 0, y: 30 });

        // Track whether the card animation has finished — used to gate the
        // second snap point so the visitor cannot advance past the section
        // until all cards are visible (spec: hold while transitions play).
        let played = false;
        let animComplete = false;

        const playEntrance = () => {
          logSectionEvent('work-pin', 'ANIM_ENTER_CALLED', { played });
          if (played) return;
          played = true;
          logSectionEvent('work-pin', 'ANIM_START', { cardCount: initialCards.length });
          gsap.to(initialCards, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power2.out',
            stagger: 0.3,
            onComplete: () => {
              // Only clear GSAP inline styles from the cards we actually animated.
              // Calling clearProps on Embla's loop-clone nodes removes their
              // Embla-injected transform, causing them to snap out of position.
              gsap.set(initialCards, { clearProps: 'opacity,y,transform' });
              startAutoScrollRef.current();
              animComplete = true;
              logSectionEvent('work-pin', 'ANIM_COMPLETE');
            },
          });
        };

        createSectionPin({
          id: 'work-pin',
          section,
          onEnter: playEntrance,
          isAnimComplete: () => animComplete,
        });
      });

      // Reduced motion: show all cards and start carousel on entry, no pin
      mm.add('(min-width: 768px) and (prefers-reduced-motion: reduce)', () => {
        const section = sectionRef.current;
        if (!section) return;

        const allOriginals = Array.from(
          section.querySelectorAll('.work-card-item'),
        ) as HTMLElement[];
        gsap.set(allOriginals, { clearProps: 'all' });

        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => startAutoScrollRef.current(),
        });
      });

      // No mobile branch — MobileWorkShowcase (Spec 023) renders below 768px
      // and the desktop section is `hidden md:block`. A ScrollTrigger pinning
      // a display:none element would create zero-height trigger zones and
      // race with Embla measurements.
    }, sectionRef);

    return () => ctx.revert();
    // Pin setup is intentionally mount-only; all callbacks access state via
    // stable refs (startAutoScrollRef, initialCardRefs) to avoid stale closures.
  }, []);

  const handleCategoryClick = useCallback(
    (industryIndex: number) => {
      if (!emblaApi) return;
      stopAutoScroll();
      const firstCardIndex = industryIndex * CARDS_PER_INDUSTRY;
      emblaApi.scrollTo(firstCardIndex);
      setActiveIndustryIndex(industryIndex);
      setFocusedCardIndex(firstCardIndex);
      isAutoScrollingRef.current = true;
    },
    [emblaApi, stopAutoScroll],
  );

  const handleCardClick = useCallback(
    (cardIndex: number) => {
      if (!emblaApi) return;
      stopAutoScroll();
      emblaApi.scrollTo(cardIndex);
      setActiveIndustryIndex(industryForCard(cardIndex));
      setFocusedCardIndex(cardIndex);
    },
    [emblaApi, stopAutoScroll, industryForCard],
  );

  const handleCarouselMouseEnter = useCallback(() => {
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handleCarouselMouseLeave = useCallback(() => {
    if (!emblaApi) return;
    scheduleNextScroll();
  }, [emblaApi, scheduleNextScroll]);

  const activeIndustry = industries[activeIndustryIndex];

  const renderCard = (card: WorkCardData, index: number) =>
    renderWorkCard(card, industries, index);

  // ── Static preview mode (no GSAP, no Embla) ─────────────────────────────
  if (staticPreview) {
    return (
      <div style={{ backgroundColor: '#f0eee6', padding: '40px 24px' }}>
        {industries.map((industry, industryIdx) => {
          const industryCards = cards.filter((c) => c.industryId === industry.id);
          return (
            <div key={industry.id} style={{ marginBottom: '80px' }}>
              <h2
                style={{
                  fontFamily: "'FK Screamer', sans-serif",
                  fontSize: '36px',
                  color: industry.activeColor,
                  marginBottom: '24px',
                  letterSpacing: '-0.5px',
                }}
              >
                {industry.label}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start' }}>
                {industryCards.map((card, i) => (
                  <div key={i} style={{ flexShrink: 0 }}>
                    {renderCard(card, industryIdx * CARDS_PER_INDUSTRY + i)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      // hidden md:block — below 768px, MobileWorkShowcase (Spec 023) takes
      // over with a per-industry strip layout. The desktop section here
      // assumes ScrollSmoother + Embla + GSAP entrance, none of which suit
      // a touch device.
      className="hidden md:block relative w-full overflow-hidden h-screen"
      style={{ backgroundColor: '#f0eee6' }}
    >
      {/* Section headline — centered, 32px FK Roman Standard, mixed oblique */}
      <div
        className="pointer-events-none absolute inset-x-0 flex justify-center"
        style={{ top: '78px', transform: 'translateY(-50%)' }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: "'FK Roman Standard', serif",
            fontSize: '32px',
            lineHeight: '1.2',
            color: '#4f4d4a',
            letterSpacing: '-0.96px',
            maxWidth: '384px',
          }}
        >
          {headlineParts.map((part, i) =>
            part.oblique ? (
              <span key={i} style={{ fontStyle: 'oblique' }}>
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
      </div>

      {/* Carousel — vertically centered between the headline and the category bar */}
      <div
        className="absolute inset-x-0"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
        onMouseEnter={handleCarouselMouseEnter}
        onMouseLeave={handleCarouselMouseLeave}
      >
        <div
          ref={emblaRef}
          className="w-full"
          style={{ overflowX: 'clip', overflowY: 'visible' }}
        >
          <div
            className="flex items-start"
            style={{ paddingRight: '24px' }}
          >
            {cards.map((card, i) => (
              <button
                key={i}
                type="button"
                className="work-card-item shrink-0"
                ref={i < 5 ? (el) => { initialCardRefs.current[i] = el; } : undefined}
                onClick={() => handleCardClick(i)}
                aria-label={`Show case study ${i + 1} of ${cards.length}`}
                aria-current={i === focusedCardIndex ? 'true' : undefined}
              >
                {renderCard(card, i)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category bar + sub-labels — bottom-anchored, always 24px from section bottom */}
      <div className="absolute bottom-6 left-0 right-0 hidden flex-col items-center gap-2 md:flex">
        <div className="flex items-end gap-[24px]">
          {industries.map((industry, i) => (
            <button
              key={industry.id}
              className="work-category-btn uppercase leading-[0.82]"
              data-active={i === activeIndustryIndex ? 'true' : 'false'}
              style={{
                fontFamily: "'FK Screamer', sans-serif",
                fontWeight: 700,
                fontSize: '50px',
                ...(i === activeIndustryIndex ? { color: industry.activeColor } : undefined),
              }}
              onClick={() => handleCategoryClick(i)}
              aria-pressed={i === activeIndustryIndex}
            >
              {industry.label}
            </button>
          ))}
        </div>
        <div className="flex items-baseline gap-[8px]">
          {activeIndustry?.subLabels.map((label, i) => (
            <span key={i} className="flex items-baseline gap-[8px]">
              {i > 0 && (
                <span
                  style={{
                    color: activeIndustry.subLabelsColor,
                    fontFamily: "'FK Grotesk Mono', monospace",
                    fontSize: '16px',
                    letterSpacing: '-0.32px',
                  }}
                >
                  •
                </span>
              )}
              <span
                style={{
                  color: activeIndustry.subLabelsColor,
                  fontFamily: "'FK Grotesk Mono', monospace",
                  fontSize: '18px',
                  letterSpacing: '-0.36px',
                }}
              >
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
