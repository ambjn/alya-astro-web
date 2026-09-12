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
            <span
              aria-hidden="true"
              className="text-lime-300/50 text-[64px] sm:text-[96px] md:text-[120px] font-bold tracking-tight select-none absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/4 pointer-events-none leading-none z-0 whitespace-nowrap overflow-hidden max-w-full mask-[radial-gradient(ellipse_75%_85%_at_50%_50%,black_40%,transparent_78%)]"
            >
              {nativeName}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-lime-600 relative z-10 leading-[1.05] text-balance max-w-3xl mx-auto pt-10 sm:pt-14 md:pt-16">
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
            <p className="text-neutral-400 text-xs">free to download · Plus with 7-day trial when eligible · iOS only</p>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ANIMATION_EASE }}
          className="mb-24 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 rounded-3xl border border-neutral-200 bg-white overflow-hidden"
        >
          {[
            { value: speakers, label: "native speakers" },
            { value: difficulty, label: "difficulty" },
            { value: timeToConversation, label: "to understanding" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`px-6 py-8 text-center ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-neutral-100" : ""}`}
            >
              <p className="text-neutral-900 text-3xl sm:text-4xl font-semibold tracking-tight mb-1.5">{stat.value}</p>
              <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <section className="mb-24 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: ANIMATION_EASE }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4 leading-tight">
              real videos. instant understanding.
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed mb-10 font-light max-w-xl mx-auto">
              forget drills and grammar tables. alya teaches you{" "}
              {languageName.toLowerCase()} the way you actually encounter it: real people, real situations, with translation built in.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 text-left">
              {[
                { title: "scroll the feed", desc: "short native clips matched to your level", icon: <Play size={18} /> },
                { title: "tap to translate", desc: "transcript, glosses, native audio on demand", icon: <MousePointerClick size={18} /> },
                { title: "grow your companion", desc: "stars, energy, bond, curiosity, streaks", icon: <PawPrint size={18} /> },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-neutral-200 bg-white">
                  <div className="p-2.5 rounded-xl w-fit bg-lime-50 text-lime-600 border border-lime-100 shrink-0 mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-neutral-900 font-semibold text-base">{item.title}</h3>
                  <p className="text-neutral-500 text-sm font-light">{item.desc}</p>
                </div>
              ))}
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

        {faqs.length > 0 && (
          <section className="mb-24 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-8 text-center">
              frequently asked <span className="text-lime-500">questions.</span>
            </h2>
            <FAQAccordion faqs={faqs} />
          </section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ANIMATION_EASE }}
          className="max-w-md mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight mb-3">
            start understanding
            <br />
            <span className="text-lime-500">real spanish.</span>
          </h2>
          <p className="text-neutral-500 text-base font-light mb-8 max-w-sm mx-auto">
            free to download. 7-day free trial when eligible, then Plus. iOS only.
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
        </motion.section>

      </main>

      <Footer />
    </div>
  );
};
