import { motion } from "framer-motion";
import { MessageCircle, Zap, Globe, Brain } from "lucide-react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { FAQAccordion } from "./FAQAccordion";
import type { FAQItem } from "./FAQAccordion";
import { ANIMATION_EASE } from "../constants";

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

function ChatBubble({
  msg,
  index,
}: {
  msg: ConversationMessage;
  index: number;
}) {
  const isAlya = msg.role === "alya";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, x: isAlya ? -6 : 6 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12, ease: ANIMATION_EASE }}
      className={`flex ${isAlya ? "justify-start" : "justify-end"} mb-3`}
    >
      {isAlya && (
        <img
          src="/logo/splash-icon.png"
          alt="alya"
          className="w-8 h-8 rounded-full object-cover mr-2.5 mt-0.5 flex-shrink-0"
        />
      )}
      <div
        className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isAlya
            ? "bg-white border border-neutral-200 text-neutral-700 rounded-bl-sm"
            : "bg-neutral-900 text-white rounded-br-sm font-medium"
        }`}
      >
        {msg.text}
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
            <span className="text-neutral-100 text-[80px] sm:text-[120px] md:text-[180px] font-bold select-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none leading-none z-0 whitespace-nowrap overflow-hidden max-w-full">
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
            className="text-neutral-600 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light mb-8"
          >
            {heroSubtitle}
          </motion.p>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: ANIMATION_EASE }}
          className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: "Native Speakers", value: speakers, icon: <Globe size={20} /> },
            { label: "Difficulty Level", value: difficulty, icon: <Brain size={20} /> },
            { label: "To Basic Fluency", value: timeToConversation, icon: <MessageCircle size={20} /> },
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
              <div className="text-neutral-900 text-2xl font-semibold mb-1">
                {stat.value}
              </div>
              <div className="text-neutral-600 text-xs font-medium uppercase tracking-wider">
                {stat.label}
              </div>
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
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-5 leading-tight">
              Real conversation.
              <br />
              Real learning.
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-8 font-light">
              Forget flashcards and grammar tables. Alya teaches you{" "}
              {languageName} the way you learned your first language: by
              actually using it.
            </p>

            <div className="space-y-5">
              {[
                { title: "Conversation First", desc: "Learn by doing in natural chats", icon: <MessageCircle size={18} /> },
                { title: "Contextual Corrections", desc: "Gentle fixes woven into replies", icon: <Zap size={18} /> },
                { title: "Cultural Context", desc: "Learn slang and real usage", icon: <Globe size={18} /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="p-2.5 rounded-xl h-fit bg-lime-50 text-lime-600 border border-lime-100">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-neutral-900 font-semibold text-base">{item.title}</h3>
                    <p className="text-neutral-600 text-sm font-light">{item.desc}</p>
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
            <div className="bg-neutral-50 rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-neutral-100">
                <div className="relative">
                  <img
                    src="/logo/splash-icon.png"
                    alt="alya"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-lime-400 border-2 border-white" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 text-sm">
                    Alya ({languageName})
                  </div>
                  <div className="text-lime-500 text-xs font-medium">online</div>
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
              Every level, covered
            </h2>
            <p className="text-neutral-600 text-lg font-light max-w-xl mx-auto">
              Whether you&apos;re starting from zero or polishing your fluency,
              Alya adapts to you.
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
                <p className="text-neutral-600 text-base leading-relaxed mb-6 font-light min-h-[4rem]">
                  {level.description}
                </p>
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  <p className="text-neutral-600 text-xs uppercase tracking-wider mb-1.5 font-semibold">
                    Example
                  </p>
                  <p className="text-neutral-700 text-sm italic">
                    &ldquo;{level.example}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: ANIMATION_EASE }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
              Questions?
            </h2>
          </motion.div>
          <FAQAccordion faqs={faqs} />
        </section>
      </main>

      <Footer />
    </div>
  );
};
