import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { ANIMATION_EASE as ease } from "../constants";

const faqs = [
  {
    question: "is alya actually free?",
    answer: "Yes. Download free and get a daily immersion feed — real Spanish videos with transcripts, translations, and word glosses. ALYA Plus (Annual / Monthly, 7-day free trial when eligible) unlocks Unlimited Immersion, Advanced Explanations, Unlimited Vocabulary, and Customization.",
  },
  {
    question: "how is alya different from Duolingo?",
    answer: "Duolingo drills vocabulary with exercises. Alya is immersion: short native videos where you tap to understand, save words, and grow a companion. If drills feel boring, scroll instead.",
  },
  {
    question: "do I need to know Spanish already?",
    answer: "No. Beginner clips come with full translations and per-word glosses. The feed adapts from beginner to intermediate to advanced as you improve.",
  },
  {
    question: "how much time per day?",
    answer: "5–30 minutes. Onboarding builds a personalized plan (clips, words, sessions per week) and you can set daily reminders — morning, afternoon, evening, or night.",
  },
  {
    question: "how does tap-to-translate work?",
    answer: "Every clip has a synchronized Spanish transcript and English translation. Tap any unfamiliar word for its exact gloss in context, hear native pronunciation, and save it to your vocabulary.",
  },
  {
    question: "what is the ALYA companion?",
    answer: "Watching, saving words, and completing prompts earns stars. Stars grow ALYA's energy, bond, and curiosity — unlocking rooms, outfits, streaks, and achievements.",
  },
  {
    question: "what does ALYA Plus include?",
    answer: "Unlimited Immersion (every clip and collection), Advanced Explanations (nuance and natural phrasing), Unlimited Vocabulary (save and review every phrase), and ALYA Customization (outfits and room items).",
  },
  {
    question: "is there a free trial?",
    answer: "Eligible users get a 7-day free trial on Plus. Cancel anytime before it ends. Subscriptions are iOS-only via the App Store.",
  },
  {
    question: "can I filter what I watch?",
    answer: "Yes. Explore lets you filter by level (Beginner / Intermediate / Advanced), grammar (Questions, Present/Past tense, Commands, Polite phrases, Conversation), source (Anime → Lesson), and format (Shorts vs Videos).",
  },
  {
    question: "what Spanish will I hear?",
    answer: "Real-world Spanish from native videos — street interviews, vlogs, food, travel, music, culture. Always with translations so you understand in context.",
  },
];

export const FAQ = ({ currentPath }: { currentPath?: string }) => {
  return (
    <div className="min-h-screen font-sans bg-lime-50">
      <NavBar currentPath={currentPath} />

      <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 tracking-tight leading-[1.05] mb-4">
            questions &amp;<br />
            <span className="text-lime-500">answers.</span>
          </h1>
          <p className="text-neutral-500 text-base sm:text-lg font-light max-w-md">
            straight answers to everything people ask before downloading.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease }}
        >
          <FAQAccordion faqs={faqs} />
        </motion.div>

      </main>

      <Footer />
    </div>
  );
};
