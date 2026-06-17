import React from 'react';
import type { CarouselData, CarouselTheme, SlideData } from '../types';

const DEFAULT_BADGE_COLORS = ['#d9f99d', '#bef264', '#ecfccb', '#fef08a', '#bbf7d0', '#fbcfe8'];

// Positions spread across y:15–165 with clearance before the card (top:210).
// Left edge kept clear of the swipe indicator (top:24, left:24).
const SCATTER_POSITIONS = [
  { top: 20,  left: 580, fontSize: 34, rotate: 5,   opacity: 0.55 },
  { top: 30,  left: 800, fontSize: 24, rotate: -8,  opacity: 0.50 },
  { top: 64,  left: 420, fontSize: 28, rotate: -6,  opacity: 0.55 },
  { top: 54,  left: 720, fontSize: 30, rotate: 6,   opacity: 0.50 },
  { top: 90,  left: 870, fontSize: 22, rotate: 10,  opacity: 0.45 },
  { top: 112, left: 530, fontSize: 24, rotate: -9,  opacity: 0.45 },
  { top: 130, left: 700, fontSize: 36, rotate: -4,  opacity: 0.60 },
  { top: 148, left: 295, fontSize: 22, rotate: 9,   opacity: 0.40 },
];

const DEFAULT_THEME: CarouselTheme = {
  bg: '#f7fee7',
  gridColor: 'rgba(101,163,13,0.08)',
  accentColor: '#65a30d',
  cardBg: '#ffffff',
};

function SwipeIndicator({ color }: { color: string }) {
  return (
    <svg
      width="96" height="96"
      viewBox="0 0 96 96"
      style={{ position: 'absolute', top: 24, left: 24 }}
    >
      <circle cx="48" cy="48" r="44" fill="none" stroke={color} strokeWidth="3" opacity="0.3" />
      <path
        d="M30,48 H64 M50,34 L64,48 L50,62"
        fill="none" stroke={color} strokeWidth="4.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function BrandMark({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 56, height: 56, borderRadius: '50%',
        backgroundColor: color, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 30, color: '#ffffff' }}>a</span>
    </div>
  );
}

export interface CarouselSlideProps {
  slide: SlideData;
  index: number;
  total: number;
  brand: Pick<CarouselData, 'brandName' | 'brandTagline' | 'ctaText' | 'scatterWords' | 'theme'>;
  style?: React.CSSProperties;
}

export const CarouselSlide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ slide, index, brand, style: extraStyle }, ref) => {
    const theme: CarouselTheme = { ...DEFAULT_THEME, ...brand.theme };
    const badgeColor = slide.badgeColor ?? DEFAULT_BADGE_COLORS[index % DEFAULT_BADGE_COLORS.length];
    const badgeLabel = slide.badgeText ?? String(index + 1).padStart(2, '0');
    const words = brand.scatterWords ?? [];
    const hasBody = Boolean(slide.body);

    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          height: 1350,
          position: 'relative',
          backgroundColor: theme.bg,
          backgroundImage: `radial-gradient(circle, ${theme.gridColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
          fontFamily: "'Outfit', sans-serif",
          overflow: 'hidden',
          boxSizing: 'border-box',
          ...extraStyle,
        }}
      >
        <SwipeIndicator color={theme.accentColor} />

        {/* Scatter words */}
        {words.slice(0, 8).map((word, i) => {
          const pos = SCATTER_POSITIONS[i] ?? SCATTER_POSITIONS[0];
          return (
            <div
              key={word}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                fontSize: pos.fontSize,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                color: theme.accentColor,
                opacity: pos.opacity,
                transform: `rotate(${pos.rotate}deg)`,
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {word}
            </div>
          );
        })}

        {/* Soft card shadow — sibling div instead of box-shadow (html2canvas misrenders box-shadow as a solid fill) */}
        <div
          style={{
            position: 'absolute',
            top: 216,
            left: 72,
            width: 944,
            height: 955,
            backgroundColor: '#e7e5e4',
            borderRadius: 48,
          }}
        />

        {/* Main card */}
        <div
          style={{
            position: 'absolute',
            top: 210,
            left: 68,
            width: 944,
            height: 955,
            backgroundColor: theme.cardBg,
            border: '1px solid #e5e5e5',
            borderRadius: 48,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: slide.hideBadge ? '80px 88px 64px' : '64px 88px 60px',
          }}
        >
          {/* Slide number badge */}
          {!slide.hideBadge && (
            <div
              style={{
                backgroundColor: badgeColor,
                borderRadius: 100,
                padding: '12px 46px',
                fontSize: 48,
                fontWeight: 700,
                letterSpacing: 1,
                color: '#171717',
                fontFamily: "'Outfit', sans-serif",
                flexShrink: 0,
              }}
            >
              {badgeLabel}
            </div>
          )}

          {/* Headline */}
          <div
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: slide.hideBadge ? 0 : 52,
              paddingBottom: slide.saveNote ? 16 : 36,
              // Explicit bg prevents html2canvas from rendering this flex:1 child as a black canvas
              backgroundColor: theme.cardBg,
            }}
          >
            <div
              style={{
                fontSize: 68,
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: -0.5,
                textAlign: 'center',
                color: '#171717',
                fontFamily: "'Outfit', sans-serif",
                whiteSpace: 'pre-line',
              }}
            >
              {slide.headline}
            </div>
          </div>

          {/* Save note */}
          {slide.saveNote && (
            <div
              style={{
                fontSize: 30,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 400,
                color: '#a3a3a3',
                fontStyle: 'italic',
                textAlign: 'center',
                marginBottom: 36,
                flexShrink: 0,
              }}
            >
              {slide.saveNote}
            </div>
          )}

          {/* Divider + body */}
          {hasBody && (
            <>
              <div
                style={{
                  width: '55%',
                  height: 2,
                  backgroundColor: '#e5e5e5',
                  marginBottom: 40,
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontSize: 36,
                  lineHeight: 1.6,
                  fontWeight: 300,
                  textAlign: 'center',
                  color: '#525252',
                  fontFamily: "'Outfit', sans-serif",
                  flexShrink: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {slide.body}
                {slide.emoji && (
                  <span style={{ marginLeft: 10, fontSize: 40 }}>{slide.emoji}</span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 168,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 30,
            gap: 8,
          }}
        >
          <BrandMark color={theme.accentColor} />
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#171717',
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: -0.3,
              marginTop: 2,
            }}
          >
            {brand.brandName}
          </div>
          <div style={{ fontSize: 22, fontWeight: 300, color: '#737373', fontFamily: "'Outfit', sans-serif" }}>
            {brand.brandTagline}
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, color: theme.accentColor, fontFamily: "'Outfit', sans-serif", marginTop: 2 }}>
            {brand.ctaText}
          </div>
        </div>
      </div>
    );
  }
);
CarouselSlide.displayName = 'CarouselSlide';
