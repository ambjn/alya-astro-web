import { motion } from "framer-motion";
import { MessageCircle, Zap, Globe, Brain } from "lucide-react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { FAQAccordion } from "./FAQAccordion";
import type { FAQItem } from "./FAQAccordion";
import { AppleIcon } from "./DownloadButton";
import { ANIMATION_EASE, APP_STORE_URL } from "../constants";

export interface ConversationMessage {
  role: "user" | "alya";
  text: string;
}

export interface LanguagePageProps {
  nativeName: string;
  languageName: string;
  tagline: string;
  heroSubtitle: string;
  speakers: string;
  difficulty: string;
  timeToConversation: string;
  conversation: ConversationMessage[];
  levels: { name: string; description: string; example: string }[];
  faqs: FAQItem[];
  currentPath?: string;
}

function renderBubbleText(text: string, isAlya: boolean) {
  const parts = text.split(/(\*[^*]+\*|`[^`]+`|\n\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <strong key={i} className={`font-semibold ${isAlya ? "text-lime-400" : "font-semibold"}`}>
          {part.slice(1, -1)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <span key={i} className="text-neutral-400 text-[0.82em] font-medium tracking-tight">
          {part.slice(1, -1)}
        </span>
      );
    }
    if (part === "\n\n") {
      return <div key={i} className="h-1.5" />;
    }
    return <span key={i}>{part}</span>;
  });
}

function ChatBubble({ msg, index }: { msg: ConversationMessage; index: number }) {
  const isAlya = msg.role === "alya";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: isAlya ? -6 : 6 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12, ease: ANIMATION_EASE }}
      className={`flex ${isAlya ? "justify-start" : "justify-end"} mb-2.5`}
    >
      {isAlya && (
        <img
          src="/logo/splash-icon.png"
          alt="alya"
          className="w-7 h-7 rounded-full object-cover mr-2 mt-0.5 shrink-0"
        />
      )}
      <div
        className={`max-w-[84%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
          isAlya
            ? "bg-neutral-700 text-white rounded-tl-sm"
            : "bg-lime-400 text-neutral-900 rounded-tr-sm font-medium"
        }`}
      >
        {renderBubbleText(msg.text, isAlya)}
      </div>
    </motion.div>
  );
}

export const LanguagePage = ({
  nativeName,
  languageName,
  tagline,
  heroSubtitle,
  speakers,
  difficulty,
  timeToConversation,
  conversation,
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
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 relative z-10 leading-tight">
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
            <p className="text-neutral-400 text-xs">5 messages/day · forever free · no credit card needed</p>
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
            { label: "native speakers", value: speakers, icon: <Globe size={20} /> },
            { label: "difficulty level", value: difficulty, icon: <Brain size={20} /> },
            { label: "to basic fluency", value: timeToConversation, icon: <MessageCircle size={20} /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: ANIMATION_EASE }}
              className="flex flex-col items-center justify-center p-8 rounded-2xl border border-neutral-200 bg-white hover:shadow-sm transition-all"
            >
              <div className="mb-3 p-3 rounded-xl bg-lime-50 text-lime-600 border border-lime-100">
                {stat.icon}
              </div>
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
              real conversation.<br />
              real learning.
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed mb-8 font-light">
              forget flashcards and grammar tables. alya teaches you{" "}
              {languageName.toLowerCase()} the way you learned your first language: by
              actually using it.
            </p>

            <div className="space-y-5">
              {[
                { title: "conversation first", desc: "learn by doing in natural chats", icon: <MessageCircle size={18} /> },
                { title: "contextual corrections", desc: "gentle fixes woven into replies", icon: <Zap size={18} /> },
                { title: "cultural context", desc: "learn slang and real usage", icon: <Globe size={18} /> },
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
            <div className="bg-neutral-800 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-white/10">
                <div className="relative">
                  <img src="/logo/splash-icon.png" alt="alya" className="w-8 h-8 rounded-full object-cover" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-lime-400 border-2 border-neutral-800" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">alya</div>
                  <div className="text-lime-400 text-xs">● online</div>
                </div>
              </div>
              <div className="p-4 space-y-1">
                {conversation.map((msg, i) => (
                  <ChatBubble key={i} msg={msg} index={i} />
                ))}
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
              whether you&apos;re starting from zero or polishing your fluency, alya adapts to you.
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
                  <p className="text-neutral-400 text-xs uppercase tracking-wider mb-1.5 font-semibold">example</p>
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

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ANIMATION_EASE }}
          className="rounded-3xl bg-neutral-900 p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-lime-400/10 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-lime-400 font-bold text-xs uppercase tracking-widest mb-4">start today</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-4">
              ready to speak<br />
              <span className="text-lime-400">{languageName.toLowerCase()}?</span>
            </h2>
            <p className="text-neutral-400 text-base font-light mb-8 max-w-sm mx-auto">
              5 free messages every day. no credit card required.
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-lime-400 hover:bg-lime-300 transition-colors text-neutral-900 font-semibold px-8 py-4 rounded-full text-base shadow-lg shadow-lime-400/20"
            >
              <AppleIcon size={14} />
              download free on iOS
            </a>
            <p className="text-neutral-600 text-xs mt-4">5 messages/day · forever free · no credit card needed</p>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};
