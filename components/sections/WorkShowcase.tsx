'use client';

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

export interface AdsCardContent {
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

export interface SocialCardContent {
  profileName: string;
  photoSrc: string;
  photoOverlaySrc: string;
  caption: string;
  avatarDefaultSrc: string;
  avatarFocusedSrc: string;
  heartIconSrc: string;
  heartIconFocusedSrc: string;
  commentIconSrc: string;
  shareIconSrc: string;
  saveIconSrc: string;
}

export interface WebCardContent {
  logoSrc: string;
  navLinks: string[];
  buyButtonLabel: string;
  bookButtonLabel: string;
  heroSrc: string;
  heroOverlaySrc: string;
  heroHeadlineLines: string[];
  bookCtaLabel: string;
  belowFoldHeading: string;
  galleryImageSrcs: [string, string, string];
}

export interface ContentCardContent {
  wordmarkSrc: string;
  tagLabel: string;
  headline: string;
  byline: string;
  photoSrc: string;
  bodyParagraphs: [string, string];
}

export type WorkCardData =
  | { type: 'sales'; industryId: string; chipLabel: string; content: SalesCardContent }
  | { type: 'ads'; industryId: string; chipLabel: string; content: AdsCardContent }
  | { type: 'social'; industryId: string; chipLabel: string; content: SocialCardContent }
  | { type: 'web'; industryId: string; chipLabel: string; content: WebCardContent }
  | { type: 'content'; industryId: string; chipLabel: string; content: ContentCardContent };

export interface WorkShowcaseProps {
  headlineParts: HeadlinePart[];
  industries: WorkIndustry[];
  cards: WorkCardData[];
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
      <div
        className="work-sales-outer relative overflow-hidden"
        style={{ width: '302px', height: '638px', borderRadius: '56px' }}
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

        {/* Home indicator */}
        <div
          className="work-sales-indicator absolute bottom-[8px] left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: '92px', height: '4px' }}
        />
      </div>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ads card — Facebook/Meta story format (286 × 594, rounded-[8px])
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
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      <div
        className="relative overflow-hidden"
        style={{
          width: '286px',
          height: '594px',
          borderRadius: '8px',
          backgroundColor: '#e0ddd1',
        }}
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
      </div>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
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
      <div
        className="work-social-outer relative overflow-hidden flex flex-col"
        style={{
          width: '292px',
          height: '424px',
          borderRadius: '8px',
          padding: '17.557px 21.068px',
          gap: '10.534px',
          backdropFilter: 'blur(5.267px)',
        }}
      >
        {/* Profile header */}
        <div
          className="flex items-center flex-shrink-0"
          style={{ width: '250px', gap: '7.023px' }}
        >
          {/* Avatar: default/focused swap via CSS opacity */}
          <div className="relative flex-shrink-0" style={{ width: '36px', height: '36px' }}>
            <Image src={content.avatarDefaultSrc} alt="" width={36} height={36} className="work-social-avatar-default rounded-full" unoptimized />
            <Image src={content.avatarFocusedSrc} alt="" width={36} height={36} className="work-social-avatar-focused rounded-full absolute inset-0" unoptimized />
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
      </div>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Web card — studio website mock (868 × 583, rounded-[16px])
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
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      {/* Outer wrapper: rounded-[16px], p-[7px] */}
      <div
        className="work-web-outer relative overflow-hidden"
        style={{
          width: '868px',
          borderRadius: '16px',
          padding: '7px',
          backdropFilter: 'blur(12.024px)',
        }}
      >
        {/* Inner card */}
        <div
          className="work-web-inner relative overflow-hidden"
          style={{ height: '569px', borderRadius: '10px' }}
        >
          {/* Logo */}
          <div className="absolute" style={{ left: '24px', top: '24px', width: '114px', height: '18px' }}>
            <Image src={content.logoSrc} alt="X2O Studio" fill unoptimized />
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

          {/* Hero image — mix-blend-luminosity, full width; inner div replicates Figma positioning */}
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
                lineHeight: 0,
              }}
            >
              {content.heroHeadlineLines.map((line, i) => (
                <span key={i} style={{ display: 'block', lineHeight: '1' }}>{line}</span>
              ))}
            </p>
          </div>

          {/* Book Your Class CTA */}
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

          {/* Gallery images — partially clipped by inner card height; inner div replicates Figma positioning */}
          {/* Gallery 1: image starts at top of frame, extends 50% below visible area */}
          <div
            className="work-img-blend absolute overflow-hidden rounded-[6px]"
            style={{ top: '534px', left: '79px', width: '200px', height: '200px' }}
          >
            <div className="absolute" style={{ width: '100%', height: '150%', top: '0' }}>
              <Image src={content.galleryImageSrcs[0]} alt="" fill className="object-cover" unoptimized />
            </div>
          </div>
          {/* Gallery 2: image starts 18.5% above frame, extends 31.5% below */}
          <div
            className="work-img-blend absolute overflow-hidden rounded-[6px] left-1/2 -translate-x-1/2"
            style={{ top: '534px', width: '200px', height: '200px' }}
          >
            <div className="absolute" style={{ width: '100%', height: '150%', top: '-18.5%' }}>
              <Image src={content.galleryImageSrcs[1]} alt="" fill className="object-cover" unoptimized />
            </div>
          </div>
          {/* Gallery 3: standard object-cover */}
          <div
            className="work-img-blend absolute overflow-hidden rounded-[6px]"
            style={{ top: '534px', left: '575px', width: '200px', height: '200px' }}
          >
            <Image src={content.galleryImageSrcs[2]} alt="" fill className="object-cover" unoptimized />
          </div>
        </div>
      </div>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Content card — blog article format (316 × 583, rounded-[16px])
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
  return (
    <div className="work-card-wrapper flex flex-col items-center gap-[16px] pt-[24px]">
      {/* Outer: rounded-[16px], overflow-hidden */}
      <div
        className="work-content-outer relative overflow-hidden"
        style={{ width: '316px', height: '583px', borderRadius: '16px' }}
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
              fontFamily: 'system-ui, sans-serif',
              fontSize: '24px',
              letterSpacing: '-0.24px',
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
              fontFamily: 'system-ui, sans-serif',
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
              style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px' }}
            >
              <strong className="font-bold">{content.bodyParagraphs[0].split(',')[0]}</strong>
              {content.bodyParagraphs[0].substring(content.bodyParagraphs[0].indexOf(','))}
            </p>
            <p
              className="work-content-body leading-[1.3] mt-[13px]"
              style={{ fontFamily: 'system-ui, sans-serif', fontSize: '12px' }}
            >
              {content.bodyParagraphs[1]}
            </p>
          </div>
        </div>
      </div>

      <Chip label={chipLabel} bg={chipBg} color={chipText} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function WorkShowcase({ headlineParts, industries, cards }: WorkShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    // Custom align: position every selected slide 24 px from the viewport left edge.
    // Using a pixel-returning function bypasses Embla's containerPadding compensation
    // that occurs with 'start', which would otherwise cancel the paddingLeft offset.
    align: () => 24,
    dragFree: false,
    containScroll: false,
    duration: 50,
  });

  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const autoScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoScrollingRef = useRef(false);

  // Refs for the 5 original cards of the default industry.
  // Using explicit refs (not querySelectorAll) to avoid selecting Embla's prepended
  // loop-clones, which appear before the originals in the DOM after Embla initialises.
  const initialCardRefs = useRef<(HTMLElement | null)[]>([null, null, null, null, null]);

  // Stable ref so the GSAP closure always calls the current startAutoScroll without
  // needing the useLayoutEffect to re-run when emblaApi becomes available.
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
    }, 5000);
  }, [emblaApi, industries.length, industryForCard, stopAutoScroll]);

  const startAutoScroll = useCallback(() => {
    scheduleNextScroll();
  }, [scheduleNextScroll]);

  // Keep the ref current so the GSAP closure never goes stale
  useEffect(() => {
    startAutoScrollRef.current = startAutoScroll;
  }, [startAutoScroll]);

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current;
        if (!section) return;

        // Hide every original .work-card-item before Embla's useEffect runs.
        // Embla creates loop-clones via cloneNode(true), so clones start hidden too.
        const allOriginals = Array.from(
          section.querySelectorAll('.work-card-item'),
        ) as HTMLElement[];
        gsap.set(allOriginals, { opacity: 0 });

        // First 5 real cards get the upward offset for the slide-in
        const initialCards = initialCardRefs.current.filter((el): el is HTMLElement => !!el);
        gsap.set(initialCards, { y: 30 });

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
              const allCards = Array.from(
                section.querySelectorAll('.work-card-item'),
              ) as HTMLElement[];
              gsap.set(allCards, { clearProps: 'all' });
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

    }, sectionRef);

    return () => ctx.revert();
    // Pin setup is intentionally mount-only; all callbacks access state via
    // stable refs (startAutoScrollRef, initialCardRefs) to avoid stale closures.
  }, []);

  useEffect(() => {
    return () => stopAutoScroll();
  }, [stopAutoScroll]);

  const handleCategoryClick = useCallback(
    (industryIndex: number) => {
      if (!emblaApi) return;
      stopAutoScroll();
      const cardIndex = industryIndex * CARDS_PER_INDUSTRY;
      emblaApi.scrollTo(cardIndex);
      setActiveIndustryIndex(industryIndex);
      // Resume auto-scroll after the user picks a category tab — the intent is
      // to browse all industries in sequence. Contrast with handleCardClick,
      // which leaves isAutoScrollingRef false so the user stays on their pick.
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

  function renderCard(card: WorkCardData, index: number) {
    const industry = industries.find((ind) => ind.id === card.industryId);
    const chipBg = industry?.chipBg ?? '#cbc5b4';
    const chipText = industry?.chipText ?? '#4f4d4a';

    switch (card.type) {
      case 'sales':
        return (
          <SalesCard
            key={index}
            content={card.content}
            chipLabel={card.chipLabel}
            chipBg={chipBg}
            chipText={chipText}
          />
        );
      case 'ads':
        return (
          <AdsCard
            key={index}
            content={card.content}
            chipLabel={card.chipLabel}
            chipBg={chipBg}
            chipText={chipText}
          />
        );
      case 'social':
        return (
          <SocialCard
            key={index}
            content={card.content}
            chipLabel={card.chipLabel}
            chipBg={chipBg}
            chipText={chipText}
          />
        );
      case 'web':
        return (
          <WebCard
            key={index}
            content={card.content}
            chipLabel={card.chipLabel}
            chipBg={chipBg}
            chipText={chipText}
          />
        );
      case 'content':
        return (
          <ContentCard
            key={index}
            content={card.content}
            chipLabel={card.chipLabel}
            chipBg={chipBg}
            chipText={chipText}
          />
        );
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden h-screen"
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

      {/* Carousel — top at 156px, items-start (top-aligned), chips overflow below */}
      <div
        className="absolute inset-x-0"
        style={{ top: '156px' }}
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
            style={{ gap: '32px', paddingRight: '24px' }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className="work-card-item shrink-0 cursor-pointer"
                ref={i < 5 ? (el) => { initialCardRefs.current[i] = el; } : undefined}
                onClick={() => handleCardClick(i)}
              >
                {renderCard(card, i)}
              </div>
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
