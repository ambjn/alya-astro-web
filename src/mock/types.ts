export interface CarouselTheme {
  bg: string;
  gridColor: string;
  accentColor: string;
  cardBg: string;
}

export interface SlideData {
  headline: string;
  body?: string;
  emoji?: string;
  badgeColor?: string;
  badgeText?: string;   // override auto "01" numbering
  hideBadge?: boolean;
  saveNote?: string;    // small note below headline, e.g. "(save this)"
}

export interface CarouselData {
  id: string;
  brandName: string;
  brandTagline: string;
  ctaText: string;
  scatterWords: string[];
  theme?: CarouselTheme;
  slides: SlideData[];
}

export interface QuoteCardTheme {
  bg: string;
  textColor: string;
  accentColor: string;
}

export interface QuoteCardData {
  id: string;
  quote: string;        // newline-delimited lines; blank line = gap
  highlight?: string;   // exact phrase within quote to mark with a highlight
  attribution: string;
  theme?: Partial<QuoteCardTheme>;
}

// Slide 1 of a slideshow is a photo/video dropped in live on the mock page —
// it's not a real asset so it isn't checked into the repo. SlideshowTextSlide
// covers the text slides that follow it, sized for vertical Reels
// (1080×1920) instead of the 4:5 carousel/1:1 quote card formats above.
export interface SlideshowTextSlide {
  text: string; // newline-delimited
}

export interface SlideshowData {
  id: string;
  persona: string;
  hashtagSet: string;
  caption: string;
  theme?: Partial<QuoteCardTheme>;
  slides: SlideshowTextSlide[];
}
