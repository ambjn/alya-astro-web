import { motion } from "framer-motion";
import {
  Play, MousePointerClick, Volume2, Bookmark, PawPrint, Layers, Compass, Flame,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { AppleIcon } from "../components/DownloadButton";
import { staggerVariants, fadeUpVariants } from "../lib/motion";
import { ANIMATION_EASE as ease, APP_STORE_URL } from "../constants";

const coreFeatures = [
  {
    icon: <Play size={26} />,
    title: "immersion feed",
    body: "a vertical feed of short native Spanish videos. 20 clips on open, more before you run out, with 14-day cooldown so you never rewatch too soon.",
  },
  {
    icon: <MousePointerClick size={26} />,
    title: "tap-to-understand",
    body: "synchronized transcript + English translation + per-word glosses. tap any phrase for instant explanation in context. 0.75x–1.5x playback, 10s skip.",
  },
];

const features = [
  { icon: <Bookmark size={18} />, color: "text-amber-500 bg-amber-50 border-amber-100", title: "My Words + spaced review", body: "tap any word to save it. ALYA schedules a spaced review with video context." },
  { icon: <Volume2 size={18} />, color: "text-blue-500 bg-blue-50 border-blue-100", title: "native audio", body: "tap-to-hear pronunciation, slowed down on demand." },
  { icon: <PawPrint size={18} />, color: "text-violet-500 bg-violet-50 border-violet-100", title: "evolving companion", body: "clips + saved words earn stars. stars grow energy, bond, curiosity." },
  { icon: <Layers size={18} />, color: "text-indigo-500 bg-indigo-50 border-indigo-100", title: "3 levels", body: "beginner, intermediate, advanced. the feed meets your level." },
  { icon: <Compass size={18} />, color: "text-teal-500 bg-teal-50 border-teal-100", title: "20 topics + Explore", body: "Culture to Gaming. filter by level, grammar, source, Shorts vs Videos." },
  { icon: <Flame size={18} />, color: "text-orange-500 bg-orange-50 border-orange-100", title: "streaks + achievements", body: "daily goals and milestones that keep you consistent." },
];

const steps = [
  { n: "1", title: "pick your goal", body: "travel, movies & shows, work, fun, friends & family, culture, plus your level." },
  { n: "2", title: "get your plan", body: "minutes/day, streak goal, level + focus. 5–30 minutes a day beats marathons." },
  { n: "3", title: "scroll + tap", body: "watch clips, tap phrases, save words, answer prompts, earn stars." },
  { n: "4", title: "grow ALYA", body: "energy, bond + curiosity grow. streaks + achievements unlock." },
];

const Features = ({ currentPath }: { currentPath?: string }) => (
  <div className="font-sans bg-lime-50">
    <NavBar currentPath={currentPath} />

    <main className="max-w-5xl mx-auto px-6 sm:px-8">

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
            one feed, built for understanding. no prompting. no drills. just scroll.
          </p>
        </motion.div>
      </section>

      <section className="pb-4">
        <div className="grid md:grid-cols-2 gap-4">
          {coreFeatures.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="p-8 rounded-3xl bg-lime-50 border border-lime-400 hover:border-lime-500 hover:shadow-sm transition-all duration-300"
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

      <section className="py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-3">
            how alya <span className="text-lime-600">works.</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg font-light">four steps. 5–30 minutes a day.</p>
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
            variants={staggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
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
      </section>

      <section className="py-4 pb-8">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px flex-1 bg-neutral-100" />
          <div className="h-px flex-1 bg-neutral-100" />
        </div>
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariants}
              className="p-5 rounded-2xl border border-neutral-100 bg-neutral-50 hover:border-neutral-200 hover:bg-white hover:shadow-sm transition-all duration-300 flex flex-col gap-3"
            >
              <div className={`inline-flex self-start p-2.5 rounded-xl border ${f.color}`}>
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

    <section className="bg-lime-50 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="max-w-md mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight leading-tight mb-3">
          try the feed<br />
          <span className="text-lime-500">with a free trial.</span>
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
      </motion.div>
    </section>

    <Footer />
  </div>
);

export default Features;
