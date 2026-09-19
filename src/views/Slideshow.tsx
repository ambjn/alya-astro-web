import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  CopyPlus,
  Download,
  Eye,
  Images,
  LayoutGrid,
  Loader2,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { APP_STORE_URL } from "../constants";
import instagramCampaign from "../data/instagram-campaign.json";

type ThemeId = "dark" | "cream" | "avocado" | "fiesta";
type Variant = "cover" | "statement" | "word" | "cta";
type Pane = "slides" | "preview" | "edit";

interface Slide {
  id: string;
  title: string;
  body: string;
  word: string;
  translation: string;
  footer: string;
  variant: Variant;
  imageUrl?: string;
}

const MASCOT_SRC = "/mascot/alya-pet.png";

/* Full-bleed illustrated Spain doodle used as the "fiesta" theme background. */
const DOODLE_BG_SRC = "/slideshow/spain-doodle-bg.png";
const DOODLE_BG_TINT = "rgba(247,241,227,0.87)";

/* Fixed, deterministic doodle scatter (percent-of-frame positions) so every
   export of the same slide looks identical — no uniform grid, no per-render
   randomness. Mirrors the stars/sparkles/circles already used around the
   mascot elsewhere in the brand instead of a generic dot texture. */
const DOODLES: { x: number; y: number; s: number; kind: "star" | "circle" | "spark" }[] = [
  { x: 0.10, y: 0.09, s: 1.0, kind: "star" },
  { x: 0.88, y: 0.14, s: 0.7, kind: "circle" },
  { x: 0.80, y: 0.42, s: 0.9, kind: "spark" },
  { x: 0.06, y: 0.55, s: 0.6, kind: "circle" },
  { x: 0.92, y: 0.68, s: 1.0, kind: "star" },
  { x: 0.14, y: 0.82, s: 0.7, kind: "spark" },
  { x: 0.5, y: 0.05, s: 0.5, kind: "circle" },
];

interface Theme {
  bg: string;
  surface: string;
  border: string;
  primary: string;
  onPrimary: string;
  text: string;
  muted: string;
  accent: string;
}

/* Single export format: 1:1 square (1080 × 1080). */
const FORMAT = { label: "IG square", sub: "1080 × 1080", w: 1080, h: 1080, css: "aspect-square" };

const THEMES: Record<ThemeId, { label: string; hint: string; theme: Theme }> = {
  dark: {
    label: "Alya dark",
    hint: "app true",
    theme: {
      bg: "#1C2117",
      surface: "#262B21",
      border: "rgba(226,239,194,0.22)",
      primary: "#B7D96B",
      onPrimary: "#18200D",
      text: "#FFF9F0",
      muted: "#B9B7A8",
      accent: "#F4C56A",
    },
  },
  cream: {
    label: "Cream",
    hint: "soft feed",
    theme: {
      bg: "#F4F0E7",
      surface: "#FBF8F1",
      border: "rgba(32,35,29,0.14)",
      primary: "#20231D",
      onPrimary: "#FFF9F0",
      text: "#20231D",
      muted: "rgba(32,35,29,0.62)",
      accent: "#5A7A1F",
    },
  },
  avocado: {
    label: "Avocado pop",
    hint: "stop-scroll",
    theme: {
      bg: "#B7D96B",
      surface: "#C6E282",
      border: "rgba(24,32,13,0.2)",
      primary: "#242A20",
      onPrimary: "#FFF9F0",
      text: "#18200D",
      muted: "rgba(24,32,13,0.66)",
      accent: "#242A20",
    },
  },
  fiesta: {
    label: "Fiesta doodle",
    hint: "spain art bg",
    theme: {
      bg: "#F7F1E3",
      surface: "rgba(251,248,241,0.94)",
      border: "rgba(32,35,29,0.16)",
      primary: "#B3372C",
      onPrimary: "#FFF9F0",
      text: "#20231D",
      muted: "rgba(32,35,29,0.68)",
      accent: "#1D7A8C",
    },
  },
};

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

type Preset = Omit<(typeof instagramCampaign.templates)[number], "slides"> & {
  slides: Omit<Slide, "id">[];
};

const PRESETS = instagramCampaign.templates as unknown as Preset[];

const VARIANTS: { id: Variant; label: string; hint: string }[] = [
  { id: "cover", label: "Cover", hint: "hook slide 1" },
  { id: "statement", label: "Statement", hint: "big line" },
  { id: "word", label: "Word card", hint: "vocab pop" },
  { id: "cta", label: "CTA", hint: "last slide" },
];

/* ---------- content calendar / planner ---------- */

const PLANNER_SLOTS = instagramCampaign.campaign.slots.map((slot) => slot.label);
const PLANNER_DEFAULT_TIMES = instagramCampaign.campaign.slots.map((slot) => slot.time);

interface PlannerRow {
  date: string;
  day: string;
  tag?: string;
  peak?: boolean;
  focus: "experiment" | "presentation test" | "strongest concepts";
  carouselTopics: [string, string, string];
  times?: string[];
  /** per-slot highlight — bold in the source table = best-performing slot */
  hot?: boolean[];
}

const PLANNER_ROWS = instagramCampaign.planner as unknown as PlannerRow[];

type SlideTextField = "title" | "body" | "word" | "translation" | "footer";

const LIMITS: Record<SlideTextField, number> = { title: 60, body: 110, word: 22, translation: 90, footer: 44 };
const WORKSPACE_STORAGE_KEY = "slideshow-workspace-v1";

type CampaignPillar = "quiz" | "correction" | "practical";
type SeptemberLesson = (typeof instagramCampaign.lessons)[number];

const campaignSlide = (slide: Omit<Slide, "id">): Slide => ({ ...slide, id: uid() });
const ctaSlide = (): Slide => campaignSlide({
  title: instagramCampaign.campaign.cta.title,
  body: instagramCampaign.campaign.cta.body,
  word: "", translation: "", footer: "ALYA • real Spanish videos", variant: "cta",
  imageUrl: instagramCampaign.campaign.cta.imageUrl,
});

function buildCampaignDeck(date: string, pillar: CampaignPillar, hook: string) {
  const lesson = instagramCampaign.lessons.find((item) => item.date === date) as SeptemberLesson | undefined;
  if (!lesson) return null;
  if (pillar === "quiz") {
    const q = lesson.quiz;
    return {
      caption: `${hook}\n\nComment your answer before checking slide 4.\n\nLearn Spanish from real videos with ALYA.\n\n#learnspanish #spanishquiz #spanishtips #español #alyaapp`,
      slides: [
        campaignSlide({ title: hook, body: "swipe to test yourself →", word: "", translation: "", footer: "@helloalya", variant: "cover" }),
        campaignSlide({ title: "What does this mean?", body: "", word: q.phrase, translation: "Don't translate it literally", footer: "choose before you swipe", variant: "word" }),
        campaignSlide({ title: "Choose your answer", body: q.options.map((option, index) => `${String.fromCharCode(65 + index)}) ${option}`).join("  •  "), word: "", translation: "", footer: "lock in your answer", variant: "statement" }),
        campaignSlide({ title: `${q.answer} — ${q.meaning}`, body: q.example, word: "", translation: "", footer: "did you get it right?", variant: "statement" }),
        ctaSlide(),
      ],
    };
  }
  if (pillar === "correction") {
    const c = lesson.correction;
    return {
      caption: `${hook} ❌\n\nSend this to someone learning Spanish before they make this mistake.\n\nLearn the Spanish people actually speak with ALYA.\n\n#learnspanish #spanishmistakes #spanishtips #español #alyaapp`,
      slides: [
        campaignSlide({ title: hook, body: "you sound like a textbook", word: "", translation: "", footer: "@helloalya", variant: "cover" }),
        campaignSlide({ title: "The mistake", body: c.mistake, word: "", translation: "", footer: "here's the natural fix", variant: "statement" }),
        campaignSlide({ title: "Say this instead", body: c.correction, word: "", translation: "", footer: "natural Spanish", variant: "statement" }),
        campaignSlide({ title: "A real example", body: c.example, word: "", translation: "", footer: "learn it in context", variant: "statement" }),
        campaignSlide({ title: "Quick tip", body: c.tip, word: "", translation: "", footer: "save this distinction", variant: "statement" }),
        ctaSlide(),
      ],
    };
  }
  const p = lesson.practical;
  return {
    caption: `${hook} 🔖\n\nSave this before your next Spanish conversation.\n\nLearn Spanish from real videos with ALYA.\n\n#learnspanish #spanishphrases #spanishvocab #traveltips #alyaapp`,
    slides: [
      campaignSlide({ title: hook, body: "save these for later →", word: "", translation: "", footer: "@helloalya", variant: "cover" }),
      ...p.items.map(([word, translation], index) => campaignSlide({ title: "", body: "", word, translation, footer: `phrase ${index + 1} of 3`, variant: "word" as const })),
      campaignSlide({ title: "save this for later ↗", body: "Your future Spanish-speaking self will thank you.", word: "", translation: "", footer: "send it to your travel partner", variant: "statement" }),
      ctaSlide(),
    ],
  };
}

/* ---------- canvas export (unchanged logic, tightened type) ---------- */

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const a = (Math.PI / 2) * i;
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.lineTo(cx + Math.cos(a + 0.5) * r * 0.32, cy + Math.sin(a + 0.5) * r * 0.32);
  }
  ctx.closePath();
  ctx.fill();
}

function drawSpark(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.lineWidth = Math.max(3, r * 0.22);
  ctx.lineCap = "round";
  for (const rot of [0, Math.PI / 2]) {
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(rot) * r, cy - Math.sin(rot) * r);
    ctx.lineTo(cx + Math.cos(rot) * r, cy + Math.sin(rot) * r);
    ctx.stroke();
  }
  ctx.restore();
}

function drawDoodles(ctx: CanvasRenderingContext2D, w: number, h: number, primary: string, accent: string) {
  ctx.save();
  for (const d of DOODLES) {
    const cx = d.x * w, cy = d.y * h, r = 32 * d.s;
    if (d.kind === "star") {
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = accent;
      drawStar(ctx, cx, cy, r);
    } else if (d.kind === "spark") {
      ctx.globalAlpha = 0.85;
      ctx.strokeStyle = primary;
      drawSpark(ctx, cx, cy, r);
    } else {
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = primary;
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.restore();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Draw `img` into the rect (x,y,w,h), covering it (center-cropped), clipped to a rounded rect. */
function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number, r: number) {
  ctx.save();
  roundRect(ctx, x, y, w, h, r);
  ctx.clip();
  const scale = Math.max(w / img.width, h / img.height);
  const iw = img.width * scale, ih = img.height * scale;
  ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
  ctx.restore();
}

async function renderSlideToCanvas(slide: Slide, index: number, total: number, themeId: ThemeId) {
  const fmt = FORMAT;
  const t = THEMES[themeId].theme;
  const canvas = document.createElement("canvas");
  canvas.width = fmt.w;
  canvas.height = fmt.h;
  const ctx = canvas.getContext("2d")!;
  try { await document.fonts.ready; } catch { /* noop */ }

  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, fmt.w, fmt.h);

  // "fiesta" theme: full-bleed illustrated background with a cream tint on top
  // so text stays readable. Missing asset falls back to the solid bg.
  if (themeId === "fiesta") {
    try {
      const bg = await loadImage(DOODLE_BG_SRC);
      const scale = Math.max(fmt.w / bg.width, fmt.h / bg.height);
      const iw = bg.width * scale, ih = bg.height * scale;
      ctx.drawImage(bg, (fmt.w - iw) / 2, (fmt.h - ih) / 2, iw, ih);
      ctx.fillStyle = DOODLE_BG_TINT;
      ctx.fillRect(0, 0, fmt.w, fmt.h);
    } catch { /* asset not saved yet — keep the solid cream bg */ }
  }

  let mascot: HTMLImageElement | null = null;
  try { mascot = await loadImage(MASCOT_SRC); } catch { /* mascot is a nice-to-have, never block export on it */ }

  if (themeId !== "fiesta") drawDoodles(ctx, fmt.w, fmt.h, t.primary, t.accent);

  const ctaH = 150, ctaY = fmt.h - ctaH - 120;

  // Sticker mascot in the lower-right of the content area on every slide except
  // the CTA (which already gets a large centered mascot/screenshot treatment).
  // Sized and lifted so it never covers the footer or page dots.
  if (mascot && slide.variant !== "cta") {
    const ph = 340;
    const pw = ph * (mascot.width / mascot.height);
    ctx.save();
    ctx.translate(fmt.w - pw * 0.28, ctaY - 24 - ph / 2);
    ctx.rotate(-0.15);
    ctx.drawImage(mascot, -pw / 2, -ph / 2, pw, ph);
    ctx.restore();
  }

  const pad = 96;
  const W = fmt.w - pad * 2;

  /* Counter pill, top-right. */
  ctx.font = "700 30px Outfit, system-ui, sans-serif";
  const countLabel = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const countW = ctx.measureText(countLabel).width;
  const pillPadX = 30, pillH = 64, pillW = countW + pillPadX * 2;
  const pillX = fmt.w - pad - pillW, pillY = 150 - pillH / 2 - 6;
  ctx.fillStyle = t.surface;
  roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2); ctx.fill();
  ctx.strokeStyle = t.border; ctx.lineWidth = 2;
  roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2); ctx.stroke();
  ctx.fillStyle = t.text;
  ctx.textAlign = "right";
  ctx.fillText(countLabel, fmt.w - pad - pillPadX, 150);
  ctx.textAlign = "left";

  /* Two-pass layout: measure the text block first so short content can sit
     vertically centered instead of leaving a big blank middle. CTA slides
     stay top-aligned so the screenshot gets maximum room. */
  const bigTitle = slide.variant === "cover";
  const titleFont = `700 ${bigTitle ? 148 : 118}px Outfit, system-ui, sans-serif`;
  const titleBase = bigTitle ? 138 : 110, titleAdv = bigTitle ? 160 : 128;
  ctx.font = titleFont;
  const titleLines = slide.title ? wrapText(ctx, slide.title, W).slice(0, 5) : [];
  ctx.font = "500 54px Outfit, system-ui, sans-serif";
  const bodyLines = slide.body ? wrapText(ctx, slide.body, W).slice(0, 4) : [];
  const hasWordCard = slide.variant === "word" && slide.word;

  /* Word-card geometry, measured up front: two columns (word | translation)
     so the card stays short. */
  const wordFont = "700 84px Outfit, system-ui, sans-serif";
  const wordTransFont = "italic 500 40px Outfit, system-ui, sans-serif";
  let wordLines: string[] = [], wordTransLines: string[] = [];
  let wordCardH = 0, wordDivX = 0, wordRightX = 0, wordBodyH = 0, wordLeftH = 0, wordRightH = 0;
  if (hasWordCard) {
    ctx.font = wordFont;
    const leftWrapW = (W - 112) * 0.55;
    wordLines = wrapText(ctx, slide.word, leftWrapW).slice(0, 3);
    let leftColW = 0;
    for (const ln of wordLines) leftColW = Math.max(leftColW, ctx.measureText(ln).width);
    leftColW = Math.min(leftColW, leftWrapW);
    wordDivX = pad + 56 + leftColW + 30;
    wordRightX = wordDivX + 30;
    const rightW = pad + W - 56 - wordRightX;
    ctx.font = wordTransFont;
    wordTransLines = wrapText(ctx, slide.translation, rightW).slice(0, 4);
    wordLeftH = 78 + 88 * (wordLines.length - 1) + 26;
    wordRightH = wordTransLines.length ? 42 + 56 * (wordTransLines.length - 1) + 20 : 0;
    wordBodyH = Math.max(wordLeftH, wordRightH);
    wordCardH = 118 + wordBodyH + 44;
  }

  let contentH = 0;
  if (titleLines.length) contentH += titleBase + titleAdv * (titleLines.length - 1) + 24;
  if (bodyLines.length) contentH += 63 + 76 * (bodyLines.length - 1) + 40;
  if (hasWordCard) contentH += 20 + wordCardH + 40;

  const topY = 170;
  let y = slide.variant === "cta" || contentH >= ctaY - topY ? topY : topY + (ctaY - topY - contentH) / 2;

  if (titleLines.length) {
    ctx.fillStyle = t.text;
    ctx.font = titleFont;
    for (const line of titleLines) {
      ctx.fillText(line, pad, y + titleBase);
      y += titleAdv;
    }
    y += 24;
  }
  if (bodyLines.length) {
    ctx.fillStyle = t.muted;
    ctx.font = "500 54px Outfit, system-ui, sans-serif";
    for (const line of bodyLines) { ctx.fillText(line, pad, y + 63); y += 76; }
    y += 40;
  }
  if (hasWordCard) {
    const cardY = y + 20, cardH = wordCardH;
    ctx.fillStyle = themeId === "dark" ? "#262B21" : t.surface;
    roundRect(ctx, pad, cardY, W, cardH, 48); ctx.fill();
    ctx.strokeStyle = t.border; ctx.lineWidth = 3;
    roundRect(ctx, pad, cardY, W, cardH, 48); ctx.stroke();
    const labelColor = t.accent === t.text ? t.primary : t.accent;
    ctx.font = "600 38px Outfit, system-ui, sans-serif";
    const labelText = "TAP → TRANSLATE";
    const labelW = ctx.measureText(labelText).width;
    ctx.save();
    ctx.globalAlpha = 0.14;
    ctx.fillStyle = labelColor;
    roundRect(ctx, pad + 56, cardY + 52, labelW + 48, 56, 12); ctx.fill();
    ctx.restore();
    ctx.fillStyle = labelColor;
    ctx.fillText(labelText, pad + 56 + 24, cardY + 90);
    /* Vertical divider between the two columns. */
    ctx.strokeStyle = t.border; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(wordDivX, cardY + 118); ctx.lineTo(wordDivX, cardY + 118 + wordBodyH); ctx.stroke();
    /* Left column: the word. Right column: the translation. */
    ctx.fillStyle = t.text; ctx.font = wordFont;
    let wy = cardY + 118 + (wordBodyH - wordLeftH) / 2 + 78;
    for (const line of wordLines) { ctx.fillText(line, pad + 56, wy); wy += 88; }
    ctx.fillStyle = t.muted; ctx.font = wordTransFont;
    let ty = cardY + 118 + (wordBodyH - wordRightH) / 2 + 42;
    for (const line of wordTransLines) { ctx.fillText(line, wordRightX, ty); ty += 56; }
    y = cardY + cardH + 40;
  }

  const bottomReserved = ctaH + 180;
  const shotTop = y + 16, shotBottom = fmt.h - bottomReserved;
  if (slide.variant === "cta" && shotBottom - shotTop > 160) {
    if (slide.imageUrl) {
      try {
        const shot = await loadImage(slide.imageUrl);
        drawImageCover(ctx, shot, pad, shotTop, W, shotBottom - shotTop, 40);
        ctx.strokeStyle = t.border; ctx.lineWidth = 3;
        roundRect(ctx, pad, shotTop, W, shotBottom - shotTop, 40); ctx.stroke();
      } catch { /* screenshot failed to load — leave the space empty rather than block export */ }
    } else if (mascot) {
      const mw = Math.min(W * 0.62, (shotBottom - shotTop) * (mascot.width / mascot.height));
      const mh = mw * (mascot.height / mascot.width);
      ctx.drawImage(mascot, pad + (W - mw) / 2, shotTop + Math.max(0, (shotBottom - shotTop - mh) / 2), mw, mh);
    }
  }

  if (slide.variant === "cta") {
    ctx.fillStyle = t.primary;
    roundRect(ctx, pad, ctaY, W, ctaH, 75); ctx.fill();
    ctx.fillStyle = t.onPrimary; ctx.font = "700 46px Outfit, system-ui, sans-serif";
    const cta = "Get ALYA on the App Store →";
    ctx.fillText(wrapText(ctx, cta, W - 100)[0] ?? cta, pad + 50, ctaY + 92);
  }

  for (let i = 0; i < total; i++) {
    ctx.beginPath();
    ctx.arc(pad + i * 34, fmt.h - 60, i === index ? 10 : 7, 0, Math.PI * 2);
    ctx.fillStyle = i === index ? t.text : t.muted;
    ctx.globalAlpha = i === index ? 1 : 0.4; ctx.fill(); ctx.globalAlpha = 1;
  }
  return canvas;
}

/* ---------- small UI atoms ---------- */

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-bold tracking-tight text-neutral-900">{children}</p>
);

const Count = ({ value, max }: { value: string; max: number }) => (
  <span className={`text-[11px] font-semibold tabular-nums ${value.length > max ? "text-red-600" : "text-neutral-400"}`}>
    {value.length}/{max}
  </span>
);

function DoodleLayer({ primary, accent }: { primary: string; accent: string }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {DOODLES.map((d, i) => {
        const cx = d.x * 100, cy = d.y * 100, r = 2.6 * d.s;
        if (d.kind === "circle") return <circle key={i} cx={cx} cy={cy} r={r * 0.6} fill={primary} opacity={0.32} />;
        if (d.kind === "spark") return (
          <g key={i} stroke={primary} strokeWidth={1.1} strokeLinecap="round" opacity={0.85}>
            <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} />
            <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} />
          </g>
        );
        return <text key={i} x={cx} y={cy} fontSize={r * 2.6} fill={accent} opacity={0.9} textAnchor="middle" dominantBaseline="middle">✦</text>;
      })}
    </svg>
  );
}

function PeekingMascot() {
  return (
    <img
      src={MASCOT_SRC}
      alt=""
      className="pointer-events-none absolute bottom-[-8%] right-[-7%] w-[32%] rotate-[-9deg] drop-shadow-lg"
    />
  );
}

function Thumb({ slide, index, active, theme, onClick }: { slide: Slide; index: number; active: boolean; theme: Theme; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-stretch gap-3 rounded-2xl border p-2.5 text-left transition-all ${active ? "border-[#2B3128] bg-[#2B3128] text-white shadow-lg" : "border-neutral-200 bg-white hover:border-[#2B3128]/40 hover:shadow-md"}`}
    >
      <span
        className="relative aspect-square w-11 shrink-0 overflow-hidden rounded-lg border p-1.5"
        style={{ backgroundColor: theme.bg, borderColor: active ? "rgba(255,255,255,0.2)" : theme.border }}
      >
        <span className="block h-1 w-4 rounded-full" style={{ backgroundColor: theme.primary }} />
        <span className="mt-1 block h-1 w-full rounded-full opacity-70" style={{ backgroundColor: theme.text }} />
        <span className="mt-0.5 block h-1 w-2/3 rounded-full opacity-50" style={{ backgroundColor: theme.text }} />
        {slide.variant === "word" && <span className="absolute inset-x-1.5 bottom-1.5 top-auto h-3.5 rounded" style={{ backgroundColor: theme.primary, opacity: 0.85 }} />}
        <span className="absolute bottom-1 right-1 text-[8px] font-bold" style={{ color: theme.muted }}>{index + 1}</span>
      </span>
      <span className="min-w-0 flex-1 py-0.5">
        <span className={`block truncate text-xs font-bold ${active ? "text-lime-300" : "text-lime-700"}`}>
          {index + 1} • {slide.variant}
        </span>
        <span className="mt-0.5 block truncate text-sm font-semibold">{slide.title || slide.word || "(untitled)"}</span>
        <span className={`mt-0.5 block truncate text-xs ${active ? "text-white/60" : "text-neutral-500"}`}>{slide.body || slide.translation || "—"}</span>
      </span>
    </button>
  );
}

/* ---------- main ---------- */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="px-1 pb-2 text-sm font-bold tracking-tight text-neutral-900">{children}</p>
);

function ColDivider({ label, onDrag, onReset, onNudge }: {
  label: string;
  onDrag: (e: React.MouseEvent) => void;
  onReset: () => void;
  onNudge: (delta: number) => void;
}) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={label}
      title="drag to resize • arrow keys nudge • double-click to reset"
      tabIndex={0}
      onMouseDown={onDrag}
      onDoubleClick={onReset}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onNudge(12);
        else if (e.key === "ArrowLeft") onNudge(-12);
        else return;
        e.preventDefault();
      }}
      className="hidden w-4 shrink-0 cursor-col-resize touch-none items-center justify-center self-stretch rounded-full outline-none transition hover:bg-[#2B3128]/10 focus-visible:bg-[#2B3128]/10 lg:flex"
    >
      <span className="flex flex-col gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-neutral-400" />
        ))}
      </span>
    </div>
  );
}

export const Slideshow = () => {
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [slides, setSlides] = useState<Slide[]>(() => PRESETS[0].slides.map((s) => ({ ...s, id: uid() })));
  const [selected, setSelected] = useState(0);
  const [themeId, setThemeId] = useState<ThemeId>("fiesta");
  const [caption, setCaption] = useState(PRESETS[0].caption);
  const [handle, setHandle] = useState("@helloalya");
  const [pane, setPane] = useState<Pane>("preview");
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState("");
  const [toast, setToast] = useState("");
  const [copied, setCopied] = useState(false);
  const [dir, setDir] = useState(0);
  const [workspaceHydrated, setWorkspaceHydrated] = useState(false);
  const toastTimer = useRef<number>(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORKSPACE_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<{
          slides: Slide[];
          caption: string;
          presetId: string;
          themeId: ThemeId;
          handle: string;
        }>;
        if (Array.isArray(saved.slides) && saved.slides.length)
          setSlides(saved.slides.map((slide) => ({ ...slide, id: slide.id || uid() })));
        if (typeof saved.caption === "string") setCaption(saved.caption);
        if (typeof saved.presetId === "string") setPresetId(saved.presetId);
        if (saved.themeId && saved.themeId in THEMES) setThemeId(saved.themeId);
        if (typeof saved.handle === "string") setHandle(saved.handle);
      }
    } catch { /* corrupt or unavailable storage falls back to campaign JSON */ }
    setWorkspaceHydrated(true);
  }, []);

  useEffect(() => {
    if (!workspaceHydrated) return;
    try {
      window.localStorage.setItem(
        WORKSPACE_STORAGE_KEY,
        JSON.stringify({ slides, caption, presetId, themeId, handle }),
      );
    } catch { /* storage may be full or disabled */ }
  }, [caption, handle, presetId, slides, themeId, workspaceHydrated]);

  /* Content planner checkboxes — persisted per browser. Key: `${date}|${slot}` */
  const [plannerChecked, setPlannerChecked] = useState<Record<string, boolean>>(() => {
    try {
      const raw = window.localStorage.getItem("slideshow-planner");
      return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem("slideshow-planner", JSON.stringify(plannerChecked));
    } catch { /* noop */ }
  }, [plannerChecked]);

  const toggleSlot = (date: string, slotIndex: number) => {
    const key = `${date}|${slotIndex}`;
    setPlannerChecked((p) => ({ ...p, [key]: !p[key] }));
  };
  const isSlotChecked = (date: string, slotIndex: number) => {
    if (plannerChecked[`${date}|${slotIndex}`]) return true;
    // back-compat: keys saved before the emoji-header update used the slot name
    const legacy = ["Carousel 1", "Reel 1", "Carousel 2", "Reel 2", "Carousel 3", "Reel 3"];
    const oldKey = `${date}|${legacy[slotIndex]}`;
    return !!plannerChecked[oldKey];
  };
  const plannerStats = useMemo(() => {
    const total = PLANNER_ROWS.length * PLANNER_SLOTS.length;
    let done = 0;
    for (const r of PLANNER_ROWS)
      for (let si = 0; si < PLANNER_SLOTS.length; si++)
        if (plannerChecked[`${r.date}|${si}`]) done++;
    // include legacy name-based keys saved before the update
    const legacy = ["Carousel 1", "Reel 1", "Carousel 2", "Reel 2", "Carousel 3", "Reel 3"];
    for (const r of PLANNER_ROWS)
      for (let si = 0; si < legacy.length; si++)
        if (!plannerChecked[`${r.date}|${si}`] && plannerChecked[`${r.date}|${legacy[si]}`]) done++;
    return { done, total };
  }, [plannerChecked]);

  /* Resizable workspace columns (desktop). Widths persist per browser. */
  const DEFAULT_DECK_W = 290;
  const DEFAULT_EDIT_W = 350;
  const [deckW, setDeckW] = useState(DEFAULT_DECK_W);
  const [editW, setEditW] = useState(DEFAULT_EDIT_W);
  const dragRef = useRef<{ side: "deck" | "edit"; startX: number; startDeck: number; startEdit: number } | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("slideshow-cols");
      if (raw) {
        const p = JSON.parse(raw) as { deckW?: number; editW?: number };
        if (typeof p.deckW === "number") setDeckW(Math.min(440, Math.max(220, p.deckW)));
        if (typeof p.editW === "number") setEditW(Math.min(520, Math.max(280, p.editW)));
      }
    } catch { /* private mode etc — defaults are fine */ }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem("slideshow-cols", JSON.stringify({ deckW, editW })); } catch { /* noop */ }
  }, [deckW, editW]);

  const resetWidths = () => { setDeckW(DEFAULT_DECK_W); setEditW(DEFAULT_EDIT_W); };

  const startDrag = (side: "deck" | "edit") => (e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { side, startX: e.clientX, startDeck: deckW, startEdit: editW };
    const onMove = (ev: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = ev.clientX - d.startX;
      if (d.side === "deck") setDeckW(Math.min(440, Math.max(220, Math.round(d.startDeck + dx))));
      else setEditW(Math.min(520, Math.max(280, Math.round(d.startEdit - dx))));
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const nudge = (side: "deck" | "edit", delta: number) => {
    if (side === "deck") setDeckW((w) => Math.min(440, Math.max(220, w + delta)));
    else setEditW((w) => Math.min(520, Math.max(280, w + delta)));
  };

  const theme = THEMES[themeId].theme;
  const current = slides[selected] ?? slides[0];

  const flash = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2200);
  };

  const go = useCallback((next: number) => {
    setDir(next > selected ? 1 : -1);
    setSelected(Math.max(0, Math.min(slides.length - 1, next)));
  }, [selected, slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") go(selected + 1);
      if (e.key === "ArrowLeft") go(selected - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, selected]);

  const loadPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id)!;
    setPresetId(id);
    setSlides(p.slides.map((s) => ({ ...s, id: uid() })));
    setCaption(p.caption);
    setSelected(0); setDir(0);
    flash(`loaded “${p.label}”`);
  };

  const loadCampaignTopic = (row: PlannerRow, slotIndex: number) => {
    const slot = instagramCampaign.campaign.slots[slotIndex];
    if (!("topicIndex" in slot) || typeof slot.topicIndex !== "number") return;
    if (!(["quiz", "correction", "practical"] as string[]).includes(slot.pillar)) return;
    const pillar = slot.pillar as CampaignPillar;
    const preset = PRESETS.find((item) => item.id === pillar);
    if (!preset) return;
    const topic = row.carouselTopics[slot.topicIndex];
    const deck = buildCampaignDeck(row.date, pillar, topic);
    if (!deck) return;
    setPresetId(preset.id);
    setSlides(deck.slides);
    setCaption(deck.caption);
    setSelected(0);
    setDir(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    flash(`loaded ${row.date} ${preset.label}`);
  };

  const update = (patch: Partial<Slide>) =>
    setSlides((prev) => prev.map((s, i) => (i === selected ? { ...s, ...patch } : s)));

  const onPickImage = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ imageUrl: String(reader.result) });
    reader.readAsDataURL(file);
  };

  const addSlide = () => {
    const s: Slide = { id: uid(), title: "your hook here", body: "", word: "", translation: "", footer: handle, variant: "statement" };
    setSlides((p) => [...p, s]); setDir(1); setSelected(slides.length);
    if (window.innerWidth < 1024) setPane("edit");
  };
  const duplicate = () => {
    if (!current) return;
    const copy = { ...current, id: uid() };
    setSlides((p) => [...p.slice(0, selected + 1), copy, ...p.slice(selected + 1)]);
    setDir(1); setSelected(selected + 1);
  };
  const remove = () => {
    if (slides.length <= 1) { flash("a deck needs at least 1 slide"); return; }
    setSlides((p) => p.filter((_, i) => i !== selected));
    setSelected(Math.max(0, selected - 1));
  };
  const move = (d: -1 | 1) => {
    const j = selected + d;
    if (j < 0 || j >= slides.length) return;
    setSlides((p) => { const n = [...p];[n[selected], n[j]] = [n[j], n[selected]]; return n; });
    setDir(d); setSelected(j);
  };

  const download = (c: HTMLCanvasElement, name: string) => {
    const a = document.createElement("a");
    a.download = name; a.href = c.toDataURL("image/png"); a.click();
  };
  const exportOne = async () => {
    if (!current) return;
    setExporting(true); setProgress(`rendering slide ${selected + 1}…`);
    try {
      const c = await renderSlideToCanvas(current, selected, slides.length, themeId);
      download(c, `alya-slide-${selected + 1}-1x1.png`);
      flash(`slide ${selected + 1} exported • ${FORMAT.sub}`);
    } finally { setExporting(false); setProgress(""); }
  };
  const exportAll = async () => {
    setExporting(true);
    try {
      for (let i = 0; i < slides.length; i++) {
        setProgress(`rendering ${i + 1} / ${slides.length}…`);
        const c = await renderSlideToCanvas(slides[i], i, slides.length, themeId);
        download(c, `alya-slide-${i + 1}-of-${slides.length}.png`);
        await new Promise((r) => setTimeout(r, 350));
      }
      flash(`exported ${slides.length} PNGs • ${FORMAT.sub}`);
    } finally { setExporting(false); setProgress(""); }
  };
  const copyCaption = async () => {
    try { await navigator.clipboard.writeText(caption); } catch { /* clipboard may be blocked */ }
    setCopied(true); flash("caption copied — paste it in TikTok / IG");
    setTimeout(() => setCopied(false), 1800);
  };

  const hashtags = useMemo(() => (caption.match(/#\w+/g) ?? []).length, [caption]);
  const showWordFields = current?.variant === "word";

  return (
    <div className="min-h-svh bg-[#f4f0e7] font-sans text-neutral-900">
      <NavBar currentPath="/slideshow" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">

            <h1 className="mt-3 text-4xl font-semibold tracking-tighter sm:text-5xl">slideshow maker.</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
              Hook → value → CTA. Pick a preset, edit the words, export full-res PNGs, post with sound.
            </p>
          </div>
          <ol className="hidden items-center gap-1 text-xs font-bold md:flex" aria-label="workflow">
            {["preset", "design", "words", "export"].map((s, i) => (
              <li key={s} className="flex items-center gap-1">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${i <= 2 ? "bg-[#2B3128] text-white" : "bg-white text-neutral-500 border border-neutral-200"}`}>{i + 1}</span>
                <span className="mr-1 text-neutral-600">{s}</span>
                {i < 3 && <span className="mr-1 text-neutral-300">→</span>}
              </li>
            ))}
          </ol>
        </div>

        {/* presets */}
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => loadPreset(p.id)}
              aria-pressed={presetId === p.id}
              className={`rounded-2xl border p-4 text-left transition-all ${presetId === p.id ? "border-[#2B3128] bg-[#2B3128] text-white shadow-xl" : "border-[#2B3128]/10 bg-white/80 hover:border-[#2B3128]/40 hover:shadow-md"}`}
            >
              <span className={`block text-sm font-bold tracking-tight ${presetId === p.id ? "text-white" : "text-neutral-900"}`}>{p.hook}</span>
              <span className="mt-1 block text-base font-bold tracking-tight">{p.label}</span>
              <span className={`mt-0.5 block text-xs ${presetId === p.id ? "text-white/60" : "text-neutral-500"}`}>{p.slides.length} slides • caption included</span>
            </button>
          ))}
        </div>

        {/* design toolbar */}
        <div className="mt-4 rounded-3xl border border-[#2B3128]/10 bg-white/75 p-3 shadow-sm backdrop-blur sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Label>format</Label>
              <div className="flex items-center gap-2.5 rounded-2xl border border-[#2B3128] bg-[#2B3128] px-3 py-2 text-left text-white">
                <span className="h-9 w-9 rounded-sm border-2 border-lime-300 bg-lime-300/20" />
                <span>
                  <span className="block text-xs font-bold leading-none">{FORMAT.label}</span>
                  <span className="mt-1 block text-[11px] leading-none text-white/60">{FORMAT.sub}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Label>theme</Label>
              <div className="flex gap-1.5" role="radiogroup" aria-label="theme">
                {(Object.keys(THEMES) as ThemeId[]).map((id) => (
                  <button
                    key={id} role="radio" aria-checked={themeId === id} onClick={() => setThemeId(id)}
                    className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 transition ${themeId === id ? "border-[#2B3128] bg-[#2B3128] text-white" : "border-neutral-200 bg-white hover:border-neutral-400"}`}
                  >
                    <span className="flex -space-x-1.5">
                      <span className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: THEMES[id].theme.bg }} />
                      <span className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: THEMES[id].theme.primary }} />
                    </span>
                    <span className="text-left">
                      <span className="block text-xs font-bold leading-none">{THEMES[id].label}</span>
                      <span className={`block text-[10px] leading-none ${themeId === id ? "text-white/60" : "text-neutral-500"}`}>{THEMES[id].hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* mobile pane switch */}
        <div className="mt-4 grid grid-cols-3 gap-1 rounded-full border border-[#2B3128]/10 bg-white/80 p-1 lg:hidden" role="tablist">
          {([["slides", "Slides", Images], ["preview", "Preview", Eye], ["edit", "Edit", SlidersHorizontal]] as [Pane, string, LucideIcon][]).map(([id, label, Icon]) => (
            <button key={id} role="tab" aria-selected={pane === id} onClick={() => setPane(id)}
              className={`flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-bold transition ${pane === id ? "bg-[#2B3128] text-white" : "text-neutral-500"}`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        <div
          className="mt-4 flex flex-col items-start gap-4 lg:flex-row"
          style={{ "--deck-w": `${deckW}px`, "--edit-w": `${editW}px` } as React.CSSProperties}
        >
          {/* deck */}
          <section aria-label="deck" className={`${pane === "slides" ? "block" : "hidden"} w-full rounded-3xl border border-[#2B3128]/10 bg-white/75 p-3 backdrop-blur lg:sticky lg:top-24 lg:block lg:w-(--deck-w) lg:shrink-0`}>
            <div className="flex items-center justify-between px-1 pb-2">
              <h2 className="text-sm font-bold">deck <span className="ml-1 rounded-full bg-[#2B3128] px-2 py-0.5 text-[11px] text-white">{slides.length}</span></h2>
              <button onClick={addSlide} className="inline-flex items-center gap-1 rounded-full bg-[#2B3128] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-lime-700">
                <Plus size={13} /> add
              </button>
            </div>
            <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-0.5 lg:max-h-[62vh]">
              {slides.map((s, i) => (
                <Thumb key={s.id} slide={s} index={i} active={i === selected} theme={theme} onClick={() => { setDir(i > selected ? 1 : -1); setSelected(i); if (window.innerWidth < 1024) setPane("preview"); }} />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5 border-t border-[#2B3128]/10 pt-2.5">
              <button onClick={() => move(-1)} aria-label="move up" className="rounded-xl border border-neutral-200 bg-white py-2 text-sm font-bold hover:border-[#2B3128]"><ArrowLeft size={14} className="mx-auto rotate-90" /></button>
              <button onClick={() => move(1)} aria-label="move down" className="rounded-xl border border-neutral-200 bg-white py-2 text-sm font-bold hover:border-[#2B3128]"><ArrowRight size={14} className="mx-auto rotate-90" /></button>
              <button onClick={duplicate} aria-label="duplicate" className="rounded-xl border border-neutral-200 bg-white py-2 hover:border-[#2B3128]"><CopyPlus size={14} className="mx-auto" /></button>
              <button onClick={remove} aria-label="delete" className="rounded-xl border border-red-200 bg-red-50 py-2 text-red-600 hover:bg-red-100"><Trash2 size={14} className="mx-auto" /></button>
            </div>
          </section>

          <ColDivider
            label="resize deck column"
            onDrag={startDrag("deck")}
            onReset={resetWidths}
            onNudge={(d) => nudge("deck", d)}
          />

          {/* preview */}
          <section aria-label="preview" className={`${pane === "preview" ? "flex" : "hidden"} flex-col items-center rounded-3xl border border-[#2B3128]/10 bg-linear-to-b from-white/60 to-white/25 p-4 sm:p-6 lg:sticky lg:top-24 lg:flex lg:min-w-0 lg:flex-1`}>
            <div className="flex w-full max-w-105 items-center justify-between">
              <button onClick={() => go(selected - 1)} disabled={selected === 0} aria-label="previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B3128]/15 bg-white transition hover:border-[#2B3128] disabled:opacity-30">
                <ArrowLeft size={17} />
              </button>
              <h2 className="text-sm font-bold">canvas <span className="ml-1 rounded-full bg-[#2B3128] px-2 py-0.5 text-[11px] text-white">{selected + 1} / {slides.length}</span></h2>
              <button onClick={() => go(selected + 1)} disabled={selected === slides.length - 1} aria-label="next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B3128]/15 bg-white transition hover:border-[#2B3128] disabled:opacity-30">
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="relative mt-3 w-full max-w-105">
              <AnimatePresence mode="popLayout" custom={dir}>
                <motion.div
                  key={current?.id ?? "empty"}
                  custom={dir}
                  initial={{ opacity: 0, x: 44 * (dir >= 0 ? 1 : -1) }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -34 * (dir >= 0 ? 1 : -1) }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.border,
                    ...(themeId === "fiesta"
                      ? { backgroundImage: `url(${DOODLE_BG_SRC})`, backgroundSize: "cover", backgroundPosition: "center" }
                      : {}),
                  }}
                  className={`${FORMAT.css} relative flex w-full flex-col justify-between overflow-hidden rounded-[26px] border-2 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.4)] sm:p-6`}
                >
                  {themeId !== "fiesta" && <DoodleLayer primary={theme.primary} accent={theme.accent} />}
                  {themeId === "fiesta" && (
                    <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: DOODLE_BG_TINT }} aria-hidden />
                  )}
                  {current?.variant !== "cta" && <PeekingMascot />}
                  <div className="relative">
                    <div className="flex items-center justify-end text-[11px] font-bold tracking-wide">
                      <span
                        className="rounded-full border px-2.5 py-1 tabular-nums"
                        style={{ color: theme.text, backgroundColor: theme.surface, borderColor: theme.border }}
                      >
                        {String(selected + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="relative flex w-full flex-1 flex-col justify-center py-3">
                    {current?.title ? (
                      <p className="text-balance font-bold leading-none tracking-tight" style={{ color: theme.text, fontSize: current.variant === "cover" ? 52 : 40 }}>
                        {current.title}
                      </p>
                    ) : showWordFields ? null : <p className="text-sm italic" style={{ color: theme.muted }}>add a title…</p>}
                    {current?.body && <p className="mt-3 text-[17px] leading-snug" style={{ color: theme.muted }}>{current.body}</p>}
                    {current?.variant === "word" && (
                      <div className="mt-4 rounded-3xl border p-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]" style={{ backgroundColor: themeId === "dark" ? "#1B1E17" : theme.surface, borderColor: theme.border }}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                          <span className="rounded-md px-2 py-1" style={{ color: theme.accent, backgroundColor: `${theme.accent}24` }}>
                            tap → translate
                          </span>
                        </p>
                        <div className="mt-2.5 grid grid-cols-[auto_1px_1fr] items-center gap-3">
                          <p className="min-w-0 wrap-break-word text-[30px] font-bold leading-[0.95] tracking-tight" style={{ color: theme.text }}>{current.word || "tu palabra"}</p>
                          <div className="self-stretch" style={{ backgroundColor: theme.border }} aria-hidden />
                          <p className="min-w-0 text-[13px] italic leading-snug" style={{ color: theme.muted }}>{current.translation || "translation goes here…"}</p>
                        </div>
                      </div>
                    )}
                    {current?.variant === "cta" && (
                      <div className="mt-4 aspect-square w-full overflow-hidden rounded-2xl border" style={{ borderColor: theme.border, backgroundColor: themeId === "dark" ? "#1B1E17" : theme.surface }}>
                        {current.imageUrl ? (
                          <img src={current.imageUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center p-6">
                            <img src={MASCOT_SRC} alt="" className="max-h-full max-w-[62%] object-contain opacity-90" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    {current?.variant === "cta" ? (
                      <div className="rounded-full px-4 py-3 text-center text-[12px] font-bold leading-tight" style={{ backgroundColor: theme.primary, color: theme.onPrimary }}>
                        Get ALYA on the App Store →
                      </div>
                    ) : null}
                    <div className="mt-3 flex justify-center gap-1.5">
                      {slides.map((_, i) => (
                        <button key={i} onClick={() => go(i)} aria-label={`go to slide ${i + 1}`}
                          className="h-1.5 rounded-full transition-all" style={{ width: i === selected ? 18 : 6, backgroundColor: i === selected ? theme.text : theme.muted, opacity: i === selected ? 1 : 0.45 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
              <span className="text-neutral-400">← → keys work • dots jump</span>
            </div>

            <div className="mt-3 grid w-full max-w-105 gap-2 sm:grid-cols-2">
              <button onClick={exportOne} disabled={exporting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2B3128] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-lime-700 disabled:opacity-50">
                {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                {progress || `export slide ${selected + 1}`}
              </button>
              <button onClick={exportAll} disabled={exporting}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#2B3128] bg-white px-5 py-3 text-sm font-bold transition hover:bg-[#2B3128] hover:text-white disabled:opacity-50">
                <LayoutGrid size={16} /> all {slides.length} PNGs
              </button>
            </div>
          </section>

          {/* editor */}
          <ColDivider
            label="resize editor column"
            onDrag={startDrag("edit")}
            onReset={resetWidths}
            onNudge={(d) => nudge("edit", -d)}
          />
          <section aria-label="editor" className={`${pane === "edit" ? "block" : "hidden"} w-full rounded-3xl border border-[#2B3128]/10 bg-white/75 p-4 backdrop-blur sm:p-5 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:w-(--edit-w) lg:shrink-0 lg:overflow-y-auto`}>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">slide {selected + 1} <span className="ml-1 rounded-full bg-[#2B3128] px-2 py-0.5 text-[11px] text-white">{current?.variant}</span></h2>
            </div>

            <Label>layout</Label>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="layout">
              {VARIANTS.map((v) => (
                <button key={v.id} role="radio" aria-checked={current?.variant === v.id} onClick={() => update({ variant: v.id })}
                  className={`rounded-2xl border p-2.5 text-left transition ${current?.variant === v.id ? "border-[#2B3128] bg-[#2B3128] text-white" : "border-neutral-200 bg-white hover:border-[#2B3128]/40"}`}>
                  <span className="block text-xs font-bold">{v.label}</span>
                  <span className={`block text-[11px] ${current?.variant === v.id ? "text-white/60" : "text-neutral-500"}`}>{v.hint}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {([
                ["title", "title — the hook", false],
                ["body", "body — one line payoff", true],
              ] as const).map(([key, label, area]) => (
                <div key={key}>
                  <div className="flex items-center justify-between"><Label>{label}</Label><Count value={current?.[key] ?? ""} max={LIMITS[key]} /></div>
                  {area ? (
                    <textarea value={current?.[key] ?? ""} onChange={(e) => update({ [key]: e.target.value } as Partial<Slide>)} rows={2}
                      placeholder={key === "body" ? "e.g. real videos, instant translations" : ""}
                      className="mt-1 w-full resize-none rounded-2xl border border-neutral-200 bg-white p-3 text-sm outline-none transition focus:border-[#2B3128] focus:ring-2 focus:ring-lime-300" />
                  ) : (
                    <input value={current?.[key] ?? ""} onChange={(e) => update({ [key]: e.target.value } as Partial<Slide>)}
                      placeholder={key === "title" ? "e.g. stop saying it like a textbook" : ""}
                      className="mt-1 w-full rounded-2xl border border-neutral-200 bg-white p-3 text-sm outline-none transition focus:border-[#2B3128] focus:ring-2 focus:ring-lime-300" />
                  )}
                </div>
              ))}

              {showWordFields && <div className="rounded-2xl border border-lime-600/30 bg-lime-100/40 p-3">
                <Label>word card</Label>
                <div className="mt-2 space-y-3 opacity-100">
                  <div>
                    <div className="flex items-center justify-between"><Label>spanish word</Label><Count value={current?.word ?? ""} max={LIMITS.word} /></div>
                    <input value={current?.word ?? ""} onChange={(e) => update({ word: e.target.value })} placeholder="e.g. sobremesa"
                      className="mt-1 w-full rounded-2xl border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-[#2B3128]" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between"><Label>translation</Label><Count value={current?.translation ?? ""} max={LIMITS.translation} /></div>
                    <textarea value={current?.translation ?? ""} onChange={(e) => update({ translation: e.target.value })} rows={2} placeholder="e.g. lingering table talk after a meal"
                      className="mt-1 w-full resize-none rounded-2xl border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-[#2B3128]" />
                  </div>
                </div>
              </div>}

              {current?.variant === "cta" && (
                <div className="rounded-2xl border border-lime-600/30 bg-lime-100/40 p-3">
                  <div className="flex items-center justify-between">
                    <Label>app screenshot • cta</Label>
                    {current?.imageUrl && (
                      <button onClick={() => update({ imageUrl: undefined })} className="text-[11px] font-bold text-red-600 underline">remove</button>
                    )}
                  </div>
                  {current?.imageUrl ? (
                    <img src={current.imageUrl} alt="" className="mt-2 h-28 w-full rounded-xl object-cover" />
                  ) : (
                    <label className="mt-2 flex h-28 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white text-xs font-semibold text-neutral-500 hover:border-[#2B3128]">
                      upload a real screenshot
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => onPickImage(e.target.files?.[0])} />
                    </label>
                  )}
                  <p className="mt-1.5 text-[11px] text-neutral-500">no screenshot yet → falls back to the mascot</p>
                </div>
              )}

            </div>

            <div className="mt-5 border-t border-[#2B3128]/10 pt-4">
              <div className="flex items-center justify-between">
                <Label>caption + hashtags</Label>
                <button onClick={copyCaption} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${copied ? "bg-lime-400 text-neutral-950" : "bg-[#2B3128] text-white hover:bg-lime-700"}`}>
                  {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "copied" : "copy"}
                </button>
              </div>
              <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={6}
                className="mt-2 w-full resize-y rounded-2xl border border-neutral-200 bg-white p-3 text-sm leading-relaxed outline-none focus:border-[#2B3128]" />
              <p className="mt-1 text-[11px] font-semibold text-neutral-500 tabular-nums">{caption.length} chars • {hashtags} hashtags • {slides.length} slides</p>
              <div className="mt-2">
                <Label>handle</Label>
                <input value={handle} onChange={(e) => setHandle(e.target.value)} className="mt-1 w-full rounded-2xl border border-neutral-200 bg-white p-2.5 text-sm" />
              </div>
            </div>

            <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="mt-4 block rounded-2xl bg-[#2B3128] p-4 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300">posting checklist</p>
              <ol className="mt-1.5 space-y-1 text-[13px] leading-snug text-white/85">
                <li>1. export PNGs at {FORMAT.sub}</li>
                <li>2. trending sound, hook in first 1s</li>
                <li>3. CTA on last slide + link in bio</li>
              </ol>
            </a>
          </section>
        </div>

        {/* content calendar / planner */}
        <section aria-label="content calendar" className="mt-6 rounded-3xl border border-[#2B3128]/10 bg-white/75 p-4 backdrop-blur sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-700">content calendar</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tighter sm:text-3xl">Sep 19 → Sep 30 planner.</h2>
              <p className="mt-1 text-sm text-neutral-600">
                3 carousels + 3 reels / day • click a carousel topic to load its 5/6/6-slide template. Progress saves in this browser.
                <span className="ml-2 whitespace-nowrap font-bold text-neutral-900">bold = best slot</span>
                <span className="ml-2 whitespace-nowrap">🔥 peak day</span>
                <span className="ml-2 whitespace-nowrap">🔥🔥 super peak</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#2B3128] px-3 py-1.5 text-xs font-bold text-white tabular-nums">
                {plannerStats.done} / {plannerStats.total} posted
              </span>
              <button
                onClick={() => { setPlannerChecked({}); flash("planner reset"); }}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-600 transition hover:border-[#2B3128]"
              >
                reset
              </button>
            </div>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-200/70" role="progressbar"
            aria-valuenow={plannerStats.done} aria-valuemin={0} aria-valuemax={plannerStats.total} aria-label="planner progress">
            <div className="h-full rounded-full bg-[#2B3128] transition-all"
              style={{ width: `${plannerStats.total ? (plannerStats.done / plannerStats.total) * 100 : 0}%` }} />
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-[#2B3128]/10">
            <table className="w-full min-w-300 border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-[#2B3128] text-white">
                  <th className="sticky left-0 z-10 bg-[#2B3128] px-3 py-3 text-left text-xs font-bold uppercase tracking-wide">Date</th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide">Day</th>
                  {PLANNER_SLOTS.map((s) => (
                    <th key={s} className="px-2 py-3 text-center text-xs font-bold uppercase tracking-wide">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLANNER_ROWS.map((row, ri) => {
                  const times = row.times ?? PLANNER_DEFAULT_TIMES;
                  const hot = row.hot ?? [];
                  let rowDone = 0;
                  for (let si = 0; si < PLANNER_SLOTS.length; si++) if (isSlotChecked(row.date, si)) rowDone++;
                  const rowComplete = rowDone === PLANNER_SLOTS.length;
                  return (
                    <tr key={row.date} className={`border-t border-neutral-200/70 transition ${row.peak ? "bg-amber-50/70" : ri % 2 ? "bg-neutral-50/60" : "bg-white"} ${rowComplete ? "bg-lime-100/50" : ""}`}>
                      <td className={`sticky left-0 z-10 px-3 py-2.5 tabular-nums ${row.peak ? "font-extrabold" : "font-bold"} ${rowComplete ? "bg-lime-100" : row.peak ? "bg-amber-50" : ri % 2 ? "bg-[#f8f7f2]" : "bg-white"}`}>
                        {row.date}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-2.5 ${row.peak ? "font-extrabold text-neutral-900" : "text-neutral-600"}`}>
                        {row.day} {row.tag && <span className="ml-1">{row.tag}</span>}
                      </td>
                      {PLANNER_SLOTS.map((slot, si) => {
                        const on = isSlotChecked(row.date, si);
                        const isHot = !!hot[si];
                        const slotConfig = instagramCampaign.campaign.slots[si];
                        const topic = "topicIndex" in slotConfig && typeof slotConfig.topicIndex === "number"
                          ? row.carouselTopics[slotConfig.topicIndex]
                          : null;
                        return (
                          <td key={slot} className="min-w-44 px-2 py-2 text-center align-top">
                            <button
                              role="checkbox"
                              aria-checked={on}
                              aria-label={`${row.date} ${slot} at ${times[si]} — ${on ? "posted" : "not posted"}`}
                              title={`${times[si]}${isHot ? " • best slot" : ""}`}
                              onClick={() => toggleSlot(row.date, si)}
                              className={`group inline-flex flex-col items-center gap-1 rounded-xl border px-2.5 py-1.5 transition ${
                                on ? "border-[#2B3128] bg-[#2B3128] text-white shadow-md" : isHot ? "border-amber-400/70 bg-amber-50 hover:border-[#2B3128]/50 hover:shadow-sm" : "border-neutral-200 bg-white hover:border-[#2B3128]/50 hover:shadow-sm"
                              }`}
                            >
                              <span className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${on ? "border-lime-300 bg-lime-300 text-[#2B3128]" : "border-neutral-300 bg-neutral-100 text-transparent group-hover:border-[#2B3128]"}`}>
                                <Check size={13} strokeWidth={3.5} />
                              </span>
                              <span className={`text-[11px] tabular-nums ${on ? "font-semibold text-lime-200 line-through" : isHot ? "font-extrabold text-neutral-900" : "font-semibold text-neutral-600"}`}>
                                {times[si]}
                              </span>
                            </button>
                            {topic && (
                              <button
                                type="button"
                                onClick={() => loadCampaignTopic(row, si)}
                                title={`Load ${topic} into the carousel editor`}
                                className="mx-auto mt-2 block max-w-48 rounded-lg px-1.5 py-1 text-left text-[11px] font-bold leading-snug text-neutral-700 transition hover:bg-lime-100 hover:text-neutral-950"
                              >
                                {topic}
                                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-lime-700">
                                  load deck →
                                </span>
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-neutral-500">
            Strategy: Tue–Thu = strongest concepts • Fri–Sat = experiments • Mon–Sun = presentation tests. Late-night times belong to the next calendar day. Sep 24 runs 1h early.
          </p>
        </section>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#2B3128] px-5 py-3 text-sm font-semibold text-white shadow-2xl">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
