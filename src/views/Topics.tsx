import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { AppleIcon } from "../components/DownloadButton";
import { staggerVariants, fadeUpVariants } from "../lib/motion";
import { ANIMATION_EASE as ease, APP_STORE_URL } from "../constants";
import { FEED_TOPICS } from "../data/languages";

const TOPIC_BLURBS: Record<string, string> = {
  Animals: "pets and wildlife vocabulary you'll actually use.",
  Beauty: "routines, salons, and everyday self-care Spanish.",
  Business: "companies, money, and professional conversations.",
  Comedy: "jokes, memes, and street humor, the hardest, funniest test.",
  Cooking: "recipes and kitchens, step by step.",
  Exercise: "gyms, workouts, and fitness routines.",
  Food: "ordering, markets, menus, eat well anywhere.",
  Travel: "airports, hotels, directions, the phrases your trip runs on.",
  Family: "introductions, small talk, meeting people.",
  Fashion: "clothes, style, shopping for outfits.",
  Gaming: "streams and slang from Spanish-speaking gamers.",
  Health: "doctor visits, pharmacy, describing symptoms.",
  "Spanish Culture": "how Spanish speakers actually live, celebrate, and talk.",
  "Morning Routine": "daily life vlogs, the most relatable input there is.",
  Music: "songs and artists, with lyrics you finally understand.",
  Relationships: "friendship, dating, and real talk.",
  Shopping: "prices, bargaining, stores, markets.",
  Sports: "fútbol and beyond: commentary speed included.",
  Work: "meetings, interviews, office life.",
  Technology: "phones, apps, and digital life.",
};

const faqs = [
  {
    question: "how do topics work?",
    answer: "Pick the topics you love during onboarding, or anytime in Explore. The feed prioritizes matching clips while keeping enough variety that it never runs dry.",
  },
  {
    question: "what if my topic runs out of clips?",
    answer: "The feed falls back to nearby content so scrolling never stops. New clips are transcribed and published in the background, with a 5+ clips-per-topic coverage target.",
  },
  {
    question: "can I filter by level and topic together?",
    answer: "Yes. Explore combines level (Beginner / Intermediate / Advanced), grammar (Questions, Present/Past tense, Commands, Polite phrases, Conversation), source (Anime, Cartoon, Drama, Movie, Music, News, Vlog, Podcast, Interview, Lesson), and format (Shorts ≤90s vs Videos), plus search in Spanish, English, or a phrase.",
  },
  {
    question: "which topics are best for beginners?",
    answer: "Food, Travel, Shopping, and Morning Routine, concrete vocabulary, clear situations, slower speech. Comedy and Music are tastier at intermediate and above.",
  },
  {
    question: "is Spanish Culture different from language lessons?",
    answer: "Yes. Spanish Culture clips are real native videos about how Spanish speakers live, not classroom lessons. Every clip still ships with transcript, translation, and tap-to-translate so you understand in context.",
  },
];

const Topics = ({ currentPath }: { currentPath?: string }) => (
  <div className="min-h-screen font-sans bg-lime-50">
    <NavBar currentPath={currentPath} />

    <main className="max-w-5xl mx-auto px-6 sm:px-8">
      <section className="pt-36 pb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-5">
            20 topics.<br />
            <span className="text-lime-500">your feed.</span>
          </h1>
          <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-lg">
            not a curriculum, a feed. pick what you love, and learn Spanish from videos about it. Travel, Food, Spanish Culture, Music, Comedy + 15 more.
          </p>
        </motion.div>
      </section>

      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 pb-12"
      >
        {FEED_TOPICS.map((topic) => (
          <motion.div
            key={topic}
            variants={fadeUpVariants}
            className="p-6 rounded-2xl border border-neutral-200 bg-white hover:border-lime-300 hover:shadow-sm transition-all"
          >
            <h2 className="text-neutral-900 font-semibold text-lg mb-1">{topic}</h2>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">{TOPIC_BLURBS[topic]}</p>
          </motion.div>
        ))}
      </motion.div>

      <section className="pb-12">
        <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200 bg-white text-center">
          <p className="text-neutral-900 font-semibold text-sm mb-1">Combine topics with Explore filters</p>
          <p className="text-neutral-500 text-xs font-light leading-relaxed max-w-2xl mx-auto">
            Beginner / Intermediate / Advanced · Questions · Present tense · Past tense · Commands · Polite phrases · Conversation · 10 sources · Shorts vs Videos · search anything
          </p>
        </div>
      </section>

      <section className="pb-20 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-8 text-center tracking-tight">
          topic questions
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="pb-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight mb-3">
          pick your topics.<br />
          <span className="text-lime-500">start scrolling.</span>
        </h2>
        <p className="text-neutral-500 font-light mb-8">free to download · 7-day trial when eligible · 5–30 min a day</p>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 transition-colors text-white font-semibold px-8 py-4 rounded-full text-base shadow-lg"
        >
          <AppleIcon />
          download free on iOS
        </a>
      </section>
    </main>

    <Footer />
  </div>
);

export default Topics;
