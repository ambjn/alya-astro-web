import { motion } from "framer-motion";
import {
  Brain,
  MessageCircle,
  Repeat,
  Shield,
  Zap,
  BookOpen,
  Mic,
  Flame,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { ANIMATION_EASE as ease } from "../constants";

const coreFeatures = [
  {
    icon: <MessageCircle size={28} />,
    title: "Conversation-First",
    body: "Every message is a real exchange. No drills, no flashcards — just finding your flow in Spanish.",
    accent: "lime",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Vocabulary & Grammar",
    body: "Save words from chat, review with spaced repetition (SM-2), and browse grammar cards built for Spanish.",
    accent: "purple",
  },
];

const features = [
  { icon: <Zap size={20} />, title: "Instant Corrections", body: "Mistakes corrected in context, naturally.", accent: "amber" },
  { icon: <Brain size={20} />, title: "Adaptive Levels", body: "Alya adjusts to your proficiency in real time.", accent: "blue" },
  { icon: <Mic size={20} />, title: "Voice Notes", body: "Talk, get transcribed, hear native pronunciation back.", accent: "rose" },
  { icon: <Repeat size={20} />, title: "Scenario Roleplay", body: "8 real-world scenes — café, airport, doctor, market.", accent: "cyan" },
  { icon: <Flame size={20} />, title: "Daily Streaks", body: "Gentle nudges to stay consistent.", accent: "orange" },
  { icon: <ClipboardList size={20} />, title: "Proficiency Test", body: "Start at exactly the right level.", accent: "sky" },
  { icon: <TrendingUp size={20} />, title: "Progress Tracking", body: "Streak, words saved, messages sent — all in one view.", accent: "emerald" },
  { icon: <Shield size={20} />, title: "Private & Secure", body: "No ads. Delete your data anytime.", accent: "slate" },
];

const steps = [
  { n: "1", title: "Pick a level", body: "Beginner, intermediate, or advanced — or take a quick proficiency test." },
  { n: "2", title: "Say hi", body: "Alya opens a natural conversation in your native language." },
  { n: "3", title: "Get corrected", body: "Grammar and vocab feedback woven naturally into every reply." },
  { n: "4", title: "Fluency grows", body: "Daily micro-conversations build real confidence faster than any drill." },
];

const accentClasses: Record<string, string> = {
  lime: "bg-lime-50 text-lime-600 border-lime-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  rose: "bg-rose-50 text-rose-600 border-rose-100",
  cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
  sky: "bg-sky-50 text-sky-600 border-sky-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  slate: "bg-slate-50 text-slate-600 border-slate-100",
};

const Features = ({ currentPath }: { currentPath?: string }) => (
  <div className="min-h-screen font-sans bg-lime-50">
    <NavBar currentPath={currentPath} />

    <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-32 pt-24">
      <section className="pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-6">
            everything alya<br />
            <span className="text-lime-500">can do.</span>
          </h1>
          <p className="text-neutral-600 text-lg font-light leading-relaxed max-w-lg">
            one conversation, built from ten features. no extra tabs. no mode switching. just texting.
          </p>
        </motion.div>
      </section>

      <section className="mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          {coreFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="p-8 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl border mb-6 ${accentClasses[f.accent]}`}>
                {f.icon}
              </div>
              <h3 className="text-neutral-900 font-semibold text-xl mb-2 tracking-tight">{f.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed font-light">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease }}
              className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-300 flex flex-col gap-3"
            >
              <div className={`inline-flex self-start p-2 rounded-lg border ${accentClasses[f.accent]}`}>
                {f.icon}
              </div>
              <div>
                <h3 className="text-neutral-900 font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed font-light">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-3">
            how it works
          </h2>
          <p className="text-neutral-600 text-xl font-light">four steps to fluency.</p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-neutral-200" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease }}
                className="relative flex flex-row md:flex-col items-start md:items-center gap-5 md:gap-0"
              >
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute left-6 top-12 h-10 w-px bg-neutral-200" />
                )}
                <div className="relative z-10 w-12 h-12 rounded-full bg-neutral-900 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 md:mb-6 ring-4 ring-lime-50">
                  {item.n}
                </div>
                <div className="md:text-center md:px-3">
                  <h3 className="text-neutral-900 font-semibold text-lg mb-2 leading-snug">{item.title}</h3>
                  <p className="text-neutral-600 text-base leading-relaxed font-light">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default Features;
