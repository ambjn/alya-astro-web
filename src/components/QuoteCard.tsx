import React from 'react';
import type { QuoteCardData, QuoteCardTheme } from '@/lib/mockData';

const DEFAULT_THEME: QuoteCardTheme = {
  bg: '#f7fee7',
  textColor: '#171717',
  accentColor: '#65a30d',
};

function ChatBubbleDoodle({ color }: { color: string }) {
  return (
    <svg
      width="76" height="64"
      viewBox="0 0 76 64"
      style={{ position: 'absolute', top: 76, right: 92, opacity: 0.3 }}
    >
      <path
        d="M6,8 H70 a4,4 0 0 1 4,4 V42 a4,4 0 0 1 -4,4 H26 L12,58 V46 H6 a4,4 0 0 1 -4,-4 V12 a4,4 0 0 1 4,-4 Z"
        fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round"
      />
      <circle cx="24" cy="26" r="3.2" fill={color} />
      <circle cx="38" cy="26" r="3.2" fill={color} />
      <circle cx="52" cy="26" r="3.2" fill={color} />
    </svg>
  );
}

export interface QuoteCardProps {
  data: QuoteCardData;
  style?: React.CSSProperties;
}

export const QuoteCard = React.forwardRef<HTMLDivElement, QuoteCardProps>(
  ({ data, style: extraStyle }, ref) => {
    const theme: QuoteCardTheme = { ...DEFAULT_THEME, ...data.theme };
    const lines = data.quote.split('\n');

    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          height: 1080,
          position: 'relative',
          backgroundColor: theme.bg,
          backgroundImage: 'radial-gradient(circle, rgba(23,23,23,0.05) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          fontFamily: "'Outfit', sans-serif",
          overflow: 'hidden',
          boxSizing: 'border-box',
          ...extraStyle,
        }}
      >
        {/* Oversized faded open-quote — purely decorative */}
        <div
          style={{
            position: 'absolute',
            top: -50,
            left: 48,
            fontSize: 400,
            fontWeight: 700,
            fontFamily: "'Outfit', sans-serif",
            color: theme.accentColor,
            opacity: 0.08,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {'“'}
        </div>

        <ChatBubbleDoodle color={theme.accentColor} />

        {/* Main content — vertically centered */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 112px',
          }}
        >
          {/* Quote lines */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            {lines.map((line, i) => {
              if (line.trim() === '') {
                return <div key={i} style={{ height: 32 }} />;
              }

              const isHighlight = Boolean(data.highlight && line.includes(data.highlight));

              return (
                <div
                  key={i}
                  style={{
                    display: 'block',
                    fontSize: 100,
                    fontWeight: 600,
                    letterSpacing: -1,
                    lineHeight: 1.32,
                    color: theme.textColor,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {isHighlight ? (
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                      <span
                        style={{
                          position: 'absolute',
                          top: '10%',
                          bottom: '6%',
                          left: '-4%',
                          right: '-4%',
                          backgroundColor: theme.accentColor,
                          opacity: 0.22,
                          borderRadius: 14,
                          transform: 'rotate(-1deg)',
                          zIndex: 0,
                        }}
                      />
                      <span style={{ position: 'relative', zIndex: 1 }}>{line}</span>
                    </span>
                  ) : (
                    line
                  )}
                </div>
              );
            })}
          </div>

          {/* Attribution */}
          <div
            style={{
              fontSize: 44,
              fontWeight: 500,
              fontFamily: "'Outfit', sans-serif",
              color: theme.accentColor,
              letterSpacing: 0.2,
            }}
          >
            {data.attribution}
          </div>
        </div>

        {/* Brand mark */}
        <div
          style={{
            position: 'absolute',
            bottom: 52,
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
QuoteCard.displayName = 'QuoteCard';
