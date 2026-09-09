import { motion } from "framer-motion";
import { Play, MousePointerClick, PawPrint } from "lucide-react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { FAQAccordion } from "./FAQAccordion";
import type { FAQItem } from "./FAQAccordion";
import { AppleIcon } from "./DownloadButton";
import { ANIMATION_EASE, APP_STORE_URL } from "../constants";

interface LanguagePageProps {
  nativeName: string;
  languageName: string;
  tagline: string;
  heroSubtitle: string;
  speakers: string;
  difficulty: string;
  timeToConversation: string;
  levels: { name: string; description: string; example: string }[];
  faqs: FAQItem[];
  currentPath?: string;
}

export const LanguagePage = ({
  nativeName,
  languageName,
  tagline,
  heroSubtitle,
  speakers,
  difficulty,
  timeToConversation,
  levels,
  faqs,
  currentPath,
}: LanguagePageProps) => {
  return (
    <div className="min-h-screen font-sans bg-lime-50">
      <NavBar currentPath={currentPath} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-32 pt-28">
        <section className="pb-20 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: ANIMATION_EASE }}
            className="mb-6 relative"
          >
            <span className="text-lime-100 text-[80px] sm:text-[120px] md:text-[180px] font-bold select-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none leading-none z-0 whitespace-nowrap overflow-hidden max-w-full">
              {nativeName}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-lime-600 relative z-10 leading-tight">
              {tagline}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: ANIMATION_EASE }}
            className="text-neutral-500 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light mb-10"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: ANIMATION_EASE }}
            className="flex flex-col items-center gap-3"
          >
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 transition-colors text-white font-semibold px-8 py-4 rounded-full text-base shadow-lg"
            >
              <AppleIcon size={14} />
              download free on iOS
            </a>
            <p className="text-neutral-400 text-xs">free daily feed · Plus with 7-day trial · no credit card needed</p>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: ANIMATION_EASE }}
          className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: "native speakers", value: speakers },
            { label: "difficulty level", value: difficulty },
            { label: "to basic understanding", value: timeToConversation },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: ANIMATION_EASE }}
              className="flex flex-col items-center justify-center p-8 rounded-2xl border border-neutral-200 bg-white hover:shadow-sm transition-all"
            >
              <div className="text-neutral-900 text-2xl font-semibold mb-1">{stat.value}</div>
              <div className="text-neutral-500 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.section>

        <section className="mb-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: ANIMATION_EASE }}
          >
            <span className="inline-block mb-3 text-xs font-bold tracking-widest uppercase text-lime-600">
              how it works
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-5 leading-tight">
              real videos.<br />
              instant understanding.
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed mb-8 font-light">
              forget drills and grammar tables. alya teaches you{" "}
              {languageName.toLowerCase()} the way you actually encounter it: real people, real situations, with translation built in.
            </p>

            <div className="space-y-5">
              {[
                { title: "scroll the feed", desc: "short native clips matched to your level", icon: <Play size={18} /> },
                { title: "tap to translate", desc: "transcript, glosses, native audio on demand", icon: <MousePointerClick size={18} /> },
                { title: "grow your companion", desc: "stars, streaks, rooms, and rewards", icon: <PawPrint size={18} /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="p-2.5 rounded-xl h-fit bg-lime-50 text-lime-600 border border-lime-100 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-neutral-900 font-semibold text-base">{item.title}</h3>
                    <p className="text-neutral-500 text-sm font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: ANIMATION_EASE }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="relative bg-neutral-800 aspect-[9/11] p-4 flex flex-col justify-end">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/30" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2 py-1 rounded-full bg-black/50 text-white text-[9px] font-semibold">Mercado</span>
                  <span className="px-2 py-1 rounded-full bg-lime-400 text-neutral-900 text-[9px] font-bold">Beginner</span>
                </div>
                <div className="relative">
                  <p className="text-white text-sm font-medium mb-1">¿Cuánto cuesta?</p>
                  <p className="text-white/70 text-xs mb-2">How much does it cost?</p>
                  <div className="bg-white/10 rounded-xl p-2.5 mb-2">
                    <p className="text-lime-300 text-[11px] font-semibold">cuesta → costs (from costar)</p>
                    <p className="text-white/60 text-[10px]">tap any word for its gloss 🔊</p>
                  </div>
                  <p className="text-lime-400 text-[11px] font-semibold">★ +5 · saved “cuánto” to vocabulary</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: ANIMATION_EASE }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-3">
              every level, <span className="text-lime-500">covered.</span>
            </h2>
            <p className="text-neutral-500 text-lg font-light max-w-xl mx-auto">
              whether you&apos;re starting from zero or polishing fluency, the feed adapts to you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {levels.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: ANIMATION_EASE }}
                className="p-7 rounded-2xl border border-neutral-200 bg-white hover:shadow-sm hover:border-neutral-300 transition-all"
              >
                <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5 border border-lime-200 text-lime-600 bg-lime-50">
                  {level.name}
                </div>
                <p className="text-neutral-500 text-base leading-relaxed mb-6 font-light min-h-16">
                  {level.description}
                </p>
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1.5 font-semibold">you'll hear</p>
                  <p className="text-neutral-700 text-sm italic">&ldquo;{level.example}&rdquo;</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: ANIMATION_EASE }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">questions.</h2>
          </motion.div>
          <FAQAccordion faqs={faqs} />
        </section>

      </main>

      <Footer />
    </div>
  );
};
