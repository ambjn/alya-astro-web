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

const BRAND_THEME: CarouselTheme = {
  bg: '#f7fee7',
  gridColor: 'rgba(101,163,13,0.08)',
  accentColor: '#65a30d',
  cardBg: '#ffffff',
};

export const serVsEstarCarousel: CarouselData = {
  id: 'ser-vs-estar',
  brandName: 'alya',
  brandTagline: 'your ai spanish tutor',
  ctaText: 'follow @helloalya',
  scatterWords: ['soy', 'estoy', 'ser', 'estar', 'siempre', 'ahora', 'identidad', 'momento'],
  theme: BRAND_THEME,
  slides: [
    {
      headline: 'ser vs. estar:\nthe rule spanish class\nnever explains right 🤔',
      hideBadge: true,
      saveNote: '(save this)',
    },
    {
      headline: 'SER is who you ARE.\npermanent. identity.',
      body: 'soy doctora. soy alta.\nsoy de méxico.',
      badgeText: '1',
    },
    {
      headline: 'ESTAR is how you FEEL.\ntemporary. state.',
      body: 'estoy cansada. estoy\nfeliz. estoy en casa.',
      badgeText: '2',
    },
    {
      headline: '"soy feliz."\nvs.\n"estoy feliz."',
      body: 'one means "I\'m a happy\nperson." the other means\n"I feel happy right now."',
      badgeText: '3',
    },
    {
      headline: 'tip: location ALWAYS\ntakes estar.',
      body: 'méxico está en\nnorteamérica — even though\nthat\'s permanent!',
      badgeText: '4',
    },
    {
      headline: 'the trick: ask yourself —\n"is this permanent,\nor just right now?"',
      badgeText: '5',
    },
    {
      headline: 'save this for your next\n"ser vs estar" panic 💚',
      body: 'follow @helloalya for\ndaily spanish lessons',
      hideBadge: true,
    },
  ],
};

export const mexicanSlangCarousel: CarouselData = {
  id: 'mexican-slang',
  brandName: 'alya',
  brandTagline: 'your ai spanish tutor',
  ctaText: 'follow @helloalya',
  scatterWords: ['chido', 'neta', 'güey', 'ahorita', 'qué onda', 'órale', 'padre', 'fresa'],
  theme: BRAND_THEME,
  slides: [
    {
      headline: '5 mexican spanish words\nyou won\'t learn in class 🇲🇽',
      hideBadge: true,
      saveNote: '(save this)',
    },
    {
      headline: '"chido"',
      body: 'cool / awesome.\n"¡qué chido!" = "how cool!"',
      badgeText: '1',
    },
    {
      headline: '"neta"',
      body: 'really? / seriously? / the truth.\n"¿neta?" = "for real?"',
      badgeText: '2',
    },
    {
      headline: '"ahorita"',
      body: 'technically "right now" —\nactually means "eventually,\nmaybe, who knows." 😅',
      badgeText: '3',
    },
    {
      headline: '"qué onda"',
      body: 'what\'s up? how\'s it going?\nthe classic mexican greeting.',
      badgeText: '4',
    },
    {
      headline: '"güey"',
      body: 'dude / man — used between\nfriends, like 50 times\nper conversation.',
      badgeText: '5',
    },
    {
      headline: 'save this before your\nnext trip to méxico 🌶️',
      body: 'follow @helloalya for\nreal spanish, real culture',
      hideBadge: true,
    },
  ],
};

export const mockCarousels: CarouselData[] = [serVsEstarCarousel, mexicanSlangCarousel];

// ─── Quote Cards ─────────────────────────────────────────────────────────────

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

export const mockQuoteCards: QuoteCardData[] = [
  {
    id: 'practice-today',
    quote: 'the best time\nto practice spanish\nwas yesterday.\n\nthe second best\nis right now.',
    highlight: 'is right now.',
    attribution: '— alya',
  },
  {
    id: 'dont-need-fluent',
    quote: "you don't need\nto be fluent\nto start a\nconversation.\n\nyou just need\nto start.",
    highlight: 'to start.',
    attribution: '— alya',
  },
];

// ─── Slideshow Reels (TikTok-style) ───────────────────────────────────────────
// Slide 1 is a photo/video you drop in live on the mock page — it's not a real
// asset so it isn't checked into the repo. These are the text slides that
// follow it, sized for vertical Reels (1080×1920) instead of the 4:5
// carousel/1:1 quote card formats above.

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

export const mockSlideshows: SlideshowData[] = [
  {
    id: 'duolingo-burnout',
    persona: 'Duolingo Burnout',
    hashtagSet: 'Set A — Beginner Pain Points',
    caption: "400 day streak and still can't order coffee? we've all been there 😅 save this if duolingo's not cutting it anymore → link in bio",
    theme: { accentColor: '#65a30d' },
    slides: [
      { text: "pov: 400 day\nduolingo streak\nand you still can't\norder coffee" },
      { text: 'talked to alya\nfor 10 minutes.\nordered real coffee\nin spanish the\nnext day.' },
    ],
  },
  {
    id: 'silent-speaker',
    persona: 'Silent Speaker',
    hashtagSet: 'Set B — Speaking Anxiety',
    caption: "knowing every conjugation chart by heart doesn't help if you freeze the second someone actually talks to you. save this 💚",
    theme: { accentColor: '#0d9488' },
    slides: [
      { text: 'you know every\nconjugation chart\nby heart' },
      { text: 'talking to alya felt\nless scary than\ntalking to a human.\nturns out that\'s\nthe whole trick.' },
    ],
  },
  {
    id: 'heritage-learner',
    persona: 'Heritage Learner',
    hashtagSet: 'Set C — Heritage Speakers',
    caption: 'you understand every word your abuela says but reply in english anyway? this one\'s for you 🤍',
    theme: { accentColor: '#be185d' },
    slides: [
      { text: 'you understand\nevery word your\nabuela says' },
      { text: 'alya helped me find\nthe words I always\nunderstood, but never\nhad to say.' },
    ],
  },
  {
    id: 'frequent-flyer',
    persona: 'Frequent Flyer',
    hashtagSet: 'Set D — Travel Prep',
    caption: "3 weeks till your trip and still stuck on 'hola'? save this for your next trip ✈️",
    theme: { accentColor: '#c2410c' },
    slides: [
      { text: '3 weeks till\nyour trip to\nmexico city' },
      { text: '10 minutes a day\nwith alya got me\nthrough a whole\ntaco order.\nen español.' },
    ],
  },
  {
    id: 'subjunctive-struggler',
    persona: 'Subjunctive Struggler',
    hashtagSet: 'Set E — Grammar Nerds',
    caption: 'the subjunctive mood made you question your life choices. it finally clicked like this 📚',
    theme: { accentColor: '#4338ca' },
    slides: [
      { text: 'the subjunctive\nmood made you\nquestion your\nlife choices' },
      { text: '"ojalá que apruebe"\nfinally clicked when\nalya explained it\nlike a friend,\nnot a textbook.' },
    ],
  },
];
