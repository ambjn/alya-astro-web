import { motion } from "framer-motion";
import {
  Brain, MessageCircle, Repeat, Shield, Zap, BookOpen, Mic, Flame, ClipboardList, TrendingUp,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { ANIMATION_EASE as ease, APP_STORE_URL } from "../constants";

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-3.391.728-3.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.148.581-1.515" />
  </svg>
);

const coreFeatures = [
  {
    icon: <MessageCircle size={26} />,
    title: "conversation-first",
    body: "every message is a real exchange. no drills, no flashcards, just finding your flow in Spanish.",
  },
  {
    icon: <BookOpen size={26} />,
    title: "vocabulary & grammar",
    body: "save words from chat, review with spaced repetition (SM-2), and browse grammar cards built for Spanish.",
  },
];

const features = [
  { icon: <Zap size={18} />, title: "instant corrections", body: "mistakes corrected in context, naturally." },
  { icon: <Brain size={18} />, title: "adaptive levels", body: "alya adjusts to your proficiency in real time." },
  { icon: <Mic size={18} />, title: "voice notes", body: "talk, get transcribed, hear native pronunciation back." },
  { icon: <Repeat size={18} />, title: "scenario roleplay", body: "8 real-world scenes, café, airport, doctor, market." },
  { icon: <Flame size={18} />, title: "daily streaks", body: "gentle nudges to stay consistent." },
  { icon: <ClipboardList size={18} />, title: "proficiency test", body: "start at exactly the right level." },
  { icon: <TrendingUp size={18} />, title: "progress tracking", body: "streak, words saved, messages sent, all in one view." },
  { icon: <Shield size={18} />, title: "private & secure", body: "no ads. delete your data anytime." },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const steps = [
  { n: "1", title: "pick a level", body: "beginner, intermediate, or advanced. or take the quick proficiency test." },
  { n: "2", title: "say hi", body: "alya opens a real conversation in your own language." },
  { n: "3", title: "get corrected", body: "grammar and vocab feedback woven naturally into every reply." },
  { n: "4", title: "fluency grows", body: "daily micro-conversations build real confidence faster than any drill." },
];

const Features = ({ currentPath }: { currentPath?: string }) => (
  <div className="font-sans bg-lime-50">
    <NavBar currentPath={currentPath} />

    <main className="max-w-5xl mx-auto px-6 sm:px-8">

      {/* Hero */}
      <section className="pt-36 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-5 max-w-2xl">
            everything alya<br />
            <span className="text-lime-500">can do.</span>
          </h1>
          <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-lg">
            one conversation, built from ten features. no extra tabs. no mode switching. just texting.
          </p>
        </motion.div>
      </section>

      {/* Core 2 features */}
      <section className="pb-4">
        <div className="grid md:grid-cols-2 gap-4">
          {coreFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="p-8 rounded-3xl bg-lime-50 border border-lime-200 hover:border-lime-300 hover:shadow-sm transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-2xl bg-lime-100 text-lime-600 mb-5">
                {f.icon}
              </div>
              <h3 className="text-neutral-900 font-semibold text-xl mb-2 tracking-tight">{f.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed font-light">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All 8 features grid */}
      <section className="py-4 pb-20">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px flex-1 bg-neutral-100" />
          <div className="h-px flex-1 bg-neutral-100" />
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-5 rounded-2xl border border-neutral-100 bg-neutral-50 hover:border-neutral-200 hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col gap-3"
            >
              <div className="inline-flex self-start p-2.5 rounded-xl bg-white border border-neutral-100 text-neutral-500">
                {f.icon}
              </div>
              <div>
                <h3 className="text-neutral-900 font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </main>

    {/* How alya works */}
    <section className="bg-neutral-100 py-20 px-6 sm:px-10 md:px-16">
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
            className="hidden md:block absolute top-5 left-[6.5%] right-[6.5%] h-px bg-neutral-300"
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
                  <div className="md:hidden absolute left-5 top-10 h-8 w-px bg-neutral-300" />
                )}
                <div className="relative z-10 w-10 h-10 rounded-full bg-neutral-900 text-white text-sm font-bold flex items-center justify-center shrink-0 md:mb-6 ring-4 ring-neutral-100">
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

    {/* CTA */}
    <section className="bg-lime-50 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="max-w-md mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight mb-3">
          ready to start<br />
          <span className="text-lime-500">talking?</span>
        </h2>
        <p className="text-neutral-500 text-base font-light mb-8">free to start. no credit card. 10 minutes a day.</p>
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

    <Footer />
  </div>
);

export default Features;
