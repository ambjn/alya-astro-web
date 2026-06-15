import { motion } from "framer-motion";
import { NavBar } from "../../components/NavBar";
import { SocialLinks } from "../../components/SocialLinks";
import { Footer } from "../../components/Footer";
import { FAQAccordion } from "../../components/FAQAccordion";
import { AppleIcon } from "../../components/DownloadButton";
import { Check } from "lucide-react";
import { staggerVariants, fadeUpCardVariants } from "../../lib/motion";
import { ANIMATION_EASE as ease, APP_STORE_URL } from "../../constants";
import { SUPPORTED_LANGUAGES } from "../../data/languages";
import { ChatMockup } from "./ChatMockup";
import { LevelMockup } from "./LevelMockup";
import { CorrectionsMockup } from "./CorrectionsMockup";
import { VocabMockup, GrammarMockup } from "./VocabGrammarMockup";

const faqs = [
  {
    question: "how is alya different from Duolingo?",
    answer: "Duolingo teaches you to study Spanish: vocabulary lists, hearts, streaks. Alya teaches you to speak it. Every session is a real conversation where alya corrects you in context, adapts to your level, and responds like a bilingual friend. No preset curriculum, no lives to lose.",
  },
  {
    question: "do I need to speak English to use alya?",
    answer: "Not at all. Alya detects the language you text in (Hindi, Japanese, French, Portuguese, and more) and responds in that same language while teaching you Spanish. Alya was built for learners worldwide, not just English speakers.",
  },
  {
    question: "how long before I can hold a real conversation?",
    answer: "Most learners can handle basic everyday conversations within 4–8 weeks of daily practice. The key is consistency over intensity: 10 to 15 minutes every day beats a 2-hour weekend session every time.",
  },
  {
    question: "is alya actually free?",
    answer: "Yes. Download alya and get 5 messages per day, forever, no credit card, no trial period. Upgrade to Plus ($4.99/mo) or Pro ($14.99/mo) anytime for more daily messages and deeper conversation memory.",
  },
];

const pricingPlans = [
  {
    id: "free",
    name: "free",
    price: "free",
    sub: "forever free",
    tagline: "try alya, no commitment",
    features: ["5 messages per day", "all 3 proficiency levels", "20-message memory", "instant corrections"],
    highlight: false,
  },
  {
    id: "plus",
    name: "plus",
    price: "$4.99/mo",
    sub: "billed monthly",
    tagline: "for serious learners",
    features: ["25 messages per day", "all 3 proficiency levels", "40-message memory", "instant corrections"],
    highlight: true,
  },
  {
    id: "pro",
    name: "pro",
    price: "$14.99/mo",
    sub: "billed monthly",
    tagline: "for daily immersion",
    features: ["75 messages per day", "all 3 proficiency levels", "60-message memory", "instant corrections", "deeper conversation memory"],
    highlight: false,
  },
];

export const Home = () => {
  return (
    <div className="font-sans bg-lime-50">

      <section className="relative h-screen overflow-hidden scroll-snap-start flex flex-col justify-end">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-[1.05]"
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
              transition={{ duration: 0.7, delay: 0.7, ease }}
            >
              <SocialLinks dark />
            </motion.div>
          </div>
        </motion.main>
      </section>

      <section className="bg-lime-50 min-h-screen py-16 md:py-20 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
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
              alya chats like a bilingual friend, teaching vocabulary, correcting grammar, and explaining culture naturally, inside every single message.
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

      <section className="bg-lime-50 min-h-screen py-16 md:py-20 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
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
              beginner, intermediate, or advanced. or take a quick proficiency test. alya adapts in real time, never too easy, never overwhelming.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-lime-50 min-h-screen py-16 md:py-20 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
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
              every mistake is a micro-lesson. alya corrects in context, not with a red X, but the way a patient bilingual friend would. no judgment. no lost lives.
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

      <section className="bg-lime-50 min-h-screen py-16 md:py-20 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight leading-[1.1] mb-5">
              speak in yours.<br />
              <span className="text-lime-500">learn in spanish.</span>
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
              text alya in English, Hindi, Japanese, French, whatever's natural for you. alya replies in your language while teaching Spanish the whole time. the only Spanish tutor that's also fluent in yours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap justify-center gap-3"
          >
            {SUPPORTED_LANGUAGES.map((lang, i) => (
              <span key={i} className="px-4 py-2 rounded-full glass text-neutral-600 text-sm font-medium">
                {lang.flag} {lang.name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-lime-50 min-h-screen py-16 md:py-20 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
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
            variants={staggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={fadeUpCardVariants}
              className="bg-white rounded-3xl p-7 border border-neutral-200 shadow-sm"
            >
              <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-1">Vocabulary</p>
              <h3 className="text-neutral-900 font-semibold text-2xl mb-2">words that actually stick.</h3>
              <p className="text-neutral-500 text-base font-light leading-relaxed mb-6">
                tap any word in a conversation to save it. alya uses spaced repetition (SM-2) to show you each word at exactly the right moment, right before you'd forget it.
              </p>
              <VocabMockup />
            </motion.div>

            <motion.div
              variants={fadeUpCardVariants}
              className="bg-white rounded-3xl p-7 border border-neutral-200 shadow-sm"
            >
              <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-1">Grammar</p>
              <h3 className="text-neutral-900 font-semibold text-2xl mb-2">grammar made human.</h3>
              <p className="text-neutral-500 text-base font-light leading-relaxed mb-6">
                browse grammar cards for every tricky rule: ser vs. estar, por vs. para, the subjunctive, each explained simply with a "practice with alya" button.
              </p>
              <GrammarMockup />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-lime-50 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="md:sticky md:top-28"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight leading-[1.1] mb-4">
              questions &amp;<br />
              <span className="text-lime-600">answers.</span>
            </h2>
            <p className="text-neutral-400 text-base font-light leading-relaxed mb-8">
              straight answers.<br className="hidden md:block" /> no fluff.
            </p>
            <a
              href="/support"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-lime-600 transition-colors group"
            >
              still have questions?
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            <FAQAccordion faqs={faqs} />
            <a
              href="/faq"
              className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-neutral-500 hover:text-lime-600 transition-colors group"
            >
              see all questions
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="bg-lime-50 min-h-screen py-16 md:py-20 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight mb-3">
              simple <span className="text-lime-500">pricing.</span>
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg font-light">start free. upgrade when you're ready.</p>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                variants={fadeUpCardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl ${plan.highlight
                  ? "ring-2 ring-lime-400 bg-white"
                  : "bg-neutral-50 hover:bg-white border border-neutral-100"
                  }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest">
                      most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-3 text-neutral-400">{plan.name}</p>
                  <p className="text-4xl font-semibold tracking-tight mb-1 text-neutral-900">{plan.price}</p>
                  <p className="text-xs mb-3 text-neutral-400">{plan.sub}</p>
                  <p className="text-sm text-neutral-500">{plan.tagline}</p>
                </div>

                <div className="h-px mb-5 bg-neutral-100" />

                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <Check size={14} strokeWidth={2.5} className="shrink-0 text-lime-500" />
                      <span className="text-sm leading-snug text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
            className="text-center text-neutral-400 text-sm mt-8"
          >
            all plans start free. no credit card needed.
          </motion.p>
        </div>
      </section>

      <section className="bg-lime-50 min-h-screen py-16 md:py-24 px-6 sm:px-10 md:px-16 scroll-snap-start flex flex-col justify-center">
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
