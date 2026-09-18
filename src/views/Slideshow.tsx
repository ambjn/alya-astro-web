import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  CopyPlus,
  Download,
  Eye,
  EyeOff,
  Images,
  LayoutGrid,
  Loader2,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Trash2,
} from "lucide-react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { APP_STORE_URL } from "../constants";

type FormatId = "9:16" | "4:5" | "1:1";
type ThemeId = "dark" | "cream" | "avocado";
type Variant = "cover" | "statement" | "word" | "cta";
type Pane = "slides" | "preview" | "edit";

interface Slide {
  id: string;
  kicker: string;
  title: string;
  body: string;
  word: string;
  translation: string;
  footer: string;
  variant: Variant;
}

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

const FORMATS: { id: FormatId; label: string; sub: string; w: number; h: number; css: string; glyph: string }[] = [
  { id: "9:16", label: "TikTok / Reels", sub: "1080 × 1920", w: 1080, h: 1920, css: "aspect-[9/16]", glyph: "h-9 w-[20px]" },
  { id: "4:5", label: "IG portrait", sub: "1080 × 1350", w: 1080, h: 1350, css: "aspect-[4/5]", glyph: "h-9 w-[29px]" },
  { id: "1:1", label: "IG square", sub: "1080 × 1080", w: 1080, h: 1080, css: "aspect-square", glyph: "h-9 w-9" },
];

const THEMES: Record<ThemeId, { label: string; hint: string; theme: Theme }> = {
  dark: {
    label: "Alya dark",
    hint: "app true",
    theme: {
      bg: "#10120E",
      surface: "#1B1E17",
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
      primary: "#10120E",
      onPrimary: "#FFF9F0",
      text: "#18200D",
      muted: "rgba(24,32,13,0.66)",
      accent: "#10120E",
    },
  },
};

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const PRESETS: { id: string; label: string; hook: string; caption: string; slides: Slide[] }[] = [
  {
    id: "doomscroll",
    label: "Doomscroll hook",
    hook: "5 slides • app explainer",
    caption:
      "learn spanish by doomscrolling 👀\nscroll real videos. tap what you don't know. grow your companion.\n\nfree on iOS — link in bio\n\n#learnspanish #spanishtiktok #doomscrolling #languagelearning #alyaapp",
    slides: [
      { id: uid(), kicker: "alya • spanish", title: "learn spanish by doomscrolling.", body: "swipe → how it works", word: "", translation: "", footer: "@alyacompanion", variant: "cover" },
      { id: uid(), kicker: "01 / real videos", title: "scroll real Spanish videos.", body: "street food, memes, travel — not textbook dialogues.", word: "", translation: "", footer: "immersion feed", variant: "statement" },
      { id: uid(), kicker: "02 / tap anything", title: "tap what you don't know.", body: "instant translation + explanation, right on the video.", word: "sobremesa", translation: "n. lingering table talk after a meal", footer: "tap-to-translate", variant: "word" },
      { id: uid(), kicker: "03 / keep it", title: "save words. grow your streak.", body: "vocab + companion that evolves as you learn.", word: "qué padre", translation: "how cool! (Mexico 🇲🇽)", footer: "daily habit", variant: "word" },
      { id: uid(), kicker: "free on iOS", title: "stop studying. start scrolling.", body: "download ALYA free — link in bio.", word: "", translation: "", footer: "alya • learn spanish", variant: "cta" },
    ],
  },
  {
    id: "words",
    label: "3 words you need",
    hook: "4 slides • save-bait",
    caption:
      "3 Spanish words natives actually use 🇪🇸🇲🇽\nwhich one is new for you?\n\nlearn them by doomscrolling — ALYA, free on iOS\n\n#spanishwords #spanishvocab #mexicanspanish #learnspanish",
    slides: [
      { id: uid(), kicker: "save this →", title: "3 Spanish words natives actually use.", body: "swipe for instant upgrades", word: "", translation: "", footer: "@alyacompanion", variant: "cover" },
      { id: uid(), kicker: "01", title: "", body: "", word: "sobremesa", translation: "the chat that happens after eating — no English equivalent", footer: "tap in ALYA for examples", variant: "word" },
      { id: uid(), kicker: "02", title: "", body: "", word: "qué padre", translation: "how cool! — you'll hear this 10x a day in Mexico", footer: "tap in ALYA for examples", variant: "word" },
      { id: uid(), kicker: "free on iOS", title: "learn them scrolling, not studying.", body: "ALYA — link in bio.", word: "", translation: "", footer: "download free", variant: "cta" },
    ],
  },
  {
    id: "mistakes",
    label: "Stop saying it wrong",
    hook: "4 slides • POV hook",
    caption:
      "stop saying it like a textbook 🛑\nsay it like a native.\n\nALYA teaches you real Spanish from real videos.\n\n#spanishmistakes #spanishlearning #gringo #latina",
    slides: [
      { id: uid(), kicker: "pov: textbook spanish", title: "stop saying it like a textbook.", body: "say it like a native →", word: "", translation: "", footer: "@alyacompanion", variant: "cover" },
      { id: uid(), kicker: "❌ textbook", title: "¿Cómo estás, amigo?", body: "technically right. socially… robotic.", word: "", translation: "", footer: "", variant: "statement" },
      { id: uid(), kicker: "✅ native", title: "¿Qué onda? ¿Cómo andas?", body: "real. casual. human.", word: "qué onda", translation: "what's up? (Mexico 🇲🇽)", footer: "heard daily in ALYA feed", variant: "word" },
      { id: uid(), kicker: "free on iOS", title: "real Spanish, real videos.", body: "ALYA — link in bio.", word: "", translation: "", footer: "download free", variant: "cta" },
    ],
  },
];

const VARIANTS: { id: Variant; label: string; hint: string }[] = [
  { id: "cover", label: "Cover", hint: "hook slide 1" },
  { id: "statement", label: "Statement", hint: "big line" },
  { id: "word", label: "Word card", hint: "vocab pop" },
  { id: "cta", label: "CTA", hint: "last slide" },
];

const LIMITS: Record<string, number> = { kicker: 26, title: 60, body: 110, word: 22, translation: 90, footer: 44 };

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

async function renderSlideToCanvas(slide: Slide, index: number, total: number, format: FormatId, themeId: ThemeId) {
  const fmt = FORMATS.find((f) => f.id === format)!;
  const t = THEMES[themeId].theme;
  const canvas = document.createElement("canvas");
  canvas.width = fmt.w;
  canvas.height = fmt.h;
  const ctx = canvas.getContext("2d")!;
  try { await document.fonts.ready; } catch { /* noop */ }

  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, fmt.w, fmt.h);
  ctx.fillStyle = themeId === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  for (let y = 60; y < fmt.h; y += 120)
    for (let x = 60; x < fmt.w; x += 120) { ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill(); }

  const pad = 96;
  const W = fmt.w - pad * 2;
  ctx.fillStyle = t.muted;
  ctx.font = "600 34px Outfit, system-ui, sans-serif";
  ctx.fillText("alya.", pad, 150);
  ctx.textAlign = "right";
  ctx.fillText(`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, fmt.w - pad, 150);
  ctx.textAlign = "left";

  let y = 250;
  if (slide.kicker) {
    ctx.font = "700 30px Outfit, system-ui, sans-serif";
    const kw = Math.min(ctx.measureText(slide.kicker.toUpperCase()).width + 56, W);
    ctx.fillStyle = themeId === "dark" ? "rgba(183,217,107,0.14)" : "rgba(0,0,0,0.07)";
    roundRect(ctx, pad, y, kw, 64, 32); ctx.fill();
    ctx.fillStyle = themeId === "dark" ? t.primary : t.text;
    ctx.fillText(slide.kicker.toUpperCase().slice(0, 34), pad + 28, y + 43);
    y += 120;
  }
  if (slide.title) {
    ctx.fillStyle = t.text;
    const big = slide.variant === "cover";
    ctx.font = `700 ${big ? 118 : 92}px Outfit, system-ui, sans-serif`;
    for (const line of wrapText(ctx, slide.title, W).slice(0, 5)) {
      ctx.fillText(line, pad, y + (big ? 110 : 88));
      y += big ? 128 : 104;
    }
    y += 24;
  }
  if (slide.body) {
    ctx.fillStyle = t.muted;
    ctx.font = "500 44px Outfit, system-ui, sans-serif";
    for (const line of wrapText(ctx, slide.body, W).slice(0, 4)) { ctx.fillText(line, pad, y + 52); y += 64; }
    y += 40;
  }
  if (slide.variant === "word" && slide.word) {
    const cardY = y + 20, cardH = 420;
    ctx.fillStyle = themeId === "dark" ? "#1B1E17" : t.surface;
    roundRect(ctx, pad, cardY, W, cardH, 48); ctx.fill();
    ctx.strokeStyle = t.border; ctx.lineWidth = 3;
    roundRect(ctx, pad, cardY, W, cardH, 48); ctx.stroke();
    ctx.fillStyle = t.accent === t.text ? t.primary : t.accent;
    ctx.font = "700 40px Outfit, system-ui, sans-serif";
    ctx.fillText("TAP → TRANSLATE", pad + 56, cardY + 90);
    ctx.fillStyle = t.text; ctx.font = "700 110px Outfit, system-ui, sans-serif";
    ctx.fillText(slide.word.slice(0, 24), pad + 56, cardY + 230);
    ctx.fillStyle = t.muted; ctx.font = "500 42px Outfit, system-ui, sans-serif";
    let ty = cardY + 300;
    for (const line of wrapText(ctx, slide.translation, W - 112).slice(0, 2)) { ctx.fillText(line, pad + 56, ty); ty += 58; }
    y = cardY + cardH + 40;
  }

  const ctaH = 150, ctaY = fmt.h - ctaH - 120;
  ctx.fillStyle = t.primary;
  roundRect(ctx, pad, ctaY, W, ctaH, 75); ctx.fill();
  ctx.fillStyle = t.onPrimary; ctx.font = "700 46px Outfit, system-ui, sans-serif";
  const cta = slide.variant === "cta" ? "download ALYA — free on iOS" : slide.footer || "alya • learn spanish by doomscrolling";
  ctx.fillText(wrapText(ctx, cta, W - 100)[0] ?? cta, pad + 50, ctaY + 92);

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
  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">{children}</p>
);

const Count = ({ value, max }: { value: string; max: number }) => (
  <span className={`text-[11px] font-semibold tabular-nums ${value.length > max ? "text-red-600" : "text-neutral-400"}`}>
    {value.length}/{max}
  </span>
);

function Thumb({ slide, index, active, theme, onClick }: { slide: Slide; index: number; active: boolean; theme: Theme; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`group flex w-full items-stretch gap-3 rounded-2xl border p-2.5 text-left transition-all ${active ? "border-neutral-900 bg-neutral-900 text-white shadow-lg" : "border-neutral-200 bg-white hover:border-neutral-900/40 hover:shadow-md"}`}
    >
      <span
        className="relative aspect-[9/16] w-11 shrink-0 overflow-hidden rounded-lg border p-1.5"
        style={{ backgroundColor: theme.bg, borderColor: active ? "rgba(255,255,255,0.2)" : theme.border }}
      >
        <span className="block h-1 w-4 rounded-full" style={{ backgroundColor: theme.primary }} />
        <span className="mt-1 block h-1 w-full rounded-full opacity-70" style={{ backgroundColor: theme.text }} />
        <span className="mt-0.5 block h-1 w-2/3 rounded-full opacity-50" style={{ backgroundColor: theme.text }} />
        {slide.variant === "word" && <span className="absolute inset-x-1.5 bottom-1.5 top-auto h-3.5 rounded" style={{ backgroundColor: theme.primary, opacity: 0.85 }} />}
        <span className="absolute bottom-1 right-1 text-[8px] font-bold" style={{ color: theme.muted }}>{index + 1}</span>
      </span>
      <span className="min-w-0 flex-1 py-0.5">
        <span className={`block truncate text-[10px] font-bold uppercase tracking-[0.14em] ${active ? "text-lime-300" : "text-lime-700"}`}>
          {index + 1} • {slide.variant}{slide.kicker ? ` • ${slide.kicker}` : ""}
        </span>
        <span className="mt-0.5 block truncate text-sm font-semibold">{slide.title || slide.word || "(untitled)"}</span>
        <span className={`mt-0.5 block truncate text-xs ${active ? "text-white/60" : "text-neutral-500"}`}>{slide.body || slide.translation || "—"}</span>
      </span>
    </button>
  );
}

/* ---------- main ---------- */

export const Slideshow = () => {
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [slides, setSlides] = useState<Slide[]>(() => PRESETS[0].slides.map((s) => ({ ...s })));
  const [selected, setSelected] = useState(0);
  const [format, setFormat] = useState<FormatId>("9:16");
  const [themeId, setThemeId] = useState<ThemeId>("dark");
  const [caption, setCaption] = useState(PRESETS[0].caption);
  const [handle, setHandle] = useState("@alyacompanion");
  const [pane, setPane] = useState<Pane>("preview");
  const [showSafe, setShowSafe] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState("");
  const [toast, setToast] = useState("");
  const [copied, setCopied] = useState(false);
  const [dir, setDir] = useState(0);

  const theme = THEMES[themeId].theme;
  const fmt = FORMATS.find((f) => f.id === format)!;
  const current = slides[selected] ?? slides[0];

  const flash = (msg: string) => { setToast(msg); window.clearTimeout((flash as unknown as { t?: number }).t); (flash as unknown as { t?: number }).t = window.setTimeout(() => setToast(""), 2200); };

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

  const update = (patch: Partial<Slide>) =>
    setSlides((prev) => prev.map((s, i) => (i === selected ? { ...s, ...patch } : s)));

  const addSlide = () => {
    const s: Slide = { id: uid(), kicker: "new", title: "your hook here", body: "", word: "", translation: "", footer: handle, variant: "statement" };
    setSlides((p) => [...p, s]); setDir(1); setSelected(slides.length);
    if (window.innerWidth < 1024) setPane("edit");
  };
  const duplicate = () => {
    if (!current) return;
    const copy = { ...current, id: uid(), title: `${current.title}` };
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
    setSlides((p) => { const n = [...p]; [n[selected], n[j]] = [n[j], n[selected]]; return n; });
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
      const c = await renderSlideToCanvas(current, selected, slides.length, format, themeId);
      download(c, `alya-slide-${selected + 1}-${format.replace(":", "x")}.png`);
      flash(`slide ${selected + 1} exported • ${fmt.sub}`);
    } finally { setExporting(false); setProgress(""); }
  };
  const exportAll = async () => {
    setExporting(true);
    try {
      for (let i = 0; i < slides.length; i++) {
        setProgress(`rendering ${i + 1} / ${slides.length}…`);
        const c = await renderSlideToCanvas(slides[i], i, slides.length, format, themeId);
        download(c, `alya-slide-${i + 1}-of-${slides.length}.png`);
        await new Promise((r) => setTimeout(r, 350));
      }
      flash(`exported ${slides.length} PNGs • ${fmt.sub}`);
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
            <p className="inline-flex items-center gap-1.5 rounded-full border border-lime-700/20 bg-lime-200/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-lime-800">
              <Sparkles size={12} /> promo kit • internal
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tighter sm:text-5xl">slideshow maker.</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
              Hook → value → CTA. Pick a preset, edit the words, export full-res PNGs, post with sound.
            </p>
          </div>
          <ol className="hidden items-center gap-1 text-xs font-bold md:flex" aria-label="workflow">
            {["preset", "design", "words", "export"].map((s, i) => (
              <li key={s} className="flex items-center gap-1">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${i <= 2 ? "bg-neutral-900 text-white" : "bg-white text-neutral-500 border border-neutral-200"}`}>{i + 1}</span>
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
              className={`rounded-2xl border p-4 text-left transition-all ${presetId === p.id ? "border-neutral-900 bg-neutral-900 text-white shadow-xl" : "border-neutral-900/10 bg-white/80 hover:border-neutral-900/40 hover:shadow-md"}`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${presetId === p.id ? "text-lime-300" : "text-lime-700"}`}>{p.hook}</span>
              <span className="mt-1 block text-base font-bold tracking-tight">{p.label}</span>
              <span className={`mt-0.5 block text-xs ${presetId === p.id ? "text-white/60" : "text-neutral-500"}`}>{p.slides.length} slides • caption included</span>
            </button>
          ))}
        </div>

        {/* design toolbar */}
        <div className="mt-4 rounded-3xl border border-neutral-900/10 bg-white/75 p-3 shadow-sm backdrop-blur sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Label>format</Label>
              <div className="flex gap-1.5" role="radiogroup" aria-label="format">
                {FORMATS.map((f) => (
                  <button
                    key={f.id} role="radio" aria-checked={format === f.id} title={f.sub}
                    onClick={() => setFormat(f.id)}
                    className={`flex items-center gap-2.5 rounded-2xl border px-3 py-2 text-left transition ${format === f.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white hover:border-neutral-400"}`}
                  >
                    <span className={`rounded-[4px] border-2 ${format === f.id ? "border-lime-300 bg-lime-300/20" : "border-neutral-300 bg-neutral-100"} ${f.glyph}`} />
                    <span>
                      <span className="block text-xs font-bold leading-none">{f.label}</span>
                      <span className={`mt-1 block text-[11px] leading-none ${format === f.id ? "text-white/60" : "text-neutral-500"}`}>{f.sub}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Label>theme</Label>
              <div className="flex gap-1.5" role="radiogroup" aria-label="theme">
                {(Object.keys(THEMES) as ThemeId[]).map((id) => (
                  <button
                    key={id} role="radio" aria-checked={themeId === id} onClick={() => setThemeId(id)}
                    className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 transition ${themeId === id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white hover:border-neutral-400"}`}
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
        <div className="mt-4 grid grid-cols-3 gap-1 rounded-full border border-neutral-900/10 bg-white/80 p-1 lg:hidden" role="tablist">
          {([["slides", "Slides", Images], ["preview", "Preview", Eye], ["edit", "Edit", SlidersHorizontal]] as [Pane, string, typeof Eye][]).map(([id, label, Icon]) => (
            <button key={id} role="tab" aria-selected={pane === id} onClick={() => setPane(id)}
              className={`flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-bold transition ${pane === id ? "bg-neutral-900 text-white" : "text-neutral-500"}`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[290px_minmax(0,1fr)_350px]">
          {/* deck */}
          <section aria-label="slides" className={`${pane === "slides" ? "block" : "hidden"} lg:block rounded-3xl border border-neutral-900/10 bg-white/75 p-3 backdrop-blur lg:sticky lg:top-24`}>
            <div className="flex items-center justify-between px-1 pb-2">
              <h2 className="text-sm font-bold">deck <span className="ml-1 rounded-full bg-neutral-900 px-2 py-0.5 text-[11px] text-white">{slides.length}</span></h2>
              <button onClick={addSlide} className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-lime-700">
                <Plus size={13} /> add
              </button>
            </div>
            <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-0.5 lg:max-h-[62vh]">
              {slides.map((s, i) => (
                <Thumb key={s.id} slide={s} index={i} active={i === selected} theme={theme} onClick={() => { setDir(i > selected ? 1 : -1); setSelected(i); if (window.innerWidth < 1024) setPane("preview"); }} />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5 border-t border-neutral-900/10 pt-2.5">
              <button onClick={() => move(-1)} aria-label="move up" className="rounded-xl border border-neutral-200 bg-white py-2 text-sm font-bold hover:border-neutral-900"><ArrowLeft size={14} className="mx-auto rotate-90" /></button>
              <button onClick={() => move(1)} aria-label="move down" className="rounded-xl border border-neutral-200 bg-white py-2 text-sm font-bold hover:border-neutral-900"><ArrowRight size={14} className="mx-auto rotate-90" /></button>
              <button onClick={duplicate} aria-label="duplicate" className="rounded-xl border border-neutral-200 bg-white py-2 hover:border-neutral-900"><CopyPlus size={14} className="mx-auto" /></button>
              <button onClick={remove} aria-label="delete" className="rounded-xl border border-red-200 bg-red-50 py-2 text-red-600 hover:bg-red-100"><Trash2 size={14} className="mx-auto" /></button>
            </div>
          </section>

          {/* preview */}
          <section aria-label="preview" className={`${pane === "preview" ? "flex" : "hidden"} lg:flex flex-col items-center rounded-3xl border border-neutral-900/10 bg-gradient-to-b from-white/60 to-white/25 p-4 sm:p-6 lg:sticky lg:top-24`}>
            <div className="flex w-full max-w-[420px] items-center justify-between">
              <button onClick={() => go(selected - 1)} disabled={selected === 0} aria-label="previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/15 bg-white transition hover:border-neutral-900 disabled:opacity-30">
                <ArrowLeft size={17} />
              </button>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 tabular-nums">
                {selected + 1} / {slides.length} • {fmt.sub}
              </p>
              <button onClick={() => go(selected + 1)} disabled={selected === slides.length - 1} aria-label="next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/15 bg-white transition hover:border-neutral-900 disabled:opacity-30">
                <ArrowRight size={17} />
              </button>
            </div>

            <div className={`relative mt-3 w-full ${format === "9:16" ? "max-w-[300px] sm:max-w-[320px]" : format === "4:5" ? "max-w-[360px]" : "max-w-[420px]"}`}>
              {format === "9:16" && (
                <div className="pointer-events-none absolute -inset-2 rounded-[36px] border border-neutral-900/10 bg-neutral-900/[0.04]" aria-hidden />
              )}
              <AnimatePresence mode="popLayout" custom={dir}>
                <motion.div
                  key={current?.id ?? "empty"}
                  custom={dir}
                  initial={{ opacity: 0, x: 44 * (dir >= 0 ? 1 : -1) }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -34 * (dir >= 0 ? 1 : -1) }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundColor: theme.bg, borderColor: theme.border, backgroundImage: `radial-gradient(${themeId === "dark" ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)"} 1px, transparent 1.4px)`, backgroundSize: "22px 22px" }}
                  className={`${fmt.css} relative flex w-full flex-col justify-between overflow-hidden rounded-[26px] border-2 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.4)] sm:p-6`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold tracking-wide" style={{ color: theme.muted }}>
                      <span>alya.</span>
                      <span className="tabular-nums">{String(selected + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
                    </div>
                    {current?.kicker && (
                      <span className="mt-3.5 inline-block max-w-full truncate rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ backgroundColor: themeId === "dark" ? "rgba(183,217,107,0.16)" : "rgba(0,0,0,0.07)", color: themeId === "dark" ? theme.primary : theme.text }}>
                        {current.kicker}
                      </span>
                    )}
                    {current?.title ? (
                      <p className="mt-2.5 font-bold leading-[1.02] tracking-tight" style={{ color: theme.text, fontSize: current.variant === "cover" ? 37 : 29 }}>
                        {current.title}
                      </p>
                    ) : showWordFields ? null : <p className="mt-2.5 text-sm italic" style={{ color: theme.muted }}>add a title…</p>}
                    {current?.body && <p className="mt-2 text-[13px] leading-snug" style={{ color: theme.muted }}>{current.body}</p>}
                    {current?.variant === "word" && (
                      <div className="mt-4 rounded-2xl border p-4" style={{ backgroundColor: themeId === "dark" ? "#1B1E17" : theme.surface, borderColor: theme.border }}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>tap → translate</p>
                        <p className="mt-1 break-words text-[28px] font-bold leading-none tracking-tight" style={{ color: theme.text }}>{current.word || "tu palabra"}</p>
                        <p className="mt-1.5 text-xs leading-snug" style={{ color: theme.muted }}>{current.translation || "translation goes here…"}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="rounded-full px-4 py-3 text-center text-[12px] font-bold leading-tight" style={{ backgroundColor: theme.primary, color: theme.onPrimary }}>
                      {current?.variant === "cta" ? "download ALYA — free on iOS" : current?.footer || "alya • learn spanish by doomscrolling"}
                    </div>
                    <div className="mt-3 flex justify-center gap-1.5">
                      {slides.map((_, i) => (
                        <button key={i} onClick={() => go(i)} aria-label={`go to slide ${i + 1}`}
                          className="h-1.5 rounded-full transition-all" style={{ width: i === selected ? 18 : 6, backgroundColor: i === selected ? theme.text : theme.muted, opacity: i === selected ? 1 : 0.45 }} />
                      ))}
                    </div>
                  </div>

                  {showSafe && format === "9:16" && (
                    <div className="pointer-events-none absolute inset-0" aria-hidden>
                      <div className="absolute inset-x-0 top-0 h-[13%] border-b border-dashed border-red-400/70 bg-red-500/[0.07]" />
                      <div className="absolute inset-x-0 bottom-0 h-[22%] border-t border-dashed border-red-400/70 bg-red-500/[0.07]" />
                      <span className="absolute left-1/2 top-[13%] -translate-x-1/2 rounded-full bg-red-500/85 px-2 py-0.5 text-[9px] font-bold text-white">tiktok UI — keep text clear</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
              <button onClick={() => setShowSafe((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition ${showSafe ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 bg-white text-neutral-600"}`}>
                {showSafe ? <EyeOff size={13} /> : <Eye size={13} />} safe zones
              </button>
              <span className="text-neutral-400">← → keys work • dots jump</span>
            </div>

            <div className="mt-3 grid w-full max-w-[420px] gap-2 sm:grid-cols-2">
              <button onClick={exportOne} disabled={exporting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-lime-700 disabled:opacity-50">
                {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                {progress || `export slide ${selected + 1}`}
              </button>
              <button onClick={exportAll} disabled={exporting}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-neutral-900 bg-white px-5 py-3 text-sm font-bold transition hover:bg-neutral-900 hover:text-white disabled:opacity-50">
                <LayoutGrid size={16} /> all {slides.length} PNGs
              </button>
            </div>
          </section>

          {/* editor */}
          <section aria-label="editor" className={`${pane === "edit" ? "block" : "hidden"} lg:block rounded-3xl border border-neutral-900/10 bg-white/75 p-4 backdrop-blur sm:p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto`}>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">slide {selected + 1} <span className="font-medium text-neutral-500">of {slides.length}</span></h2>
              <span className="rounded-full bg-lime-200/70 px-2.5 py-1 text-[11px] font-bold text-lime-900">{current?.variant}</span>
            </div>

            <Label>layout</Label>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="layout">
              {VARIANTS.map((v) => (
                <button key={v.id} role="radio" aria-checked={current?.variant === v.id} onClick={() => update({ variant: v.id })}
                  className={`rounded-2xl border p-2.5 text-left transition ${current?.variant === v.id ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white hover:border-neutral-900/40"}`}>
                  <span className="block text-xs font-bold">{v.label}</span>
                  <span className={`block text-[11px] ${current?.variant === v.id ? "text-white/60" : "text-neutral-500"}`}>{v.hint}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {([
                ["kicker", "kicker — small pill", false],
                ["title", "title — the hook", false],
                ["body", "body — one line payoff", true],
              ] as const).map(([key, label, area]) => (
                <div key={key}>
                  <div className="flex items-center justify-between"><Label>{label}</Label><Count value={current?.[key] ?? ""} max={LIMITS[key]} /></div>
                  {area ? (
                    <textarea value={current?.[key] ?? ""} onChange={(e) => update({ [key]: e.target.value } as Partial<Slide>)} rows={2}
                      placeholder={key === "body" ? "e.g. real videos, instant translations" : ""}
                      className="mt-1 w-full resize-none rounded-2xl border border-neutral-200 bg-white p-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-lime-300" />
                  ) : (
                    <input value={current?.[key] ?? ""} onChange={(e) => update({ [key]: e.target.value } as Partial<Slide>)}
                      placeholder={key === "title" ? "e.g. stop saying it like a textbook" : key === "kicker" ? "e.g. 01 / real videos" : ""}
                      className="mt-1 w-full rounded-2xl border border-neutral-200 bg-white p-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-lime-300" />
                  )}
                </div>
              ))}

              <div className={`rounded-2xl border p-3 transition ${showWordFields ? "border-lime-600/30 bg-lime-100/40" : "border-dashed border-neutral-300 bg-neutral-50"}`}>
                <div className="flex items-center justify-between">
                  <Label>word card {showWordFields ? "• active" : "• needs word layout"}</Label>
                  {!showWordFields && (
                    <button onClick={() => update({ variant: "word" })} className="text-[11px] font-bold text-lime-800 underline">switch to word</button>
                  )}
                </div>
                <div className="mt-2 space-y-3 opacity-100">
                  <div>
                    <div className="flex items-center justify-between"><Label>spanish word</Label><Count value={current?.word ?? ""} max={LIMITS.word} /></div>
                    <input value={current?.word ?? ""} onChange={(e) => update({ word: e.target.value })} placeholder="e.g. sobremesa"
                      className="mt-1 w-full rounded-2xl border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-neutral-900" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between"><Label>translation</Label><Count value={current?.translation ?? ""} max={LIMITS.translation} /></div>
                    <textarea value={current?.translation ?? ""} onChange={(e) => update({ translation: e.target.value })} rows={2} placeholder="e.g. lingering table talk after a meal"
                      className="mt-1 w-full resize-none rounded-2xl border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-neutral-900" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between"><Label>bottom bar</Label><Count value={current?.footer ?? ""} max={LIMITS.footer} /></div>
                <input value={current?.footer ?? ""} onChange={(e) => update({ footer: e.target.value })} placeholder={handle}
                  className="mt-1 w-full rounded-2xl border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-neutral-900" />
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {[handle, "tap-to-translate", "link in bio ↑"].map((chip) => (
                    <button key={chip} onClick={() => update({ footer: chip })} className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-bold text-neutral-600 hover:border-neutral-900 hover:text-neutral-900">
                      {chip || "empty"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-neutral-900/10 pt-4">
              <div className="flex items-center justify-between">
                <Label>caption + hashtags</Label>
                <button onClick={copyCaption} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${copied ? "bg-lime-400 text-neutral-950" : "bg-neutral-900 text-white hover:bg-lime-700"}`}>
                  {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "copied" : "copy"}
                </button>
              </div>
              <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={6}
                className="mt-2 w-full resize-y rounded-2xl border border-neutral-200 bg-white p-3 text-sm leading-relaxed outline-none focus:border-neutral-900" />
              <p className="mt-1 text-[11px] font-semibold text-neutral-500 tabular-nums">{caption.length} chars • {hashtags} hashtags • {slides.length} slides</p>
              <div className="mt-2">
                <Label>handle</Label>
                <input value={handle} onChange={(e) => setHandle(e.target.value)} className="mt-1 w-full rounded-2xl border border-neutral-200 bg-white p-2.5 text-sm" />
              </div>
            </div>

            <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="mt-4 block rounded-2xl bg-neutral-900 p-4 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300">posting checklist</p>
              <ol className="mt-1.5 space-y-1 text-[13px] leading-snug text-white/85">
                <li>1. export PNGs at {fmt.sub}</li>
                <li>2. trending sound, hook in first 1s</li>
                <li>3. CTA on last slide + link in bio</li>
              </ol>
            </a>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
