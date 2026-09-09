import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { AppleIcon } from "../components/DownloadButton";
import { staggerVariants, fadeUpVariants } from "../lib/motion";
import { ANIMATION_EASE as ease, APP_STORE_URL } from "../constants";
import { FEED_TOPICS } from "../data/languages";

const TOPIC_BLURBS: Record<string, string> = {
  Travel: "airports, hotels, directions — the phrases your trip runs on.",
  Food: "ordering, markets, menus — eat well anywhere.",
  Culture: "how Spanish speakers actually live, celebrate, and talk.",
  Music: "songs and artists, with lyrics you finally understand.",
  Comedy: "jokes, memes, and street humor — the hardest, funniest test.",
  Family: "introductions, small talk, meeting people.",
  Work: "meetings, interviews, office life.",
  Sports: "fútbol and beyond — commentary speed included.",
  Shopping: "prices, bargaining, stores, markets.",
  Health: "doctor visits, pharmacy, describing symptoms.",
  Cooking: "recipes and kitchens, step by step.",
  Fashion: "clothes, style, shopping for outfits.",
  Gaming: "streams and slang from Spanish-speaking gamers.",
  Animals: "pets and wildlife vocabulary you'll actually use.",
  Beauty: "routines, salons, and everyday self-care Spanish.",
  Business: "companies, money, and professional conversations.",
  Exercise: "gyms, workouts, and fitness routines.",
  Relationships: "friendship, dating, and real talk.",
  Technology: "phones, apps, and digital life.",
  "Morning Routine": "daily life vlogs — the most relatable input there is.",
};

const faqs = [
  {
    question: "how do topics work?",
    answer: "Pick the topics you love during onboarding — or anytime in Explore. The feed prioritizes matching clips while keeping enough variety that it never runs dry.",
  },
  {
    question: "what if my topic runs out of clips?",
    answer: "The feed falls back to nearby content so scrolling never stops, and the content worker refills topic coverage in the background (5+ clips per topic target).",
  },
  {
    question: "can I filter by level and topic together?",
    answer: "Yes. Explore combines level (Beginner / Intermediate / Advanced), grammar, source, format (Shorts vs Videos), and your topics.",
  },
  {
    question: "which topics are best for beginners?",
    answer: "Food, Travel, Shopping, and Morning Routine — concrete vocabulary, clear situations, slower speech. Comedy and Music are tastier at intermediate+.",
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
            not a curriculum — a feed. pick what you love, and learn Spanish from videos about it.
          </p>
        </motion.div>
      </section>

      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 pb-20"
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
        <p className="text-neutral-500 font-light mb-8">free daily feed · 5–30 minutes a day</p>
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
