import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { SocialLinks } from "../components/SocialLinks";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { ANIMATION_EASE as ease, APP_STORE_URL } from "../constants";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const fadeUpCard = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-3.391.728-3.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.148.581-1.515" />
  </svg>
);

const StarFilled = () => (
  <svg className="w-3.5 h-3.5 fill-lime-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ChatMockup = () => (
  <div className="max-w-[300px] mx-auto w-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
      className="bg-neutral-800 rounded-3xl p-4 shadow-2xl border border-white/5"
    >
      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-white/10">
        <img src="/logo/splash-icon.png" alt="alya" className="w-7 h-7 rounded-full object-cover" />
        <div>
          <p className="text-white text-xs font-semibold">alya</p>
          <p className="text-lime-400 text-[10px]">● online</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          { side: "left", text: <><p className="text-white text-xs">try: <span className="text-lime-400 font-semibold">estoy feliz hoy</span></p><p className="text-neutral-400 text-[10px] mt-1">es·TOY fe·LEES oy 🔊</p></> },
          { side: "right", text: <p className="text-neutral-900 text-xs font-medium">estoy feliz hoy! 😊</p> },
          { side: "left", text: <><p className="text-white text-xs">¡perfecto! 🎉 already speaking Spanish!</p><div className="mt-1.5 inline-flex items-center gap-1 bg-lime-400/15 rounded-lg px-2 py-1"><span className="text-lime-400 text-[9px] font-semibold">★ new word: feliz = happy</span></div></> },
          { side: "right", text: <p className="text-neutral-900 text-xs font-medium">how do you say "I have a dog?"</p> },
          { side: "left", text: <><p className="text-white text-xs"><span className="text-lime-400 font-semibold">tengo un perro</span> 🐶</p><p className="text-neutral-400 text-[10px] mt-1">tener = "to have" — super useful!</p></> },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.side === "left" ? -10 : 10, y: 5 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4, ease }}
            className={`flex ${m.side === "right" ? "justify-end" : ""}`}
          >
            <div className={`${m.side === "left" ? "bg-neutral-700 rounded-tl-sm" : "bg-lime-400 rounded-tr-sm"} rounded-2xl px-3 py-2.5 max-w-[90%]`}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

const LevelMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease }}
    className="max-w-[300px] mx-auto w-full bg-white rounded-3xl p-5 shadow-xl border border-neutral-200"
  >
    <p className="text-neutral-900 font-semibold text-sm mb-0.5">what's your Spanish level?</p>
    <p className="text-neutral-400 text-[11px] mb-4">alya adapts to where you are right now</p>
    <div className="space-y-2">
      {[
        { level: "beginner", desc: "learning basic words & phrases from scratch", active: true },
        { level: "intermediate", desc: "you know some words; alya mixes languages", active: false },
        { level: "advanced", desc: "challenge yourself; alya speaks mostly Spanish", active: false },
      ].map((item, i) => (
        <motion.div
          key={item.level}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease }}
          className={`rounded-xl px-3.5 py-3 border-2 transition-all cursor-default hover:border-lime-300 ${item.active ? "border-lime-400 bg-lime-50" : "border-neutral-100 bg-neutral-50"}`}
        >
          <p className={`font-semibold text-xs capitalize ${item.active ? "text-lime-700" : "text-neutral-600"}`}>{item.level}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="mt-4 bg-neutral-900 rounded-xl py-2.5 text-center"
    >
      <span className="text-white text-xs font-semibold">start learning →</span>
    </motion.div>
  </motion.div>
);

const CorrectionsMockup = () => (
  <div className="max-w-[300px] mx-auto w-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
      className="bg-neutral-800 rounded-3xl p-4 shadow-xl border border-white/5"
    >
      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-white/10">
        <img src="/logo/splash-icon.png" alt="alya" className="w-7 h-7 rounded-full object-cover" />
        <div>
          <p className="text-white text-xs font-semibold">alya</p>
          <p className="text-lime-400 text-[10px]">● online</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          { side: "right", text: <p className="text-neutral-900 text-xs font-medium">me llamo Alya did i say right?</p> },
          { side: "left", text: <><p className="text-white text-xs"><span className="text-lime-400 font-semibold">¡Me llamo Alya!</span> — perfect 🎉</p><p className="text-neutral-300 text-[10px] mt-1">already speaking Spanish!</p><div className="mt-1.5 bg-neutral-800 rounded-lg px-2 py-1 inline-flex items-center gap-1"><span className="text-neutral-400 text-[10px]">🔊 tap for pronunciation</span></div></> },
          { side: "right", text: <p className="text-neutral-900 text-xs font-medium">how do i ask for water?</p> },
          { side: "left", text: <><p className="text-white text-xs">say: <span className="text-lime-400 font-semibold">quiero agua, por favor</span></p><p className="text-neutral-400 text-[10px] mt-1">means "I'd like water, please" 💧</p></> },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.side === "left" ? -10 : 10, y: 5 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4, ease }}
            className={`flex ${m.side === "right" ? "justify-end" : ""}`}
          >
            <div className={`${m.side === "left" ? "bg-neutral-700 rounded-tl-sm" : "bg-lime-400 rounded-tr-sm"} rounded-2xl px-3 py-2.5 max-w-[90%]`}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

const VocabMockup = () => (
  <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
    <div className="flex items-center justify-between mb-4">
      <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest">My Words</p>
      <span className="bg-lime-400/20 text-lime-400 text-[9px] font-bold px-2 py-0.5 rounded-full">5 due for review</span>
    </div>
    <div className="flex gap-5 mb-4 pb-4 border-b border-neutral-800">
      {[{ n: "47", label: "total", accent: false }, { n: "5", label: "due", accent: true }, { n: "12", label: "mastered", accent: false }].map(s => (
        <div key={s.label}>
          <p className={`text-xl font-bold leading-none ${s.accent ? "text-lime-400" : "text-white"}`}>{s.n}</p>
          <p className="text-neutral-500 text-[9px] uppercase tracking-wider mt-1">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="space-y-0">
      {[
        { word: "mariposa", def: "butterfly", status: "mastered" },
        { word: "aprovechar", def: "to make the most of", status: "due now" },
        { word: "añorar", def: "to miss deeply", status: "due now" },
        { word: "cotidiano", def: "everyday, daily", status: "due now" },
      ].map(w => (
        <div key={w.word} className="flex items-center justify-between py-2.5 border-b border-neutral-800 last:border-0">
          <div>
            <p className="text-white text-xs font-medium">{w.word}</p>
            <p className="text-neutral-500 text-[10px]">{w.def}</p>
          </div>
          <span className={`text-[9px] font-semibold ${w.status === "due now" ? "text-lime-400" : "text-neutral-600"}`}>{w.status}</span>
        </div>
      ))}
    </div>
  </div>
);

const GrammarMockup = () => (
  <div className="bg-white rounded-2xl p-5 border border-neutral-200">
    <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Grammar Card ❤️</div>
    <h3 className="text-neutral-900 font-bold text-base mb-1 leading-tight">ser vs. estar</h3>
    <p className="text-neutral-400 text-xs mb-4 leading-relaxed">both mean "to be" — but they're not the same.</p>
    <div className="space-y-2 mb-4">
      <div className="bg-lime-50 rounded-xl p-3 border border-lime-100">
        <p className="text-lime-700 text-[9px] font-bold uppercase tracking-wide mb-1">ser — identity, origin</p>
        <p className="text-neutral-500 text-xs italic">Soy estudiante. (I am a student.)</p>
      </div>
      <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
        <p className="text-neutral-500 text-[9px] font-bold uppercase tracking-wide mb-1">estar — states, location</p>
        <p className="text-neutral-500 text-xs italic">Estoy cansado. (I am tired.)</p>
      </div>
    </div>
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-neutral-900 hover:bg-lime-500 transition-colors rounded-xl py-2.5 text-center cursor-pointer"
    >
      <span className="text-white text-xs font-semibold">practice with alya →</span>
    </a>
  </div>
);

const steps = [
  { n: "1", title: "pick a level", body: "beginner, intermediate, or advanced — or take the quick proficiency test." },
  { n: "2", title: "say hi", body: "alya opens a real conversation in your own language." },
  { n: "3", title: "get corrected", body: "grammar and vocab feedback woven naturally into every reply." },
  { n: "4", title: "fluency grows", body: "daily micro-conversations build real confidence faster than any drill." },
];

const languagesRow1 = [
  { flag: "🇺🇸", name: "English" },
  { flag: "🇮🇳", name: "हिंदी" },
  { flag: "🇯🇵", name: "日本語" },
  { flag: "🇧🇷", name: "Português" },
  { flag: "🇫🇷", name: "Français" },
  { flag: "🇸🇦", name: "العربية" },
  { flag: "🇷🇺", name: "Русский" },
  { flag: "🇨🇳", name: "中文" },
  { flag: "🇲🇽", name: "Español" },
  { flag: "🇮🇩", name: "Bahasa" },
  { flag: "🇳🇱", name: "Nederlands" },
  { flag: "🇸🇪", name: "Svenska" },
];

const languagesRow2 = [
  { flag: "🇧🇩", name: "বাংলা" },
  { flag: "🇹🇷", name: "Türkçe" },
  { flag: "🇮🇹", name: "Italiano" },
  { flag: "🇰🇷", name: "한국어" },
  { flag: "🇩🇪", name: "Deutsch" },
  { flag: "🇻🇳", name: "Tiếng Việt" },
  { flag: "🇵🇱", name: "Polski" },
  { flag: "🇹🇭", name: "ภาษาไทย" },
  { flag: "🇮🇷", name: "فارسی" },
  { flag: "🇺🇦", name: "Українська" },
  { flag: "🇬🇷", name: "Ελληνικά" },
  { flag: "🇫🇮", name: "Suomi" },
];

const testimonials = [
  {
    quote: "I tried Duolingo for two years and hit a wall. Two months with alya and I'm actually texting my Mexican coworkers in Spanish.",
    name: "Priya S.",
    handle: "@priyalearns",
  },
  {
    quote: "I use alya in Japanese — it explains everything in Japanese and I'm learning Spanish at the same time. Wild that this exists.",
    name: "Kenji T.",
    handle: "@kenjispanish",
  },
  {
    quote: "The corrections are so natural. I made the same ser/estar mistake four times and by the fifth time it just clicked. No judgment, just patience.",
    name: "Marcus L.",
    handle: "@marcusfluent",
  },
];

const faqs = [
  {
    question: "how is alya different from Duolingo?",
    answer: "Duolingo teaches you to study Spanish — vocabulary lists, hearts, streaks. Alya teaches you to speak it. Every session is a real conversation where alya corrects you in context, adapts to your level, and responds like a bilingual friend. No preset curriculum, no lives to lose.",
  },
  {
    question: "do I need to speak English to use alya?",
    answer: "Not at all. Alya detects the language you text in — Hindi, Japanese, French, Portuguese, and more — and responds in that same language while teaching you Spanish. Alya was built for learners worldwide, not just English speakers.",
  },
  {
    question: "how long before I can hold a real conversation?",
    answer: "Most learners can handle basic everyday conversations within 4–8 weeks of daily practice. The key is consistency over intensity — 10–15 minutes every day beats a 2-hour weekend session every time.",
  },
  {
    question: "is alya actually free?",
    answer: "Yes. Download alya and get 5 messages per day, forever — no credit card, no trial period. Upgrade to Plus ($4.99/mo) or Pro ($14.99/mo) anytime for more daily messages and deeper conversation memory.",
  },
  {
    question: "can I practice speaking, not just typing?",
    answer: "Yes. Send voice messages to alya and she'll transcribe, respond, and teach. Tap any Spanish word in alya's replies to hear native-accent pronunciation. Voice in, voice out.",
  },
  {
    question: "what Spanish does alya teach?",
    answer: "Latin American Spanish — the variety spoken in Mexico, Colombia, Argentina, and across the continent. Modern, natural, and understood everywhere. Alya deliberately avoids Spain-specific slang.",
  },
];

export const Home = () => {
  return (
    <div className="font-sans">

      <section className="relative h-screen overflow-hidden scroll-snap-start flex flex-col justify-end">
        <video
          className="absolute inset-0 w-full h-full object-cover object-top-left z-0 scale-[1.05]"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          poster="/logo/splash-icon.png"
          preload="auto"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-tr from-black/70 via-black/30 to-black/5 z-10 pointer-events-none" />

        <NavBar currentPath="/" dark />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease }}
          className="relative z-20 w-full flex flex-col justify-end px-6 sm:px-10 md:px-16 pb-14 md:pb-24"
        >
          <div className="flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-tight mb-4 max-w-2xl"
            >
              learn spanish the way you actually <span className="text-lime-400">talk.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="text-lg sm:text-xl font-medium text-white/85 mb-6"
            >
              not an app. a conversation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
            >
              <SocialLinks dark />
            </motion.div>
          </div>
        </motion.main>
      </section>

      <section className="bg-neutral-100 min-h-screen py-16 md:py-20 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight mb-3">
              how alya <span className="text-lime-600">works.</span>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg md:text-xl font-light">four steps. ten minutes a day.</p>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease }}
              style={{ originX: 0 }}
              className="hidden md:block absolute top-5 left-[6.5%] right-[6.5%] h-px bg-neutral-100"
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative flex flex-row md:flex-col items-start md:items-center gap-5 md:gap-0"
                >
                  {i < steps.length - 1 && (
                    <div className="md:hidden absolute left-5 top-10 h-8 w-px bg-neutral-100" />
                  )}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-neutral-900 text-white text-sm font-bold flex items-center justify-center shrink-0 md:mb-6 ring-4 ring-white">
                    {step.n}
                  </div>
                  <div className="md:text-center md:px-2">
                    <h3 className="text-neutral-900 font-semibold text-lg mb-1 leading-snug">{step.title}</h3>
                    <p className="text-neutral-500 text-base leading-relaxed font-light">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-lime-50/50 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight leading-[1.1] mb-5">
              real spanish.<br />
              <span className="text-lime-600">real situations.</span>
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 max-w-sm">
              alya chats like a bilingual friend — teaching vocabulary, correcting grammar, and explaining culture naturally, inside every single message.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <ChatMockup />
          </motion.div>
        </div>
      </section>

      <section className="bg-lime-50 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="order-2 md:order-1"
          >
            <LevelMockup />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight leading-[1.1] mb-5">
              your level.<br />
              <span className="text-lime-500">your pace.</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-sm">
              beginner, intermediate, or advanced — or take a quick proficiency test. alya adapts in real time, never too easy, never overwhelming.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-100 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight leading-[1.1] mb-5">
              mistakes welcome.<br />
              <span className="text-lime-500">corrections instant.</span>
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-sm">
              every mistake is a micro-lesson. alya corrects in context — not with a red X, but the way a patient bilingual friend would. no judgment. no lost lives.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <CorrectionsMockup />
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-100 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight leading-[1.1] mb-5">
              any language.<br />
              <span className="text-lime-500">alya speaks yours.</span>
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
              alya detects the language you text in and responds in it — teaching Spanish the whole time. the only Spanish tutor that's also fluent in yours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[...languagesRow1, ...languagesRow2].map((lang, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full glass text-neutral-600 text-sm font-medium"
              >
                {lang.flag} {lang.name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-lime-50 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight mb-3">
              built to make things <span className="text-lime-500">stick.</span>
            </h2>
            <p className="text-neutral-500 text-xl font-light">vocabulary you'll remember. grammar that finally makes sense.</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={fadeUpCard}
              className="bg-white rounded-3xl p-7 border border-neutral-200 shadow-sm"
            >
              <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-1">Vocabulary</p>
              <h3 className="text-neutral-900 font-semibold text-2xl mb-2">words that actually stick.</h3>
              <p className="text-neutral-500 text-base font-light leading-relaxed mb-6">
                tap any word in a conversation to save it. alya uses spaced repetition (SM-2) to show you each word at exactly the right moment — right before you'd forget it.
              </p>
              <VocabMockup />
            </motion.div>

            <motion.div
              variants={fadeUpCard}
              className="bg-white rounded-3xl p-7 border border-neutral-200 shadow-sm"
            >
              <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-1">Grammar</p>
              <h3 className="text-neutral-900 font-semibold text-2xl mb-2">grammar made human.</h3>
              <p className="text-neutral-500 text-base font-light leading-relaxed mb-6">
                browse grammar cards for every tricky rule — ser vs. estar, por vs. para, the subjunctive — each explained simply with a "practice with alya" button.
              </p>
              <GrammarMockup />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-100 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight">what learners <span className="text-lime-600">say.</span></h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-3 gap-5"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUpCard}
                whileHover={{ y: -5, borderColor: "rgba(163, 230, 53, 0.3)", transition: { duration: 0.2 } }}
                className="rounded-3xl p-7 glass-heavy flex flex-col shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <StarFilled key={j} />)}
                </div>
                <p className="text-neutral-600 text-base font-light leading-relaxed mb-5 flex-1">"{t.quote}"</p>
                <div>
                  <p className="text-neutral-900 text-sm font-semibold">{t.name}</p>
                  <p className="text-neutral-400 text-xs mt-0.5">{t.handle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-100 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-10 text-center"
          >
            questions &amp; <span className="text-lime-600">answers.</span>
          </motion.h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section className="bg-lime-50/50 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-xl mx-auto text-center w-full"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-900 tracking-tight leading-tight mb-4">
            start talking.<br />
            <span className="text-lime-400">today.</span>
          </h2>
          <p className="text-neutral-500 text-base sm:text-lg md:text-xl font-light mb-8">
            free to start. no credit card. 10 minutes a day.
          </p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 transition-colors text-white font-semibold px-8 py-4 rounded-full text-base shadow-lg"
          >
            <AppleIcon />
            download free on iOS
          </a>
          <p className="text-neutral-400 text-xs mt-4">5 messages/day · forever free · no credit card needed</p>
        </motion.div>
      </section>

      <div className="scroll-snap-start">
        <Footer />
      </div>
    </div>
  );
};
