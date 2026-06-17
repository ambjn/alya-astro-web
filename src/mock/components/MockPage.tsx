import React, { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { CarouselSlide } from './CarouselSlide';
import { QuoteCard } from './QuoteCard';
import { SlideshowSlide } from './SlideshowSlide';
import carouselsJson from '../data/carousels.json';
import quoteCardsJson from '../data/quoteCards.json';
import slideshowsJson from '../data/slideshows.json';
import type { CarouselData, SlideData, QuoteCardData, SlideshowData } from '../types';

const mockCarousels = carouselsJson as CarouselData[];
const mockQuoteCards = quoteCardsJson as QuoteCardData[];
const mockSlideshows = slideshowsJson as SlideshowData[];

const PREVIEW_SCALE = 0.37;
const SLIDE_W = Math.round(1080 * PREVIEW_SCALE);
const SLIDE_H = Math.round(1350 * PREVIEW_SCALE);

type Brand = Pick<CarouselData, 'brandName' | 'brandTagline' | 'ctaText' | 'scatterWords' | 'theme'>;

async function captureSlide(
  slide: SlideData,
  index: number,
  total: number,
  brand: Brand,
  filename: string,
) {
  // Mount a full-size slide at viewport origin, capture, then remove.
  // Rendering at (0,0) guarantees the browser fully paints it — no off-screen culling.
  const wrapper = document.createElement('div');
  wrapper.style.cssText =
    'position:fixed;top:0;left:0;z-index:999999;pointer-events:none;';
  document.body.appendChild(wrapper);

  const { createRoot } = await import('react-dom/client');
  const root = createRoot(wrapper);
  root.render(React.createElement(CarouselSlide, { slide, index, total, brand }));

  // Give React + browser two full frames to paint, then ensure fonts are ready
  await new Promise(r => setTimeout(r, 80));
  await document.fonts.load('600 40px Outfit');
  await document.fonts.load('700 40px Outfit');

  const el = wrapper.firstElementChild as HTMLDivElement;
  const { default: h2c } = await import('html2canvas');
  const canvas = await h2c(el, {
    scale: 1,
    useCORS: true,
    allowTaint: false,
    logging: false,
    width: 1080,
    height: 1350,
  });

  root.unmount();
  document.body.removeChild(wrapper);

  const a = document.createElement('a');
  a.download = filename;
  a.href = canvas.toDataURL('image/png', 1.0);
  a.click();
}

const QUOTE_SCALE = 0.37;
const QUOTE_W = Math.round(1080 * QUOTE_SCALE);
const QUOTE_H = Math.round(1080 * QUOTE_SCALE);

async function captureQuoteCard(data: QuoteCardData, filename: string) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:fixed;top:0;left:0;z-index:999999;pointer-events:none;';
  document.body.appendChild(wrapper);

  const { createRoot } = await import('react-dom/client');
  const root = createRoot(wrapper);
  root.render(React.createElement(QuoteCard, { data }));

  await new Promise(r => setTimeout(r, 80));
  await document.fonts.load('600 40px Outfit');
  await document.fonts.load('700 40px Outfit');

  const el = wrapper.firstElementChild as HTMLDivElement;
  const { default: h2c } = await import('html2canvas');
  const canvas = await h2c(el, {
    scale: 1,
    useCORS: true,
    allowTaint: false,
    logging: false,
    width: 1080,
    height: 1080,
  });

  root.unmount();
  document.body.removeChild(wrapper);

  const a = document.createElement('a');
  a.download = filename;
  a.href = canvas.toDataURL('image/png', 1.0);
  a.click();
}

const SHOW_SCALE = 0.26;
const SHOW_W = Math.round(1080 * SHOW_SCALE);
const SHOW_H = Math.round(1920 * SHOW_SCALE);

async function captureSlideshowSlide(
  text: string,
  theme: SlideshowData['theme'],
  filename: string,
) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:fixed;top:0;left:0;z-index:999999;pointer-events:none;';
  document.body.appendChild(wrapper);

  const { createRoot } = await import('react-dom/client');
  const root = createRoot(wrapper);
  root.render(React.createElement(SlideshowSlide, { text, theme }));

  await new Promise(r => setTimeout(r, 80));
  await document.fonts.load('600 40px Outfit');
  await document.fonts.load('700 40px Outfit');

  const el = wrapper.firstElementChild as HTMLDivElement;
  const { default: h2c } = await import('html2canvas');
  const canvas = await h2c(el, {
    scale: 1,
    useCORS: true,
    allowTaint: false,
    logging: false,
    width: 1080,
    height: 1920,
  });

  root.unmount();
  document.body.removeChild(wrapper);

  const a = document.createElement('a');
  a.download = filename;
  a.href = canvas.toDataURL('image/png', 1.0);
  a.click();
}

function CoverMediaPicker() {
  const [src, setSrc] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSrc(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setIsVideo(file.type.startsWith('video'));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          width: SHOW_W,
          height: SHOW_H,
          overflow: 'hidden',
          position: 'relative',
          borderRadius: 16,
          border: '2px dashed #d4d4d4',
          flexShrink: 0,
          background: '#fafaf9',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {src ? (
          isVideo ? (
            <video
              src={src} muted loop autoPlay playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img
              src={src} alt="reel cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )
        ) : (
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: 14, color: '#a3a3a3',
            textAlign: 'center', padding: '0 18px', lineHeight: 1.4,
          }}>
            click to drop your photo/video
          </span>
        )}
        <input ref={inputRef} type="file" accept="image/*,video/*" hidden onChange={onPick} />
      </div>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#171717' }}>
        slide 1 · your photo/video
      </span>
    </div>
  );
}

function PrimaryButton({
  onClick, disabled, busy, children,
}: { onClick: () => void; disabled?: boolean; busy?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 26px',
        background: busy ? '#e5e5e5' : '#171717',
        color: busy ? '#a3a3a3' : '#ffffff',
        border: 'none',
        borderRadius: 100,
        fontFamily: "'Outfit', sans-serif",
        fontSize: 15, fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  onClick, disabled, active, children,
}: { onClick: () => void; disabled?: boolean; active?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '6px 14px',
        background: active ? '#65a30d' : '#ffffff',
        color: active ? '#ffffff' : '#171717',
        border: active ? '1px solid #65a30d' : '1px solid #e5e5e5',
        borderRadius: 10,
        fontFamily: "'Outfit', sans-serif",
        fontSize: 13, fontWeight: 600,
        cursor: disabled && !active ? 'not-allowed' : 'pointer',
        opacity: disabled && !active ? 0.4 : 1,
      }}
    >
      {children}
    </button>
  );
}

function SectionHeading({ title, hint }: { title: string; hint: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28, marginTop: 12 }}>
      <h1 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 32, fontWeight: 700, letterSpacing: -0.5,
        color: '#171717', marginBottom: 6,
      }}>
        {title}
      </h1>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 300, color: '#737373' }}>
        {hint}
      </p>
    </div>
  );
}

function CodeTag({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      fontFamily: 'monospace',
      background: '#ecfccb',
      padding: '2px 7px',
      borderRadius: 5,
      fontSize: 13,
      color: '#3f6212',
    }}>
      {children}
    </code>
  );
}

function SlideshowSection({ data }: { data: SlideshowData }) {
  const [downloading, setDownloading] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const downloadOne = async (i: number) => {
    if (downloading !== null) return;
    setDownloading(i);
    try {
      // slide 1 is the cover photo/video, so text slides start numbering at 2
      await captureSlideshowSlide(data.slides[i].text, data.theme, `${i + 2}.png`);
    } finally {
      setDownloading(null);
    }
  };

  const copyCaption = async () => {
    await navigator.clipboard.writeText(data.caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section style={{ marginBottom: 64 }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: '#171717',
        }}>
          {data.persona}
        </h3>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 300, color: '#a3a3a3' }}>
          {data.slides.length + 1} slides · {data.hashtagSet}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', marginBottom: 20 }}>
        <CoverMediaPicker />

        {data.slides.map((slide, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: SHOW_W,
              height: SHOW_H,
              overflow: 'hidden',
              position: 'relative',
              borderRadius: 16,
              border: '1px solid #e5e5e5',
              flexShrink: 0,
              background: data.theme?.bg ?? '#fafaf9',
            }}>
              <SlideshowSlide
                text={slide.text}
                theme={data.theme}
                style={{
                  transform: `scale(${SHOW_SCALE})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
            </div>

            <SecondaryButton onClick={() => downloadOne(i)} disabled={downloading !== null} active={downloading === i}>
              <Download size={12} />
              {downloading === i ? 'saving…' : `${i + 2}.png`}
            </SecondaryButton>
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: 640,
        padding: '14px 18px',
        background: '#fafaf9',
        border: '1px solid #e5e5e5',
        borderRadius: 14,
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 300,
        fontSize: 15,
        color: '#404040',
        lineHeight: 1.5,
        marginBottom: 10,
      }}>
        {data.caption}
      </div>

      <SecondaryButton onClick={copyCaption} active={copied}>
        {copied ? 'copied!' : 'copy caption'}
      </SecondaryButton>
    </section>
  );
}

function QuoteCardSection({ data }: { data: QuoteCardData }) {
  const [downloading, setDownloading] = useState(false);

  const download = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await captureQuoteCard(data, `${data.id}.png`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section style={{ marginBottom: 72 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 24, fontWeight: 700, letterSpacing: -0.3,
          color: '#171717', marginBottom: 4,
        }}>
          {data.id}
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14, fontWeight: 300, color: '#a3a3a3', marginBottom: 16,
        }}>
          quote card · 1080 × 1080 px
        </p>
        <PrimaryButton onClick={download} disabled={downloading} busy={downloading}>
          <Download size={15} />
          {downloading ? 'saving…' : `download · ${data.id}.png`}
        </PrimaryButton>
      </div>

      {/* Preview */}
      <div
        style={{
          width: QUOTE_W,
          height: QUOTE_H,
          overflow: 'hidden',
          position: 'relative',
          borderRadius: 16,
          border: '1px solid #e5e5e5',
          flexShrink: 0,
          background: data.theme?.bg ?? '#f7fee7',
        }}
      >
        <QuoteCard
          data={data}
          style={{
            transform: `scale(${QUOTE_SCALE})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </div>
    </section>
  );
}

function CarouselSection({ data }: { data: CarouselData }) {
  const [downloading, setDownloading] = useState<number | 'all' | null>(null);
  const busy = downloading !== null;

  const brand: Brand = {
    brandName: data.brandName,
    brandTagline: data.brandTagline,
    ctaText: data.ctaText,
    scatterWords: data.scatterWords,
    theme: data.theme,
  };

  const downloadOne = async (index: number) => {
    if (busy) return;
    setDownloading(index);
    try {
      await captureSlide(
        data.slides[index], index, data.slides.length, brand,
        `${index + 1}.png`,
      );
    } finally {
      setDownloading(null);
    }
  };

  const downloadAll = async () => {
    if (busy) return;
    setDownloading('all');
    try {
      for (let i = 0; i < data.slides.length; i++) {
        await captureSlide(
          data.slides[i], i, data.slides.length, brand,
          `${i + 1}.png`,
        );
        await new Promise(r => setTimeout(r, 200));
      }
    } finally {
      setDownloading(null);
    }
  };

  return (
    <section style={{ marginBottom: 72 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 24, fontWeight: 700, letterSpacing: -0.3,
          color: '#171717', marginBottom: 4,
        }}>
          {data.id}
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14, fontWeight: 300, color: '#a3a3a3', marginBottom: 16,
        }}>
          {data.slides.length} slides · 1080 × 1350 px
        </p>
        <PrimaryButton onClick={downloadAll} disabled={busy} busy={busy}>
          <Download size={15} />
          {downloading === 'all'
            ? `saving ${data.slides.length} slides…`
            : `download all · ${data.slides.length} slides`}
        </PrimaryButton>
      </div>

      {/* Previews */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
        {data.slides.map((slide, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: SLIDE_W,
              height: SLIDE_H,
              overflow: 'hidden',
              position: 'relative',
              borderRadius: 16,
              border: '1px solid #e5e5e5',
              flexShrink: 0,
              background: data.theme?.bg ?? '#f7fee7',
            }}>
              <CarouselSlide
                slide={slide}
                index={i}
                total={data.slides.length}
                brand={brand}
                style={{
                  transform: `scale(${PREVIEW_SCALE})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
            </div>

            <SecondaryButton onClick={() => downloadOne(i)} disabled={busy} active={downloading === i}>
              <Download size={12} />
              {downloading === i ? 'saving…' : `${i + 1}.png`}
            </SecondaryButton>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MockPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '48px 40px 80px', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ marginBottom: 52 }}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 34, fontWeight: 700, letterSpacing: -0.6,
          color: '#171717', marginBottom: 6,
        }}>
          social mock
        </h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 300, color: '#737373' }}>
          edit <CodeTag>src/mock/data/carousels.json</CodeTag> to swap content · carousels download at 1080 × 1350 px
        </p>
      </div>

      {mockCarousels.map(carousel => (
        <CarouselSection key={carousel.id} data={carousel} />
      ))}

      {/* ─── Quote Cards ─────────────────────────────────────────── */}
      <SectionHeading
        title="quote cards"
        hint={<>edit <CodeTag>src/mock/data/quoteCards.json</CodeTag> · downloads at 1080 × 1080 px</>}
      />

      {mockQuoteCards.map(card => (
        <QuoteCardSection key={card.id} data={card} />
      ))}

      {/* ─── Slideshow Reels ─────────────────────────────────────── */}
      <SectionHeading
        title="slideshow reels"
        hint={<>slide 1 is your own photo/video — drop it in below, it's local-only and never saved. edit <CodeTag>src/mock/data/slideshows.json</CodeTag> to change the text slides · downloads at 1080 × 1920 px</>}
      />

      {mockSlideshows.map(slideshow => (
        <SlideshowSection key={slideshow.id} data={slideshow} />
      ))}
    </div>
  );
}
