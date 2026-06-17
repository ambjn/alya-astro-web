import React from 'react';
import type { QuoteCardTheme } from '../types';

const DEFAULT_THEME: QuoteCardTheme = {
  bg: '#fafaf9',
  textColor: '#171717',
  accentColor: '#65a30d',
};

export interface SlideshowSlideProps {
  text: string; // newline-delimited
  theme?: Partial<QuoteCardTheme>;
  style?: React.CSSProperties;
}

export const SlideshowSlide = React.forwardRef<HTMLDivElement, SlideshowSlideProps>(
  ({ text, theme: themeOverride, style: extraStyle }, ref) => {
    const theme: QuoteCardTheme = { ...DEFAULT_THEME, ...themeOverride };
    const lines = text.split('\n');

    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          height: 1920,
          position: 'relative',
          backgroundColor: theme.bg,
          backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.05) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          fontFamily: "'Outfit', sans-serif",
          overflow: 'hidden',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 96px',
          ...extraStyle,
        }}
      >
        {/* Accent dash */}
        <div
          style={{
            width: 72,
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.accentColor,
            marginBottom: 44,
            flexShrink: 0,
          }}
        />

        <div style={{ textAlign: 'center' }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: 104,
                fontWeight: 700,
                letterSpacing: -1.5,
                lineHeight: 1.28,
                color: theme.textColor,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 72,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 600,
            fontFamily: "'Outfit', sans-serif",
            color: theme.textColor,
            opacity: 0.3,
            letterSpacing: 0.5,
          }}
        >
          alya
        </div>
      </div>
    );
  }
);
SlideshowSlide.displayName = 'SlideshowSlide';
